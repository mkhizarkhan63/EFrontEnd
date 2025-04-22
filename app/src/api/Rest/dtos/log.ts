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

export type PmData = {
    expenseTitle?: string;
    stageName?: string;
    updateName?: string;
    sowItemName?: string;
    taskName?: string;
    workflowName?: string;
    language?: LogLanguage;
};

export const PmDataStruct = (): T.Describe<PmData> => (T.type({
    expenseTitle: tSpecialOptional(T.string()),
    stageName: tSpecialOptional(T.string()),
    updateName: tSpecialOptional(T.string()),
    sowItemName: tSpecialOptional(T.string()),
    taskName: tSpecialOptional(T.string()),
    workflowName: tSpecialOptional(T.string()),
    language: tSpecialOptional(LogLanguageStruct()),
}) as unknown as T.Describe<PmData>);

export type CompanyLogDto = {
    companyId?: number;
    issuerType?: ContextType;
    message: string;
    messageArabic?: string;
    userId?: number;
    logDate?: string;
};

export const CompanyLogDtoStruct = (): T.Describe<CompanyLogDto> => (T.type({
    companyId: tSpecialOptional(T.number()),
    issuerType: tSpecialOptional(ContextTypeStruct()),
    message: T.string(),
    messageArabic: tSpecialOptional(T.string()),
    userId: tSpecialOptional(T.number()),
    logDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CompanyLogDto>);

export type CompanyLastLogDateDto = {
    companyId?: number;
    logDate?: string;
};

export const CompanyLastLogDateDtoStruct = (): T.Describe<CompanyLastLogDateDto> => (T.type({
    companyId: tSpecialOptional(T.number()),
    logDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CompanyLastLogDateDto>);

export type PmLogDto = {
    actorType?: ActorType;
    message: string;
    messageArabic?: string;
    logDate?: string;
};

export const PmLogDtoStruct = (): T.Describe<PmLogDto> => (T.type({
    actorType: tSpecialOptional(ActorTypeStruct()),
    message: T.string(),
    messageArabic: tSpecialOptional(T.string()),
    logDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<PmLogDto>);

export type ProjectLogDto = {
    projectId?: number;
    message: string;
    messageArabic?: string;
    userId?: number;
    logDate?: string;
};

export const ProjectLogDtoStruct = (): T.Describe<ProjectLogDto> => (T.type({
    projectId: tSpecialOptional(T.number()),
    message: T.string(),
    messageArabic: tSpecialOptional(T.string()),
    userId: tSpecialOptional(T.number()),
    logDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ProjectLogDto>);

export type SystemLogDto = {
    message: string;
    messageArabic?: string;
    userId?: number;
    logDate?: string;
};

export const SystemLogDtoStruct = (): T.Describe<SystemLogDto> => (T.type({
    message: T.string(),
    messageArabic: tSpecialOptional(T.string()),
    userId: tSpecialOptional(T.number()),
    logDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<SystemLogDto>);

export type LastLogDateDto = {
    userId?: number;
    logDate?: string;
};

export const LastLogDateDtoStruct = (): T.Describe<LastLogDateDto> => (T.type({
    userId: tSpecialOptional(T.number()),
    logDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<LastLogDateDto>);

export type LogDto = {
    message?: string;
    logDate?: string;
    userId?: number;
    logType?: LogType;
    companyId?: number;
    issuerType?: ContextType;
    projectId?: number;
};

export const LogDtoStruct = (): T.Describe<LogDto> => (T.type({
    message: tSpecialOptional(T.string()),
    logDate: tSpecialOptional(T.string()),
    userId: tSpecialOptional(T.number()),
    logType: tSpecialOptional(LogTypeStruct()),
    companyId: tSpecialOptional(T.number()),
    issuerType: tSpecialOptional(ContextTypeStruct()),
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<LogDto>);

export type ListCompanyLogResponse = {
    result: CompanyLogDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyLogResponseStruct = (): T.Describe<ListCompanyLogResponse> => (T.type({
    result: T.array(CompanyLogDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyLogResponse>);

export type ListLatestCompaniesActivityDateResponse = {
    result: CompanyLastLogDateDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListLatestCompaniesActivityDateResponseStruct = (): T.Describe<ListLatestCompaniesActivityDateResponse> => (T.type({
    result: T.array(CompanyLastLogDateDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListLatestCompaniesActivityDateResponse>);

export type GetSortedCompanyLastActivityResponse = {
    result?: CompanyLastLogDateDto[];
    logCompaniesIds?: number[];
    amountOfIds?: number;
};

export const GetSortedCompanyLastActivityResponseStruct = (): T.Describe<GetSortedCompanyLastActivityResponse> => (T.type({
    result: tSpecialOptional(T.array(CompanyLastLogDateDtoStruct())),
    logCompaniesIds: tSpecialOptional(T.array(T.number())),
    amountOfIds: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetSortedCompanyLastActivityResponse>);

export type ListCompanyLogByCompanyIdResponse = {
    result: CompanyLogDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyLogByCompanyIdResponseStruct = (): T.Describe<ListCompanyLogByCompanyIdResponse> => (T.type({
    result: T.array(CompanyLogDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyLogByCompanyIdResponse>);

export type ListPmLogResponse = {
    result: PmLogDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListPmLogResponseStruct = (): T.Describe<ListPmLogResponse> => (T.type({
    result: T.array(PmLogDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListPmLogResponse>);

export type ListProjectLogByProjectIdResponse = {
    result: ProjectLogDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListProjectLogByProjectIdResponseStruct = (): T.Describe<ListProjectLogByProjectIdResponse> => (T.type({
    result: T.array(ProjectLogDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectLogByProjectIdResponse>);

export type ListSystemLogByUserIdResponse = {
    result: SystemLogDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListSystemLogByUserIdResponseStruct = (): T.Describe<ListSystemLogByUserIdResponse> => (T.type({
    result: T.array(SystemLogDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSystemLogByUserIdResponse>);

export type ListLatestUsersActivityDateResponse = {
    result: LastLogDateDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListLatestUsersActivityDateResponseStruct = (): T.Describe<ListLatestUsersActivityDateResponse> => (T.type({
    result: T.array(LastLogDateDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListLatestUsersActivityDateResponse>);

export type ListUserHistoryLogsResponse = {
    result: LogDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListUserHistoryLogsResponseStruct = (): T.Describe<ListUserHistoryLogsResponse> => (T.type({
    result: T.array(LogDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListUserHistoryLogsResponse>);

export type ListCompanyLogQuery = {
    page?: number;
    pageSize?: number;
};

export const ListCompanyLogQueryStruct = (): T.Describe<ListCompanyLogQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyLogQuery>);

export type ListLatestCompaniesActivityDateQuery = {
    companyIds?: number[];
};

export const ListLatestCompaniesActivityDateQueryStruct = (): T.Describe<ListLatestCompaniesActivityDateQuery> => (T.type({
    companyIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<ListLatestCompaniesActivityDateQuery>);

export type GetSortedCompanyLastActivityQuery = {
    isDateAscending?: boolean;
    idsToIgnore?: number[];
    page?: number;
    pageSize?: number;
};

export const GetSortedCompanyLastActivityQueryStruct = (): T.Describe<GetSortedCompanyLastActivityQuery> => (T.type({
    isDateAscending: tSpecialOptional(T.boolean()),
    idsToIgnore: tSpecialOptional(T.array(T.number())),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetSortedCompanyLastActivityQuery>);

export type ListCompanyLogByCompanyIdQuery = {
    page?: number;
    pageSize?: number;
    companyId?: number;
};

export const ListCompanyLogByCompanyIdQueryStruct = (): T.Describe<ListCompanyLogByCompanyIdQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyLogByCompanyIdQuery>);

export type CreateSystemLog = {
    bearerToken?: string;
    message: string;
    messageArabic?: string;
    userId?: number;
    logDate?: string;
};

export const CreateSystemLogStruct = (): T.Describe<CreateSystemLog> => (T.type({
    bearerToken: tSpecialOptional(T.string()),
    message: T.string(),
    messageArabic: tSpecialOptional(T.string()),
    userId: tSpecialOptional(T.number()),
    logDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateSystemLog>);

export type CreateProjectLog = {
    projectId?: number;
    bearerToken?: string;
    message: string;
    messageArabic?: string;
    userId?: number;
    logDate?: string;
};

export const CreateProjectLogStruct = (): T.Describe<CreateProjectLog> => (T.type({
    projectId: tSpecialOptional(T.number()),
    bearerToken: tSpecialOptional(T.string()),
    message: T.string(),
    messageArabic: tSpecialOptional(T.string()),
    userId: tSpecialOptional(T.number()),
    logDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateProjectLog>);

export type CreateCompanyLog = {
    companyId?: number;
    issuerType?: ContextType;
    bearerToken?: string;
    message: string;
    messageArabic?: string;
    userId?: number;
    logDate?: string;
};

export const CreateCompanyLogStruct = (): T.Describe<CreateCompanyLog> => (T.type({
    companyId: tSpecialOptional(T.number()),
    issuerType: tSpecialOptional(ContextTypeStruct()),
    bearerToken: tSpecialOptional(T.string()),
    message: T.string(),
    messageArabic: tSpecialOptional(T.string()),
    userId: tSpecialOptional(T.number()),
    logDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateCompanyLog>);

export type CreatePmLog = {
    projectId?: number;
    userId?: number;
    logDate?: string;
    actorType?: ActorType;
    pmActionType?: PmActionType;
    stageNumber?: number;
    optionNumber?: number;
    updateId?: number;
    invoiceValue?: number;
    updateNumber?: number;
    subcontractorName?: string;
    pmData?: PmData[];
    isApproved?: boolean;
    updateType?: PmUpdateType;
    bearerToken?: string;
};

export const CreatePmLogStruct = (): T.Describe<CreatePmLog> => (T.type({
    projectId: tSpecialOptional(T.number()),
    userId: tSpecialOptional(T.number()),
    logDate: tSpecialOptional(T.string()),
    actorType: tSpecialOptional(ActorTypeStruct()),
    pmActionType: tSpecialOptional(PmActionTypeStruct()),
    stageNumber: tSpecialOptional(T.number()),
    optionNumber: tSpecialOptional(T.number()),
    updateId: tSpecialOptional(T.number()),
    invoiceValue: tSpecialOptional(T.number()),
    updateNumber: tSpecialOptional(T.number()),
    subcontractorName: tSpecialOptional(T.string()),
    pmData: tSpecialOptional(T.array(PmDataStruct())),
    isApproved: tSpecialOptional(T.boolean()),
    updateType: tSpecialOptional(PmUpdateTypeStruct()),
    bearerToken: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreatePmLog>);

export type ListPmLogQuery = {
    constructionProjectId?: number;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    pageSize?: number;
};

export const ListPmLogQueryStruct = (): T.Describe<ListPmLogQuery> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    dateFrom: tSpecialOptional(T.string()),
    dateTo: tSpecialOptional(T.string()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListPmLogQuery>);

export type ListProjectLogByProjectIdQuery = {
    page?: number;
    pageSize?: number;
    projectId?: number;
};

export const ListProjectLogByProjectIdQueryStruct = (): T.Describe<ListProjectLogByProjectIdQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectLogByProjectIdQuery>);

export type ListProjectLogQuery = {
    page?: number;
    pageSize?: number;
};

export const ListProjectLogQueryStruct = (): T.Describe<ListProjectLogQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectLogQuery>);

export type ListSystemLogByUserIdQuery = {
    page?: number;
    pageSize?: number;
    userId?: number;
};

export const ListSystemLogByUserIdQueryStruct = (): T.Describe<ListSystemLogByUserIdQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    userId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSystemLogByUserIdQuery>);

export type ListSystemLogQuery = {
    page?: number;
    pageSize?: number;
};

export const ListSystemLogQueryStruct = (): T.Describe<ListSystemLogQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSystemLogQuery>);

export type ListLatestUsersActivityDateQuery = {
    profileIds?: number[];
    page?: number;
    pageSize?: number;
};

export const ListLatestUsersActivityDateQueryStruct = (): T.Describe<ListLatestUsersActivityDateQuery> => (T.type({
    profileIds: tSpecialOptional(T.array(T.number())),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListLatestUsersActivityDateQuery>);

export type ListUserHistoryLogsQuery = {
    userId?: number;
    page?: number;
    pageSize?: number;
};

export const ListUserHistoryLogsQueryStruct = (): T.Describe<ListUserHistoryLogsQuery> => (T.type({
    userId: tSpecialOptional(T.number()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListUserHistoryLogsQuery>);

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

export enum PmActionType {
    none = 0,
    taskSubmission = 1,
    taskRejection = 2,
    taskUpdate = 3,
    proofOfPayment = 4,
    materialSubmission = 21,
    materialPurchase = 22,
    clientConfirmDelivery = 23,
    rejectDelivery = 24,
    contractorConfirmDelivery = 25,
    materialSubmissionOption = 31,
    clientRejectOptions = 32,
    clientSelectedOption = 33,
    comment = 41,
    addExpense = 51,
    subcontractorSubmission = 52,
    confirmWork = 53,
    observation = 54,
}

export const PmActionTypeStruct = () => T.enums([
    PmActionType.none,
    PmActionType.taskSubmission,
    PmActionType.taskRejection,
    PmActionType.taskUpdate,
    PmActionType.proofOfPayment,
    PmActionType.materialSubmission,
    PmActionType.materialPurchase,
    PmActionType.clientConfirmDelivery,
    PmActionType.rejectDelivery,
    PmActionType.contractorConfirmDelivery,
    PmActionType.materialSubmissionOption,
    PmActionType.clientRejectOptions,
    PmActionType.clientSelectedOption,
    PmActionType.comment,
    PmActionType.addExpense,
    PmActionType.subcontractorSubmission,
    PmActionType.confirmWork,
    PmActionType.observation,
]);

export enum LogLanguage {
    none = 0,
    english = 1,
    arabic = 2,
}

export const LogLanguageStruct = () => T.enums([
    LogLanguage.none,
    LogLanguage.english,
    LogLanguage.arabic,
]);

export enum PmUpdateType {
    none = 0,
    siteObservation = 1,
    contractualNote = 2,
    risksConcerns = 3,
    generalUpdates = 4,
    messageToContractor = 5,
    messageToConsultant = 6,
    messageToClient = 7,
}

export const PmUpdateTypeStruct = () => T.enums([
    PmUpdateType.none,
    PmUpdateType.siteObservation,
    PmUpdateType.contractualNote,
    PmUpdateType.risksConcerns,
    PmUpdateType.generalUpdates,
    PmUpdateType.messageToContractor,
    PmUpdateType.messageToConsultant,
    PmUpdateType.messageToClient,
]);

export enum LogType {
    none = 0,
    project = 1,
    company = 2,
    system = 3,
    pm = 10,
}

export const LogTypeStruct = () => T.enums([
    LogType.none,
    LogType.project,
    LogType.company,
    LogType.system,
    LogType.pm,
]);

export const execListCompanyLogQuery = restClient.encloseQuery<ListCompanyLogQuery, ListCompanyLogResponse>(
  props => T.create(props, ListCompanyLogQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/listcompanylogquery',
    props,
  );
 },
 result => T.create(result, ListCompanyLogResponseStruct()),
);

export const execListLatestCompaniesActivityDateQuery = restClient.encloseQuery<ListLatestCompaniesActivityDateQuery, ListLatestCompaniesActivityDateResponse>(
  props => T.create(props, ListLatestCompaniesActivityDateQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/listlatestcompaniesactivitydatequery',
    props,
  );
 },
 result => T.create(result, ListLatestCompaniesActivityDateResponseStruct()),
);

export const execGetSortedCompanyLastActivityQuery = restClient.encloseQuery<GetSortedCompanyLastActivityQuery, GetSortedCompanyLastActivityResponse>(
  props => T.create(props, GetSortedCompanyLastActivityQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/getsortedcompanylastactivityquery',
    props,
  );
 },
 result => T.create(result, GetSortedCompanyLastActivityResponseStruct()),
);

export const execListCompanyLogByCompanyIdQuery = restClient.encloseQuery<ListCompanyLogByCompanyIdQuery, ListCompanyLogByCompanyIdResponse>(
  props => T.create(props, ListCompanyLogByCompanyIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/listcompanylogbycompanyidquery/{companyid}',
    props,
  );
 },
 result => T.create(result, ListCompanyLogByCompanyIdResponseStruct()),
);

export const execCreateSystemLog = restClient.encloseQuery<CreateSystemLog, void>(
  props => T.create(props, CreateSystemLogStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/log/createsystemlog',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execCreateProjectLog = restClient.encloseQuery<CreateProjectLog, void>(
  props => T.create(props, CreateProjectLogStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/log/createprojectlog',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execCreateCompanyLog = restClient.encloseQuery<CreateCompanyLog, void>(
  props => T.create(props, CreateCompanyLogStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/log/createcompanylog',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execCreatePmLog = restClient.encloseQuery<CreatePmLog, void>(
  props => T.create(props, CreatePmLogStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/log/createpmlog',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execListPmLogQuery = restClient.encloseQuery<ListPmLogQuery, ListPmLogResponse>(
  props => T.create(props, ListPmLogQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/log/listpmlogquery',
    props,
  );
 },
 result => T.create(result, ListPmLogResponseStruct()),
);

export const execListProjectLogByProjectIdQuery = restClient.encloseQuery<ListProjectLogByProjectIdQuery, ListProjectLogByProjectIdResponse>(
  props => T.create(props, ListProjectLogByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/listprojectlogbyprojectidquery/{projectid}',
    props,
  );
 },
 result => T.create(result, ListProjectLogByProjectIdResponseStruct()),
);

export const execListProjectLogQuery = restClient.encloseQuery<ListProjectLogQuery, ListProjectLogByProjectIdResponse>(
  props => T.create(props, ListProjectLogQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/listprojectlogquery',
    props,
  );
 },
 result => T.create(result, ListProjectLogByProjectIdResponseStruct()),
);

export const execListSystemLogByUserIdQuery = restClient.encloseQuery<ListSystemLogByUserIdQuery, ListSystemLogByUserIdResponse>(
  props => T.create(props, ListSystemLogByUserIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/listsystemlogbyuseridquery',
    props,
  );
 },
 result => T.create(result, ListSystemLogByUserIdResponseStruct()),
);

export const execListSystemLogQuery = restClient.encloseQuery<ListSystemLogQuery, ListSystemLogByUserIdResponse>(
  props => T.create(props, ListSystemLogQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/listsystemlogquery',
    props,
  );
 },
 result => T.create(result, ListSystemLogByUserIdResponseStruct()),
);

export const execListLatestUsersActivityDateQuery = restClient.encloseQuery<ListLatestUsersActivityDateQuery, ListLatestUsersActivityDateResponse>(
  props => T.create(props, ListLatestUsersActivityDateQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/listlatestusersactivitydatequery',
    props,
  );
 },
 result => T.create(result, ListLatestUsersActivityDateResponseStruct()),
);

export const execListUserHistoryLogsQuery = restClient.encloseQuery<ListUserHistoryLogsQuery, ListUserHistoryLogsResponse>(
  props => T.create(props, ListUserHistoryLogsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/log/listuserhistorylogsquery',
    props,
  );
 },
 result => T.create(result, ListUserHistoryLogsResponseStruct()),
);
