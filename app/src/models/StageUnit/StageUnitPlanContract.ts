import { type Id } from '~/api';
import type { StageUnit } from '.';

export class StageUnitPlanContract {
    planPartId?: Id;

    valueOfStageInPercentage = 0;

    valueOfStageInOmr = 0;

    timeOfStage = 0;

    stageName = '';

    numberOfTasks = 0;

    workflows: number[] = [];

    constructor(readonly stageUnit: StageUnit) {
        makeSafeObservable(this);
    }
}
