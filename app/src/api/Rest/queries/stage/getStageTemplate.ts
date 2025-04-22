import { dtos, models } from '~/api';

export const getStageTemplate = async (stageId: number) => {
    const data = await dtos.construction.execGetStageTemplateQuery({
        id: stageId,
    });

    if (!data || !data.result) {
        return false;
    }

    return models.stage.toInternalStage(data.result);
};
