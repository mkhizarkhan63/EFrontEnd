import { ErrorListHolder, T } from '~/api';
import type { CompanyType, DocumentType, FileDataType } from '~/models';

const struct = () => T.type({
    crCertificate: T.files(),
    ownerNational: T.optional(T.files()),
    manpower: T.optional(T.files()),
});

export class CompanyDocumentsVm {
    errorListHolder = new ErrorListHolder(() => this.validationData, () => struct());

    constructor(readonly company: CompanyType, readonly errorListHolderParent: ErrorListHolder) {
        makeSafeObservable(this, {
            getFiles: false,
        });

        errorListHolderParent.setChildren(this.errorListHolder);
    }

    get validationData() {
        const certificateFile = this.getFiles('crCertificate');
        const nationalFile = this.getFiles('ownerNationalId');
        const manpowerFile = this.getFiles('manpowerReportIssued');

        return {
            crCertificate: certificateFile.length > 0 ? certificateFile : undefined,
            ownerNational: nationalFile.length > 0 ? nationalFile : undefined,
            manpower: manpowerFile.length > 0 ? manpowerFile : undefined,
        };
    }

    getFiles = (type: DocumentType) => this.company.files
        .filter(item => item.type === type)
        .map(item => item.data);

    filesToRemove: string[] = [];
    malaCreditFile: FileDataType[] = [];
    taxCertificateFile: FileDataType[] = [];


    uploadTaxCertificateFile = (file: FileDataType) => {
        file.loadImg();
        this.taxCertificateFile.push(file)
    }

    removingTaxCertificateFile = (file: FileDataType) => {
        this.taxCertificateFile = this.taxCertificateFile.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    }


    uploadMalaCreditFile = (file: FileDataType) => {
        file.loadImg();
        this.malaCreditFile.push(file)
    }

    removingMalaCreditFile = (file: FileDataType) => {
        this.malaCreditFile = this.malaCreditFile.filter(x => x.id !== file.id);
        if (file.isExternal) {
            this.filesToRemove.push(file.fileId);
        }
    }
}
