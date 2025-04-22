import { dtos, E } from '~/api';
import type { CompanyType } from '~/models';

export const getProjectStatistics = async (project?: CompanyType) => {
    if (!project?.externalId) {
        return 0;
    }

    const statistics = await dtos
        .construction
        .execGetCompanyManagementProjectsCountQuery({
            [project.type === E.ProfileType.consultant ? 'consultantIds' : 'contractorIds']: [project.externalId],
        });

    if (!statistics || !statistics.result) {
        return 0;
    }

    return statistics.result;
};

