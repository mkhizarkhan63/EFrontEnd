import { action, onBecomeObserved, observable, computed, makeAutoObservable, untracked, when, runInAction } from 'mobx';
import { debug } from '../Debug';
import type { Paging } from '../Paging';
import { Status } from '../Status';
import { LazyModelPaging } from './LazyModelPaging';

export class LazyModelList<T extends { id: number; externalId?: number }> {
    status;

    rawData: T[] = [];

    constructor(
        private name: string,
        private fetcher: (paging?: Paging) => Promise<T[]>,
        private fetcherSingle?: (id: number) => Promise<T | false>,
        private shouldReload = true,
    ) {
        this.status = new Status(`LazyModelList::${name}`);

        this.status.ok();

        makeAutoObservable(this, {
            rawData: observable.deep,
            data: computed,
            status: false,
            set: action,
            get: false,
            asyncGet: false,
            add: action,
            remove: action,
            reloadSingle: false,
            reload: false,
            createPagedList: false,
        });

        onBecomeObserved(this, 'data', () => {
            this.reload();
        });
    }

    get data() {
        return Array.from(this.rawData);
    }

    get = (id: number, tryFetch = true): undefined | T => {
        const item = untracked(() => this.rawData).find(x => x.externalId === id);

        if (!item && tryFetch) {
            this.reloadSingle(id);
            return;
        }

        if (!item) {
            return;
        }

        return item;
    };

    removeId = (id?: number) => {
        if (!id) {
            return;
        }

        this.rawData = this.rawData.filter(x => x.externalId !== id);
    };

    asyncGet = (id: number, onSuccess: (item: T) => void, onFail?: () => void): () => void => {
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

    set = (data: T[]) => {
        this.rawData = data;
    };

    add = (value: T, unshift = false, override = false) => {
        const item = this.rawData.find(x => x.externalId === value.id);

        if (!item) {
            unshift ? this.rawData.unshift(value) : this.rawData.push(value);
            return;
        }

        if (override) {
            this.rawData = this.rawData.filter(x => x.externalId !== value.id);
            this.rawData.push(value);
        }
    };

    remove = (value: T) => {
        this.rawData = this.rawData.filter(x => x.externalId !== value.id);
    };

    reloadSingle = async (id: number) => {
        if (!this.fetcherSingle) {
            return this.reload();
        }

        const done = this.status.createTask('reloadSingle');

        try {
            const data = await this.fetcherSingle(id);

            if (data === false) {
                debug.print(
                    `Cannot fetch ${id} object of ${this.name}`,
                    'api/LazyModelList/Fetch',
                );
                done();
                return;
            }

            this.add(data, false, true);
            done();
        } catch (error) {
            debug.print(error, 'api/LazyModelList/Error');
            done();
        }
    };

    reload = async (force = false) => {
        if (this.rawData.length > 0 && !this.shouldReload && !force) {
            return;
        }

        const done = this.status.createTask('reload');

        try {
            const data = await this.fetcher();
            this.set(data);
            done();
        } catch (error) {
            debug.print(error, 'api/LazyModelList/Reload');
            done();
        }
    };

    createPagedList = (
        name: string,
        pageSize: number,
        sorter?: Record<string, boolean | undefined>,
    ) => new LazyModelPaging(
        name,
        this,
        this.fetcher,
        pageSize,
        sorter,
    );
}
