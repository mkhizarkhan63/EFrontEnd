import { action, runInAction } from 'mobx';
import { E } from '~/api';
import type { PmFilter } from '~/models';
import type { PmModuleVm } from '~/views/PmModule/PmModule.vm';

export class PmFilterVm {
    isOpen = false;

    tempFilter: PmFilter = {};

    constructor(private parentVm: PmModuleVm) {
        makeSafeObservable(this, {
            clearFilters: action,
            toggleOpen: action,
            setStageId: action,
            setCriteria: action,
            setUsers: action,
            setStatus: action,
            setFilter: action,
        });
    }

    get isTempFilterActive() {
        return [
            this.tempFilter.phasesType,
            this.tempFilter.stages,
            this.tempFilter.status,
            this.tempFilter.usersType,
            this.tempFilter.acceptanceCriteria,
        ].some(item => item !== undefined && item.length > 0);
    }

    clearFilters = () => {
        runInAction(() => {
            this.tempFilter = {};
            this.parentVm.filterBy = {};
        });
    };

    toggleOpen = () => {
        this.isOpen = !this.isOpen;
    };

    setStageId = (id: number, values?: number[]) => {
        if (!values && this.tempFilter.stages) {
            this.tempFilter.stages = this.tempFilter.stages
                ?.filter(stageId => stageId !== id && stageId !== -1);

            this.parentVm.filterBy.stages = Array.from(this.tempFilter.stages);
            return;
        }

        if (!this.tempFilter.stages) {
            this.tempFilter.stages = id !== -1 ? [id] : values;
            return;
        }

        if (id === -1) {
            this.tempFilter.stages = this.tempFilter.stages.includes(id) ? undefined : values;
            return;
        }

        if (!this.tempFilter.stages.includes(id)) {
            this.tempFilter.stages.unshift(id);
            return;
        }

        this.tempFilter.stages = this.tempFilter.stages
            .filter(stageId => stageId !== id && stageId !== -1);
    };

    setCriteria = (name: string, value: boolean, values: string[]) => {
        if (!this.tempFilter.acceptanceCriteria) {
            this.tempFilter.acceptanceCriteria = name !== 'none' ? [name] : values;
            return;
        }

        if (name === 'none') {
            this.tempFilter.acceptanceCriteria = this.tempFilter.acceptanceCriteria
                .includes(name)
                ? undefined
                : values;
            return;
        }

        if (!this.tempFilter.acceptanceCriteria.includes(name)) {
            this.tempFilter.acceptanceCriteria.unshift(name);
            return;
        }

        this.tempFilter.acceptanceCriteria = this.tempFilter.acceptanceCriteria
            .filter(workflowName => workflowName !== name && workflowName !== 'none');
    };

    setUsers = (name: E.WorkflowActorType, value: boolean, values: E.WorkflowActorType[]) => {
        if (!this.tempFilter.usersType) {
            this.tempFilter.usersType = name !== E.WorkflowActorType.none ? [name] : values;
            return;
        }

        if (name === E.WorkflowActorType.none) {
            this.tempFilter.usersType = this.tempFilter.usersType.includes(name) ? undefined : values;
            return;
        }

        if (!this.tempFilter.usersType.includes(name)) {
            this.tempFilter.usersType.unshift(name);
            return;
        }

        this.tempFilter.usersType = this.tempFilter.usersType
            .filter(actor => actor !== name && actor !== E.WorkflowActorType.none);
    };

    setStatus = (name: E.TaskStatus, value: boolean, values: E.TaskStatus[]) => {
        if (!this.tempFilter.status) {
            this.tempFilter.status = name !== E.TaskStatus.none ? [name] : values;
            return;
        }

        if (name === E.TaskStatus.none) {
            this.tempFilter.status = this.tempFilter.status.includes(name) ? undefined : values;
            return;
        }

        if (!this.tempFilter.status.includes(name)) {
            this.tempFilter.status.unshift(name);
            return;
        }

        this.tempFilter.status = this.tempFilter.status
            .filter(actor => actor !== name && actor !== E.TaskStatus.none);
    };

    setFilter = () => {
        const { stages, phasesType, usersType, status, acceptanceCriteria } = this.tempFilter;

        this.parentVm.filterBy = {
            stages: stages ? Array.from(stages) : undefined,
            phasesType: phasesType ? Array.from(phasesType) : undefined,
            usersType: usersType ? Array.from(usersType) : undefined,
            status: status ? Array.from(status) : undefined,
            acceptanceCriteria: acceptanceCriteria ? Array.from(acceptanceCriteria) : undefined,
        };
    };
}
