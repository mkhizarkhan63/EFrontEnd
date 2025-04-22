// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2024-08-14 15:20:36
Version: 6.50
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://10.42.5.71:5000/

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

export class ContextDataDto
{
    public contextId?: number;
    public contextType?: ContextType;

    public constructor(init?: Partial<ContextDataDto>) { (Object as any).assign(this, init); }
}

export interface INoteDto
{
    userId?: number;
    constructionProjectId?: number;
    companyId?: number;
    noteContent?: string;
}

export interface IPaginatedRequest
{
    page?: number;
    pageSize?: number;
}

export enum NoteTaskAffilationType
{
    None = 0,
    User = 1,
    Company = 2,
    Project = 3,
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

export enum SpecialProfileMode
{
    None = 0,
    SimpleContractorCreation = 1,
    SimpleConsultantCreation = 2,
}

export enum ReferralType
{
    None = 0,
    ContractorProjectInvitation = 1,
    ConsultantProjectInvitation = 2,
}

export enum TaskCategory
{
    None = 0,
    FollowUpTask = 1,
    CallContractor = 2,
    VisitSite = 3,
    ReviewProject = 4,
}

export interface ITaskDto
{
    userId?: number;
    constructionProjectId?: number;
    companyId?: number;
    taskContent?: string;
    taskCategory?: TaskCategory;
    finishDate?: string;
    isCompleted?: boolean;
    completedDate?: string;
}

export class UserManagementProfilesSort
{
    public idIsAscending?: boolean;
    public nameIsAscending?: boolean;
    public emailIsAscending?: boolean;
    public phoneIsAscending?: boolean;
    public signedUpOnIsAscending?: boolean;
    public companyAssociationIsAscending?: boolean;
    public lastActivityIsAscending?: boolean;

    public constructor(init?: Partial<UserManagementProfilesSort>) { (Object as any).assign(this, init); }
}

export class CompanyInvitationDto
{
    public id: number;
    public phone?: string;
    public companyId?: number;
    public companyName?: string;
    public iconId?: string;
    public isChangePartnerToOwner?: boolean;

    public constructor(init?: Partial<CompanyInvitationDto>) { (Object as any).assign(this, init); }
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

export class BaseMultipleResultResponse<T> implements IPaginatedResponse
{
    public result?: T[];
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

export class ProfileNotificationDto
{
    public profileId?: number;
    public email?: string;

    public constructor(init?: Partial<ProfileNotificationDto>) { (Object as any).assign(this, init); }
}

export class ContextNotificationDto
{
    public profilesNotificationDto?: ProfileNotificationDto[];
    public contextType?: ContextType;

    public constructor(init?: Partial<ContextNotificationDto>) { (Object as any).assign(this, init); }
}

export class ContextOwnerDto
{
    public companyId?: number;
    public ownerName?: string;
    public ownerPhone?: string;

    public constructor(init?: Partial<ContextOwnerDto>) { (Object as any).assign(this, init); }
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

export class NoteDto implements INoteDto
{
    public id: number;
    public userId?: number;
    public constructionProjectId?: number;
    public companyId?: number;
    public noteContent?: string;

    public constructor(init?: Partial<NoteDto>) { (Object as any).assign(this, init); }
}

export class BaseSingleResponse<T>
{
    public result: T;

    public constructor(init?: Partial<BaseSingleResponse<T>>) { (Object as any).assign(this, init); }
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

export enum NoteTaskType
{
    None = 0,
    Task = 1,
    Note = 2,
}

export class NoteTaskDto
{
    public id: number;
    public userId?: number;
    public constructionProjectId?: number;
    public companyId?: number;
    public createdDate?: string;
    public content?: string;
    public noteTaskType?: NoteTaskType;
    public taskCategory?: TaskCategory;
    public finishDate?: string;
    public isCompleted?: boolean;
    public completedDate?: string;

    public constructor(init?: Partial<NoteTaskDto>) { (Object as any).assign(this, init); }
}

export class BaseMultipleNotesAndTasksResponse extends BaseMultipleResultResponse<NoteTaskDto>
{
    public notesCount?: number;
    public tasksCount?: number;

    public constructor(init?: Partial<BaseMultipleNotesAndTasksResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UserContextIdsDto
{
    public profileId?: number;
    public contextIds?: number[];

    public constructor(init?: Partial<UserContextIdsDto>) { (Object as any).assign(this, init); }
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

export class AvatarDto
{
    public id: number;
    public isCompany?: boolean;
    public avatarId?: string;

    public constructor(init?: Partial<AvatarDto>) { (Object as any).assign(this, init); }
}

export class ProfileNameDto implements IProfileNameDto
{
    public id: number;
    public name?: string;

    public constructor(init?: Partial<ProfileNameDto>) { (Object as any).assign(this, init); }
}

export class EmployeeInfoDto extends ProfileNameDto
{
    public email?: string;
    public profilePicture?: string;
    public phone?: string;
    public affiliationType?: AffiliationType;

    public constructor(init?: Partial<EmployeeInfoDto>) { super(init); (Object as any).assign(this, init); }
}

export class BaseDeleteOperationResult<T> extends OperationResult
{
    public id: T;

    public constructor(init?: Partial<BaseDeleteOperationResult<T>>) { super(init); (Object as any).assign(this, init); }
}

export class ReferralDto implements IReferral
{
    public id: number;
    public referralPhoneNumber?: string;
    public referralCode?: string;
    public referralType?: ReferralType;
    public projectId?: number;

    public constructor(init?: Partial<ReferralDto>) { (Object as any).assign(this, init); }
}

export class ReferralValidation
{
    public companyDoesNotExist?: boolean;

    public constructor(init?: Partial<ReferralValidation>) { (Object as any).assign(this, init); }
}

export class TaskDto implements ITaskDto
{
    public id: number;
    public userId?: number;
    public constructionProjectId?: number;
    public companyId?: number;
    public taskContent?: string;
    public taskCategory?: TaskCategory;
    public finishDate?: string;
    public isCompleted?: boolean;
    public completedDate?: string;

    public constructor(init?: Partial<TaskDto>) { (Object as any).assign(this, init); }
}

export class UserManagementProfileDto
{
    public id: number;
    public name?: string;
    public email?: string;
    public phone?: string;
    public userAuthId?: string;
    public profilePicture?: string;
    public signedUpOn?: string;
    public companyAssociations?: number;
    public lastSignIn?: string;
    public contextsAffiliation?: ContextAffiliationDto[];

    public constructor(init?: Partial<UserManagementProfileDto>) { (Object as any).assign(this, init); }
}

export interface IProfileDto
{
    name?: string;
    email?: string;
    phone?: string;
    defaultContextId?: number;
}

export interface IProfileNameDto
{
    id: number;
    name?: string;
}

export interface IReferral
{
    id: number;
    referralPhoneNumber?: string;
    referralCode?: string;
    referralType?: ReferralType;
    projectId?: number;
}

export interface IContextDto
{
    companyId?: number;
    type?: ContextType;
}

export class ListCompanyInvitationByUserResponse extends BaseMultipleResultResponse<CompanyInvitationDto>
{

    public constructor(init?: Partial<ListCompanyInvitationByUserResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DecideInvitationResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<DecideInvitationResponse>) { (Object as any).assign(this, init); }
}

export class InvitePartnerAsOwnerResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<InvitePartnerAsOwnerResponse>) { (Object as any).assign(this, init); }
}

export class ListCompanyInvitationByCompanyIdResponse extends BaseMultipleResultResponse<CompanyInvitationDto>
{

    public constructor(init?: Partial<ListCompanyInvitationByCompanyIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListContextEmailsResponse
{
    public participants?: ContextNotificationDto[];

    public constructor(init?: Partial<ListContextEmailsResponse>) { (Object as any).assign(this, init); }
}

export class ListContextOwnerDetailsByIdsResponse extends BaseMultipleResultResponse<ContextOwnerDto>
{

    public constructor(init?: Partial<ListContextOwnerDetailsByIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateNoteResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateNoteResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListNoteResponse extends BaseMultipleResultResponse<NoteDto>
{

    public constructor(init?: Partial<ListNoteResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListNoteByProjectIdResponse extends BaseMultipleResultResponse<NoteDto>
{

    public constructor(init?: Partial<ListNoteByProjectIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListNoteByUserIdResponse extends BaseMultipleResultResponse<NoteDto>
{

    public constructor(init?: Partial<ListNoteByUserIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetNoteResponse extends BaseSingleResponse<NoteDto>
{

    public constructor(init?: Partial<GetNoteResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteOperationResult extends BaseDeleteOperationResult<number>
{

    public constructor(init?: Partial<DeleteOperationResult>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteNoteResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteNoteResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateNoteResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateNoteResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListNotesAndTasksResponse extends BaseMultipleNotesAndTasksResponse
{

    public constructor(init?: Partial<ListNotesAndTasksResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateCompanyAffiliationResponse
{
    public profileId?: number;

    public constructor(init?: Partial<CreateCompanyAffiliationResponse>) { (Object as any).assign(this, init); }
}

export class DeleteProfileCommandResponse
{
    public id: number;

    public constructor(init?: Partial<DeleteProfileCommandResponse>) { (Object as any).assign(this, init); }
}

export class DeleteContextCommandResponse
{
    public id: number;

    public constructor(init?: Partial<DeleteContextCommandResponse>) { (Object as any).assign(this, init); }
}

export class GetUsersContextIdsResponse extends BaseMultipleResultResponse<UserContextIdsDto>
{

    public constructor(init?: Partial<GetUsersContextIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetProfileResponse extends BaseSingleResponse<ProfileDto>
{

    public constructor(init?: Partial<GetProfileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetUserContextResponse extends BaseSingleResponse<ProfileDto>
{

    public constructor(init?: Partial<GetUserContextResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetAvatarIdResponse extends BaseSingleResponse<AvatarDto>
{

    public constructor(init?: Partial<GetAvatarIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetContactInformationByIdResponse extends OperationResult
{
    public name?: string;
    public email?: string;
    public phone?: string;

    public constructor(init?: Partial<GetContactInformationByIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetCompanyManagementEmployeeCountResponse extends BaseSingleResponse<number>
{

    public constructor(init?: Partial<GetCompanyManagementEmployeeCountResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListEmployeeInfoByCompanyIdResponse extends BaseMultipleResultResponse<EmployeeInfoDto>
{

    public constructor(init?: Partial<ListEmployeeInfoByCompanyIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UserInfoByIdResponse extends BaseSingleResponse<EmployeeInfoDto>
{

    public constructor(init?: Partial<UserInfoByIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetUserByPhoneResponse extends BaseSingleResponse<ProfileDto>
{

    public constructor(init?: Partial<GetUserByPhoneResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListProfileNameByIdsResponse extends BaseMultipleResultResponse<EmployeeInfoDto>
{

    public constructor(init?: Partial<ListProfileNameByIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListProfileByUserNameResponse extends BaseMultipleResultResponse<ProfileNameDto>
{

    public constructor(init?: Partial<ListProfileByUserNameResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchProfileInfoResponse extends OperationResult
{

    public constructor(init?: Partial<PatchProfileInfoResponse>) { super(init); (Object as any).assign(this, init); }
}

export class PatchContextInfoResponse extends OperationResult
{

    public constructor(init?: Partial<PatchContextInfoResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetProfileModesResponse extends BaseMultipleResultResponse<ProfileModeDto>
{

    public constructor(init?: Partial<GetProfileModesResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetProfileModeResponse extends BaseSingleResponse<ProfileModeDto>
{

    public constructor(init?: Partial<GetProfileModeResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetReferralResponse extends BaseSingleResponse<ReferralDto>
{

    public constructor(init?: Partial<GetReferralResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetUserReferralsResponse extends BaseMultipleResultResponse<ReferralDto>
{

    public constructor(init?: Partial<GetUserReferralsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateReferralResponse extends BaseSingleResponse<ReferralDto>
{
    public validation?: ReferralValidation;

    public constructor(init?: Partial<CreateReferralResponse>) { super(init); (Object as any).assign(this, init); }
}

export class BaseReferralOperationResult extends OperationResult
{

    public constructor(init?: Partial<BaseReferralOperationResult>) { super(init); (Object as any).assign(this, init); }
}

export class InviteUserResponse
{
    public isSuccess?: boolean;

    public constructor(init?: Partial<InviteUserResponse>) { (Object as any).assign(this, init); }
}

export class CreateTaskResponse extends PostOperationResult
{

    public constructor(init?: Partial<CreateTaskResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListTaskResponse extends BaseMultipleResultResponse<TaskDto>
{

    public constructor(init?: Partial<ListTaskResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListTaskByProjectIdResponse extends BaseMultipleResultResponse<TaskDto>
{

    public constructor(init?: Partial<ListTaskByProjectIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListTaskByUserIdResponse extends BaseMultipleResultResponse<TaskDto>
{

    public constructor(init?: Partial<ListTaskByUserIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetTaskResponse extends BaseSingleResponse<TaskDto>
{

    public constructor(init?: Partial<GetTaskResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteTaskResponse extends DeleteOperationResult
{

    public constructor(init?: Partial<DeleteTaskResponse>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateTaskResponse extends PutOperationResult
{

    public constructor(init?: Partial<UpdateTaskResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListUserManagementProfilesResponse extends BaseMultipleResultResponse<UserManagementProfileDto>
{

    public constructor(init?: Partial<ListUserManagementProfilesResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetUserManagementProfileByIdResponse extends BaseSingleResponse<UserManagementProfileDto>
{

    public constructor(init?: Partial<GetUserManagementProfileByIdResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetUserManagementCompanyCountResponse extends BaseSingleResponse<number>
{

    public constructor(init?: Partial<GetUserManagementCompanyCountResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/profile/listcompanyinvitationbyuserquery", "GET")
export class ListCompanyInvitationByUserQuery implements IReturn<ListCompanyInvitationByUserResponse>, IGet
{

    public constructor(init?: Partial<ListCompanyInvitationByUserQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyInvitationByUserQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyInvitationByUserResponse(); }
}

// @Route("/profile/decideinvitationcommand", "POST")
export class DecideInvitationCommand implements IReturn<DecideInvitationResponse>, IPost
{
    public accept?: boolean;
    public companyId?: number;

    public constructor(init?: Partial<DecideInvitationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DecideInvitationCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new DecideInvitationResponse(); }
}

// @Route("/profile/invitepartnerasownercommand", "POST")
export class InvitePartnerAsOwnerCommand implements IReturn<InvitePartnerAsOwnerResponse>, IPost
{
    public companyId?: number;
    public userId?: number;

    public constructor(init?: Partial<InvitePartnerAsOwnerCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'InvitePartnerAsOwnerCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new InvitePartnerAsOwnerResponse(); }
}

// @Route("/profile/listcompanyinvitationbycompanyidquery", "GET")
export class ListCompanyInvitationByCompanyIdQuery implements IReturn<ListCompanyInvitationByCompanyIdResponse>, IGet
{
    public companyId?: number;

    public constructor(init?: Partial<ListCompanyInvitationByCompanyIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListCompanyInvitationByCompanyIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListCompanyInvitationByCompanyIdResponse(); }
}

// @Route("/profile/listcontextemailsquery", "GET")
export class ListContextEmailsQuery implements IReturn<ListContextEmailsResponse>, IGet
{
    public contextsData?: ContextDataDto[];

    public constructor(init?: Partial<ListContextEmailsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContextEmailsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContextEmailsResponse(); }
}

// @Route("/profile/listcontextownerdetailsbyidsquery", "GET")
export class ListContextOwnerDetailsByIdsQuery implements IReturn<ListContextOwnerDetailsByIdsResponse>, IGet
{
    public companyIds?: number[];

    public constructor(init?: Partial<ListContextOwnerDetailsByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListContextOwnerDetailsByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListContextOwnerDetailsByIdsResponse(); }
}

// @Route("/profile/createnotecommand", "POST")
export class CreateNoteCommand implements IReturn<CreateNoteResponse>, IPost, INoteDto
{
    public userId?: number;
    public constructionProjectId?: number;
    public companyId?: number;
    public noteContent?: string;

    public constructor(init?: Partial<CreateNoteCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateNoteCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateNoteResponse(); }
}

// @Route("/profile/listnotequery", "GET")
export class ListNoteQuery implements IReturn<ListNoteResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListNoteQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListNoteQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListNoteResponse(); }
}

// @Route("/profile/listnotebyprojectidquery/{constructionprojectid}", "GET")
export class ListNoteByProjectIdQuery implements IReturn<ListNoteByProjectIdResponse>, IPaginatedRequest, IGet
{
    // @Required()
    public constructionProjectId: number;

    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListNoteByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListNoteByProjectIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListNoteByProjectIdResponse(); }
}

// @Route("/profile/listnotebyuseridquery/{userid}", "GET")
export class ListNoteByUserIdQuery implements IReturn<ListNoteByUserIdResponse>, IPaginatedRequest, IGet
{
    // @Required()
    public userId: number;

    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListNoteByUserIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListNoteByUserIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListNoteByUserIdResponse(); }
}

// @Route("/profile/getnotequery/{id}", "GET")
export class GetNoteQuery implements IReturn<GetNoteResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetNoteQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetNoteQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetNoteResponse(); }
}

// @Route("/profile/deletenotecommand/{id}", "DELETE")
export class DeleteNoteCommand implements IReturn<DeleteNoteResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteNoteCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteNoteCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteNoteResponse(); }
}

// @Route("/profile/updatenotecommand/{id}", "PUT")
export class UpdateNoteCommand implements IReturn<UpdateNoteResponse>, IPut, INoteDto
{
    // @Required()
    public id: number;

    public userId?: number;
    public companyId?: number;
    public constructionProjectId?: number;
    // @Required()
    public noteContent: string;

    public constructor(init?: Partial<UpdateNoteCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateNoteCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateNoteResponse(); }
}

// @Route("/profile/listnotesandtasksquery/{id}", "GET")
export class ListNotesAndTasksQuery implements IReturn<ListNotesAndTasksResponse>, IPaginatedRequest, IGet
{
    public noteTaskAffilation?: NoteTaskAffilationType;
    public id: number;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListNotesAndTasksQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListNotesAndTasksQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListNotesAndTasksResponse(); }
}

// @Route("/profile/createcontextcommand", "POST")
export class CreateContextCommand implements IReturnVoid, IPost
{
    public userId?: string;
    public companyId?: number;
    public name?: string;
    public contextIcon?: string;
    public type?: ContextType;
    public affiliationType?: AffiliationType;
    public ownerPhone?: string;
    public ownerEmail?: string;
    public ownerName?: string;

    public constructor(init?: Partial<CreateContextCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContextCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/profile/createcompanyaffiliationcommand", "POST")
export class CreateCompanyAffiliationCommand implements IReturn<CreateCompanyAffiliationResponse>, IPost
{
    public phone?: string;
    public companyId?: number;
    public affiliationType?: AffiliationType;

    public constructor(init?: Partial<CreateCompanyAffiliationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateCompanyAffiliationCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateCompanyAffiliationResponse(); }
}

// @Route("/profile/deletecompanyaffiliationcommand", "DELETE")
export class DeleteCompanyAffiliationCommand implements IReturnVoid, IDelete
{
    public phone?: string;
    public companyId?: number;

    public constructor(init?: Partial<DeleteCompanyAffiliationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteCompanyAffiliationCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @Route("/profile/deleteprofilecommand/{id}", "DELETE")
export class DeleteProfileCommand implements IReturn<DeleteProfileCommandResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteProfileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteProfileCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteProfileCommandResponse(); }
}

// @Route("/profile/deletecontextcommand/{id}", "DELETE")
export class DeleteContextCommand implements IReturn<DeleteContextCommandResponse>, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteContextCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContextCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteContextCommandResponse(); }
}

// @Route("/profile/getuserscontextidsquery", "GET")
export class GetUsersContextIdsQuery implements IReturn<GetUsersContextIdsResponse>, IGet
{
    public profileIds?: number[];

    public constructor(init?: Partial<GetUsersContextIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUsersContextIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUsersContextIdsResponse(); }
}

// @Route("/profile/getprofilequery", "GET")
export class GetProfileQuery implements IReturn<GetProfileResponse>, IGet
{

    public constructor(init?: Partial<GetProfileQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProfileQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProfileResponse(); }
}

// @Route("/profile/getusercontextquery", "GET")
export class GetUserContextQuery implements IReturn<GetUserContextResponse>, IGet
{
    public userId?: number;

    public constructor(init?: Partial<GetUserContextQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserContextQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserContextResponse(); }
}

// @Route("/profile/getavataridquery/{id}", "GET")
export class GetAvatarIdQuery implements IReturn<GetAvatarIdResponse>, IGet
{
    public id: number;
    public isCompany?: boolean;

    public constructor(init?: Partial<GetAvatarIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAvatarIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAvatarIdResponse(); }
}

// @Route("/profile/getcontactinformationbyidquery", "GET")
export class GetContactInformationByIdQuery implements IReturn<GetContactInformationByIdResponse>, IGet
{
    public profileId?: number;

    public constructor(init?: Partial<GetContactInformationByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContactInformationByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContactInformationByIdResponse(); }
}

// @Route("/profile/getcompanymanagementemployeecountquery", "GET")
export class GetCompanyManagementEmployeeCountQuery implements IReturn<GetCompanyManagementEmployeeCountResponse>, IGet
{
    public companyId?: number;

    public constructor(init?: Partial<GetCompanyManagementEmployeeCountQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCompanyManagementEmployeeCountQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetCompanyManagementEmployeeCountResponse(); }
}

// @Route("/profile/listemployeeinfobycompanyidquery", "GET")
export class ListEmployeeInfoByCompanyIdQuery implements IReturn<ListEmployeeInfoByCompanyIdResponse>, IGet
{
    public companyId?: number;

    public constructor(init?: Partial<ListEmployeeInfoByCompanyIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListEmployeeInfoByCompanyIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListEmployeeInfoByCompanyIdResponse(); }
}

// @Route("/profile/getuserinfobyidquery", "GET")
export class GetUserInfoByIdQuery implements IReturn<UserInfoByIdResponse>, IGet
{
    public profileId?: number;

    public constructor(init?: Partial<GetUserInfoByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserInfoByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new UserInfoByIdResponse(); }
}

// @Route("/profile/getprofilebyphonequery", "GET")
export class GetProfileByPhoneQuery implements IReturn<GetProfileResponse>, IGet
{
    public phone?: string;

    public constructor(init?: Partial<GetProfileByPhoneQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProfileByPhoneQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProfileResponse(); }
}

// @Route("/profile/getuserbyphonequery", "GET")
export class GetUserByPhoneQuery implements IReturn<GetUserByPhoneResponse>, IGet
{
    public userPhone?: string;

    public constructor(init?: Partial<GetUserByPhoneQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserByPhoneQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserByPhoneResponse(); }
}

// @Route("/profile/listprofilenamebyidsquery", "GET")
export class ListProfileNameByIdsQuery implements IReturn<ListProfileNameByIdsResponse>, IGet
{
    public idCollection?: number[];

    public constructor(init?: Partial<ListProfileNameByIdsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListProfileNameByIdsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListProfileNameByIdsResponse(); }
}

// @Route("/profile/listprofilebyusernamequery", "GET")
export class ListProfileByUserNameQuery implements IReturn<ListProfileByUserNameResponse>, IPaginatedRequest, IGet
{
    public userName?: string;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListProfileByUserNameQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListProfileByUserNameQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListProfileByUserNameResponse(); }
}

// @Route("/profile/patchprofileinfocommand", "PATCH")
export class PatchProfileInfoCommand implements IReturn<PatchProfileInfoResponse>, IPatch
{
    public name?: string;
    public email?: string;
    public profilePicture?: string;

    public constructor(init?: Partial<PatchProfileInfoCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchProfileInfoCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchProfileInfoResponse(); }
}

// @Route("/profile/patchdefaultcontextcommand", "PATCH")
export class PatchDefaultContextCommand implements IReturn<PatchProfileInfoResponse>, IPatch
{
    public defaultContextId?: number;

    public constructor(init?: Partial<PatchDefaultContextCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchDefaultContextCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchProfileInfoResponse(); }
}

// @Route("/profile/patchcontextinfocommand", "PATCH")
export class PatchContextInfoCommand implements IReturn<PatchContextInfoResponse>, IPatch
{
    // @Required()
    public companyId: number;

    public name?: string;
    public contextIcon?: string;
    public ownerPhone?: string;
    public ownerEmail?: string;
    public ownerName?: string;

    public constructor(init?: Partial<PatchContextInfoCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PatchContextInfoCommand'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new PatchContextInfoResponse(); }
}

// @Route("/profile/getprofilemodesquery", "GET")
export class GetProfileModesQuery implements IReturn<GetProfileModesResponse>, IGet
{

    public constructor(init?: Partial<GetProfileModesQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProfileModesQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProfileModesResponse(); }
}

// @Route("/profile/getprofilemodequery", "GET")
export class GetProfileModeQuery implements IReturn<GetProfileModeResponse>, IGet
{
    public profileModeId?: number;

    public constructor(init?: Partial<GetProfileModeQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProfileModeQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProfileModeResponse(); }
}

// @Route("/profile/getprofilemodebytypequery", "GET")
export class GetProfileModeByTypeQuery implements IReturn<GetProfileModeResponse>, IGet
{
    public profileModeType?: SpecialProfileMode;

    public constructor(init?: Partial<GetProfileModeByTypeQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetProfileModeByTypeQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetProfileModeResponse(); }
}

// @Route("/profile/consumeprofilemodecommand", "DELETE")
export class ConsumeProfileModeCommand implements IReturn<DeleteOperationResult>
{
    public profileModeId?: number;
    public profileId?: number;
    public companyId?: number;
    public mode?: SpecialProfileMode;

    public constructor(init?: Partial<ConsumeProfileModeCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ConsumeProfileModeCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteOperationResult(); }
}

// @Route("/profile/rejectprojectinvitationcommand", "DELETE")
export class RejectProjectInvitationCommand implements IReturn<DeleteOperationResult>
{
    public projectId?: number;
    public mode?: SpecialProfileMode;
    public rejectAll?: boolean;

    public constructor(init?: Partial<RejectProjectInvitationCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RejectProjectInvitationCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteOperationResult(); }
}

// @Route("/profile/getreferralquery", "GET")
export class GetReferralQuery implements IReturn<GetReferralResponse>, IGet
{
    public referralCode?: string;

    public constructor(init?: Partial<GetReferralQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetReferralQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetReferralResponse(); }
}

// @Route("/profile/getuserreferralsquery", "GET")
export class GetUserReferralsQuery implements IReturn<GetUserReferralsResponse>, IGet
{

    public constructor(init?: Partial<GetUserReferralsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserReferralsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserReferralsResponse(); }
}

// @Route("/profile/createreferralcommand", "POST")
export class CreateReferralCommand implements IReturn<CreateReferralResponse>, IPost
{
    public referralType?: ReferralType;
    public referralPhoneNumber?: string;
    public referralEmail?: string;
    public singleUse?: boolean;
    public projectId?: number;
    public projectName?: string;

    public constructor(init?: Partial<CreateReferralCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateReferralCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateReferralResponse(); }
}

// @Route("/profile/deletereferralcommand", "DELETE")
export class DeleteReferralCommand implements IReturn<BaseReferralOperationResult>, IDelete
{
    public referralId?: number;

    public constructor(init?: Partial<DeleteReferralCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteReferralCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new BaseReferralOperationResult(); }
}

// @Route("/profile/inviteusercommand", "POST")
export class InviteUserCommand implements IReturn<InviteUserResponse>, IPost
{
    public name?: string;
    public phone?: string;
    public email?: string;

    public constructor(init?: Partial<InviteUserCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'InviteUserCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new InviteUserResponse(); }
}

// @Route("/profile/createtaskcommand", "POST")
export class CreateTaskCommand implements IReturn<CreateTaskResponse>, IPost, ITaskDto
{
    public userId?: number;
    public constructionProjectId?: number;
    public companyId?: number;
    public taskContent?: string;
    public taskCategory?: TaskCategory;
    public finishDate?: string;
    public isCompleted?: boolean;
    public completedDate?: string;

    public constructor(init?: Partial<CreateTaskCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateTaskCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateTaskResponse(); }
}

// @Route("/profile/listtaskquery", "GET")
export class ListTaskQuery implements IReturn<ListTaskResponse>, IPaginatedRequest, IGet
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListTaskQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListTaskQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListTaskResponse(); }
}

// @Route("/profile/listtaskbyprojectidquery/{constructionprojectid}", "GET")
export class ListTaskByProjectIdQuery implements IReturn<ListTaskByProjectIdResponse>, IPaginatedRequest, IGet
{
    // @Required()
    public constructionProjectId: number;

    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListTaskByProjectIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListTaskByProjectIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListTaskByProjectIdResponse(); }
}

// @Route("/profile/listtaskbyuseridquery/{userid}", "GET")
export class ListTaskByUserIdQuery implements IReturn<ListTaskByUserIdResponse>, IPaginatedRequest, IGet
{
    // @Required()
    public userId: number;

    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListTaskByUserIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListTaskByUserIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListTaskByUserIdResponse(); }
}

// @Route("/profile/gettaskquery/{id}", "GET")
export class GetTaskQuery implements IReturn<GetTaskResponse>, IGet
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<GetTaskQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTaskQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetTaskResponse(); }
}

// @Route("/profile/deletetaskcommand/{id}", "DELETE")
export class DeleteTaskCommand implements IReturn<DeleteTaskResponse>, IDelete
{
    // @Required()
    public id: number;

    public constructor(init?: Partial<DeleteTaskCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteTaskCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteTaskResponse(); }
}

// @Route("/profile/updatetaskcommand/{id}", "PUT")
export class UpdateTaskCommand implements IReturn<UpdateTaskResponse>, IPut, ITaskDto
{
    // @Required()
    public id: number;

    public userId?: number;
    public companyId?: number;
    public constructionProjectId?: number;
    // @Required()
    public taskContent: string;

    // @Required()
    public taskCategory: TaskCategory;

    // @Required()
    public finishDate: string;

    public isCompleted?: boolean;
    public completedDate?: string;

    public constructor(init?: Partial<UpdateTaskCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateTaskCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateTaskResponse(); }
}

// @Route("/profile/listusermanagementprofilesquery", "POST")
export class ListUserManagementProfilesQuery implements IReturn<ListUserManagementProfilesResponse>, IPaginatedRequest, IPost
{
    public sortRules?: UserManagementProfilesSort;
    public userIds?: number[];
    public userName?: string;
    public phoneNumber?: string;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListUserManagementProfilesQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListUserManagementProfilesQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListUserManagementProfilesResponse(); }
}

// @Route("/profile/getusermanagementprofilebyidquery", "GET")
export class GetUserManagementProfileByIdQuery implements IReturn<GetUserManagementProfileByIdResponse>, IGet
{
    public profileId?: number;

    public constructor(init?: Partial<GetUserManagementProfileByIdQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserManagementProfileByIdQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserManagementProfileByIdResponse(); }
}

// @Route("/profile/getusermanagementcompanycountquery", "GET")
export class GetUserManagementCompanyCountQuery implements IReturn<GetUserManagementCompanyCountResponse>, IGet
{
    public profileId?: number;

    public constructor(init?: Partial<GetUserManagementCompanyCountQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserManagementCompanyCountQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserManagementCompanyCountResponse(); }
}

