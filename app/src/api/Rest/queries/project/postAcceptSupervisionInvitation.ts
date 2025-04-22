import type { Id } from '~/api';
import { dtos, restClient } from '../..';

export const postAcceptSupervisionInvitation = async (constructionProjectId: Id) => {
    if (constructionProjectId.isType('internal')) {
        return false;
    }

    return await dtos.construction
        .execUpdateConstructionProjectInvitationStatusToApprovedCommand({
            constructionProjectId: constructionProjectId.asNumber(),
            consultantId: restClient.getContextId(),
        });
};
