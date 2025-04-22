import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';
import { stores } from '~/stores';

export type UserType = Instance<typeof User>;

export const User = types
    .model({
        id: stores.idCollection.getIdentifier('user'),

        name: MstType.string,

        nameInArabic: MstType.string,

        nationalId: MstType.string,

        email: MstType.string,

        avatar: MstType.Img,

        mobile: MstType.string,

        companyAssociations: MstType.number,

        numberOfProjects: MstType.number,

        signedUp: MstType.Moment,

        lastActivity: MstType.Moment,

    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('user', self.id);
        },
    }))
    .actions(self => ({
        connect: (externalId: number) => {
            stores.idCollection.connect('user', self.id, externalId);
        },

        addCompanyAssociations: () => {
            self.companyAssociations += 1;
        },
    }));
