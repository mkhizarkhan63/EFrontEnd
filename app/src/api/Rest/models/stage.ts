import { enums, Id, Mobx, T, type dtos } from '~/api';
import { Stage } from '~/models';
import { toInternalStagePart } from './stagePart';

type InternalStageProp =
    | dtos.construction.StagePlanDto
    | dtos.construction.StageTemplateDto
    | dtos.contract.ContractStagePlanDto;

export const toInternalStage = (x: InternalStageProp) => {
    const stage = new Stage();

    Mobx.extendsObservable(stage, {
        id: Id.init(x.id, 'external'),
        pool: x.pool,
        stageId: x.stageId,
        basement: x.basement,
        groundFloor: x.groundFloor,
        outerBlocks: x.outerBlocks,
        projectScope: x.projectScope,
        levellingFloor: x.levellingFloor,
        penthouseFloor: x.penthouseFloor,
        projectScopeTwo: x.projectScopeTwo,
        additionalFloors: x.additionalFloors,
        numberOfInspections: x.numberOfInspections,
    });

    // Construction
    if ('sowVersionId' in x) {
        Mobx.extendsObservable(stage, {
            sowId: Id.tryInit(x.sowVersionId, 'external'),
            projectInUse: x.projectInUse,
            templateName: x.templateName,
        });
    }

    if ('masterSowVersionId' in x) {
        Mobx.extendsObservable(stage, {
            masterSowId: x.masterSowVersionId,
            updatedOn: T.create(x.modifiedDate, T.Timestamp),
        });
    }

    // Template
    if ('status' in x) {
        Mobx.extendsObservable(stage.forTemplate, {
            status: T.create(
                x.status,
                enums.SowAndStageStatus.castToInternal,
            ),
            templateParts: x.templateParts?.map(item => toInternalStagePart(item)),
        });
    }

    // Plan
    if ('projectId' in x) {
        Mobx.extendsObservable(stage.forPlanConstruction, {
            projectId: Id.tryInit(x.projectId, 'external'),
            planParts: x.planParts?.map(item => toInternalStagePart(item)),
        });
    }

    // Plan Contract
    if ('contractId' in x) {
        Mobx.extendsObservable(stage.forPlanContract, {
            contractId: Id.tryInit(x.contractId, 'external'),
            planParts: x.planParts?.map(item => toInternalStagePart(item)),
        });
    }

    return stage;
};
