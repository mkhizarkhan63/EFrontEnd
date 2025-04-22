import type { Stage } from '~/models';
import { Id, dtos, enums, T } from '~/api';

export const createStageTemplate = async (stage: Stage) => {
    if (!stage.sowId) {
        return false;
    }

    const externalStage: dtos.construction.CreateStageTemplateCommand = {
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
        sowVersionId: stage.sowId.asNumber(),
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
                sowItems: el.sowItems.map(i => i.asNumber()),
            })),
        })),
    };

    const res = await dtos
        .construction
        .execCreateStageTemplateCommand(externalStage);

    return res ? Id.init(res.id, 'external') : false;
};
