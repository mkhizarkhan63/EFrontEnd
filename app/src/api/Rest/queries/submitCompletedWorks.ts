import { dtos } from '~/api';
import { toInternalMaterialProgress } from '../models';

export const submitCompletedWorks = async (materialId: number, isApproved: boolean, reason: string) => {
    const response = await dtos.workflow.execSubmitCompletedWorksCommand({
        materialUserTaskId: materialId,
        isApproved,
        description: reason,
    });

    if (!response || !response.result) {
        return false;
    }

    return toInternalMaterialProgress(response.result);
};
