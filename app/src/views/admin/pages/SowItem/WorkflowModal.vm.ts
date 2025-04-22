import { action } from 'mobx';
import { Id, restQuery } from '~/api';
import type { Workflow } from '~/models';
import { stores } from '~/stores';

type Params = {
    workflow: Workflow;
    isPreview: boolean;
    onCancel?: () => void;
    onApply?: () => void;
};

export class WorkflowModalVm {
    constructor(public params: Params) {
        makeSafeObservable(this, {
            setTypeId: action,
        });
    }

    get types() {
        return stores
            .workflows
            .workflows
            .data
            .map(item => ({
                value: item.id.asNumber(),
                name: item.nameEn,
            }));
    }

    get workflowTasks() {
        const v = this.selectedType();

        if (!v) {
            return [];
        }

        return v.tasks;
    }

    selectedType = () => {
        if (this.workflowTypeId === undefined) {
            return undefined;
        }

        if (this.params.isPreview) {
            (async () => {
                const res = await restQuery.workflow.getWorkflowDetails(this.params.workflow, true);

                if (!res) {
                    return undefined;
                }

                return res;
            })();
        }

        return stores.workflows.workflows.get(this.workflowTypeId, true);
    };

    get workflowTypeId() {
        return this.workflow.typeId;
    }

    get workflow() {
        return this.params.workflow;
    }

    cancel = () => {
        this.params.onCancel?.();
    };

    setTypeId = (typeId: number) => {
        this.params.workflow.setTypeId(Id.init(typeId, 'external'));
    };

    apply = () => {
        this.params.onApply?.();
    };
}
