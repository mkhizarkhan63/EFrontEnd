import { observer } from 'mobx-react';
import { lang } from '~/api/Lang';
import { Button, NotificationItem } from '~/bits';
import { hook } from '~/utils';
import { NotificationsVm } from './Notifications.vm';

export const Notifications = observer(() => {
    const vm = hook.useVm(() => new NotificationsVm());

    const notificationsList = vm.items
        .map(notification => (
            <NotificationItem
                key={notification.id.asStr()}
                notification={notification}
            />
        ));

    return (
        <>
            <div className="notifications">
                <div className="notifications__elements">
                    {notificationsList}
                </div>
            </div>
            <div className="notifications__see-all">
                <Button
                    color="white"
                    value={lang.dict.get('seeAllNotifications')}
                    onClick={vm.open}
                />
            </div>
        </>
    );
});
