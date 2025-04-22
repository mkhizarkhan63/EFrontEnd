// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2023-11-23 14:54:57
Version: 6.50
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://192.168.0.181:5000/

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

export interface IDelete
{
}

export interface IPut
{
}

export interface IPatch
{
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

export interface IPaginatedRequest
{
    page?: number;
    pageSize?: number;
}

export interface IContractFileDto
{
    orderNumber?: number;
    headline?: string;
    fileId?: string;
    contractId?: number;
}

export class OrderDto
{
    public id: number;
    public orderNumber?: number;

    public constructor(init?: Partial<OrderDto>) { (Object as any).assign(this, init); }
}

export enum Subject
{
    None = 0,
    Client = 1,
    Contractor = 2,
    Consultant = 3,
}

export interface IContractTemplateDto
{
    contractName?: string;
    signedContracts?: number;
}

export interface IContractTemplateContentDto
{
    orderNumber?: number;
    headline?: string;
    fileId?: string;
    templateId?: number;
}

export enum ContractStatus
{
    None = 0,
    ReadyToSign = 1,
    Signed = 2,
    LiveInPm = 3,
    Archived = 4,
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

export class ContractSowItemUnitDto implements IContractSowItemUnitDto
{
    public orderNumber?: number;
    public englishDescription?: string;
    public arabicDescription?: string;
    public titleEnglish?: string;
    public titleArabic?: string;
    public supplier?: string;
    public rate?: number;
    public acceptanceWorkflow?: number;
    public itemId?: number;
    public id: number;

    public constructor(init?: Partial<ContractSowItemUnitDto>) { (Object as any).assign(this, init); }
}

export class ContractSowItemDto implements IContractSowItemDto
{
    public category?: SowItemCategory;
    public orderNumber?: number;
    public englishName?: string;
    public arabicName?: string;
    public numberOfSpecs?: number;
    public numberOfWorkflows?: number;
    public consultantVisits?: number;
    public iconFileId?: string;
    public contractId?: number;
    public approval?: boolean;
    public itemUnits?: ContractSowItemUnitDto[];
    public materialExecutionStage?: number[];
    public id: number;

    public constructor(init?: Partial<ContractSowItemDto>) { (Object as any).assign(this, init); }
}

export class ContractClientDto
{
    public clientId?: number;
    public clientEmail?: string;
    public clientName?: string;
    public clientPhone?: string;
    public clientProfilePicture?: string;
    public contractClientName?: string;
    public contractClientNameArabic?: string;
    public nationalId?: string;

    public constructor(init?: Partial<ContractClientDto>) { (Object as any).assign(this, init); }
}

export class ContractSignatureDto implements IContractSignatureDto
{
    public subject?: Subject;
    public fileId?: string;
    public contractId?: number;
    public createdDate?: string;
    public id: number;

    public constructor(init?: Partial<ContractSignatureDto>) { (Object as any).assign(this, init); }
}

export enum ConstructionType
{
    None = 0,
    StructureOnly = 1,
    TurnKey = 2,
}

export enum ConstructionLandType
{
    None = 0,
    Residential = 1,
    Commercial = 2,
}

export enum ProjectStartingStep
{
    None = 0,
    Design = 1,
    Build = 2,
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

export class ContractProjectDto implements IContractProjectDto
{
    public projectNumber?: string;
    public floorLevels?: string;
    public clientId?: number;
    public landArea?: number;
    public buildingAllAreaInTheDrawings?: boolean;
    public addedBuiltUpArea?: number;
    public projectType?: ConstructionType;
    public landType?: ConstructionLandType;
    public startingStep?: ProjectStartingStep;
    public additionalComment?: string;
    public krookieFiles?: string[];
    public drawingFiles?: string[];
    public wilayatId?: number;
    public governorateId?: number;
    public stagePlanId?: number;
    public projectBidId?: number;
    public contractId?: number;
    public consultantId?: number;
    public constructionProjectId?: number;
    public id: number;
    public designProjectStatus?: DesignProjectStatus;
    public designConsultantId?: number;
    public designId?: number;
    public designStageTemplateId?: number;
    public designSowId?: number;
    public governorateDisplayName?: string;
    public wilayatDisplayName?: string;

    public constructor(init?: Partial<ContractProjectDto>) { (Object as any).assign(this, init); }
}

export class ContractBidCostItemDto implements IContractBidCostItemDto
{
    public name?: string;
    public translationKey?: string;
    public quantity?: number;
    public quantityUnit?: string;
    public price?: number;
    public bidCostId?: number;
    public id: number;

    public constructor(init?: Partial<ContractBidCostItemDto>) { (Object as any).assign(this, init); }
}

export class ContractBidCostDto implements IContractBidCostDto
{
    public costType?: ConstructionType;
    public rials?: boolean;
    public totalPrice?: number;
    public bidId?: number;
    public costItems?: ContractBidCostItemDto[];
    public id: number;

    public constructor(init?: Partial<ContractBidCostDto>) { (Object as any).assign(this, init); }
}

export class ContractBidDto implements IContractBidDto
{
    public totalPrice?: number;
    public structureItemsTotalPrice?: number;
    public turnkeyItemsTotalPrice?: number;
    public totalDays?: number;
    public numberOfCurrentProjects?: number;
    public message?: string;
    public bidCosts?: ContractBidCostDto[];
    public contractId?: number;
    public id: number;
    public contractorId?: number;

    public constructor(init?: Partial<ContractBidDto>) { (Object as any).assign(this, init); }
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

export class ContractStagePlanUnitDto implements IContractStagePlanUnitDto
{
    public orderNumber?: number;
    public numberOfTasks?: number;
    public stageName?: string;
    public suggestedPercentage?: number;
    public description?: string;
    public stageNameArabic?: string;
    public descriptionArabic?: string;
    public sowItems?: number[];
    public workflows?: number[];
    public valueOfStageInPercentage?: number;
    public valueOfStageInOmr?: number;
    public timeOfStage?: number;
    public planPartId?: number;
    public id: number;

    public constructor(init?: Partial<ContractStagePlanUnitDto>) { (Object as any).assign(this, init); }
}

export class ContractStagePlanPartDto implements IContractStagePlanPartDto
{
    public planStage?: StageTemplatePlanStage;
    public limitPercentage?: number;
    public totalDays?: number;
    public planId?: number;
    public planUnits?: ContractStagePlanUnitDto[];
    public id: number;

    public constructor(init?: Partial<ContractStagePlanPartDto>) { (Object as any).assign(this, init); }
}

export class ContractStagePlanDto implements IContractStagePlanDto
{
    public stageId?: string;
    public stageLevels?: number;
    public projectScope?: number;
    public numberOfInspections?: number;
    public projectScopeTwo?: number;
    public basement?: number;
    public additionalFloors?: number;
    public outerBlocks?: number;
    public groundFloor?: boolean;
    public levellingFloor?: boolean;
    public penthouseFloor?: boolean;
    public pool?: boolean;
    public planParts?: ContractStagePlanPartDto[];
    public contractId?: number;
    public id: number;

    public constructor(init?: Partial<ContractStagePlanDto>) { (Object as any).assign(this, init); }
}

export enum CompanyType
{
    None = 0,
    Consultant = 1,
    Contractor = 2,
}

export class BaseCompanyDto
{
    public companyId?: number;
    public companyType?: CompanyType;
    public ownerId?: number;
    public companyLogoId?: string;
    public name?: string;
    public nameInArabic?: string;
    public crNumber?: string;
    public headOfficeGovernorateId?: number;
    public headOfficeWilayatId?: number;
    public bankName?: string;
    public accountHolderName?: string;
    public accountNumber?: string;
    public companyOwnerName?: string;
    public companyOwnerNameInArabic?: string;
    public companyIdNumber?: string;
    public workerName?: string;
    public workerId?: number;
    public workerPhoneNumber?: string;
    public workerEmail?: string;
    public workerPictureId?: string;
    public workerIdNumber?: string;

    public constructor(init?: Partial<BaseCompanyDto>) { (Object as any).assign(this, init); }
}

export class ContractConsultantDto extends BaseCompanyDto
{
    public pricePerVisit?: number;

    public constructor(init?: Partial<ContractConsultantDto>) { super(init); (Object as any).assign(this, init); }
}

export enum CompanyRelationship
{
    None = 0,
    Partner = 1,
    Engineer = 2,
    Supervisor = 3,
    Architect = 5,
}

export class ContractContractorDto extends BaseCompanyDto
{
    public companyRelationship?: CompanyRelationship;

    public constructor(init?: Partial<ContractContractorDto>) { super(init); (Object as any).assign(this, init); }
}

export class ContractFileDto implements IContractFileDto
{
    public orderNumber?: number;
    public headline?: string;
    public fileId?: string;
    public contractId?: number;
    public id: number;

    public constructor(init?: Partial<ContractFileDto>) { (Object as any).assign(this, init); }
}

export class ContractDto implements IContractDto
{
    public status?: ContractStatus;
    public workflowIds?: number[];
    public contractorMaterials?: ContractSowItemDto[];
    public clientMaterials?: ContractSowItemDto[];
    public templateId?: number;
    public clientInformation?: ContractClientDto;
    public clientSignature?: ContractSignatureDto;
    public contractorSignature?: ContractSignatureDto;
    public consultantSignature?: ContractSignatureDto;
    public project?: ContractProjectDto;
    public bid?: ContractBidDto;
    public stagePlan?: ContractStagePlanDto;
    public consultantCompany?: ContractConsultantDto;
    public contractorCompany?: ContractContractorDto;
    public files?: ContractFileDto[];
    public fileId?: string;
    public projectStartDate?: string;
    public id: number;

    public constructor(init?: Partial<ContractDto>) { (Object as any).assign(this, init); }
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

export class BasePutOperationResult<T> extends OperationResult
{
    public id: T;

    public constructor(init?: Partial<BasePutOperationResult<T>>) { super(init); (Object as any).assign(this, init); }
}

export class PutOperationResult extends BasePutOperationResult<number>
{

    public constructor(init?: Partial<PutOperationResult>) { super(init); (Object as any).assign(this, init); }
}

export class ConsultantContractedPrice
{
    public consultantId?: number;
    public pricePerVisit?: number;

    public constructor(init?: Partial<ConsultantContractedPrice>) { (Object as any).assign(this, init); }
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

export enum ContractTemplateStatus
{
    None = 0,
    Drafted = 1,
    Live = 2,
    Inactive = 3,
}

export class ContractTemplateContentDto implements IContractTemplateContentDto
{
    public orderNumber?: number;
    public headline?: string;
    public fileId?: string;
    public templateId?: number;
    public id: number;

    public constructor(init?: Partial<ContractTemplateContentDto>) { (Object as any).assign(this, init); }
}

export class ContractTemplateDto implements IContractTemplateDto
{
    public contractName?: string;
    public usedFrom?: string;
    public usedTo?: string;
    public signedContracts?: number;
    public status?: ContractTemplateStatus;
    public contents?: ContractTemplateContentDto[];
    public id: number;

    public constructor(init?: Partial<ContractTemplateDto>) { (Object as any).assign(this, init); }
}

export interface IContractDto
{
    status?: ContractStatus;
    templateId?: number;
    clientSignature?: ContractSignatureDto;
    contractorSignature?: ContractSignatureDto;
    consultantSignature?: ContractSignatureDto;
    project?: ContractProjectDto;
    bid?: ContractBidDto;
    stagePlan?: ContractStagePlanDto;
    files?: ContractFileDto[];
    contractorMaterials?: ContractSowItemDto[];
    clientMaterials?: ContractSowItemDto[];
}

export interface IContractSowItemDto
{
    category?: SowItemCategory;
    orderNumber?: number;
    englishName?: string;
    arabicName?: string;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    contractId?: number;
    itemUnits?: ContractSowItemUnitDto[];
}

export interface IContractSignatureDto
{
    subject?: Subject;
    fileId?: string;
    contractId?: number;
}

export interface IContractProjectDto
{
    projectNumber?: string;
    clientId?: number;
    landArea?: number;
    buildingAllAreaInTheDrawings?: boolean;
    addedBuiltUpArea?: number;
    projectType?: ConstructionType;
    landType?: ConstructionLandType;
    startingStep?: ProjectStartingStep;
    additionalComment?: string;
    krookieFiles?: string[];
    drawingFiles?: string[];
    wilayatId?: number;
    governorateId?: number;
    stagePlanId?: number;
    projectBidId?: number;
    constructionProjectId?: number;
    contractId?: number;
}

export interface IContractBidDto
{
    totalPrice?: number;
    structureItemsTotalPrice?: number;
    turnkeyItemsTotalPrice?: number;
    totalDays?: number;
    numberOfCurrentProjects?: number;
    message?: string;
    contractId?: number;
    bidCosts?: ContractBidCostDto[];
}

export interface IContractStagePlanDto
{
    stageId?: string;
    stageLevels?: number;
    projectScope?: number;
    numberOfInspections?: number;
    projectScopeTwo?: number;
    basement?: number;
    additionalFloors?: number;
    outerBlocks?: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
    planParts?: ContractStagePlanPartDto[];
    contractId?: number;
}

export interface IContractSowItemUnitDto
{
    orderNumber?: number;
    englishDescription?: string;
    arabicDescription?: string;
    titleEnglish?: string;
    titleArabic?: string;
    supplier?: string;
    rate?: number;
    acceptanceWorkflow?: number;
    itemId?: number;
}

export interface IContractBidCostDto
{
    costType?: ConstructionType;
    rials?: boolean;
    totalPrice?: number;
    bidId?: number;
    costItems?: ContractBidCostItemDto[];
}

export interface IContractStagePlanPartDto
{
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
    totalDays?: number;
    planId?: number;
    planUnits?: ContractStagePlanUnitDto[];
}

export interface IContractBidCostItemDto
{
    name?: string;
    translationKey?: string;
    quantity?: number;
    quantityUnit?: string;
    price?: number;
    bidCostId?: number;
}

export interface IContractStagePlanUnitDto
{
    orderNumber?: number;
    stageName?: string;
    suggestedPercentage?: number;
    description?: string;
    stageNameArabic?: string;
    descriptionArabic?: string;
    sowItems?: number[];
    valueOfStageInPercentage?: number;
    valueOfStageInOmr?: number;
    timeOfStage?: number;
    planPartId?: number;
}

export class GetContractResponse extends BaseSingleResponse<ContractDto>
{

    public constructor(init?: Partial<GetContractResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContractByProjectIdResponse extends BaseSingleResponse<ContractDto>
{

    public constructor(init?: Partial<GetContractByProjectIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractStatusToSignedResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractStatusToSignedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractStatusToLiveResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractStatusToLiveResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractStatusToArchivedResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractStatusToArchivedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractCompanyDetailsResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateContractCompanyDetailsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractClientResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateContractClientResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContractedPricePerVisitResponse extends BaseSingleResponse<ConsultantContractedPrice>
{

    public constructor(init?: Partial<GetContractedPricePerVisitResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContractBankDetailsResponse
{
    public result?: BaseCompanyDto;

    public constructor(init?: Partial<GetContractBankDetailsResponse>) { (Object as any).assign(this, init); }
}

export class CreateDocumentResponse
{
    public result: string;

    public constructor(init?: Partial<CreateDocumentResponse>) { (Object as any).assign(this, init); }
}

export class ListContractFileResponse extends BaseMultipleResultResponse<ContractFileDto>
{

    public constructor(init?: Partial<ListContractFileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractFileByContractIdResponse extends BaseMultipleResultResponse<ContractFileDto>
{

    public constructor(init?: Partial<ListContractFileByContractIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContractFileResponse extends BaseSingleResponse<ContractFileDto>
{

    public constructor(init?: Partial<GetContractFileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractFileResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractFileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractFileResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractFileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchContractFileOrderResponse extends OperationResult
{

    public constructor(init?: Partial<PatchContractFileOrderResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractFileResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateContractFileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractSignatureResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractSignatureResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractSignatureResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractSignatureResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractTemplateResponse extends BaseMultipleResultResponse<ContractTemplateDto>
{

    public constructor(init?: Partial<ListContractTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContractTemplateResponse extends BaseSingleResponse<ContractTemplateDto>
{

    public constructor(init?: Partial<GetContractTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetWholeContractTemplateResponse extends BaseSingleResponse<ContractTemplateDto>
{

    public constructor(init?: Partial<GetWholeContractTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetMasterContractTemplateResponse extends BaseSingleResponse<ContractTemplateDto>
{

    public constructor(init?: Partial<GetMasterContractTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractTemplateResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateDraftContractTemplateResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateDraftContractTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractTemplateResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractTemplateResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateContractTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateToMasterContractTemplateResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateToMasterContractTemplateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractTemplateContentResponse extends BaseMultipleResultResponse<ContractTemplateContentDto>
{

    public constructor(init?: Partial<ListContractTemplateContentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractTemplateContentByIdResponse extends BaseMultipleResultResponse<ContractTemplateContentDto>
{

    public constructor(init?: Partial<ListContractTemplateContentByIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContractTemplateContentResponse extends BaseSingleResponse<ContractTemplateContentDto>
{

    public constructor(init?: Partial<GetContractTemplateContentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractTemplateContentResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractTemplateContentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractTemplateContentResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractTemplateContentResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchContractTemplateContentOrderResponse extends OperationResult
{

    public constructor(init?: Partial<PatchContractTemplateContentOrderResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractTemplateContentResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateContractTemplateContentResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/contract/getcontractquery/{id}", "GET")
export class GetContractQuery implements IReturn<GetContractResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetContractQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractResponse(); }
}

// @Route("/contract/getcontractbyprojectidquery", "GET")
export class GetContractByProjectIdQuery implements IReturn<GetContractByProjectIdResponse>, IGet
{
    // @Required()
    public projectId: number;

    public constructor(init?: Partial<GetContractByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractByProjectIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractByProjectIdResponse(); }
}

// @Route("/contract/createcontractcommand", "POST")
export class CreateContractCommand implements IReturn<CreateContractResponse>, IPost
{
    // @Required()
    public projectId: number;

    public constructor(init?: Partial<CreateContractCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractResponse(); }
}

// @Route("/contract/deletecontractcommand/{id}", "DELETE")
export class DeleteContractCommand implements IReturn<DeleteContractResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractResponse(); }
}

// @Route("/contract/updatecontractstatustosignedcommand/{id}", "PUT")
export class UpdateContractStatusToSignedCommand implements IReturn<UpdateContractStatusToSignedResponse>, IPost
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractStatusToSignedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractStatusToSignedCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateContractStatusToSignedResponse(); }
}

// @Route("/contract/updatecontractstatustolivecommand/{id}", "PUT")
export class UpdateContractStatusToLiveCommand implements IReturn<UpdateContractStatusToLiveResponse>, IPost
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractStatusToLiveCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractStatusToLiveCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateContractStatusToLiveResponse(); }
}

// @Route("/contract/updatecontractstatustoarchivedcommand/{id}", "PUT")
export class UpdateContractStatusToArchivedCommand implements IReturn<UpdateContractStatusToArchivedResponse>, IPost
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractStatusToArchivedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractStatusToArchivedCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateContractStatusToArchivedResponse(); }
}

// @Route("/contract/updatecontractcompanydetailscommand", "PUT")
export class UpdateContractCompanyDetailsCommand implements IReturn<UpdateContractCompanyDetailsResponse>, IPut
{
    public contractId?: number;
    public companyId?: number;
    public bankName?: string;
    public accountHolderName?: string;
    public accountNumber?: string;
    public companyOwnerName?: string;
    public companyOwnerNameInArabic?: string;
    public companyIdNumber?: string;
    public workerName?: string;
    public workerId?: number;
    public workerIdNumber?: string;
    public workerPhoneNumber?: string;
    public workerEmail?: string;
    public workerPictureId?: string;

    public constructor(init?: Partial<UpdateContractCompanyDetailsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractCompanyDetailsCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractCompanyDetailsResponse(); }
}

// @Route("/contract/updatecontractclientcommand", "PUT")
export class UpdateContractClientCommand implements IReturn<UpdateContractClientResponse>, IPut
{
    public contractId?: number;
    public contractClientName?: string;
    public contractClientNameArabic?: string;
    public nationalId?: string;

    public constructor(init?: Partial<UpdateContractClientCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractClientCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractClientResponse(); }
}

// @Route("/contract/getcontractedpricepervisitquery", "GET")
export class GetContractedPricePerVisitQuery implements IReturn<GetContractedPricePerVisitResponse>, IGet
{
    public projectId?: number;

    public constructor(init?: Partial<GetContractedPricePerVisitQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractedPricePerVisitQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractedPricePerVisitResponse(); }
}

// @Route("/contract/getcontractbankdetailsquery", "GET")
export class GetContractBankDetailsQuery implements IReturn<GetContractBankDetailsResponse>, IGet
{
    public constructionProjectId?: number;
    public contextType?: ContextType;

    public constructor(init?: Partial<GetContractBankDetailsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractBankDetailsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractBankDetailsResponse(); }
}

// @Route("/contract/createdocumentrequest", "GET")
export class CreateDocumentRequest implements IReturn<CreateDocumentResponse>, IGet
{

    public constructor(init?: Partial<CreateDocumentRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateDocumentRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new CreateDocumentResponse(); }
}

// @Route("/contract/listcontractfilequery", "GET")
export class ListContractFileQuery implements IReturn<ListContractFileResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListContractFileQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractFileQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractFileResponse(); }
}

// @Route("/contract/listcontractfilebycontractidquery", "GET")
export class ListContractFileByContractIdQuery implements IReturn<ListContractFileByContractIdResponse>, IGet
{
    // @Required()
    public contractId: number;

    public constructor(init?: Partial<ListContractFileByContractIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractFileByContractIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractFileByContractIdResponse(); }
}

// @Route("/contract/getcontractfilequery/{id}", "GET")
export class GetContractFileQuery implements IReturn<GetContractFileResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetContractFileQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractFileQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractFileResponse(); }
}

// @Route("/contract/createcontractfilecommand", "POST")
export class CreateContractFileCommand implements IReturn<CreateContractFileResponse>, IPost, IContractFileDto
{
    // @Required()
    public orderNumber: number;

    // @Required()
    public headline: string;

    // @Required()
    public fileId: string;

    // @Required()
    public contractId: number;

    public constructor(init?: Partial<CreateContractFileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractFileCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractFileResponse(); }
}

// @Route("/contract/deletecontractfilecommand/{id}", "DELETE")
export class DeleteContractFileCommand implements IReturn<DeleteContractFileResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractFileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractFileCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractFileResponse(); }
}

// @Route("/contract/patchcontractfileordercommand", "PATCH")
export class PatchContractFileOrderCommand implements IReturn<PatchContractFileOrderResponse>, IPatch
{
    public orderItems?: OrderDto[];

    public constructor(init?: Partial<PatchContractFileOrderCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchContractFileOrderCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchContractFileOrderResponse(); }
}

// @Route("/contract/updatecontractfilecommand/{id}", "PUT")
export class UpdateContractFileCommand implements IReturn<UpdateContractFileResponse>, IPut, IContractFileDto
{
    // @Required()
    public orderNumber: number;

    // @Required()
    public headline: string;

    // @Required()
    public fileId: string;

    // @Required()
    public contractId: number;

    public id: number;

    public constructor(init?: Partial<UpdateContractFileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractFileCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractFileResponse(); }
}

// @Route("/contract/createcontractsignaturecommand", "POST")
export class CreateContractSignatureCommand implements IReturn<CreateContractSignatureResponse>, IPost
{
    // @Required()
    public subject: Subject;

    // @Required()
    public fileId: string;

    // @Required()
    public contractId: number;

    public workerId?: number;

    public constructor(init?: Partial<CreateContractSignatureCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractSignatureCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractSignatureResponse(); }
}

// @Route("/contract/deletecontractsignaturecommand/{id}", "DELETE")
export class DeleteContractSignatureCommand implements IReturn<DeleteContractSignatureResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractSignatureCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractSignatureCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractSignatureResponse(); }
}

// @Route("/contract/listcontracttemplatequery", "GET")
export class ListContractTemplateQuery implements IReturn<ListContractTemplateResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListContractTemplateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractTemplateQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractTemplateResponse(); }
}

// @Route("/contract/getcontracttemplatequery/{id}", "GET")
export class GetContractTemplateQuery implements IReturn<GetContractTemplateResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetContractTemplateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractTemplateQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractTemplateResponse(); }
}

// @Route("/contract/getwholecontracttemplatequery/{id}", "GET")
export class GetWholeContractTemplateQuery implements IReturn<GetWholeContractTemplateResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetWholeContractTemplateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWholeContractTemplateQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetWholeContractTemplateResponse(); }
}

// @Route("/contract/getmastercontracttemplatequery", "GET")
export class GetMasterContractTemplateQuery implements IReturn<GetMasterContractTemplateResponse>, IGet
{

    public constructor(init?: Partial<GetMasterContractTemplateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetMasterContractTemplateQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetMasterContractTemplateResponse(); }
}

// @Route("/contract/createcontracttemplatecommand", "POST")
export class CreateContractTemplateCommand implements IReturn<CreateContractTemplateResponse>, IPost, IContractTemplateDto
{
    // @Required()
    public contractName: string;

    public signedContracts?: number;

    public constructor(init?: Partial<CreateContractTemplateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractTemplateCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractTemplateResponse(); }
}

// @Route("/contract/createdraftcontracttemplatecommand", "POST")
export class CreateDraftContractTemplateCommand implements IReturn<CreateDraftContractTemplateResponse>, IPost
{

    public constructor(init?: Partial<CreateDraftContractTemplateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateDraftContractTemplateCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateDraftContractTemplateResponse(); }
}

// @Route("/contract/deletecontracttemplatecommand/{id}", "DELETE")
export class DeleteContractTemplateCommand implements IReturn<DeleteContractTemplateResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractTemplateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractTemplateCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractTemplateResponse(); }
}

// @Route("/contract/updatecontracttemplatecommand/{id}", "PUT")
export class UpdateContractTemplateCommand implements IReturn<UpdateContractTemplateResponse>, IPut, IContractTemplateDto
{
    // @Required()
    public contractName: string;

    public signedContracts?: number;
    public id: number;

    public constructor(init?: Partial<UpdateContractTemplateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractTemplateCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractTemplateResponse(); }
}

// @Route("/contract/updatetomastercontracttemplatecommand/{id}", "PUT")
export class UpdateToMasterContractTemplateCommand implements IReturn<UpdateToMasterContractTemplateResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateToMasterContractTemplateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateToMasterContractTemplateCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateToMasterContractTemplateResponse(); }
}

// @Route("/contract/listcontracttemplatecontentquery", "GET")
export class ListContractTemplateContentQuery implements IReturn<ListContractTemplateContentResponse>, IGet
{

    public constructor(init?: Partial<ListContractTemplateContentQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractTemplateContentQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractTemplateContentResponse(); }
}

// @Route("/contract/listcontracttemplatecontentbyidquery", "GET")
export class ListContractTemplateContentByIdQuery implements IReturn<ListContractTemplateContentByIdResponse>, IGet
{
    public templateId?: number;

    public constructor(init?: Partial<ListContractTemplateContentByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractTemplateContentByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractTemplateContentByIdResponse(); }
}

// @Route("/contract/getcontracttemplatecontentquery/{id}", "GET")
export class GetContractTemplateContentQuery implements IReturn<GetContractTemplateContentResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetContractTemplateContentQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractTemplateContentQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractTemplateContentResponse(); }
}

// @Route("/contract/createcontracttemplatecontentcommand", "POST")
export class CreateContractTemplateContentCommand implements IReturn<CreateContractTemplateContentResponse>, IPost, IContractTemplateContentDto
{
    // @Required()
    public orderNumber: number;

    // @Required()
    public headline: string;

    // @Required()
    public fileId: string;

    // @Required()
    public templateId: number;

    public constructor(init?: Partial<CreateContractTemplateContentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractTemplateContentCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractTemplateContentResponse(); }
}

// @Route("/contract/deletecontracttemplatecontentcommand/{id}", "DELETE")
export class DeleteContractTemplateContentCommand implements IReturn<DeleteContractTemplateContentResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractTemplateContentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractTemplateContentCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractTemplateContentResponse(); }
}

// @Route("/contract/patchcontracttemplatecontentordercommand", "PATCH")
export class PatchContractTemplateContentOrderCommand implements IReturn<PatchContractTemplateContentOrderResponse>, IPatch
{
    public orderItems?: OrderDto[];

    public constructor(init?: Partial<PatchContractTemplateContentOrderCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchContractTemplateContentOrderCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchContractTemplateContentOrderResponse(); }
}

// @Route("/contract/updatecontracttemplatecontentcommand/{id}", "PUT")
export class UpdateContractTemplateContentCommand implements IReturn<UpdateContractTemplateContentResponse>, IPut, IContractTemplateContentDto
{
    // @Required()
    public orderNumber: number;

    // @Required()
    public headline: string;

    // @Required()
    public fileId: string;

    // @Required()
    public templateId: number;

    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractTemplateContentCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractTemplateContentCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractTemplateContentResponse(); }
}
