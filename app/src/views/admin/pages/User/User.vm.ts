import { action } from 'mobx';
import moment from 'moment';
import { E, lang, LazyDataList, LazyModelList, restQuery } from '~/api';
import type { MenuButton } from '~/bits';
import { DropdownViewModel } from '~/bits/Dropdown/Dropdown.vm';
import { User, type InvoiceType } from '~/models';
import { stores } from '~/stores';

export class UserVm {
    user = User.create();

    isLoading = true;

    dropdowns = {
        box: new DropdownViewModel(),
    };

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

    projects = new LazyDataList(
        'UserProjects',
        () => restQuery.getUserProjects(this.user.externalId),
        undefined,
        false,
    );

    companyAssociations = new LazyModelList(
        'CompanyAssociations',
        () => restQuery.getCompanyAssociations(this.user.externalId),
    );

    logs = new LazyModelList(
        'UserLogs',
        () => restQuery.getUserLogs(this.user.externalId),
    );

    constructor() {
        makeSafeObservable(this, {
            load: action,
            isMenuItemActive: false,
            goBack: false,
        });
        const id = stores.display.router.$.admin.$.users.$.sub.params.id;
        this.load(id);
    }

    get reviews() {
        return [];
    }

    get menuItems(): Array<MenuButton<E.AdminUsersPages>> {
        const r = stores.display.router.$.admin.$.users.$.sub;
        const id = this.user.externalId ?? 0;

        return [
            {
                value: E.AdminUsersPages.projects,
                additionalValue: this.user.numberOfProjects,
                name: lang.dict.enum('adminUsersPages', E.AdminUsersPages.projects),
                onClick: () => r.$.projects.go({ id }),
            },
            {
                value: E.AdminUsersPages.companyAssociations,
                additionalValue: this.user.companyAssociations,
                name: lang.dict.enum('adminUsersPages', E.AdminUsersPages.companyAssociations),
                onClick: () => r.$.companyAssociations.go({ id }),
            },
            {
                value: E.AdminUsersPages.invoices,
                name: lang.dict.enum('adminUsersPages', E.AdminUsersPages.invoices),
                onClick: () => r.$.invoices.go({ id: id }),
            },
            {
                value: E.AdminUsersPages.notes,
                name: lang.dict.enum('adminUsersPages', E.AdminUsersPages.notes),
                onClick: () => r.$.notesTasks.go({ id: id }),
            },
            {
                value: E.AdminUsersPages.log,
                name: lang.dict.enum('adminUsersPages', E.AdminUsersPages.log),
                onClick: () => r.$.log.go({ id: id }),
            },
        ];
    }

    get currentPage() {
        const r = stores.display.router.$.admin.$.users.$.sub;

        if (r.$.projects.match) {
            return E.AdminUsersPages.projects;
        }

        if (r.$.companyAssociations.match) {
            return E.AdminUsersPages.companyAssociations;
        }

        if (r.$.invoices.match) {
            return E.AdminUsersPages.invoices;
        }

        if (r.$.reviews.match) {
            return E.AdminUsersPages.reviews;
        }

        if (r.$.notesTasks.match) {
            return E.AdminUsersPages.notes;
        }

        if (r.$.log.match) {
            return E.AdminUsersPages.log;
        }

        return false;
    }

    isMenuItemActive = (page: E.AdminUsersPages) => page === this.currentPage;

    goBack = () => {
        stores.display.router.$.admin.$.users.go({});
    };

    load = async (id: number) => {
        this.isLoading = true;

        await stores.users.users.asyncGet(
            id,
            user => {
                if (!user) {
                    this.isLoading = false;
                    this.goBack();
                    return;
                }

                if ('email' in user) {
                    this.user = user;
                }

                this.isLoading = false;
            },
            this.goBack,
        );
    };
}
