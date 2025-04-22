import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';
import { stores } from '~/stores';

export type SubjectInformationType = Instance<typeof SubjectInformation>;

export const SubjectInformation = types
    .model({
        id: stores.idCollection.getIdentifier('subject'),

        name: MstType.string,

        phone: MstType.string,

        email: MstType.string,

        fileId: MstType.string,

        avatar: MstType.Img,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('subject', self.id);
        },
    }));
