import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, NotificationItem, Paging } from '~/bits';
import { Page } from '~/partials';
import { hook } from '~/utils';
import { ConfirmClearAll } from './Components';
import { NotificationsVm } from './Notifications.vm';

export const Notifications = observer(() => {
    const vm = hook.useVm(() => new NotificationsVm());

    const notificationsList = vm.items.map(
        notification => (
            <NotificationItem
                key={notification.id.asStr()}
                notification={notification}
            />
        ),
    );

    const confirmClearAll = vm.isModalOpened
        ? (
            <ConfirmClearAll
                clearAll={vm.clear}
                closeModal={vm.closeModal}
            />
        )
        : null;

    return (
        <Page>
            <div className="notifications-page">
                <div className="notifications-page__top">
                    <div className="notifications-page__header">
                        {lang.dict.get('pageNotifications')}
                        <span className="notifications-page__header-num">
                            ({vm.itemsLength})
                        </span>
                    </div>
                    <Button
                        value={lang.dict.get('clearAll')}
                        color="white"
                        onClick={vm.openModal}
                    />
                </div>
                <div className="notifications-page__list">
                    {notificationsList}
                </div>
            </div>
            {confirmClearAll}
            <Paging paging={vm.list?.paging ?? false} />
        </Page>
    );
});
