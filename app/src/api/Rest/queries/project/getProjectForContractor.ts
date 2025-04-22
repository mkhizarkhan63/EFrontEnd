import { dtos, models } from '~/api';

export const getProjectForContractor = async (id: number) => {
    const data = await dtos
        .construction
        .execGetConstructionProjectWithBidQuery({ id });

    if (!data || !data.result) {
        return false;
    }

    const item = data.result;
    const project = models.project.toInternalProject(item);

    await models.project.loadProjectFiles(item, project);

    return project;
};
