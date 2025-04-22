import { action } from 'mobx';
import type { Moment } from 'moment';
import { E, lang, LazyModelScroller, restQuery } from '~/api';
import type { PmUpdatesFilter } from '~/api/Rest/queries';
import type { PmModuleVm } from '../PmModule.vm';

type TabName = (
    | 'pics'
    | 'docs'
    | 'logs'
);

export class LeftSidePanelVm {
    isOpenSidePanel = false;

    isOpenFilter = false;

    isFilterActive = false;

    updateFilter: PmUpdatesFilter = {
        initialized: false,
        fileExtensionType: E.FileExtensionType.none,
        filter: {
            fromDate: undefined,
            toDate: undefined,
            stageIds: undefined,
            actorType: undefined,
        },
    };

    tempUpdateFilter: PmUpdatesFilter = {
        initialized: false,
        fileExtensionType: E.FileExtensionType.none,
        filter: {},
    };

    activeTab: TabName = 'pics';

    updates = new LazyModelScroller(
        'PmUpdates',
        paging => restQuery.getPmProjectUpdates(
            this.updateFilter,
            this.projectId,
            paging,
        ),
        10,
    );

    constructor(
        public parentVm: PmModuleVm,
    ) {
        makeSafeObservable(this, {
            openSidePanel: action,
            openFilter: action,
            closeSidePanel: action,
            closeFilter: action,
            initializeFilters: action,
            resetPaging: action,
            setFromDate: action,
            setToDate: action,
            setStage: action,
            setActorType: action,
            isStageIdSelected: false,
            setDefaultFilterByType: action,
            clearFilter: action,
            applyUpdateFilter: action,
            openGallery: action,
            closeGallery: action,
        });
    }

    get isPicsDocuments() {
        return this.updates.data.some(docs => docs.isChecked);
    }

    get selectedDocs() {
        if (!this.isPicsDocuments) {
            return [];
        }

        return this.updates.data.filter(({ isChecked }) => isChecked)
            .map(({ attachment }) => attachment);
    }

    get projectId() {
        if (!this.parentVm.project) {
            return undefined;
        }

        return this.parentVm.project.externalId;
    }

    get projectStages() {
        if (!this.parentVm.project) {
            return [];
        }

        return this.parentVm.project.stages.map(stage => ({
            id: stage.externalId ?? 0,
            order: stage.id,
            isChecked: this.isStageIdSelected(stage.externalId),
        }));
    }

    get actorTypes() {
        return [
            {
                value: E.WorkflowActorType.client,
                name: lang.dict.get('client'),
            },
            {
                value: E.WorkflowActorType.consultant,
                name: lang.dict.get('consultant'),
            },
            {
                value: E.WorkflowActorType.contractor,
                name: lang.dict.get('contractor'),
            },
        ];
    }

    get actualltExtensionType() {
        switch (this.activeTab) {
            case 'pics':
                return E.FileExtensionType.image;
            case 'docs':
                return E.FileExtensionType.pdf;
        }

        return E.FileExtensionType.none;
    }

    get selectedTempStage() {
        const { stageIds } = this.tempUpdateFilter.filter;

        if (!stageIds) {
            return undefined;
        }

        return stageIds.find(item => item);
    }

    get selectedTempActorType() {
        const { actorType } = this.tempUpdateFilter.filter;

        if (!actorType) {
            return undefined;
        }

        return actorType;
    }

    get isTempFilterActive() {
        return [
            this.tempUpdateFilter.filter.fromDate?.isValid(),
            this.tempUpdateFilter.filter.toDate?.isValid(),
            Boolean(this.tempUpdateFilter.filter.actorType),
            Boolean(this.tempUpdateFilter.filter.stageIds?.length),
        ].includes(true);
    }

    openSidePanel = (tab: TabName) => {
        switch (tab) {
            case 'pics':
                this.updateFilter.fileExtensionType = E.FileExtensionType.image;
                this.initializeFilters();
                break;
            case 'docs':
                this.updateFilter.fileExtensionType = E.FileExtensionType.pdf;
                this.initializeFilters();
        }

        this.activeTab = tab;
        this.isOpenSidePanel = true;
    };

    openGallery = (id: number) => {
        this.parentVm.openSideGallery(id);
    };

    closeGallery = () => {
        this.parentVm.closeGallery();
    };

    openFilter = () => {
        this.isOpenFilter = true;
    };

    closeSidePanel = () => {
        this.isOpenSidePanel = false;
        this.updateFilter.initialized = false;
    };

    closeFilter = () => {
        if (!this.isFilterActive) {
            this.setDefaultFilterByType('tempUpdateFilter');
        }

        this.isOpenFilter = false;
    };

    initializeFilters = () => {
        this.updateFilter.initialized = true;
        this.resetPaging();
    };

    resetPaging = () => {
        this.updates.clear();
    };

    setFromDate = (date: Moment) => {
        const { filter } = this.tempUpdateFilter;

        if (filter.toDate?.isBefore(date)) {
            filter.toDate = date;
        }

        filter.fromDate = date;
    };

    setToDate = (date: Moment) => {
        this.tempUpdateFilter.filter.toDate = date;
    };

    setStage = (id: number) => {
        const { filter } = this.tempUpdateFilter;

        if (!filter.stageIds) {
            filter.stageIds = [id];
            return;
        }

        const indexOfStage = filter.stageIds.indexOf(id);

        if (indexOfStage === -1) {
            filter.stageIds.unshift(id);
            return;
        }

        filter.stageIds.splice(indexOfStage, 1);

        if (!this.isTempFilterActive && this.isFilterActive) {
            this.clearFilter();
        }
    };

    setActorType = (type: E.WorkflowActorType) => {
        this.tempUpdateFilter.filter.actorType = type;
    };

    isStageIdSelected = (id?: number) => {
        if (!id) {
            return false;
        }

        const { filter } = this.tempUpdateFilter;

        if (!filter.stageIds) {
            return false;
        }

        return filter.stageIds.includes(id);
    };

    setDefaultFilterByType = (type: 'updateFilter' | 'tempUpdateFilter') => {
        this[type] = {
            initialized: true,
            fileExtensionType: this.actualltExtensionType,
            filter: {
                fromDate: undefined,
                toDate: undefined,
                stageIds: undefined,
                actorType: undefined,
            },
        };
    };

    clearFilter = () => {
        if (this.isFilterActive) {
            this.setDefaultFilterByType('updateFilter');

            if (this.activeTab !== 'logs') {
                this.resetPaging();
            }
        }

        this.setDefaultFilterByType('tempUpdateFilter');
        this.isFilterActive = false;
    };

    applyUpdateFilter = () => {
        const {
            fromDate,
            toDate,
            stageIds,
            actorType,
        } = this.tempUpdateFilter.filter;

        this.updateFilter = {
            initialized: true,
            fileExtensionType: this.actualltExtensionType,
            filter: {
                fromDate: fromDate,
                toDate: toDate,
                stageIds: stageIds && Array.from(stageIds),
                actorType: actorType,
            },
        };

        this.isFilterActive = true;

        if (this.activeTab === 'logs') {
            return;
        }

        this.resetPaging();
    };
}
