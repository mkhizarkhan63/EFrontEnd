import { cast, types, type Instance } from 'mobx-state-tree';
import { MstType, utils, type Id } from '~/api';
import { stores } from '~/stores';

export type ConsultantGovernorateType = Instance<typeof ConsultantGovernorate>;

export const ConsultantGovernorate = types
    .model({
        id: stores.idCollection.getIdentifier('governorate'),

        consultantId: MstType.number,

        governorateId: types.maybe(MstType.Id),

        wilayatEntries: types.array(
            types.model({
                id: stores.idCollection.getId('wilayat'),
                wilayatId: types.maybe(MstType.Id),
                price: MstType.number,
            }),
        ),
    })
    .views(self => ({
        get wilayatPrices() {
            if (self.wilayatEntries.length === 0) {
                return [];
            }

            return self.wilayatEntries.map(item => item.price);
        },

        get listOfWilayats() {
            if (!self.governorateId) {
                return [];
            }

            return stores.locations.wilayats
                .filter(item => item.governorateId.isEqual(self.governorateId))
                .map(item => ({
                    name: item.displayName,
                    value: item.id,
                    isVisible: self.wilayatEntries.some(x => x.wilayatId?.isEqual(item.id)),
                }));
        },

        get externalId() {
            return stores.idCollection.getExternal('governorate', self.id);
        },

        isChecked: (index: number) => Boolean(self.wilayatEntries[index]),
    }))
    .actions(self => ({
        addWilayat: (wilayatId: Id, price: number) => {
            self.wilayatEntries.push({ wilayatId, price });
        },

        setGovernorateId: (id: Id) => {
            self.governorateId = id;
        },

        setPrice: (id: number, value: string) => {
            const item = self.wilayatEntries.find(x => x.id === id);

            if (!item) {
                return;
            }

            item.price = utils.fromInputNumber(value);
        },

        setIsChecked: (index: number, value: boolean) => {
            const wilayat = self.wilayatEntries[index];

            if (!wilayat && value) {
                self.wilayatEntries.push({});
                return;
            }

            self.wilayatEntries = cast(self.wilayatEntries.filter((item, i) => i !== index));
        },

        setWilayat: (id: number, wilayatId: Id) => {
            const item = self.wilayatEntries.find(x => x.id === id);

            if (!item) {
                return;
            }

            item.wilayatId = wilayatId;
        },
    }));
