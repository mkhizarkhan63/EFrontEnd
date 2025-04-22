import { action } from 'mobx';
import { LazyModelScroller, restQuery, type E } from '~/api';
import type { DesignOptionType } from '~/models';
import { stores } from '.';
import { deepReaction } from '~/utils';

type FilterType = {
    initialized: boolean;
    price?: number;
    bedrooms: number;
    liked?: boolean;
    name?: string;
    buildUpArea?: number;
    propertyType?: E.PropertyType;
};

type ArchitectFilter = {
    name?: string;
    governorate?: number;
    maxBudget?: number;
    products: number[];
    averageRating: number;
};

export class Designs {
    filters: FilterType = {
        initialized: false,
        price: undefined,
        liked: undefined as boolean | undefined,
        name: undefined as string | undefined,
        buildUpArea: undefined,
        propertyType: undefined as E.PropertyType | undefined,
        bedrooms: 0,
    };

    architectFilters: ArchitectFilter = {
        name: undefined as string | undefined,
        governorate: undefined,
        maxBudget: undefined,
        products: [],
        averageRating: 0,
    };

    designs = new LazyModelScroller(
        'Design Options',
        paging => restQuery.design.get(paging, this.filters),
        3,
        undefined,
        id => restQuery.design.getDesign(id),
    );

    architects = new LazyModelScroller(
        'Architects',
        paging => restQuery.design.getArchitects(paging, this.architectFilters),
        12,
    );

    designCount = 0;

    likedCount = 0;

    likedArchitectCount = 0;

    constructor() {
        makeSafeObservable(this, {
            openDesign: false,
            clearFilters: action,
            setLikedFilter: action,
            resetPaging: action,
            initializeFilters: action,
            setCounters: action,
            increaseLikedCount: action,
            decreaseLikedCount: action,
            decreaseDesignCount: action,
            setArchitectNameFilter: action,
            setNameFilter: action,
        });

        deepReaction(
            () => this.filters.name,
            () => this.resetPaging(),
        );

        deepReaction(
            () => this.architectFilters.name,
            () => this.resetArchitectPaging(),
        );
    }

    resetPaging = async () => {
        this.designs.clear();
        const count = await this.getDesignCount(this.filters);
        this.setCounters(count);
    };

    resetArchitectPaging = () => {
        this.architects.clear();
    };

    initializeFilters = () => {
        this.filters.initialized = true;
        this.resetPaging();
    };

    setLikedFilter = () => {
        this.filters.liked = this.filters.liked ? undefined : true;
        this.resetPaging();
    };

    setNameFilter = (name: string) => {
        this.filters.name = name;
    };

    setFilters = (filters: FilterType) => {
        this.filters = {
            initialized: true,
            price: filters.price,
            liked: filters.liked,
            name: this.filters.name,
            buildUpArea: filters.buildUpArea,
            propertyType: filters.propertyType,
            bedrooms: filters.bedrooms,
        };

        this.resetPaging();
    };

    setArchitectFilters = (filters: ArchitectFilter) => {
        this.architectFilters = {
            averageRating: filters.averageRating,
            name: this.architectFilters.name,
            governorate: filters.governorate,
            products: filters.products,
            maxBudget: filters.maxBudget,
        };

        this.resetArchitectPaging();
    };

    clearArchitectFilters = () => {
        this.architectFilters = {
            averageRating: 0,
            name: this.architectFilters.name,
            governorate: undefined,
            products: [],
            maxBudget: undefined,
        };
    };

    clearFilters = () => {
        this.filters = {
            initialized: false,
            price: undefined,
            liked: undefined,
            name: undefined,
            buildUpArea: undefined,
            propertyType: undefined,
            bedrooms: 0,
        };
    };

    openDesign = (designId: number) => {
        stores.display.router.$.design.go({ designId });
    };

    setCounters = (count: restQuery.design.DesignCounters) => {
        this.designCount = count.designCount;
        this.likedCount = count.likedCount;
    };

    increaseLikedCount = () => {
        this.likedCount += 1;
    };

    decreaseLikedCount = () => {
        this.likedCount -= 1;
    };

    decreaseDesignCount = () => {
        this.designCount -= 1;
    };

    getDesignCount = async (filter: restQuery.design.DesignFilters) => await restQuery.design.getDesignCountForFilter(filter);

    postLiked = async (item: DesignOptionType) => await restQuery.design.like(item.externalId);

    setArchitectNameFilter = (name: string) => {
        this.architectFilters.name = name;
    };
}
