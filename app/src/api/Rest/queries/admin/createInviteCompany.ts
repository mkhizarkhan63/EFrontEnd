import { dtos } from '~/api';
import type { InviteCompanyType } from '~/models';

export const createInviteCompany = async (invite: InviteCompanyType) => {
    const data = await dtos.contractor.execCreateCompanyInviteCommand({
        companyName: invite.companyName,
        email: invite.email,
        mobileNumber: invite.mobileNumber,
    });

    if (!data) {
        return false;
    }

    return data.notificationWasSent;
};
