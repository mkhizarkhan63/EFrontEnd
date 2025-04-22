import { type Id } from '~/api';
import type { Stage } from '.';
import type { StagePart } from '../StagePart';
import type { StageUnit } from '../StageUnit';

export class StagePlanContract {
    contractId?: Id;

    planParts: StagePart[] = [];

    constructor(readonly stage: Stage) {
        makeSafeObservable(this);
    }

    get units() {
        const stageUnits: StageUnit[] = [];

        for (const x of this.planParts) {
            stageUnits.push(...x.units);
        }

        return stageUnits.sort((a, b) => a.orderNumber - b.orderNumber);
    }

    get sowItemsId() {
        return Array.from(new Set(
            this.units.flatMap(item => item.sowItems.map(x => x.asNumber())),
        ));
    }
}
