import { dtos, models } from '~/api';

export const getStagePlan = async (stageId: number) => {
    const data = await dtos.construction.execGetWholeStagePlanByIdQuery({
        id: stageId,
    });

    if (!data || !data.result) {
        return false;
    }

    return models.stage.toInternalStage(data.result);
};
