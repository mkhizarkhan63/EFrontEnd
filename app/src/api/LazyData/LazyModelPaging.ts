import { action, reaction } from 'mobx';
import { debug } from '../Debug';
import { Paging } from '../Paging';
import { Status } from '../Status';
import type { LazyModelList } from './LazyModelList';

export class LazyModelPaging<T extends { id: number; externalId?: number }> {
    status;

    paging;

    data: T[] = [];

    constructor(
        name: string,
        private list: LazyModelList<T>,
        private fetcher: (paging?: Paging) => Promise<T[]>,
        pageSize: number,
        sorter?: Record<string, boolean | undefined>,
    ) {
        this.status = new Status(`LazyModelList/Paging::${name}`);

        this.paging = new Paging(pageSize, sorter);

        makeSafeObservable(this, {
            status: false,
            paging: false,
            set: action,
            reload: false,
            remove: action,
        });

        reaction(
            () => [
                this.paging.page,
                this.paging.pageSize,
                this.paging.isSorted,
            ],
            () => {
                this.reload();
            },
        );

        this.reload();
    }

    remove = (id: number) => {
        this.data = this.data.filter(x => x.id !== id);
        this.paging.rowCount = this.data.length;
    };

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
            debug.print(error, 'api/LazyModelListPaging/Reload');
            this.status.fail();
        }
    };
}
