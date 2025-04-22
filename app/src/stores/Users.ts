import { action } from 'mobx';
import { LazyModelScroller, restQuery } from '~/api';
import { deepReaction } from '~/utils';

export class Users {
    sorter = {
        nameIsAscending: undefined as boolean | undefined,
        phoneIsAscending: undefined as boolean | undefined,
        companyAssociationIsAscending: undefined as boolean | undefined,
        signedUpOnIsAscending: undefined as boolean | undefined,
        lastActivityIsAscending: undefined as boolean | undefined,
    };

    searchValue = '';

    users = new LazyModelScroller(
        'Users',
        paging => restQuery.getUsers(this.searchValue, paging),
        18,
        this.sorter,
        restQuery.getUser,
    );

    constructor() {
        makeSafeObservable(this, {
            setSearchValue: action,
        });

        deepReaction(
            () => this.searchValue,
            () => {
                this.users.reload();
            },
        );
    }

    setSearchValue = (value: string) => {
        this.searchValue = value;
    };
}
