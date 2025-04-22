import moment from 'moment';
import { dtos, enums, Img, T, models, utils, restQuery, E } from '~/api';
import { stores } from '~/stores';
import {
    Actor,
    Comment,
    FileData,
    PaymentBlock,
    PmSowItem,
    Submission,
    TaskProgress,
    TaskUpdate,
    WorkflowProgress,
} from '~/models';

export const getPmTask = async (workflowId: number, taskId: number) => {
    const response = await dtos.workflow.execGetWorkflowProgressQuery({
        workflowId,
        taskId,
    });

    if (!response) {
        return;
    }

    const {
        result,
        result: { currentTask },
    } = response;

    const isDraftUpdate = currentTask.isActionable && currentTask.isValidUserActor;

    return WorkflowProgress.create({
        id: stores.idCollection.getInternal('workflow', result.workflowId),
        workflowNameEn: result.workflowNameEn,
        workflowNameAr: result.workflowNameAr,
        workflowDescriptionEn: result.workflowDescriptionEn,
        workflowDescriptionAr: result.workflowDescriptionAr,
        sowItemDto: PmSowItem.create({
            id: stores.idCollection.getInternal('sowItemDto', result.sowItem.id),
            orderNumber: result.sowItem.orderNumber,
            englishName: result.sowItem.englishName,
            arabicName: result.sowItem.arabicName,
            showItemInFrontend: result.sowItem.showItemInFrontend,
            isMandatory: result.sowItem.isMandatory,
            numberOfSpecs: result.sowItem.numberOfSpecs,
            numberOfWorkflows: result.sowItem.numberOfWorkflows,
            consultantVisits: result.sowItem.consultantVisits,
            icon: Img.tryCreate(result.sowItem.iconFileId),
            category: T.create(
                result.sowItem.category,
                enums.PmSowItemCategory.castToInternal,
            ),
            versionId: result.sowItem.versionId,
            itemUnits: models.toInternalItemUnits(result.sowItem.itemUnits),
            itemVisibility: T.create(
                result.sowItem.itemVisibility,
                enums.SowItemVisibility.castToInternal,
            ),
        }),
        subItemEnglishName: result.sowSubItem.titleEnglish,
        subItemArabicName: result.sowSubItem.titleArabic,
        sowItemId: result.sowItemId,
        stageId: stores.idCollection.getInternal('stage', result.stageId),
        rate: result.rate,
        supplier: result.supplier,
        submissions: toInternalSubmission(result.submissions),
        updateDtos: await toInternalTaskUpdate(result.updateDtos),
        currentTask: TaskProgress.create({
            id: stores.idCollection.getInternal('userTask', currentTask.id),
            nameEn: currentTask.nameEn,
            nameAr: currentTask.nameAr,
            descriptionEn: currentTask.descriptionEn,
            descriptionAr: currentTask.descriptionAr,
            status: T.create(
                currentTask.status,
                enums.TaskStatus.castToInternal,
            ),
            actorType: T.create(
                currentTask.actorType,
                enums.WorkflowActorTypePm.castToInternal,
            ),
            dueDate: T.create(currentTask.dueDate, T.MaybeTimestamp),
            actionType: T.create(
                currentTask.actionType,
                enums.ActionType.castToInternal,
            ),
            actionValue: currentTask.actionValue,
            actor: currentTask.actor && Actor.create({
                id: stores.idCollection.getInternal('actor', currentTask.actor.profileId),
                name: currentTask.actor.name,
                email: currentTask.actor.email,
                phone: currentTask.actor.phone,
            }),
            isActionable: currentTask.isActionable,
            isValidUserActor: currentTask.isValidUserActor,
            paymentBlockPayload: currentTask.paymentBlockPayload && PaymentBlock.create({
                stageNumber: currentTask.paymentBlockPayload.stageNumber,
                stageValue: currentTask.paymentBlockPayload.stageValue,
                stageSubTotal: currentTask.paymentBlockPayload.stageSubTotal,
                isPenaltyAvailable: currentTask.paymentBlockPayload.isPenaltyAvailable,
                penaltyPercentage: currentTask.paymentBlockPayload.penaltyPercentage,
                penaltySubtotal: currentTask.paymentBlockPayload.penaltySubtotal,
                taxPercentage: utils.decimalToNumber(currentTask.paymentBlockPayload.taxPercentage),
                taxTotal: currentTask.paymentBlockPayload.taxTotal,
                grandTotal: currentTask.paymentBlockPayload.grandTotal,
                isRefundAvailable: currentTask.paymentBlockPayload.isRefundAvailable,
                bidValue: currentTask.paymentBlockPayload.bidValue,
                refundSubtotal: currentTask.paymentBlockPayload.refundSubtotal,
                refundPercentage: currentTask.paymentBlockPayload.refundPercentage,
                currentPenalty: currentTask.paymentBlockPayload.penaltyPercentage,
            }),
        }),
        draftUpdate: isDraftUpdate
            ? await restQuery.workflow.getTaskUpdateDraft(E.TaskUpdateDraft.task, currentTask.id)
            : undefined,
    });
};

export const toInternalTaskUpdate = async (updateDtos: dtos.workflow.TaskUpdateDto[]) => {
    if (updateDtos.length === 0) {
        return [];
    }

    const updates = await Promise.all(updateDtos.map(async update => TaskUpdate.create({
        id: stores.idCollection.getInternal('taskUpdate', update.id),
        taskId: update.taskId,
        actorId: update.actorId,
        actorType: T.create(
            update.actorType,
            enums.WorkflowActorTypePm.castToInternal,
        ),
        type: T.create(
            update.type,
            enums.TaskUpdateType.castToInternal,
        ),
        resourceType: T.create(
            update.resourceType,
            enums.ResourceTypeMaterial.castToInternal,
        ),
        description: update.description,
        itemName: update.itemName,
        supplier: update.supplier,
        rate: update.rate,
        rateType: T.tryCreate(
            update.rateType,
            enums.RateType.castToInternal,
        ),
        totalPrice: update.totalPrice,
        quantity: update.quantity,
        attachments: await toInternalAttachmentsIds(update.attachmentsIds),
        comments: await toInternalComments(update.comments),
        createdDate: T.create(update.createdDate, T.Timestamp),
        isProof: update.isProofOfPayment,
    })));

    return updates.sort((a, b) => (
        moment(a.createdDate, 'DD/MM/YYYY').isBefore(moment(b.createdDate, 'DD/MM/YYYY')) ? -1 : 1
    ));
};

const toInternalComments = async (commentsDto: dtos.workflow.CommentDto[]) => {
    if (commentsDto.length === 0) {
        return [];
    }

    return await Promise.all(commentsDto.map(async comment => Comment.create({
        id: stores.idCollection.getInternal('comment', comment.id),
        avatar: Img.tryCreate(comment.actor?.avatarId),
        name: comment.actor?.name,
        actorId: comment.actorId,
        resourceId: comment.resourceId,
        description: comment.description,
        attachments: await toInternalAttachmentsIds(comment.attachmentsIds),
        createdDate: T.create(comment.createdDate, T.MaybeTimestamp),
    })));
};

export const toInternalAttachmentsIds = async (ids: string[]) => {
    if (ids.length === 0) {
        return [];
    }

    return Promise.all(ids.map(async fileId => {
        const file = await FileData.fromExternal(fileId);
        file.loadImg();
        return file;
    }));
};

const toInternalSubmission = (sumbissions: dtos.workflow.SubmissionDto[]) => {
    if (sumbissions.length === 0) {
        return [];
    }

    return sumbissions.map(submission => Submission.create({
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
        createdDate: T.create(submission.createdDate, T.MaybeTimestamp),
        materialSubmissionType: T.create(
            submission.materialSubmissionType,
            enums.MaterialSubmissionType.castToInternal,
        ),
        rejectedOptionDescription: submission.description,
    }));
};
