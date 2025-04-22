import { dtos } from '~/api';

export const getPreviews = async (fileIds: string[]) => {
    if (fileIds.length === 0) {
        return;
    }

    const data = await dtos.file.execListGetFilesPreviewRequest({ fileIds });

    if (!data) {
        return;
    }

    return data.result;
};
