import { observer } from 'mobx-react';
import { useState } from 'react';
import { E, lang } from '~/api';
import { Button, HeaderSwitch, Icons, If, ProgressBar, SortedTable } from '~/bits';
import type { SubContractorType } from '~/models';
import type { MaterialsVm } from '../Materials.vm';
import { ClientSubContractorModal } from './ClientSubContractorModal';

export type ClientSubContractorsProps = {
    type: 'clientSubContractors';
    parentVm: MaterialsVm;
};

const getColumns = (
    parentVm: MaterialsVm,
) => SortedTable.createColumns<SubContractorType>(
    () => [
        {
            keyName: 'sowItemName',
            displayName: lang.dict.get('item'),
            size: 1.5,
            isSortable: false,
            render: item => {
                const name = lang.currentLanguage === 'en' ? item.sowItemDto?.englishName : item.sowItemDto?.arabicName;

                return (
                    <div className="name">
                        <div
                            className="name__img-container"
                            data-is-empty={!item.sowItemDto?.icon?.url}
                        >
                            <img
                                src={item.sowItemDto?.icon?.url}
                                alt=""
                                className="name__img"
                            />
                        </div>
                        <Button
                            color="transparent"
                            onClick={() => parentVm.openSowItemModal(item.sowItemDto?.externalId)}
                            value={name ?? item.subContractedMaterialName}
                        />
                    </div>
                );
            },
        },
        {
            keyName: 'subContractorName',
            displayName: lang.dict.get('subContractors'),
            isSortable: false,
            render: item => {
                const isDefaultName = item.subContractorName.length === 0;

                return (
                    <div className="item">
                        <p className="title on-mobile">
                            {lang.dict.get('subContractors')}
                        </p>
                        <p className="value">
                            {isDefaultName ? '---' : item.subContractorName}
                        </p>
                    </div>
                );
            },
        },
        {
            keyName: 'stageOrder',
            displayName: lang.dict.get('stage'),
            size: .45,
            isSortable: false,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">
                        {lang.dict.get('stage')}
                    </p>
                    <p className="value">
                        {lang.dict.format('stageFormat2', [item.stageOrder])}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'purchaseDate',
            displayName: lang.dict.get('deliverBefore'),
            size: 1.1,
            align: 'right',
            isSortable: false,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">
                        {lang.dict.get('deliverBefore')}
                    </p>
                    <p className="value">
                        {item.currentTask?.dueDate?.format('dddd, D MMM YYYY') ?? '---'}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'subContractorMaterialStatus',
            displayName: lang.dict.get('status'),
            size: .8,
            align: 'right',
            isSortable: false,
            render: item => {
                const { isValidUserActor, status } = item.currentTask;

                const isNormalStatus = !isValidUserActor || status === E.TaskStatus.completed;
                const statusByContext = isNormalStatus ? lang.dict.enum('taskStatus', status) : lang.dict.get('supplyNow');

                return (
                    <p
                        onClick={() => parentVm.openSubContractorModal(item)}
                        className="status"
                        data-status={status}
                        data-is-client={isValidUserActor}
                    >
                        {statusByContext}
                    </p>
                );
            },
        },
    ]);

export const ClientSubContractors = observer(({ parentVm }: ClientSubContractorsProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    if (!parentVm.pmMaterial?.clientSubcontractors) {
        return null;
    }

    const {
        setNewExpenceModal,
        sorterSubContractor,
        isClientContext,
        pmMaterial: {
            clientSubcontractors,
            percentageStatusSubContractors,
        },
    } = parentVm;

    if (sorterSubContractor.values.length === 0) {
        return null;
    }

    const header = (
        <div className="materials-header">
            <p className="materials-header__title">
                {lang.dict.enum(
                    'materialType',
                    E.MaterialType.clientSubContractorMaterials,
                )}
            </p>
            <div className="materials-header__info">
                <div className="materials-header__info-icon">
                    <Icons icon="info" />
                </div>
                <p className="materials-header__info-hover">
                    {lang.dict.get('informationClienSubContractors')}
                </p>
            </div>
        </div>
    );

    const description = (
        <>
            <p className="materials-desc">
                {clientSubcontractors.length} {lang.dict.get('items')}
            </p>
            <If condition={isClientContext && isCollapsed}>
                <div className="materials-details materials-details--add on-mobile">
                    <Button
                        color="transparent"
                        leftImg="add"
                        value={lang.dict.get('addExpenses')}
                        onClick={setNewExpenceModal}
                    />
                </div>
            </If>
        </>
    );

    const details = (
        <>
            <div className="materials-details">
                <If condition={isClientContext}>
                    <If condition={!isCollapsed}>
                        <Button
                            color="blue"
                            leftImg="add"
                            value={lang.dict.get('addExpenses')}
                            onClick={setNewExpenceModal}
                        />
                    </If>
                    <If condition={isCollapsed}>
                        <Button
                            color="transparent"
                            leftImg="add"
                            value={lang.dict.get('addExpenses')}
                            onClick={setNewExpenceModal}
                        />
                    </If>
                </If>
            </div>
            <div className="materials-details materials-details--bar">
                <p className="materials-details__title">
                    {lang.dict.get('paymentStatus')}
                </p>
                <ProgressBar
                    values={percentageStatusSubContractors}
                />
            </div>
        </>
    );

    return (
        <div className="client-sub-contractor" data-is-client={isClientContext}>
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
                        data={sorterSubContractor.values}
                        sorter={sorterSubContractor}
                        keyValue="sowItemName"
                        columns={getColumns(parentVm)}
                    />
                </div>
            </HeaderSwitch>
            <ClientSubContractorModal parentVm={() => parentVm} />
        </div>
    );
});
