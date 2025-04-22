import { dtos, enums, T, E } from '~/api';

export type PmProjectStatistic = {
    completionPercentage: number;
    totalTimeElapsed: number;
    timeRemaining: number;
    totalDelay: number;
    contractorDelay: number;
    consultantDelay: number;
    clientDelay: number;
    projectStatus: E.PmProjectStatus;
    isDelayEqualPassed: boolean;
};

export const getPmProjectStatistics = async (projectId?: number) => {
    if (!projectId) {
        return;
    }

    const response = await dtos.workflow.execGetProjectStatisticQuery({ projectId });

    if (!response || !response.result) {
        return false;
    }

    const { result } = response;

    return {
        completionPercentage: result.completionPercentage ?? 0,
        totalTimeElapsed: result.totalDaysElapsed ?? 0,
        timeRemaining: result.daysRemaining ?? 0,
        totalDelay: result.totalDelayDays ?? 0,
        contractorDelay: result.contractorDelayDays ?? 0,
        consultantDelay: result.consultantDelayDays ?? 0,
        clientDelay: result.clientDelayDays ?? 0,
        projectStatus: T.tryCreate(
            result.projectStatus,
            enums.ProjectStatisitcType.castToInternal,
        ) ?? E.PmProjectStatus.none,
        isDelayEqualPassed: result.totalDaysElapsed === result.totalDelayDays,
    };
};

