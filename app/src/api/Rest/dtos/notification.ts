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

export type BaseNotificationDto = {
    id: number;
    notificationType?: NotificationType;
    createdDate?: string;
    notificationData?: unknown;
};

export const BaseNotificationDtoStruct = (): T.Describe<BaseNotificationDto> => (T.type({
    id: T.number(),
    notificationType: tSpecialOptional(NotificationTypeStruct()),
    createdDate: tSpecialOptional(T.string()),
    notificationData: tSpecialOptional(T.unknown()),
}) as unknown as T.Describe<BaseNotificationDto>);

export type NotificationMessage = {
    userId?: number;
    phoneNumber?: string;
    email?: string;
    emailSubject?: string;
    notification?: BaseNotificationDto;
    deliveryTypes?: DeliveryType[];
    language?: Language;
    bearerToken?: string;
};

export const NotificationMessageStruct = (): T.Describe<NotificationMessage> => (T.type({
    userId: tSpecialOptional(T.number()),
    phoneNumber: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    emailSubject: tSpecialOptional(T.string()),
    notification: tSpecialOptional(BaseNotificationDtoStruct()),
    deliveryTypes: tSpecialOptional(T.array(DeliveryTypeStruct())),
    language: tSpecialOptional(LanguageStruct()),
    bearerToken: tSpecialOptional(T.string()),
}) as unknown as T.Describe<NotificationMessage>);

export type MultipleNotificationsMessageDto = {
    message?: NotificationMessage;
    emails?: string[];
    profileIds?: number[];
};

export const MultipleNotificationsMessageDtoStruct = (): T.Describe<MultipleNotificationsMessageDto> => (T.type({
    message: tSpecialOptional(NotificationMessageStruct()),
    emails: tSpecialOptional(T.array(T.string())),
    profileIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<MultipleNotificationsMessageDto>);

export type ProjectNotificationDto = {
    id: number;
    notificationType?: NotificationType;
    projectId?: number;
    projectSignStage?: ProjectSignStage;
    designStatus?: DesignStatus;
    projectPhase?: ProjectPhase;
};

export const ProjectNotificationDtoStruct = (): T.Describe<ProjectNotificationDto> => (T.type({
    id: T.number(),
    notificationType: tSpecialOptional(NotificationTypeStruct()),
    projectId: tSpecialOptional(T.number()),
    projectSignStage: tSpecialOptional(ProjectSignStageStruct()),
    designStatus: tSpecialOptional(DesignStatusStruct()),
    projectPhase: tSpecialOptional(ProjectPhaseStruct()),
}) as unknown as T.Describe<ProjectNotificationDto>);

export type SystemNotificationDto = {
    id: number;
    notificationType?: NotificationType;
    message?: string;
};

export const SystemNotificationDtoStruct = (): T.Describe<SystemNotificationDto> => (T.type({
    id: T.number(),
    notificationType: tSpecialOptional(NotificationTypeStruct()),
    message: tSpecialOptional(T.string()),
}) as unknown as T.Describe<SystemNotificationDto>);

export type EmptyNotificationDto = {
    id: number;
    notificationType?: NotificationType;
};

export const EmptyNotificationDtoStruct = (): T.Describe<EmptyNotificationDto> => (T.type({
    id: T.number(),
    notificationType: tSpecialOptional(NotificationTypeStruct()),
}) as unknown as T.Describe<EmptyNotificationDto>);

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

export type IncludeNotificationDtos = {
    projectNotificationDto?: ProjectNotificationDto;
    systemNotificationDto?: SystemNotificationDto;
    emptyNotificationDto?: EmptyNotificationDto;
};

export const IncludeNotificationDtosStruct = (): T.Describe<IncludeNotificationDtos> => (T.type({
    projectNotificationDto: tSpecialOptional(ProjectNotificationDtoStruct()),
    systemNotificationDto: tSpecialOptional(SystemNotificationDtoStruct()),
    emptyNotificationDto: tSpecialOptional(EmptyNotificationDtoStruct()),
}) as unknown as T.Describe<IncludeNotificationDtos>);

export type ListNotificationsResponse = {
    result: BaseNotificationDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListNotificationsResponseStruct = (): T.Describe<ListNotificationsResponse> => (T.type({
    result: T.array(BaseNotificationDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNotificationsResponse>);

export type DeleteNotificationsByIdsResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteNotificationsByIdsResponseStruct = (): T.Describe<DeleteNotificationsByIdsResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteNotificationsByIdsResponse>);

export type MultipleNotificationsMessage = {
    notificationsMessagesDto?: MultipleNotificationsMessageDto[];
    bearerToken?: string;
};

export const MultipleNotificationsMessageStruct = (): T.Describe<MultipleNotificationsMessage> => (T.type({
    notificationsMessagesDto: tSpecialOptional(T.array(MultipleNotificationsMessageDtoStruct())),
    bearerToken: tSpecialOptional(T.string()),
}) as unknown as T.Describe<MultipleNotificationsMessage>);

export type FakeRequestDoNotUse = undefined;

export const FakeRequestDoNotUseStruct = () => T.literal(undefined);

export type TaskMessage = {
    userId?: number;
    startDate?: string;
    repeatInterval?: string;
    notificationType?: NotificationType;
    notificationData?: unknown;
    isDone?: boolean;
    bearerToken?: string;
};

export const TaskMessageStruct = (): T.Describe<TaskMessage> => (T.type({
    userId: tSpecialOptional(T.number()),
    startDate: tSpecialOptional(T.string()),
    repeatInterval: tSpecialOptional(T.string()),
    notificationType: tSpecialOptional(NotificationTypeStruct()),
    notificationData: tSpecialOptional(T.unknown()),
    isDone: tSpecialOptional(T.boolean()),
    bearerToken: tSpecialOptional(T.string()),
}) as unknown as T.Describe<TaskMessage>);

export type ListNotificationsQuery = {
    page?: number;
    pageSize?: number;
};

export const ListNotificationsQueryStruct = (): T.Describe<ListNotificationsQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNotificationsQuery>);

export type MockNotificationsCommand = {
    amount?: number;
};

export const MockNotificationsCommandStruct = (): T.Describe<MockNotificationsCommand> => (T.type({
    amount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<MockNotificationsCommand>);

export type DeleteNotificationsByIdsCommand = {
    notificationIds?: number[];
};

export const DeleteNotificationsByIdsCommandStruct = (): T.Describe<DeleteNotificationsByIdsCommand> => (T.type({
    notificationIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<DeleteNotificationsByIdsCommand>);

export enum NotificationType {
    none = 0,
    projectChange = 1,
    updateEmail = 2,
    system = 3,
    userInvitation = 4,
    companyInvitation = 5,
    ownerInvitation = 6,
    referralInvitation = 7,
    shortCompanyInvitation = 8,
    pmTask = 9,
    pmMaterialTask = 10,
}

export const NotificationTypeStruct = () => T.enums([
    NotificationType.none,
    NotificationType.projectChange,
    NotificationType.updateEmail,
    NotificationType.system,
    NotificationType.userInvitation,
    NotificationType.companyInvitation,
    NotificationType.ownerInvitation,
    NotificationType.referralInvitation,
    NotificationType.shortCompanyInvitation,
    NotificationType.pmTask,
    NotificationType.pmMaterialTask,
]);

export enum DeliveryType {
    internal = 0,
    sms = 1,
    email = 2,
}

export const DeliveryTypeStruct = () => T.enums([
    DeliveryType.internal,
    DeliveryType.sms,
    DeliveryType.email,
]);

export enum Language {
    english = 0,
    arabic = 1,
}

export const LanguageStruct = () => T.enums([
    Language.english,
    Language.arabic,
]);

export enum ProjectSignStage {
    none = 0,
    created = 1,
    reviewing = 2,
    approved = 3,
    biding = 4,
    readyToSign = 5,
    signed = 6,
}

export const ProjectSignStageStruct = () => T.enums([
    ProjectSignStage.none,
    ProjectSignStage.created,
    ProjectSignStage.reviewing,
    ProjectSignStage.approved,
    ProjectSignStage.biding,
    ProjectSignStage.readyToSign,
    ProjectSignStage.signed,
]);

export enum DesignStatus {
    none = 0,
    projectApproved = 1,
    designFinished = 2,
}

export const DesignStatusStruct = () => T.enums([
    DesignStatus.none,
    DesignStatus.projectApproved,
    DesignStatus.designFinished,
]);

export enum ProjectPhase {
    none = 0,
    design = 1,
    construction = 2,
}

export const ProjectPhaseStruct = () => T.enums([
    ProjectPhase.none,
    ProjectPhase.design,
    ProjectPhase.construction,
]);

export const execNotificationMessage = restClient.encloseQuery<NotificationMessage, void>(
  props => T.create(props, NotificationMessageStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/notification/notificationmessage',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execMultipleNotificationsMessage = restClient.encloseQuery<MultipleNotificationsMessage, void>(
  props => T.create(props, MultipleNotificationsMessageStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/notification/multiplenotificationsmessage',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execFakeRequestDoNotUse = restClient.encloseQuery<FakeRequestDoNotUse, IncludeNotificationDtos>(
  props => T.create(props, FakeRequestDoNotUseStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/notification/fakerequestdonotuse',
    props,
  );
 },
 result => T.create(result, IncludeNotificationDtosStruct()),
);

export const execTaskMessagePost = restClient.encloseQuery<TaskMessage, void>(
  props => T.create(props, TaskMessageStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/notification/taskmessage',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);


export const execTaskMessageDelete = restClient.encloseQuery<TaskMessage, void>(
  props => T.create(props, TaskMessageStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/notification/taskmessage',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execListNotificationsQuery = restClient.encloseQuery<ListNotificationsQuery, ListNotificationsResponse>(
  props => T.create(props, ListNotificationsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/notification/listnotificationsquery',
    props,
  );
 },
 result => T.create(result, ListNotificationsResponseStruct()),
);

export const execMockNotificationsCommand = restClient.encloseQuery<MockNotificationsCommand, void>(
  props => T.create(props, MockNotificationsCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/notification/mocknotificationscommand',
    props,
  );
 },
 result => T.create(result, voidStruct()),
);

export const execDeleteNotificationsByIdsCommand = restClient.encloseQuery<DeleteNotificationsByIdsCommand, DeleteNotificationsByIdsResponse>(
  props => T.create(props, DeleteNotificationsByIdsCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/notification/deletenotificationsbyidscommand',
    props,
  );
 },
 result => T.create(result, DeleteNotificationsByIdsResponseStruct()),
);
