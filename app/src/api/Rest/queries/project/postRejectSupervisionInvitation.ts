import type { Id } from '~/api';
import { dtos } from '../..';

export const postRejectSupervisionInvitation = async (constructionProjectId: Id) => {
    if (constructionProjectId.isType('internal')) {
        return false;
    }

    return await dtos.construction
        .execUpdateConstructionProjectInvitationStatusToDeclinedCommand({
            constructionProjectId: constructionProjectId.asNumber(),
        });
};
