import { stores } from '~/stores';
import { dtos } from '..';
import { Invite } from '~/models';
import { Img } from '~/api/Img';

export const getCompanyInvites = async (companyId: number) => {
    const res = await dtos.profile.execListCompanyInvitationByCompanyIdQuery({ companyId });

    if (!res || !res.result) {
        return [];
    }

    return res.result.map(item => Invite.create({
        id: stores.idCollection.getInternal('companyInvite', item.id),
        companyId: item.companyId,
        companyName: item.companyName,
        phone: item.phone,
        avatar: Img.tryCreate(item.iconId),
        isChangePartnerToOwner: item.isChangePartnerToOwner,
    }));
};
