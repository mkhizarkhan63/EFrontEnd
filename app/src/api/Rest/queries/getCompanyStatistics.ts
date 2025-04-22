import { dtos } from '..';

export const getCompanyStatistics = async () => {
    const data = await dtos.contractor.execGetCompanyStatusStatisticQuery(undefined);

    if (!data) {
        return;
    }

    return {
        draftCount: data.draftCount ?? 0,
        invitedCount: data.invitedCount ?? 0,
        reviewCount: data.adminReviewCount ?? 0,
        approvedCount: data.approvedCount ?? 0,
        rejectedCount: data.rejectedCount ?? 0,
    };
};
