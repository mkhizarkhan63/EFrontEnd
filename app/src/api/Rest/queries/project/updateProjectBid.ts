import { dtos, E, T } from '~/api';
import type { ProjectBid } from '~/models';
import { ConstructionType, StageTemplatePart } from '../../enums';

export const updateProjectBid = async (projectBid: ProjectBid, publish: boolean) => {
    if (!projectBid.projectId || !projectBid.contractorId || projectBid.id.isType('internal')) {
        return false;
    }

    const totalDays = projectBid.stageParts.flatMap(part => {
        if (part.planStage === E.StageTableNames.maintenance) {
            return [];
        }

        return part;
    }).reduce((prev, curr) => prev + curr.totalDays, 0);

    const externalProject: dtos.construction.UpdateProjectBidCommand = {
        bidCosts: projectBid.bidCosts.map(item => ({
            constructionType: T.create(
                item.constructionType,
                ConstructionType.castToExternal,
            ),
            rials: item.isRawValueView,
            totalPrice: item.totalPrice,
            bidId: item.bidId?.asNumber(),
            costItems: item.costItems?.map(el => ({
                name: el.name,
                translationKey: el.translationKey,
                quantity: el.quantity,
                quantityUnit: el.quantityUnit,
                price: el.price,
                bidCostId: el.bidCostId?.asNumber(),
                id: el.id.asNumber(),
            })),
            id: item.id.asNumber(),
        })),
        stageParts: projectBid.stageParts.map(item => {
            const stageUnits: dtos.construction.ProjectBidStageUnitDto[] = item.forProjectBid.bidUnits.map(el => ({
                id: el.id.asNumber(),
                sowItems: el.sowItems.map(x => x.asNumber()),
                orderNumber: el.orderNumber,
                stageName: el.stageName,
                suggestedPercentage: el.suggestedPercentage.value,
                description: el.description,
                stageNameArabic: el.stageNameArabic,
                descriptionArabic: el.descriptionArabic,
                valueOfStageInPercentage: el.forProjectBid.valueOfStageInPercentage,
                valueOfStageInOmr: el.forProjectBid.valueOfStageInOmr,
                timeOfStage: el.forProjectBid.timeOfStage,
                stagePartId: el.forProjectBid.projectBidPartId?.asNumber(),
            }));

            return {
                id: item.id.asNumber(),
                planStage: T.create(
                    item.planStage,
                    StageTemplatePart.castToExternal,
                ),
                totalDays: item.totalDays,
                bidId: item.forProjectBid.bidId?.asNumber(),
                stageUnits,
            };
        }),
        changeStatusToSubmitted: publish,
        id: projectBid.id.asNumber(),
        totalPrice: projectBid.totalPrice,
        structureItemsTotalPrice: projectBid.structureOnly?.totalPrice,
        turnkeyItemsTotalPrice: projectBid.turnkeyPrice,
        totalDays: totalDays,
        numberOfCurrentProjects: projectBid.numberOfCurrentProjects,
        message: projectBid.message,
    };

    return await dtos
        .construction
        .execUpdateProjectBidCommand(externalProject);
};
