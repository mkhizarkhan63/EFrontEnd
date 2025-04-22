import { action } from 'mobx';
import { E, lang, utils } from '~/api';
import { type DesignOptionType } from '~/models';
import { stores } from '~/stores';

export class DesignListingsVm {
    localFilters = {
        initialized: true,
        price: undefined as number | undefined,
        liked: undefined as boolean | undefined,
        buildUpArea: undefined as number | undefined,
        propertyType: undefined as E.PropertyType | undefined,
        bedrooms: 0,
        name: '',
    };

    constructor() {
        makeSafeObservable(this, {
            changeNameFilter: action,
        });

        stores.designs.clearFilters();
        stores.designs.initializeFilters();
        stores.designs.architects.clear();
    }

    get designList() {
        return stores.designs.designs;
    }

    get listCount() {
        return stores.designs.designCount;
    }

    get filters() {
        return stores.designs.filters;
    }

    get likedCount() {
        return stores.designs.likedCount;
    }

    get name() {
        return stores.designs.filters.name;
    }

    get buildUpArea() {
        if (!this.localFilters.buildUpArea) {
            return '';
        }

        return utils.toInputNumber(this.localFilters.buildUpArea);
    }

    get price() {
        if (!this.localFilters.price) {
            return '';
        }

        return utils.toInputNumber(this.localFilters.price);
    }

    get projectTypeValues() {
        return Object.values(E.PropertyType).map(item => ({
            name: lang.dict.get(item),
            value: item,
            isVisible: item === E.PropertyType.none,
        }));
    }

    openDesign = (id?: number) => {
        if (!id) {
            return;
        }

        stores.display.registerBackFrom(
            'buy',
            () => stores.display.router.$.buy.go({}),
        );

        stores.designs.openDesign(id);
    };

    setCardLiked = (item: DesignOptionType) => {
        (async () => {
            const res = await stores.designs.postLiked(item);

            if (!res) {
                return;
            }

            stores.designs[`${item.liked ? 'decrease' : 'increase'}LikedCount`]();

            item.toggleLiked();

            if (stores.designs.filters.liked) {
                stores.designs.designs.remove(item);
                stores.designs.decreaseDesignCount();
            }
        })();
    };

    openCompanyProfile = (id?: number) => {
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
        stores.designs.setNameFilter(value);
    };

    changePriceFilter = (value: string) => {
        this.localFilters.price = utils.fromInputNumber(value);
    };

    changePropertyTypeFilter = (value: E.PropertyType) => {
        this.localFilters.propertyType = value;
    };

    changeBedroomsFilter = (value: number) => {
        this.localFilters.bedrooms = utils.fromInputNumber(value);
    };

    changeBuildUpAreaFilter = (value: string) => {
        this.localFilters.buildUpArea = utils.fromInputNumber(value);
    };

    clearFilters = () => {
        this.localFilters = {
            initialized: true,
            price: undefined,
            liked: undefined,
            buildUpArea: undefined,
            propertyType: undefined,
            bedrooms: 0,
            name: this.localFilters.name,
        };

        stores.designs.setFilters({
            initialized: true,
            price: undefined,
            liked: undefined,
            buildUpArea: undefined,
            propertyType: undefined,
            bedrooms: 0,
            name: '',
        });
    };

    submitFilters = () => {
        stores.designs.setFilters(this.localFilters);
    };
}
