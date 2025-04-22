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

export type OrderDto = {
    id: number;
    orderNumber?: number;
};

export const OrderDtoStruct = (): T.Describe<OrderDto> => (T.type({
    id: T.number(),
    orderNumber: tSpecialOptional(T.number()),
}) as unknown as T.Describe<OrderDto>);

export type ContractSowItemUnitDto = {
    orderNumber?: number;
    englishDescription?: string;
    arabicDescription?: string;
    titleEnglish?: string;
    titleArabic?: string;
    supplier?: string;
    rate?: number;
    acceptanceWorkflow?: number;
    itemId?: number;
    id: number;
};

export const ContractSowItemUnitDtoStruct = (): T.Describe<ContractSowItemUnitDto> => (T.type({
    orderNumber: tSpecialOptional(T.number()),
    englishDescription: tSpecialOptional(T.string()),
    arabicDescription: tSpecialOptional(T.string()),
    titleEnglish: tSpecialOptional(T.string()),
    titleArabic: tSpecialOptional(T.string()),
    supplier: tSpecialOptional(T.string()),
    rate: tSpecialOptional(T.number()),
    acceptanceWorkflow: tSpecialOptional(T.number()),
    itemId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractSowItemUnitDto>);

export type ContractSowItemDto = {
    category?: SowItemCategory;
    orderNumber?: number;
    englishName?: string;
    arabicName?: string;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    contractId?: number;
    approval?: boolean;
    itemUnits?: ContractSowItemUnitDto[];
    materialExecutionStage?: number[];
    id: number;
};

export const ContractSowItemDtoStruct = (): T.Describe<ContractSowItemDto> => (T.type({
    category: tSpecialOptional(SowItemCategoryStruct()),
    orderNumber: tSpecialOptional(T.number()),
    englishName: tSpecialOptional(T.string()),
    arabicName: tSpecialOptional(T.string()),
    numberOfSpecs: tSpecialOptional(T.number()),
    numberOfWorkflows: tSpecialOptional(T.number()),
    consultantVisits: tSpecialOptional(T.number()),
    iconFileId: tSpecialOptional(T.string()),
    contractId: tSpecialOptional(T.number()),
    approval: tSpecialOptional(T.boolean()),
    itemUnits: tSpecialOptional(T.array(ContractSowItemUnitDtoStruct())),
    materialExecutionStage: tSpecialOptional(T.array(T.number())),
    id: T.number(),
}) as unknown as T.Describe<ContractSowItemDto>);

export type ContractClientDto = {
    clientId?: number;
    clientEmail?: string;
    clientName?: string;
    clientPhone?: string;
    clientProfilePicture?: string;
    contractClientName?: string;
    contractClientNameArabic?: string;
    nationalId?: string;
};

export const ContractClientDtoStruct = (): T.Describe<ContractClientDto> => (T.type({
    clientId: tSpecialOptional(T.number()),
    clientEmail: tSpecialOptional(T.string()),
    clientName: tSpecialOptional(T.string()),
    clientPhone: tSpecialOptional(T.string()),
    clientProfilePicture: tSpecialOptional(T.string()),
    contractClientName: tSpecialOptional(T.string()),
    contractClientNameArabic: tSpecialOptional(T.string()),
    nationalId: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ContractClientDto>);

export type ContractSignatureDto = {
    subject?: Subject;
    fileId?: string;
    contractId?: number;
    createdDate?: string;
    id: number;
};

export const ContractSignatureDtoStruct = (): T.Describe<ContractSignatureDto> => (T.type({
    subject: tSpecialOptional(SubjectStruct()),
    fileId: tSpecialOptional(T.string()),
    contractId: tSpecialOptional(T.number()),
    createdDate: tSpecialOptional(T.string()),
    id: T.number(),
}) as unknown as T.Describe<ContractSignatureDto>);

export type ContractProjectDto = {
    projectNumber?: string;
    floorLevels?: string;
    clientId?: number;
    landArea?: number;
    buildingAllAreaInTheDrawings?: boolean;
    addedBuiltUpArea?: number;
    projectType?: ConstructionType;
    landType?: ConstructionLandType;
    startingStep?: ProjectStartingStep;
    additionalComment?: string;
    krookieFiles?: string[];
    drawingFiles?: string[];
    wilayatId?: number;
    governorateId?: number;
    stagePlanId?: number;
    projectBidId?: number;
    contractId?: number;
    consultantId?: number;
    constructionProjectId?: number;
    id: number;
    designProjectStatus?: DesignProjectStatus;
    designConsultantId?: number;
    designId?: number;
    designStageTemplateId?: number;
    designSowId?: number;
    governorateDisplayName?: string;
    wilayatDisplayName?: string;
};

export const ContractProjectDtoStruct = (): T.Describe<ContractProjectDto> => (T.type({
    projectNumber: tSpecialOptional(T.string()),
    floorLevels: tSpecialOptional(T.string()),
    clientId: tSpecialOptional(T.number()),
    landArea: tSpecialOptional(T.number()),
    buildingAllAreaInTheDrawings: tSpecialOptional(T.boolean()),
    addedBuiltUpArea: tSpecialOptional(T.number()),
    projectType: tSpecialOptional(ConstructionTypeStruct()),
    landType: tSpecialOptional(ConstructionLandTypeStruct()),
    startingStep: tSpecialOptional(ProjectStartingStepStruct()),
    additionalComment: tSpecialOptional(T.string()),
    krookieFiles: tSpecialOptional(T.array(T.string())),
    drawingFiles: tSpecialOptional(T.array(T.string())),
    wilayatId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    stagePlanId: tSpecialOptional(T.number()),
    projectBidId: tSpecialOptional(T.number()),
    contractId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
    constructionProjectId: tSpecialOptional(T.number()),
    id: T.number(),
    designProjectStatus: tSpecialOptional(DesignProjectStatusStruct()),
    designConsultantId: tSpecialOptional(T.number()),
    designId: tSpecialOptional(T.number()),
    designStageTemplateId: tSpecialOptional(T.number()),
    designSowId: tSpecialOptional(T.number()),
    governorateDisplayName: tSpecialOptional(T.string()),
    wilayatDisplayName: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ContractProjectDto>);

export type ContractBidCostItemDto = {
    name?: string;
    translationKey?: string;
    quantity?: number;
    quantityUnit?: string;
    price?: number;
    bidCostId?: number;
    id: number;
};

export const ContractBidCostItemDtoStruct = (): T.Describe<ContractBidCostItemDto> => (T.type({
    name: tSpecialOptional(T.string()),
    translationKey: tSpecialOptional(T.string()),
    quantity: tSpecialOptional(T.number()),
    quantityUnit: tSpecialOptional(T.string()),
    price: tSpecialOptional(T.number()),
    bidCostId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractBidCostItemDto>);

export type ContractBidCostDto = {
    costType?: ConstructionType;
    rials?: boolean;
    totalPrice?: number;
    bidId?: number;
    costItems?: ContractBidCostItemDto[];
    id: number;
};

export const ContractBidCostDtoStruct = (): T.Describe<ContractBidCostDto> => (T.type({
    costType: tSpecialOptional(ConstructionTypeStruct()),
    rials: tSpecialOptional(T.boolean()),
    totalPrice: tSpecialOptional(T.number()),
    bidId: tSpecialOptional(T.number()),
    costItems: tSpecialOptional(T.array(ContractBidCostItemDtoStruct())),
    id: T.number(),
}) as unknown as T.Describe<ContractBidCostDto>);

export type ContractBidDto = {
    totalPrice?: number;
    structureItemsTotalPrice?: number;
    turnkeyItemsTotalPrice?: number;
    totalDays?: number;
    numberOfCurrentProjects?: number;
    message?: string;
    bidCosts?: ContractBidCostDto[];
    contractId?: number;
    id: number;
    contractorId?: number;
};

export const ContractBidDtoStruct = (): T.Describe<ContractBidDto> => (T.type({
    totalPrice: tSpecialOptional(T.number()),
    structureItemsTotalPrice: tSpecialOptional(T.number()),
    turnkeyItemsTotalPrice: tSpecialOptional(T.number()),
    totalDays: tSpecialOptional(T.number()),
    numberOfCurrentProjects: tSpecialOptional(T.number()),
    message: tSpecialOptional(T.string()),
    bidCosts: tSpecialOptional(T.array(ContractBidCostDtoStruct())),
    contractId: tSpecialOptional(T.number()),
    id: T.number(),
    contractorId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ContractBidDto>);

export type ContractStagePlanUnitDto = {
    orderNumber?: number;
    numberOfTasks?: number;
    stageName?: string;
    suggestedPercentage?: number;
    description?: string;
    stageNameArabic?: string;
    descriptionArabic?: string;
    sowItems?: number[];
    workflows?: number[];
    valueOfStageInPercentage?: number;
    valueOfStageInOmr?: number;
    timeOfStage?: number;
    planPartId?: number;
    id: number;
};

export const ContractStagePlanUnitDtoStruct = (): T.Describe<ContractStagePlanUnitDto> => (T.type({
    orderNumber: tSpecialOptional(T.number()),
    numberOfTasks: tSpecialOptional(T.number()),
    stageName: tSpecialOptional(T.string()),
    suggestedPercentage: tSpecialOptional(T.number()),
    description: tSpecialOptional(T.string()),
    stageNameArabic: tSpecialOptional(T.string()),
    descriptionArabic: tSpecialOptional(T.string()),
    sowItems: tSpecialOptional(T.array(T.number())),
    workflows: tSpecialOptional(T.array(T.number())),
    valueOfStageInPercentage: tSpecialOptional(T.number()),
    valueOfStageInOmr: tSpecialOptional(T.number()),
    timeOfStage: tSpecialOptional(T.number()),
    planPartId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractStagePlanUnitDto>);

export type ContractStagePlanPartDto = {
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
    totalDays?: number;
    planId?: number;
    planUnits?: ContractStagePlanUnitDto[];
    id: number;
};

export const ContractStagePlanPartDtoStruct = (): T.Describe<ContractStagePlanPartDto> => (T.type({
    planStage: tSpecialOptional(StageTemplatePlanStageStruct()),
    limitPercentage: tSpecialOptional(T.number()),
    totalDays: tSpecialOptional(T.number()),
    planId: tSpecialOptional(T.number()),
    planUnits: tSpecialOptional(T.array(ContractStagePlanUnitDtoStruct())),
    id: T.number(),
}) as unknown as T.Describe<ContractStagePlanPartDto>);

export type ContractStagePlanDto = {
    stageId?: string;
    stageLevels?: number;
    projectScope?: number;
    numberOfInspections?: number;
    projectScopeTwo?: number;
    basement?: number;
    additionalFloors?: number;
    outerBlocks?: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
    planParts?: ContractStagePlanPartDto[];
    contractId?: number;
    id: number;
};

export const ContractStagePlanDtoStruct = (): T.Describe<ContractStagePlanDto> => (T.type({
    stageId: tSpecialOptional(T.string()),
    stageLevels: tSpecialOptional(T.number()),
    projectScope: tSpecialOptional(T.number()),
    numberOfInspections: tSpecialOptional(T.number()),
    projectScopeTwo: tSpecialOptional(T.number()),
    basement: tSpecialOptional(T.number()),
    additionalFloors: tSpecialOptional(T.number()),
    outerBlocks: tSpecialOptional(T.number()),
    groundFloor: tSpecialOptional(T.boolean()),
    levellingFloor: tSpecialOptional(T.boolean()),
    penthouseFloor: tSpecialOptional(T.boolean()),
    pool: tSpecialOptional(T.boolean()),
    planParts: tSpecialOptional(T.array(ContractStagePlanPartDtoStruct())),
    contractId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractStagePlanDto>);

export type BaseCompanyDto = {
    companyId?: number;
    companyType?: CompanyType;
    ownerId?: number;
    companyLogoId?: string;
    name?: string;
    nameInArabic?: string;
    crNumber?: string;
    headOfficeGovernorateId?: number;
    headOfficeWilayatId?: number;
    bankName?: string;
    accountHolderName?: string;
    accountNumber?: string;
    companyOwnerName?: string;
    companyOwnerNameInArabic?: string;
    companyIdNumber?: string;
    workerName?: string;
    workerId?: number;
    workerPhoneNumber?: string;
    workerEmail?: string;
    workerPictureId?: string;
    workerIdNumber?: string;
};

export const BaseCompanyDtoStruct = (): T.Describe<BaseCompanyDto> => (T.type({
    companyId: tSpecialOptional(T.number()),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerId: tSpecialOptional(T.number()),
    companyLogoId: tSpecialOptional(T.string()),
    name: tSpecialOptional(T.string()),
    nameInArabic: tSpecialOptional(T.string()),
    crNumber: tSpecialOptional(T.string()),
    headOfficeGovernorateId: tSpecialOptional(T.number()),
    headOfficeWilayatId: tSpecialOptional(T.number()),
    bankName: tSpecialOptional(T.string()),
    accountHolderName: tSpecialOptional(T.string()),
    accountNumber: tSpecialOptional(T.string()),
    companyOwnerName: tSpecialOptional(T.string()),
    companyOwnerNameInArabic: tSpecialOptional(T.string()),
    companyIdNumber: tSpecialOptional(T.string()),
    workerName: tSpecialOptional(T.string()),
    workerId: tSpecialOptional(T.number()),
    workerPhoneNumber: tSpecialOptional(T.string()),
    workerEmail: tSpecialOptional(T.string()),
    workerPictureId: tSpecialOptional(T.string()),
    workerIdNumber: tSpecialOptional(T.string()),
}) as unknown as T.Describe<BaseCompanyDto>);

export type ContractConsultantDto = {
    pricePerVisit?: number;
    companyId?: number;
    companyType?: CompanyType;
    ownerId?: number;
    companyLogoId?: string;
    name?: string;
    nameInArabic?: string;
    crNumber?: string;
    headOfficeGovernorateId?: number;
    headOfficeWilayatId?: number;
    bankName?: string;
    accountHolderName?: string;
    accountNumber?: string;
    companyOwnerName?: string;
    companyOwnerNameInArabic?: string;
    companyIdNumber?: string;
    workerName?: string;
    workerId?: number;
    workerPhoneNumber?: string;
    workerEmail?: string;
    workerPictureId?: string;
    workerIdNumber?: string;
};

export const ContractConsultantDtoStruct = (): T.Describe<ContractConsultantDto> => (T.type({
    pricePerVisit: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerId: tSpecialOptional(T.number()),
    companyLogoId: tSpecialOptional(T.string()),
    name: tSpecialOptional(T.string()),
    nameInArabic: tSpecialOptional(T.string()),
    crNumber: tSpecialOptional(T.string()),
    headOfficeGovernorateId: tSpecialOptional(T.number()),
    headOfficeWilayatId: tSpecialOptional(T.number()),
    bankName: tSpecialOptional(T.string()),
    accountHolderName: tSpecialOptional(T.string()),
    accountNumber: tSpecialOptional(T.string()),
    companyOwnerName: tSpecialOptional(T.string()),
    companyOwnerNameInArabic: tSpecialOptional(T.string()),
    companyIdNumber: tSpecialOptional(T.string()),
    workerName: tSpecialOptional(T.string()),
    workerId: tSpecialOptional(T.number()),
    workerPhoneNumber: tSpecialOptional(T.string()),
    workerEmail: tSpecialOptional(T.string()),
    workerPictureId: tSpecialOptional(T.string()),
    workerIdNumber: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ContractConsultantDto>);

export type ContractContractorDto = {
    companyRelationship?: CompanyRelationship;
    companyId?: number;
    companyType?: CompanyType;
    ownerId?: number;
    companyLogoId?: string;
    name?: string;
    nameInArabic?: string;
    crNumber?: string;
    headOfficeGovernorateId?: number;
    headOfficeWilayatId?: number;
    bankName?: string;
    accountHolderName?: string;
    accountNumber?: string;
    companyOwnerName?: string;
    companyOwnerNameInArabic?: string;
    companyIdNumber?: string;
    workerName?: string;
    workerId?: number;
    workerPhoneNumber?: string;
    workerEmail?: string;
    workerPictureId?: string;
    workerIdNumber?: string;
};

export const ContractContractorDtoStruct = (): T.Describe<ContractContractorDto> => (T.type({
    companyRelationship: tSpecialOptional(CompanyRelationshipStruct()),
    companyId: tSpecialOptional(T.number()),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerId: tSpecialOptional(T.number()),
    companyLogoId: tSpecialOptional(T.string()),
    name: tSpecialOptional(T.string()),
    nameInArabic: tSpecialOptional(T.string()),
    crNumber: tSpecialOptional(T.string()),
    headOfficeGovernorateId: tSpecialOptional(T.number()),
    headOfficeWilayatId: tSpecialOptional(T.number()),
    bankName: tSpecialOptional(T.string()),
    accountHolderName: tSpecialOptional(T.string()),
    accountNumber: tSpecialOptional(T.string()),
    companyOwnerName: tSpecialOptional(T.string()),
    companyOwnerNameInArabic: tSpecialOptional(T.string()),
    companyIdNumber: tSpecialOptional(T.string()),
    workerName: tSpecialOptional(T.string()),
    workerId: tSpecialOptional(T.number()),
    workerPhoneNumber: tSpecialOptional(T.string()),
    workerEmail: tSpecialOptional(T.string()),
    workerPictureId: tSpecialOptional(T.string()),
    workerIdNumber: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ContractContractorDto>);

export type ContractFileDto = {
    orderNumber?: number;
    headline?: string;
    fileId?: string;
    contractId?: number;
    id: number;
};

export const ContractFileDtoStruct = (): T.Describe<ContractFileDto> => (T.type({
    orderNumber: tSpecialOptional(T.number()),
    headline: tSpecialOptional(T.string()),
    fileId: tSpecialOptional(T.string()),
    contractId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractFileDto>);

export type ContractDto = {
    status?: ContractStatus;
    workflowIds?: number[];
    contractorMaterials?: ContractSowItemDto[];
    clientMaterials?: ContractSowItemDto[];
    templateId?: number;
    clientInformation?: ContractClientDto;
    clientSignature?: ContractSignatureDto;
    contractorSignature?: ContractSignatureDto;
    consultantSignature?: ContractSignatureDto;
    project?: ContractProjectDto;
    bid?: ContractBidDto;
    stagePlan?: ContractStagePlanDto;
    consultantCompany?: ContractConsultantDto;
    contractorCompany?: ContractContractorDto;
    files?: ContractFileDto[];
    fileId?: string;
    projectStartDate?: string;
    id: number;
};

export const ContractDtoStruct = (): T.Describe<ContractDto> => (T.type({
    status: tSpecialOptional(ContractStatusStruct()),
    workflowIds: tSpecialOptional(T.array(T.number())),
    contractorMaterials: tSpecialOptional(T.array(ContractSowItemDtoStruct())),
    clientMaterials: tSpecialOptional(T.array(ContractSowItemDtoStruct())),
    templateId: tSpecialOptional(T.number()),
    clientInformation: tSpecialOptional(ContractClientDtoStruct()),
    clientSignature: tSpecialOptional(ContractSignatureDtoStruct()),
    contractorSignature: tSpecialOptional(ContractSignatureDtoStruct()),
    consultantSignature: tSpecialOptional(ContractSignatureDtoStruct()),
    project: tSpecialOptional(ContractProjectDtoStruct()),
    bid: tSpecialOptional(ContractBidDtoStruct()),
    stagePlan: tSpecialOptional(ContractStagePlanDtoStruct()),
    consultantCompany: tSpecialOptional(ContractConsultantDtoStruct()),
    contractorCompany: tSpecialOptional(ContractContractorDtoStruct()),
    files: tSpecialOptional(T.array(ContractFileDtoStruct())),
    fileId: tSpecialOptional(T.string()),
    projectStartDate: tSpecialOptional(T.string()),
    id: T.number(),
}) as unknown as T.Describe<ContractDto>);

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

export type ConsultantContractedPrice = {
    consultantId?: number;
    pricePerVisit?: number;
};

export const ConsultantContractedPriceStruct = (): T.Describe<ConsultantContractedPrice> => (T.type({
    consultantId: tSpecialOptional(T.number()),
    pricePerVisit: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ConsultantContractedPrice>);

export type ContractTemplateContentDto = {
    orderNumber?: number;
    headline?: string;
    fileId?: string;
    templateId?: number;
    id: number;
};

export const ContractTemplateContentDtoStruct = (): T.Describe<ContractTemplateContentDto> => (T.type({
    orderNumber: tSpecialOptional(T.number()),
    headline: tSpecialOptional(T.string()),
    fileId: tSpecialOptional(T.string()),
    templateId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ContractTemplateContentDto>);

export type ContractTemplateDto = {
    contractName?: string;
    usedFrom?: string;
    usedTo?: string;
    signedContracts?: number;
    status?: ContractTemplateStatus;
    contents?: ContractTemplateContentDto[];
    id: number;
};

export const ContractTemplateDtoStruct = (): T.Describe<ContractTemplateDto> => (T.type({
    contractName: tSpecialOptional(T.string()),
    usedFrom: tSpecialOptional(T.string()),
    usedTo: tSpecialOptional(T.string()),
    signedContracts: tSpecialOptional(T.number()),
    status: tSpecialOptional(ContractTemplateStatusStruct()),
    contents: tSpecialOptional(T.array(ContractTemplateContentDtoStruct())),
    id: T.number(),
}) as unknown as T.Describe<ContractTemplateDto>);

export type GetContractResponse = {
    result: ContractDto;
};

export const GetContractResponseStruct = (): T.Describe<GetContractResponse> => (T.type({
    result: ContractDtoStruct(),
}) as unknown as T.Describe<GetContractResponse>);

export type GetContractByProjectIdResponse = {
    result: ContractDto;
};

export const GetContractByProjectIdResponseStruct = (): T.Describe<GetContractByProjectIdResponse> => (T.type({
    result: ContractDtoStruct(),
}) as unknown as T.Describe<GetContractByProjectIdResponse>);

export type CreateContractResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractResponseStruct = (): T.Describe<CreateContractResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractResponse>);

export type DeleteContractResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractResponseStruct = (): T.Describe<DeleteContractResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractResponse>);

export type UpdateContractStatusToSignedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractStatusToSignedResponseStruct = (): T.Describe<UpdateContractStatusToSignedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractStatusToSignedResponse>);

export type UpdateContractStatusToLiveResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractStatusToLiveResponseStruct = (): T.Describe<UpdateContractStatusToLiveResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractStatusToLiveResponse>);

export type UpdateContractStatusToArchivedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractStatusToArchivedResponseStruct = (): T.Describe<UpdateContractStatusToArchivedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractStatusToArchivedResponse>);

export type UpdateContractCompanyDetailsResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractCompanyDetailsResponseStruct = (): T.Describe<UpdateContractCompanyDetailsResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractCompanyDetailsResponse>);

export type UpdateContractClientResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractClientResponseStruct = (): T.Describe<UpdateContractClientResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractClientResponse>);

export type GetContractedPricePerVisitResponse = {
    result: ConsultantContractedPrice;
};

export const GetContractedPricePerVisitResponseStruct = (): T.Describe<GetContractedPricePerVisitResponse> => (T.type({
    result: ConsultantContractedPriceStruct(),
}) as unknown as T.Describe<GetContractedPricePerVisitResponse>);

export type GetContractBankDetailsResponse = {
    result?: BaseCompanyDto;
};

export const GetContractBankDetailsResponseStruct = (): T.Describe<GetContractBankDetailsResponse> => (T.type({
    result: tSpecialOptional(BaseCompanyDtoStruct()),
}) as unknown as T.Describe<GetContractBankDetailsResponse>);

export type CreateDocumentResponse = {
    result: string;
};

export const CreateDocumentResponseStruct = (): T.Describe<CreateDocumentResponse> => (T.type({
    result: T.string(),
}) as unknown as T.Describe<CreateDocumentResponse>);

export type ListContractFileResponse = {
    result: ContractFileDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractFileResponseStruct = (): T.Describe<ListContractFileResponse> => (T.type({
    result: T.array(ContractFileDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractFileResponse>);

export type ListContractFileByContractIdResponse = {
    result: ContractFileDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractFileByContractIdResponseStruct = (): T.Describe<ListContractFileByContractIdResponse> => (T.type({
    result: T.array(ContractFileDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractFileByContractIdResponse>);

export type GetContractFileResponse = {
    result: ContractFileDto;
};

export const GetContractFileResponseStruct = (): T.Describe<GetContractFileResponse> => (T.type({
    result: ContractFileDtoStruct(),
}) as unknown as T.Describe<GetContractFileResponse>);

export type CreateContractFileResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractFileResponseStruct = (): T.Describe<CreateContractFileResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractFileResponse>);

export type DeleteContractFileResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractFileResponseStruct = (): T.Describe<DeleteContractFileResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractFileResponse>);

export type PatchContractFileOrderResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchContractFileOrderResponseStruct = (): T.Describe<PatchContractFileOrderResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchContractFileOrderResponse>);

export type UpdateContractFileResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractFileResponseStruct = (): T.Describe<UpdateContractFileResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractFileResponse>);

export type CreateContractSignatureResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractSignatureResponseStruct = (): T.Describe<CreateContractSignatureResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractSignatureResponse>);

export type DeleteContractSignatureResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractSignatureResponseStruct = (): T.Describe<DeleteContractSignatureResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractSignatureResponse>);

export type ListContractTemplateResponse = {
    result: ContractTemplateDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractTemplateResponseStruct = (): T.Describe<ListContractTemplateResponse> => (T.type({
    result: T.array(ContractTemplateDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractTemplateResponse>);

export type GetContractTemplateResponse = {
    result: ContractTemplateDto;
};

export const GetContractTemplateResponseStruct = (): T.Describe<GetContractTemplateResponse> => (T.type({
    result: ContractTemplateDtoStruct(),
}) as unknown as T.Describe<GetContractTemplateResponse>);

export type GetWholeContractTemplateResponse = {
    result: ContractTemplateDto;
};

export const GetWholeContractTemplateResponseStruct = (): T.Describe<GetWholeContractTemplateResponse> => (T.type({
    result: ContractTemplateDtoStruct(),
}) as unknown as T.Describe<GetWholeContractTemplateResponse>);

export type GetMasterContractTemplateResponse = {
    result: ContractTemplateDto;
};

export const GetMasterContractTemplateResponseStruct = (): T.Describe<GetMasterContractTemplateResponse> => (T.type({
    result: ContractTemplateDtoStruct(),
}) as unknown as T.Describe<GetMasterContractTemplateResponse>);

export type CreateContractTemplateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractTemplateResponseStruct = (): T.Describe<CreateContractTemplateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractTemplateResponse>);

export type CreateDraftContractTemplateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateDraftContractTemplateResponseStruct = (): T.Describe<CreateDraftContractTemplateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateDraftContractTemplateResponse>);

export type DeleteContractTemplateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractTemplateResponseStruct = (): T.Describe<DeleteContractTemplateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractTemplateResponse>);

export type UpdateContractTemplateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractTemplateResponseStruct = (): T.Describe<UpdateContractTemplateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractTemplateResponse>);

export type UpdateToMasterContractTemplateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateToMasterContractTemplateResponseStruct = (): T.Describe<UpdateToMasterContractTemplateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateToMasterContractTemplateResponse>);

export type ListContractTemplateContentResponse = {
    result: ContractTemplateContentDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractTemplateContentResponseStruct = (): T.Describe<ListContractTemplateContentResponse> => (T.type({
    result: T.array(ContractTemplateContentDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractTemplateContentResponse>);

export type ListContractTemplateContentByIdResponse = {
    result: ContractTemplateContentDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListContractTemplateContentByIdResponseStruct = (): T.Describe<ListContractTemplateContentByIdResponse> => (T.type({
    result: T.array(ContractTemplateContentDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractTemplateContentByIdResponse>);

export type GetContractTemplateContentResponse = {
    result: ContractTemplateContentDto;
};

export const GetContractTemplateContentResponseStruct = (): T.Describe<GetContractTemplateContentResponse> => (T.type({
    result: ContractTemplateContentDtoStruct(),
}) as unknown as T.Describe<GetContractTemplateContentResponse>);

export type CreateContractTemplateContentResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateContractTemplateContentResponseStruct = (): T.Describe<CreateContractTemplateContentResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateContractTemplateContentResponse>);

export type DeleteContractTemplateContentResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteContractTemplateContentResponseStruct = (): T.Describe<DeleteContractTemplateContentResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteContractTemplateContentResponse>);

export type PatchContractTemplateContentOrderResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchContractTemplateContentOrderResponseStruct = (): T.Describe<PatchContractTemplateContentOrderResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchContractTemplateContentOrderResponse>);

export type UpdateContractTemplateContentResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateContractTemplateContentResponseStruct = (): T.Describe<UpdateContractTemplateContentResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateContractTemplateContentResponse>);

export type GetContractQuery = {
    id: number;
};

export const GetContractQueryStruct = (): T.Describe<GetContractQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetContractQuery>);

export type GetContractByProjectIdQuery = {
    projectId: number;
};

export const GetContractByProjectIdQueryStruct = (): T.Describe<GetContractByProjectIdQuery> => (T.type({
    projectId: T.number(),
}) as unknown as T.Describe<GetContractByProjectIdQuery>);

export type CreateContractCommand = {
    projectId: number;
};

export const CreateContractCommandStruct = (): T.Describe<CreateContractCommand> => (T.type({
    projectId: T.number(),
}) as unknown as T.Describe<CreateContractCommand>);

export type DeleteContractCommand = {
    id: number;
};

export const DeleteContractCommandStruct = (): T.Describe<DeleteContractCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractCommand>);

export type UpdateContractStatusToSignedCommand = {
    id: number;
};

export const UpdateContractStatusToSignedCommandStruct = (): T.Describe<UpdateContractStatusToSignedCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateContractStatusToSignedCommand>);

export type UpdateContractStatusToLiveCommand = {
    id: number;
};

export const UpdateContractStatusToLiveCommandStruct = (): T.Describe<UpdateContractStatusToLiveCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateContractStatusToLiveCommand>);

export type UpdateContractStatusToArchivedCommand = {
    id: number;
};

export const UpdateContractStatusToArchivedCommandStruct = (): T.Describe<UpdateContractStatusToArchivedCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateContractStatusToArchivedCommand>);

export type UpdateContractCompanyDetailsCommand = {
    contractId?: number;
    companyId?: number;
    bankName?: string;
    accountHolderName?: string;
    accountNumber?: string;
    companyOwnerName?: string;
    companyOwnerNameInArabic?: string;
    companyIdNumber?: string;
    workerName?: string;
    workerId?: number;
    workerIdNumber?: string;
    workerPhoneNumber?: string;
    workerEmail?: string;
    workerPictureId?: string;
};

export const UpdateContractCompanyDetailsCommandStruct = (): T.Describe<UpdateContractCompanyDetailsCommand> => (T.type({
    contractId: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
    bankName: tSpecialOptional(T.string()),
    accountHolderName: tSpecialOptional(T.string()),
    accountNumber: tSpecialOptional(T.string()),
    companyOwnerName: tSpecialOptional(T.string()),
    companyOwnerNameInArabic: tSpecialOptional(T.string()),
    companyIdNumber: tSpecialOptional(T.string()),
    workerName: tSpecialOptional(T.string()),
    workerId: tSpecialOptional(T.number()),
    workerIdNumber: tSpecialOptional(T.string()),
    workerPhoneNumber: tSpecialOptional(T.string()),
    workerEmail: tSpecialOptional(T.string()),
    workerPictureId: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateContractCompanyDetailsCommand>);

export type UpdateContractClientCommand = {
    contractId?: number;
    contractClientName?: string;
    contractClientNameArabic?: string;
    nationalId?: string;
};

export const UpdateContractClientCommandStruct = (): T.Describe<UpdateContractClientCommand> => (T.type({
    contractId: tSpecialOptional(T.number()),
    contractClientName: tSpecialOptional(T.string()),
    contractClientNameArabic: tSpecialOptional(T.string()),
    nationalId: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateContractClientCommand>);

export type GetContractedPricePerVisitQuery = {
    projectId?: number;
};

export const GetContractedPricePerVisitQueryStruct = (): T.Describe<GetContractedPricePerVisitQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetContractedPricePerVisitQuery>);

export type GetContractBankDetailsQuery = {
    constructionProjectId?: number;
    contextType?: ContextType;
};

export const GetContractBankDetailsQueryStruct = (): T.Describe<GetContractBankDetailsQuery> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    contextType: tSpecialOptional(ContextTypeStruct()),
}) as unknown as T.Describe<GetContractBankDetailsQuery>);

export type CreateDocumentRequest = undefined;

export const CreateDocumentRequestStruct = () => T.literal(undefined);

export type ListContractFileQuery = {
    page?: number;
    pageSize?: number;
};

export const ListContractFileQueryStruct = (): T.Describe<ListContractFileQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractFileQuery>);

export type ListContractFileByContractIdQuery = {
    contractId: number;
};

export const ListContractFileByContractIdQueryStruct = (): T.Describe<ListContractFileByContractIdQuery> => (T.type({
    contractId: T.number(),
}) as unknown as T.Describe<ListContractFileByContractIdQuery>);

export type GetContractFileQuery = {
    id: number;
};

export const GetContractFileQueryStruct = (): T.Describe<GetContractFileQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetContractFileQuery>);

export type CreateContractFileCommand = {
    orderNumber: number;
    headline: string;
    fileId: string;
    contractId: number;
};

export const CreateContractFileCommandStruct = (): T.Describe<CreateContractFileCommand> => (T.type({
    orderNumber: T.number(),
    headline: T.string(),
    fileId: T.string(),
    contractId: T.number(),
}) as unknown as T.Describe<CreateContractFileCommand>);

export type DeleteContractFileCommand = {
    id: number;
};

export const DeleteContractFileCommandStruct = (): T.Describe<DeleteContractFileCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractFileCommand>);

export type PatchContractFileOrderCommand = {
    orderItems?: OrderDto[];
};

export const PatchContractFileOrderCommandStruct = (): T.Describe<PatchContractFileOrderCommand> => (T.type({
    orderItems: tSpecialOptional(T.array(OrderDtoStruct())),
}) as unknown as T.Describe<PatchContractFileOrderCommand>);

export type UpdateContractFileCommand = {
    orderNumber: number;
    headline: string;
    fileId: string;
    contractId: number;
    id: number;
};

export const UpdateContractFileCommandStruct = (): T.Describe<UpdateContractFileCommand> => (T.type({
    orderNumber: T.number(),
    headline: T.string(),
    fileId: T.string(),
    contractId: T.number(),
    id: T.number(),
}) as unknown as T.Describe<UpdateContractFileCommand>);

export type CreateContractSignatureCommand = {
    subject: Subject;
    fileId: string;
    contractId: number;
    workerId?: number;
};

export const CreateContractSignatureCommandStruct = (): T.Describe<CreateContractSignatureCommand> => (T.type({
    subject: SubjectStruct(),
    fileId: T.string(),
    contractId: T.number(),
    workerId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateContractSignatureCommand>);

export type DeleteContractSignatureCommand = {
    id: number;
};

export const DeleteContractSignatureCommandStruct = (): T.Describe<DeleteContractSignatureCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractSignatureCommand>);

export type ListContractTemplateQuery = {
    page?: number;
    pageSize?: number;
};

export const ListContractTemplateQueryStruct = (): T.Describe<ListContractTemplateQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractTemplateQuery>);

export type GetContractTemplateQuery = {
    id: number;
};

export const GetContractTemplateQueryStruct = (): T.Describe<GetContractTemplateQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetContractTemplateQuery>);

export type GetWholeContractTemplateQuery = {
    id: number;
};

export const GetWholeContractTemplateQueryStruct = (): T.Describe<GetWholeContractTemplateQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetWholeContractTemplateQuery>);

export type GetMasterContractTemplateQuery = undefined;

export const GetMasterContractTemplateQueryStruct = () => T.literal(undefined);

export type CreateContractTemplateCommand = {
    contractName: string;
    signedContracts?: number;
};

export const CreateContractTemplateCommandStruct = (): T.Describe<CreateContractTemplateCommand> => (T.type({
    contractName: T.string(),
    signedContracts: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateContractTemplateCommand>);

export type CreateDraftContractTemplateCommand = undefined;

export const CreateDraftContractTemplateCommandStruct = () => T.literal(undefined);

export type DeleteContractTemplateCommand = {
    id: number;
};

export const DeleteContractTemplateCommandStruct = (): T.Describe<DeleteContractTemplateCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractTemplateCommand>);

export type UpdateContractTemplateCommand = {
    contractName: string;
    signedContracts?: number;
    id: number;
};

export const UpdateContractTemplateCommandStruct = (): T.Describe<UpdateContractTemplateCommand> => (T.type({
    contractName: T.string(),
    signedContracts: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<UpdateContractTemplateCommand>);

export type UpdateToMasterContractTemplateCommand = {
    id: number;
};

export const UpdateToMasterContractTemplateCommandStruct = (): T.Describe<UpdateToMasterContractTemplateCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateToMasterContractTemplateCommand>);

export type ListContractTemplateContentQuery = undefined;

export const ListContractTemplateContentQueryStruct = () => T.literal(undefined);

export type ListContractTemplateContentByIdQuery = {
    templateId?: number;
};

export const ListContractTemplateContentByIdQueryStruct = (): T.Describe<ListContractTemplateContentByIdQuery> => (T.type({
    templateId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractTemplateContentByIdQuery>);

export type GetContractTemplateContentQuery = {
    id: number;
};

export const GetContractTemplateContentQueryStruct = (): T.Describe<GetContractTemplateContentQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetContractTemplateContentQuery>);

export type CreateContractTemplateContentCommand = {
    orderNumber: number;
    headline: string;
    fileId: string;
    templateId: number;
};

export const CreateContractTemplateContentCommandStruct = (): T.Describe<CreateContractTemplateContentCommand> => (T.type({
    orderNumber: T.number(),
    headline: T.string(),
    fileId: T.string(),
    templateId: T.number(),
}) as unknown as T.Describe<CreateContractTemplateContentCommand>);

export type DeleteContractTemplateContentCommand = {
    id: number;
};

export const DeleteContractTemplateContentCommandStruct = (): T.Describe<DeleteContractTemplateContentCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteContractTemplateContentCommand>);

export type PatchContractTemplateContentOrderCommand = {
    orderItems?: OrderDto[];
};

export const PatchContractTemplateContentOrderCommandStruct = (): T.Describe<PatchContractTemplateContentOrderCommand> => (T.type({
    orderItems: tSpecialOptional(T.array(OrderDtoStruct())),
}) as unknown as T.Describe<PatchContractTemplateContentOrderCommand>);

export type UpdateContractTemplateContentCommand = {
    orderNumber: number;
    headline: string;
    fileId: string;
    templateId: number;
    id: number;
};

export const UpdateContractTemplateContentCommandStruct = (): T.Describe<UpdateContractTemplateContentCommand> => (T.type({
    orderNumber: T.number(),
    headline: T.string(),
    fileId: T.string(),
    templateId: T.number(),
    id: T.number(),
}) as unknown as T.Describe<UpdateContractTemplateContentCommand>);

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

export enum Subject {
    none = 0,
    client = 1,
    contractor = 2,
    consultant = 3,
}

export const SubjectStruct = () => T.enums([
    Subject.none,
    Subject.client,
    Subject.contractor,
    Subject.consultant,
]);

export enum ContractStatus {
    none = 0,
    readyToSign = 1,
    signed = 2,
    liveInPm = 3,
    archived = 4,
}

export const ContractStatusStruct = () => T.enums([
    ContractStatus.none,
    ContractStatus.readyToSign,
    ContractStatus.signed,
    ContractStatus.liveInPm,
    ContractStatus.archived,
]);

export enum SowItemCategory {
    none = 0,
    contractorStructuralMepMaterials = 1,
    clientSubcontractedScopeAndMaterials = 2,
    clientMaterialsForContractorInstallation = 3,
    clientMaterialsInstalledByEither = 4,
    payment = 5,
    notApplicable = 6,
}

export const SowItemCategoryStruct = () => T.enums([
    SowItemCategory.none,
    SowItemCategory.contractorStructuralMepMaterials,
    SowItemCategory.clientSubcontractedScopeAndMaterials,
    SowItemCategory.clientMaterialsForContractorInstallation,
    SowItemCategory.clientMaterialsInstalledByEither,
    SowItemCategory.payment,
    SowItemCategory.notApplicable,
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

export enum ConstructionLandType {
    none = 0,
    residential = 1,
    commercial = 2,
}

export const ConstructionLandTypeStruct = () => T.enums([
    ConstructionLandType.none,
    ConstructionLandType.residential,
    ConstructionLandType.commercial,
]);

export enum ProjectStartingStep {
    none = 0,
    design = 1,
    build = 2,
}

export const ProjectStartingStepStruct = () => T.enums([
    ProjectStartingStep.none,
    ProjectStartingStep.design,
    ProjectStartingStep.build,
]);

export enum DesignProjectStatus {
    none = 0,
    adminReview = 1,
    consultantReview = 2,
    advancePayment = 3,
    uploadDrawings = 4,
    finalPayment = 5,
    completed = 6,
    rejected = 10,
}

export const DesignProjectStatusStruct = () => T.enums([
    DesignProjectStatus.none,
    DesignProjectStatus.adminReview,
    DesignProjectStatus.consultantReview,
    DesignProjectStatus.advancePayment,
    DesignProjectStatus.uploadDrawings,
    DesignProjectStatus.finalPayment,
    DesignProjectStatus.completed,
    DesignProjectStatus.rejected,
]);

export enum StageTemplatePlanStage {
    none = 0,
    mobilization = 1,
    structure = 2,
    internalFinishes = 3,
    externalFinishes = 4,
    handover = 5,
    maintenance = 6,
}

export const StageTemplatePlanStageStruct = () => T.enums([
    StageTemplatePlanStage.none,
    StageTemplatePlanStage.mobilization,
    StageTemplatePlanStage.structure,
    StageTemplatePlanStage.internalFinishes,
    StageTemplatePlanStage.externalFinishes,
    StageTemplatePlanStage.handover,
    StageTemplatePlanStage.maintenance,
]);

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

export enum ContractTemplateStatus {
    none = 0,
    drafted = 1,
    live = 2,
    inactive = 3,
}

export const ContractTemplateStatusStruct = () => T.enums([
    ContractTemplateStatus.none,
    ContractTemplateStatus.drafted,
    ContractTemplateStatus.live,
    ContractTemplateStatus.inactive,
]);

export const execGetContractQuery = restClient.encloseQuery<GetContractQuery, GetContractResponse>(
  props => T.create(props, GetContractQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/getcontractquery/{id}',
    props,
  );
 },
 result => T.create(result, GetContractResponseStruct()),
);

export const execGetContractByProjectIdQuery = restClient.encloseQuery<GetContractByProjectIdQuery, GetContractByProjectIdResponse>(
  props => T.create(props, GetContractByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/getcontractbyprojectidquery',
    props,
  );
 },
 result => T.create(result, GetContractByProjectIdResponseStruct()),
);

export const execCreateContractCommand = restClient.encloseQuery<CreateContractCommand, CreateContractResponse>(
  props => T.create(props, CreateContractCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contract/createcontractcommand',
    props,
  );
 },
 result => T.create(result, CreateContractResponseStruct()),
);

export const execDeleteContractCommand = restClient.encloseQuery<DeleteContractCommand, DeleteContractResponse>(
  props => T.create(props, DeleteContractCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contract/deletecontractcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractResponseStruct()),
);

export const execUpdateContractStatusToSignedCommand = restClient.encloseQuery<UpdateContractStatusToSignedCommand, UpdateContractStatusToSignedResponse>(
  props => T.create(props, UpdateContractStatusToSignedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contract/updatecontractstatustosignedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractStatusToSignedResponseStruct()),
);

export const execUpdateContractStatusToLiveCommand = restClient.encloseQuery<UpdateContractStatusToLiveCommand, UpdateContractStatusToLiveResponse>(
  props => T.create(props, UpdateContractStatusToLiveCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contract/updatecontractstatustolivecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractStatusToLiveResponseStruct()),
);

export const execUpdateContractStatusToArchivedCommand = restClient.encloseQuery<UpdateContractStatusToArchivedCommand, UpdateContractStatusToArchivedResponse>(
  props => T.create(props, UpdateContractStatusToArchivedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contract/updatecontractstatustoarchivedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractStatusToArchivedResponseStruct()),
);

export const execUpdateContractCompanyDetailsCommand = restClient.encloseQuery<UpdateContractCompanyDetailsCommand, UpdateContractCompanyDetailsResponse>(
  props => T.create(props, UpdateContractCompanyDetailsCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contract/updatecontractcompanydetailscommand',
    props,
  );
 },
 result => T.create(result, UpdateContractCompanyDetailsResponseStruct()),
);

export const execUpdateContractClientCommand = restClient.encloseQuery<UpdateContractClientCommand, UpdateContractClientResponse>(
  props => T.create(props, UpdateContractClientCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contract/updatecontractclientcommand',
    props,
  );
 },
 result => T.create(result, UpdateContractClientResponseStruct()),
);

export const execGetContractedPricePerVisitQuery = restClient.encloseQuery<GetContractedPricePerVisitQuery, GetContractedPricePerVisitResponse>(
  props => T.create(props, GetContractedPricePerVisitQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/getcontractedpricepervisitquery',
    props,
  );
 },
 result => T.create(result, GetContractedPricePerVisitResponseStruct()),
);

export const execGetContractBankDetailsQuery = restClient.encloseQuery<GetContractBankDetailsQuery, GetContractBankDetailsResponse>(
  props => T.create(props, GetContractBankDetailsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/getcontractbankdetailsquery',
    props,
  );
 },
 result => T.create(result, GetContractBankDetailsResponseStruct()),
);

export const execCreateDocumentRequest = restClient.encloseQuery<CreateDocumentRequest, CreateDocumentResponse>(
  props => T.create(props, CreateDocumentRequestStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/createdocumentrequest',
    props,
  );
 },
 result => T.create(result, CreateDocumentResponseStruct()),
);

export const execListContractFileQuery = restClient.encloseQuery<ListContractFileQuery, ListContractFileResponse>(
  props => T.create(props, ListContractFileQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/listcontractfilequery',
    props,
  );
 },
 result => T.create(result, ListContractFileResponseStruct()),
);

export const execListContractFileByContractIdQuery = restClient.encloseQuery<ListContractFileByContractIdQuery, ListContractFileByContractIdResponse>(
  props => T.create(props, ListContractFileByContractIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/listcontractfilebycontractidquery',
    props,
  );
 },
 result => T.create(result, ListContractFileByContractIdResponseStruct()),
);

export const execGetContractFileQuery = restClient.encloseQuery<GetContractFileQuery, GetContractFileResponse>(
  props => T.create(props, GetContractFileQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/getcontractfilequery/{id}',
    props,
  );
 },
 result => T.create(result, GetContractFileResponseStruct()),
);

export const execCreateContractFileCommand = restClient.encloseQuery<CreateContractFileCommand, CreateContractFileResponse>(
  props => T.create(props, CreateContractFileCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contract/createcontractfilecommand',
    props,
  );
 },
 result => T.create(result, CreateContractFileResponseStruct()),
);

export const execDeleteContractFileCommand = restClient.encloseQuery<DeleteContractFileCommand, DeleteContractFileResponse>(
  props => T.create(props, DeleteContractFileCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contract/deletecontractfilecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractFileResponseStruct()),
);

export const execPatchContractFileOrderCommand = restClient.encloseQuery<PatchContractFileOrderCommand, PatchContractFileOrderResponse>(
  props => T.create(props, PatchContractFileOrderCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contract/patchcontractfileordercommand',
    props,
  );
 },
 result => T.create(result, PatchContractFileOrderResponseStruct()),
);

export const execUpdateContractFileCommand = restClient.encloseQuery<UpdateContractFileCommand, UpdateContractFileResponse>(
  props => T.create(props, UpdateContractFileCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contract/updatecontractfilecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractFileResponseStruct()),
);

export const execCreateContractSignatureCommand = restClient.encloseQuery<CreateContractSignatureCommand, CreateContractSignatureResponse>(
  props => T.create(props, CreateContractSignatureCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contract/createcontractsignaturecommand',
    props,
  );
 },
 result => T.create(result, CreateContractSignatureResponseStruct()),
);

export const execDeleteContractSignatureCommand = restClient.encloseQuery<DeleteContractSignatureCommand, DeleteContractSignatureResponse>(
  props => T.create(props, DeleteContractSignatureCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contract/deletecontractsignaturecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractSignatureResponseStruct()),
);

export const execListContractTemplateQuery = restClient.encloseQuery<ListContractTemplateQuery, ListContractTemplateResponse>(
  props => T.create(props, ListContractTemplateQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/listcontracttemplatequery',
    props,
  );
 },
 result => T.create(result, ListContractTemplateResponseStruct()),
);

export const execGetContractTemplateQuery = restClient.encloseQuery<GetContractTemplateQuery, GetContractTemplateResponse>(
  props => T.create(props, GetContractTemplateQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/getcontracttemplatequery/{id}',
    props,
  );
 },
 result => T.create(result, GetContractTemplateResponseStruct()),
);

export const execGetWholeContractTemplateQuery = restClient.encloseQuery<GetWholeContractTemplateQuery, GetWholeContractTemplateResponse>(
  props => T.create(props, GetWholeContractTemplateQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/getwholecontracttemplatequery/{id}',
    props,
  );
 },
 result => T.create(result, GetWholeContractTemplateResponseStruct()),
);

export const execGetMasterContractTemplateQuery = restClient.encloseQuery<GetMasterContractTemplateQuery, GetMasterContractTemplateResponse>(
  props => T.create(props, GetMasterContractTemplateQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/getmastercontracttemplatequery',
    props,
  );
 },
 result => T.create(result, GetMasterContractTemplateResponseStruct()),
);

export const execCreateContractTemplateCommand = restClient.encloseQuery<CreateContractTemplateCommand, CreateContractTemplateResponse>(
  props => T.create(props, CreateContractTemplateCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contract/createcontracttemplatecommand',
    props,
  );
 },
 result => T.create(result, CreateContractTemplateResponseStruct()),
);

export const execCreateDraftContractTemplateCommand = restClient.encloseQuery<CreateDraftContractTemplateCommand, CreateDraftContractTemplateResponse>(
  props => T.create(props, CreateDraftContractTemplateCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contract/createdraftcontracttemplatecommand',
    props,
  );
 },
 result => T.create(result, CreateDraftContractTemplateResponseStruct()),
);

export const execDeleteContractTemplateCommand = restClient.encloseQuery<DeleteContractTemplateCommand, DeleteContractTemplateResponse>(
  props => T.create(props, DeleteContractTemplateCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contract/deletecontracttemplatecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractTemplateResponseStruct()),
);

export const execUpdateContractTemplateCommand = restClient.encloseQuery<UpdateContractTemplateCommand, UpdateContractTemplateResponse>(
  props => T.create(props, UpdateContractTemplateCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contract/updatecontracttemplatecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractTemplateResponseStruct()),
);

export const execUpdateToMasterContractTemplateCommand = restClient.encloseQuery<UpdateToMasterContractTemplateCommand, UpdateToMasterContractTemplateResponse>(
  props => T.create(props, UpdateToMasterContractTemplateCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contract/updatetomastercontracttemplatecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateToMasterContractTemplateResponseStruct()),
);

export const execListContractTemplateContentQuery = restClient.encloseQuery<ListContractTemplateContentQuery, ListContractTemplateContentResponse>(
  props => T.create(props, ListContractTemplateContentQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/listcontracttemplatecontentquery',
    props,
  );
 },
 result => T.create(result, ListContractTemplateContentResponseStruct()),
);

export const execListContractTemplateContentByIdQuery = restClient.encloseQuery<ListContractTemplateContentByIdQuery, ListContractTemplateContentByIdResponse>(
  props => T.create(props, ListContractTemplateContentByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/listcontracttemplatecontentbyidquery',
    props,
  );
 },
 result => T.create(result, ListContractTemplateContentByIdResponseStruct()),
);

export const execGetContractTemplateContentQuery = restClient.encloseQuery<GetContractTemplateContentQuery, GetContractTemplateContentResponse>(
  props => T.create(props, GetContractTemplateContentQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/contract/getcontracttemplatecontentquery/{id}',
    props,
  );
 },
 result => T.create(result, GetContractTemplateContentResponseStruct()),
);

export const execCreateContractTemplateContentCommand = restClient.encloseQuery<CreateContractTemplateContentCommand, CreateContractTemplateContentResponse>(
  props => T.create(props, CreateContractTemplateContentCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/contract/createcontracttemplatecontentcommand',
    props,
  );
 },
 result => T.create(result, CreateContractTemplateContentResponseStruct()),
);

export const execDeleteContractTemplateContentCommand = restClient.encloseQuery<DeleteContractTemplateContentCommand, DeleteContractTemplateContentResponse>(
  props => T.create(props, DeleteContractTemplateContentCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/contract/deletecontracttemplatecontentcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteContractTemplateContentResponseStruct()),
);

export const execPatchContractTemplateContentOrderCommand = restClient.encloseQuery<PatchContractTemplateContentOrderCommand, PatchContractTemplateContentOrderResponse>(
  props => T.create(props, PatchContractTemplateContentOrderCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/contract/patchcontracttemplatecontentordercommand',
    props,
  );
 },
 result => T.create(result, PatchContractTemplateContentOrderResponseStruct()),
);

export const execUpdateContractTemplateContentCommand = restClient.encloseQuery<UpdateContractTemplateContentCommand, UpdateContractTemplateContentResponse>(
  props => T.create(props, UpdateContractTemplateContentCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/contract/updatecontracttemplatecontentcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateContractTemplateContentResponseStruct()),
);
