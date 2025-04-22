import { cast, types, type Instance } from 'mobx-state-tree';
import { E, lang, MstType, utils } from '~/api';
import { stores } from '~/stores';
import { Company } from '../Company';
import { ConsultantDesignService } from './ConsultantDesignService';
import { ConsultantGovernorate } from './ConsultantGovernorate';
import { ConsultantProduct } from './ConsultantProduct';

export type ConsultantType = Instance<typeof Consultant>;

export const Consultant = types
    .compose(
        Company,
        types
            .model({
                services: types.array(ConsultantDesignService),

                products: types.array(ConsultantProduct),

                governorates: types.array(ConsultantGovernorate),

                everyDesignPackageSize: MstType.number,

                everyDesignPackagePrice: MstType.number,

                isProvideDesign: MstType.boolean,

                isProvideSupervision: MstType.boolean,

                totalVisits: MstType.number,

                numberOfEngineers: MstType.number,

                numberOfServices: MstType.number,

                pricePerSquareMeter: MstType.number,

                templateTimeOfProject: MstType.number,

                pricePerVisits: MstType.number,

                isInvited: MstType.boolean,
            }),
    )
    .views(self => ({
        get areYouAtOrganizations() {
            return [
                {
                    name: lang.dict.get('organizationOmanHousingBank'),
                    targetValue: E.Organization.omanHousingBank,
                },
                {
                    name: lang.dict.get('organizationOmanTenderBoard'),
                    targetValue: E.Organization.omanTenderBoard,
                },
                {
                    name: lang.dict.get('omanSocietyEngineers'),
                    targetValue: E.Organization.omanSocietyOfEngineers,
                },
                {
                    name: lang.dict.get('organizationOthers'),
                    targetValue: E.Organization.others,
                },
            ].map(item => ({
                id: item.targetValue,
                name: item.name,
                value: self.registeredAt.some(x => x.organization === item.targetValue),
            }));
        },

        get governoratesList() {
            return stores.locations.governorates
                .map(item => ({
                    value: item.id,
                    name: item.displayName,
                    isVisible: self.governorates.some(x => x.governorateId?.isEqual(item.id)),
                }));
        },

        get servicesPrice() {
            return self.services.reduce((prev, cur) => cur.price + prev, 0);
        },

        get landTo() {
            return self.services.reduce((prev, cur) => cur.landSizeTo + prev, 0);
        },

        get namesAndIconsOfServices() {
            const servicesPrice = self.services.reduce((prev, cur) => cur.price + prev, 0);

            if (servicesPrice === 0) {
                return [];
            }

            return stores.contractors.dicts.data.designServiceUnits.map(x => ({
                name: x.displayName,
                icon: x.iconPath,
            }));
        },

        get namesAndIconsOfProducts() {
            const pUnits = stores.contractors.dicts.data.consultantProductUnit;
            return self.products
                .filter(item => item.isChecked)
                .map(item => [item, pUnits.find(x => x.id.isEqual(item.productId))] as const)
                .map(([item, unit]) => ({
                    name: unit?.displayName,
                    icon: unit?.iconPath,
                    price: item.price,
                }));
        },

        get supervisionMinMaxPrice() {
            const allPrices = self.governorates.flatMap(item => item.wilayatPrices);

            if (allPrices.length === 0) {
                return { min: 0, max: 0 };
            }

            const min = Math.min(...allPrices);
            const max = Math.max(...allPrices);

            return { min, max };
        },

        get namesOfProducts() {
            const pUnits = stores.contractors.dicts.data.consultantProductUnit;

            return self.products
                .map(item => pUnits.find(x => x.id.isEqual(item.productId))?.displayName)
                .filter((x): x is string => x !== undefined);
        },

        get namesOfServices() {
            const sUnits = stores.contractors.dicts.data.designServiceUnits;

            return self.services
                .map(item => sUnits.find(x => x.id.isEqual(item.id))?.displayName)
                .filter((x): x is string => x !== undefined);
        },
    }))
    .actions(self => ({
        removeService: (id: number) => {
            self.services = cast(self.services.filter(item => item.id !== id));
        },

        addService: () => {
            self.services.push(ConsultantDesignService.create({}));
        },

        setEveryPrice: (value: string) => {
            self.everyDesignPackagePrice = utils.fromInputNumber(value);
        },

        setEverySize: (value: string) => {
            self.everyDesignPackageSize = utils.fromInputNumber(value);
        },

        setIsProvideDesign: (value: boolean) => {
            self.isProvideDesign = value;

            if (value && self.services.length === 0) {
                self.services = cast([ConsultantDesignService.create()]);
            }
        },

        setIsProvideSupervision: (value: boolean) => {
            self.isProvideSupervision = value;

            if (value && self.governorates.length === 0) {
                self.governorates = cast([ConsultantGovernorate.create()]);
            }
        },

        addEmptyGovernorate: () => {
            self.governorates.push(ConsultantGovernorate.create());
        },

        removeGovernorate: (id: number) => {
            self.governorates = cast(self.governorates.filter(item => item.id !== id));
        },

        addProduct: (productId: number) => {
            self.products.push(ConsultantProduct.create({ productId, isChecked: true }));
        },

        setInvited: (value: boolean) => {
            self.isInvited = value;
        },
    })).views(self => ({
        get supervisionServicePrice() {
            if (self.governorates.length === 0) {
                return '';
            }

            const { min, max } = self.supervisionMinMaxPrice;

            if (!min && !max) {
                return '';
            }

            if (min === max) {
                return min.toString();
            }

            return `${min} - ${max}`;
        },
    }));
