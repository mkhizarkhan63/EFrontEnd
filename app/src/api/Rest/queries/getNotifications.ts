import { dtos, T, Mobx, Id, enums, type Paging } from '~/api';
import { Notification } from '~/models';

export const getNotifications = async (paging?: Paging) => {
    const data = await dtos
        .notification
        .execListNotificationsQuery(
            paging ? paging.toQuery() : {},
        );

    if (!data || !data.result) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);
    paging?.setRowCount(data.rowCount ?? 0);

    return data.result.map(item => {
        const notification = new Notification();
        Mobx.extendsObservable(notification, {
            id: Id.tryInit(item.id, 'external'),
            messageType: T.create(
                item.notificationType,
                enums.NotificationType.castToInternal,
            ),
            data: item.notificationData,
            postDate: T.create(item.createdDate, T.MaybeTimestamp),
        });

        if (typeof item.notificationData === 'object' && item.notificationData !== null && 'EmailContent' in item.notificationData) {
            Mobx.extendsObservable(notification, {
                emailContent: (item.notificationData as unknown as Record<string, string>).EmailContent,
            });
        }

        return notification;
    });
};
