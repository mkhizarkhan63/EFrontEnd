import { dtos } from '..';

export const invitePartnerAsOwner = async (companyId?: number, userId?: number) => {
    const res = await dtos.profile.execInvitePartnerAsOwnerCommand({ companyId, userId });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
