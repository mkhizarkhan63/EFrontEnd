import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';

export type LogType = Instance<typeof Log>;

export const Log = types
    .model({
        id: stores.idCollection.getIdentifier('log'),
        description: MstType.string,
        descriptionArabic: MstType.string,
        date: MstType.Moment,
        accountType: types.maybe(
            types.enumeration<E.RoleInCompany>('AdminAccountType', Object.values(E.RoleInCompany)),
        ),
        user: MstType.string,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('review', self.id);
        },
    }));
