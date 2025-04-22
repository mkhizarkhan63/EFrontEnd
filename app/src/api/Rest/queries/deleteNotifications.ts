import { dtos } from '~/api';

export const deleteNotifications = async (notificationIds: number[]) => await dtos
    .notification
    .execDeleteNotificationsByIdsCommand({ notificationIds });
