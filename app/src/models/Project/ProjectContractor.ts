import { action } from 'mobx';
import { E, LazyData, restQuery, type Id } from '~/api';
import type { Project } from './Project';

export class ProjectContractor {
    bidStatus = E.BidStatus.none;

    bidId?: Id;

    bidItem = new LazyData(
        'Bid',
        () => restQuery.project.getProjectBid(this.project),
        undefined,
    );

    invitationType?: E.InvitationType;

    constructor(readonly project: Project) {
        makeSafeObservable(this, {
            setBidStatus: action,
        });
    }

    get bid() {
        return this.bidItem.data;
    }

    setBidStatus = (status: E.BidStatus) => {
        this.bidStatus = status;
    };
}
