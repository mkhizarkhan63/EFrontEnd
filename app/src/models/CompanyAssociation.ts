import { types } from 'mobx-state-tree';
import { MstType, E } from '~/api';
import { stores } from '~/stores';

export const CompanyAssociation = types
    .model({
        id: stores.idCollection.getIdentifier('companyAssociation'),
        name: MstType.string,
        companyLogo: MstType.Img,
        affiliationType: types.enumeration<E.AffiliationType>(
            'AffiliationType', Object.values(E.AffiliationType),
        ),
        profileType: types.enumeration<E.ProfileType>(
            'ProfileType', Object.values(E.ProfileType),
        ),
        status: types.enumeration<E.CompaniesStatus>(
            'CompaniesStatus', Object.values(E.CompaniesStatus),
        ),
        linkedProfileStatus: types.enumeration<E.LinkedProfileStatus>(
            'LinkedProfile', Object.values(E.LinkedProfileStatus),
        ),
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('companyAssociation', self.id);
        },
    }));
