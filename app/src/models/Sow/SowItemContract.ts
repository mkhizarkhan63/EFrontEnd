import type { Id } from '~/api';
import type { SowItem } from './SowItem';
import type { SowSubitem } from './SowSubitem';

export class SowItemContract {
    contractId?: Id;

    sowSubItemList: SowSubitem[] = [];

    approval = false;

    materialExecutionStage: number[] = [];

    constructor(readonly sowItem: SowItem) {
        makeSafeObservable(this);
    }
}
