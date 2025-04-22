import { action } from 'mobx';

type Sorter = Record<string, boolean | undefined>;

export class Paging {
    pagesCount = 0;

    isSorted = false;

    rowCount = 0;

    constructor(
        public pageSize: number,
        public sorter?: Sorter,
        public page = 0,
    ) {
        makeSafeObservable(this, {
            setPagesCount: action,
            setPageSize: action,
            setPage: action,
            setRowCount: action,
            toQuery: false,
            setSorter: action,
            clearSorter: action,
            switchIsSorted: action,
        });
    }

    setPagesCount = (count: number) => {
        this.pagesCount = count;
    };

    setPageSize = (size: number) => {
        this.pageSize = size;
    };

    setPage = (page: number) => {
        this.page = page;
    };

    setRowCount = (count: number) => {
        this.rowCount = count;
    };

    switchIsSorted = () => {
        this.isSorted = !this.isSorted;
    };

    setSorter = (keyName: string) => {
        if (!this.sorter) {
            return;
        }

        if (!(keyName in this.sorter)) {
            return;
        }

        if (this.sorter[keyName] === undefined) {
            this.clearSorter();
            this.sorter[keyName] = false;
            this.switchIsSorted();
            return;
        }

        if (this.sorter[keyName] === false) {
            this.clearSorter();
            this.sorter[keyName] = true;
            this.switchIsSorted();
            return;
        }

        if (this.sorter[keyName] === true) {
            this.clearSorter();
            this.sorter[keyName] = undefined;
            this.switchIsSorted();
        }
    };

    clearSorter = () => {
        if (!this.sorter) {
            return;
        }

        Object.keys(this.sorter).forEach(key => {
            if (!this.sorter) {
                return;
            }

            this.sorter[key] = undefined;
        });
    };

    isAsc = (keyName: string) => {
        if (!this.sorter) {
            return false;
        }

        return Boolean(!this.sorter[keyName]);
    };

    isVisible = (keyName: string) => {
        if (!this.sorter) {
            return;
        }

        if (this.sorter[keyName] === undefined) {
            return false;
        }

        return true;
    };

    modifySorter = {
        onClick: this.setSorter,
        isVisible: this.isVisible,
        isAsc: this.isAsc,
    };

    toQuery = (isSow = false) => {
        if (isSow) {
            return {
                page: this.page + 1,
                pageSize: this.pageSize,
                sort: this.sorter,
            };
        }

        return {
            page: this.page + 1,
            pageSize: this.pageSize,
            sortRules: this.sorter,
        };
    };
}
