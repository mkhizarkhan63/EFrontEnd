import { action, reaction } from 'mobx';
import { debug } from '../Debug';
import type { Id } from '../Id';
import { Paging } from '../Paging';
import { Status } from '../Status';
import type { LazyDataList } from './LazyDataList';

export class LazyDataPaging<T extends { id: Id }> {
    status;

    paging;

    data: T[] = [];

    constructor(
        name: string,
        private list: LazyDataList<T>,
        private fetcher: (paging?: Paging) => Promise<T[]>,
        pageSize: number,
        sorter?: Record<string, boolean | undefined>,
    ) {
        this.status = new Status(`LazyDataList/Paging::${name}`);

        this.paging = new Paging(pageSize, sorter);

        makeSafeObservable(this, {
            status: false,
            paging: false,
            set: action,
            reload: false,
        });

        reaction(
            () => [
                this.paging.page,
                this.paging.pageSize,
                this.paging.isSorted,
            ],
            () => this.reload(),
        );

        this.reload();
    }

    get length() {
        return this.data.length;
    }

    set = (data: T[]) => {
        this.data = data;
    };

    reload = async () => {
        this.status.start();

        try {
            const data = await this.fetcher(this.paging);
            this.set(data);
            this.status.ok();
        } catch (error) {
            debug.print(error, 'api/LazyDataListPaging/Reload');
            this.status.fail();
        }
    };
}
