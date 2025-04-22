import { action, runInAction } from 'mobx';
import moment from 'moment';
import { E, ErrorListHolder, T, lang, restQuery } from '~/api';
import type { BankDetailsType, InvoiceDetailsType, WorkflowProgressType } from '~/models';
import { deepReaction } from '~/utils';
import { capitalize } from '~/utils/string';
import type { PmModuleVm } from '../PmModule.vm';
import { stores } from '~/stores';

const struct = (type: E.ActionType, context: E.RoleInCompany) => {
    const isClient = context === E.RoleInCompany.client;

    switch (type) {
        case E.ActionType.datePicker:
            return T.type({
                value: T.type({
                    date: T.moment(),
                }),
                updates: isClient ? T.any() : T.nonempty(T.array()),
            });
        case E.ActionType.checklist:
            return T.type({
                value: T.boolean(),
                updates: isClient ? T.any() : T.nonempty(T.array()),
                checked: T.literal(false),
            });
        case E.ActionType.payment:
            return T.type({
                value: T.type({
                    dateOfPayment: T.moment(),
                    attachments: T.nonempty(
                        T.files(),
                    ),
                }),
                updates: isClient ? T.any() : T.nonempty(T.array()),
            });
        case E.ActionType.empty:
            return T.type({
                value: T.boolean(),
                updates: isClient ? T.any() : T.nonempty(T.array()),
            });
        case E.ActionType.none:
            return T.type({
                value: T.boolean(),
                updates: isClient ? T.any() : T.nonempty(T.array()),
            });
    }
};
export class TaskActionModalVm {
    isOpen = false;

    isLoading = false;

    isStageModal = false;

    isItemModal = false;

    isInvoiceModal = false;

    workflowProgress?: WorkflowProgressType;

    invoice?: InvoiceDetailsType;

    isSelected = false;

    didVisitSite?: boolean;

    validationPassed = false;

    bankDetails?: BankDetailsType;

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(this.currentActionType, this.context),
    );

    stageErrorListHolder = new ErrorListHolder();

    constructor(private parentVm?: PmModuleVm) {
        makeSafeObservable(this, {
            mount: false,
            open: action,
            close: action,
            setConfirmSelection: action,
            submitTask: false,
            setStageModal: action,
            switchItemModal: action,
            switchInvoiceModal: action,
            setIsLoading: action,
            closeInvoiceModal: action,
            setDidVisitSite: action,
        });

        deepReaction(
            () => this.validationData,
            () => {
                this.validationPassed = this.errorListHolder.test();
            },
        );
    }

    get isSubmitLocked() {
        return !(this.validationPassed && this.isSelected);
    }

    get context() {
        return stores.profile.currentProfile.role;
    }

    get taskDueDate() {
        if (this.workflowProgress?.currentTask.dueDate?.isValid()) {
            return true;
        }

        return false;
    }

    get currentActionType() {
        if (!this.workflowProgress?.currentTask.actionType) {
            return E.ActionType.none;
        }

        return this.workflowProgress.currentTask.actionType;
    }

    get dueDateDiff() {
        if (!this.taskDueDate) {
            return {
                text: '',
                isDelay: false,
            };
        }

        const diff = moment(this.workflowProgress?.currentTask.dueDate)
            .diff(moment(), 'days', false);

        const isDelay = diff < 0;

        const text = lang.dict.format(
            isDelay ? 'dueDaysDelay' : 'dueDaysLeft',
            [Math.abs(isDelay ? diff : diff + 1)],
        );

        return {
            text,
            isDelay,
        };
    }

    get showTaskAction() {
        if (!this.workflowProgress) {
            return false;
        }

        const { isActionable, isValidUserActor } = this.workflowProgress.currentTask;

        return isActionable && isValidUserActor;
    }

    get isCanReject() {
        if (
            !this.workflowProgress
            || this.parentVm?.selectedUserTask?.order === 1
            || this.workflowProgress.currentTask.actionType === E.ActionType.payment
        ) {
            return false;
        }

        return this.workflowProgress.submissions.length > 0;
    }

    get stage() {
        return this.parentVm?.project?.stages
            .find(stage => stage.id === this.workflowProgress?.stageId);
    }

    get validationData() {
        switch (this.currentActionType) {
            case E.ActionType.datePicker:
                return {
                    value: this.workflowProgress?.currentTask.valueDatePicker,
                    updates: this.workflowProgress?.localUpdateDtos,
                };
            case E.ActionType.payment:
                return {
                    value: this.workflowProgress?.currentTask.paymentBlockPayload,
                    updates: this.workflowProgress?.localUpdateDtos,
                };
            case E.ActionType.empty:
                return {
                    value: this.isSelected,
                    updates: this.workflowProgress?.localUpdateDtos,
                };
            case E.ActionType.none:
                return {
                    value: this.isSelected,
                    updates: this.workflowProgress?.localUpdateDtos,
                };
            case E.ActionType.checklist:
                return {
                    value: this.isSelected,
                    updates: this.workflowProgress?.localUpdateDtos,
                    checked: this.workflowProgress?.currentTask.valueChecklist?.isSomeOptionsUnchecked,
                };
            default:
                return {};
        }
    }

    get confirmDescription() {
        const role = capitalize(this.workflowProgress?.currentTask.actorType);
        return lang.dict.get(`confirm${role}`);
    }

    mount = async () => {
        if (!this.parentVm?.selectedUserTask?.externalId || this.isLoading) {
            return;
        }

        runInAction(() => {
            this.isLoading = true;
        });

        const { workflowId, externalId } = this.parentVm.selectedUserTask;

        const pmTask = await restQuery.project.getPmTask(workflowId, externalId);

        if (!pmTask) {
            runInAction(() => {
                this.isLoading = false;
            });
            return;
        }

        runInAction(() => {
            this.workflowProgress = pmTask;
            this.open();
            this.isLoading = false;
        });
    };

    open = () => {
        this.isOpen = true;
    };

    close = () => {
        this.parentVm?.setUserTask(undefined);
        this.isOpen = false;
    };

    setConfirmSelection = () => {
        this.isSelected = !this.isSelected;
    };

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };

    submitTask = (isApprove = true) => {
        (async () => {
            if (
                this.isLoading ||
                !this.parentVm?.project ||
                !this.workflowProgress?.externalId ||
                !this.workflowProgress.currentTask?.externalId
            ) {
                return;
            }

            this.setIsLoading(true);

            const submissionResponse = await restQuery.project
                .postTaskSubmission(
                    this.workflowProgress,
                    isApprove,
                    this.parentVm.project.externalId,
                    this.didVisitSite,
                );

            if (!submissionResponse) {
                this.setIsLoading(false);
                return;
            }

            if (!this.parentVm) {
                this.setIsLoading(false);
                return;
            }

            if (!submissionResponse.previousStagesCompleted || !submissionResponse.isMaterialFinished) {
                this.setIsLoading(false);

                if (!submissionResponse.isMaterialFinished) {
                    runInAction(() => {
                        this.stageErrorListHolder.add({
                            value: 'isMaterialFinished',
                            key: 'isMaterialFinished',
                            type: 'isMaterialFinished',
                            refinement: undefined,
                            message: 'isMaterialFinished',
                            branch: [''],
                            path: ['isMaterialFinished'],
                        });
                    });
                }

                if (!submissionResponse.previousStagesCompleted) {
                    runInAction(() => {
                        this.stageErrorListHolder.add({
                            value: 'previousStagesCompleted',
                            key: 'previousStagesCompleted',
                            type: 'previousStagesCompleted',
                            refinement: undefined,
                            message: 'previousStagesCompleted',
                            branch: [''],
                            path: ['previousStagesCompleted'],
                        });
                    });
                }

                this.stageErrorListHolder.clearListTimeout = setTimeout(() => {
                    this.stageErrorListHolder.clear();
                    this.stageErrorListHolder.clearListTimeout = undefined;
                }, 5000);

                return;
            }

            runInAction(() => {
                if (!this.parentVm) {
                    this.setIsLoading(false);
                    return;
                }

                this.parentVm.project = submissionResponse;
            });

            const pmTask = await restQuery.project.getPmTask(
                this.workflowProgress.externalId,
                this.workflowProgress.currentTask.externalId,
            );

            if (!pmTask) {
                this.setIsLoading(false);

                this.close();
                return;
            }

            this.workflowProgress = pmTask;

            this.setIsLoading(false);
        })();
    };

    setStageModal = (value: boolean) => {
        this.isStageModal = value;
    };

    switchItemModal = () => {
        this.isItemModal = !this.isItemModal;
    };

    switchInvoiceModal = () => {
        const taskId = this.workflowProgress?.proofTaskId ?? this.workflowProgress?.currentTask.externalId;

        if (!taskId) {
            return;
        }

        (async () => {
            const res = await restQuery.getInvoiceDetails(taskId);

            if (this.stage?.order !== 1) {
                const bankDetails = await restQuery.contract.getBankDetails(this.parentVm?.project?.externalId ?? 0, E.RoleInCompany.contractor);

                if (bankDetails) {
                    this.bankDetails = bankDetails;
                }
            }

            if (!res) {
                return;
            }

            this.invoice = res;
            this.isInvoiceModal = !this.isInvoiceModal;
        })();
    };

    closeInvoiceModal = () => {
        this.invoice = undefined;
        this.bankDetails = undefined;
        this.isInvoiceModal = false;
    };

    openProof = (id?: number) => {
        if (!id) {
            return;
        }

        (async () => {
            const res = await restQuery.getPmTaskUpdate(id);

            if (!res || !this.parentVm) {
                return;
            }

            this.parentVm.currentUpdateItemForGallery = res;
            this.parentVm.leftPanel.openSidePanel('pics');
            this.parentVm.isGalleryOpened = true;
        })();
    };

    setDidVisitSite = (value: boolean) => {
        this.didVisitSite = value;
    };
}
