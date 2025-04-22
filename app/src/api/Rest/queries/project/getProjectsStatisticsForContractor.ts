import { dtos } from '~/api';

export const getProjectsStatisticsForContractor = async () => {
    const data = await dtos.construction
        .execGetConstructionProjectStatisticsByContractorQuery(undefined);

    return {
        invitedCount: 0,
        openBidsCount: 0,
        chooseContractorCount: 0,
        bidSelectedCount: 0,
        readyToSignCount: 0,
        signedCount: 0,
        liveInPmCount: 0,
        archivedCount: 0,
        allCount: 0,
        ...data,
    };
};
