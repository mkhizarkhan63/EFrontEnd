import { Img, T, dtos, restQuery } from '~/api';
import { Comment, FileData, type FileDataType } from '~/models';
import { stores } from '~/stores';

export const postTaskUpdateComment = async (
    taskUpdateId: number,
    description: string,
    attachments: FileDataType[],
) => {
    const comment = {
        taskUpdateId,
        description,
        attachmentsIds: await restQuery.file.add(attachments),
    };

    const res = await dtos.workflow.execCreateCommentCommand(comment);

    if (!res) {
        return false;
    }

    const result = res.result;

    return Comment.create({
        id: stores.idCollection.getInternal('comment', result.id),
        name: result.actor?.name,
        createdDate: T.create(result.createdDate, T.Timestamp),
        avatar: Img.tryCreate(result.actor?.avatarId),
        description: result.description,
        attachments: await toInternalFiles(result.attachmentsIds),
        resourceId: result.resourceId,
        actorId: result.actorId,
    });
};

const toInternalFiles = async (filesId?: string[]) => {
    if (!filesId) {
        return [];
    }

    const files = await Promise.all(filesId.map(fileId => FileData.fromExternal(fileId)));
    files.forEach(file => file.loadImg());

    return files;
};
