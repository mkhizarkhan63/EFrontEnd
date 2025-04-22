import { dtos } from '~/api';

export const payConsultantPayment = async (
    consultantPaymentUserTaskId: number,
    currentPenalty: number,
    penaltySubTotal: number,
    taxValue: number,
    grandTotal: number,
) => {
    const response = await dtos.workflow.execPayConsultantPaymentCommand({
        consultantPaymentUserTaskId,
        countOfAppliedPenalty: currentPenalty,
        appliedPenaltySubTotal: penaltySubTotal,
        taxValue: taxValue,
        grandTotal: grandTotal,
    });

    if (!response) {
        return false;
    }

    return response.isSuccess;
};
