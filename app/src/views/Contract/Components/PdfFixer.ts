type BlockHeight = number | 'page-size';

class Block {
    height: BlockHeight;

    constructor(
        height: BlockHeight,
    ) {
        this.height = typeof height === 'number'
            ? height * 1.1
            : height;
    }

    get heightAsNumber() {
        if (this.height === 'page-size') {
            return Infinity;
        }

        return this.height;
    }

    render = () => document.createElement('div') as HTMLElement;

    contains = (text: string) => {
        const clonnedHtml = this.render().cloneNode(true) as HTMLElement;
        const textContent = clonnedHtml.textContent ?? '';
        return textContent.includes(text);
    };
}

class ParentBlock implements Block {
    children: Block[] = [];

    createSelf = () => document.createElement('div') as HTMLElement;

    get height() {
        return this.children.reduce((acc, child) => acc + child.heightAsNumber, 0);
    }

    get heightAsNumber() {
        return this.height;
    }

    render = () => {
        const parent = this.createSelf();

        for (const child of this.children) {
            parent.appendChild(child.render());
        }

        return parent;
    };

    addBlock = (block: Block) => {
        this.children.push(block);
    };

    contains = (text: string) => this.children.some(child => child.contains(text));
}

class TableBlock extends ParentBlock {
    createSelf = () => {
        const el = document.createElement('table') as HTMLElement;
        el.classList.add('pdf-table');
        return el;
    };

    render = () => {
        const table = this.createSelf();

        if (!this.children.some(child => child instanceof TableRowBlock)) {
            return document.createElement('span') as HTMLElement;
        }

        for (const child of this.children) {
            table.appendChild(child.render());
        }

        return table;
    };
}

class Page {
    blocks: Block[] = [];

    endingBlocks: Block[] = [];

    pageToc?: Record<string, number | string>;

    constructor(
        public getPages: () => Page[],
    ) {}

    get height() {
        const blocks = [...this.blocks, ...this.endingBlocks];

        if (blocks.some(block => block.height === 'page-size')) {
            return Infinity;
        }

        return blocks.reduce((acc, block) => acc + block.heightAsNumber, 0);
    }

    get heightWithoutBottom() {
        const blocks = Array.from(this.blocks);

        if (blocks.some(block => block.height === 'page-size')) {
            return Infinity;
        }

        return blocks.reduce((acc, block) => acc + block.heightAsNumber, 0);
    }

    get allBlocks() {
        return [...this.blocks, ...this.endingBlocks];
    }

    has = (blockClass: unknown) => this.blocks.some(block => {
        if (typeof blockClass !== 'function') {
            return false;
        }

        return block instanceof blockClass;
    });

    getLast = (blockClass: unknown, ifOnlyLast: boolean) => {
        const blocks = Array.from(this.blocks);
        blocks.reverse();
        return blocks.find((block, i) => {
            if (i !== 0 && ifOnlyLast) {
                return false;
            }

            if (typeof blockClass !== 'function') {
                return false;
            }

            return block instanceof blockClass;
        });
    };

    get length() {
        return this.blocks.length;
    }

    addBlock = (block: Block) => {
        this.blocks.push(block);
    };

    addEndingBlock = (block: Block) => {
        this.endingBlocks.push(block);
    };

    render = () => {
        const page = document.createElement('div');
        page.classList.add('pdf-page');

        const content = document.createElement('div');
        content.classList.add('pdf-page__content');

        if (!this.has(ImageBlock)) {
            content.classList.add('pdf-page__content--custom');
        }

        const blocks = this.allBlocks;

        for (const block of blocks) {
            if (block instanceof FooterBlock) {
                const headerBlock = this.getLast(HeaderBlock, false) as HeaderBlock;
                const previousPage = this.getPages()[this.getPages().indexOf(this) -1];
                const footer = block.output.lastChild;

                if (!footer) {
                    continue;
                }

                if (headerBlock) {
                    const letter = headerBlock.output.firstChild?.textContent ?? '';
                    const name = headerBlock.output.lastChild?.textContent ?? '';
                    this.pageToc = { name, number: 1 };
                    footer.textContent = `${name} - 1`;
                    page.dataset.pdfToc = `${letter}. ${name}`;
                }

                if (!headerBlock) {
                    this.pageToc = {
                        name: previousPage.pageToc?.name ?? '',
                        number: previousPage.pageToc?.number as number + 1,
                    };

                    footer.textContent = `${previousPage.pageToc?.name} - ${this.pageToc?.number}`;
                }
            }

            content.appendChild(block.render().cloneNode(true) as HTMLElement);
        }

        page.appendChild(content);

        return page;
    };

    filterOut = (fn: (block: Block) => boolean) => {
        this.blocks = this.blocks.filter(b => !fn(b));
        this.endingBlocks = this.endingBlocks.filter(b => !fn(b));
    };
}

let imageIndex = 0;

class ImageBlock extends Block {
    src = '';

    index = imageIndex++;

    constructor(
        canvas: HTMLCanvasElement,
    ) {
        super('page-size');

        canvas.toBlob(blob => {
            if (!blob) {
                return;
            }

            this.src = URL.createObjectURL(blob);

            const mounted = document.querySelector<HTMLImageElement>(`[data-id="${this.id}"]`);

            if (mounted) {
                mounted.src = this.src;
            }
        }, 'image/png', .7);
    }

    get id() {
        return `pdffi~${this.index}`;
    }

    render = () => {
        const img = document.createElement('img');
        img.src = this.src;
        img.style.width = '100%';
        img.style.height = 'auto';
        img.dataset.id = this.id;
        return img;
    };
}

class RawBlock extends Block {
    output: HTMLElement;

    constructor(
        input: HTMLElement,
    ) {
        super(input.clientHeight);
        this.output = input.cloneNode(true) as HTMLElement;
    }

    render = () => this.output;
}

class SubHeaderBlock extends RawBlock {}

class TableHeadBlock extends RawBlock {}

class TableRowBlock extends RawBlock {}

class HeaderBlock extends RawBlock {}

class FooterBlock extends RawBlock {}

const elementToBlock = (element: HTMLElement) => {
    if (element instanceof HTMLCanvasElement) {
        return [new ImageBlock(element)];
    }

    if (element.classList.contains('pdf-table-header')) {
        return [new SubHeaderBlock(element)];
    }

    if (element.classList.contains('pdf-footer')) {
        return [new FooterBlock(element)];
    }

    if (element.classList.contains('pdf-header')) {
        return [new HeaderBlock(element)];
    }

    if (element.classList.contains('pdf-table')) {
        const blocks: Block[] = [];
        const header = element.querySelector<HTMLElement>('thead');

        if (header) {
            blocks.push(new TableHeadBlock(header));
        }

        for (const row of element.querySelectorAll<HTMLElement>('tbody tr')) {
            blocks.push(new TableRowBlock(row));
        }

        return blocks;
    }

    return [new RawBlock(element)];
};

class PdfFixer {
    pageSize = 100;

    pages: Page[] = [];

    constructor(
        private input: HTMLElement,
    ) {}

    recreate = () => {
        for (const page of this.input.querySelectorAll<HTMLElement>('.pdf-page')) {
            if (page.clientHeight === 0) {
                continue;
            }

            this.pageSize = page.clientHeight;
            break;
        }

        const blocks: Block[] = [];

        for (const page of this.input.querySelectorAll<HTMLElement>('.pdf-page__content')) {
            for (const element of page.children) {
                const block = elementToBlock(element as HTMLElement);
                blocks.push(...block);
            }
        }
        let page = new Page(() => this.pages);

        const footer = (() => {
            const f = blocks.find(block => block instanceof FooterBlock);

            if (f) {
                return f;
            }

            return new FooterBlock(document.createElement('div'));
        })();

        const ps = this.pageSize - (footer.heightAsNumber * 1.65);

        const findInPreviousPages = (blockClass: unknown) => {
            const pages = Array.from(this.pages);
            pages.reverse();

            for (const p of pages) {
                const block = p.getLast(blockClass, false);

                if (block) {
                    return block;
                }
            }
        };

        page.addEndingBlock(footer);

        const pushPage = () => {
            if (page.heightWithoutBottom > 0) {
                if (page.has(ImageBlock)) {
                    page.filterOut(block => block instanceof FooterBlock);
                }
                this.pages.push(page);
                page = new Page(() => this.pages);
                page.addEndingBlock(footer);
            }
        };

        for (const block of blocks) {
            if (block instanceof ImageBlock) {
                pushPage();
                page.addBlock(block);
                pushPage();
                continue;
            }

            if (block instanceof HeaderBlock) {
                pushPage();
            }

            if (block instanceof SubHeaderBlock) {
                const previous = page.getLast(HeaderBlock, true);

                if (!previous) {
                    pushPage();
                }
            }

            if (block instanceof FooterBlock) {
                continue;
            }

            if (page.height + block.heightAsNumber > ps) {
                pushPage();
            }

            if (block instanceof TableHeadBlock) {
                const table = new TableBlock();
                page.addBlock(table);
                table.addBlock(block);
                continue;
            }

            if (block instanceof TableRowBlock) {
                const table = page.getLast(TableBlock, true) as TableBlock;

                if (table) {
                    table.addBlock(block);
                    continue;
                }

                const freshTable = new TableBlock();
                const oldTable = findInPreviousPages(TableBlock) as TableBlock;

                if (!oldTable) {
                    continue;
                }

                const oldHead = oldTable.children.find(b => b instanceof TableHeadBlock);

                if (!oldHead) {
                    continue;
                }

                const freshHead = new TableHeadBlock(oldHead.output.cloneNode(true) as HTMLElement);
                freshTable.addBlock(freshHead);
                freshTable.addBlock(block);
                page.addBlock(freshTable);
                continue;
            }

            page.addBlock(block);
        }

        pushPage();

        const result = document.createElement('div');

        for (const thePage of this.pages) {
            const clonnedHtml = thePage.render().cloneNode(true) as HTMLElement;
            const ebinaa = clonnedHtml.querySelector('.pdf-contact-table--ebinaa');

            if (ebinaa) {
                const logo = ebinaa.querySelector('img') as HTMLElement;
                const table = ebinaa.querySelector('.pdf-table__thead-img');
                const td = document.createElement('td') as HTMLElement;
                td.appendChild(logo);
                table?.appendChild(td);
                result.appendChild(clonnedHtml);
                continue;
            }

            if (this.pages.indexOf(thePage) === this.pages.length - 2) {
                const cloneHtml = thePage.render().cloneNode(true) as HTMLElement;
                const previousPage = result.lastChild as HTMLElement;
                const signboardHeader = previousPage.querySelector('.pdf-signboard-table');

                if (signboardHeader) {
                    cloneHtml.querySelector('.pdf-page__content')
                        ?.prepend(signboardHeader.cloneNode(true) as HTMLElement);

                    signboardHeader.remove();
                }

                result.appendChild(cloneHtml);
                continue;
            }

            result.appendChild(thePage.render());
        }

        return result;
    };
}

export const pdfFix = (input: HTMLElement) => {
    const pdfFixer = new PdfFixer(input);
    return pdfFixer.recreate();
};
