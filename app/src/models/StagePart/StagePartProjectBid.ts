import { action } from 'mobx';
import { type Id } from '~/api';
import type { StagePart } from '.';
import type { ProjectBid, StageUnit } from '..';

export class StagePartProjectBid {
    bidId?: Id;

    bidUnits: StageUnit[] = [];

    constructor(readonly stagePart: StagePart, readonly projectBid?: ProjectBid) {
        makeSafeObservable(this, {
            setTotalDays: action,
        });
    }

    setTotalDays = (value: number) => {
        if (!this.projectBid) {
            return;
        }

        const newBidTime = this.projectBid.totalDays + value - this.stagePart.totalDays;

        this.stagePart.setTotalDays(value);
        this.projectBid.setTotalDays(newBidTime);
    };
}
