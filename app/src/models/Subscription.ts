import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';

export type SubscriptionType = Instance<typeof Subscription>;

export const Subscription = types
    .model({
        id: stores.idCollection.getIdentifier('subscription'),

        type: types.string,

        startDate: MstType.Moment,

        endDate: MstType.Moment,

        status: types.enumeration<E.SubscriptionStatus>('SubscriptionStatus', Object.values(E.SubscriptionStatus)),
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('subscription', self.id);
        },
    }));
