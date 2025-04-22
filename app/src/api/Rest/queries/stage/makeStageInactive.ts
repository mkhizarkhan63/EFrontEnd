import { dtos } from '../..';

export const makeStageInactive = async (stageId: number) => {
    const res = await dtos.construction.execUpdateStageTemplateToInactiveCommand({ id: stageId });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
