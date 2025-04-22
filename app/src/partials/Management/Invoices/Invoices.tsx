import { observer } from 'mobx-react';
import { lang } from '~/api';
import type { InvoiceType, SubscriptionType } from '~/models';
import { SortedTable, Button, If } from '~/bits';
import { hook } from '~/utils';
import { InvoicesVm } from './Invoices.vm';

type Props = {
    invoices: InvoiceType[];
    subscriptions?: SubscriptionType[];
};

const getColumnsForSubscriptions = () => SortedTable.createColumns<SubscriptionType>(() => [
    {
        keyName: 'subscriptionType',
        displayName: lang.dict.get('subscriptionType'),
        size: 2.22,
        render: item => <div className="type">{item.type}</div>,
    },
    {
        keyName: 'startDate',
        displayName: lang.dict.get('startDate'),
        align: 'right',
        size: .6,
        render: item => <div className="date">{item.startDate.format('DD/MM/yyyy')}</div>,
    },
    {
        keyName: 'endDate',
        displayName: lang.dict.get('endDate'),
        align: 'right',
        size: .58,
        render: item => <div className="date">{item.endDate.format('DD/MM/yyyy')}</div>,
    },
    {
        keyName: 'status',
        displayName: lang.dict.get('status'),
        align: 'right',
        size: .55,
        render: item => <div className="status" data-status={item.status}>{item.status}</div>,
    },
    {
        keyName: 'action',
        displayName: lang.dict.get('action'),
        align: 'right',
        size: 1.58,
        render: () => (
            <div className="buttons">
                <Button
                    color="transparent"
                    value={lang.dict.get('downloadContract')}
                />
                <Button
                    color="transparent"
                    value={lang.dict.get('changeSubscription')}
                />
            </div>
        ),
    },
]);

const getColumnsForInvoices = (vm: InvoicesVm) => SortedTable.createColumns<InvoiceType>(() => [
    {
        keyName: 'description',
        displayName: lang.dict.get('description'),
        size: 1.8,
        render: item => (
            <div className="invoice">
                <p className="invoice__number">{lang.dict.get('invoice')} #{item.invoiceNumber}</p>
                <p className="invoice__desc">{item.description}</p>
            </div>
        ),
    },
    {
        keyName: 'dateOfPayment',
        displayName: lang.dict.get('subscriptionInvoicesDateOfPayment'),
        align: 'right',
        size: .7,
        render: item => <div className="date">{item.dateOfPayment.format('DD/MM/yyyy')}</div>,
    },
    {
        keyName: 'price',
        displayName: lang.dict.get('subscriptionInvoicesPrice'),
        align: 'right',
        size: .7,
        render: item => <div className="price">{item.price}</div>,
    },
    {
        keyName: 'status',
        displayName: lang.dict.get('subscriptionInvoicesStatus'),
        align: 'right',
        size: .57,
        render: item => <div className="status-sub" data-status={item.status}>{item.status}</div>,
    },
    {
        keyName: 'action',
        displayName: lang.dict.get('action'),
        align: 'right',
        size: .74,
        render: () => (
            <Button
                color="transparent"
                value={lang.dict.get('viewDetail')}
                onClick={vm.viewDetail()}
            />
        ),
    },
]);

export const Invoices = observer(({ invoices, subscriptions }: Props) => {
    const vm = hook.useVm(() => new InvoicesVm(invoices, subscriptions));

    return (
        <div className="invoices">
            <h2 className="invoices__header">
                {lang.dict.get('invoices')}&nbsp;
                <span className="invoices__header-num">({vm.invoices.length})</span>
            </h2>
            <If condition={() => Boolean(vm.subscriptions)}>
                <div className="table-subscriptions">
                    <SortedTable
                        data={vm.subscriptions ?? []}
                        keyValue="id"
                        columns={getColumnsForSubscriptions()}
                        sorter={vm.sorterForSubscriptions}
                    />
                </div>
            </If>
            <SortedTable
                data={vm.invoices}
                keyValue="id"
                columns={getColumnsForInvoices(vm)}
                sorter={vm.sorterForInvoices}
            />
        </div>
    );
});
