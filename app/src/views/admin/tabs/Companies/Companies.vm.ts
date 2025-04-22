import { action } from 'mobx';
import { E, ErrorListHolder, restQuery, T, utils } from '~/api';
import { type InviteCompanyType, InviteCompany } from '~/models';
import { stores } from '~/stores';

const struct = (invite?: InviteCompanyType) => {
    if (!invite) {
        return T.any();
    }

    return T.type({
        companyName: invite.companyName.length > 0 ? T.name() : T.any(),
        email: invite.email.length > 0 ? T.email() : T.any(),
        mobileNumber: T.mobile(),
    });
};

export class CompaniesVm {
    isOpen = false;

    isSaving = false;

    isDeleteModalOpened = false;

    statistics = {
        draftCount: 0,
        invitedCount: 0,
        reviewCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
    };

    invite?: InviteCompanyType;

    currentCompanyToDelete?: number;

    errorListHolder = new ErrorListHolder(() => this.invite, () => struct(this.invite));

    constructor() {
        makeSafeObservable(this, {
            setMobile: action,
            setCompanyName: action,
            setEmail: action,
            showDetails: false,
            deleteCompany: action,
            openDeleteModal: action,
            closeDeleteModal: action,
            setSearchValue: action,
        });
    }

    get companiesList() {
        return stores.companies.companies;
    }

    get companiesAmount() {
        return this.companiesList.paging.rowCount;
    }

    get companiesListSorter() {
        return this.companiesList.paging.modifySorter;
    }

    get searchValue() {
        return stores.companies.searchValue;
    }

    setMobile = (phone: string) => {
        if (!this.invite) {
            return;
        }

        if (phone.length > 8) {
            return;
        }

        this.invite.setMobileNumber(utils.fromInputPhone(phone, this.invite.mobileNumber));
    };

    setEmail = (email: string) => {
        if (!this.invite) {
            return;
        }

        this.invite.setEmail(email);
    };

    addInvite = () => {
        if (this.isOpen) {
            this.isOpen = false;
            this.invite = undefined;
            return;
        }

        this.isOpen = true;
        this.invite = InviteCompany.create();
    };

    setCompanyName = (name: string) => {
        if (!this.invite) {
            return;
        }

        this.invite.setCompanyName(name);
    };

    setInvite = () => {
        (async () => {
            if (!this.invite || this.isSaving || !this.errorListHolder.test()) {
                return;
            }

            this.isSaving = true;

            await restQuery.admin.createInviteCompany(this.invite);

            this.isSaving = false;

            this.addInvite();
        })();
    };

    setSearchValue = (value: string) => {
        stores.companies.setSearchValue(value);
    };

    showDetails = (id: number, type: E.ProfileType) => () => {
        const externalId = stores.idCollection.getExternal('company', id);

        if (!externalId) {
            return;
        }

        stores.display.router.$.admin.$.companies.$.sub.go({
            type,
            companyId: externalId,
            menu: E.CompanyMenu.detail,
        });
    };

    deleteCompany = () => {
        (async () => {
            const id = this.currentCompanyToDelete;

            if (!id) {
                return;
            }

            const externalId = stores.idCollection.getExternal('company', id);

            if (!externalId) {
                return;
            }

            const res = await restQuery.deleteConsultant(externalId);

            if (!res) {
                return;
            }

            stores.companies.companies.reload();
            this.closeDeleteModal();
        })();
    };

    openDeleteModal = (id: number) => {
        this.currentCompanyToDelete = id;
        this.isDeleteModalOpened = true;
    };

    closeDeleteModal = () => {
        this.isDeleteModalOpened = false;
        this.currentCompanyToDelete = undefined;
    };

    mount = () => {
        (async () => {
            const statistics = await stores.companies.getCompanyStatistics();

            if (!statistics) {
                return;
            }

            this.statistics = statistics;
        })();
    };
}
