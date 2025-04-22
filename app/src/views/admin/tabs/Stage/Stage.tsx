import { observer } from 'mobx-react';
import { lang } from '~/api';
import type { Stage as StageModel } from '~/models';
import { StageVm } from './Stage.vm';
import { Button, Close, If, Input, InputCounter, SortedTable } from '~/bits';
import { hook, utilsDate } from '~/utils';

type Props = {
    fromProject?: boolean;
};

const getColumns = (vm: StageVm) => SortedTable.createColumns<StageModel>(() => [
    {
        keyName: 'templateId',
        displayName: lang.dict.get('templateId'),
        render: item => <div>{item.stageId}</div>,
    },
    {
        keyName: 'templateName',
        displayName: lang.dict.get('template'),
        size: 4,
        render: item => <div className="template">{item.templateName}</div>,
    },
    {
        keyName: 'modifiedDateIsAscending',
        displayName: lang.dict.get('updatedOn'),
        align: 'right',
        render: item => <div className="stage-levels">{utilsDate.printDate(item.updatedOn)}</div>,
    },
    {
        keyName: 'noOfInspections',
        displayName: lang.dict.get('noOfInspections'),
        align: 'right',
        render: item => <div className="inspections">{item.numberOfInspections}</div>,
    },
    {
        keyName: 'projectScope',
        displayName: lang.dict.get('projectScope'),
        align: 'right',
        render: item => <div className="project-scope">{item.projectScope}</div>,
    },
    {
        keyName: 'projectInUse',
        displayName: lang.dict.get('projectInUse'),
        align: 'right',
        render: item => <div className="project-in-use">{item.projectInUse}</div>,
    },
    {
        keyName: 'status',
        displayName: lang.dict.get('status'),
        align: 'right',
        render: item => (
            <div data-status={item.forTemplate.status} className="status">
                {lang.dict.enum('sowAndStageStatus', item.status)}
            </div>
        ),
    },
    {
        keyName: 'viewDetails',
        displayName: lang.dict.get('action'),
        align: 'right',
        render: item => (
            <div className="action">
                <If condition={() => !item.forTemplate.isEditable}>
                    <div className="action__item">
                        <Button
                            color="transparent"
                            value={lang.dict.get('viewDetail')}
                            onClick={() => vm.showDetails(item.id)}
                        />
                    </div>
                    <div className="action__item">
                        <Button
                            color="transparent"
                            value={lang.dict.get('edit')}
                            onClick={() => vm.copyStage(item.id)}
                        />
                    </div>
                </If>
                <If condition={() => item.forTemplate.isEditable}>
                    <div className="action__item">
                        <Button
                            color="transparent"
                            value={lang.dict.get('edit')}
                            onClick={() => vm.showDetails(item.id)}
                        />
                    </div>
                    <div
                        className="action__item action__item--red"
                    >
                        <Button
                            color="transparent"
                            value={lang.dict.get('remove')}
                            onClick={() => vm.removeStage(item.id)}
                        />
                    </div>
                </If>
            </div>
        ),
    },
]);

export const StageManagement = observer((props: Props) => {
    const vm = hook.useVm(() => new StageVm(props.fromProject));

    return (
        <div className="stage-management">
            <div className="top-header">
                <h1 className="top-header__text">
                    {lang.dict.get('stageManagement')}
                    <span className="top-header__text-optional">({vm.stageList.paging.rowCount})</span>
                </h1>
                <div className="top-header__right">
                    <div className="filter" data-is-active={vm.isFilterOpened}>
                        <Button
                            color="transparent"
                            centerImg="filter"
                            onClick={vm.switchFilterOpened}
                        />
                    </div>
                    <If condition={() => vm.isMasterSow} >
                        <Button
                            color="blue"
                            leftImg="add"
                            value={lang.dict.get('createStageTemplate')}
                            onClick={vm.goToCreateStage}
                        />
                    </If>
                </div>
            </div>
            <div className="filter-container" data-is-open={vm.isFilterOpened}>
                <div className="filter-box">
                    <div className="filter-box__top">
                        <p className="filter-box__title">
                            {lang.dict.get('stageFilter')}
                        </p>
                        <Button
                            color="transparent"
                            value={lang.dict.get('filter')}
                            onClick={vm.setFilter}
                        />
                        <Button
                            color="transparent"
                            value={lang.dict.get('clearAll')}
                            onClick={vm.clearFilter}
                        />
                        <Close onClick={vm.switchFilterOpened} />
                    </div>
                    <div className="filter-box__bottom">
                        <InputCounter
                            value={vm.filter.basement}
                            onChange={vm.setBasement}
                            name={lang.dict.get('basement')}
                        />
                        <InputCounter
                            value={vm.filter.additionalFloors}
                            onChange={vm.setAdditionalFloors}
                            name={lang.dict.get('additionalFloors')}
                        />
                        <InputCounter
                            value={vm.filter.outerBlocks}
                            onChange={vm.setOuterBlocks}
                            name={lang.dict.get('outerBlocks')}
                        />
                        <div className="checkboxes-group">
                            <Input.Checkbox
                                type="check"
                                onChange={vm.setGroundFloor}
                                isChecked={vm.filter.groundFloor}
                                name={lang.dict.get('groundFloor')}
                            />
                            <Input.Checkbox
                                type="check"
                                onChange={vm.setLevellingFloor}
                                isChecked={vm.filter.levellingFloor}
                                name={lang.dict.get('levellingFloor')}
                            />
                            <Input.Checkbox
                                type="check"
                                onChange={vm.setPenthouseFloor}
                                isChecked={vm.filter.penthouseFloor}
                                name={lang.dict.get('penthouseFloor')}
                            />
                            <Input.Checkbox
                                type="check"
                                onChange={vm.setPool}
                                isChecked={vm.filter.pool}
                                name={lang.dict.get('pool')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SortedTable
                columns={getColumns(vm)}
                data={vm.stageList.data}
                keyValue="id"
                lazyLoad={vm.stageList}
                customHeader={vm.stageSorter}
            />
        </div>
    );
});
