import { enums, Img, T, type dtos } from '~/api';
import { stores } from '~/stores';
import { toInternalTaskUpdate } from '../../Rest/queries/project';
import type { MaterialProgressDto } from '../dtos/workflow';
import { toInternalItemUnits } from '../models';
import {
    Actor,
    Comment,
    FileData,
    MaterialOption,
    MaterialProgress,
    MaterialTaskProgress,
    PmSowItem,
    Submission,
} from '~/models';

export const toInternalMaterialProgress = async (res: MaterialProgressDto, isOption?: boolean) => MaterialProgress.create({
    materialWorkflowSequenceId: res.materialWorkflowSequenceId,
    currentTask: MaterialTaskProgress.create({
        materialUserTaskId: res.currentTask.materialUserTaskId,
        status: T.create(
            res.currentTask.status,
            enums.TaskStatus.castToInternal,
        ),
        isActionable: res.currentTask.isActionable,
        isValidUserActor: res.currentTask.isValidUserActor,
        canBeSkipped: res.currentTask.canBeSkipped,
        canBeRejected: res.currentTask.canBeRejected,
        skipTask: res.currentTask?.skipTask && {
            materialUserTaskId: res.currentTask.skipTask.materialUserTaskId,
            status: T.create(
                res.currentTask.skipTask.status,
                enums.TaskStatus.castToInternal,
            ),
            isActionable: res.currentTask.skipTask.isActionable,
            isValidUserActor: res.currentTask.skipTask.isValidUserActor,
            canBeSkipped: res.currentTask.skipTask.canBeSkipped,
            actorType: T.create(
                res.currentTask.skipTask.actorType,
                enums.WorkflowActorType.castToInternal,
            ),
            actor: Actor.create({}),
            materialUserTaskType: T.create(
                res.currentTask.skipTask.materialUserTaskType,
                enums.MaterialUserTaskType.castToInternal,
            ),
            dueDate: T.create(res.currentTask.skipTask.dueDate, T.Timestamp),
        },
        actorType: T.create(
            res.currentTask.actorType,
            enums.WorkflowActorType.castToInternal,
        ),
        dueDate: T.create(res.currentTask.dueDate, T.Timestamp),
        actor: Actor.create({
            id: res.currentTask.actor?.profileId,
            name: res.currentTask.actor?.name,
            email: res.currentTask.actor?.email,
            phone: res.currentTask.actor?.phone,
            avatar: Img.tryCreate(res.currentTask.actor?.avatarId),
        }),
        materialUserTaskType: T.create(
            res.currentTask.materialUserTaskType,
            enums.MaterialUserTaskType.castToInternal,
        ),
    }),
    materialWorkflowType: T.create(
        res.materialWorkflowType,
        enums.MaterialWorkflowType.castToInternal,
    ),
    submissions: await toInternalSubmission(res.submissions, isOption),
    sowItem: PmSowItem.create({
        orderNumber: res.sowItem?.orderNumber,
        englishName: res.sowItem?.englishName,
        arabicName: res.sowItem?.arabicName,
        showItemInFrontend: res.sowItem?.showItemInFrontend,
        isMandatory: res.sowItem?.isMandatory,
        numberOfSpecs: res.sowItem?.numberOfSpecs,
        numberOfWorkflows: res.sowItem?.numberOfWorkflows,
        consultantVisits: res.sowItem?.consultantVisits,
        icon: Img.tryCreate(res.sowItem?.iconFileId),
        category: T.tryCreate(
            res.sowItem?.category,
            enums.sowItemCategory.castToInternal,
        ),
        versionId: res.sowItem?.versionId,
        itemUnits: toInternalItemUnits(res.sowItem?.itemUnits),
        itemVisibility: T.tryCreate(
            res.sowItem?.itemVisibility,
            enums.SowItemVisibility.castToInternal,
        ),
    }),
    stageOrderNumber: res.stageOrder,
    isPrivate: res.isPrivate,
    subContractedMaterialName: res.subContractedMaterialName,
    subContractorName: res.subContractorName,
    clientDelay: res.materialDelay?.clientDelay,
    contractorDelay: res.materialDelay?.contractorDelay,
});

const toInternalSubmission = (sumbissions: dtos.workflow.SubmissionDto[], isOption?: boolean) => {
    if (sumbissions.length === 0) {
        return [];
    }

    return Promise.all(sumbissions.map(async submission => {
        const update = isOption
            ? { materialOptions: await toInternalMaterialOptions(submission.taskUpdates) }
            : { taskUpdates: await toInternalTaskUpdate(submission.taskUpdates) };

        return Submission.create({
            id: stores.idCollection.getInternal('submission', submission.id),
            name: submission.name,
            actionType: T.create(
                submission.actionType,
                enums.ActionType.castToInternal,
            ),
            actionValue: submission.actionValue,
            actionData: submission.actionData,
            status: T.create(
                submission.status,
                enums.SubmitStatus.castToInternal,
            ),
            actorType: T.create(
                submission.actorType,
                enums.WorkflowActorTypePm.castToInternal,
            ),
            submitterId: submission.submitterId,
            actorId: submission.actorId,
            createdDate: T.create(
                submission.createdDate,
                T.MaybeTimestamp,
            ),
            materialSubmissionType: T.create(
                submission.materialSubmissionType,
                enums.MaterialSubmissionType.castToInternal,
            ),
            rejectedOptionDescription: submission.description,
            ...update,
        });
    }));
};

const toInternalMaterialOptions = async (taskUpdates: dtos.workflow.TaskUpdateDto[]) => {
    if (taskUpdates.length === 0) {
        return [];
    }

    return await Promise.all(taskUpdates.map(async item => MaterialOption.create({
        id: stores.idCollection.getInternal('materialOption', item.id),
        supplier: item.supplier,
        rates: item.rate,
        rateType: T.tryCreate(
            item.rateType,
            enums.RateType.castToInternal,
        ),
        totalValue: item.totalPrice,
        description: item.description,
        attachments: await toInternalAttachmentsIds(item.attachmentsIds),
        comments: await toInternalComments(item.comments),
        actorType: T.create(
            item.actorType,
            enums.WorkflowActorType.castToInternal,
        ),
        createdDate: T.create(
            item.createdDate,
            T.Timestamp,
        ),
    })));
};

export const toInternalAttachmentsIds = async (ids: string[]) => {
    if (ids.length === 0) {
        return [];
    }

    return await Promise.all(ids.map(async imgId => {
        const img = await FileData.fromExternal(imgId);
        img.loadImg();
        return img;
    }));
};

export const toInternalComments = async (commentsDto: dtos.workflow.CommentDto[]) => {
    if (commentsDto.length === 0) {
        return [];
    }

    return Promise.all(commentsDto.map(async comment => Comment.create({
        id: stores.idCollection.getInternal('comment', comment.id),
        avatar: Img.tryCreate(comment.actor?.avatarId),
        name: comment.actor?.name,
        actorId: comment.actorId,
        resourceId: comment.resourceId,
        description: comment.description,
        attachments: await toInternalAttachmentsIds(comment.attachmentsIds.reverse()),
        createdDate: T.create(comment.createdDate, T.MaybeTimestamp),
    })));
};
