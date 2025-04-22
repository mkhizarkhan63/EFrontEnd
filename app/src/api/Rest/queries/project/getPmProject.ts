import { dtos, models } from '~/api';

export const getPmProject = async (projectId: number) => {
    const data = await dtos.workflow.execGetProjectQuery({
        projectId,
    });

    if (!data) {
        return false;
    }

    return models.toInternalPmProject(projectId, data.result);
};

