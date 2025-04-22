import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { lang, type Id, type DndPort } from '~/api';
import type { SowItem, StageUnit } from '~/models';
import { LoadingPage } from '~/views';
import { StageVm } from './Stage.vm';
import { PageWithThinSidebar } from '~/partials';
import { useVm } from '~/utils/hook';

import {
    Button,
    If,
    Input,
    InputCounter,
    Subheader,
    SortedTable,
    Icons,
    ErrorList,
} from '~/bits';
import { SowItemModal } from './SowItemModal';
import { DeleteModal } from '~/bits/DeleteModal';
import { SowAndStageStatus } from '~/api/Enums';

type Props = {
    isCreating?: boolean;
};

type ItemsProps = {
    items: SowItem[];
    dndPort: DndPort<SowItem>;
    onRemove: (id: Id) => void;
    onClick: (id: Id) => void;
    isCreating?: boolean;
    color: (id: Id) => void;
};

type TablesProps = {
    vm: StageVm;
};

const Items = observer((props: ItemsProps) => {
    if (props.items.length === 0) {
        return (
            <div className="drag-drop-area">
                <Icons icon="upload-cloud" />
                <p className="drag-drop-area__text">
                    {lang.dict.get('dragDropScopeOfWork')}
                </p>
            </div>
        );
    }

    const items = props.items.map(item => (
        <div
            className="item"
            key={item.id.asStr()}
            data-status={props.color(item.id)}
            onClick={() => props.onClick(item.id)}
        >
            <p className="item__text">
                {item.englishName}
            </p>
            <div className="item__btn">
                <Button
                    color="transparent"
                    centerImg="close"
                    onClick={() => props.onRemove(item.id)}
                    hasStopPropagation={true}
                />
            </div>
        </div>
    ));

    return <>{items}</>;
});

const Tables = observer(({ vm }: TablesProps) => {
    const columns = getColumns(vm);
    const tables = vm.stage.parts.map(part => (
        <div
            className="stage-table"
            key={part.id.asNumber()}
            data-is-opened={vm.openTables.has(part.planStage)}
        >
            <div className="stage-table__header">
                <h2 className="stage-table__header-text">
                    {lang.dict.enum('planStage', part.planStage)}
                </h2>
                <div className="stage-table__header-right">
                    <Button
                        color="white"
                        isCircle={true}
                        centerImg="dropdown"
                        onClick={() => vm.toggleTable(part.planStage)}
                    />
                </div>
            </div>
            <div className="stage-table__toggle-content">
                <div className="table-with-btn-row">
                    <SortedTable
                        keyValue="id"
                        columns={columns}
                        data={part.forTemplate.templateUnits}
                        isMovable={vm.isMovable}
                        onMove={part.forTemplate.moveItem}
                    />
                    <If condition={() => vm.stage.forTemplate.isEditable}>
                        <div className="btn-row" onClick={() => part.forTemplate.addNewRow()}>
                            <Button
                                color="white"
                                leftImg="add"
                                value={lang.dict.get('addNewRow')}
                            />
                        </div>
                    </If>
                </div>
            </div>
        </div>
    ));
    return <>{tables}</>;
});

const getColumns = (vm: StageVm) => SortedTable.createColumns<StageUnit>(() => [
    {
        keyName: 'sequenceNo',
        displayName: lang.dict.get('sequenceNo'),
        size: .8,
        isMoving: true,
        render: item => (
            <div className="sequence-col">
                <Icons icon="grab" />
                <div className="sequence-col__number">{item.orderNumber}</div>
            </div>
        ),
    },
    {
        keyName: 'stageName',
        displayName: lang.dict.get('stageName'),
        size: 3,
        render: item => (
            <div className="stage-name-col">
                <div className="stage-name-col__first-row">
                    <Input.Text
                        onChange={e => item.setName(e, vm.stage.forTemplate.isEditable)}
                        value={item.stageName}
                        placeHolder={lang.dict.get('fieldEnglishStageName')}
                    />
                    <div
                        className="stage-name-col__btn"
                        data-is-opened={item.isOpen}
                    >
                        <Button
                            color="white"
                            isCircle={true}
                            centerImg="dropdown"
                            onClick={() => item.toggleOpen()}
                        />
                    </div>
                </div>
                <If condition={() => item.isOpen}>
                    <div className="stage-name-col__toggle">
                        <Input.Textarea
                            onChange={e => item.setDescription(e, vm.stage.forTemplate.isEditable)}
                            value={item.description}
                            placeHolder={lang.dict.get('textareaEnglishDescription')}
                        />
                        <div className="stage-name-col__arabic">
                            <Input.Text
                                onChange={e => item.setNameArabic(e, vm.stage.forTemplate.isEditable)}
                                value={item.stageNameArabic}
                                placeHolder={lang.dict.get(
                                    'fieldArabicStageName',
                                )}
                            />
                        </div>
                        <div className="stage-name-col__arabic">
                            <Input.Textarea
                                onChange={e => item.setDescriptionArabic(e, vm.stage.forTemplate.isEditable)}
                                value={item.descriptionArabic}
                                placeHolder={lang.dict.get(
                                    'textareaDescriptionInArabic',
                                )}
                            />
                        </div>
                    </div>
                </If>
            </div>
        ),
    },
    {
        keyName: 'suggestedPercent',
        displayName: lang.dict.get('suggestedPercent'),
        render: item => (
            <div className="suggested-col">
                <Input.Text
                    onChange={value => item.setSuggested(value, vm.stage.forTemplate.isEditable)}
                    placeHolder={lang.dict.get('inputWritePercent')}
                    value={item.suggestedPercentage.raw}
                />
            </div>
        ),
    },
    {
        keyName: 'suggestedTime',
        displayName: lang.dict.get('suggestedTime'),
        render: item => (
            <div className="suggested-col">
                <Input.Text
                    onChange={value => item.setSuggestedTime(value, vm.stage.forTemplate.isEditable)}
                    placeHolder={lang.dict.get('fieldWriteDays')}
                    value={item.suggestedTime.raw}
                />
            </div>
        ),
    },
    {
        keyName: 'items',
        displayName: lang.dict.get('items'),
        size: 3,
        render: item => (
            <div
                className="items-col"
                {...vm.dndPort.zoneProps(el => item.addSowItem(el, vm.stage.forTemplate.isEditable))}
            >
                <Items
                    items={vm.getSowItems(item.sowItems) ?? []}
                    dndPort={vm.dndPort}
                    onClick={id => vm.openSowItemModal(id)}
                    onRemove={id => vm.remove(item, id)}
                    color={id => vm.getColor(id)}
                />
            </div>
        ),
    },
    {
        keyName: 'action',
        displayName: lang.dict.get('action'),
        align: 'right',
        size: .6,
        render: item => (
            <div className="action-col">
                <div className="action-col__delete-btn">
                    <Button
                        color="transparent"
                        centerImg="delete"
                        onClick={() => vm.removeRow(item)}
                    />
                </div>
                <div className="action-col__copy-btn">
                    <Button
                        color="transparent"
                        centerImg="copy"
                        onClick={() => vm.copy(item)}
                    />
                </div>
            </div>
        ),
    },
]);

const getSowsItemsColumns = () => SortedTable.createColumns<SowItem>(() => [
    {
        keyName: 'no',
        displayName: lang.dict.get('no'),
        size: .4,
        render: () => <Icons icon="hamburger" />,
    },
    {
        keyName: 'name',
        displayName: lang.dict.get('name'),
        size: 5,
        render: item => (
            <p className="name">
                <span>{item.englishName}</span>&nbsp;
                <If condition={!item.forConstruction.isMandatory}>
                    <span className="optional">{lang.dict.get('fieldOptional')}</span>
                </If>
            </p>
        ),
    },
    {
        keyName: 'usedTimes',
        displayName: lang.dict.get('usedCount'),
        size: 1.65,
        align: 'right',
        render: item => <div>{item.sowItemUseTimes}</div>,
    },
]);

const Sidebar = observer(({ vm }: { vm: StageVm }) => (
    <div className="stage-details-sidebar">
        <p className="stage-details-sidebar__title">{lang.dict.get('masterSow')}</p>
        <SortedTable
            data={vm.masterSowItems}
            keyValue="id"
            dndPort={vm.dndPort}
            columns={getSowsItemsColumns()}
        />
    </div>
));

export const Stage = observer((props: Props) => {
    const vm = useVm(() => new StageVm({
        isCreating: props.isCreating === true,
    }), [props.isCreating]);

    const [sidebar, setSidebar] = useState(() => () => <Sidebar vm={vm} />);

    useEffect(() => {
        setSidebar(() => () => <Sidebar vm={vm} />);
    }, [vm]);

    if (vm.isLoading) {
        return <LoadingPage />;
    }

    return (
        <div
            className="stage-details-page"
            data-is-editable={vm.stage.isEditing}
            data-is-stage-id={Boolean(vm.stage.stageId)}
            data-is-template-editable={vm.stage.forTemplate.isEditable}
        >
            <ErrorList
                messages={vm.messages}
                errors={vm.stage.errorListHolder}
            />
            <PageWithThinSidebar sidebar={sidebar}>
                <Subheader
                    hasReturnButton={true}
                    pageName={vm.stage.templateName}
                    variant="stage-details"
                    returnButton={vm.goBack}
                    pageSubName={(
                        <>
                            <div className="stage-status" data-status={vm.stage.forTemplate.status}>
                                {lang.dict.enum('sowAndStageStatus', vm.stage.forTemplate.status)}
                            </div>
                            <If condition={vm.stage.status === SowAndStageStatus.live}>
                                <Button
                                    color="blue"
                                    value={lang.dict.get('makeInactive')}
                                    onClick={() => vm.openDeleteModal()}
                                />
                            </If>
                        </>
                    )}
                >
                    <Subheader.Right>
                        <If condition={vm.stage.forTemplate.isEditable}>
                            <div className="edit-toggle">
                                <span className="edit-toggle__text">
                                    {lang.dict.get('edit')}
                                </span>
                                <Input.Checkbox
                                    isChecked={vm.stage.isEditing}
                                    onChange={vm.stage.toggleIsEditing}
                                    type="toggle"
                                />
                            </div>
                        </If>
                    </Subheader.Right>
                    <If condition={Boolean(vm.stage.stageId)}>
                        <Subheader.Bottom>
                            <div className="template-id">
                                <span className="template-id-title">
                                    {lang.dict.get('editingBasedOnTemplateId')}
                                </span>
                                <span className="template-id-value">
                                    {vm.stage.stageId}
                                </span>
                            </div>
                            <div className="template-id">
                                <span className="template-id-title">
                                    {lang.dict.get('sowId')}
                                </span>
                                <span className="template-id-value">
                                    {vm.stage.masterSowId}
                                </span>
                            </div>
                        </Subheader.Bottom>
                    </If>
                </Subheader>
                <div className="stage-details">
                    <div className="stage-add-new">
                        <If condition={() => vm.stage.forTemplate.isEditable}>
                            <Input.Text
                                name={lang.dict.get('stageName')}
                                value={vm.stage.templateName}
                                onChange={vm.stage.setName}
                            />
                        </If>
                    </div>
                    <div className="stage-levels">
                        <div className="stage-levels__title">
                            {lang.dict.get('stageLevels')}
                        </div>
                        <div className="stage-levels__row">
                            <InputCounter
                                onChange={vm.stage.setBasement}
                                value={vm.stage.basement}
                                name={lang.dict.get('basement')}
                            />
                            <InputCounter
                                onChange={vm.stage.setAdditionalFloors}
                                value={vm.stage.additionalFloors}
                                name={lang.dict.get('additionalFloors')}
                            />
                            <InputCounter
                                onChange={vm.stage.setOuterBlocks}
                                value={vm.stage.outerBlocks}
                                name={lang.dict.get('outerBlocks')}
                            />
                            <div className="checkboxes-group">
                                <Input.Checkbox
                                    type="check"
                                    onChange={vm.stage.setGroundFloor}
                                    isChecked={vm.stage.groundFloor}
                                    name={lang.dict.get('groundFloor')}
                                />
                                <Input.Checkbox
                                    type="check"
                                    onChange={vm.stage.setLevellingFloor}
                                    isChecked={vm.stage.levellingFloor}
                                    name={lang.dict.get('levellingFloor')}
                                />
                                <Input.Checkbox
                                    type="check"
                                    onChange={vm.stage.setPenthouseFloor}
                                    isChecked={vm.stage.penthouseFloor}
                                    name={lang.dict.get('penthouseFloor')}
                                />
                                <Input.Checkbox
                                    type="check"
                                    onChange={vm.stage.setPool}
                                    isChecked={vm.stage.pool}
                                    name={lang.dict.get('pool')}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Tables vm={vm} />
                    </div>
                    <If condition={() => vm.stage.forTemplate.isEditable}>
                        <div className="stage-details__btns-row">
                            <If condition={() => !vm.isCreating} >
                                <Button
                                    color="white"
                                    value={lang.dict.get('save')}
                                    onClick={vm.save}
                                />
                                <Button
                                    color="green"
                                    value={vm.publishText}
                                    rightImg="next"
                                    onClick={vm.publish}
                                />
                            </If>
                            <If condition={() => vm.isCreating} >
                                <Button
                                    color="white"
                                    value={lang.dict.get('save')}
                                    onClick={vm.save}
                                />
                            </If>
                        </div>
                    </If>
                    <If condition={() => vm.isSowItemModal}>
                        <SowItemModal vm={vm} />
                    </If>
                </div>
            </PageWithThinSidebar>
            <If condition={vm.isDeleteModalOpened}>
                <DeleteModal
                    onCancel={vm.closeDeleteModal}
                    onBlur={vm.closeDeleteModal}
                    title={lang.dict.get('makeInactive')}
                    buttonTitle={lang.dict.get('makeInactive')}
                    description={lang.dict.get('areYouSure')}
                    onDelete={vm.makeInactive}
                />
            </If>
        </div>
    );
});
