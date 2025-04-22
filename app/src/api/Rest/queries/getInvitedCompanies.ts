import { T, type E } from '~/api';
import { dtos, enums } from '..';
import { InvitedCompany } from '~/models';
import { stores } from '~/stores';

export const getInvitedCompanies = async (projectId: number, context: E.RoleInCompany) => {
    const res = await dtos.construction.execListInvitationByProjectIdQuery({
        constructionProjectId: projectId,
        contextType: T.create(context, enums.RoleInCompany.castToExternal),
    });

    if (!res || !res.result) {
        return [];
    }

    return res.result.map(item => InvitedCompany.create({
        id: stores.idCollection.getInternal('invitedCompany', item.id),
        companyId: item.companyId,
        companyName: item.companyName,
        companyNumber: item.phoneNumber,
        ownerName: item.ownerName,
        companyType: T.create(item.companyType, enums.RoleInCompany.castToInternal),
        invitationStatus: T.create(item.invitationStatus, enums.InvitationStatus.castToInternal),
        invitationDate: T.create(item.invitationDate, T.Timestamp),
    }));
};
