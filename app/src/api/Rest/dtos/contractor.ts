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

export type ShortConsultantGovernorateDto = {
    price?: number;
    wilayatId?: number;
    governorateId?: number;
};

export const ShortConsultantGovernorateDtoStruct = (): T.Describe<ShortConsultantGovernorateDto> => (T.type({
    price: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ShortConsultantGovernorateDto>);

export type CompanySort = {
    idIsAscending?: boolean;
    createdDateIsAscending?: boolean;
    modifiedDateIsAscending?: boolean;
    statusIsAscending?: boolean;
    ownerIdIsAscending?: boolean;
    nameIsAscending?: boolean;
    emailIsAscending?: boolean;
    phoneIsAscending?: boolean;
    headOfficeGovernorateIdIsAscending?: boolean;
    headOfficeWilayatIdIsAscending?: boolean;
    crNumberIsAscending?: boolean;
    crStartDateIsAscending?: boolean;
    crExpirationDateIsAscending?: boolean;
    projectDeliveredIsAscending?: boolean;
    projectWorkedAtOnceIsAscending?: boolean;
    largestProjectAwardIsAscending?: boolean;
    failedCompleteAwardedWorkIsAscending?: boolean;
    anyJudgmentsPendingOrOutstandingIsAscending?: boolean;
    measuresToMaintainQualityIsAscending?: boolean;
    otherPlanningSoftwareIsAscending?: boolean;
    projectAwardedIsAscending?: boolean;
    projectParticipatedIsAscending?: boolean;
    lastActivityIsAscending?: boolean;
};

export const CompanySortStruct = (): T.Describe<CompanySort> => (T.type({
    idIsAscending: tSpecialOptional(T.boolean()),
    createdDateIsAscending: tSpecialOptional(T.boolean()),
    modifiedDateIsAscending: tSpecialOptional(T.boolean()),
    statusIsAscending: tSpecialOptional(T.boolean()),
    ownerIdIsAscending: tSpecialOptional(T.boolean()),
    nameIsAscending: tSpecialOptional(T.boolean()),
    emailIsAscending: tSpecialOptional(T.boolean()),
    phoneIsAscending: tSpecialOptional(T.boolean()),
    headOfficeGovernorateIdIsAscending: tSpecialOptional(T.boolean()),
    headOfficeWilayatIdIsAscending: tSpecialOptional(T.boolean()),
    crNumberIsAscending: tSpecialOptional(T.boolean()),
    crStartDateIsAscending: tSpecialOptional(T.boolean()),
    crExpirationDateIsAscending: tSpecialOptional(T.boolean()),
    projectDeliveredIsAscending: tSpecialOptional(T.boolean()),
    projectWorkedAtOnceIsAscending: tSpecialOptional(T.boolean()),
    largestProjectAwardIsAscending: tSpecialOptional(T.boolean()),
    failedCompleteAwardedWorkIsAscending: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstandingIsAscending: tSpecialOptional(T.boolean()),
    measuresToMaintainQualityIsAscending: tSpecialOptional(T.boolean()),
    otherPlanningSoftwareIsAscending: tSpecialOptional(T.boolean()),
    projectAwardedIsAscending: tSpecialOptional(T.boolean()),
    projectParticipatedIsAscending: tSpecialOptional(T.boolean()),
    lastActivityIsAscending: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CompanySort>);

export type ConsultantSort = {
    yoursYearsOfExperienceIsAscending?: boolean;
    everyDesignPackageSizeIsAscending?: boolean;
    everyDesignPackagePriceIsAscending?: boolean;
    provideDesignServiceIsAscending?: boolean;
    provideSupervisionServiceIsAscending?: boolean;
    idIsAscending?: boolean;
    createdDateIsAscending?: boolean;
    modifiedDateIsAscending?: boolean;
    statusIsAscending?: boolean;
    ownerIdIsAscending?: boolean;
    nameIsAscending?: boolean;
    emailIsAscending?: boolean;
    phoneIsAscending?: boolean;
    headOfficeGovernorateIdIsAscending?: boolean;
    headOfficeWilayatIdIsAscending?: boolean;
    crNumberIsAscending?: boolean;
    crStartDateIsAscending?: boolean;
    crExpirationDateIsAscending?: boolean;
    projectDeliveredIsAscending?: boolean;
    projectWorkedAtOnceIsAscending?: boolean;
    largestProjectAwardIsAscending?: boolean;
    failedCompleteAwardedWorkIsAscending?: boolean;
    anyJudgmentsPendingOrOutstandingIsAscending?: boolean;
    measuresToMaintainQualityIsAscending?: boolean;
    otherPlanningSoftwareIsAscending?: boolean;
    projectAwardedIsAscending?: boolean;
    projectParticipatedIsAscending?: boolean;
    lastActivityIsAscending?: boolean;
};

export const ConsultantSortStruct = (): T.Describe<ConsultantSort> => (T.type({
    yoursYearsOfExperienceIsAscending: tSpecialOptional(T.boolean()),
    everyDesignPackageSizeIsAscending: tSpecialOptional(T.boolean()),
    everyDesignPackagePriceIsAscending: tSpecialOptional(T.boolean()),
    provideDesignServiceIsAscending: tSpecialOptional(T.boolean()),
    provideSupervisionServiceIsAscending: tSpecialOptional(T.boolean()),
    idIsAscending: tSpecialOptional(T.boolean()),
    createdDateIsAscending: tSpecialOptional(T.boolean()),
    modifiedDateIsAscending: tSpecialOptional(T.boolean()),
    statusIsAscending: tSpecialOptional(T.boolean()),
    ownerIdIsAscending: tSpecialOptional(T.boolean()),
    nameIsAscending: tSpecialOptional(T.boolean()),
    emailIsAscending: tSpecialOptional(T.boolean()),
    phoneIsAscending: tSpecialOptional(T.boolean()),
    headOfficeGovernorateIdIsAscending: tSpecialOptional(T.boolean()),
    headOfficeWilayatIdIsAscending: tSpecialOptional(T.boolean()),
    crNumberIsAscending: tSpecialOptional(T.boolean()),
    crStartDateIsAscending: tSpecialOptional(T.boolean()),
    crExpirationDateIsAscending: tSpecialOptional(T.boolean()),
    projectDeliveredIsAscending: tSpecialOptional(T.boolean()),
    projectWorkedAtOnceIsAscending: tSpecialOptional(T.boolean()),
    largestProjectAwardIsAscending: tSpecialOptional(T.boolean()),
    failedCompleteAwardedWorkIsAscending: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstandingIsAscending: tSpecialOptional(T.boolean()),
    measuresToMaintainQualityIsAscending: tSpecialOptional(T.boolean()),
    otherPlanningSoftwareIsAscending: tSpecialOptional(T.boolean()),
    projectAwardedIsAscending: tSpecialOptional(T.boolean()),
    projectParticipatedIsAscending: tSpecialOptional(T.boolean()),
    lastActivityIsAscending: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ConsultantSort>);

export type ConsultantFilter = {
    name?: string;
    designBudget?: number;
    productIds?: number[];
    averageRating?: number;
    governorateIds?: number[];
};

export const ConsultantFilterStruct = (): T.Describe<ConsultantFilter> => (T.type({
    name: tSpecialOptional(T.string()),
    designBudget: tSpecialOptional(T.number()),
    productIds: tSpecialOptional(T.array(T.number())),
    averageRating: tSpecialOptional(T.number()),
    governorateIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<ConsultantFilter>);

export type ConsultantProductDto = {
    isChecked?: boolean;
    price?: number;
    productId?: number;
    companyId?: number;
    id: number;
};

export const ConsultantProductDtoStruct = (): T.Describe<ConsultantProductDto> => (T.type({
    isChecked: tSpecialOptional(T.boolean()),
    price: tSpecialOptional(T.number()),
    productId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ConsultantProductDto>);

export type ConsultantGovernorateDto = {
    price?: number;
    wilayatId?: number;
    companyId?: number;
    governorateId?: number;
    id: number;
};

export const ConsultantGovernorateDtoStruct = (): T.Describe<ConsultantGovernorateDto> => (T.type({
    price: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ConsultantGovernorateDto>);

export type ConsultantOrganizationDto = {
    organization?: ConsultantOrganization;
    otherOrganization?: string;
    companyId?: number;
    id: number;
};

export const ConsultantOrganizationDtoStruct = (): T.Describe<ConsultantOrganizationDto> => (T.type({
    organization: tSpecialOptional(ConsultantOrganizationStruct()),
    otherOrganization: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ConsultantOrganizationDto>);

export type ConsultantDesignServiceDto = {
    landSizeFrom?: number;
    landSizeTo?: number;
    price?: number;
    serviceUnits?: number[];
    companyId?: number;
    id: number;
};

export const ConsultantDesignServiceDtoStruct = (): T.Describe<ConsultantDesignServiceDto> => (T.type({
    landSizeFrom: tSpecialOptional(T.number()),
    landSizeTo: tSpecialOptional(T.number()),
    price: tSpecialOptional(T.number()),
    serviceUnits: tSpecialOptional(T.array(T.number())),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ConsultantDesignServiceDto>);

export type ConsultantLinkedProfileDto = {
    consultantAffiliationType?: ConsultantAffiliationType;
    status?: LinkedProfileStatus;
    phone?: string;
    companyId?: number;
    userId?: number;
    id: number;
};

export const ConsultantLinkedProfileDtoStruct = (): T.Describe<ConsultantLinkedProfileDto> => (T.type({
    consultantAffiliationType: tSpecialOptional(ConsultantAffiliationTypeStruct()),
    status: tSpecialOptional(LinkedProfileStatusStruct()),
    phone: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    userId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ConsultantLinkedProfileDto>);

export type ConsultantProjectReviewDto = {
    averageGrade?: number;
    createdDate?: string;
    id: number;
    recommendation?: number;
    communication?: number;
    qualityOfWork?: number;
    speedOfWork?: number;
    management?: number;
    cooperation?: number;
    feedBack?: string;
    clientReferenceId?: number;
};

export const ConsultantProjectReviewDtoStruct = (): T.Describe<ConsultantProjectReviewDto> => (T.type({
    averageGrade: tSpecialOptional(T.number()),
    createdDate: tSpecialOptional(T.string()),
    id: T.number(),
    recommendation: tSpecialOptional(T.number()),
    communication: tSpecialOptional(T.number()),
    qualityOfWork: tSpecialOptional(T.number()),
    speedOfWork: tSpecialOptional(T.number()),
    management: tSpecialOptional(T.number()),
    cooperation: tSpecialOptional(T.number()),
    feedBack: tSpecialOptional(T.string()),
    clientReferenceId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ConsultantProjectReviewDto>);

export type ConsultantClientReferenceDto = {
    designType?: DesignType;
    review?: ConsultantProjectReviewDto;
    status?: ReviewStatus;
    id: number;
    clientName?: string;
    phoneNumber?: string;
    governorateId?: number;
    wilayatId?: number;
    projectValue?: number;
    projectCompletionDate?: string;
    imagesIds?: string[];
    companyId?: number;
    startDate?: string;
};

export const ConsultantClientReferenceDtoStruct = (): T.Describe<ConsultantClientReferenceDto> => (T.type({
    designType: tSpecialOptional(DesignTypeStruct()),
    review: tSpecialOptional(ConsultantProjectReviewDtoStruct()),
    status: tSpecialOptional(ReviewStatusStruct()),
    id: T.number(),
    clientName: tSpecialOptional(T.string()),
    phoneNumber: tSpecialOptional(T.string()),
    governorateId: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    projectValue: tSpecialOptional(T.number()),
    projectCompletionDate: tSpecialOptional(T.string()),
    imagesIds: tSpecialOptional(T.array(T.string())),
    companyId: tSpecialOptional(T.number()),
    startDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ConsultantClientReferenceDto>);

export type ResourceDto = {
    numberOfUnit?: number;
    specializationId?: number;
    companyId?: number;
    resourceType?: ResourceType;
    id: number;
};

export const ResourceDtoStruct = (): T.Describe<ResourceDto> => (T.type({
    numberOfUnit: tSpecialOptional(T.number()),
    specializationId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    resourceType: tSpecialOptional(ResourceTypeStruct()),
    id: T.number(),
}) as unknown as T.Describe<ResourceDto>);

export type MarketingInformationDto = {
    marketingService?: MarketingService;
    addresUrl?: string;
    companyId?: number;
    id: number;
};

export const MarketingInformationDtoStruct = (): T.Describe<MarketingInformationDto> => (T.type({
    marketingService: tSpecialOptional(MarketingServiceStruct()),
    addresUrl: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<MarketingInformationDto>);

export type JsonPatchElement = {
    operation?: OperationType;
    path: string;
    value: unknown;
};

export const JsonPatchElementStruct = (): T.Describe<JsonPatchElement> => (T.type({
    operation: tSpecialOptional(OperationTypeStruct()),
    path: T.string(),
    value: T.unknown(),
}) as unknown as T.Describe<JsonPatchElement>);

export type ContractorSort = {
    yoursYearsOfExperienceIsAscending?: boolean;
    chargeBlackProjectsIsAscending?: boolean;
    chargeTurnkeyProjectsIsAscending?: boolean;
    minimumProjectSizeIsAscending?: boolean;
    otherContractingCompaniesIsAscending?: boolean;
    idIsAscending?: boolean;
    createdDateIsAscending?: boolean;
    modifiedDateIsAscending?: boolean;
    statusIsAscending?: boolean;
    ownerIdIsAscending?: boolean;
    nameIsAscending?: boolean;
    emailIsAscending?: boolean;
    phoneIsAscending?: boolean;
    headOfficeGovernorateIdIsAscending?: boolean;
    headOfficeWilayatIdIsAscending?: boolean;
    crNumberIsAscending?: boolean;
    crStartDateIsAscending?: boolean;
    crExpirationDateIsAscending?: boolean;
    projectDeliveredIsAscending?: boolean;
    projectWorkedAtOnceIsAscending?: boolean;
    largestProjectAwardIsAscending?: boolean;
    failedCompleteAwardedWorkIsAscending?: boolean;
    anyJudgmentsPendingOrOutstandingIsAscending?: boolean;
    measuresToMaintainQualityIsAscending?: boolean;
    otherPlanningSoftwareIsAscending?: boolean;
    projectAwardedIsAscending?: boolean;
    projectParticipatedIsAscending?: boolean;
    lastActivityIsAscending?: boolean;
};

export const ContractorSortStruct = (): T.Describe<ContractorSort> => (T.type({
    yoursYearsOfExperienceIsAscending: tSpecialOptional(T.boolean()),
    chargeBlackProjectsIsAscending: tSpecialOptional(T.boolean()),
    chargeTurnkeyProjectsIsAscending: tSpecialOptional(T.boolean()),
    minimumProjectSizeIsAscending: tSpecialOptional(T.boolean()),
    otherContractingCompaniesIsAscending: tSpecialOptional(T.boolean()),
    idIsAscending: tSpecialOptional(T.boolean()),
    createdDateIsAscending: tSpecialOptional(T.boolean()),
    modifiedDateIsAscending: tSpecialOptional(T.boolean()),
    statusIsAscending: tSpecialOptional(T.boolean()),
    ownerIdIsAscending: tSpecialOptional(T.boolean()),
    nameIsAscending: tSpecialOptional(T.boolean()),
    emailIsAscending: tSpecialOptional(T.boolean()),
    phoneIsAscending: tSpecialOptional(T.boolean()),
    headOfficeGovernorateIdIsAscending: tSpecialOptional(T.boolean()),
    headOfficeWilayatIdIsAscending: tSpecialOptional(T.boolean()),
    crNumberIsAscending: tSpecialOptional(T.boolean()),
    crStartDateIsAscending: tSpecialOptional(T.boolean()),
    crExpirationDateIsAscending: tSpecialOptional(T.boolean()),
    projectDeliveredIsAscending: tSpecialOptional(T.boolean()),
    projectWorkedAtOnceIsAscending: tSpecialOptional(T.boolean()),
    largestProjectAwardIsAscending: tSpecialOptional(T.boolean()),
    failedCompleteAwardedWorkIsAscending: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstandingIsAscending: tSpecialOptional(T.boolean()),
    measuresToMaintainQualityIsAscending: tSpecialOptional(T.boolean()),
    otherPlanningSoftwareIsAscending: tSpecialOptional(T.boolean()),
    projectAwardedIsAscending: tSpecialOptional(T.boolean()),
    projectParticipatedIsAscending: tSpecialOptional(T.boolean()),
    lastActivityIsAscending: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ContractorSort>);

export type ContractorProductDto = {
    other?: string;
    productUnitId?: number;
    companyId?: number;
    id: number;
};

export const ContractorProductDtoStruct = (): T.Describe<ContractorProductDto> => (T.type({
    other: tSpecialOptional(T.string()),
    productUnitId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractorProductDto>);

export type ContractorServiceDto = {
    other?: string;
    serviceUnitId?: number;
    companyId?: number;
    id: number;
};

export const ContractorServiceDtoStruct = (): T.Describe<ContractorServiceDto> => (T.type({
    other: tSpecialOptional(T.string()),
    serviceUnitId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractorServiceDto>);

export type ContractorCompanyDto = {
    companyName?: string;
    crNumber?: string;
    manPower?: number;
    typeOfServiceOrProduct?: string;
    companyId?: number;
    id: number;
};

export const ContractorCompanyDtoStruct = (): T.Describe<ContractorCompanyDto> => (T.type({
    companyName: tSpecialOptional(T.string()),
    crNumber: tSpecialOptional(T.string()),
    manPower: tSpecialOptional(T.number()),
    typeOfServiceOrProduct: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractorCompanyDto>);

export type ContractorOrganizationDto = {
    organization?: ContractorOrganization;
    otherOrganization?: string;
    companyId?: number;
    id: number;
};

export const ContractorOrganizationDtoStruct = (): T.Describe<ContractorOrganizationDto> => (T.type({
    organization: tSpecialOptional(ContractorOrganizationStruct()),
    otherOrganization: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractorOrganizationDto>);

export type ContractorLinkedProfileDto = {
    contractorAffiliationType?: ContractorAffiliationType;
    companyId?: number;
    userId?: number;
    phone?: string;
    status?: LinkedProfileStatus;
    id: number;
};

export const ContractorLinkedProfileDtoStruct = (): T.Describe<ContractorLinkedProfileDto> => (T.type({
    contractorAffiliationType: tSpecialOptional(ContractorAffiliationTypeStruct()),
    companyId: tSpecialOptional(T.number()),
    userId: tSpecialOptional(T.number()),
    phone: tSpecialOptional(T.string()),
    status: tSpecialOptional(LinkedProfileStatusStruct()),
    id: T.number(),
}) as unknown as T.Describe<ContractorLinkedProfileDto>);

export type ContractorResourceDto = {
    machine?: string;
    numberOfUnit?: number;
    specializationId?: number;
    companyId?: number;
    resourceType?: ResourceType;
    id: number;
};

export const ContractorResourceDtoStruct = (): T.Describe<ContractorResourceDto> => (T.type({
    machine: tSpecialOptional(T.string()),
    numberOfUnit: tSpecialOptional(T.number()),
    specializationId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    resourceType: tSpecialOptional(ResourceTypeStruct()),
    id: T.number(),
}) as unknown as T.Describe<ContractorResourceDto>);

export type ContractorProjectReviewDto = {
    averageGrade?: number;
    createdDate?: string;
    id: number;
    recommendation?: number;
    communication?: number;
    qualityOfWork?: number;
    speedOfWork?: number;
    management?: number;
    cooperation?: number;
    feedBack?: string;
    clientReferenceId?: number;
};

export const ContractorProjectReviewDtoStruct = (): T.Describe<ContractorProjectReviewDto> => (T.type({
    averageGrade: tSpecialOptional(T.number()),
    createdDate: tSpecialOptional(T.string()),
    id: T.number(),
    recommendation: tSpecialOptional(T.number()),
    communication: tSpecialOptional(T.number()),
    qualityOfWork: tSpecialOptional(T.number()),
    speedOfWork: tSpecialOptional(T.number()),
    management: tSpecialOptional(T.number()),
    cooperation: tSpecialOptional(T.number()),
    feedBack: tSpecialOptional(T.string()),
    clientReferenceId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ContractorProjectReviewDto>);

export type ContractorClientReferenceDto = {
    projectType?: ConstructionType;
    review?: ContractorProjectReviewDto;
    status?: ReviewStatus;
    id: number;
    clientName?: string;
    phoneNumber?: string;
    governorateId?: number;
    wilayatId?: number;
    projectValue?: number;
    projectCompletionDate?: string;
    imagesIds?: string[];
    companyId?: number;
    startDate?: string;
};

export const ContractorClientReferenceDtoStruct = (): T.Describe<ContractorClientReferenceDto> => (T.type({
    projectType: tSpecialOptional(ConstructionTypeStruct()),
    review: tSpecialOptional(ContractorProjectReviewDtoStruct()),
    status: tSpecialOptional(ReviewStatusStruct()),
    id: T.number(),
    clientName: tSpecialOptional(T.string()),
    phoneNumber: tSpecialOptional(T.string()),
    governorateId: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    projectValue: tSpecialOptional(T.number()),
    projectCompletionDate: tSpecialOptional(T.string()),
    imagesIds: tSpecialOptional(T.array(T.string())),
    companyId: tSpecialOptional(T.number()),
    startDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ContractorClientReferenceDto>);

export type ContractorClientReferenceSort = {
    statusIsAscending?: boolean;
    idIsAscending?: boolean;
    createdDateIsAscending?: boolean;
    modifiedDateIsAscending?: boolean;
    clientNameIsAscending?: boolean;
    phoneNumberIsAscending?: boolean;
    governorateIdIsAscending?: boolean;
    wilayatIdIsAscending?: boolean;
    projectValueIsAscending?: boolean;
    projectTypeIsAscending?: boolean;
    projectCompletionDateIsAscending?: boolean;
};

export const ContractorClientReferenceSortStruct = (): T.Describe<ContractorClientReferenceSort> => (T.type({
    statusIsAscending: tSpecialOptional(T.boolean()),
    idIsAscending: tSpecialOptional(T.boolean()),
    createdDateIsAscending: tSpecialOptional(T.boolean()),
    modifiedDateIsAscending: tSpecialOptional(T.boolean()),
    clientNameIsAscending: tSpecialOptional(T.boolean()),
    phoneNumberIsAscending: tSpecialOptional(T.boolean()),
    governorateIdIsAscending: tSpecialOptional(T.boolean()),
    wilayatIdIsAscending: tSpecialOptional(T.boolean()),
    projectValueIsAscending: tSpecialOptional(T.boolean()),
    projectTypeIsAscending: tSpecialOptional(T.boolean()),
    projectCompletionDateIsAscending: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ContractorClientReferenceSort>);

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

export type CompanyDataDto = {
    companyId?: number;
    ownerId?: number;
    companyType?: CompanyType;
    companyStatus?: CompanyStatus;
    name?: string;
};

export const CompanyDataDtoStruct = (): T.Describe<CompanyDataDto> => (T.type({
    companyId: tSpecialOptional(T.number()),
    ownerId: tSpecialOptional(T.number()),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    companyStatus: tSpecialOptional(CompanyStatusStruct()),
    name: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CompanyDataDto>);

export type CompanySearchDto = {
    id: number;
    name?: string;
    companyLogoId?: string;
    status?: CompanyStatus;
    companyType?: CompanyType;
};

export const CompanySearchDtoStruct = (): T.Describe<CompanySearchDto> => (T.type({
    id: T.number(),
    name: tSpecialOptional(T.string()),
    companyLogoId: tSpecialOptional(T.string()),
    status: tSpecialOptional(CompanyStatusStruct()),
    companyType: tSpecialOptional(CompanyTypeStruct()),
}) as unknown as T.Describe<CompanySearchDto>);

export type CompanyDto = {
    id: number;
    marketings?: MarketingInformationDto[];
    status?: CompanyStatus;
    ownerId: number;
    companyLogoId?: string;
    name: string;
    nameInArabic?: string;
    email: string;
    phone: string;
    headOfficeGovernorateId: number;
    headOfficeWilayatId: number;
    crNumber: string;
    crStartDate: string;
    crExpirationDate: string;
    projectsDelivered?: number;
    projectsWorkedAtOnce?: number;
    largestProjectAwarded?: number;
    failedCompleteAwardedWork?: boolean;
    anyJudgmentsPendingOrOutstanding?: boolean;
    measuresToMaintainQuality: string;
    planningSoftware?: PlanningSoftware[];
    otherPlanningSoftware: string;
    additionalInformation: string;
    crCertificate?: string[];
    ownerNationalId?: string[];
    manpowerReportIssuedByMom?: string[];
    companyProfile?: string[];
    otherFiles?: string[];
    companyType?: CompanyType;
    ownerName?: string;
    ownerPhone?: string;
    ownerEmail?: string;
};

export const CompanyDtoStruct = (): T.Describe<CompanyDto> => (T.type({
    id: T.number(),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
    status: tSpecialOptional(CompanyStatusStruct()),
    ownerId: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
    name: T.string(),
    nameInArabic: tSpecialOptional(T.string()),
    email: T.string(),
    phone: T.string(),
    headOfficeGovernorateId: T.number(),
    headOfficeWilayatId: T.number(),
    crNumber: T.string(),
    crStartDate: T.string(),
    crExpirationDate: T.string(),
    projectsDelivered: tSpecialOptional(T.number()),
    projectsWorkedAtOnce: tSpecialOptional(T.number()),
    largestProjectAwarded: tSpecialOptional(T.number()),
    failedCompleteAwardedWork: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstanding: tSpecialOptional(T.boolean()),
    measuresToMaintainQuality: T.string(),
    planningSoftware: tSpecialOptional(T.array(PlanningSoftwareStruct())),
    otherPlanningSoftware: T.string(),
    additionalInformation: T.string(),
    crCertificate: tSpecialOptional(T.array(T.string())),
    ownerNationalId: tSpecialOptional(T.array(T.string())),
    manpowerReportIssuedByMom: tSpecialOptional(T.array(T.string())),
    companyProfile: tSpecialOptional(T.array(T.string())),
    otherFiles: tSpecialOptional(T.array(T.string())),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerName: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CompanyDto>);

export type CompanyLogoDto = {
    id: number;
    companyLogoId?: string;
};

export const CompanyLogoDtoStruct = (): T.Describe<CompanyLogoDto> => (T.type({
    id: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CompanyLogoDto>);

export type CompanyNamesDto = {
    name?: string;
    nameArabic?: string;
    id: number;
    companyLogoId?: string;
};

export const CompanyNamesDtoStruct = (): T.Describe<CompanyNamesDto> => (T.type({
    name: tSpecialOptional(T.string()),
    nameArabic: tSpecialOptional(T.string()),
    id: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CompanyNamesDto>);

export type CompanyInviteDto = {
    id: number;
    companyName?: string;
    email?: string;
    mobileNumber?: string;
};

export const CompanyInviteDtoStruct = (): T.Describe<CompanyInviteDto> => (T.type({
    id: T.number(),
    companyName: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    mobileNumber: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CompanyInviteDto>);

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

export type TempCompanyIdDto = {
    newCompanyId?: number;
    oldCompanyId?: number;
    companyType?: CompanyType;
};

export const TempCompanyIdDtoStruct = (): T.Describe<TempCompanyIdDto> => (T.type({
    newCompanyId: tSpecialOptional(T.number()),
    oldCompanyId: tSpecialOptional(T.number()),
    companyType: tSpecialOptional(CompanyTypeStruct()),
}) as unknown as T.Describe<TempCompanyIdDto>);

export type CompanyManagementDto = {
    id: number;
    name?: string;
    pendingPayments?: number;
    companyLogoId?: string;
    projectsParticipated?: number;
    projectsAwarded?: number;
    lastActivity?: string;
    status?: CompanyStatus;
    companyType?: CompanyType;
};

export const CompanyManagementDtoStruct = (): T.Describe<CompanyManagementDto> => (T.type({
    id: T.number(),
    name: tSpecialOptional(T.string()),
    pendingPayments: tSpecialOptional(T.number()),
    companyLogoId: tSpecialOptional(T.string()),
    projectsParticipated: tSpecialOptional(T.number()),
    projectsAwarded: tSpecialOptional(T.number()),
    lastActivity: tSpecialOptional(T.string()),
    status: tSpecialOptional(CompanyStatusStruct()),
    companyType: tSpecialOptional(CompanyTypeStruct()),
}) as unknown as T.Describe<CompanyManagementDto>);

export type CompanyStatusDto = {
    id: number;
    status?: CompanyStatus;
};

export const CompanyStatusDtoStruct = (): T.Describe<CompanyStatusDto> => (T.type({
    id: T.number(),
    status: tSpecialOptional(CompanyStatusStruct()),
}) as unknown as T.Describe<CompanyStatusDto>);

export type CompanyInformationDto = {
    name?: string;
    email?: string;
    phone?: string;
    id: number;
    companyLogoId?: string;
};

export const CompanyInformationDtoStruct = (): T.Describe<CompanyInformationDto> => (T.type({
    name: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    id: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CompanyInformationDto>);

export type ConsultantProjectStarsDto = {
    averageRecommendation?: number;
    averageCommunication?: number;
    averageQualityOfWork?: number;
    averageSpeedOfWork?: number;
    averageManagement?: number;
    averageCooperation?: number;
    overallAverageGrade?: number;
};

export const ConsultantProjectStarsDtoStruct = (): T.Describe<ConsultantProjectStarsDto> => (T.type({
    averageRecommendation: tSpecialOptional(T.number()),
    averageCommunication: tSpecialOptional(T.number()),
    averageQualityOfWork: tSpecialOptional(T.number()),
    averageSpeedOfWork: tSpecialOptional(T.number()),
    averageManagement: tSpecialOptional(T.number()),
    averageCooperation: tSpecialOptional(T.number()),
    overallAverageGrade: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ConsultantProjectStarsDto>);

export type ConsultantDto = {
    stars?: ConsultantProjectStarsDto;
    id: number;
    products?: ConsultantProductDto[];
    governorates?: ConsultantGovernorateDto[];
    registeredAt?: ConsultantOrganizationDto[];
    designServices?: ConsultantDesignServiceDto[];
    linkedProfiles?: ConsultantLinkedProfileDto[];
    references?: ConsultantClientReferenceDto[];
    provideDesignService?: boolean;
    provideSupervisionService?: boolean;
    yoursYearsOfExperience?: number;
    everyDesignPackageSize?: number;
    everyDesignPackagePrice?: number;
    resources?: ResourceDto[];
    marketings?: MarketingInformationDto[];
    status?: CompanyStatus;
    ownerId: number;
    companyLogoId?: string;
    name: string;
    nameInArabic?: string;
    email: string;
    phone: string;
    headOfficeGovernorateId: number;
    headOfficeWilayatId: number;
    crNumber: string;
    crStartDate: string;
    crExpirationDate: string;
    projectsDelivered?: number;
    projectsWorkedAtOnce?: number;
    largestProjectAwarded?: number;
    failedCompleteAwardedWork?: boolean;
    anyJudgmentsPendingOrOutstanding?: boolean;
    measuresToMaintainQuality: string;
    planningSoftware?: PlanningSoftware[];
    otherPlanningSoftware: string;
    additionalInformation: string;
    crCertificate?: string[];
    ownerNationalId?: string[];
    manpowerReportIssuedByMom?: string[];
    companyProfile?: string[];
    otherFiles?: string[];
    companyType?: CompanyType;
    ownerName?: string;
    ownerPhone?: string;
    ownerEmail?: string;
};

export const ConsultantDtoStruct = (): T.Describe<ConsultantDto> => (T.type({
    stars: tSpecialOptional(ConsultantProjectStarsDtoStruct()),
    id: T.number(),
    products: tSpecialOptional(T.array(ConsultantProductDtoStruct())),
    governorates: tSpecialOptional(T.array(ConsultantGovernorateDtoStruct())),
    registeredAt: tSpecialOptional(T.array(ConsultantOrganizationDtoStruct())),
    designServices: tSpecialOptional(T.array(ConsultantDesignServiceDtoStruct())),
    linkedProfiles: tSpecialOptional(T.array(ConsultantLinkedProfileDtoStruct())),
    references: tSpecialOptional(T.array(ConsultantClientReferenceDtoStruct())),
    provideDesignService: tSpecialOptional(T.boolean()),
    provideSupervisionService: tSpecialOptional(T.boolean()),
    yoursYearsOfExperience: tSpecialOptional(T.number()),
    everyDesignPackageSize: tSpecialOptional(T.number()),
    everyDesignPackagePrice: tSpecialOptional(T.number()),
    resources: tSpecialOptional(T.array(ResourceDtoStruct())),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
    status: tSpecialOptional(CompanyStatusStruct()),
    ownerId: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
    name: T.string(),
    nameInArabic: tSpecialOptional(T.string()),
    email: T.string(),
    phone: T.string(),
    headOfficeGovernorateId: T.number(),
    headOfficeWilayatId: T.number(),
    crNumber: T.string(),
    crStartDate: T.string(),
    crExpirationDate: T.string(),
    projectsDelivered: tSpecialOptional(T.number()),
    projectsWorkedAtOnce: tSpecialOptional(T.number()),
    largestProjectAwarded: tSpecialOptional(T.number()),
    failedCompleteAwardedWork: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstanding: tSpecialOptional(T.boolean()),
    measuresToMaintainQuality: T.string(),
    planningSoftware: tSpecialOptional(T.array(PlanningSoftwareStruct())),
    otherPlanningSoftware: T.string(),
    additionalInformation: T.string(),
    crCertificate: tSpecialOptional(T.array(T.string())),
    ownerNationalId: tSpecialOptional(T.array(T.string())),
    manpowerReportIssuedByMom: tSpecialOptional(T.array(T.string())),
    companyProfile: tSpecialOptional(T.array(T.string())),
    otherFiles: tSpecialOptional(T.array(T.string())),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerName: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ConsultantDto>);

export type ConsultantSelectionDto = {
    id: number;
    name?: string;
    companyLogoId?: string;
    pricePerSquareMeter?: number;
    yearsOfExperience?: number;
    numberOfEngineers?: number;
    numberOfServices?: number;
    totalVisits?: number;
    isInvited?: boolean;
    templateTimeOfProject?: number;
};

export const ConsultantSelectionDtoStruct = (): T.Describe<ConsultantSelectionDto> => (T.type({
    id: T.number(),
    name: tSpecialOptional(T.string()),
    companyLogoId: tSpecialOptional(T.string()),
    pricePerSquareMeter: tSpecialOptional(T.number()),
    yearsOfExperience: tSpecialOptional(T.number()),
    numberOfEngineers: tSpecialOptional(T.number()),
    numberOfServices: tSpecialOptional(T.number()),
    totalVisits: tSpecialOptional(T.number()),
    isInvited: tSpecialOptional(T.boolean()),
    templateTimeOfProject: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ConsultantSelectionDto>);

export type ConsultantProfileDto = {
    designServices?: ConsultantDesignServiceDto[];
    linkedProfiles?: ConsultantLinkedProfileDto[];
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    marketings?: MarketingInformationDto[];
};

export const ConsultantProfileDtoStruct = (): T.Describe<ConsultantProfileDto> => (T.type({
    designServices: tSpecialOptional(T.array(ConsultantDesignServiceDtoStruct())),
    linkedProfiles: tSpecialOptional(T.array(ConsultantLinkedProfileDtoStruct())),
    id: T.number(),
    name: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
}) as unknown as T.Describe<ConsultantProfileDto>);

export type LinkedProfileErrors = {
    alreadyAssign?: boolean;
};

export const LinkedProfileErrorsStruct = (): T.Describe<LinkedProfileErrors> => (T.type({
    alreadyAssign: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<LinkedProfileErrors>);

export type ContractorProjectStarsDto = {
    averageRecommendation?: number;
    averageCommunication?: number;
    averageQualityOfWork?: number;
    averageSpeedOfWork?: number;
    averageManagement?: number;
    averageCooperation?: number;
    overallAverageGrade?: number;
};

export const ContractorProjectStarsDtoStruct = (): T.Describe<ContractorProjectStarsDto> => (T.type({
    averageRecommendation: tSpecialOptional(T.number()),
    averageCommunication: tSpecialOptional(T.number()),
    averageQualityOfWork: tSpecialOptional(T.number()),
    averageSpeedOfWork: tSpecialOptional(T.number()),
    averageManagement: tSpecialOptional(T.number()),
    averageCooperation: tSpecialOptional(T.number()),
    overallAverageGrade: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ContractorProjectStarsDto>);

export type ContractorDto = {
    stars?: ContractorProjectStarsDto;
    id: number;
    yoursYearsOfExperience?: number;
    chargeBlackProjects?: number;
    chargeTurnkeyProjects?: number;
    companyRelationship?: CompanyRelationship;
    minimumProjectSize?: number;
    otherContractingCompanies?: boolean;
    governorates?: number[];
    products?: ContractorProductDto[];
    services?: ContractorServiceDto[];
    companies?: ContractorCompanyDto[];
    registeredAt?: ContractorOrganizationDto[];
    linkedProfiles?: ContractorLinkedProfileDto[];
    resources?: ContractorResourceDto[];
    references?: ContractorClientReferenceDto[];
    marketings?: MarketingInformationDto[];
    status?: CompanyStatus;
    ownerId: number;
    companyLogoId?: string;
    name: string;
    nameInArabic?: string;
    email: string;
    phone: string;
    headOfficeGovernorateId: number;
    headOfficeWilayatId: number;
    crNumber: string;
    crStartDate: string;
    crExpirationDate: string;
    projectsDelivered?: number;
    projectsWorkedAtOnce?: number;
    largestProjectAwarded?: number;
    failedCompleteAwardedWork?: boolean;
    anyJudgmentsPendingOrOutstanding?: boolean;
    measuresToMaintainQuality: string;
    planningSoftware?: PlanningSoftware[];
    otherPlanningSoftware: string;
    additionalInformation: string;
    crCertificate?: string[];
    ownerNationalId?: string[];
    manpowerReportIssuedByMom?: string[];
    companyProfile?: string[];
    otherFiles?: string[];
    companyType?: CompanyType;
    ownerName?: string;
    ownerPhone?: string;
    ownerEmail?: string;
};

export const ContractorDtoStruct = (): T.Describe<ContractorDto> => (T.type({
    stars: tSpecialOptional(ContractorProjectStarsDtoStruct()),
    id: T.number(),
    yoursYearsOfExperience: tSpecialOptional(T.number()),
    chargeBlackProjects: tSpecialOptional(T.number()),
    chargeTurnkeyProjects: tSpecialOptional(T.number()),
    companyRelationship: tSpecialOptional(CompanyRelationshipStruct()),
    minimumProjectSize: tSpecialOptional(T.number()),
    otherContractingCompanies: tSpecialOptional(T.boolean()),
    governorates: tSpecialOptional(T.array(T.number())),
    products: tSpecialOptional(T.array(ContractorProductDtoStruct())),
    services: tSpecialOptional(T.array(ContractorServiceDtoStruct())),
    companies: tSpecialOptional(T.array(ContractorCompanyDtoStruct())),
    registeredAt: tSpecialOptional(T.array(ContractorOrganizationDtoStruct())),
    linkedProfiles: tSpecialOptional(T.array(ContractorLinkedProfileDtoStruct())),
    resources: tSpecialOptional(T.array(ContractorResourceDtoStruct())),
    references: tSpecialOptional(T.array(ContractorClientReferenceDtoStruct())),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
    status: tSpecialOptional(CompanyStatusStruct()),
    ownerId: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
    name: T.string(),
    nameInArabic: tSpecialOptional(T.string()),
    email: T.string(),
    phone: T.string(),
    headOfficeGovernorateId: T.number(),
    headOfficeWilayatId: T.number(),
    crNumber: T.string(),
    crStartDate: T.string(),
    crExpirationDate: T.string(),
    projectsDelivered: tSpecialOptional(T.number()),
    projectsWorkedAtOnce: tSpecialOptional(T.number()),
    largestProjectAwarded: tSpecialOptional(T.number()),
    failedCompleteAwardedWork: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstanding: tSpecialOptional(T.boolean()),
    measuresToMaintainQuality: T.string(),
    planningSoftware: tSpecialOptional(T.array(PlanningSoftwareStruct())),
    otherPlanningSoftware: T.string(),
    additionalInformation: T.string(),
    crCertificate: tSpecialOptional(T.array(T.string())),
    ownerNationalId: tSpecialOptional(T.array(T.string())),
    manpowerReportIssuedByMom: tSpecialOptional(T.array(T.string())),
    companyProfile: tSpecialOptional(T.array(T.string())),
    otherFiles: tSpecialOptional(T.array(T.string())),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerName: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ContractorDto>);

export type ContractorBidViewDto = {
    id: number;
    name?: string;
    companyLogoId?: string;
    phone?: string;
    yearsOfExperience?: number;
    numberOfEngineers?: number;
    numberOfLabors?: number;
};

export const ContractorBidViewDtoStruct = (): T.Describe<ContractorBidViewDto> => (T.type({
    id: T.number(),
    name: tSpecialOptional(T.string()),
    companyLogoId: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    yearsOfExperience: tSpecialOptional(T.number()),
    numberOfEngineers: tSpecialOptional(T.number()),
    numberOfLabors: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ContractorBidViewDto>);

export type ContractorWithInviteStatusDto = {
    stars?: ContractorProjectStarsDto;
    reviewCount?: number;
    headOfficeGovernorateId?: number;
    headOfficeWilayatId?: number;
    projectsDelivered?: number;
    isInvited?: boolean;
    isSubmitted?: boolean;
    id: number;
    name?: string;
    companyLogoId?: string;
    phone?: string;
    yearsOfExperience?: number;
    numberOfEngineers?: number;
    numberOfLabors?: number;
};

export const ContractorWithInviteStatusDtoStruct = (): T.Describe<ContractorWithInviteStatusDto> => (T.type({
    stars: tSpecialOptional(ContractorProjectStarsDtoStruct()),
    reviewCount: tSpecialOptional(T.number()),
    headOfficeGovernorateId: tSpecialOptional(T.number()),
    headOfficeWilayatId: tSpecialOptional(T.number()),
    projectsDelivered: tSpecialOptional(T.number()),
    isInvited: tSpecialOptional(T.boolean()),
    isSubmitted: tSpecialOptional(T.boolean()),
    id: T.number(),
    name: tSpecialOptional(T.string()),
    companyLogoId: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    yearsOfExperience: tSpecialOptional(T.number()),
    numberOfEngineers: tSpecialOptional(T.number()),
    numberOfLabors: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ContractorWithInviteStatusDto>);

export type ContractorNameDto = {
    id: number;
    name?: string;
};

export const ContractorNameDtoStruct = (): T.Describe<ContractorNameDto> => (T.type({
    id: T.number(),
    name: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ContractorNameDto>);

export type ContractorProfileDto = {
    references?: ContractorClientReferenceDto[];
    stars?: ContractorProjectStarsDto;
    yoursYearsOfExperience?: number;
    projectsDelivered?: number;
    largestProjectAwarded?: number;
    projectsWorkedAtOnce?: number;
    governorates?: number[];
    registeredAt?: ContractorOrganizationDto[];
    resources?: ContractorResourceDto[];
    products?: ContractorProductDto[];
    services?: ContractorServiceDto[];
    planningSoftware?: PlanningSoftware[];
    measuresToMaintainQuality?: string;
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    marketings?: MarketingInformationDto[];
};

export const ContractorProfileDtoStruct = (): T.Describe<ContractorProfileDto> => (T.type({
    references: tSpecialOptional(T.array(ContractorClientReferenceDtoStruct())),
    stars: tSpecialOptional(ContractorProjectStarsDtoStruct()),
    yoursYearsOfExperience: tSpecialOptional(T.number()),
    projectsDelivered: tSpecialOptional(T.number()),
    largestProjectAwarded: tSpecialOptional(T.number()),
    projectsWorkedAtOnce: tSpecialOptional(T.number()),
    governorates: tSpecialOptional(T.array(T.number())),
    registeredAt: tSpecialOptional(T.array(ContractorOrganizationDtoStruct())),
    resources: tSpecialOptional(T.array(ContractorResourceDtoStruct())),
    products: tSpecialOptional(T.array(ContractorProductDtoStruct())),
    services: tSpecialOptional(T.array(ContractorServiceDtoStruct())),
    planningSoftware: tSpecialOptional(T.array(PlanningSoftwareStruct())),
    measuresToMaintainQuality: tSpecialOptional(T.string()),
    id: T.number(),
    name: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
}) as unknown as T.Describe<ContractorProfileDto>);

export type DictionaryDataDto = {
    displayName?: string;
    systemName?: string;
    translationKey?: string;
    id: number;
};

export const DictionaryDataDtoStruct = (): T.Describe<DictionaryDataDto> => (T.type({
    displayName: tSpecialOptional(T.string()),
    systemName: tSpecialOptional(T.string()),
    translationKey: tSpecialOptional(T.string()),
    id: T.number(),
}) as unknown as T.Describe<DictionaryDataDto>);

export type ContractorProductUnitDto = {
    orderNumber?: number;
    displayName?: string;
    systemName?: string;
    translationKey?: string;
    id: number;
};

export const ContractorProductUnitDtoStruct = (): T.Describe<ContractorProductUnitDto> => (T.type({
    orderNumber: tSpecialOptional(T.number()),
    displayName: tSpecialOptional(T.string()),
    systemName: tSpecialOptional(T.string()),
    translationKey: tSpecialOptional(T.string()),
    id: T.number(),
}) as unknown as T.Describe<ContractorProductUnitDto>);

export type SpecializationDto = {
    type?: ResourceType;
    displayName?: string;
    systemName?: string;
    translationKey?: string;
    id: number;
};

export const SpecializationDtoStruct = (): T.Describe<SpecializationDto> => (T.type({
    type: tSpecialOptional(ResourceTypeStruct()),
    displayName: tSpecialOptional(T.string()),
    systemName: tSpecialOptional(T.string()),
    translationKey: tSpecialOptional(T.string()),
    id: T.number(),
}) as unknown as T.Describe<SpecializationDto>);

export type CompanyStatisticDto = {
    id: number;
    rowCount?: number;
};

export const CompanyStatisticDtoStruct = (): T.Describe<CompanyStatisticDto> => (T.type({
    id: T.number(),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CompanyStatisticDto>);

export type UserManagementCompanyAssociationDto = {
    id: number;
    companyType?: CompanyType;
    affiliationType?: AffiliationType;
    status?: CompanyStatus;
    companyLogoId?: string;
    name?: string;
    linkedProfileStatus?: LinkedProfileStatus;
};

export const UserManagementCompanyAssociationDtoStruct = (): T.Describe<UserManagementCompanyAssociationDto> => (T.type({
    id: T.number(),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    affiliationType: tSpecialOptional(AffiliationTypeStruct()),
    status: tSpecialOptional(CompanyStatusStruct()),
    companyLogoId: tSpecialOptional(T.string()),
    name: tSpecialOptional(T.string()),
    linkedProfileStatus: tSpecialOptional(LinkedProfileStatusStruct()),
}) as unknown as T.Describe<UserManagementCompanyAssociationDto>);

export type CreateShortCompanyResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateShortCompanyResponseStruct = (): T.Describe<CreateShortCompanyResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateShortCompanyResponse>);

export type GetCompanyDataByPhoneNumberResponse = {
    result: CompanyDataDto;
};

export const GetCompanyDataByPhoneNumberResponseStruct = (): T.Describe<GetCompanyDataByPhoneNumberResponse> => (T.type({
    result: CompanyDataDtoStruct(),
}) as unknown as T.Describe<GetCompanyDataByPhoneNumberResponse>);

export type ListCompanyByCompanyNameResponse = {
    result: CompanySearchDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyByCompanyNameResponseStruct = (): T.Describe<ListCompanyByCompanyNameResponse> => (T.type({
    result: T.array(CompanySearchDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyByCompanyNameResponse>);

export type GetCompanyDtoByIdQueryResponse = {
    result: CompanyDto;
};

export const GetCompanyDtoByIdQueryResponseStruct = (): T.Describe<GetCompanyDtoByIdQueryResponse> => (T.type({
    result: CompanyDtoStruct(),
}) as unknown as T.Describe<GetCompanyDtoByIdQueryResponse>);

export type ListCompanyNamesByIdsResponse = {
    result?: CompanyNamesDto[];
};

export const ListCompanyNamesByIdsResponseStruct = (): T.Describe<ListCompanyNamesByIdsResponse> => (T.type({
    result: tSpecialOptional(T.array(CompanyNamesDtoStruct())),
}) as unknown as T.Describe<ListCompanyNamesByIdsResponse>);

export type SetCompanyOwnerIdResponse = {
    isSuccess?: boolean;
};

export const SetCompanyOwnerIdResponseStruct = (): T.Describe<SetCompanyOwnerIdResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<SetCompanyOwnerIdResponse>);

export type MakeOwnerResponse = {
    isSuccess?: boolean;
};

export const MakeOwnerResponseStruct = (): T.Describe<MakeOwnerResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<MakeOwnerResponse>);

export type ListCompanyInviteResponse = {
    result: CompanyInviteDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyInviteResponseStruct = (): T.Describe<ListCompanyInviteResponse> => (T.type({
    result: T.array(CompanyInviteDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyInviteResponse>);

export type GetCompanyInviteResponse = {
    result: CompanyInviteDto;
};

export const GetCompanyInviteResponseStruct = (): T.Describe<GetCompanyInviteResponse> => (T.type({
    result: CompanyInviteDtoStruct(),
}) as unknown as T.Describe<GetCompanyInviteResponse>);

export type CreateCompanyInviteResponse = {
    notificationWasSent?: boolean;
    result: ProfileDto;
};

export const CreateCompanyInviteResponseStruct = (): T.Describe<CreateCompanyInviteResponse> => (T.type({
    notificationWasSent: tSpecialOptional(T.boolean()),
    result: ProfileDtoStruct(),
}) as unknown as T.Describe<CreateCompanyInviteResponse>);

export type DeleteCompanyInviteResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteCompanyInviteResponseStruct = (): T.Describe<DeleteCompanyInviteResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteCompanyInviteResponse>);

export type CompanyIdMigrationResponse = {
    result: TempCompanyIdDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const CompanyIdMigrationResponseStruct = (): T.Describe<CompanyIdMigrationResponse> => (T.type({
    result: T.array(TempCompanyIdDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CompanyIdMigrationResponse>);

export type ListCompanyResponse = {
    result: CompanyManagementDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyResponseStruct = (): T.Describe<ListCompanyResponse> => (T.type({
    result: T.array(CompanyManagementDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyResponse>);

export type GetCompanyStatusResponse = {
    result?: CompanyStatusDto;
};

export const GetCompanyStatusResponseStruct = (): T.Describe<GetCompanyStatusResponse> => (T.type({
    result: tSpecialOptional(CompanyStatusDtoStruct()),
}) as unknown as T.Describe<GetCompanyStatusResponse>);

export type ListCompanyLogoResponse = {
    result: CompanyLogoDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyLogoResponseStruct = (): T.Describe<ListCompanyLogoResponse> => (T.type({
    result: T.array(CompanyLogoDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyLogoResponse>);

export type ListCompanyInformationByIdsResponse = {
    result: CompanyInformationDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyInformationByIdsResponseStruct = (): T.Describe<ListCompanyInformationByIdsResponse> => (T.type({
    result: T.array(CompanyInformationDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyInformationByIdsResponse>);

export type GetCompanyStatusStatisticResponse = {
    draftCount?: number;
    adminReviewCount?: number;
    invitedCount?: number;
    approvedCount?: number;
    rejectedCount?: number;
};

export const GetCompanyStatusStatisticResponseStruct = (): T.Describe<GetCompanyStatusStatisticResponse> => (T.type({
    draftCount: tSpecialOptional(T.number()),
    adminReviewCount: tSpecialOptional(T.number()),
    invitedCount: tSpecialOptional(T.number()),
    approvedCount: tSpecialOptional(T.number()),
    rejectedCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetCompanyStatusStatisticResponse>);

export type ListConsultantResponse = {
    result: ConsultantDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConsultantResponseStruct = (): T.Describe<ListConsultantResponse> => (T.type({
    result: T.array(ConsultantDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConsultantResponse>);

export type ListConsultantSelectionResponse = {
    result: ConsultantSelectionDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConsultantSelectionResponseStruct = (): T.Describe<ListConsultantSelectionResponse> => (T.type({
    result: T.array(ConsultantSelectionDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConsultantSelectionResponse>);

export type GetConsultantResponse = {
    result: ConsultantDto;
};

export const GetConsultantResponseStruct = (): T.Describe<GetConsultantResponse> => (T.type({
    result: ConsultantDtoStruct(),
}) as unknown as T.Describe<GetConsultantResponse>);

export type GetConsultantProfileResponse = {
    result: ConsultantProfileDto;
};

export const GetConsultantProfileResponseStruct = (): T.Describe<GetConsultantProfileResponse> => (T.type({
    result: ConsultantProfileDtoStruct(),
}) as unknown as T.Describe<GetConsultantProfileResponse>);

export type GetEbinaCompanyStatisticResponse = {
    contractorCount?: number;
    consultantCount?: number;
};

export const GetEbinaCompanyStatisticResponseStruct = (): T.Describe<GetEbinaCompanyStatisticResponse> => (T.type({
    contractorCount: tSpecialOptional(T.number()),
    consultantCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetEbinaCompanyStatisticResponse>);

export type CreateConsultantResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConsultantResponseStruct = (): T.Describe<CreateConsultantResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConsultantResponse>);

export type DeleteConsultantResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConsultantResponseStruct = (): T.Describe<DeleteConsultantResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConsultantResponse>);

export type PatchConsultantResponse = {
    result?: ConsultantDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchConsultantResponseStruct = (): T.Describe<PatchConsultantResponse> => (T.type({
    result: tSpecialOptional(ConsultantDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchConsultantResponse>);

export type UpdateConsultantResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantResponseStruct = (): T.Describe<UpdateConsultantResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantResponse>);

export type UpdateConsultantStatusToReviewResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantStatusToReviewResponseStruct = (): T.Describe<UpdateConsultantStatusToReviewResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantStatusToReviewResponse>);

export type UpdateConsultantStatusToApprovedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantStatusToApprovedResponseStruct = (): T.Describe<UpdateConsultantStatusToApprovedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantStatusToApprovedResponse>);

export type UpdateConsultantStatusToRejectedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantStatusToRejectedResponseStruct = (): T.Describe<UpdateConsultantStatusToRejectedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantStatusToRejectedResponse>);

export type UpdateCompanyStatusResponse = {
    result: CompanyDto;
};

export const UpdateCompanyStatusResponseStruct = (): T.Describe<UpdateCompanyStatusResponse> => (T.type({
    result: CompanyDtoStruct(),
}) as unknown as T.Describe<UpdateCompanyStatusResponse>);

export type ListConsultantClientReferenceByConsultantIdResponse = {
    result: ConsultantClientReferenceDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConsultantClientReferenceByConsultantIdResponseStruct = (): T.Describe<ListConsultantClientReferenceByConsultantIdResponse> => (T.type({
    result: T.array(ConsultantClientReferenceDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConsultantClientReferenceByConsultantIdResponse>);

export type CreateConsultantClientReferenceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConsultantClientReferenceResponseStruct = (): T.Describe<CreateConsultantClientReferenceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConsultantClientReferenceResponse>);

export type DeleteConsultantClientReferenceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConsultantClientReferenceResponseStruct = (): T.Describe<DeleteConsultantClientReferenceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConsultantClientReferenceResponse>);

export type UpdateConsultantClientReferenceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantClientReferenceResponseStruct = (): T.Describe<UpdateConsultantClientReferenceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantClientReferenceResponse>);

export type PatchConsultantClientReferenceResponse = {
    result?: ConsultantClientReferenceDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchConsultantClientReferenceResponseStruct = (): T.Describe<PatchConsultantClientReferenceResponse> => (T.type({
    result: tSpecialOptional(ConsultantClientReferenceDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchConsultantClientReferenceResponse>);

export type CreateConsultantDesignServiceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConsultantDesignServiceResponseStruct = (): T.Describe<CreateConsultantDesignServiceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConsultantDesignServiceResponse>);

export type DeleteConsultantDesignServiceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConsultantDesignServiceResponseStruct = (): T.Describe<DeleteConsultantDesignServiceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConsultantDesignServiceResponse>);

export type UpdateConsultantDesignServiceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantDesignServiceResponseStruct = (): T.Describe<UpdateConsultantDesignServiceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantDesignServiceResponse>);

export type PatchConsultantDesignServiceResponse = {
    result?: ConsultantDesignServiceDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchConsultantDesignServiceResponseStruct = (): T.Describe<PatchConsultantDesignServiceResponse> => (T.type({
    result: tSpecialOptional(ConsultantDesignServiceDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchConsultantDesignServiceResponse>);

export type CreateConsultantGovernorateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConsultantGovernorateResponseStruct = (): T.Describe<CreateConsultantGovernorateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConsultantGovernorateResponse>);

export type DeleteConsultantGovernorateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConsultantGovernorateResponseStruct = (): T.Describe<DeleteConsultantGovernorateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConsultantGovernorateResponse>);

export type UpdateConsultantGovernorateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantGovernorateResponseStruct = (): T.Describe<UpdateConsultantGovernorateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantGovernorateResponse>);

export type PatchConsultantGovernorateResponse = {
    result?: ConsultantGovernorateDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchConsultantGovernorateResponseStruct = (): T.Describe<PatchConsultantGovernorateResponse> => (T.type({
    result: tSpecialOptional(ConsultantGovernorateDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchConsultantGovernorateResponse>);

export type CreateConsultantLinkedProfileResponse = {
    isFailed?: boolean;
    errors?: LinkedProfileErrors;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConsultantLinkedProfileResponseStruct = (): T.Describe<CreateConsultantLinkedProfileResponse> => (T.type({
    isFailed: tSpecialOptional(T.boolean()),
    errors: tSpecialOptional(LinkedProfileErrorsStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConsultantLinkedProfileResponse>);

export type DeleteConsultantLinkedProfileResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConsultantLinkedProfileResponseStruct = (): T.Describe<DeleteConsultantLinkedProfileResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConsultantLinkedProfileResponse>);

export type UpdateConsultantLinkedProfileResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantLinkedProfileResponseStruct = (): T.Describe<UpdateConsultantLinkedProfileResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantLinkedProfileResponse>);

export type CreateConsultantMarketingInformationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConsultantMarketingInformationResponseStruct = (): T.Describe<CreateConsultantMarketingInformationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConsultantMarketingInformationResponse>);

export type DeleteConsultantMarketingInformationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConsultantMarketingInformationResponseStruct = (): T.Describe<DeleteConsultantMarketingInformationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConsultantMarketingInformationResponse>);

export type UpdateConsultantMarketingInformationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantMarketingInformationResponseStruct = (): T.Describe<UpdateConsultantMarketingInformationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantMarketingInformationResponse>);

export type PatchConsultantMarketingInformationResponse = {
    result?: MarketingInformationDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchConsultantMarketingInformationResponseStruct = (): T.Describe<PatchConsultantMarketingInformationResponse> => (T.type({
    result: tSpecialOptional(MarketingInformationDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchConsultantMarketingInformationResponse>);

export type CreateConsultantOrganizationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConsultantOrganizationResponseStruct = (): T.Describe<CreateConsultantOrganizationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConsultantOrganizationResponse>);

export type DeleteConsultantOrganizationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConsultantOrganizationResponseStruct = (): T.Describe<DeleteConsultantOrganizationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConsultantOrganizationResponse>);

export type UpdateConsultantOrganizationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantOrganizationResponseStruct = (): T.Describe<UpdateConsultantOrganizationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantOrganizationResponse>);

export type PatchConsultantOrganizationResponse = {
    result?: ConsultantOrganizationDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchConsultantOrganizationResponseStruct = (): T.Describe<PatchConsultantOrganizationResponse> => (T.type({
    result: tSpecialOptional(ConsultantOrganizationDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchConsultantOrganizationResponse>);

export type CreateConsultantResourceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConsultantResourceResponseStruct = (): T.Describe<CreateConsultantResourceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConsultantResourceResponse>);

export type DeleteConsultantResourceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConsultantResourceResponseStruct = (): T.Describe<DeleteConsultantResourceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConsultantResourceResponse>);

export type UpdateConsultantResourceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantResourceResponseStruct = (): T.Describe<UpdateConsultantResourceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantResourceResponse>);

export type PatchConsultantResourceResponse = {
    result?: ResourceDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchConsultantResourceResponseStruct = (): T.Describe<PatchConsultantResourceResponse> => (T.type({
    result: tSpecialOptional(ResourceDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchConsultantResourceResponse>);

export type ListContractorResponse = {
    result: ContractorDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractorResponseStruct = (): T.Describe<ListContractorResponse> => (T.type({
    result: T.array(ContractorDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorResponse>);

export type ListContractorByIdsResponse = {
    result: ContractorDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractorByIdsResponseStruct = (): T.Describe<ListContractorByIdsResponse> => (T.type({
    result: T.array(ContractorDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorByIdsResponse>);

export type ListContractorBidViewByIdsResponse = {
    result: ContractorBidViewDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractorBidViewByIdsResponseStruct = (): T.Describe<ListContractorBidViewByIdsResponse> => (T.type({
    result: T.array(ContractorBidViewDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorBidViewByIdsResponse>);

export type ListContractorWithInvitationStatusResponse = {
    result: ContractorWithInviteStatusDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractorWithInvitationStatusResponseStruct = (): T.Describe<ListContractorWithInvitationStatusResponse> => (T.type({
    result: T.array(ContractorWithInviteStatusDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorWithInvitationStatusResponse>);

export type ListContractorNameByIdsResponse = {
    result: ContractorNameDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractorNameByIdsResponseStruct = (): T.Describe<ListContractorNameByIdsResponse> => (T.type({
    result: T.array(ContractorNameDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorNameByIdsResponse>);

export type GetContractorResponse = {
    result: ContractorDto;
};

export const GetContractorResponseStruct = (): T.Describe<GetContractorResponse> => (T.type({
    result: ContractorDtoStruct(),
}) as unknown as T.Describe<GetContractorResponse>);

export type GetContractorProfileResponse = {
    result: ContractorProfileDto;
};

export const GetContractorProfileResponseStruct = (): T.Describe<GetContractorProfileResponse> => (T.type({
    result: ContractorProfileDtoStruct(),
}) as unknown as T.Describe<GetContractorProfileResponse>);

export type CreateContractorResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractorResponseStruct = (): T.Describe<CreateContractorResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractorResponse>);

export type DeleteContractorResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractorResponseStruct = (): T.Describe<DeleteContractorResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractorResponse>);

export type PatchContractorResponse = {
    result?: ContractorDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchContractorResponseStruct = (): T.Describe<PatchContractorResponse> => (T.type({
    result: tSpecialOptional(ContractorDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchContractorResponse>);

export type UpdateContractorResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorResponseStruct = (): T.Describe<UpdateContractorResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorResponse>);

export type UpdateContractorStatusToReviewResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorStatusToReviewResponseStruct = (): T.Describe<UpdateContractorStatusToReviewResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorStatusToReviewResponse>);

export type UpdateContractorStatusToRejectedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorStatusToRejectedResponseStruct = (): T.Describe<UpdateContractorStatusToRejectedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorStatusToRejectedResponse>);

export type ListContractorClientReferenceResponse = {
    result: ContractorClientReferenceDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractorClientReferenceResponseStruct = (): T.Describe<ListContractorClientReferenceResponse> => (T.type({
    result: T.array(ContractorClientReferenceDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorClientReferenceResponse>);

export type ListContractorClientReferenceByContractorIdResponse = {
    result: ContractorClientReferenceDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractorClientReferenceByContractorIdResponseStruct = (): T.Describe<ListContractorClientReferenceByContractorIdResponse> => (T.type({
    result: T.array(ContractorClientReferenceDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorClientReferenceByContractorIdResponse>);

export type CreateContractorClientReferenceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractorClientReferenceResponseStruct = (): T.Describe<CreateContractorClientReferenceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractorClientReferenceResponse>);

export type DeleteContractorClientReferenceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractorClientReferenceResponseStruct = (): T.Describe<DeleteContractorClientReferenceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractorClientReferenceResponse>);

export type UpdateContractorClientReferenceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorClientReferenceResponseStruct = (): T.Describe<UpdateContractorClientReferenceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorClientReferenceResponse>);

export type PatchContractorClientReferenceResponse = {
    result?: ContractorClientReferenceDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchContractorClientReferenceResponseStruct = (): T.Describe<PatchContractorClientReferenceResponse> => (T.type({
    result: tSpecialOptional(ContractorClientReferenceDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchContractorClientReferenceResponse>);

export type CreateContractorCompanyResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractorCompanyResponseStruct = (): T.Describe<CreateContractorCompanyResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractorCompanyResponse>);

export type UpdateContractorCompanyResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorCompanyResponseStruct = (): T.Describe<UpdateContractorCompanyResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorCompanyResponse>);

export type PatchContractorCompanyResponse = {
    result?: ContractorCompanyDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchContractorCompanyResponseStruct = (): T.Describe<PatchContractorCompanyResponse> => (T.type({
    result: tSpecialOptional(ContractorCompanyDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchContractorCompanyResponse>);

export type ListContractorLinkedProfileResponse = {
    result: ContractorLinkedProfileDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractorLinkedProfileResponseStruct = (): T.Describe<ListContractorLinkedProfileResponse> => (T.type({
    result: T.array(ContractorLinkedProfileDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorLinkedProfileResponse>);

export type GetContractorLinkedProfileResponse = {
    result: ContractorLinkedProfileDto;
};

export const GetContractorLinkedProfileResponseStruct = (): T.Describe<GetContractorLinkedProfileResponse> => (T.type({
    result: ContractorLinkedProfileDtoStruct(),
}) as unknown as T.Describe<GetContractorLinkedProfileResponse>);

export type CreateContractorLinkedProfileResponse = {
    isFailed?: boolean;
    errors?: LinkedProfileErrors;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractorLinkedProfileResponseStruct = (): T.Describe<CreateContractorLinkedProfileResponse> => (T.type({
    isFailed: tSpecialOptional(T.boolean()),
    errors: tSpecialOptional(LinkedProfileErrorsStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractorLinkedProfileResponse>);

export type DeleteContractorLinkedProfileResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractorLinkedProfileResponseStruct = (): T.Describe<DeleteContractorLinkedProfileResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractorLinkedProfileResponse>);

export type UpdateContractorLinkedProfileResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorLinkedProfileResponseStruct = (): T.Describe<UpdateContractorLinkedProfileResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorLinkedProfileResponse>);

export type CreateContractorMarketingInformationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractorMarketingInformationResponseStruct = (): T.Describe<CreateContractorMarketingInformationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractorMarketingInformationResponse>);

export type DeleteContractorMarketingInformationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractorMarketingInformationResponseStruct = (): T.Describe<DeleteContractorMarketingInformationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractorMarketingInformationResponse>);

export type UpdateContractorMarketingInformationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorMarketingInformationResponseStruct = (): T.Describe<UpdateContractorMarketingInformationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorMarketingInformationResponse>);

export type PatchContractorMarketingInformationResponse = {
    result?: MarketingInformationDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchContractorMarketingInformationResponseStruct = (): T.Describe<PatchContractorMarketingInformationResponse> => (T.type({
    result: tSpecialOptional(MarketingInformationDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchContractorMarketingInformationResponse>);

export type CreateContractorOrganizationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractorOrganizationResponseStruct = (): T.Describe<CreateContractorOrganizationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractorOrganizationResponse>);

export type DeleteContractorOrganizationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractorOrganizationResponseStruct = (): T.Describe<DeleteContractorOrganizationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractorOrganizationResponse>);

export type UpdateContractorOrganizationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorOrganizationResponseStruct = (): T.Describe<UpdateContractorOrganizationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorOrganizationResponse>);

export type PatchContractorOrganizationResponse = {
    result?: ContractorOrganizationDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchContractorOrganizationResponseStruct = (): T.Describe<PatchContractorOrganizationResponse> => (T.type({
    result: tSpecialOptional(ContractorOrganizationDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchContractorOrganizationResponse>);

export type CreateContractorResourceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractorResourceResponseStruct = (): T.Describe<CreateContractorResourceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractorResourceResponse>);

export type DeleteContractorResourceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractorResourceResponseStruct = (): T.Describe<DeleteContractorResourceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractorResourceResponse>);

export type UpdateContractorResourceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorResourceResponseStruct = (): T.Describe<UpdateContractorResourceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorResourceResponse>);

export type PatchContractorResourceResponse = {
    result?: ResourceDto;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchContractorResourceResponseStruct = (): T.Describe<PatchContractorResourceResponse> => (T.type({
    result: tSpecialOptional(ResourceDtoStruct()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchContractorResourceResponse>);

export type ListDictionaryDataResponse = {
    productUnits?: ContractorProductUnitDto[];
    serviceUnits?: DictionaryDataDto[];
    specializations?: SpecializationDto[];
    designServiceUnits?: DictionaryDataDto[];
    consultantProductUnit?: DictionaryDataDto[];
};

export const ListDictionaryDataResponseStruct = (): T.Describe<ListDictionaryDataResponse> => (T.type({
    productUnits: tSpecialOptional(T.array(ContractorProductUnitDtoStruct())),
    serviceUnits: tSpecialOptional(T.array(DictionaryDataDtoStruct())),
    specializations: tSpecialOptional(T.array(SpecializationDtoStruct())),
    designServiceUnits: tSpecialOptional(T.array(DictionaryDataDtoStruct())),
    consultantProductUnit: tSpecialOptional(T.array(DictionaryDataDtoStruct())),
}) as unknown as T.Describe<ListDictionaryDataResponse>);

export type ListOneDictionaryResponse = {
    result: DictionaryDataDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListOneDictionaryResponseStruct = (): T.Describe<ListOneDictionaryResponse> => (T.type({
    result: T.array(DictionaryDataDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListOneDictionaryResponse>);

export type ListContractorProjectReviewResponse = {
    result: ContractorProjectReviewDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractorProjectReviewResponseStruct = (): T.Describe<ListContractorProjectReviewResponse> => (T.type({
    result: T.array(ContractorProjectReviewDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorProjectReviewResponse>);

export type CreateContractorProjectReviewResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractorProjectReviewResponseStruct = (): T.Describe<CreateContractorProjectReviewResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractorProjectReviewResponse>);

export type CreateConsultantProjectReviewResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConsultantProjectReviewResponseStruct = (): T.Describe<CreateConsultantProjectReviewResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConsultantProjectReviewResponse>);

export type DeleteContractorProjectReviewResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractorProjectReviewResponseStruct = (): T.Describe<DeleteContractorProjectReviewResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractorProjectReviewResponse>);

export type UpdateContractorProjectReviewResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractorProjectReviewResponseStruct = (): T.Describe<UpdateContractorProjectReviewResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractorProjectReviewResponse>);

export type UpdateConsultantProjectReviewResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConsultantProjectReviewResponseStruct = (): T.Describe<UpdateConsultantProjectReviewResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConsultantProjectReviewResponse>);

export type UpdateClientReferenceStatusResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateClientReferenceStatusResponseStruct = (): T.Describe<UpdateClientReferenceStatusResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateClientReferenceStatusResponse>);

export type GetReviewStatisticResponse = {
    result?: CompanyStatisticDto;
};

export const GetReviewStatisticResponseStruct = (): T.Describe<GetReviewStatisticResponse> => (T.type({
    result: tSpecialOptional(CompanyStatisticDtoStruct()),
}) as unknown as T.Describe<GetReviewStatisticResponse>);

export type ListUserManagementCompanyDetailsResponse = {
    result: UserManagementCompanyAssociationDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListUserManagementCompanyDetailsResponseStruct = (): T.Describe<ListUserManagementCompanyDetailsResponse> => (T.type({
    result: T.array(UserManagementCompanyAssociationDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListUserManagementCompanyDetailsResponse>);

export type CreateShortCompanyCommand = {
    name: string;
    nameInArabic?: string;
    crNumber: string;
    headOfficeGovernorateId: number;
    headOfficeWilayatId: number;
    companyType?: CompanyType;
    ownerId: number;
    ownerName: string;
    ownerPhone: string;
    ownerEmail?: string;
    locationPrises?: ShortConsultantGovernorateDto[];
};

export const CreateShortCompanyCommandStruct = (): T.Describe<CreateShortCompanyCommand> => (T.type({
    name: T.string(),
    nameInArabic: tSpecialOptional(T.string()),
    crNumber: T.string(),
    headOfficeGovernorateId: T.number(),
    headOfficeWilayatId: T.number(),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerId: T.number(),
    ownerName: T.string(),
    ownerPhone: T.string(),
    ownerEmail: tSpecialOptional(T.string()),
    locationPrises: tSpecialOptional(T.array(ShortConsultantGovernorateDtoStruct())),
}) as unknown as T.Describe<CreateShortCompanyCommand>);

export type GetCompanyDataByPhoneNumberQuery = {
    phoneNumber?: string;
};

export const GetCompanyDataByPhoneNumberQueryStruct = (): T.Describe<GetCompanyDataByPhoneNumberQuery> => (T.type({
    phoneNumber: tSpecialOptional(T.string()),
}) as unknown as T.Describe<GetCompanyDataByPhoneNumberQuery>);

export type ListCompanyByCompanyNameQuery = {
    companyName?: string;
    page?: number;
    pageSize?: number;
};

export const ListCompanyByCompanyNameQueryStruct = (): T.Describe<ListCompanyByCompanyNameQuery> => (T.type({
    companyName: tSpecialOptional(T.string()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyByCompanyNameQuery>);

export type GetCompanyDtoByIdQuery = {
    companyId?: number;
};

export const GetCompanyDtoByIdQueryStruct = (): T.Describe<GetCompanyDtoByIdQuery> => (T.type({
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetCompanyDtoByIdQuery>);

export type ListCompanyNamesByIdsQuery = {
    companyIds?: number[];
};

export const ListCompanyNamesByIdsQueryStruct = (): T.Describe<ListCompanyNamesByIdsQuery> => (T.type({
    companyIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<ListCompanyNamesByIdsQuery>);

export type SetCompanyOwnerIdCommand = {
    profileId?: number;
    companyId?: number;
};

export const SetCompanyOwnerIdCommandStruct = (): T.Describe<SetCompanyOwnerIdCommand> => (T.type({
    profileId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<SetCompanyOwnerIdCommand>);

export type MakeOwnerCommand = {
    companyId?: number;
    contextType?: ContextType;
    ownerId?: number;
    ownerName?: string;
    ownerPhone?: string;
    ownerEmail?: string;
    oldOwnerId?: number;
};

export const MakeOwnerCommandStruct = (): T.Describe<MakeOwnerCommand> => (T.type({
    companyId: tSpecialOptional(T.number()),
    contextType: tSpecialOptional(ContextTypeStruct()),
    ownerId: tSpecialOptional(T.number()),
    ownerName: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
    oldOwnerId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<MakeOwnerCommand>);

export type ListCompanyInviteQuery = {
    page?: number;
    pageSize?: number;
};

export const ListCompanyInviteQueryStruct = (): T.Describe<ListCompanyInviteQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyInviteQuery>);

export type GetCompanyInviteQuery = {
    id: number;
};

export const GetCompanyInviteQueryStruct = (): T.Describe<GetCompanyInviteQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetCompanyInviteQuery>);

export type CreateCompanyInviteCommand = {
    companyName?: string;
    email?: string;
    mobileNumber: string;
    verifyExist?: boolean;
};

export const CreateCompanyInviteCommandStruct = (): T.Describe<CreateCompanyInviteCommand> => (T.type({
    companyName: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    mobileNumber: T.string(),
    verifyExist: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateCompanyInviteCommand>);

export type DeleteCompanyInviteCommand = {
    id: number;
};

export const DeleteCompanyInviteCommandStruct = (): T.Describe<DeleteCompanyInviteCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteCompanyInviteCommand>);

export type CompanyIdMigrationQuery = undefined;

export const CompanyIdMigrationQueryStruct = () => T.literal(undefined);

export type ListCompanyQuery = {
    sortRules?: CompanySort;
    companyName?: string;
    page?: number;
    pageSize?: number;
};

export const ListCompanyQueryStruct = (): T.Describe<ListCompanyQuery> => (T.type({
    sortRules: tSpecialOptional(CompanySortStruct()),
    companyName: tSpecialOptional(T.string()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyQuery>);

export type GetCompanyStatusQuery = {
    companyId?: number;
};

export const GetCompanyStatusQueryStruct = (): T.Describe<GetCompanyStatusQuery> => (T.type({
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetCompanyStatusQuery>);

export type ListCompanyLogoQuery = {
    companyIds?: number[];
};

export const ListCompanyLogoQueryStruct = (): T.Describe<ListCompanyLogoQuery> => (T.type({
    companyIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<ListCompanyLogoQuery>);

export type ListCompanyInformationByIdsQuery = {
    ids: number[];
};

export const ListCompanyInformationByIdsQueryStruct = (): T.Describe<ListCompanyInformationByIdsQuery> => (T.type({
    ids: T.array(T.number()),
}) as unknown as T.Describe<ListCompanyInformationByIdsQuery>);

export type GetCompanyStatusStatisticQuery = undefined;

export const GetCompanyStatusStatisticQueryStruct = () => T.literal(undefined);

export type ListConsultantQuery = {
    sortRules?: ConsultantSort;
    consultantFilter?: ConsultantFilter;
    page?: number;
    pageSize?: number;
};

export const ListConsultantQueryStruct = (): T.Describe<ListConsultantQuery> => (T.type({
    sortRules: tSpecialOptional(ConsultantSortStruct()),
    consultantFilter: tSpecialOptional(ConsultantFilterStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConsultantQuery>);

export type ListConsultantSelectionQuery = {
    wilayatId?: number;
    projectId?: number;
};

export const ListConsultantSelectionQueryStruct = (): T.Describe<ListConsultantSelectionQuery> => (T.type({
    wilayatId: tSpecialOptional(T.number()),
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConsultantSelectionQuery>);

export type GetConsultantQuery = {
    id: number;
};

export const GetConsultantQueryStruct = (): T.Describe<GetConsultantQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetConsultantQuery>);

export type GetConsultantProfileQuery = {
    id: number;
};

export const GetConsultantProfileQueryStruct = (): T.Describe<GetConsultantProfileQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetConsultantProfileQuery>);

export type GetEbinaCompanyStatisticQuery = undefined;

export const GetEbinaCompanyStatisticQueryStruct = () => T.literal(undefined);

export type CreateConsultantCommand = {
    affiliationType?: AffiliationType;
    userAuthId?: string;
    products?: ConsultantProductDto[];
    governorates?: ConsultantGovernorateDto[];
    registeredAt?: ConsultantOrganizationDto[];
    designServices?: ConsultantDesignServiceDto[];
    linkedProfiles?: ConsultantLinkedProfileDto[];
    references?: ConsultantClientReferenceDto[];
    provideDesignService?: boolean;
    provideSupervisionService?: boolean;
    yoursYearsOfExperience?: number;
    everyDesignPackageSize?: number;
    everyDesignPackagePrice?: number;
    resources?: ResourceDto[];
    marketings?: MarketingInformationDto[];
    status?: CompanyStatus;
    ownerId: number;
    companyLogoId?: string;
    name: string;
    nameInArabic?: string;
    email: string;
    phone: string;
    headOfficeGovernorateId: number;
    headOfficeWilayatId: number;
    crNumber: string;
    crStartDate: string;
    crExpirationDate: string;
    projectsDelivered?: number;
    projectsWorkedAtOnce?: number;
    largestProjectAwarded?: number;
    failedCompleteAwardedWork?: boolean;
    anyJudgmentsPendingOrOutstanding?: boolean;
    measuresToMaintainQuality: string;
    planningSoftware?: PlanningSoftware[];
    otherPlanningSoftware: string;
    additionalInformation: string;
    crCertificate?: string[];
    ownerNationalId?: string[];
    manpowerReportIssuedByMom?: string[];
    companyProfile?: string[];
    otherFiles?: string[];
    companyType?: CompanyType;
    ownerName?: string;
    ownerPhone?: string;
    ownerEmail?: string;
};

export const CreateConsultantCommandStruct = (): T.Describe<CreateConsultantCommand> => (T.type({
    affiliationType: tSpecialOptional(AffiliationTypeStruct()),
    userAuthId: tSpecialOptional(T.string()),
    products: tSpecialOptional(T.array(ConsultantProductDtoStruct())),
    governorates: tSpecialOptional(T.array(ConsultantGovernorateDtoStruct())),
    registeredAt: tSpecialOptional(T.array(ConsultantOrganizationDtoStruct())),
    designServices: tSpecialOptional(T.array(ConsultantDesignServiceDtoStruct())),
    linkedProfiles: tSpecialOptional(T.array(ConsultantLinkedProfileDtoStruct())),
    references: tSpecialOptional(T.array(ConsultantClientReferenceDtoStruct())),
    provideDesignService: tSpecialOptional(T.boolean()),
    provideSupervisionService: tSpecialOptional(T.boolean()),
    yoursYearsOfExperience: tSpecialOptional(T.number()),
    everyDesignPackageSize: tSpecialOptional(T.number()),
    everyDesignPackagePrice: tSpecialOptional(T.number()),
    resources: tSpecialOptional(T.array(ResourceDtoStruct())),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
    status: tSpecialOptional(CompanyStatusStruct()),
    ownerId: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
    name: T.string(),
    nameInArabic: tSpecialOptional(T.string()),
    email: T.string(),
    phone: T.string(),
    headOfficeGovernorateId: T.number(),
    headOfficeWilayatId: T.number(),
    crNumber: T.string(),
    crStartDate: T.string(),
    crExpirationDate: T.string(),
    projectsDelivered: tSpecialOptional(T.number()),
    projectsWorkedAtOnce: tSpecialOptional(T.number()),
    largestProjectAwarded: tSpecialOptional(T.number()),
    failedCompleteAwardedWork: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstanding: tSpecialOptional(T.boolean()),
    measuresToMaintainQuality: T.string(),
    planningSoftware: tSpecialOptional(T.array(PlanningSoftwareStruct())),
    otherPlanningSoftware: T.string(),
    additionalInformation: T.string(),
    crCertificate: tSpecialOptional(T.array(T.string())),
    ownerNationalId: tSpecialOptional(T.array(T.string())),
    manpowerReportIssuedByMom: tSpecialOptional(T.array(T.string())),
    companyProfile: tSpecialOptional(T.array(T.string())),
    otherFiles: tSpecialOptional(T.array(T.string())),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerName: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateConsultantCommand>);

export type DeleteConsultantCommand = {
    id: number;
};

export const DeleteConsultantCommandStruct = (): T.Describe<DeleteConsultantCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteConsultantCommand>);

export type PatchConsultantCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchConsultantCommandStruct = (): T.Describe<PatchConsultantCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchConsultantCommand>);

export type UpdateConsultantCommand = {
    id: number;
    products?: ConsultantProductDto[];
    governorates?: ConsultantGovernorateDto[];
    registeredAt?: ConsultantOrganizationDto[];
    designServices?: ConsultantDesignServiceDto[];
    linkedProfiles?: ConsultantLinkedProfileDto[];
    references?: ConsultantClientReferenceDto[];
    provideDesignService?: boolean;
    provideSupervisionService?: boolean;
    yoursYearsOfExperience?: number;
    everyDesignPackageSize?: number;
    everyDesignPackagePrice?: number;
    resources?: ResourceDto[];
    marketings?: MarketingInformationDto[];
    status?: CompanyStatus;
    ownerId: number;
    companyLogoId?: string;
    name: string;
    nameInArabic?: string;
    email: string;
    phone: string;
    headOfficeGovernorateId: number;
    headOfficeWilayatId: number;
    crNumber: string;
    crStartDate: string;
    crExpirationDate: string;
    projectsDelivered?: number;
    projectsWorkedAtOnce?: number;
    largestProjectAwarded?: number;
    failedCompleteAwardedWork?: boolean;
    anyJudgmentsPendingOrOutstanding?: boolean;
    measuresToMaintainQuality: string;
    planningSoftware?: PlanningSoftware[];
    otherPlanningSoftware: string;
    additionalInformation: string;
    crCertificate?: string[];
    ownerNationalId?: string[];
    manpowerReportIssuedByMom?: string[];
    companyProfile?: string[];
    otherFiles?: string[];
    companyType?: CompanyType;
    ownerName?: string;
    ownerPhone?: string;
    ownerEmail?: string;
};

export const UpdateConsultantCommandStruct = (): T.Describe<UpdateConsultantCommand> => (T.type({
    id: T.number(),
    products: tSpecialOptional(T.array(ConsultantProductDtoStruct())),
    governorates: tSpecialOptional(T.array(ConsultantGovernorateDtoStruct())),
    registeredAt: tSpecialOptional(T.array(ConsultantOrganizationDtoStruct())),
    designServices: tSpecialOptional(T.array(ConsultantDesignServiceDtoStruct())),
    linkedProfiles: tSpecialOptional(T.array(ConsultantLinkedProfileDtoStruct())),
    references: tSpecialOptional(T.array(ConsultantClientReferenceDtoStruct())),
    provideDesignService: tSpecialOptional(T.boolean()),
    provideSupervisionService: tSpecialOptional(T.boolean()),
    yoursYearsOfExperience: tSpecialOptional(T.number()),
    everyDesignPackageSize: tSpecialOptional(T.number()),
    everyDesignPackagePrice: tSpecialOptional(T.number()),
    resources: tSpecialOptional(T.array(ResourceDtoStruct())),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
    status: tSpecialOptional(CompanyStatusStruct()),
    ownerId: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
    name: T.string(),
    nameInArabic: tSpecialOptional(T.string()),
    email: T.string(),
    phone: T.string(),
    headOfficeGovernorateId: T.number(),
    headOfficeWilayatId: T.number(),
    crNumber: T.string(),
    crStartDate: T.string(),
    crExpirationDate: T.string(),
    projectsDelivered: tSpecialOptional(T.number()),
    projectsWorkedAtOnce: tSpecialOptional(T.number()),
    largestProjectAwarded: tSpecialOptional(T.number()),
    failedCompleteAwardedWork: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstanding: tSpecialOptional(T.boolean()),
    measuresToMaintainQuality: T.string(),
    planningSoftware: tSpecialOptional(T.array(PlanningSoftwareStruct())),
    otherPlanningSoftware: T.string(),
    additionalInformation: T.string(),
    crCertificate: tSpecialOptional(T.array(T.string())),
    ownerNationalId: tSpecialOptional(T.array(T.string())),
    manpowerReportIssuedByMom: tSpecialOptional(T.array(T.string())),
    companyProfile: tSpecialOptional(T.array(T.string())),
    otherFiles: tSpecialOptional(T.array(T.string())),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerName: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateConsultantCommand>);

export type UpdateConsultantStatusToReviewCommand = {
    id: number;
};

export const UpdateConsultantStatusToReviewCommandStruct = (): T.Describe<UpdateConsultantStatusToReviewCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateConsultantStatusToReviewCommand>);

export type UpdateConsultantStatusToApprovedCommand = {
    id: number;
};

export const UpdateConsultantStatusToApprovedCommandStruct = (): T.Describe<UpdateConsultantStatusToApprovedCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateConsultantStatusToApprovedCommand>);

export type UpdateConsultantStatusToRejectedCommand = {
    id: number;
};

export const UpdateConsultantStatusToRejectedCommandStruct = (): T.Describe<UpdateConsultantStatusToRejectedCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateConsultantStatusToRejectedCommand>);

export type UpdateCompanyStatusCommand = {
    companyId: number;
    companyStatus: CompanyStatus;
};

export const UpdateCompanyStatusCommandStruct = (): T.Describe<UpdateCompanyStatusCommand> => (T.type({
    companyId: T.number(),
    companyStatus: CompanyStatusStruct(),
}) as unknown as T.Describe<UpdateCompanyStatusCommand>);

export type ListConsultantClientReferenceByConsultantIdQuery = {
    consultantId?: number;
    page?: number;
    pageSize?: number;
};

export const ListConsultantClientReferenceByConsultantIdQueryStruct = (): T.Describe<ListConsultantClientReferenceByConsultantIdQuery> => (T.type({
    consultantId: tSpecialOptional(T.number()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConsultantClientReferenceByConsultantIdQuery>);

export type CreateConsultantClientReferenceCommand = {
    designType?: DesignType;
    clientName?: string;
    phoneNumber?: string;
    governorateId?: number;
    wilayatId?: number;
    projectValue?: number;
    projectCompletionDate?: string;
    imagesIds?: string[];
    companyId?: number;
    startDate?: string;
};

export const CreateConsultantClientReferenceCommandStruct = (): T.Describe<CreateConsultantClientReferenceCommand> => (T.type({
    designType: tSpecialOptional(DesignTypeStruct()),
    clientName: tSpecialOptional(T.string()),
    phoneNumber: tSpecialOptional(T.string()),
    governorateId: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    projectValue: tSpecialOptional(T.number()),
    projectCompletionDate: tSpecialOptional(T.string()),
    imagesIds: tSpecialOptional(T.array(T.string())),
    companyId: tSpecialOptional(T.number()),
    startDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateConsultantClientReferenceCommand>);

export type DeleteConsultantClientReferenceCommand = {
    id: number;
};

export const DeleteConsultantClientReferenceCommandStruct = (): T.Describe<DeleteConsultantClientReferenceCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteConsultantClientReferenceCommand>);

export type UpdateConsultantClientReferenceCommand = {
    id: number;
    designType?: DesignType;
    clientName?: string;
    phoneNumber?: string;
    governorateId?: number;
    wilayatId?: number;
    projectValue?: number;
    projectCompletionDate?: string;
    imagesIds?: string[];
    companyId?: number;
    startDate?: string;
};

export const UpdateConsultantClientReferenceCommandStruct = (): T.Describe<UpdateConsultantClientReferenceCommand> => (T.type({
    id: T.number(),
    designType: tSpecialOptional(DesignTypeStruct()),
    clientName: tSpecialOptional(T.string()),
    phoneNumber: tSpecialOptional(T.string()),
    governorateId: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    projectValue: tSpecialOptional(T.number()),
    projectCompletionDate: tSpecialOptional(T.string()),
    imagesIds: tSpecialOptional(T.array(T.string())),
    companyId: tSpecialOptional(T.number()),
    startDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateConsultantClientReferenceCommand>);

export type PatchConsultantClientReferenceCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchConsultantClientReferenceCommandStruct = (): T.Describe<PatchConsultantClientReferenceCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchConsultantClientReferenceCommand>);

export type CreateConsultantDesignServiceCommand = {
    landSizeFrom?: number;
    landSizeTo?: number;
    price?: number;
    serviceUnits?: number[];
    companyId?: number;
};

export const CreateConsultantDesignServiceCommandStruct = (): T.Describe<CreateConsultantDesignServiceCommand> => (T.type({
    landSizeFrom: tSpecialOptional(T.number()),
    landSizeTo: tSpecialOptional(T.number()),
    price: tSpecialOptional(T.number()),
    serviceUnits: tSpecialOptional(T.array(T.number())),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateConsultantDesignServiceCommand>);

export type DeleteConsultantDesignServiceCommand = {
    id: number;
};

export const DeleteConsultantDesignServiceCommandStruct = (): T.Describe<DeleteConsultantDesignServiceCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteConsultantDesignServiceCommand>);

export type UpdateConsultantDesignServiceCommand = {
    id: number;
    landSizeFrom?: number;
    landSizeTo?: number;
    price?: number;
    serviceUnits?: number[];
    companyId?: number;
};

export const UpdateConsultantDesignServiceCommandStruct = (): T.Describe<UpdateConsultantDesignServiceCommand> => (T.type({
    id: T.number(),
    landSizeFrom: tSpecialOptional(T.number()),
    landSizeTo: tSpecialOptional(T.number()),
    price: tSpecialOptional(T.number()),
    serviceUnits: tSpecialOptional(T.array(T.number())),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateConsultantDesignServiceCommand>);

export type PatchConsultantDesignServiceCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchConsultantDesignServiceCommandStruct = (): T.Describe<PatchConsultantDesignServiceCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchConsultantDesignServiceCommand>);

export type CreateConsultantGovernorateCommand = {
    price?: number;
    wilayatId?: number;
    companyId?: number;
    governorateId?: number;
};

export const CreateConsultantGovernorateCommandStruct = (): T.Describe<CreateConsultantGovernorateCommand> => (T.type({
    price: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateConsultantGovernorateCommand>);

export type DeleteConsultantGovernorateCommand = {
    id: number;
};

export const DeleteConsultantGovernorateCommandStruct = (): T.Describe<DeleteConsultantGovernorateCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteConsultantGovernorateCommand>);

export type UpdateConsultantGovernorateCommand = {
    price?: number;
    wilayatId?: number;
    companyId?: number;
    governorateId?: number;
    id: number;
};

export const UpdateConsultantGovernorateCommandStruct = (): T.Describe<UpdateConsultantGovernorateCommand> => (T.type({
    price: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<UpdateConsultantGovernorateCommand>);

export type PatchConsultantGovernorateCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchConsultantGovernorateCommandStruct = (): T.Describe<PatchConsultantGovernorateCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchConsultantGovernorateCommand>);

export type CreateConsultantLinkedProfileCommand = {
    consultantAffiliationType?: ConsultantAffiliationType;
    phone?: string;
    companyId?: number;
    userId?: number;
};

export const CreateConsultantLinkedProfileCommandStruct = (): T.Describe<CreateConsultantLinkedProfileCommand> => (T.type({
    consultantAffiliationType: tSpecialOptional(ConsultantAffiliationTypeStruct()),
    phone: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    userId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateConsultantLinkedProfileCommand>);

export type DeleteConsultantLinkedProfileCommand = {
    id: number;
    deletionType?: LinkedProfileDeletionType;
};

export const DeleteConsultantLinkedProfileCommandStruct = (): T.Describe<DeleteConsultantLinkedProfileCommand> => (T.type({
    id: T.number(),
    deletionType: tSpecialOptional(LinkedProfileDeletionTypeStruct()),
}) as unknown as T.Describe<DeleteConsultantLinkedProfileCommand>);

export type UpdateConsultantLinkedProfileCommand = {
    consultantAffiliationType?: ConsultantAffiliationType;
    companyId?: number;
    userId?: number;
    id: number;
    phone?: string;
    updateType?: LinkedProfileUpdateType;
};

export const UpdateConsultantLinkedProfileCommandStruct = (): T.Describe<UpdateConsultantLinkedProfileCommand> => (T.type({
    consultantAffiliationType: tSpecialOptional(ConsultantAffiliationTypeStruct()),
    companyId: tSpecialOptional(T.number()),
    userId: tSpecialOptional(T.number()),
    id: T.number(),
    phone: tSpecialOptional(T.string()),
    updateType: tSpecialOptional(LinkedProfileUpdateTypeStruct()),
}) as unknown as T.Describe<UpdateConsultantLinkedProfileCommand>);

export type CreateConsultantMarketingInformationCommand = {
    marketingService?: MarketingService;
    addresUrl?: string;
    companyId?: number;
};

export const CreateConsultantMarketingInformationCommandStruct = (): T.Describe<CreateConsultantMarketingInformationCommand> => (T.type({
    marketingService: tSpecialOptional(MarketingServiceStruct()),
    addresUrl: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateConsultantMarketingInformationCommand>);

export type DeleteConsultantMarketingInformationCommand = {
    id: number;
};

export const DeleteConsultantMarketingInformationCommandStruct = (): T.Describe<DeleteConsultantMarketingInformationCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteConsultantMarketingInformationCommand>);

export type UpdateConsultantMarketingInformationCommand = {
    id: number;
    marketingService?: MarketingService;
    addresUrl?: string;
    companyId?: number;
};

export const UpdateConsultantMarketingInformationCommandStruct = (): T.Describe<UpdateConsultantMarketingInformationCommand> => (T.type({
    id: T.number(),
    marketingService: tSpecialOptional(MarketingServiceStruct()),
    addresUrl: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateConsultantMarketingInformationCommand>);

export type PatchConsultantMarketingInformationCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchConsultantMarketingInformationCommandStruct = (): T.Describe<PatchConsultantMarketingInformationCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchConsultantMarketingInformationCommand>);

export type CreateConsultantOrganizationCommand = {
    organization?: ConsultantOrganization;
    otherOrganization?: string;
    companyId?: number;
};

export const CreateConsultantOrganizationCommandStruct = (): T.Describe<CreateConsultantOrganizationCommand> => (T.type({
    organization: tSpecialOptional(ConsultantOrganizationStruct()),
    otherOrganization: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateConsultantOrganizationCommand>);

export type DeleteConsultantOrganizationCommand = {
    id: number;
};

export const DeleteConsultantOrganizationCommandStruct = (): T.Describe<DeleteConsultantOrganizationCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteConsultantOrganizationCommand>);

export type UpdateConsultantOrganizationCommand = {
    organization?: ConsultantOrganization;
    otherOrganization?: string;
    companyId?: number;
    id: number;
};

export const UpdateConsultantOrganizationCommandStruct = (): T.Describe<UpdateConsultantOrganizationCommand> => (T.type({
    organization: tSpecialOptional(ConsultantOrganizationStruct()),
    otherOrganization: tSpecialOptional(T.string()),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<UpdateConsultantOrganizationCommand>);

export type PatchConsultantOrganizationCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchConsultantOrganizationCommandStruct = (): T.Describe<PatchConsultantOrganizationCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchConsultantOrganizationCommand>);

export type CreateConsultantResourceCommand = {
    specializationId?: number;
    resourceType?: ResourceType;
    numberOfUnit?: number;
    companyId?: number;
};

export const CreateConsultantResourceCommandStruct = (): T.Describe<CreateConsultantResourceCommand> => (T.type({
    specializationId: tSpecialOptional(T.number()),
    resourceType: tSpecialOptional(ResourceTypeStruct()),
    numberOfUnit: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateConsultantResourceCommand>);

export type DeleteConsultantResourceCommand = {
    id: number;
};

export const DeleteConsultantResourceCommandStruct = (): T.Describe<DeleteConsultantResourceCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteConsultantResourceCommand>);

export type UpdateConsultantResourceCommand = {
    specializationId?: number;
    id: number;
    resourceType?: ResourceType;
    numberOfUnit?: number;
    companyId?: number;
};

export const UpdateConsultantResourceCommandStruct = (): T.Describe<UpdateConsultantResourceCommand> => (T.type({
    specializationId: tSpecialOptional(T.number()),
    id: T.number(),
    resourceType: tSpecialOptional(ResourceTypeStruct()),
    numberOfUnit: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateConsultantResourceCommand>);

export type PatchConsultantResourceCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchConsultantResourceCommandStruct = (): T.Describe<PatchConsultantResourceCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchConsultantResourceCommand>);

export type ListContractorQuery = {
    sortRules?: ContractorSort;
    page?: number;
    pageSize?: number;
};

export const ListContractorQueryStruct = (): T.Describe<ListContractorQuery> => (T.type({
    sortRules: tSpecialOptional(ContractorSortStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorQuery>);

export type ListContractorByIdsQuery = {
    contractorIds: number[];
};

export const ListContractorByIdsQueryStruct = (): T.Describe<ListContractorByIdsQuery> => (T.type({
    contractorIds: T.array(T.number()),
}) as unknown as T.Describe<ListContractorByIdsQuery>);

export type ListContractorBidViewByIdsQuery = {
    ids: number[];
};

export const ListContractorBidViewByIdsQueryStruct = (): T.Describe<ListContractorBidViewByIdsQuery> => (T.type({
    ids: T.array(T.number()),
}) as unknown as T.Describe<ListContractorBidViewByIdsQuery>);

export type ListContractorWithInvitationStatusQuery = {
    constructionProjectId?: number;
    governorateId?: number;
    page?: number;
    pageSize?: number;
};

export const ListContractorWithInvitationStatusQueryStruct = (): T.Describe<ListContractorWithInvitationStatusQuery> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorWithInvitationStatusQuery>);

export type ListContractorNameByIdsQuery = {
    ids: number[];
};

export const ListContractorNameByIdsQueryStruct = (): T.Describe<ListContractorNameByIdsQuery> => (T.type({
    ids: T.array(T.number()),
}) as unknown as T.Describe<ListContractorNameByIdsQuery>);

export type GetContractorQuery = {
    id: number;
};

export const GetContractorQueryStruct = (): T.Describe<GetContractorQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetContractorQuery>);

export type GetContractorProfileQuery = {
    id: number;
};

export const GetContractorProfileQueryStruct = (): T.Describe<GetContractorProfileQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetContractorProfileQuery>);

export type CreateContractorCommand = {
    affiliationType?: AffiliationType;
    userAuthId?: string;
    yoursYearsOfExperience?: number;
    chargeBlackProjects?: number;
    chargeTurnkeyProjects?: number;
    companyRelationship?: CompanyRelationship;
    minimumProjectSize?: number;
    otherContractingCompanies?: boolean;
    governorates?: number[];
    products?: ContractorProductDto[];
    services?: ContractorServiceDto[];
    companies?: ContractorCompanyDto[];
    registeredAt?: ContractorOrganizationDto[];
    linkedProfiles?: ContractorLinkedProfileDto[];
    resources?: ContractorResourceDto[];
    references?: ContractorClientReferenceDto[];
    marketings?: MarketingInformationDto[];
    status?: CompanyStatus;
    ownerId: number;
    companyLogoId?: string;
    name: string;
    nameInArabic?: string;
    email: string;
    phone: string;
    headOfficeGovernorateId: number;
    headOfficeWilayatId: number;
    crNumber: string;
    crStartDate: string;
    crExpirationDate: string;
    projectsDelivered?: number;
    projectsWorkedAtOnce?: number;
    largestProjectAwarded?: number;
    failedCompleteAwardedWork?: boolean;
    anyJudgmentsPendingOrOutstanding?: boolean;
    measuresToMaintainQuality: string;
    planningSoftware?: PlanningSoftware[];
    otherPlanningSoftware: string;
    additionalInformation: string;
    crCertificate?: string[];
    ownerNationalId?: string[];
    manpowerReportIssuedByMom?: string[];
    companyProfile?: string[];
    otherFiles?: string[];
    companyType?: CompanyType;
    ownerName?: string;
    ownerPhone?: string;
    ownerEmail?: string;
};

export const CreateContractorCommandStruct = (): T.Describe<CreateContractorCommand> => (T.type({
    affiliationType: tSpecialOptional(AffiliationTypeStruct()),
    userAuthId: tSpecialOptional(T.string()),
    yoursYearsOfExperience: tSpecialOptional(T.number()),
    chargeBlackProjects: tSpecialOptional(T.number()),
    chargeTurnkeyProjects: tSpecialOptional(T.number()),
    companyRelationship: tSpecialOptional(CompanyRelationshipStruct()),
    minimumProjectSize: tSpecialOptional(T.number()),
    otherContractingCompanies: tSpecialOptional(T.boolean()),
    governorates: tSpecialOptional(T.array(T.number())),
    products: tSpecialOptional(T.array(ContractorProductDtoStruct())),
    services: tSpecialOptional(T.array(ContractorServiceDtoStruct())),
    companies: tSpecialOptional(T.array(ContractorCompanyDtoStruct())),
    registeredAt: tSpecialOptional(T.array(ContractorOrganizationDtoStruct())),
    linkedProfiles: tSpecialOptional(T.array(ContractorLinkedProfileDtoStruct())),
    resources: tSpecialOptional(T.array(ContractorResourceDtoStruct())),
    references: tSpecialOptional(T.array(ContractorClientReferenceDtoStruct())),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
    status: tSpecialOptional(CompanyStatusStruct()),
    ownerId: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
    name: T.string(),
    nameInArabic: tSpecialOptional(T.string()),
    email: T.string(),
    phone: T.string(),
    headOfficeGovernorateId: T.number(),
    headOfficeWilayatId: T.number(),
    crNumber: T.string(),
    crStartDate: T.string(),
    crExpirationDate: T.string(),
    projectsDelivered: tSpecialOptional(T.number()),
    projectsWorkedAtOnce: tSpecialOptional(T.number()),
    largestProjectAwarded: tSpecialOptional(T.number()),
    failedCompleteAwardedWork: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstanding: tSpecialOptional(T.boolean()),
    measuresToMaintainQuality: T.string(),
    planningSoftware: tSpecialOptional(T.array(PlanningSoftwareStruct())),
    otherPlanningSoftware: T.string(),
    additionalInformation: T.string(),
    crCertificate: tSpecialOptional(T.array(T.string())),
    ownerNationalId: tSpecialOptional(T.array(T.string())),
    manpowerReportIssuedByMom: tSpecialOptional(T.array(T.string())),
    companyProfile: tSpecialOptional(T.array(T.string())),
    otherFiles: tSpecialOptional(T.array(T.string())),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerName: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateContractorCommand>);

export type DeleteContractorCommand = {
    id: number;
};

export const DeleteContractorCommandStruct = (): T.Describe<DeleteContractorCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractorCommand>);

export type PatchContractorCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchContractorCommandStruct = (): T.Describe<PatchContractorCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchContractorCommand>);

export type UpdateContractorCommand = {
    id: number;
    yoursYearsOfExperience?: number;
    chargeBlackProjects?: number;
    chargeTurnkeyProjects?: number;
    companyRelationship?: CompanyRelationship;
    minimumProjectSize?: number;
    otherContractingCompanies?: boolean;
    governorates?: number[];
    products?: ContractorProductDto[];
    services?: ContractorServiceDto[];
    companies?: ContractorCompanyDto[];
    registeredAt?: ContractorOrganizationDto[];
    linkedProfiles?: ContractorLinkedProfileDto[];
    resources?: ContractorResourceDto[];
    references?: ContractorClientReferenceDto[];
    marketings?: MarketingInformationDto[];
    status?: CompanyStatus;
    ownerId: number;
    companyLogoId?: string;
    name: string;
    nameInArabic?: string;
    email: string;
    phone: string;
    headOfficeGovernorateId: number;
    headOfficeWilayatId: number;
    crNumber: string;
    crStartDate: string;
    crExpirationDate: string;
    projectsDelivered?: number;
    projectsWorkedAtOnce?: number;
    largestProjectAwarded?: number;
    failedCompleteAwardedWork?: boolean;
    anyJudgmentsPendingOrOutstanding?: boolean;
    measuresToMaintainQuality: string;
    planningSoftware?: PlanningSoftware[];
    otherPlanningSoftware: string;
    additionalInformation: string;
    crCertificate?: string[];
    ownerNationalId?: string[];
    manpowerReportIssuedByMom?: string[];
    companyProfile?: string[];
    otherFiles?: string[];
    companyType?: CompanyType;
    ownerName?: string;
    ownerPhone?: string;
    ownerEmail?: string;
};

export const UpdateContractorCommandStruct = (): T.Describe<UpdateContractorCommand> => (T.type({
    id: T.number(),
    yoursYearsOfExperience: tSpecialOptional(T.number()),
    chargeBlackProjects: tSpecialOptional(T.number()),
    chargeTurnkeyProjects: tSpecialOptional(T.number()),
    companyRelationship: tSpecialOptional(CompanyRelationshipStruct()),
    minimumProjectSize: tSpecialOptional(T.number()),
    otherContractingCompanies: tSpecialOptional(T.boolean()),
    governorates: tSpecialOptional(T.array(T.number())),
    products: tSpecialOptional(T.array(ContractorProductDtoStruct())),
    services: tSpecialOptional(T.array(ContractorServiceDtoStruct())),
    companies: tSpecialOptional(T.array(ContractorCompanyDtoStruct())),
    registeredAt: tSpecialOptional(T.array(ContractorOrganizationDtoStruct())),
    linkedProfiles: tSpecialOptional(T.array(ContractorLinkedProfileDtoStruct())),
    resources: tSpecialOptional(T.array(ContractorResourceDtoStruct())),
    references: tSpecialOptional(T.array(ContractorClientReferenceDtoStruct())),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
    status: tSpecialOptional(CompanyStatusStruct()),
    ownerId: T.number(),
    companyLogoId: tSpecialOptional(T.string()),
    name: T.string(),
    nameInArabic: tSpecialOptional(T.string()),
    email: T.string(),
    phone: T.string(),
    headOfficeGovernorateId: T.number(),
    headOfficeWilayatId: T.number(),
    crNumber: T.string(),
    crStartDate: T.string(),
    crExpirationDate: T.string(),
    projectsDelivered: tSpecialOptional(T.number()),
    projectsWorkedAtOnce: tSpecialOptional(T.number()),
    largestProjectAwarded: tSpecialOptional(T.number()),
    failedCompleteAwardedWork: tSpecialOptional(T.boolean()),
    anyJudgmentsPendingOrOutstanding: tSpecialOptional(T.boolean()),
    measuresToMaintainQuality: T.string(),
    planningSoftware: tSpecialOptional(T.array(PlanningSoftwareStruct())),
    otherPlanningSoftware: T.string(),
    additionalInformation: T.string(),
    crCertificate: tSpecialOptional(T.array(T.string())),
    ownerNationalId: tSpecialOptional(T.array(T.string())),
    manpowerReportIssuedByMom: tSpecialOptional(T.array(T.string())),
    companyProfile: tSpecialOptional(T.array(T.string())),
    otherFiles: tSpecialOptional(T.array(T.string())),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerName: tSpecialOptional(T.string()),
    ownerPhone: tSpecialOptional(T.string()),
    ownerEmail: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateContractorCommand>);

export type UpdateContractorStatusToReviewCommand = {
    id: number;
};

export const UpdateContractorStatusToReviewCommandStruct = (): T.Describe<UpdateContractorStatusToReviewCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateContractorStatusToReviewCommand>);

export type UpdateContractorStatusToApprovedCommand = {
    id: number;
};

export const UpdateContractorStatusToApprovedCommandStruct = (): T.Describe<UpdateContractorStatusToApprovedCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateContractorStatusToApprovedCommand>);

export type UpdateContractorStatusToRejectedCommand = {
    id: number;
};

export const UpdateContractorStatusToRejectedCommandStruct = (): T.Describe<UpdateContractorStatusToRejectedCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateContractorStatusToRejectedCommand>);

export type ListContractorClientReferenceQuery = {
    sortRules?: ContractorClientReferenceSort;
    page?: number;
    pageSize?: number;
};

export const ListContractorClientReferenceQueryStruct = (): T.Describe<ListContractorClientReferenceQuery> => (T.type({
    sortRules: tSpecialOptional(ContractorClientReferenceSortStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorClientReferenceQuery>);

export type ListContractorClientReferenceByContractorIdQuery = {
    contractorId?: number;
    page?: number;
    pageSize?: number;
};

export const ListContractorClientReferenceByContractorIdQueryStruct = (): T.Describe<ListContractorClientReferenceByContractorIdQuery> => (T.type({
    contractorId: tSpecialOptional(T.number()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorClientReferenceByContractorIdQuery>);

export type CreateContractorClientReferenceCommand = {
    projectType?: ConstructionType;
    clientName?: string;
    phoneNumber?: string;
    governorateId?: number;
    wilayatId?: number;
    projectValue?: number;
    projectCompletionDate?: string;
    imagesIds?: string[];
    companyId?: number;
    startDate?: string;
};

export const CreateContractorClientReferenceCommandStruct = (): T.Describe<CreateContractorClientReferenceCommand> => (T.type({
    projectType: tSpecialOptional(ConstructionTypeStruct()),
    clientName: tSpecialOptional(T.string()),
    phoneNumber: tSpecialOptional(T.string()),
    governorateId: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    projectValue: tSpecialOptional(T.number()),
    projectCompletionDate: tSpecialOptional(T.string()),
    imagesIds: tSpecialOptional(T.array(T.string())),
    companyId: tSpecialOptional(T.number()),
    startDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateContractorClientReferenceCommand>);

export type DeleteContractorClientReferenceCommand = {
    id: number;
};

export const DeleteContractorClientReferenceCommandStruct = (): T.Describe<DeleteContractorClientReferenceCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractorClientReferenceCommand>);

export type UpdateContractorClientReferenceCommand = {
    id: number;
    projectType?: ConstructionType;
    clientName?: string;
    phoneNumber?: string;
    governorateId?: number;
    wilayatId?: number;
    projectValue?: number;
    projectCompletionDate?: string;
    imagesIds?: string[];
    companyId?: number;
    startDate?: string;
};

export const UpdateContractorClientReferenceCommandStruct = (): T.Describe<UpdateContractorClientReferenceCommand> => (T.type({
    id: T.number(),
    projectType: tSpecialOptional(ConstructionTypeStruct()),
    clientName: tSpecialOptional(T.string()),
    phoneNumber: tSpecialOptional(T.string()),
    governorateId: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    projectValue: tSpecialOptional(T.number()),
    projectCompletionDate: tSpecialOptional(T.string()),
    imagesIds: tSpecialOptional(T.array(T.string())),
    companyId: tSpecialOptional(T.number()),
    startDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateContractorClientReferenceCommand>);

export type PatchContractorClientReferenceCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchContractorClientReferenceCommandStruct = (): T.Describe<PatchContractorClientReferenceCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchContractorClientReferenceCommand>);

export type CreateContractorCompanyCommand = {
    companyName: string;
    crNumber: string;
    manPower?: number;
    typeOfServiceOrProduct: string;
    companyId: number;
};

export const CreateContractorCompanyCommandStruct = (): T.Describe<CreateContractorCompanyCommand> => (T.type({
    companyName: T.string(),
    crNumber: T.string(),
    manPower: tSpecialOptional(T.number()),
    typeOfServiceOrProduct: T.string(),
    companyId: T.number(),
}) as unknown as T.Describe<CreateContractorCompanyCommand>);

export type UpdateContractorCompanyCommand = {
    companyName: string;
    crNumber: string;
    manPower?: number;
    typeOfServiceOrProduct: string;
    companyId: number;
    id: number;
};

export const UpdateContractorCompanyCommandStruct = (): T.Describe<UpdateContractorCompanyCommand> => (T.type({
    companyName: T.string(),
    crNumber: T.string(),
    manPower: tSpecialOptional(T.number()),
    typeOfServiceOrProduct: T.string(),
    companyId: T.number(),
    id: T.number(),
}) as unknown as T.Describe<UpdateContractorCompanyCommand>);

export type PatchContractorCompanyCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchContractorCompanyCommandStruct = (): T.Describe<PatchContractorCompanyCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchContractorCompanyCommand>);

export type ListContractorLinkedProfileQuery = {
    page?: number;
    pageSize?: number;
};

export const ListContractorLinkedProfileQueryStruct = (): T.Describe<ListContractorLinkedProfileQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorLinkedProfileQuery>);

export type ListContractorLinkedProfileByUserQuery = {
    userId: number;
    page?: number;
    pageSize?: number;
};

export const ListContractorLinkedProfileByUserQueryStruct = (): T.Describe<ListContractorLinkedProfileByUserQuery> => (T.type({
    userId: T.number(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorLinkedProfileByUserQuery>);

export type GetContractorLinkedProfileQuery = {
    id: number;
};

export const GetContractorLinkedProfileQueryStruct = (): T.Describe<GetContractorLinkedProfileQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetContractorLinkedProfileQuery>);

export type CreateContractorLinkedProfileCommand = {
    contractorAffiliationType: ContractorAffiliationType;
    companyId: number;
    phone: string;
    userId: number;
};

export const CreateContractorLinkedProfileCommandStruct = (): T.Describe<CreateContractorLinkedProfileCommand> => (T.type({
    contractorAffiliationType: ContractorAffiliationTypeStruct(),
    companyId: T.number(),
    phone: T.string(),
    userId: T.number(),
}) as unknown as T.Describe<CreateContractorLinkedProfileCommand>);

export type DeleteContractorLinkedProfilerCommand = {
    id: number;
    deletionType?: LinkedProfileDeletionType;
};

export const DeleteContractorLinkedProfilerCommandStruct = (): T.Describe<DeleteContractorLinkedProfilerCommand> => (T.type({
    id: T.number(),
    deletionType: tSpecialOptional(LinkedProfileDeletionTypeStruct()),
}) as unknown as T.Describe<DeleteContractorLinkedProfilerCommand>);

export type UpdateContractorLinkedProfileCommand = {
    contractorAffiliationType: ContractorAffiliationType;
    companyId: number;
    userId: number;
    id: number;
    phone: string;
    updateType: LinkedProfileUpdateType;
};

export const UpdateContractorLinkedProfileCommandStruct = (): T.Describe<UpdateContractorLinkedProfileCommand> => (T.type({
    contractorAffiliationType: ContractorAffiliationTypeStruct(),
    companyId: T.number(),
    userId: T.number(),
    id: T.number(),
    phone: T.string(),
    updateType: LinkedProfileUpdateTypeStruct(),
}) as unknown as T.Describe<UpdateContractorLinkedProfileCommand>);

export type CreateContractorMarketingInformationCommand = {
    marketingService?: MarketingService;
    addresUrl: string;
    companyId: number;
};

export const CreateContractorMarketingInformationCommandStruct = (): T.Describe<CreateContractorMarketingInformationCommand> => (T.type({
    marketingService: tSpecialOptional(MarketingServiceStruct()),
    addresUrl: T.string(),
    companyId: T.number(),
}) as unknown as T.Describe<CreateContractorMarketingInformationCommand>);

export type DeleteContractorMarketingInformationCommand = {
    id: number;
};

export const DeleteContractorMarketingInformationCommandStruct = (): T.Describe<DeleteContractorMarketingInformationCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractorMarketingInformationCommand>);

export type UpdateContractorMarketingInformationCommand = {
    id: number;
    marketingService?: MarketingService;
    addresUrl: string;
    companyId: number;
};

export const UpdateContractorMarketingInformationCommandStruct = (): T.Describe<UpdateContractorMarketingInformationCommand> => (T.type({
    id: T.number(),
    marketingService: tSpecialOptional(MarketingServiceStruct()),
    addresUrl: T.string(),
    companyId: T.number(),
}) as unknown as T.Describe<UpdateContractorMarketingInformationCommand>);

export type PatchContractorMarketingInformationCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchContractorMarketingInformationCommandStruct = (): T.Describe<PatchContractorMarketingInformationCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchContractorMarketingInformationCommand>);

export type CreateContractorOrganizationCommand = {
    organization?: ContractorOrganization;
    otherOrganization: string;
    companyId: number;
};

export const CreateContractorOrganizationCommandStruct = (): T.Describe<CreateContractorOrganizationCommand> => (T.type({
    organization: tSpecialOptional(ContractorOrganizationStruct()),
    otherOrganization: T.string(),
    companyId: T.number(),
}) as unknown as T.Describe<CreateContractorOrganizationCommand>);

export type DeleteContractorOrganizationCommand = {
    id: number;
};

export const DeleteContractorOrganizationCommandStruct = (): T.Describe<DeleteContractorOrganizationCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractorOrganizationCommand>);

export type UpdateContractorOrganizationCommand = {
    organization?: ContractorOrganization;
    otherOrganization: string;
    companyId: number;
    id: number;
};

export const UpdateContractorOrganizationCommandStruct = (): T.Describe<UpdateContractorOrganizationCommand> => (T.type({
    organization: tSpecialOptional(ContractorOrganizationStruct()),
    otherOrganization: T.string(),
    companyId: T.number(),
    id: T.number(),
}) as unknown as T.Describe<UpdateContractorOrganizationCommand>);

export type PatchContractorOrganizationCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchContractorOrganizationCommandStruct = (): T.Describe<PatchContractorOrganizationCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchContractorOrganizationCommand>);

export type CreateContractorResourceCommand = {
    machine?: string;
    specializationId?: number;
    resourceType?: ResourceType;
    numberOfUnit?: number;
    companyId?: number;
};

export const CreateContractorResourceCommandStruct = (): T.Describe<CreateContractorResourceCommand> => (T.type({
    machine: tSpecialOptional(T.string()),
    specializationId: tSpecialOptional(T.number()),
    resourceType: tSpecialOptional(ResourceTypeStruct()),
    numberOfUnit: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateContractorResourceCommand>);

export type DeleteContractorResourceCommand = {
    id: number;
};

export const DeleteContractorResourceCommandStruct = (): T.Describe<DeleteContractorResourceCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractorResourceCommand>);

export type UpdateContractorResourceCommand = {
    machine?: string;
    specializationId?: number;
    id: number;
    resourceType?: ResourceType;
    numberOfUnit?: number;
    companyId?: number;
};

export const UpdateContractorResourceCommandStruct = (): T.Describe<UpdateContractorResourceCommand> => (T.type({
    machine: tSpecialOptional(T.string()),
    specializationId: tSpecialOptional(T.number()),
    id: T.number(),
    resourceType: tSpecialOptional(ResourceTypeStruct()),
    numberOfUnit: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateContractorResourceCommand>);

export type PatchContractorResourceCommand = {
    id: number;
    operations?: JsonPatchElement[];
};

export const PatchContractorResourceCommandStruct = (): T.Describe<PatchContractorResourceCommand> => (T.type({
    id: T.number(),
    operations: tSpecialOptional(T.array(JsonPatchElementStruct())),
}) as unknown as T.Describe<PatchContractorResourceCommand>);

export type ListDictionaryDataQuery = undefined;

export const ListDictionaryDataQueryStruct = () => T.literal(undefined);

export type ListOneDictionaryQuery = {
    dictionary?: DictionaryName;
};

export const ListOneDictionaryQueryStruct = (): T.Describe<ListOneDictionaryQuery> => (T.type({
    dictionary: tSpecialOptional(DictionaryNameStruct()),
}) as unknown as T.Describe<ListOneDictionaryQuery>);

export type ListContractorProjectReviewQuery = {
    contractorId?: number;
    page?: number;
    pageSize?: number;
};

export const ListContractorProjectReviewQueryStruct = (): T.Describe<ListContractorProjectReviewQuery> => (T.type({
    contractorId: tSpecialOptional(T.number()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorProjectReviewQuery>);

export type CreateContractorProjectReviewCommand = {
    recommendation?: number;
    communication?: number;
    qualityOfWork?: number;
    speedOfWork?: number;
    management?: number;
    cooperation?: number;
    feedBack?: string;
    clientReferenceId?: number;
};

export const CreateContractorProjectReviewCommandStruct = (): T.Describe<CreateContractorProjectReviewCommand> => (T.type({
    recommendation: tSpecialOptional(T.number()),
    communication: tSpecialOptional(T.number()),
    qualityOfWork: tSpecialOptional(T.number()),
    speedOfWork: tSpecialOptional(T.number()),
    management: tSpecialOptional(T.number()),
    cooperation: tSpecialOptional(T.number()),
    feedBack: tSpecialOptional(T.string()),
    clientReferenceId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateContractorProjectReviewCommand>);

export type CreateConsultantProjectReviewCommand = {
    recommendation?: number;
    communication?: number;
    qualityOfWork?: number;
    speedOfWork?: number;
    management?: number;
    cooperation?: number;
    feedBack?: string;
    clientReferenceId?: number;
};

export const CreateConsultantProjectReviewCommandStruct = (): T.Describe<CreateConsultantProjectReviewCommand> => (T.type({
    recommendation: tSpecialOptional(T.number()),
    communication: tSpecialOptional(T.number()),
    qualityOfWork: tSpecialOptional(T.number()),
    speedOfWork: tSpecialOptional(T.number()),
    management: tSpecialOptional(T.number()),
    cooperation: tSpecialOptional(T.number()),
    feedBack: tSpecialOptional(T.string()),
    clientReferenceId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateConsultantProjectReviewCommand>);

export type DeleteContractorProjectReviewCommand = {
    id: number;
};

export const DeleteContractorProjectReviewCommandStruct = (): T.Describe<DeleteContractorProjectReviewCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractorProjectReviewCommand>);

export type UpdateContractorProjectReviewCommand = {
    id: number;
    recommendation?: number;
    communication?: number;
    qualityOfWork?: number;
    speedOfWork?: number;
    management?: number;
    cooperation?: number;
    feedBack?: string;
    clientReferenceId?: number;
};

export const UpdateContractorProjectReviewCommandStruct = (): T.Describe<UpdateContractorProjectReviewCommand> => (T.type({
    id: T.number(),
    recommendation: tSpecialOptional(T.number()),
    communication: tSpecialOptional(T.number()),
    qualityOfWork: tSpecialOptional(T.number()),
    speedOfWork: tSpecialOptional(T.number()),
    management: tSpecialOptional(T.number()),
    cooperation: tSpecialOptional(T.number()),
    feedBack: tSpecialOptional(T.string()),
    clientReferenceId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateContractorProjectReviewCommand>);

export type UpdateConsultantProjectReviewCommand = {
    id: number;
    recommendation?: number;
    communication?: number;
    qualityOfWork?: number;
    speedOfWork?: number;
    management?: number;
    cooperation?: number;
    feedBack?: string;
    clientReferenceId?: number;
};

export const UpdateConsultantProjectReviewCommandStruct = (): T.Describe<UpdateConsultantProjectReviewCommand> => (T.type({
    id: T.number(),
    recommendation: tSpecialOptional(T.number()),
    communication: tSpecialOptional(T.number()),
    qualityOfWork: tSpecialOptional(T.number()),
    speedOfWork: tSpecialOptional(T.number()),
    management: tSpecialOptional(T.number()),
    cooperation: tSpecialOptional(T.number()),
    feedBack: tSpecialOptional(T.string()),
    clientReferenceId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateConsultantProjectReviewCommand>);

export type UpdateClientReferenceStatusCommand = {
    id: number;
    isApproved?: boolean;
};

export const UpdateClientReferenceStatusCommandStruct = (): T.Describe<UpdateClientReferenceStatusCommand> => (T.type({
    id: T.number(),
    isApproved: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateClientReferenceStatusCommand>);

export type GetReviewStatisticQuery = {
    companyId?: number;
};

export const GetReviewStatisticQueryStruct = (): T.Describe<GetReviewStatisticQuery> => (T.type({
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetReviewStatisticQuery>);

export type ListUserManagementCompanyDetailsQuery = {
    profileId?: number;
};

export const ListUserManagementCompanyDetailsQueryStruct = (): T.Describe<ListUserManagementCompanyDetailsQuery> => (T.type({
    profileId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListUserManagementCompanyDetailsQuery>);

export enum CompanyType {
    none = 0,
    consultant = 1,
    contractor = 2,
}

export const CompanyTypeStruct = () => T.enums([
    CompanyType.none,
    CompanyType.consultant,
    CompanyType.contractor,
]);

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

export enum ConsultantOrganization {
    none = 0,
    omanHousingBank = 1,
    omanTenderBoard = 2,
    omanSocietyOfEngineers = 3,
    others = 4,
}

export const ConsultantOrganizationStruct = () => T.enums([
    ConsultantOrganization.none,
    ConsultantOrganization.omanHousingBank,
    ConsultantOrganization.omanTenderBoard,
    ConsultantOrganization.omanSocietyOfEngineers,
    ConsultantOrganization.others,
]);

export enum ConsultantAffiliationType {
    none = 0,
    partner = 1,
    engineer = 2,
    supervisor = 3,
    architect = 5,
}

export const ConsultantAffiliationTypeStruct = () => T.enums([
    ConsultantAffiliationType.none,
    ConsultantAffiliationType.partner,
    ConsultantAffiliationType.engineer,
    ConsultantAffiliationType.supervisor,
    ConsultantAffiliationType.architect,
]);

export enum LinkedProfileStatus {
    none = 0,
    pending = 1,
    approved = 2,
}

export const LinkedProfileStatusStruct = () => T.enums([
    LinkedProfileStatus.none,
    LinkedProfileStatus.pending,
    LinkedProfileStatus.approved,
]);

export enum DesignType {
    none = 0,
    design = 1,
    supervision = 2,
}

export const DesignTypeStruct = () => T.enums([
    DesignType.none,
    DesignType.design,
    DesignType.supervision,
]);

export enum ReviewStatus {
    none = 0,
    reviewing = 1,
    approved = 2,
    rejected = 3,
}

export const ReviewStatusStruct = () => T.enums([
    ReviewStatus.none,
    ReviewStatus.reviewing,
    ReviewStatus.approved,
    ReviewStatus.rejected,
]);

export enum ResourceType {
    none = 0,
    engineer = 1,
    labors = 2,
    administration = 3,
    machinery = 4,
}

export const ResourceTypeStruct = () => T.enums([
    ResourceType.none,
    ResourceType.engineer,
    ResourceType.labors,
    ResourceType.administration,
    ResourceType.machinery,
]);

export enum MarketingService {
    none = 0,
    companyWebsite = 1,
    instagram = 2,
    linkedin = 3,
    twitter = 4,
    whatsapp = 5,
    behance = 6,
    dribbble = 7,
    houzz = 8,
    pinterest = 9,
    tikTok = 10,
}

export const MarketingServiceStruct = () => T.enums([
    MarketingService.none,
    MarketingService.companyWebsite,
    MarketingService.instagram,
    MarketingService.linkedin,
    MarketingService.twitter,
    MarketingService.whatsapp,
    MarketingService.behance,
    MarketingService.dribbble,
    MarketingService.houzz,
    MarketingService.pinterest,
    MarketingService.tikTok,
]);

export enum CompanyStatus {
    none = 0,
    draft = 1,
    reviewing = 2,
    approved = 3,
    rejected = 4,
    invited = 5,
}

export const CompanyStatusStruct = () => T.enums([
    CompanyStatus.none,
    CompanyStatus.draft,
    CompanyStatus.reviewing,
    CompanyStatus.approved,
    CompanyStatus.rejected,
    CompanyStatus.invited,
]);

export enum PlanningSoftware {
    none = 0,
    excel = 1,
    microsoftProject = 2,
    primavera = 3,
    other = 4,
}

export const PlanningSoftwareStruct = () => T.enums([
    PlanningSoftware.none,
    PlanningSoftware.excel,
    PlanningSoftware.microsoftProject,
    PlanningSoftware.primavera,
    PlanningSoftware.other,
]);

export enum OperationType {
    unknown = 0,
    add = 1,
    remove = 2,
    replace = 3,
    move = 4,
    copy = 5,
    test = 6,
}

export const OperationTypeStruct = () => T.enums([
    OperationType.unknown,
    OperationType.add,
    OperationType.remove,
    OperationType.replace,
    OperationType.move,
    OperationType.copy,
    OperationType.test,
]);

export enum LinkedProfileDeletionType {
    none = 0,
    deleteLink = 1,
    rejectAffiliation = 2,
}

export const LinkedProfileDeletionTypeStruct = () => T.enums([
    LinkedProfileDeletionType.none,
    LinkedProfileDeletionType.deleteLink,
    LinkedProfileDeletionType.rejectAffiliation,
]);

export enum LinkedProfileUpdateType {
    none = 0,
    acceptProfile = 1,
    updateRecord = 2,
}

export const LinkedProfileUpdateTypeStruct = () => T.enums([
    LinkedProfileUpdateType.none,
    LinkedProfileUpdateType.acceptProfile,
    LinkedProfileUpdateType.updateRecord,
]);

export enum CompanyRelationship {
    none = 0,
    partner = 1,
    engineer = 2,
    supervisor = 3,
    architect = 5,
}

export const CompanyRelationshipStruct = () => T.enums([
    CompanyRelationship.none,
    CompanyRelationship.partner,
    CompanyRelationship.engineer,
    CompanyRelationship.supervisor,
    CompanyRelationship.architect,
]);

export enum ContractorOrganization {
    none = 0,
    omanHousingBank = 1,
    omanTenderBoard = 2,
    pdo = 3,
    others = 4,
}

export const ContractorOrganizationStruct = () => T.enums([
    ContractorOrganization.none,
    ContractorOrganization.omanHousingBank,
    ContractorOrganization.omanTenderBoard,
    ContractorOrganization.pdo,
    ContractorOrganization.others,
]);

export enum ContractorAffiliationType {
    none = 0,
    partner = 1,
    engineer = 2,
    supervisor = 3,
}

export const ContractorAffiliationTypeStruct = () => T.enums([
    ContractorAffiliationType.none,
    ContractorAffiliationType.partner,
    ContractorAffiliationType.engineer,
    ContractorAffiliationType.supervisor,
]);

export enum ConstructionType {
    none = 0,
    structureOnly = 1,
    turnKey = 2,
}

export const ConstructionTypeStruct = () => T.enums([
    ConstructionType.none,
    ConstructionType.structureOnly,
    ConstructionType.turnKey,
]);

export enum DictionaryName {
    none = 0,
    productUnit = 1,
    serviceUnit = 2,
    specialization = 3,
    designServiceUnit = 4,
    consultantProductUnit = 5,
}

export const DictionaryNameStruct = () => T.enums([
    DictionaryName.none,
    DictionaryName.productUnit,
    DictionaryName.serviceUnit,
    DictionaryName.specialization,
    DictionaryName.designServiceUnit,
    DictionaryName.consultantProductUnit,
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

export const execCreateShortCompanyCommand = restClient.encloseQuery<CreateShortCompanyCommand, CreateShortCompanyResponse>(
  props => T.create(props, CreateShortCompanyCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createshortcompanycommand',
    props,
  );
 },
 result => T.create(result, CreateShortCompanyResponseStruct()),
);

export const execGetCompanyDataByPhoneNumberQuery = restClient.encloseQuery<GetCompanyDataByPhoneNumberQuery, GetCompanyDataByPhoneNumberResponse>(
  props => T.create(props, GetCompanyDataByPhoneNumberQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getcompanydatabyphonenumberquery',
    props,
  );
 },
 result => T.create(result, GetCompanyDataByPhoneNumberResponseStruct()),
);

export const execListCompanyByCompanyNameQuery = restClient.encloseQuery<ListCompanyByCompanyNameQuery, ListCompanyByCompanyNameResponse>(
  props => T.create(props, ListCompanyByCompanyNameQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcompanybycompanynamequery',
    props,
  );
 },
 result => T.create(result, ListCompanyByCompanyNameResponseStruct()),
);

export const execGetCompanyDtoByIdQuery = restClient.encloseQuery<GetCompanyDtoByIdQuery, GetCompanyDtoByIdQueryResponse>(
  props => T.create(props, GetCompanyDtoByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getcompanydtobyidquery',
    props,
  );
 },
 result => T.create(result, GetCompanyDtoByIdQueryResponseStruct()),
);

export const execListCompanyNamesByIdsQuery = restClient.encloseQuery<ListCompanyNamesByIdsQuery, ListCompanyNamesByIdsResponse>(
  props => T.create(props, ListCompanyNamesByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcompanynamesbyidsquery',
    props,
  );
 },
 result => T.create(result, ListCompanyNamesByIdsResponseStruct()),
);

export const execSetCompanyOwnerIdCommand = restClient.encloseQuery<SetCompanyOwnerIdCommand, SetCompanyOwnerIdResponse>(
  props => T.create(props, SetCompanyOwnerIdCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/setcompanyowneridcommand',
    props,
  );
 },
 result => T.create(result, SetCompanyOwnerIdResponseStruct()),
);

export const execMakeOwnerCommand = restClient.encloseQuery<MakeOwnerCommand, MakeOwnerResponse>(
  props => T.create(props, MakeOwnerCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/makeownercommand',
    props,
  );
 },
 result => T.create(result, MakeOwnerResponseStruct()),
);

export const execListCompanyInviteQuery = restClient.encloseQuery<ListCompanyInviteQuery, ListCompanyInviteResponse>(
  props => T.create(props, ListCompanyInviteQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcompanyinvitequery',
    props,
  );
 },
 result => T.create(result, ListCompanyInviteResponseStruct()),
);

export const execGetCompanyInviteQuery = restClient.encloseQuery<GetCompanyInviteQuery, GetCompanyInviteResponse>(
  props => T.create(props, GetCompanyInviteQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getcompanyinvitequery/{id}',
    props,
  );
 },
 result => T.create(result, GetCompanyInviteResponseStruct()),
);

export const execCreateCompanyInviteCommand = restClient.encloseQuery<CreateCompanyInviteCommand, CreateCompanyInviteResponse>(
  props => T.create(props, CreateCompanyInviteCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createcompanyinvitecommand',
    props,
  );
 },
 result => T.create(result, CreateCompanyInviteResponseStruct()),
);

export const execDeleteCompanyInviteCommand = restClient.encloseQuery<DeleteCompanyInviteCommand, DeleteCompanyInviteResponse>(
  props => T.create(props, DeleteCompanyInviteCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deletecompanyinvitecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteCompanyInviteResponseStruct()),
);

export const execCompanyIdMigrationQuery = restClient.encloseQuery<CompanyIdMigrationQuery, CompanyIdMigrationResponse>(
  props => T.create(props, CompanyIdMigrationQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/companyidmigrationquery',
    props,
  );
 },
 result => T.create(result, CompanyIdMigrationResponseStruct()),
);

export const execListCompanyQuery = restClient.encloseQuery<ListCompanyQuery, ListCompanyResponse>(
  props => T.create(props, ListCompanyQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/listcompanyquery',
    props,
  );
 },
 result => T.create(result, ListCompanyResponseStruct()),
);

export const execGetCompanyStatusQuery = restClient.encloseQuery<GetCompanyStatusQuery, GetCompanyStatusResponse>(
  props => T.create(props, GetCompanyStatusQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getcompanystatusquery',
    props,
  );
 },
 result => T.create(result, GetCompanyStatusResponseStruct()),
);

export const execListCompanyLogoQuery = restClient.encloseQuery<ListCompanyLogoQuery, ListCompanyLogoResponse>(
  props => T.create(props, ListCompanyLogoQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcompanylogoquery',
    props,
  );
 },
 result => T.create(result, ListCompanyLogoResponseStruct()),
);

export const execListCompanyInformationByIdsQuery = restClient.encloseQuery<ListCompanyInformationByIdsQuery, ListCompanyInformationByIdsResponse>(
  props => T.create(props, ListCompanyInformationByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcompanyinformationbyidsquery/{ids}',
    props,
  );
 },
 result => T.create(result, ListCompanyInformationByIdsResponseStruct()),
);

export const execGetCompanyStatusStatisticQuery = restClient.encloseQuery<GetCompanyStatusStatisticQuery, GetCompanyStatusStatisticResponse>(
  props => T.create(props, GetCompanyStatusStatisticQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getcompanystatusstatisticquery',
    props,
  );
 },
 result => T.create(result, GetCompanyStatusStatisticResponseStruct()),
);

export const execListConsultantQuery = restClient.encloseQuery<ListConsultantQuery, ListConsultantResponse>(
  props => T.create(props, ListConsultantQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/listconsultantquery',
    props,
  );
 },
 result => T.create(result, ListConsultantResponseStruct()),
);

export const execListConsultantSelectionQuery = restClient.encloseQuery<ListConsultantSelectionQuery, ListConsultantSelectionResponse>(
  props => T.create(props, ListConsultantSelectionQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listconsultantselectionquery',
    props,
  );
 },
 result => T.create(result, ListConsultantSelectionResponseStruct()),
);

export const execGetConsultantQuery = restClient.encloseQuery<GetConsultantQuery, GetConsultantResponse>(
  props => T.create(props, GetConsultantQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getconsultantquery/{id}',
    props,
  );
 },
 result => T.create(result, GetConsultantResponseStruct()),
);

export const execGetConsultantProfileQuery = restClient.encloseQuery<GetConsultantProfileQuery, GetConsultantProfileResponse>(
  props => T.create(props, GetConsultantProfileQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getconsultantprofilequery/{id}',
    props,
  );
 },
 result => T.create(result, GetConsultantProfileResponseStruct()),
);

export const execGetEbinaCompanyStatisticQuery = restClient.encloseQuery<GetEbinaCompanyStatisticQuery, GetEbinaCompanyStatisticResponse>(
  props => T.create(props, GetEbinaCompanyStatisticQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getebinacompanystatisticquery',
    props,
  );
 },
 result => T.create(result, GetEbinaCompanyStatisticResponseStruct()),
);

export const execCreateConsultantCommand = restClient.encloseQuery<CreateConsultantCommand, CreateConsultantResponse>(
  props => T.create(props, CreateConsultantCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createconsultantcommand',
    props,
  );
 },
 result => T.create(result, CreateConsultantResponseStruct()),
);

export const execDeleteConsultantCommand = restClient.encloseQuery<DeleteConsultantCommand, DeleteConsultantResponse>(
  props => T.create(props, DeleteConsultantCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deleteconsultantcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteConsultantResponseStruct()),
);

export const execPatchConsultantCommand = restClient.encloseQuery<PatchConsultantCommand, PatchConsultantResponse>(
  props => T.create(props, PatchConsultantCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchconsultantcommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchConsultantResponseStruct()),
);

export const execUpdateConsultantCommand = restClient.encloseQuery<UpdateConsultantCommand, UpdateConsultantResponse>(
  props => T.create(props, UpdateConsultantCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantResponseStruct()),
);

export const execUpdateConsultantStatusToReviewCommand = restClient.encloseQuery<UpdateConsultantStatusToReviewCommand, UpdateConsultantStatusToReviewResponse>(
  props => T.create(props, UpdateConsultantStatusToReviewCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantstatustoreviewcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantStatusToReviewResponseStruct()),
);

export const execUpdateConsultantStatusToApprovedCommand = restClient.encloseQuery<UpdateConsultantStatusToApprovedCommand, UpdateConsultantStatusToApprovedResponse>(
  props => T.create(props, UpdateConsultantStatusToApprovedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantstatustoapprovedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantStatusToApprovedResponseStruct()),
);

export const execUpdateConsultantStatusToRejectedCommand = restClient.encloseQuery<UpdateConsultantStatusToRejectedCommand, UpdateConsultantStatusToRejectedResponse>(
  props => T.create(props, UpdateConsultantStatusToRejectedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantstatustorejectedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantStatusToRejectedResponseStruct()),
);

export const execUpdateCompanyStatusCommand = restClient.encloseQuery<UpdateCompanyStatusCommand, UpdateCompanyStatusResponse>(
  props => T.create(props, UpdateCompanyStatusCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/updatecompanystatuscommand',
    props,
  );
 },
 result => T.create(result, UpdateCompanyStatusResponseStruct()),
);

export const execListConsultantClientReferenceByConsultantIdQuery = restClient.encloseQuery<ListConsultantClientReferenceByConsultantIdQuery, ListConsultantClientReferenceByConsultantIdResponse>(
  props => T.create(props, ListConsultantClientReferenceByConsultantIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listconsultantclientreferencebyconsultantidquery/{consultantid}',
    props,
  );
 },
 result => T.create(result, ListConsultantClientReferenceByConsultantIdResponseStruct()),
);

export const execCreateConsultantClientReferenceCommand = restClient.encloseQuery<CreateConsultantClientReferenceCommand, CreateConsultantClientReferenceResponse>(
  props => T.create(props, CreateConsultantClientReferenceCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createconsultantclientreferencecommand',
    props,
  );
 },
 result => T.create(result, CreateConsultantClientReferenceResponseStruct()),
);

export const execDeleteConsultantClientReferenceCommand = restClient.encloseQuery<DeleteConsultantClientReferenceCommand, DeleteConsultantClientReferenceResponse>(
  props => T.create(props, DeleteConsultantClientReferenceCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deleteconsultantclientreferencecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteConsultantClientReferenceResponseStruct()),
);

export const execUpdateConsultantClientReferenceCommand = restClient.encloseQuery<UpdateConsultantClientReferenceCommand, UpdateConsultantClientReferenceResponse>(
  props => T.create(props, UpdateConsultantClientReferenceCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantclientreferencecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantClientReferenceResponseStruct()),
);

export const execPatchConsultantClientReferenceCommand = restClient.encloseQuery<PatchConsultantClientReferenceCommand, PatchConsultantClientReferenceResponse>(
  props => T.create(props, PatchConsultantClientReferenceCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchconsultantclientreferencecommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchConsultantClientReferenceResponseStruct()),
);

export const execCreateConsultantDesignServiceCommand = restClient.encloseQuery<CreateConsultantDesignServiceCommand, CreateConsultantDesignServiceResponse>(
  props => T.create(props, CreateConsultantDesignServiceCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createconsultantdesignservicecommand',
    props,
  );
 },
 result => T.create(result, CreateConsultantDesignServiceResponseStruct()),
);

export const execDeleteConsultantDesignServiceCommand = restClient.encloseQuery<DeleteConsultantDesignServiceCommand, DeleteConsultantDesignServiceResponse>(
  props => T.create(props, DeleteConsultantDesignServiceCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deleteconsultantdesignservicecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteConsultantDesignServiceResponseStruct()),
);

export const execUpdateConsultantDesignServiceCommand = restClient.encloseQuery<UpdateConsultantDesignServiceCommand, UpdateConsultantDesignServiceResponse>(
  props => T.create(props, UpdateConsultantDesignServiceCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantdesignservicecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantDesignServiceResponseStruct()),
);

export const execPatchConsultantDesignServiceCommand = restClient.encloseQuery<PatchConsultantDesignServiceCommand, PatchConsultantDesignServiceResponse>(
  props => T.create(props, PatchConsultantDesignServiceCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchconsultantdesignservicecommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchConsultantDesignServiceResponseStruct()),
);

export const execCreateConsultantGovernorateCommand = restClient.encloseQuery<CreateConsultantGovernorateCommand, CreateConsultantGovernorateResponse>(
  props => T.create(props, CreateConsultantGovernorateCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createconsultantgovernoratecommand',
    props,
  );
 },
 result => T.create(result, CreateConsultantGovernorateResponseStruct()),
);

export const execDeleteConsultantGovernorateCommand = restClient.encloseQuery<DeleteConsultantGovernorateCommand, DeleteConsultantGovernorateResponse>(
  props => T.create(props, DeleteConsultantGovernorateCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deleteconsultantgovernoratecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteConsultantGovernorateResponseStruct()),
);

export const execUpdateConsultantGovernorateCommand = restClient.encloseQuery<UpdateConsultantGovernorateCommand, UpdateConsultantGovernorateResponse>(
  props => T.create(props, UpdateConsultantGovernorateCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantgovernoratecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantGovernorateResponseStruct()),
);

export const execPatchConsultantGovernorateCommand = restClient.encloseQuery<PatchConsultantGovernorateCommand, PatchConsultantGovernorateResponse>(
  props => T.create(props, PatchConsultantGovernorateCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchconsultantgovernoratecommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchConsultantGovernorateResponseStruct()),
);

export const execCreateConsultantLinkedProfileCommand = restClient.encloseQuery<CreateConsultantLinkedProfileCommand, CreateConsultantLinkedProfileResponse>(
  props => T.create(props, CreateConsultantLinkedProfileCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createconsultantlinkedprofilecommand',
    props,
  );
 },
 result => T.create(result, CreateConsultantLinkedProfileResponseStruct()),
);

export const execDeleteConsultantLinkedProfileCommand = restClient.encloseQuery<DeleteConsultantLinkedProfileCommand, DeleteConsultantLinkedProfileResponse>(
  props => T.create(props, DeleteConsultantLinkedProfileCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deleteconsultantlinkedprofilecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteConsultantLinkedProfileResponseStruct()),
);

export const execUpdateConsultantLinkedProfileCommand = restClient.encloseQuery<UpdateConsultantLinkedProfileCommand, UpdateConsultantLinkedProfileResponse>(
  props => T.create(props, UpdateConsultantLinkedProfileCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantlinkedprofilecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantLinkedProfileResponseStruct()),
);

export const execCreateConsultantMarketingInformationCommand = restClient.encloseQuery<CreateConsultantMarketingInformationCommand, CreateConsultantMarketingInformationResponse>(
  props => T.create(props, CreateConsultantMarketingInformationCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createconsultantmarketinginformationcommand',
    props,
  );
 },
 result => T.create(result, CreateConsultantMarketingInformationResponseStruct()),
);

export const execDeleteConsultantMarketingInformationCommand = restClient.encloseQuery<DeleteConsultantMarketingInformationCommand, DeleteConsultantMarketingInformationResponse>(
  props => T.create(props, DeleteConsultantMarketingInformationCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deleteconsultantmarketinginformationcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteConsultantMarketingInformationResponseStruct()),
);

export const execUpdateConsultantMarketingInformationCommand = restClient.encloseQuery<UpdateConsultantMarketingInformationCommand, UpdateConsultantMarketingInformationResponse>(
  props => T.create(props, UpdateConsultantMarketingInformationCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantmarketinginformationcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantMarketingInformationResponseStruct()),
);

export const execPatchConsultantMarketingInformationCommand = restClient.encloseQuery<PatchConsultantMarketingInformationCommand, PatchConsultantMarketingInformationResponse>(
  props => T.create(props, PatchConsultantMarketingInformationCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchconsultantmarketinginformationcommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchConsultantMarketingInformationResponseStruct()),
);

export const execCreateConsultantOrganizationCommand = restClient.encloseQuery<CreateConsultantOrganizationCommand, CreateConsultantOrganizationResponse>(
  props => T.create(props, CreateConsultantOrganizationCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createconsultantorganizationcommand',
    props,
  );
 },
 result => T.create(result, CreateConsultantOrganizationResponseStruct()),
);

export const execDeleteConsultantOrganizationCommand = restClient.encloseQuery<DeleteConsultantOrganizationCommand, DeleteConsultantOrganizationResponse>(
  props => T.create(props, DeleteConsultantOrganizationCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deleteconsultantorganizationcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteConsultantOrganizationResponseStruct()),
);

export const execUpdateConsultantOrganizationCommand = restClient.encloseQuery<UpdateConsultantOrganizationCommand, UpdateConsultantOrganizationResponse>(
  props => T.create(props, UpdateConsultantOrganizationCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantorganizationcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantOrganizationResponseStruct()),
);

export const execPatchConsultantOrganizationCommand = restClient.encloseQuery<PatchConsultantOrganizationCommand, PatchConsultantOrganizationResponse>(
  props => T.create(props, PatchConsultantOrganizationCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchconsultantorganizationcommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchConsultantOrganizationResponseStruct()),
);

export const execCreateConsultantResourceCommand = restClient.encloseQuery<CreateConsultantResourceCommand, CreateConsultantResourceResponse>(
  props => T.create(props, CreateConsultantResourceCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createconsultantresourcecommand',
    props,
  );
 },
 result => T.create(result, CreateConsultantResourceResponseStruct()),
);

export const execDeleteConsultantResourceCommand = restClient.encloseQuery<DeleteConsultantResourceCommand, DeleteConsultantResourceResponse>(
  props => T.create(props, DeleteConsultantResourceCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deleteconsultantresourcecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteConsultantResourceResponseStruct()),
);

export const execUpdateConsultantResourceCommand = restClient.encloseQuery<UpdateConsultantResourceCommand, UpdateConsultantResourceResponse>(
  props => T.create(props, UpdateConsultantResourceCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantresourcecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantResourceResponseStruct()),
);

export const execPatchConsultantResourceCommand = restClient.encloseQuery<PatchConsultantResourceCommand, PatchConsultantResourceResponse>(
  props => T.create(props, PatchConsultantResourceCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchconsultantresourcecommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchConsultantResourceResponseStruct()),
);

export const execListContractorQuery = restClient.encloseQuery<ListContractorQuery, ListContractorResponse>(
  props => T.create(props, ListContractorQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/listcontractorquery',
    props,
  );
 },
 result => T.create(result, ListContractorResponseStruct()),
);

export const execListContractorByIdsQuery = restClient.encloseQuery<ListContractorByIdsQuery, ListContractorByIdsResponse>(
  props => T.create(props, ListContractorByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcontractorbyidsquery',
    props,
  );
 },
 result => T.create(result, ListContractorByIdsResponseStruct()),
);

export const execListContractorBidViewByIdsQuery = restClient.encloseQuery<ListContractorBidViewByIdsQuery, ListContractorBidViewByIdsResponse>(
  props => T.create(props, ListContractorBidViewByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcontractorbidviewbyidsquery/{ids}',
    props,
  );
 },
 result => T.create(result, ListContractorBidViewByIdsResponseStruct()),
);

export const execListContractorWithInvitationStatusQuery = restClient.encloseQuery<ListContractorWithInvitationStatusQuery, ListContractorWithInvitationStatusResponse>(
  props => T.create(props, ListContractorWithInvitationStatusQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcontractorwithinvitationstatusquery',
    props,
  );
 },
 result => T.create(result, ListContractorWithInvitationStatusResponseStruct()),
);

export const execListContractorNameByIdsQuery = restClient.encloseQuery<ListContractorNameByIdsQuery, ListContractorNameByIdsResponse>(
  props => T.create(props, ListContractorNameByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcontractornamebyidsquery/{ids}',
    props,
  );
 },
 result => T.create(result, ListContractorNameByIdsResponseStruct()),
);

export const execGetContractorQuery = restClient.encloseQuery<GetContractorQuery, GetContractorResponse>(
  props => T.create(props, GetContractorQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getcontractorquery/{id}',
    props,
  );
 },
 result => T.create(result, GetContractorResponseStruct()),
);

export const execGetContractorProfileQuery = restClient.encloseQuery<GetContractorProfileQuery, GetContractorProfileResponse>(
  props => T.create(props, GetContractorProfileQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getcontractorprofilequery/{id}',
    props,
  );
 },
 result => T.create(result, GetContractorProfileResponseStruct()),
);

export const execCreateContractorCommand = restClient.encloseQuery<CreateContractorCommand, CreateContractorResponse>(
  props => T.create(props, CreateContractorCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createcontractorcommand',
    props,
  );
 },
 result => T.create(result, CreateContractorResponseStruct()),
);

export const execDeleteContractorCommand = restClient.encloseQuery<DeleteContractorCommand, DeleteContractorResponse>(
  props => T.create(props, DeleteContractorCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deletecontractorcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractorResponseStruct()),
);

export const execPatchContractorCommand = restClient.encloseQuery<PatchContractorCommand, PatchContractorResponse>(
  props => T.create(props, PatchContractorCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchcontractorcommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchContractorResponseStruct()),
);

export const execUpdateContractorCommand = restClient.encloseQuery<UpdateContractorCommand, UpdateContractorResponse>(
  props => T.create(props, UpdateContractorCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractorcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorResponseStruct()),
);

export const execUpdateContractorStatusToReviewCommand = restClient.encloseQuery<UpdateContractorStatusToReviewCommand, UpdateContractorStatusToReviewResponse>(
  props => T.create(props, UpdateContractorStatusToReviewCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractorstatustoreviewcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorStatusToReviewResponseStruct()),
);

export const execUpdateContractorStatusToApprovedCommand = restClient.encloseQuery<UpdateContractorStatusToApprovedCommand, UpdateContractorStatusToRejectedResponse>(
  props => T.create(props, UpdateContractorStatusToApprovedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractorstatustoapprovedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorStatusToRejectedResponseStruct()),
);

export const execUpdateContractorStatusToRejectedCommand = restClient.encloseQuery<UpdateContractorStatusToRejectedCommand, UpdateContractorStatusToRejectedResponse>(
  props => T.create(props, UpdateContractorStatusToRejectedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractorstatustorejectedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorStatusToRejectedResponseStruct()),
);

export const execListContractorClientReferenceQuery = restClient.encloseQuery<ListContractorClientReferenceQuery, ListContractorClientReferenceResponse>(
  props => T.create(props, ListContractorClientReferenceQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcontractorclientreferencequery',
    props,
  );
 },
 result => T.create(result, ListContractorClientReferenceResponseStruct()),
);

export const execListContractorClientReferenceByContractorIdQuery = restClient.encloseQuery<ListContractorClientReferenceByContractorIdQuery, ListContractorClientReferenceByContractorIdResponse>(
  props => T.create(props, ListContractorClientReferenceByContractorIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcontractorclientreferencebycontractoridquery/{contractorid}',
    props,
  );
 },
 result => T.create(result, ListContractorClientReferenceByContractorIdResponseStruct()),
);

export const execCreateContractorClientReferenceCommand = restClient.encloseQuery<CreateContractorClientReferenceCommand, CreateContractorClientReferenceResponse>(
  props => T.create(props, CreateContractorClientReferenceCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createcontractorclientreferencecommand',
    props,
  );
 },
 result => T.create(result, CreateContractorClientReferenceResponseStruct()),
);

export const execDeleteContractorClientReferenceCommand = restClient.encloseQuery<DeleteContractorClientReferenceCommand, DeleteContractorClientReferenceResponse>(
  props => T.create(props, DeleteContractorClientReferenceCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deletecontractorclientreferencecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractorClientReferenceResponseStruct()),
);

export const execUpdateContractorClientReferenceCommand = restClient.encloseQuery<UpdateContractorClientReferenceCommand, UpdateContractorClientReferenceResponse>(
  props => T.create(props, UpdateContractorClientReferenceCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractorclientreferencecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorClientReferenceResponseStruct()),
);

export const execPatchContractorClientReferenceCommand = restClient.encloseQuery<PatchContractorClientReferenceCommand, PatchContractorClientReferenceResponse>(
  props => T.create(props, PatchContractorClientReferenceCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchcontractorclientreferencecommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchContractorClientReferenceResponseStruct()),
);

export const execCreateContractorCompanyCommand = restClient.encloseQuery<CreateContractorCompanyCommand, CreateContractorCompanyResponse>(
  props => T.create(props, CreateContractorCompanyCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createcontractorcompanycommand',
    props,
  );
 },
 result => T.create(result, CreateContractorCompanyResponseStruct()),
);

export const execUpdateContractorCompanyCommand = restClient.encloseQuery<UpdateContractorCompanyCommand, UpdateContractorCompanyResponse>(
  props => T.create(props, UpdateContractorCompanyCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractorcompanycommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorCompanyResponseStruct()),
);

export const execPatchContractorCompanyCommand = restClient.encloseQuery<PatchContractorCompanyCommand, PatchContractorCompanyResponse>(
  props => T.create(props, PatchContractorCompanyCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchcontractorcompanycommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchContractorCompanyResponseStruct()),
);

export const execListContractorLinkedProfileQuery = restClient.encloseQuery<ListContractorLinkedProfileQuery, ListContractorLinkedProfileResponse>(
  props => T.create(props, ListContractorLinkedProfileQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcontractorlinkedprofilequery',
    props,
  );
 },
 result => T.create(result, ListContractorLinkedProfileResponseStruct()),
);

export const execListContractorLinkedProfileByUserQuery = restClient.encloseQuery<ListContractorLinkedProfileByUserQuery, ListContractorLinkedProfileResponse>(
  props => T.create(props, ListContractorLinkedProfileByUserQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcontractorlinkedprofilebyuserquery',
    props,
  );
 },
 result => T.create(result, ListContractorLinkedProfileResponseStruct()),
);

export const execGetContractorLinkedProfileQuery = restClient.encloseQuery<GetContractorLinkedProfileQuery, GetContractorLinkedProfileResponse>(
  props => T.create(props, GetContractorLinkedProfileQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getcontractorlinkedprofilequery/{id}',
    props,
  );
 },
 result => T.create(result, GetContractorLinkedProfileResponseStruct()),
);

export const execCreateContractorLinkedProfileCommand = restClient.encloseQuery<CreateContractorLinkedProfileCommand, CreateContractorLinkedProfileResponse>(
  props => T.create(props, CreateContractorLinkedProfileCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createcontractorlinkedprofilecommand',
    props,
  );
 },
 result => T.create(result, CreateContractorLinkedProfileResponseStruct()),
);

export const execDeleteContractorLinkedProfilerCommand = restClient.encloseQuery<DeleteContractorLinkedProfilerCommand, DeleteContractorLinkedProfileResponse>(
  props => T.create(props, DeleteContractorLinkedProfilerCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deletecontractorlinkedprofilercommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractorLinkedProfileResponseStruct()),
);

export const execUpdateContractorLinkedProfileCommand = restClient.encloseQuery<UpdateContractorLinkedProfileCommand, UpdateContractorLinkedProfileResponse>(
  props => T.create(props, UpdateContractorLinkedProfileCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractorlinkedprofilecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorLinkedProfileResponseStruct()),
);

export const execCreateContractorMarketingInformationCommand = restClient.encloseQuery<CreateContractorMarketingInformationCommand, CreateContractorMarketingInformationResponse>(
  props => T.create(props, CreateContractorMarketingInformationCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createcontractormarketinginformationcommand',
    props,
  );
 },
 result => T.create(result, CreateContractorMarketingInformationResponseStruct()),
);

export const execDeleteContractorMarketingInformationCommand = restClient.encloseQuery<DeleteContractorMarketingInformationCommand, DeleteContractorMarketingInformationResponse>(
  props => T.create(props, DeleteContractorMarketingInformationCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deletecontractormarketinginformationcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractorMarketingInformationResponseStruct()),
);

export const execUpdateContractorMarketingInformationCommand = restClient.encloseQuery<UpdateContractorMarketingInformationCommand, UpdateContractorMarketingInformationResponse>(
  props => T.create(props, UpdateContractorMarketingInformationCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractormarketinginformationcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorMarketingInformationResponseStruct()),
);

export const execPatchContractorMarketingInformationCommand = restClient.encloseQuery<PatchContractorMarketingInformationCommand, PatchContractorMarketingInformationResponse>(
  props => T.create(props, PatchContractorMarketingInformationCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchcontractormarketinginformationcommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchContractorMarketingInformationResponseStruct()),
);

export const execCreateContractorOrganizationCommand = restClient.encloseQuery<CreateContractorOrganizationCommand, CreateContractorOrganizationResponse>(
  props => T.create(props, CreateContractorOrganizationCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createcontractororganizationcommand',
    props,
  );
 },
 result => T.create(result, CreateContractorOrganizationResponseStruct()),
);

export const execDeleteContractorOrganizationCommand = restClient.encloseQuery<DeleteContractorOrganizationCommand, DeleteContractorOrganizationResponse>(
  props => T.create(props, DeleteContractorOrganizationCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deletecontractororganizationcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractorOrganizationResponseStruct()),
);

export const execUpdateContractorOrganizationCommand = restClient.encloseQuery<UpdateContractorOrganizationCommand, UpdateContractorOrganizationResponse>(
  props => T.create(props, UpdateContractorOrganizationCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractororganizationcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorOrganizationResponseStruct()),
);

export const execPatchContractorOrganizationCommand = restClient.encloseQuery<PatchContractorOrganizationCommand, PatchContractorOrganizationResponse>(
  props => T.create(props, PatchContractorOrganizationCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchcontractororganizationcommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchContractorOrganizationResponseStruct()),
);

export const execCreateContractorResourceCommand = restClient.encloseQuery<CreateContractorResourceCommand, CreateContractorResourceResponse>(
  props => T.create(props, CreateContractorResourceCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createcontractorresourcecommand',
    props,
  );
 },
 result => T.create(result, CreateContractorResourceResponseStruct()),
);

export const execDeleteContractorResourceCommand = restClient.encloseQuery<DeleteContractorResourceCommand, DeleteContractorResourceResponse>(
  props => T.create(props, DeleteContractorResourceCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deletecontractorresourcecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractorResourceResponseStruct()),
);

export const execUpdateContractorResourceCommand = restClient.encloseQuery<UpdateContractorResourceCommand, UpdateContractorResourceResponse>(
  props => T.create(props, UpdateContractorResourceCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractorresourcecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorResourceResponseStruct()),
);

export const execPatchContractorResourceCommand = restClient.encloseQuery<PatchContractorResourceCommand, PatchContractorResourceResponse>(
  props => T.create(props, PatchContractorResourceCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contractor/patchcontractorresourcecommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchContractorResourceResponseStruct()),
);

export const execListDictionaryDataQuery = restClient.encloseQuery<ListDictionaryDataQuery, ListDictionaryDataResponse>(
  props => T.create(props, ListDictionaryDataQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listdictionarydataquery',
    props,
  );
 },
 result => T.create(result, ListDictionaryDataResponseStruct()),
);

export const execListOneDictionaryQuery = restClient.encloseQuery<ListOneDictionaryQuery, ListOneDictionaryResponse>(
  props => T.create(props, ListOneDictionaryQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listonedictionaryquery',
    props,
  );
 },
 result => T.create(result, ListOneDictionaryResponseStruct()),
);

export const execListContractorProjectReviewQuery = restClient.encloseQuery<ListContractorProjectReviewQuery, ListContractorProjectReviewResponse>(
  props => T.create(props, ListContractorProjectReviewQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listcontractorprojectreviewquery/{contractorid}',
    props,
  );
 },
 result => T.create(result, ListContractorProjectReviewResponseStruct()),
);

export const execCreateContractorProjectReviewCommand = restClient.encloseQuery<CreateContractorProjectReviewCommand, CreateContractorProjectReviewResponse>(
  props => T.create(props, CreateContractorProjectReviewCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createcontractorprojectreviewcommand',
    props,
  );
 },
 result => T.create(result, CreateContractorProjectReviewResponseStruct()),
);

export const execCreateConsultantProjectReviewCommand = restClient.encloseQuery<CreateConsultantProjectReviewCommand, CreateConsultantProjectReviewResponse>(
  props => T.create(props, CreateConsultantProjectReviewCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contractor/createconsultantprojectreviewcommand',
    props,
  );
 },
 result => T.create(result, CreateConsultantProjectReviewResponseStruct()),
);

export const execDeleteContractorProjectReviewCommand = restClient.encloseQuery<DeleteContractorProjectReviewCommand, DeleteContractorProjectReviewResponse>(
  props => T.create(props, DeleteContractorProjectReviewCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contractor/deletecontractorprojectreviewcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractorProjectReviewResponseStruct()),
);

export const execUpdateContractorProjectReviewCommand = restClient.encloseQuery<UpdateContractorProjectReviewCommand, UpdateContractorProjectReviewResponse>(
  props => T.create(props, UpdateContractorProjectReviewCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updatecontractorprojectreviewcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractorProjectReviewResponseStruct()),
);

export const execUpdateConsultantProjectReviewCommand = restClient.encloseQuery<UpdateConsultantProjectReviewCommand, UpdateConsultantProjectReviewResponse>(
  props => T.create(props, UpdateConsultantProjectReviewCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateconsultantprojectreviewcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConsultantProjectReviewResponseStruct()),
);

export const execUpdateClientReferenceStatusCommand = restClient.encloseQuery<UpdateClientReferenceStatusCommand, UpdateClientReferenceStatusResponse>(
  props => T.create(props, UpdateClientReferenceStatusCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contractor/updateclientreferencestatuscommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateClientReferenceStatusResponseStruct()),
);

export const execGetReviewStatisticQuery = restClient.encloseQuery<GetReviewStatisticQuery, GetReviewStatisticResponse>(
  props => T.create(props, GetReviewStatisticQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/getreviewstatisticquery',
    props,
  );
 },
 result => T.create(result, GetReviewStatisticResponseStruct()),
);

export const execListUserManagementCompanyDetailsQuery = restClient.encloseQuery<ListUserManagementCompanyDetailsQuery, ListUserManagementCompanyDetailsResponse>(
  props => T.create(props, ListUserManagementCompanyDetailsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contractor/listusermanagementcompanydetailsquery',
    props,
  );
 },
 result => T.create(result, ListUserManagementCompanyDetailsResponseStruct()),
);
