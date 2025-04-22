import { dtos, models } from '~/api/Rest';

export const submitSelectedOption = async (materialUserTaskId: number, selectedOptionId: number) => {
    const res = await dtos.workflow.execSubmitSelectedOptionCommand({
        materialUserTaskId,
        selectedOptionId,
    });

    if (!res) {
        return;
    }

    return models.toInternalMaterialProgress(res.result);
};
