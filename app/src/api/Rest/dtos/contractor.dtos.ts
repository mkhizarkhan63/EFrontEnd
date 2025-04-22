// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2024-10-08 15:47:54
Version: 6.50
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://10.42.3.172:5000/

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

export interface IPost
{
}

export interface IGet
{
}

export interface IPut
{
}

export interface IDelete
{
}

export enum CompanyType
{
    None = 0,
    Consultant = 1,
    Contractor = 2,
}

export class ShortConsultantGovernorateDto
{
    public price?: number;
    public wilayatId?: number;
    public governorateId?: number;

    public constructor(init?: Partial<ShortConsultantGovernorateDto>) { (Object as any).assign(this, init); }
}

export interface IPaginatedRequest
{
    page?: number;
    pageSize?: number;
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

export interface ICompanyInviteDto
{
    companyName?: string;
    email?: string;
    mobileNumber?: string;
}

export class CompanySort
{
    public idIsAscending?: boolean;
    public createdDateIsAscending?: boolean;
    public modifiedDateIsAscending?: boolean;
    public statusIsAscending?: boolean;
    public ownerIdIsAscending?: boolean;
    public nameIsAscending?: boolean;
    public emailIsAscending?: boolean;
    public phoneIsAscending?: boolean;
    public headOfficeGovernorateIdIsAscending?: boolean;
    public headOfficeWilayatIdIsAscending?: boolean;
    public crNumberIsAscending?: boolean;
    public crStartDateIsAscending?: boolean;
    public crExpirationDateIsAscending?: boolean;
    public projectDeliveredIsAscending?: boolean;
    public projectWorkedAtOnceIsAscending?: boolean;
    public largestProjectAwardIsAscending?: boolean;
    public failedCompleteAwardedWorkIsAscending?: boolean;
    public anyJudgmentsPendingOrOutstandingIsAscending?: boolean;
    public measuresToMaintainQualityIsAscending?: boolean;
    public otherPlanningSoftwareIsAscending?: boolean;
    public projectAwardedIsAscending?: boolean;
    public projectParticipatedIsAscending?: boolean;
    public lastActivityIsAscending?: boolean;

    public constructor(init?: Partial<CompanySort>) { (Object as any).assign(this, init); }
}

export class ConsultantSort extends CompanySort
{
    public yoursYearsOfExperienceIsAscending?: boolean;
    public everyDesignPackageSizeIsAscending?: boolean;
    public everyDesignPackagePriceIsAscending?: boolean;
    public provideDesignServiceIsAscending?: boolean;
    public provideSupervisionServiceIsAscending?: boolean;

    public constructor(init?: Partial<ConsultantSort>) { super(init); (Object as any).assign(this, init); }
}

export class ConsultantFilter
{
    public name?: string;
    public designBudget?: number;
    public productIds?: number[];
    public averageRating?: number;
    public governorateIds?: number[];

    public constructor(init?: Partial<ConsultantFilter>) { (Object as any).assign(this, init); }
}

export enum AffiliationType
{
    None = 0,
    Partner = 1,
    Engineer = 2,
    Supervisor = 3,
    Owner = 4,
    Architect = 5,
}

export class ConsultantProductDto
{
    public isChecked?: boolean;
    public price?: number;
    public productId?: number;
    public companyId?: number;
    public id: number;

    public constructor(init?: Partial<ConsultantProductDto>) { (Object as any).assign(this, init); }
}

export class ConsultantGovernorateDto
{
    public price?: number;
    public wilayatId?: number;
    public companyId?: number;
    public governorateId?: number;
    public id: number;

    public constructor(init?: Partial<ConsultantGovernorateDto>) { (Object as any).assign(this, init); }
}

export enum ConsultantOrganization
{
    None = 0,
    OmanHousingBank = 1,
    OmanTenderBoard = 2,
    OmanSocietyOfEngineers = 3,
    Others = 4,
}

export class ConsultantOrganizationDto implements IConsultantOrganizationDto
{
    public organization?: ConsultantOrganization;
    public otherOrganization?: string;
    public companyId?: number;
    public id: number;

    public constructor(init?: Partial<ConsultantOrganizationDto>) { (Object as any).assign(this, init); }
}

export class ConsultantDesignServiceDto
{
    public landSizeFrom?: number;
    public landSizeTo?: number;
    public price?: number;
    public serviceUnits?: number[];
    public companyId?: number;
    public id: number;

    public constructor(init?: Partial<ConsultantDesignServiceDto>) { (Object as any).assign(this, init); }
}

export enum ConsultantAffiliationType
{
    None = 0,
    Partner = 1,
    Engineer = 2,
    Supervisor = 3,
    Architect = 5,
}

export enum LinkedProfileStatus
{
    None = 0,
    Pending = 1,
    Approved = 2,
}

export class ConsultantLinkedProfileDto
{
    public consultantAffiliationType?: ConsultantAffiliationType;
    public status?: LinkedProfileStatus;
    public phone?: string;
    public companyId?: number;
    public userId?: number;
    public id: number;

    public constructor(init?: Partial<ConsultantLinkedProfileDto>) { (Object as any).assign(this, init); }
}

export class BaseClientReference
{
    public clientName?: string;
    public phoneNumber?: string;
    public governorateId?: number;
    public wilayatId?: number;
    public projectValue?: number;
    public projectCompletionDate?: string;
    public imagesIds?: string[];
    public companyId?: number;
    public startDate?: string;

    public constructor(init?: Partial<BaseClientReference>) { (Object as any).assign(this, init); }
}

export class ClientReferenceDto extends BaseClientReference implements IClientReferenceDto
{
    public id: number;

    public constructor(init?: Partial<ClientReferenceDto>) { super(init); (Object as any).assign(this, init); }
}

export enum DesignType
{
    None = 0,
    Design = 1,
    Supervision = 2,
}

export class BaseConsultantProjectReview
{
    public recommendation?: number;
    public communication?: number;
    public qualityOfWork?: number;
    public speedOfWork?: number;
    public management?: number;
    public cooperation?: number;
    public feedBack?: string;
    public clientReferenceId?: number;

    public constructor(init?: Partial<BaseConsultantProjectReview>) { (Object as any).assign(this, init); }
}

export class ConsultantProjectReviewDto extends BaseConsultantProjectReview
{
    public averageGrade?: number;
    public createdDate?: string;
    public id: number;

    public constructor(init?: Partial<ConsultantProjectReviewDto>) { super(init); (Object as any).assign(this, init); }
}

export enum ReviewStatus
{
    None = 0,
    Reviewing = 1,
    Approved = 2,
    Rejected = 3,
}

export class ConsultantClientReferenceDto extends ClientReferenceDto
{
    public designType?: DesignType;
    public review?: ConsultantProjectReviewDto;
    public status?: ReviewStatus;

    public constructor(init?: Partial<ConsultantClientReferenceDto>) { super(init); (Object as any).assign(this, init); }
}

export enum ResourceType
{
    None = 0,
    Engineer = 1,
    Labors = 2,
    Administration = 3,
    Machinery = 4,
}

export class ResourceDto
{
    public numberOfUnit?: number;
    public specializationId?: number;
    public companyId?: number;
    public resourceType?: ResourceType;
    public id: number;

    public constructor(init?: Partial<ResourceDto>) { (Object as any).assign(this, init); }
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
    public addresUrl?: string;
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
    Invited = 5,
}

export enum PlanningSoftware
{
    None = 0,
    Excel = 1,
    MicrosoftProject = 2,
    Primavera = 3,
    Other = 4,
}

export class BaseCompany
{
    public marketings?: MarketingInformationDto[];
    public status?: CompanyStatus;
    // @Required()
    public ownerId: number;

    public companyLogoId?: string;
    // @Required()
    public name: string;

    public nameInArabic?: string;
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

    public planningSoftware?: PlanningSoftware[];
    // @Required()
    public otherPlanningSoftware: string;

    // @Required()
    public additionalInformation: string;

    public crCertificate?: string[];
    public ownerNationalId?: string[];
    public manpowerReportIssuedByMom?: string[];
    public companyProfile?: string[];
    public otherFiles?: string[];
    public companyType?: CompanyType;
    public ownerName?: string;
    public ownerPhone?: string;
    public ownerEmail?: string;

    public constructor(init?: Partial<BaseCompany>) { (Object as any).assign(this, init); }
}

export class BaseConsultant extends BaseCompany
{
    public products?: ConsultantProductDto[];
    public governorates?: ConsultantGovernorateDto[];
    public registeredAt?: ConsultantOrganizationDto[];
    public designServices?: ConsultantDesignServiceDto[];
    public linkedProfiles?: ConsultantLinkedProfileDto[];
    public references?: ConsultantClientReferenceDto[];
    public provideDesignService?: boolean;
    public provideSupervisionService?: boolean;
    public yoursYearsOfExperience?: number;
    public everyDesignPackageSize?: number;
    public everyDesignPackagePrice?: number;
    public resources?: ResourceDto[];

    public constructor(init?: Partial<BaseConsultant>) { super(init); (Object as any).assign(this, init); }
}

export interface IConsultantDto extends ICompanyDto
{
    provideDesignService?: boolean;
    provideSupervisionService?: boolean;
    yoursYearsOfExperience?: number;
    products?: ConsultantProductDto[];
    governorates?: ConsultantGovernorateDto[];
    registeredAt?: ConsultantOrganizationDto[];
    designServices?: ConsultantDesignServiceDto[];
    linkedProfiles?: ConsultantLinkedProfileDto[];
    resources?: ResourceDto[];
}

export interface ICompanyDto
{
    ownerId?: number;
    name?: string;
    nameInArabic?: string;
    email?: string;
    phone?: string;
    headOfficeGovernorateId?: number;
    headOfficeWilayatId?: number;
    crNumber?: string;
    crStartDate?: string;
    crExpirationDate?: string;
    projectsDelivered?: number;
    projectsWorkedAtOnce?: number;
    largestProjectAwarded?: number;
    failedCompleteAwardedWork?: boolean;
    anyJudgmentsPendingOrOutstanding?: boolean;
    measuresToMaintainQuality?: string;
    planningSoftware?: PlanningSoftware[];
    otherPlanningSoftware?: string;
    additionalInformation?: string;
    companyLogoId?: string;
    crCertificate?: string[];
    ownerNationalId?: string[];
    manpowerReportIssuedByMom?: string[];
    companyProfile?: string[];
    otherFiles?: string[];
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

export interface IClientReferenceDto
{
    clientName?: string;
    phoneNumber?: string;
    governorateId?: number;
    wilayatId?: number;
    projectValue?: number;
    projectCompletionDate?: string;
}

export class BaseConsultantDesignService
{
    public landSizeFrom?: number;
    public landSizeTo?: number;
    public price?: number;
    public serviceUnits?: number[];
    public companyId?: number;

    public constructor(init?: Partial<BaseConsultantDesignService>) { (Object as any).assign(this, init); }
}

export interface IConsultantDesignServiceDto
{
    landSizeFrom?: number;
    landSizeTo?: number;
    price?: number;
    serviceUnits?: number[];
    companyId?: number;
}

export interface IConsultantGovernorateDto
{
    price?: number;
    wilayatId?: number;
    companyId?: number;
    governorateId?: number;
}

export interface IConsultantLinkedProfileDto
{
    consultantAffiliationType?: ConsultantAffiliationType;
    companyId?: number;
    userId?: number;
}

export enum LinkedProfileDeletionType
{
    None = 0,
    DeleteLink = 1,
    RejectAffiliation = 2,
}

export enum LinkedProfileUpdateType
{
    None = 0,
    AcceptProfile = 1,
    UpdateRecord = 2,
}

export interface IMarketingInformationDto
{
    marketingService?: MarketingService;
    addresUrl?: string;
    companyId?: number;
}

export interface IConsultantOrganizationDto
{
    organization?: ConsultantOrganization;
    otherOrganization?: string;
    companyId?: number;
}

export interface IResourceDto
{
    resourceType?: ResourceType;
    numberOfUnit?: number;
    companyId?: number;
}

export class ContractorSort extends CompanySort
{
    public yoursYearsOfExperienceIsAscending?: boolean;
    public chargeBlackProjectsIsAscending?: boolean;
    public chargeTurnkeyProjectsIsAscending?: boolean;
    public minimumProjectSizeIsAscending?: boolean;
    public otherContractingCompaniesIsAscending?: boolean;

    public constructor(init?: Partial<ContractorSort>) { super(init); (Object as any).assign(this, init); }
}

export enum CompanyRelationship
{
    None = 0,
    Partner = 1,
    Engineer = 2,
    Supervisor = 3,
    Architect = 5,
}

export class ContractorProductDto
{
    public other?: string;
    public productUnitId?: number;
    public companyId?: number;
    public id: number;

    public constructor(init?: Partial<ContractorProductDto>) { (Object as any).assign(this, init); }
}

export class ContractorServiceDto
{
    public other?: string;
    public serviceUnitId?: number;
    public companyId?: number;
    public id: number;

    public constructor(init?: Partial<ContractorServiceDto>) { (Object as any).assign(this, init); }
}

export class ContractorCompanyDto
{
    public companyName?: string;
    public crNumber?: string;
    public manPower?: number;
    public typeOfServiceOrProduct?: string;
    public companyId?: number;
    public id: number;

    public constructor(init?: Partial<ContractorCompanyDto>) { (Object as any).assign(this, init); }
}

export enum ContractorOrganization
{
    None = 0,
    OmanHousingBank = 1,
    OmanTenderBoard = 2,
    PDO = 3,
    Others = 4,
}

export class ContractorOrganizationDto
{
    public organization?: ContractorOrganization;
    public otherOrganization?: string;
    public companyId?: number;
    public id: number;

    public constructor(init?: Partial<ContractorOrganizationDto>) { (Object as any).assign(this, init); }
}

export enum ContractorAffiliationType
{
    None = 0,
    Partner = 1,
    Engineer = 2,
    Supervisor = 3,
}

export class ContractorLinkedProfileDto implements IContractorLinkedProfileDto
{
    public contractorAffiliationType?: ContractorAffiliationType;
    public companyId?: number;
    public userId?: number;
    public phone?: string;
    public status?: LinkedProfileStatus;
    public id: number;

    public constructor(init?: Partial<ContractorLinkedProfileDto>) { (Object as any).assign(this, init); }
}

export class ContractorResourceDto extends ResourceDto
{
    public machine?: string;

    public constructor(init?: Partial<ContractorResourceDto>) { super(init); (Object as any).assign(this, init); }
}

export enum ConstructionType
{
    None = 0,
    StructureOnly = 1,
    TurnKey = 2,
}

export class BaseContractorProjectReview
{
    public recommendation?: number;
    public communication?: number;
    public qualityOfWork?: number;
    public speedOfWork?: number;
    public management?: number;
    public cooperation?: number;
    public feedBack?: string;
    public clientReferenceId?: number;

    public constructor(init?: Partial<BaseContractorProjectReview>) { (Object as any).assign(this, init); }
}

export class ContractorProjectReviewDto extends BaseContractorProjectReview
{
    public averageGrade?: number;
    public createdDate?: string;
    public id: number;

    public constructor(init?: Partial<ContractorProjectReviewDto>) { super(init); (Object as any).assign(this, init); }
}

export class ContractorClientReferenceDto extends ClientReferenceDto
{
    public projectType?: ConstructionType;
    public review?: ContractorProjectReviewDto;
    public status?: ReviewStatus;

    public constructor(init?: Partial<ContractorClientReferenceDto>) { super(init); (Object as any).assign(this, init); }
}

export class BaseContractor extends BaseCompany
{
    public yoursYearsOfExperience?: number;
    public chargeBlackProjects?: number;
    public chargeTurnkeyProjects?: number;
    public companyRelationship?: CompanyRelationship;
    public minimumProjectSize?: number;
    public otherContractingCompanies?: boolean;
    public governorates?: number[];
    public products?: ContractorProductDto[];
    public services?: ContractorServiceDto[];
    public companies?: ContractorCompanyDto[];
    public registeredAt?: ContractorOrganizationDto[];
    public linkedProfiles?: ContractorLinkedProfileDto[];
    public resources?: ContractorResourceDto[];
    public references?: ContractorClientReferenceDto[];

    public constructor(init?: Partial<BaseContractor>) { super(init); (Object as any).assign(this, init); }
}

export interface IContractorDto extends ICompanyDto
{
    yoursYearsOfExperience?: number;
    chargeBlackProjects?: number;
    chargeTurnkeyProjects?: number;
    companyRelationship?: CompanyRelationship;
    minimumProjectSize?: number;
    otherContractingCompanies?: boolean;
    governorates?: number[];
    products?: ContractorProductDto[];
    services?: ContractorServiceDto[];
    companies?: ContractorCompanyDto[];
    registeredAt?: ContractorOrganizationDto[];
    linkedProfiles?: ContractorLinkedProfileDto[];
    resources?: ContractorResourceDto[];
}

export class ClientReferenceSort
{
    public idIsAscending?: boolean;
    public createdDateIsAscending?: boolean;
    public modifiedDateIsAscending?: boolean;
    public clientNameIsAscending?: boolean;
    public phoneNumberIsAscending?: boolean;
    public governorateIdIsAscending?: boolean;
    public wilayatIdIsAscending?: boolean;
    public projectValueIsAscending?: boolean;
    public projectTypeIsAscending?: boolean;
    public projectCompletionDateIsAscending?: boolean;

    public constructor(init?: Partial<ClientReferenceSort>) { (Object as any).assign(this, init); }
}

export class ContractorClientReferenceSort extends ClientReferenceSort
{
    public statusIsAscending?: boolean;

    public constructor(init?: Partial<ContractorClientReferenceSort>) { super(init); (Object as any).assign(this, init); }
}

export interface IContractorCompanyDto
{
    companyName?: string;
    crNumber?: string;
    manPower?: number;
    typeOfServiceOrProduct?: string;
    companyId?: number;
}

export interface IContractorLinkedProfileDto
{
    contractorAffiliationType?: ContractorAffiliationType;
    companyId?: number;
    userId?: number;
}

export interface IContractorOrganizationDto
{
    organization?: ContractorOrganization;
    otherOrganization?: string;
}

export enum DictionaryName
{
    None = 0,
    ProductUnit = 1,
    ServiceUnit = 2,
    Specialization = 3,
    DesignServiceUnit = 4,
    ConsultantProductUnit = 5,
}

export interface IContractorProjectReviewDto
{
    recommendation?: number;
    communication?: number;
    qualityOfWork?: number;
    speedOfWork?: number;
    management?: number;
    cooperation?: number;
    feedBack?: string;
    clientReferenceId?: number;
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

export class CompanyDataDto
{
    public companyId?: number;
    public ownerId?: number;
    public companyType?: CompanyType;
    public companyStatus?: CompanyStatus;
    public name?: string;

    public constructor(init?: Partial<CompanyDataDto>) { (Object as any).assign(this, init); }
}

export class BaseSingleResponse<T>
{
    public result: T;

    public constructor(init?: Partial<BaseSingleResponse<T>>) { (Object as any).assign(this, init); }
}

export class CompanySearchDto
{
    public id: number;
    public name?: string;
    public companyLogoId?: string;
    public status?: CompanyStatus;
    public companyType?: CompanyType;

    public constructor(init?: Partial<CompanySearchDto>) { (Object as any).assign(this, init); }
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

export class CompanyDto extends BaseCompany implements ICompanyDto
{
    public id: number;

    public constructor(init?: Partial<CompanyDto>) { super(init); (Object as any).assign(this, init); }
}

export class CompanyLogoDto
{
    public id: number;
    public companyLogoId?: string;

    public constructor(init?: Partial<CompanyLogoDto>) { (Object as any).assign(this, init); }
}

export class CompanyNamesDto extends CompanyLogoDto
{
    public name?: string;
    public nameArabic?: string;

    public constructor(init?: Partial<CompanyNamesDto>) { super(init); (Object as any).assign(this, init); }
}

export class CompanyInviteDto implements ICompanyInviteDto
{
    public id: number;
    public companyName?: string;
    public email?: string;
    public mobileNumber?: string;

    public constructor(init?: Partial<CompanyInviteDto>) { (Object as any).assign(this, init); }
}

export class ContextDto implements IContextDto
{
    public id: number;
    public companyId?: number;
    public name?: string;
    public contextIcon?: string;
    public type?: ContextType;

    public constructor(init?: Partial<ContextDto>) { (Object as any).assign(this, init); }
}

export class ContextAffiliationDto
{
    public context?: ContextDto;
    public affiliationType?: AffiliationType;

    public constructor(init?: Partial<ContextAffiliationDto>) { (Object as any).assign(this, init); }
}

export enum SpecialProfileMode
{
    None = 0,
    SimpleContractorCreation = 1,
    SimpleConsultantCreation = 2,
}

export class ProfileModeDto
{
    public id: number;
    public mode?: SpecialProfileMode;
    public projectId?: number;

    public constructor(init?: Partial<ProfileModeDto>) { (Object as any).assign(this, init); }
}

export class ProfileDto implements IProfileDto
{
    public id: number;
    public name?: string;
    public email?: string;
    public phone?: string;
    public profilePicture?: string;
    public defaultContextId?: number;
    public defaultType?: ContextType;
    public contextsAffiliation?: ContextAffiliationDto[];
    public profileModes?: ProfileModeDto[];

    public constructor(init?: Partial<ProfileDto>) { (Object as any).assign(this, init); }
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

export class TempCompanyIdDto
{
    public newCompanyId?: number;
    public oldCompanyId?: number;
    public companyType?: CompanyType;

    public constructor(init?: Partial<TempCompanyIdDto>) { (Object as any).assign(this, init); }
}

export class CompanyManagementDto
{
    public id: number;
    public name?: string;
    public pendingPayments?: number;
    public companyLogoId?: string;
    public projectsParticipated?: number;
    public projectsAwarded?: number;
    public lastActivity?: string;
    public status?: CompanyStatus;
    public companyType?: CompanyType;

    public constructor(init?: Partial<CompanyManagementDto>) { (Object as any).assign(this, init); }
}

export class CompanyStatusDto
{
    public id: number;
    public status?: CompanyStatus;

    public constructor(init?: Partial<CompanyStatusDto>) { (Object as any).assign(this, init); }
}

export class CompanyInformationDto extends CompanyLogoDto
{
    public name?: string;
    public email?: string;
    public phone?: string;

    public constructor(init?: Partial<CompanyInformationDto>) { super(init); (Object as any).assign(this, init); }
}

export class ConsultantProjectStarsDto
{
    public averageRecommendation?: number;
    public averageCommunication?: number;
    public averageQualityOfWork?: number;
    public averageSpeedOfWork?: number;
    public averageManagement?: number;
    public averageCooperation?: number;
    public overallAverageGrade?: number;

    public constructor(init?: Partial<ConsultantProjectStarsDto>) { (Object as any).assign(this, init); }
}

export class ConsultantDto extends BaseConsultant implements IConsultantDto
{
    public stars?: ConsultantProjectStarsDto;
    public id: number;

    public constructor(init?: Partial<ConsultantDto>) { super(init); (Object as any).assign(this, init); }
}

export class ConsultantSelectionDto
{
    public id: number;
    public name?: string;
    public companyLogoId?: string;
    public pricePerSquareMeter?: number;
    public yearsOfExperience?: number;
    public numberOfEngineers?: number;
    public numberOfServices?: number;
    public totalVisits?: number;
    public isInvited?: boolean;
    public templateTimeOfProject?: number;

    public constructor(init?: Partial<ConsultantSelectionDto>) { (Object as any).assign(this, init); }
}

export class BaseCompanyProfile
{
    public name?: string;
    public email?: string;
    public phone?: string;
    public marketings?: MarketingInformationDto[];

    public constructor(init?: Partial<BaseCompanyProfile>) { (Object as any).assign(this, init); }
}

export class CompanyProfileDto extends BaseCompanyProfile implements ICompanyProfileDto
{
    public id: number;

    public constructor(init?: Partial<CompanyProfileDto>) { super(init); (Object as any).assign(this, init); }
}

export class ConsultantProfileDto extends CompanyProfileDto implements IConsultantProfileDto
{
    public designServices?: ConsultantDesignServiceDto[];
    public linkedProfiles?: ConsultantLinkedProfileDto[];

    public constructor(init?: Partial<ConsultantProfileDto>) { super(init); (Object as any).assign(this, init); }
}

export class BasePatchOperationResult<T> extends OperationResult
{
    public id: T;

    public constructor(init?: Partial<BasePatchOperationResult<T>>) { super(init); (Object as any).assign(this, init); }
}

export class LinkedProfileErrors
{
    public alreadyAssign?: boolean;

    public constructor(init?: Partial<LinkedProfileErrors>) { (Object as any).assign(this, init); }
}

export class ContractorProjectStarsDto
{
    public averageRecommendation?: number;
    public averageCommunication?: number;
    public averageQualityOfWork?: number;
    public averageSpeedOfWork?: number;
    public averageManagement?: number;
    public averageCooperation?: number;
    public overallAverageGrade?: number;

    public constructor(init?: Partial<ContractorProjectStarsDto>) { (Object as any).assign(this, init); }
}

export class ContractorDto extends BaseContractor implements IContractorDto
{
    public stars?: ContractorProjectStarsDto;
    public id: number;

    public constructor(init?: Partial<ContractorDto>) { super(init); (Object as any).assign(this, init); }
}

export class ContractorBidViewDto
{
    public id: number;
    public name?: string;
    public companyLogoId?: string;
    public phone?: string;
    public yearsOfExperience?: number;
    public numberOfEngineers?: number;
    public numberOfLabors?: number;

    public constructor(init?: Partial<ContractorBidViewDto>) { (Object as any).assign(this, init); }
}

export class ContractorWithInviteStatusDto extends ContractorBidViewDto
{
    public stars?: ContractorProjectStarsDto;
    public reviewCount?: number;
    public headOfficeGovernorateId?: number;
    public headOfficeWilayatId?: number;
    public projectsDelivered?: number;
    public isInvited?: boolean;
    public isSubmitted?: boolean;

    public constructor(init?: Partial<ContractorWithInviteStatusDto>) { super(init); (Object as any).assign(this, init); }
}

export class ContractorNameDto
{
    public id: number;
    public name?: string;

    public constructor(init?: Partial<ContractorNameDto>) { (Object as any).assign(this, init); }
}

export class ContractorProfileDto extends CompanyProfileDto implements IContractorProfileDto
{
    public references?: ContractorClientReferenceDto[];
    public stars?: ContractorProjectStarsDto;
    public yoursYearsOfExperience?: number;
    public projectsDelivered?: number;
    public largestProjectAwarded?: number;
    public projectsWorkedAtOnce?: number;
    public governorates?: number[];
    public registeredAt?: ContractorOrganizationDto[];
    public resources?: ContractorResourceDto[];
    public products?: ContractorProductDto[];
    public services?: ContractorServiceDto[];
    public planningSoftware?: PlanningSoftware[];
    public measuresToMaintainQuality?: string;

    public constructor(init?: Partial<ContractorProfileDto>) { super(init); (Object as any).assign(this, init); }
}

export class DictionaryDataDto
{
    public displayName?: string;
    public systemName?: string;
    public translationKey?: string;
    public id: number;

    public constructor(init?: Partial<DictionaryDataDto>) { (Object as any).assign(this, init); }
}

export class ContractorProductUnitDto extends DictionaryDataDto
{
    public orderNumber?: number;

    public constructor(init?: Partial<ContractorProductUnitDto>) { super(init); (Object as any).assign(this, init); }
}

export class SpecializationDto extends DictionaryDataDto
{
    public type?: ResourceType;

    public constructor(init?: Partial<SpecializationDto>) { super(init); (Object as any).assign(this, init); }
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

export class CompanyStatisticDto
{
    public id: number;
    public rowCount?: number;

    public constructor(init?: Partial<CompanyStatisticDto>) { (Object as any).assign(this, init); }
}

export class UserManagementCompanyAssociationDto
{
    public id: number;
    public companyType?: CompanyType;
    public affiliationType?: AffiliationType;
    public status?: CompanyStatus;
    public companyLogoId?: string;
    public name?: string;
    public linkedProfileStatus?: LinkedProfileStatus;

    public constructor(init?: Partial<UserManagementCompanyAssociationDto>) { (Object as any).assign(this, init); }
}

export interface IProfileDto
{
    name?: string;
    email?: string;
    phone?: string;
    defaultContextId?: number;
}

export interface ICompanyProfileDto
{
    name?: string;
    email?: string;
    phone?: string;
    marketings?: MarketingInformationDto[];
}

export interface IConsultantProfileDto
{
    designServices?: ConsultantDesignServiceDto[];
    linkedProfiles?: ConsultantLinkedProfileDto[];
}

export interface IContractorProfileDto
{
    yoursYearsOfExperience?: number;
    projectsDelivered?: number;
    largestProjectAwarded?: number;
    projectsWorkedAtOnce?: number;
    governorates?: number[];
    registeredAt?: ContractorOrganizationDto[];
    resources?: ContractorResourceDto[];
    products?: ContractorProductDto[];
    services?: ContractorServiceDto[];
    planningSoftware?: PlanningSoftware[];
    measuresToMaintainQuality?: string;
}

export interface IContextDto
{
    companyId?: number;
    type?: ContextType;
}

export class CreateShortCompanyResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateShortCompanyResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetCompanyDataByPhoneNumberResponse extends BaseSingleResponse<CompanyDataDto>
{

    public constructor(init?: Partial<GetCompanyDataByPhoneNumberResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListCompanyByCompanyNameResponse extends BaseMultipleResultResponse<CompanySearchDto>
{

    public constructor(init?: Partial<ListCompanyByCompanyNameResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetCompanyDtoByIdQueryResponse extends BaseSingleResponse<CompanyDto>
{

    public constructor(init?: Partial<GetCompanyDtoByIdQueryResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListCompanyNamesByIdsResponse
{
    public result?: CompanyNamesDto[];

    public constructor(init?: Partial<ListCompanyNamesByIdsResponse>) { (Object as any).assign(this, init); }
}

export class SetCompanyOwnerIdResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<SetCompanyOwnerIdResponse>) { (Object as any).assign(this, init); }
}

export class MakeOwnerResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<MakeOwnerResponse>) { (Object as any).assign(this, init); }
}

export class ListCompanyInviteResponse extends BaseMultipleResultResponse<CompanyInviteDto>
{

    public constructor(init?: Partial<ListCompanyInviteResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetCompanyInviteResponse extends BaseSingleResponse<CompanyInviteDto>
{

    public constructor(init?: Partial<GetCompanyInviteResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateCompanyInviteResponse extends BaseSingleResponse<ProfileDto>
{
    public notificationWasSent?: boolean;

    public constructor(init?: Partial<CreateCompanyInviteResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteCompanyInviteResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteCompanyInviteResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CompanyIdMigrationResponse extends BaseMultipleResultResponse<TempCompanyIdDto>
{

    public constructor(init?: Partial<CompanyIdMigrationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListCompanyResponse extends BaseMultipleResultResponse<CompanyManagementDto>
{

    public constructor(init?: Partial<ListCompanyResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetCompanyStatusResponse
{
    public result?: CompanyStatusDto;

    public constructor(init?: Partial<GetCompanyStatusResponse>) { (Object as any).assign(this, init); }
}

export class ListCompanyLogoResponse extends BaseMultipleResultResponse<CompanyLogoDto>
{

    public constructor(init?: Partial<ListCompanyLogoResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListCompanyInformationByIdsResponse extends BaseMultipleResultResponse<CompanyInformationDto>
{

    public constructor(init?: Partial<ListCompanyInformationByIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetCompanyStatusStatisticResponse
{
    public draftCount?: number;
    public adminReviewCount?: number;
    public invitedCount?: number;
    public approvedCount?: number;
    public rejectedCount?: number;

    public constructor(init?: Partial<GetCompanyStatusStatisticResponse>) { (Object as any).assign(this, init); }
}

export class ListConsultantResponse extends BaseMultipleResultResponse<ConsultantDto>
{

    public constructor(init?: Partial<ListConsultantResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListConsultantSelectionResponse extends BaseMultipleResultResponse<ConsultantSelectionDto>
{

    public constructor(init?: Partial<ListConsultantSelectionResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConsultantResponse extends BaseSingleResponse<ConsultantDto>
{

    public constructor(init?: Partial<GetConsultantResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetConsultantProfileResponse extends BaseSingleResponse<ConsultantProfileDto>
{

    public constructor(init?: Partial<GetConsultantProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetEbinaCompanyStatisticResponse
{
    public contractorCount?: number;
    public consultantCount?: number;

    public constructor(init?: Partial<GetEbinaCompanyStatisticResponse>) { (Object as any).assign(this, init); }
}

export class CreateConsultantResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateConsultantResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteConsultantResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteConsultantResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchConsultantResponse extends BasePatchOperationResult<number>
{
    public result?: ConsultantDto;

    public constructor(init?: Partial<PatchConsultantResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantStatusToReviewResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantStatusToReviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantStatusToApprovedResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantStatusToApprovedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantStatusToRejectedResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantStatusToRejectedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateCompanyStatusResponse extends BaseSingleResponse<CompanyDto>
{

    public constructor(init?: Partial<UpdateCompanyStatusResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListConsultantClientReferenceByConsultantIdResponse extends BaseMultipleResultResponse<ConsultantClientReferenceDto>
{

    public constructor(init?: Partial<ListConsultantClientReferenceByConsultantIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConsultantClientReferenceResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateConsultantClientReferenceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteConsultantClientReferenceResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteConsultantClientReferenceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantClientReferenceResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantClientReferenceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchConsultantClientReferenceResponse extends BasePatchOperationResult<number>
{
    public result?: ConsultantClientReferenceDto;

    public constructor(init?: Partial<PatchConsultantClientReferenceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConsultantDesignServiceResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateConsultantDesignServiceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteConsultantDesignServiceResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteConsultantDesignServiceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantDesignServiceResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantDesignServiceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchConsultantDesignServiceResponse extends BasePatchOperationResult<number>
{
    public result?: ConsultantDesignServiceDto;

    public constructor(init?: Partial<PatchConsultantDesignServiceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConsultantGovernorateResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateConsultantGovernorateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteConsultantGovernorateResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteConsultantGovernorateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantGovernorateResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantGovernorateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchConsultantGovernorateResponse extends BasePatchOperationResult<number>
{
    public result?: ConsultantGovernorateDto;

    public constructor(init?: Partial<PatchConsultantGovernorateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConsultantLinkedProfileResponse extends PostOperationResult
{
    public isFailed?: boolean;
    public errors?: LinkedProfileErrors;

    public constructor(init?: Partial<CreateConsultantLinkedProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteConsultantLinkedProfileResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteConsultantLinkedProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantLinkedProfileResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantLinkedProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConsultantMarketingInformationResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateConsultantMarketingInformationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteConsultantMarketingInformationResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteConsultantMarketingInformationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantMarketingInformationResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantMarketingInformationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchConsultantMarketingInformationResponse extends BasePatchOperationResult<number>
{
    public result?: MarketingInformationDto;

    public constructor(init?: Partial<PatchConsultantMarketingInformationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConsultantOrganizationResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateConsultantOrganizationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteConsultantOrganizationResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteConsultantOrganizationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantOrganizationResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantOrganizationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchConsultantOrganizationResponse extends BasePatchOperationResult<number>
{
    public result?: ConsultantOrganizationDto;

    public constructor(init?: Partial<PatchConsultantOrganizationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConsultantResourceResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateConsultantResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteConsultantResourceResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteConsultantResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantResourceResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateConsultantResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchConsultantResourceResponse extends BasePatchOperationResult<number>
{
    public result?: ResourceDto;

    public constructor(init?: Partial<PatchConsultantResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractorResponse extends BaseMultipleResultResponse<ContractorDto>
{

    public constructor(init?: Partial<ListContractorResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractorByIdsResponse extends BaseMultipleResultResponse<ContractorDto>
{

    public constructor(init?: Partial<ListContractorByIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractorBidViewByIdsResponse extends BaseMultipleResultResponse<ContractorBidViewDto>
{

    public constructor(init?: Partial<ListContractorBidViewByIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractorWithInvitationStatusResponse extends BaseMultipleResultResponse<ContractorWithInviteStatusDto>
{

    public constructor(init?: Partial<ListContractorWithInvitationStatusResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractorNameByIdsResponse extends BaseMultipleResultResponse<ContractorNameDto>
{

    public constructor(init?: Partial<ListContractorNameByIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContractorResponse extends BaseSingleResponse<ContractorDto>
{

    public constructor(init?: Partial<GetContractorResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContractorProfileResponse extends BaseSingleResponse<ContractorProfileDto>
{

    public constructor(init?: Partial<GetContractorProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractorResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractorResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractorResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractorResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchContractorResponse extends BasePatchOperationResult<number>
{
    public result?: ContractorDto;

    public constructor(init?: Partial<PatchContractorResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractorResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorStatusToReviewResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractorStatusToReviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorStatusToRejectedResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractorStatusToRejectedResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractorClientReferenceResponse extends BaseMultipleResultResponse<ContractorClientReferenceDto>
{

    public constructor(init?: Partial<ListContractorClientReferenceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractorClientReferenceByContractorIdResponse extends BaseMultipleResultResponse<ContractorClientReferenceDto>
{

    public constructor(init?: Partial<ListContractorClientReferenceByContractorIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractorClientReferenceResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractorClientReferenceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractorClientReferenceResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractorClientReferenceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorClientReferenceResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractorClientReferenceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchContractorClientReferenceResponse extends BasePatchOperationResult<number>
{
    public result?: ContractorClientReferenceDto;

    public constructor(init?: Partial<PatchContractorClientReferenceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractorCompanyResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractorCompanyResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorCompanyResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractorCompanyResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchContractorCompanyResponse extends BasePatchOperationResult<number>
{
    public result?: ContractorCompanyDto;

    public constructor(init?: Partial<PatchContractorCompanyResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractorLinkedProfileResponse extends BaseMultipleResultResponse<ContractorLinkedProfileDto>
{

    public constructor(init?: Partial<ListContractorLinkedProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContractorLinkedProfileResponse extends BaseSingleResponse<ContractorLinkedProfileDto>
{

    public constructor(init?: Partial<GetContractorLinkedProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractorLinkedProfileResponse extends PostOperationResult
{
    public isFailed?: boolean;
    public errors?: LinkedProfileErrors;

    public constructor(init?: Partial<CreateContractorLinkedProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractorLinkedProfileResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractorLinkedProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorLinkedProfileResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractorLinkedProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractorMarketingInformationResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractorMarketingInformationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractorMarketingInformationResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractorMarketingInformationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorMarketingInformationResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractorMarketingInformationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchContractorMarketingInformationResponse extends BasePatchOperationResult<number>
{
    public result?: MarketingInformationDto;

    public constructor(init?: Partial<PatchContractorMarketingInformationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractorOrganizationResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractorOrganizationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractorOrganizationResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractorOrganizationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorOrganizationResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractorOrganizationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchContractorOrganizationResponse extends BasePatchOperationResult<number>
{
    public result?: ContractorOrganizationDto;

    public constructor(init?: Partial<PatchContractorOrganizationResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractorResourceResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractorResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractorResourceResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractorResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorResourceResponse extends PostOperationResult
{

    public constructor(init?: Partial<UpdateContractorResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchContractorResourceResponse extends BasePatchOperationResult<number>
{
    public result?: ResourceDto;

    public constructor(init?: Partial<PatchContractorResourceResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListDictionaryDataResponse
{
    public productUnits?: ContractorProductUnitDto[];
    public serviceUnits?: DictionaryDataDto[];
    public specializations?: SpecializationDto[];
    public designServiceUnits?: DictionaryDataDto[];
    public consultantProductUnit?: DictionaryDataDto[];

    public constructor(init?: Partial<ListDictionaryDataResponse>) { (Object as any).assign(this, init); }
}

export class ListOneDictionaryResponse extends BaseMultipleResultResponse<DictionaryDataDto>
{

    public constructor(init?: Partial<ListOneDictionaryResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContractorProjectReviewResponse extends BaseMultipleResultResponse<ContractorProjectReviewDto>
{

    public constructor(init?: Partial<ListContractorProjectReviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateContractorProjectReviewResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateContractorProjectReviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateConsultantProjectReviewResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateConsultantProjectReviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteContractorProjectReviewResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteContractorProjectReviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateContractorProjectReviewResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateContractorProjectReviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateConsultantProjectReviewResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateConsultantProjectReviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateClientReferenceStatusResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateClientReferenceStatusResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetReviewStatisticResponse
{
    public result?: CompanyStatisticDto;

    public constructor(init?: Partial<GetReviewStatisticResponse>) { (Object as any).assign(this, init); }
}

export class ListUserManagementCompanyDetailsResponse extends BaseMultipleResultResponse<UserManagementCompanyAssociationDto>
{

    public constructor(init?: Partial<ListUserManagementCompanyDetailsResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/contractor/createshortcompanycommand", "POST")
export class CreateShortCompanyCommand implements IReturn<CreateShortCompanyResponse>, IPost
{
    // @Required()
    public name: string;

    public nameInArabic?: string;
    // @Required()
    public crNumber: string;

    // @Required()
    public headOfficeGovernorateId: number;

    // @Required()
    public headOfficeWilayatId: number;

    public companyType?: CompanyType;
    // @Required()
    public ownerId: number;

    // @Required()
    public ownerName: string;

    // @Required()
    public ownerPhone: string;

    public ownerEmail?: string;
    public locationPrises?: ShortConsultantGovernorateDto[];

    public constructor(init?: Partial<CreateShortCompanyCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateShortCompanyCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateShortCompanyResponse(); }
}

// @Route("/contractor/getcompanydatabyphonenumberquery", "GET")
export class GetCompanyDataByPhoneNumberQuery implements IReturn<GetCompanyDataByPhoneNumberResponse>, IGet
{
    public phoneNumber?: string;

    public constructor(init?: Partial<GetCompanyDataByPhoneNumberQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanyDataByPhoneNumberQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCompanyDataByPhoneNumberResponse(); }
}

// @Route("/contractor/listcompanybycompanynamequery", "GET")
export class ListCompanyByCompanyNameQuery implements IReturn<ListCompanyByCompanyNameResponse>, IPaginatedRequest, IGet
{
    public companyName?: string;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListCompanyByCompanyNameQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyByCompanyNameQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyByCompanyNameResponse(); }
}

// @Route("/contractor/getcompanydtobyidquery", "GET")
export class GetCompanyDtoByIdQuery implements IReturn<GetCompanyDtoByIdQueryResponse>, IGet
{
    public companyId?: number;

    public constructor(init?: Partial<GetCompanyDtoByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanyDtoByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCompanyDtoByIdQueryResponse(); }
}

// @Route("/contractor/listcompanynamesbyidsquery", "GET")
export class ListCompanyNamesByIdsQuery implements IReturn<ListCompanyNamesByIdsResponse>, IGet
{
    public companyIds?: number[];

    public constructor(init?: Partial<ListCompanyNamesByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyNamesByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyNamesByIdsResponse(); }
}

// @Route("/contractor/setcompanyowneridcommand", "PUT")
export class SetCompanyOwnerIdCommand implements IReturn<SetCompanyOwnerIdResponse>, IPut
{
    public profileId?: number;
    public companyId?: number;

    public constructor(init?: Partial<SetCompanyOwnerIdCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SetCompanyOwnerIdCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new SetCompanyOwnerIdResponse(); }
}

// @Route("/contractor/makeownercommand", "PUT")
export class MakeOwnerCommand implements IReturn<MakeOwnerResponse>, IPut
{
    public companyId?: number;
    public contextType?: ContextType;
    public ownerId?: number;
    public ownerName?: string;
    public ownerPhone?: string;
    public ownerEmail?: string;
    public oldOwnerId?: number;

    public constructor(init?: Partial<MakeOwnerCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'MakeOwnerCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new MakeOwnerResponse(); }
}

// @Route("/contractor/listcompanyinvitequery", "GET")
export class ListCompanyInviteQuery implements IReturn<ListCompanyInviteResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListCompanyInviteQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyInviteQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyInviteResponse(); }
}

// @Route("/contractor/getcompanyinvitequery/{id}", "GET")
export class GetCompanyInviteQuery implements IReturn<GetCompanyInviteResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetCompanyInviteQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanyInviteQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCompanyInviteResponse(); }
}

// @Route("/contractor/createcompanyinvitecommand", "POST")
export class CreateCompanyInviteCommand implements IReturn<CreateCompanyInviteResponse>, IPost, ICompanyInviteDto
{
    public companyName?: string;
    public email?: string;
    // @Required()
    public mobileNumber: string;

    public verifyExist?: boolean;

    public constructor(init?: Partial<CreateCompanyInviteCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateCompanyInviteCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateCompanyInviteResponse(); }
}

// @Route("/contractor/deletecompanyinvitecommand/{id}", "DELETE")
export class DeleteCompanyInviteCommand implements IReturn<DeleteCompanyInviteResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteCompanyInviteCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteCompanyInviteCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteCompanyInviteResponse(); }
}

// @Route("/contractor/companyidmigrationquery", "GET")
export class CompanyIdMigrationQuery implements IReturn<CompanyIdMigrationResponse>, IGet
{

    public constructor(init?: Partial<CompanyIdMigrationQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CompanyIdMigrationQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new CompanyIdMigrationResponse(); }
}

// @Route("/contractor/listcompanyquery", "POST")
export class ListCompanyQuery implements IReturn<ListCompanyResponse>, IPaginatedRequest, IPost
{
    public sortRules?: CompanySort;
    public companyName?: string;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListCompanyQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListCompanyResponse(); }
}

// @Route("/contractor/getcompanystatusquery", "GET")
export class GetCompanyStatusQuery implements IReturn<GetCompanyStatusResponse>, IGet
{
    public companyId?: number;

    public constructor(init?: Partial<GetCompanyStatusQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanyStatusQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCompanyStatusResponse(); }
}

// @Route("/contractor/listcompanylogoquery", "GET")
export class ListCompanyLogoQuery implements IReturn<ListCompanyLogoResponse>, IGet
{
    public companyIds?: number[];

    public constructor(init?: Partial<ListCompanyLogoQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyLogoQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyLogoResponse(); }
}

// @Route("/contractor/listcompanyinformationbyidsquery/{ids}", "GET")
export class ListCompanyInformationByIdsQuery implements IReturn<ListCompanyInformationByIdsResponse>, IGet
{
    // @Required()
    public ids: number[];

    public constructor(init?: Partial<ListCompanyInformationByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyInformationByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyInformationByIdsResponse(); }
}

// @Route("/contractor/getcompanystatusstatisticquery", "GET")
export class GetCompanyStatusStatisticQuery implements IReturn<GetCompanyStatusStatisticResponse>, IGet
{

    public constructor(init?: Partial<GetCompanyStatusStatisticQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanyStatusStatisticQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCompanyStatusStatisticResponse(); }
}

// @Route("/contractor/listconsultantquery", "POST")
export class ListConsultantQuery implements IReturn<ListConsultantResponse>, IPaginatedRequest, IPost
{
    public sortRules?: ConsultantSort;
    public consultantFilter?: ConsultantFilter;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListConsultantQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConsultantQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListConsultantResponse(); }
}

// @Route("/contractor/listconsultantselectionquery", "GET")
export class ListConsultantSelectionQuery implements IReturn<ListConsultantSelectionResponse>, IGet
{
    public wilayatId?: number;
    public projectId?: number;

    public constructor(init?: Partial<ListConsultantSelectionQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConsultantSelectionQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListConsultantSelectionResponse(); }
}

// @Route("/contractor/getconsultantquery/{id}", "GET")
export class GetConsultantQuery implements IReturn<GetConsultantResponse>, IGet
{
    public id: number;

    public constructor(init?: Partial<GetConsultantQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConsultantQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConsultantResponse(); }
}

// @Route("/contractor/getconsultantprofilequery/{id}", "GET")
export class GetConsultantProfileQuery implements IReturn<GetConsultantProfileResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetConsultantProfileQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetConsultantProfileQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetConsultantProfileResponse(); }
}

// @Route("/contractor/getebinacompanystatisticquery", "GET")
export class GetEbinaCompanyStatisticQuery implements IReturn<GetEbinaCompanyStatisticResponse>, IGet
{

    public constructor(init?: Partial<GetEbinaCompanyStatisticQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetEbinaCompanyStatisticQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetEbinaCompanyStatisticResponse(); }
}

// @Route("/contractor/createconsultantcommand", "POST")
export class CreateConsultantCommand extends BaseConsultant implements IReturn<CreateConsultantResponse>, IPost, IConsultantDto
{
    public affiliationType?: AffiliationType;
    public userAuthId?: string;

    public constructor(init?: Partial<CreateConsultantCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConsultantCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConsultantResponse(); }
}

// @Route("/contractor/deleteconsultantcommand/{id}", "DELETE")
export class DeleteConsultantCommand implements IReturn<DeleteConsultantResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteConsultantCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConsultantCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConsultantResponse(); }
}

// @Route("/contractor/patchconsultantcommand/{id}", "PATCH")
export class PatchConsultantCommand extends BasePatchRequest<number> implements IReturn<PatchConsultantResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchConsultantCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchConsultantCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchConsultantResponse(); }
}

// @Route("/contractor/updateconsultantcommand/{id}", "PUT")
export class UpdateConsultantCommand extends BaseConsultant implements IReturn<UpdateConsultantResponse>, IPut, IConsultantDto
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateConsultantCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantResponse(); }
}

// @Route("/contractor/updateconsultantstatustoreviewcommand/{id}", "PUT")
export class UpdateConsultantStatusToReviewCommand implements IReturn<UpdateConsultantStatusToReviewResponse>, IPut
{
    public id: number;

    public constructor(init?: Partial<UpdateConsultantStatusToReviewCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantStatusToReviewCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantStatusToReviewResponse(); }
}

// @Route("/contractor/updateconsultantstatustoapprovedcommand/{id}", "PUT")
export class UpdateConsultantStatusToApprovedCommand implements IReturn<UpdateConsultantStatusToApprovedResponse>, IPut
{
    public id: number;

    public constructor(init?: Partial<UpdateConsultantStatusToApprovedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantStatusToApprovedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantStatusToApprovedResponse(); }
}

// @Route("/contractor/updateconsultantstatustorejectedcommand/{id}", "PUT")
export class UpdateConsultantStatusToRejectedCommand implements IReturn<UpdateConsultantStatusToRejectedResponse>, IPut
{
    public id: number;

    public constructor(init?: Partial<UpdateConsultantStatusToRejectedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantStatusToRejectedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantStatusToRejectedResponse(); }
}

// @Route("/contractor/updatecompanystatuscommand", "POST")
export class UpdateCompanyStatusCommand implements IReturn<UpdateCompanyStatusResponse>, IPost
{
    // @Required()
    public companyId: number;

    // @Required()
    public companyStatus: CompanyStatus;

    public constructor(init?: Partial<UpdateCompanyStatusCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateCompanyStatusCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateCompanyStatusResponse(); }
}

// @Route("/contractor/listconsultantclientreferencebyconsultantidquery/{consultantid}", "GET")
export class ListConsultantClientReferenceByConsultantIdQuery implements IReturn<ListConsultantClientReferenceByConsultantIdResponse>, IPaginatedRequest, IGet
{
    public consultantId?: number;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListConsultantClientReferenceByConsultantIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListConsultantClientReferenceByConsultantIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListConsultantClientReferenceByConsultantIdResponse(); }
}

// @Route("/contractor/createconsultantclientreferencecommand", "POST")
export class CreateConsultantClientReferenceCommand extends BaseClientReference implements IReturn<CreateConsultantClientReferenceResponse>, IPost, IClientReferenceDto
{
    public designType?: DesignType;

    public constructor(init?: Partial<CreateConsultantClientReferenceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConsultantClientReferenceCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConsultantClientReferenceResponse(); }
}

// @Route("/contractor/deleteconsultantclientreferencecommand/{id}", "DELETE")
export class DeleteConsultantClientReferenceCommand implements IReturn<DeleteConsultantClientReferenceResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteConsultantClientReferenceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConsultantClientReferenceCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConsultantClientReferenceResponse(); }
}

// @Route("/contractor/updateconsultantclientreferencecommand/{id}", "PUT")
export class UpdateConsultantClientReferenceCommand extends BaseClientReference implements IReturn<UpdateConsultantClientReferenceResponse>, IPut, IClientReferenceDto
{
    public id: number;
    public designType?: DesignType;

    public constructor(init?: Partial<UpdateConsultantClientReferenceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantClientReferenceCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantClientReferenceResponse(); }
}

// @Route("/contractor/patchconsultantclientreferencecommand/{id}", "PATCH")
export class PatchConsultantClientReferenceCommand extends BasePatchRequest<number> implements IReturn<PatchConsultantClientReferenceResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchConsultantClientReferenceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchConsultantClientReferenceCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchConsultantClientReferenceResponse(); }
}

// @Route("/contractor/createconsultantdesignservicecommand", "POST")
export class CreateConsultantDesignServiceCommand extends BaseConsultantDesignService implements IReturn<CreateConsultantDesignServiceResponse>, IPost, IConsultantDesignServiceDto
{

    public constructor(init?: Partial<CreateConsultantDesignServiceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConsultantDesignServiceCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConsultantDesignServiceResponse(); }
}

// @Route("/contractor/deleteconsultantdesignservicecommand/{id}", "DELETE")
export class DeleteConsultantDesignServiceCommand implements IReturn<DeleteConsultantDesignServiceResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteConsultantDesignServiceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConsultantDesignServiceCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConsultantDesignServiceResponse(); }
}

// @Route("/contractor/updateconsultantdesignservicecommand/{id}", "PUT")
export class UpdateConsultantDesignServiceCommand extends BaseConsultantDesignService implements IReturn<UpdateConsultantDesignServiceResponse>, IPut, IConsultantDesignServiceDto
{
    public id: number;

    public constructor(init?: Partial<UpdateConsultantDesignServiceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantDesignServiceCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantDesignServiceResponse(); }
}

// @Route("/contractor/patchconsultantdesignservicecommand/{id}", "PATCH")
export class PatchConsultantDesignServiceCommand extends BasePatchRequest<number> implements IReturn<PatchConsultantDesignServiceResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchConsultantDesignServiceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchConsultantDesignServiceCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchConsultantDesignServiceResponse(); }
}

// @Route("/contractor/createconsultantgovernoratecommand", "POST")
export class CreateConsultantGovernorateCommand implements IReturn<CreateConsultantGovernorateResponse>, IPost, IConsultantGovernorateDto
{
    public price?: number;
    public wilayatId?: number;
    public companyId?: number;
    public governorateId?: number;

    public constructor(init?: Partial<CreateConsultantGovernorateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConsultantGovernorateCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConsultantGovernorateResponse(); }
}

// @Route("/contractor/deleteconsultantgovernoratecommand/{id}", "DELETE")
export class DeleteConsultantGovernorateCommand implements IReturn<DeleteConsultantGovernorateResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteConsultantGovernorateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConsultantGovernorateCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConsultantGovernorateResponse(); }
}

// @Route("/contractor/updateconsultantgovernoratecommand/{id}", "PUT")
export class UpdateConsultantGovernorateCommand implements IReturn<UpdateConsultantGovernorateResponse>, IPut, IConsultantGovernorateDto
{
    public price?: number;
    public wilayatId?: number;
    public companyId?: number;
    public governorateId?: number;
    public id: number;

    public constructor(init?: Partial<UpdateConsultantGovernorateCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantGovernorateCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantGovernorateResponse(); }
}

// @Route("/contractor/patchconsultantgovernoratecommand/{id}", "PATCH")
export class PatchConsultantGovernorateCommand extends BasePatchRequest<number> implements IReturn<PatchConsultantGovernorateResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchConsultantGovernorateCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchConsultantGovernorateCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchConsultantGovernorateResponse(); }
}

// @Route("/contractor/createconsultantlinkedprofilecommand", "POST")
export class CreateConsultantLinkedProfileCommand implements IReturn<CreateConsultantLinkedProfileResponse>, IPost, IConsultantLinkedProfileDto
{
    public consultantAffiliationType?: ConsultantAffiliationType;
    public phone?: string;
    public companyId?: number;
    public userId?: number;

    public constructor(init?: Partial<CreateConsultantLinkedProfileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConsultantLinkedProfileCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConsultantLinkedProfileResponse(); }
}

// @Route("/contractor/deleteconsultantlinkedprofilecommand/{id}", "DELETE")
export class DeleteConsultantLinkedProfileCommand implements IReturn<DeleteConsultantLinkedProfileResponse>, IDelete
{
    public id: number;
    public deletionType?: LinkedProfileDeletionType;

    public constructor(init?: Partial<DeleteConsultantLinkedProfileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConsultantLinkedProfileCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConsultantLinkedProfileResponse(); }
}

// @Route("/contractor/updateconsultantlinkedprofilecommand/{id}", "PUT")
export class UpdateConsultantLinkedProfileCommand implements IReturn<UpdateConsultantLinkedProfileResponse>, IPut, IConsultantLinkedProfileDto
{
    public consultantAffiliationType?: ConsultantAffiliationType;
    public companyId?: number;
    public userId?: number;
    public id: number;
    public phone?: string;
    public updateType?: LinkedProfileUpdateType;

    public constructor(init?: Partial<UpdateConsultantLinkedProfileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantLinkedProfileCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantLinkedProfileResponse(); }
}

// @Route("/contractor/createconsultantmarketinginformationcommand", "POST")
export class CreateConsultantMarketingInformationCommand implements IReturn<CreateConsultantMarketingInformationResponse>, IPost, IMarketingInformationDto
{
    public marketingService?: MarketingService;
    public addresUrl?: string;
    public companyId?: number;

    public constructor(init?: Partial<CreateConsultantMarketingInformationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConsultantMarketingInformationCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConsultantMarketingInformationResponse(); }
}

// @Route("/contractor/deleteconsultantmarketinginformationcommand/{id}", "DELETE")
export class DeleteConsultantMarketingInformationCommand implements IReturn<DeleteConsultantMarketingInformationResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteConsultantMarketingInformationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConsultantMarketingInformationCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConsultantMarketingInformationResponse(); }
}

// @Route("/contractor/updateconsultantmarketinginformationcommand/{id}", "PUT")
export class UpdateConsultantMarketingInformationCommand implements IReturn<UpdateConsultantMarketingInformationResponse>, IPut, IMarketingInformationDto
{
    public id: number;
    public marketingService?: MarketingService;
    public addresUrl?: string;
    public companyId?: number;

    public constructor(init?: Partial<UpdateConsultantMarketingInformationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantMarketingInformationCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantMarketingInformationResponse(); }
}

// @Route("/contractor/patchconsultantmarketinginformationcommand/{id}", "PATCH")
export class PatchConsultantMarketingInformationCommand extends BasePatchRequest<number> implements IReturn<PatchConsultantMarketingInformationResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchConsultantMarketingInformationCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchConsultantMarketingInformationCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchConsultantMarketingInformationResponse(); }
}

// @Route("/contractor/createconsultantorganizationcommand", "POST")
export class CreateConsultantOrganizationCommand implements IReturn<CreateConsultantOrganizationResponse>, IPost, IConsultantOrganizationDto
{
    public organization?: ConsultantOrganization;
    public otherOrganization?: string;
    public companyId?: number;

    public constructor(init?: Partial<CreateConsultantOrganizationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConsultantOrganizationCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConsultantOrganizationResponse(); }
}

// @Route("/contractor/deleteconsultantorganizationcommand/{id}", "DELETE")
export class DeleteConsultantOrganizationCommand implements IReturn<DeleteConsultantOrganizationResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteConsultantOrganizationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConsultantOrganizationCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConsultantOrganizationResponse(); }
}

// @Route("/contractor/updateconsultantorganizationcommand/{id}", "PUT")
export class UpdateConsultantOrganizationCommand implements IReturn<UpdateConsultantOrganizationResponse>, IPut, IConsultantOrganizationDto
{
    public organization?: ConsultantOrganization;
    public otherOrganization?: string;
    public companyId?: number;
    public id: number;

    public constructor(init?: Partial<UpdateConsultantOrganizationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantOrganizationCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantOrganizationResponse(); }
}

// @Route("/contractor/patchconsultantorganizationcommand/{id}", "PATCH")
export class PatchConsultantOrganizationCommand extends BasePatchRequest<number> implements IReturn<PatchConsultantOrganizationResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchConsultantOrganizationCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchConsultantOrganizationCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchConsultantOrganizationResponse(); }
}

// @Route("/contractor/createconsultantresourcecommand", "POST")
export class CreateConsultantResourceCommand implements IReturn<CreateConsultantResourceResponse>, IPost, IResourceDto
{
    public specializationId?: number;
    public resourceType?: ResourceType;
    public numberOfUnit?: number;
    public companyId?: number;

    public constructor(init?: Partial<CreateConsultantResourceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConsultantResourceCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConsultantResourceResponse(); }
}

// @Route("/contractor/deleteconsultantresourcecommand/{id}", "DELETE")
export class DeleteConsultantResourceCommand implements IReturn<DeleteConsultantResourceResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteConsultantResourceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteConsultantResourceCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteConsultantResourceResponse(); }
}

// @Route("/contractor/updateconsultantresourcecommand/{id}", "PUT")
export class UpdateConsultantResourceCommand implements IReturn<UpdateConsultantResourceResponse>, IPut, IResourceDto
{
    public specializationId?: number;
    public id: number;
    public resourceType?: ResourceType;
    public numberOfUnit?: number;
    public companyId?: number;

    public constructor(init?: Partial<UpdateConsultantResourceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantResourceCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantResourceResponse(); }
}

// @Route("/contractor/patchconsultantresourcecommand/{id}", "PATCH")
export class PatchConsultantResourceCommand extends BasePatchRequest<number> implements IReturn<PatchConsultantResourceResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchConsultantResourceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchConsultantResourceCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchConsultantResourceResponse(); }
}

// @Route("/contractor/listcontractorquery", "POST")
export class ListContractorQuery implements IReturn<ListContractorResponse>, IPaginatedRequest, IPost
{
    public sortRules?: ContractorSort;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListContractorQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListContractorResponse(); }
}

// @Route("/contractor/listcontractorbyidsquery", "GET")
export class ListContractorByIdsQuery implements IReturn<ListContractorByIdsResponse>, IGet
{
    // @Required()
    public contractorIds: number[];

    public constructor(init?: Partial<ListContractorByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorByIdsResponse(); }
}

// @Route("/contractor/listcontractorbidviewbyidsquery/{ids}", "GET")
export class ListContractorBidViewByIdsQuery implements IReturn<ListContractorBidViewByIdsResponse>, IGet
{
    // @Required()
    public ids: number[];

    public constructor(init?: Partial<ListContractorBidViewByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorBidViewByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorBidViewByIdsResponse(); }
}

// @Route("/contractor/listcontractorwithinvitationstatusquery", "GET")
export class ListContractorWithInvitationStatusQuery implements IReturn<ListContractorWithInvitationStatusResponse>, IGet, IPaginatedRequest
{
    public constructionProjectId?: number;
    public governorateId?: number;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListContractorWithInvitationStatusQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorWithInvitationStatusQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorWithInvitationStatusResponse(); }
}

// @Route("/contractor/listcontractornamebyidsquery/{ids}", "GET")
export class ListContractorNameByIdsQuery implements IReturn<ListContractorNameByIdsResponse>, IGet
{
    // @Required()
    public ids: number[];

    public constructor(init?: Partial<ListContractorNameByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorNameByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorNameByIdsResponse(); }
}

// @Route("/contractor/getcontractorquery/{id}", "GET")
export class GetContractorQuery implements IReturn<GetContractorResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetContractorQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractorQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractorResponse(); }
}

// @Route("/contractor/getcontractorprofilequery/{id}", "GET")
export class GetContractorProfileQuery implements IReturn<GetContractorProfileResponse>, IGet
{
    public id: number;

    public constructor(init?: Partial<GetContractorProfileQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractorProfileQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractorProfileResponse(); }
}

// @Route("/contractor/createcontractorcommand", "POST")
export class CreateContractorCommand extends BaseContractor implements IReturn<CreateContractorResponse>, IPost, IContractorDto
{
    public affiliationType?: AffiliationType;
    public userAuthId?: string;

    public constructor(init?: Partial<CreateContractorCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractorCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractorResponse(); }
}

// @Route("/contractor/deletecontractorcommand/{id}", "DELETE")
export class DeleteContractorCommand implements IReturn<DeleteContractorResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractorCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractorCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractorResponse(); }
}

// @Route("/contractor/patchcontractorcommand/{id}", "PATCH")
export class PatchContractorCommand extends BasePatchRequest<number> implements IReturn<PatchContractorResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchContractorCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchContractorCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchContractorResponse(); }
}

// @Route("/contractor/updatecontractorcommand/{id}", "PUT")
export class UpdateContractorCommand extends BaseContractor implements IReturn<UpdateContractorResponse>, IPut, IContractorDto
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractorCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorResponse(); }
}

// @Route("/contractor/updatecontractorstatustoreviewcommand/{id}", "PUT")
export class UpdateContractorStatusToReviewCommand implements IReturn<UpdateContractorStatusToReviewResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractorStatusToReviewCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorStatusToReviewCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorStatusToReviewResponse(); }
}

// @Route("/contractor/updatecontractorstatustoapprovedcommand/{id}", "PUT")
export class UpdateContractorStatusToApprovedCommand implements IReturn<UpdateContractorStatusToRejectedResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractorStatusToApprovedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorStatusToApprovedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorStatusToRejectedResponse(); }
}

// @Route("/contractor/updatecontractorstatustorejectedcommand/{id}", "PUT")
export class UpdateContractorStatusToRejectedCommand implements IReturn<UpdateContractorStatusToRejectedResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractorStatusToRejectedCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorStatusToRejectedCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorStatusToRejectedResponse(); }
}

// @Route("/contractor/listcontractorclientreferencequery", "GET")
export class ListContractorClientReferenceQuery implements IReturn<ListContractorClientReferenceResponse>, IPaginatedRequest, IGet
{
    public sortRules?: ContractorClientReferenceSort;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListContractorClientReferenceQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorClientReferenceQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorClientReferenceResponse(); }
}

// @Route("/contractor/listcontractorclientreferencebycontractoridquery/{contractorid}", "GET")
export class ListContractorClientReferenceByContractorIdQuery implements IReturn<ListContractorClientReferenceByContractorIdResponse>, IPaginatedRequest, IGet
{
    public contractorId?: number;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListContractorClientReferenceByContractorIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorClientReferenceByContractorIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorClientReferenceByContractorIdResponse(); }
}

// @Route("/contractor/createcontractorclientreferencecommand", "POST")
export class CreateContractorClientReferenceCommand extends BaseClientReference implements IReturn<CreateContractorClientReferenceResponse>, IPost, IClientReferenceDto
{
    public projectType?: ConstructionType;

    public constructor(init?: Partial<CreateContractorClientReferenceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractorClientReferenceCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractorClientReferenceResponse(); }
}

// @Route("/contractor/deletecontractorclientreferencecommand/{id}", "DELETE")
export class DeleteContractorClientReferenceCommand implements IReturn<DeleteContractorClientReferenceResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractorClientReferenceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractorClientReferenceCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractorClientReferenceResponse(); }
}

// @Route("/contractor/updatecontractorclientreferencecommand/{id}", "PUT")
export class UpdateContractorClientReferenceCommand extends BaseClientReference implements IReturn<UpdateContractorClientReferenceResponse>, IPut, IClientReferenceDto
{
    // @Required()
    public id: number;

    public projectType?: ConstructionType;

    public constructor(init?: Partial<UpdateContractorClientReferenceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorClientReferenceCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorClientReferenceResponse(); }
}

// @Route("/contractor/patchcontractorclientreferencecommand/{id}", "PATCH")
export class PatchContractorClientReferenceCommand extends BasePatchRequest<number> implements IReturn<PatchContractorClientReferenceResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchContractorClientReferenceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchContractorClientReferenceCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchContractorClientReferenceResponse(); }
}

// @Route("/contractor/createcontractorcompanycommand", "POST")
export class CreateContractorCompanyCommand implements IReturn<CreateContractorCompanyResponse>, IPost, IContractorCompanyDto
{
    // @Required()
    public companyName: string;

    // @Required()
    public crNumber: string;

    public manPower?: number;
    // @Required()
    public typeOfServiceOrProduct: string;

    // @Required()
    public companyId: number;

    public constructor(init?: Partial<CreateContractorCompanyCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractorCompanyCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractorCompanyResponse(); }
}

// @Route("/contractor/updatecontractorcompanycommand/{id}", "PUT")
export class UpdateContractorCompanyCommand implements IReturn<UpdateContractorCompanyResponse>, IPut, IContractorCompanyDto
{
    // @Required()
    public companyName: string;

    // @Required()
    public crNumber: string;

    public manPower?: number;
    // @Required()
    public typeOfServiceOrProduct: string;

    // @Required()
    public companyId: number;

    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractorCompanyCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorCompanyCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorCompanyResponse(); }
}

// @Route("/contractor/patchcontractorcompanycommand/{id}", "PATCH")
export class PatchContractorCompanyCommand extends BasePatchRequest<number> implements IReturn<PatchContractorCompanyResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchContractorCompanyCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchContractorCompanyCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchContractorCompanyResponse(); }
}

// @Route("/contractor/listcontractorlinkedprofilequery", "GET")
export class ListContractorLinkedProfileQuery implements IReturn<ListContractorLinkedProfileResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListContractorLinkedProfileQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorLinkedProfileQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorLinkedProfileResponse(); }
}

// @Route("/contractor/listcontractorlinkedprofilebyuserquery", "GET")
export class ListContractorLinkedProfileByUserQuery implements IReturn<ListContractorLinkedProfileResponse>, IPaginatedRequest, IGet
{
    // @Required()
    public userId: number;

    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListContractorLinkedProfileByUserQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorLinkedProfileByUserQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorLinkedProfileResponse(); }
}

// @Route("/contractor/getcontractorlinkedprofilequery/{id}", "GET")
export class GetContractorLinkedProfileQuery implements IReturn<GetContractorLinkedProfileResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetContractorLinkedProfileQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContractorLinkedProfileQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContractorLinkedProfileResponse(); }
}

// @Route("/contractor/createcontractorlinkedprofilecommand", "POST")
export class CreateContractorLinkedProfileCommand implements IReturn<CreateContractorLinkedProfileResponse>, IPost, IContractorLinkedProfileDto
{
    // @Required()
    public contractorAffiliationType: ContractorAffiliationType;

    // @Required()
    public companyId: number;

    // @Required()
    public phone: string;

    // @Required()
    public userId: number;

    public constructor(init?: Partial<CreateContractorLinkedProfileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractorLinkedProfileCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractorLinkedProfileResponse(); }
}

// @Route("/contractor/deletecontractorlinkedprofilercommand/{id}", "DELETE")
export class DeleteContractorLinkedProfilerCommand implements IReturn<DeleteContractorLinkedProfileResponse>, IDelete
{
    // @Required()
    public id: number;

    public deletionType?: LinkedProfileDeletionType;

    public constructor(init?: Partial<DeleteContractorLinkedProfilerCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractorLinkedProfilerCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractorLinkedProfileResponse(); }
}

// @Route("/contractor/updatecontractorlinkedprofilecommand/{id}", "PUT")
export class UpdateContractorLinkedProfileCommand implements IReturn<UpdateContractorLinkedProfileResponse>, IPut, IContractorLinkedProfileDto
{
    // @Required()
    public contractorAffiliationType: ContractorAffiliationType;

    // @Required()
    public companyId: number;

    // @Required()
    public userId: number;

    // @Required()
    public id: number;

    // @Required()
    public phone: string;

    // @Required()
    public updateType: LinkedProfileUpdateType;

    public constructor(init?: Partial<UpdateContractorLinkedProfileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorLinkedProfileCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorLinkedProfileResponse(); }
}

// @Route("/contractor/createcontractormarketinginformationcommand", "POST")
export class CreateContractorMarketingInformationCommand implements IReturn<CreateContractorMarketingInformationResponse>, IPost, IMarketingInformationDto
{
    public marketingService?: MarketingService;
    // @Required()
    public addresUrl: string;

    // @Required()
    public companyId: number;

    public constructor(init?: Partial<CreateContractorMarketingInformationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractorMarketingInformationCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractorMarketingInformationResponse(); }
}

// @Route("/contractor/deletecontractormarketinginformationcommand/{id}", "DELETE")
export class DeleteContractorMarketingInformationCommand implements IReturn<DeleteContractorMarketingInformationResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractorMarketingInformationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractorMarketingInformationCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractorMarketingInformationResponse(); }
}

// @Route("/contractor/updatecontractormarketinginformationcommand/{id}", "PUT")
export class UpdateContractorMarketingInformationCommand implements IReturn<UpdateContractorMarketingInformationResponse>, IPut, IMarketingInformationDto
{
    // @Required()
    public id: number;

    public marketingService?: MarketingService;
    // @Required()
    public addresUrl: string;

    // @Required()
    public companyId: number;

    public constructor(init?: Partial<UpdateContractorMarketingInformationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorMarketingInformationCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorMarketingInformationResponse(); }
}

// @Route("/contractor/patchcontractormarketinginformationcommand/{id}", "PATCH")
export class PatchContractorMarketingInformationCommand extends BasePatchRequest<number> implements IReturn<PatchContractorMarketingInformationResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchContractorMarketingInformationCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchContractorMarketingInformationCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchContractorMarketingInformationResponse(); }
}

// @Route("/contractor/createcontractororganizationcommand", "POST")
export class CreateContractorOrganizationCommand implements IReturn<CreateContractorOrganizationResponse>, IPost, IContractorOrganizationDto
{
    public organization?: ContractorOrganization;
    // @Required()
    public otherOrganization: string;

    // @Required()
    public companyId: number;

    public constructor(init?: Partial<CreateContractorOrganizationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractorOrganizationCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractorOrganizationResponse(); }
}

// @Route("/contractor/deletecontractororganizationcommand/{id}", "DELETE")
export class DeleteContractorOrganizationCommand implements IReturn<DeleteContractorOrganizationResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractorOrganizationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractorOrganizationCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractorOrganizationResponse(); }
}

// @Route("/contractor/updatecontractororganizationcommand/{id}", "PUT")
export class UpdateContractorOrganizationCommand implements IReturn<UpdateContractorOrganizationResponse>, IPut, IContractorOrganizationDto
{
    public organization?: ContractorOrganization;
    // @Required()
    public otherOrganization: string;

    // @Required()
    public companyId: number;

    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractorOrganizationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorOrganizationCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorOrganizationResponse(); }
}

// @Route("/contractor/patchcontractororganizationcommand/{id}", "PATCH")
export class PatchContractorOrganizationCommand extends BasePatchRequest<number> implements IReturn<PatchContractorOrganizationResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchContractorOrganizationCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchContractorOrganizationCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchContractorOrganizationResponse(); }
}

// @Route("/contractor/createcontractorresourcecommand", "POST")
export class CreateContractorResourceCommand implements IReturn<CreateContractorResourceResponse>, IPost, IResourceDto
{
    public machine?: string;
    public specializationId?: number;
    public resourceType?: ResourceType;
    public numberOfUnit?: number;
    public companyId?: number;

    public constructor(init?: Partial<CreateContractorResourceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractorResourceCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractorResourceResponse(); }
}

// @Route("/contractor/deletecontractorresourcecommand/{id}", "DELETE")
export class DeleteContractorResourceCommand implements IReturn<DeleteContractorResourceResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteContractorResourceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractorResourceCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractorResourceResponse(); }
}

// @Route("/contractor/updatecontractorresourcecommand/{id}", "PUT")
export class UpdateContractorResourceCommand implements IReturn<UpdateContractorResourceResponse>, IPut, IResourceDto
{
    public machine?: string;
    public specializationId?: number;
    public id: number;
    public resourceType?: ResourceType;
    public numberOfUnit?: number;
    public companyId?: number;

    public constructor(init?: Partial<UpdateContractorResourceCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorResourceCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorResourceResponse(); }
}

// @Route("/contractor/patchcontractorresourcecommand/{id}", "PATCH")
export class PatchContractorResourceCommand extends BasePatchRequest<number> implements IReturn<PatchContractorResourceResponse>
{
    public id: number;
    public operations?: JsonPatchElement[];

    public constructor(init?: Partial<PatchContractorResourceCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchContractorResourceCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchContractorResourceResponse(); }
}

// @Route("/contractor/listdictionarydataquery", "GET")
export class ListDictionaryDataQuery implements IReturn<ListDictionaryDataResponse>, IGet
{

    public constructor(init?: Partial<ListDictionaryDataQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListDictionaryDataQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListDictionaryDataResponse(); }
}

// @Route("/contractor/listonedictionaryquery", "GET")
export class ListOneDictionaryQuery implements IReturn<ListOneDictionaryResponse>, IGet
{
    public dictionary?: DictionaryName;

    public constructor(init?: Partial<ListOneDictionaryQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListOneDictionaryQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListOneDictionaryResponse(); }
}

// @Route("/contractor/listcontractorprojectreviewquery/{contractorid}", "GET")
export class ListContractorProjectReviewQuery implements IReturn<ListContractorProjectReviewResponse>, IPaginatedRequest, IGet
{
    public contractorId?: number;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListContractorProjectReviewQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContractorProjectReviewQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContractorProjectReviewResponse(); }
}

// @Route("/contractor/createcontractorprojectreviewcommand", "POST")
export class CreateContractorProjectReviewCommand extends BaseContractorProjectReview implements IReturn<CreateContractorProjectReviewResponse>, IPost, IContractorProjectReviewDto
{

    public constructor(init?: Partial<CreateContractorProjectReviewCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContractorProjectReviewCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContractorProjectReviewResponse(); }
}

// @Route("/contractor/createconsultantprojectreviewcommand", "POST")
export class CreateConsultantProjectReviewCommand extends BaseConsultantProjectReview implements IReturn<CreateConsultantProjectReviewResponse>, IPost
{

    public constructor(init?: Partial<CreateConsultantProjectReviewCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateConsultantProjectReviewCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateConsultantProjectReviewResponse(); }
}

// @Route("/contractor/deletecontractorprojectreviewcommand/{id}", "DELETE")
export class DeleteContractorProjectReviewCommand implements IReturn<DeleteContractorProjectReviewResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteContractorProjectReviewCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContractorProjectReviewCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContractorProjectReviewResponse(); }
}

// @Route("/contractor/updatecontractorprojectreviewcommand/{id}", "PUT")
export class UpdateContractorProjectReviewCommand extends BaseContractorProjectReview implements IReturn<UpdateContractorProjectReviewResponse>, IPut, IContractorProjectReviewDto
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateContractorProjectReviewCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContractorProjectReviewCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContractorProjectReviewResponse(); }
}

// @Route("/contractor/updateconsultantprojectreviewcommand/{id}", "PUT")
export class UpdateConsultantProjectReviewCommand extends BaseConsultantProjectReview implements IReturn<UpdateConsultantProjectReviewResponse>, IPut
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<UpdateConsultantProjectReviewCommand>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateConsultantProjectReviewCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateConsultantProjectReviewResponse(); }
}

// @Route("/contractor/updateclientreferencestatuscommand/{id}", "PUT")
export class UpdateClientReferenceStatusCommand implements IReturn<UpdateClientReferenceStatusResponse>, IPut
{
    public id: number;
    public isApproved?: boolean;

    public constructor(init?: Partial<UpdateClientReferenceStatusCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateClientReferenceStatusCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateClientReferenceStatusResponse(); }
}

// @Route("/contractor/getreviewstatisticquery", "GET")
export class GetReviewStatisticQuery implements IReturn<GetReviewStatisticResponse>, IGet
{
    public companyId?: number;

    public constructor(init?: Partial<GetReviewStatisticQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetReviewStatisticQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetReviewStatisticResponse(); }
}

// @Route("/contractor/listusermanagementcompanydetailsquery", "GET")
export class ListUserManagementCompanyDetailsQuery implements IReturn<ListUserManagementCompanyDetailsResponse>, IGet
{
    public profileId?: number;

    public constructor(init?: Partial<ListUserManagementCompanyDetailsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListUserManagementCompanyDetailsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListUserManagementCompanyDetailsResponse(); }
}

