import { E, utils, type Id } from '~/api';
import type { ArchitectListItemType } from '~/models';
import { stores } from '~/stores';

type StarsValue = {
    key: keyof typeof E.StarsLabel;
    value: number;
};

export class ArchitectListingsVm {
    starsValues: StarsValue[] = [
        { key: 'management', value: 0 },
        { key: 'qualityOfWorks', value: 0 },
        { key: 'recommendation', value: 0 },
        { key: 'speedOfWorks', value: 0 },
        { key: 'communication', value: 0 },
        { key: 'cooperation', value: 0 },
    ];

    localFilters = {
        name: '',
        governorate: undefined as number | undefined,
        products: [] as number[],
        maxBudget: undefined as number | undefined,
        averageRating: 0,
    };

    constructor() {
        makeSafeObservable(this);
    }

    get architectsList() {
        return stores.designs.architects;
    }

    get maxBudget() {
        if (!this.localFilters.maxBudget) {
            return '';
        }

        return utils.toInputNumber(this.localFilters.maxBudget);
    }

    get filters() {
        return stores.designs.filters;
    }

    get likedCount() {
        return stores.designs.likedArchitectCount;
    }

    get listOfDesignServices() {
        return stores.contractors.dicts.data.designServiceUnits.map(x => ({
            id: x.id,
            name: x.displayName,
            iconPath: x.iconPath,
        }));
    }

    get allServices() {
        return stores.contractors.dicts.data.consultantProductUnit.map(x => ({
            id: x.id.asNumber(),
            name: x.displayName,
            value: this.localFilters.products.includes(x.id.asNumber()),
        }));
    }

    get name() {
        return stores.designs.architectFilters.name;
    }

    get governorates() {
        return stores.locations.governorates
            .map(item => ({
                name: item.displayName,
                value: item.id.asNumber(),
                isDisplayed: false,
            }));
    }

    get starsList() {
        return [
            {
                key: E.ReviewStars.communication,
                value: this.localFilters.averageRating,
            },
        ];
    }

    getListOfProductsService = (item: ArchitectListItemType) => stores.contractors.dicts.data.consultantProductUnit.map(x => ({
        id: x.id,
        name: x.displayName,
        iconPath: x.iconPath,
    })).filter(product => item.products.includes(product.id.asNumber()));

    getGovernorateName = (id: Id) => stores.locations.governorates.find(item => item.id.isEqual(id))?.displayName;

    openCompanyProfile = (id?: number, previous = false) => {
        if (previous) {
            stores.display.registerBackFrom(
                'previous',
                () => console.log('ok'),
            );
        }

        if (!id) {
            return;
        }

        stores
            .display
            .router
            .$.context
            .$.details
            .go({
                id,
                type: E.RoleInCompany.consultant,
            });
    };

    setLiked = () => stores.designs.setLikedFilter();

    changeNameFilter = (value: string) => {
        stores.designs.setArchitectNameFilter(value);
    };

    changeBudgetFilter = (value: string) => {
        this.localFilters.maxBudget = utils.fromInputNumber(value);
    };

    submitFilters = () => {
        stores.designs.setArchitectFilters(this.localFilters);
    };

    clearFilters = () => {
        this.localFilters = {
            name: this.localFilters.name,
            averageRating: 0,
            governorate: undefined,
            maxBudget: undefined,
            products: [],
        };

        stores.designs.setArchitectFilters({
            averageRating: 0,
            governorate: undefined,
            products: [],
            maxBudget: undefined,
            name: '',
        });
    };

    changeGovernorateFilter = (value: number) => {
        this.localFilters.governorate = value;
    };

    setServices = (value: number) => {
        const products = this.localFilters.products;

        if (products.includes(value)) {
            this.localFilters.products = products.filter(item => item !== value);
            return;
        }

        this.localFilters.products.push(value);
    };

    setStars = (value: number) => {
        this.localFilters.averageRating = value;
    };
}
