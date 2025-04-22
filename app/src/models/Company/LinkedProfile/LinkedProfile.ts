import { types, type Instance } from 'mobx-state-tree';
import { stores } from '~/stores';
import { E, MstType } from '~/api';

export type LinkedProfileType = Instance<typeof LinkedProfile>;

export const LinkedProfile = types
    .model({
        id: stores.idCollection.getIdentifier('linkedProfile'),

        companyId: MstType.number,

        userId: MstType.number,

        affiliationType: types.optional(
            types.enumeration<E.AffiliationType>('AffiliationType', Object.values(E.AffiliationType)),
            E.AffiliationType.none,
        ),

        phone: MstType.string,

        status: types.optional(
            types.enumeration<E.LinkedProfileStatus>('Status', Object.values(E.LinkedProfileStatus)),
            E.LinkedProfileStatus.none,
        ),
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('linkedProfile', self.id);
        },
    }));
