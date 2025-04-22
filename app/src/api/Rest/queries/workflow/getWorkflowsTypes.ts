import { dtos, models } from '~/api';

export const getWorkflowsTypes = async () => {
    const response = await dtos.workflow.execGetAllWorkflowsQuery(undefined);

    if (!response || !response.result || response.result?.length === 0) {
        return [];
    }

    return models.workflow.toInternalWorkflowTypes(response.result);
};
