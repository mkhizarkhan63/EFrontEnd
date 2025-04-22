import { types, type Instance } from 'mobx-state-tree';
import { stores } from '~/stores';
import { E, MstType } from '~/api';

export type PmBudgetType = Instance<typeof PmBudget>;
export type PmPaymentType = Instance<typeof Payment>;
export type PmMaterialPaymentType = Instance<typeof MaterialPayment>;

export const PaymentStatistic = types.model({
    remainingTaskCount: types.maybe(MstType.number),
    completedTaskCount: types.maybe(MstType.number),
    dueTaskCount: types.maybe(MstType.number),
    inDelayTaskCount: types.maybe(MstType.number),
});

export const Payment = types.model({
    dueDate: MstType.MaybeMoment,
    id: stores.idCollection.getIdentifier('payment'),
    projectBudgetId: MstType.number,
    stageOrder: MstType.number,
    siteVisitsCount: MstType.number,
    userTaskId: MstType.number,
    stageName: MstType.string,
    stageNameAr: MstType.string,
    amount: MstType.number,
    taskStatus: types.enumeration<E.TaskStatus>(
        'TaskStatus', Object.values(E.TaskStatus),
    ),
    consultantPaymentDate: MstType.MaybeMoment,
    consultantPaymentStatus: types.enumeration<E.TaskStatus>(
        'TaskStatus', Object.values(E.TaskStatus),
    ),
    paymentType: types.enumeration<E.PaymentType>(
        'PaymentType', Object.values(E.PaymentType),
    ),
    order: MstType.number,
    isConfirmed: MstType.boolean,
    forMonth: MstType.number,
    forYear: MstType.number,
}).views(self => ({
    get paymentStatusForConsultant() {
        if (self.taskStatus !== E.TaskStatus.completed) {
            return self.taskStatus;
        }

        if (self.isConfirmed) {
            return self.taskStatus;
        }

        return stores.profile.currentProfile.role === E.RoleInCompany.client
            ? self.taskStatus
            : E.TaskStatus.due;
    },

    get isClientContext() {
        return stores.profile.currentProfile.role === E.RoleInCompany.client;
    },
})).views(self => ({
    get isActionable() {
        const { taskStatus, isConfirmed, isClientContext } = self;

        const isCompleted = taskStatus === E.TaskStatus.completed;

        if (!isCompleted && isClientContext) {
            return true;
        }

        if (!isClientContext && isCompleted && !isConfirmed) {
            return true;
        }

        return false;
    },
})).actions(self => ({
    setStatusToCompleted: () => {
        self.taskStatus = E.TaskStatus.completed;
    },

    setIsConfirmed: () => {
        self.isConfirmed = true;
    },
}));

export const MaterialPayment = types.model({
    id: stores.idCollection.getIdentifier('materialPayment'),
    name: MstType.string,
    supplierName: MstType.string,
    totalValue: MstType.number,
    taskStatus: types.enumeration<E.TaskStatus>(
        'TaskStatus', Object.values(E.TaskStatus),
    ),
    materialWorkflowId: MstType.number,
    subContractorMaterialStatus: types.enumeration<E.SubContractorMaterialStatus>(
        'SubContractorMaterialStatus', Object.values(E.SubContractorMaterialStatus),
    ),
    materialType: types.enumeration<E.MaterialType>(
        'MaterialType', Object.values(E.MaterialType),
    ),
    projectBudgetId: MstType.number,
    userTaskId: MstType.number,
    stageOrder: MstType.number,
    order: MstType.number,
}).actions(self => ({
    updateStatus: (status: E.TaskStatus) => {
        self.taskStatus = status;
    },

    updateTotalValue: (value?: number) => {
        if (typeof value === 'undefined') {
            return;
        }

        self.totalValue = value;
    },
}));

export const PmBudget = types.model({
    id: MstType.number,
    totalConsultantPayment: MstType.number,
    consultantTotalSpent: MstType.number,
    totalContractorPayment: MstType.number,
    contractorTotalSpent: MstType.number,
    totalClientMaterialsPayment: MstType.number,
    clientMaterialsTotalSpent: MstType.number,
    totalProjectBudget: MstType.number,
    totalContractValue: MstType.number,
    totalSpent: MstType.number,
    consultantPricePerVisit: MstType.number,
    consultantStatistics: types.maybe(PaymentStatistic),
    contractorStatistics: types.maybe(PaymentStatistic),
    consultantPayments: types.maybe(types.array(Payment)),
    contractorPayments: types.maybe(types.array(Payment)),
    clientMaterials: types.maybe(types.array(MaterialPayment)),
}).views(self => ({
    get remainingBudget() {
        return self.totalClientMaterialsPayment - self.totalSpent;
    },

    get totalConsultantVisits() {
        return self.consultantPayments
            ?.reduce((sum, item) => sum + (item.siteVisitsCount ?? 0), 0) ?? 0;
    },

    get clientPaymentProgress() {
        const completedCount = self.clientMaterials
            ?.filter(item => item.taskStatus === E.TaskStatus.completed)
            .length ?? 0;

        const dueCount = self.clientMaterials
            ?.filter(item => item.taskStatus === E.TaskStatus.due)
            .length ?? 0;

        const delayCount = self.clientMaterials
            ?.filter(item => item.taskStatus === E.TaskStatus.inDelay)
            .length ?? 0;

        const completedPercentage = completedCount / (self.clientMaterials ?? []).length * 100;
        const duePercentage = dueCount / (self.clientMaterials ?? []).length * 100;
        const delayPercentage = delayCount / (self.clientMaterials ?? []).length * 100;

        return [
            { color: 'green' as const, value: completedPercentage },
            { color: 'orange' as const, value: duePercentage },
            { color: 'red' as const, value: delayPercentage },
        ];
    },

    get contractorRemaining() {
        return self.totalContractorPayment - self.contractorTotalSpent;
    },

    get consultantRemaining() {
        return self.totalContractorPayment + self.totalConsultantPayment - (self.contractorTotalSpent + self.consultantTotalSpent);
    },
})).views(self => ({
    get clientPaymentDetails() {
        return [
            self.contractorTotalSpent,
            self.clientMaterialsTotalSpent,
            self.consultantTotalSpent,
            self.remainingBudget,
        ];
    },

    get contractorPaymentDetails() {
        return [
            self.contractorTotalSpent,
            self.contractorRemaining,
        ];
    },

    get consultantPaymentDetails() {
        return [
            self.contractorTotalSpent,
            self.consultantTotalSpent,
            self.consultantRemaining,
        ];
    },
})).actions(self => ({
    getPaymentDetailsLegend: (context: E.RoleInCompany) => {
        if (context === E.RoleInCompany.client) {
            return [
                self.totalSpent,
                self.remainingBudget,
            ];
        }

        if (context === E.RoleInCompany.contractor) {
            return [
                self.contractorTotalSpent,
                self.contractorRemaining,
            ];
        }

        return [
            self.contractorTotalSpent + self.consultantTotalSpent,
            self.consultantRemaining,
        ];
    },

    getBudgetDataset: (context: E.RoleInCompany) => {
        if (context === E.RoleInCompany.contractor) {
            return [
                {
                    data: self.contractorPaymentDetails,
                    backgroundColor: [
                        '#1E428A',
                        '#E3E6F0',
                    ],
                    label: 'Dataset 1',
                },
            ];
        }

        if (context === E.RoleInCompany.consultant) {
            return [
                {
                    data: self.consultantPaymentDetails,
                    backgroundColor: [
                        '#1E428A',
                        '#E0A801',
                        '#E3E6F0',
                    ],
                    label: 'Dataset 1',
                },
            ];
        }

        return [
            {
                data: self.clientPaymentDetails,
                backgroundColor: [
                    '#2D4388',
                    '#7DD75A',
                    '#D1A827',
                    '#E3E6F0',
                ],
                label: 'Dataset 1',
            },
        ];
    },

    setTotalSpent: (value: number) => {
        self.totalSpent += value;
    },

    setClientMaterialsTotalSpent: (value: number) => {
        self.clientMaterialsTotalSpent += value;
    },

    setTotalBudget(newClientPayments: number) {
        const clientBudgetDifference = newClientPayments - self.totalClientMaterialsPayment;

        self.totalProjectBudget += clientBudgetDifference;
        self.totalClientMaterialsPayment = newClientPayments;
    },

    getPaymentProgress(type: 'contractor' | 'consultant') {
        const tasks = type === 'contractor' ? self.contractorPayments : self.consultantPayments;

        const completedCount = tasks
            ?.filter(item => item.taskStatus === E.TaskStatus.completed)
            .length ?? 0;

        const dueCount = tasks
            ?.filter(item => item.taskStatus === E.TaskStatus.due)
            .length ?? 0;

        const delayCount = tasks
            ?.filter(item => item.taskStatus === E.TaskStatus.inDelay)
            .length ?? 0;

        const completedPercentage = completedCount / (tasks ?? []).length * 100;
        const duePercentage = dueCount / (tasks ?? []).length * 100;
        const delayPercentage = delayCount / (tasks ?? []).length * 100;

        return [
            { color: 'green' as const, value: completedPercentage },
            { color: 'orange' as const, value: duePercentage },
            { color: 'red' as const, value: delayPercentage },
        ];
    },
}));
