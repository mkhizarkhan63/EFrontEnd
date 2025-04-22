import { types, type Instance } from 'mobx-state-tree';
import { stores } from '~/stores';
import { E, MstType } from '~/api';

export type OrganizationType = Instance<typeof Organization>;

export const Organization = types
    .model({
        id: stores.idCollection.getIdentifier('organization'),

        companyId: MstType.number,

        organization: types.optional(
            types.enumeration<E.Organization>('Organization', Object.values(E.Organization)),
            E.Organization.none,
        ),

        otherOrganization: MstType.string,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('organization', self.id);
        },
    }));
