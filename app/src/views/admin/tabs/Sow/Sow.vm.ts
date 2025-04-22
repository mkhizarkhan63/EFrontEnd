import { stores } from '~/stores';
import { type Id } from '~/api';

export enum ColumnName {
    contractName = 'contractName',
    numberOfItems = 'numberOfItems',
    createdOn = 'createdOn',
    usedFrom = 'usedFrom',
    usedTo = 'usedTo',
    signedContracts = 'signedContracts',
    status = 'status',
}

export class SowVm {
    constructor() {
        makeSafeObservable(this, {
            mount: false,
            goToDetails: false,
            goToNewProject: false,
            goToEditMasterSow: false,
        });
    }

    get sowList() {
        return stores.sows.sows;
    }

    get sowListSorter() {
        return this.sowList.paging.modifySorter;
    }

    get showEditMasterButton() {
        return typeof stores.sows.masterSow !== 'undefined' && this.sowList.length > 0;
    }

    mount = () => {
        stores.sows.getMasterSow();
    };

    goToDetails = (sowId: Id) => {
        stores.display.router
            .$.admin
            .$.sow
            .$.details
            .go({ sowId: sowId.asNumber() });
    };

    goToNewProject = () => {
        stores.display.router
            .$.admin
            .$.sow
            .$.create
            .go({});
    };

    goToEditMasterSow = () => {
        (async () => {
            const externalSowId = await stores.sows.createSowMasterDraft();

            if (externalSowId === false) {
                stores.display.router.reload();
                return;
            }

            this.goToDetails(externalSowId);
        })();
    };
}

