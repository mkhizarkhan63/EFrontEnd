import { Id, Mobx, type dtos } from '~/api';
import { StageUnit, type StagePart } from '~/models';
import { TextNumber } from '~/utils';

type InternalStageUnitProp =
    | dtos.construction.StagePlanUnitDto
    | dtos.construction.StageTemplateUnitDto
    | dtos.construction.ProjectBidStageUnitDto
    | dtos.contract.ContractStagePlanUnitDto;

export const toInternalStageUnit = (
    x: InternalStageUnitProp,
    stagePart: StagePart,
) => {
    const stageUnit = new StageUnit(stagePart);

    Mobx.extendsObservable(stageUnit, {
        id: Id.init(x.id, 'external'),
        stageName: x.stageName,
        description: x.description,
        orderNumber: x.orderNumber,
        stageNameArabic: x.stageNameArabic,
        descriptionArabic: x.descriptionArabic,
        suggestedPercentage: new TextNumber(x.suggestedPercentage, 2),
        sowItems: x.sowItems?.map(i => Id.init(i, 'external')),
    });

    // Project Bid
    if ('stagePartId' in x) {
        toInternalStageUnitForProjectBid(x, stageUnit);
    }

    if ('suggestedTime' in x) {
        Mobx.extendsObservable(stageUnit, {
            suggestedTime: new TextNumber(x.suggestedTime, 8),
        });
    }

    // Template
    if ('templatePartId' in x) {
        toInternalStageUnitForTemplate(x, stageUnit);
    }

    // Plan / Plan Contract
    if ('planPartId' in x) {
        toInternalStageUnitForPlan(x, stageUnit);
    }

    return stageUnit;
};

const toInternalStageUnitForProjectBid = (
    x: dtos.construction.ProjectBidStageUnitDto,
    stageUnit: StageUnit,
) => {
    Mobx.extendsObservable(stageUnit.forProjectBid, {
        projectBidPartId: Id.tryInit(x.stagePartId, 'external'),
        timeOfStage: x.timeOfStage,
        valueOfStageInPercentage: x.valueOfStageInPercentage
            ? x.valueOfStageInPercentage
            : x.suggestedPercentage,
    });
};

const toInternalStageUnitForTemplate = (
    x: dtos.construction.StageTemplateUnitDto,
    stageUnit: StageUnit,
) => {
    Mobx.extendsObservable(stageUnit.forTemplate, {
        templatePartId: Id.tryInit(x.templatePartId, 'external'),
    });
};

const toInternalStageUnitForPlan = (
    x: dtos.construction.StagePlanUnitDto | dtos.contract.ContractStagePlanUnitDto,
    stageUnit: StageUnit,
) => {
    if ('timeOfStage' in x) {
        // Plan Contract
        Mobx.extendsObservable(stageUnit.forContract, {
            planPartId: Id.tryInit(x.planPartId, 'external'),
            timeOfStage: x.timeOfStage,
            valueOfStageInOmr: x.valueOfStageInOmr,
            valueOfStageInPercentage: x.valueOfStageInPercentage,
            stageName: x.stageName,
            numberOfTasks: x.numberOfTasks,
            workflows: x.workflows,
        });
    } else {
        // Plan
        Mobx.extendsObservable(stageUnit.forPlan, {
            planPartId: Id.tryInit(x.planPartId, 'external'),
        });
    }
};
