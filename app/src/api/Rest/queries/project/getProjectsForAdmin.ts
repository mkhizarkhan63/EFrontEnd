import { dtos, enums, T, type Paging, type E } from '~/api';
import { ProjectAdminMst } from '~/models';
import { stores } from '~/stores';
import type { DesignProjectStatus, ProjectStatus } from '~/api/Enums';

export const getProjectsForAdmin = async (
    type: E.AdminProjectView,
    paging?: Paging,
    projectIdFilter?: string,
    projectName?: string,
    projectStatus?: ProjectStatus[],
    designProjectStatus?: DesignProjectStatus[],
) => {
    const projectFilter = projectStatus?.map(item => T.create(item, enums.ProjectStatus.castToExternal));
    const designProjectFilter = designProjectStatus?.map(item => T.create(item, enums.DesignStatus.castToExternal));

    const data = await dtos.construction.execListConstructionProjectQuery({
        viewType: T.create(
            type,
            enums.AdminProjectView.castToExternal,
        ),
        ...paging?.toQuery(),
        filterRules: {
            projectId: projectIdFilter,
            constructionStatuses: projectFilter,
            designStatuses: designProjectFilter,

        },
        searchValue: projectName,
    });

    if (!data || !data.result || data.result.length === 0) {
        paging?.setPagesCount(0);
        paging?.setRowCount(0);
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);
    paging?.setRowCount(data.rowCount ?? 0);

    return data.result.map(item => ProjectAdminMst.create({
        id: stores.idCollection.getInternal('constructionProjectAdmin', item.id),
        projectNumber: item.projectNumber,
        clientName: item.client?.name,
        contractorName: item.contractor?.name,
        modifiedDate: T.create(item.modifiedDate, T.Timestamp),
        projectStatus: T.create(item.projectStatus, enums.ProjectStatus.castToInternal),
        consultantName: item.designConsultant?.name,
        designStatus: T.create(item.designProjectStatus, enums.DesignStatus.castToInternal),
    }));
};
