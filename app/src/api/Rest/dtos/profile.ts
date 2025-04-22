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

export type ContextDataDto = {
    contextId?: number;
    contextType?: ContextType;
};

export const ContextDataDtoStruct = (): T.Describe<ContextDataDto> => (T.type({
    contextId: tSpecialOptional(T.number()),
    contextType: tSpecialOptional(ContextTypeStruct()),
}) as unknown as T.Describe<ContextDataDto>);

export type UserManagementProfilesSort = {
    idIsAscending?: boolean;
    nameIsAscending?: boolean;
    emailIsAscending?: boolean;
    phoneIsAscending?: boolean;
    signedUpOnIsAscending?: boolean;
    companyAssociationIsAscending?: boolean;
    lastActivityIsAscending?: boolean;
};

export const UserManagementProfilesSortStruct = (): T.Describe<UserManagementProfilesSort> => (T.type({
    idIsAscending: tSpecialOptional(T.boolean()),
    nameIsAscending: tSpecialOptional(T.boolean()),
    emailIsAscending: tSpecialOptional(T.boolean()),
    phoneIsAscending: tSpecialOptional(T.boolean()),
    signedUpOnIsAscending: tSpecialOptional(T.boolean()),
    companyAssociationIsAscending: tSpecialOptional(T.boolean()),
    lastActivityIsAscending: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UserManagementProfilesSort>);

export type CompanyInvitationDto = {
    id: number;
    phone?: string;
    companyId?: number;
    companyName?: string;
    iconId?: string;
    isChangePartnerToOwner?: boolean;
};

export const CompanyInvitationDtoStruct = (): T.Describe<CompanyInvitationDto> => (T.type({
    id: T.number(),
    phone: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    companyName: tSpecialOptional(T.string()),
    iconId: tSpecialOptional(T.string()),
    isChangePartnerToOwner: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CompanyInvitationDto>);

export type ProfileNotificationDto = {
    profileId?: number;
    email?: string;
};

export const ProfileNotificationDtoStruct = (): T.Describe<ProfileNotificationDto> => (T.type({
    profileId: tSpecialOptional(T.number()),
    email: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ProfileNotificationDto>);

export type ContextNotificationDto = {
    profilesNotificationDto?: ProfileNotificationDto[];
    contextType?: ContextType;
};

export const ContextNotificationDtoStruct = (): T.Describe<ContextNotificationDto> => (T.type({
    profilesNotificationDto: tSpecialOptional(T.array(ProfileNotificationDtoStruct())),
    contextType: tSpecialOptional(ContextTypeStruct()),
}) as unknown as T.Describe<ContextNotificationDto>);

export type ContextOwnerDto = {
    companyId?: number;
    ownerName?: string;
    ownerPhone?: string;
};

export const ContextOwnerDtoStruct = (): T.Describe<ContextOwnerDto> => (T.type({
    companyId: tSpecialOptional(T.number()),
    ownerName: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ContextOwnerDto>);

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

export type NoteDto = {
    id: number;
    userId?: number;
    constructionProjectId?: number;
    companyId?: number;
    noteContent?: string;
};

export const NoteDtoStruct = (): T.Describe<NoteDto> => (T.type({
    id: T.number(),
    userId: tSpecialOptional(T.number()),
    constructionProjectId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    noteContent: tSpecialOptional(T.string()),
}) as unknown as T.Describe<NoteDto>);

export type NoteTaskDto = {
    id: number;
    userId?: number;
    constructionProjectId?: number;
    companyId?: number;
    createdDate?: string;
    content?: string;
    noteTaskType?: NoteTaskType;
    taskCategory?: TaskCategory;
    finishDate?: string;
    isCompleted?: boolean;
    completedDate?: string;
};

export const NoteTaskDtoStruct = (): T.Describe<NoteTaskDto> => (T.type({
    id: T.number(),
    userId: tSpecialOptional(T.number()),
    constructionProjectId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    createdDate: tSpecialOptional(T.string()),
    content: tSpecialOptional(T.string()),
    noteTaskType: tSpecialOptional(NoteTaskTypeStruct()),
    taskCategory: tSpecialOptional(TaskCategoryStruct()),
    finishDate: tSpecialOptional(T.string()),
    isCompleted: tSpecialOptional(T.boolean()),
    completedDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<NoteTaskDto>);

export type UserContextIdsDto = {
    profileId?: number;
    contextIds?: number[];
};

export const UserContextIdsDtoStruct = (): T.Describe<UserContextIdsDto> => (T.type({
    profileId: tSpecialOptional(T.number()),
    contextIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<UserContextIdsDto>);

export type ContextDto = {
    id: number;
    companyId?: number;
    name?: string;
    contextIcon?: string;
    type?: ContextType;
};

export const ContextDtoStruct = (): T.Describe<ContextDto> => (T.type({
    id: T.number(),
    companyId: tSpecialOptional(T.number()),
    name: tSpecialOptional(T.string()),
    contextIcon: tSpecialOptional(T.string()),
    type: tSpecialOptional(ContextTypeStruct()),
}) as unknown as T.Describe<ContextDto>);

export type ContextAffiliationDto = {
    context?: ContextDto;
    affiliationType?: AffiliationType;
};

export const ContextAffiliationDtoStruct = (): T.Describe<ContextAffiliationDto> => (T.type({
    context: tSpecialOptional(ContextDtoStruct()),
    affiliationType: tSpecialOptional(AffiliationTypeStruct()),
}) as unknown as T.Describe<ContextAffiliationDto>);

export type ProfileModeDto = {
    id: number;
    mode?: SpecialProfileMode;
    projectId?: number;
};

export const ProfileModeDtoStruct = (): T.Describe<ProfileModeDto> => (T.type({
    id: T.number(),
    mode: tSpecialOptional(SpecialProfileModeStruct()),
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ProfileModeDto>);

export type ProfileDto = {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    profilePicture?: string;
    defaultContextId?: number;
    defaultType?: ContextType;
    contextsAffiliation?: ContextAffiliationDto[];
    profileModes?: ProfileModeDto[];
};

export const ProfileDtoStruct = (): T.Describe<ProfileDto> => (T.type({
    id: T.number(),
    name: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    profilePicture: tSpecialOptional(T.string()),
    defaultContextId: tSpecialOptional(T.number()),
    defaultType: tSpecialOptional(ContextTypeStruct()),
    contextsAffiliation: tSpecialOptional(T.array(ContextAffiliationDtoStruct())),
    profileModes: tSpecialOptional(T.array(ProfileModeDtoStruct())),
}) as unknown as T.Describe<ProfileDto>);

export type AvatarDto = {
    id: number;
    isCompany?: boolean;
    avatarId?: string;
};

export const AvatarDtoStruct = (): T.Describe<AvatarDto> => (T.type({
    id: T.number(),
    isCompany: tSpecialOptional(T.boolean()),
    avatarId: tSpecialOptional(T.string()),
}) as unknown as T.Describe<AvatarDto>);

export type ProfileNameDto = {
    id: number;
    name?: string;
};

export const ProfileNameDtoStruct = (): T.Describe<ProfileNameDto> => (T.type({
    id: T.number(),
    name: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ProfileNameDto>);

export type EmployeeInfoDto = {
    email?: string;
    profilePicture?: string;
    phone?: string;
    affiliationType?: AffiliationType;
    id: number;
    name?: string;
};

export const EmployeeInfoDtoStruct = (): T.Describe<EmployeeInfoDto> => (T.type({
    email: tSpecialOptional(T.string()),
    profilePicture: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    affiliationType: tSpecialOptional(AffiliationTypeStruct()),
    id: T.number(),
    name: tSpecialOptional(T.string()),
}) as unknown as T.Describe<EmployeeInfoDto>);

export type ReferralDto = {
    id: number;
    referralPhoneNumber?: string;
    referralCode?: string;
    referralType?: ReferralType;
    projectId?: number;
};

export const ReferralDtoStruct = (): T.Describe<ReferralDto> => (T.type({
    id: T.number(),
    referralPhoneNumber: tSpecialOptional(T.string()),
    referralCode: tSpecialOptional(T.string()),
    referralType: tSpecialOptional(ReferralTypeStruct()),
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ReferralDto>);

export type ReferralValidation = {
    companyDoesNotExist?: boolean;
};

export const ReferralValidationStruct = (): T.Describe<ReferralValidation> => (T.type({
    companyDoesNotExist: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ReferralValidation>);

export type TaskDto = {
    id: number;
    userId?: number;
    constructionProjectId?: number;
    companyId?: number;
    taskContent?: string;
    taskCategory?: TaskCategory;
    finishDate?: string;
    isCompleted?: boolean;
    completedDate?: string;
};

export const TaskDtoStruct = (): T.Describe<TaskDto> => (T.type({
    id: T.number(),
    userId: tSpecialOptional(T.number()),
    constructionProjectId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    taskContent: tSpecialOptional(T.string()),
    taskCategory: tSpecialOptional(TaskCategoryStruct()),
    finishDate: tSpecialOptional(T.string()),
    isCompleted: tSpecialOptional(T.boolean()),
    completedDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<TaskDto>);

export type UserManagementProfileDto = {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    userAuthId?: string;
    profilePicture?: string;
    signedUpOn?: string;
    companyAssociations?: number;
    lastSignIn?: string;
    contextsAffiliation?: ContextAffiliationDto[];
};

export const UserManagementProfileDtoStruct = (): T.Describe<UserManagementProfileDto> => (T.type({
    id: T.number(),
    name: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    userAuthId: tSpecialOptional(T.string()),
    profilePicture: tSpecialOptional(T.string()),
    signedUpOn: tSpecialOptional(T.string()),
    companyAssociations: tSpecialOptional(T.number()),
    lastSignIn: tSpecialOptional(T.string()),
    contextsAffiliation: tSpecialOptional(T.array(ContextAffiliationDtoStruct())),
}) as unknown as T.Describe<UserManagementProfileDto>);

export type ListCompanyInvitationByUserResponse = {
    result: CompanyInvitationDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyInvitationByUserResponseStruct = (): T.Describe<ListCompanyInvitationByUserResponse> => (T.type({
    result: T.array(CompanyInvitationDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyInvitationByUserResponse>);

export type DecideInvitationResponse = {
    isSuccess?: boolean;
};

export const DecideInvitationResponseStruct = (): T.Describe<DecideInvitationResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DecideInvitationResponse>);

export type InvitePartnerAsOwnerResponse = {
    isSuccess?: boolean;
};

export const InvitePartnerAsOwnerResponseStruct = (): T.Describe<InvitePartnerAsOwnerResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<InvitePartnerAsOwnerResponse>);

export type ListCompanyInvitationByCompanyIdResponse = {
    result: CompanyInvitationDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyInvitationByCompanyIdResponseStruct = (): T.Describe<ListCompanyInvitationByCompanyIdResponse> => (T.type({
    result: T.array(CompanyInvitationDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyInvitationByCompanyIdResponse>);

export type ListContextEmailsResponse = {
    participants?: ContextNotificationDto[];
};

export const ListContextEmailsResponseStruct = (): T.Describe<ListContextEmailsResponse> => (T.type({
    participants: tSpecialOptional(T.array(ContextNotificationDtoStruct())),
}) as unknown as T.Describe<ListContextEmailsResponse>);

export type ListContextOwnerDetailsByIdsResponse = {
    result: ContextOwnerDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContextOwnerDetailsByIdsResponseStruct = (): T.Describe<ListContextOwnerDetailsByIdsResponse> => (T.type({
    result: T.array(ContextOwnerDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContextOwnerDetailsByIdsResponse>);

export type CreateNoteResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateNoteResponseStruct = (): T.Describe<CreateNoteResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateNoteResponse>);

export type ListNoteResponse = {
    result: NoteDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListNoteResponseStruct = (): T.Describe<ListNoteResponse> => (T.type({
    result: T.array(NoteDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNoteResponse>);

export type ListNoteByProjectIdResponse = {
    result: NoteDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListNoteByProjectIdResponseStruct = (): T.Describe<ListNoteByProjectIdResponse> => (T.type({
    result: T.array(NoteDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNoteByProjectIdResponse>);

export type ListNoteByUserIdResponse = {
    result: NoteDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListNoteByUserIdResponseStruct = (): T.Describe<ListNoteByUserIdResponse> => (T.type({
    result: T.array(NoteDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNoteByUserIdResponse>);

export type GetNoteResponse = {
    result: NoteDto;
};

export const GetNoteResponseStruct = (): T.Describe<GetNoteResponse> => (T.type({
    result: NoteDtoStruct(),
}) as unknown as T.Describe<GetNoteResponse>);

export type DeleteOperationResult = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteOperationResultStruct = (): T.Describe<DeleteOperationResult> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteOperationResult>);

export type DeleteNoteResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteNoteResponseStruct = (): T.Describe<DeleteNoteResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteNoteResponse>);

export type UpdateNoteResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateNoteResponseStruct = (): T.Describe<UpdateNoteResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateNoteResponse>);

export type ListNotesAndTasksResponse = {
    notesCount?: number;
    tasksCount?: number;
    result: NoteTaskDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListNotesAndTasksResponseStruct = (): T.Describe<ListNotesAndTasksResponse> => (T.type({
    notesCount: tSpecialOptional(T.number()),
    tasksCount: tSpecialOptional(T.number()),
    result: T.array(NoteTaskDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNotesAndTasksResponse>);

export type CreateCompanyAffiliationResponse = {
    profileId?: number;
};

export const CreateCompanyAffiliationResponseStruct = (): T.Describe<CreateCompanyAffiliationResponse> => (T.type({
    profileId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateCompanyAffiliationResponse>);

export type DeleteProfileCommandResponse = {
    id: number;
};

export const DeleteProfileCommandResponseStruct = (): T.Describe<DeleteProfileCommandResponse> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteProfileCommandResponse>);

export type DeleteContextCommandResponse = {
    id: number;
};

export const DeleteContextCommandResponseStruct = (): T.Describe<DeleteContextCommandResponse> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContextCommandResponse>);

export type GetUsersContextIdsResponse = {
    result: UserContextIdsDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetUsersContextIdsResponseStruct = (): T.Describe<GetUsersContextIdsResponse> => (T.type({
    result: T.array(UserContextIdsDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetUsersContextIdsResponse>);

export type GetProfileResponse = {
    result: ProfileDto;
};

export const GetProfileResponseStruct = (): T.Describe<GetProfileResponse> => (T.type({
    result: ProfileDtoStruct(),
}) as unknown as T.Describe<GetProfileResponse>);

export type GetUserContextResponse = {
    result: ProfileDto;
};

export const GetUserContextResponseStruct = (): T.Describe<GetUserContextResponse> => (T.type({
    result: ProfileDtoStruct(),
}) as unknown as T.Describe<GetUserContextResponse>);

export type GetAvatarIdResponse = {
    result: AvatarDto;
};

export const GetAvatarIdResponseStruct = (): T.Describe<GetAvatarIdResponse> => (T.type({
    result: AvatarDtoStruct(),
}) as unknown as T.Describe<GetAvatarIdResponse>);

export type GetContactInformationByIdResponse = {
    name?: string;
    email?: string;
    phone?: string;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const GetContactInformationByIdResponseStruct = (): T.Describe<GetContactInformationByIdResponse> => (T.type({
    name: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GetContactInformationByIdResponse>);

export type GetCompanyManagementEmployeeCountResponse = {
    result: number;
};

export const GetCompanyManagementEmployeeCountResponseStruct = (): T.Describe<GetCompanyManagementEmployeeCountResponse> => (T.type({
    result: T.number(),
}) as unknown as T.Describe<GetCompanyManagementEmployeeCountResponse>);

export type ListEmployeeInfoByCompanyIdResponse = {
    result: EmployeeInfoDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListEmployeeInfoByCompanyIdResponseStruct = (): T.Describe<ListEmployeeInfoByCompanyIdResponse> => (T.type({
    result: T.array(EmployeeInfoDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListEmployeeInfoByCompanyIdResponse>);

export type UserInfoByIdResponse = {
    result: EmployeeInfoDto;
};

export const UserInfoByIdResponseStruct = (): T.Describe<UserInfoByIdResponse> => (T.type({
    result: EmployeeInfoDtoStruct(),
}) as unknown as T.Describe<UserInfoByIdResponse>);

export type GetUserByPhoneResponse = {
    result: ProfileDto;
};

export const GetUserByPhoneResponseStruct = (): T.Describe<GetUserByPhoneResponse> => (T.type({
    result: ProfileDtoStruct(),
}) as unknown as T.Describe<GetUserByPhoneResponse>);

export type ListProfileNameByIdsResponse = {
    result: EmployeeInfoDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListProfileNameByIdsResponseStruct = (): T.Describe<ListProfileNameByIdsResponse> => (T.type({
    result: T.array(EmployeeInfoDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProfileNameByIdsResponse>);

export type ListProfileByUserNameResponse = {
    result: ProfileNameDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListProfileByUserNameResponseStruct = (): T.Describe<ListProfileByUserNameResponse> => (T.type({
    result: T.array(ProfileNameDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProfileByUserNameResponse>);

export type PatchProfileInfoResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchProfileInfoResponseStruct = (): T.Describe<PatchProfileInfoResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchProfileInfoResponse>);

export type PatchContextInfoResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchContextInfoResponseStruct = (): T.Describe<PatchContextInfoResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchContextInfoResponse>);

export type GetProfileModesResponse = {
    result: ProfileModeDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetProfileModesResponseStruct = (): T.Describe<GetProfileModesResponse> => (T.type({
    result: T.array(ProfileModeDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetProfileModesResponse>);

export type GetProfileModeResponse = {
    result: ProfileModeDto;
};

export const GetProfileModeResponseStruct = (): T.Describe<GetProfileModeResponse> => (T.type({
    result: ProfileModeDtoStruct(),
}) as unknown as T.Describe<GetProfileModeResponse>);

export type GetReferralResponse = {
    result: ReferralDto;
};

export const GetReferralResponseStruct = (): T.Describe<GetReferralResponse> => (T.type({
    result: ReferralDtoStruct(),
}) as unknown as T.Describe<GetReferralResponse>);

export type GetUserReferralsResponse = {
    result: ReferralDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetUserReferralsResponseStruct = (): T.Describe<GetUserReferralsResponse> => (T.type({
    result: T.array(ReferralDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetUserReferralsResponse>);

export type CreateReferralResponse = {
    validation?: ReferralValidation;
    result: ReferralDto;
};

export const CreateReferralResponseStruct = (): T.Describe<CreateReferralResponse> => (T.type({
    validation: tSpecialOptional(ReferralValidationStruct()),
    result: ReferralDtoStruct(),
}) as unknown as T.Describe<CreateReferralResponse>);

export type BaseReferralOperationResult = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const BaseReferralOperationResultStruct = (): T.Describe<BaseReferralOperationResult> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<BaseReferralOperationResult>);

export type InviteUserResponse = {
    isSuccess?: boolean;
};

export const InviteUserResponseStruct = (): T.Describe<InviteUserResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<InviteUserResponse>);

export type CreateTaskResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateTaskResponseStruct = (): T.Describe<CreateTaskResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateTaskResponse>);

export type ListTaskResponse = {
    result: TaskDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListTaskResponseStruct = (): T.Describe<ListTaskResponse> => (T.type({
    result: T.array(TaskDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListTaskResponse>);

export type ListTaskByProjectIdResponse = {
    result: TaskDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListTaskByProjectIdResponseStruct = (): T.Describe<ListTaskByProjectIdResponse> => (T.type({
    result: T.array(TaskDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListTaskByProjectIdResponse>);

export type ListTaskByUserIdResponse = {
    result: TaskDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListTaskByUserIdResponseStruct = (): T.Describe<ListTaskByUserIdResponse> => (T.type({
    result: T.array(TaskDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListTaskByUserIdResponse>);

export type GetTaskResponse = {
    result: TaskDto;
};

export const GetTaskResponseStruct = (): T.Describe<GetTaskResponse> => (T.type({
    result: TaskDtoStruct(),
}) as unknown as T.Describe<GetTaskResponse>);

export type DeleteTaskResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteTaskResponseStruct = (): T.Describe<DeleteTaskResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteTaskResponse>);

export type UpdateTaskResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateTaskResponseStruct = (): T.Describe<UpdateTaskResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateTaskResponse>);

export type ListUserManagementProfilesResponse = {
    result: UserManagementProfileDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListUserManagementProfilesResponseStruct = (): T.Describe<ListUserManagementProfilesResponse> => (T.type({
    result: T.array(UserManagementProfileDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListUserManagementProfilesResponse>);

export type GetUserManagementProfileByIdResponse = {
    result: UserManagementProfileDto;
};

export const GetUserManagementProfileByIdResponseStruct = (): T.Describe<GetUserManagementProfileByIdResponse> => (T.type({
    result: UserManagementProfileDtoStruct(),
}) as unknown as T.Describe<GetUserManagementProfileByIdResponse>);

export type GetUserManagementCompanyCountResponse = {
    result: number;
};

export const GetUserManagementCompanyCountResponseStruct = (): T.Describe<GetUserManagementCompanyCountResponse> => (T.type({
    result: T.number(),
}) as unknown as T.Describe<GetUserManagementCompanyCountResponse>);

export type ListCompanyInvitationByUserQuery = undefined;

export const ListCompanyInvitationByUserQueryStruct = () => T.literal(undefined);

export type DecideInvitationCommand = {
    accept?: boolean;
    companyId?: number;
};

export const DecideInvitationCommandStruct = (): T.Describe<DecideInvitationCommand> => (T.type({
    accept: tSpecialOptional(T.boolean()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<DecideInvitationCommand>);

export type InvitePartnerAsOwnerCommand = {
    companyId?: number;
    userId?: number;
};

export const InvitePartnerAsOwnerCommandStruct = (): T.Describe<InvitePartnerAsOwnerCommand> => (T.type({
    companyId: tSpecialOptional(T.number()),
    userId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<InvitePartnerAsOwnerCommand>);

export type ListCompanyInvitationByCompanyIdQuery = {
    companyId?: number;
};

export const ListCompanyInvitationByCompanyIdQueryStruct = (): T.Describe<ListCompanyInvitationByCompanyIdQuery> => (T.type({
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyInvitationByCompanyIdQuery>);

export type ListContextEmailsQuery = {
    contextsData?: ContextDataDto[];
};

export const ListContextEmailsQueryStruct = (): T.Describe<ListContextEmailsQuery> => (T.type({
    contextsData: tSpecialOptional(T.array(ContextDataDtoStruct())),
}) as unknown as T.Describe<ListContextEmailsQuery>);

export type ListContextOwnerDetailsByIdsQuery = {
    companyIds?: number[];
};

export const ListContextOwnerDetailsByIdsQueryStruct = (): T.Describe<ListContextOwnerDetailsByIdsQuery> => (T.type({
    companyIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<ListContextOwnerDetailsByIdsQuery>);

export type CreateNoteCommand = {
    userId?: number;
    constructionProjectId?: number;
    companyId?: number;
    noteContent?: string;
};

export const CreateNoteCommandStruct = (): T.Describe<CreateNoteCommand> => (T.type({
    userId: tSpecialOptional(T.number()),
    constructionProjectId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    noteContent: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateNoteCommand>);

export type ListNoteQuery = {
    page?: number;
    pageSize?: number;
};

export const ListNoteQueryStruct = (): T.Describe<ListNoteQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNoteQuery>);

export type ListNoteByProjectIdQuery = {
    constructionProjectId: number;
    page?: number;
    pageSize?: number;
};

export const ListNoteByProjectIdQueryStruct = (): T.Describe<ListNoteByProjectIdQuery> => (T.type({
    constructionProjectId: T.number(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNoteByProjectIdQuery>);

export type ListNoteByUserIdQuery = {
    userId: number;
    page?: number;
    pageSize?: number;
};

export const ListNoteByUserIdQueryStruct = (): T.Describe<ListNoteByUserIdQuery> => (T.type({
    userId: T.number(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNoteByUserIdQuery>);

export type GetNoteQuery = {
    id: number;
};

export const GetNoteQueryStruct = (): T.Describe<GetNoteQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetNoteQuery>);

export type DeleteNoteCommand = {
    id: number;
};

export const DeleteNoteCommandStruct = (): T.Describe<DeleteNoteCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteNoteCommand>);

export type UpdateNoteCommand = {
    id: number;
    userId?: number;
    companyId?: number;
    constructionProjectId?: number;
    noteContent: string;
};

export const UpdateNoteCommandStruct = (): T.Describe<UpdateNoteCommand> => (T.type({
    id: T.number(),
    userId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    constructionProjectId: tSpecialOptional(T.number()),
    noteContent: T.string(),
}) as unknown as T.Describe<UpdateNoteCommand>);

export type ListNotesAndTasksQuery = {
    noteTaskAffilation?: NoteTaskAffilationType;
    id: number;
    page?: number;
    pageSize?: number;
};

export const ListNotesAndTasksQueryStruct = (): T.Describe<ListNotesAndTasksQuery> => (T.type({
    noteTaskAffilation: tSpecialOptional(NoteTaskAffilationTypeStruct()),
    id: T.number(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNotesAndTasksQuery>);

export type CreateContextCommand = {
    userId?: string;
    companyId?: number;
    name?: string;
    contextIcon?: string;
    type?: ContextType;
    affiliationType?: AffiliationType;
    ownerPhone?: string;
    ownerEmail?: string;
    ownerName?: string;
    createResponse: unknown;
};

export const CreateContextCommandStruct = (): T.Describe<CreateContextCommand> => (T.type({
    userId: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    name: tSpecialOptional(T.string()),
    contextIcon: tSpecialOptional(T.string()),
    type: tSpecialOptional(ContextTypeStruct()),
    affiliationType: tSpecialOptional(AffiliationTypeStruct()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
    ownerName: tSpecialOptional(T.string()),
    createResponse: T.unknown(),
}) as unknown as T.Describe<CreateContextCommand>);

export type CreateCompanyAffiliationCommand = {
    phone?: string;
    companyId?: number;
    affiliationType?: AffiliationType;
};

export const CreateCompanyAffiliationCommandStruct = (): T.Describe<CreateCompanyAffiliationCommand> => (T.type({
    phone: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    affiliationType: tSpecialOptional(AffiliationTypeStruct()),
}) as unknown as T.Describe<CreateCompanyAffiliationCommand>);

export type DeleteCompanyAffiliationCommand = {
    phone?: string;
    companyId?: number;
    createResponse: unknown;
};

export const DeleteCompanyAffiliationCommandStruct = (): T.Describe<DeleteCompanyAffiliationCommand> => (T.type({
    phone: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    createResponse: T.unknown(),
}) as unknown as T.Describe<DeleteCompanyAffiliationCommand>);

export type DeleteProfileCommand = {
    id: number;
};

export const DeleteProfileCommandStruct = (): T.Describe<DeleteProfileCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteProfileCommand>);

export type DeleteContextCommand = {
    id: number;
};

export const DeleteContextCommandStruct = (): T.Describe<DeleteContextCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContextCommand>);

export type GetUsersContextIdsQuery = {
    profileIds?: number[];
};

export const GetUsersContextIdsQueryStruct = (): T.Describe<GetUsersContextIdsQuery> => (T.type({
    profileIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<GetUsersContextIdsQuery>);

export type GetProfileQuery = undefined;

export const GetProfileQueryStruct = () => T.literal(undefined);

export type GetUserContextQuery = {
    userId?: number;
};

export const GetUserContextQueryStruct = (): T.Describe<GetUserContextQuery> => (T.type({
    userId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetUserContextQuery>);

export type GetAvatarIdQuery = {
    id: number;
    isCompany?: boolean;
};

export const GetAvatarIdQueryStruct = (): T.Describe<GetAvatarIdQuery> => (T.type({
    id: T.number(),
    isCompany: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GetAvatarIdQuery>);

export type GetContactInformationByIdQuery = {
    profileId?: number;
};

export const GetContactInformationByIdQueryStruct = (): T.Describe<GetContactInformationByIdQuery> => (T.type({
    profileId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetContactInformationByIdQuery>);

export type GetCompanyManagementEmployeeCountQuery = {
    companyId?: number;
};

export const GetCompanyManagementEmployeeCountQueryStruct = (): T.Describe<GetCompanyManagementEmployeeCountQuery> => (T.type({
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetCompanyManagementEmployeeCountQuery>);

export type ListEmployeeInfoByCompanyIdQuery = {
    companyId?: number;
};

export const ListEmployeeInfoByCompanyIdQueryStruct = (): T.Describe<ListEmployeeInfoByCompanyIdQuery> => (T.type({
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListEmployeeInfoByCompanyIdQuery>);

export type GetUserInfoByIdQuery = {
    profileId?: number;
};

export const GetUserInfoByIdQueryStruct = (): T.Describe<GetUserInfoByIdQuery> => (T.type({
    profileId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetUserInfoByIdQuery>);

export type GetProfileByPhoneQuery = {
    phone?: string;
};

export const GetProfileByPhoneQueryStruct = (): T.Describe<GetProfileByPhoneQuery> => (T.type({
    phone: tSpecialOptional(T.string()),
}) as unknown as T.Describe<GetProfileByPhoneQuery>);

export type GetUserByPhoneQuery = {
    userPhone?: string;
};

export const GetUserByPhoneQueryStruct = (): T.Describe<GetUserByPhoneQuery> => (T.type({
    userPhone: tSpecialOptional(T.string()),
}) as unknown as T.Describe<GetUserByPhoneQuery>);

export type ListProfileNameByIdsQuery = {
    idCollection?: number[];
};

export const ListProfileNameByIdsQueryStruct = (): T.Describe<ListProfileNameByIdsQuery> => (T.type({
    idCollection: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<ListProfileNameByIdsQuery>);

export type ListProfileByUserNameQuery = {
    userName?: string;
    page?: number;
    pageSize?: number;
};

export const ListProfileByUserNameQueryStruct = (): T.Describe<ListProfileByUserNameQuery> => (T.type({
    userName: tSpecialOptional(T.string()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProfileByUserNameQuery>);

export type PatchProfileInfoCommand = {
    name?: string;
    email?: string;
    profilePicture?: string;
};

export const PatchProfileInfoCommandStruct = (): T.Describe<PatchProfileInfoCommand> => (T.type({
    name: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    profilePicture: tSpecialOptional(T.string()),
}) as unknown as T.Describe<PatchProfileInfoCommand>);

export type PatchDefaultContextCommand = {
    defaultContextId?: number;
};

export const PatchDefaultContextCommandStruct = (): T.Describe<PatchDefaultContextCommand> => (T.type({
    defaultContextId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<PatchDefaultContextCommand>);

export type PatchContextInfoCommand = {
    companyId: number;
    name?: string;
    contextIcon?: string;
    ownerPhone?: string;
    ownerEmail?: string;
    ownerName?: string;
};

export const PatchContextInfoCommandStruct = (): T.Describe<PatchContextInfoCommand> => (T.type({
    companyId: T.number(),
    name: tSpecialOptional(T.string()),
    contextIcon: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
    ownerName: tSpecialOptional(T.string()),
}) as unknown as T.Describe<PatchContextInfoCommand>);

export type GetProfileModesQuery = undefined;

export const GetProfileModesQueryStruct = () => T.literal(undefined);

export type GetProfileModeQuery = {
    profileModeId?: number;
};

export const GetProfileModeQueryStruct = (): T.Describe<GetProfileModeQuery> => (T.type({
    profileModeId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetProfileModeQuery>);

export type GetProfileModeByTypeQuery = {
    profileModeType?: SpecialProfileMode;
};

export const GetProfileModeByTypeQueryStruct = (): T.Describe<GetProfileModeByTypeQuery> => (T.type({
    profileModeType: tSpecialOptional(SpecialProfileModeStruct()),
}) as unknown as T.Describe<GetProfileModeByTypeQuery>);

export type ConsumeProfileModeCommand = {
    profileModeId?: number;
    profileId?: number;
    companyId?: number;
    mode?: SpecialProfileMode;
};

export const ConsumeProfileModeCommandStruct = (): T.Describe<ConsumeProfileModeCommand> => (T.type({
    profileModeId: tSpecialOptional(T.number()),
    profileId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    mode: tSpecialOptional(SpecialProfileModeStruct()),
}) as unknown as T.Describe<ConsumeProfileModeCommand>);

export type RejectProjectInvitationCommand = {
    projectId?: number;
    mode?: SpecialProfileMode;
    rejectAll?: boolean;
};

export const RejectProjectInvitationCommandStruct = (): T.Describe<RejectProjectInvitationCommand> => (T.type({
    projectId: tSpecialOptional(T.number()),
    mode: tSpecialOptional(SpecialProfileModeStruct()),
    rejectAll: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<RejectProjectInvitationCommand>);

export type GetReferralQuery = {
    referralCode?: string;
};

export const GetReferralQueryStruct = (): T.Describe<GetReferralQuery> => (T.type({
    referralCode: tSpecialOptional(T.string()),
}) as unknown as T.Describe<GetReferralQuery>);

export type GetUserReferralsQuery = undefined;

export const GetUserReferralsQueryStruct = () => T.literal(undefined);

export type CreateReferralCommand = {
    referralType?: ReferralType;
    referralPhoneNumber?: string;
    referralEmail?: string;
    singleUse?: boolean;
    projectId?: number;
    projectName?: string;
};

export const CreateReferralCommandStruct = (): T.Describe<CreateReferralCommand> => (T.type({
    referralType: tSpecialOptional(ReferralTypeStruct()),
    referralPhoneNumber: tSpecialOptional(T.string()),
    referralEmail: tSpecialOptional(T.string()),
    singleUse: tSpecialOptional(T.boolean()),
    projectId: tSpecialOptional(T.number()),
    projectName: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateReferralCommand>);

export type DeleteReferralCommand = {
    referralId?: number;
};

export const DeleteReferralCommandStruct = (): T.Describe<DeleteReferralCommand> => (T.type({
    referralId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<DeleteReferralCommand>);

export type InviteUserCommand = {
    name?: string;
    phone?: string;
    email?: string;
};

export const InviteUserCommandStruct = (): T.Describe<InviteUserCommand> => (T.type({
    name: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
}) as unknown as T.Describe<InviteUserCommand>);

export type CreateTaskCommand = {
    userId?: number;
    constructionProjectId?: number;
    companyId?: number;
    taskContent?: string;
    taskCategory?: TaskCategory;
    finishDate?: string;
    isCompleted?: boolean;
    completedDate?: string;
};

export const CreateTaskCommandStruct = (): T.Describe<CreateTaskCommand> => (T.type({
    userId: tSpecialOptional(T.number()),
    constructionProjectId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    taskContent: tSpecialOptional(T.string()),
    taskCategory: tSpecialOptional(TaskCategoryStruct()),
    finishDate: tSpecialOptional(T.string()),
    isCompleted: tSpecialOptional(T.boolean()),
    completedDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateTaskCommand>);

export type ListTaskQuery = {
    page?: number;
    pageSize?: number;
};

export const ListTaskQueryStruct = (): T.Describe<ListTaskQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListTaskQuery>);

export type ListTaskByProjectIdQuery = {
    constructionProjectId: number;
    page?: number;
    pageSize?: number;
};

export const ListTaskByProjectIdQueryStruct = (): T.Describe<ListTaskByProjectIdQuery> => (T.type({
    constructionProjectId: T.number(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListTaskByProjectIdQuery>);

export type ListTaskByUserIdQuery = {
    userId: number;
    page?: number;
    pageSize?: number;
};

export const ListTaskByUserIdQueryStruct = (): T.Describe<ListTaskByUserIdQuery> => (T.type({
    userId: T.number(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListTaskByUserIdQuery>);

export type GetTaskQuery = {
    id: number;
};

export const GetTaskQueryStruct = (): T.Describe<GetTaskQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetTaskQuery>);

export type DeleteTaskCommand = {
    id: number;
};

export const DeleteTaskCommandStruct = (): T.Describe<DeleteTaskCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteTaskCommand>);

export type UpdateTaskCommand = {
    id: number;
    userId?: number;
    companyId?: number;
    constructionProjectId?: number;
    taskContent: string;
    taskCategory: TaskCategory;
    finishDate: string;
    isCompleted?: boolean;
    completedDate?: string;
};

export const UpdateTaskCommandStruct = (): T.Describe<UpdateTaskCommand> => (T.type({
    id: T.number(),
    userId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    constructionProjectId: tSpecialOptional(T.number()),
    taskContent: T.string(),
    taskCategory: TaskCategoryStruct(),
    finishDate: T.string(),
    isCompleted: tSpecialOptional(T.boolean()),
    completedDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateTaskCommand>);

export type ListUserManagementProfilesQuery = {
    sortRules?: UserManagementProfilesSort;
    userIds?: number[];
    userName?: string;
    phoneNumber?: string;
    page?: number;
    pageSize?: number;
};

export const ListUserManagementProfilesQueryStruct = (): T.Describe<ListUserManagementProfilesQuery> => (T.type({
    sortRules: tSpecialOptional(UserManagementProfilesSortStruct()),
    userIds: tSpecialOptional(T.array(T.number())),
    userName: tSpecialOptional(T.string()),
    phoneNumber: tSpecialOptional(T.string()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListUserManagementProfilesQuery>);

export type GetUserManagementProfileByIdQuery = {
    profileId?: number;
};

export const GetUserManagementProfileByIdQueryStruct = (): T.Describe<GetUserManagementProfileByIdQuery> => (T.type({
    profileId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetUserManagementProfileByIdQuery>);

export type GetUserManagementCompanyCountQuery = {
    profileId?: number;
};

export const GetUserManagementCompanyCountQueryStruct = (): T.Describe<GetUserManagementCompanyCountQuery> => (T.type({
    profileId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetUserManagementCompanyCountQuery>);

export enum ContextType {
    none = 0,
    client = 1,
    contractor = 2,
    consultant = 3,
    supplier = 4,
    admin = 5,
}

export const ContextTypeStruct = () => T.enums([
    ContextType.none,
    ContextType.client,
    ContextType.contractor,
    ContextType.consultant,
    ContextType.supplier,
    ContextType.admin,
]);

export enum NoteTaskAffilationType {
    none = 0,
    user = 1,
    company = 2,
    project = 3,
}

export const NoteTaskAffilationTypeStruct = () => T.enums([
    NoteTaskAffilationType.none,
    NoteTaskAffilationType.user,
    NoteTaskAffilationType.company,
    NoteTaskAffilationType.project,
]);

export enum AffiliationType {
    none = 0,
    partner = 1,
    engineer = 2,
    supervisor = 3,
    owner = 4,
    architect = 5,
}

export const AffiliationTypeStruct = () => T.enums([
    AffiliationType.none,
    AffiliationType.partner,
    AffiliationType.engineer,
    AffiliationType.supervisor,
    AffiliationType.owner,
    AffiliationType.architect,
]);

export enum SpecialProfileMode {
    none = 0,
    simpleContractorCreation = 1,
    simpleConsultantCreation = 2,
}

export const SpecialProfileModeStruct = () => T.enums([
    SpecialProfileMode.none,
    SpecialProfileMode.simpleContractorCreation,
    SpecialProfileMode.simpleConsultantCreation,
]);

export enum ReferralType {
    none = 0,
    contractorProjectInvitation = 1,
    consultantProjectInvitation = 2,
}

export const ReferralTypeStruct = () => T.enums([
    ReferralType.none,
    ReferralType.contractorProjectInvitation,
    ReferralType.consultantProjectInvitation,
]);

export enum TaskCategory {
    none = 0,
    followUpTask = 1,
    callContractor = 2,
    visitSite = 3,
    reviewProject = 4,
}

export const TaskCategoryStruct = () => T.enums([
    TaskCategory.none,
    TaskCategory.followUpTask,
    TaskCategory.callContractor,
    TaskCategory.visitSite,
    TaskCategory.reviewProject,
]);

export enum NoteTaskType {
    none = 0,
    task = 1,
    note = 2,
}

export const NoteTaskTypeStruct = () => T.enums([
    NoteTaskType.none,
    NoteTaskType.task,
    NoteTaskType.note,
]);

export const execListCompanyInvitationByUserQuery = restClient.encloseQuery<ListCompanyInvitationByUserQuery, ListCompanyInvitationByUserResponse>(
  props => T.create(props, ListCompanyInvitationByUserQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listcompanyinvitationbyuserquery',
    props,
  );
 },
 result => T.create(result, ListCompanyInvitationByUserResponseStruct()),
);

export const execDecideInvitationCommand = restClient.encloseQuery<DecideInvitationCommand, DecideInvitationResponse>(
  props => T.create(props, DecideInvitationCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/profile/decideinvitationcommand',
    props,
  );
 },
 result => T.create(result, DecideInvitationResponseStruct()),
);

export const execInvitePartnerAsOwnerCommand = restClient.encloseQuery<InvitePartnerAsOwnerCommand, InvitePartnerAsOwnerResponse>(
  props => T.create(props, InvitePartnerAsOwnerCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/profile/invitepartnerasownercommand',
    props,
  );
 },
 result => T.create(result, InvitePartnerAsOwnerResponseStruct()),
);

export const execListCompanyInvitationByCompanyIdQuery = restClient.encloseQuery<ListCompanyInvitationByCompanyIdQuery, ListCompanyInvitationByCompanyIdResponse>(
  props => T.create(props, ListCompanyInvitationByCompanyIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listcompanyinvitationbycompanyidquery',
    props,
  );
 },
 result => T.create(result, ListCompanyInvitationByCompanyIdResponseStruct()),
);

export const execListContextEmailsQuery = restClient.encloseQuery<ListContextEmailsQuery, ListContextEmailsResponse>(
  props => T.create(props, ListContextEmailsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listcontextemailsquery',
    props,
  );
 },
 result => T.create(result, ListContextEmailsResponseStruct()),
);

export const execListContextOwnerDetailsByIdsQuery = restClient.encloseQuery<ListContextOwnerDetailsByIdsQuery, ListContextOwnerDetailsByIdsResponse>(
  props => T.create(props, ListContextOwnerDetailsByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listcontextownerdetailsbyidsquery',
    props,
  );
 },
 result => T.create(result, ListContextOwnerDetailsByIdsResponseStruct()),
);

export const execCreateNoteCommand = restClient.encloseQuery<CreateNoteCommand, CreateNoteResponse>(
  props => T.create(props, CreateNoteCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/profile/createnotecommand',
    props,
  );
 },
 result => T.create(result, CreateNoteResponseStruct()),
);

export const execListNoteQuery = restClient.encloseQuery<ListNoteQuery, ListNoteResponse>(
  props => T.create(props, ListNoteQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listnotequery',
    props,
  );
 },
 result => T.create(result, ListNoteResponseStruct()),
);

export const execListNoteByProjectIdQuery = restClient.encloseQuery<ListNoteByProjectIdQuery, ListNoteByProjectIdResponse>(
  props => T.create(props, ListNoteByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listnotebyprojectidquery/{constructionprojectid}',
    props,
  );
 },
 result => T.create(result, ListNoteByProjectIdResponseStruct()),
);

export const execListNoteByUserIdQuery = restClient.encloseQuery<ListNoteByUserIdQuery, ListNoteByUserIdResponse>(
  props => T.create(props, ListNoteByUserIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listnotebyuseridquery/{userid}',
    props,
  );
 },
 result => T.create(result, ListNoteByUserIdResponseStruct()),
);

export const execGetNoteQuery = restClient.encloseQuery<GetNoteQuery, GetNoteResponse>(
  props => T.create(props, GetNoteQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getnotequery/{id}',
    props,
  );
 },
 result => T.create(result, GetNoteResponseStruct()),
);

export const execDeleteNoteCommand = restClient.encloseQuery<DeleteNoteCommand, DeleteNoteResponse>(
  props => T.create(props, DeleteNoteCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/profile/deletenotecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteNoteResponseStruct()),
);

export const execUpdateNoteCommand = restClient.encloseQuery<UpdateNoteCommand, UpdateNoteResponse>(
  props => T.create(props, UpdateNoteCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/profile/updatenotecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateNoteResponseStruct()),
);

export const execListNotesAndTasksQuery = restClient.encloseQuery<ListNotesAndTasksQuery, ListNotesAndTasksResponse>(
  props => T.create(props, ListNotesAndTasksQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listnotesandtasksquery/{id}',
    props,
  );
 },
 result => T.create(result, ListNotesAndTasksResponseStruct()),
);

export const execCreateContextCommand = restClient.encloseQuery<CreateContextCommand, void>(
  props => T.create(props, CreateContextCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/profile/createcontextcommand',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execCreateCompanyAffiliationCommand = restClient.encloseQuery<CreateCompanyAffiliationCommand, CreateCompanyAffiliationResponse>(
  props => T.create(props, CreateCompanyAffiliationCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/profile/createcompanyaffiliationcommand',
    props,
  );
 },
 result => T.create(result, CreateCompanyAffiliationResponseStruct()),
);

export const execDeleteCompanyAffiliationCommand = restClient.encloseQuery<DeleteCompanyAffiliationCommand, void>(
  props => T.create(props, DeleteCompanyAffiliationCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/profile/deletecompanyaffiliationcommand',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execDeleteProfileCommand = restClient.encloseQuery<DeleteProfileCommand, DeleteProfileCommandResponse>(
  props => T.create(props, DeleteProfileCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/profile/deleteprofilecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteProfileCommandResponseStruct()),
);

export const execDeleteContextCommand = restClient.encloseQuery<DeleteContextCommand, DeleteContextCommandResponse>(
  props => T.create(props, DeleteContextCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/profile/deletecontextcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContextCommandResponseStruct()),
);

export const execGetUsersContextIdsQuery = restClient.encloseQuery<GetUsersContextIdsQuery, GetUsersContextIdsResponse>(
  props => T.create(props, GetUsersContextIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getuserscontextidsquery',
    props,
  );
 },
 result => T.create(result, GetUsersContextIdsResponseStruct()),
);

export const execGetProfileQuery = restClient.encloseQuery<GetProfileQuery, GetProfileResponse>(
  props => T.create(props, GetProfileQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getprofilequery',
    props,
  );
 },
 result => T.create(result, GetProfileResponseStruct()),
);

export const execGetUserContextQuery = restClient.encloseQuery<GetUserContextQuery, GetUserContextResponse>(
  props => T.create(props, GetUserContextQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getusercontextquery',
    props,
  );
 },
 result => T.create(result, GetUserContextResponseStruct()),
);

export const execGetAvatarIdQuery = restClient.encloseQuery<GetAvatarIdQuery, GetAvatarIdResponse>(
  props => T.create(props, GetAvatarIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getavataridquery/{id}',
    props,
  );
 },
 result => T.create(result, GetAvatarIdResponseStruct()),
);

export const execGetContactInformationByIdQuery = restClient.encloseQuery<GetContactInformationByIdQuery, GetContactInformationByIdResponse>(
  props => T.create(props, GetContactInformationByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getcontactinformationbyidquery',
    props,
  );
 },
 result => T.create(result, GetContactInformationByIdResponseStruct()),
);

export const execGetCompanyManagementEmployeeCountQuery = restClient.encloseQuery<GetCompanyManagementEmployeeCountQuery, GetCompanyManagementEmployeeCountResponse>(
  props => T.create(props, GetCompanyManagementEmployeeCountQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getcompanymanagementemployeecountquery',
    props,
  );
 },
 result => T.create(result, GetCompanyManagementEmployeeCountResponseStruct()),
);

export const execListEmployeeInfoByCompanyIdQuery = restClient.encloseQuery<ListEmployeeInfoByCompanyIdQuery, ListEmployeeInfoByCompanyIdResponse>(
  props => T.create(props, ListEmployeeInfoByCompanyIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listemployeeinfobycompanyidquery',
    props,
  );
 },
 result => T.create(result, ListEmployeeInfoByCompanyIdResponseStruct()),
);

export const execGetUserInfoByIdQuery = restClient.encloseQuery<GetUserInfoByIdQuery, UserInfoByIdResponse>(
  props => T.create(props, GetUserInfoByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getuserinfobyidquery',
    props,
  );
 },
 result => T.create(result, UserInfoByIdResponseStruct()),
);

export const execGetProfileByPhoneQuery = restClient.encloseQuery<GetProfileByPhoneQuery, GetProfileResponse>(
  props => T.create(props, GetProfileByPhoneQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getprofilebyphonequery',
    props,
  );
 },
 result => T.create(result, GetProfileResponseStruct()),
);

export const execGetUserByPhoneQuery = restClient.encloseQuery<GetUserByPhoneQuery, GetUserByPhoneResponse>(
  props => T.create(props, GetUserByPhoneQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getuserbyphonequery',
    props,
  );
 },
 result => T.create(result, GetUserByPhoneResponseStruct()),
);

export const execListProfileNameByIdsQuery = restClient.encloseQuery<ListProfileNameByIdsQuery, ListProfileNameByIdsResponse>(
  props => T.create(props, ListProfileNameByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listprofilenamebyidsquery',
    props,
  );
 },
 result => T.create(result, ListProfileNameByIdsResponseStruct()),
);

export const execListProfileByUserNameQuery = restClient.encloseQuery<ListProfileByUserNameQuery, ListProfileByUserNameResponse>(
  props => T.create(props, ListProfileByUserNameQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listprofilebyusernamequery',
    props,
  );
 },
 result => T.create(result, ListProfileByUserNameResponseStruct()),
);

export const execPatchProfileInfoCommand = restClient.encloseQuery<PatchProfileInfoCommand, PatchProfileInfoResponse>(
  props => T.create(props, PatchProfileInfoCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/profile/patchprofileinfocommand',
    props,
  );
 },
 result => T.create(result, PatchProfileInfoResponseStruct()),
);

export const execPatchDefaultContextCommand = restClient.encloseQuery<PatchDefaultContextCommand, PatchProfileInfoResponse>(
  props => T.create(props, PatchDefaultContextCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/profile/patchdefaultcontextcommand',
    props,
  );
 },
 result => T.create(result, PatchProfileInfoResponseStruct()),
);

export const execPatchContextInfoCommand = restClient.encloseQuery<PatchContextInfoCommand, PatchContextInfoResponse>(
  props => T.create(props, PatchContextInfoCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/profile/patchcontextinfocommand',
    props,
  );
 },
 result => T.create(result, PatchContextInfoResponseStruct()),
);

export const execGetProfileModesQuery = restClient.encloseQuery<GetProfileModesQuery, GetProfileModesResponse>(
  props => T.create(props, GetProfileModesQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getprofilemodesquery',
    props,
  );
 },
 result => T.create(result, GetProfileModesResponseStruct()),
);

export const execGetProfileModeQuery = restClient.encloseQuery<GetProfileModeQuery, GetProfileModeResponse>(
  props => T.create(props, GetProfileModeQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getprofilemodequery',
    props,
  );
 },
 result => T.create(result, GetProfileModeResponseStruct()),
);

export const execGetProfileModeByTypeQuery = restClient.encloseQuery<GetProfileModeByTypeQuery, GetProfileModeResponse>(
  props => T.create(props, GetProfileModeByTypeQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getprofilemodebytypequery',
    props,
  );
 },
 result => T.create(result, GetProfileModeResponseStruct()),
);

export const execConsumeProfileModeCommand = restClient.encloseQuery<ConsumeProfileModeCommand, DeleteOperationResult>(
  props => T.create(props, ConsumeProfileModeCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/profile/consumeprofilemodecommand',
    props,
  );
 },
 result => T.create(result, DeleteOperationResultStruct()),
);

export const execRejectProjectInvitationCommand = restClient.encloseQuery<RejectProjectInvitationCommand, DeleteOperationResult>(
  props => T.create(props, RejectProjectInvitationCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/profile/rejectprojectinvitationcommand',
    props,
  );
 },
 result => T.create(result, DeleteOperationResultStruct()),
);

export const execGetReferralQuery = restClient.encloseQuery<GetReferralQuery, GetReferralResponse>(
  props => T.create(props, GetReferralQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getreferralquery',
    props,
  );
 },
 result => T.create(result, GetReferralResponseStruct()),
);

export const execGetUserReferralsQuery = restClient.encloseQuery<GetUserReferralsQuery, GetUserReferralsResponse>(
  props => T.create(props, GetUserReferralsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getuserreferralsquery',
    props,
  );
 },
 result => T.create(result, GetUserReferralsResponseStruct()),
);

export const execCreateReferralCommand = restClient.encloseQuery<CreateReferralCommand, CreateReferralResponse>(
  props => T.create(props, CreateReferralCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/profile/createreferralcommand',
    props,
  );
 },
 result => T.create(result, CreateReferralResponseStruct()),
);

export const execDeleteReferralCommand = restClient.encloseQuery<DeleteReferralCommand, BaseReferralOperationResult>(
  props => T.create(props, DeleteReferralCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/profile/deletereferralcommand',
    props,
  );
 },
 result => T.create(result, BaseReferralOperationResultStruct()),
);

export const execInviteUserCommand = restClient.encloseQuery<InviteUserCommand, InviteUserResponse>(
  props => T.create(props, InviteUserCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/profile/inviteusercommand',
    props,
  );
 },
 result => T.create(result, InviteUserResponseStruct()),
);

export const execCreateTaskCommand = restClient.encloseQuery<CreateTaskCommand, CreateTaskResponse>(
  props => T.create(props, CreateTaskCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/profile/createtaskcommand',
    props,
  );
 },
 result => T.create(result, CreateTaskResponseStruct()),
);

export const execListTaskQuery = restClient.encloseQuery<ListTaskQuery, ListTaskResponse>(
  props => T.create(props, ListTaskQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listtaskquery',
    props,
  );
 },
 result => T.create(result, ListTaskResponseStruct()),
);

export const execListTaskByProjectIdQuery = restClient.encloseQuery<ListTaskByProjectIdQuery, ListTaskByProjectIdResponse>(
  props => T.create(props, ListTaskByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listtaskbyprojectidquery/{constructionprojectid}',
    props,
  );
 },
 result => T.create(result, ListTaskByProjectIdResponseStruct()),
);

export const execListTaskByUserIdQuery = restClient.encloseQuery<ListTaskByUserIdQuery, ListTaskByUserIdResponse>(
  props => T.create(props, ListTaskByUserIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/listtaskbyuseridquery/{userid}',
    props,
  );
 },
 result => T.create(result, ListTaskByUserIdResponseStruct()),
);

export const execGetTaskQuery = restClient.encloseQuery<GetTaskQuery, GetTaskResponse>(
  props => T.create(props, GetTaskQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/gettaskquery/{id}',
    props,
  );
 },
 result => T.create(result, GetTaskResponseStruct()),
);

export const execDeleteTaskCommand = restClient.encloseQuery<DeleteTaskCommand, DeleteTaskResponse>(
  props => T.create(props, DeleteTaskCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/profile/deletetaskcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteTaskResponseStruct()),
);

export const execUpdateTaskCommand = restClient.encloseQuery<UpdateTaskCommand, UpdateTaskResponse>(
  props => T.create(props, UpdateTaskCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/profile/updatetaskcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateTaskResponseStruct()),
);

export const execListUserManagementProfilesQuery = restClient.encloseQuery<ListUserManagementProfilesQuery, ListUserManagementProfilesResponse>(
  props => T.create(props, ListUserManagementProfilesQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/profile/listusermanagementprofilesquery',
    props,
  );
 },
 result => T.create(result, ListUserManagementProfilesResponseStruct()),
);

export const execGetUserManagementProfileByIdQuery = restClient.encloseQuery<GetUserManagementProfileByIdQuery, GetUserManagementProfileByIdResponse>(
  props => T.create(props, GetUserManagementProfileByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getusermanagementprofilebyidquery',
    props,
  );
 },
 result => T.create(result, GetUserManagementProfileByIdResponseStruct()),
);

export const execGetUserManagementCompanyCountQuery = restClient.encloseQuery<GetUserManagementCompanyCountQuery, GetUserManagementCompanyCountResponse>(
  props => T.create(props, GetUserManagementCompanyCountQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/profile/getusermanagementcompanycountquery',
    props,
  );
 },
 result => T.create(result, GetUserManagementCompanyCountResponseStruct()),
);
