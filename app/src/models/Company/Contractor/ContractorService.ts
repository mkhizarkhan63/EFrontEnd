import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';
import { stores } from '~/stores';

export type ContractorServiceType = Instance<typeof ContractorService>;

export const ContractorService = types
    .model({
        id: stores.idCollection.getIdentifier('service'),

        other: MstType.string,

        serviceName: MstType.string,

        serviceUnitId: MstType.number,

        contractorId: MstType.number,
    });
