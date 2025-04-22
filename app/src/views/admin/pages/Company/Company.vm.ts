import { action, runInAction } from 'mobx';
import moment from 'moment';
import { E, ErrorListHolder, lang, LazyData, LazyDataList, LazyModelList, restQuery } from '~/api';
import { DropdownViewModel, type MenuButton } from '~/bits';
import { type CompanyType, type InvoiceType } from '~/models';
import { stores } from '~/stores';

export class CompanyVm {
    company?: CompanyType;

    isLoading = true;

    isDeleteModalOpened = false;

    checked = new Set<E.CompanySteps>();

    errorListHolder = new ErrorListHolder();

    dropdowns = {
        box: new DropdownViewModel(),
    };

    projects = new LazyDataList(
        'CompanyProjects',
        () => restQuery.getCompanyProjects(this.company),
        undefined,
        false,
    );

    projectsStatistics = new LazyData(
        'projectStatistics',
        () => restQuery.project.getProjectStatistics(this.company),
        0,
    );

    logs = new LazyModelList(
        'CompanyLogs',
        () => restQuery.getCompanyLogs(this.company?.externalId),
        undefined,
        false,
    );

    // MOCKED FOR NOW
    invoices: InvoiceType[] = [
        {
            id: 11,
            externalId: 11,
            invoiceNumber: 13465,
            description: 'some text',
            dateOfPayment: moment(),
            price: 1346,
            status: E.InvoiceStatus.paid,
        },
        {
            id: 14,
            externalId: 14,
            invoiceNumber: 4575,
            description: 'some description',
            dateOfPayment: moment(),
            price: 1278,
            status: E.InvoiceStatus.unpaid,
        },
    ];

    constructor() {
        makeSafeObservable(this, {
            goBack: false,
            load: false,
            changeCompanyStatus: action,
            deleteCompany: action,
            setCompany: action,
            check: action,
            openDeleteModal: action,
            closeDeleteModal: action,
        });

        this.load(this.params.companyId, this.params.type);
    }

    get isApproved() {
        return this.company?.status === E.CompaniesStatus.approved;
    }

    get isRejected() {
        return this.company?.status === E.CompaniesStatus.rejected;
    }

    get employeeIds() {
        return this.company?.linkedProfiles
            .map(item => item.externalId)
            .filter((item): item is number => typeof item === 'number');
    }

    get showCheckList() {
        if (!this.company) {
            return false;
        }

        return [E.CompaniesStatus.draft, E.CompaniesStatus.adminReview]
            .includes(this.company?.status);
    }

    get params() {
        return this.r.$.companies.$.sub.params;
    }

    get r() {
        return stores.display.router.$.admin;
    }

    get menu() {
        return this.r.$.companies.$.sub.params.menu;
    }

    get subheaderName() {
        if (this.company?.status === E.CompaniesStatus.draft) {
            return lang.dict.get('draft');
        }

        return this.company?.name;
    }

    get menuItems(): Array<MenuButton<E.CompanyMenu>> {
        const keys = Object.values(E.CompanyMenu);

        const additionalValue = (type: E.CompanyMenu) => {
            switch (type) {
                case E.CompanyMenu.projects:
                    return this.projectsStatistics.data;
                case E.CompanyMenu.employees:
                    return this.company?.linkedProfiles.length;
                case E.CompanyMenu.invoices:
                    return 0;
                case E.CompanyMenu.reviews:
                    return this.company?.references.length;
            }
        };

        return keys.map(key => ({
            value: key,
            name: lang.dict.enum('companyMenu', key),
            additionalValue: additionalValue(key),
            onClick: () => this.r.$.companies.$.sub.go({
                ...this.params,
                menu: key,
            }),
        }));
    }

    isMenuItemActive = (menu: E.CompanyMenu) => menu === this.menu;

    goBack = () => {
        stores.display.router.$.admin.$.companies.go({});
    };

    load = async (id: number, type: E.ProfileType) => {
        this.isLoading = true;

        switch (type) {
            case E.ProfileType.contractor:
                const contractor = await restQuery.getContractor(id);

                if (!contractor) {
                    this.isLoading = false;
                    this.goBack();
                    return;
                }

                this.setCompany(contractor);
                this.isLoading = false;
                break;
            case E.ProfileType.consultant:
                const consultant = await restQuery.getConsultant(id);

                if (!consultant) {
                    this.isLoading = false;
                    this.goBack();
                    return;
                }

                this.setCompany(consultant);
                this.isLoading = false;
                break;
        }
    };

    setCompany = (company: CompanyType) => {
        this.company = company;
    };

    updateProfileStatus = async (status: E.CompaniesStatus.rejected | E.CompaniesStatus.approved) => {
        if (!this.company) {
            return;
        }

        if (this.company.ownerId === 0) {
            runInAction(() => {
                this.errorListHolder.add({
                    value: '',
                    key: 'missingOwner',
                    type: 'missingOwner',
                    refinement: undefined,
                    message: 'Cannot approve company, no owner is assigned',
                    branch: [''],
                    path: ['missingOwner'],
                });
            });

            this.errorListHolder.clearListTimeout = setTimeout(() => {
                this.errorListHolder.clear();
                this.errorListHolder.clearListTimeout = undefined;
            }, 5000);

            return;
        }

        await restQuery.updateCompanyStatus({
            id: this.company.externalId,
            status,
            type: this.company.type,
        });

        stores.display.router.reload();
    };

    changeCompanyStatus = () => {
        (async () => {
            const id = this.company?.externalId;
            const status = this.isApproved ? E.CompaniesStatus.rejected : E.CompaniesStatus.approved;

            if (!id) {
                return;
            }

            const res = await restQuery.changeCompanyStatus(id, status);

            if (!res) {
                return;
            }

            stores.display.router.reload();
        })();
    };

    deleteCompany = () => {
        (async () => {
            const id = this.company?.id;

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
            stores.display.router.goBack();
        })();
    };

    check = (type: E.CompanySteps) => {
        if (this.checked.delete(type)) {
            return;
        }

        this.checked.add(type);
    };

    isChecked = (type: E.CompanySteps) => this.checked.has(type);

    openDeleteModal = () => {
        this.isDeleteModalOpened = true;
    };

    closeDeleteModal = () => {
        this.isDeleteModalOpened = false;
    };
}
