import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';

export type BankDetailsType = Instance<typeof BankDetails>;

export const BankDetails = types
    .model({
        bankName: MstType.string,
        accountHolderName: MstType.string,
        accountNumber: MstType.string,
    });
