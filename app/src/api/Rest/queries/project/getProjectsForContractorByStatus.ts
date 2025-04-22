import { dtos, enums, models, type Paging, T, type E } from '~/api';
import { stores } from '~/stores';

export const getProjectsForContractorByStatus = async (projectStatus: E.ProjectStatus, paging?: Paging) => {
    const data = await dtos.construction.execListConstructionProjectByStatusAndContractorQuery({
        contractorId: stores.profile.id,
        status: T.create(
            projectStatus,
            enums.ProjectStatus.castToExternal,
        ),
        ...paging?.toQuery(),
    });

    if (!data || !data.result || data.result.length === 0) {
        paging?.setPagesCount(0);
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);

    return data.result.map(item => models.project.toInternalProject(item));
};
