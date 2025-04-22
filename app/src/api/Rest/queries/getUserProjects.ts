import { Mobx, T, dtos, enums, Id } from '~/api';
import { Project } from '~/models';

export const getUserProjects = async (profileId?: number) => {
    if (!profileId) {
        return [];
    }

    const data = await dtos
        .construction
        .execListUserManagementProjectsInfoQuery({ profileId });

    if (!data || !data.result) {
        return [];
    }

    return data.result.map(item => {
        const project = new Project();
        return Mobx.extendsObservable(project, {
            id: Id.init(item.id, 'external'),
            projectNumber: item.projectNumber,
            addedBuiltUpArea: item.addedBuiltUpArea,
            floorLevels: item.floorLevels,
            landType: T.create(
                item.landType,
                enums.ConstructionLand.castToInternal,
            ),
            projectStatus: T.create(
                item.projectStatus,
                enums.ProjectStatus.castToInternal,
            ),
            wilayatId: Id.tryInit(item.wilayatId, 'external'),
            governorateId: Id.tryInit(item.governorateId, 'external'),
            startingStep: T.create(
                item.startingStep,
                enums.ProjectStartingStep.castToInternal,
            ),
        });
    });
};
