import { runInAction } from 'mobx';
import { LazyDataScroller, restQuery, type Id } from '~/api';
import type { Sow, SowItem } from '~/models';

export class Sows {
    sorter = {
        idIsAscending: undefined as boolean | undefined,
        statusIsAscending: undefined as boolean | undefined,
        usedFromIsAscending: undefined as boolean | undefined,
        usedToIsAscending: undefined as boolean | undefined,
        createdOnIsAscending: undefined as boolean | undefined,
    };

    sows = new LazyDataScroller(
        'Sows list',
        paging => restQuery.sow.getSows(paging),
        18,
        this.sorter,
        restQuery.sow.getSow,
    );

    masterSow?: Sow;

    constructor() {
        makeSafeObservable(this);
    }

    post = async (sow: Sow) => await restQuery
        .sow.postSow(sow);

    update = async (sow: Sow) => await restQuery
        .sow.updateSow(sow);

    postItem = async (item: SowItem) => await restQuery
        .sow.postSowItem(item);

    updateItem = async (item: SowItem) => await restQuery
        .sow.updateSowItem(item);

    updateItemsOrder = async (sow: Sow) => await restQuery
        .sow.updateSowItemsOrder(sow);

    deleteSow = async (sowId: Id) => await restQuery
        .sow.deleteSow(sowId);

    deleteSowItem = async (sowId: Id) => await restQuery.sow.deleteSowItem(sowId);

    createSowMasterDraft = async () => await restQuery
        .sow.postDraftSow();

    getMasterSow = async () => {
        const masterSow = await restQuery.sow.getMasterSow();

        if (!masterSow) {
            return;
        }

        runInAction(() => {
            this.masterSow = masterSow;
        });
    };

    updateSowToMasterSow = async (sowModel: Sow) => {
        const masterSowId = await restQuery.sow.updateSowToMasterSow(
            sowModel.id,
        );

        if (masterSowId === false) {
            return;
        }

        await this.sows.reloadSingle(masterSowId);

        const sow = this.sows.get(masterSowId);

        runInAction(() => {
            this.masterSow = sow;
        });
    };
}
