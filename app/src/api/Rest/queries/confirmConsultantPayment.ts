import { dtos } from '~/api';

export const confirmConsultantPayment = async (consultantPaymentUserTaskId: number) => {
    const response = await dtos.workflow.execConfirmConsultantPaymentCommand({
        consultantPaymentUserTaskId,
    });

    if (!response) {
        return;
    }

    return response.isSuccess;
};
