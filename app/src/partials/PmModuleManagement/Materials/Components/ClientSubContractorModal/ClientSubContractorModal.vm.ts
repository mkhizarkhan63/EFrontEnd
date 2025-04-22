import { action, runInAction } from 'mobx';
import { clone, getSnapshot } from 'mobx-state-tree';
import moment from 'moment';
import { E, ErrorListHolder, restQuery, T } from '~/api';
import {
    SubContractorLocal,
    type MaterialProgressType,
    type SubContractorLocalType,
    type TaskUpdateType,
} from '~/models';
import { deepReaction } from '~/utils';
import type { MaterialsVm } from '../../Materials.vm';
import { stores } from '~/stores';

type StructProps = 'updateExpense' | 'addExpense' | 'none';

const struct = (type: StructProps) => {
    switch (type) {
        case 'updateExpense':
            return T.type({
                totalPrice: T.min(T.number(), 10),
                subContractedName: T.name(),
                description: T.string(),
            });
        case 'addExpense':
            return T.type({
                totalPrice: T.min(T.number(), 10),
                subContractedMaterialName: T.name(),
                subContractedName: T.name(),
                description: T.string(),
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

    isRejectionModalOpened = false;

    rejectReason = '';

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(this.validationType),
    );

    constructor(readonly parentVm: MaterialsVm) {
        makeSafeObservable(this, {
            mount: false,
            closeExpensesModal: action,
            addExpense: false,
            updateExpense: false,
            updatePrivateExpense: false,
            addComment: false,
            switchComments: action,
            editPrivateExpense: action,
            submitCompletedWorks: action,
            openRejectionModal: action,
            closeRejectionModal: action,
            changeReason: action,
        });

        deepReaction(
            () => this.validationData,
            () => {
                this.validationPassed = this.errorListHolder.test();
            },
        );
    }

    get isContractor() {
        return stores.profile.currentProfile.role === E.RoleInCompany.contractor;
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
            };
        }

        if (this.isNewExpense) {
            return {
                totalPrice: this.newExpense.totalPrice,
                subContractedName: this.newExpense.subContractedName,
                subContractedMaterialName: this.newExpense.subContractedMaterialName,
                description: this.newExpense.description,
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

        return this.isNewExpense ? 'add' : 'update';
    }

    get isPrivateExpense() {
        if (!this.subContractor) {
            return false;
        }

        const { currentTask, isPrivate } = this.subContractor;

        return currentTask.isValidUserActor && isPrivate;
    }

    get taskUpdateFromSubbmision() {
        if (!this.subContractor) {
            return undefined;
        }

        const lastIndex = this.subContractor.submissions.length - 1;

        const taskUpdates = this.subContractor.submissions[lastIndex]?.taskUpdates;

        if (!taskUpdates) {
            return undefined;
        }

        return taskUpdates.find(item => item);
    }

    get totalValue() {
        if (!this.taskUpdateFromSubbmision) {
            return 0;
        }

        return this.taskUpdateFromSubbmision.totalPrice;
    }

    mount = async (previousId?: number) => {
        if (this.isLoading) {
            return;
        }

        const { currentSubContractor, isNewExpense, projectId } = this.parentVm;

        if (isNewExpense) {
            runInAction(() => {
                this.isNewExpense = true;
                this.newExpense = SubContractorLocal.create({ projectId });
                this.isOpenModal = true;
            });

            return;
        }

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
            previousId ?? currentSubContractor.currentTask.materialUserTaskId,
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
                const submissions = this.subContractor?.submissions;

                if (submissions && submissions.length > 0) {
                    const updates = submissions[submissions.length -1].taskUpdates;

                    if (updates) {
                        const attachments = updates[updates?.length -1]?.attachments;

                        this.newExpense = SubContractorLocal.create({
                            materialUserTaskId: this.subContractor?.currentTask?.materialUserTaskId,
                            projectId,
                            subContractedName: this.subContractor?.subContractorName,
                            totalPrice: updates[updates?.length -1]?.totalPrice,
                            description: updates[updates?.length -1]?.description,
                            attachments: attachments ? getSnapshot(updates[updates?.length -1]?.attachments) : undefined,
                        });

                        this.isLoading = false;
                        return;
                    }
                }

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
        this.parentVm.closeNewExpenceModal();
    };

    addExpense = () => {
        (async () => {
            if (!this.newExpense || this.isLoading) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const result = await restQuery.addExpense(this.newExpense);

            if (!result) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            const response = await restQuery.getMaterialProgress(
                result.materialWorkflowId,
                result.currentTask.materialUserTaskId,
            );

            if (!response) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            runInAction(() => {
                this.subContractor = response;
                this.parentVm.updateCurrentSubContractor(result);

                if (this.isActionable) {
                    this.newExpense = SubContractorLocal.create({
                        projectId: this.parentVm.projectId,
                    });

                    this.isLoading = false;
                    this.isNewExpense = false;

                    return;
                }

                this.newExpense = undefined;
                this.isLoading = false;
                this.isNewExpense = false;
            });
        })();
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
                this.parentVm?.currentSubContractor?.currentTask.updateStatusForClient(result.currentTask);
                this.parentVm?.currentSubContractor?.setSubContractorName(result?.subContractorName);

                this.subContractor = result;

                this.isNewExpense = false;
                this.isEditPrivateExpense = false;
                this.newExpense = undefined;
                this.isLoading = false;
            });
        })();
    };

    submitCompletedWorks = (isApproved = true) => {
        (async () => {
            if (this.isLoading) {
                return;
            }

            runInAction(() => {
                this.isLoading = true;
            });

            const id = this.newExpense?.materialUserTaskId;

            if (!id) {
                return;
            }

            const result = await restQuery.submitCompletedWorks(id, isApproved, this.rejectReason);

            if (!result) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            this.isLoading = false;
            this.closeRejectionModal();
            this.mount(result.currentTask.materialUserTaskId);
            const task = this.parentVm.sorterSubContractor.values
                .find(item => item.currentTask.materialUserTaskId === this.newExpense?.materialUserTaskId);
            task?.currentTask.setStatus(isApproved ? E.TaskStatus.completed : E.TaskStatus.due);

            !isApproved && task?.currentTask.setDue();
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
                this.subContractor = result;
                this.parentVm?.currentSubContractor?.setSubContractorName(result.subContractorName);
                this.isNewExpense = false;
                this.newExpense = undefined;
                this.isEditPrivateExpense = false;
                this.isLoading = false;
            });
        })();
    };

    addComment = (item: TaskUpdateType) => {
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

    openRejectionModal = () => {
        this.isRejectionModalOpened = true;
    };

    closeRejectionModal = () => {
        this.rejectReason = '';
        this.isRejectionModalOpened = false;
    };

    changeReason = (value: string) => {
        this.rejectReason = value;
    };
}
