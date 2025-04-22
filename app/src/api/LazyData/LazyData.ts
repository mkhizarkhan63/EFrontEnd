import { action, onBecomeObserved, observable, runInAction } from 'mobx';
import { debug } from '../Debug';
import { Status } from '../Status';

export class LazyData<T> {
    status;

    data: T;

    /**
     * Make LazyData fetchable only once
     */
    isLocked = false;

    isDoneOnce = false;

    private disposeOnBecomeObserved?: () => void;

    constructor(
        name: string,
        private fetcher: () => Promise<T>,
        defaultData: T,
    ) {
        this.status = new Status(`LazyData::${name}`);
        this.data = defaultData;

        makeSafeObservable(this, {
            status: false,
            setData: action,
            reload: false,
            isLocked: false,
            isDoneOnce: observable,
        });

        this.disposeOnBecomeObserved = onBecomeObserved(this, 'data', () => {
            this.reload();
        });
    }

    setData = (data: T) => {
        this.data = data;
    };

    reload = async (force = false) => {
        if (!force && this.isLocked && this.isDoneOnce) {
            return;
        }

        if (this.status.isWorking) {
            return;
        }

        this.status.start();

        try {
            const data = await this.fetcher();
            this.setData(data);
            runInAction(() => {
                this.isDoneOnce = true;
            });
            this.disposeOnBecomeObserved?.();
            this.disposeOnBecomeObserved = undefined;
            this.status.ok();
        } catch (error) {
            debug.print(error, 'api/LazyData');
            this.status.fail();
        }
    };

    lock = () => {
        this.isLocked = true;
        return this;
    };
}
