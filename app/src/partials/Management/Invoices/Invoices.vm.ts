import { Sorter } from '~/api';
import type { InvoiceType, SubscriptionType } from '~/models';

export class InvoicesVm {
    invoices: InvoiceType[] = [];

    subscriptions?: SubscriptionType[];

    sorterForInvoices = new Sorter(
        () => this.invoices,
        by => ({
            status: by.string('status'),
            price: by.number('price'),
            dateOfPayment: by.date('dateOfPayment'),
        }),
        'dateOfPayment',
    );

    sorterForSubscriptions = new Sorter(
        () => this.subscriptions ?? [],
        by => ({
            startDate: by.date('startDate'),
            endDate: by.date('endDate'),
        }),
        'startDate',
    );

    constructor(invoices: InvoiceType[], subscriptions?: SubscriptionType[]) {
        makeSafeObservable(this);
        this.invoices = invoices;
        this.subscriptions = subscriptions;
    }

    viewDetail = () => () => {
        /* */
    };
}
