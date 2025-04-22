import { action } from 'mobx';
import { LazyModelScroller, restQuery } from '~/api';
import { deepReaction } from '~/utils';

export class Companies {
    sorter = {
        nameIsAscending: undefined as boolean | undefined,
        statusIsAscending: undefined as boolean | undefined,
        lastActivityIsAscending: undefined as boolean | undefined,
        projectAwardedIsAscending: undefined as boolean | undefined,
        projectParticipatedIsAscending: undefined as boolean | undefined,
    };

    searchValue = '';

    companies = new LazyModelScroller(
        'Companies List',
        paging => restQuery.getCompanies(this.searchValue, paging),
        18,
        this.sorter,
    );

    constructor() {
        makeSafeObservable(this, {
            setSearchValue: action,
        });

        deepReaction(
            () => this.searchValue,
            () => {
                this.companies.reload();
            },
        );
    }

    setSearchValue = (value: string) => {
        this.searchValue = value;
    };

    getCompanyStatistics = async () => await restQuery.getCompanyStatistics();
}
