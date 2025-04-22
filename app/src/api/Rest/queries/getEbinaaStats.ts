import { dtos } from '~/api';

export const getEbinaaStats = async () => {
    const projectStatistics = await dtos.construction.execGetEbinaaProjectStatisticsQuery(undefined);

    const companyStatistics = await dtos.contractor.execGetEbinaCompanyStatisticQuery(undefined);

    return {
        totalProjects: 0,
        projectsConstruction: 0,
        projectsDesign: 0,
        contractorCount: 0,
        consultantCount: 0,
        totalValueOfProject: 0,
        ...projectStatistics,
        ...companyStatistics,
    };
};
