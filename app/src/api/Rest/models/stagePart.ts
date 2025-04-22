import { enums, Id, Mobx, T, type dtos } from '~/api';
import { StagePart, StagePartProjectBid, type ProjectBid } from '~/models';
import { toInternalStageUnit } from './stageUnit';

type InternalStagePartProp =
    | dtos.construction.StagePlanPartDto
    | dtos.construction.StageTemplatePartDto
    | dtos.construction.ProjectBidStagePartDto
    | dtos.contract.ContractStagePlanPartDto;

export const toInternalStagePart = (
    x: InternalStagePartProp,
    projectBid?: ProjectBid,
) => {
    const stagePart = new StagePart();

    Mobx.extendsObservable(stagePart, {
        id: Id.init(x.id, 'external'),
        planStage: T.create(x.planStage, enums.StageTemplatePart.castToInternal),
        planStageRaw: x.planStage,
    });

    // Bid
    if ('bidId' in x) {
        toInternalStagePartForProjectBid(x, stagePart, projectBid);
    }

    // Template
    if ('templateId' in x) {
        toInternalStagePartForTemplate(x, stagePart);
    }

    // Plan / Contract Plan
    if ('planId' in x) {
        toInternalStagePartForPlan(x, stagePart);
    }

    return stagePart;
};

const toInternalStagePartForProjectBid = (
    x: dtos.construction.ProjectBidStagePartDto,
    stagePart: StagePart,
    projectBid?: ProjectBid,
) => {
    const projectBidStagePart = new StagePartProjectBid(stagePart, projectBid);

    const totalDays = x.stageUnits?.reduce((a, b) => a + (b.timeOfStage ?? 0), 0);

    Mobx.extendsObservable(stagePart, {
        totalDays: totalDays,
        forProjectBid: projectBidStagePart,
    });

    Mobx.extendsObservable(projectBidStagePart, {
        bidId: Id.tryInit(x.bidId, 'external'),
        bidUnits: x.stageUnits?.map(item => toInternalStageUnit(item, stagePart)),
    });
};

const toInternalStagePartForTemplate = (
    x: dtos.construction.StageTemplatePartDto,
    stagePart: StagePart,
) => {
    Mobx.extendsObservable(stagePart.forTemplate, {
        templateId: Id.tryInit(x.templateId, 'external'),
        templateUnits: x.templateUnits?.map(item => toInternalStageUnit(item, stagePart)),
    });
};

const toInternalStagePartForPlan = (
    x: dtos.contract.ContractStagePlanPartDto | dtos.construction.StagePlanPartDto,
    stagePart: StagePart,
) => {
    // Contract Plan
    if ('totalDays' in x) {
        Mobx.extendsObservable(stagePart, {
            totalDays: x.totalDays,
        });
    }

    Mobx.extendsObservable(stagePart.forPlan, {
        planId: Id.tryInit(x.planId, 'external'),
        planUnits: x.planUnits?.map(item => toInternalStageUnit(item, stagePart)),
    });
};
