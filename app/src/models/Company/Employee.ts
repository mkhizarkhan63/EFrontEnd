import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';

export type EmployeeType = Instance<typeof Employee>;

export const Employee = types
    .model({
        id: stores.idCollection.getIdentifier('employee'),

        userId: MstType.number,

        name: MstType.string,

        phone: MstType.string,

        email: MstType.string,

        avatar: MstType.Img,

        affiliationType: types.optional(
            types.enumeration<E.AffiliationType>('AffiliationType', Object.values(E.AffiliationType)),
            E.AffiliationType.none,
        ),

        status: types.optional(
            types.enumeration<E.LinkedProfileStatus>('Status', Object.values(E.LinkedProfileStatus)),
            E.LinkedProfileStatus.none,
        ),
    })
    .actions(self => ({
        setAffiliation: (type: E.AffiliationType) => {
            self.affiliationType = type;
        },

        accept: () => {
            self.status = E.LinkedProfileStatus.approved;
        },
    }))
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('employee', self.id);
        },
    }));
