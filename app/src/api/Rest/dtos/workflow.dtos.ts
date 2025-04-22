// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2024-10-08 15:47:54
Version: 6.50
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://10.42.5.128:5000/

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

export interface IPost
{
}

export interface IPut
{
}

export class WorkflowWithActionRequest implements IHasSowSubItemId
{
    public workflowId?: number;
    public sowSubItemId?: number;

    public constructor(init?: Partial<WorkflowWithActionRequest>) { (Object as any).assign(this, init); }
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

export class WorkflowTaskDto implements IWorkflowTask, IHasAction
{
    public id: number;
    // @Required()
    public defaultTaskTime: string;

    // @Required()
    public actionType: ActionType;

    // @Required()
    public actorType: ActorType;

    // @Required()
    public order: number;

    public nameEn?: string;
    public nameAr?: string;
    public descriptionEn?: string;
    public descriptionAr?: string;
    public actionValue?: string;

    public constructor(init?: Partial<WorkflowTaskDto>) { (Object as any).assign(this, init); }
}

export class SowSubItemActionModel implements IHasSowSubItemId
{
    public sowSubItemId?: number;
    public workflowTaskDtos: WorkflowTaskDto[];

    public constructor(init?: Partial<SowSubItemActionModel>) { (Object as any).assign(this, init); }
}

export class TaskActionModel
{
    public workflowId?: number;
    public sowSubItemActions: SowSubItemActionModel[];

    public constructor(init?: Partial<TaskActionModel>) { (Object as any).assign(this, init); }
}

export class WorkflowManifest
{
    public userType: UserTypeModel[];
    public workflowType: WorkflowTypeModel[];
    public acceptanceTaskDefinition: AcceptanceTaskDefinitionModel[];
    public workflow: WorkflowModel[];
    public workflowSequence: WorkflowSequenceModel[];

    public constructor(init?: Partial<WorkflowManifest>) { (Object as any).assign(this, init); }
}

export class SowSubItemUpdateModel
{
    public originalSubItemId?: number;
    public newSubItemId?: number;

    public constructor(init?: Partial<SowSubItemUpdateModel>) { (Object as any).assign(this, init); }
}

export enum StageTemplatePlanStage
{
    None = 0,
    Mobilization = 1,
    Structure = 2,
    InternalFinishes = 3,
    ExternalFinishes = 4,
    Handover = 5,
}

export class BaseStagePlanPart
{
    public planStage?: StageTemplatePlanStage;
    public limitPercentage?: number;

    public constructor(init?: Partial<BaseStagePlanPart>) { (Object as any).assign(this, init); }
}

export class BaseStageUnit
{
    public orderNumber?: number;
    public stageName: string;
    public suggestedPercentage?: number;
    public description: string;
    public stageNameArabic: string;
    public descriptionArabic: string;
    public sowItems: number[];

    public constructor(init?: Partial<BaseStageUnit>) { (Object as any).assign(this, init); }
}

export class StageTemplateUnitDto extends BaseStageUnit implements IStageTemplateUnitDto
{
    public id: number;
    public templatePartId?: number;

    public constructor(init?: Partial<StageTemplateUnitDto>) { super(init); (Object as any).assign(this, init); }
}

export class StageTemplatePartDto extends BaseStagePlanPart implements IStageTemplatePartDto
{
    public id: number;
    public templateId?: number;
    public templateUnits: StageTemplateUnitDto[];

    public constructor(init?: Partial<StageTemplatePartDto>) { super(init); (Object as any).assign(this, init); }
}

export enum ResourceDraftType
{
    None = 0,
    Task = 1,
    Material = 2,
}

export interface IHasDraftResourceRequest
{
    resourceId?: number;
    resourceDraftType?: ResourceDraftType;
}

export enum RateType
{
    None = 0,
    SquaredMeter = 1,
    RM = 2,
    No = 3,
}

export class OptionDto
{
    public supplier: string;
    public rates?: number;
    public rateType?: RateType;
    public totalValue?: number;
    public description: string;
    public attachmentIds: string[];

    public constructor(init?: Partial<OptionDto>) { (Object as any).assign(this, init); }
}

export class QuantityDto
{
    public itemName: string;
    public quantity?: number;
    public rateType?: RateType;
    public description: string;
    public attachmentIds: string[];

    public constructor(init?: Partial<QuantityDto>) { (Object as any).assign(this, init); }
}

export interface IHasProjectId
{
    projectId?: number;
}

export enum FileExtensionType
{
    None = 0,
    Image = 1,
    Pdf = 2,
}

export class GetProjectUpdatesFilter
{
    public fromDate?: string;
    public toDate?: string;
    public stageIds?: number[];
    public actorType?: ActorType;

    public constructor(init?: Partial<GetProjectUpdatesFilter>) { (Object as any).assign(this, init); }
}

export interface IPaginatedRequest
{
    page?: number;
    pageSize?: number;
}

export enum TaskUpdateType
{
    None = 0,
    SiteObservation = 1,
    ContractualNote = 2,
    RisksConcerns = 3,
    GeneralUpdates = 4,
    MessageToContractor = 5,
    MessageToConsultant = 6,
    MessageToClient = 7,
}

export class ActorDto
{
    // @Required()
    public profileId: number;

    // @Required()
    public name: string;

    public avatarId?: string;
    // @Required()
    public email: string;

    // @Required()
    public phone: string;

    public constructor(init?: Partial<ActorDto>) { (Object as any).assign(this, init); }
}

export class CommentDto implements IHasId, IHasDescription, IHasAttachmentsIds
{
    public id: number;
    public actorId?: number;
    public actor: ActorDto;
    public resourceId?: number;
    public description: string;
    public attachmentsIds: string[];
    public createdDate?: string;

    public constructor(init?: Partial<CommentDto>) { (Object as any).assign(this, init); }
}

export class CreateTaskUpdateDto
{
    public type?: TaskUpdateType;
    public description: string;
    public attachmentsIds: string[];
    public comments: CommentDto[];

    public constructor(init?: Partial<CreateTaskUpdateDto>) { (Object as any).assign(this, init); }
}

export class PenaltyAppliedDto
{
    public penaltyPercentage?: number;
    public penaltySubtotal?: number;
    public taxSubtotal?: number;
    public grandTotal?: number;
    public isRefunded?: boolean;
    public refundSubtotal?: number;
    public refundPercentage?: number;

    public constructor(init?: Partial<PenaltyAppliedDto>) { (Object as any).assign(this, init); }
}

export class CreateTaskSubmissionDto implements IHasActionData
{
    // @Required()
    public userTaskId: number;

    // @Required()
    public actionData: string;

    // @Required()
    public updates: CreateTaskUpdateDto[];

    public isConsultantVisit?: boolean;
    public penalty?: PenaltyAppliedDto;

    public constructor(init?: Partial<CreateTaskSubmissionDto>) { (Object as any).assign(this, init); }
}

export class TaskUpdateFilter
{
    public isUnread?: boolean;
    public isFlagged?: boolean;
    public submittedBy?: ActorType[];
    public acceptanceCriteria?: string[];
    public searchText?: string;
    public stageIds?: number[];
    public materialSequenceIds?: number[];

    public constructor(init?: Partial<TaskUpdateFilter>) { (Object as any).assign(this, init); }
}

export class ObservationDto
{
    public stageId?: number;
    public itemId?: number;
    public updateType?: TaskUpdateType;
    public description: string;
    public attachments: string[];

    public constructor(init?: Partial<ObservationDto>) { (Object as any).assign(this, init); }
}

export class WorkflowDto implements IHasId, IHasNameFull, IHasDescriptionFull, IHasTotalDefaultTaskDuration
{
    public id: number;
    public nameEn?: string;
    public nameAr?: string;
    public descriptionEn?: string;
    public descriptionAr?: string;
    // @Required()
    public workflowTasks: WorkflowTaskDto[];

    // @Required()
    public totalDefaultTaskDuration: string;

    public constructor(init?: Partial<WorkflowDto>) { (Object as any).assign(this, init); }
}

export class BaseMultipleResultResponse<T> implements IPaginatedResponse
{
    public result: T[];
    public currentPage?: number;
    public pageCount?: number;
    public pageSize?: number;
    public rowCount?: number;

    public constructor(init?: Partial<BaseMultipleResultResponse<T>>) { (Object as any).assign(this, init); }
}

export interface IPaginatedResponse
{
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
}

export class BaseSingleResponse<T>
{
    public result: T;

    public constructor(init?: Partial<BaseSingleResponse<T>>) { (Object as any).assign(this, init); }
}

export class FullWorkflowDto extends WorkflowDto implements IHasSowSubItemId
{
    public sowSubItemId?: number;

    public constructor(init?: Partial<FullWorkflowDto>) { super(init); (Object as any).assign(this, init); }
}

export class NumberOfActorTasksForWorkflowDto
{
    public workflowId?: number;
    public numberOfTasks?: number;

    public constructor(init?: Partial<NumberOfActorTasksForWorkflowDto>) { (Object as any).assign(this, init); }
}

export class TaskActionUpdateDto
{
    public sowSubItemId?: number;
    public hash: string;

    public constructor(init?: Partial<TaskActionUpdateDto>) { (Object as any).assign(this, init); }
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

export class StageTemplateValidationErrors
{
    public lastWorkflowHasMinimumTasks?: boolean;
    public firstStageHasAdvancePayment?: boolean;
    public lastSowItemHasItemUnits?: boolean;

    public constructor(init?: Partial<StageTemplateValidationErrors>) { (Object as any).assign(this, init); }
}

export enum TaskStatus
{
    Upcoming = 0,
    Due = 1,
    InDelay = 2,
    Completed = 3,
    Pending = 4,
}

export class SiteVisitDto
{
    public order?: number;
    public siteVisitDescription: string;
    public visitDate?: string;
    public stageOrder?: number;
    public inDelay?: boolean;
    public totalDaysInDelay?: number;

    public constructor(init?: Partial<SiteVisitDto>) { (Object as any).assign(this, init); }
}

export enum MarketingService
{
    None = 0,
    CompanyWebsite = 1,
    Instagram = 2,
    Linkedin = 3,
    Twitter = 4,
    Whatsapp = 5,
    Behance = 6,
    Dribbble = 7,
    Houzz = 8,
    Pinterest = 9,
    TikTok = 10,
}

export class MarketingInformationDto
{
    public marketingService?: MarketingService;
    public addresUrl: string;
    public companyId?: number;
    public id: number;

    public constructor(init?: Partial<MarketingInformationDto>) { (Object as any).assign(this, init); }
}

export enum CompanyStatus
{
    None = 0,
    Draft = 1,
    Reviewing = 2,
    Approved = 3,
    Rejected = 4,
}

export enum PlanningSoftware
{
    None = 0,
    Excel = 1,
    MicrosoftProject = 2,
    Primavera = 3,
    Other = 4,
}

export enum CompanyType
{
    None = 0,
    Consultant = 1,
    Contractor = 2,
}

export class BaseCompany
{
    public marketings?: MarketingInformationDto[];
    public status?: CompanyStatus;
    // @Required()
    public ownerId: number;

    public companyLogoId: string;
    // @Required()
    public name: string;

    public nameInArabic: string;
    // @Required()
    public email: string;

    // @Required()
    public phone: string;

    // @Required()
    public headOfficeGovernorateId: number;

    // @Required()
    public headOfficeWilayatId: number;

    // @Required()
    public crNumber: string;

    // @Required()
    public crStartDate: string;

    // @Required()
    public crExpirationDate: string;

    public projectsDelivered?: number;
    public projectsWorkedAtOnce?: number;
    public largestProjectAwarded?: number;
    public failedCompleteAwardedWork?: boolean;
    public anyJudgmentsPendingOrOutstanding?: boolean;
    // @Required()
    public measuresToMaintainQuality: string;

    public planningSoftware: PlanningSoftware[];
    // @Required()
    public otherPlanningSoftware: string;

    // @Required()
    public additionalInformation: string;

    public crCertificate: string[];
    public ownerNationalId: string[];
    public manpowerReportIssuedByMom: string[];
    public companyProfile: string[];
    public otherFiles: string[];
    public companyType?: CompanyType;
    public ownerName: string;
    public ownerPhone: string;
    public ownerEmail: string;

    public constructor(init?: Partial<BaseCompany>) { (Object as any).assign(this, init); }
}

export class CompanyDto extends BaseCompany implements ICompanyDto
{
    public id: number;

    public constructor(init?: Partial<CompanyDto>) { super(init); (Object as any).assign(this, init); }
}

export class BankDetailsDto
{
    public bankName: string;
    public accountHolderName: string;
    public accountNumber: string;

    public constructor(init?: Partial<BankDetailsDto>) { (Object as any).assign(this, init); }
}

export class FullConsultantPaymentDto
{
    // @Required()
    public id: number;

    // @Required()
    public generationDate: string;

    // @Required()
    public forMonth: number;

    // @Required()
    public forYear: number;

    // @Required()
    public numberOfVisits: number;

    // @Required()
    public taxPercentage: number;

    // @Required()
    public taxValue: number;

    // @Required()
    public pricePerVisit: number;

    // @Required()
    public visitsPrice: number;

    // @Required()
    public grandTotalPrice: number;

    // @Required()
    public status: TaskStatus;

    // @Required()
    public dueDate: string;

    // @Required()
    public isConfirmed: boolean;

    public siteVisitsInformation?: SiteVisitDto[];
    // @Required()
    public fileId: string;

    // @Required()
    public invoiceId: number;

    // @Required()
    public actorDto: ActorDto;

    // @Required()
    public consultantId: number;

    // @Required()
    public consultant: CompanyDto;

    // @Required()
    public forConstructionProjectId: number;

    public delayInDays?: number;
    public bankDetailsDto: BankDetailsDto;
    public numberOfPossiblePenalties?: number;
    public penaltySubtotal?: number;

    public constructor(init?: Partial<FullConsultantPaymentDto>) { (Object as any).assign(this, init); }
}

export class ConsultantPaymentListElementDto
{
    public id: number;
    public generationDate?: string;
    public forMonth?: number;
    public forYear?: number;
    public numberOfVisits?: number;
    public taxPercentage?: number;
    public taxValue?: number;
    public visitsPrice?: number;
    public grandTotalPrice?: number;
    public status?: TaskStatus;
    public dueDate?: string;
    public isConfirmed?: boolean;

    public constructor(init?: Partial<ConsultantPaymentListElementDto>) { (Object as any).assign(this, init); }
}

export class ListConsultantPaymentsResult
{
    public consultantPaymentList?: ConsultantPaymentListElementDto[];

    public constructor(init?: Partial<ListConsultantPaymentsResult>) { (Object as any).assign(this, init); }
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

export class DraftResourceDto
{
    public resourceId?: number;
    public resourceValue?: string;

    public constructor(init?: Partial<DraftResourceDto>) { (Object as any).assign(this, init); }
}

export enum MaterialUserTaskType
{
    None = 0,
    QuantityRequest = 1,
    Purchase = 2,
    Delivery = 3,
    OnSite = 4,
    ProvideOptions = 101,
    SelectOption = 102,
    SupplyNow = 201,
    ConfirmWork = 202,
}

export class MaterialTaskProgressDto
{
    public materialUserTaskId?: number;
    public status?: TaskStatus;
    public isActionable?: boolean;
    public isValidUserActor?: boolean;
    public canBeSkipped?: boolean;
    public canBeRejected?: boolean;
    public skipTask?: MaterialTaskProgressDto;
    public actorType?: ActorType;
    public dueDate?: string;
    public completionDate?: string;
    public actor?: ActorDto;
    public materialUserTaskType?: MaterialUserTaskType;

    public constructor(init?: Partial<MaterialTaskProgressDto>) { (Object as any).assign(this, init); }
}

export enum SubmitStatus
{
    None = 0,
    Submitted = 1,
    Approved = 2,
    Rejected = 3,
}

export enum MaterialSubmissionType
{
    None = 0,
    MaterialQuantitiesRequest = 1,
    MaterialsPurchased = 2,
    MaterialsDelivered = 3,
    ConfirmMaterialsOnSite = 4,
    MaterialOptions = 5,
    SelectOption = 6,
    SubContracted = 101,
    CompletedWork = 102,
}

export enum ResourceType
{
    None = 0,
    TaskUpdate = 1,
    MaterialOption = 2,
    MaterialQuantityRequest = 3,
    MaterialTaskUpdate = 4,
    Observation = 5,
}

export class TaskUpdateDto implements IHasId, IHasDescription, IHasAttachmentsIds
{
    // @Required()
    public id: number;

    // @Required()
    public taskId: number;

    // @Required()
    public actorId: number;

    // @Required()
    public actorType: ActorType;

    // @Required()
    public type: TaskUpdateType;

    // @Required()
    public resourceType: ResourceType;

    // @Required()
    public description: string;

    // @Required()
    public attachmentsIds: string[];

    // @Required()
    public comments: CommentDto[];

    // @Required()
    public createdDate: string;

    public itemName?: string;
    public supplier?: string;
    public rate?: number;
    public rateType?: RateType;
    public totalPrice?: number;
    public quantity?: number;
    public isProofOfPayment?: boolean;

    public constructor(init?: Partial<TaskUpdateDto>) { (Object as any).assign(this, init); }
}

export class SubmissionDto implements IHasAction, IHasActionData, IHasActor, IHasName
{
    public id: number;
    public name: string;
    public actionType?: ActionType;
    public actionValue?: string;
    public actionData?: string;
    public status?: SubmitStatus;
    public actorType?: ActorType;
    public actorId?: number;
    public submitterId?: number;
    public submitterType?: ActorType;
    public createdDate?: string;
    public materialSubmissionType?: MaterialSubmissionType;
    public taskUpdates: TaskUpdateDto[];
    public description?: string;

    public constructor(init?: Partial<SubmissionDto>) { (Object as any).assign(this, init); }
}

export enum SowItemCategory
{
    None = 0,
    ContractorStructuralMepMaterials = 1,
    ClientSubcontractedScopeAndMaterials = 2,
    ClientMaterialsForContractorInstallation = 3,
    ClientMaterialsInstalledByEither = 4,
    Payment = 5,
    NotApplicable = 6,
}

export class BaseSowItemUnit
{
    public englishDescription: string;
    public arabicDescription: string;
    public titleEnglish: string;
    public titleArabic: string;
    public supplier: string;
    public rate?: number;
    public acceptanceWorkflow?: number;
    public itemId?: number;
    public orderNumber?: number;

    public constructor(init?: Partial<BaseSowItemUnit>) { (Object as any).assign(this, init); }
}

export class SowItemUnitDto extends BaseSowItemUnit implements ISowItemUnitDto
{
    public id: number;

    public constructor(init?: Partial<SowItemUnitDto>) { super(init); (Object as any).assign(this, init); }
}

export enum SowItemVisibility
{
    None = 0,
    MasterItem = 1,
    Hidden = 2,
}

export class BaseSowItem
{
    public englishName: string;
    public arabicName: string;
    public showItemInFrontend?: boolean;
    public isMandatory?: boolean;
    public numberOfSpecs?: number;
    public numberOfWorkflows?: number;
    public consultantVisits?: number;
    public iconFileId?: string;
    public category?: SowItemCategory;
    public versionId?: number;
    public itemUnits: SowItemUnitDto[];
    public itemVisibility?: SowItemVisibility;

    public constructor(init?: Partial<BaseSowItem>) { (Object as any).assign(this, init); }
}

export class SowItemDto extends BaseSowItem implements ISowItemDto
{
    public orderNumber?: number;
    public id: number;

    public constructor(init?: Partial<SowItemDto>) { super(init); (Object as any).assign(this, init); }
}

export enum MaterialWorkflowType
{
    None = 0,
    ClientMaterialsForContractorInstallation = 1,
    ContractorMaterialsForClientApproval = 2,
    ClientSubContractors = 3,
    ContractorMaterials = 4,
}

export class MaterialDelay
{
    public clientDelay?: number;
    public contractorDelay?: number;

    public constructor(init?: Partial<MaterialDelay>) { (Object as any).assign(this, init); }
}

export class MaterialProgressDto implements IHasSowItem
{
    // @Required()
    public materialWorkflowSequenceId: number;

    // @Required()
    public currentTask: MaterialTaskProgressDto;

    // @Required()
    public submissions: SubmissionDto[];

    public sowItem?: SowItemDto;
    public stageOrder?: number;
    // @Required()
    public materialWorkflowType: MaterialWorkflowType;

    // @Required()
    public isPrivate: boolean;

    public subContractedMaterialName?: string;
    public subContractorName?: string;
    public isCompleted?: boolean;
    public materialDelay?: MaterialDelay;

    public constructor(init?: Partial<MaterialProgressDto>) { (Object as any).assign(this, init); }
}

export class SubContractorListItem
{
    // @Required()
    public materialWorkflowId: number;

    public sowItemDto?: SowItemDto;
    // @Required()
    public subContractedMaterialName: string;

    // @Required()
    public subContractorName: string;

    // @Required()
    public stageOrder: number;

    // @Required()
    public completeWorksBy: string;

    // @Required()
    public currentTask: MaterialTaskProgressDto;

    // @Required()
    public isPrivate: boolean;

    public constructor(init?: Partial<SubContractorListItem>) { (Object as any).assign(this, init); }
}

export class MaterialListItem
{
    // @Required()
    public materialWorkflowId: number;

    // @Required()
    public sowItem: SowItemDto;

    // @Required()
    public stageOrder: number;

    // @Required()
    public siteDeliveryDate: string;

    // @Required()
    public currentTask: MaterialTaskProgressDto;

    public constructor(init?: Partial<MaterialListItem>) { (Object as any).assign(this, init); }
}

export class MaterialNameDto
{
    public id: number;
    public englishName: string;
    public arabicName: string;
    public iconId: string;

    public constructor(init?: Partial<MaterialNameDto>) { (Object as any).assign(this, init); }
}

export enum StageStatus
{
    Upcoming = 0,
    CurrentStage = 1,
    InDelay = 2,
    Completed = 3,
}

export class UserTaskDto implements IUserTask, IHasNameFull, IHasDescriptionFull, IHasActor
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

    public descriptionEn?: string;
    public descriptionAr?: string;
    // @Required()
    public createdDate: string;

    // @Required()
    public defaultTaskTime: string;

    // @Required()
    public nameEn: string;

    // @Required()
    public nameAr: string;

    // @Required()
    public sowSubItemId: number;

    public sowSubItem?: SowItemUnitDto;

    public constructor(init?: Partial<UserTaskDto>) { (Object as any).assign(this, init); }
}

export class WorkflowSequenceDto implements IHasId, IHasOrder, IHasNameFull, IHasDescriptionLite, IHasRate, IHasSupplier
{
    // @Required()
    public id: number;

    // @Required()
    public order: number;

    // @Required()
    public userTasks: UserTaskDto[];

    public description?: string;
    // @Required()
    public sowItemName: string;

    // @Required()
    public sowItemId: number;

    public rate?: number;
    public supplier?: string;
    // @Required()
    public nameEn: string;

    // @Required()
    public nameAr: string;

    public constructor(init?: Partial<WorkflowSequenceDto>) { (Object as any).assign(this, init); }
}

export class StageDto implements IHasId, IHasOrder, IActivityEntity, IHasWeight, IHasNameFull, IHasDescriptionFull, IHasBaselineStartDate, IHasBaselineFinishDate
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
    public nameEn: string;

    public nameAr?: string;
    public descriptionEn?: string;
    public descriptionAr?: string;
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
    public phases: PhaseDto[];
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

export enum ProjectStatus
{
    None = 0,
    NotStarted = 1,
    OnTrack = 2,
    InDelay = 3,
    InMaintenance = 4,
    Completed = 5,
}

export class ProjectStatisticDto
{
    public projectStatus?: ProjectStatus;
    public completionPercentage?: number;
    public totalDaysElapsed?: number;
    public daysRemaining?: number;
    public totalDelayDays?: number;
    public contractorDelayDays?: number;
    public consultantDelayDays?: number;
    public clientDelayDays?: number;

    public constructor(init?: Partial<ProjectStatisticDto>) { (Object as any).assign(this, init); }
}

export class PaymentBlockPayloadDto
{
    public stageNumber?: number;
    public stageValue?: number;
    public stageSubTotal?: number;
    public isPenaltyAvailable?: boolean;
    public penaltyPercentage?: number;
    public penaltySubtotal?: number;
    public bidValue?: number;
    public isRefundAvailable?: boolean;
    public refundSubtotal?: number;
    public refundPercentage?: number;
    public taxPercentage?: number;
    public taxTotal?: number;
    public grandTotal?: number;

    public constructor(init?: Partial<PaymentBlockPayloadDto>) { (Object as any).assign(this, init); }
}

export class TaskProgressDto implements IHasNameFull, IHasDescriptionFull, IHasActor, IHasDueDate, IHasAction
{
    // @Required()
    public id: number;

    // @Required()
    public status: TaskStatus;

    // @Required()
    public isActionable: boolean;

    // @Required()
    public isValidUserActor: boolean;

    // @Required()
    public actorType: ActorType;

    public dueDate?: string;
    // @Required()
    public actionType: ActionType;

    public actionValue?: string;
    public actor?: ActorDto;
    public paymentBlockPayload?: PaymentBlockPayloadDto;
    public descriptionEn?: string;
    public descriptionAr?: string;
    // @Required()
    public nameEn: string;

    // @Required()
    public nameAr: string;

    public constructor(init?: Partial<TaskProgressDto>) { (Object as any).assign(this, init); }
}

export class WorkflowProgressDto implements IHasRate, IHasSupplier, IHasSowItem
{
    // @Required()
    public workflowId: number;

    // @Required()
    public workflowNameEn: string;

    // @Required()
    public workflowNameAr: string;

    // @Required()
    public workflowDescriptionEn: string;

    // @Required()
    public workflowDescriptionAr: string;

    // @Required()
    public sowItemId: number;

    // @Required()
    public sowItem: SowItemDto;

    // @Required()
    public sowSubItem: SowItemUnitDto;

    // @Required()
    public stageId: number;

    public rate?: number;
    public supplier?: string;
    // @Required()
    public submissions: SubmissionDto[];

    // @Required()
    public updateDtos: TaskUpdateDto[];

    // @Required()
    public currentTask: TaskProgressDto;

    public constructor(init?: Partial<WorkflowProgressDto>) { (Object as any).assign(this, init); }
}

export class PenaltyDto
{
    public bidValue?: number;
    public isPenaltyAvailable?: boolean;
    public penaltyPercentage?: number;
    public penaltySubtotal?: number;
    public isRefundable?: boolean;
    public refundSubtotal?: number;
    public refundPercentage?: number;

    public constructor(init?: Partial<PenaltyDto>) { (Object as any).assign(this, init); }
}

export class InvoiceDetailsDto
{
    public payer: ActorDto;
    public payee: CompanyDto;
    public projectId?: number;
    public invoiceId?: number;
    public invoiceDateIssued?: string;
    public description: string;
    public projectValue?: number;
    public stageValue?: number;
    public subtotal?: number;
    public taxPercentage?: number;
    public taxTotal?: number;
    public grandTotal?: number;
    public dueDate?: string;
    public penaltyDto: PenaltyDto;

    public constructor(init?: Partial<InvoiceDetailsDto>) { (Object as any).assign(this, init); }
}

export class StageUserTaskDto
{
    public userTaskId?: number;
    public stageName: string;
    public stageNameAr: string;
    public stageOrder?: number;
    public userTaskDueDate?: string;
    public userTaskStatus?: TaskStatus;

    public constructor(init?: Partial<StageUserTaskDto>) { (Object as any).assign(this, init); }
}

export class LogUpdateItemDto
{
    public taskUpdateId?: number;
    public posterActorType?: ActorType;
    public posterActor?: ActorDto;
    public postedAt?: string;
    public attachmentId?: string;
    public fileName: string;
    public title: string;

    public constructor(init?: Partial<LogUpdateItemDto>) { (Object as any).assign(this, init); }
}

export class LogUpdateDto
{
    // @Required()
    public taskUpdateId: number;

    // @Required()
    public taskName: string;

    // @Required()
    public taskUpdateType: TaskUpdateType;

    // @Required()
    public attachmentsIds: string[];

    // @Required()
    public actorType: ActorType;

    // @Required()
    public actor: ActorDto;

    // @Required()
    public createdDate: string;

    // @Required()
    public stageOrder: number;

    // @Required()
    public sowItemName: string;

    // @Required()
    public workflowName: string;

    // @Required()
    public sequenceUpdateId: number;

    public constructor(init?: Partial<LogUpdateDto>) { (Object as any).assign(this, init); }
}

export class TasksSummaryDto
{
    public upcomingTasksCount?: number;
    public dueTasksCount?: number;
    public completedTasksCount?: number;
    public inDelayTasksCount?: number;

    public constructor(init?: Partial<TasksSummaryDto>) { (Object as any).assign(this, init); }
}

export class StageSubItemDto
{
    // @Required()
    public subItemName: string;

    // @Required()
    public workflowName: string;

    // @Required()
    public status: TaskStatus;

    public constructor(init?: Partial<StageSubItemDto>) { (Object as any).assign(this, init); }
}

export class StageItemDto
{
    // @Required()
    public name: string;

    public iconId?: string;
    // @Required()
    public subItems: StageSubItemDto[];

    public constructor(init?: Partial<StageItemDto>) { (Object as any).assign(this, init); }
}

export class StageMaterialDto extends MaterialNameDto
{
    public iconFileId: string;

    public constructor(init?: Partial<StageMaterialDto>) { super(init); (Object as any).assign(this, init); }
}

export class ActorsDelay
{
    public contractor?: number;
    public consultant?: number;
    public client?: number;

    public constructor(init?: Partial<ActorsDelay>) { (Object as any).assign(this, init); }
}

export class StageProgressDto
{
    // @Required()
    public stage: StageDto;

    // @Required()
    public updatesSummary: TaskUpdateDto[];

    // @Required()
    public tasksSummary: TasksSummaryDto;

    // @Required()
    public stageItems: StageItemDto[];

    public materialItems: StageMaterialDto[];
    public delays: ActorsDelay;

    public constructor(init?: Partial<StageProgressDto>) { (Object as any).assign(this, init); }
}

export class SubmissionValidations
{
    public isMaterialFinished?: boolean;
    public previousStagesCompleted?: boolean;

    public constructor(init?: Partial<SubmissionValidations>) { (Object as any).assign(this, init); }
}

export class TaskUpdateInboxItemDto
{
    public id: number;
    public updateSequenceId?: number;
    public workflowNameEn: string;
    public workflowNameAr: string;
    public taskNameEn: string;
    public taskNameAr: string;
    public isMaterialUpdate?: boolean;
    public materialWorkflowType?: MaterialWorkflowType;
    public materialUserTaskType?: MaterialUserTaskType;
    public description: string;
    public hasAttachments?: boolean;
    public submittedBy?: ActorType;
    public submittedInStageOrder?: number;
    public lastActivity?: string;
    public isRead?: boolean;
    public isFlagged?: boolean;
    public customUpdateName?: string;
    public taskUpdateType?: TaskUpdateType;
    public customUpdateTitle?: string;

    public constructor(init?: Partial<TaskUpdateInboxItemDto>) { (Object as any).assign(this, init); }
}

export class TaskUpdateInboxDto
{
    public id: number;
    public updateSequenceId?: number;
    public workflowName: string;
    public taskName: string;
    public description: string;
    public isRead?: boolean;
    public isFlagged?: boolean;
    public createdOn?: string;
    public attachmentsIds: string[];
    public comments: CommentDto[];
    public submittedBy?: ActorType;
    public submittedByActorId?: number;
    public isMaterialUpdate?: boolean;
    public materialWorkflowType?: MaterialWorkflowType;
    public materialUserTaskType?: MaterialUserTaskType;
    public customUpdateName?: string;
    public sowItemName?: string;
    public taskUpdateType?: TaskUpdateType;
    public customUpdateTitle?: string;
    public stageOrder?: number;

    public constructor(init?: Partial<TaskUpdateInboxDto>) { (Object as any).assign(this, init); }
}

export class UpdateStatisticsDto
{
    public allCount?: number;
    public unreadCount?: number;
    public flaggedCount?: number;

    public constructor(init?: Partial<UpdateStatisticsDto>) { (Object as any).assign(this, init); }
}

export class BasePostOperationResult<T> extends OperationResult
{
    public id: T;

    public constructor(init?: Partial<BasePostOperationResult<T>>) { super(init); (Object as any).assign(this, init); }
}

export class PostOperationResult extends BasePostOperationResult<number>
{

    public constructor(init?: Partial<PostOperationResult>) { super(init); (Object as any).assign(this, init); }
}

export class StageNameDto implements IHasId, IHasOrder
{
    // @Required()
    public id: number;

    // @Required()
    public order: number;

    // @Required()
    public isActive: boolean;

    // @Required()
    public nameEn: string;

    public nameAr?: string;

    public constructor(init?: Partial<StageNameDto>) { (Object as any).assign(this, init); }
}

export class IndicatorsDto
{
    public tasksCount?: number;
    public paymentsCount?: number;
    public materialsCount?: number;
    public updatesCount?: number;

    public constructor(init?: Partial<IndicatorsDto>) { (Object as any).assign(this, init); }
}

export interface IHasSowSubItemId
{
    sowSubItemId?: number;
}

export class UserTypeModel implements IManifestHasId
{
    public actorType?: ActorType;
    public nameEn: string;
    public nameAr: string;
    public id: number;

    public constructor(init?: Partial<UserTypeModel>) { (Object as any).assign(this, init); }
}

export class WorkflowTypeModel implements IManifestHasId
{
    public nameEn: string;
    public descriptionEn: string;
    public id: number;

    public constructor(init?: Partial<WorkflowTypeModel>) { (Object as any).assign(this, init); }
}

export class AcceptanceTaskDefinitionModel implements IManifestHasId
{
    public id: number;
    public nameEn: string;
    public nameAr: string;
    public descriptionEn: string;
    public descriptionAr: string;
    public actionType?: ActionType;
    public isConsultantVisit?: boolean;

    public constructor(init?: Partial<AcceptanceTaskDefinitionModel>) { (Object as any).assign(this, init); }
}

export class WorkflowModel implements IManifestHasId
{
    public workflowTypeId?: number;
    public nameEn: string;
    public nameAr: string;
    public descriptionEn: string;
    public descriptionAr: string;
    public id: number;

    public constructor(init?: Partial<WorkflowModel>) { (Object as any).assign(this, init); }
}

export class WorkflowSequenceModel implements IManifestHasId
{
    public id: number;
    public workflowId?: number;
    public taskOrder?: number;
    public taskId?: number;
    public userTypeId?: number;
    public duration?: number;

    public constructor(init?: Partial<WorkflowSequenceModel>) { (Object as any).assign(this, init); }
}

export interface IStageTemplatePartDto
{
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
    templateId?: number;
    templateUnits: StageTemplateUnitDto[];
}

export interface IHasActionData
{
    actionData?: string;
}

export interface IHasId
{
    id: number;
}

export interface IHasNameFull
{
    nameEn?: string;
    nameAr?: string;
}

export interface IHasDescriptionFull
{
    descriptionEn?: string;
    descriptionAr?: string;
}

export interface IHasTotalDefaultTaskDuration
{
    totalDefaultTaskDuration?: string;
}

export interface IHasDescription
{
    description: string;
}

export interface IHasAttachmentsIds
{
    attachmentsIds: string[];
}

export interface IHasSowItem
{
    sowItem?: SowItemDto;
}

export interface ISowItemDto
{
    englishName: string;
    arabicName: string;
    showItemInFrontend?: boolean;
    isMandatory?: boolean;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    category?: SowItemCategory;
    versionId?: number;
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

export interface IHasRate
{
    rate?: number;
}

export interface IHasSupplier
{
    supplier?: string;
}

export interface IHasOrder
{
    order?: number;
}

export interface IManifestHasId
{
    id: number;
}

export interface IStageTemplateUnitDto
{
    orderNumber?: number;
    stageName: string;
    suggestedPercentage?: number;
    description: string;
    stageNameArabic: string;
    descriptionArabic: string;
    sowItems: number[];
    templatePartId?: number;
}

export interface IWorkflowTask extends IHasId, IHasNameFull, IHasDescriptionFull, IHasOrder, IHasActor
{
    defaultTaskTime?: string;
    actionType?: ActionType;
}

export interface IHasActor
{
    actorType?: ActorType;
}

export interface IHasAction
{
    actionType?: ActionType;
    actionValue?: string;
}

export interface ICompanyDto
{
    ownerId?: number;
    name: string;
    nameInArabic: string;
    email: string;
    phone: string;
    headOfficeGovernorateId?: number;
    headOfficeWilayatId?: number;
    crNumber: string;
    crStartDate?: string;
    crExpirationDate?: string;
    projectsDelivered?: number;
    projectsWorkedAtOnce?: number;
    largestProjectAwarded?: number;
    failedCompleteAwardedWork?: boolean;
    anyJudgmentsPendingOrOutstanding?: boolean;
    measuresToMaintainQuality: string;
    planningSoftware: PlanningSoftware[];
    otherPlanningSoftware: string;
    additionalInformation: string;
    companyLogoId: string;
    crCertificate: string[];
    ownerNationalId: string[];
    manpowerReportIssuedByMom: string[];
    companyProfile: string[];
    otherFiles: string[];
}

export interface IHasName
{
    name: string;
}

export interface ISowItemUnitDto
{
    englishDescription: string;
    arabicDescription: string;
    titleEnglish: string;
    titleArabic: string;
    supplier: string;
    rate?: number;
    acceptanceWorkflow?: number;
    itemId?: number;
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

export interface IHasDueDate
{
    dueDate?: string;
}

export interface IHasWeight
{
    weight?: number;
}

export interface IHasDescriptionLite
{
    description?: string;
}

export interface IUserTask extends IHasId, IHasOrder, IActivityEntity, IHasDueDate
{
    status?: TaskStatus;
    actorId?: number;
}

export class GetAllWorkflowsResponse extends BaseMultipleResultResponse<WorkflowDto>
{

    public constructor(init?: Partial<GetAllWorkflowsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetWorkflowByIdResponse extends BaseSingleResponse<WorkflowDto>
{

    public constructor(init?: Partial<GetWorkflowByIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetWorkflowsByIdsResponse extends BaseMultipleResultResponse<WorkflowDto>
{

    public constructor(init?: Partial<GetWorkflowsByIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetWorkflowsWithActionsResponse extends BaseMultipleResultResponse<FullWorkflowDto>
{

    public constructor(init?: Partial<GetWorkflowsWithActionsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetNumberOfVisitsForWorkflowsResponse extends BaseSingleResponse<number>
{

    public constructor(init?: Partial<GetNumberOfVisitsForWorkflowsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetNumberOfActorTasksForWorkflowsResponse extends BaseMultipleResultResponse<NumberOfActorTasksForWorkflowDto>
{

    public constructor(init?: Partial<GetNumberOfActorTasksForWorkflowsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetNumberOfTasksPerWorkflowResponse
{
    public result: { [index: number]: number; };

    public constructor(init?: Partial<GetNumberOfTasksPerWorkflowResponse>) { (Object as any).assign(this, init); }
}

export class SaveWorkflowActionsValuesResponse extends OperationResult
{
    public updatedSubItems?: TaskActionUpdateDto[];

    public constructor(init?: Partial<SaveWorkflowActionsValuesResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateWorkflowActionDataValueResponse
{
    public updatedSubItems?: TaskActionUpdateDto[];

    public constructor(init?: Partial<UpdateWorkflowActionDataValueResponse>) { (Object as any).assign(this, init); }
}

export class StartWorkflowResponse extends OperationResult
{

    public constructor(init?: Partial<StartWorkflowResponse>) { super(init); (Object as any).assign(this, init); }
}

export class BasicWorkflowResponse extends OperationResult
{

    public constructor(init?: Partial<BasicWorkflowResponse>) { super(init); (Object as any).assign(this, init); }
}

// @DataContract
export class EmptyResponse
{
    // @DataMember(Order=1)
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<EmptyResponse>) { (Object as any).assign(this, init); }
}

export class ValidateStageTemplateResponse
{
    public isValid?: boolean;
    public errors: StageTemplateValidationErrors;

    public constructor(init?: Partial<ValidateStageTemplateResponse>) { (Object as any).assign(this, init); }
}

export class CreateCommentCommandResponse extends BaseSingleResponse<CommentDto>
{

    public constructor(init?: Partial<CreateCommentCommandResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetCommentsQueryResponse extends BaseMultipleResultResponse<CommentDto>
{

    public constructor(init?: Partial<GetCommentsQueryResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetFullConsultantPaymentResponse extends BaseSingleResponse<FullConsultantPaymentDto>
{

    public constructor(init?: Partial<GetFullConsultantPaymentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListConsultantPaymentResponse extends BaseSingleResponse<ListConsultantPaymentsResult>
{

    public constructor(init?: Partial<ListConsultantPaymentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PayConsultantPaymentResponse extends OperationResult
{

    public constructor(init?: Partial<PayConsultantPaymentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class AdminUpdateProjectConsultantPriceResponse extends PutOperationResult
{

    public constructor(init?: Partial<AdminUpdateProjectConsultantPriceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GenerateConsultantPaymentResponse extends OperationResult
{

    public constructor(init?: Partial<GenerateConsultantPaymentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class SaveDraftResourceResponse extends OperationResult
{

    public constructor(init?: Partial<SaveDraftResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetDraftResourceResponse extends BaseSingleResponse<DraftResourceDto>
{

    public constructor(init?: Partial<GetDraftResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetMaterialProgressResponse extends BaseSingleResponse<MaterialProgressDto>
{

    public constructor(init?: Partial<GetMaterialProgressResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetClientMaterialsResponse
{
    public result?: MaterialProgressDto[];

    public constructor(init?: Partial<GetClientMaterialsResponse>) { (Object as any).assign(this, init); }
}

export class GetMaterialWorkflowsResponse
{
    // @Required()
    public clientSubContractorItems: SubContractorListItem[];

    // @Required()
    public clientMaterialsForContractorInstallationItems: MaterialListItem[];

    // @Required()
    public contractorMaterialsForClientApprovalItems: MaterialListItem[];

    // @Required()
    public contractorMaterials: SowItemDto[];

    public constructor(init?: Partial<GetMaterialWorkflowsResponse>) { (Object as any).assign(this, init); }
}

export class MaterialProgressResponse extends BaseSingleResponse<MaterialProgressDto>
{

    public constructor(init?: Partial<MaterialProgressResponse>) { super(init); (Object as any).assign(this, init); }
}

export class AddExpenseResponse
{
    public result: SubContractorListItem;

    public constructor(init?: Partial<AddExpenseResponse>) { (Object as any).assign(this, init); }
}

export class GetListMaterialNamesResponse
{
    public result: MaterialNameDto[];

    public constructor(init?: Partial<GetListMaterialNamesResponse>) { (Object as any).assign(this, init); }
}

export class StartProjectManagementModuleResponse implements IHasProjectId
{
    public projectId?: number;

    public constructor(init?: Partial<StartProjectManagementModuleResponse>) { (Object as any).assign(this, init); }
}

export class GetProjectResponse extends BaseSingleResponse<ProjectDto>
{

    public constructor(init?: Partial<GetProjectResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetProjectStatisticResponse extends BaseSingleResponse<ProjectStatisticDto>
{

    public constructor(init?: Partial<GetProjectStatisticResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetWorkflowProgressResponse extends BaseSingleResponse<WorkflowProgressDto>
{

    public constructor(init?: Partial<GetWorkflowProgressResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetInvoiceDetailsQueryResponse extends BaseSingleResponse<InvoiceDetailsDto>
{

    public constructor(init?: Partial<GetInvoiceDetailsQueryResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStageUserTasksByIdsResponse extends BaseMultipleResultResponse<StageUserTaskDto>
{

    public constructor(init?: Partial<GetStageUserTasksByIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetProjectUpdatesResponse extends BaseMultipleResultResponse<LogUpdateItemDto>
{

    public constructor(init?: Partial<GetProjectUpdatesResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetProjectUpdateResponse extends BaseSingleResponse<LogUpdateDto>
{

    public constructor(init?: Partial<GetProjectUpdateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStageProgressResponse extends BaseSingleResponse<StageProgressDto>
{

    public constructor(init?: Partial<GetStageProgressResponse>) { super(init); (Object as any).assign(this, init); }
}

export class BaseProjectManagementResponse
{
    public project?: ProjectDto;
    public submissionValidations?: SubmissionValidations;

    public constructor(init?: Partial<BaseProjectManagementResponse>) { (Object as any).assign(this, init); }
}

export class GetInboxTaskUpdatesResponse extends BaseMultipleResultResponse<TaskUpdateInboxItemDto>
{

    public constructor(init?: Partial<GetInboxTaskUpdatesResponse>) { super(init); (Object as any).assign(this, init); }
}

export class FLagTaskUpdateResponse
{

    public constructor(init?: Partial<FLagTaskUpdateResponse>) { (Object as any).assign(this, init); }
}

export class GetInboxTaskUpdateResponse extends BaseSingleResponse<TaskUpdateInboxDto>
{

    public constructor(init?: Partial<GetInboxTaskUpdateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetUpdateStatisticsResponse extends BaseSingleResponse<UpdateStatisticsDto>
{

    public constructor(init?: Partial<GetUpdateStatisticsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateObservationResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateObservationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetObservationStageItemsResponse extends BaseMultipleResultResponse<MaterialNameDto>
{

    public constructor(init?: Partial<GetObservationStageItemsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetListStageNameResponse extends BaseMultipleResultResponse<StageNameDto>
{

    public constructor(init?: Partial<GetListStageNameResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ReorderStagesResponse extends PutOperationResult
{

    public constructor(init?: Partial<ReorderStagesResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ChangeConsultantResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<ChangeConsultantResponse>) { (Object as any).assign(this, init); }
}

export class ResetMaterialProgressResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<ResetMaterialProgressResponse>) { (Object as any).assign(this, init); }
}

export class UpdateObservationActorResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<UpdateObservationActorResponse>) { (Object as any).assign(this, init); }
}

export class UpdateTaskDueDateResponse
{
    public id: number;

    public constructor(init?: Partial<UpdateTaskDueDateResponse>) { (Object as any).assign(this, init); }
}

export class GetTabsIndicatorResponse extends BaseSingleResponse<IndicatorsDto>
{

    public constructor(init?: Partial<GetTabsIndicatorResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateStageBaselineDatesResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<UpdateStageBaselineDatesResponse>) { (Object as any).assign(this, init); }
}

// @Route("/workflow/getallworkflowsquery", "GET")
export class GetAllWorkflowsQuery implements IReturn<GetAllWorkflowsResponse>, IGet
{

    public constructor(init?: Partial<GetAllWorkflowsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAllWorkflowsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAllWorkflowsResponse(); }
}

// @Route("/workflow/getworkflowbyidquery", "GET")
export class GetWorkflowByIdQuery implements IReturn<GetWorkflowByIdResponse>, IGet
{
    public workflowId?: number;
    public sowId?: number;
    public sowSubItemId?: number;

    public constructor(init?: Partial<GetWorkflowByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWorkflowByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetWorkflowByIdResponse(); }
}

// @Route("/workflow/getworkflowsbyids/{ids}", "GET")
export class GetWorkflowsByIds implements IReturn<GetWorkflowsByIdsResponse>, IGet
{
    public ids: number[];

    public constructor(init?: Partial<GetWorkflowsByIds>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWorkflowsByIds'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetWorkflowsByIdsResponse(); }
}

// @Route("/workflow/getworkflowswithactionsquery", "POST")
export class GetWorkflowsWithActionsQuery implements IReturn<GetWorkflowsWithActionsResponse>, IPost
{
    public sowId?: number;
    public requestedWorkflows: WorkflowWithActionRequest[];

    public constructor(init?: Partial<GetWorkflowsWithActionsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWorkflowsWithActionsQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GetWorkflowsWithActionsResponse(); }
}

// @Route("/workflow/getnumberofvisitsforworkflowsquery", "GET")
export class GetNumberOfVisitsForWorkflowsQuery implements IReturn<GetNumberOfVisitsForWorkflowsResponse>, IGet
{
    public workflowIds: number[];
    public visitorType?: ActorType;

    public constructor(init?: Partial<GetNumberOfVisitsForWorkflowsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetNumberOfVisitsForWorkflowsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetNumberOfVisitsForWorkflowsResponse(); }
}

// @Route("/workflow/getnumberofactortasksforworkflowsquery", "GET")
export class GetNumberOfActorTasksForWorkflowsQuery implements IReturn<GetNumberOfActorTasksForWorkflowsResponse>, IGet
{
    // @Required()
    public actorType: ActorType;

    // @Required()
    public workflowIds: number[];

    public constructor(init?: Partial<GetNumberOfActorTasksForWorkflowsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetNumberOfActorTasksForWorkflowsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetNumberOfActorTasksForWorkflowsResponse(); }
}

// @Route("/workflow/getnumberoftasksinworkflowsquery", "GET")
export class GetNumberOfTasksInWorkflowsQuery implements IReturn<BaseSingleResponse<number>>, IGet
{
    public workflowIds: number[];

    public constructor(init?: Partial<GetNumberOfTasksInWorkflowsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetNumberOfTasksInWorkflowsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new BaseSingleResponse<number>(); }
}

// @Route("/workflow/getnumberoftasksperworkflow", "GET")
export class GetNumberOfTasksPerWorkflow implements IReturn<GetNumberOfTasksPerWorkflowResponse>, IGet
{
    public workflowIds: number[];

    public constructor(init?: Partial<GetNumberOfTasksPerWorkflow>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetNumberOfTasksPerWorkflow'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetNumberOfTasksPerWorkflowResponse(); }
}

// @Route("/workflow/saveworkflowactionsvaluescommand", "POST")
export class SaveWorkflowActionsValuesCommand implements IReturn<SaveWorkflowActionsValuesResponse>
{
    public sowId?: number;
    public taskActionModels: TaskActionModel[];

    public constructor(init?: Partial<SaveWorkflowActionsValuesCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SaveWorkflowActionsValuesCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new SaveWorkflowActionsValuesResponse(); }
}

// @Route("/workflow/updateworkflowactiondatavaluecommand", "POST")
export class UpdateWorkflowActionDataValueCommand implements IReturn<UpdateWorkflowActionDataValueResponse>
{
    public sowId?: number;
    public taskActionModels: TaskActionModel[];

    public constructor(init?: Partial<UpdateWorkflowActionDataValueCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateWorkflowActionDataValueCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateWorkflowActionDataValueResponse(); }
}

// @Route("/workflow/startworkflowcommand", "POST")
export class StartWorkflowCommand implements IReturn<StartWorkflowResponse>, IPost
{
    public workflowId?: number;

    public constructor(init?: Partial<StartWorkflowCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'StartWorkflowCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new StartWorkflowResponse(); }
}

// @Route("/workflow/seedworkflowscommand", "POST")
export class SeedWorkflowsCommand implements IReturn<BasicWorkflowResponse>
{
    public workflowManifest: WorkflowManifest;

    public constructor(init?: Partial<SeedWorkflowsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SeedWorkflowsCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new BasicWorkflowResponse(); }
}

// @Route("/workflow/clonetaskactionvaluescommand", "POST")
export class CloneTaskActionValuesCommand implements IReturn<EmptyResponse>, IPost
{
    // @Required()
    public oldSowId: number;

    // @Required()
    public newSowId: number;

    // @Required()
    public sowSubItemUpdateModels: SowSubItemUpdateModel[];

    public constructor(init?: Partial<CloneTaskActionValuesCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CloneTaskActionValuesCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new EmptyResponse(); }
}

// @Route("/workflow/validatestagetemplatequery", "POST")
export class ValidateStageTemplateQuery implements IReturn<ValidateStageTemplateResponse>, IPost
{
    public stageTemplateParts: StageTemplatePartDto[];

    public constructor(init?: Partial<ValidateStageTemplateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ValidateStageTemplateQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ValidateStageTemplateResponse(); }
}

// @Route("/workflow/createcommentcommand", "POST")
export class CreateCommentCommand implements IReturn<CreateCommentCommandResponse>, IPost
{
    public taskUpdateId?: number;
    public description: string;
    public attachmentsIds: string[];

    public constructor(init?: Partial<CreateCommentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateCommentCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateCommentCommandResponse(); }
}

// @Route("/workflow/getcommentsquery", "GET")
export class GetCommentsQuery implements IReturn<GetCommentsQueryResponse>, IGet
{
    public taskUpdateId?: number;

    public constructor(init?: Partial<GetCommentsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCommentsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCommentsQueryResponse(); }
}

// @Route("/workflow/getfullconsultantpaymentquery", "GET")
export class GetFullConsultantPaymentQuery implements IReturn<GetFullConsultantPaymentResponse>, IGet
{
    // @Required()
    public consultantPaymentUserTaskId: number;

    public constructor(init?: Partial<GetFullConsultantPaymentQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFullConsultantPaymentQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetFullConsultantPaymentResponse(); }
}

// @Route("/workflow/listconsultantpaymentquery", "GET")
export class ListConsultantPaymentQuery implements IReturn<ListConsultantPaymentResponse>, IGet
{
    public constructionProjectId?: number;

    public constructor(init?: Partial<ListConsultantPaymentQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConsultantPaymentQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListConsultantPaymentResponse(); }
}

// @Route("/workflow/payconsultantpaymentcommand", "POST")
export class PayConsultantPaymentCommand implements IReturn<PayConsultantPaymentResponse>, IPost
{
    // @Required()
    public consultantPaymentUserTaskId: number;

    public grandTotal?: number;
    public appliedPenaltySubTotal?: number;
    public taxValue?: number;
    public countOfAppliedPenalty?: number;

    public constructor(init?: Partial<PayConsultantPaymentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PayConsultantPaymentCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new PayConsultantPaymentResponse(); }
}

// @Route("/workflow/confirmconsultantpaymentcommand", "POST")
export class ConfirmConsultantPaymentCommand implements IReturn<PayConsultantPaymentResponse>, IPost
{
    // @Required()
    public consultantPaymentUserTaskId: number;

    public constructor(init?: Partial<ConfirmConsultantPaymentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ConfirmConsultantPaymentCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new PayConsultantPaymentResponse(); }
}

// @Route("/workflow/adminupdateprojectconsultantpricecommand", "PUT")
export class AdminUpdateProjectConsultantPriceCommand implements IReturn<AdminUpdateProjectConsultantPriceResponse>, IPut
{
    public constructionProjectId?: number;
    public pricePerMonth?: number;

    public constructor(init?: Partial<AdminUpdateProjectConsultantPriceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AdminUpdateProjectConsultantPriceCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new AdminUpdateProjectConsultantPriceResponse(); }
}

// @Route("/workflow/generateconsultantpaymentcommand", "POST")
export class GenerateConsultantPaymentCommand implements IReturn<GenerateConsultantPaymentResponse>, IPost
{
    public constructionProjectId?: number;
    public dateFrom?: string;
    public dateTo?: string;

    public constructor(init?: Partial<GenerateConsultantPaymentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GenerateConsultantPaymentCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GenerateConsultantPaymentResponse(); }
}

// @Route("/workflow/savedraftresourcecommand", "POST")
export class SaveDraftResourceCommand implements IReturn<SaveDraftResourceResponse>, IPost, IHasDraftResourceRequest
{
    public resourceId?: number;
    public resourceDraftType?: ResourceDraftType;
    public resourceValue: string;

    public constructor(init?: Partial<SaveDraftResourceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SaveDraftResourceCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new SaveDraftResourceResponse(); }
}

// @Route("/workflow/getdraftresourcequery", "GET")
export class GetDraftResourceQuery implements IReturn<GetDraftResourceResponse>, IGet, IHasDraftResourceRequest
{
    public resourceId?: number;
    public resourceDraftType?: ResourceDraftType;

    public constructor(init?: Partial<GetDraftResourceQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetDraftResourceQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetDraftResourceResponse(); }
}

// @Route("/workflow/getmaterialprogressquery", "GET")
export class GetMaterialProgressQuery implements IReturn<GetMaterialProgressResponse>, IGet
{
    // @Required()
    public materialWorkflowSequenceId: number;

    public materialUserTaskId?: number;

    public constructor(init?: Partial<GetMaterialProgressQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetMaterialProgressQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetMaterialProgressResponse(); }
}

// @Route("/workflow/getclientmaterialsquery", "GET")
export class GetClientMaterialsQuery implements IReturn<GetClientMaterialsResponse>, IGet
{
    public constructionProjectId?: number;

    public constructor(init?: Partial<GetClientMaterialsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetClientMaterialsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetClientMaterialsResponse(); }
}

// @Route("/workflow/getmaterialworkflowsquery", "GET")
export class GetMaterialWorkflowsQuery implements IReturn<GetMaterialWorkflowsResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetMaterialWorkflowsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetMaterialWorkflowsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetMaterialWorkflowsResponse(); }
}

// @Route("/workflow/submitmaterialsubmissioncommand", "POST")
export class SubmitMaterialSubmissionCommand implements IReturn<MaterialProgressResponse>, IPost
{
    public materialUserTaskId?: number;
    public isApproved?: boolean;
    public description?: string;

    public constructor(init?: Partial<SubmitMaterialSubmissionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubmitMaterialSubmissionCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MaterialProgressResponse(); }
}

// @Route("/workflow/submitmaterialoptionscommand", "POST")
export class SubmitMaterialOptionsCommand implements IReturn<MaterialProgressResponse>
{
    public materialUserTaskId?: number;
    public materialOptions: OptionDto[];

    public constructor(init?: Partial<SubmitMaterialOptionsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubmitMaterialOptionsCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MaterialProgressResponse(); }
}

// @Route("/workflow/submitselectedoptioncommand", "POST")
export class SubmitSelectedOptionCommand implements IReturn<MaterialProgressResponse>
{
    public materialUserTaskId?: number;
    public selectedOptionId?: number;

    public constructor(init?: Partial<SubmitSelectedOptionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubmitSelectedOptionCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MaterialProgressResponse(); }
}

// @Route("/workflow/submitmaterialsrequestcommand", "POST")
export class SubmitMaterialsRequestCommand implements IReturn<MaterialProgressResponse>
{
    public materialUserTaskId?: number;
    public materialQuantities: QuantityDto[];

    public constructor(init?: Partial<SubmitMaterialsRequestCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubmitMaterialsRequestCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MaterialProgressResponse(); }
}

// @Route("/workflow/submitpurchasedmaterialscommand", "POST")
export class SubmitPurchasedMaterialsCommand implements IReturn<MaterialProgressResponse>
{
    public materialUserTaskId?: number;
    public totalPrice?: number;
    public description: string;
    public attachmentsIds: string[];

    public constructor(init?: Partial<SubmitPurchasedMaterialsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubmitPurchasedMaterialsCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MaterialProgressResponse(); }
}

// @Route("/workflow/submitcompletedworkscommand", "POST")
export class SubmitCompletedWorksCommand implements IReturn<MaterialProgressResponse>
{
    // @Required()
    public materialUserTaskId: number;

    // @Required()
    public isApproved: boolean;

    public description?: string;

    public constructor(init?: Partial<SubmitCompletedWorksCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubmitCompletedWorksCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MaterialProgressResponse(); }
}

// @Route("/workflow/submitsubcontractedmaterialscommand", "POST")
export class SubmitSubContractedMaterialsCommand implements IReturn<MaterialProgressResponse>, IPost
{
    // @Required()
    public materialUserTaskId: number;

    // @Required()
    public totalPrice: number;

    // @Required()
    public subContractedName: string;

    // @Required()
    public description: string;

    // @Required()
    public attachmentsIds: string[];

    public constructor(init?: Partial<SubmitSubContractedMaterialsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubmitSubContractedMaterialsCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MaterialProgressResponse(); }
}

// @Route("/workflow/updatesubcontractedmaterialcommand", "PUT")
export class UpdateSubContractedMaterialCommand implements IReturn<MaterialProgressResponse>, IPut
{
    // @Required()
    public materialUserTaskId: number;

    // @Required()
    public totalPrice: number;

    // @Required()
    public subContractedName: string;

    // @Required()
    public description: string;

    // @Required()
    public attachmentsIds: string[];

    public constructor(init?: Partial<UpdateSubContractedMaterialCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateSubContractedMaterialCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new MaterialProgressResponse(); }
}

// @Route("/workflow/addexpensecommand", "POST")
export class AddExpenseCommand implements IReturn<AddExpenseResponse>, IPost
{
    // @Required()
    public projectId: number;

    // @Required()
    public subContractedMaterialName: string;

    // @Required()
    public totalPrice: number;

    // @Required()
    public subContractedName: string;

    // @Required()
    public description: string;

    // @Required()
    public attachmentsIds: string[];

    public constructor(init?: Partial<AddExpenseCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AddExpenseCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AddExpenseResponse(); }
}

// @Route("/workflow/getlistmaterialnamesquery", "GET")
export class GetListMaterialNamesQuery implements IReturn<GetListMaterialNamesResponse>, IGet
{
    public constructionProjectId?: number;

    public constructor(init?: Partial<GetListMaterialNamesQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetListMaterialNamesQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetListMaterialNamesResponse(); }
}

// @Route("/workflow/startprojectmanagementmodulecommand", "POST")
export class StartProjectManagementModuleCommand implements IReturn<StartProjectManagementModuleResponse>, IPost
{
    public constructionProjectId?: number;

    public constructor(init?: Partial<StartProjectManagementModuleCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'StartProjectManagementModuleCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new StartProjectManagementModuleResponse(); }
}

// @Route("/workflow/getprojectquery", "GET")
export class GetProjectQuery implements IReturn<GetProjectResponse>, IGet, IHasProjectId
{
    public projectId?: number;

    public constructor(init?: Partial<GetProjectQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProjectQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProjectResponse(); }
}

// @Route("/workflow/getprojectstatisticquery", "GET")
export class GetProjectStatisticQuery implements IReturn<GetProjectStatisticResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetProjectStatisticQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProjectStatisticQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProjectStatisticResponse(); }
}

// @Route("/workflow/getworkflowprogressquery", "GET")
export class GetWorkflowProgressQuery implements IReturn<GetWorkflowProgressResponse>, IGet
{
    // @Required()
    public workflowId: number;

    public taskId?: number;

    public constructor(init?: Partial<GetWorkflowProgressQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWorkflowProgressQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetWorkflowProgressResponse(); }
}

// @Route("/workflow/getinvoicedetailsquery", "GET")
export class GetInvoiceDetailsQuery implements IReturn<GetInvoiceDetailsQueryResponse>, IGet
{
    public taskId?: number;

    public constructor(init?: Partial<GetInvoiceDetailsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetInvoiceDetailsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetInvoiceDetailsQueryResponse(); }
}

// @Route("/workflow/getstageusertasksbyidsquery", "GET")
export class GetStageUserTasksByIdsQuery implements IReturn<GetStageUserTasksByIdsResponse>, IGet
{
    public userTaskIds: number[];

    public constructor(init?: Partial<GetStageUserTasksByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStageUserTasksByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStageUserTasksByIdsResponse(); }
}

// @Route("/workflow/getprojectupdatesquery", "POST")
export class GetProjectUpdatesQuery implements IReturn<GetProjectUpdatesResponse>, IPost, IPaginatedRequest
{
    // @Required()
    public page: number;

    // @Required()
    public pageSize: number;

    // @Required()
    public projectId: number;

    // @Required()
    public fileExtensionType: FileExtensionType;

    // @Required()
    public filter: GetProjectUpdatesFilter;

    public constructor(init?: Partial<GetProjectUpdatesQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProjectUpdatesQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GetProjectUpdatesResponse(); }
}

// @Route("/workflow/getprojectupdatequery", "GET")
export class GetProjectUpdateQuery implements IReturn<GetProjectUpdateResponse>, IGet
{
    public taskUpdateId?: number;

    public constructor(init?: Partial<GetProjectUpdateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProjectUpdateQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProjectUpdateResponse(); }
}

// @Route("/workflow/getstageprogressquery", "GET")
export class GetStageProgressQuery implements IReturn<GetStageProgressResponse>, IGet
{
    public stageId?: number;

    public constructor(init?: Partial<GetStageProgressQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStageProgressQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStageProgressResponse(); }
}

// @Route("/workflow/submittasksubmissioncommand", "POST")
export class SubmitTaskSubmissionCommand implements IReturn<BaseProjectManagementResponse>, IPost
{
    // @Required()
    public taskSubmission: CreateTaskSubmissionDto;

    public constructor(init?: Partial<SubmitTaskSubmissionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubmitTaskSubmissionCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new BaseProjectManagementResponse(); }
}

// @Route("/workflow/rejecttasksubmissioncommand", "POST")
export class RejectTaskSubmissionCommand implements IReturn<BaseProjectManagementResponse>, IPost
{
    // @Required()
    public taskSubmission: CreateTaskSubmissionDto;

    public constructor(init?: Partial<RejectTaskSubmissionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RejectTaskSubmissionCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new BaseProjectManagementResponse(); }
}

// @Route("/workflow/getinboxtaskupdatesquery", "POST")
export class GetInboxTaskUpdatesQuery implements IReturn<GetInboxTaskUpdatesResponse>, IPost, IPaginatedRequest
{
    // @Required()
    public projectId: number;

    public filter: TaskUpdateFilter;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<GetInboxTaskUpdatesQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetInboxTaskUpdatesQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GetInboxTaskUpdatesResponse(); }
}

// @Route("/workflow/flagtaskupdatecommand", "POST")
export class FlagTaskUpdateCommand implements IReturn<FLagTaskUpdateResponse>, IPost
{
    // @Required()
    public taskUpdateId: number;

    public constructor(init?: Partial<FlagTaskUpdateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'FlagTaskUpdateCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new FLagTaskUpdateResponse(); }
}

// @Route("/workflow/getinboxtaskupdatequery", "GET")
export class GetInboxTaskUpdateQuery implements IReturn<GetInboxTaskUpdateResponse>, IGet
{
    // @Required()
    public taskUpdateId: number;

    public constructor(init?: Partial<GetInboxTaskUpdateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetInboxTaskUpdateQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetInboxTaskUpdateResponse(); }
}

// @Route("/workflow/getupdatestatisticsquery", "GET")
export class GetUpdateStatisticsQuery implements IReturn<GetUpdateStatisticsResponse>, IGet
{
    public constructionProjectId?: number;

    public constructor(init?: Partial<GetUpdateStatisticsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUpdateStatisticsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUpdateStatisticsResponse(); }
}

// @Route("/workflow/createobservationcommand", "POST")
export class CreateObservationCommand implements IReturn<CreateObservationResponse>, IPost
{
    public projectId?: number;
    public observations: ObservationDto[];
    public isConsultantVisit?: boolean;

    public constructor(init?: Partial<CreateObservationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateObservationCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateObservationResponse(); }
}

// @Route("/workflow/getobservationstageitemsquery", "GET")
export class GetObservationStageItemsQuery implements IReturn<GetObservationStageItemsResponse>
{
    public stageId?: number;

    public constructor(init?: Partial<GetObservationStageItemsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetObservationStageItemsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetObservationStageItemsResponse(); }
}

// @Route("/workflow/getliststagenamequery", "GET")
export class GetListStageNameQuery implements IReturn<GetListStageNameResponse>
{
    public projectId?: number;

    public constructor(init?: Partial<GetListStageNameQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetListStageNameQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetListStageNameResponse(); }
}

// @Route("/workflow/reorderstagescommand", "PUT")
export class ReorderStagesCommand implements IReturn<ReorderStagesResponse>, IPut
{
    public constructionProjectId?: number;
    public stageIdToReplace?: number;
    public stageIdToReplaceWith?: number;

    public constructor(init?: Partial<ReorderStagesCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ReorderStagesCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new ReorderStagesResponse(); }
}

// @Route("/workflow/changeconsultantcommand", "PUT")
export class ChangeConsultantCommand implements IReturn<ChangeConsultantResponse>, IPut
{
    public constructionProjectId?: number;
    public consultantId?: number;
    public dateFrom?: string;
    public dateTo?: string;
    public bankName: string;
    public accountHolderName: string;
    public accountNumber: string;

    public constructor(init?: Partial<ChangeConsultantCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ChangeConsultantCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new ChangeConsultantResponse(); }
}

// @Route("/workflow/resetmaterialprogresscommand", "POST")
export class ResetMaterialProgressCommand implements IReturn<ResetMaterialProgressResponse>, IPost
{
    public constructionProjectId?: number;

    public constructor(init?: Partial<ResetMaterialProgressCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ResetMaterialProgressCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ResetMaterialProgressResponse(); }
}

// @Route("/workflow/updateobservationactorcommand", "PUT")
export class UpdateObservationActorCommand implements IReturn<UpdateObservationActorResponse>, IPut
{
    public updateIds: number[];
    public actorId?: number;
    public actorType?: ActorType;

    public constructor(init?: Partial<UpdateObservationActorCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateObservationActorCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateObservationActorResponse(); }
}

// @Route("/workflow/updatetaskduedatecommand", "PUT")
export class UpdateTaskDueDateCommand implements IReturn<UpdateTaskDueDateResponse>, IPut
{
    public dateTime?: string;
    public constructionProjectId?: number;
    public taskId?: number;

    public constructor(init?: Partial<UpdateTaskDueDateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateTaskDueDateCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateTaskDueDateResponse(); }
}

// @Route("/workflow/gettabsindicatorquery", "GET")
export class GetTabsIndicatorQuery implements IReturn<GetTabsIndicatorResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetTabsIndicatorQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTabsIndicatorQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTabsIndicatorResponse(); }
}

// @Route("/workflow/updatestagebaselinedatescommand", "PUT")
export class UpdateStageBaselineDatesCommand implements IReturn<UpdateStageBaselineDatesResponse>, IPut
{
    public baselineStartDate?: string;
    public baselineFinishDate?: string;
    public constructionProjectId?: number;
    public stageId?: number;

    public constructor(init?: Partial<UpdateStageBaselineDatesCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateStageBaselineDatesCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateStageBaselineDatesResponse(); }
}

