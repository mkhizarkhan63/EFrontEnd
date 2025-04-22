import { E, T, type Id } from '~/api';
import { dtos, enums } from '../..';

export const postInviteConsultantToProject = async (
    consultantId: number,
    constructionProjectId: Id,
    isInvited: boolean,
) => {
    if (constructionProjectId.isType('internal')) {
        return;
    }

    if (isInvited) {
        return await dtos.construction
            .execDeleteConsultantInvitationCommand({
                constructionProjectId: constructionProjectId.asNumber(),
            });
    }

    return await dtos.construction
        .execCreateConstructionProjectInvitationCommand({
            companyId: consultantId,
            companyType: T.create(
                E.RoleInCompany.consultant,
                enums.RoleInCompany.castToExternal,
            ),
            constructionProjectId: constructionProjectId.asNumber(),
        });
};
