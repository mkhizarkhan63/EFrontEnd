import { dtos, models } from '~/api';

export const getStageTemplateByFloorSetup = async (
    floorLevels: dtos.construction.GetStageTemplateByFloorSetupQuery,
) => {
    const item = await dtos.construction.execGetStageTemplateByFloorSetupQuery(
        floorLevels,
    );

    if (!item || !item.result) {
        return false;
    }

    return models.stage.toInternalStage(item.result);
};
