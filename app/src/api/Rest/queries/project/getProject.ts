import { dtos, models } from '~/api';

export const getProject = async (id: number) => {
    const data = await dtos.construction.execGetConstructionProjectQuery({
        id,
    });

    if (!data || !data.result) {
        return false;
    }

    const item = data.result;
    const project = models.project.toInternalProject(item);

    await models.project.loadProjectFiles(item, project);

    return project;
};
