import { action, runInAction } from 'mobx';
import { ErrorListHolder, LazyModelList, restQuery, T } from '~/api';
import type { CompanyAssociationType } from '~/models';
import { deepReaction } from '~/utils';
import type { UserVm } from '../../User.vm';

const struct = () => T.type({
    category: T.nonempty(T.string()),
});

export class CompanyAssociationsVm {
    isOpen = false;

    isLoading = false;

    searchText = '';

    companies = new LazyModelList(
        'Design Options',
        paging => restQuery.getCompaniesByName(
            this.searchText,
            paging,
        ),
    );

    companiesPaged = this.companies.createPagedList(
        'Companies Page',
        20,
        {},
    );

    previousCompaniesList: CompanyAssociationType[] = [];

    company?: CompanyAssociationType;

    errorListHolder = new ErrorListHolder(
        () => this.company,
        () => struct(),
    );

    get proposedCompanies() {
        const companiesList = this.previousCompaniesList.length > 0
            ? this.previousCompaniesList
            : this.companiesPaged.data;

        return companiesList.map(item => ({
            textValue: item.name,
            value: item.id,
        }));
    }

    constructor(private parentVm: UserVm) {
        makeSafeObservable(this, {
            toggleModalOpen: action,
            onSearch: action,
            onVisibilityChange: action,
            addCompany: action,
        });

        deepReaction(
            () => this.searchText,
            () => {
                this.companiesPaged.reload();
            },
        );
    }

    toggleModalOpen = () => {
        this.isOpen = !this.isOpen;
        this.searchText = '';
        this.company = undefined;
    };

    onSearch = (textValue: string, id?: number) => {
        if (!id) {
            this.companiesPaged.paging.setPage(0);
            this.previousCompaniesList = [];
            this.company = undefined;
        }

        this.searchText = textValue;

        const result = [
            ...this.companiesPaged.data,
            ...this.previousCompaniesList,
        ].find(item => item.id === id);

        if (!result) {
            return;
        }

        this.company = result;

        this.previousCompaniesList = [];
    };

    onVisibilityChange = (isVisible: boolean) => {
        const paging = this.companiesPaged.paging;

        if (!isVisible || paging.pagesCount === paging.page) {
            return;
        }

        this.previousCompaniesList.push(...this.companiesPaged.data);

        paging.toQuery();

        this.previousCompaniesList.push(...this.companiesPaged.data);
    };

    addCompany = () => (async () => {
        if (!this.company || this.isLoading || !this.errorListHolder.test()) {
            return;
        }

        this.isLoading = true;

        const res = await restQuery.addAssociation(
            this.parentVm.user,
            this.company,
        );

        if (!res) {
            this.isLoading = false;

            runInAction(() => {
                this.errorListHolder.add({
                    value: '',
                    key: 'companyAlready',
                    type: 'companyAlready',
                    refinement: undefined,
                    message: 'The company has already been added',
                    branch: [''],
                    path: ['companyAlready'],
                });

                this.errorListHolder.clearErrorsAfterTimeout();
            });
            return;
        }

        this.parentVm.user.addCompanyAssociations();
        this.parentVm.companyAssociations.reload();
        this.toggleModalOpen();
        this.isLoading = false;
    })();
}

