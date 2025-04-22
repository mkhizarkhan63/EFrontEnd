import { types, type Instance } from 'mobx-state-tree';
import type { Moment } from 'moment';
import { MstType } from '~/api';
import { FileDataBase, type FileDataType } from '~/models';

export type PaymentBlockType = Instance<typeof PaymentBlock>;

export const PaymentBlock = types
    .model({
        stageNumber: MstType.number,
        stageValue: MstType.number,
        stageSubTotal: MstType.number,
        isPenaltyAvailable: MstType.boolean,
        penaltyPercentage: MstType.number,
        penaltySubtotal: MstType.number,
        taxPercentage: MstType.number,
        taxTotal: MstType.number,
        grandTotal: MstType.number,
        isRefundAvailable: MstType.boolean,
        bidValue: MstType.number,
        refundSubtotal: MstType.number,
        refundPercentage: MstType.number,
        //local below
        dateOfPayment: MstType.MaybeMoment,
        attachments: types.optional(types.array(FileDataBase), []),
        currentPenalty: MstType.number,
        currentTax: MstType.number,
        currentGrandTotal: MstType.number,
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

        setPenalty: (penalty: number) => {
            self.currentPenalty = penalty;
        },
    })).views(self => ({
        get penaltyOrRefundSubtotal() {
            if (self.isPenaltyAvailable) {
                return self.bidValue / 100 * self.currentPenalty;
            }

            return self.refundSubtotal;
        },

        get displayedTax() {
            if (self.isPenaltyAvailable) {
                return (self.stageValue - this.penaltyOrRefundSubtotal) * 0.05;
            }

            if (self.isRefundAvailable) {
                return (self.stageValue + this.penaltyOrRefundSubtotal) * 0.05;
            }

            return self.taxTotal;
        },

        get displayedGrand() {
            if (self.isPenaltyAvailable) {
                return self.stageValue - this.penaltyOrRefundSubtotal + this.displayedTax;
            }

            if (self.isRefundAvailable) {
                return self.stageValue + this.penaltyOrRefundSubtotal + this.displayedTax;
            }

            return self.grandTotal;
        },
    }));
