import { type Id } from '~/api';
import type { StagePart } from '.';
import type { StageUnit } from '..';

export class StagePartPlan {
    planId?: Id;

    planUnits: StageUnit[] = [];

    constructor(readonly stagePart: StagePart) {
        makeSafeObservable(this);
    }
}
