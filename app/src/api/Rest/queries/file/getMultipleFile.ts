import { restClient } from '../..';

export const getMultiple = async (fileIds: string[]) => {
    const data = await restClient.sendRaw(
        'POST',
        'file/downloadmultiplefilesquery',
        { fileIds: fileIds.join(',') },
    ).asBlob();

    return new File([data], 'ebinaa.zip');
};
