// @ts-ignore
// @ts-nocheck
/* Options:
Date: 2024-10-08 15:47:55
Version: 6.21
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://10.42.3.173:5000/

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

export interface IPaginatedRequest
{
    page?: number;
    pageSize?: number;
}

export class NumericRange
{
    public min?: number;
    public max?: number;

    public constructor(init?: Partial<NumericRange>) { (Object as any).assign(this, init); }
}

export enum LandType
{
    None = 0,
    Residential = 1,
    Commercial = 2,
}

export enum PropertyType
{
    None = 0,
    Villa = 1,
    TwinVilla = 2,
    Apartment = 3,
    TownHouse = 4,
    FarmHouse = 5,
}

export class FloorAreaRange
{
    public level?: number;
    public floorArea: NumericRange;

    public constructor(init?: Partial<FloorAreaRange>) { (Object as any).assign(this, init); }
}

export enum RoomType
{
    None = 0,
    MasterBedRoom = 1,
    BedRoom = 2,
    LivingRoom = 3,
    MaidRoom = 4,
    Majlis = 5,
    Kitchen = 6,
    Dining = 7,
    Toilet = 8,
    Garage = 9,
    BathRoom = 10,
    GuestRoom = 11,
    GuestDining = 12,
    MultiPurpose = 13,
    Laundry = 14,
    Store = 15,
    Balconies = 16,
    Balcony = 17,
    OpenKitchen = 18,
    ClosedKitchen = 19,
    Pantry = 20,
    DriverRoom = 21,
    OutdoorGrill = 22,
    Gym = 23,
    RooftopSeating = 24,
    InformalSeating = 25,
    FamilySeating = 26,
    ReceptionHall = 27,
    Office = 28,
    Library = 29,
    SwimmingPool = 30,
    Storage = 31,
}

export class RoomRequirement
{
    public roomType?: RoomType;
    public rangeAmount: NumericRange;

    public constructor(init?: Partial<RoomRequirement>) { (Object as any).assign(this, init); }
}

export class DesignFilter
{
    public name?: string;
    public price?: NumericRange;
    public landType?: LandType;
    public propertyType?: PropertyType;
    public liked?: boolean;
    public buildUpArea?: number;
    public floorAreaRanges?: FloorAreaRange[];
    public roomRequirements?: RoomRequirement[];

    public constructor(init?: Partial<DesignFilter>) { (Object as any).assign(this, init); }
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

export enum CurrencyType
{
    None = 0,
    Omr = 1,
    Usd = 2,
    Eur = 3,
}

export enum FeatureType
{
    None = 0,
    Pool = 1,
    RooftopSeating = 2,
    Gym = 3,
    Office = 4,
}

export class FeatureDto implements IFeature
{
    public featureType?: FeatureType;
    public amount?: number;

    public constructor(init?: Partial<FeatureDto>) { (Object as any).assign(this, init); }
}

export enum QualityType
{
    Economical = 0,
    Standard = 1,
    Premium = 2,
}

export enum FloorType
{
    None = 0,
    Basement = 1,
    Ground = 2,
    Floor = 3,
    Penthouse = 4,
}

export class RoomDto implements IRoom
{
    public roomType?: RoomType;
    public amount?: number;

    public constructor(init?: Partial<RoomDto>) { (Object as any).assign(this, init); }
}

export class FloorDto implements IFloor
{
    public floorType?: FloorType;
    public level?: number;
    public area?: number;
    public rooms: RoomDto[];

    public constructor(init?: Partial<FloorDto>) { (Object as any).assign(this, init); }
}

export enum ConsultantType
{
    None = 0,
    Architect = 1,
    Developer = 2,
}

export class DesignDto implements IHasPrice, IHasMedia, IHasCreatorId, IHasDescriptiveFeatures, IHasCalculatedValues, IHasTitle, IHasDescription, IHasLike
{
    public id: number;
    public price?: number;
    public municipalityFees?: number;
    public advancePayment?: number;
    public finalPayment?: number;
    public currencyType?: CurrencyType;
    public picturesMainIds: string[];
    public picturesExteriorIds: string[];
    public picturesInteriorIds: string[];
    public picturesLandscapeIds: string[];
    public picturesLayoutsIds: string[];
    public youtubeLink: string;
    public features: FeatureDto[];
    public approverId?: number;
    public architectId?: number;
    public companyId?: number;
    public numberOfBedrooms?: number;
    public numberOfToilets?: number;
    public requiredLandSize?: number;
    public minimumWidth?: number;
    public minimumLength?: number;
    public landType?: LandType;
    public totalBuiltUpArea?: number;
    public structurePrice?: number;
    public finishesPrice?: number;
    public estimatedConstructionPrice?: number;
    public quality?: QualityType;
    public titleEn: string;
    public titleAr: string;
    public inspirationDescriptionEn: string;
    public inspirationDescriptionAr: string;
    public descriptionEn: string;
    public descriptionAr: string;
    public floors: FloorDto[];
    public sowTemplateId?: number;
    public stageTemplateId?: number;
    public isLiked?: boolean;
    public consultantType?: ConsultantType;
    public delivery?: string;
    public propertyType?: PropertyType;
    public projectFeatures: string[];
    public projectFeaturesAr: string[];
    public projectLocation?: string;
    public projectLocationAr?: string;
    public brochureLink?: string;

    public constructor(init?: Partial<DesignDto>) { (Object as any).assign(this, init); }
}

export class BaseSingleResponse<T>
{
    public result: T;

    public constructor(init?: Partial<BaseSingleResponse<T>>) { (Object as any).assign(this, init); }
}

export class DesignPreviewDto implements IHasTitle, IHasCreatorId, IHasCalculatedValues, IHasPrice, IHasRoomsCount
{
    public price?: number;
    public municipalityFees?: number;
    public advancePayment?: number;
    public finalPayment?: number;
    public currencyType?: CurrencyType;
    public approverId?: number;
    public architectId?: number;
    public companyId?: number;
    public totalBuiltUpArea?: number;
    public structurePrice?: number;
    public finishesPrice?: number;
    public estimatedConstructionPrice?: number;
    public quality?: QualityType;
    public titleEn: string;
    public titleAr: string;
    public floors: FloorDto[];
    public imagesIds: string[];
    public numberOfBedrooms?: number;
    public numberOfToilets?: number;
    public id: number;
    public liked?: boolean;
    public consultantType?: ConsultantType;
    public delivery?: string;
    public propertyType?: PropertyType;
    public projectLocation?: string;
    public projectLocationAr?: string;

    public constructor(init?: Partial<DesignPreviewDto>) { (Object as any).assign(this, init); }
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

export interface IHasPrice
{
    price?: number;
    currencyType?: CurrencyType;
    municipalityFees?: number;
    advancePayment?: number;
    finalPayment?: number;
}

export interface IHasMedia
{
    picturesMainIds: string[];
    picturesExteriorIds: string[];
    picturesInteriorIds: string[];
    picturesLandscapeIds: string[];
    picturesLayoutsIds: string[];
    youtubeLink: string;
}

export interface IHasCreatorId
{
    approverId?: number;
    architectId?: number;
    companyId?: number;
}

export interface IHasDescriptiveFeatures extends IHasRoomsCount
{
    requiredLandSize?: number;
    minimumWidth?: number;
    minimumLength?: number;
    landType?: LandType;
}

export interface IHasRoomsCount
{
    numberOfBedrooms?: number;
    numberOfToilets?: number;
}

export interface IHasCalculatedValues
{
    totalBuiltUpArea?: number;
    structurePrice?: number;
    finishesPrice?: number;
    estimatedConstructionPrice?: number;
    quality?: QualityType;
}

export interface IHasTitle
{
    titleEn: string;
    titleAr: string;
}

export interface IHasDescription
{
    descriptionEn: string;
    descriptionAr: string;
    inspirationDescriptionEn: string;
    inspirationDescriptionAr: string;
}

export interface IHasLike
{
    isLiked?: boolean;
}

export interface IFeature
{
    featureType?: FeatureType;
    amount?: number;
}

export interface IFloor
{
    floorType?: FloorType;
    level?: number;
    area?: number;
}

export interface IRoom
{
    roomType?: RoomType;
    amount?: number;
}

export class DesignOperationResult extends OperationResult
{
    public id: number;

    public constructor(init?: Partial<DesignOperationResult>) { super(init); (Object as any).assign(this, init); }
}

export class GetDesignQueryResponse extends BaseSingleResponse<DesignDto>
{

    public constructor(init?: Partial<GetDesignQueryResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetRelatedDesignsResponse extends BaseMultipleResultResponse<DesignPreviewDto>
{

    public constructor(init?: Partial<GetRelatedDesignsResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetDesignListQueryResponse extends BaseMultipleResultResponse<DesignPreviewDto>
{

    public constructor(init?: Partial<GetDesignListQueryResponse>) { super(init); (Object as any).assign(this, init); }
}

export class GetDesignCountForFilterResponse extends BaseSingleResponse<number>
{

    public constructor(init?: Partial<GetDesignCountForFilterResponse>) { super(init); (Object as any).assign(this, init); }
}

// @Route("/design/createdesigncommand", "POST")
export class CreateDesignCommand implements IReturn<DesignOperationResult>
{

    public constructor(init?: Partial<CreateDesignCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateDesignCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new DesignOperationResult(); }
}

// @Route("/design/getdesignquery/{id}", "GET")
export class GetDesignQuery implements IReturn<GetDesignQueryResponse>
{
    public id: number;

    public constructor(init?: Partial<GetDesignQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetDesignQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetDesignQueryResponse(); }
}

// @Route("/design/getrelateddesignsquery", "GET")
export class GetRelatedDesignsQuery implements IReturn<GetRelatedDesignsResponse>, IGet, IPaginatedRequest
{
    public designId?: number;
    public page?: number;
    public pageSize?: number;

    public constructor(init?: Partial<GetRelatedDesignsQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetRelatedDesignsQuery'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetRelatedDesignsResponse(); }
}

// @Route("/design/getdesignlistquery", "POST")
export class GetDesignListQuery implements IReturn<GetDesignListQueryResponse>, IPaginatedRequest
{
    public page?: number;
    public pageSize?: number;
    public filter: DesignFilter;

    public constructor(init?: Partial<GetDesignListQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetDesignListQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GetDesignListQueryResponse(); }
}

// @Route("/design/getdesigncountforfilterquery", "POST")
export class GetDesignCountForFilterQuery implements IReturn<GetDesignCountForFilterResponse>
{
    public filter: DesignFilter;

    public constructor(init?: Partial<GetDesignCountForFilterQuery>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetDesignCountForFilterQuery'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GetDesignCountForFilterResponse(); }
}

// @Route("/design/deletedesigncommand/{id}", "DELETE")
export class DeleteDesignCommand implements IReturn<DesignOperationResult>
{
    public id: number;

    public constructor(init?: Partial<DeleteDesignCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteDesignCommand'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() { return new DesignOperationResult(); }
}

// @Route("/design/likedesigncommand", "POST")
export class LikeDesignCommand implements IReturn<DesignOperationResult>
{
    // @Required()
    public designId: number;

    public constructor(init?: Partial<LikeDesignCommand>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'LikeDesignCommand'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new DesignOperationResult(); }
}

