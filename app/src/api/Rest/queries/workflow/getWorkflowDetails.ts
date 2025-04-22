import { Mobx, dtos } from '~/api';
import { WorkflowType, type Workflow } from '~/models';

export const getWorkflowDetails = async (workflow: Workflow, isPreview: boolean) => {
    const response = await dtos.workflow.execGetWorkflowByIdQuery({
        workflowId: workflow.typeId.asNumber(),
        sowId: workflow.sowId.asNumber(),
        sowSubItemId: workflow.sowSubItemId.asNumber(),
    });

    if (!response || !response.result) {
        return;
    }

    if (isPreview) {
        const workfloww = new WorkflowType(response.result.id);

        Mobx.extendsObservable(workfloww, {
            nameEn: response.result.nameEn,
        });

        return workfloww;
    }

    const tasks = response.result?.workflowTasks ?? [];

    for (const task of tasks) {
        workflow.initEditor(task.id, task.actionValue);
    }
};
