import { dtos, type Id } from '~/api';

export const deleteStageTemplate = async (stageId: Id) => {
    if (stageId.isType('internal')) {
        return false;
    }

    return await dtos
        .construction
        .execDeleteStageTemplateCommand({ id: stageId.asNumber() });
};
