import { action, makeAutoObservable, runInAction } from 'mobx';
import { E, lang, LazyModelScroller, restQuery } from '~/api';
import type { MenuButton } from '~/bits';
import { type PmTaskUpdateType } from '~/models/PmModels/PmTaskUpdate';
import { deepReaction } from '~/utils';
import type { PmModuleVm } from '~/views/PmModule/PmModule.vm';

export class UpdatesVm {
    isLoading = false;

    isModalOpen = false;

    isFiltersOpened = false;

    updateForModal?: PmTaskUpdateType;

    updateStageNumber? = 0;

    updateCount = {
        all: 0,
        unread: 0,
        flagged: 0,
    };

    updatesList = new LazyModelScroller(
        'Update list',
        paging => restQuery.getPmTaskUpdates(
            this.projectId,
            this.updateCount,
            paging,
            this.filters,
        ),
        15,
    );

    currentPage = E.PmUpdatesMenu.all;

    filters = {
        isUnread: undefined as boolean | undefined,
        isFlagged: undefined as boolean | undefined,
        submittedBy: undefined as E.WorkflowActorType[] | undefined,
        acceptanceCriteria: undefined as string[] | undefined,
        searchText: undefined as string | undefined,
        stageIds: undefined as number[] | undefined,
        materialSequenceIds: undefined as number[] | undefined,
    };

    localFilters = {
        stages: undefined as number[] | undefined,
        materials: undefined as number[] | undefined,
        acceptanceCriteria: undefined as string[] | undefined,
        usersType: undefined as E.WorkflowActorType[] | undefined,
    };

    constructor(
        readonly projectId: number,
        readonly parentVm: PmModuleVm,
    ) {
        makeAutoObservable(this, {
            clearFilters: action,
            changePage: action,
            changePageFilter: action,
            openModal: action,
            closeModal: action,
            switchFiltersOpened: action,
            clearSearch: action,
            setStageId: action,
            setCriteria: action,
            setSearchValue: action,
            setUsers: action,
            changeFlaggedStatus: action,
            addComment: action,
            clearLocalFilters: action,
            submitLocalFilters: action,
            setMaterialId: action,
            openMobileModal: action,
        });

        if (parentVm.isRedirectedToUpdate) {
            this.openModal(parentVm.currentIdForRedirect);
        }

        deepReaction(
            () => this.filters.searchText,
            () => this.updatesList.clear(),
        );

        this.updatesList.clear();
    }

    get isFiltersActive() {
        if (this.localFilters.stages) {
            return this.localFilters.stages.length > 0;
        }

        if (this.localFilters.materials) {
            return this.localFilters.materials.length > 0;
        }

        if (this.localFilters.acceptanceCriteria) {
            return this.localFilters.acceptanceCriteria.length > 0;
        }

        if (this.localFilters.usersType) {
            return this.localFilters.usersType.length > 0;
        }

        return false;
    }

    get menuItems(): Array<MenuButton<E.PmUpdatesMenu>> {
        return [
            {
                value: E.PmUpdatesMenu.all,
                name: lang.dict.enum('pmUpdatesMenu', E.PmUpdatesMenu.all),
                onClick: () => this.changePage(E.PmUpdatesMenu.all),
                additionalValue: this.updateCount.all,
            },
            {
                value: E.PmUpdatesMenu.unread,
                name: lang.dict.enum('pmUpdatesMenu', E.PmUpdatesMenu.unread),
                onClick: () => this.changePage(E.PmUpdatesMenu.unread),
                additionalValue: this.updateCount.unread,
            },
            {
                value: E.PmUpdatesMenu.flagged,
                name: lang.dict.enum('pmUpdatesMenu', E.PmUpdatesMenu.flagged),
                onClick: () => this.changePage(E.PmUpdatesMenu.flagged),
                additionalValue: this.updateCount.flagged,
            },
        ];
    }

    get isListEmpty() {
        return this.updatesList.data.length === 0;
    }

    isMenuItemActive = (page: E.PmUpdatesMenu) => page === this.currentPage;

    clearFilters = () => {
        this.filters = {
            isUnread: undefined,
            isFlagged: undefined,
            submittedBy: undefined,
            acceptanceCriteria: undefined,
            stageIds: undefined,
            materialSequenceIds: undefined,
            searchText: '',
        };
    };

    clearLocalFilters = () => {
        this.localFilters = {
            stages: undefined,
            materials: undefined,
            acceptanceCriteria: undefined,
            usersType: undefined,
        };
    };

    changePage = (page: E.PmUpdatesMenu) => {
        this.currentPage = page;
        this.changePageFilter(page);
    };

    changePageFilter = (page: E.PmUpdatesMenu) => {
        switch (page) {
            case E.PmUpdatesMenu.all:
                this.clearFilters();
                this.updatesList.clear();
                break;
            case E.PmUpdatesMenu.unread:
                this.clearFilters();
                this.filters.isUnread = true;
                this.updatesList.clear();
                break;
            case E.PmUpdatesMenu.flagged:
                this.clearFilters();
                this.filters.isFlagged = true;
                this.updatesList.clear();
                break;
        }
    };

    openModal = (updateId?: number, stageNumber?: number) => {
        (async () => {
            if (!updateId) {
                return;
            }

            const response = await restQuery.getPmTaskUpdate(updateId);

            if (!response) {
                return;
            }

            this.updatesList.data
                .find(update => update.id === updateId)
                ?.setRead(true);

            this.updateForModal = response;
            this.updateStageNumber = stageNumber ?? 0;
            this.isModalOpen = true;
        })();
    };

    openMobileModal = (item: PmTaskUpdateType) => {
        (async () => {
            if (!item.id) {
                return;
            }

            const response = await restQuery.getPmTaskUpdate(item.id);

            if (!response) {
                return;
            }

            this.updatesList.data
                .find(update => update.id === item.id)
                ?.setRead(true);

            this.updateForModal = response;
            this.updateStageNumber = item.submittedInStageOrder;
            this.isModalOpen = true;
        })();
    };

    closeModal = () => {
        this.updateForModal = undefined;
        this.isModalOpen = false;
        this.parentVm.setRedirectedToUpdate(false);
    };

    switchFiltersOpened = () => {
        this.isFiltersOpened = !this.isFiltersOpened;
    };

    setSearchValue = (value: string) => {
        this.filters.searchText = value;
    };

    clearSearch = () => {
        this.filters.searchText = '';
    };

    setStageId = (id: number, values?: number[]) => {
        if (!values && this.localFilters.stages) {
            this.localFilters.stages = this.localFilters.stages
                ?.filter(stageId => stageId !== id);

            return;
        }

        if (!this.localFilters.stages) {
            this.localFilters.stages = id !== -1 ? [id] : values;
            return;
        }

        if (id === -1) {
            this.localFilters.stages = this.localFilters.stages.includes(id) ? undefined : values;
            return;
        }

        if (!this.localFilters.stages.includes(id)) {
            this.localFilters.stages.unshift(id);
            return;
        }

        this.localFilters.stages = this.localFilters.stages
            .filter(stageId => stageId !== id && stageId !== -1);
    };

    setMaterialId = (id: number, values?: number[]) => {
        if (!values && this.localFilters.materials) {
            this.localFilters.materials = this.localFilters.materials
                ?.filter(stageId => stageId !== id);

            return;
        }

        if (!this.localFilters.materials) {
            this.localFilters.materials = id !== -1 ? [id] : values;
            return;
        }

        if (id === -1) {
            this.localFilters.materials = this.localFilters.materials.includes(id) ? undefined : values;
            return;
        }

        if (!this.localFilters.materials.includes(id)) {
            this.localFilters.materials.unshift(id);
            return;
        }

        this.localFilters.materials = this.localFilters.materials
            .filter(stageId => stageId !== id && stageId !== -1);
    };

    setCriteria = (name: string, value: boolean, values: string[]) => {
        if (!this.localFilters.acceptanceCriteria) {
            this.localFilters.acceptanceCriteria = name !== 'none' ? [name] : values;
            return;
        }

        if (name === 'none') {
            this.localFilters.acceptanceCriteria = this.localFilters.acceptanceCriteria
                .includes(name)
                ? undefined
                : values;
            return;
        }

        if (!this.localFilters.acceptanceCriteria.includes(name)) {
            this.localFilters.acceptanceCriteria.unshift(name);
            return;
        }

        this.localFilters.acceptanceCriteria = this.localFilters.acceptanceCriteria
            .filter(workflowName => workflowName !== name && workflowName !== 'none');
    };

    setUsers = (name: E.WorkflowActorType, value: boolean, values: E.WorkflowActorType[]) => {
        if (!this.localFilters.usersType) {
            this.localFilters.usersType = name !== E.WorkflowActorType.none ? [name] : values;
            return;
        }

        if (name === E.WorkflowActorType.none) {
            this.localFilters.usersType = this.localFilters.usersType.includes(name) ? undefined : values;
            return;
        }

        if (!this.localFilters.usersType.includes(name)) {
            this.localFilters.usersType.unshift(name);
            return;
        }

        this.localFilters.usersType = this.localFilters.usersType
            .filter(actor => actor !== name && actor !== E.WorkflowActorType.none);
    };

    changeFlaggedStatus = (item: PmTaskUpdateType) => {
        item.setFlagged();
        this.updatesList.clear();
    };

    addComment = (item: PmTaskUpdateType) => {
        (async () => {
            if (this.isLoading || !item.currentComment.description) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const { description, attachments } = item.currentComment;

            const res = await restQuery.project
                .postTaskUpdateComment(item.id, description, attachments);

            if (!res) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                item.addComment(res);
                this.isLoading = false;
            });
        })();
    };

    submitLocalFilters = () => {
        const users = this.localFilters.usersType?.filter(item => item !== E.WorkflowActorType.none);
        const acceptanceCriteria = this.localFilters.acceptanceCriteria?.filter(item => item !== 'none');
        const stages = this.localFilters.stages?.filter(item => item !== -1);
        const materials = this.localFilters.materials?.filter(item => item !== -1);

        this.filters.submittedBy = users;
        this.filters.acceptanceCriteria = acceptanceCriteria;
        this.filters.stageIds = stages;
        this.filters.materialSequenceIds = materials;
        this.updatesList.clear();
    };
}
