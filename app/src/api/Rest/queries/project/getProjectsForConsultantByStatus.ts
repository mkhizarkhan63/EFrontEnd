import { dtos, enums, models, T, type E } from '~/api';

export const getProjectsForConsultantByStatus = async (projectStatus: E.ProjectStatus) => {
    const data = await dtos.construction.execListConstructionProjectByStatusAndConsultantQuery({
        statusView: T.create(
            projectStatus,
            enums.ConsultantStatusView.castToExternal,
        ),
    });

    if (!data || !data.result || data.result.length === 0) {
        return [];
    }

    return data.result.map(item => models.project.toInternalProject(item));
};
