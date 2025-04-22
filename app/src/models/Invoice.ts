import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';

export type InvoiceType = Instance<typeof Invoice>;

export const Invoice = types
    .model({
        id: stores.idCollection.getIdentifier('invoice'),

        invoiceNumber: types.number,

        description: types.string,

        dateOfPayment: MstType.Moment,

        price: types.number,

        status: types.enumeration<E.InvoiceStatus>('InvoiceStatus', Object.values(E.InvoiceStatus)),
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('invoice', self.id);
        },
    }));
