import { action } from 'mobx';
import { Id, E, restQuery, restClient } from '~/api';
import { stores } from '~/stores';
import type { ProfileInCompany, FileDataType } from '~/models';

type ProfileMode = {
    id: number;
    mode: E.SpecialProfileMode;
    projectId: number;
};

export class Profile {
    id = Id.init();

    avatar?: FileDataType;

    name?: string;

    mainRole?: E.RoleInCompany;

    profilesInCompanies: ProfileInCompany[] = [];

    defaultCompany?: ProfileInCompany;

    selectedCompany?: ProfileInCompany;

    email?: string;

    phone?: string;

    profileModes?: ProfileMode[];

    redirectToInvitations?: boolean;

    constructor() {
        makeSafeObservable(this, {
            selectCompany: action,
            goCompanyRegister: action,
            changeMainRole: action,
            updateProfileInfo: action,
            addCompany: action,
        });
    }

    get role() {
        return this.selectedCompany?.role ?? E.RoleInCompany.client;
    }

    get isInvited() {
        if (!this.profileModes) {
            return false;
        }

        return this.profileModes?.length > 0;
    }

    addCompany = (company: ProfileInCompany) => {
        this.profilesInCompanies.push(company);
    };

    updateProfileInfo = (
        name: string,
        email: string,
        avatar?: FileDataType,
    ) => {
        this.name = name;
        this.email = email;
        this.avatar = avatar;
    };

    changeMainRole = (id: Id) => {
        (async () => {
            const newContext = this.profilesInCompanies.find(item => item.id.isEqual(id));
            const result = await restQuery.updateProfileRole(newContext?.id.asNumber());

            if (!result || !result.isSuccess) {
                return;
            }

            this.mainRole = newContext?.role;
            this.defaultCompany = newContext;
        })();
    };

    openProjects = (id?: Id) => {
        const toSelect = id instanceof Id ? id : undefined;
        this.selectCompany(toSelect);
        stores
            .display
            .router
            .$.home
            .go({});
    };

    openSettings = (id?: Id) => {
        const toSelect = id instanceof Id ? id : undefined;
        this.selectCompany(toSelect);
        this.goSettings();
    };

    selectCompany = (id?: Id) => {
        const oldContext = this.selectedCompany?.role;

        const profile = this.profilesInCompanies.find(x => x.id.isEqual(id));

        profile?.loadStatus();
        this.selectedCompany = profile;

        restClient.setId(id?.asNumber());
        restClient.setType(this.selectedCompany?.role);
        restClient.setContextId(this.selectedCompany?.contextId.asNumber());

        if (stores.profile.initialized) {
            stores.profile.loadProfileContext();
        }

        if (oldContext !== this.selectedCompany?.role) {
            return;
        }

        if (this.selectedCompany?.role === E.RoleInCompany.consultant) {
            stores.projects.consultantMyProjects.reload();
        }

        if (this.selectedCompany?.role === E.RoleInCompany.contractor) {
            stores.projects.contractorMyProjects.reload();
        }
    };

    goSettings = () => {
        if (stores.display.router.$.settings.match) {
            stores.display.router.reload();
            return;
        }
        stores.display.router.$.settings.go({ tab: 'general' });
    };

    goCompanyRegister = () => {
        if (stores.display.router.$.company.$.register.match) {
            stores.display.router.reload();
            return;
        }

        stores.display.router.$.company.$.register.go({});
    };

    disableRedirectToInvitations = () => {
        this.redirectToInvitations = false;
    };
}
