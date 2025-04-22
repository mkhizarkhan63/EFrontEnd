import { action, reaction, runInAction, untracked, when } from 'mobx';
import { Id, Paging, Status, debug } from '~/api';
import { EventEmitter } from '~/utils';

export class LazyDataScroller<T extends { id: Id }> {
    events = new EventEmitter<{
        reloaded: (data: T[]) => void;
    }>();

    status;

    paging;

    lastFetchedPage = 0;

    data: T[] = [];

    constructor(
        private name: string,
        private fetcher: (paging?: Paging) => Promise<T[]>,
        pageSize: number,
        sorter?: Record<string, boolean | undefined>,
        private fetcherSingle?: (id: number) => Promise<T | false>,
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

    private handleReload = () => {
        this.events.emit('reloaded', untracked(() => this.data));
    };

    add = (pageId: number, data: T[]) => {
        if (pageId < this.lastFetchedPage) {
            return;
        }

        this.lastFetchedPage = pageId;

        this.data.push(...data);
    };

    addSingle = (data: T) => {
        const item = this.data.find(x => x.id.isEqual(data.id));

        if (!item) {
            this.data.push(data);
            this.reload();
        }
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

    removeId = (id?: Id) => {
        if (!id) {
            return;
        }

        this.data = this.data.filter(x => !x.id.isEqual(id));
        this.handleReload();
    };

    asyncGet = (id: Id, onSuccess: (item: T) => void, onFail?: () => void): () => void => {
        this.removeId(id);

        const preloaded = this.get(id);

        if (preloaded) {
            runInAction(() => {
                onSuccess(preloaded);
            });
            return () => {
                // mimic disposer for edge cases
            };
        }

        return when(
            () => this.status.isDone,
            () => {
                runInAction(() => {
                    const item = this.get(id, false);

                    if (!item) {
                        onFail?.();
                        return;
                    }

                    onSuccess(item);
                });
            },
        );
    };

    get = (id: Id, tryFetch = true): undefined | T => {
        const item = untracked(() => this.data).find(x => x.id.isEqual(id));

        if (!item && tryFetch && id.isType('external') && id.asNumber() !== 0) {
            this.reloadSingle(id);
            return;
        }

        if (!item) {
            return;
        }

        return item;
    };

    reloadSingle = async (id: Id) => {
        if (!this.fetcherSingle) {
            return this.reload();
        }

        const done = this.status.createTask('reloadSingle');

        try {
            const data = await this.fetcherSingle(Id.extractRawId(id));

            if (data === false) {
                debug.print(
                    `Cannot fetch ${id.asStr()} object of ${this.name}`,
                    'api/LazyDataList/Fetch',
                );
                done();
                return;
            }

            this.addSingle(data);
            done();
        } catch (error) {
            debug.print(error, 'api/LazyDataList/Error');
            done();
        }
    };

    getSingle = async (id: Id) => {
        if (!this.fetcherSingle) {
            return;
        }

        const item = await this.fetcherSingle(id.asNumber());

        if (!item) {
            return;
        }

        return item;
    };
}
