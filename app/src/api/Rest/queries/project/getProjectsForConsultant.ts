import { dtos, E, Mobx, models, type Paging, T, enums } from '~/api';
import { stores } from '~/stores';

type FilterConsultant = {
    projectType?: E.ProjectStartingStep;
    governorateCollection?: number;
};

export const getProjectsForConsultant = async (filter: FilterConsultant, paging?: Paging, newProjects = false) => {
    const viewType = () => {
        if (stores.profile.currentProfile.selectedCompany?.status === E.CompaniesStatus.invited) {
            return dtos.construction.ContractorViewType.invitedNewProjects;
        }

        return newProjects
            ? dtos.construction.ContractorViewType.newProjects
            : dtos.construction.ContractorViewType.myProjects;
    };

    const data = await dtos.construction.execListConstructionProjectForConsultantContextQuery({
        viewType: viewType(),
        ...paging?.toQuery(),
        ...filter.governorateCollection
            ? { governorateCollection: [filter.governorateCollection] }
            : [],
        ...filter.projectType
            ? { projectType: T.create(
                filter.projectType,
                enums.ProjectStartingStep.castToExternal,
            ) }
            : undefined,
    });

    if (!data || !data.result || data.result.length === 0) {
        paging?.setPagesCount(0);
        paging?.setRowCount(0);
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);
    paging?.setRowCount(data.rowCount ?? 0);

    const clientIds = new Set<number>();

    for (const item of data.result) {
        if (item.clientId) {
            clientIds.add(item.clientId);
        }
    }

    const clientNames = clientIds.size > 0
        ? await dtos.profile
            .execListProfileNameByIdsQuery({ idCollection: Array.from(clientIds) })
        : false;

    return data.result.map(item => {
        const project = models.project.toInternalProject(item);

        // TODO delete this when backend give client information - model construction
        Mobx.extendsObservable(project.forConsultant, {
            clientName: getClientName(clientNames, item.clientId),
        });

        return project;
    });
};

const getClientName = (
    clientNames: false | dtos.profile.ListProfileNameByIdsResponse,
    clientId?: number,
) => {
    if (!clientId || !clientNames) {
        return;
    }

    return clientNames.result.find(item => item.id === clientId)?.name;
};
