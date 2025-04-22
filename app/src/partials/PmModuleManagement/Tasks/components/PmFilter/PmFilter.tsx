import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If, Input } from '~/bits';
import { hook } from '~/utils';
import type { PmModuleVm } from '~/views/PmModule/PmModule.vm';
import { PmFilterVm } from './PmFilter.vm';

type Props = {
    parentVm: PmModuleVm;
};

const createStageValues = (vm: PmFilterVm, parentVm: PmModuleVm) => {
    if (!parentVm.data) {
        return [];
    }

    const stages = parentVm.data.stages.map(stage => ({
        name: () => (
            <p className="filter-dropdown-list">
                <div className="filter-dropdown-list__num">
                    <Input.Checkbox
                        isChecked={Boolean(vm.tempFilter.stages?.includes(stage.id))}
                        type="check"
                    />
                    #{stage.id}
                </div>
                <span className="filter-dropdown-list__name">
                    {stage.name}
                </span>
                <span className="filter-dropdown-list__status" data-status={stage.status}>
                    {lang.dict.enum('pmStageStatus', stage.status)}
                </span>
            </p>
        ),
        value: stage.id,
        isVisible: false,
    }));

    stages.unshift({
        name: () => ((
            <p className="filter-dropdown-list">
                <div className="filter-dropdown-list__all">
                    <Input.Checkbox
                        isChecked={Boolean(vm.tempFilter.stages?.includes(-1))}
                        type="check"
                    />
                    {lang.dict.get('allStages')}
                </div>
            </p>
        )),
        value: -1,
        isVisible: false,
    });

    return stages;
};

const createUserValues = (vm: PmFilterVm, parentVm: PmModuleVm) => {
    if (!parentVm.data) {
        return [];
    }

    const users = Array.from(parentVm.data.numberOfActors.entries())
        .map(([type, number]) => ({
            name: () => (
                <p className="filter-user">
                    {lang.dict.enum('workflowTaskActor', type)}&nbsp;
                    <span className="filter-user__num">
                        {number}
                    </span>
                </p>
            ),
            value: Boolean(vm.tempFilter.usersType?.includes(type)),
            id: type,
        }));

    users.unshift({
        name: () => (
            <p className="filter-user">
                {lang.dict.get('selectAll')}
            </p>
        ),
        value: Boolean(vm.tempFilter.usersType?.includes(E.WorkflowActorType.none)),
        id: E.WorkflowActorType.none,
    });

    return users;
};

const createAcceptanceCriteria = (vm: PmFilterVm, parentVm: PmModuleVm) => {
    if (!parentVm.data) {
        return [];
    }

    const users = parentVm.data.acceptanceCriteria
        .map(name => ({
            name: () => (
                <p>
                    {name}
                </p>
            ),
            value: Boolean(vm.tempFilter.acceptanceCriteria?.includes(name)),
            id: name,
        }));

    users.unshift({
        name: () => (
            <p>
                {lang.dict.get('selectAll')}
            </p>
        ),
        value: Boolean(vm.tempFilter.acceptanceCriteria?.includes('none')),
        id: 'none',
    });

    return users;
};

const selectedStages = (vm: PmFilterVm, parentVm: PmModuleVm) => {
    if (!parentVm.data) {
        return [];
    }
    const stages = parentVm.project?.stages
        .filter(stage => vm.tempFilter.stages?.includes(stage.id));

    return stages?.map(stage => (
        <div
            className="stage-top-item"
            key={stage.id}
        >
            <p className="stage-top-item__text">
                {lang.dict.get('stage')}&nbsp;{stage.order}
            </p>
            <div className="stage-top-item__btn">
                <Button
                    color="transparent"
                    centerImg="close"
                    onClick={() => vm.setStageId(stage.id)}
                />
            </div>
        </div>
    ));
};

const createTaskStatus = (vm: PmFilterVm) => {
    const withoutNone = Object.values(E.TaskStatus)
        .filter(item => item !== E.TaskStatus.none);

    const status = withoutNone
        .map((taskStatus: E.TaskStatus) => ({
            value: Boolean(vm.tempFilter.status?.includes(taskStatus)),
            id: taskStatus,
            name: () => (
                <span
                    className="filter-status"
                    data-status={taskStatus}
                >
                    {lang.dict.enum('taskStatus', taskStatus)}
                </span>
            ),
        }));

    status.unshift({
        value: Boolean(vm.tempFilter.status?.includes(E.TaskStatus.none)),
        id: E.TaskStatus.none,
        name: () => (
            <span
                className="filter-status"
            >
                {lang.dict.get('selectAll')}
            </span>
        ),
    });

    return status;
};

export const PmFilter = observer(({ parentVm }: Props) => {
    const vm = hook.useVm(() => new PmFilterVm(parentVm));

    if (!parentVm.data) {
        return null;
    }

    return (
        <div className="pm-filter" data-is-open={vm.isOpen}>
            <div className="pm-filter__top-panel">
                <div className="pm-filter__top-panel-left">
                    <If condition={parentVm.isFilterByActive}>
                        <div className="pm-filter__top-stages">
                            {selectedStages(vm, parentVm)}
                        </div>
                    </If>
                </div>
                <div className="pm-filter__top-panel-right">
                    <If condition={parentVm.isFilterByActive}>
                        <div className="pm-filter__top-panel-clear">
                            <Button
                                color="transparent"
                                onClick={vm.clearFilters}
                                value={lang.dict.get('clearFilter')}
                            />
                        </div>
                    </If>
                    <div className="pm-filter__top-panel-filter">
                        <Button
                            color="transparent"
                            centerImg="filter-blue"
                            onClick={vm.toggleOpen}
                            value={lang.dict.get('filter')}
                        />
                    </div>
                </div>
            </div>
            <If condition={vm.isOpen}>
                <div className="pm-filter__bottom">
                    <p className="pm-filter__bottom-title">
                        {lang.dict.get('stages')}
                    </p>
                    <Input.Select
                        value={vm.tempFilter.stages?.find(id => id)}
                        values={createStageValues(vm, parentVm)}
                        onChange={vm.setStageId}
                        isCheckbox={true}
                    />
                    <div className="pm-filter__bottom-checkboxes">
                        <div className="pm-filter__bottom-col pm-filter__bottom-col--criteria">
                            <p className="pm-filter__bottom-col-title">
                                {lang.dict.get('acceptanceCriteria')}
                            </p>
                            <Input.Multiple
                                type="checkbox"
                                values={createAcceptanceCriteria(vm, parentVm)}
                                onChange={vm.setCriteria}
                            />
                        </div>
                        <div className="pm-filter__bottom-col pm-filter__bottom-col--users">
                            <p className="pm-filter__bottom-col-title">
                                {lang.dict.get('users')}
                            </p>
                            <Input.Multiple
                                type="checkbox"
                                values={createUserValues(vm, parentVm)}
                                onChange={vm.setUsers}
                            />
                        </div>
                        <div className="pm-filter__bottom-col pm-filter__bottom-col--status">
                            <p className="pm-filter__bottom-col-title">
                                {lang.dict.get('subscriptionInvoicesStatus')}
                            </p>
                            <Input.Multiple
                                type="checkbox"
                                values={createTaskStatus(vm)}
                                onChange={vm.setStatus}
                            />
                        </div>
                    </div>
                    <div className="pm-filter__bottom-btns">
                        <Button
                            color="transparent"
                            onClick={vm.clearFilters}
                            value={lang.dict.get('clearAll')}
                        />
                        <Button
                            color="blue"
                            value={lang.dict.get('filter')}
                            onClick={vm.setFilter}
                            isDisabled={!vm.isTempFilterActive}
                            rightImg="next"
                        />
                    </div>
                </div>
            </If>
        </div>
    );
});
