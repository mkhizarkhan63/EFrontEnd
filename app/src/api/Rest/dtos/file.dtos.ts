// @ts-ignore
// @ts-nocheck
// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2023-05-30 08:37:56
Version: 6.21
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://10.42.4.50:5000/

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

export interface IPost
{
}

export interface IDelete
{
}

export interface IGet
{
}

export interface IPut
{
}

export enum AccessType
{
    None = 0,
    Read = 1,
    All = 2,
}

export enum MinifiedImageSize
{
    None = 0,
    Small = 1,
    Medium = 2,
    Large = 3,
    ExtraLarge = 4,
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

export class AccessCommandResponse extends OperationResult
{

    public constructor(init?: Partial<AccessCommandResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetFilePreviewResponse extends OperationResult
{
    public fileId?: string;
    public fileName?: string;
    public byteSize?: number;
    public lastModified?: string;

    public constructor(init?: Partial<GetFilePreviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class ListGetFilesPreviewResponse extends BaseMultipleResultResponse<GetFilePreviewResponse>
{

    public constructor(init?: Partial<ListGetFilesPreviewResponse>) { super(init); (Object as any).assign(this, init); }
}

export class CreateFileResponse extends BaseMultipleResultResponse<string>
{

    public constructor(init?: Partial<CreateFileResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/file/clonefilesbyidscommand", "POST")
export class CloneFilesByIdsCommand implements IReturn<CloneFilesByIdsCommand>, IPost
{
    public fileIds?: string[];
    public isPublic?: boolean;

    public constructor(init?: Partial<CloneFilesByIdsCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CloneFilesByIdsCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CloneFilesByIdsCommand(); }
}

export class UpdateFileResponse extends OperationResult
{

    public constructor(init?: Partial<UpdateFileResponse>) { super(init); (Object as any).assign(this, init); }
}

export class DeleteFileResponse extends OperationResult
{

    public constructor(init?: Partial<DeleteFileResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/file/addaccesscommand", "POST")
export class AddAccessCommand implements IReturn<AccessCommandResponse>, IPost
{
    public fileId?: string;
    public addedUserId?: number;
    public accessType?: AccessType;

    public constructor(init?: Partial<AddAccessCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AddAccessCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AccessCommandResponse(); }
}

// @Route("/file/addmultipleaccesscommand", "POST")
export class AddMultipleAccessCommand implements IReturn<AccessCommandResponse>, IPost
{
    public fileId?: string;
    public addedUsersIds?: number[];
    public accessType?: AccessType;

    public constructor(init?: Partial<AddMultipleAccessCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AddMultipleAccessCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AccessCommandResponse(); }
}

// @Route("/file/removeaccesscommand", "DELETE")
export class RemoveAccessCommand implements IReturn<AccessCommandResponse>, IDelete
{
    public fileId?: string;
    public targetUserId?: number;

    public constructor(init?: Partial<RemoveAccessCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RemoveAccessCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new AccessCommandResponse(); }
}

// @Route("/file/getfilerequest/{id}", "GET")
export class GetFileRequest implements IReturn<Object>, IGet
{
    public id: string;
    public asAttachment?: boolean;
    public imageSize?: MinifiedImageSize;

    public constructor(init?: Partial<GetFileRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFileRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new Object(); }
}

// @Route("/file/downloadmultiplefilesquery", "POST")
export class DownloadMultipleFilesQuery implements IReturn<Object>, IPost
{
    public fileIds?: string[];

    public constructor(init?: Partial<DownloadMultipleFilesQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DownloadMultipleFilesQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new Object(); }
}

// @Route("/file/getfilepreviewrequest", "GET")
export class GetFilePreviewRequest implements IReturn<GetFilePreviewResponse>, IGet
{
    public fileId?: string;

    public constructor(init?: Partial<GetFilePreviewRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFilePreviewRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetFilePreviewResponse(); }
}

// @Route("/file/getfilebytesrequest/{id}", "GET")
export class GetFileBytesRequest implements IReturn<Blob>, IGet
{
    public id: string;

    public constructor(init?: Partial<GetFileBytesRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetFileBytesRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new Blob(); }
}

// @Route("/file/listgetfilespreviewrequest", "POST")
export class ListGetFilesPreviewRequest implements IReturn<ListGetFilesPreviewResponse>, IPost
{
    public fileIds?: string[];

    public constructor(init?: Partial<ListGetFilesPreviewRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ListGetFilesPreviewRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ListGetFilesPreviewResponse(); }
}

// @Route("/file/createfilecommand", "POST")
export class CreateFileCommand implements IReturn<CreateFileResponse>, IPost
{
    public isPublic?: boolean;

    public constructor(init?: Partial<CreateFileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateFileCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateFileResponse(); }
}

// @Route("/file/createfileadmincommand", "POST")
export class CreateFileAdminCommand implements IReturn<CreateFileResponse>, IPost
{
    public fileName?: string;
    public ownerId?: number;
    public isPublic?: boolean;

    public constructor(init?: Partial<CreateFileAdminCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateFileAdminCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateFileResponse(); }
}

// @Route("/file/updatefilecommand", "PUT")
export class UpdateFileCommand implements IReturn<UpdateFileResponse>, IPut
{
    public fileId?: string;
    public fileName?: string;

    public constructor(init?: Partial<UpdateFileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateFileCommand'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateFileResponse(); }
}

// @Route("/file/deletefilecommand", "DELETE")
export class DeleteFileCommand implements IReturn<DeleteFileResponse>, IDelete
{
    public fileId?: string;

    public constructor(init?: Partial<DeleteFileCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteFileCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DeleteFileResponse(); }
}

