import { action, runInAction } from 'mobx';
import { E, Id, lang, LazyModelScroller, restClient, restQuery } from '~/api';
import { Contractor, Profile as ProfileModel, type CompanyType, type FileDataType } from '~/models';
import { stores } from '.';

export class Profile {
    isLoading = false;

    initialized = false;

    currentProfile = new ProfileModel();

    company?: CompanyType;

    constructor() {
        makeSafeObservable(this, {
            load: false,
            loadProfile: false,
            loadProfileContext: false,
            setIsLoading: action,
            updateCompany: action,
            setCompany: action,
        });

        this.load();
    }

    invites = new LazyModelScroller(
        'Invite List',
        () => restQuery.getInvites(),
        18,
    );

    get isValid() {
        if (!this.currentProfile.selectedCompany) {
            return false;
        }

        return this.currentProfile.selectedCompany.status === E.CompaniesStatus.approved || E.CompaniesStatus.invited;
    }

    get id() {
        return this.currentProfile.selectedCompany?.contextId.asNumber() ?? 0;
    }

    get ownerData() {
        return {
            ownerName: this.currentProfile.name ?? '',
            ownerEmail: this.currentProfile.email ?? '',
            ownerPhone: this.currentProfile.phone ?? '',
            ownerId: this.currentProfile.id.asNumber(),
        };
    }

    get profile() {
        return this.company;
    }

    get contractor() {
        return Contractor.is(this.company) ? this.company : undefined;
    }

    setIsLoading = (value: boolean) => {
        this.isLoading = value;
    };

    setCompany = (company?: CompanyType) => {
        this.company = company;
    };

    load = async () => {
        this.setIsLoading(true);

        await this.loadProfile();
        await this.loadProfileContext();
        await stores.locations.dicts.reload();

        this.initialized = true;
        this.setIsLoading(false);
    };

    loadProfile = async () => {
        const storedLanguage = localStorage.getItem('language');

        if (storedLanguage) {
            lang.set(storedLanguage);
        }

        const profile = await restQuery.getProfile();

        if (!profile) {
            return;
        }

        runInAction(() => {
            this.currentProfile = profile;
            profile.selectedCompany?.loadStatus();

            const sessionProfile = restClient.getId();
            const id = Id.tryInit(sessionProfile, 'external');

            if (restClient.isContextSaved()) {
                this.currentProfile.selectCompany(id);
                return;
            }

            const context = this.currentProfile.profilesInCompanies.find(item => item.id.isEqual(id));

            if (context) {
                restClient.setContextId(context?.contextId.asNumber());
                restClient.setType(context?.role);
                return;
            }

            const defaultContext = this.currentProfile.defaultCompany;

            restClient.setContextId(defaultContext?.contextId.asNumber());
            restClient.setType(defaultContext?.role);
            restClient.setId(defaultContext?.id.asNumber());
        });
    };

    loadProfileContext = async () => {
        if (![
            E.RoleInCompany.contractor,
            E.RoleInCompany.consultant,
        ].includes(this.currentProfile.role)) {
            return;
        }

        const company = this.currentProfile.role === E.RoleInCompany.contractor
            ? await restQuery.getContractor(this.id)
            : await restQuery.getConsultant(this.id);

        this.setCompany(company);
    };

    updateCompany = (
        id: Id,
        role: E.RoleInCompany,
        name: string,
        logo?: FileDataType,
    ) => {
        const profileInList = this.currentProfile.profilesInCompanies
            .find(item => id.isEqual(item.contextId) && item.role === role);

        if (profileInList) {
            profileInList.companyName = name;
            profileInList.logo = logo?.img?.clone();
        }
    };

    updateProfileInfo = async (
        name: string,
        email: string,
        avatar?: FileDataType,
    ) => {
        if (!avatar) {
            return;
        }

        let newAvatarId = avatar.fileId ?? '';

        if (!avatar.isExternal || !avatar.img) {
            await restQuery.file.deleteId(avatar.fileId ?? '');
            newAvatarId = '';
        }

        if (avatar.file) {
            const fileId = await restQuery.file.add([avatar]);
            newAvatarId = fileId[0] ?? '';
        }

        return await restQuery.updateProfileInfo(name, email, newAvatarId);
    };

    updatePassword = async (
        oldPassword: string,
        newPassword: string,
        confirmPassword: string,
    ) => await restQuery.updateClientPassword(
        oldPassword,
        newPassword,
        confirmPassword,
    );
}
