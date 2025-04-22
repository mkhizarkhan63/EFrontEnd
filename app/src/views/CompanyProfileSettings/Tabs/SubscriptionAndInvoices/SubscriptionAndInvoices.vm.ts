import moment from 'moment';
import { utils, E } from '~/api';

enum Status {
    paid = 'paid',
    unpaid = 'unpaid',
}

export type Invoice = {
    id: string;
    name: string;
    description: string;
    paymentDate: moment.Moment;
    price: number;
    status: Status;
};

export class SubscriptionAndInvoicesVm {
    subscription: E.SubscriptionStatus | false = false;

    startSubscripton = moment('2022/12/29');

    endSubscripton = moment('2023/12/28');

    invoices: Invoice[] = [];

    constructor() {
        makeSafeObservable(this);

        this.subscription = E.SubscriptionStatus.active;

        this.invoices = [
            {
                id: utils.generateId(this.invoices, 'id'),
                name: 'Invoice #1239763',
                description: 'Project #12235673',
                paymentDate: moment('2021/11/23'),
                price: 6000,
                status: Status.paid,
            },
            {
                id: utils.generateId(this.invoices, 'id'),
                name: 'Invoice #1239763',
                description: '1 Year Subscription',
                paymentDate: moment('2021/11/28'),
                price: 150,
                status: Status.unpaid,
            },
        ];
    }

    get leftSubscriptions() {
        const allDays = moment(this.endSubscripton)
            .diff(moment(this.startSubscripton), 'day');

        const leftDays = moment(this.endSubscripton)
            .diff(moment(), 'day');

        return Math.round(leftDays / allDays * 100);
    }
}
