import { action } from 'mobx';
import { type Id, Mobx } from '~/api';
import type { StageUnit } from '.';

export class StageUnitPlan {
    planPartId?: Id;

    constructor(readonly stageUnit: StageUnit) {
        makeSafeObservable(this, {
            clone: action,
        });
    }

    clone = () => {
        const cloneItem = new StageUnitPlan(this.stageUnit);

        return Mobx.extendsObservable(cloneItem, {
            planPartId: this.planPartId,
        });
    };
}
