import { action, runInAction } from 'mobx';
import { clone } from 'mobx-state-tree';
import moment from 'moment';
import { E, ErrorListHolder, restQuery, T } from '~/api';
import {
    SubContractorLocal,
    type MaterialProgressType,
    type SubContractorLocalType,
    type TaskUpdateType,
} from '~/models';
import { deepReaction } from '~/utils';
import { type PaymentsVm } from '../../Payments.vm';
import { stores } from '~/stores';

type StructProps = 'updateExpense' | 'addExpense' | 'none';

const struct = (type: StructProps) => {
    switch (type) {
        case 'updateExpense':
            return T.type({
                totalPrice: T.min(T.number(), 10),
                subContractedName: T.name(),
                description: T.name(),
                attachments: T.nonempty(T.array()),
            });
        case 'addExpense':
            return T.type({
                totalPrice: T.min(T.number(), 10),
                subContractedMaterialName: T.name(),
                subContractedName: T.name(),
                description: T.name(),
                attachments: T.nonempty(T.array()),
            });
        case 'none':
            return T.type({});
    }
};

export class ClientSubContractorModalVm {
    isLoading = false;

    isOpenModal = false;

    isNewExpense = false;

    isEditPrivateExpense = false;

    validationPassed = false;

    subContractor?: MaterialProgressType;

    newExpense?: SubContractorLocalType;

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(this.validationType),
    );

    constructor(private parentVm: PaymentsVm) {
        makeSafeObservable(this, {
            mount: false,
            closeExpensesModal: action,
            updateExpense: false,
            updatePrivateExpense: false,
            addComment: false,
            switchComments: action,
            editPrivateExpense: action,
        });

        deepReaction(
            () => this.validationData,
            () => {
                this.validationPassed = this.errorListHolder.test();
            },
        );
    }

    get currentRole() {
        return stores.profile.currentProfile.role;
    }

    get validationType() {
        if (this.isActionable || this.isEditPrivateExpense) {
            return 'updateExpense';
        }

        if (this.isNewExpense) {
            return 'addExpense';
        }

        return 'none';
    }

    get validationData() {
        if (!this.newExpense) {
            return {};
        }

        if (this.isActionable) {
            return {
                totalPrice: this.newExpense.totalPrice,
                subContractedName: this.newExpense.subContractedName,
                description: this.newExpense.description,
                attachments: this.newExpense.attachments,
            };
        }

        if (this.isNewExpense) {
            return {
                totalPrice: this.newExpense.totalPrice,
                subContractedName: this.newExpense.subContractedName,
                subContractedMaterialName: this.newExpense.subContractedMaterialName,
                description: this.newExpense.description,
                attachments: this.newExpense.attachments,
            };
        }

        return {};
    }

    get isActionable() {
        if (!this.subContractor) {
            return false;
        }

        const { currentTask } = this.subContractor;

        return currentTask.isActionable && currentTask.isValidUserActor;
    }

    get daysLeft() {
        if (this.subContractor?.currentTask?.status === E.TaskStatus.completed) {
            return undefined;
        }

        return this.subContractor?.currentTask?.dueDate?.diff(moment(), 'days');
    }

    get actionType() {
        if (this.isEditPrivateExpense) {
            return 'updatePrivate';
        }

        return 'update';
    }

    get isPrivateExpense() {
        if (!this.subContractor) {
            return undefined;
        }

        const { currentTask, isPrivate } = this.subContractor;

        return currentTask.isValidUserActor && isPrivate;
    }

    get taskUpdateFromSubbmision() {
        if (!this.subContractor) {
            return undefined;
        }

        const taskUpdates = this.subContractor.submissions
            .find(item => item)?.taskUpdates;

        if (!taskUpdates) {
            return undefined;
        }

        return taskUpdates
            .find(item => item);
    }

    get totalValue() {
        if (!this.taskUpdateFromSubbmision) {
            return 0;
        }

        return this.taskUpdateFromSubbmision.totalPrice;
    }

    mount = async () => {
        if (this.isLoading) {
            return;
        }

        const { currentSubContractor, projectId } = this.parentVm;

        runInAction(() => {
            this.isLoading = true;
        });

        if (!currentSubContractor) {
            runInAction(() => {
                this.isLoading = false;
            });

            return;
        }

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
            this.subContractor = result;

            if (this.isActionable) {
                this.newExpense = SubContractorLocal.create({
                    materialUserTaskId: this.subContractor?.currentTask?.materialUserTaskId,
                    projectId });
            }

            this.isLoading = false;
        });
    };

    closeExpensesModal = () => {
        this.isEditPrivateExpense = false;
        this.isOpenModal = false;
        this.isNewExpense = false;
        this.newExpense = undefined;
        this.parentVm.closeModal();
    };

    updateExpense = () => {
        (async () => {
            if (!this.newExpense || this.isLoading) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const result = await restQuery.updateSubContractor(this.newExpense);

            if (!result) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                this.parentVm?.currentSubContractor
                    ?.updateStatus(result.currentTask.status);

                this.parentVm?.currentSubContractor
                    ?.updateTotalValue(this.newExpense?.totalPrice);

                this.parentVm?.addValueToStatistic(this.newExpense?.totalPrice);

                this.subContractor = result;

                this.isNewExpense = false;
                this.isEditPrivateExpense = false;
                this.newExpense = undefined;
                this.isLoading = false;
            });
        })();
    };

    updatePrivateExpense = () => {
        (async () => {
            if (!this.newExpense || this.isLoading) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const result = await restQuery.updatePrivateExpense(this.newExpense);

            if (!result) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                this.parentVm?.currentSubContractor
                    ?.updateStatus(result.currentTask.status);

                this.parentVm?.currentSubContractor
                    ?.updateTotalValue(this.newExpense?.totalPrice);

                this.parentVm?.addValueToStatistic(this.newExpense?.totalPrice);

                this.subContractor = result;
                this.isNewExpense = false;
                this.newExpense = undefined;
                this.isEditPrivateExpense = false;
                this.isLoading = false;
            });
        })();
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
                this.isLoading = false;
                item.addComment(res);
            });
        })();
    };

    switchComments = (item: TaskUpdateType) => {
        if (item.isCommentsOpened) {
            item.disableComments();
            return;
        }

        if (!this.subContractor) {
            return;
        }

        this.subContractor.submissions[0]?.taskUpdates?.[0]?.disableComments();
        item.switchComments();
    };

    editPrivateExpense = () => {
        if (!this.subContractor) {
            return;
        }

        this.newExpense = SubContractorLocal.create({
            materialUserTaskId: this.subContractor.currentTask.materialUserTaskId,
            totalPrice: this.taskUpdateFromSubbmision?.totalPrice,
            projectId: this.parentVm.projectId,
            subContractedName: this.subContractor?.subContractorName,
            subContractedMaterialName: this.subContractor?.subContractedMaterialName,
            description: this.taskUpdateFromSubbmision?.description,
            attachments: clone(this.taskUpdateFromSubbmision?.attachments),
        });
        this.isNewExpense = true;
        this.isEditPrivateExpense = true;
    };
}
