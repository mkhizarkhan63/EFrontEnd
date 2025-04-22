import { types, type Instance } from 'mobx-state-tree';
import { stores } from '~/stores';
import { E, MstType } from '~/api';
import { generateObject } from '~/utils';

export type MarketingInformationType = Instance<typeof MarketingInformationBase>;

const MarketingInformationBase = types
    .model({
        id: stores.idCollection.getIdentifier('marketingInformation'),

        addressUrl: MstType.string,

        companyId: MstType.number,

        marketingService: types.optional(
            types.enumeration<E.MarketingService>('MarketingService', Object.values(E.MarketingService)),
            E.MarketingService.other,
        ),
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('marketingInformation', self.id);
        },
    }))
    .actions(self => ({
        setAddressUrl: (url: string) => {
            self.addressUrl = url;
        },
    }));

export const MarketingInformation = Object.assign(
    MarketingInformationBase,
    {
        createEmptyMarketing: () => generateObject(
            () => '',
            ...Object.values(E.MarketingService),
        ),
    },
);
