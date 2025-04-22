import { type Id } from '~/api';
import type { Stage } from '.';
import type { StagePart } from '../StagePart';

export class StagePlanConstruction {
    projectId?: Id;

    planParts: StagePart[] = [];

    constructor(readonly stage: Stage) {
        makeSafeObservable(this);
    }
}
