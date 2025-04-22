import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';

export type InvitedCompanyType = Instance<typeof InvitedCompany>;

export const InvitedCompany = types
    .model({
        id: stores.idCollection.getIdentifier('invitedCompany'),

        companyId: MstType.number,

        companyType: types.enumeration<E.RoleInCompany>(
            'CompanyType', Object.values(E.RoleInCompany),
        ),

        companyName: MstType.string,

        companyNumber: MstType.string,

        ownerName: MstType.string,

        invitationStatus: types.enumeration<E.InvitationStatus>(
            'InvitationStatus', Object.values(E.InvitationStatus),
        ),

        invitationDate: MstType.Moment,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('invitedCompany', self.id);
        },
    }));
