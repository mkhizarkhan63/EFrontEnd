import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';
import { SowItemUnit } from './SowItemUnit';

export type PmSowItemType = Instance<typeof PmSowItem>;

export const PmSowItem = types
    .model({
        id: stores.idCollection.getIdentifier('sowItemDto'),
        orderNumber: MstType.number,
        englishName: types.maybe(types.string),
        arabicName: types.maybe(types.string),
        showItemInFrontend: MstType.boolean,
        isMandatory: MstType.boolean,
        numberOfSpecs: MstType.number,
        numberOfWorkflows: MstType.number,
        consultantVisits: MstType.number,
        icon: MstType.Img,
        category: types.optional(
            types.enumeration<E.SowItemCategory>(
                'ActorType',
                Object.values(E.SowItemCategory),
            ),
            E.SowItemCategory.none,
        ),
        versionId: MstType.number,
        itemUnits: types.array(SowItemUnit),
        itemVisibility: types.optional(
            types.enumeration<E.SowItemVisibility>(
                'ActorType',
                Object.values(E.SowItemVisibility),
            ),
            E.SowItemVisibility.none,
        ),
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('sowItemDto', self.id);
        },
    }));
