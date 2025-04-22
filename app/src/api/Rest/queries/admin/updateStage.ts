import type { Stage } from '~/models';
import { dtos, enums, T } from '~/api';

export const updateStageTemplate = async (stage: Stage, publish: boolean) => {
    if (!stage.sowId || stage.id.isType('internal')) {
        return false;
    }

    const externalStage: dtos.construction.UpdateStageTemplateCommand = {
        id: stage.id.asNumber(),
        templateName: stage.templateName,
        stageLevels: stage.stageLevels,
        projectScope: stage.projectScope,
        numberOfInspections: stage.numberOfInspections,
        projectScopeTwo: stage.projectScopeTwo,
        projectInUse: stage.projectInUse,
        basement: stage.basement,
        additionalFloors: stage.additionalFloors,
        outerBlocks: stage.outerBlocks,
        groundFloor: stage.groundFloor,
        levellingFloor: stage.levellingFloor,
        penthouseFloor: stage.penthouseFloor,
        pool: stage.pool,
        sowVersionId: stage.sowId?.asNumber() ?? 1,
        changeStatusToLive: publish,
        templateParts: stage.parts.map(item => ({
            id: item.id.asNumber(),
            templateId: item.forTemplate.templateId?.asNumber(),
            planStage: T.create(
                item.planStage,
                enums.StageTemplatePart.castToExternal,
            ),
            templateUnits: item.forTemplate.templateUnits.map(el => ({
                id: el.id.asNumber(),
                templatePartId: item.id.asNumber(),
                orderNumber: el.orderNumber,
                stageName: el.stageName,
                suggestedPercentage: el.suggestedPercentage.value,
                suggestedTime: el.suggestedTime.valueOrUndefined,
                description: el.description,
                stageNameArabic: el.stageNameArabic,
                descriptionArabic: el.descriptionArabic,
                sowItems: el.sowItems.map(sowItem => sowItem.asNumber()),
            })),
        })),
    };

    return await dtos.construction
        .execUpdateStageTemplateCommand(externalStage);
};
