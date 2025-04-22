// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2024-10-08 15:47:54
Version: 6.50
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://10.42.3.174:5000/

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

export interface IHasBearerToken
{
    bearerToken?: string;
}

export interface IPost
{
}

export interface IPaginatedRequest
{
    page?: number;
    pageSize?: number;
}

export class BaseLogDto
{
    public message: string;
    public messageArabic?: string;
    public userId?: number;
    public logDate?: string;

    public constructor(init?: Partial<BaseLogDto>) { (Object as any).assign(this, init); }
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

export enum ActorType
{
    Client = 0,
    Contractor = 1,
    Consultant = 2,
    Supplier = 3,
    None = -1,
}

export enum PmActionType
{
    None = 0,
    TaskSubmission = 1,
    TaskRejection = 2,
    TaskUpdate = 3,
    ProofOfPayment = 4,
    MaterialSubmission = 21,
    MaterialPurchase = 22,
    ClientConfirmDelivery = 23,
    RejectDelivery = 24,
    ContractorConfirmDelivery = 25,
    MaterialSubmissionOption = 31,
    ClientRejectOptions = 32,
    ClientSelectedOption = 33,
    Comment = 41,
    AddExpense = 51,
    SubcontractorSubmission = 52,
    ConfirmWork = 53,
    Observation = 54,
}

export enum LogLanguage
{
    None = 0,
    English = 1,
    Arabic = 2,
}

export class PmData
{
    public expenseTitle?: string;
    public stageName?: string;
    public updateName?: string;
    public sowItemName?: string;
    public taskName?: string;
    public workflowName?: string;
    public language?: LogLanguage;

    public constructor(init?: Partial<PmData>) { (Object as any).assign(this, init); }
}

export enum PmUpdateType
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

export class CompanyLogDto extends BaseLogDto
{
    public companyId?: number;
    public issuerType?: ContextType;

    public constructor(init?: Partial<CompanyLogDto>) { super(init); (Object as any).assign(this, init); }
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

export class CompanyLastLogDateDto
{
    public companyId?: number;
    public logDate?: string;

    public constructor(init?: Partial<CompanyLastLogDateDto>) { (Object as any).assign(this, init); }
}

export class PmLogDto
{
    public actorType?: ActorType;
    public message: string;
    public messageArabic?: string;
    public logDate?: string;

    public constructor(init?: Partial<PmLogDto>) { (Object as any).assign(this, init); }
}

export class ProjectLogDto extends BaseLogDto
{
    public projectId?: number;

    public constructor(init?: Partial<ProjectLogDto>) { super(init); (Object as any).assign(this, init); }
}

export class SystemLogDto extends BaseLogDto
{

    public constructor(init?: Partial<SystemLogDto>) { super(init); (Object as any).assign(this, init); }
}

export class LastLogDateDto
{
    public userId?: number;
    public logDate?: string;

    public constructor(init?: Partial<LastLogDateDto>) { (Object as any).assign(this, init); }
}

export enum LogType
{
    None = 0,
    Project = 1,
    Company = 2,
    System = 3,
    Pm = 10,
}

export class LogDto
{
    public message?: string;
    public logDate?: string;
    public userId?: number;
    public logType?: LogType;
    public companyId?: number;
    public issuerType?: ContextType;
    public projectId?: number;

    public constructor(init?: Partial<LogDto>) { (Object as any).assign(this, init); }
}

export class ListCompanyLogResponse extends BaseMultipleResultResponse<CompanyLogDto>
{

    public constructor(init?: Partial<ListCompanyLogResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListLatestCompaniesActivityDateResponse extends BaseMultipleResultResponse<CompanyLastLogDateDto>
{

    public constructor(init?: Partial<ListLatestCompaniesActivityDateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetSortedCompanyLastActivityResponse
{
    public result?: CompanyLastLogDateDto[];
    public logCompaniesIds?: number[];
    public amountOfIds?: number;

    public constructor(init?: Partial<GetSortedCompanyLastActivityResponse>) { (Object as any).assign(this, init); }
}

export class ListCompanyLogByCompanyIdResponse extends BaseMultipleResultResponse<CompanyLogDto>
{

    public constructor(init?: Partial<ListCompanyLogByCompanyIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListPmLogResponse extends BaseMultipleResultResponse<PmLogDto>
{

    public constructor(init?: Partial<ListPmLogResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListProjectLogByProjectIdResponse extends BaseMultipleResultResponse<ProjectLogDto>
{

    public constructor(init?: Partial<ListProjectLogByProjectIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListSystemLogByUserIdResponse extends BaseMultipleResultResponse<SystemLogDto>
{

    public constructor(init?: Partial<ListSystemLogByUserIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListLatestUsersActivityDateResponse extends BaseMultipleResultResponse<LastLogDateDto>
{

    public constructor(init?: Partial<ListLatestUsersActivityDateResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListUserHistoryLogsResponse extends BaseMultipleResultResponse<LogDto>
{

    public constructor(init?: Partial<ListUserHistoryLogsResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/log/listcompanylogquery", "GET")
export class ListCompanyLogQuery implements IReturn<ListCompanyLogResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListCompanyLogQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyLogQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyLogResponse(); }
}

// @Route("/log/listlatestcompaniesactivitydatequery", "GET")
export class ListLatestCompaniesActivityDateQuery implements IReturn<ListLatestCompaniesActivityDateResponse>, IGet
{
    public companyIds?: number[];

    public constructor(init?: Partial<ListLatestCompaniesActivityDateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListLatestCompaniesActivityDateQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListLatestCompaniesActivityDateResponse(); }
}

// @Route("/log/getsortedcompanylastactivityquery", "GET")
export class GetSortedCompanyLastActivityQuery implements IReturn<GetSortedCompanyLastActivityResponse>, IGet, IPaginatedRequest
{
    public isDateAscending?: boolean;
    public idsToIgnore?: number[];
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<GetSortedCompanyLastActivityQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetSortedCompanyLastActivityQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetSortedCompanyLastActivityResponse(); }
}

// @Route("/log/listcompanylogbycompanyidquery/{companyid}", "GET")
export class ListCompanyLogByCompanyIdQuery implements IReturn<ListCompanyLogByCompanyIdResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;
    public companyId?: number;

    public constructor(init?: Partial<ListCompanyLogByCompanyIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyLogByCompanyIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyLogByCompanyIdResponse(); }
}

// @Route("/log/createsystemlog", "POST")
export class CreateSystemLog extends BaseLogDto implements IHasBearerToken
{
    public bearerToken?: string;

    public constructor(init?: Partial<CreateSystemLog>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateSystemLog'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/log/createprojectlog", "POST")
export class CreateProjectLog extends BaseLogDto implements IHasBearerToken
{
    public projectId?: number;
    public bearerToken?: string;

    public constructor(init?: Partial<CreateProjectLog>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateProjectLog'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/log/createcompanylog", "POST")
export class CreateCompanyLog extends BaseLogDto implements IHasBearerToken
{
    public companyId?: number;
    public issuerType?: ContextType;
    public bearerToken?: string;

    public constructor(init?: Partial<CreateCompanyLog>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateCompanyLog'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/log/createpmlog", "POST")
export class CreatePmLog implements IHasBearerToken
{
    public projectId?: number;
    public userId?: number;
    public logDate?: string;
    public actorType?: ActorType;
    public pmActionType?: PmActionType;
    public stageNumber?: number;
    public optionNumber?: number;
    public updateId?: number;
    public invoiceValue?: number;
    public updateNumber?: number;
    public subcontractorName?: string;
    public pmData?: PmData[];
    public isApproved?: boolean;
    public updateType?: PmUpdateType;
    public bearerToken?: string;

    public constructor(init?: Partial<CreatePmLog>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreatePmLog'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/log/listpmlogquery", "POST")
export class ListPmLogQuery implements IReturn<ListPmLogResponse>, IPaginatedRequest, IPost
{
    public constructionProjectId?: number;
    public dateFrom?: string;
    public dateTo?: string;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListPmLogQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListPmLogQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListPmLogResponse(); }
}

// @Route("/log/listprojectlogbyprojectidquery/{projectid}", "GET")
export class ListProjectLogByProjectIdQuery implements IReturn<ListProjectLogByProjectIdResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;
    public projectId?: number;

    public constructor(init?: Partial<ListProjectLogByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListProjectLogByProjectIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListProjectLogByProjectIdResponse(); }
}

// @Route("/log/listprojectlogquery", "GET")
export class ListProjectLogQuery implements IReturn<ListProjectLogByProjectIdResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListProjectLogQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListProjectLogQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListProjectLogByProjectIdResponse(); }
}

// @Route("/log/listsystemlogbyuseridquery", "GET")
export class ListSystemLogByUserIdQuery implements IReturn<ListSystemLogByUserIdResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;
    public userId?: number;

    public constructor(init?: Partial<ListSystemLogByUserIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListSystemLogByUserIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListSystemLogByUserIdResponse(); }
}

// @Route("/log/listsystemlogquery", "GET")
export class ListSystemLogQuery implements IReturn<ListSystemLogByUserIdResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListSystemLogQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListSystemLogQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListSystemLogByUserIdResponse(); }
}

// @Route("/log/listlatestusersactivitydatequery", "GET")
export class ListLatestUsersActivityDateQuery implements IReturn<ListLatestUsersActivityDateResponse>, IPaginatedRequest, IGet
{
    public profileIds?: number[];
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListLatestUsersActivityDateQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListLatestUsersActivityDateQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListLatestUsersActivityDateResponse(); }
}

// @Route("/log/listuserhistorylogsquery", "GET")
export class ListUserHistoryLogsQuery implements IReturn<ListUserHistoryLogsResponse>, IPaginatedRequest, IGet
{
    public userId?: number;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListUserHistoryLogsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListUserHistoryLogsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListUserHistoryLogsResponse(); }
}

