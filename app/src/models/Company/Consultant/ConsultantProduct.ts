import { types } from 'mobx-state-tree';
import { MstType } from '~/api';
import { stores } from '~/stores';
import { toRates } from '~/utils/string';

export const ConsultantProduct = types
    .model({
        id: stores.idCollection.getIdentifier('product'),

        isChecked: MstType.boolean,

        price: MstType.string,

        productId: MstType.number,

        consultantId: MstType.number,

        name: MstType.string,
    })
    .actions(self => ({
        toggleIsChecked: () => {
            self.isChecked = !self.isChecked;
        },

        setPrice: (value: string) => {
            self.price = toRates(value);
        },
    }))
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('product', self.id);
        },
    }));
