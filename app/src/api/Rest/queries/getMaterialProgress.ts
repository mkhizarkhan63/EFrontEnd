import { dtos, models } from '~/api/Rest';

export const getMaterialProgress = async (
    materialWorkflowSequenceId: number,
    materialUserTaskId?: number,
    isOption = false,
) => {
    const response = await dtos.workflow.execGetMaterialProgressQuery({
        materialWorkflowSequenceId,
        materialUserTaskId,
    });

    if (!response) {
        return;
    }

    const res = response.result;

    return models.toInternalMaterialProgress(res, isOption);
};
