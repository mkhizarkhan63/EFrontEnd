import type { MouseEvent } from 'react';
import { restQuery } from '~/api';
import type { FileDataType } from '~/models';

export const downloadFile = (fileData: FileDataType, e?: MouseEvent<HTMLImageElement>) => {
    e?.stopPropagation();

    (async () => {
        if (!fileData.file) {
            await fileData.load();
        }

        if (fileData.file) {
            simulateDownload(fileData.file);
        }
    })();
};

export const simulateDownload = (file: File, name?: string) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = name ?? file.name;
    a.click();
};

export const downloadAll = (files: FileDataType[]) => async () => {
    const fileIds = files.map(item => item.fileId);
    const zip = await restQuery.file.getMultiple(fileIds);
    simulateDownload(zip);
};

export const loadFileNames = async (files: FileDataType[]) => {
    if (files.every(file => file.isNameLoaded)) {
        return;
    }

    const ids = files.map(item => item.fileId);

    const previews = await restQuery.file.getPreviews(ids);

    if (!previews) {
        return;
    }

    files.forEach(item => {
        const externalPreview = previews.find(preview => preview.fileId === item.fileId);
        item.setName(externalPreview?.fileName ?? '');
    });
};
