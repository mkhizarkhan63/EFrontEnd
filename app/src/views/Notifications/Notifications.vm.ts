import { action, runInAction } from 'mobx';
import { stores } from '~/stores';

export class NotificationsVm {
    isModalOpened = false;

    constructor() {
        makeSafeObservable(this, {
            clear: action,
            openModal: action,
            closeModal: action,
        });
    }

    get list() {
        return stores.notifications.list;
    }

    get items() {
        return this.list.data;
    }

    get itemsLength() {
        return this.list.paging.rowCount;
    }

    openModal = () => {
        setTimeout(() => runInAction(() => {
            this.isModalOpened = true;
        }));
    };

    closeModal = () => {
        this.isModalOpened = false;
    };

    clear = () => {
        this.closeModal();
        stores.notifications.clear();
    };
}
