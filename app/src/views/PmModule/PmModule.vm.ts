import { action, runInAction } from 'mobx';
import { E, Env, lang, restQuery, routing } from '~/api';
import { type MenuButton } from '~/bits';
import { type PmFilter, type PmProjectType, type UserTaskType, type PmTaskUpdateType, type PmStageProgressType, type FileDataType, TaskUpdate, type TaskUpdateType, WorkflowProgress, type MaterialNameType, PmTaskUpdate } from '~/models';
import type { PmBudgetType, PmPaymentType } from '~/models/PmModels/PmBudget';
import { stores } from '~/stores';
import { LeftSidePanelVm } from './LeftSidePanel/LeftSidePanel.vm';
import { RightSidePanelVm } from './RightSidePanel/RightSidePanel.vm';
import { capitalize } from '~/utils/string';
import type { Moment } from 'moment';
import { getSnapshot } from 'mobx-state-tree';

export type TabName = (
    | 'dashboard'
    | 'logs'
    | 'tools'
);

export class PmModuleVm {
    isLoading = false;

    isLoadingBudget = false;

    isProcessing = false;

    isBudgetSpecified = false;

    isStageViewModalOpened = false;

    isGalleryOpened = false;

    isRedirectedToUpdate = false;

    isAddObservationOpened = false;

    isObservationConfirmed = false;

    isUpdateModalOpened = false;

    didVisitSite?: boolean;

    updateForModal?: PmTaskUpdateType;

    currentIdForRedirect?: number;

    currentStageForModal?: PmStageProgressType;

    currentUpdateItemForGallery?: PmTaskUpdateType;

    currentObservation = TaskUpdate.create();

    observationList = WorkflowProgress.create();

    currentGalleryFile = '';

    project?: PmProjectType;

    budget?: PmBudgetType;

    materials?: MaterialNameType[];

    filterBy: PmFilter = {};

    selectedUserTask?: UserTaskType;

    consultantPaymentModel?: PmPaymentType;

    activeTab: TabName = 'dashboard';

    readonly rightPanel = new RightSidePanelVm(this);

    readonly leftPanel = new LeftSidePanelVm(this);

    shouldBudgetReload = false;

    contextRole = stores.profile.currentProfile.role;

    currentGalleryIndex = 0;

    idChanged = false;

    indicators = {
        tasks: 0,
        payments: 0,
        materials: 0,
        updates: 0,
    };

    stages: Array<{
        nameEn: string;
        nameAr?: string;
        order: number;
        isActive: boolean;
    }> = [];

    stageItems: Array<{
        nameEn: string;
        nameAr?: string;
        id: number;
    }> = [];

    stage = this.currentStage?.order;

    stageItem?: number;

    constructor(private projectId: number) {
        makeSafeObservable(this, {
            goToTab: action,
            setIsBudgetSpecified: action,
            setUserTask: action,
            setPayment: action,
            isMenuItemActive: false,
            goBack: false,
            openStageViewModal: action,
            closeStageViewModal: action,
            openGallery: action,
            closeGallery: action,
            redirectToUpdate: action,
            setRedirectedToUpdate: action,
            openSideGallery: action,
            goToContract: action,
            openObservationModal: action,
            closeObservationModal: action,
            setObservationDesc: action,
            onUploadObservationFile: action,
            onRemoveObservationFile: action,
            selectOnChange: action,
            addObservation: action,
            editObservation: action,
            removeObservation: action,
            switchObservationConfirm: action,
            openUpdateModal: action,
            changeFlaggedStatus: action,
            addComment: action,
            updateConsultantPayment: action,
            setDidVisitSite: action,
        });

        this.loadProject();
    }

    get currentStage() {
        return this.stages.find(item => item.isActive);
    }

    get stageItemName() {
        if (!this.stageItem) {
            return '--';
        }

        const stageItem = this.stageItems.find(item => item.id === this.stageItem);

        return lang.currentLanguage === 'en' ? stageItem?.nameEn : stageItem?.nameAr;
    }

    get stageName() {
        const stage = this.stages.find(item => item.order === this.stage);
        const stageName = lang.currentLanguage === 'en' ? stage?.nameEn : stage?.nameAr;

        if (!stage || !stageName) {
            const active = this.stages.find(item => item.isActive);
            const name = lang.currentLanguage === 'en' ? active?.nameEn : active?.nameAr;
            return `#${active?.order} ${name}`;
        }

        return `#${stage?.order} ${stageName}`;
    }

    get stageValues() {
        return this.stages.map(stage => ({
            value: stage.order,
            isActive: stage.isActive,
            name: `#${stage.order} ${lang.currentLanguage === 'en' ? stage.nameEn : stage.nameAr ?? ''}`,
        }));
    }

    get stageItemValues() {
        return this.stageItems.map(stage => ({
            value: stage.id,
            name: `${lang.currentLanguage === 'en' ? stage.nameEn : stage.nameAr ?? ''}`,
        }));
    }

    get router() {
        return stores.display.router;
    }

    get isClientContext() {
        return this.contextRole === E.RoleInCompany.client;
    }

    get route() {
        return routing.joinedRoutes([
            this.router.$.project.$.sub.$.management,
            this.router.$.admin.$.projects.$.sub.$.management,
            this.router.$.context.$.project.$.management,
        ]);
    }

    get currentPage() {
        const { params } = this.route;

        return 'tab' in params
            ? params.tab
            : false;
    }

    get menuItems(): Array<MenuButton<E.PmModuleMenu>> {
        return [
            {
                value: E.PmModuleMenu.tasks,
                iconName: 'design-menu-icon',
                name: lang.dict.enum('pmModuleMenu', E.PmModuleMenu.tasks),
                onClick: () => this.goToTab(E.PmModuleMenu.tasks),
                isDisabled: !this.isBudgetSpecified,
                additionalValue: this.indicators.tasks,
            },
            {
                value: E.PmModuleMenu.payments,
                iconName: 'price',
                name: lang.dict.enum('pmModuleMenu', E.PmModuleMenu.payments),
                onClick: () => this.goToTab(E.PmModuleMenu.payments),
                additionalValue: this.indicators.payments,
            },
            {
                value: E.PmModuleMenu.materials,
                iconName: 'materials-menu-icon',
                name: lang.dict.enum('pmModuleMenu', E.PmModuleMenu.materials),
                onClick: () => this.goToTab(E.PmModuleMenu.materials),
                additionalValue: this.indicators.materials,
            },
            {
                value: E.PmModuleMenu.updates,
                iconName: 'comment-menu-icon',
                name: lang.dict.enum('pmModuleMenu', E.PmModuleMenu.updates),
                onClick: () => this.goToTab(E.PmModuleMenu.updates),
                isDisabled: !this.isBudgetSpecified,
                additionalValue: this.indicators.updates,
            },
        ];
    }

    get isFilterByActive() {
        return [
            this.filterBy.phasesType,
            this.filterBy.stages,
            this.filterBy.status,
            this.filterBy.usersType,
            this.filterBy.acceptanceCriteria,
        ].some(item => item !== undefined && item.length > 0);
    }

    get context() {
        return stores.profile.currentProfile.role;
    }

    get totalBudget() {
        if (this.context === E.RoleInCompany.contractor) {
            return this.budget?.totalContractorPayment;
        }

        if (this.context === E.RoleInCompany.consultant) {
            return (this.budget?.totalContractorPayment ?? 0) + (this.budget?.totalConsultantPayment ?? 0);
        }

        return this.budget?.totalClientMaterialsPayment;
    }

    get data() {
        if (!this.isFilterByActive) {
            return this.project;
        }

        return this.project?.getFiltered(this.filterBy);
    }

    get selectObservationValues() {
        const actorType = capitalize(this.context);

        const values = Object.entries(E.TaskUpdateType)
            .filter(item => item[0] !== E.WorkflowActorType.none && !item[0].startsWith(`messageTo${actorType}`));

        return values.map(item => ({
            value: item[1],
            name: lang.dict.get(item[1]),
        }));
    }

    get observationTitle() {
        switch (this.context) {
            case E.RoleInCompany.contractor:
                return lang.dict.get('submitObservationsContractor');
            case E.RoleInCompany.consultant:
                return lang.dict.get('submitObservationsConsultant');
            case E.RoleInCompany.client:
                return lang.dict.get('submitObservationsClient');
            default:
                return lang.dict.get('submitObservationsConsultant');
        }
    }

    goToTab = (tab: E.PmModuleMenu) => {
        this.shouldBudgetReload = true;
        this.route.go({
            tab,
        });
    };

    isMenuItemActive = (page: E.PmModuleMenu) => page === this.currentPage;

    goBack = () => stores.display.router.goBack();

    loadProject = async () => {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;

        const project = await restQuery.project.getPmProject(this.projectId);
        const budget = await restQuery.project.getPmBudget(this.projectId);
        const materials = await restQuery.workflow.getMaterialNames(this.projectId);
        const stages = await restQuery.getObservationStages(this.projectId);
        const indicators = await restQuery.getPmIndicators(this.projectId);

        if (!project || !budget || !materials || !stages || !indicators) {
            this.goBack();
            return;
        }

        runInAction(() => {
            this.project = project;
            this.budget = budget;
            this.materials = materials;
            this.stages = stages;
            this.indicators = indicators;
            this.stage = stages.find(item => item.isActive)?.order;
            this.isBudgetSpecified = this.budget.totalClientMaterialsPayment > 0
            || this.context !== E.RoleInCompany.client;
        });

        if (!this.isBudgetSpecified) {
            this.goToTab(E.PmModuleMenu.payments);
        }

        this.isLoading = false;

        const stageId = this.project?.stages[this.currentStage?.order ?? 1 - 1].externalId;

        const items = await restQuery.getObservationItems(stageId);

        if (!items) {
            return;
        }

        this.stageItems = items;
    };

    loadBuget = async () => {
        if (this.isLoadingBudget) {
            return;
        }

        runInAction(() => {
            this.isLoadingBudget = true;
            this.budget = undefined;
        });

        const budget = await restQuery.project
            .getPmBudget(this.projectId);

        if (!budget) {
            runInAction(() => {
                this.isLoadingBudget = true;

            });

            return;
        }

        runInAction(() => {
            this.budget = budget;
            this.isLoadingBudget = false;
        });
    };

    setUserTask = (userTask?: UserTaskType, date?: Moment) => {
        if (date) {
            userTask?.setDate(date);
        }

        this.selectedUserTask = userTask;
    };

    setPayment = (payment?: PmPaymentType) => {
        this.consultantPaymentModel = payment;
    };

    setActiveTab = (tab: TabName) => {
        this.activeTab = tab;
    };

    setIsBudgetSpecified = (value: boolean) => {
        this.isBudgetSpecified = value;
    };

    openStageViewModal = (identifier?: number, isFromChart = false) => {
        if (typeof identifier === 'undefined') {
            return;
        }

        (async () => {
            const id = isFromChart
                ? this.project?.stages[identifier].externalId
                : identifier;

            const res = await restQuery.project.getStageProgress(id);

            if (!res) {
                return;
            }

            this.currentStageForModal = res;
            this.isStageViewModalOpened = true;
        })();
    };

    closeStageViewModal = () => {
        this.isStageViewModalOpened = false;
    };

    openGallery = (taskUpdate: PmTaskUpdateType, file: FileDataType, isComment?: boolean) => {
        if (file.img?.url.includes('/assets/graphics/document.svg')) {
            const a = document.createElement('a');
            a.href = `${Env.get('API_ENDPOINT')}file/getfilerequest/${file.fileId}`;
            a.download = file.file?.name ?? '';
            a.target = '_blank';
            a.click();
            return;
        }

        if (isComment) {
            this.closeObservationModal();

            const comment = taskUpdate.comments.find(com => com.attachments.some(attachment => attachment.fileId === file.fileId));

            if (!comment) {
                return;
            }

            const newTaskUpdate = PmTaskUpdate.create({
                attachments: getSnapshot(comment?.attachments),
                taskName: this.getUpdateTitleForGallery(taskUpdate),
                createdOn: comment.createdDate,
                submittedByName: comment.name,
            });

            this.currentUpdateItemForGallery = newTaskUpdate;
            this.currentGalleryFile = file.fileId;
            this.leftPanel.openSidePanel('pics');
            this.isGalleryOpened = true;
            return;
        }

        this.closeObservationModal();
        taskUpdate.setTaskName(this.getUpdateTitleForGallery(taskUpdate));

        if (taskUpdate.submittedByName === '') {
            taskUpdate.setSubmittedByName(lang.dict.get('system'));
        }

        this.currentUpdateItemForGallery = taskUpdate;
        this.currentGalleryFile = file.fileId;
        this.leftPanel.openSidePanel('pics');
        this.isGalleryOpened = true;
    };

    openSideGallery = (id: number) => {
        if (!this.isGalleryOpened) {
            this.currentGalleryIndex = id;
            this.isGalleryOpened = true;
            return;
        }

        this.currentUpdateItemForGallery = undefined;

        if (this.currentGalleryIndex === id) {
            runInAction(() => {
                this.idChanged = !this.idChanged;
            });
        }

        this.currentGalleryIndex = id;
    };

    closeGallery = () => {
        this.currentUpdateItemForGallery = undefined;
        this.isGalleryOpened = false;
    };

    redirectToUpdate = (id: number) => {
        runInAction(() => {
            this.isRedirectedToUpdate = true;
            this.currentIdForRedirect = id;

            if (this.currentPage !== E.PmModuleMenu.updates) {
                this.goToTab(E.PmModuleMenu.updates);
            }

            this.closeGallery();
        });
    };

    setRedirectedToUpdate = (value: boolean) => {
        this.isRedirectedToUpdate = value;
    };

    goToContract = () => {
        stores.display.router.$.project.$.sub.$.contract.go({ id: this.projectId });
    };

    openObservationModal = () => {
        this.isAddObservationOpened = true;
        switch (this.context) {
            case E.RoleInCompany.contractor:
                this.currentObservation.setType(E.TaskUpdateType.generalUpdates);
                return;
            case E.RoleInCompany.consultant:
                this.currentObservation.setType(E.TaskUpdateType.siteObservation);
                return;
            case E.RoleInCompany.client:
                this.currentObservation.setType(E.TaskUpdateType.risksConcerns);
                break;
        }
    };

    closeObservationModal = () => {
        this.updateForModal = undefined;
        this.currentObservation = TaskUpdate.create();
        this.observationList = WorkflowProgress.create();
        this.isAddObservationOpened = false;
        this.isUpdateModalOpened = false;
        this.setRedirectedToUpdate(false);
    };

    setObservationDesc = (text: string) => {
        this.currentObservation.setDescription(text);
    };

    onUploadObservationFile = (file: FileDataType) => {
        this.currentObservation.addAttachment(file);
    };

    onRemoveObservationFile = (file: FileDataType) => {
        this.currentObservation.removeAttachment(file);
    };

    selectOnChange = (type: E.TaskUpdateType) => {
        this.currentObservation.setType(type);
    };

    addObservation = () => {
        if (
            this.currentObservation.description.length < 3
            || this.currentObservation.type === E.TaskUpdateType.none
        ) {
            return;
        }

        this.observationList.addUpdate(this.currentObservation);

        this.currentObservation = TaskUpdate.create();

        switch (this.context) {
            case E.RoleInCompany.contractor:
                this.currentObservation.setType(E.TaskUpdateType.generalUpdates);
                return;
            case E.RoleInCompany.consultant:
                this.currentObservation.setType(E.TaskUpdateType.siteObservation);
                return;
            case E.RoleInCompany.client:
                this.currentObservation.setType(E.TaskUpdateType.risksConcerns);
                break;
        }
    };

    removeObservation = (item: TaskUpdateType) => {
        this.observationList?.removeUpdate(item);
    };

    editObservation = (item: TaskUpdateType) => {
        this.observationList?.removeUpdate(item);
        this.currentObservation = item;
    };

    switchObservationConfirm = () => {
        this.isObservationConfirmed = !this.isObservationConfirmed;
    };

    submitObservation = () => {
        (async () => {
            if (this.isProcessing) {
                return;
            }

            const updates = this.observationList.localUpdates;
            const id = this.project?.externalId;

            if (!updates || !id) {
                return;
            }

            runInAction(() => {
                this.isProcessing = true;
            });

            const submissionResponse = await restQuery.project.postObservation(updates, id, this.didVisitSite, this.stage, this.stageItem);

            if (!submissionResponse) {
                runInAction(() => {
                    this.isProcessing = false;
                });

                return;
            }

            this.openUpdateModal(submissionResponse, this.stage);

            runInAction(() => {
                this.isProcessing = false;
            });
        })();
    };

    openUpdateModal = (updateId?: number, stage?: number) => {
        (async () => {
            if (!updateId) {
                return;
            }

            const response = await restQuery.getPmTaskUpdate(updateId);

            if (!response) {
                return;
            }

            response.setStageNumber(stage);

            this.updateForModal = response;
            this.isUpdateModalOpened = true;
        })();
    };

    changeFlaggedStatus = (item: PmTaskUpdateType) => {
        item.setFlagged();
    };

    addComment = (item: PmTaskUpdateType) => {
        (async () => {
            if (this.isProcessing || !item.currentComment.description) {
                return;
            }

            runInAction(() => {
                this.isProcessing = true;
            });

            const { description, attachments } = item.currentComment;

            const res = await restQuery.project
                .postTaskUpdateComment(item.id, description, attachments);

            if (!res) {
                runInAction(() => {
                    this.isProcessing = false;
                });

                return;
            }

            runInAction(() => {
                item.addComment(res);
                this.isProcessing = false;
            });
        })();
    };

    updateConsultantPayment = () => {
        if (!this.consultantPaymentModel) {
            return;
        }

        if (!this.isClientContext) {
            this.consultantPaymentModel.setIsConfirmed();
            return;
        }

        this.consultantPaymentModel.setStatusToCompleted();
    };

    getUpdateTitleForGallery = (update: PmTaskUpdateType) => {
        if (update.isInitialUpdate) {
            return update.customUpdateTitle;
        }

        if (update.isObservation) {
            return capitalize(update.submittedBy).concat(' Observation');
        }

        if (update.isMaterialUpdate) {
            return lang.dict.get(update.altTaskName);
        }

        return update.taskName;
    };

    setDidVisitSite = (value: boolean) => {
        this.didVisitSite = value;
    };

    setStage = async (order: number) => {
        this.stageItem = undefined;

        this.stage = order;

        const stageId = this.project?.stages[order - 1].externalId;

        const items = await restQuery.getObservationItems(stageId);

        if (!items) {
            return;
        }

        this.stageItems = items;
    };

    setStageItem = (id: number) => {
        this.stageItem = id;
    };
}
