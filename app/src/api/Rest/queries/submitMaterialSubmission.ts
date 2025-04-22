import { dtos, models } from '~/api/Rest';

export const submitMaterialSubmission = async (
    materialUserTaskId: number,
    isApproved = true,
    description?: string,
) => {
    const result = await dtos.workflow.execSubmitMaterialSubmissionCommand({
        materialUserTaskId,
        isApproved,
        description,
    });

    if (!result) {
        return false;
    }

    return models.toInternalMaterialProgress(result.result);
};
