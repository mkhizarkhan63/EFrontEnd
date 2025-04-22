// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2024-07-11 09:38:39
Version: 6.50
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://10.42.5.136:5000/

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

export interface IPatch
{
}

export interface IGet
{
}

export interface IPost
{
}

export interface IDelete
{
}

export interface IPut
{
}

export interface ICompanyManagementQuery
{
    contractorIds?: number[];
    consultantIds?: number[];
}

export interface IPaginatedRequest
{
    page?: number;
    pageSize?: number;
}

export enum ConstructionLandType
{
    None = 0,
    Residential = 1,
    Commercial = 2,
}

export enum ConstructionProjectStatus
{
    None = 0,
    Draft = 1,
    Reviewing = 2,
    Rejected = 3,
    OpenBids = 4,
    ChooseContractor = 5,
    BidSelected = 6,
    ReadyToSign = 7,
    Signed = 8,
    LiveInPm = 9,
    Archived = 10,
}

export enum DesignProjectStatus
{
    None = 0,
    AdminReview = 1,
    ConsultantReview = 2,
    AdvancePayment = 3,
    UploadDrawings = 4,
    FinalPayment = 5,
    Completed = 6,
    Rejected = 10,
}

export class ConstructionProjectFilter
{
    public governorateId?: number;
    public wilayatId?: number;
    public landType?: ConstructionLandType;
    public projectId?: string;
    public constructionStatuses?: ConstructionProjectStatus[];
    public designStatuses?: DesignProjectStatus[];

    public constructor(init?: Partial<ConstructionProjectFilter>) { (Object as any).assign(this, init); }
}

export class ConstructionProjectSort
{
    public idIsAscending?: boolean;
    public createdDateIsAscending?: boolean;
    public modifiedDateIsAscending?: boolean;
    public projectNumberIsAscending?: boolean;
    public clientIdIsAscending?: boolean;
    public contractIdIsAscending?: boolean;
    public consultantIdIsAscending?: boolean;
    public landAreaIsAscending?: boolean;
    public buildingAllAreaInTheDrawingsIsAscending?: boolean;
    public addedBuiltUpAreaIsAscending?: boolean;
    public constructionTypeIsAscending?: boolean;
    public projectStatusIsAscending?: boolean;
    public projectDesignStatusIsAscending?: boolean;
    public landTypeIsAscending?: boolean;
    public startingStepIsAscending?: boolean;
    public additionalCommentIsAscending?: boolean;
    public bidClosingDateIsAscending?: boolean;
    public stagePlanIdIsAscending?: boolean;
    public projectBidIdIsAscending?: boolean;
    public wilayatIdIsAscending?: boolean;
    public governorateIdIsAscending?: boolean;

    public constructor(init?: Partial<ConstructionProjectSort>) { (Object as any).assign(this, init); }
}

export enum AdminProjectView
{
    None = 0,
    Construction = 1,
    Design = 2,
}

export enum ContractorViewType
{
    None = 0,
    NewProjects = 1,
    MyProjects = 2,
    InvitedNewProjects = 3,
}

export enum ProjectStartingStep
{
    None = 0,
    Design = 1,
    Build = 2,
}

export enum ConstructionType
{
    None = 0,
    StructureOnly = 1,
    TurnKey = 2,
}

export enum ConsultantStatusView
{
    None = 0,
    WaitingForClient = 1,
    UploadDrawings = 2,
    SignContract = 3,
    ActiveContract = 4,
    Closed = 5,
}

export class BaseConstructionProjectCommand
{
    // @Required()
    public landArea: number;

    public buildingAllAreaInTheDrawings?: boolean;
    // @Required()
    public addedBuiltUpArea: number;

    public constructionType?: ConstructionType;
    // @Required()
    public landType: ConstructionLandType;

    // @Required()
    public wilayatId: number;

    // @Required()
    public governorateId: number;

    public additionalComment?: string;
    public krookieFiles?: string[];
    public drawingFiles?: string[];
    public changeStatusToReview?: boolean;
    public designId?: number;

    public constructor(init?: Partial<BaseConstructionProjectCommand>) { (Object as any).assign(this, init); }
}

export interface IConstructionProjectDto
{
    landArea?: number;
    buildingAllAreaInTheDrawings?: boolean;
    addedBuiltUpArea?: number;
    constructionType?: ConstructionType;
    landType?: ConstructionLandType;
    wilayatId?: number;
    governorateId?: number;
    additionalComment?: string;
}

export enum OperationType
{
    Unknown = 0,
    Add = 1,
    Remove = 2,
    Replace = 3,
    Move = 4,
    Copy = 5,
    Test = 6,
}

export class JsonPatchElement
{
    public operation?: OperationType;
    public path: string;
    public value: unknown;

    public constructor(init?: Partial<JsonPatchElement>) { (Object as any).assign(this, init); }
}

export class JsonPatchRequest
{
    public operations: JsonPatchElement[];

    public constructor(init?: Partial<JsonPatchRequest>) { (Object as any).assign(this, init); }
}

export class BasePatchRequest<T> extends JsonPatchRequest implements IPatch
{
    public id: T;

    public constructor(init?: Partial<BasePatchRequest<T>>) { super(init); (Object as any).assign(this, init); }
}

export enum BidClosingDateOption
{
    None = 0,
    AddWeek = 1,
    EndBiddingTime = 2,
}

export enum DesignProjectTrigger
{
    None = 0,
    AdminReview = 1,
    ConsultantReview = 2,
    Payment = 3,
    UploadDrawings = 4,
    SubmitDrawings = 5,
    Reject = 6,
    Accept = 7,
}

export enum ContextType
{
    None = 0,
    Client = 1,
    Contractor = 2,
    Consultant = 3,
    Supplier = 4,
    Admin = 5,
}

export enum DictionaryName
{
    None = 0,
    Governorate = 1,
    Wilayat = 2,
}

export class BaseProjectBidCommand
{
    public totalPrice?: number;
    public structureItemsTotalPrice?: number;
    public turnkeyItemsTotalPrice?: number;
    public totalDays?: number;
    public numberOfCurrentProjects?: number;
    public message?: string;

    public constructor(init?: Partial<BaseProjectBidCommand>) { (Object as any).assign(this, init); }
}

export interface IProjectBidDto
{
    totalPrice?: number;
    structureItemsTotalPrice?: number;
    turnkeyItemsTotalPrice?: number;
    totalDays?: number;
    numberOfCurrentProjects?: number;
    message?: string;
    projectId?: number;
}

export class ProjectBidCostItemDto
{
    public name?: string;
    public translationKey?: string;
    public quantity?: number;
    public quantityUnit?: string;
    public price?: number;
    public bidCostId?: number;
    public id: number;

    public constructor(init?: Partial<ProjectBidCostItemDto>) { (Object as any).assign(this, init); }
}

export class ProjectBidCostDto
{
    public constructionType?: ConstructionType;
    public rials?: boolean;
    public totalPrice?: number;
    public bidId?: number;
    public costItems?: ProjectBidCostItemDto[];
    public id: number;

    public constructor(init?: Partial<ProjectBidCostDto>) { (Object as any).assign(this, init); }
}

export enum StageTemplatePlanStage
{
    None = 0,
    Mobilization = 1,
    Structure = 2,
    InternalFinishes = 3,
    ExternalFinishes = 4,
    Handover = 5,
    Maintenance = 6,
}

export class ProjectBidStageUnitDto implements IProjectBidStageUnitDto
{
    public sowItems?: number[];
    public id: number;
    public orderNumber?: number;
    public stageName?: string;
    public suggestedPercentage?: number;
    public suggestedTime?: number;
    public description?: string;
    public stageNameArabic?: string;
    public descriptionArabic?: string;
    public valueOfStageInPercentage?: number;
    public valueOfStageInOmr?: number;
    public timeOfStage?: number;
    public stagePartId?: number;

    public constructor(init?: Partial<ProjectBidStageUnitDto>) { (Object as any).assign(this, init); }
}

export class ProjectBidStagePartDto implements IProjectBidStagePartDto
{
    public id: number;
    public planStage?: StageTemplatePlanStage;
    public limitPercentage?: number;
    public totalDays?: number;
    public bidId?: number;
    public stageUnits?: ProjectBidStageUnitDto[];

    public constructor(init?: Partial<ProjectBidStagePartDto>) { (Object as any).assign(this, init); }
}

export interface ICreateQuestionCommand extends IBaseQuestionCommand
{
    projectId?: number;
}

export interface IBaseQuestionCommand
{
    question?: string;
    answer?: string;
}

export enum UpdateQuestionAction
{
    None = 0,
    Question = 1,
    Answer = 2,
    QuestionAndAnswer = 3,
}

export interface IUpdateQuestionCommand extends IBaseQuestionCommand
{
    id: number;
    answerId?: number;
    questionAction?: UpdateQuestionAction;
}

export class ListSowItemSorts
{
    public orderNumberIsAscending?: boolean;
    public englishNameIsAscending?: boolean;
    public arabicNameIsAscending?: boolean;
    public showItemInFrontendIsAscending?: boolean;
    public numberOfSpecsIsAscending?: boolean;
    public numberOfWorkflowsIsAscending?: boolean;
    public consultantVisitsIsAscending?: boolean;
    public iconFileIdIsAscending?: boolean;

    public constructor(init?: Partial<ListSowItemSorts>) { (Object as any).assign(this, init); }
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
    public englishDescription?: string;
    public arabicDescription?: string;
    public titleEnglish?: string;
    public titleArabic?: string;
    public supplier?: string;
    public rate?: number;
    public acceptanceWorkflow?: number;
    public itemId?: number;
    public orderNumber?: number;

    public constructor(init?: Partial<BaseSowItemUnit>) { (Object as any).assign(this, init); }
}

export enum ActionType
{
    None = 0,
    Empty = 1,
    DatePicker = 2,
    Checklist = 3,
    Payment = 4,
}

export enum ActorType
{
    Client = 0,
    Contractor = 1,
    Consultant = 2,
    Supplier = 3,
    None = -1,
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
    public workflowTaskDtos?: WorkflowTaskDto[];

    public constructor(init?: Partial<SowSubItemActionModel>) { (Object as any).assign(this, init); }
}

export class TaskActionModel
{
    public workflowId?: number;
    public sowSubItemActions?: SowSubItemActionModel[];

    public constructor(init?: Partial<TaskActionModel>) { (Object as any).assign(this, init); }
}

export class SowItemUnitDto extends BaseSowItemUnit implements ISowItemUnitDto
{
    public id: number;
    public acceptanceWorkflowName?: string;
    public taskActionModel?: TaskActionModel;

    public constructor(init?: Partial<SowItemUnitDto>) { super(init); (Object as any).assign(this, init); }
}

export class BaseSowItem
{
    public englishName?: string;
    public arabicName?: string;
    public showItemInFrontend?: boolean;
    public isMandatory?: boolean;
    public numberOfSpecs?: number;
    public numberOfWorkflows?: number;
    public consultantVisits?: number;
    public iconFileId?: string;
    public category?: SowItemCategory;
    public versionId?: number;
    public itemUnits?: SowItemUnitDto[];

    public constructor(init?: Partial<BaseSowItem>) { (Object as any).assign(this, init); }
}

export interface ISowItemDto
{
    englishName?: string;
    arabicName?: string;
    showItemInFrontend?: boolean;
    isMandatory?: boolean;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    category?: SowItemCategory;
    versionId?: number;
}

export class OrderDto
{
    public id: number;
    public orderNumber?: number;

    public constructor(init?: Partial<OrderDto>) { (Object as any).assign(this, init); }
}

export interface ISowItemUnitDto
{
    englishDescription?: string;
    arabicDescription?: string;
    titleEnglish?: string;
    titleArabic?: string;
    supplier?: string;
    rate?: number;
    acceptanceWorkflow?: number;
    itemId?: number;
}

export class SowVersionSort
{
    public idIsAscending?: boolean;
    public statusIsAscending?: boolean;
    public usedFromIsAscending?: boolean;
    public usedToIsAscending?: boolean;
    public createdOnIsAscending?: boolean;

    public constructor(init?: Partial<SowVersionSort>) { (Object as any).assign(this, init); }
}

export interface ISowVersionDto
{
    contractName?: string;
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
    public stageName?: string;
    public suggestedPercentage?: number;
    public suggestedTime?: number;
    public description?: string;
    public stageNameArabic?: string;
    public descriptionArabic?: string;
    public sowItems?: number[];

    public constructor(init?: Partial<BaseStageUnit>) { (Object as any).assign(this, init); }
}

export class StagePlanUnitDto extends BaseStageUnit
{
    public planPartId?: number;
    public id: number;

    public constructor(init?: Partial<StagePlanUnitDto>) { super(init); (Object as any).assign(this, init); }
}

export class StagePlanPartDto extends BaseStagePlanPart
{
    public id: number;
    public planId?: number;
    public planUnits?: StagePlanUnitDto[];

    public constructor(init?: Partial<StagePlanPartDto>) { super(init); (Object as any).assign(this, init); }
}

export class BaseStage
{
    // @Required()
    public templateName: string;

    public stageLevels?: number;
    public projectScope?: number;
    public numberOfInspections?: number;
    public projectScopeTwo?: number;
    public projectInUse?: number;
    public basement?: number;
    public additionalFloors?: number;
    public outerBlocks?: number;
    public groundFloor?: boolean;
    public levellingFloor?: boolean;
    public penthouseFloor?: boolean;
    public pool?: boolean;
    // @Required()
    public sowVersionId: number;

    public constructor(init?: Partial<BaseStage>) { (Object as any).assign(this, init); }
}

export interface IStagePlanDto extends IBaseStage
{
    planParts?: StagePlanPartDto[];
}

export interface IBaseStage
{
    templateName?: string;
    stageLevels?: number;
    projectScope?: number;
    numberOfInspections?: number;
    projectScopeTwo?: number;
    projectInUse?: number;
    basement?: number;
    additionalFloors?: number;
    outerBlocks?: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
    sowVersionId?: number;
}

export class StageTemplateSort
{
    public idIsAscending?: boolean;
    public modifiedDateIsAscending?: boolean;

    public constructor(init?: Partial<StageTemplateSort>) { (Object as any).assign(this, init); }
}

export class StageFilter
{
    public basement?: number;
    public additionalFloors?: number;
    public outerBlocks?: number;
    public groundFloor?: boolean;
    public levellingFloor?: boolean;
    public penthouseFloor?: boolean;
    public pool?: boolean;

    public constructor(init?: Partial<StageFilter>) { (Object as any).assign(this, init); }
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
    public templateUnits?: StageTemplateUnitDto[];

    public constructor(init?: Partial<StageTemplatePartDto>) { super(init); (Object as any).assign(this, init); }
}

export interface IStageTemplateDto extends IBaseStage
{
    templateParts?: StageTemplatePartDto[];
}

export interface IStageTemplatePartDto
{
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
    templateId?: number;
    templateUnits?: StageTemplateUnitDto[];
}

export interface IStageTemplateUnitDto
{
    orderNumber?: number;
    stageName?: string;
    suggestedPercentage?: number;
    description?: string;
    stageNameArabic?: string;
    descriptionArabic?: string;
    sowItems?: number[];
    templatePartId?: number;
}

export interface IUserManagementQuery
{
    profileId?: number;
    consultantIds?: number[];
    contractorIds?: number[];
}

export class TaskActionUpdateDto
{
    public sowSubItemId?: number;
    public hash?: string;

    public constructor(init?: Partial<TaskActionUpdateDto>) { (Object as any).assign(this, init); }
}

export class CompanyManagementStatisticsDto
{
    public projectsParticipated?: number;
    public projectsAwarded?: number;
    public companyId?: number;

    public constructor(init?: Partial<CompanyManagementStatisticsDto>) { (Object as any).assign(this, init); }
}

export class CompaniesManagementStatisticsDto
{
    public contractorStatistics?: CompanyManagementStatisticsDto[];
    public consultantStatistics?: CompanyManagementStatisticsDto[];

    public constructor(init?: Partial<CompaniesManagementStatisticsDto>) { (Object as any).assign(this, init); }
}

export class BaseSingleResponse<T>
{
    public result: T;

    public constructor(init?: Partial<BaseSingleResponse<T>>) { (Object as any).assign(this, init); }
}

export class AdminPanelConstructionProjectInfoDto
{
    public id: number;
    public projectNumber?: string;
    public floorLevels?: string;
    public wilayatId?: number;
    public governorateId?: number;
    public addedBuiltUpArea?: number;
    public landType?: ConstructionLandType;
    public projectStatus?: ConstructionProjectStatus;
    public startingStep?: ProjectStartingStep;
    public designProjectStatus?: DesignProjectStatus;

    public constructor(init?: Partial<AdminPanelConstructionProjectInfoDto>) { (Object as any).assign(this, init); }
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

export class BaseConstructionProjectDto implements IHasApprover
{
    public projectNumber?: string;
    public floorLevels?: string;
    public modifiedDate?: string;
    public projectStatus?: ConstructionProjectStatus;
    public clientId?: number;
    public contractId?: number;
    public consultantId?: number;
    public landArea?: number;
    public buildingAllAreaInTheDrawings?: boolean;
    public addedBuiltUpArea?: number;
    public constructionType?: ConstructionType;
    public landType?: ConstructionLandType;
    public startingStep?: ProjectStartingStep;
    public wilayatId?: number;
    public governorateId?: number;
    public additionalComment?: string;
    public bidClosingDate?: string;
    public krookieFiles?: string[];
    public drawingFiles?: string[];
    public stagePlanId?: number;
    public projectBidId?: number;
    public designId?: number;
    public designProjectStatus?: DesignProjectStatus;
    public designStageTemplateId?: number;
    public designSowId?: number;
    public designConsultantId?: number;
    public contractorId?: number;
    public numberOfTimeExtension?: number;
    public approverId?: number;

    public constructor(init?: Partial<BaseConstructionProjectDto>) { (Object as any).assign(this, init); }
}

export class SubjectInformationDto
{
    public subjectId?: number;
    public name?: string;
    public avatar?: string;
    public email?: string;
    public phone?: string;

    public constructor(init?: Partial<SubjectInformationDto>) { (Object as any).assign(this, init); }
}

export class ProjectDatesDto
{
    public draftDate?: string;
    public engineerReviewDate?: string;
    public contractorsBiddingDate?: string;
    public chooseContractorDate?: string;
    public contractReadyForSignatureDate?: string;
    public contractSignedDate?: string;
    public projectId?: number;

    public constructor(init?: Partial<ProjectDatesDto>) { (Object as any).assign(this, init); }
}

export class ConstructionProjectExtendedDto extends BaseConstructionProjectDto implements IConstructionProjectDto
{
    public id: number;
    public client?: SubjectInformationDto;
    public consultant?: SubjectInformationDto;
    public contractor?: SubjectInformationDto;
    public designConsultant?: SubjectInformationDto;
    public governorateDisplayName?: string;
    public wilayatDisplayName?: string;
    public stageTemplateId?: number;
    public totalVisitsForBid?: number;
    public projectDatesDto?: ProjectDatesDto;
    public contractorInvitationCount?: number;
    public consultantInvitationCount?: number;

    public constructor(init?: Partial<ConstructionProjectExtendedDto>) { super(init); (Object as any).assign(this, init); }
}

export enum InvitationStatus
{
    None = 0,
    Active = 1,
    Declined = 2,
    Approved = 3,
}

export enum InvitationType
{
    None = 0,
    Design = 1,
    Supervision = 2,
    Bid = 3,
}

export class ConstructionProjectWithInviteDto extends BaseConstructionProjectDto implements IConstructionProjectDto
{
    public id: number;
    public invitationId?: number;
    public invitationStatus?: InvitationStatus;
    public invitationType?: InvitationType;
    public invitationConsultantId?: number;
    public invitationDate?: string;
    public clientInformation?: SubjectInformationDto;

    public constructor(init?: Partial<ConstructionProjectWithInviteDto>) { super(init); (Object as any).assign(this, init); }
}

export class ConstructionProjectDto extends BaseConstructionProjectDto implements IConstructionProjectDto
{
    public id: number;

    public constructor(init?: Partial<ConstructionProjectDto>) { super(init); (Object as any).assign(this, init); }
}

export class ConstructionProjectWithInvitationDto
{
    public projectId?: number;
    public currentlyInvitedConsultantId?: number;

    public constructor(init?: Partial<ConstructionProjectWithInvitationDto>) { (Object as any).assign(this, init); }
}

export enum BidStatus
{
    None = 0,
    Draft = 1,
    Continue = 2,
    Submitted = 3,
    Archived = 4,
    Expired = 5,
}

export class ConstructionProjectWithBidDto extends BaseConstructionProjectDto implements IConstructionProjectDto
{
    public id: number;
    public bidId?: number;
    public bidStatus?: BidStatus;
    public invitationId?: number;
    public invitationType?: InvitationType;

    public constructor(init?: Partial<ConstructionProjectWithBidDto>) { super(init); (Object as any).assign(this, init); }
}

export enum NewProjectType
{
    Default = 0,
    ConsultantInvited = 1,
    DesignSelected = 2,
    ContractorInvited = 3,
    ContinueBidding = 4,
}

export class NewConstructionProjectDto
{
    public id: number;
    public bidClosingDate?: string;
    public floorLevels?: string;
    public landType?: ConstructionLandType;
    public landArea?: number;
    public startingStep?: ProjectStartingStep;
    public projectStatus?: ConstructionProjectStatus;
    public wilayatId?: number;
    public governorateId?: number;
    public clientId?: number;
    public contractorBidId?: number;
    public newProjectType?: NewProjectType;

    public constructor(init?: Partial<NewConstructionProjectDto>) { (Object as any).assign(this, init); }
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

export class BasePostOperationResult<T> extends OperationResult
{
    public id: T;

    public constructor(init?: Partial<BasePostOperationResult<T>>) { super(init); (Object as any).assign(this, init); }
}

export class PostOperationResult extends BasePostOperationResult<number>
{

    public constructor(init?: Partial<PostOperationResult>) { super(init); (Object as any).assign(this, init); }
}

export class BaseDeleteOperationResult<T> extends OperationResult
{
    public id: T;

    public constructor(init?: Partial<BaseDeleteOperationResult<T>>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteOperationResult extends BaseDeleteOperationResult<number>
{

    public constructor(init?: Partial<DeleteOperationResult>) { super(init); (Object as any).assign(this, init); }
}

export class BasePatchOperationResult<T> extends OperationResult
{
    public id: T;

    public constructor(init?: Partial<BasePatchOperationResult<T>>) { super(init); (Object as any).assign(this, init); }
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

export class ProjectNameDto
{
    public projectName?: string;

    public constructor(init?: Partial<ProjectNameDto>) { (Object as any).assign(this, init); }
}

export class ConstructionProjectReviewDto
{
    public id: number;
    public constructionProjectId?: number;
    public reviewerId?: number;
    public reviewerType?: ActorType;
    public isApproved?: boolean;
    public comment?: string;

    public constructor(init?: Partial<ConstructionProjectReviewDto>) { (Object as any).assign(this, init); }
}

export class InviteMyOwnValidationErrors
{
    public projectHasValidStatus?: boolean;
    public maximumInvitationCountHasNotBeenReached?: boolean;
    public isNotAlreadyInvited?: boolean;
    public isValid?: boolean;

    public constructor(init?: Partial<InviteMyOwnValidationErrors>) { (Object as any).assign(this, init); }
}

export class ReferralValidation
{
    public companyDoesNotExist?: boolean;

    public constructor(init?: Partial<ReferralValidation>) { (Object as any).assign(this, init); }
}

export class ConstructionInvitationDto
{
    public id: number;
    public companyId?: number;
    public companyType?: ContextType;
    public invitationStatus?: InvitationStatus;
    public phoneNumber?: string;
    public ownerName?: string;
    public companyName?: string;
    public companyNameArabic?: string;
    public companyLogoId?: string;
    public invitationDate?: string;

    public constructor(init?: Partial<ConstructionInvitationDto>) { (Object as any).assign(this, init); }
}

export class BidSubmittedDto
{
    public id: number;
    public contractorId?: number;
    public bidStatus?: BidStatus;

    public constructor(init?: Partial<BidSubmittedDto>) { (Object as any).assign(this, init); }
}

export class ContractorParticipationDto
{
    public contractorInvitations?: ConstructionInvitationDto[];
    public bidsSubmitted?: BidSubmittedDto[];

    public constructor(init?: Partial<ContractorParticipationDto>) { (Object as any).assign(this, init); }
}

export class DictionaryDataDto
{
    public displayName?: string;
    public translationKey?: string;
    public id: number;

    public constructor(init?: Partial<DictionaryDataDto>) { (Object as any).assign(this, init); }
}

export class ConstructionGovernorateDto extends DictionaryDataDto
{
    public abbreviation?: string;

    public constructor(init?: Partial<ConstructionGovernorateDto>) { super(init); (Object as any).assign(this, init); }
}

export class ConstructionWilayatDto extends DictionaryDataDto
{
    public governorateId?: number;

    public constructor(init?: Partial<ConstructionWilayatDto>) { super(init); (Object as any).assign(this, init); }
}

export class ProjectBidDto implements IProjectBidDto
{
    public bidCosts?: ProjectBidCostDto[];
    public stageParts?: ProjectBidStagePartDto[];
    public id: number;
    public totalPrice?: number;
    public structureItemsTotalPrice?: number;
    public turnkeyItemsTotalPrice?: number;
    public totalDays?: number;
    public numberOfCurrentProjects?: number;
    public message?: string;
    public contractorId?: number;
    public projectId?: number;
    public bidStatus?: BidStatus;

    public constructor(init?: Partial<ProjectBidDto>) { (Object as any).assign(this, init); }
}

export class ProjectAnswerDto implements IProjectAnswerDto
{
    public modifiedDate?: string;
    public createdDate?: string;
    public id: number;
    public responderId?: number;
    public answer?: string;
    public questionId?: number;

    public constructor(init?: Partial<ProjectAnswerDto>) { (Object as any).assign(this, init); }
}

export class BaseProjectQuestion
{
    public questionerId?: number;
    public contextType?: ContextType;
    public question?: string;
    public projectId?: number;
    public answers?: ProjectAnswerDto[];

    public constructor(init?: Partial<BaseProjectQuestion>) { (Object as any).assign(this, init); }
}

export class ProjectQuestionDto extends BaseProjectQuestion implements IProjectQuestionDto
{
    public modifiedDate?: string;
    public createdDate?: string;
    public id: number;
    public avatarId?: string;

    public constructor(init?: Partial<ProjectQuestionDto>) { super(init); (Object as any).assign(this, init); }
}

export class SowItemDto extends BaseSowItem implements ISowItemDto
{
    public orderNumber?: number;
    public id: number;

    public constructor(init?: Partial<SowItemDto>) { super(init); (Object as any).assign(this, init); }
}

export class FullSowItemDto
{
    public sowItem?: SowItemDto;
    public workflows?: WorkflowDto[];

    public constructor(init?: Partial<FullSowItemDto>) { (Object as any).assign(this, init); }
}

export class SowItemWithInstallationDto extends SowItemDto
{
    public installation?: boolean;

    public constructor(init?: Partial<SowItemWithInstallationDto>) { super(init); (Object as any).assign(this, init); }
}

export class ProjectMaterialsDto
{
    public contractorItems?: SowItemDto[];
    public clientItems?: SowItemWithInstallationDto[];

    public constructor(init?: Partial<ProjectMaterialsDto>) { (Object as any).assign(this, init); }
}

export enum SowItemVisibility
{
    None = 0,
    MasterItem = 1,
    Hidden = 2,
}

export enum SowItemChangeStatus
{
    None = 0,
    Unchanged = 1,
    Changed = 2,
    Removed = 3,
}

export class SowItemWithUsageAmountDto extends SowItemDto
{
    public amount?: number;
    public itemVisibility?: SowItemVisibility;
    public changeStatus?: SowItemChangeStatus;
    public timeOfItem?: string;

    public constructor(init?: Partial<SowItemWithUsageAmountDto>) { super(init); (Object as any).assign(this, init); }
}

export enum SowAndStageStatus
{
    None = 0,
    Drafted = 1,
    Live = 2,
    Inactive = 3,
}

export class SowVersionDto implements ISowVersionDto
{
    public status?: SowAndStageStatus;
    public items?: SowItemDto[];
    public id: number;
    public contractName?: string;
    public usedFrom?: string;
    public usedTo?: string;
    public numberOfItems?: number;
    public createdDate?: string;

    public constructor(init?: Partial<SowVersionDto>) { (Object as any).assign(this, init); }
}

export class StagePlanDto extends BaseStage implements IStagePlanDto
{
    public projectId?: number;
    public stageId?: string;
    public id: number;
    public planParts?: StagePlanPartDto[];

    public constructor(init?: Partial<StagePlanDto>) { super(init); (Object as any).assign(this, init); }
}

export class StageTemplateDto extends BaseStage implements IStageTemplateDto
{
    public status?: SowAndStageStatus;
    public stageId?: string;
    public modifiedDate?: string;
    public id: number;
    public masterSowVersionId?: number;
    public templateParts?: StageTemplatePartDto[];

    public constructor(init?: Partial<StageTemplateDto>) { super(init); (Object as any).assign(this, init); }
}

export class UserManagementStatisticsDto
{
    public userId?: number;
    public numberOfProjects?: number;

    public constructor(init?: Partial<UserManagementStatisticsDto>) { (Object as any).assign(this, init); }
}

export interface IProjectBidStagePartDto
{
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
    totalDays?: number;
    bidId?: number;
    stageUnits?: ProjectBidStageUnitDto[];
}

export interface IHasApprover
{
    approverId?: number;
}

export enum ActorType
{
    None = 0,
    Admin = 1,
    Consultant = 2,
    Client = 3,
}

export interface IProjectQuestionDto
{
    question?: string;
    projectId?: number;
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

export interface IProjectBidStageUnitDto
{
    orderNumber?: number;
    stageName?: string;
    suggestedPercentage?: number;
    description?: string;
    stageNameArabic?: string;
    descriptionArabic?: string;
    valueOfStageInPercentage?: number;
    valueOfStageInOmr?: number;
    timeOfStage?: number;
    stagePartId?: number;
}

export interface IProjectAnswerDto
{
    answer?: string;
    questionId?: number;
    responderId?: number;
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

export interface IHasSowSubItemId
{
    sowSubItemId?: number;
}

export interface IWorkflowTask extends IHasId, IHasNameFull, IHasDescriptionFull, IHasOrder, IHasActor
{
    defaultTaskTime?: string;
    actionType?: ActionType;
}

export interface IHasOrder
{
    order?: number;
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

export class GetCompanyManagementStatisticsResponse extends BaseSingleResponse<CompaniesManagementStatisticsDto>
{

    public constructor(init?: Partial<GetCompanyManagementStatisticsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetCompanyManagementProjectsCountResponse extends BaseSingleResponse<number>
{

    public constructor(init?: Partial<GetCompanyManagementProjectsCountResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListCompanyManagementProjectsInfoResponse extends BaseMultipleResultResponse<AdminPanelConstructionProjectInfoDto>
{

    public constructor(init?: Partial<ListCompanyManagementProjectsInfoResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetCompanyAwardedSortResponse
{
    public statistics?: CompanyManagementStatisticsDto[];
    public companyIds?: number[];
    public amountOfIds?: number;

    public constructor(init?: Partial<GetCompanyAwardedSortResponse>) { (Object as any).assign(this, init); }
}

export class ListConstructionProjectResponse extends BaseMultipleResultResponse<ConstructionProjectExtendedDto>
{

    public constructor(init?: Partial<ListConstructionProjectResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListConstructionProjectForConsultantContextResponse extends BaseMultipleResultResponse<ConstructionProjectWithInviteDto>
{

    public constructor(init?: Partial<ListConstructionProjectForConsultantContextResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectForConsultantContextResponse extends BaseSingleResponse<ConstructionProjectDto>
{

    public constructor(init?: Partial<GetConstructionProjectForConsultantContextResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectForConsultantResponse extends BaseSingleResponse<ConstructionProjectWithInviteDto>
{

    public constructor(init?: Partial<GetConstructionProjectForConsultantResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectWithConsultantInvitedResponse extends BaseSingleResponse<ConstructionProjectWithInvitationDto>
{

    public constructor(init?: Partial<GetConstructionProjectWithConsultantInvitedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectWithInvitationByProjectIdResponse extends BaseMultipleResultResponse<ConstructionProjectWithInvitationDto>
{

    public constructor(init?: Partial<GetConstructionProjectWithInvitationByProjectIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListConstructionProjectWithInvitationByProjectIdResponse extends BaseMultipleResultResponse<ConstructionProjectWithInvitationDto>
{

    public constructor(init?: Partial<ListConstructionProjectWithInvitationByProjectIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListConstructionProjectByStatusResponse extends BaseMultipleResultResponse<ConstructionProjectDto>
{

    public constructor(init?: Partial<ListConstructionProjectByStatusResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListConstructionProjectWithBidResponse extends BaseMultipleResultResponse<ConstructionProjectWithBidDto>
{

    public constructor(init?: Partial<ListConstructionProjectWithBidResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListConstructionProjectByStatusAndContractorResponse extends BaseMultipleResultResponse<ConstructionProjectWithBidDto>
{

    public constructor(init?: Partial<ListConstructionProjectByStatusAndContractorResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListConstructionProjectByStatusAndConsultantResponse extends BaseMultipleResultResponse<ConstructionProjectDto>
{

    public constructor(init?: Partial<ListConstructionProjectByStatusAndConsultantResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListNewConstructionProjectsResponse extends BaseMultipleResultResponse<NewConstructionProjectDto>
{

    public constructor(init?: Partial<ListNewConstructionProjectsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectResponse extends BaseSingleResponse<ConstructionProjectExtendedDto>
{

    public constructor(init?: Partial<GetConstructionProjectResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectWithBidResponse extends BaseSingleResponse<ConstructionProjectWithBidDto>
{

    public constructor(init?: Partial<GetConstructionProjectWithBidResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetEbinaaProjectStatisticsResponse extends OperationResult
{
    public totalProjects?: number;
    public projectsConstruction?: number;
    public projectsDesign?: number;
    public totalValueOfProject?: number;

    public constructor(init?: Partial<GetEbinaaProjectStatisticsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectStatisticsResponse extends OperationResult
{
    public draft?: number;
    public adminReview?: number;
    public rejected?: number;
    public contractBidding?: number;
    public chooseContractor?: number;
    public clientAddServices?: number;
    public contractReady?: number;
    public signed?: number;
    public liveInPm?: number;
    public archived?: number;
    public designDraft?: number;
    public designAdminReview?: number;
    public designConsultantApprove?: number;
    public designAdvancePayment?: number;
    public designUploadDrawings?: number;
    public designFinalPayment?: number;
    public designCompleted?: number;
    public designRejected?: number;

    public constructor(init?: Partial<GetConstructionProjectStatisticsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectStatisticsByContractorResponse extends OperationResult
{
    public openBidsCount?: number;
    public chooseContractorCount?: number;
    public bidSelectedCount?: number;
    public readyToSignCount?: number;
    public signedCount?: number;
    public liveInPmCount?: number;
    public archivedCount?: number;
    public allCount?: number;

    public constructor(init?: Partial<GetConstructionProjectStatisticsByContractorResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectStatisticsByConsultantResponse extends OperationResult
{
    public openBidsCount?: number;
    public chooseContractorCount?: number;
    public bidSelectedCount?: number;
    public readyToSignCount?: number;
    public signedCount?: number;
    public liveInPmCount?: number;
    public archivedCount?: number;
    public designAdvancePayment?: number;
    public designUploadDrawings?: number;
    public designFinalPayment?: number;
    public designCompleted?: number;
    public designRejected?: number;
    public allCount?: number;

    public constructor(init?: Partial<GetConstructionProjectStatisticsByConsultantResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConstructionProjectResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateConstructionProjectResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteConstructionProjectResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteConstructionProjectResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchConstructionProjectResponse extends BasePatchOperationResult<number>
{

    public constructor(init?: Partial<PatchConstructionProjectResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConstructionProjectResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectStatusToRejectedResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConstructionProjectStatusToRejectedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectStatusToBidSelectedResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConstructionProjectStatusToBidSelectedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectStatusToReadyToSignResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConstructionProjectStatusToReadyToSignResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectStatusToSignedResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConstructionProjectStatusToSignedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectStatusToLiveInPmResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConstructionProjectStatusToLiveInPmResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectStatusToArchivedResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConstructionProjectStatusToArchivedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateUnArchiveProjectResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateUnArchiveProjectResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ChangeProjectConsultantResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<ChangeProjectConsultantResponse>) { (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectContractIdResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConstructionProjectContractIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetProjectNameResponse extends BaseSingleResponse<ProjectNameDto>
{

    public constructor(init?: Partial<GetProjectNameResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectBidClosingDateResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConstructionProjectBidClosingDateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class BaseConstructionProjectOperationResult extends OperationResult
{

    public constructor(init?: Partial<BaseConstructionProjectOperationResult>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateDesignProjectStatusResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateDesignProjectStatusResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConstructionProjectReviewResponse extends OperationResult
{
    public reviewId?: number;

    public constructor(init?: Partial<CreateConstructionProjectReviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConstructionProjectReviewsResponse extends BaseMultipleResultResponse<ConstructionProjectReviewDto>
{

    public constructor(init?: Partial<GetConstructionProjectReviewsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConstructionProjectInvitationResponse extends PostOperationResult
{
    public projectInvitationId?: number;

    public constructor(init?: Partial<CreateConstructionProjectInvitationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateMyOwnInvitationResponse
{
    public isSuccess?: boolean;
    public errors: InviteMyOwnValidationErrors;
    public referralValidation?: ReferralValidation;

    public constructor(init?: Partial<CreateMyOwnInvitationResponse>) { (Object as any).assign(this, init); }
}

export class UpdateMyOwnCompanyInvitationResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<UpdateMyOwnCompanyInvitationResponse>) { (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectInvitationStatusToApprovedResponse extends PutOperationResult
{
    public constructionProjectId?: number;

    public constructor(init?: Partial<UpdateConstructionProjectInvitationStatusToApprovedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConstructionProjectInvitationStatusToDeclinedResponse extends PutOperationResult
{
    public constructionProjectInvitationId?: number;

    public constructor(init?: Partial<UpdateConstructionProjectInvitationStatusToDeclinedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListInvitationByProjectIdResponse
{
    public result?: ConstructionInvitationDto[];

    public constructor(init?: Partial<ListInvitationByProjectIdResponse>) { (Object as any).assign(this, init); }
}

export class ListContractorInvitationByProjectIdResponse
{
    public result?: ContractorParticipationDto;

    public constructor(init?: Partial<ListContractorInvitationByProjectIdResponse>) { (Object as any).assign(this, init); }
}

export class DeleteConsultantInvitationResponse extends BaseDeleteOperationResult<number>
{

    public constructor(init?: Partial<DeleteConsultantInvitationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListDictionaryDataResponse
{
    public governorates?: ConstructionGovernorateDto[];
    public wilayats?: ConstructionWilayatDto[];

    public constructor(init?: Partial<ListDictionaryDataResponse>) { (Object as any).assign(this, init); }
}

export class ListOneDictionaryResponse extends BaseMultipleResultResponse<DictionaryDataDto>
{

    public constructor(init?: Partial<ListOneDictionaryResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListProjectBidResponse extends BaseMultipleResultResponse<ProjectBidDto>
{

    public constructor(init?: Partial<ListProjectBidResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListProjectBidByIdResponse extends BaseMultipleResultResponse<ProjectBidDto>
{

    public constructor(init?: Partial<ListProjectBidByIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetProjectBidResponse extends BaseSingleResponse<ProjectBidDto>
{

    public constructor(init?: Partial<GetProjectBidResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateProjectBidResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateProjectBidResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteProjectBidResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteProjectBidResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateProjectBidResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateProjectBidResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateProjectBidStatusToArchivedResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateProjectBidStatusToArchivedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConsultantTemplateTimeResponse
{
    public templateConsultantTime?: number;

    public constructor(init?: Partial<GetConsultantTemplateTimeResponse>) { (Object as any).assign(this, init); }
}

export class CreateProjectQuestionResponse extends PostOperationResult
{
    public answerId?: number;

    public constructor(init?: Partial<CreateProjectQuestionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListProjectQuestionByProjectIdResponse extends BaseMultipleResultResponse<ProjectQuestionDto>
{

    public constructor(init?: Partial<ListProjectQuestionByProjectIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListProjectQuestionByProjectAndContractorIdResponse extends BaseMultipleResultResponse<ProjectQuestionDto>
{

    public constructor(init?: Partial<ListProjectQuestionByProjectAndContractorIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetProjectQuestionResponse extends BaseSingleResponse<ProjectQuestionDto>
{

    public constructor(init?: Partial<GetProjectQuestionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteProjectQuestionResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteProjectQuestionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateProjectQuestionResponse extends PutOperationResult
{
    public answerId?: number;

    public constructor(init?: Partial<UpdateProjectQuestionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListSowItemResponse extends BaseMultipleResultResponse<SowItemDto>
{

    public constructor(init?: Partial<ListSowItemResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListSowItemByIdResponse extends BaseMultipleResultResponse<SowItemDto>
{

    public constructor(init?: Partial<ListSowItemByIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetSowItemResponse extends BaseSingleResponse<SowItemDto>
{

    public constructor(init?: Partial<GetSowItemResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetFullSowItemResponse extends BaseSingleResponse<FullSowItemDto>
{

    public constructor(init?: Partial<GetFullSowItemResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListProjectMaterialsResponse extends BaseSingleResponse<ProjectMaterialsDto>
{

    public constructor(init?: Partial<ListProjectMaterialsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListSowItemWithItemAmountResponse extends BaseMultipleResultResponse<SowItemWithUsageAmountDto>
{

    public constructor(init?: Partial<ListSowItemWithItemAmountResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateSowItemResponse extends BaseSingleResponse<SowItemDto>
{

    public constructor(init?: Partial<CreateSowItemResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteSowItemResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteSowItemResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchSowItemOrderResponse extends OperationResult
{

    public constructor(init?: Partial<PatchSowItemOrderResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateSowItemResponse extends BaseSingleResponse<SowItemDto>
{

    public constructor(init?: Partial<UpdateSowItemResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateSowItemUnitResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateSowItemUnitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetSowItemUnitByIdsResponse
{
    public result?: SowItemUnitDto[];

    public constructor(init?: Partial<GetSowItemUnitByIdsResponse>) { (Object as any).assign(this, init); }
}

export class ListSowItemUnitResponse extends BaseMultipleResultResponse<SowItemUnitDto>
{

    public constructor(init?: Partial<ListSowItemUnitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListSowItemUnitByItemIdResponse extends BaseMultipleResultResponse<SowItemUnitDto>
{

    public constructor(init?: Partial<ListSowItemUnitByItemIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetSowItemUnitResponse extends BaseSingleResponse<SowItemUnitDto>
{

    public constructor(init?: Partial<GetSowItemUnitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteSowItemUnitResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteSowItemUnitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchSowItemUnitOrderResponse extends OperationResult
{

    public constructor(init?: Partial<PatchSowItemUnitOrderResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateSowItemUnitResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateSowItemUnitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListSowVersionResponse extends BaseMultipleResultResponse<SowVersionDto>
{

    public constructor(init?: Partial<ListSowVersionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetSowVersionResponse extends BaseSingleResponse<SowVersionDto>
{

    public constructor(init?: Partial<GetSowVersionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetWholeSowVersionResponse extends BaseSingleResponse<SowVersionDto>
{

    public constructor(init?: Partial<GetWholeSowVersionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetMasterSowVersionResponse extends BaseSingleResponse<SowVersionDto>
{

    public constructor(init?: Partial<GetMasterSowVersionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetMasterSowVersionIdResponse extends BaseSingleResponse<number>
{

    public constructor(init?: Partial<GetMasterSowVersionIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateSowVersionResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateSowVersionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateDraftSowVersionResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateDraftSowVersionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteSowVersionResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteSowVersionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateSowVersionResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateSowVersionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateToMasterSowVersionResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateToMasterSowVersionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListStagePlanResponse extends BaseMultipleResultResponse<StagePlanDto>
{

    public constructor(init?: Partial<ListStagePlanResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStagePlanByProjectIdResponse extends BaseSingleResponse<StagePlanDto>
{

    public constructor(init?: Partial<GetStagePlanByProjectIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStagePlanResponse extends BaseSingleResponse<StagePlanDto>
{

    public constructor(init?: Partial<GetStagePlanResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetWholeStagePlanByIdResponse extends BaseSingleResponse<StagePlanDto>
{

    public constructor(init?: Partial<GetWholeStagePlanByIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateStagePlanResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateStagePlanResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteStagePlanResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteStagePlanResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateStagePlanResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateStagePlanResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListStageTemplateResponse extends BaseMultipleResultResponse<StageTemplateDto>
{

    public constructor(init?: Partial<ListStageTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStageTemplateResponse extends BaseSingleResponse<StageTemplateDto>
{

    public constructor(init?: Partial<GetStageTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStageTemplateByFloorSetupResponse extends BaseSingleResponse<StageTemplateDto>
{

    public constructor(init?: Partial<GetStageTemplateByFloorSetupResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStageTemplateNameResponse extends BaseSingleResponse<boolean>
{

    public constructor(init?: Partial<GetStageTemplateNameResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateStageTemplateResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateStageTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateDraftStageTemplateResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateDraftStageTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteStageTemplateResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteStageTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateStageTemplateResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateStageTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateStageTemplateToInactiveResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateStageTemplateToInactiveResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListStageTemplatePartByIdResponse extends BaseMultipleResultResponse<StageTemplatePartDto>
{

    public constructor(init?: Partial<ListStageTemplatePartByIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStageTemplatePartResponse extends BaseSingleResponse<StageTemplatePartDto>
{

    public constructor(init?: Partial<GetStageTemplatePartResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateStageTemplatePartResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateStageTemplatePartResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteStageTemplatePartResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteStageTemplatePartResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateStageTemplatePartResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateStageTemplatePartResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetStageTemplateUnitResponse extends BaseSingleResponse<StageTemplateUnitDto>
{

    public constructor(init?: Partial<GetStageTemplateUnitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateStageTemplateUnitResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateStageTemplateUnitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteStageTemplateUnitResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteStageTemplateUnitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateStageTemplateUnitResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateStageTemplateUnitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetUserManagementStatisticsResponse extends BaseMultipleResultResponse<UserManagementStatisticsDto>
{

    public constructor(init?: Partial<GetUserManagementStatisticsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListUserManagementProjectsInfoResponse extends BaseMultipleResultResponse<AdminPanelConstructionProjectInfoDto>
{

    public constructor(init?: Partial<ListUserManagementProjectsInfoResponse>) { super(init); (Object as any).assign(this, init); }
}

export class WorkflowTaskActionUpdateResponse extends BaseSingleResponse<boolean>
{

    public constructor(init?: Partial<WorkflowTaskActionUpdateResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/construction/getcompanymanagementstatisticsquery", "GET")
export class GetCompanyManagementStatisticsQuery implements IReturn<GetCompanyManagementStatisticsResponse>, IGet, ICompanyManagementQuery
{
    public contractorIds?: number[];
    public consultantIds?: number[];

    public constructor(init?: Partial<GetCompanyManagementStatisticsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanyManagementStatisticsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCompanyManagementStatisticsResponse(); }
}

// @Route("/construction/getcompanymanagementprojectscountquery", "GET")
export class GetCompanyManagementProjectsCountQuery implements IReturn<GetCompanyManagementProjectsCountResponse>, IGet, ICompanyManagementQuery
{
    public consultantIds?: number[];
    public contractorIds?: number[];

    public constructor(init?: Partial<GetCompanyManagementProjectsCountQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanyManagementProjectsCountQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCompanyManagementProjectsCountResponse(); }
}

// @Route("/construction/listcompanymanagementprojectsinfoquery", "GET")
export class ListCompanyManagementProjectsInfoQuery implements IReturn<ListCompanyManagementProjectsInfoResponse>, IGet, IPaginatedRequest, ICompanyManagementQuery
{
    public contractorIds?: number[];
    public consultantIds?: number[];
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListCompanyManagementProjectsInfoQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyManagementProjectsInfoQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyManagementProjectsInfoResponse(); }
}

// @Route("/construction/getcompanyawardedsortquery", "GET")
export class GetCompanyAwardedSortQuery implements IReturn<GetCompanyAwardedSortResponse>, IGet, IPaginatedRequest
{
    public isAwardedAscending?: boolean;
    public isParticipatedAscending?: boolean;
    public idsToIgnore?: number[];
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<GetCompanyAwardedSortQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanyAwardedSortQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCompanyAwardedSortResponse(); }
}

// @Route("/construction/listconstructionprojectquery", "POST")
export class ListConstructionProjectQuery implements IReturn<ListConstructionProjectResponse>, IPaginatedRequest, IPost
{
    public filterRules?: ConstructionProjectFilter;
    public sortRules?: ConstructionProjectSort;
    public page?: number;
    public pageSize?: number;
    public viewType?: AdminProjectView;
    public searchValue?: string;

    public constructor(init?: Partial<ListConstructionProjectQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConstructionProjectQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListConstructionProjectResponse(); }
}

// @Route("/construction/listconstructionprojectforconsultantcontextquery", "POST")
export class ListConstructionProjectForConsultantContextQuery implements IReturn<ListConstructionProjectForConsultantContextResponse>, IPaginatedRequest, IPost
{
    public sortRules?: ConstructionProjectSort;
    public page?: number;
    public pageSize?: number;
    public viewType?: ContractorViewType;
    public projectType?: ProjectStartingStep;
    public governorateCollection?: number[];

    public constructor(init?: Partial<ListConstructionProjectForConsultantContextQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConstructionProjectForConsultantContextQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListConstructionProjectForConsultantContextResponse(); }
}

// @Route("/construction/getconstructionprojectforconsultantcontextquery", "GET")
export class GetConstructionProjectForConsultantContextQuery implements IReturn<GetConstructionProjectForConsultantContextResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetConstructionProjectForConsultantContextQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectForConsultantContextQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectForConsultantContextResponse(); }
}

// @Route("/construction/getconstructionprojectforconsultantquery", "GET")
export class GetConstructionProjectForConsultantQuery implements IReturn<GetConstructionProjectForConsultantResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetConstructionProjectForConsultantQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectForConsultantQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectForConsultantResponse(); }
}

// @Route("/construction/getconstructionprojectwithconsultantinvitedquery", "GET")
export class GetConstructionProjectWithConsultantInvitedQuery implements IReturn<GetConstructionProjectWithConsultantInvitedResponse>, IGet
{
    // @Required()
    public projectId: number;

    public constructor(init?: Partial<GetConstructionProjectWithConsultantInvitedQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectWithConsultantInvitedQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectWithConsultantInvitedResponse(); }
}

// @Route("/construction/getconstructionprojectwithinvitationbyprojectidquery", "GET")
export class GetConstructionProjectWithInvitationByProjectIdQuery implements IReturn<GetConstructionProjectWithInvitationByProjectIdResponse>, IGet
{
    // @Required()
    public projectId: number;

    public constructor(init?: Partial<GetConstructionProjectWithInvitationByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectWithInvitationByProjectIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectWithInvitationByProjectIdResponse(); }
}

// @Route("/construction/listconstructionprojectwithinvitationbyprojectidquery", "POST")
export class ListConstructionProjectWithInvitationByProjectIdQuery implements IReturn<ListConstructionProjectWithInvitationByProjectIdResponse>, IPaginatedRequest, IPost
{
    public sortRules?: ConstructionProjectSort;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListConstructionProjectWithInvitationByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConstructionProjectWithInvitationByProjectIdQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListConstructionProjectWithInvitationByProjectIdResponse(); }
}

// @Route("/construction/listconstructionprojectbystatusquery/{status}", "POST")
export class ListConstructionProjectByStatusQuery implements IReturn<ListConstructionProjectByStatusResponse>, IPaginatedRequest, IPost
{
    public sortRules?: ConstructionProjectSort;
    public status?: ConstructionProjectStatus;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListConstructionProjectByStatusQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConstructionProjectByStatusQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListConstructionProjectByStatusResponse(); }
}

// @Route("/construction/listconstructionprojectwithbidquery", "POST")
export class ListConstructionProjectWithBidQuery implements IReturn<ListConstructionProjectWithBidResponse>, IPaginatedRequest, IPost
{
    public sortRules?: ConstructionProjectSort;
    public governorateCollection?: number[];
    public wilayatCollection?: number[];
    public constructionType?: ConstructionType;
    public minimumProjectSize?: number;
    public page?: number;
    public pageSize?: number;
    public viewType?: ContractorViewType;

    public constructor(init?: Partial<ListConstructionProjectWithBidQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConstructionProjectWithBidQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListConstructionProjectWithBidResponse(); }
}

// @Route("/construction/listconstructionprojectbystatusandcontractorquery", "POST")
export class ListConstructionProjectByStatusAndContractorQuery implements IReturn<ListConstructionProjectByStatusAndContractorResponse>, IPaginatedRequest, IPost
{
    public sortRules?: ConstructionProjectSort;
    public contractorId?: number;
    public status?: ConstructionProjectStatus;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListConstructionProjectByStatusAndContractorQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConstructionProjectByStatusAndContractorQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListConstructionProjectByStatusAndContractorResponse(); }
}

// @Route("/construction/listconstructionprojectbystatusandconsultantquery", "POST")
export class ListConstructionProjectByStatusAndConsultantQuery implements IReturn<ListConstructionProjectByStatusAndConsultantResponse>, IPaginatedRequest, IPost
{
    public sortRules?: ConstructionProjectSort;
    public contractorId?: number;
    public statusView?: ConsultantStatusView;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListConstructionProjectByStatusAndConsultantQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConstructionProjectByStatusAndConsultantQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListConstructionProjectByStatusAndConsultantResponse(); }
}

// @Route("/construction/listnewconstructionprojectsquery", "POST")
export class ListNewConstructionProjectsQuery implements IReturn<ListNewConstructionProjectsResponse>, IPaginatedRequest, IGet
{
    public sortRules?: ConstructionProjectSort;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListNewConstructionProjectsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListNewConstructionProjectsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListNewConstructionProjectsResponse(); }
}

// @Route("/construction/getconstructionprojectquery/{id}", "GET")
export class GetConstructionProjectQuery implements IReturn<GetConstructionProjectResponse>, IGet
{
    // @Required()
    public id: number;

    public generateContract?: boolean;

    public constructor(init?: Partial<GetConstructionProjectQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectResponse(); }
}

// @Route("/construction/getconstructionprojectwithbidquery/{id}", "GET")
export class GetConstructionProjectWithBidQuery implements IReturn<GetConstructionProjectWithBidResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetConstructionProjectWithBidQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectWithBidQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectWithBidResponse(); }
}

// @Route("/construction/getebinaaprojectstatisticsquery", "GET")
export class GetEbinaaProjectStatisticsQuery implements IReturn<GetEbinaaProjectStatisticsResponse>, IGet
{

    public constructor(init?: Partial<GetEbinaaProjectStatisticsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetEbinaaProjectStatisticsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetEbinaaProjectStatisticsResponse(); }
}

// @Route("/construction/getconstructionprojectstatisticsquery", "GET")
export class GetConstructionProjectStatisticsQuery implements IReturn<GetConstructionProjectStatisticsResponse>, IGet
{

    public constructor(init?: Partial<GetConstructionProjectStatisticsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectStatisticsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectStatisticsResponse(); }
}

// @Route("/construction/getconstructionprojectstatisticsbycontractorquery", "GET")
export class GetConstructionProjectStatisticsByContractorQuery implements IReturn<GetConstructionProjectStatisticsByContractorResponse>, IGet
{

    public constructor(init?: Partial<GetConstructionProjectStatisticsByContractorQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectStatisticsByContractorQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectStatisticsByContractorResponse(); }
}

// @Route("/construction/getconstructionprojectstatisticsbyconsultantquery", "GET")
export class GetConstructionProjectStatisticsByConsultantQuery implements IReturn<GetConstructionProjectStatisticsByConsultantResponse>, IGet
{

    public constructor(init?: Partial<GetConstructionProjectStatisticsByConsultantQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectStatisticsByConsultantQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectStatisticsByConsultantResponse(); }
}

// @Route("/construction/createconstructionprojectcommand", "POST")
export class CreateConstructionProjectCommand extends BaseConstructionProjectCommand implements IReturn<CreateConstructionProjectResponse>, IPost, IConstructionProjectDto
{
    public startingStep?: ProjectStartingStep;
    public clientId?: number;

    public constructor(init?: Partial<CreateConstructionProjectCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConstructionProjectCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConstructionProjectResponse(); }
}

// @Route("/construction/deleteconstructionprojectcommand/{id}", "DELETE")
export class DeleteConstructionProjectCommand implements IReturn<DeleteConstructionProjectResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteConstructionProjectCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConstructionProjectCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConstructionProjectResponse(); }
}

// @Route("/construction/patchconstructionprojectcommand/{id}", "PATCH")
export class PatchConstructionProjectCommand extends BasePatchRequest<number> implements IReturn<PatchConstructionProjectResponse>
{

    public constructor(init?: Partial<PatchConstructionProjectCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchConstructionProjectCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchConstructionProjectResponse(); }
}

// @Route("/construction/updateconstructionprojectcommand/{id}", "PUT")
export class UpdateConstructionProjectCommand extends BaseConstructionProjectCommand implements IReturn<UpdateConstructionProjectResponse>, IPut, IConstructionProjectDto
{
    // @Required()
    public id: number;

    public stageTemplateId?: number;

    public constructor(init?: Partial<UpdateConstructionProjectCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectResponse(); }
}

// @Route("/construction/updateconstructionprojectstatustorejectedcommand/{id}", "PUT")
export class UpdateConstructionProjectStatusToRejectedCommand implements IReturn<UpdateConstructionProjectStatusToRejectedResponse>, IPut
{
    // @Required()
    public id: number;

    public comment?: string;

    public constructor(init?: Partial<UpdateConstructionProjectStatusToRejectedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectStatusToRejectedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectStatusToRejectedResponse(); }
}

// @Route("/construction/updateconstructionprojectstatustobidselectedcommand/{id}", "PUT")
export class UpdateConstructionProjectStatusToBidSelectedCommand implements IReturn<UpdateConstructionProjectStatusToBidSelectedResponse>, IPut
{
    // @Required()
    public id: number;

    // @Required()
    public projectBidId: number;

    public unSelect?: boolean;

    public constructor(init?: Partial<UpdateConstructionProjectStatusToBidSelectedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectStatusToBidSelectedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectStatusToBidSelectedResponse(); }
}

// @Route("/construction/updateconstructionprojectstatustoreadytosigncommand/{id}", "PUT")
export class UpdateConstructionProjectStatusToReadyToSignCommand implements IReturn<UpdateConstructionProjectStatusToReadyToSignResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateConstructionProjectStatusToReadyToSignCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectStatusToReadyToSignCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectStatusToReadyToSignResponse(); }
}

// @Route("/construction/updateconstructionprojectstatustosignedcommand/{id}", "PUT")
export class UpdateConstructionProjectStatusToSignedCommand implements IReturn<UpdateConstructionProjectStatusToSignedResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateConstructionProjectStatusToSignedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectStatusToSignedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectStatusToSignedResponse(); }
}

// @Route("/construction/updateconstructionprojectstatustoliveinpmcommand/{id}", "PUT")
export class UpdateConstructionProjectStatusToLiveInPmCommand implements IReturn<UpdateConstructionProjectStatusToLiveInPmResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateConstructionProjectStatusToLiveInPmCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectStatusToLiveInPmCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectStatusToLiveInPmResponse(); }
}

// @Route("/construction/updateconstructionprojectstatustoarchivedcommand/{id}", "PUT")
export class UpdateConstructionProjectStatusToArchivedCommand implements IReturn<UpdateConstructionProjectStatusToArchivedResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateConstructionProjectStatusToArchivedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectStatusToArchivedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectStatusToArchivedResponse(); }
}

// @Route("/construction/updateunarchiveprojectcommand/{id}", "PUT")
export class UpdateUnArchiveProjectCommand implements IReturn<UpdateUnArchiveProjectResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateUnArchiveProjectCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateUnArchiveProjectCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateUnArchiveProjectResponse(); }
}

// @Route("/construction/changeprojectconsultantcommand", "PUT")
export class ChangeProjectConsultantCommand implements IReturn<ChangeProjectConsultantResponse>, IPut
{
    public constructionProjectId?: number;
    public consultantId?: number;

    public constructor(init?: Partial<ChangeProjectConsultantCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ChangeProjectConsultantCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new ChangeProjectConsultantResponse(); }
}

// @Route("/construction/updateconstructionprojectcontractidcommand/{id}", "PUT")
export class UpdateConstructionProjectContractIdCommand implements IReturn<UpdateConstructionProjectContractIdResponse>, IPut
{
    // @Required()
    public id: number;

    // @Required()
    public contractId: number;

    public constructor(init?: Partial<UpdateConstructionProjectContractIdCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectContractIdCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectContractIdResponse(); }
}

// @Route("/construction/getprojectnamequery", "GET")
export class GetProjectNameQuery implements IReturn<GetProjectNameResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetProjectNameQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProjectNameQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProjectNameResponse(); }
}

// @Route("/construction/updateconstructionprojectbidclosingdatecommand/{id}", "PUT")
export class UpdateConstructionProjectBidClosingDateCommand implements IReturn<UpdateConstructionProjectBidClosingDateResponse>, IPut
{
    public id: number;
    public bidClosingDateOption?: BidClosingDateOption;

    public constructor(init?: Partial<UpdateConstructionProjectBidClosingDateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectBidClosingDateCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectBidClosingDateResponse(); }
}

// @Route("/construction/uploadconstructionprojectdrawingscommand", "POST")
export class UploadConstructionProjectDrawingsCommand implements IReturn<BaseConstructionProjectOperationResult>, IPost
{
    public constructionProjectId?: number;
    public krookieFiles?: string[];
    public drawingFiles?: string[];

    public constructor(init?: Partial<UploadConstructionProjectDrawingsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UploadConstructionProjectDrawingsCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new BaseConstructionProjectOperationResult(); }
}

// @Route("/construction/updatedesignprojectstatuscommand", "POST")
export class UpdateDesignProjectStatusCommand implements IReturn<UpdateDesignProjectStatusResponse>, IPost
{
    public projectId?: number;
    public action?: DesignProjectTrigger;

    public constructor(init?: Partial<UpdateDesignProjectStatusCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateDesignProjectStatusCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateDesignProjectStatusResponse(); }
}

// @Route("/construction/createconstructionprojectreviewcommand", "POST")
export class CreateConstructionProjectReviewCommand implements IReturn<CreateConstructionProjectReviewResponse>, IPost
{
    public constructionProjectId?: number;
    public isApproved?: boolean;
    public comment?: string;

    public constructor(init?: Partial<CreateConstructionProjectReviewCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConstructionProjectReviewCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConstructionProjectReviewResponse(); }
}

// @Route("/construction/getconstructionprojectreviewsquery", "GET")
export class GetConstructionProjectReviewsQuery implements IReturn<GetConstructionProjectReviewsResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetConstructionProjectReviewsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConstructionProjectReviewsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConstructionProjectReviewsResponse(); }
}

// @Route("/construction/createconstructionprojectinvitationcommand", "POST")
export class CreateConstructionProjectInvitationCommand implements IReturn<CreateConstructionProjectInvitationResponse>, IPost
{
    public companyId?: number;
    public companyType?: ContextType;
    public constructionProjectId?: number;

    public constructor(init?: Partial<CreateConstructionProjectInvitationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConstructionProjectInvitationCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConstructionProjectInvitationResponse(); }
}

// @Route("/construction/createmyowninvitationcommand", "POST")
export class CreateMyOwnInvitationCommand implements IReturn<CreateMyOwnInvitationResponse>, IPost
{
    // @Required()
    public phoneNumber: string;

    public email?: string;
    // @Required()
    public contextType: ContextType;

    // @Required()
    public projectId: number;

    // @Required()
    public companyName: string;

    public constructor(init?: Partial<CreateMyOwnInvitationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateMyOwnInvitationCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateMyOwnInvitationResponse(); }
}

// @Route("/construction/updatemyowncompanyinvitationcommand", "PUT")
export class UpdateMyOwnCompanyInvitationCommand implements IReturn<UpdateMyOwnCompanyInvitationResponse>, IPut
{
    public companyId?: number;
    public phoneNumber?: string;
    public projectIds?: number[];

    public constructor(init?: Partial<UpdateMyOwnCompanyInvitationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateMyOwnCompanyInvitationCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateMyOwnCompanyInvitationResponse(); }
}

// @Route("/construction/updateconstructionprojectinvitationstatustoapprovedcommand", "PUT")
export class UpdateConstructionProjectInvitationStatusToApprovedCommand implements IReturn<UpdateConstructionProjectInvitationStatusToApprovedResponse>, IPut
{
    public constructionProjectId?: number;
    public consultantId?: number;

    public constructor(init?: Partial<UpdateConstructionProjectInvitationStatusToApprovedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectInvitationStatusToApprovedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectInvitationStatusToApprovedResponse(); }
}

// @Route("/construction/updateconstructionprojectinvitationstatustodeclinedcommand", "PUT")
export class UpdateConstructionProjectInvitationStatusToDeclinedCommand implements IReturn<UpdateConstructionProjectInvitationStatusToDeclinedResponse>, IPut
{
    // @Required()
    public constructionProjectId: number;

    public constructor(init?: Partial<UpdateConstructionProjectInvitationStatusToDeclinedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConstructionProjectInvitationStatusToDeclinedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConstructionProjectInvitationStatusToDeclinedResponse(); }
}

// @Route("/construction/listinvitationbyprojectidquery", "GET")
export class ListInvitationByProjectIdQuery implements IReturn<ListInvitationByProjectIdResponse>, IGet
{
    public constructionProjectId?: number;
    public contextType?: ContextType;

    public constructor(init?: Partial<ListInvitationByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListInvitationByProjectIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListInvitationByProjectIdResponse(); }
}

// @Route("/construction/listcontractorinvitationbyprojectidquery", "GET")
export class ListContractorInvitationByProjectIdQuery implements IReturn<ListContractorInvitationByProjectIdResponse>, IGet
{
    public constructionProjectId?: number;

    public constructor(init?: Partial<ListContractorInvitationByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorInvitationByProjectIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorInvitationByProjectIdResponse(); }
}

// @Route("/construction/deleteconsultantinvitationcommand", "DELETE")
export class DeleteConsultantInvitationCommand implements IReturn<DeleteConsultantInvitationResponse>, IDelete
{
    public constructionProjectId?: number;

    public constructor(init?: Partial<DeleteConsultantInvitationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConsultantInvitationCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConsultantInvitationResponse(); }
}

// @Route("/construction/listdictionarydataquery", "GET")
export class ListDictionaryDataQuery implements IReturn<ListDictionaryDataResponse>, IGet
{

    public constructor(init?: Partial<ListDictionaryDataQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListDictionaryDataQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListDictionaryDataResponse(); }
}

// @Route("/construction/listonedictionaryquery/{dictionary}", "GET")
export class ListOneDictionaryQuery implements IReturn<ListOneDictionaryResponse>, IGet
{
    public dictionary?: DictionaryName;

    public constructor(init?: Partial<ListOneDictionaryQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListOneDictionaryQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListOneDictionaryResponse(); }
}

// @Route("/construction/listprojectbidquery", "GET")
export class ListProjectBidQuery implements IReturn<ListProjectBidResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListProjectBidQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListProjectBidQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListProjectBidResponse(); }
}

// @Route("/construction/listprojectbidbyidquery/{projectid}", "GET")
export class ListProjectBidByIdQuery implements IReturn<ListProjectBidByIdResponse>, IPaginatedRequest, IGet
{
    // @Required()
    public projectId: number;

    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListProjectBidByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListProjectBidByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListProjectBidByIdResponse(); }
}

// @Route("/construction/getprojectbidquery/{id}", "GET")
export class GetProjectBidQuery implements IReturn<GetProjectBidResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetProjectBidQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProjectBidQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProjectBidResponse(); }
}

// @Route("/construction/getwinnerprojectbidquery", "GET")
export class GetWinnerProjectBidQuery implements IReturn<GetProjectBidResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetWinnerProjectBidQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWinnerProjectBidQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProjectBidResponse(); }
}

// @Route("/construction/createprojectbidcommand", "POST")
export class CreateProjectBidCommand extends BaseProjectBidCommand implements IReturn<CreateProjectBidResponse>, IPost, IProjectBidDto
{
    // @Required()
    public projectId: number;

    public constructor(init?: Partial<CreateProjectBidCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateProjectBidCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateProjectBidResponse(); }
}

// @Route("/construction/deleteprojectbidcommand/{id}", "DELETE")
export class DeleteProjectBidCommand implements IReturn<DeleteProjectBidResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteProjectBidCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteProjectBidCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteProjectBidResponse(); }
}

// @Route("/construction/updateprojectbidcommand/{id}", "PUT")
export class UpdateProjectBidCommand extends BaseProjectBidCommand implements IReturn<UpdateProjectBidResponse>, IPut
{
    public bidCosts?: ProjectBidCostDto[];
    public stageParts?: ProjectBidStagePartDto[];
    public changeStatusToSubmitted?: boolean;
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateProjectBidCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateProjectBidCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateProjectBidResponse(); }
}

// @Route("/construction/updateprojectbidstatustoarchivedcommand/{id}", "PUT")
export class UpdateProjectBidStatusToArchivedCommand implements IReturn<UpdateProjectBidStatusToArchivedResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateProjectBidStatusToArchivedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateProjectBidStatusToArchivedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateProjectBidStatusToArchivedResponse(); }
}

// @Route("/construction/getconsultanttemplatetimequery", "GET")
export class GetConsultantTemplateTimeQuery implements IReturn<GetConsultantTemplateTimeResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetConsultantTemplateTimeQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConsultantTemplateTimeQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConsultantTemplateTimeResponse(); }
}

// @Route("/construction/createprojectquestioncommand", "POST")
export class CreateProjectQuestionCommand implements IReturn<CreateProjectQuestionResponse>, IPost, ICreateQuestionCommand
{
    public projectId?: number;
    public question?: string;
    public answer?: string;

    public constructor(init?: Partial<CreateProjectQuestionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateProjectQuestionCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateProjectQuestionResponse(); }
}

// @Route("/construction/listprojectquestionbyprojectidquery/{projectid}", "GET")
export class ListProjectQuestionByProjectIdQuery implements IReturn<ListProjectQuestionByProjectIdResponse>, IPaginatedRequest, IGet
{
    // @Required()
    public projectId: number;

    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListProjectQuestionByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListProjectQuestionByProjectIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListProjectQuestionByProjectIdResponse(); }
}

// @Route("/construction/listprojectquestionbyprojectandcontractoridquery/{projectid}/{contractorid}", "GET")
export class ListProjectQuestionByProjectAndContractorIdQuery implements IReturn<ListProjectQuestionByProjectAndContractorIdResponse>, IPaginatedRequest, IGet
{
    // @Required()
    public projectId: number;

    // @Required()
    public contractorId: number;

    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListProjectQuestionByProjectAndContractorIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListProjectQuestionByProjectAndContractorIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListProjectQuestionByProjectAndContractorIdResponse(); }
}

// @Route("/construction/getprojectquestionquery/{id}", "GET")
export class GetProjectQuestionQuery implements IReturn<GetProjectQuestionResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetProjectQuestionQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProjectQuestionQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProjectQuestionResponse(); }
}

// @Route("/construction/deleteprojectquestioncommand/{id}", "DELETE")
export class DeleteProjectQuestionCommand implements IReturn<DeleteProjectQuestionResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteProjectQuestionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteProjectQuestionCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteProjectQuestionResponse(); }
}

// @Route("/construction/updateprojectquestioncommand/{id}", "PUT")
export class UpdateProjectQuestionCommand implements IReturn<UpdateProjectQuestionResponse>, IPut, IUpdateQuestionCommand
{
    // @Required()
    public id: number;

    public question?: string;
    public answerId?: number;
    public answer?: string;
    public questionAction?: UpdateQuestionAction;

    public constructor(init?: Partial<UpdateProjectQuestionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateProjectQuestionCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateProjectQuestionResponse(); }
}

// @Route("/construction/listsowitemquery", "GET")
export class ListSowItemQuery implements IReturn<ListSowItemResponse>, IPaginatedRequest, IGet
{
    public sort?: ListSowItemSorts;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListSowItemQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListSowItemQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListSowItemResponse(); }
}

// @Route("/construction/listsowitemsbyidsquery/{ids}", "GET")
export class ListSowItemsByIdsQuery implements IReturn<ListSowItemResponse>, IGet
{
    public ids?: number[];

    public constructor(init?: Partial<ListSowItemsByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListSowItemsByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListSowItemResponse(); }
}

// @Route("/construction/listsowitembyidquery", "GET")
export class ListSowItemByIdQuery implements IReturn<ListSowItemByIdResponse>, IPaginatedRequest, IGet
{
    public versionId?: number;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListSowItemByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListSowItemByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListSowItemByIdResponse(); }
}

// @Route("/construction/getsowitemquery/{id}", "GET")
export class GetSowItemQuery implements IReturn<GetSowItemResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetSowItemQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetSowItemQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetSowItemResponse(); }
}

// @Route("/construction/getfullsowitemquery/{id}", "GET")
export class GetFullSowItemQuery implements IReturn<GetFullSowItemResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetFullSowItemQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFullSowItemQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetFullSowItemResponse(); }
}

// @Route("/construction/listprojectmaterialsquery", "GET")
export class ListProjectMaterialsQuery implements IReturn<ListProjectMaterialsResponse>, IGet
{
    public constructionType?: ConstructionType;
    public sowVersionId?: number;

    public constructor(init?: Partial<ListProjectMaterialsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListProjectMaterialsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListProjectMaterialsResponse(); }
}

// @Route("/construction/listsowitemwithitemamountquery", "GET")
export class ListSowItemWithItemAmountQuery implements IReturn<ListSowItemWithItemAmountResponse>, IGet
{
    public sowId?: number;

    public constructor(init?: Partial<ListSowItemWithItemAmountQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListSowItemWithItemAmountQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListSowItemWithItemAmountResponse(); }
}

// @Route("/construction/createsowitemcommand", "POST")
export class CreateSowItemCommand extends BaseSowItem implements IReturn<CreateSowItemResponse>, IPost, ISowItemDto
{

    public constructor(init?: Partial<CreateSowItemCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateSowItemCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateSowItemResponse(); }
}

// @Route("/construction/deletesowitemcommand/{id}", "DELETE")
export class DeleteSowItemCommand implements IReturn<DeleteSowItemResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteSowItemCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteSowItemCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteSowItemResponse(); }
}

// @Route("/construction/patchsowitemordercommand", "PATCH")
export class PatchSowItemOrderCommand implements IReturn<PatchSowItemOrderResponse>, IPatch
{
    public orderItems?: OrderDto[];

    public constructor(init?: Partial<PatchSowItemOrderCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchSowItemOrderCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchSowItemOrderResponse(); }
}

// @Route("/construction/updatesowitemcommand/{id}", "PUT")
export class UpdateSowItemCommand extends BaseSowItem implements IReturn<UpdateSowItemResponse>, IPut, ISowItemDto
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateSowItemCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateSowItemCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateSowItemResponse(); }
}

// @Route("/construction/createsowitemunitcommand", "POST")
export class CreateSowItemUnitCommand extends BaseSowItemUnit implements IReturn<CreateSowItemUnitResponse>, IPost, ISowItemUnitDto
{

    public constructor(init?: Partial<CreateSowItemUnitCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateSowItemUnitCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateSowItemUnitResponse(); }
}

// @Route("/construction/getsowitemunitbyidsquery", "GET")
export class GetSowItemUnitByIdsQuery implements IReturn<GetSowItemUnitByIdsResponse>, IGet
{
    public sowItemUnitIds?: number[];

    public constructor(init?: Partial<GetSowItemUnitByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetSowItemUnitByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetSowItemUnitByIdsResponse(); }
}

// @Route("/construction/listsowitemunitquery", "GET")
export class ListSowItemUnitQuery implements IReturn<ListSowItemUnitResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListSowItemUnitQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListSowItemUnitQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListSowItemUnitResponse(); }
}

// @Route("/construction/listsowitemunitbyitemidquery/{itemid}", "GET")
export class ListSowItemUnitByItemIdQuery implements IReturn<ListSowItemUnitByItemIdResponse>, IPaginatedRequest, IGet
{
    public itemId?: number;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListSowItemUnitByItemIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListSowItemUnitByItemIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListSowItemUnitByItemIdResponse(); }
}

// @Route("/construction/getsowitemunitquery/{id}", "GET")
export class GetSowItemUnitQuery implements IReturn<GetSowItemUnitResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetSowItemUnitQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetSowItemUnitQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetSowItemUnitResponse(); }
}

// @Route("/construction/deletesowitemunitcommand/{id}", "DELETE")
export class DeleteSowItemUnitCommand implements IReturn<DeleteSowItemUnitResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteSowItemUnitCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteSowItemUnitCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteSowItemUnitResponse(); }
}

// @Route("/construction/patchsowitemunitordercommand", "PATCH")
export class PatchSowItemUnitOrderCommand implements IReturn<PatchSowItemUnitOrderResponse>, IPatch
{
    public orderItems?: OrderDto[];

    public constructor(init?: Partial<PatchSowItemUnitOrderCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchSowItemUnitOrderCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchSowItemUnitOrderResponse(); }
}

// @Route("/construction/updatesowitemunitcommand/{id}", "PUT")
export class UpdateSowItemUnitCommand extends BaseSowItemUnit implements IReturn<UpdateSowItemUnitResponse>, IPut, ISowItemUnitDto
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateSowItemUnitCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateSowItemUnitCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateSowItemUnitResponse(); }
}

// @Route("/construction/listsowversionquery", "POST")
export class ListSowVersionQuery implements IReturn<ListSowVersionResponse>, IPaginatedRequest, IPost
{
    public page?: number;
    public pageSize?: number;
    public sort?: SowVersionSort;

    public constructor(init?: Partial<ListSowVersionQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListSowVersionQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListSowVersionResponse(); }
}

// @Route("/construction/getsowversionquery/{id}", "GET")
export class GetSowVersionQuery implements IReturn<GetSowVersionResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetSowVersionQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetSowVersionQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetSowVersionResponse(); }
}

// @Route("/construction/getwholesowversionquery/{id}", "GET")
export class GetWholeSowVersionQuery implements IReturn<GetWholeSowVersionResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetWholeSowVersionQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWholeSowVersionQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetWholeSowVersionResponse(); }
}

// @Route("/construction/getmastersowversionquery", "GET")
export class GetMasterSowVersionQuery implements IReturn<GetMasterSowVersionResponse>, IGet
{

    public constructor(init?: Partial<GetMasterSowVersionQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetMasterSowVersionQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetMasterSowVersionResponse(); }
}

// @Route("/construction/getmastersowversionidquery", "GET")
export class GetMasterSowVersionIdQuery implements IReturn<GetMasterSowVersionIdResponse>, IGet
{

    public constructor(init?: Partial<GetMasterSowVersionIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetMasterSowVersionIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetMasterSowVersionIdResponse(); }
}

// @Route("/construction/createsowversioncommand", "POST")
export class CreateSowVersionCommand implements IReturn<CreateSowVersionResponse>, IPost, ISowVersionDto
{
    // @Required()
    public contractName: string;

    public constructor(init?: Partial<CreateSowVersionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateSowVersionCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateSowVersionResponse(); }
}

// @Route("/construction/createdraftsowversioncommand", "POST")
export class CreateDraftSowVersionCommand implements IReturn<CreateDraftSowVersionResponse>, IPost
{

    public constructor(init?: Partial<CreateDraftSowVersionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateDraftSowVersionCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateDraftSowVersionResponse(); }
}

// @Route("/construction/deletesowversioncommand/{id}", "DELETE")
export class DeleteSowVersionCommand implements IReturn<DeleteSowVersionResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteSowVersionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteSowVersionCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteSowVersionResponse(); }
}

// @Route("/construction/updatesowversioncommand/{id}", "PUT")
export class UpdateSowVersionCommand implements IReturn<UpdateSowVersionResponse>, IPut, ISowVersionDto
{
    public id: number;
    // @Required()
    public contractName: string;

    public constructor(init?: Partial<UpdateSowVersionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateSowVersionCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateSowVersionResponse(); }
}

// @Route("/construction/updatetomastersowversioncommand/{id}", "PUT")
export class UpdateToMasterSowVersionCommand implements IReturn<UpdateToMasterSowVersionResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateToMasterSowVersionCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateToMasterSowVersionCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateToMasterSowVersionResponse(); }
}

// @Route("/construction/liststageplanquery", "GET")
export class ListStagePlanQuery implements IReturn<ListStagePlanResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListStagePlanQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListStagePlanQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListStagePlanResponse(); }
}

// @Route("/construction/getstageplanbyprojectidquery/{projectid}", "GET")
export class GetStagePlanByProjectIdQuery implements IReturn<GetStagePlanByProjectIdResponse>, IGet
{
    // @Required()
    public projectId: number;

    public constructor(init?: Partial<GetStagePlanByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStagePlanByProjectIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStagePlanByProjectIdResponse(); }
}

// @Route("/construction/getstageplanquery/{id}", "GET")
export class GetStagePlanQuery implements IReturn<GetStagePlanResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetStagePlanQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStagePlanQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStagePlanResponse(); }
}

// @Route("/construction/getwholestageplanbyidquery/{id}", "GET")
export class GetWholeStagePlanByIdQuery implements IReturn<GetWholeStagePlanByIdResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetWholeStagePlanByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWholeStagePlanByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetWholeStagePlanByIdResponse(); }
}

// @Route("/construction/createstageplancommand", "POST")
export class CreateStagePlanCommand implements IReturn<CreateStagePlanResponse>, IPost
{
    public stageTemplateId?: number;
    public projectId?: number;

    public constructor(init?: Partial<CreateStagePlanCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateStagePlanCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateStagePlanResponse(); }
}

// @Route("/construction/deletestageplancommand/{id}", "DELETE")
export class DeleteStagePlanCommand implements IReturn<DeleteStagePlanResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteStagePlanCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteStagePlanCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteStagePlanResponse(); }
}

// @Route("/construction/updatestageplancommand/{id}", "PUT")
export class UpdateStagePlanCommand extends BaseStage implements IReturn<UpdateStagePlanResponse>, IPut, IStagePlanDto
{
    public projectId?: number;
    // @Required()
    public id: number;

    public planParts?: StagePlanPartDto[];

    public constructor(init?: Partial<UpdateStagePlanCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateStagePlanCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateStagePlanResponse(); }
}

// @Route("/construction/liststagetemplatequery", "POST")
export class ListStageTemplateQuery implements IReturn<ListStageTemplateResponse>, IPaginatedRequest, IPost
{
    public sortRules?: StageTemplateSort;
    public stageFilter?: StageFilter;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListStageTemplateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListStageTemplateQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListStageTemplateResponse(); }
}

// @Route("/construction/getstagetemplatequery/{id}", "GET")
export class GetStageTemplateQuery implements IReturn<GetStageTemplateResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetStageTemplateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStageTemplateQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStageTemplateResponse(); }
}

// @Route("/construction/getstagetemplatebyfloorsetupquery", "GET")
export class GetStageTemplateByFloorSetupQuery implements IReturn<GetStageTemplateByFloorSetupResponse>, IGet
{
    // @Required()
    public basement: number;

    // @Required()
    public additionalFloors: number;

    // @Required()
    public outerBlocks: number;

    public groundFloor?: boolean;
    public levellingFloor?: boolean;
    public penthouseFloor?: boolean;
    public pool?: boolean;

    public constructor(init?: Partial<GetStageTemplateByFloorSetupQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStageTemplateByFloorSetupQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStageTemplateByFloorSetupResponse(); }
}

// @Route("/construction/liststagetemplatebysetupquery", "POST")
export class ListStageTemplateBySetupQuery implements IReturn<ListStageTemplateResponse>, IPaginatedRequest, IPost
{
    public stageFilter?: StageFilter;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListStageTemplateBySetupQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListStageTemplateBySetupQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListStageTemplateResponse(); }
}

// @Route("/construction/getstagetemplatenamequery", "GET")
export class GetStageTemplateNameQuery implements IReturn<GetStageTemplateNameResponse>, IGet
{
    // @Required()
    public stageTemplateName: string;

    public constructor(init?: Partial<GetStageTemplateNameQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStageTemplateNameQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStageTemplateNameResponse(); }
}

// @Route("/construction/createstagetemplatecommand", "POST")
export class CreateStageTemplateCommand extends BaseStage implements IReturn<CreateStageTemplateResponse>, IPost, IStageTemplateDto
{
    public templateParts?: StageTemplatePartDto[];

    public constructor(init?: Partial<CreateStageTemplateCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateStageTemplateCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateStageTemplateResponse(); }
}

// @Route("/construction/createdraftstagetemplatecommand/{id}", "POST")
export class CreateDraftStageTemplateCommand implements IReturn<CreateDraftStageTemplateResponse>, IPost
{
    public id: number;

    public constructor(init?: Partial<CreateDraftStageTemplateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateDraftStageTemplateCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateDraftStageTemplateResponse(); }
}

// @Route("/construction/deletestagetemplatecommand/{id}", "DELETE")
export class DeleteStageTemplateCommand implements IReturn<DeleteStageTemplateResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteStageTemplateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteStageTemplateCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteStageTemplateResponse(); }
}

// @Route("/construction/updatestagetemplatecommand/{id}", "PUT")
export class UpdateStageTemplateCommand extends BaseStage implements IReturn<UpdateStageTemplateResponse>, IPut, IStageTemplateDto
{
    // @Required()
    public id: number;

    public changeStatusToLive?: boolean;
    public templateParts?: StageTemplatePartDto[];

    public constructor(init?: Partial<UpdateStageTemplateCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateStageTemplateCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateStageTemplateResponse(); }
}

// @Route("/construction/updatestagetemplatetoinactivecommand/{id}", "PUT")
export class UpdateStageTemplateToInactiveCommand implements IReturn<UpdateStageTemplateToInactiveResponse>, IPut
{
    public id: number;

    public constructor(init?: Partial<UpdateStageTemplateToInactiveCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateStageTemplateToInactiveCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateStageTemplateToInactiveResponse(); }
}

// @Route("/construction/liststagetemplatepartbyidquery/{templateid}", "GET")
export class ListStageTemplatePartByIdQuery implements IReturn<ListStageTemplatePartByIdResponse>, IGet
{
    public templateId?: number;

    public constructor(init?: Partial<ListStageTemplatePartByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListStageTemplatePartByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListStageTemplatePartByIdResponse(); }
}

// @Route("/construction/getstagetemplatepartquery/{id}", "GET")
export class GetStageTemplatePartQuery implements IReturn<GetStageTemplatePartResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetStageTemplatePartQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStageTemplatePartQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStageTemplatePartResponse(); }
}

// @Route("/construction/createstagetemplatepartcommand", "POST")
export class CreateStageTemplatePartCommand extends BaseStagePlanPart implements IReturn<CreateStageTemplatePartResponse>, IPost, IStageTemplatePartDto
{
    public templateId?: number;
    public templateUnits?: StageTemplateUnitDto[];

    public constructor(init?: Partial<CreateStageTemplatePartCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateStageTemplatePartCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateStageTemplatePartResponse(); }
}

// @Route("/construction/deletestagetemplatepartcommand/{id}", "DELETE")
export class DeleteStageTemplatePartCommand implements IReturn<DeleteStageTemplatePartResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteStageTemplatePartCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteStageTemplatePartCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteStageTemplatePartResponse(); }
}

// @Route("/construction/updatestagetemplatepartcommand/{id}", "PUT")
export class UpdateStageTemplatePartCommand extends BaseStagePlanPart implements IReturn<UpdateStageTemplatePartResponse>, IPut, IStageTemplatePartDto
{
    public id: number;
    public templateId?: number;
    public templateUnits?: StageTemplateUnitDto[];

    public constructor(init?: Partial<UpdateStageTemplatePartCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateStageTemplatePartCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateStageTemplatePartResponse(); }
}

// @Route("/construction/getstagetemplateunitquery/{id}", "GET")
export class GetStageTemplateUnitQuery implements IReturn<GetStageTemplateUnitResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetStageTemplateUnitQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetStageTemplateUnitQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetStageTemplateUnitResponse(); }
}

// @Route("/construction/createstagetemplateunitcommand", "POST")
export class CreateStageTemplateUnitCommand extends BaseStageUnit implements IReturn<CreateStageTemplateUnitResponse>, IPost, IStageTemplateUnitDto
{
    public templatePartId?: number;

    public constructor(init?: Partial<CreateStageTemplateUnitCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateStageTemplateUnitCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateStageTemplateUnitResponse(); }
}

// @Route("/construction/deletestagetemplateunitcommand/{id}", "DELETE")
export class DeleteStageTemplateUnitCommand implements IReturn<DeleteStageTemplateUnitResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteStageTemplateUnitCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteStageTemplateUnitCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteStageTemplateUnitResponse(); }
}

// @Route("/construction/updatestagetemplateunitcommand/{id}", "PUT")
export class UpdateStageTemplateUnitCommand extends BaseStageUnit implements IReturn<UpdateStageTemplateUnitResponse>, IPut, IStageTemplateUnitDto
{
    public id: number;
    public templatePartId?: number;

    public constructor(init?: Partial<UpdateStageTemplateUnitCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateStageTemplateUnitCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateStageTemplateUnitResponse(); }
}

// @Route("/construction/getusermanagementstatisticsquery", "GET")
export class GetUserManagementStatisticsQuery implements IReturn<GetUserManagementStatisticsResponse>, IGet
{
    public profileIds?: number[];

    public constructor(init?: Partial<GetUserManagementStatisticsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserManagementStatisticsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserManagementStatisticsResponse(); }
}

// @Route("/construction/listusermanagementprojectsinfoquery", "GET")
export class ListUserManagementProjectsInfoQuery implements IReturn<ListUserManagementProjectsInfoResponse>, IPaginatedRequest, IGet, IUserManagementQuery
{
    public profileId?: number;
    public consultantIds?: number[];
    public contractorIds?: number[];
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListUserManagementProjectsInfoQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListUserManagementProjectsInfoQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListUserManagementProjectsInfoResponse(); }
}

// @Route("/construction/workflowtaskactionupdatecommand", "PUT")
export class WorkflowTaskActionUpdateCommand implements IReturn<WorkflowTaskActionUpdateResponse>, IPut
{
    public sowSubItemHashCollection?: TaskActionUpdateDto[];

    public constructor(init?: Partial<WorkflowTaskActionUpdateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'WorkflowTaskActionUpdateCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new WorkflowTaskActionUpdateResponse(); }
}

