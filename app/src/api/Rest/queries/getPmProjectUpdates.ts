import { type Moment } from 'moment';
import { dtos, E, enums, Img, T, type Paging } from '~/api';
import { Actor, FileData, LogUpdateItem } from '~/models';
import { stores } from '~/stores';

export type PmUpdatesFilter = {
    initialized: boolean;
    fileExtensionType: E.FileExtensionType;
    filter: {
        fromDate?: Moment;
        toDate?: Moment;
        stageIds?: number[];
        actorType?: E.WorkflowActorType;
    };
};

export const getPmProjectUpdates = async (
    filters: PmUpdatesFilter,
    projectId?: number,
    paging?: Paging,
) => {
    const createFile = (id?: string) => {
        if (!id) {
            return;
        }

        const file = FileData.create({
            fileId: id,
        });

        file.loadImgFromId(id, E.MinifiedImageSize.large);

        file.connect();

        return file;
    };

    if (!filters.initialized || !projectId || !paging) {
        return [];
    }

    const isImageType = filters.fileExtensionType === E.FileExtensionType.image;

    const response = await dtos.workflow.execGetProjectUpdatesQuery({
        ...paging.toQuery(),
        projectId,
        fileExtensionType: T.create(
            filters.fileExtensionType,
            enums.FileExtensionType.castToExternal,
        ),
        filter: {
            fromDate: filters.filter?.fromDate?.toISOString(),
            toDate: filters.filter?.toDate?.toISOString(),
            ... isImageType && {
                stageIds: filters.filter?.stageIds,
                actorType: T.tryCreate(
                    filters.filter.actorType,
                    enums.WorkflowActorType.castToExternal,
                ),
            },
        },
    });

    if (!response) {
        return [];
    }

    paging.setPagesCount(response?.pageCount ?? 0);
    paging.setRowCount(response?.rowCount ?? 0);

    return response.result.map(item => LogUpdateItem.create({
        id: item.taskUpdateId,
        posterActorType: T.tryCreate(
            item.posterActorType,
            enums.WorkflowActorType.castToInternal,
        ),
        posterActor: Actor.create({
            id: stores.idCollection.getInternal('actor', item.posterActor?.profileId),
            name: item.posterActor?.name,
            email: item.posterActor?.email,
            phone: item.posterActor?.phone,
            avatar: Img.tryCreate(item.posterActor?.avatarId),
        }),
        postedAt: T.tryCreate(item.postedAt, T.MaybeTimestamp),
        attachment: isImageType ? undefined : createFile(item.attachmentId),
        picture: isImageType ? Img.tryCreate(item.attachmentId, () => E.MinifiedImageSize.large) : undefined,
        fileName: item.fileName,
        title: item.title,
    }));
};
