import { type Instance, types } from 'mobx-state-tree';
import type { Moment } from 'moment';
import { MstType } from '~/api';
import { FileDataBase, type FileDataType } from '~/models';

export type PaymentType = Instance<typeof Payment>;

export const Payment = types
    .model({
        type: types.optional(types.literal('payment'), 'payment'),
        tax: MstType.number,
        grandTotal: MstType.number,
        dateOfPayment: MstType.MaybeMoment,
        attachments: types.optional(types.array(FileDataBase), []),
    }).actions(self => ({
        addAttachment: (item: FileDataType) => {
            item.loadImg();
            self.attachments.push(item);
        },

        removeAttachment: (item: FileDataType) => {
            self.attachments.remove(item);
        },

        setData: (data: Moment) => {
            self.dateOfPayment = data;
        },
    }));
