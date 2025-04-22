import { types, type Instance } from 'mobx-state-tree';
import { E, lang, MstType } from '~/api';
import { stores } from '~/stores';

export type CompanyAssociationType = Instance<typeof CompanyAssociationSearch>;

export const CompanyAssociationSearch = types
    .model({
        id: stores.idCollection.getIdentifier('companyAssociation'),
        name: MstType.string,
        companyLogo: MstType.Img,
        profileType: types.enumeration<E.RoleInCompany>(
            'ProfileType', Object.values(E.RoleInCompany),
        ),
        status: types.enumeration<E.CompaniesStatus>(
            'Company Status', Object.values(E.CompaniesStatus),
        ),
        category: types.enumeration<E.AffiliationType>(
            'Company Category', Object.values(E.AffiliationType),
        ),
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('companyAssociation', self.id);
        },

        get companyCategory() {
            const disallowedKeys = [
                'none',
                'owner',
                self.profileType === E.RoleInCompany.contractor ? 'architect' : false,
            ];

            return Object.entries(E.AffiliationType)
                .filter(([id]) => !disallowedKeys.includes(id))
                .map(arr => arr[1])
                .map(value => ({
                    id: value,
                    name: lang.dict.enum('affiliationType', value),
                    value: self.category === value,
                }));
        },
    }))
    .actions(self => ({
        setCategory: (id: E.AffiliationType) => {
            self.category = id;
        },
    }));
