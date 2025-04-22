import { dtos, E, models, T, type Paging } from '~/api';
import { ContractorViewType } from '../../enums';
import { getProjectsForContractorByStatus } from './getProjectsForContractorByStatus';

export const getProjectsForContractor = async (
    status: E.ProjectStatus,
    viewType: E.ContractorViewType,
    paging?: Paging,
    governorateCollection?: number[],
    minimumProjectSize?: number,
) => {
    if (viewType === E.ContractorViewType.myProjects && status !== E.ProjectStatus.none) {
        return getProjectsForContractorByStatus(status, paging);
    }

    const data = await dtos.construction.execListConstructionProjectWithBidQuery({
        minimumProjectSize,
        governorateCollection,
        viewType: T.create(
            viewType,
            ContractorViewType.castToExternal,
        ),
        ...paging?.toQuery(),
    });

    if (!data || !data.result || data.result.length === 0) {
        paging?.setPagesCount(0);
        paging?.setRowCount(0);
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);
    paging?.setRowCount(data.rowCount ?? 0);

    return data.result.map(item => models.project.toInternalProject(item));
};
