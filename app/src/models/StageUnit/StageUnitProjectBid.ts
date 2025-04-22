import { action } from 'mobx';
import { Mobx, utils, type Id } from '~/api';
import type { StageUnit } from '.';

export class StageUnitProjectBid {
    projectBidPartId?: Id;

    valueOfStageInPercentage = 0;

    timeOfStage = 0;

    constructor(readonly stageUnit: StageUnit) {
        makeSafeObservable(this, {
            clone: action,
            setTimeOfStage: action,
        });
    }

    get totalPrice() {
        return this.stageUnit.stagePart.forProjectBid.projectBid?.totalBidPrice ?? 0;
    }

    get valueOfStageInOmr() {
        return this.totalPrice * this.valueOfStageInPercentage / 100;
    }

    clone = () => {
        const cloneItem = new StageUnitProjectBid(this.stageUnit);

        return Mobx.extendsObservable(cloneItem, {
            projectBidPartId: this.projectBidPartId,
            valueOfStageInPercentage: this.valueOfStageInPercentage,
            timeOfStage: this.timeOfStage,
        });
    };

    setTimeOfStage = (value: string) => {
        const newTime = utils.fromInputNumber(value);
        const newBidTime = this.stageUnit.stagePart.totalDays + newTime - this.timeOfStage;

        this.timeOfStage = newTime;
        this.stageUnit.stagePart.forProjectBid.setTotalDays(newBidTime);
    };
}
