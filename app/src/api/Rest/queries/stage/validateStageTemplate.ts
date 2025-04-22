import type { Stage } from '~/models';
import { dtos } from '~/api';

export const validateStageTemplate = async (stage: Stage) => {
    const response = await dtos.workflow.execValidateStageTemplateQuery({
        stageTemplateParts: stage.parts.map(item => ({
            id: item.id.asNumber(),
            templateId: item.forTemplate.templateId?.asNumber(),
            planStage: dtos.workflow.StageTemplatePlanStage.none,
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
    });

    if (!response) {
        return false;
    }

    return response.errors;
};
