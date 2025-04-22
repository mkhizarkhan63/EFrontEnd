import * as T from 'superstruct';
import { restClient } from '~/api';

const tSpecialOptional = <T, S>(struct: T.Struct<T, S>): T.Struct<T | undefined, S> => new T.Struct({
    ...struct,
    coercer: (value, ctx) => struct.coercer(value === null ? undefined : value, ctx),
    validator: (value, ctx) =>
        value === undefined || struct.validator(value, ctx),
    refiner: (value, ctx) =>
        value === undefined || struct.refiner(value, ctx),
});

const voidStruct = T.unknown;

const ObjectStruct = () => T.type({});

const BlobStruct = () => T.instance(Blob);

export type UserTaskDto = {
    id: number;
    order: number;
    isActive: boolean;
    isCompleted: boolean;
    startDate?: string;
    completionDate?: string;
    dueDate?: string;
    status: TaskStatus;
    actorId?: number;
    projectBidStageUnitId: number;
    actorType: ActorType;
    actionType: ActionType;
    name: string;
    description?: string;
    createdDate: string;
    defaultTaskTime: string;
    stageOrder?: number;
};

export const UserTaskDtoStruct = (): T.Describe<UserTaskDto> => (T.type({
    id: T.number(),
    order: T.number(),
    isActive: T.boolean(),
    isCompleted: T.boolean(),
    startDate: tSpecialOptional(T.string()),
    completionDate: tSpecialOptional(T.string()),
    dueDate: tSpecialOptional(T.string()),
    status: TaskStatusStruct(),
    actorId: tSpecialOptional(T.number()),
    projectBidStageUnitId: T.number(),
    actorType: ActorTypeStruct(),
    actionType: ActionTypeStruct(),
    name: T.string(),
    description: tSpecialOptional(T.string()),
    createdDate: T.string(),
    defaultTaskTime: T.string(),
    stageOrder: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UserTaskDto>);

export type WorkflowSequenceDto = {
    id: number;
    order: number;
    userTasks: UserTaskDto[];
    name: string;
    description?: string;
    sowItemName: string;
    sowItemId: number;
    rate?: number;
    supplier?: string;
    stageOrder?: number;
};

export const WorkflowSequenceDtoStruct = (): T.Describe<WorkflowSequenceDto> => (T.type({
    id: T.number(),
    order: T.number(),
    userTasks: T.array(UserTaskDtoStruct()),
    name: T.string(),
    description: tSpecialOptional(T.string()),
    sowItemName: T.string(),
    sowItemId: T.number(),
    rate: tSpecialOptional(T.number()),
    supplier: tSpecialOptional(T.string()),
    stageOrder: tSpecialOptional(T.number()),
}) as unknown as T.Describe<WorkflowSequenceDto>);

export type StageDto = {
    id: number;
    order: number;
    isActive: boolean;
    status: StageStatus;
    isCompleted: boolean;
    startDate?: string;
    completionDate?: string;
    weight: number;
    name: string;
    description?: string;
    workflowSequences: WorkflowSequenceDto[];
    baselineStartDate?: string;
    baselineFinishDate?: string;
    projectBidStageUnitId?: number;
    stageOrder?: number;
};

export const StageDtoStruct = (): T.Describe<StageDto> => (T.type({
    id: T.number(),
    order: T.number(),
    isActive: T.boolean(),
    status: StageStatusStruct(),
    isCompleted: T.boolean(),
    startDate: tSpecialOptional(T.string()),
    completionDate: tSpecialOptional(T.string()),
    weight: T.number(),
    name: T.string(),
    description: tSpecialOptional(T.string()),
    workflowSequences: T.array(WorkflowSequenceDtoStruct()),
    baselineStartDate: tSpecialOptional(T.string()),
    baselineFinishDate: tSpecialOptional(T.string()),
    projectBidStageUnitId: tSpecialOptional(T.number()),
    stageOrder: tSpecialOptional(T.number()),
}) as unknown as T.Describe<StageDto>);

export type PhaseDto = {
    id: number;
    stages: StageDto[];
    phaseType: PhaseType;
    isActive: boolean;
    isCompleted: boolean;
    startDate?: string;
    completionDate?: string;
    order: number;
    baselineStartDate: string;
    baselineFinishDate: string;
    stageOrder?: number;
};

export const PhaseDtoStruct = (): T.Describe<PhaseDto> => (T.type({
    id: T.number(),
    stages: T.array(StageDtoStruct()),
    phaseType: PhaseTypeStruct(),
    isActive: T.boolean(),
    isCompleted: T.boolean(),
    startDate: tSpecialOptional(T.string()),
    completionDate: tSpecialOptional(T.string()),
    order: T.number(),
    baselineStartDate: T.string(),
    baselineFinishDate: T.string(),
    stageOrder: tSpecialOptional(T.number()),
}) as unknown as T.Describe<PhaseDto>);

export type ProjectDto = {
    id: number;
    phases?: PhaseDto[];
    startDate?: string;
    estimatedFinishDate?: string;
    contractorId?: number;
    consultantId?: number;
    supplierId?: number;
    clientId?: number;
    baselineStartDate?: string;
    baselineFinishDate?: string;
};

export const ProjectDtoStruct = (): T.Describe<ProjectDto> => (T.type({
    id: T.number(),
    phases: tSpecialOptional(T.array(PhaseDtoStruct())),
    startDate: tSpecialOptional(T.string()),
    estimatedFinishDate: tSpecialOptional(T.string()),
    contractorId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
    supplierId: tSpecialOptional(T.number()),
    clientId: tSpecialOptional(T.number()),
    baselineStartDate: tSpecialOptional(T.string()),
    baselineFinishDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ProjectDto>);

export type PaymentStatisticsDto = {
    remainingTaskCount?: number;
    completedTaskCount?: number;
    dueTaskCount?: number;
    inDelayTaskCount?: number;
};

export const PaymentStatisticsDtoStruct = (): T.Describe<PaymentStatisticsDto> => (T.type({
    remainingTaskCount: tSpecialOptional(T.number()),
    completedTaskCount: tSpecialOptional(T.number()),
    dueTaskCount: tSpecialOptional(T.number()),
    inDelayTaskCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<PaymentStatisticsDto>);

export type PaymentDto = {
    dueDate?: string;
    id: number;
    projectBudgetId?: number;
    stageOrder?: number;
    siteVisitsCount?: number;
    userTaskId?: number;
    stageName?: string;
    stageNameAr?: string;
    amount?: number;
    taskStatus?: TaskStatus;
    consultantPaymentDate?: string;
    consultantPaymentStatus?: TaskStatus;
    paymentType?: PaymentType;
    isConfirmed?: boolean;
    forMonth?: number;
    forYear?: number;
    order?: number;
};

export const PaymentDtoStruct = (): T.Describe<PaymentDto> => (T.type({
    dueDate: tSpecialOptional(T.string()),
    id: T.number(),
    projectBudgetId: tSpecialOptional(T.number()),
    stageOrder: tSpecialOptional(T.number()),
    siteVisitsCount: tSpecialOptional(T.number()),
    userTaskId: tSpecialOptional(T.number()),
    stageName: tSpecialOptional(T.string()),
    stageNameAr: tSpecialOptional(T.string()),
    amount: tSpecialOptional(T.number()),
    taskStatus: tSpecialOptional(TaskStatusStruct()),
    consultantPaymentDate: tSpecialOptional(T.string()),
    consultantPaymentStatus: tSpecialOptional(TaskStatusStruct()),
    paymentType: tSpecialOptional(PaymentTypeStruct()),
    isConfirmed: tSpecialOptional(T.boolean()),
    forMonth: tSpecialOptional(T.number()),
    forYear: tSpecialOptional(T.number()),
    order: tSpecialOptional(T.number()),
}) as unknown as T.Describe<PaymentDto>);

export type MaterialPaymentDto = {
    name?: string;
    supplierName?: string;
    totalValue?: number;
    taskStatus?: TaskStatus;
    subContractorMaterialStatus?: SubContractorMaterialStatus;
    materialType?: MaterialType;
    projectBudgetId?: number;
    id: number;
    userTaskId?: number;
    workflowMaterialSequenceId?: number;
    stageOrder?: number;
    order?: number;
};

export const MaterialPaymentDtoStruct = (): T.Describe<MaterialPaymentDto> => (T.type({
    name: tSpecialOptional(T.string()),
    supplierName: tSpecialOptional(T.string()),
    totalValue: tSpecialOptional(T.number()),
    taskStatus: tSpecialOptional(TaskStatusStruct()),
    subContractorMaterialStatus: tSpecialOptional(SubContractorMaterialStatusStruct()),
    materialType: tSpecialOptional(MaterialTypeStruct()),
    projectBudgetId: tSpecialOptional(T.number()),
    id: T.number(),
    userTaskId: tSpecialOptional(T.number()),
    workflowMaterialSequenceId: tSpecialOptional(T.number()),
    stageOrder: tSpecialOptional(T.number()),
    order: tSpecialOptional(T.number()),
}) as unknown as T.Describe<MaterialPaymentDto>);

export type ProjectBudgetDto = {
    contractorStatistics?: PaymentStatisticsDto;
    consultantStatistics?: PaymentStatisticsDto;
    id: number;
    projectId: number;
    clientId: number;
    consultantId: number;
    contractorId: number;
    totalConsultantPayment?: number;
    consultantTotalSpent?: number;
    totalContractorPayment: number;
    contractorTotalSpent: number;
    totalClientMaterialsPayment?: number;
    clientMaterialsTotalSpent?: number;
    totalProjectBudget?: number;
    totalContractValue: number;
    totalSpent?: number;
    consultantPricePerVisit?: number;
    consultantPayments?: PaymentDto[];
    contractorPayments?: PaymentDto[];
    clientMaterials?: MaterialPaymentDto[];
};

export const ProjectBudgetDtoStruct = (): T.Describe<ProjectBudgetDto> => (T.type({
    contractorStatistics: tSpecialOptional(PaymentStatisticsDtoStruct()),
    consultantStatistics: tSpecialOptional(PaymentStatisticsDtoStruct()),
    id: T.number(),
    projectId: T.number(),
    clientId: T.number(),
    consultantId: T.number(),
    contractorId: T.number(),
    totalConsultantPayment: tSpecialOptional(T.number()),
    consultantTotalSpent: tSpecialOptional(T.number()),
    totalContractorPayment: T.number(),
    contractorTotalSpent: T.number(),
    totalClientMaterialsPayment: tSpecialOptional(T.number()),
    clientMaterialsTotalSpent: tSpecialOptional(T.number()),
    totalProjectBudget: tSpecialOptional(T.number()),
    totalContractValue: T.number(),
    totalSpent: tSpecialOptional(T.number()),
    consultantPricePerVisit: tSpecialOptional(T.number()),
    consultantPayments: tSpecialOptional(T.array(PaymentDtoStruct())),
    contractorPayments: tSpecialOptional(T.array(PaymentDtoStruct())),
    clientMaterials: tSpecialOptional(T.array(MaterialPaymentDtoStruct())),
}) as unknown as T.Describe<ProjectBudgetDto>);

export type ResponseError = {
    errorCode?: string;
    fieldName?: string;
    message?: string;
    meta?: unknown;
};

export const ResponseErrorStruct = (): T.Describe<ResponseError> => (T.type({
    errorCode: tSpecialOptional(T.string()),
    fieldName: tSpecialOptional(T.string()),
    message: tSpecialOptional(T.string()),
    meta: tSpecialOptional(T.unknown()),
}) as unknown as T.Describe<ResponseError>);

export type ResponseStatus = {
    errorCode?: string;
    message?: string;
    stackTrace?: string;
    errors?: ResponseError[];
    meta?: unknown;
};

export const ResponseStatusStruct = (): T.Describe<ResponseStatus> => (T.type({
    errorCode: tSpecialOptional(T.string()),
    message: tSpecialOptional(T.string()),
    stackTrace: tSpecialOptional(T.string()),
    errors: tSpecialOptional(T.array(ResponseErrorStruct())),
    meta: tSpecialOptional(T.unknown()),
}) as unknown as T.Describe<ResponseStatus>);

export type StageValueDto = {
    userTaskId?: number;
    stageValue?: number;
    taxPercentage?: number;
    taxValue?: number;
    grandTotal?: number;
};

export const StageValueDtoStruct = (): T.Describe<StageValueDto> => (T.type({
    userTaskId: tSpecialOptional(T.number()),
    stageValue: tSpecialOptional(T.number()),
    taxPercentage: tSpecialOptional(T.number()),
    taxValue: tSpecialOptional(T.number()),
    grandTotal: tSpecialOptional(T.number()),
}) as unknown as T.Describe<StageValueDto>);

export type GetProjectBudgetResponse = {
    result: ProjectBudgetDto;
};

export const GetProjectBudgetResponseStruct = (): T.Describe<GetProjectBudgetResponse> => (T.type({
    result: ProjectBudgetDtoStruct(),
}) as unknown as T.Describe<GetProjectBudgetResponse>);

export type UpdateBudgetMaterialsResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateBudgetMaterialsResponseStruct = (): T.Describe<UpdateBudgetMaterialsResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateBudgetMaterialsResponse>);

export type UpdateContractorTotalSpentResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorTotalSpentResponseStruct = (): T.Describe<UpdateContractorTotalSpentResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorTotalSpentResponse>);

export type UpdateConsultantPaymentResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantPaymentResponseStruct = (): T.Describe<UpdateConsultantPaymentResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantPaymentResponse>);

export type UpdateClientTotalSpentResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateClientTotalSpentResponseStruct = (): T.Describe<UpdateClientTotalSpentResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateClientTotalSpentResponse>);

export type GetStageValueResponse = {
    stagePayment?: StageValueDto;
};

export const GetStageValueResponseStruct = (): T.Describe<GetStageValueResponse> => (T.type({
    stagePayment: tSpecialOptional(StageValueDtoStruct()),
}) as unknown as T.Describe<GetStageValueResponse>);

export type AdminBudgetPricePerMonthResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const AdminBudgetPricePerMonthResponseStruct = (): T.Describe<AdminBudgetPricePerMonthResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<AdminBudgetPricePerMonthResponse>);

export type ChangeBudgetConsultantResponse = {
    isSuccess?: boolean;
};

export const ChangeBudgetConsultantResponseStruct = (): T.Describe<ChangeBudgetConsultantResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ChangeBudgetConsultantResponse>);

export type GetBidValueResponse = {
    result: number;
};

export const GetBidValueResponseStruct = (): T.Describe<GetBidValueResponse> => (T.type({
    result: T.number(),
}) as unknown as T.Describe<GetBidValueResponse>);

export type CreateProjectBudgetResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateProjectBudgetResponseStruct = (): T.Describe<CreateProjectBudgetResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateProjectBudgetResponse>);

export type GetProjectBudgetQuery = {
    projectId?: number;
};

export const GetProjectBudgetQueryStruct = (): T.Describe<GetProjectBudgetQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetProjectBudgetQuery>);

export type UpdateBudgetMaterialsCommand = {
    projectId?: number;
    totalClientMaterialsPayment?: number;
};

export const UpdateBudgetMaterialsCommandStruct = (): T.Describe<UpdateBudgetMaterialsCommand> => (T.type({
    projectId: tSpecialOptional(T.number()),
    totalClientMaterialsPayment: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateBudgetMaterialsCommand>);

export type UpdateContractorTotalSpentCommand = {
    userTaskId?: number;
    penaltySubtotal?: number;
};

export const UpdateContractorTotalSpentCommandStruct = (): T.Describe<UpdateContractorTotalSpentCommand> => (T.type({
    userTaskId: tSpecialOptional(T.number()),
    penaltySubtotal: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateContractorTotalSpentCommand>);

export type UpdateConsultantPaymentCommand = {
    constructionProjectId?: number;
    paymentAmount?: number;
};

export const UpdateConsultantPaymentCommandStruct = (): T.Describe<UpdateConsultantPaymentCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    paymentAmount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateConsultantPaymentCommand>);

export type UpdateClientTotalSpentCommand = {
    projectId?: number;
    newAmount?: number;
    oldAmount?: number;
};

export const UpdateClientTotalSpentCommandStruct = (): T.Describe<UpdateClientTotalSpentCommand> => (T.type({
    projectId: tSpecialOptional(T.number()),
    newAmount: tSpecialOptional(T.number()),
    oldAmount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateClientTotalSpentCommand>);

export type GetStageValueQuery = {
    userTaskId?: number;
};

export const GetStageValueQueryStruct = (): T.Describe<GetStageValueQuery> => (T.type({
    userTaskId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetStageValueQuery>);

export type AdminBudgetPricePerMonthCommand = {
    constructionProjectId?: number;
    pricePerMonth?: number;
};

export const AdminBudgetPricePerMonthCommandStruct = (): T.Describe<AdminBudgetPricePerMonthCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    pricePerMonth: tSpecialOptional(T.number()),
}) as unknown as T.Describe<AdminBudgetPricePerMonthCommand>);

export type ChangeBudgetConsultantCommand = {
    constructionProjectId?: number;
    consultantId?: number;
};

export const ChangeBudgetConsultantCommandStruct = (): T.Describe<ChangeBudgetConsultantCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ChangeBudgetConsultantCommand>);

export type GetBidValueQuery = {
    projectId?: number;
};

export const GetBidValueQueryStruct = (): T.Describe<GetBidValueQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetBidValueQuery>);

export type CreateProjectBudgetCommand = {
    constructionProjectId?: number;
    projectDto?: ProjectDto;
};

export const CreateProjectBudgetCommandStruct = (): T.Describe<CreateProjectBudgetCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    projectDto: tSpecialOptional(ProjectDtoStruct()),
}) as unknown as T.Describe<CreateProjectBudgetCommand>);

export enum StageStatus {
    upcoming = 0,
    currentStage = 1,
    inDelay = 2,
    completed = 3,
}

export const StageStatusStruct = () => T.enums([
    StageStatus.upcoming,
    StageStatus.currentStage,
    StageStatus.inDelay,
    StageStatus.completed,
]);

export enum TaskStatus {
    upcoming = 0,
    due = 1,
    inDelay = 2,
    completed = 3,
    pending = 4,
}

export const TaskStatusStruct = () => T.enums([
    TaskStatus.upcoming,
    TaskStatus.due,
    TaskStatus.inDelay,
    TaskStatus.completed,
    TaskStatus.pending,
]);

export enum ActorType {
    client = 0,
    contractor = 1,
    consultant = 2,
    supplier = 3,
    none = -1,
}

export const ActorTypeStruct = () => T.enums([
    ActorType.client,
    ActorType.contractor,
    ActorType.consultant,
    ActorType.supplier,
    ActorType.none,
]);

export enum ActionType {
    none = 0,
    empty = 1,
    datePicker = 2,
    checklist = 3,
    payment = 4,
}

export const ActionTypeStruct = () => T.enums([
    ActionType.none,
    ActionType.empty,
    ActionType.datePicker,
    ActionType.checklist,
    ActionType.payment,
]);

export enum PhaseType {
    none = 0,
    mobilization = 1,
    structure = 2,
    internalFinishes = 3,
    externalFinishes = 4,
    handover = 5,
}

export const PhaseTypeStruct = () => T.enums([
    PhaseType.none,
    PhaseType.mobilization,
    PhaseType.structure,
    PhaseType.internalFinishes,
    PhaseType.externalFinishes,
    PhaseType.handover,
]);

export enum PaymentType {
    none = 0,
    consultantPayment = 1,
    contractorPayment = 2,
}

export const PaymentTypeStruct = () => T.enums([
    PaymentType.none,
    PaymentType.consultantPayment,
    PaymentType.contractorPayment,
]);

export enum SubContractorMaterialStatus {
    none = 0,
    pending = 1,
    delay = 2,
    completed = 3,
}

export const SubContractorMaterialStatusStruct = () => T.enums([
    SubContractorMaterialStatus.none,
    SubContractorMaterialStatus.pending,
    SubContractorMaterialStatus.delay,
    SubContractorMaterialStatus.completed,
]);

export enum MaterialType {
    none = 0,
    clientSubContractorMaterials = 1,
    clientMaterialsForContractorInstallation = 2,
    contractorMaterialsForClientApproval = 3,
    contractorMaterials = 4,
}

export const MaterialTypeStruct = () => T.enums([
    MaterialType.none,
    MaterialType.clientSubContractorMaterials,
    MaterialType.clientMaterialsForContractorInstallation,
    MaterialType.contractorMaterialsForClientApproval,
    MaterialType.contractorMaterials,
]);

export const execGetProjectBudgetQuery = restClient.encloseQuery<GetProjectBudgetQuery, GetProjectBudgetResponse>(
  props => T.create(props, GetProjectBudgetQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/pm/getprojectbudgetquery',
    props,
  );
 },
 result => T.create(result, GetProjectBudgetResponseStruct()),
);

export const execUpdateBudgetMaterialsCommand = restClient.encloseQuery<UpdateBudgetMaterialsCommand, UpdateBudgetMaterialsResponse>(
  props => T.create(props, UpdateBudgetMaterialsCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/pm/updatebudgetmaterialscommand',
    props,
  );
 },
 result => T.create(result, UpdateBudgetMaterialsResponseStruct()),
);

export const execUpdateContractorTotalSpentCommand = restClient.encloseQuery<UpdateContractorTotalSpentCommand, UpdateContractorTotalSpentResponse>(
  props => T.create(props, UpdateContractorTotalSpentCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/pm/updatecontractortotalspentcommand',
    props,
  );
 },
 result => T.create(result, UpdateContractorTotalSpentResponseStruct()),
);

export const execUpdateConsultantPaymentCommand = restClient.encloseQuery<UpdateConsultantPaymentCommand, UpdateConsultantPaymentResponse>(
  props => T.create(props, UpdateConsultantPaymentCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/pm/updateconsultantpaymentcommand',
    props,
  );
 },
 result => T.create(result, UpdateConsultantPaymentResponseStruct()),
);

export const execUpdateClientTotalSpentCommand = restClient.encloseQuery<UpdateClientTotalSpentCommand, UpdateClientTotalSpentResponse>(
  props => T.create(props, UpdateClientTotalSpentCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/pm/updateclienttotalspentcommand',
    props,
  );
 },
 result => T.create(result, UpdateClientTotalSpentResponseStruct()),
);

export const execGetStageValueQuery = restClient.encloseQuery<GetStageValueQuery, GetStageValueResponse>(
  props => T.create(props, GetStageValueQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/pm/getstagevaluequery',
    props,
  );
 },
 result => T.create(result, GetStageValueResponseStruct()),
);

export const execAdminBudgetPricePerMonthCommand = restClient.encloseQuery<AdminBudgetPricePerMonthCommand, AdminBudgetPricePerMonthResponse>(
  props => T.create(props, AdminBudgetPricePerMonthCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/pm/adminbudgetpricepermonthcommand',
    props,
  );
 },
 result => T.create(result, AdminBudgetPricePerMonthResponseStruct()),
);

export const execChangeBudgetConsultantCommand = restClient.encloseQuery<ChangeBudgetConsultantCommand, ChangeBudgetConsultantResponse>(
  props => T.create(props, ChangeBudgetConsultantCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/pm/changebudgetconsultantcommand',
    props,
  );
 },
 result => T.create(result, ChangeBudgetConsultantResponseStruct()),
);

export const execGetBidValueQuery = restClient.encloseQuery<GetBidValueQuery, GetBidValueResponse>(
  props => T.create(props, GetBidValueQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/pm/getbidvaluequery',
    props,
  );
 },
 result => T.create(result, GetBidValueResponseStruct()),
);

export const execCreateProjectBudgetCommand = restClient.encloseQuery<CreateProjectBudgetCommand, CreateProjectBudgetResponse>(
  props => T.create(props, CreateProjectBudgetCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/pm/createprojectbudgetcommand',
    props,
  );
 },
 result => T.create(result, CreateProjectBudgetResponseStruct()),
);
