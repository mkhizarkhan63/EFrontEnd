import { observer } from 'mobx-react';
import { useState } from 'react';
import { E, lang } from '~/api';
import { HeaderSwitch, If, ProgressBar, SortedTable } from '~/bits';
import { type PmMaterialPaymentType } from '~/models/PmModels/PmBudget';
import { type PaymentsVm } from '../Payments.vm';
import { ClientForContractorModal } from './ClientForContractorModal';
import { ClientSubContractorModal } from './ClientSubContractorModal';
import { toCurrency } from '~/utils/number';

type Props = {
    vm: PaymentsVm;
};

const getColumns = (vm: PaymentsVm) => SortedTable.createColumns<PmMaterialPaymentType>(
    () => [
        {
            keyName: 'materials',
            displayName: lang.dict.get('materials'),
            size: 2,
            isSortable: true,
            render: item => <div className="materials">{item.name}</div>,
        },
        {
            keyName: 'supplier',
            displayName: lang.dict.get('supplier'),
            align: 'right',
            size: .7,
            isSortable: true,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">{lang.dict.get('supplier')}</p>
                    <p className="value">{item.supplierName}</p>
                </div>
            ),
        },
        {
            keyName: 'totalPrice',
            displayName: lang.dict.get('totalPrice'),
            align: 'right',
            size: .35,
            isSortable: true,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">{lang.dict.get('totalPrice')}</p>
                    <p className="value">{toCurrency(item.totalValue, 0, 3)}</p>
                </div>
            ),
        },
        {
            keyName: 'status',
            displayName: lang.dict.get('status'),
            align: 'right',
            size: .4,
            isSortable: true,
            render: item => {
                const { materialType, taskStatus } = item;
                const { clientSubContractorMaterials } = E.MaterialType;

                const isSubContractor = materialType === clientSubContractorMaterials;
                const isCompleted = taskStatus === E.TaskStatus.completed;
                const isNormalStatus = isCompleted || !isSubContractor;

                const statusByContext = isNormalStatus
                    ? lang.dict.enum('taskStatus', taskStatus)
                    : lang.dict.get('supplyNow');

                return (
                    <p
                        onClick={() => vm.openSubContractorModal(item)}
                        className="status"
                        data-status={taskStatus}
                        data-is-normal-status={isNormalStatus}
                    >
                        {statusByContext}
                    </p>
                );
            },
        },
    ]);

export const ClientMaterialPayments = observer(({ vm }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const header = (
        <div className="payment-header">
            <p className="payment-header__title">
                {lang.dict.get('clientMaterialPayments')}
            </p>
        </div>
    );

    const details = (
        <>
            <div className="payment-details payment-details--spent">
                <p className="payment-details__title">
                    {lang.dict.get('totalSpent')}
                </p>
                <p className="payment-details__value">
                    {toCurrency(vm.budget?.clientMaterialsTotalSpent, 0, 3)} {lang.dict.get('fieldOmr')}
                </p>
            </div>
            <div className="payment-details payment-details--bar">
                <p className="payment-details__title">
                    {lang.dict.get('paymentStatus')}
                </p>
                <p className="payment-details__value">
                    <ProgressBar values={vm.budget?.clientPaymentProgress} />
                </p>
            </div>
        </>
    );

    const description = (
        <p className="payment-desc">
            {vm.budget?.clientMaterials?.length} {lang.dict.get('payments')}
        </p>
    );

    return (
        <div>
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
                        data={vm.sorterClient.values}
                        sorter={vm.sorterClient}
                        keyValue="name"
                        columns={getColumns(vm)}
                        paymentOnHover={item => item.taskStatus}
                    />
                </div>
            </HeaderSwitch>
            <If condition={() => vm.isClientForContractorInstallationType}>
                <ClientForContractorModal parentVm={() => vm} />
            </If>
            <If condition={() => vm.isClientSubContractorType}>
                <ClientSubContractorModal parentVm={() => vm} />
            </If>
        </div>
    );
});
