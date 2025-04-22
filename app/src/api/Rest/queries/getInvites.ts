import { stores } from '~/stores';
import { dtos } from '..';
import { Invite } from '~/models';
import { Img } from '~/api/Img';

export const getInvites = async () => {
    const res = await dtos.profile.execListCompanyInvitationByUserQuery(undefined);

    if (!res || !res.result) {
        return [];
    }

    return res.result.map(item => Invite.create({
        id: stores.idCollection.getInternal('invite', item.id),
        companyId: item.companyId,
        companyName: item.companyName,
        phone: item.phone,
        avatar: Img.tryCreate(item.iconId),
        isChangePartnerToOwner: item.isChangePartnerToOwner,
    }));
};
