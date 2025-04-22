import { dtos, models } from '~/api';

export const getWorkflowsById = async (ids: number[]) => {
    const response = await dtos.workflow.execGetWorkflowsByIds({ ids });

    if (!response || !response.result || response.result?.length === 0) {
        return [];
    }

    return models.workflow.toInternalWorkflowTypes(response.result);
};
