import { PmTaskUpdate } from '~/models';
import { T, dtos, enums, restQuery } from '~/api';
import { toInternalAttachmentsIds, toInternalComments } from '../models';

export const getPmTaskUpdate = async (taskUpdateId: number) => {
    const res = await dtos.workflow.execGetInboxTaskUpdateQuery({ taskUpdateId });

    if (!res) {
        return;
    }

    const item = res.result;

    const name = await restQuery.getUser(item.submittedByActorId ?? 0);

    return PmTaskUpdate.create({
        id: item.id,
        sequenceId: item.updateSequenceId,
        workflowName: item.workflowName,
        taskName: item.taskName,
        sowItemName: item.sowItemName,
        submittedByName: name ? name.name : '',
        description: item.description,
        isRead: item.isRead,
        isFlagged: item.isFlagged,
        isObservation: Boolean(item.customUpdateName),
        createdOn: T.create(item.createdOn, T.Timestamp),
        submittedByActorId: item.submittedByActorId,
        submittedBy: T.tryCreate(item.submittedBy, enums.WorkflowActorType.castToInternal),
        comments: await toInternalComments(item.comments),
        attachments: await toInternalAttachmentsIds(item.attachmentsIds),
        isMaterialUpdate: item.isMaterialUpdate,
        materialUserTaskType: T.tryCreate(
            item.materialUserTaskType,
            enums.MaterialUserTaskType.castToInternal,
        ),
        materialWorkflowType: T.tryCreate(
            item.materialWorkflowType,
            enums.MaterialWorkflowType.castToInternal,
        ),
        customUpdateName: item.customUpdateName,
        taskUpdateType: T.create(item.taskUpdateType, enums.TaskUpdateType.castToInternal),
        isInitialUpdate: Boolean(item.customUpdateTitle),
        customUpdateTitle: item.customUpdateTitle,
    });
};
