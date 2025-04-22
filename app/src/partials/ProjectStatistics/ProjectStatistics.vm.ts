import { action, runInAction } from 'mobx';
import moment from 'moment';
import { restQuery, utils, type E } from '~/api';
import type { PmModuleVm } from '~/views/PmModule/PmModule.vm';

export class ProjectStatisticsVm {
    loading = false;

    isSaving = false;

    isClosed = false;

    statistic?: restQuery.project.PmProjectStatistic;

    completionPercentage = 0;

    completionDate = moment();

    budgetValue = 0;

    isBudgetEdited?: boolean;

    constructor(
        private parentVm: PmModuleVm,
        readonly type: E.ProjectStatisticsType,
    ) {
        makeSafeObservable(this, {
            switchIsClosed: action,
            setBudgetValue: action,
            editBudget: action,
            closeEditBudget: action,
            submitBudget: action,
        });
    }

    get context() {
        return this.parentVm.context;
    }

    switchIsClosed = () => {
        this.isClosed = !this.isClosed;
    };

    mount = () => {
        this.loadStatistics();
    };

    loadStatistics = async () => {
        if (this.loading || !this.parentVm.project) {
            return;
        }

        this.loading = true;

        const result = await restQuery.project
            .getPmProjectStatistics(this.parentVm.project.externalId);

        if (!result) {
            this.loading = false;
            return;
        }

        runInAction(() => {
            this.statistic = result;
        });

        this.loading = false;
    };

    setBudgetValue = (value: string) => {
        this.budgetValue = utils.fromInputNumber(value);
    };

    submitBudget = () => {
        (async () => {
            if (this.isSaving) {
                return;
            }

            this.isSaving = true;

            const projectId = this.parentVm.project?.externalId;

            const totalClientPayment = this.budgetValue;

            if (!projectId || !totalClientPayment) {
                this.isSaving = false;
                return;
            }

            const budget = await restQuery.project
                .updateProjectBudget(projectId, totalClientPayment);

            if (!budget) {
                this.isSaving = false;
                return;
            }

            const newTotalBudget = totalClientPayment;

            this.parentVm.setIsBudgetSpecified(true);
            this.parentVm.budget?.setTotalBudget(newTotalBudget);
            this.closeEditBudget();
            this.isSaving = false;
        })();
    };

    editBudget = () => {
        if (!this.parentVm.totalBudget) {
            return;
        }

        this.budgetValue = this.parentVm.totalBudget;
        this.isBudgetEdited = true;
    };

    closeEditBudget = () => {
        this.isBudgetEdited = false;
    };
}
