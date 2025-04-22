import { LazyDataList, restQuery } from '~/api';

export class Notifications {
    items = new LazyDataList(
        'Notifications',
        restQuery.getNotifications,
        undefined,
        false,
    );

    list = this.items.createPagedList('Notifications newest', 8);

    constructor() {
        makeSafeObservable(this);
    }

    clear = () => {
        (async () => {
            if (this.list.length === 0) {
                return;
            }

            const ids = this.list.data.map(item => item.id.asNumber());

            const isDeleted = await restQuery.deleteNotifications(ids);

            if (!isDeleted) {
                return;
            }

            this.list.reload();
        })();
    };
}
