import type { TaskUpdateType } from '~/models';
import { dtos, enums, restQuery } from '../..';
import { T } from '~/api';

export const postObservation = async (observations: TaskUpdateType[], projectId: number, didVisitSite?: boolean, stageId?: number, itemId?: number) => {
    const externalObservations = await Promise.all(observations.map(async item => ({
        updateType: T.create(
            item.type,
            enums.TaskUpdateType.castToExternal,
        ),
        description: item.description,
        attachments: await restQuery.file.add(item.attachments),
        stageId,
        itemId,
    })));

    const toExternalUpdate = {
        projectId,
        isConsultantVisit: didVisitSite,
        observations: externalObservations,
    };

    const res = await dtos.workflow.execCreateObservationCommand(toExternalUpdate);

    if (!res) {
        return false;
    }

    return res.id;
};
