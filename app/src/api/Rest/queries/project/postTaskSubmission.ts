import { E, T, enums, dtos, models, restQuery } from '~/api';
import type { TaskProgressType, WorkflowProgressType } from '~/models';

export const postTaskSubmission = async (
    workflow: WorkflowProgressType,
    isApprove: boolean,
    projectId?: number,
    didVisitSite?: boolean,
) => {
    if (!workflow.currentTask.externalId || !projectId) {
        return;
    }

    const toExternalUpdates = await Promise.all(workflow.localUpdateDtos.map(async item => ({
        type: T.create(
            item.type,
            enums.TaskUpdateType.castToExternal,
        ),
        description: item.description,
        attachmentsIds: await restQuery.file.add(item.attachments),
        comments: [],
    })));

    const response = await dtos
        .workflow[`exec${isApprove ? 'Submit' : 'Reject'}TaskSubmissionCommand`]({
            taskSubmission: {
                userTaskId: workflow.currentTask.externalId,
                actionData: await getActionData(workflow.currentTask),
                updates: toExternalUpdates,
                isConsultantVisit: didVisitSite,
                penalty: workflow.currentTask.actionType === E.ActionType.payment
                    ? {
                        penaltyPercentage: workflow.currentTask.paymentBlockPayload?.currentPenalty,
                        penaltySubtotal: workflow.currentTask.paymentBlockPayload?.penaltyOrRefundSubtotal,
                        taxSubtotal: workflow.currentTask.paymentBlockPayload?.displayedTax,
                        grandTotal: workflow.currentTask.paymentBlockPayload?.displayedGrand,
                        isRefunded: workflow.currentTask.paymentBlockPayload?.isRefundAvailable,
                        refundSubtotal: workflow.currentTask.paymentBlockPayload?.penaltyOrRefundSubtotal,
                    }
                    : {},
            },
        });

    if (!response) {
        return;
    }

    return models.toInternalPmProject(projectId, response.project, response.submissionValidations);
};

const getActionData = async (currentTask: TaskProgressType) => {
    switch (currentTask.actionType) {
        case E.ActionType.datePicker:
            return JSON.stringify(currentTask.valueDatePicker);

        case E.ActionType.checklist:
            return JSON.stringify(currentTask.valueChecklist);

        case E.ActionType.payment:
            if (!currentTask.paymentBlockPayload) {
                return '';
            }

            const ids = await restQuery.file
                .add(currentTask.paymentBlockPayload.attachments);

            return JSON.stringify({
                dateOfPayment: currentTask.paymentBlockPayload.dateOfPayment?.toISOString(),
                filesIds: ids,
            });

        default:
            return '';
    }
};
