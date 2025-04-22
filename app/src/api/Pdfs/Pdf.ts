import { toBlob } from 'html-to-image';
import {
    makeAutoObservable,
    action,
    observable,
    onBecomeObserved,
    reaction,
    makeObservable,
    runInAction,
} from 'mobx';
import { promise as queue } from 'fastq';
import * as pdfLib from 'pdfjs-dist';

type PDFDocument = pdfLib.PDFDocumentProxy;

const PARENT_SELECTOR = '#pdf-preview';
const PAGES_SELECTOR = `${PARENT_SELECTOR} .pdf-page`;
const THUMBNAIL_SELECTOR = (id: number) => `[data-pdf-thumbnail-index="${id}"]`;
const IMG_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const DOM = {
    $$: (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel)),
    getPages: () => DOM.$$(PAGES_SELECTOR),
    getById: (id: number) => DOM
        .getPages()
        .find(($el, i) => i === id),
    getByEl: ($el: HTMLElement) => DOM
        .getPages()
        .findIndex($ell => $ell.isSameNode($el)),
    getThumbnailOf: (id: number) => DOM.$$(THUMBNAIL_SELECTOR(id)),
    getPreview: () => DOM.$$(PARENT_SELECTOR),
};

type PageQueueData = {
    doc: pdfLib.PDFDocumentProxy;
    el: HTMLCanvasElement;
    id: number;
};

class PageQueue {
    loaded = 0;

    constructor() {
        makeObservable(this, {
            loaded: observable,
        });
    }

    push = async (data: PageQueueData) => await this.raw.push(data);

    worker = async ({
        doc,
        el,
        id,
    }: PageQueueData) => {
        const ctx = el.getContext('2d');

        if (!ctx) {
            return;
        }

        const page = await doc.getPage(id + 1);
        const viewport = page.getViewport({
            scale: 4,
        });

        el.height = viewport.height;
        el.width = viewport.width;

        await page.render({
            canvasContext: ctx,
            viewport,
        }).promise;

        runInAction(() => {
            this.loaded += 1;
        });
    };

    reset = () => {
        runInAction(() => {
            this.loaded = 0;
            this.raw.kill();
            this.raw = queue(this.worker, 1);
        });
    };

    private raw = queue(this.worker, 1);
}

class Page {
    $el?: HTMLCanvasElement;

    static queue = new PageQueue();

    constructor(
        public file: File,
        public id: number,
    ) {
        makeAutoObservable(this, {
            file: observable.ref,
            id: false,
            render: false,
        });

        reaction(() => [
            this.$el,
            this.file.document,
        ], () => {
            this.render();
        });
    }

    setElement = ($el: HTMLCanvasElement | null) => {
        this.$el = $el ?? undefined;
    };

    render = async () => {
        const $el = this.$el;
        const { document } = this.file;

        if (!$el || !document) {
            return;
        }

        await Page.queue.push({
            el: $el,
            doc: document,
            id: this.id,
        });
    };
}

class File {
    countOfPages = 0;

    page = new Map<number, Page>();

    document?: PDFDocument;

    path = '';

    constructor() {
        makeAutoObservable(this, {
            setPath: action,
            getPage: false,
            render: false,
            setDocument: action,
            setCountOfPages: action,
        });
    }

    mount = () => {
        reaction(() => this.path, path => {
            this.render(path);
        }, { fireImmediately: true });
    };

    getPage = (id: number) => {
        const old = this.page.get(id);

        if (old) {
            return old;
        }

        const newItem = new Page(this, id);
        this.page.set(id, newItem);
        return newItem;
    };

    setPath = (path: string) => {
        this.path = path;
    };

    render = async (path: string) => {
        if (!path) {
            return;
        }

        const document = await pdfLib
            .getDocument(path)
            .promise;

        this.setCountOfPages(document.numPages);
        this.setDocument(document);
    };

    setCountOfPages = (value: number) => {
        this.countOfPages = value;
    };

    setDocument = (document: PDFDocument) => {
        this.document = document;
    };
}

class ThumbnailQueue {
    push = async ($el: HTMLElement) => await this.raw.push($el);

    worker = async ($el: HTMLElement) => {
        const data = await toBlob($el, {
            quality: 0.75,
            backgroundColor: 'white',
            imagePlaceholder: IMG_PLACEHOLDER,
        });

        if (!data) {
            return false;
        }

        return URL.createObjectURL(data);
    };

    private raw = queue(this.worker, 5);
}

class Thumbnail {
    url = IMG_PLACEHOLDER;

    isLoading = true;

    isLoaded = false;

    static queue = new ThumbnailQueue();

    constructor(
        public $el?: HTMLElement,
    ) {
        makeAutoObservable(this, {
            $el: observable.ref,
            generate: false,
        });

        onBecomeObserved(this, 'isLoading', () => {
            this.generate();
        });
    }

    setElement = ($el?: HTMLElement) => {
        this.$el = $el;
        this.generate();
    };

    generate = async () => {
        if (this.isLoaded) {
            return;
        }

        this.setIsLoading(true);

        if (!this.$el) {
            this.setIsLoading(false);
            return;
        }

        const url = await Thumbnail.queue.push(this.$el);

        if (!url) {
            this.setIsLoading(false);
            return;
        }

        this.setUrl(url);
        this.setIsLoading(false);

        this.isLoaded = true;
    };

    setUrl = (url: string) => {
        this.url = url;
    };

    setIsLoading = (value: boolean) => {
        this.isLoading = value;
    };
}

class View {
    readonly step = 0.25;

    readonly steps = 3;

    readonly edge = this.step * this.steps;

    readonly max = 1 + this.edge;

    readonly min = 1 - this.edge;

    scale = 1;

    scaleDown = () => {
        this.setScale(this.scale - this.step);
    };

    scaleUp = () => {
        this.setScale(this.scale + this.step);
    };

    setScale = (scale: number) => {
        this.scale = Math.max(Math.min(scale, this.max), this.min);
    };

    get style() {
        return {
            transform: `scale(${this.scale})`,
        };
    }

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.scale, () => {
            DOM.getPreview().forEach($el => {
                $el.style.transform = this.style.transform;
            });
        });
    }
}

export class Pdf {
    file = new File();

    view = new View();

    countOfPages = 0;

    visibleList = new Set<number>();

    toc: Array<{
        title: string;
        page: number;
    }> = [];

    thumbnails = new Map<number, Thumbnail>();

    constructor() {
        makeAutoObservable(this, {
            setIsVisible: action,
            getSectionIdByPageId: false,
            getSectionByPageId: false,
            getSectionById: false,
            jumpToSection: false,
            jumpToPage: false,
        });
    }

    mount = () => {
        pdfLib.GlobalWorkerOptions.workerSrc = '/pdfjs.worker.js';

        Page.queue.reset();

        reaction(() => this.topVisible, id => {
            DOM.getThumbnailOf(id).forEach(x => x.scrollIntoView());
        });

        this.file.mount();
    };

    unmount = () => {
        Page.queue.reset();
    };

    get isFullyLoaded() {
        return this.file.countOfPages > 0 && Page.queue.loaded >= this.file.countOfPages;
    }

    getThumbnail = (id: number) => {
        const old = this.thumbnails.get(id);

        if (old) {
            return old;
        }

        const newItem = new Thumbnail(DOM.getById(id));
        this.thumbnails.set(id, newItem);
        return newItem;
    };

    regenerateCanvas = () => {
        this.file.page.forEach(page => page.render());
    };

    get isThumbnailsLoading() {
        return Array.from(this.thumbnails.values()).some(x => x.isLoading);
    }

    get topVisible() {
        return Array.from(this.visibleList).sort((a, b) => a - b).find(() => true) ?? 0;
    }

    get topVisibleSection() {
        return this.getSectionIdByPageId(this.topVisible);
    }

    setIsVisible = ($el: HTMLElement | null, value: boolean) => {
        if ($el === null) {
            return;
        }

        const id = DOM.getByEl($el);
        this.visibleList[value ? 'add' : 'delete'](id);
    };

    getSectionByPageId = (id: number) => this.toc[this.getSectionIdByPageId(id)];

    getSectionIdByPageId = (id: number) => {
        const item = this.toc
            .filter(entry => entry.page <= id)
            .sort((a, b) => b.page - a.page)
            .find(() => true);

        const sid = this.toc.findIndex(x => x === item);

        return sid === -1 ? 0 : sid;
    };

    getSectionById = (id: number) => {
        const s = this.toc[id];

        if (!s) {
            return this.toc[0];
        }

        return s;
    };

    jumpToSection = (pageId: number) => {
        const $el = DOM.getById(this.getSectionById(pageId).page);

        if (!$el) {
            return;
        }

        $el.scrollIntoView();
    };

    jumpToPage = (pageId: number) => {
        const $el = DOM.getById(pageId);

        if (!$el) {
            return;
        }

        $el.scrollIntoView();
    };

    htmlUpdate = () => {
        this.countOfPages = DOM.getPages().length;

        this.thumbnails.forEach((t, index) => {
            t.setElement(DOM.getById(index));
        });

        const customToc = DOM.getPages()
            .map(($el, i) => ({
                toc: $el.dataset.pdfToc,
                i,
            }))
            .filter(x => x.toc)
            .map(x => ({
                title: x.toc ?? '??',
                page: x.i,
            }));

        this.toc = [
            {
                title: 'Front Page',
                page: 0,
            },
            {
                title: 'A. Terms',
                page: 4,
            },
            ...customToc,
        ];
    };
}
