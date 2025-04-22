import { restClient } from '~/api';
import type { FileDataType } from '~/models';

export const add = async (fileList: FileDataType[], isPublic = true) => {
    if (fileList.length === 0) {
        return [];
    }

    const toAdd: File[] = [];
    const alreadyAdded: string[] = [];

    fileList.forEach(item => {
        if (!item.isExternal) {
            if (item.file) {
                toAdd.push(item.file);
            }
            return;
        }

        alreadyAdded.push(item.fileId);
    });

    if (toAdd.length === 0) {
        return alreadyAdded;
    }

    const formData = new FormData();

    toAdd.forEach((file, i) => {
        formData.append(`file[${i}]`, file);
    });

    const params = {
        format: 'json',
        isPublic,
    };

    const data = await restClient.sendRaw('POST', 'file/createfilecommand', params, formData).asJson();

    if (!data || !data.result) {
        return alreadyAdded;
    }

    return alreadyAdded.concat(data.result);
};
