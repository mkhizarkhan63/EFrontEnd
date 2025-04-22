import { T, enums, type dtos } from '~/api';
import { MaterialPayment, Payment, PmBudget } from '~/models/PmModels/PmBudget';
import { stores } from '~/stores';

export const toInternalPmBudget = (budget: dtos.pm.ProjectBudgetDto) => PmBudget.create({
    id: budget.id,
    totalConsultantPayment: budget.totalConsultantPayment,
    consultantTotalSpent: budget.consultantTotalSpent,
    totalContractorPayment: budget.totalContractorPayment,
    contractorTotalSpent: budget.contractorTotalSpent,
    totalClientMaterialsPayment: budget.totalClientMaterialsPayment,
    clientMaterialsTotalSpent: budget.clientMaterialsTotalSpent,
    totalProjectBudget: budget.totalProjectBudget,
    totalContractValue: budget.totalContractValue,
    totalSpent: budget.totalSpent,
    consultantPricePerVisit: budget.consultantPricePerVisit,
    contractorStatistics: budget.contractorStatistics,
    consultantStatistics: budget.consultantStatistics,
    consultantPayments: toInternalPayments(budget.consultantPayments),
    contractorPayments: toInternalPayments(budget.contractorPayments),
    clientMaterials: toInternalMaterialPayments(budget.clientMaterials),
});

const toInternalPayments = (payments?: dtos.pm.PaymentDto[]) => {
    if (!payments || payments.length === 0) {
        return [];
    }

    return payments.map(item => Payment.create({
        id: stores.idCollection.getInternal('payment', item.id),
        dueDate: T.create(item.dueDate, T.MaybeTimestamp),
        projectBudgetId: item.projectBudgetId,
        stageOrder: item.stageOrder,
        siteVisitsCount: item.siteVisitsCount,
        userTaskId: item.userTaskId,
        stageName: item.stageName,
        stageNameAr: item.stageNameAr,
        amount: item.amount,
        taskStatus: T.create(
            item.taskStatus,
            enums.TaskStatus.castToInternal,
        ),
        consultantPaymentDate: T.create(item.consultantPaymentDate, T.MaybeTimestamp),
        consultantPaymentStatus: T.create(
            item.consultantPaymentStatus,
            enums.TaskStatus.castToInternal,
        ),
        paymentType: T.create(
            item.paymentType,
            enums.PaymentType.castToInternal,
        ),
        order: item.order,
        isConfirmed: item.isConfirmed,
        forMonth: item.forMonth,
        forYear: item.forYear,
    }));
};

const toInternalMaterialPayments = (payments?: dtos.pm.MaterialPaymentDto[]) => {
    if (!payments || payments.length === 0) {
        return [];
    }

    return payments.map(item => MaterialPayment.create({
        id: stores.idCollection.getInternal('materialPayment', item.id),
        name: item.name,
        supplierName: item.supplierName,
        totalValue: item.totalValue,
        taskStatus: T.create(
            item.taskStatus,
            enums.TaskStatus.castToInternal,
        ),
        subContractorMaterialStatus: T.create(item.subContractorMaterialStatus, enums.SubContractorMaterialStatus.castToInternal),
        materialType: T.create(item.materialType, enums.MaterialType.castToInternal),
        projectBudgetId: item.projectBudgetId,
        userTaskId: item.userTaskId,
        stageOrder: item.stageOrder,
        order: item.order,
        materialWorkflowId: item.workflowMaterialSequenceId,
    }));
};
