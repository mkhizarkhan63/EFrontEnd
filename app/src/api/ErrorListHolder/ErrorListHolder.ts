import { action, observable } from 'mobx';
import { T, Id } from '~/api';
import { translateError } from '~/utils';

type ErrorItem = {
    id: Id;
    error: T.Failure;
};

export class ErrorListHolder {
    errorsList: ErrorItem[] = [];

    parentHolder?: ErrorListHolder;

    childrenHolder?: ErrorListHolder;

    clearListTimeout?: ReturnType<typeof setTimeout>;

    constructor(
        private getData?: () => unknown,
        private getStruct?: () => T.AnyStruct,
    ) {
        makeSafeObservable(this, {
            clear: action,
            test: action,
            remove: action,
            setParent: action,
            setChildren: action,
            parentHolder: observable.ref,
            childrenHolder: observable.ref,
            errorsList: observable.deep,
        }, { deep: false });
    }

    get noItems() {
        return this.errorsList.length === 0;
    }

    get translated() {
        return this.errorsList.map(item => ({
            id: item.id,
            message: translateError(item.error),
        }));
    }

    clear = () => {
        this.errorsList = [];
    };

    add = (error: T.Failure) => {
        this.errorsList.push({
            id: Id.init(),
            error,
        });
    };

    remove = (id: Id) => {
        this.errorsList = this.errorsList
            .filter(item => !item.id.isEqual(id));
    };

    setParent = (holder: ErrorListHolder) => {
        if (holder === this) {
            return;
        }

        this.parentHolder = holder;
    };

    setChildren = (holder: ErrorListHolder) => {
        if (holder === this) {
            return;
        }

        this.childrenHolder = holder;
    };

    test = () => {
        this.clear();

        if (
            typeof this.getData === 'undefined'
            || typeof this.getStruct === 'undefined'
        ) {
            return true;
        }

        const data = this.getData();

        const [error] = T.validate(data, this.getStruct());

        this.childrenHolder?.test();
        this.parentHolder?.clear();
        this.errorsList.push(...this.childrenHolder?.errorsList ?? []);

        if (error) {
            for (const fail of error.failures()) {
                this.add(fail);
                this.childrenHolder?.add(fail);
                this.parentHolder?.add(fail);
            }

            if (this.clearListTimeout) {
                clearTimeout(this.clearListTimeout);
            }

            this.clearListTimeout = setTimeout(() => {
                this.clear();
                this.clearListTimeout = undefined;
            }, 5000);

            return false;
        }

        return this.errorsList.length === 0;
    };

    clearErrorsAfterTimeout = () => {
        if (this.clearListTimeout) {
            clearTimeout(this.clearListTimeout);
        }
    };

    static mimic = () => new ErrorListHolder(() => undefined, () => (() => T.any())());
}
