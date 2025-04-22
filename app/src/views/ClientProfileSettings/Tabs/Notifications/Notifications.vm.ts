import { action } from 'mobx';
import { lang, storage } from '~/api';

export class NotificationsVm {

    emailNotificationsData = [false, false];

    enabledWebsiteNotifications: number[] = [];

    websiteNotificationsData = [
        {
            id: 1,
            name: 'subscriptionSignContract',
        },
        {
            id: 2,
            name: 'contractorReview',
        },
        {
            id: 3,
            name: 'project',
        },
        {
            id: 4,
            name: 'filesDownloaded',
        },
        {
            id: 5,
            name: 'subscriptionSignContract',
        },
        {
            id: 6,
            name: 'contractorReview',
        },
        {
            id: 7,
            name: 'project',
        },
        {
            id: 8,
            name: 'filesDownloaded',
        },
    ];

    placeholderEmailNotification = 'A small text about what the newsletter might contain.';

    placeholderWebsiteNotification = 'A small text about what the website notifications might contain.';

    constructor() {
        makeSafeObservable(this, {
            setEmailNotifications: action,
            setWebsiteNotifications: action,
            load: action,
        });

        this.load();
    }

    get emailNotifications() {
        return this.emailNotificationsData.map((item, index) => ({
            id: index,
            name: ['notificationsWeeklyNewsletter', 'notificationsAccountSummary'][index],
            value: item,
        }));
    }

    get websiteNotifications() {
        return this.websiteNotificationsData.map(item => ({
            id: item.id,
            name: lang.dict.get(item.name),
            value: this.enabledWebsiteNotifications.includes(item.id),
        }));
    }

    setEmailNotifications = (idx: number) => action((value: boolean) => {
        this.emailNotificationsData[idx] = value;
    });

    setWebsiteNotifications = (id: number) => {
        const toDelete = this.enabledWebsiteNotifications.includes(id);

        if (toDelete) {
            this.enabledWebsiteNotifications = this.enabledWebsiteNotifications.filter(x => x !== id);
            return;
        }

        this.enabledWebsiteNotifications.push(id);
    };

    load = () => {
        this.enabledWebsiteNotifications = storage.get('websiteNotifications')?.split('')
            .map(item => parseInt(item, 10)) ?? [];

        this.emailNotificationsData = storage.get('emailNotifications')?.split(',')
            .map(item => item === 'true') ?? [false, false];
    };

    save = () => {
        const websiteNotifications = this.enabledWebsiteNotifications
            .reduce((prev, curr) => `${prev}${curr}`, '');

        const emailNotificationsData = `${this.emailNotificationsData[0]},${this.emailNotificationsData[1]}`;

        storage.set('emailNotifications', emailNotificationsData);
        storage.set('websiteNotifications', websiteNotifications);
    };
}
