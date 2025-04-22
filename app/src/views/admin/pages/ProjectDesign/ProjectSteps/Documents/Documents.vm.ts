import { restQuery } from '~/api';
import type { Project } from '~/models';
import { simulateDownload } from '~/utils';

export enum DesignFileType {
    krookie = 'krookie',
    drawing = 'drawing',
}

export class DocumentsVm {
    isSelectedDesign = false;

    isSelectedDrawings = false;

    constructor(readonly project: Project) {
        makeSafeObservable(this);
    }

    get krookieFiles() {
        return this.project.krookieFiles;
    }

    get drawingFiles() {
        return this.project.drawingsFiles;
    }

    get krookieFilesLength() {
        return this.project.krookieFiles.length;
    }

    get drawingFilesLength() {
        return this.project.drawingsFiles.length;
    }

    toggleSelectDesign = (type: DesignFileType) => () => {
        if (type === DesignFileType.krookie) {
            this.isSelectedDesign = !this.isSelectedDesign;
            return;
        }

        this.isSelectedDrawings = !this.isSelectedDrawings;
    };

    downloadFiles = async (type: DesignFileType) => {
        let fileIds: string[] = [];

        if (this.isSelectedDesign && type === DesignFileType.krookie) {
            fileIds = this.krookieFiles.map(item => item.fileId);
        }

        if (this.isSelectedDrawings && type === DesignFileType.drawing) {
            fileIds = this.drawingFiles.map(item => item.fileId);
        }

        if (fileIds.length > 0) {
            return;
        }

        const zip = await restQuery.file.getMultiple(fileIds);
        simulateDownload(zip);
    };
}
