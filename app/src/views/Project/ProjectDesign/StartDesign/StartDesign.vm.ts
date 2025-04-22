import { action } from 'mobx';
import { E, lang, type restQuery, type Id } from '~/api';
import type { MenuButton } from '~/bits';
import type { DesignOptionType, Project } from '~/models';
import { stores } from '~/stores';

export class StartDesignVm {
    landTypes = [
        {
            value: E.ConstructionLand.residential,
            name: lang.dict.get('landTypeResidential'),
        },
        {
            value: E.ConstructionLand.commercial,
            name: lang.dict.get('landTypeCommercial'),
        },
    ];

    currentPage = E.DesignListingMenu.designListings;

    initialLoaded = false;

    get designList() {
        return stores.designs.designs;
    }

    get architectsList() {
        return stores.designs.architects;
    }

    constructor(public project: Project) {
        makeSafeObservable(this, {
            goBack: false,
            openCompanyProfile: false,
            openDesign: false,
            changePage: action,
        });

        stores.designs.clearFilters();
        stores.designs.initializeFilters();
        stores.designs.architects.clear();
    }

    get menuItems(): Array<MenuButton<E.DesignListingMenu>> {
        return [
            {
                value: E.DesignListingMenu.designListings,
                name: lang.dict.enum('designListingMenu', E.DesignListingMenu.designListings),
                onClick: () => this.changePage(E.DesignListingMenu.designListings),
            },
            {
                value: E.DesignListingMenu.architectListings,
                name: lang.dict.enum('designListingMenu', E.DesignListingMenu.architectListings),
                onClick: () => this.changePage(E.DesignListingMenu.architectListings),
            },
        ];
    }

    get isLoading() {
        if (this.initialLoaded) {
            return false;
        }

        const status = this.designList.status.isWorking;

        if (!status) {
            this.initialLoaded = true;
        }

        return status;
    }

    get listCount() {
        return stores.designs.designCount;
    }

    get likedCount() {
        return stores.designs.likedCount;
    }

    get filters() {
        return stores.designs.filters;
    }

    get price() {
        return this.filters.price;
    }

    getGovernorateName = (id: Id) => stores.locations.governorates.find(item => item.id.isEqual(id))?.displayName;

    isMenuItemActive = (page: E.DesignListingMenu) => page === this.currentPage;

    changePage = (page: E.DesignListingMenu) => {
        this.currentPage = page;
    };

    openDesign = (id?: number) => {
        if (!id) {
            return;
        }

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

    setLiked = () => stores.designs.setLikedFilter();

    getDesignCount = (filter: restQuery.design.DesignFilters) => stores.designs.getDesignCount(filter);

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

    goBack = () => {
        history.back();
    };
}
