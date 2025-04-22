import { E, T, type Id } from '~/api';
import { dtos, enums } from '../..';

export const inviteInternalContractor = async (
    constructionProjectId: Id,
    contractorId?: number,
) => {
    if (constructionProjectId.isType('internal')) {
        return;
    }

    const res = await dtos.construction
        .execCreateConstructionProjectInvitationCommand({
            companyId: contractorId,
            companyType: T.create(
                E.RoleInCompany.contractor,
                enums.RoleInCompany.castToExternal,
            ),
            constructionProjectId: constructionProjectId.asNumber(),
        });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
