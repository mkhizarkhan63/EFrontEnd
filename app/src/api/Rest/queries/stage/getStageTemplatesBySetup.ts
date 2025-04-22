import type { Paging } from '~/api/Paging';
import { dtos, models } from '../..';

export const getStageTemplatesBySetup = async (
    floorLevels?: dtos.construction.GetStageTemplateByFloorSetupQuery,
    paging?: Paging,
) => {
    if (!floorLevels) {
        return [];
    }

    const res = await dtos.construction.execListStageTemplateBySetupQuery({
        stageFilter: floorLevels,
        ...paging?.toQuery(),
    });

    if (!res || !res.result) {
        return [];
    }

    return res.result.map(item => models.stage.toInternalStage(item));
};
