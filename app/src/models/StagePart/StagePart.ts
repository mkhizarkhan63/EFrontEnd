import { action } from 'mobx';
import { E, Id } from '~/api';
import { StagePartPlan, StagePartTemplate, StagePartProjectBid } from '.';

export class StagePart {
    id = Id.init();

    totalDays = 0;

    planStage = E.StageTableNames.none;

    planStageRaw = 0;

    forPlan = new StagePartPlan(this);

    forTemplate = new StagePartTemplate(this);

    forProjectBid = new StagePartProjectBid(this);

    constructor() {
        makeSafeObservable(this, {
            setTotalDays: action,
        });
    }

    get units() {
        const items = [
            {
                id: this.forPlan.planId,
                units: this.forPlan.planUnits,
            },
            {
                id: this.forTemplate.templateId,
                units: this.forTemplate.templateUnits,
            },
            {
                id: this.forProjectBid.bidId,
                units: this.forProjectBid.bidUnits,
            },
        ].filter(v => v.id);

        const res = items.find(v => v.id);

        return items.length > 1 || !res ? [] : res.units;
    }

    setTotalDays = (value: number) => {
        this.totalDays = value;
    };
}
