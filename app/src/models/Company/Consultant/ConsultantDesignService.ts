import { types, type Instance } from 'mobx-state-tree';
import { MstType, utils } from '~/api';
import { stores } from '~/stores';

export type ConsultantDesignServiceType = Instance<typeof ConsultantDesignService>;

export const ConsultantDesignService = types
    .model({
        id: stores.idCollection.getIdentifier('service'),

        landSizeFrom: MstType.number,

        landSizeTo: MstType.number,

        price: MstType.number,

        serviceUnits: types.array(types.number),

        consultantId: MstType.number,
    })
    .actions(self => ({
        setLandSizeFrom: (value: string) => {
            self.landSizeFrom = utils.fromInputNumber(value);
        },

        setLandSizeTo: (value: string) => {
            self.landSizeTo = utils.fromInputNumber(value);
        },

        setPrice: (value: string) => {
            self.price = utils.fromInputNumber(value);
        },
    }))
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('service', self.id);
        },
    }));
