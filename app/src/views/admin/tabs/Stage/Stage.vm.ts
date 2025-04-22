import { stores } from '~/stores';
import { lang, type Id } from '~/api';
import { confirmPrompt } from '~/utils';
import { action } from 'mobx';

export class StageVm {
    filter = {
        basement: 0,
        additionalFloors: 0,
        outerBlocks: 0,
        groundFloor: true,
        levellingFloor: false,
        penthouseFloor: false,
        pool: false,
    };

    isFilterOpened = false;

    constructor(readonly fromProject?: boolean) {
        makeSafeObservable(this, {
            showDetails: false,
            removeStage: false,
            goToCreateStage: false,
            copyStage: false,
            setFilter: action,
            setAdditionalFloors: action,
            setGroundFloor: action,
            setLevellingFloor: action,
            setPenthouseFloor: action,
            setPool: action,
            setBasement: action,
            setOuterBlocks: action,
            clearFilter: action,
        });

        stores.sows.getMasterSow();
    }

    get stageList() {
        return stores.stages.stageTemplateList;
    }

    get stageSorter() {
        return stores.stages.stageTemplateList.paging.modifySorter;
    }

    get stageFilter() {
        return stores.stages.filter;
    }

    get isMasterSow() {
        return typeof stores.sows.masterSow !== 'undefined';
    }

    get projectId() {
        return stores.display.router.$.admin.$.projects.$.sub.params.id;
    }

    showDetails = (stageId: Id) => {
        if (this.fromProject) {
            stores.display.router
                .$.admin
                .$.projects
                .$.sub
                .$.details
                .$.stageList
                .$.details
                .go({ stageId: stageId.asNumber(), id: this.projectId });
            return;
        }

        stores.display.router
            .$.admin
            .$.stage
            .$.details
            .go({ stageId: stageId.asNumber() });
    };

    copyStage = (stageId: Id) => {
        (async () => {
            const externalStageId = await stores.stages.createDraftStage(stageId);

            if (!externalStageId) {
                return;
            }

            this.showDetails(externalStageId);
        })();
    };

    removeStage = (stageId: Id) => {
        confirmPrompt(lang.dict.get('removeStageDraftPrompt'), async () => {
            const result = await stores.stages.deleteStageTemplate(stageId);

            if (!result) {
                return;
            }

            stores.stages.stageTemplateList.removeId(stageId);
        });
    };

    goToCreateStage = () => {
        stores.display.router.$.admin.$.stage.$.create.go({});
    };

    switchFilterOpened = () => {
        this.isFilterOpened = !this.isFilterOpened;
    };

    setBasement = (value: number) => {
        this.filter.basement = value;
    };

    setAdditionalFloors = (value: number) => {
        this.filter.additionalFloors = value;
    };

    setOuterBlocks = (value: number) => {
        this.filter.outerBlocks = value;
    };

    setGroundFloor = () => {
        this.filter.groundFloor = true;
    };

    setLevellingFloor = () => {
        this.filter.levellingFloor = !this.filter.levellingFloor;
    };

    setPenthouseFloor = () => {
        this.filter.penthouseFloor = !this.filter.penthouseFloor;
    };

    setPool = () => {
        this.filter.pool = !this.filter.pool;
    };

    setFilter = () => {
        stores.stages.filter = this.filter;
        stores.stages.stageTemplateList.reload();
    };

    clearFilter = () => {
        this.filter = {
            basement: 0,
            additionalFloors: 0,
            outerBlocks: 0,
            groundFloor: true,
            levellingFloor: false,
            penthouseFloor: false,
            pool: false,
        };

        stores.stages.clearFilters();
    };
}
