import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';
import { stores } from '~/stores';

export type InviteType = Instance<typeof Invite>;

export const Invite = types
    .model({
        id: stores.idCollection.getIdentifier('invite'),

        phone: MstType.string,

        companyId: MstType.number,

        companyName: MstType.string,

        avatar: MstType.Img,

        isChangePartnerToOwner: MstType.boolean,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('invite', self.id);
        },
    }));
