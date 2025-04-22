import { enums, Img, T, type dtos } from '~/api';
import { stores } from '~/stores';
import {
    Actor,
    MaterialListItem,
    MaterialTaskProgress,
    PmSowItem,
    SowItemUnit,
    SubContractor,
} from '~/models';

export const toInternalClientSubContractor = (item: dtos.workflow.SubContractorListItem) => SubContractor
    .create({
        materialWorkflowId: item.materialWorkflowId,
        sowItemDto: item.sowItemDto && PmSowItem.create({
            id: stores.idCollection.getInternal('sowItemDto', item.sowItemDto.id),
            orderNumber: item.sowItemDto.orderNumber,
            englishName: item.sowItemDto.englishName,
            arabicName: item.sowItemDto.arabicName,
            showItemInFrontend: item.sowItemDto.showItemInFrontend,
            isMandatory: item.sowItemDto.isMandatory,
            numberOfSpecs: item.sowItemDto.numberOfSpecs,
            numberOfWorkflows: item.sowItemDto.numberOfWorkflows,
            consultantVisits: item.sowItemDto.consultantVisits,
            icon: Img.tryCreate(item.sowItemDto.iconFileId),
            category: T.tryCreate(
                item.sowItemDto?.category,
                enums.PmSowItemCategory.castToInternal,
            ),
            versionId: item.sowItemDto?.versionId,
            itemUnits: toInternalItemUnits(item.sowItemDto?.itemUnits),
            itemVisibility: T.tryCreate(
                item.sowItemDto?.itemVisibility,
                enums.SowItemVisibility.castToInternal,
            ),
        }),
        subContractedMaterialName: item.subContractedMaterialName,
        subContractorName: item.subContractorName,
        stageOrder: item.stageOrder,
        completeWorksBy: T.create(item.completeWorksBy, T.Timestamp),
        currentTask: MaterialTaskProgress.create({
            materialUserTaskId: item.currentTask.materialUserTaskId,
            skipTask: item.currentTask?.skipTask && {
                materialUserTaskId: item.currentTask.skipTask.materialUserTaskId,
                status: T.create(
                    item.currentTask.skipTask.status,
                    enums.TaskStatus.castToInternal,
                ),
                isActionable: item.currentTask.skipTask.isActionable,
                isValidUserActor: item.currentTask.skipTask.isValidUserActor,
                canBeSkipped: item.currentTask.skipTask.canBeSkipped,
                actorType: T.create(
                    item.currentTask.skipTask.actorType,
                    enums.WorkflowActorType.castToInternal,
                ),
                actor: Actor.create({}),
                materialUserTaskType: T.create(
                    item.currentTask.skipTask.materialUserTaskType,
                    enums.MaterialUserTaskType.castToInternal,
                ),
                dueDate: T.create(item.currentTask.skipTask.dueDate, T.Timestamp),
            },
            status: T.create(
                item.currentTask.status,
                enums.TaskStatus.castToInternal,
            ),
            isActionable: item.currentTask.isActionable,
            isValidUserActor: item.currentTask.isValidUserActor,
            canBeSkipped: item.currentTask.canBeSkipped,
            canBeRejected: item.currentTask.canBeRejected,
            actorType: T.create(
                item.currentTask.actorType,
                enums.WorkflowActorType.castToInternal,
            ),
            dueDate: T.create(item.currentTask.dueDate, T.Timestamp),
            actor: Actor.create({
                id: stores.idCollection.getInternal('actor', item.currentTask.actor?.profileId),
                name: item.currentTask.actor?.name,
                email: item.currentTask.actor?.email,
                phone: item.currentTask.actor?.phone,
            }),
            materialUserTaskType: T.create(
                item.currentTask.materialUserTaskType,
                enums.MaterialUserTaskType.castToInternal,
            ),
        }),
    });

export const toInternalItemUnits = (itemUnits?: dtos.workflow.SowItemUnitDto[]) => {
    if (!itemUnits) {
        return [];
    }

    return itemUnits.map(item => SowItemUnit.create({
        id: stores.idCollection.getInternal('sowItemUnit', item.id),
        englishDescription: item.englishDescription,
        arabicDescription: item.arabicDescription,
        titleEnglish: item.titleEnglish,
        titleArabic: item.titleArabic,
        supplier: item.supplier,
        rate: item.rate,
        acceptanceWorkflow: item.acceptanceWorkflow,
        itemId: item.itemId,
        orderNumber: item.orderNumber,
    }));
};

export const toInternalPmSowItem = (item: dtos.workflow.SowItemDto) => PmSowItem
    .create({
        id: stores.idCollection.getInternal('sowItemDto', item.id),
        orderNumber: item.orderNumber,
        englishName: item.englishName,
        arabicName: item.arabicName,
        showItemInFrontend: item.showItemInFrontend,
        isMandatory: item.isMandatory,
        numberOfSpecs: item.numberOfSpecs,
        numberOfWorkflows: item.numberOfWorkflows,
        consultantVisits: item.consultantVisits,
        icon: Img.tryCreate(item.iconFileId),
        category: T.tryCreate(
            item.category,
            enums.PmSowItemCategory.castToInternal,
        ),
        versionId: item.versionId,
        itemUnits: item.itemUnits ? toInternalItemUnits(item.itemUnits) : [],
    });

export const toInternalMaterialList = (item: dtos.workflow.MaterialListItem) => MaterialListItem
    .create({
        materialWorkflowId: item.materialWorkflowId,
        sowItem: toInternalPmSowItem(item.sowItem),
        stageOrder: item.stageOrder,
        siteDeliveryDate: T.create(item.siteDeliveryDate, T.Timestamp),
        currentTask: MaterialTaskProgress.create({
            materialUserTaskId: item.currentTask.materialUserTaskId,
            skipTask: item.currentTask?.skipTask && {
                materialUserTaskId: item.currentTask.skipTask.materialUserTaskId,
                status: T.create(
                    item.currentTask.skipTask.status,
                    enums.TaskStatus.castToInternal,
                ),
                isActionable: item.currentTask.skipTask.isActionable,
                isValidUserActor: item.currentTask.skipTask.isValidUserActor,
                canBeSkipped: item.currentTask.skipTask.canBeSkipped,
                actorType: T.create(
                    item.currentTask.skipTask.actorType,
                    enums.WorkflowActorType.castToInternal,
                ),
                actor: Actor.create({}),
                materialUserTaskType: T.create(
                    item.currentTask.skipTask.materialUserTaskType,
                    enums.MaterialUserTaskType.castToInternal,
                ),
                dueDate: T.create(item.currentTask.skipTask.dueDate, T.Timestamp),
            },
            status: T.create(
                item.currentTask.status,
                enums.TaskStatus.castToInternal,
            ),
            isActionable: item.currentTask.isActionable,
            isValidUserActor: item.currentTask.isValidUserActor,
            canBeSkipped: item.currentTask.canBeSkipped,
            canBeRejected: item.currentTask.canBeRejected,
            actorType: T.create(
                item.currentTask.actorType,
                enums.WorkflowActorType.castToInternal,
            ),
            dueDate: T.create(item.currentTask.dueDate, T.Timestamp),
            actor: Actor.create({
                id: stores.idCollection.getInternal('actor', item.currentTask.actor?.profileId),
                name: item.currentTask.actor?.name,
                email: item.currentTask.actor?.email,
                phone: item.currentTask.actor?.phone,
            }),
            materialUserTaskType: T.create(
                item.currentTask.materialUserTaskType,
                enums.MaterialUserTaskType.castToInternal,
            ),
        }),
    });
