import { action, runInAction } from 'mobx';
import { E, Sorter, restQuery } from '~/api';
import type { PmStageProgressType } from '~/models';
import type { PmBudgetType, PmMaterialPaymentType, PmPaymentType } from '~/models/PmModels/PmBudget';
import { stores } from '~/stores';
import type { PmModuleVm } from '~/views/PmModule/PmModule.vm';

export class PaymentsVm {
    budget?: PmBudgetType;

    isLoading = false;

    contextRole = stores.profile.currentProfile.role;

    isStageViewModalOpened = false;

    currentStageForModal?: PmStageProgressType;

    currentSubContractor?: PmMaterialPaymentType;

    isSubContractorModalOpened = false;

    constructor(readonly parentVm?: PmModuleVm, budget?: PmBudgetType) {
        this.budget = budget;

        makeSafeObservable(this, {
            mount: false,
            openStageViewModal: action,
            closeStageViewModal: action,
            openTask: action,
            closeModal: action,
            openSubContractorModal: action,
            openConsultantPaymentTask: action,
            addValueToStatistic: action,
        });
    }

    sorterContractor = new Sorter(
        () => (this.budget?.contractorPayments ?? []) as PmPaymentType[],
        by => ({
            stageOrder: by.number('stageOrder'),
            amount: by.number('amount'),
            dueDate: by.date('dueDate'),
        }),
        'stageOrder',
    );

    sorterConsultant = new Sorter(
        () => (this.budget?.consultantPayments ?? []) as PmPaymentType[],
        by => ({
            month: by.date('dueDate'),
            siteVisits: by.number('siteVisitsCount'),
            totalPaid: by.number('amount'),
            dueDate: by.date('dueDate'),
        }),
        'month',
    );

    sorterClient = new Sorter(
        () => (this.budget?.clientMaterials ?? []) as PmMaterialPaymentType[],
        by => ({
            materials: by.string('name'),
            supplier: by.string('supplierName'),
            totalPrice: by.number('totalValue'),
        }),
        'materials',
    );

    get isClientSubContractorType() {
        if (!this.currentSubContractor) {
            return false;
        }

        return this.currentSubContractor.materialType === E.MaterialType.clientSubContractorMaterials;
    }

    get isClientForContractorInstallationType() {
        if (!this.currentSubContractor) {
            return false;
        }

        return this.currentSubContractor.materialType === E.MaterialType.clientMaterialsForContractorInstallation;
    }

    get projectId() {
        return this.parentVm?.project?.externalId;
    }

    get isContractorContext() {
        return this.contextRole === E.RoleInCompany.contractor;
    }

    get isConsultantContext() {
        return this.contextRole === E.RoleInCompany.consultant;
    }

    get isClientContext() {
        return this.contextRole === E.RoleInCompany.client;
    }

    mount = () => {
        (async () => {
            if (!this.parentVm?.shouldBudgetReload) {
                return;
            }

            await this.parentVm.loadBuget();

            runInAction(() => {
                if (!this.parentVm?.shouldBudgetReload) {
                    return;
                }

                this.parentVm.shouldBudgetReload = false;
            });
        })();
    };

    openStageViewModal = (stageOrder?: number) => {
        if (!stageOrder) {
            return;
        }

        const stageId = this.parentVm?.project?.stages
            .find(stage => stage.order === stageOrder)?.externalId;

        if (!stageId) {
            return;
        }

        (async () => {
            const res = await restQuery.project.getStageProgress(stageId);

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

    openTask = (taskId?: number) => {
        if (!taskId) {
            return;
        }

        const task = this.parentVm?.project?.allUserTask
            .find(item => item.externalId === taskId);

        if (!task) {
            return;
        }

        this.parentVm?.setUserTask(task);
    };

    closeModal = () => {
        this.isSubContractorModalOpened = false;
        this.currentSubContractor = undefined;
    };

    openSubContractorModal = (subContractor: PmMaterialPaymentType) => {
        this.currentSubContractor = subContractor;
        this.isSubContractorModalOpened = true;
    };

    openConsultantPaymentTask = (payment: PmPaymentType) => {
        this.parentVm?.setPayment(payment);
    };

    addValueToStatistic = (value?: number) => {
        if (!this.budget || !value) {
            return;
        }

        this.budget.setTotalSpent(value);
        this.budget.setClientMaterialsTotalSpent(value);
    };
}
