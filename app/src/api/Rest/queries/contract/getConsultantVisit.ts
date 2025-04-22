import { dtos, E, enums, T } from '~/api';
import type { StageUnit } from '~/models';

export const getConsultantVisit = async (stageItems: StageUnit[]) => await Promise
    .all(stageItems.map(async item => {
        const workflows = item.forContract.workflows.find(id => id > 0);

        const response = workflows
            ? await dtos.workflow.execGetNumberOfVisitsForWorkflowsQuery({
                workflowIds: item.forContract.workflows,
                visitorType: T.create(
                    E.WorkflowActorType.consultant,
                    enums.WorkflowActorType.castToExternal,
                ) })
            : undefined;

        if (!response) {
            return {
                itemId: item.id,
                visit: 0,
            };
        }

        return {
            itemId: item.id,
            visit: response.result ?? 0,
        };
    }));
