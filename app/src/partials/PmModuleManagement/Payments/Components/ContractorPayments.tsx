import { observer } from 'mobx-react';
import { useState } from 'react';
import { E, lang } from '~/api';
import { HeaderSwitch, ProgressBar, SortedTable } from '~/bits';
import { type PmPaymentType } from '~/models/PmModels/PmBudget';
import { type PaymentsVm } from '../Payments.vm';
import { utilsDate } from '~/utils';
import { toCurrency } from '~/utils/number';

type Props = {
    vm: PaymentsVm;
};

const getColumns = (onClickStage: (stageOrder?: number) => void, onClickTask: (taskId?: number) => void, isClient: boolean) => SortedTable.createColumns<PmPaymentType>(
    () => [
        {
            keyName: 'stageOrder',
            displayName: lang.dict.get('stage'),
            size: 2,
            isSortable: false,
            render: item => (
                <div className="stage" onClick={() => onClickStage(item.stageOrder)}>
                    {lang.dict.get('stage')} {item.stageOrder} -
                    {item.stageName}
                </div>
            ),
        },
        {
            keyName: 'amount',
            displayName: lang.dict.get('paymentAmount'),
            align: 'right',
            size: .7,
            isSortable: false,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">{lang.dict.get('paymentAmount')}</p>
                    <p className="value">{toCurrency(item.amount, 0, 3)}</p>
                </div>
            ),
        },
        {
            keyName: 'dueDate',
            displayName: lang.dict.get('dueDate'),
            align: 'right',
            size: .55,
            isSortable: false,
            render: item => (
                <div className="date">
                    <p className="title on-mobile">{lang.dict.get('dueDate')}</p>
                    <p className="value">
                        {utilsDate.displayDefaultDate(item.dueDate, 'LL')}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'subscriptionInvoicesStatus',
            displayName: lang.dict.get('subscriptionInvoicesStatus'),
            align: 'right',
            size: .4,
            isSortable: false,
            render: item => (
                <p
                    className="status"
                    data-status={item.taskStatus}
                    data-is-actionable={isClient}
                    onClick={() => onClickTask(item.userTaskId)}
                >
                    {lang.dict.enum('taskStatus', item.taskStatus)}
                </p>
            ),
        },
    ]);

export const ContractorPayments = observer(({ vm }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const totalSpent = vm.isClientContext ? lang.dict.get('totalSpent') : lang.dict.get('totalReceived');

    const header = (
        <div className="payment-header">
            <p className="payment-header__title">
                {lang.dict.get('contractorPayments')}
            </p>
        </div>
    );

    const details = (
        <>
            <div className="payment-details payment-details--spent">
                <p className="payment-details__title">
                    {lang.dict.get('total')}
                </p>
                <p className="payment-details__value">
                    {toCurrency(vm.budget?.totalContractorPayment, 0, 3)} {lang.dict.get('fieldOmr')}
                </p>
            </div>
            <div className="payment-details payment-details--spent">
                <p className="payment-details__title">
                    {lang.dict.get('totalRemaining')}
                </p>
                <p className="payment-details__value">
                    {toCurrency(vm.budget?.contractorRemaining, 0, 3)} {lang.dict.get('fieldOmr')}
                </p>
            </div>
            <div className="payment-details payment-details--spent">
                <p className="payment-details__title">
                    {totalSpent}
                </p>
                <p className="payment-details__value">
                    {toCurrency(vm.budget?.contractorTotalSpent, 0, 3)} {lang.dict.get('fieldOmr')}
                </p>
            </div>
            <div className="payment-details payment-details--bar">
                <p className="payment-details__title">
                    {lang.dict.get('paymentStatus')}
                </p>
                <p className="payment-details__value">
                    <ProgressBar values={vm.budget?.getPaymentProgress('contractor')} />
                </p>
            </div>
        </>
    );

    const description = (
        <p className="payment-desc">
            {vm.budget?.contractorPayments?.length} {lang.dict.get('payments')}
        </p>
    );

    return (
        <div className="payments-list__contractor">
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
                        data={vm.sorterContractor.values}
                        sorter={vm.sorterContractor}
                        keyValue="stageOrder"
                        columns={getColumns(vm.openStageViewModal, vm.openTask, vm.contextRole === E.RoleInCompany.client)}
                        paymentOnHover={item => item.taskStatus}
                    />
                </div>
            </HeaderSwitch>
        </div>
    );
});
