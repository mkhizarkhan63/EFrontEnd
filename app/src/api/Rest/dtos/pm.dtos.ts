// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2024-05-21 11:23:48
Version: 6.50
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://10.42.5.192:5000/

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/

// @ts-nocheck

export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IGet
{
}

export interface IPut
{
}

export interface IPost
{
}

export interface IHasProjectId
{
    projectId?: number;
}

export interface IHasTotalClientMaterialsPayment
{
    totalClientMaterialsPayment?: number;
}

export enum StageStatus
{
    Upcoming = 0,
    CurrentStage = 1,
    InDelay = 2,
    Completed = 3,
}

export enum TaskStatus
{
    Upcoming = 0,
    Due = 1,
    InDelay = 2,
    Completed = 3,
    Pending = 4,
}

export enum ActorType
{
    Client = 0,
    Contractor = 1,
    Consultant = 2,
    Supplier = 3,
    None = -1,
}

export enum ActionType
{
    None = 0,
    Empty = 1,
    DatePicker = 2,
    Checklist = 3,
    Payment = 4,
}

export class UserTaskDto implements IUserTask, IHasName, IHasDescriptionLite, IHasActor
{
    // @Required()
    public id: number;

    // @Required()
    public order: number;

    // @Required()
    public isActive: boolean;

    // @Required()
    public isCompleted: boolean;

    public startDate?: string;
    public completionDate?: string;
    public dueDate?: string;
    // @Required()
    public status: TaskStatus;

    public actorId?: number;
    // @Required()
    public projectBidStageUnitId: number;

    // @Required()
    public actorType: ActorType;

    // @Required()
    public actionType: ActionType;

    // @Required()
    public name: string;

    public description?: string;
    // @Required()
    public createdDate: string;

    // @Required()
    public defaultTaskTime: string;

    public constructor(init?: Partial<UserTaskDto>) { (Object as any).assign(this, init); }
}

export class WorkflowSequenceDto implements IHasId, IHasOrder, IHasName, IHasDescriptionLite, IHasRate, IHasSupplier
{
    // @Required()
    public id: number;

    // @Required()
    public order: number;

    // @Required()
    public userTasks: UserTaskDto[];

    // @Required()
    public name: string;

    public description?: string;
    // @Required()
    public sowItemName: string;

    // @Required()
    public sowItemId: number;

    public rate?: number;
    public supplier?: string;

    public constructor(init?: Partial<WorkflowSequenceDto>) { (Object as any).assign(this, init); }
}

export class StageDto implements IHasId, IHasOrder, IActivityEntity, IHasWeight, IHasName, IHasBaselineStartDate, IHasBaselineFinishDate
{
    // @Required()
    public id: number;

    // @Required()
    public order: number;

    // @Required()
    public isActive: boolean;

    // @Required()
    public status: StageStatus;

    // @Required()
    public isCompleted: boolean;

    public startDate?: string;
    public completionDate?: string;
    // @Required()
    public weight: number;

    // @Required()
    public name: string;

    public description?: string;
    // @Required()
    public workflowSequences: WorkflowSequenceDto[];

    public baselineStartDate?: string;
    public baselineFinishDate?: string;
    public projectBidStageUnitId?: number;

    public constructor(init?: Partial<StageDto>) { (Object as any).assign(this, init); }
}

export enum PhaseType
{
    None = 0,
    Mobilization = 1,
    Structure = 2,
    InternalFinishes = 3,
    ExternalFinishes = 4,
    Handover = 5,
}

export class PhaseDto implements IHasId, IActivityEntity, IHasOrder, IHasBaselineStartDate, IHasBaselineFinishDate
{
    // @Required()
    public id: number;

    // @Required()
    public stages: StageDto[];

    // @Required()
    public phaseType: PhaseType;

    // @Required()
    public isActive: boolean;

    // @Required()
    public isCompleted: boolean;

    public startDate?: string;
    public completionDate?: string;
    // @Required()
    public order: number;

    // @Required()
    public baselineStartDate: string;

    // @Required()
    public baselineFinishDate: string;

    public constructor(init?: Partial<PhaseDto>) { (Object as any).assign(this, init); }
}

export class ProjectDto implements IHasId, IHasStartDate, IHasInvolvedCompanies, IHasBaselineStartDate, IHasBaselineFinishDate
{
    public id: number;
    public phases?: PhaseDto[];
    public startDate?: string;
    public estimatedFinishDate?: string;
    public contractorId?: number;
    public consultantId?: number;
    public supplierId?: number;
    public clientId?: number;
    public baselineStartDate?: string;
    public baselineFinishDate?: string;

    public constructor(init?: Partial<ProjectDto>) { (Object as any).assign(this, init); }
}

export class PaymentStatisticsDto
{
    public remainingTaskCount?: number;
    public completedTaskCount?: number;
    public dueTaskCount?: number;
    public inDelayTaskCount?: number;

    public constructor(init?: Partial<PaymentStatisticsDto>) { (Object as any).assign(this, init); }
}

export enum PaymentType
{
    None = 0,
    ConsultantPayment = 1,
    ContractorPayment = 2,
}

export class PaymentDto implements IPaymentDto
{
    public dueDate?: string;
    public id: number;
    public projectBudgetId?: number;
    public stageOrder?: number;
    public siteVisitsCount?: number;
    public userTaskId?: number;
    public stageName?: string;
    public stageNameAr?: string;
    public amount?: number;
    public taskStatus?: TaskStatus;
    public consultantPaymentDate?: string;
    public consultantPaymentStatus?: TaskStatus;
    public paymentType?: PaymentType;
    public isConfirmed?: boolean;
    public forMonth?: number;
    public forYear?: number;

    public constructor(init?: Partial<PaymentDto>) { (Object as any).assign(this, init); }
}

export enum SubContractorMaterialStatus
{
    None = 0,
    Pending = 1,
    Delay = 2,
    Completed = 3,
}

export enum MaterialType
{
    None = 0,
    ClientSubContractorMaterials = 1,
    ClientMaterialsForContractorInstallation = 2,
    ContractorMaterialsForClientApproval = 3,
    ContractorMaterials = 4,
}

export class MaterialPaymentDto implements IMaterialPayment
{
    public name?: string;
    public supplierName?: string;
    public totalValue?: number;
    public taskStatus?: TaskStatus;
    public subContractorMaterialStatus?: SubContractorMaterialStatus;
    public materialType?: MaterialType;
    public projectBudgetId?: number;
    public id: number;
    public userTaskId?: number;
    public workflowMaterialSequenceId?: number;
    public stageOrder?: number;

    public constructor(init?: Partial<MaterialPaymentDto>) { (Object as any).assign(this, init); }
}

export class ProjectBudgetDto implements IProjectBudgetDto
{
    public contractorStatistics?: PaymentStatisticsDto;
    public consultantStatistics?: PaymentStatisticsDto;
    public id: number;
    // @Required()
    public projectId: number;

    // @Required()
    public clientId: number;

    // @Required()
    public consultantId: number;

    // @Required()
    public contractorId: number;

    public totalConsultantPayment?: number;
    public consultantTotalSpent?: number;
    // @Required()
    public totalContractorPayment: number;

    // @Required()
    public contractorTotalSpent: number;

    public totalClientMaterialsPayment?: number;
    public clientMaterialsTotalSpent?: number;
    public totalProjectBudget?: number;
    // @Required()
    public totalContractValue: number;

    public totalSpent?: number;
    public consultantPricePerVisit?: number;
    public consultantPayments?: PaymentDto[];
    public contractorPayments?: PaymentDto[];
    public clientMaterials?: MaterialPaymentDto[];

    public constructor(init?: Partial<ProjectBudgetDto>) { (Object as any).assign(this, init); }
}

export class BaseSingleResponse<T>
{
    public result: T;

    public constructor(init?: Partial<BaseSingleResponse<T>>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode?: string;

    // @DataMember(Order=2)
    public fieldName?: string;

    // @DataMember(Order=3)
    public message?: string;

    // @DataMember(Order=4)
    public meta?: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode?: string;

    // @DataMember(Order=2)
    public message?: string;

    // @DataMember(Order=3)
    public stackTrace?: string;

    // @DataMember(Order=4)
    public errors?: ResponseError[];

    // @DataMember(Order=5)
    public meta?: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export class OperationResult
{
    public code: string;
    public responseStatus: ResponseStatus;
    public isSuccess?: boolean;

    public constructor(init?: Partial<OperationResult>) { (Object as any).assign(this, init); }
}

export class StageValueDto
{
    public userTaskId?: number;
    public stageValue?: number;
    public taxPercentage?: number;
    public taxValue?: number;
    public grandTotal?: number;

    public constructor(init?: Partial<StageValueDto>) { (Object as any).assign(this, init); }
}

export class BasePutOperationResult<T> extends OperationResult
{
    public id: T;

    public constructor(init?: Partial<BasePutOperationResult<T>>) { super(init); (Object as any).assign(this, init); }
}

export class PutOperationResult extends BasePutOperationResult<number>
{

    public constructor(init?: Partial<PutOperationResult>) { super(init); (Object as any).assign(this, init); }
}

export interface IHasId
{
    id: number;
}

export interface IHasStartDate
{
    startDate?: string;
}

export interface IHasInvolvedCompanies
{
    contractorId?: number;
    consultantId?: number;
    supplierId?: number;
    clientId?: number;
}

export interface IHasBaselineStartDate
{
    baselineStartDate?: string;
}

export interface IHasBaselineFinishDate
{
    baselineFinishDate?: string;
}

export interface IProjectBudgetDto extends IHasId, IHasProjectId, IHasActorsId, IHasConsultantTotalPayment, IHasContractorTotalPayment, IHasClientMaterialBudget, IHasTotalBudget, IHasConsultantPricePerVisit, IHasConsultantPayments, IHasContractorPayments, IHasClientMaterials
{
}

export interface IHasId
{
    id: number;
}

export interface IHasActorsId extends IHasConsultantId, IHasContractorId, IHasClientId
{
}

export interface IHasConsultantId
{
    consultantId?: number;
}

export interface IHasContractorId
{
    contractorId?: number;
}

export interface IHasClientId
{
    clientId?: number;
}

export interface IHasConsultantTotalPayment
{
    totalConsultantPayment?: number;
    consultantTotalSpent?: number;
}

export interface IHasContractorTotalPayment
{
    totalContractorPayment?: number;
    contractorTotalSpent?: number;
}

export interface IHasClientMaterialBudget extends IHasTotalClientMaterialsPayment
{
    clientMaterialsTotalSpent?: number;
}

export interface IHasTotalBudget
{
    totalProjectBudget?: number;
    totalContractValue?: number;
    totalSpent?: number;
}

export interface IHasConsultantPricePerVisit
{
    consultantPricePerVisit?: number;
}

export interface IHasConsultantPayments
{
    consultantPayments?: PaymentDto[];
}

export interface IHasContractorPayments
{
    contractorPayments?: PaymentDto[];
}

export interface IHasClientMaterials
{
    clientMaterials?: MaterialPaymentDto[];
}

export interface IActivityEntity extends IHasActivityState, IHasCompletedState, IHasStartDate, IHasCompletionDate
{
}

export interface IHasActivityState
{
    isActive?: boolean;
}

export interface IHasCompletedState
{
    isCompleted?: boolean;
}

export interface IHasCompletionDate
{
    completionDate?: string;
}

export interface IHasOrder
{
    order?: number;
}

export interface IPaymentDto extends IPayment, IHasStageName, IHasTaskStatus, IHasOrder
{
}

export interface IPayment extends IHasId, IHasProjectBudgetId, IHasConsultantVisitsCount, IHasUserTaskId
{
    amount?: number;
    paymentType?: PaymentType;
}

export interface IHasProjectBudgetId
{
    projectBudgetId?: number;
}

export interface IHasConsultantVisitsCount
{
    siteVisitsCount?: number;
}

export interface IHasUserTaskId
{
    userTaskId?: number;
}

export interface IHasStageName
{
    stageName?: string;
}

export interface IHasTaskStatus
{
    taskStatus?: TaskStatus;
}

export interface IHasOrder
{
    stageOrder?: number;
}

export interface IMaterialPayment extends IHasMaterialName, IHasSupplierName, IHasTaskStatus, IHasOrder, IHasSubContractorMaterialStatus, IHasMaterialType, IHasProjectBudgetId, IHasId, IHasUserTaskId, IHasTotalValue
{
}

export interface IHasMaterialName
{
    name?: string;
}

export interface IHasSupplierName
{
    supplierName?: string;
}

export interface IHasSubContractorMaterialStatus
{
    subContractorMaterialStatus?: SubContractorMaterialStatus;
}

export interface IHasMaterialType
{
    materialType?: MaterialType;
}

export interface IHasTotalValue
{
    totalValue?: number;
}

export interface IHasWeight
{
    weight?: number;
}

export interface IHasName
{
    name?: string;
}

export interface IHasDescriptionLite
{
    description?: string;
}

export interface IHasRate
{
    rate?: number;
}

export interface IHasSupplier
{
    supplier?: string;
}

export interface IUserTask extends IHasId, IHasOrder, IActivityEntity, IHasDueDate
{
    status?: TaskStatus;
    actorId?: number;
}

export interface IHasDueDate
{
    dueDate?: string;
}

export interface IHasActor
{
    actorType?: ActorType;
}

export class GetProjectBudgetResponse extends BaseSingleResponse<ProjectBudgetDto>
{

    public constructor(init?: Partial<GetProjectBudgetResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateBudgetMaterialsResponse extends OperationResult
{

    public constructor(init?: Partial<UpdateBudgetMaterialsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorTotalSpentResponse extends OperationResult
{

    public constructor(init?: Partial<UpdateContractorTotalSpentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantPaymentResponse extends OperationResult
{

    public constructor(init?: Partial<UpdateConsultantPaymentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateClientTotalSpentResponse extends OperationResult
{

    public constructor(init?: Partial<UpdateClientTotalSpentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStageValueResponse
{
    public stagePayment?: StageValueDto;

    public constructor(init?: Partial<GetStageValueResponse>) { (Object as any).assign(this, init); }
}

export class AdminBudgetPricePerMonthResponse extends PutOperationResult
{

    public constructor(init?: Partial<AdminBudgetPricePerMonthResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ChangeBudgetConsultantResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<ChangeBudgetConsultantResponse>) { (Object as any).assign(this, init); }
}

export class GetBidValueResponse extends BaseSingleResponse<number>
{

    public constructor(init?: Partial<GetBidValueResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateProjectBudgetResponse extends OperationResult
{

    public constructor(init?: Partial<CreateProjectBudgetResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/pm/getprojectbudgetquery", "GET")
export class GetProjectBudgetQuery implements IReturn<GetProjectBudgetResponse>, IGet, IHasProjectId
{
    public projectId?: number;

    public constructor(init?: Partial<GetProjectBudgetQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProjectBudgetQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProjectBudgetResponse(); }
}

// @Route("/pm/updatebudgetmaterialscommand", "PUT")
export class UpdateBudgetMaterialsCommand implements IReturn<UpdateBudgetMaterialsResponse>, IPut, IHasProjectId, IHasTotalClientMaterialsPayment
{
    public projectId?: number;
    public totalClientMaterialsPayment?: number;

    public constructor(init?: Partial<UpdateBudgetMaterialsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateBudgetMaterialsCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateBudgetMaterialsResponse(); }
}

// @Route("/pm/updatecontractortotalspentcommand", "PUT")
export class UpdateContractorTotalSpentCommand implements IReturn<UpdateContractorTotalSpentResponse>, IPut
{
    public userTaskId?: number;
    public penaltySubtotal?: number;

    public constructor(init?: Partial<UpdateContractorTotalSpentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorTotalSpentCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorTotalSpentResponse(); }
}

// @Route("/pm/updateconsultantpaymentcommand", "PUT")
export class UpdateConsultantPaymentCommand implements IReturn<UpdateConsultantPaymentResponse>, IPut
{
    public constructionProjectId?: number;
    public paymentAmount?: number;

    public constructor(init?: Partial<UpdateConsultantPaymentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantPaymentCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantPaymentResponse(); }
}

// @Route("/pm/updateclienttotalspentcommand", "PUT")
export class UpdateClientTotalSpentCommand implements IReturn<UpdateClientTotalSpentResponse>, IPut
{
    public projectId?: number;
    public newAmount?: number;
    public oldAmount?: number;

    public constructor(init?: Partial<UpdateClientTotalSpentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateClientTotalSpentCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateClientTotalSpentResponse(); }
}

// @Route("/pm/getstagevaluequery", "GET")
export class GetStageValueQuery implements IReturn<GetStageValueResponse>, IGet
{
    public userTaskId?: number;

    public constructor(init?: Partial<GetStageValueQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStageValueQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStageValueResponse(); }
}

// @Route("/pm/adminbudgetpricepermonthcommand", "PUT")
export class AdminBudgetPricePerMonthCommand implements IReturn<AdminBudgetPricePerMonthResponse>, IPut
{
    public constructionProjectId?: number;
    public pricePerMonth?: number;

    public constructor(init?: Partial<AdminBudgetPricePerMonthCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AdminBudgetPricePerMonthCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new AdminBudgetPricePerMonthResponse(); }
}

// @Route("/pm/changebudgetconsultantcommand", "PUT")
export class ChangeBudgetConsultantCommand implements IReturn<ChangeBudgetConsultantResponse>, IPut
{
    public constructionProjectId?: number;
    public consultantId?: number;

    public constructor(init?: Partial<ChangeBudgetConsultantCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ChangeBudgetConsultantCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new ChangeBudgetConsultantResponse(); }
}

// @Route("/pm/getbidvaluequery", "GET")
export class GetBidValueQuery implements IReturn<GetBidValueResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetBidValueQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetBidValueQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetBidValueResponse(); }
}

// @Route("/pm/createprojectbudgetcommand", "POST")
export class CreateProjectBudgetCommand implements IReturn<CreateProjectBudgetResponse>, IPost
{
    public constructionProjectId?: number;
    public projectDto?: ProjectDto;

    public constructor(init?: Partial<CreateProjectBudgetCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateProjectBudgetCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateProjectBudgetResponse(); }
}

