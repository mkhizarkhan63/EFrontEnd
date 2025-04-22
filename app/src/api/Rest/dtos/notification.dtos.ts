// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2023-11-08 13:27:19
Version: 6.50
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://10.42.4.27:5000/

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

export interface IHasBearerToken
{
    bearerToken?: string;
}

export interface IGet
{
}

export interface IDelete
{
}

export enum NotificationType
{
    None = 0,
    ProjectChange = 1,
    UpdateEmail = 2,
    System = 3,
    UserInvitation = 4,
    CompanyInvitation = 5,
    OwnerInvitation = 6,
    ReferralInvitation = 7,
    ShortCompanyInvitation = 8,
    PmTask = 9,
    PmMaterialTask = 10,
}

export class BaseNotificationDto
{
    public id: number;
    public notificationType?: NotificationType;
    public createdDate?: string;
    public notificationData?: { [index: string]: Object; };

    public constructor(init?: Partial<BaseNotificationDto>) { (Object as any).assign(this, init); }
}

export enum DeliveryType
{
    Internal = 0,
    Sms = 1,
    Email = 2,
}

export enum Language
{
    English = 0,
    Arabic = 1,
}

// @Route("/notification/notificationmessage", "POST")
export class NotificationMessage implements IHasBearerToken
{
    public userId?: number;
    public phoneNumber?: string;
    public email?: string;
    public emailSubject?: string;
    public notification?: BaseNotificationDto;
    public deliveryTypes?: DeliveryType[];
    public language?: Language;
    public bearerToken?: string;

    public constructor(init?: Partial<NotificationMessage>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'NotificationMessage'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

export class MultipleNotificationsMessageDto
{
    public message?: NotificationMessage;
    public emails?: string[];
    public profileIds?: number[];

    public constructor(init?: Partial<MultipleNotificationsMessageDto>) { (Object as any).assign(this, init); }
}

export interface IPaginatedRequest
{
    page?: number;
    pageSize?: number;
}

export class NotificationData
{

    public constructor(init?: Partial<NotificationData>) { (Object as any).assign(this, init); }
}

export enum ProjectSignStage
{
    None = 0,
    Created = 1,
    Reviewing = 2,
    Approved = 3,
    Biding = 4,
    ReadyToSign = 5,
    Signed = 6,
}

export enum DesignStatus
{
    None = 0,
    ProjectApproved = 1,
    DesignFinished = 2,
}

export enum ProjectPhase
{
    None = 0,
    Design = 1,
    Construction = 2,
}

export class ProjectNotificationData extends NotificationData
{
    public projectId?: number;
    public projectSignStage?: ProjectSignStage;
    public designStatus?: DesignStatus;
    public projectPhase?: ProjectPhase;

    public constructor(init?: Partial<ProjectNotificationData>) { super(init); (Object as any).assign(this, init); }
}

export class ProjectNotificationDto extends ProjectNotificationData implements IBaseNotification
{
    public id: number;
    public notificationType?: NotificationType;

    public constructor(init?: Partial<ProjectNotificationDto>) { super(init); (Object as any).assign(this, init); }
}

export class SystemNotificationData extends NotificationData
{
    public message?: string;

    public constructor(init?: Partial<SystemNotificationData>) { super(init); (Object as any).assign(this, init); }
}

export class SystemNotificationDto extends SystemNotificationData implements IBaseNotification
{
    public id: number;
    public notificationType?: NotificationType;

    public constructor(init?: Partial<SystemNotificationDto>) { super(init); (Object as any).assign(this, init); }
}

export class EmptyNotificationDto implements IBaseNotification
{
    public id: number;
    public notificationType?: NotificationType;

    public constructor(init?: Partial<EmptyNotificationDto>) { (Object as any).assign(this, init); }
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

export interface IBaseNotification
{
    id: number;
    notificationType?: NotificationType;
}

export class IncludeNotificationDtos
{
    public projectNotificationDto?: ProjectNotificationDto;
    public systemNotificationDto?: SystemNotificationDto;
    public emptyNotificationDto?: EmptyNotificationDto;

    public constructor(init?: Partial<IncludeNotificationDtos>) { (Object as any).assign(this, init); }
}

export class ListNotificationsResponse extends BaseMultipleResultResponse<BaseNotificationDto>
{

    public constructor(init?: Partial<ListNotificationsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteNotificationsByIdsResponse extends OperationResult
{

    public constructor(init?: Partial<DeleteNotificationsByIdsResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/notification/multiplenotificationsmessage", "POST")
export class MultipleNotificationsMessage implements IHasBearerToken
{
    public notificationsMessagesDto?: MultipleNotificationsMessageDto[];
    public bearerToken?: string;

    public constructor(init?: Partial<MultipleNotificationsMessage>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'MultipleNotificationsMessage'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/notification/fakerequestdonotuse", "PUT")
export class FakeRequestDoNotUse implements IReturn<IncludeNotificationDtos>
{

    public constructor(init?: Partial<FakeRequestDoNotUse>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'FakeRequestDoNotUse'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new IncludeNotificationDtos(); }
}

// @Route("/notification/taskmessage", "POST DELETE")
export class TaskMessage implements IHasBearerToken
{
    public userId?: number;
    public startDate?: string;
    public repeatInterval?: string;
    public notificationType?: NotificationType;
    public notificationData?: { [index: string]: Object; };
    public isDone?: boolean;
    public bearerToken?: string;

    public constructor(init?: Partial<TaskMessage>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'TaskMessage'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/notification/listnotificationsquery", "GET")
export class ListNotificationsQuery implements IReturn<ListNotificationsResponse>, IGet, IPaginatedRequest
{
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<ListNotificationsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListNotificationsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ListNotificationsResponse(); }
}

// @Route("/notification/mocknotificationscommand", "POST")
export class MockNotificationsCommand
{
    public amount?: number;

    public constructor(init?: Partial<MockNotificationsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'MockNotificationsCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/notification/deletenotificationsbyidscommand", "DELETE")
export class DeleteNotificationsByIdsCommand implements IReturn<DeleteNotificationsByIdsResponse>, IDelete
{
    public notificationIds?: number[];

    public constructor(init?: Partial<DeleteNotificationsByIdsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteNotificationsByIdsCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteNotificationsByIdsResponse(); }
}

