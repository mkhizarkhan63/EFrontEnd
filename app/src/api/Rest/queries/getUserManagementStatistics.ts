import { dtos } from '~/api';

export const getUserManagementStatistics = async (profileIds: number[]) => {
    const projects = await dtos
        .construction
        .execGetUserManagementStatisticsQuery({ profileIds });

    if (!projects) {
        return [];
    }

    return projects.result;
};
