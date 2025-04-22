import { restClient } from '~/api';
import { file } from '..';

export const get = async (fileId?: string, name?: string) => {
    if (!fileId || fileId === '') {
        return;
    }

    const data = await restClient.sendRaw('GET', `file/getfilerequest/${fileId}`).asBlob();

    if (!data) {
        return;
    }

    if (name && name !== '') {
        return new File([data], name);
    }

    const filePreview = await file.getPreview(fileId);

    if (!data || !filePreview || !filePreview.fileName) {
        return;
    }

    return new File([data], filePreview.fileName);
};

