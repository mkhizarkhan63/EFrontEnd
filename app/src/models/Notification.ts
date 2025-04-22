import moment, { type Moment } from 'moment';
import { E, Id, lang } from '~/api';

export class Notification {
    id = Id.init();

    messageType?: E.MessageType;

    emailContent?: string;

    data?: unknown;

    postDate?: Moment;

    constructor() {
        makeSafeObservable(this);
    }

    get status() {
        if (this.messageType === E.MessageType.projectChange) {
            return E.NotificationStatus.sign;
        }

        if (this.messageType === E.MessageType.updateEmail) {
            return E.NotificationStatus.profile;
        }

        return E.NotificationStatus.project;
    }

    get printDate() {
        if (!this.postDate) {
            return moment().format('LL');
        }

        if (this.postDate.isSame(moment(), 'day')) {
            return lang.dict.format('timeFormatTodayAt', [this.postDate.format('HH:mm')]);
        }

        if (this.postDate.isSame(moment().subtract(1, 'day'), 'day')) {
            return lang.dict.format('timeFormatYesterdayAt', [this.postDate.format('HH:mm')]);
        }

        if (this.postDate.isSame(moment().add(1, 'day'), 'day')) {
            return lang.dict.format('timeFormatTomorrowAt', [this.postDate.format('HH:mm')]);
        }

        return this.postDate.format('DD MMM, HH:mm');
    }
}
