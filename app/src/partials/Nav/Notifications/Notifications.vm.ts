import { action } from 'mobx';
import { stores } from '~/stores';

export class NotificationsVm {
    constructor() {
        makeSafeObservable(this, {
            open: action,
        });
    }

    get items() {
        return stores.notifications.list.data;
    }

    open = () => {
        stores.display.router.$.notifications.go({});
    };
}
