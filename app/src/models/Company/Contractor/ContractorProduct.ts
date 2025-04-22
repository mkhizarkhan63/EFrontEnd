import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';
import { stores } from '~/stores';

export type ContractorProductType = Instance<typeof ContractorProduct>;

export const ContractorProduct = types
    .model({
        id: stores.idCollection.getIdentifier('product'),

        productUnitId: MstType.number,

        contractorId: MstType.number,

        other: MstType.string,
    });
