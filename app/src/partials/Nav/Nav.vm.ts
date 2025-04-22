import { action, makeAutoObservable } from 'mobx';
import { auth, E, lang } from '~/api';
import { DropdownViewModel } from '~/bits';
import { stores } from '~/stores';

export class NavVm {
    isLanguagesCollapsed = false;

    isProfileCollapsed = false;

    dropdowns = {
        language: new DropdownViewModel(),
        help: new DropdownViewModel(),
        notifications: new DropdownViewModel(),
        profile: new DropdownViewModel(),
    };

    constructor() {
        makeAutoObservable(this, {
            dropdowns: false,
            resetDropdowns: action,
            setCurrentLanguage: action,
            toggleIsLanguagesCollapsed: action,
            toggleIsProfileCollapsed: action,
        });
    }

    get isClient() {
        return this.role === E.RoleInCompany.client;
    }

    get showNewProjects() {
        return [E.RoleInCompany.consultant, E.RoleInCompany.contractor].includes(this.role);
    }

    get showInvitations() {
        return stores.display.profile.isInvited;
    }

    get showInvites() {
        return stores.profile.invites.data.length > 0;
    }

    get currentLanguage() {
        return lang.currentLanguageName;
    }

    get isAdmin() {
        return stores.display.isAdmin;
    }

    get profile() {
        return stores.display.profile;
    }

    get role() {
        return stores.display.router.$.admin.match
            ? E.RoleInCompany.admin
            : this.profile.selectedCompany?.role ?? E.RoleInCompany.client;
    }

    get avatar() {
        return this.profile.avatar;
    }

    get logo() {
        return this.profile.selectedCompany?.logo;
    }

    get languages() {
        return lang.possibleLanguages.filter(
            l => l !== this.currentLanguage,
        );
    }

    get isOnNewProjects() {
        return stores.display.router.$.newProjects.match;
    }

    get isOnProjectIvitations() {
        return stores.display.router.$.invitations.match;
    }

    get isOnInvites() {
        return stores.display.router.$.invites.match;
    }

    get isOnMyProjects() {
        return stores.display.router.$.home.match;
    }

    get isSelectedCompany() {
        return Boolean(this.profile.selectedCompany?.id.asNumber());
    }

    resetDropdowns = () => {
        this.dropdowns.language.close();
        this.dropdowns.help.close();
        this.dropdowns.notifications.close();
        this.dropdowns.profile.close();
    };

    setCurrentLanguage = (currentLanguage: string) => {
        lang.setCurrentLanguageByName(currentLanguage);
    };

    toggleIsProfileCollapsed = () => {
        this.isProfileCollapsed = !this.isProfileCollapsed;
    };

    toggleIsLanguagesCollapsed = () => {
        this.isLanguagesCollapsed = !this.isLanguagesCollapsed;
    };

    goAdmin = () => stores
        .display
        .router
        .$.admin
        .$.projects
        .go({});

    logout = () => {
        auth.logout();
    };

    goHome = () => stores
        .display
        .router
        .$.home
        .go({});

    goMyProject = () => stores
        .display
        .router
        .$.home
        .go({});

    goNewProjects = () => stores
        .display
        .router.$
        .newProjects
        .go({});

    goProjectInvitations = () => stores
        .display
        .router.$
        .invitations
        .go({});

    goInvites = () => stores
        .display
        .router.$
        .invites
        .go({});
}
