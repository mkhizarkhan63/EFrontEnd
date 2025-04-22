import { action, reaction } from 'mobx';
import { type Id, Paging, Status, debug } from '~/api';

export class LazyModelScroller<T extends { id: number; externalId?: number }, D extends { id: Id }> {
    status;

    paging;

    lastFetchedPage = 0;

    data: T[] = [];

    constructor(
        name: string,
        private fetcher: (paging?: Paging) => Promise<T[]>,
        pageSize: number,
        sorter?: Record<string, boolean | undefined>,
        private fetcherSingle?: (id: number) => Promise<D | T | false>,
    ) {
        this.status = new Status(`LazyDataList/Scroller::${name}`);

        this.paging = new Paging(pageSize, sorter);

        if (sorter) {
            reaction(
                () => [this.paging.isSorted],
                () => this.reload(),
            );
        }

        this.reload();

        makeSafeObservable(this, {
            status: false,
            paging: false,
            add: action,
            reload: false,
            loadNext: false,
            resetPaging: action,
            set: action,
        });
    }

    get length() {
        return this.data.length;
    }

    get isLast() {
        return this.paging.pagesCount <= this.lastFetchedPage + 1;
    }

    add = (pageId: number, data: T[]) => {
        if (pageId < this.lastFetchedPage) {
            return;
        }

        this.lastFetchedPage = pageId;

        this.data.push(...data);
    };

    set = (data: T[]) => {
        this.data = data;
    };

    resetPaging = () => {
        this.lastFetchedPage = 0;
        this.paging.setPage(0);
    };

    loadNext = () => {
        if (this.isLast) {
            return;
        }

        this.paging.setPage(this.paging.page + 1);
        this.reload(true);
    };

    reload = async (next?: boolean) => {
        this.status.start();

        try {
            if (!next) {
                this.resetPaging();
            }

            const data = await this.fetcher(this.paging);
            next ? this.add(this.paging.page, data) : this.set(data);
            this.status.ok();
        } catch (error) {
            debug.print(error, 'api/LazyDataListScroller/Reload');
            this.status.fail();
        }
    };

    clear = () => {
        this.data = [];
        this.lastFetchedPage = 0;
        this.paging = new Paging(this.paging.pageSize, this.paging.sorter);
        this.reload();
    };

    remove = (value: T) => {
        this.data = this.data.filter(x => x.id !== value.id);
    };

    asyncGet = async (id: number, onSuccess: (item: D | T) => void, onFail?: () => void) => {
        if (!this.fetcherSingle) {
            return onFail?.();
        }

        const design = await this.fetcherSingle(id);

        if (!design) {
            return onFail?.();
        }

        return onSuccess(design);
    };
}
