import { dtos, Mobx, models, restQuery } from '~/api';

export const getProjectForAdmin = async (id: number) => {
    const data = await dtos.construction.execGetConstructionProjectQuery({
        id,
    });

    if (!data || !data.result) {
        return false;
    }

    const item = data.result;
    const project = models.project.toInternalProject(item);

    Mobx.extendsObservable(project.forAdmin, {
        design: await downloadDesign(item.designId),
        contractorInvitationCount: item.contractorInvitationCount,
        consultantInvitationCount: item.consultantInvitationCount,
    });

    await models.project.loadProjectFiles(item, project);

    return project;
};

const downloadDesign = async (designId?: number) => {
    if (!designId) {
        return;
    }

    const result = await restQuery.design.getDesign(designId);

    return result || undefined;
};
