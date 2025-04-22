import { dtos, Img, Mobx, models } from '~/api';
import { getUserInfo } from '../getUserInfo';
import { FileData } from '~/models';

export const getProjectForConsultant = async (id: number) => {
    const data = await dtos.construction.execGetConstructionProjectForConsultantQuery({
        projectId: id,
    });

    if (!data || !data.result) {
        return false;
    }

    const item = data.result;
    const project = models.project.toInternalProject(item);

    const clientData = await getUserInfo(item.clientId);

    Mobx.extendsObservable(project.forConsultant, {
        clientName: clientData?.name,
        clientEmail: clientData?.email,
        clientContact: clientData?.phone,
        clientAvatar: Img.tryCreate(clientData?.profilePicture),
    });

    const krookieFilesPromise = Promise.all((item.krookieFiles ?? [])
        .map(async fileId => {
            const fileData = await FileData.fromExternal(fileId);
            return project.uploadKrookieFile(fileData);
        }));

    const drawingFilesPromise = Promise.all((item.drawingFiles ?? [])
        .map(async fileId => {
            const fileData = await FileData.fromExternal(fileId);
            return project.uploadDrawingFile(fileData);
        }));

    await Promise.all([krookieFilesPromise, drawingFilesPromise]);

    return project;
};

