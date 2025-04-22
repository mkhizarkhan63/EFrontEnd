import { makeObservable, observable, action } from 'mobx';
import * as pdfLib from 'pdfjs-dist';

type PdfDocument = pdfLib.PDFDocumentProxy;

type Callbacks = {
    onCountChange?: (val: number) => void;
};

export class PdfPreviewVm {
    scale = 2;

    private pdf?: PdfDocument;

    private timestamp = 0;

    constructor(
        private events: Callbacks,
    ) {
        pdfLib.GlobalWorkerOptions.workerSrc = '/pdfjs.worker.js';
        makeObservable(this, {
            scale: observable,
            setScale: action,
        });
    }

    render = async () => {
        const pdf = await this.getDocument();

        this.timestamp = Date.now();
        this.events.onCountChange?.(pdf.numPages);

        const renderings = Array(pdf.numPages)
            .fill(0)
            .map((x, i) => i + 1)
            .map(id => this.renderPage(id, pdf));

        await Promise.allSettled(renderings);
    };

    private renderPage = async (id: number, pdf: PdfDocument) => {
        const page = await pdf.getPage(id);

        const $el = this.getCanvas(id);

        const viewport = page.getViewport({
            scale: this.scale,
        });

        $el.height = viewport.height;
        $el.width = viewport.width;

        await page.render({
            canvasContext: this.getCtx(id),
            viewport,
        }).promise;
    };

    private getDocument = async () => {
        if (this.pdf) {
            return this.pdf;
        }

        const pdf = await pdfLib
            .getDocument('/contract-example.pdf')
            .promise;

        this.pdf = pdf;

        return pdf;
    };

    private getCanvas = (id: number) => {
        const $canvas = document.querySelector<HTMLCanvasElement>(
            `#pdf-preview canvas[data-id="${id}"]`,
        );

        if (!$canvas) {
            throw new Error(`Cannot find canvas with id = ${id}`);
        }

        return $canvas;
    };

    private getCtx = (id: number) => {
        const $canvas = this.getCanvas(id);
        const ctx = $canvas.getContext('2d');

        if (!ctx) {
            throw new Error(`Cannot find context 2D of canvas with id = ${id}`);
        }

        return ctx;
    };

    getKey = (id: number) => `pdf-${this.timestamp}-${id}`;

    setScale(scale: number) {
        if (scale === this.scale) {
            return;
        }

        this.scale = scale;
        this.render();
    }
}
