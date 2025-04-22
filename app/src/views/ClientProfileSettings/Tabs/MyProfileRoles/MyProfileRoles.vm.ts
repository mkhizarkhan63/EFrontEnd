import { makeAutoObservable } from 'mobx';
import type { Id } from '~/api';
import { ProfileInCompany } from '~/models';
import { stores } from '~/stores';

export class MyProfileRolesVm {
    constructor() {
        makeAutoObservable(this);
    }

    get profile() {
        return stores.profile.currentProfile;
    }

    get availableRoles() {
        return [ProfileInCompany.makeClient(), ...this.profile.profilesInCompanies];
    }

    isDefaultRole = (id: Id) => {
        if (!this.profile.defaultCompany && id.isNone()) {
            return true;
        }

        return id.isEqual(this.profile.defaultCompany?.id);
    };

    linkProfile = () => {
        /* */
    };

    editRole = (id: Id) => {
        id;
    };

    deleteRole = (id: Id) => {
        id;
    };

    changeDefaultRole = (role: Id) => {
        this.profile.changeMainRole(role);
    };
}
