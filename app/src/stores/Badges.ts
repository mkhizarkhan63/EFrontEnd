import { action } from 'mobx';
import { LazyModelScroller, restQuery } from '~/api';
import { getListedBadges } from '~/api/Rest/queries/badges';
import { deepReaction } from '~/utils';

export class Badges {
    sorter = {
        iconIsAsc: undefined as boolean | undefined,
        dateIssuedAscending: undefined as boolean | undefined,
        typeAscending: undefined as boolean | undefined,
        serviceAscending: undefined as boolean | undefined,
        statusAscending: undefined as boolean | undefined,
    };

    searchValue = '';

    badgesListing = new LazyModelScroller(
        'Badges List',
        async (paging) => {
            if (!paging) return [];

            return await getListedBadges("", paging);
        },
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
                this.badgesListing.reload();
            },
        );
    }

    setSearchValue = (value: string) => {
        this.searchValue = value;
    };

}
