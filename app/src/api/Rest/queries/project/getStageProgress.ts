import { PmStage, PmStageProgress } from '~/models';
import { dtos, enums } from '../..';
import { stores } from '~/stores';
import { Img, T } from '~/api';
import { toInternalTaskUpdate } from './getPmTask';

export const getStageProgress = async (stageId?: number) => {
    if (!stageId) {
        return;
    }

    const res = await dtos.workflow.execGetStageProgressQuery({ stageId });

    if (!res) {
        return;
    }

    const { stage, updatesSummary, stageItems, tasksSummary, delays, materialItems } = res.result;

    return PmStageProgress.create({
        stage: PmStage.create({
            id: stores.idCollection.getInternal('stage', stage.id),
            status: T.create(
                stage.status,
                enums.StageStatus.castToInternal,
            ),
            order: stage.order,
            isActive: stage.isActive,
            isCompleted: stage.isCompleted,
            startDate: T.create(stage.startDate, T.MaybeTimestamp),
            completionDate: T.create(stage.completionDate, T.MaybeTimestamp),
            weight: stage.weight,
            name: stage.nameEn,
            nameAr: stage.nameAr,
            baselineStartDate: T.create(stage.baselineStartDate, T.MaybeTimestamp),
            baselineFinishDate: T.create(stage.baselineFinishDate, T.MaybeTimestamp),
            projectBidStageUnitId: stage.projectBidStageUnitId,
            description: stage.descriptionEn,
            descriptionAr: stage.descriptionAr,
        }),
        updates: await toInternalTaskUpdate(updatesSummary),
        stageItems: toInternalStageItems(stageItems),
        materialItems: toInternalMaterialItems(materialItems),
        tasksSummary: {
            upcomingTasksCount: tasksSummary.upcomingTasksCount,
            dueTasksCount: tasksSummary.dueTasksCount,
            completedTasksCount: tasksSummary.completedTasksCount,
            inDelayTasksCount: tasksSummary.inDelayTasksCount,
        },
        delays: {
            contractor: delays.contractor,
            client: delays.client,
            consultant: delays.consultant,
        },
    });
};

const toInternalStageItems = (stageItems: dtos.workflow.StageItemDto[]) => {
    if (stageItems.length === 0) {
        return [];
    }

    return stageItems.map(stageItem => ({
        name: stageItem.name,
        subItems: toInternalSubItems(stageItem.subItems),
        icon: Img.tryCreate(stageItem.iconId),
    }));
};

const toInternalSubItems = (subItems: dtos.workflow.StageSubItemDto[]) => {
    if (subItems.length === 0) {
        return [];
    }

    return subItems.map(subItem => ({
        subItemName: subItem.subItemName,
        workflowName: subItem.workflowName,
        status: T.create(subItem.status, enums.TaskStatus.castToInternal),
    }));
};

const toInternalMaterialItems = (materials: dtos.workflow.StageMaterialDto[]) => {
    if (materials.length === 0) {
        return [];
    }

    return materials.map(material => ({
        icon: Img.tryCreate(material.iconFileId),
        englishName: material.englishName,
        arabicName: material.arabicName,
        id: material.id,
    }));
};
