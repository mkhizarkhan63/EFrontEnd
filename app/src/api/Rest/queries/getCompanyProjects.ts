import { Mobx, T, dtos, enums, Id, E } from '~/api';
import { Project, type CompanyType } from '~/models';

export const getCompanyProjects = async (company?: CompanyType) => {
    if (!company || !company.externalId) {
        return [];
    }

    const data = await dtos.construction
        .execListCompanyManagementProjectsInfoQuery({
            ...company.type === E.ProfileType.consultant
                ? {
                    consultantIds: [company.externalId],
                }
                : {
                    contractorIds: [company.externalId],
                },
        });

    if (!data || !data.result) {
        return [];
    }

    return toInnerProjects(data.result);
};

const toInnerProjects = (result: dtos.construction.AdminPanelConstructionProjectInfoDto[]) => result
    .map(item => Mobx.extendsObservable(new Project(), {
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
    }));
