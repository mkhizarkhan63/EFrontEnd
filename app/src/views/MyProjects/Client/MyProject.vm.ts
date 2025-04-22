import { action } from 'mobx';
import { stores } from '~/stores';

export class MyProjectVm {
    isMounted = false;

    constructor() {
        makeSafeObservable(this, {
            mount: action,
        });
    }

    get projects() {
        return stores.projects.projects;
    }

    get isLoading() {
        return !this.isMounted || this.projects.status.isLoading;
    }

    mount = () => {
        this.isMounted = true;
    };
}
