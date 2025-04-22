import type { FileDataType } from '~/models';
import { file } from '..';
import { dtos } from '../..';

export const uploadDrawings = async (constructionProjectId: number, files: FileDataType[]) => {
    const drawingFiles = await file.add(files);

    return await dtos.construction.execUploadConstructionProjectDrawingsCommand({
        constructionProjectId,
        drawingFiles,
    });
};
