import { dtos, type Id } from '~/api';

export const createStagePlan = async (projectId: Id, stageTemplateId: Id) => {
    if (
        !stageTemplateId ||
        projectId.isType('internal') ||
        stageTemplateId.isType('internal')
    ) {
        return false;
    }

    const stage = await dtos.construction.execCreateStagePlanCommand({
        stageTemplateId: stageTemplateId.asNumber(),
        projectId: projectId.asNumber(),
    });

    if (!stage) {
        return false;
    }

    return stage.isSuccess;
};
