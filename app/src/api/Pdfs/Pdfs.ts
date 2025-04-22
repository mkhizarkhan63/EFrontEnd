import { Pdf } from './Pdf';

export class Pdfs {
    private pdfs = new Map<string, Pdf>();

    get = (name: string) => {
        const oldPdf = this.pdfs.get(name);

        if (oldPdf) {
            return oldPdf;
        }

        const pdf = new Pdf();

        this.pdfs.set(name, pdf);

        return pdf;
    };
}

export const pdfs = new Pdfs();
