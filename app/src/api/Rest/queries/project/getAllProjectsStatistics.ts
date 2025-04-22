import { dtos } from '~/api';

export const getAllProjectsStatistics = async () => {
    const data = await dtos
        .construction.execGetConstructionProjectStatisticsQuery(undefined);

    return {
        draft: 0,
        adminReview: 0,
        rejected: 0,
        contractBidding: 0,
        clientAddServices: 0,
        contractReady: 0,
        signed: 0,
        liveInPm: 0,
        archived: 0,
        designDraft: 0,
        designAdminReview: 0,
        designConsultantApprove: 0,
        designAdvancePayment: 0,
        designUploadDrawings: 0,
        designFinalPayment: 0,
        designCompleted: 0,
        designRejected: 0,
        ...data,
    };
};

