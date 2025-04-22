import moment from 'moment';
import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, If, ProgressBar } from '~/bits';
import type { SubscriptionAndInvoicesVm } from '../SubscriptionAndInvoices.vm';

/*
const getColumns = () => createTableColumns<Invoice, string>(() => [
    {
        keyName: 'description',
        displayName: lang.dict.get('subscriptionInvoicesDescription'),
        size: 3.7,
        render: item => (
            <div>
                <p className="name">{item.name}</p>
                <p className="desc">{item.description}</p>
            </div>
        ),
    },
    {
        keyName: 'dateOfPayment',
        displayName: lang.dict.get('subscriptionInvoicesDateOfPayment'),
        size: 1.2,
        align: 'right',
        render: item => <p className="date">{moment(item.paymentDate).format('DD/MM/YYYY')}</p>,
    },
    {
        keyName: 'price',
        displayName: lang.dict.get('subscriptionInvoicesPrice'),
        size: 1.2,
        align: 'right',
        render: item => <p className="price">{item.price}</p>,
    },
    {
        keyName: 'status',
        displayName: lang.dict.get('subscriptionInvoicesStatus'),
        align: 'right',
        render: item => <p className="unpaid">{item.status}</p>,
    },
    {
        keyName: 'action',
        displayName: lang.dict.get('subscriptionInvoicesAction'),
        align: 'right',
        render: () => <a href="" className="action">{lang.dict.get('viewDetail')}</a>,
    },
]);
*/

const Subscription = observer((props: { vm: SubscriptionAndInvoicesVm }) => {
    const subsriptionsValues = [
        {
            value: props.vm.leftSubscriptions,
            color: 'green' as const,
        },
    ];

    return (
        <div className="subscription__box">
            <div className="subscription__box-top">
                <h3 className="subscription__box-title">
                    {lang.dict.get('pageSubscriptions')}
                </h3>
                <span className="subscription__box-date">
                    {lang.dict.format(
                        'subscriptionDaysRemaining',
                        [moment(props.vm.endSubscripton).diff(moment(), 'day')],
                    )}
                </span>
            </div>
            <ProgressBar values={subsriptionsValues} />
            <div>
                <p className="subscription__box-date">
                    {lang.dict.format(
                        'subscriptionEndDate',
                        [moment(props.vm.endSubscripton).format('ll')],
                    )}
                </p>
                {/* <span className="subscription__profile-info subscription__profile-info--approved">Profile Approved</span> */}
            </div>
        </div>
    );
});

export const Active = observer((props: { vm: SubscriptionAndInvoicesVm }) => (
    <>
        <Subscription vm={props.vm} />
        <If condition={() => props.vm.invoices.length === 0}>
            <h3 className="subscription__title-main subscription__title-main--approved">
                {lang.dict.get('subscriptionYourProfile')}
            </h3>
            <p className="subscription__title-activesub">
                {lang.dict.get('subscriptionContactEbinaa')}
            </p>
            <Button
                color="green"
                value={lang.dict.get('subscriptionSignContract')}
                rightImg="next"
            />
        </If>
        {/* <If condition={() => props.vm.invoices.length > 0}>
            <h3 className="subscription__invoices-title">
                Invoices <span className="subscription__invoices-number">({props.vm.invoices.length})</span>
            </h3>
            <Table
                data={props.vm.invoices}
                keyValue="id"
                columns={getColumns()}
                isMovable={false}
            />
        </If> */}
    </>
));
