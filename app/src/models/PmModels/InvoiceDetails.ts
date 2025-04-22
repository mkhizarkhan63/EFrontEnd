import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';
import { Actor } from './UserTask';
import { Company } from '../Company';

export type InvoiceDetailsType = Instance<typeof InvoiceDetails>;

export const InvoiceDetails = types.model({
    payer: Actor,
    payee: Company,
    description: types.string,
    projectValue: MstType.number,
    stageValue: MstType.number,
    subtotal: MstType.number,
    taxPercentage: MstType.number,
    taxTotal: MstType.number,
    grandTotal: MstType.number,
    dueDate: MstType.MaybeMoment,
    projectId: MstType.number,
    invoiceId: MstType.number,
    invoiceDateIssued: MstType.MaybeMoment,
    isRefund: MstType.boolean,
    isPenalty: MstType.boolean,
    penaltySubtotal: MstType.number,
    refundSubtotal: MstType.number,
    isVatApplied: false,
}).actions(self => ({
    switchVatApplied() {
        self.isVatApplied = !self.isVatApplied;
    },
}));
