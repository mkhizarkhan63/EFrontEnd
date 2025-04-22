import { observer } from 'mobx-react';
import { Button, Icons, If, Input } from '~/bits';
import type { UpdatesVm } from '../../Updates.vm';
import { E, lang } from '~/api';

type Props = {
    vm: UpdatesVm;
};

const createStageValues = (vm: UpdatesVm) => {
    if (!vm.parentVm.data) {
        return [];
    }

    const stages = vm.parentVm.data.stages.map(stage => ({
        name: () => (
            <p className="filter-dropdown-list">
                <div className="filter-dropdown-list__num">
                    <Input.Checkbox
                        isChecked={Boolean(vm.localFilters.stages?.includes(stage.externalId ?? -1))}
                        type="check"
                    />
                    #{stage.id}
                </div>
                <span className="filter-dropdown-list__name">
                    {stage.name}
                </span>
                <span
                    className="filter-dropdown-list__status"
                    data-status={stage.status}
                >
                    {lang.dict.enum('pmStageStatus', stage.status)}
                </span>
            </p>
        ),
        value: stage.externalId ?? -1,
        isVisible: false,
    }));

    stages.unshift({
        name: () => ((
            <p className="filter-dropdown-list">
                <div className="filter-dropdown-list__all">
                    <Input.Checkbox
                        isChecked={Boolean(vm.localFilters.stages?.includes(-1))}
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

const createMaterialValues = (vm: UpdatesVm) => {
    if (!vm.parentVm.materials) {
        return [];
    }

    const materials = vm.parentVm.materials.map((material, i) => ({
        name: () => (
            <p className="filter-dropdown-list">
                <div className="filter-dropdown-list__num">
                    <Input.Checkbox
                        isChecked={Boolean(vm.localFilters.materials?.includes(material.id ?? -1))}
                        type="check"
                    />
                    #{i + 1}
                </div>
                <span className="filter-dropdown-list__name">
                    {material.englishName}
                </span>
            </p>
        ),
        value: material.id ?? -1,
        isVisible: false,
    }));

    materials.unshift({
        name: () => ((
            <p className="filter-dropdown-list">
                <div className="filter-dropdown-list__all">
                    <Input.Checkbox
                        isChecked={Boolean(vm.localFilters.materials?.includes(-1))}
                        type="check"
                    />
                    {lang.dict.get('allMaterials')}
                </div>
            </p>
        )),
        value: -1,
        isVisible: false,
    });

    return materials;
};

const createAcceptanceCriteria = (vm: UpdatesVm) => {
    if (!vm.parentVm.data) {
        return [];
    }

    const users = vm.parentVm.data.acceptanceCriteria
        .map(name => ({
            name: () => <p>{name}</p>,
            value: Boolean(vm.localFilters.acceptanceCriteria?.includes(name)),
            id: name,
        }));

    users.unshift({
        name: () => (
            <p>
                {lang.dict.get('selectAll')}
            </p>
        ),
        value: Boolean(vm.localFilters.acceptanceCriteria?.includes('none')),
        id: 'none',
    });

    return users;
};

const createUserValues = (vm: UpdatesVm) => {
    if (!vm.parentVm.data) {
        return [];
    }

    const users = Array.from(vm.parentVm.data.numberOfActors.entries())
        .map(([type]) => ({
            name: () => (
                <p className="filter-user">
                    {lang.dict.enum('workflowTaskActor', type)}&nbsp;
                </p>
            ),
            value: Boolean(vm.localFilters.usersType?.includes(type)),
            id: type,
        }));

    users.unshift({
        name: () => (
            <p className="filter-user">
                {lang.dict.get('selectAll')}
            </p>
        ),
        value: Boolean(vm.localFilters.usersType?.includes(E.WorkflowActorType.none)),
        id: E.WorkflowActorType.none,
    });

    return users;
};

export const UpdateFilter = observer(({ vm }: Props) => (
    <div
        className="updates-filter"
        data-is-open={vm.isFiltersOpened}
    >
        <div className="updates-filter__top-panel">
            <div className="updates-filter__top-panel-left" data-is-visible-btn-close={Boolean(vm.filters.searchText)}>
                <div className="search">
                    <Icons icon="search" />
                </div>
                <Input.Text
                    placeHolder={lang.dict.get('searchHere')}
                    value={vm.filters.searchText}
                    onChange={e => vm.setSearchValue(e)}
                    isDynamicWidth={true}
                />
                <If condition={() => Boolean(vm.filters.searchText)}>
                    <Button
                        color="transparent"
                        onClick={() => vm.clearSearch()}
                        centerImg="close"
                    />
                </If>
            </div>
            <div className="updates-filter__top-panel-right">
                <If condition={vm.isFiltersActive}>
                    <div className="pm-filter__top-panel-clear">
                        <Button
                            color="transparent"
                            onClick={vm.clearLocalFilters}
                            value={lang.dict.get('clearFilter')}
                        />
                    </div>
                </If>
                <div className="updates-filter__top-panel-filter">
                    <Button
                        color="transparent"
                        centerImg="filter-blue"
                        onClick={() => vm.switchFiltersOpened()}
                        value={lang.dict.get('filter')}
                    />
                </div>
            </div>
        </div>
        <If condition={vm.isFiltersOpened}>
            <div className="updates-filter__bottom">
                <div className="updates-filter__bottom-left">
                    <div className="updates-filter__bottom-field">
                        <p className="updates-filter__bottom-title">
                            {lang.dict.get('stages')}
                        </p>
                        <Input.Select
                            value={vm.localFilters.stages?.find(id => id)}
                            values={createStageValues(vm)}
                            onChange={vm.setStageId}
                            isCheckbox={true}
                        />
                    </div>
                    <div className="updates-filter__bottom-field">
                        <p className="updates-filter__bottom-title">
                            {lang.dict.get('materials')}
                        </p>
                        <Input.Select
                            value={vm.localFilters.materials?.find(id => id)}
                            values={createMaterialValues(vm)}
                            onChange={vm.setMaterialId}
                            isCheckbox={true}
                        />
                    </div>
                </div>
                <div className="updates-filter__bottom-checkboxes">
                    <div className="updates-filter__bottom-col updates-filter__bottom-col--criteria">
                        <p className="updates-filter__bottom-col-title">
                            {lang.dict.get('acceptanceCriteria')}
                        </p>
                        <Input.Multiple
                            type="checkbox"
                            values={createAcceptanceCriteria(vm)}
                            onChange={vm.setCriteria}
                        />
                    </div>
                    <div className="updates-filter__bottom-col updates-filter__bottom-col--users">
                        <p className="updates-filter__bottom-col-title">
                            {lang.dict.get('submittedBy')}
                        </p>
                        <Input.Multiple
                            type="checkbox"
                            values={createUserValues(vm)}
                            onChange={vm.setUsers}
                        />
                    </div>
                </div>
                <div className="updates-filter__bottom-btns">
                    <Button
                        color="transparent"
                        onClick={() => vm.clearLocalFilters()}
                        value={lang.dict.get('clearAll')}
                    />
                    <Button
                        color="blue"
                        value={lang.dict.get('filter')}
                        onClick={() => vm.submitLocalFilters()}
                        isDisabled={false}
                        rightImg="next"
                    />
                </div>
            </div>
        </If>
    </div>
));
