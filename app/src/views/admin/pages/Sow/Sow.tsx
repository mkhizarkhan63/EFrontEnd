import { observer } from 'mobx-react';
import { LoadingPage } from '~/views';
import { Page } from '~/partials';
import type { SowItem } from '~/models';
import { SowVm } from './Sow.vm';
import { E, lang } from '~/api';
import { ErrorList, Subheader, Button, If, Input, SortedTable } from '~/bits';
import { hook, utilsDate } from '~/utils';
import { DeleteModal } from '~/bits/DeleteModal';

type Props = {
    isCreating?: boolean;
};

const getColumns = (vm: SowVm) => SortedTable.createColumns<SowItem>(() => [
    {
        keyName: 'orderNumber',
        displayName: lang.dict.get('no'),
        size: .25,
        render: item => <div className="number">{item.orderNumber}</div>,
    },
    {
        keyName: 'englishName',
        displayName: lang.dict.get('items'),
        size: 2,
        render: item => <div className="items">{item.englishName}</div>,
    },
    {
        keyName: 'itemCategory',
        displayName: lang.dict.get('itemType'),
        size: 1.8,
        render: item => <div className="category">{item.category && lang.dict.get(E.SowItemCategory[item.category])}</div>,
    },
    {
        keyName: 'numberOfSpecs',
        displayName: lang.dict.get('noOfSpecs'),
        size: .7,
        align: 'right',
        render: item => <div className="specs">{item.numberOfSpecs}</div>,
    },
    {
        keyName: 'numberOfWorkflows',
        displayName: lang.dict.get('noOfWorkflows'),
        align: 'right',
        render: item => <div className="workflows">{item.numberOfWorkflows}</div>,
    },
    {
        keyName: 'consultantVisits',
        displayName: lang.dict.get('consultantTasks'),
        align: 'right',
        render: item => <div className="visits">{item.consultantVisits}</div>,
    },
    {
        keyName: 'edit',
        displayName: lang.dict.get('action'),
        size: .6,
        align: 'right',
        render: item => (
            <div className="action">
                <If condition={() => vm.sow.isEditable}>
                    <div className="button button--delete">
                        <Button
                            color="transparent"
                            rightImg="delete"
                            onClick={vm.openDeleteItemModal(item.id)}
                        />
                    </div>
                    <div className="button button--edit">
                        <Button
                            color="transparent"
                            rightImg="edit"
                            onClick={vm.openDetails(item.id)}
                        />
                    </div>
                </If>
                <If condition={() => !vm.sow.isEditable}>
                    <Button
                        color="transparent"
                        value={lang.dict.get('view')}
                        onClick={vm.openDetails(item.id)}
                    />
                </If>
            </div>
        ),
    },
]);

export const Sow = observer((props: Props) => {
    const vm = hook.useVm(() => new SowVm(props.isCreating), [props.isCreating]);

    if (vm.isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="sow-view">
            <Page>
                <div className="subheader-type subheader-type--sow">
                    <Subheader
                        returnButton={vm.goBack}
                        hasReturnButton={true}
                        pageNameVariant="inactive"
                        pageName={vm.isCreating ? 'Unsaved SOW draft' : vm.sow.contractName}
                    >
                        <Subheader.Right>
                            <div className="subheader-item">
                                <p className="subheader-item__label">
                                    {lang.dict.get('usedFrom')}
                                </p>
                                <p className="subheader-item__value">
                                    {utilsDate.printDate(vm.sow.usedFrom)}
                                </p>
                            </div>
                            <div className="subheader-item">
                                <p className="subheader-item__label">
                                    {lang.dict.get('usedTo')}
                                </p>
                                <p className="subheader-item__value">
                                    {vm.sow.isMasterSow ? 'Now' : utilsDate.printDate(vm.sow.usedTo)}
                                </p>
                            </div>
                            <If condition={() => vm.sow.isEditable}>
                                <If condition={() => !vm.isCreating}>
                                    <Button
                                        color="blue"
                                        leftImg="add"
                                        value={lang.dict.get('newItem')}
                                        onClick={vm.createSowItem}
                                    />
                                </If>
                                <Button
                                    color="green"
                                    rightImg="next"
                                    value={lang.dict.get('publish')}
                                    onClick={vm.save}
                                />
                            </If>
                        </Subheader.Right>
                        <Subheader.Bottom>
                            <div className="sow-labels">
                                <div className="sow-labels__status" data-status={vm.sow.status}>
                                    {lang.dict.enum('sowAndStageStatus', vm.sow.status)}
                                </div>
                                <If condition={() => vm.sow.isMasterSow}>
                                    <div className="sow-labels__master-sow">
                                        {lang.dict.get('masterSow')}
                                    </div>
                                </If>
                            </div>
                        </Subheader.Bottom>
                    </Subheader>
                </div>
                <div className="sow">
                    <div className="contract-name">
                        <If condition={() => vm.isShownSaveButton}>
                            <Button
                                color="green"
                                rightImg="next"
                                value={lang.dict.get('save')}
                                onClick={vm.saveName}
                            />
                        </If>
                        <Input.Text
                            name={lang.dict.get('sowName')}
                            value={vm.localSowName}
                            onChange={vm.setLocalSowName}
                        />
                    </div>
                    <If condition={() => !vm.isCreating}>
                        <div className="top-header">
                            <p className="top-header__text">
                                {lang.dict.get('items')}
                                <span className="grey-text">
                                    ({vm.sow.sowItems.length})
                                </span>
                            </p>
                            <If condition={() => vm.sow.isEditable}>
                                <If condition={() => !vm.isMovable}>
                                    <div className="btn-animate">
                                        <Button
                                            color="white"
                                            value={lang.dict.get('reorderItems')}
                                            onClick={vm.startReorder}
                                        />
                                    </div>
                                </If>
                                <If condition={() => vm.isMovable}>
                                    <div className="btn-animate">
                                        <Button
                                            rightImg="next"
                                            color="green"
                                            value={lang.dict.get('save')}
                                            onClick={vm.saveOrder}
                                        />
                                    </div>
                                </If>
                            </If>
                        </div>
                        <ErrorList errors={vm.errorListHolder} />
                        <SortedTable
                            data={vm.sorter.values}
                            keyValue="id"
                            columns={getColumns(vm)}
                            isMovable={vm.isMovable}
                            onMove={vm.sow.moveItem}
                            sorter={vm.sorter}
                        />
                    </If>
                </div>
                <If condition={() => vm.isDeleteItemModal}>
                    <DeleteModal
                        onCancel={vm.closeDeleteItemModal}
                        onBlur={vm.closeDeleteItemModal}
                        title={lang.dict.get('deleteSowItem')}
                        description={lang.dict.get('deleteSowItemDescription')}
                        onDelete={vm.deleteSowItem}
                        buttonTitle={lang.dict.get('delete')}
                    />
                </If>
            </Page>
        </div>
    );
});
