import { action, reaction, runInAction } from 'mobx';
import { clone } from 'mobx-state-tree';
import { E, ErrorListHolder, restQuery, T } from '~/api';
import { MaterialOption, type MaterialOptionType } from '~/models/PmModels/MaterialOption';
import { type MaterialProgressType } from '~/models/PmModels/MaterialProgress';
import { stores } from '~/stores';
import { deepReaction } from '~/utils';
import { type MaterialsVm } from '../../Materials.vm';
import { toInternalAttachmentsIds } from '~/api/Rest/models';

type DraftUpdate = {
    supplier: string;
    rates: number;
    description: string;
    totalValue: number;
    attachments: string[];
};

const struct = (type?: E.MaterialUserTaskType) => {
    if (type === E.MaterialUserTaskType.selectOption) {
        return T.type({
            approvedOption: T.literal(true),
        });
    }

    if (type === E.MaterialUserTaskType.provideOptions) {
        return T.type({
            options: T.size(T.array(), 2),
        });
    }

    return T.any();
};

export class ContractorForClientModalVm {
    isLoading = false;

    isPurchaseConfirmed = false;

    isRejected = false;

    isRejecting = false;

    isPreviousCollapsed = true;

    validationPassed = false;

    rejectMessage = '';

    currentMaterialOption = MaterialOption.create();

    materialContractor: MaterialOptionType[] = [];

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(this.materialItem?.currentTask?.materialUserTaskType),
    );

    constructor(
        private parentVm: MaterialsVm,
        public materialItem?: MaterialProgressType,
    ) {
        makeSafeObservable(this, {
            submitMaterialOption: action,
            editMaterialOption: action,
            removeMaterialOption: action,
            switchPurchaseConfirmed: action,
            selectOption: action,
            switchComments: action,
            addComment: false,
            switchPreviousCollapsed: action,
            submitContractorOptions: false,
            setRejectMessage: action,
            setIsRejecting: action,
            submitRejection: false,
            submitSelectedOption: false,
        });

        this.validationPassed = this.errorListHolder.test();

        deepReaction(
            () => [this.validationData, this.validationPassed],
            () => {
                this.validationPassed = this.errorListHolder.test();
            },
        );

        reaction(
            () => this.materialContractor.length,
            async () => await restQuery.workflow.saveTaskUpdateDraft(
                E.TaskUpdateDraft.material,
                this.materialContractor,
                this.materialItem?.currentTask.materialUserTaskId,
            ),
        );
    }

    get validationData() {
        if (!this.materialItem) {
            return {};
        }

        const { materialUserTaskType } = this.materialItem.currentTask;

        const { provideOptions, selectOption } = E.MaterialUserTaskType;

        if (materialUserTaskType === provideOptions) {
            return {
                options: this.materialContractor,
            };
        }

        if (materialUserTaskType === selectOption) {
            return {
                approvedOption: Boolean(
                    this.materialItem.contractorSubmittedOptions
                        ?.some(option => option.isSelected),
                ),
            };
        }

        return {};
    }

    get isSubmitLocked() {
        return !this.validationPassed;
    }

    get taskCompleted() {
        if (!this.materialItem) {
            return undefined;
        }

        return this.materialItem.submissions
            .find(item => item.materialSubmissionType === E.MaterialSubmissionType.selectOption);
    }

    get currentRole() {
        return stores.profile.currentProfile.role;
    }

    get isOptionBoxSelectable() {
        if (this.canSelectOptions && !this.taskCompleted) {
            return this.currentRole;
        }

        return '';
    }

    get canAddOptions() {
        if (!this.materialItem) {
            return false;
        }

        const { isActionable, isValidUserActor, actorType } = this.materialItem.currentTask;

        return isActionable && isValidUserActor && actorType === E.WorkflowActorType.contractor;
    }

    get isPreviousOptions() {
        return Boolean(this.isRejected || this.materialItem?.rejectedOptions);
    }

    get canSelectOptions() {
        if (!this.materialItem) {
            return false;
        }

        const { isActionable, isValidUserActor, actorType } = this.materialItem.currentTask;

        return isActionable && isValidUserActor && actorType === E.WorkflowActorType.client;
    }

    get materialOptions() {
        if (this.materialItem?.currentTask.actorType === E.WorkflowActorType.contractor) {
            return this.materialContractor;
        }

        return this.materialItem?.contractorSubmittedOptions;
    }

    mount = async () => {
        if (!this.materialItem) {
            return;
        }

        const {
            isActionable,
            isValidUserActor,
            materialUserTaskId,
        } = this.materialItem.currentTask;

        if (!isActionable || !isValidUserActor) {
            return;
        }

        const response = await restQuery.workflow.getTaskUpdateDraft(
            E.TaskUpdateDraft.material,
            materialUserTaskId,
        );

        if (!response) {
            return;
        }

        let value: DraftUpdate[] = [];

        try {
            value = JSON.parse(response);
        } catch (error) {
            // error
        }

        const draftMaterialOption = await Promise.all(
            value.map(async item => MaterialOption.create({
                rates: item.rates,
                description: item.description,
                supplier: item.supplier,
                totalValue: item.totalValue,
                attachments: await toInternalAttachmentsIds(item.attachments),
            })),
        );

        runInAction(() => {
            draftMaterialOption.forEach(item => this.materialContractor.push(item));
        });
    };

    submitMaterialOption = () => {
        if (!this.materialOptions) {
            return;
        }

        this.materialOptions.push(this.currentMaterialOption);

        this.currentMaterialOption = MaterialOption.create();
    };

    removeMaterialOption = (option: MaterialOptionType) => {
        this.materialContractor = this.materialContractor
            .filter(({ id }) => id !== option.id);
    };

    editMaterialOption = (option: MaterialOptionType) => {
        this.currentMaterialOption = clone(option);

        this.removeMaterialOption(option);
    };

    submitContractorOptions = () => {
        (async () => {
            if (!this.materialItem) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const options = await restQuery.project
                .submitMaterialOptions(
                    this.materialItem?.currentTask.materialUserTaskId,
                    this.materialContractor,
                );

            if (!options) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                if (!this.materialItem) {
                    this.isLoading = false;
                    return;
                }

                this.parentVm.openContractorForClientModal(
                    this.materialItem.materialWorkflowSequenceId,
                    true,
                );

                this.isLoading = false;
            });
        })();
    };

    selectOption = (option: MaterialOptionType) => {
        this.materialItem?.contractorSubmittedOptions?.forEach(item => item.deselectOption());
        option.selectOption();
    };

    switchComments = (item: MaterialOptionType) => {
        if (item.isCommentsOpened) {
            item.disableComments();
            return;
        }

        if (this.currentRole === E.RoleInCompany.contractor) {
            this.materialItem?.contractorSubmittedOptions?.forEach(option => option.disableComments());
            item.switchComments();
            return;
        }

        this.materialItem?.contractorSubmittedOptions?.forEach(option => option.disableComments());
        item.switchComments();
    };

    addComment = (item: MaterialOptionType) => {
        (async () => {
            if (!item.externalId || this.isLoading || !item.currentComment.description) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const { description, attachments } = item.currentComment;

            const res = await restQuery.project
                .postTaskUpdateComment(item.externalId, description, attachments);

            if (!res) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                item.addComment(res);
                this.isLoading = true;
            });
        })();
    };

    switchPurchaseConfirmed = () => {
        this.isPurchaseConfirmed = !this.isPurchaseConfirmed;
    };

    switchPreviousCollapsed = () => {
        this.isPreviousCollapsed = !this.isPreviousCollapsed;
    };

    setRejectMessage = (message: string) => {
        this.rejectMessage = message;
    };

    setIsRejecting = (value: boolean) => {
        this.isRejecting = value;
    };

    submitRejection = () => {
        (async () => {
            if (!this.materialItem || this.isLoading) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const options = await restQuery
                .submitMaterialSubmission(
                    this.materialItem?.currentTask.materialUserTaskId,
                    false,
                    this.rejectMessage,
                );

            if (!options) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                this.parentVm.setMaterialForClient(options);
                this.isLoading = false;
            });
        })();
    };

    submitSelectedOption = () => {
        (async () => {
            const selectedOption = this.materialItem?.contractorSubmittedOptions?.find(option => option.isSelected)?.externalId;
            const taskId = this.materialItem?.currentTask.materialUserTaskId;

            if (!selectedOption || !taskId) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const res = await restQuery.project.submitSelectedOption(taskId, selectedOption);

            if (!res) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                this.parentVm.setMaterialForClient(res);
                this.isLoading = false;
            });
        })();
    };
}
