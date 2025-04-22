import { get } from './getFile';

export const getPath = async (fileId?: string) => {
    const content = await get(fileId);

    if (!content) {
        return;
    }

    return URL.createObjectURL(content);
};
