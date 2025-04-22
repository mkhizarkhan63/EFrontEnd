import { observer } from 'mobx-react';
import { useState } from 'react';
import { E, lang } from '~/api';
import { Button, HeaderSwitch, Icons, ProgressBar, SortedTable } from '~/bits';
import type { MaterialListItemType } from '~/models';
import type { MaterialsVm } from '../Materials.vm';
import { ClientForContractorModal } from './ClientForContractorModal';

export type ClientForContractorProps = {
    type: 'clientForContractor';
    parentVm: MaterialsVm;
};

const getColumns = (parentVm: MaterialsVm) => SortedTable
    .createColumns<MaterialListItemType>(
    () => [
        {
            keyName: 'name',
            displayName: lang.dict.get('item'),
            size: 2.1,
            isSortable: false,
            render: item => (
                <div className="name">
                    <div
                        className="name__img-container"
                        data-is-empty={!item.sowItem.icon?.url}
                    >
                        <img
                            src={item.sowItem.icon?.url}
                            alt=""
                            className="name__img"
                        />
                    </div>
                    <Button
                        color="transparent"
                        onClick={() => parentVm.openSowItemModal(item.sowItem.externalId)}
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
                        {item.siteDeliveryDate?.format('dddd, D MMM YYYY') ?? '---'}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'currentTask',
            displayName: lang.dict.get('currentTask'),
            size: 1.5,
            isSortable: false,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">
                        {lang.dict.get('currentTask')}
                    </p>
                    <p className="value">
                        {lang.dict.enum('materialUserTaskType', item.currentTaskType)}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'status',
            displayName: lang.dict.get('status'),
            size: 1,
            align: 'right',
            isSortable: false,
            render: item => (
                <p
                    onClick={() => parentVm.openClientForContractorModal(item)}
                    className="status"
                    data-status={item.currentTaskStatus}
                    data-color={item.currentTask.contractorInstallationStatus}
                >
                    {lang.dict.get(item.currentTask.contractorInstallationStatus)}
                </p>
            ),
        },
    ]);

export const ClientForContractor = observer(({ parentVm }: ClientForContractorProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    if (!parentVm.pmMaterial?.clientForContractorInstallations) {
        return null;
    }

    const {
        sorterClientForContractor,
        pmMaterial: {
            clientForContractorInstallations,
            percentageStatusInstalations,
        },
        startDate,
    } = parentVm;

    if (sorterClientForContractor.values.length === 0) {
        return null;
    }

    const header = (
        <div className="materials-header">
            <p className="materials-header__title">
                {lang.dict.enum(
                    'materialType',
                    E.MaterialType.clientMaterialsForContractorInstallation,
                )}
            </p>
            <div className="materials-header__info">
                <div className="materials-header__info-icon">
                    <Icons icon="info" />
                </div>
                <p className="materials-header__info-hover">
                    {lang.dict.format('informationClientForContractor', [startDate?.clone().add(90, 'days').format('dddd, D MMM YYYY')])}
                </p>
            </div>
        </div>
    );

    const description = (
        <p className="materials-desc">
            {clientForContractorInstallations.length} {lang.dict.get('items')}
        </p>
    );

    const details = (
        <div className="materials-details materials-details--bar">
            <p className="materials-details__title">
                {lang.dict.get('paymentStatus')}
            </p>
            <ProgressBar
                values={percentageStatusInstalations}
            />
        </div>
    );

    return (
        <div className="client-for-contractor">
            <HeaderSwitch
                id={2}
                header={header}
                details={details}
                description={description}
                isCollapsed={isCollapsed}
                setCollapsed={() => setIsCollapsed(prev => !prev)}
                border="orange"
            >
                <div className="materials-table">
                    <SortedTable
                        data={sorterClientForContractor.values}
                        sorter={sorterClientForContractor}
                        keyValue="sowItemName"
                        columns={getColumns(parentVm)}
                    />
                </div>
            </HeaderSwitch>
            <ClientForContractorModal parentVm={() => parentVm} />
        </div>
    );
});
