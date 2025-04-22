import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';
import { stores } from '~/stores';

export type SowItemUnitType = Instance<typeof SowItemUnit>;

export const SowItemUnit = types
    .model({
        id: stores.idCollection.getIdentifier('sowItemUnit'),
        englishDescription: types.maybe(types.string),
        arabicDescription: types.maybe(types.string),
        titleEnglish: types.maybe(types.string),
        titleArabic: types.maybe(types.string),
        supplier: types.maybe(types.string),
        rate: MstType.number,
        acceptanceWorkflow: MstType.number,
        itemId: MstType.number,
        orderNumber: MstType.number,
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('sowItemUnit', self.id);
        },
    }));
