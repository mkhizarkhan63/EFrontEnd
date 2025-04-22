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

export type NumericRange = {
    min?: number;
    max?: number;
};

export const NumericRangeStruct = (): T.Describe<NumericRange> => (T.type({
    min: tSpecialOptional(T.number()),
    max: tSpecialOptional(T.number()),
}) as unknown as T.Describe<NumericRange>);

export type FloorAreaRange = {
    level?: number;
    floorArea: NumericRange;
};

export const FloorAreaRangeStruct = (): T.Describe<FloorAreaRange> => (T.type({
    level: tSpecialOptional(T.number()),
    floorArea: NumericRangeStruct(),
}) as unknown as T.Describe<FloorAreaRange>);

export type RoomRequirement = {
    roomType?: RoomType;
    rangeAmount: NumericRange;
};

export const RoomRequirementStruct = (): T.Describe<RoomRequirement> => (T.type({
    roomType: tSpecialOptional(RoomTypeStruct()),
    rangeAmount: NumericRangeStruct(),
}) as unknown as T.Describe<RoomRequirement>);

export type DesignFilter = {
    name?: string;
    price?: NumericRange;
    landType?: LandType;
    propertyType?: PropertyType;
    liked?: boolean;
    buildUpArea?: number;
    floorAreaRanges?: FloorAreaRange[];
    roomRequirements?: RoomRequirement[];
};

export const DesignFilterStruct = (): T.Describe<DesignFilter> => (T.type({
    name: tSpecialOptional(T.string()),
    price: tSpecialOptional(NumericRangeStruct()),
    landType: tSpecialOptional(LandTypeStruct()),
    propertyType: tSpecialOptional(PropertyTypeStruct()),
    liked: tSpecialOptional(T.boolean()),
    buildUpArea: tSpecialOptional(T.number()),
    floorAreaRanges: tSpecialOptional(T.array(FloorAreaRangeStruct())),
    roomRequirements: tSpecialOptional(T.array(RoomRequirementStruct())),
}) as unknown as T.Describe<DesignFilter>);

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

export type FeatureDto = {
    featureType?: FeatureType;
    amount?: number;
};

export const FeatureDtoStruct = (): T.Describe<FeatureDto> => (T.type({
    featureType: tSpecialOptional(FeatureTypeStruct()),
    amount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<FeatureDto>);

export type RoomDto = {
    roomType?: RoomType;
    amount?: number;
};

export const RoomDtoStruct = (): T.Describe<RoomDto> => (T.type({
    roomType: tSpecialOptional(RoomTypeStruct()),
    amount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<RoomDto>);

export type FloorDto = {
    floorType?: FloorType;
    level?: number;
    area?: number;
    rooms: RoomDto[];
};

export const FloorDtoStruct = (): T.Describe<FloorDto> => (T.type({
    floorType: tSpecialOptional(FloorTypeStruct()),
    level: tSpecialOptional(T.number()),
    area: tSpecialOptional(T.number()),
    rooms: T.array(RoomDtoStruct()),
}) as unknown as T.Describe<FloorDto>);

export type DesignDto = {
    id: number;
    price?: number;
    municipalityFees?: number;
    advancePayment?: number;
    finalPayment?: number;
    currencyType?: CurrencyType;
    picturesMainIds: string[];
    picturesExteriorIds: string[];
    picturesInteriorIds: string[];
    picturesLandscapeIds: string[];
    picturesLayoutsIds: string[];
    youtubeLink: string;
    features: FeatureDto[];
    approverId?: number;
    architectId?: number;
    companyId?: number;
    numberOfBedrooms?: number;
    numberOfToilets?: number;
    requiredLandSize?: number;
    minimumWidth?: number;
    minimumLength?: number;
    landType?: LandType;
    totalBuiltUpArea?: number;
    structurePrice?: number;
    finishesPrice?: number;
    estimatedConstructionPrice?: number;
    quality?: QualityType;
    titleEn: string;
    titleAr?: string;
    inspirationDescriptionEn: string;
    inspirationDescriptionAr?: string;
    descriptionEn: string;
    descriptionAr?: string;
    floors: FloorDto[];
    sowTemplateId?: number;
    stageTemplateId?: number;
    isLiked?: boolean;
    consultantType?: ConsultantType;
    delivery?: string;
    propertyType?: PropertyType;
    projectFeatures: string[];
    projectFeaturesAr: string[];
    projectLocation?: string;
    projectLocationAr?: string;
    brochureLink?: string;
};

export const DesignDtoStruct = (): T.Describe<DesignDto> => (T.type({
    id: T.number(),
    price: tSpecialOptional(T.number()),
    municipalityFees: tSpecialOptional(T.number()),
    advancePayment: tSpecialOptional(T.number()),
    finalPayment: tSpecialOptional(T.number()),
    currencyType: tSpecialOptional(CurrencyTypeStruct()),
    picturesMainIds: T.array(T.string()),
    picturesExteriorIds: T.array(T.string()),
    picturesInteriorIds: T.array(T.string()),
    picturesLandscapeIds: T.array(T.string()),
    picturesLayoutsIds: T.array(T.string()),
    youtubeLink: T.string(),
    features: T.array(FeatureDtoStruct()),
    approverId: tSpecialOptional(T.number()),
    architectId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    numberOfBedrooms: tSpecialOptional(T.number()),
    numberOfToilets: tSpecialOptional(T.number()),
    requiredLandSize: tSpecialOptional(T.number()),
    minimumWidth: tSpecialOptional(T.number()),
    minimumLength: tSpecialOptional(T.number()),
    landType: tSpecialOptional(LandTypeStruct()),
    totalBuiltUpArea: tSpecialOptional(T.number()),
    structurePrice: tSpecialOptional(T.number()),
    finishesPrice: tSpecialOptional(T.number()),
    estimatedConstructionPrice: tSpecialOptional(T.number()),
    quality: tSpecialOptional(QualityTypeStruct()),
    titleEn: T.string(),
    titleAr: tSpecialOptional(T.string()),
    inspirationDescriptionEn: T.string(),
    inspirationDescriptionAr: tSpecialOptional(T.string()),
    descriptionEn: T.string(),
    descriptionAr: tSpecialOptional(T.string()),
    floors: T.array(FloorDtoStruct()),
    sowTemplateId: tSpecialOptional(T.number()),
    stageTemplateId: tSpecialOptional(T.number()),
    isLiked: tSpecialOptional(T.boolean()),
    consultantType: tSpecialOptional(ConsultantTypeStruct()),
    delivery: tSpecialOptional(T.string()),
    propertyType: tSpecialOptional(PropertyTypeStruct()),
    projectFeatures: T.array(T.string()),
    projectFeaturesAr: T.array(T.string()),
    projectLocation: tSpecialOptional(T.string()),
    projectLocationAr: tSpecialOptional(T.string()),
    brochureLink: tSpecialOptional(T.string()),
}) as unknown as T.Describe<DesignDto>);

export type DesignPreviewDto = {
    price?: number;
    municipalityFees?: number;
    advancePayment?: number;
    finalPayment?: number;
    currencyType?: CurrencyType;
    approverId?: number;
    architectId?: number;
    companyId?: number;
    totalBuiltUpArea?: number;
    structurePrice?: number;
    finishesPrice?: number;
    estimatedConstructionPrice?: number;
    quality?: QualityType;
    titleEn: string;
    titleAr?: string;
    floors: FloorDto[];
    imagesIds: string[];
    numberOfBedrooms?: number;
    numberOfToilets?: number;
    id: number;
    liked?: boolean;
    consultantType?: ConsultantType;
    delivery?: string;
    propertyType?: PropertyType;
    projectLocation?: string;
    projectLocationAr?: string;
};

export const DesignPreviewDtoStruct = (): T.Describe<DesignPreviewDto> => (T.type({
    price: tSpecialOptional(T.number()),
    municipalityFees: tSpecialOptional(T.number()),
    advancePayment: tSpecialOptional(T.number()),
    finalPayment: tSpecialOptional(T.number()),
    currencyType: tSpecialOptional(CurrencyTypeStruct()),
    approverId: tSpecialOptional(T.number()),
    architectId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    totalBuiltUpArea: tSpecialOptional(T.number()),
    structurePrice: tSpecialOptional(T.number()),
    finishesPrice: tSpecialOptional(T.number()),
    estimatedConstructionPrice: tSpecialOptional(T.number()),
    quality: tSpecialOptional(QualityTypeStruct()),
    titleEn: T.string(),
    titleAr: tSpecialOptional(T.string()),
    floors: T.array(FloorDtoStruct()),
    imagesIds: T.array(T.string()),
    numberOfBedrooms: tSpecialOptional(T.number()),
    numberOfToilets: tSpecialOptional(T.number()),
    id: T.number(),
    liked: tSpecialOptional(T.boolean()),
    consultantType: tSpecialOptional(ConsultantTypeStruct()),
    delivery: tSpecialOptional(T.string()),
    propertyType: tSpecialOptional(PropertyTypeStruct()),
    projectLocation: tSpecialOptional(T.string()),
    projectLocationAr: tSpecialOptional(T.string()),
}) as unknown as T.Describe<DesignPreviewDto>);

export type DesignOperationResult = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DesignOperationResultStruct = (): T.Describe<DesignOperationResult> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DesignOperationResult>);

export type GetDesignQueryResponse = {
    result: DesignDto;
};

export const GetDesignQueryResponseStruct = (): T.Describe<GetDesignQueryResponse> => (T.type({
    result: DesignDtoStruct(),
}) as unknown as T.Describe<GetDesignQueryResponse>);

export type GetRelatedDesignsResponse = {
    result: DesignPreviewDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetRelatedDesignsResponseStruct = (): T.Describe<GetRelatedDesignsResponse> => (T.type({
    result: T.array(DesignPreviewDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetRelatedDesignsResponse>);

export type GetDesignListQueryResponse = {
    result: DesignPreviewDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetDesignListQueryResponseStruct = (): T.Describe<GetDesignListQueryResponse> => (T.type({
    result: T.array(DesignPreviewDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetDesignListQueryResponse>);

export type GetDesignCountForFilterResponse = {
    result: number;
};

export const GetDesignCountForFilterResponseStruct = (): T.Describe<GetDesignCountForFilterResponse> => (T.type({
    result: T.number(),
}) as unknown as T.Describe<GetDesignCountForFilterResponse>);

export type CreateDesignCommand = undefined;

export const CreateDesignCommandStruct = () => T.literal(undefined);

export type GetDesignQuery = {
    id: number;
};

export const GetDesignQueryStruct = (): T.Describe<GetDesignQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetDesignQuery>);

export type GetRelatedDesignsQuery = {
    designId?: number;
    page?: number;
    pageSize?: number;
};

export const GetRelatedDesignsQueryStruct = (): T.Describe<GetRelatedDesignsQuery> => (T.type({
    designId: tSpecialOptional(T.number()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetRelatedDesignsQuery>);

export type GetDesignListQuery = {
    page?: number;
    pageSize?: number;
    filter: DesignFilter;
};

export const GetDesignListQueryStruct = (): T.Describe<GetDesignListQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    filter: DesignFilterStruct(),
}) as unknown as T.Describe<GetDesignListQuery>);

export type GetDesignCountForFilterQuery = {
    filter: DesignFilter;
};

export const GetDesignCountForFilterQueryStruct = (): T.Describe<GetDesignCountForFilterQuery> => (T.type({
    filter: DesignFilterStruct(),
}) as unknown as T.Describe<GetDesignCountForFilterQuery>);

export type DeleteDesignCommand = {
    id: number;
};

export const DeleteDesignCommandStruct = (): T.Describe<DeleteDesignCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteDesignCommand>);

export type LikeDesignCommand = {
    designId: number;
};

export const LikeDesignCommandStruct = (): T.Describe<LikeDesignCommand> => (T.type({
    designId: T.number(),
}) as unknown as T.Describe<LikeDesignCommand>);

export enum LandType {
    none = 0,
    residential = 1,
    commercial = 2,
}

export const LandTypeStruct = () => T.enums([
    LandType.none,
    LandType.residential,
    LandType.commercial,
]);

export enum PropertyType {
    none = 0,
    villa = 1,
    twinVilla = 2,
    apartment = 3,
    townHouse = 4,
    farmHouse = 5,
}

export const PropertyTypeStruct = () => T.enums([
    PropertyType.none,
    PropertyType.villa,
    PropertyType.twinVilla,
    PropertyType.apartment,
    PropertyType.townHouse,
    PropertyType.farmHouse,
]);

export enum RoomType {
    none = 0,
    masterBedRoom = 1,
    bedRoom = 2,
    livingRoom = 3,
    maidRoom = 4,
    majlis = 5,
    kitchen = 6,
    dining = 7,
    toilet = 8,
    garage = 9,
    bathRoom = 10,
    guestRoom = 11,
    guestDining = 12,
    multiPurpose = 13,
    laundry = 14,
    store = 15,
    balconies = 16,
    balcony = 17,
    openKitchen = 18,
    closedKitchen = 19,
    pantry = 20,
    driverRoom = 21,
    outdoorGrill = 22,
    gym = 23,
    rooftopSeating = 24,
    informalSeating = 25,
    familySeating = 26,
    receptionHall = 27,
    office = 28,
    library = 29,
    swimmingPool = 30,
    storage = 31,
}

export const RoomTypeStruct = () => T.enums([
    RoomType.none,
    RoomType.masterBedRoom,
    RoomType.bedRoom,
    RoomType.livingRoom,
    RoomType.maidRoom,
    RoomType.majlis,
    RoomType.kitchen,
    RoomType.dining,
    RoomType.toilet,
    RoomType.garage,
    RoomType.bathRoom,
    RoomType.guestRoom,
    RoomType.guestDining,
    RoomType.multiPurpose,
    RoomType.laundry,
    RoomType.store,
    RoomType.balconies,
    RoomType.balcony,
    RoomType.openKitchen,
    RoomType.closedKitchen,
    RoomType.pantry,
    RoomType.driverRoom,
    RoomType.outdoorGrill,
    RoomType.gym,
    RoomType.rooftopSeating,
    RoomType.informalSeating,
    RoomType.familySeating,
    RoomType.receptionHall,
    RoomType.office,
    RoomType.library,
    RoomType.swimmingPool,
    RoomType.storage,
]);

export enum CurrencyType {
    none = 0,
    omr = 1,
    usd = 2,
    eur = 3,
}

export const CurrencyTypeStruct = () => T.enums([
    CurrencyType.none,
    CurrencyType.omr,
    CurrencyType.usd,
    CurrencyType.eur,
]);

export enum FeatureType {
    none = 0,
    pool = 1,
    rooftopSeating = 2,
    gym = 3,
    office = 4,
}

export const FeatureTypeStruct = () => T.enums([
    FeatureType.none,
    FeatureType.pool,
    FeatureType.rooftopSeating,
    FeatureType.gym,
    FeatureType.office,
]);

export enum QualityType {
    economical = 0,
    standard = 1,
    premium = 2,
}

export const QualityTypeStruct = () => T.enums([
    QualityType.economical,
    QualityType.standard,
    QualityType.premium,
]);

export enum FloorType {
    none = 0,
    basement = 1,
    ground = 2,
    floor = 3,
    penthouse = 4,
}

export const FloorTypeStruct = () => T.enums([
    FloorType.none,
    FloorType.basement,
    FloorType.ground,
    FloorType.floor,
    FloorType.penthouse,
]);

export enum ConsultantType {
    none = 0,
    architect = 1,
    developer = 2,
}

export const ConsultantTypeStruct = () => T.enums([
    ConsultantType.none,
    ConsultantType.architect,
    ConsultantType.developer,
]);

export const execCreateDesignCommand = restClient.encloseQuery<CreateDesignCommand, DesignOperationResult>(
  props => T.create(props, CreateDesignCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/design/createdesigncommand',
    props,
  );
 },
 result => T.create(result, DesignOperationResultStruct()),
);

export const execGetDesignQuery = restClient.encloseQuery<GetDesignQuery, GetDesignQueryResponse>(
  props => T.create(props, GetDesignQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/design/getdesignquery/{id}',
    props,
  );
 },
 result => T.create(result, GetDesignQueryResponseStruct()),
);

export const execGetRelatedDesignsQuery = restClient.encloseQuery<GetRelatedDesignsQuery, GetRelatedDesignsResponse>(
  props => T.create(props, GetRelatedDesignsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/design/getrelateddesignsquery',
    props,
  );
 },
 result => T.create(result, GetRelatedDesignsResponseStruct()),
);

export const execGetDesignListQuery = restClient.encloseQuery<GetDesignListQuery, GetDesignListQueryResponse>(
  props => T.create(props, GetDesignListQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/design/getdesignlistquery',
    props,
  );
 },
 result => T.create(result, GetDesignListQueryResponseStruct()),
);

export const execGetDesignCountForFilterQuery = restClient.encloseQuery<GetDesignCountForFilterQuery, GetDesignCountForFilterResponse>(
  props => T.create(props, GetDesignCountForFilterQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/design/getdesigncountforfilterquery',
    props,
  );
 },
 result => T.create(result, GetDesignCountForFilterResponseStruct()),
);

export const execDeleteDesignCommand = restClient.encloseQuery<DeleteDesignCommand, DesignOperationResult>(
  props => T.create(props, DeleteDesignCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/design/deletedesigncommand/{id}',
    props,
  );
 },
 result => T.create(result, DesignOperationResultStruct()),
);

export const execLikeDesignCommand = restClient.encloseQuery<LikeDesignCommand, DesignOperationResult>(
  props => T.create(props, LikeDesignCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/design/likedesigncommand',
    props,
  );
 },
 result => T.create(result, DesignOperationResultStruct()),
);
