import { dtos } from '~/api';

export const getPreview = async (fileId: string) => await dtos.file.execGetFilePreviewRequest({ fileId });
