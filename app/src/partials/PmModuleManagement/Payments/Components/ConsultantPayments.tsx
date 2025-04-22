import { observer } from 'mobx-react';
import moment from 'moment';
import { useState } from 'react';
import { lang } from '~/api';
import { HeaderSwitch, ProgressBar, SortedTable } from '~/bits';
import { type PmPaymentType } from '~/models/PmModels/PmBudget';
import { type PaymentsVm } from '../Payments.vm';
import { toCurrency } from '~/utils/number';

type Props = {
    vm: PaymentsVm;
};

const getColumns = (onClickPayment: (payment: PmPaymentType) => void) => SortedTable.createColumns<PmPaymentType>(
    () => [
        {
            keyName: 'month',
            displayName: lang.dict.get('month'),
            size: 1.8,
            isSortable: true,
            render: item => (
                <div className="month">
                    {moment().month(item.forMonth - 1).format('MMMM')}
                </div>
            ),
        },
        {
            keyName: 'siteVisits',
            displayName: lang.dict.get('siteVisits'),
            align: 'right',
            size: .4,
            isSortable: true,
            render: item => (
                <div className="visits">
                    <p className="title on-mobile">
                        {lang.dict.get('siteVisits')}
                    </p>
                    <p className="value">
                        {item.siteVisitsCount}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'totalPaid',
            displayName: lang.dict.get('totalPaid'),
            align: 'right',
            size: .7,
            isSortable: true,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">
                        {lang.dict.get('totalPaid')}
                    </p>
                    <p className="value">
                        {toCurrency(item.amount, 0, 3)}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'dueDate',
            displayName: lang.dict.get('dueDate'),
            align: 'right',
            size: 1.2,
            isSortable: true,
            render: item => (
                <div className="date">
                    <p className="title on-mobile">
                        {lang.dict.get('dueDate')}
                    </p>
                    <p className="value">
                        {item.dueDate?.format('dddd, D MMM YYYY, h:mm A')}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'subscriptionInvoicesStatus',
            displayName: lang.dict.get('subscriptionInvoicesStatus'),
            align: 'right',
            size: .5,
            isSortable: true,
            render: item => (
                <p
                    className="status"
                    data-status={item.paymentStatusForConsultant}
                    data-is-actionable={item.isActionable}
                    onClick={() => onClickPayment(item)}
                >
                    {lang.dict.enum('taskStatus', item.paymentStatusForConsultant)}
                </p>
            ),
        },
    ]);

export const ConsultantPayments = observer(({ vm }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const header = (
        <div className="payment-header">
            <p className="payment-header__title">
                {lang.dict.get('consultantPayments')}
            </p>
            <p className="payment-header__visit">
                {vm.budget?.consultantPricePerVisit} {lang.dict.get('omrMonth')}
            </p>
        </div>
    );

    const totalSpent = vm.isClientContext ? lang.dict.get('totalSpent') : lang.dict.get('totalReceived');

    const details = (
        <>
            <div className="payment-details payment-details--visits">
                <p className="payment-details__title">
                    {lang.dict.get('pricePerVisitOmr')}
                </p>
                <p className="payment-details__value">
                    {vm.budget?.consultantPricePerVisit} OMR
                </p>
            </div>
            <div className="payment-details payment-details--visits">
                <p className="payment-details__title">
                    {lang.dict.get('actualVisits')}
                </p>
                <p className="payment-details__value">
                    {vm.budget?.totalConsultantVisits}
                </p>
            </div>
            <div className="payment-details payment-details--spent">
                <p className="payment-details__title">
                    {totalSpent}
                </p>
                <p className="payment-details__value">
                    {toCurrency(vm.budget?.consultantTotalSpent, 0, 3)} {lang.dict.get('fieldOmr')}
                </p>
            </div>
            <div className="payment-details payment-details--bar">
                <p className="payment-details__title">
                    {lang.dict.get('paymentStatus')}
                </p>
                <p className="payment-details__value">
                    <ProgressBar values={vm.budget?.getPaymentProgress('consultant')} />
                </p>
            </div>
        </>
    );

    const description = (
        <p className="payment-desc">
            {vm.budget?.consultantPayments?.length} {lang.dict.get('payments')}
        </p>
    );

    return (
        <div className="payments-list__consultant">
            <HeaderSwitch
                id={1}
                header={header}
                details={details}
                description={description}
                isCollapsed={isCollapsed}
                setCollapsed={() => setIsCollapsed(prev => !prev)}
                border="orange"
            >
                <div className="materials-table">
                    <SortedTable
                        data={vm.sorterConsultant.values}
                        sorter={vm.sorterConsultant}
                        keyValue="stageName"
                        columns={getColumns(vm.openConsultantPaymentTask)}
                        paymentOnHover={item => item.taskStatus}
                    />
                </div>
            </HeaderSwitch>
        </div>
    );
});
