import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, HeaderSwitch, Icons, If, ProgressBar, SortedTable } from '~/bits';
import type { MaterialsVm } from '../Materials.vm';
import { useState } from 'react';
import { ContractorForClientModal } from './ContractorForClientModal';
import { type MaterialListItemType } from '~/models';
import { utilsDate, utilsString } from '~/utils';

export type ContractorForClientProps = {
    type: 'contractorForClient';
    parentVm: MaterialsVm;
};

const getColumns = (
    openSowItemModal: (id: number) => void,
    openModal: (workflowSequenceId: number) => void,
) => SortedTable.createColumns<MaterialListItemType>(
    () => [
        {
            keyName: 'sowItemName',
            displayName: lang.dict.get('item'),
            size: 2.5,
            isSortable: false,
            render: item => (
                <div className="name">
                    <div
                        className="name__img-container"
                        data-is-empty={!item.sowItem.icon}
                    >
                        <img
                            src={item.sowItem.icon?.url}
                            alt=""
                            className="name__img"
                        />
                    </div>
                    <Button
                        color="transparent"
                        onClick={() => openSowItemModal(item.sowItem.externalId ?? 0)}
                        value={item.sowItemName}
                    />
                </div>
            ),
        },
        {
            keyName: 'stageOrder',
            displayName: lang.dict.get('stage'),
            size: .55,
            isSortable: false,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">
                        {lang.dict.get('stage')}
                    </p>
                    <p className="value">
                        {lang.dict.get('stage')} {item.stageOrder}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'siteDeliveryDate',
            displayName: lang.dict.get('siteDeliveryDate'),
            size: 1.35,
            isSortable: false,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">
                        {lang.dict.get('siteDeliveryDate')}
                    </p>
                    <p className="value">
                        {utilsDate.displayDefaultDate(
                            item.siteDeliveryDate, 'dddd, D MMM YYYY',
                        )}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'currentTask',
            displayName: lang.dict.get('currentTask'),
            size: 1.4,
            isSortable: false,
            render: item => {
                const name = item.currentTaskStatus === E.TaskStatus.completed
                    ? lang.dict.get('contractorMustDeliver')
                    : utilsString.capitalize(item.currentTaskType, true) ?? '---';

                return (
                    <div className="item">
                        <p className="title on-mobile">
                            {lang.dict.get('currentTask')}
                        </p>
                        <p className="value">
                            {name}
                        </p>
                    </div>
                );
            },
        },
        {
            keyName: 'subContractorMaterialStatus',
            displayName: lang.dict.get('status'),
            size: 1.2,
            align: 'right',
            isSortable: false,
            render: item => (
                <p
                    className="status"
                    onClick={() => openModal(item.materialWorkflowId)}
                    data-status={item.currentTask.status}
                    data-color={item.currentTask.contractorForClientStatus}
                >
                    {lang.dict.get(item.currentTask.contractorForClientStatus)}
                </p>
            ),
        },
    ]);

export const ContractorForClient = observer(({ parentVm }: ContractorForClientProps) => {
    if (!parentVm.pmMaterial?.contractorForClientApprovals) {
        return null;
    }

    const [isCollapsed, setIsCollapsed] = useState(true);

    const {
        isContractorForClientModal,
        currentMaterialForClientApproval,
        openSowItemModal,
        openContractorForClientModal,
        closeContractorForClientModal,
        sorterContractorForClient,
        pmMaterial: {
            contractorForClientApprovals,
            percentageStatusApprovals,
        },
        startDate,
    } = parentVm;

    if (sorterContractorForClient.values.length === 0) {
        return null;
    }

    const header = (
        <div className="materials-header">
            <p className="materials-header__title">
                {lang.dict.enum(
                    'materialType',
                    E.MaterialType.contractorMaterialsForClientApproval,
                )}
            </p>
            <div className="materials-header__info">
                <div className="materials-header__info-icon">
                    <Icons icon="info" />
                </div>
                <p className="materials-header__info-hover">
                    {lang.dict.format('informationContractorForClient', [startDate?.clone().add(90, 'days').format('dddd, D MMM YYYY')])}
                </p>
            </div>
        </div>
    );

    const description = (
        <p className="materials-desc">
            {contractorForClientApprovals.length} {lang.dict.get('items')}
        </p>
    );

    const details = (
        <>
            <div className="materials-details materials-details--bar">
                <p className="materials-details__title">
                    {lang.dict.get('paymentStatus')}
                </p>
                <ProgressBar
                    values={percentageStatusApprovals}
                />
            </div>
        </>
    );

    return (
        <div className="contractor-for-client">
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
                        data={sorterContractorForClient.values}
                        sorter={sorterContractorForClient}
                        keyValue="sowItemName"
                        columns={getColumns(openSowItemModal, openContractorForClientModal)}
                    />
                </div>
            </HeaderSwitch>
            <If condition={isContractorForClientModal}>
                <ContractorForClientModal
                    onBlur={closeContractorForClientModal}
                    materialItem={currentMaterialForClientApproval}
                    parentVm={parentVm}
                />
            </If>
        </div>
    );
});
