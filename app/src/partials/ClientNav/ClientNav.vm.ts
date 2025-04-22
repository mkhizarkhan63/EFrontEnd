import { makeAutoObservable } from 'mobx';
import { E } from '~/api';
import { stores } from '~/stores';

export class ClientNavVm {
    constructor() {
        makeAutoObservable(this, {});
    }

    get profile() {
        return stores.display.profile;
    }

    get role() {
        return stores.display.router.$.admin.match
            ? E.RoleInCompany.admin
            : this.profile.selectedCompany?.role ?? E.RoleInCompany.client;
    }

    get isOnBuild() {
        return stores.display.router.$.build.match;
    }

    get isOnBuy() {
        return stores.display.router.$.buy.match;
    }

    get isOnDesign() {
        return stores.display.router.$.clientDesign.match;
    }

    goCompanyRegister = () => {
        if (stores.display.router.$.company.$.register.match) {
            stores.display.router.reload();
            return;
        }

        stores.display.router.$.company.$.register.go({});
    };

    goDesign = () => stores
        .display
        .router.$
        .clientDesign
        .go({});

    goBuild = () => stores
        .display
        .router.$
        .build
        .go({});

    goBuy = () => stores
        .display
        .router.$
        .buy
        .go({});
}
