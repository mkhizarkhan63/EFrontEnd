import { action, onBecomeObserved, observable, computed, makeAutoObservable, untracked, when, runInAction, reaction, onBecomeUnobserved } from 'mobx';
import { debug } from '../Debug';
import type { Paging } from '../Paging';
import { Id } from '../Id';
import { Status } from '../Status';
import { LazyDataPaging } from './LazyDataPaging';
import { EventEmitter } from '~/utils';

export class LazyDataList<T extends { id: Id }> {
    events = new EventEmitter<{
        reloaded: (data: T[]) => void;
    }>();

    status;

    rawData: T[] = [];

    private startedReloading = false;

    constructor(
        private name: string,
        private fetcher: (paging?: Paging) => Promise<T[]>,
        private fetcherSingle?: (id: number) => Promise<T | false>,
        private shouldReload = true,
        reloadDeps?: () => unknown[],
    ) {
        this.status = new Status(`LazyDataList::${name}`);

        this.status.ok();

        makeAutoObservable(this, {
            events: false,
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

        let isObserved = false;

        onBecomeObserved(this, 'data', () => {
            isObserved = true;
            this.reload();
        });

        onBecomeUnobserved(this, 'data', () => {
            isObserved = false;
        });

        if (reloadDeps) {
            reaction(() => reloadDeps(), () => {
                if (!isObserved) {
                    return;
                }

                this.reload();
            });
        }
    }

    get data() {
        return Array.from(this.rawData);
    }

    private handleReload = () => {
        this.events.emit('reloaded', untracked(() => this.data));
    };

    get = (id: Id, tryFetch = true): undefined | T => {
        const item = untracked(() => this.rawData).find(x => x.id.isEqual(id));

        if (!item && tryFetch && id.isType('external') && id.asNumber() !== 0) {
            this.reloadSingle(id);
            return;
        }

        if (!item) {
            return;
        }

        return item;
    };

    removeId = (id?: Id) => {
        if (!id) {
            return;
        }

        this.rawData = this.rawData.filter(x => !x.id.isEqual(id));
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

    set = (data: T[]) => {
        this.rawData = data;
        this.handleReload();
    };

    add = (value: T, unshift = false, override = false) => {
        const item = this.rawData.find(x => x.id.isEqual(value.id));

        if (!item) {
            unshift ? this.rawData.unshift(value) : this.rawData.push(value);
            this.handleReload();
            return;
        }

        if (override) {
            this.rawData = this.rawData.filter(x => !x.id.isEqual(value.id));
            this.rawData.push(value);
        }
        this.handleReload();
    };

    remove = (value: T) => {
        this.rawData = this.rawData.filter(x => !x.id.isEqual(value.id));
        this.handleReload();
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

            this.add(data, false, true);
            done();
        } catch (error) {
            debug.print(error, 'api/LazyDataList/Error');
            done();
        }
    };

    reload = async () => {
        if (this.rawData.length > 0 && !this.shouldReload) {
            return;
        }

        if (this.status.isWorking && !this.shouldReload) {
            return;
        }

        const done = this.status.createTask('reload');

        try {
            const data = await this.fetcher();
            this.set(data);
            done();
        } catch (error) {
            debug.print(error, 'api/LazyDataList/Reload');
            done();
        }
    };

    createPagedList = (
        name: string,
        pageSize: number,
        sorter?: Record<string, boolean | undefined>,
    ) => new LazyDataPaging(
        name,
        this,
        this.fetcher,
        pageSize,
        sorter,
    );
}
