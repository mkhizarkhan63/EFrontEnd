import { action, runInAction } from 'mobx';
import { E, ErrorListHolder, T, lang, restQuery, utils } from '~/api';
import { TaskUpdate, type FileDataType, type TaskUpdateType } from '~/models';
import type { MaterialProgressType } from '~/models/PmModels/MaterialProgress';
import { deepReaction } from '~/utils';
import { type PaymentsVm } from '../../Payments.vm';

type StructProps = 'itemsToBuy' | 'purchaseDetails' | 'none';

const struct = (type: StructProps) => {
    switch (type) {
        case 'itemsToBuy':
            return T.type({
                itemsToBuy: T.nonempty(T.array()),
            });
        case 'purchaseDetails':
            return T.type({
                price: T.min(T.number(), 20),
                description: T.optional(T.string()),
            });
        case 'none':
            return T.type({});
    }
};

export class ClientForContractorModalVm {
    isLoading = false;

    isOpenModal = false;

    isConfirm = false;

    validationPassed = true;

    materialProgress?: MaterialProgressType;

    materialQuantity = TaskUpdate.create({});

    totalPrice = 0;

    purchaseDescription = '';

    purchaseAttachments: FileDataType[] = [];

    skipTaskId?: number;

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(this.validationType),
    );

    constructor(private parentVm: PaymentsVm) {
        makeSafeObservable(this, {
            mount: false,
            submit: false,
            addComment: false,
            close: action,
            setIsConfirm: action,
            addQuantity: action,
            editUpdate: action,
            removeUpdate: action,
            setTotalPrice: action,
            setPurchaseDescription: action,
            addPurchaseAttachment: action,
            removePurchaseAttachment: action,
            switchComments: action,
        });

        deepReaction(
            () => this.validationData,
            () => {
                this.validationPassed = this.errorListHolder.test();
            },
        );
    }

    get validationType() {
        if (this.isCanAddItems) {
            return 'itemsToBuy';
        }

        if (this.isCanAddPurchase) {
            return 'purchaseDetails';
        }

        return 'none';
    }

    get validationData() {
        if (this.isCanAddItems) {
            return {
                itemsToBuy: this.materialProgress?.localUpdates,
            };
        }

        if (this.isCanAddPurchase) {
            return {
                price: this.totalPrice,
                description: this.purchaseDescription,
            };
        }

        return {};
    }

    get isSubmitLocked() {
        return !(this.validationPassed && this.isConfirm);
    }

    get canUserMakeAction() {
        if (!this.materialProgress) {
            return false;
        }

        const {
            isActionable,
            isValidUserActor,
        } = this.materialProgress.currentTask;

        return isActionable && isValidUserActor;
    }

    get isCanAddItems() {
        if (!this.materialProgress) {
            return false;
        }

        const { materialUserTaskType } = this.materialProgress.currentTask;

        return this.canUserMakeAction && materialUserTaskType === E.MaterialUserTaskType.quantityRequest;
    }

    get isCanAddPurchase() {
        if (!this.materialProgress) {
            return false;
        }

        const { materialUserTaskType } = this.materialProgress.currentTask;

        return this.canUserMakeAction && materialUserTaskType === E.MaterialUserTaskType.purchase;
    }

    get canClientConfirm() {
        if (!this.materialProgress) {
            return false;
        }

        const { materialUserTaskType } = this.materialProgress.currentTask;

        return this.canUserMakeAction && materialUserTaskType === E.MaterialUserTaskType.delivery;
    }

    get canContractorConfirm() {
        if (!this.materialProgress) {
            return false;
        }

        const {
            materialUserTaskType,
            canBeSkipped,
            skipTaskObject,
        } = this.materialProgress.currentTask;

        const { delivery, onSite } = E.MaterialUserTaskType;

        const skipTask = Boolean(materialUserTaskType === delivery && canBeSkipped && skipTaskObject?.isValidUserActor);

        if (skipTask && skipTaskObject?.materialUserTaskId) {
            this.skipTaskId = skipTaskObject.materialUserTaskId;
        }

        const currentTask = Boolean(materialUserTaskType === onSite && this.canUserMakeAction);

        return skipTask || currentTask;
    }

    get canConfirmAction() {
        return this.canClientConfirm || this.canContractorConfirm;
    }

    get isDone() {
        if (!this.materialProgress) {
            return false;
        }

        return this.materialProgress.currentTask.status === E.TaskStatus.completed;
    }

    get currentQuantity() {
        return this.materialProgress?.currentMaterialQuantity ?? this.materialQuantity;
    }

    get isCurrentQuantityValid() {
        const { itemName, description, quantity } = this.currentQuantity;

        return Boolean(itemName && description && quantity);
    }

    get ratesType() {
        return [
            {
                value: E.RateType.no,
                name: lang.dict.get('no'),
            },
            {
                value: E.RateType.rm,
                name: lang.dict.get('rm'),
            },
            {
                value: E.RateType.squaredMeter,
                name: lang.dict.get('m2'),
            },
        ];
    }

    get canContractorReject() {
        if (!this.materialProgress) {
            return false;
        }

        return this.materialProgress.currentTask.canBeRejected;
    }

    get itemsRequestedByContractor() {
        if (!this.materialProgress) {
            return [];
        }

        return this.materialProgress.submissions
            .flatMap(({ materialSubmissionType, taskUpdates }) => {
                if (materialSubmissionType === E.MaterialSubmissionType.materialQuantitiesRequest) {
                    return taskUpdates as TaskUpdateType[];
                }

                return [];
            });
    }

    get clientPurchase() {
        if (!this.materialProgress) {
            return [];
        }

        return this.materialProgress.submissions
            .flatMap(({ materialSubmissionType, taskUpdates }) => {
                if (materialSubmissionType === E.MaterialSubmissionType.materialsPurchased) {
                    return taskUpdates as TaskUpdateType[];
                }

                return [];
            });
    }

    mount = async () => {
        if (this.isLoading) {
            return;
        }

        const { currentSubContractor } = this.parentVm;

        if (!currentSubContractor) {
            return;
        }

        runInAction(() => {
            this.isLoading = true;
        });

        const result = await restQuery.getMaterialProgress(
            currentSubContractor.materialWorkflowId,
        );

        if (!result) {
            runInAction(() => {
                this.isLoading = false;
            });
        }

        runInAction(() => {
            this.isOpenModal = true;
            this.materialProgress = result;
            this.isLoading = false;
        });
    };

    submit = (isApproved = true) => {
        (async () => {
            if (this.isLoading || !this.materialProgress) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            if (this.isCanAddItems) {
                const result = await restQuery
                    .addSubmitMaterialsRequests(this.materialProgress);

                if (!result) {
                    runInAction(() => {
                        this.isLoading = false;
                    });

                    return;
                }

                runInAction(() => {
                    this.isLoading = false;
                    this.isConfirm = false;

                    this.materialProgress = result;
                });

                return;
            }

            if (this.isCanAddPurchase) {
                const response = await restQuery.addSubmitPurchase(
                    this.materialProgress.currentTask.materialUserTaskId,
                    this.totalPrice,
                    this.purchaseDescription,
                    this.purchaseAttachments,
                );

                if (!response) {
                    runInAction(() => {
                        this.isLoading = false;
                    });

                    return;
                }

                runInAction(() => {
                    this.isLoading = false;
                    this.isConfirm = false;

                    if (response) {
                        this.parentVm?.currentSubContractor
                            ?.updateStatus(E.TaskStatus.completed);

                        this.materialProgress = response;
                    }
                });

                return;
            }

            if (this.canConfirmAction) {
                const materialUserTaskId = this.skipTaskId ?? this.materialProgress.currentTask.materialUserTaskId;

                const result = await restQuery.submitMaterialSubmission(
                    materialUserTaskId,
                    isApproved,
                );

                if (!result) {
                    runInAction(() => {
                        this.isLoading = false;
                    });

                    return;
                }

                runInAction(() => {
                    this.isLoading = false;
                    this.isConfirm = false;

                    if (result) {
                        this.materialProgress = result;
                    }
                });

                return;
            }

            runInAction(() => {
                this.isLoading = false;
            });
        })();
    };

    close = () => {
        this.parentVm?.closeModal();
        this.isOpenModal = false;
    };

    setIsConfirm = (value: boolean) => {
        this.isConfirm = value;
    };

    addQuantity = () => {
        if (!this.materialProgress) {
            return;
        }

        if (this.materialProgress.currentMaterialQuantity) {
            this.materialProgress.deselectQuantity();
            return;
        }

        this.materialProgress.addQuantity(this.materialQuantity);
        this.materialQuantity = TaskUpdate.create();
    };

    editUpdate = (item: TaskUpdateType) => {
        if (!this.materialProgress) {
            return;
        }

        this.materialProgress.selectQuantity(item);
    };

    removeUpdate = (item: TaskUpdateType) => {
        if (!this.materialProgress) {
            return;
        }

        this.materialProgress.removeQuantity(item);
    };

    setTotalPrice = (price: string) => {
        this.totalPrice = utils.fromInputNumber(price);
    };

    setPurchaseDescription = (description: string) => {
        this.purchaseDescription = description;
    };

    addPurchaseAttachment = (item: FileDataType) => {
        item.loadImg();
        this.purchaseAttachments.push(item);
    };

    removePurchaseAttachment = (item: FileDataType) => {
        this.purchaseAttachments = this.purchaseAttachments
            .filter(({ id }) => id !== item.id);
    };

    addComment = (item: TaskUpdateType) => {
        (async () => {
            if (this.isLoading || !item.externalId || !item.currentComment.description) {
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
                this.isLoading = false;
            });
        })();
    };

    switchComments = (item: TaskUpdateType) => {
        if (item.isCommentsOpened) {
            item.disableComments();
            return;
        }

        this.itemsRequestedByContractor.forEach(update => update.disableComments());
        item.switchComments();
    };
}
