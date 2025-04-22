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

export type AccessCommandResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const AccessCommandResponseStruct = (): T.Describe<AccessCommandResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<AccessCommandResponse>);

export type GetFilePreviewResponse = {
    fileId?: string;
    fileName?: string;
    byteSize?: number;
    lastModified?: string;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const GetFilePreviewResponseStruct = (): T.Describe<GetFilePreviewResponse> => (T.type({
    fileId: tSpecialOptional(T.string()),
    fileName: tSpecialOptional(T.string()),
    byteSize: tSpecialOptional(T.number()),
    lastModified: tSpecialOptional(T.string()),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GetFilePreviewResponse>);

export type ListGetFilesPreviewResponse = {
    result: GetFilePreviewResponse[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListGetFilesPreviewResponseStruct = (): T.Describe<ListGetFilesPreviewResponse> => (T.type({
    result: T.array(GetFilePreviewResponseStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListGetFilesPreviewResponse>);

export type CreateFileResponse = {
    result: string[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const CreateFileResponseStruct = (): T.Describe<CreateFileResponse> => (T.type({
    result: T.array(T.string()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateFileResponse>);

export type CloneFilesByIdsCommand = {
    fileIds?: string[];
    isPublic?: boolean;
};

export const CloneFilesByIdsCommandStruct = (): T.Describe<CloneFilesByIdsCommand> => (T.type({
    fileIds: tSpecialOptional(T.array(T.string())),
    isPublic: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CloneFilesByIdsCommand>);

export type UpdateFileResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateFileResponseStruct = (): T.Describe<UpdateFileResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateFileResponse>);

export type DeleteFileResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteFileResponseStruct = (): T.Describe<DeleteFileResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteFileResponse>);

export type AddAccessCommand = {
    fileId?: string;
    addedUserId?: number;
    accessType?: AccessType;
};

export const AddAccessCommandStruct = (): T.Describe<AddAccessCommand> => (T.type({
    fileId: tSpecialOptional(T.string()),
    addedUserId: tSpecialOptional(T.number()),
    accessType: tSpecialOptional(AccessTypeStruct()),
}) as unknown as T.Describe<AddAccessCommand>);

export type AddMultipleAccessCommand = {
    fileId?: string;
    addedUsersIds?: number[];
    accessType?: AccessType;
};

export const AddMultipleAccessCommandStruct = (): T.Describe<AddMultipleAccessCommand> => (T.type({
    fileId: tSpecialOptional(T.string()),
    addedUsersIds: tSpecialOptional(T.array(T.number())),
    accessType: tSpecialOptional(AccessTypeStruct()),
}) as unknown as T.Describe<AddMultipleAccessCommand>);

export type RemoveAccessCommand = {
    fileId?: string;
    targetUserId?: number;
};

export const RemoveAccessCommandStruct = (): T.Describe<RemoveAccessCommand> => (T.type({
    fileId: tSpecialOptional(T.string()),
    targetUserId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<RemoveAccessCommand>);

export type GetFileRequest = {
    id: string;
    asAttachment?: boolean;
    imageSize?: MinifiedImageSize;
};

export const GetFileRequestStruct = (): T.Describe<GetFileRequest> => (T.type({
    id: T.string(),
    asAttachment: tSpecialOptional(T.boolean()),
    imageSize: tSpecialOptional(MinifiedImageSizeStruct()),
}) as unknown as T.Describe<GetFileRequest>);

export type DownloadMultipleFilesQuery = {
    fileIds?: string[];
};

export const DownloadMultipleFilesQueryStruct = (): T.Describe<DownloadMultipleFilesQuery> => (T.type({
    fileIds: tSpecialOptional(T.array(T.string())),
}) as unknown as T.Describe<DownloadMultipleFilesQuery>);

export type GetFilePreviewRequest = {
    fileId?: string;
};

export const GetFilePreviewRequestStruct = (): T.Describe<GetFilePreviewRequest> => (T.type({
    fileId: tSpecialOptional(T.string()),
}) as unknown as T.Describe<GetFilePreviewRequest>);

export type GetFileBytesRequest = {
    id: string;
};

export const GetFileBytesRequestStruct = (): T.Describe<GetFileBytesRequest> => (T.type({
    id: T.string(),
}) as unknown as T.Describe<GetFileBytesRequest>);

export type ListGetFilesPreviewRequest = {
    fileIds?: string[];
};

export const ListGetFilesPreviewRequestStruct = (): T.Describe<ListGetFilesPreviewRequest> => (T.type({
    fileIds: tSpecialOptional(T.array(T.string())),
}) as unknown as T.Describe<ListGetFilesPreviewRequest>);

export type CreateFileCommand = {
    isPublic?: boolean;
};

export const CreateFileCommandStruct = (): T.Describe<CreateFileCommand> => (T.type({
    isPublic: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateFileCommand>);

export type CreateFileAdminCommand = {
    fileName?: string;
    ownerId?: number;
    isPublic?: boolean;
};

export const CreateFileAdminCommandStruct = (): T.Describe<CreateFileAdminCommand> => (T.type({
    fileName: tSpecialOptional(T.string()),
    ownerId: tSpecialOptional(T.number()),
    isPublic: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateFileAdminCommand>);

export type UpdateFileCommand = {
    fileId?: string;
    fileName?: string;
};

export const UpdateFileCommandStruct = (): T.Describe<UpdateFileCommand> => (T.type({
    fileId: tSpecialOptional(T.string()),
    fileName: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateFileCommand>);

export type DeleteFileCommand = {
    fileId?: string;
};

export const DeleteFileCommandStruct = (): T.Describe<DeleteFileCommand> => (T.type({
    fileId: tSpecialOptional(T.string()),
}) as unknown as T.Describe<DeleteFileCommand>);

export enum AccessType {
    none = 0,
    read = 1,
    all = 2,
}

export const AccessTypeStruct = () => T.enums([
    AccessType.none,
    AccessType.read,
    AccessType.all,
]);

export enum MinifiedImageSize {
    none = 0,
    small = 1,
    medium = 2,
    large = 3,
    extraLarge = 4,
}

export const MinifiedImageSizeStruct = () => T.enums([
    MinifiedImageSize.none,
    MinifiedImageSize.small,
    MinifiedImageSize.medium,
    MinifiedImageSize.large,
    MinifiedImageSize.extraLarge,
]);

export const execCloneFilesByIdsCommand = restClient.encloseQuery<CloneFilesByIdsCommand, CloneFilesByIdsCommand>(
  props => T.create(props, CloneFilesByIdsCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/file/clonefilesbyidscommand',
    props,
  );
 },
 result => T.create(result, CloneFilesByIdsCommandStruct()),
);

export const execAddAccessCommand = restClient.encloseQuery<AddAccessCommand, AccessCommandResponse>(
  props => T.create(props, AddAccessCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/file/addaccesscommand',
    props,
  );
 },
 result => T.create(result, AccessCommandResponseStruct()),
);

export const execAddMultipleAccessCommand = restClient.encloseQuery<AddMultipleAccessCommand, AccessCommandResponse>(
  props => T.create(props, AddMultipleAccessCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/file/addmultipleaccesscommand',
    props,
  );
 },
 result => T.create(result, AccessCommandResponseStruct()),
);

export const execRemoveAccessCommand = restClient.encloseQuery<RemoveAccessCommand, AccessCommandResponse>(
  props => T.create(props, RemoveAccessCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/file/removeaccesscommand',
    props,
  );
 },
 result => T.create(result, AccessCommandResponseStruct()),
);

export const execGetFileRequest = restClient.encloseQuery<GetFileRequest, Object>(
  props => T.create(props, GetFileRequestStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/file/getfilerequest/{id}',
    props,
  );
 },
 result => T.create(result, ObjectStruct()),
);

export const execDownloadMultipleFilesQuery = restClient.encloseQuery<DownloadMultipleFilesQuery, Object>(
  props => T.create(props, DownloadMultipleFilesQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/file/downloadmultiplefilesquery',
    props,
  );
 },
 result => T.create(result, ObjectStruct()),
);

export const execGetFilePreviewRequest = restClient.encloseQuery<GetFilePreviewRequest, GetFilePreviewResponse>(
  props => T.create(props, GetFilePreviewRequestStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/file/getfilepreviewrequest',
    props,
  );
 },
 result => T.create(result, GetFilePreviewResponseStruct()),
);

export const execGetFileBytesRequest = restClient.encloseQuery<GetFileBytesRequest, Blob>(
  props => T.create(props, GetFileBytesRequestStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/file/getfilebytesrequest/{id}',
    props,
  );
 },
 result => T.create(result, BlobStruct()),
);

export const execListGetFilesPreviewRequest = restClient.encloseQuery<ListGetFilesPreviewRequest, ListGetFilesPreviewResponse>(
  props => T.create(props, ListGetFilesPreviewRequestStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/file/listgetfilespreviewrequest',
    props,
  );
 },
 result => T.create(result, ListGetFilesPreviewResponseStruct()),
);

export const execCreateFileCommand = restClient.encloseQuery<CreateFileCommand, CreateFileResponse>(
  props => T.create(props, CreateFileCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/file/createfilecommand',
    props,
  );
 },
 result => T.create(result, CreateFileResponseStruct()),
);

export const execCreateFileAdminCommand = restClient.encloseQuery<CreateFileAdminCommand, CreateFileResponse>(
  props => T.create(props, CreateFileAdminCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/file/createfileadmincommand',
    props,
  );
 },
 result => T.create(result, CreateFileResponseStruct()),
);

export const execUpdateFileCommand = restClient.encloseQuery<UpdateFileCommand, UpdateFileResponse>(
  props => T.create(props, UpdateFileCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/file/updatefilecommand',
    props,
  );
 },
 result => T.create(result, UpdateFileResponseStruct()),
);

export const execDeleteFileCommand = restClient.encloseQuery<DeleteFileCommand, DeleteFileResponse>(
  props => T.create(props, DeleteFileCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/file/deletefilecommand',
    props,
  );
 },
 result => T.create(result, DeleteFileResponseStruct()),
);
