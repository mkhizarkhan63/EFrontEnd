import { dtos, enums, T } from '~/api';
import type { Workflow } from '~/models';

export const saveWorkflowActionsValues = async (workflow: Workflow) => {
    if (
        !workflow.sowId.isType('external') ||
        !workflow.typeId.isType('external') ||
        !workflow.sowSubItemId.isType('external')
    ) {
        return false;
    }

    const type = workflow.type;

    if (!type) {
        return false;
    }

    const tasks = type.tasks.map(t => ({
        ...t,
        actorType: T.create(t.actorType, enums.WorkflowActorType.castToExternal),
        actionType: T.create(t.actionType, enums.WorkflowActionType.castToExternal),
        actionValue: workflow.getStrignifyData(t.id),
    }));

    const response = await dtos.workflow.execSaveWorkflowActionsValuesCommand({
        sowId: workflow.sowId.asNumber(),
        taskActionModels: [
            {
                workflowId: workflow.typeId.asNumber(),
                sowSubItemActions: [
                    {
                        sowSubItemId: workflow.sowSubItemId.asNumber(),
                        workflowTaskDtos: tasks,
                    },
                ],
            },
        ],
    });

    if (!response) {
        return false;
    }

    return response.isSuccess;
};
