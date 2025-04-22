import { dtos } from '~/api';

export const deleteId = async (fileId: string) => {
    if (fileId === '') {
        return;
    }

    await dtos.file.execDeleteFileCommand({ fileId });
};

