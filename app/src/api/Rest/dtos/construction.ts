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

export type ConstructionProjectFilter = {
    governorateId?: number;
    wilayatId?: number;
    landType?: ConstructionLandType;
    projectId?: string;
    constructionStatuses?: ConstructionProjectStatus[];
    designStatuses?: DesignProjectStatus[];
};

export const ConstructionProjectFilterStruct = (): T.Describe<ConstructionProjectFilter> => (T.type({
    governorateId: tSpecialOptional(T.number()),
    wilayatId: tSpecialOptional(T.number()),
    landType: tSpecialOptional(ConstructionLandTypeStruct()),
    projectId: tSpecialOptional(T.string()),
    constructionStatuses: tSpecialOptional(T.array(ConstructionProjectStatusStruct())),
    designStatuses: tSpecialOptional(T.array(DesignProjectStatusStruct())),
}) as unknown as T.Describe<ConstructionProjectFilter>);

export type ConstructionProjectSort = {
    idIsAscending?: boolean;
    createdDateIsAscending?: boolean;
    modifiedDateIsAscending?: boolean;
    projectNumberIsAscending?: boolean;
    clientIdIsAscending?: boolean;
    contractIdIsAscending?: boolean;
    consultantIdIsAscending?: boolean;
    landAreaIsAscending?: boolean;
    buildingAllAreaInTheDrawingsIsAscending?: boolean;
    addedBuiltUpAreaIsAscending?: boolean;
    constructionTypeIsAscending?: boolean;
    projectStatusIsAscending?: boolean;
    projectDesignStatusIsAscending?: boolean;
    landTypeIsAscending?: boolean;
    startingStepIsAscending?: boolean;
    additionalCommentIsAscending?: boolean;
    bidClosingDateIsAscending?: boolean;
    stagePlanIdIsAscending?: boolean;
    projectBidIdIsAscending?: boolean;
    wilayatIdIsAscending?: boolean;
    governorateIdIsAscending?: boolean;
};

export const ConstructionProjectSortStruct = (): T.Describe<ConstructionProjectSort> => (T.type({
    idIsAscending: tSpecialOptional(T.boolean()),
    createdDateIsAscending: tSpecialOptional(T.boolean()),
    modifiedDateIsAscending: tSpecialOptional(T.boolean()),
    projectNumberIsAscending: tSpecialOptional(T.boolean()),
    clientIdIsAscending: tSpecialOptional(T.boolean()),
    contractIdIsAscending: tSpecialOptional(T.boolean()),
    consultantIdIsAscending: tSpecialOptional(T.boolean()),
    landAreaIsAscending: tSpecialOptional(T.boolean()),
    buildingAllAreaInTheDrawingsIsAscending: tSpecialOptional(T.boolean()),
    addedBuiltUpAreaIsAscending: tSpecialOptional(T.boolean()),
    constructionTypeIsAscending: tSpecialOptional(T.boolean()),
    projectStatusIsAscending: tSpecialOptional(T.boolean()),
    projectDesignStatusIsAscending: tSpecialOptional(T.boolean()),
    landTypeIsAscending: tSpecialOptional(T.boolean()),
    startingStepIsAscending: tSpecialOptional(T.boolean()),
    additionalCommentIsAscending: tSpecialOptional(T.boolean()),
    bidClosingDateIsAscending: tSpecialOptional(T.boolean()),
    stagePlanIdIsAscending: tSpecialOptional(T.boolean()),
    projectBidIdIsAscending: tSpecialOptional(T.boolean()),
    wilayatIdIsAscending: tSpecialOptional(T.boolean()),
    governorateIdIsAscending: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ConstructionProjectSort>);

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

export type ProjectBidCostItemDto = {
    name?: string;
    translationKey?: string;
    quantity?: number;
    quantityUnit?: string;
    price?: number;
    bidCostId?: number;
    id: number;
};

export const ProjectBidCostItemDtoStruct = (): T.Describe<ProjectBidCostItemDto> => (T.type({
    name: tSpecialOptional(T.string()),
    translationKey: tSpecialOptional(T.string()),
    quantity: tSpecialOptional(T.number()),
    quantityUnit: tSpecialOptional(T.string()),
    price: tSpecialOptional(T.number()),
    bidCostId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<ProjectBidCostItemDto>);

export type ProjectBidCostDto = {
    constructionType?: ConstructionType;
    rials?: boolean;
    totalPrice?: number;
    bidId?: number;
    costItems?: ProjectBidCostItemDto[];
    id: number;
};

export const ProjectBidCostDtoStruct = (): T.Describe<ProjectBidCostDto> => (T.type({
    constructionType: tSpecialOptional(ConstructionTypeStruct()),
    rials: tSpecialOptional(T.boolean()),
    totalPrice: tSpecialOptional(T.number()),
    bidId: tSpecialOptional(T.number()),
    costItems: tSpecialOptional(T.array(ProjectBidCostItemDtoStruct())),
    id: T.number(),
}) as unknown as T.Describe<ProjectBidCostDto>);

export type ProjectBidStageUnitDto = {
    sowItems?: number[];
    id: number;
    orderNumber?: number;
    stageName?: string;
    suggestedPercentage?: number;
    suggestedTime?: number;
    description?: string;
    stageNameArabic?: string;
    descriptionArabic?: string;
    valueOfStageInPercentage?: number;
    valueOfStageInOmr?: number;
    timeOfStage?: number;
    stagePartId?: number;
};

export const ProjectBidStageUnitDtoStruct = (): T.Describe<ProjectBidStageUnitDto> => (T.type({
    sowItems: tSpecialOptional(T.array(T.number())),
    id: T.number(),
    orderNumber: tSpecialOptional(T.number()),
    stageName: tSpecialOptional(T.string()),
    suggestedPercentage: tSpecialOptional(T.number()),
    suggestedTime: tSpecialOptional(T.number()),
    description: tSpecialOptional(T.string()),
    stageNameArabic: tSpecialOptional(T.string()),
    descriptionArabic: tSpecialOptional(T.string()),
    valueOfStageInPercentage: tSpecialOptional(T.number()),
    valueOfStageInOmr: tSpecialOptional(T.number()),
    timeOfStage: tSpecialOptional(T.number()),
    stagePartId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ProjectBidStageUnitDto>);

export type ProjectBidStagePartDto = {
    id: number;
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
    totalDays?: number;
    bidId?: number;
    stageUnits?: ProjectBidStageUnitDto[];
};

export const ProjectBidStagePartDtoStruct = (): T.Describe<ProjectBidStagePartDto> => (T.type({
    id: T.number(),
    planStage: tSpecialOptional(StageTemplatePlanStageStruct()),
    limitPercentage: tSpecialOptional(T.number()),
    totalDays: tSpecialOptional(T.number()),
    bidId: tSpecialOptional(T.number()),
    stageUnits: tSpecialOptional(T.array(ProjectBidStageUnitDtoStruct())),
}) as unknown as T.Describe<ProjectBidStagePartDto>);

export type ListSowItemSorts = {
    orderNumberIsAscending?: boolean;
    englishNameIsAscending?: boolean;
    arabicNameIsAscending?: boolean;
    showItemInFrontendIsAscending?: boolean;
    numberOfSpecsIsAscending?: boolean;
    numberOfWorkflowsIsAscending?: boolean;
    consultantVisitsIsAscending?: boolean;
    iconFileIdIsAscending?: boolean;
};

export const ListSowItemSortsStruct = (): T.Describe<ListSowItemSorts> => (T.type({
    orderNumberIsAscending: tSpecialOptional(T.boolean()),
    englishNameIsAscending: tSpecialOptional(T.boolean()),
    arabicNameIsAscending: tSpecialOptional(T.boolean()),
    showItemInFrontendIsAscending: tSpecialOptional(T.boolean()),
    numberOfSpecsIsAscending: tSpecialOptional(T.boolean()),
    numberOfWorkflowsIsAscending: tSpecialOptional(T.boolean()),
    consultantVisitsIsAscending: tSpecialOptional(T.boolean()),
    iconFileIdIsAscending: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ListSowItemSorts>);

export type WorkflowTaskDto = {
    id: number;
    defaultTaskTime: string;
    actionType: ActionType;
    actorType: ActorType;
    order: number;
    nameEn?: string;
    nameAr?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    actionValue?: string;
};

export const WorkflowTaskDtoStruct = (): T.Describe<WorkflowTaskDto> => (T.type({
    id: T.number(),
    defaultTaskTime: T.string(),
    actionType: ActionTypeStruct(),
    actorType: ActorTypeStruct(),
    order: T.number(),
    nameEn: tSpecialOptional(T.string()),
    nameAr: tSpecialOptional(T.string()),
    descriptionEn: tSpecialOptional(T.string()),
    descriptionAr: tSpecialOptional(T.string()),
    actionValue: tSpecialOptional(T.string()),
}) as unknown as T.Describe<WorkflowTaskDto>);

export type SowSubItemActionModel = {
    sowSubItemId?: number;
    workflowTaskDtos?: WorkflowTaskDto[];
};

export const SowSubItemActionModelStruct = (): T.Describe<SowSubItemActionModel> => (T.type({
    sowSubItemId: tSpecialOptional(T.number()),
    workflowTaskDtos: tSpecialOptional(T.array(WorkflowTaskDtoStruct())),
}) as unknown as T.Describe<SowSubItemActionModel>);

export type TaskActionModel = {
    workflowId?: number;
    sowSubItemActions?: SowSubItemActionModel[];
};

export const TaskActionModelStruct = (): T.Describe<TaskActionModel> => (T.type({
    workflowId: tSpecialOptional(T.number()),
    sowSubItemActions: tSpecialOptional(T.array(SowSubItemActionModelStruct())),
}) as unknown as T.Describe<TaskActionModel>);

export type SowItemUnitDto = {
    id: number;
    acceptanceWorkflowName?: string;
    taskActionModel?: TaskActionModel;
    englishDescription?: string;
    arabicDescription?: string;
    titleEnglish?: string;
    titleArabic?: string;
    supplier?: string;
    rate?: number;
    acceptanceWorkflow?: number;
    itemId?: number;
    orderNumber?: number;
};

export const SowItemUnitDtoStruct = (): T.Describe<SowItemUnitDto> => (T.type({
    id: T.number(),
    acceptanceWorkflowName: tSpecialOptional(T.string()),
    taskActionModel: tSpecialOptional(TaskActionModelStruct()),
    englishDescription: tSpecialOptional(T.string()),
    arabicDescription: tSpecialOptional(T.string()),
    titleEnglish: tSpecialOptional(T.string()),
    titleArabic: tSpecialOptional(T.string()),
    supplier: tSpecialOptional(T.string()),
    rate: tSpecialOptional(T.number()),
    acceptanceWorkflow: tSpecialOptional(T.number()),
    itemId: tSpecialOptional(T.number()),
    orderNumber: tSpecialOptional(T.number()),
}) as unknown as T.Describe<SowItemUnitDto>);

export type OrderDto = {
    id: number;
    orderNumber?: number;
};

export const OrderDtoStruct = (): T.Describe<OrderDto> => (T.type({
    id: T.number(),
    orderNumber: tSpecialOptional(T.number()),
}) as unknown as T.Describe<OrderDto>);

export type SowVersionSort = {
    idIsAscending?: boolean;
    statusIsAscending?: boolean;
    usedFromIsAscending?: boolean;
    usedToIsAscending?: boolean;
    createdOnIsAscending?: boolean;
};

export const SowVersionSortStruct = (): T.Describe<SowVersionSort> => (T.type({
    idIsAscending: tSpecialOptional(T.boolean()),
    statusIsAscending: tSpecialOptional(T.boolean()),
    usedFromIsAscending: tSpecialOptional(T.boolean()),
    usedToIsAscending: tSpecialOptional(T.boolean()),
    createdOnIsAscending: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<SowVersionSort>);

export type StagePlanUnitDto = {
    planPartId?: number;
    id: number;
    orderNumber?: number;
    stageName?: string;
    suggestedPercentage?: number;
    suggestedTime?: number;
    description?: string;
    stageNameArabic?: string;
    descriptionArabic?: string;
    sowItems?: number[];
};

export const StagePlanUnitDtoStruct = (): T.Describe<StagePlanUnitDto> => (T.type({
    planPartId: tSpecialOptional(T.number()),
    id: T.number(),
    orderNumber: tSpecialOptional(T.number()),
    stageName: tSpecialOptional(T.string()),
    suggestedPercentage: tSpecialOptional(T.number()),
    suggestedTime: tSpecialOptional(T.number()),
    description: tSpecialOptional(T.string()),
    stageNameArabic: tSpecialOptional(T.string()),
    descriptionArabic: tSpecialOptional(T.string()),
    sowItems: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<StagePlanUnitDto>);

export type StagePlanPartDto = {
    id: number;
    planId?: number;
    planUnits?: StagePlanUnitDto[];
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
};

export const StagePlanPartDtoStruct = (): T.Describe<StagePlanPartDto> => (T.type({
    id: T.number(),
    planId: tSpecialOptional(T.number()),
    planUnits: tSpecialOptional(T.array(StagePlanUnitDtoStruct())),
    planStage: tSpecialOptional(StageTemplatePlanStageStruct()),
    limitPercentage: tSpecialOptional(T.number()),
}) as unknown as T.Describe<StagePlanPartDto>);

export type StageTemplateSort = {
    idIsAscending?: boolean;
    modifiedDateIsAscending?: boolean;
};

export const StageTemplateSortStruct = (): T.Describe<StageTemplateSort> => (T.type({
    idIsAscending: tSpecialOptional(T.boolean()),
    modifiedDateIsAscending: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<StageTemplateSort>);

export type StageFilter = {
    basement?: number;
    additionalFloors?: number;
    outerBlocks?: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
};

export const StageFilterStruct = (): T.Describe<StageFilter> => (T.type({
    basement: tSpecialOptional(T.number()),
    additionalFloors: tSpecialOptional(T.number()),
    outerBlocks: tSpecialOptional(T.number()),
    groundFloor: tSpecialOptional(T.boolean()),
    levellingFloor: tSpecialOptional(T.boolean()),
    penthouseFloor: tSpecialOptional(T.boolean()),
    pool: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<StageFilter>);

export type StageTemplateUnitDto = {
    id: number;
    templatePartId?: number;
    orderNumber?: number;
    stageName?: string;
    suggestedPercentage?: number;
    suggestedTime?: number;
    description?: string;
    stageNameArabic?: string;
    descriptionArabic?: string;
    sowItems?: number[];
};

export const StageTemplateUnitDtoStruct = (): T.Describe<StageTemplateUnitDto> => (T.type({
    id: T.number(),
    templatePartId: tSpecialOptional(T.number()),
    orderNumber: tSpecialOptional(T.number()),
    stageName: tSpecialOptional(T.string()),
    suggestedPercentage: tSpecialOptional(T.number()),
    suggestedTime: tSpecialOptional(T.number()),
    description: tSpecialOptional(T.string()),
    stageNameArabic: tSpecialOptional(T.string()),
    descriptionArabic: tSpecialOptional(T.string()),
    sowItems: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<StageTemplateUnitDto>);

export type StageTemplatePartDto = {
    id: number;
    templateId?: number;
    templateUnits?: StageTemplateUnitDto[];
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
};

export const StageTemplatePartDtoStruct = (): T.Describe<StageTemplatePartDto> => (T.type({
    id: T.number(),
    templateId: tSpecialOptional(T.number()),
    templateUnits: tSpecialOptional(T.array(StageTemplateUnitDtoStruct())),
    planStage: tSpecialOptional(StageTemplatePlanStageStruct()),
    limitPercentage: tSpecialOptional(T.number()),
}) as unknown as T.Describe<StageTemplatePartDto>);

export type TaskActionUpdateDto = {
    sowSubItemId?: number;
    hash?: string;
};

export const TaskActionUpdateDtoStruct = (): T.Describe<TaskActionUpdateDto> => (T.type({
    sowSubItemId: tSpecialOptional(T.number()),
    hash: tSpecialOptional(T.string()),
}) as unknown as T.Describe<TaskActionUpdateDto>);

export type CompanyManagementStatisticsDto = {
    projectsParticipated?: number;
    projectsAwarded?: number;
    companyId?: number;
};

export const CompanyManagementStatisticsDtoStruct = (): T.Describe<CompanyManagementStatisticsDto> => (T.type({
    projectsParticipated: tSpecialOptional(T.number()),
    projectsAwarded: tSpecialOptional(T.number()),
    companyId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CompanyManagementStatisticsDto>);

export type CompaniesManagementStatisticsDto = {
    contractorStatistics?: CompanyManagementStatisticsDto[];
    consultantStatistics?: CompanyManagementStatisticsDto[];
};

export const CompaniesManagementStatisticsDtoStruct = (): T.Describe<CompaniesManagementStatisticsDto> => (T.type({
    contractorStatistics: tSpecialOptional(T.array(CompanyManagementStatisticsDtoStruct())),
    consultantStatistics: tSpecialOptional(T.array(CompanyManagementStatisticsDtoStruct())),
}) as unknown as T.Describe<CompaniesManagementStatisticsDto>);

export type AdminPanelConstructionProjectInfoDto = {
    id: number;
    projectNumber?: string;
    floorLevels?: string;
    wilayatId?: number;
    governorateId?: number;
    addedBuiltUpArea?: number;
    landType?: ConstructionLandType;
    projectStatus?: ConstructionProjectStatus;
    startingStep?: ProjectStartingStep;
    designProjectStatus?: DesignProjectStatus;
};

export const AdminPanelConstructionProjectInfoDtoStruct = (): T.Describe<AdminPanelConstructionProjectInfoDto> => (T.type({
    id: T.number(),
    projectNumber: tSpecialOptional(T.string()),
    floorLevels: tSpecialOptional(T.string()),
    wilayatId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    addedBuiltUpArea: tSpecialOptional(T.number()),
    landType: tSpecialOptional(ConstructionLandTypeStruct()),
    projectStatus: tSpecialOptional(ConstructionProjectStatusStruct()),
    startingStep: tSpecialOptional(ProjectStartingStepStruct()),
    designProjectStatus: tSpecialOptional(DesignProjectStatusStruct()),
}) as unknown as T.Describe<AdminPanelConstructionProjectInfoDto>);

export type SubjectInformationDto = {
    subjectId?: number;
    name?: string;
    avatar?: string;
    email?: string;
    phone?: string;
};

export const SubjectInformationDtoStruct = (): T.Describe<SubjectInformationDto> => (T.type({
    subjectId: tSpecialOptional(T.number()),
    name: tSpecialOptional(T.string()),
    avatar: tSpecialOptional(T.string()),
    email: tSpecialOptional(T.string()),
    phone: tSpecialOptional(T.string()),
}) as unknown as T.Describe<SubjectInformationDto>);

export type ProjectDatesDto = {
    draftDate?: string;
    engineerReviewDate?: string;
    contractorsBiddingDate?: string;
    chooseContractorDate?: string;
    contractReadyForSignatureDate?: string;
    contractSignedDate?: string;
    projectId?: number;
};

export const ProjectDatesDtoStruct = (): T.Describe<ProjectDatesDto> => (T.type({
    draftDate: tSpecialOptional(T.string()),
    engineerReviewDate: tSpecialOptional(T.string()),
    contractorsBiddingDate: tSpecialOptional(T.string()),
    chooseContractorDate: tSpecialOptional(T.string()),
    contractReadyForSignatureDate: tSpecialOptional(T.string()),
    contractSignedDate: tSpecialOptional(T.string()),
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ProjectDatesDto>);

export type ConstructionProjectExtendedDto = {
    id: number;
    client?: SubjectInformationDto;
    consultant?: SubjectInformationDto;
    contractor?: SubjectInformationDto;
    designConsultant?: SubjectInformationDto;
    governorateDisplayName?: string;
    wilayatDisplayName?: string;
    stageTemplateId?: number;
    totalVisitsForBid?: number;
    projectDatesDto?: ProjectDatesDto;
    contractorInvitationCount?: number;
    consultantInvitationCount?: number;
    projectNumber?: string;
    floorLevels?: string;
    modifiedDate?: string;
    projectStatus?: ConstructionProjectStatus;
    clientId?: number;
    contractId?: number;
    consultantId?: number;
    landArea?: number;
    buildingAllAreaInTheDrawings?: boolean;
    addedBuiltUpArea?: number;
    constructionType?: ConstructionType;
    landType?: ConstructionLandType;
    startingStep?: ProjectStartingStep;
    wilayatId?: number;
    governorateId?: number;
    additionalComment?: string;
    bidClosingDate?: string;
    krookieFiles?: string[];
    drawingFiles?: string[];
    stagePlanId?: number;
    projectBidId?: number;
    designId?: number;
    designProjectStatus?: DesignProjectStatus;
    designStageTemplateId?: number;
    designSowId?: number;
    designConsultantId?: number;
    contractorId?: number;
    numberOfTimeExtension?: number;
    approverId?: number;
};

export const ConstructionProjectExtendedDtoStruct = (): T.Describe<ConstructionProjectExtendedDto> => (T.type({
    id: T.number(),
    client: tSpecialOptional(SubjectInformationDtoStruct()),
    consultant: tSpecialOptional(SubjectInformationDtoStruct()),
    contractor: tSpecialOptional(SubjectInformationDtoStruct()),
    designConsultant: tSpecialOptional(SubjectInformationDtoStruct()),
    governorateDisplayName: tSpecialOptional(T.string()),
    wilayatDisplayName: tSpecialOptional(T.string()),
    stageTemplateId: tSpecialOptional(T.number()),
    totalVisitsForBid: tSpecialOptional(T.number()),
    projectDatesDto: tSpecialOptional(ProjectDatesDtoStruct()),
    contractorInvitationCount: tSpecialOptional(T.number()),
    consultantInvitationCount: tSpecialOptional(T.number()),
    projectNumber: tSpecialOptional(T.string()),
    floorLevels: tSpecialOptional(T.string()),
    modifiedDate: tSpecialOptional(T.string()),
    projectStatus: tSpecialOptional(ConstructionProjectStatusStruct()),
    clientId: tSpecialOptional(T.number()),
    contractId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
    landArea: tSpecialOptional(T.number()),
    buildingAllAreaInTheDrawings: tSpecialOptional(T.boolean()),
    addedBuiltUpArea: tSpecialOptional(T.number()),
    constructionType: tSpecialOptional(ConstructionTypeStruct()),
    landType: tSpecialOptional(ConstructionLandTypeStruct()),
    startingStep: tSpecialOptional(ProjectStartingStepStruct()),
    wilayatId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    additionalComment: tSpecialOptional(T.string()),
    bidClosingDate: tSpecialOptional(T.string()),
    krookieFiles: tSpecialOptional(T.array(T.string())),
    drawingFiles: tSpecialOptional(T.array(T.string())),
    stagePlanId: tSpecialOptional(T.number()),
    projectBidId: tSpecialOptional(T.number()),
    designId: tSpecialOptional(T.number()),
    designProjectStatus: tSpecialOptional(DesignProjectStatusStruct()),
    designStageTemplateId: tSpecialOptional(T.number()),
    designSowId: tSpecialOptional(T.number()),
    designConsultantId: tSpecialOptional(T.number()),
    contractorId: tSpecialOptional(T.number()),
    numberOfTimeExtension: tSpecialOptional(T.number()),
    approverId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ConstructionProjectExtendedDto>);

export type ConstructionProjectWithInviteDto = {
    id: number;
    invitationId?: number;
    invitationStatus?: InvitationStatus;
    invitationType?: InvitationType;
    invitationConsultantId?: number;
    invitationDate?: string;
    clientInformation?: SubjectInformationDto;
    projectNumber?: string;
    floorLevels?: string;
    modifiedDate?: string;
    projectStatus?: ConstructionProjectStatus;
    clientId?: number;
    contractId?: number;
    consultantId?: number;
    landArea?: number;
    buildingAllAreaInTheDrawings?: boolean;
    addedBuiltUpArea?: number;
    constructionType?: ConstructionType;
    landType?: ConstructionLandType;
    startingStep?: ProjectStartingStep;
    wilayatId?: number;
    governorateId?: number;
    additionalComment?: string;
    bidClosingDate?: string;
    krookieFiles?: string[];
    drawingFiles?: string[];
    stagePlanId?: number;
    projectBidId?: number;
    designId?: number;
    designProjectStatus?: DesignProjectStatus;
    designStageTemplateId?: number;
    designSowId?: number;
    designConsultantId?: number;
    contractorId?: number;
    numberOfTimeExtension?: number;
    approverId?: number;
};

export const ConstructionProjectWithInviteDtoStruct = (): T.Describe<ConstructionProjectWithInviteDto> => (T.type({
    id: T.number(),
    invitationId: tSpecialOptional(T.number()),
    invitationStatus: tSpecialOptional(InvitationStatusStruct()),
    invitationType: tSpecialOptional(InvitationTypeStruct()),
    invitationConsultantId: tSpecialOptional(T.number()),
    invitationDate: tSpecialOptional(T.string()),
    clientInformation: tSpecialOptional(SubjectInformationDtoStruct()),
    projectNumber: tSpecialOptional(T.string()),
    floorLevels: tSpecialOptional(T.string()),
    modifiedDate: tSpecialOptional(T.string()),
    projectStatus: tSpecialOptional(ConstructionProjectStatusStruct()),
    clientId: tSpecialOptional(T.number()),
    contractId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
    landArea: tSpecialOptional(T.number()),
    buildingAllAreaInTheDrawings: tSpecialOptional(T.boolean()),
    addedBuiltUpArea: tSpecialOptional(T.number()),
    constructionType: tSpecialOptional(ConstructionTypeStruct()),
    landType: tSpecialOptional(ConstructionLandTypeStruct()),
    startingStep: tSpecialOptional(ProjectStartingStepStruct()),
    wilayatId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    additionalComment: tSpecialOptional(T.string()),
    bidClosingDate: tSpecialOptional(T.string()),
    krookieFiles: tSpecialOptional(T.array(T.string())),
    drawingFiles: tSpecialOptional(T.array(T.string())),
    stagePlanId: tSpecialOptional(T.number()),
    projectBidId: tSpecialOptional(T.number()),
    designId: tSpecialOptional(T.number()),
    designProjectStatus: tSpecialOptional(DesignProjectStatusStruct()),
    designStageTemplateId: tSpecialOptional(T.number()),
    designSowId: tSpecialOptional(T.number()),
    designConsultantId: tSpecialOptional(T.number()),
    contractorId: tSpecialOptional(T.number()),
    numberOfTimeExtension: tSpecialOptional(T.number()),
    approverId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ConstructionProjectWithInviteDto>);

export type ConstructionProjectDto = {
    id: number;
    projectNumber?: string;
    floorLevels?: string;
    modifiedDate?: string;
    projectStatus?: ConstructionProjectStatus;
    clientId?: number;
    contractId?: number;
    consultantId?: number;
    landArea?: number;
    buildingAllAreaInTheDrawings?: boolean;
    addedBuiltUpArea?: number;
    constructionType?: ConstructionType;
    landType?: ConstructionLandType;
    startingStep?: ProjectStartingStep;
    wilayatId?: number;
    governorateId?: number;
    additionalComment?: string;
    bidClosingDate?: string;
    krookieFiles?: string[];
    drawingFiles?: string[];
    stagePlanId?: number;
    projectBidId?: number;
    designId?: number;
    designProjectStatus?: DesignProjectStatus;
    designStageTemplateId?: number;
    designSowId?: number;
    designConsultantId?: number;
    contractorId?: number;
    numberOfTimeExtension?: number;
    approverId?: number;
};

export const ConstructionProjectDtoStruct = (): T.Describe<ConstructionProjectDto> => (T.type({
    id: T.number(),
    projectNumber: tSpecialOptional(T.string()),
    floorLevels: tSpecialOptional(T.string()),
    modifiedDate: tSpecialOptional(T.string()),
    projectStatus: tSpecialOptional(ConstructionProjectStatusStruct()),
    clientId: tSpecialOptional(T.number()),
    contractId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
    landArea: tSpecialOptional(T.number()),
    buildingAllAreaInTheDrawings: tSpecialOptional(T.boolean()),
    addedBuiltUpArea: tSpecialOptional(T.number()),
    constructionType: tSpecialOptional(ConstructionTypeStruct()),
    landType: tSpecialOptional(ConstructionLandTypeStruct()),
    startingStep: tSpecialOptional(ProjectStartingStepStruct()),
    wilayatId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    additionalComment: tSpecialOptional(T.string()),
    bidClosingDate: tSpecialOptional(T.string()),
    krookieFiles: tSpecialOptional(T.array(T.string())),
    drawingFiles: tSpecialOptional(T.array(T.string())),
    stagePlanId: tSpecialOptional(T.number()),
    projectBidId: tSpecialOptional(T.number()),
    designId: tSpecialOptional(T.number()),
    designProjectStatus: tSpecialOptional(DesignProjectStatusStruct()),
    designStageTemplateId: tSpecialOptional(T.number()),
    designSowId: tSpecialOptional(T.number()),
    designConsultantId: tSpecialOptional(T.number()),
    contractorId: tSpecialOptional(T.number()),
    numberOfTimeExtension: tSpecialOptional(T.number()),
    approverId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ConstructionProjectDto>);

export type ConstructionProjectWithInvitationDto = {
    projectId?: number;
    currentlyInvitedConsultantId?: number;
};

export const ConstructionProjectWithInvitationDtoStruct = (): T.Describe<ConstructionProjectWithInvitationDto> => (T.type({
    projectId: tSpecialOptional(T.number()),
    currentlyInvitedConsultantId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ConstructionProjectWithInvitationDto>);

export type ConstructionProjectWithBidDto = {
    id: number;
    bidId?: number;
    bidStatus?: BidStatus;
    invitationId?: number;
    invitationType?: InvitationType;
    projectNumber?: string;
    floorLevels?: string;
    modifiedDate?: string;
    projectStatus?: ConstructionProjectStatus;
    clientId?: number;
    contractId?: number;
    consultantId?: number;
    landArea?: number;
    buildingAllAreaInTheDrawings?: boolean;
    addedBuiltUpArea?: number;
    constructionType?: ConstructionType;
    landType?: ConstructionLandType;
    startingStep?: ProjectStartingStep;
    wilayatId?: number;
    governorateId?: number;
    additionalComment?: string;
    bidClosingDate?: string;
    krookieFiles?: string[];
    drawingFiles?: string[];
    stagePlanId?: number;
    projectBidId?: number;
    designId?: number;
    designProjectStatus?: DesignProjectStatus;
    designStageTemplateId?: number;
    designSowId?: number;
    designConsultantId?: number;
    contractorId?: number;
    numberOfTimeExtension?: number;
    approverId?: number;
};

export const ConstructionProjectWithBidDtoStruct = (): T.Describe<ConstructionProjectWithBidDto> => (T.type({
    id: T.number(),
    bidId: tSpecialOptional(T.number()),
    bidStatus: tSpecialOptional(BidStatusStruct()),
    invitationId: tSpecialOptional(T.number()),
    invitationType: tSpecialOptional(InvitationTypeStruct()),
    projectNumber: tSpecialOptional(T.string()),
    floorLevels: tSpecialOptional(T.string()),
    modifiedDate: tSpecialOptional(T.string()),
    projectStatus: tSpecialOptional(ConstructionProjectStatusStruct()),
    clientId: tSpecialOptional(T.number()),
    contractId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
    landArea: tSpecialOptional(T.number()),
    buildingAllAreaInTheDrawings: tSpecialOptional(T.boolean()),
    addedBuiltUpArea: tSpecialOptional(T.number()),
    constructionType: tSpecialOptional(ConstructionTypeStruct()),
    landType: tSpecialOptional(ConstructionLandTypeStruct()),
    startingStep: tSpecialOptional(ProjectStartingStepStruct()),
    wilayatId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    additionalComment: tSpecialOptional(T.string()),
    bidClosingDate: tSpecialOptional(T.string()),
    krookieFiles: tSpecialOptional(T.array(T.string())),
    drawingFiles: tSpecialOptional(T.array(T.string())),
    stagePlanId: tSpecialOptional(T.number()),
    projectBidId: tSpecialOptional(T.number()),
    designId: tSpecialOptional(T.number()),
    designProjectStatus: tSpecialOptional(DesignProjectStatusStruct()),
    designStageTemplateId: tSpecialOptional(T.number()),
    designSowId: tSpecialOptional(T.number()),
    designConsultantId: tSpecialOptional(T.number()),
    contractorId: tSpecialOptional(T.number()),
    numberOfTimeExtension: tSpecialOptional(T.number()),
    approverId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ConstructionProjectWithBidDto>);

export type NewConstructionProjectDto = {
    id: number;
    bidClosingDate?: string;
    floorLevels?: string;
    landType?: ConstructionLandType;
    landArea?: number;
    startingStep?: ProjectStartingStep;
    projectStatus?: ConstructionProjectStatus;
    wilayatId?: number;
    governorateId?: number;
    clientId?: number;
    contractorBidId?: number;
    newProjectType?: NewProjectType;
};

export const NewConstructionProjectDtoStruct = (): T.Describe<NewConstructionProjectDto> => (T.type({
    id: T.number(),
    bidClosingDate: tSpecialOptional(T.string()),
    floorLevels: tSpecialOptional(T.string()),
    landType: tSpecialOptional(ConstructionLandTypeStruct()),
    landArea: tSpecialOptional(T.number()),
    startingStep: tSpecialOptional(ProjectStartingStepStruct()),
    projectStatus: tSpecialOptional(ConstructionProjectStatusStruct()),
    wilayatId: tSpecialOptional(T.number()),
    governorateId: tSpecialOptional(T.number()),
    clientId: tSpecialOptional(T.number()),
    contractorBidId: tSpecialOptional(T.number()),
    newProjectType: tSpecialOptional(NewProjectTypeStruct()),
}) as unknown as T.Describe<NewConstructionProjectDto>);

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

export type ProjectNameDto = {
    projectName?: string;
};

export const ProjectNameDtoStruct = (): T.Describe<ProjectNameDto> => (T.type({
    projectName: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ProjectNameDto>);

export type ConstructionProjectReviewDto = {
    id: number;
    constructionProjectId?: number;
    reviewerId?: number;
    reviewerType?: ActorType;
    isApproved?: boolean;
    comment?: string;
};

export const ConstructionProjectReviewDtoStruct = (): T.Describe<ConstructionProjectReviewDto> => (T.type({
    id: T.number(),
    constructionProjectId: tSpecialOptional(T.number()),
    reviewerId: tSpecialOptional(T.number()),
    reviewerType: tSpecialOptional(ActorTypeStruct()),
    isApproved: tSpecialOptional(T.boolean()),
    comment: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ConstructionProjectReviewDto>);

export type InviteMyOwnValidationErrors = {
    projectHasValidStatus?: boolean;
    maximumInvitationCountHasNotBeenReached?: boolean;
    isNotAlreadyInvited?: boolean;
    isValid?: boolean;
};

export const InviteMyOwnValidationErrorsStruct = (): T.Describe<InviteMyOwnValidationErrors> => (T.type({
    projectHasValidStatus: tSpecialOptional(T.boolean()),
    maximumInvitationCountHasNotBeenReached: tSpecialOptional(T.boolean()),
    isNotAlreadyInvited: tSpecialOptional(T.boolean()),
    isValid: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<InviteMyOwnValidationErrors>);

export type ReferralValidation = {
    companyDoesNotExist?: boolean;
};

export const ReferralValidationStruct = (): T.Describe<ReferralValidation> => (T.type({
    companyDoesNotExist: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ReferralValidation>);

export type ConstructionInvitationDto = {
    id: number;
    companyId?: number;
    companyType?: ContextType;
    invitationStatus?: InvitationStatus;
    phoneNumber?: string;
    ownerName?: string;
    companyName?: string;
    companyNameArabic?: string;
    companyLogoId?: string;
    invitationDate?: string;
};

export const ConstructionInvitationDtoStruct = (): T.Describe<ConstructionInvitationDto> => (T.type({
    id: T.number(),
    companyId: tSpecialOptional(T.number()),
    companyType: tSpecialOptional(ContextTypeStruct()),
    invitationStatus: tSpecialOptional(InvitationStatusStruct()),
    phoneNumber: tSpecialOptional(T.string()),
    ownerName: tSpecialOptional(T.string()),
    companyName: tSpecialOptional(T.string()),
    companyNameArabic: tSpecialOptional(T.string()),
    companyLogoId: tSpecialOptional(T.string()),
    invitationDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ConstructionInvitationDto>);

export type BidSubmittedDto = {
    id: number;
    contractorId?: number;
    bidStatus?: BidStatus;
};

export const BidSubmittedDtoStruct = (): T.Describe<BidSubmittedDto> => (T.type({
    id: T.number(),
    contractorId: tSpecialOptional(T.number()),
    bidStatus: tSpecialOptional(BidStatusStruct()),
}) as unknown as T.Describe<BidSubmittedDto>);

export type ContractorParticipationDto = {
    contractorInvitations?: ConstructionInvitationDto[];
    bidsSubmitted?: BidSubmittedDto[];
};

export const ContractorParticipationDtoStruct = (): T.Describe<ContractorParticipationDto> => (T.type({
    contractorInvitations: tSpecialOptional(T.array(ConstructionInvitationDtoStruct())),
    bidsSubmitted: tSpecialOptional(T.array(BidSubmittedDtoStruct())),
}) as unknown as T.Describe<ContractorParticipationDto>);

export type DictionaryDataDto = {
    displayName?: string;
    translationKey?: string;
    id: number;
};

export const DictionaryDataDtoStruct = (): T.Describe<DictionaryDataDto> => (T.type({
    displayName: tSpecialOptional(T.string()),
    translationKey: tSpecialOptional(T.string()),
    id: T.number(),
}) as unknown as T.Describe<DictionaryDataDto>);

export type ConstructionGovernorateDto = {
    abbreviation?: string;
    displayName?: string;
    translationKey?: string;
    id: number;
};

export const ConstructionGovernorateDtoStruct = (): T.Describe<ConstructionGovernorateDto> => (T.type({
    abbreviation: tSpecialOptional(T.string()),
    displayName: tSpecialOptional(T.string()),
    translationKey: tSpecialOptional(T.string()),
    id: T.number(),
}) as unknown as T.Describe<ConstructionGovernorateDto>);

export type ConstructionWilayatDto = {
    governorateId?: number;
    displayName?: string;
    translationKey?: string;
    id: number;
};

export const ConstructionWilayatDtoStruct = (): T.Describe<ConstructionWilayatDto> => (T.type({
    governorateId: tSpecialOptional(T.number()),
    displayName: tSpecialOptional(T.string()),
    translationKey: tSpecialOptional(T.string()),
    id: T.number(),
}) as unknown as T.Describe<ConstructionWilayatDto>);

export type ProjectBidDto = {
    bidCosts?: ProjectBidCostDto[];
    stageParts?: ProjectBidStagePartDto[];
    id: number;
    totalPrice?: number;
    structureItemsTotalPrice?: number;
    turnkeyItemsTotalPrice?: number;
    totalDays?: number;
    numberOfCurrentProjects?: number;
    message?: string;
    contractorId?: number;
    projectId?: number;
    bidStatus?: BidStatus;
};

export const ProjectBidDtoStruct = (): T.Describe<ProjectBidDto> => (T.type({
    bidCosts: tSpecialOptional(T.array(ProjectBidCostDtoStruct())),
    stageParts: tSpecialOptional(T.array(ProjectBidStagePartDtoStruct())),
    id: T.number(),
    totalPrice: tSpecialOptional(T.number()),
    structureItemsTotalPrice: tSpecialOptional(T.number()),
    turnkeyItemsTotalPrice: tSpecialOptional(T.number()),
    totalDays: tSpecialOptional(T.number()),
    numberOfCurrentProjects: tSpecialOptional(T.number()),
    message: tSpecialOptional(T.string()),
    contractorId: tSpecialOptional(T.number()),
    projectId: tSpecialOptional(T.number()),
    bidStatus: tSpecialOptional(BidStatusStruct()),
}) as unknown as T.Describe<ProjectBidDto>);

export type ProjectAnswerDto = {
    modifiedDate?: string;
    createdDate?: string;
    id: number;
    responderId?: number;
    answer?: string;
    questionId?: number;
};

export const ProjectAnswerDtoStruct = (): T.Describe<ProjectAnswerDto> => (T.type({
    modifiedDate: tSpecialOptional(T.string()),
    createdDate: tSpecialOptional(T.string()),
    id: T.number(),
    responderId: tSpecialOptional(T.number()),
    answer: tSpecialOptional(T.string()),
    questionId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ProjectAnswerDto>);

export type ProjectQuestionDto = {
    modifiedDate?: string;
    createdDate?: string;
    id: number;
    avatarId?: string;
    questionerId?: number;
    contextType?: ContextType;
    question?: string;
    projectId?: number;
    answers?: ProjectAnswerDto[];
};

export const ProjectQuestionDtoStruct = (): T.Describe<ProjectQuestionDto> => (T.type({
    modifiedDate: tSpecialOptional(T.string()),
    createdDate: tSpecialOptional(T.string()),
    id: T.number(),
    avatarId: tSpecialOptional(T.string()),
    questionerId: tSpecialOptional(T.number()),
    contextType: tSpecialOptional(ContextTypeStruct()),
    question: tSpecialOptional(T.string()),
    projectId: tSpecialOptional(T.number()),
    answers: tSpecialOptional(T.array(ProjectAnswerDtoStruct())),
}) as unknown as T.Describe<ProjectQuestionDto>);

export type SowItemDto = {
    orderNumber?: number;
    id: number;
    englishName?: string;
    arabicName?: string;
    showItemInFrontend?: boolean;
    isMandatory?: boolean;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    category?: SowItemCategory;
    versionId?: number;
    itemUnits?: SowItemUnitDto[];
};

export const SowItemDtoStruct = (): T.Describe<SowItemDto> => (T.type({
    orderNumber: tSpecialOptional(T.number()),
    id: T.number(),
    englishName: tSpecialOptional(T.string()),
    arabicName: tSpecialOptional(T.string()),
    showItemInFrontend: tSpecialOptional(T.boolean()),
    isMandatory: tSpecialOptional(T.boolean()),
    numberOfSpecs: tSpecialOptional(T.number()),
    numberOfWorkflows: tSpecialOptional(T.number()),
    consultantVisits: tSpecialOptional(T.number()),
    iconFileId: tSpecialOptional(T.string()),
    category: tSpecialOptional(SowItemCategoryStruct()),
    versionId: tSpecialOptional(T.number()),
    itemUnits: tSpecialOptional(T.array(SowItemUnitDtoStruct())),
}) as unknown as T.Describe<SowItemDto>);

export type FullSowItemDto = {
    sowItem?: SowItemDto;
    workflows?: WorkflowDto[];
};

export const FullSowItemDtoStruct = (): T.Describe<FullSowItemDto> => (T.type({
    sowItem: tSpecialOptional(SowItemDtoStruct()),
    workflows: tSpecialOptional(T.array(WorkflowDtoStruct())),
}) as unknown as T.Describe<FullSowItemDto>);

export type SowItemWithInstallationDto = {
    installation?: boolean;
    orderNumber?: number;
    id: number;
    englishName?: string;
    arabicName?: string;
    showItemInFrontend?: boolean;
    isMandatory?: boolean;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    category?: SowItemCategory;
    versionId?: number;
    itemUnits?: SowItemUnitDto[];
};

export const SowItemWithInstallationDtoStruct = (): T.Describe<SowItemWithInstallationDto> => (T.type({
    installation: tSpecialOptional(T.boolean()),
    orderNumber: tSpecialOptional(T.number()),
    id: T.number(),
    englishName: tSpecialOptional(T.string()),
    arabicName: tSpecialOptional(T.string()),
    showItemInFrontend: tSpecialOptional(T.boolean()),
    isMandatory: tSpecialOptional(T.boolean()),
    numberOfSpecs: tSpecialOptional(T.number()),
    numberOfWorkflows: tSpecialOptional(T.number()),
    consultantVisits: tSpecialOptional(T.number()),
    iconFileId: tSpecialOptional(T.string()),
    category: tSpecialOptional(SowItemCategoryStruct()),
    versionId: tSpecialOptional(T.number()),
    itemUnits: tSpecialOptional(T.array(SowItemUnitDtoStruct())),
}) as unknown as T.Describe<SowItemWithInstallationDto>);

export type ProjectMaterialsDto = {
    contractorItems?: SowItemDto[];
    clientItems?: SowItemWithInstallationDto[];
};

export const ProjectMaterialsDtoStruct = (): T.Describe<ProjectMaterialsDto> => (T.type({
    contractorItems: tSpecialOptional(T.array(SowItemDtoStruct())),
    clientItems: tSpecialOptional(T.array(SowItemWithInstallationDtoStruct())),
}) as unknown as T.Describe<ProjectMaterialsDto>);

export type SowItemWithUsageAmountDto = {
    amount?: number;
    itemVisibility?: SowItemVisibility;
    changeStatus?: SowItemChangeStatus;
    timeOfItem?: string;
    orderNumber?: number;
    id: number;
    englishName?: string;
    arabicName?: string;
    showItemInFrontend?: boolean;
    isMandatory?: boolean;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    category?: SowItemCategory;
    versionId?: number;
    itemUnits?: SowItemUnitDto[];
};

export const SowItemWithUsageAmountDtoStruct = (): T.Describe<SowItemWithUsageAmountDto> => (T.type({
    amount: tSpecialOptional(T.number()),
    itemVisibility: tSpecialOptional(SowItemVisibilityStruct()),
    changeStatus: tSpecialOptional(SowItemChangeStatusStruct()),
    timeOfItem: tSpecialOptional(T.string()),
    orderNumber: tSpecialOptional(T.number()),
    id: T.number(),
    englishName: tSpecialOptional(T.string()),
    arabicName: tSpecialOptional(T.string()),
    showItemInFrontend: tSpecialOptional(T.boolean()),
    isMandatory: tSpecialOptional(T.boolean()),
    numberOfSpecs: tSpecialOptional(T.number()),
    numberOfWorkflows: tSpecialOptional(T.number()),
    consultantVisits: tSpecialOptional(T.number()),
    iconFileId: tSpecialOptional(T.string()),
    category: tSpecialOptional(SowItemCategoryStruct()),
    versionId: tSpecialOptional(T.number()),
    itemUnits: tSpecialOptional(T.array(SowItemUnitDtoStruct())),
}) as unknown as T.Describe<SowItemWithUsageAmountDto>);

export type SowVersionDto = {
    status?: SowAndStageStatus;
    items?: SowItemDto[];
    id: number;
    contractName?: string;
    usedFrom?: string;
    usedTo?: string;
    numberOfItems?: number;
    createdDate?: string;
};

export const SowVersionDtoStruct = (): T.Describe<SowVersionDto> => (T.type({
    status: tSpecialOptional(SowAndStageStatusStruct()),
    items: tSpecialOptional(T.array(SowItemDtoStruct())),
    id: T.number(),
    contractName: tSpecialOptional(T.string()),
    usedFrom: tSpecialOptional(T.string()),
    usedTo: tSpecialOptional(T.string()),
    numberOfItems: tSpecialOptional(T.number()),
    createdDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<SowVersionDto>);

export type StagePlanDto = {
    projectId?: number;
    stageId?: string;
    id: number;
    planParts?: StagePlanPartDto[];
    templateName: string;
    stageLevels?: number;
    projectScope?: number;
    numberOfInspections?: number;
    projectScopeTwo?: number;
    projectInUse?: number;
    basement?: number;
    additionalFloors?: number;
    outerBlocks?: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
    sowVersionId: number;
};

export const StagePlanDtoStruct = (): T.Describe<StagePlanDto> => (T.type({
    projectId: tSpecialOptional(T.number()),
    stageId: tSpecialOptional(T.string()),
    id: T.number(),
    planParts: tSpecialOptional(T.array(StagePlanPartDtoStruct())),
    templateName: T.string(),
    stageLevels: tSpecialOptional(T.number()),
    projectScope: tSpecialOptional(T.number()),
    numberOfInspections: tSpecialOptional(T.number()),
    projectScopeTwo: tSpecialOptional(T.number()),
    projectInUse: tSpecialOptional(T.number()),
    basement: tSpecialOptional(T.number()),
    additionalFloors: tSpecialOptional(T.number()),
    outerBlocks: tSpecialOptional(T.number()),
    groundFloor: tSpecialOptional(T.boolean()),
    levellingFloor: tSpecialOptional(T.boolean()),
    penthouseFloor: tSpecialOptional(T.boolean()),
    pool: tSpecialOptional(T.boolean()),
    sowVersionId: T.number(),
}) as unknown as T.Describe<StagePlanDto>);

export type StageTemplateDto = {
    status?: SowAndStageStatus;
    stageId?: string;
    modifiedDate?: string;
    id: number;
    masterSowVersionId?: number;
    templateParts?: StageTemplatePartDto[];
    templateName: string;
    stageLevels?: number;
    projectScope?: number;
    numberOfInspections?: number;
    projectScopeTwo?: number;
    projectInUse?: number;
    basement?: number;
    additionalFloors?: number;
    outerBlocks?: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
    sowVersionId: number;
};

export const StageTemplateDtoStruct = (): T.Describe<StageTemplateDto> => (T.type({
    status: tSpecialOptional(SowAndStageStatusStruct()),
    stageId: tSpecialOptional(T.string()),
    modifiedDate: tSpecialOptional(T.string()),
    id: T.number(),
    masterSowVersionId: tSpecialOptional(T.number()),
    templateParts: tSpecialOptional(T.array(StageTemplatePartDtoStruct())),
    templateName: T.string(),
    stageLevels: tSpecialOptional(T.number()),
    projectScope: tSpecialOptional(T.number()),
    numberOfInspections: tSpecialOptional(T.number()),
    projectScopeTwo: tSpecialOptional(T.number()),
    projectInUse: tSpecialOptional(T.number()),
    basement: tSpecialOptional(T.number()),
    additionalFloors: tSpecialOptional(T.number()),
    outerBlocks: tSpecialOptional(T.number()),
    groundFloor: tSpecialOptional(T.boolean()),
    levellingFloor: tSpecialOptional(T.boolean()),
    penthouseFloor: tSpecialOptional(T.boolean()),
    pool: tSpecialOptional(T.boolean()),
    sowVersionId: T.number(),
}) as unknown as T.Describe<StageTemplateDto>);

export type UserManagementStatisticsDto = {
    userId?: number;
    numberOfProjects?: number;
};

export const UserManagementStatisticsDtoStruct = (): T.Describe<UserManagementStatisticsDto> => (T.type({
    userId: tSpecialOptional(T.number()),
    numberOfProjects: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UserManagementStatisticsDto>);

export type WorkflowDto = {
    id: number;
    nameEn?: string;
    nameAr?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    workflowTasks: WorkflowTaskDto[];
    totalDefaultTaskDuration: string;
};

export const WorkflowDtoStruct = (): T.Describe<WorkflowDto> => (T.type({
    id: T.number(),
    nameEn: tSpecialOptional(T.string()),
    nameAr: tSpecialOptional(T.string()),
    descriptionEn: tSpecialOptional(T.string()),
    descriptionAr: tSpecialOptional(T.string()),
    workflowTasks: T.array(WorkflowTaskDtoStruct()),
    totalDefaultTaskDuration: T.string(),
}) as unknown as T.Describe<WorkflowDto>);

export type GetCompanyManagementStatisticsResponse = {
    result: CompaniesManagementStatisticsDto;
};

export const GetCompanyManagementStatisticsResponseStruct = (): T.Describe<GetCompanyManagementStatisticsResponse> => (T.type({
    result: CompaniesManagementStatisticsDtoStruct(),
}) as unknown as T.Describe<GetCompanyManagementStatisticsResponse>);

export type GetCompanyManagementProjectsCountResponse = {
    result: number;
};

export const GetCompanyManagementProjectsCountResponseStruct = (): T.Describe<GetCompanyManagementProjectsCountResponse> => (T.type({
    result: T.number(),
}) as unknown as T.Describe<GetCompanyManagementProjectsCountResponse>);

export type ListCompanyManagementProjectsInfoResponse = {
    result: AdminPanelConstructionProjectInfoDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListCompanyManagementProjectsInfoResponseStruct = (): T.Describe<ListCompanyManagementProjectsInfoResponse> => (T.type({
    result: T.array(AdminPanelConstructionProjectInfoDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyManagementProjectsInfoResponse>);

export type GetCompanyAwardedSortResponse = {
    statistics?: CompanyManagementStatisticsDto[];
    companyIds?: number[];
    amountOfIds?: number;
};

export const GetCompanyAwardedSortResponseStruct = (): T.Describe<GetCompanyAwardedSortResponse> => (T.type({
    statistics: tSpecialOptional(T.array(CompanyManagementStatisticsDtoStruct())),
    companyIds: tSpecialOptional(T.array(T.number())),
    amountOfIds: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetCompanyAwardedSortResponse>);

export type ListConstructionProjectResponse = {
    result: ConstructionProjectExtendedDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConstructionProjectResponseStruct = (): T.Describe<ListConstructionProjectResponse> => (T.type({
    result: T.array(ConstructionProjectExtendedDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectResponse>);

export type ListConstructionProjectForConsultantContextResponse = {
    result: ConstructionProjectWithInviteDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConstructionProjectForConsultantContextResponseStruct = (): T.Describe<ListConstructionProjectForConsultantContextResponse> => (T.type({
    result: T.array(ConstructionProjectWithInviteDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectForConsultantContextResponse>);

export type GetConstructionProjectForConsultantContextResponse = {
    result: ConstructionProjectDto;
};

export const GetConstructionProjectForConsultantContextResponseStruct = (): T.Describe<GetConstructionProjectForConsultantContextResponse> => (T.type({
    result: ConstructionProjectDtoStruct(),
}) as unknown as T.Describe<GetConstructionProjectForConsultantContextResponse>);

export type GetConstructionProjectForConsultantResponse = {
    result: ConstructionProjectWithInviteDto;
};

export const GetConstructionProjectForConsultantResponseStruct = (): T.Describe<GetConstructionProjectForConsultantResponse> => (T.type({
    result: ConstructionProjectWithInviteDtoStruct(),
}) as unknown as T.Describe<GetConstructionProjectForConsultantResponse>);

export type GetConstructionProjectWithConsultantInvitedResponse = {
    result: ConstructionProjectWithInvitationDto;
};

export const GetConstructionProjectWithConsultantInvitedResponseStruct = (): T.Describe<GetConstructionProjectWithConsultantInvitedResponse> => (T.type({
    result: ConstructionProjectWithInvitationDtoStruct(),
}) as unknown as T.Describe<GetConstructionProjectWithConsultantInvitedResponse>);

export type GetConstructionProjectWithInvitationByProjectIdResponse = {
    result: ConstructionProjectWithInvitationDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetConstructionProjectWithInvitationByProjectIdResponseStruct = (): T.Describe<GetConstructionProjectWithInvitationByProjectIdResponse> => (T.type({
    result: T.array(ConstructionProjectWithInvitationDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetConstructionProjectWithInvitationByProjectIdResponse>);

export type ListConstructionProjectWithInvitationByProjectIdResponse = {
    result: ConstructionProjectWithInvitationDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConstructionProjectWithInvitationByProjectIdResponseStruct = (): T.Describe<ListConstructionProjectWithInvitationByProjectIdResponse> => (T.type({
    result: T.array(ConstructionProjectWithInvitationDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectWithInvitationByProjectIdResponse>);

export type ListConstructionProjectByStatusResponse = {
    result: ConstructionProjectDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConstructionProjectByStatusResponseStruct = (): T.Describe<ListConstructionProjectByStatusResponse> => (T.type({
    result: T.array(ConstructionProjectDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectByStatusResponse>);

export type ListConstructionProjectWithBidResponse = {
    result: ConstructionProjectWithBidDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConstructionProjectWithBidResponseStruct = (): T.Describe<ListConstructionProjectWithBidResponse> => (T.type({
    result: T.array(ConstructionProjectWithBidDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectWithBidResponse>);

export type ListConstructionProjectByStatusAndContractorResponse = {
    result: ConstructionProjectWithBidDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConstructionProjectByStatusAndContractorResponseStruct = (): T.Describe<ListConstructionProjectByStatusAndContractorResponse> => (T.type({
    result: T.array(ConstructionProjectWithBidDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectByStatusAndContractorResponse>);

export type ListConstructionProjectByStatusAndConsultantResponse = {
    result: ConstructionProjectDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListConstructionProjectByStatusAndConsultantResponseStruct = (): T.Describe<ListConstructionProjectByStatusAndConsultantResponse> => (T.type({
    result: T.array(ConstructionProjectDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectByStatusAndConsultantResponse>);

export type ListNewConstructionProjectsResponse = {
    result: NewConstructionProjectDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListNewConstructionProjectsResponseStruct = (): T.Describe<ListNewConstructionProjectsResponse> => (T.type({
    result: T.array(NewConstructionProjectDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNewConstructionProjectsResponse>);

export type GetConstructionProjectResponse = {
    result: ConstructionProjectExtendedDto;
};

export const GetConstructionProjectResponseStruct = (): T.Describe<GetConstructionProjectResponse> => (T.type({
    result: ConstructionProjectExtendedDtoStruct(),
}) as unknown as T.Describe<GetConstructionProjectResponse>);

export type GetConstructionProjectWithBidResponse = {
    result: ConstructionProjectWithBidDto;
};

export const GetConstructionProjectWithBidResponseStruct = (): T.Describe<GetConstructionProjectWithBidResponse> => (T.type({
    result: ConstructionProjectWithBidDtoStruct(),
}) as unknown as T.Describe<GetConstructionProjectWithBidResponse>);

export type GetEbinaaProjectStatisticsResponse = {
    totalProjects?: number;
    projectsConstruction?: number;
    projectsDesign?: number;
    totalValueOfProject?: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const GetEbinaaProjectStatisticsResponseStruct = (): T.Describe<GetEbinaaProjectStatisticsResponse> => (T.type({
    totalProjects: tSpecialOptional(T.number()),
    projectsConstruction: tSpecialOptional(T.number()),
    projectsDesign: tSpecialOptional(T.number()),
    totalValueOfProject: tSpecialOptional(T.number()),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GetEbinaaProjectStatisticsResponse>);

export type GetConstructionProjectStatisticsResponse = {
    draft?: number;
    adminReview?: number;
    rejected?: number;
    contractBidding?: number;
    chooseContractor?: number;
    clientAddServices?: number;
    contractReady?: number;
    signed?: number;
    liveInPm?: number;
    archived?: number;
    designDraft?: number;
    designAdminReview?: number;
    designConsultantApprove?: number;
    designAdvancePayment?: number;
    designUploadDrawings?: number;
    designFinalPayment?: number;
    designCompleted?: number;
    designRejected?: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const GetConstructionProjectStatisticsResponseStruct = (): T.Describe<GetConstructionProjectStatisticsResponse> => (T.type({
    draft: tSpecialOptional(T.number()),
    adminReview: tSpecialOptional(T.number()),
    rejected: tSpecialOptional(T.number()),
    contractBidding: tSpecialOptional(T.number()),
    chooseContractor: tSpecialOptional(T.number()),
    clientAddServices: tSpecialOptional(T.number()),
    contractReady: tSpecialOptional(T.number()),
    signed: tSpecialOptional(T.number()),
    liveInPm: tSpecialOptional(T.number()),
    archived: tSpecialOptional(T.number()),
    designDraft: tSpecialOptional(T.number()),
    designAdminReview: tSpecialOptional(T.number()),
    designConsultantApprove: tSpecialOptional(T.number()),
    designAdvancePayment: tSpecialOptional(T.number()),
    designUploadDrawings: tSpecialOptional(T.number()),
    designFinalPayment: tSpecialOptional(T.number()),
    designCompleted: tSpecialOptional(T.number()),
    designRejected: tSpecialOptional(T.number()),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GetConstructionProjectStatisticsResponse>);

export type GetConstructionProjectStatisticsByContractorResponse = {
    openBidsCount?: number;
    chooseContractorCount?: number;
    bidSelectedCount?: number;
    readyToSignCount?: number;
    signedCount?: number;
    liveInPmCount?: number;
    archivedCount?: number;
    allCount?: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const GetConstructionProjectStatisticsByContractorResponseStruct = (): T.Describe<GetConstructionProjectStatisticsByContractorResponse> => (T.type({
    openBidsCount: tSpecialOptional(T.number()),
    chooseContractorCount: tSpecialOptional(T.number()),
    bidSelectedCount: tSpecialOptional(T.number()),
    readyToSignCount: tSpecialOptional(T.number()),
    signedCount: tSpecialOptional(T.number()),
    liveInPmCount: tSpecialOptional(T.number()),
    archivedCount: tSpecialOptional(T.number()),
    allCount: tSpecialOptional(T.number()),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GetConstructionProjectStatisticsByContractorResponse>);

export type GetConstructionProjectStatisticsByConsultantResponse = {
    openBidsCount?: number;
    chooseContractorCount?: number;
    bidSelectedCount?: number;
    readyToSignCount?: number;
    signedCount?: number;
    liveInPmCount?: number;
    archivedCount?: number;
    designAdvancePayment?: number;
    designUploadDrawings?: number;
    designFinalPayment?: number;
    designCompleted?: number;
    designRejected?: number;
    allCount?: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const GetConstructionProjectStatisticsByConsultantResponseStruct = (): T.Describe<GetConstructionProjectStatisticsByConsultantResponse> => (T.type({
    openBidsCount: tSpecialOptional(T.number()),
    chooseContractorCount: tSpecialOptional(T.number()),
    bidSelectedCount: tSpecialOptional(T.number()),
    readyToSignCount: tSpecialOptional(T.number()),
    signedCount: tSpecialOptional(T.number()),
    liveInPmCount: tSpecialOptional(T.number()),
    archivedCount: tSpecialOptional(T.number()),
    designAdvancePayment: tSpecialOptional(T.number()),
    designUploadDrawings: tSpecialOptional(T.number()),
    designFinalPayment: tSpecialOptional(T.number()),
    designCompleted: tSpecialOptional(T.number()),
    designRejected: tSpecialOptional(T.number()),
    allCount: tSpecialOptional(T.number()),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GetConstructionProjectStatisticsByConsultantResponse>);

export type CreateConstructionProjectResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConstructionProjectResponseStruct = (): T.Describe<CreateConstructionProjectResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConstructionProjectResponse>);

export type DeleteConstructionProjectResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConstructionProjectResponseStruct = (): T.Describe<DeleteConstructionProjectResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConstructionProjectResponse>);

export type PatchConstructionProjectResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchConstructionProjectResponseStruct = (): T.Describe<PatchConstructionProjectResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchConstructionProjectResponse>);

export type UpdateConstructionProjectResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectResponseStruct = (): T.Describe<UpdateConstructionProjectResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectResponse>);

export type UpdateConstructionProjectStatusToRejectedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectStatusToRejectedResponseStruct = (): T.Describe<UpdateConstructionProjectStatusToRejectedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToRejectedResponse>);

export type UpdateConstructionProjectStatusToBidSelectedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectStatusToBidSelectedResponseStruct = (): T.Describe<UpdateConstructionProjectStatusToBidSelectedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToBidSelectedResponse>);

export type UpdateConstructionProjectStatusToReadyToSignResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectStatusToReadyToSignResponseStruct = (): T.Describe<UpdateConstructionProjectStatusToReadyToSignResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToReadyToSignResponse>);

export type UpdateConstructionProjectStatusToSignedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectStatusToSignedResponseStruct = (): T.Describe<UpdateConstructionProjectStatusToSignedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToSignedResponse>);

export type UpdateConstructionProjectStatusToLiveInPmResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectStatusToLiveInPmResponseStruct = (): T.Describe<UpdateConstructionProjectStatusToLiveInPmResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToLiveInPmResponse>);

export type UpdateConstructionProjectStatusToArchivedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectStatusToArchivedResponseStruct = (): T.Describe<UpdateConstructionProjectStatusToArchivedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToArchivedResponse>);

export type UpdateUnArchiveProjectResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateUnArchiveProjectResponseStruct = (): T.Describe<UpdateUnArchiveProjectResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateUnArchiveProjectResponse>);

export type ChangeProjectConsultantResponse = {
    isSuccess?: boolean;
};

export const ChangeProjectConsultantResponseStruct = (): T.Describe<ChangeProjectConsultantResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ChangeProjectConsultantResponse>);

export type UpdateConstructionProjectContractIdResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectContractIdResponseStruct = (): T.Describe<UpdateConstructionProjectContractIdResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectContractIdResponse>);

export type GetProjectNameResponse = {
    result: ProjectNameDto;
};

export const GetProjectNameResponseStruct = (): T.Describe<GetProjectNameResponse> => (T.type({
    result: ProjectNameDtoStruct(),
}) as unknown as T.Describe<GetProjectNameResponse>);

export type UpdateConstructionProjectBidClosingDateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectBidClosingDateResponseStruct = (): T.Describe<UpdateConstructionProjectBidClosingDateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectBidClosingDateResponse>);

export type BaseConstructionProjectOperationResult = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const BaseConstructionProjectOperationResultStruct = (): T.Describe<BaseConstructionProjectOperationResult> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<BaseConstructionProjectOperationResult>);

export type UpdateDesignProjectStatusResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateDesignProjectStatusResponseStruct = (): T.Describe<UpdateDesignProjectStatusResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateDesignProjectStatusResponse>);

export type CreateConstructionProjectReviewResponse = {
    reviewId?: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConstructionProjectReviewResponseStruct = (): T.Describe<CreateConstructionProjectReviewResponse> => (T.type({
    reviewId: tSpecialOptional(T.number()),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConstructionProjectReviewResponse>);

export type GetConstructionProjectReviewsResponse = {
    result: ConstructionProjectReviewDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetConstructionProjectReviewsResponseStruct = (): T.Describe<GetConstructionProjectReviewsResponse> => (T.type({
    result: T.array(ConstructionProjectReviewDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetConstructionProjectReviewsResponse>);

export type CreateConstructionProjectInvitationResponse = {
    projectInvitationId?: number;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateConstructionProjectInvitationResponseStruct = (): T.Describe<CreateConstructionProjectInvitationResponse> => (T.type({
    projectInvitationId: tSpecialOptional(T.number()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateConstructionProjectInvitationResponse>);

export type CreateMyOwnInvitationResponse = {
    isSuccess?: boolean;
    errors: InviteMyOwnValidationErrors;
    referralValidation?: ReferralValidation;
};

export const CreateMyOwnInvitationResponseStruct = (): T.Describe<CreateMyOwnInvitationResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
    errors: InviteMyOwnValidationErrorsStruct(),
    referralValidation: tSpecialOptional(ReferralValidationStruct()),
}) as unknown as T.Describe<CreateMyOwnInvitationResponse>);

export type UpdateMyOwnCompanyInvitationResponse = {
    isSuccess?: boolean;
};

export const UpdateMyOwnCompanyInvitationResponseStruct = (): T.Describe<UpdateMyOwnCompanyInvitationResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateMyOwnCompanyInvitationResponse>);

export type UpdateConstructionProjectInvitationStatusToApprovedResponse = {
    constructionProjectId?: number;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectInvitationStatusToApprovedResponseStruct = (): T.Describe<UpdateConstructionProjectInvitationStatusToApprovedResponse> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectInvitationStatusToApprovedResponse>);

export type UpdateConstructionProjectInvitationStatusToDeclinedResponse = {
    constructionProjectInvitationId?: number;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateConstructionProjectInvitationStatusToDeclinedResponseStruct = (): T.Describe<UpdateConstructionProjectInvitationStatusToDeclinedResponse> => (T.type({
    constructionProjectInvitationId: tSpecialOptional(T.number()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectInvitationStatusToDeclinedResponse>);

export type ListInvitationByProjectIdResponse = {
    result?: ConstructionInvitationDto[];
};

export const ListInvitationByProjectIdResponseStruct = (): T.Describe<ListInvitationByProjectIdResponse> => (T.type({
    result: tSpecialOptional(T.array(ConstructionInvitationDtoStruct())),
}) as unknown as T.Describe<ListInvitationByProjectIdResponse>);

export type ListContractorInvitationByProjectIdResponse = {
    result?: ContractorParticipationDto;
};

export const ListContractorInvitationByProjectIdResponseStruct = (): T.Describe<ListContractorInvitationByProjectIdResponse> => (T.type({
    result: tSpecialOptional(ContractorParticipationDtoStruct()),
}) as unknown as T.Describe<ListContractorInvitationByProjectIdResponse>);

export type DeleteConsultantInvitationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteConsultantInvitationResponseStruct = (): T.Describe<DeleteConsultantInvitationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteConsultantInvitationResponse>);

export type ListDictionaryDataResponse = {
    governorates?: ConstructionGovernorateDto[];
    wilayats?: ConstructionWilayatDto[];
};

export const ListDictionaryDataResponseStruct = (): T.Describe<ListDictionaryDataResponse> => (T.type({
    governorates: tSpecialOptional(T.array(ConstructionGovernorateDtoStruct())),
    wilayats: tSpecialOptional(T.array(ConstructionWilayatDtoStruct())),
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

export type ListProjectBidResponse = {
    result: ProjectBidDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListProjectBidResponseStruct = (): T.Describe<ListProjectBidResponse> => (T.type({
    result: T.array(ProjectBidDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectBidResponse>);

export type ListProjectBidByIdResponse = {
    result: ProjectBidDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListProjectBidByIdResponseStruct = (): T.Describe<ListProjectBidByIdResponse> => (T.type({
    result: T.array(ProjectBidDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectBidByIdResponse>);

export type GetProjectBidResponse = {
    result: ProjectBidDto;
};

export const GetProjectBidResponseStruct = (): T.Describe<GetProjectBidResponse> => (T.type({
    result: ProjectBidDtoStruct(),
}) as unknown as T.Describe<GetProjectBidResponse>);

export type CreateProjectBidResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateProjectBidResponseStruct = (): T.Describe<CreateProjectBidResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateProjectBidResponse>);

export type DeleteProjectBidResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteProjectBidResponseStruct = (): T.Describe<DeleteProjectBidResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteProjectBidResponse>);

export type UpdateProjectBidResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateProjectBidResponseStruct = (): T.Describe<UpdateProjectBidResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateProjectBidResponse>);

export type UpdateProjectBidStatusToArchivedResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateProjectBidStatusToArchivedResponseStruct = (): T.Describe<UpdateProjectBidStatusToArchivedResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateProjectBidStatusToArchivedResponse>);

export type GetConsultantTemplateTimeResponse = {
    templateConsultantTime?: number;
};

export const GetConsultantTemplateTimeResponseStruct = (): T.Describe<GetConsultantTemplateTimeResponse> => (T.type({
    templateConsultantTime: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetConsultantTemplateTimeResponse>);

export type CreateProjectQuestionResponse = {
    answerId?: number;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateProjectQuestionResponseStruct = (): T.Describe<CreateProjectQuestionResponse> => (T.type({
    answerId: tSpecialOptional(T.number()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateProjectQuestionResponse>);

export type ListProjectQuestionByProjectIdResponse = {
    result: ProjectQuestionDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListProjectQuestionByProjectIdResponseStruct = (): T.Describe<ListProjectQuestionByProjectIdResponse> => (T.type({
    result: T.array(ProjectQuestionDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectQuestionByProjectIdResponse>);

export type ListProjectQuestionByProjectAndContractorIdResponse = {
    result: ProjectQuestionDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListProjectQuestionByProjectAndContractorIdResponseStruct = (): T.Describe<ListProjectQuestionByProjectAndContractorIdResponse> => (T.type({
    result: T.array(ProjectQuestionDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectQuestionByProjectAndContractorIdResponse>);

export type GetProjectQuestionResponse = {
    result: ProjectQuestionDto;
};

export const GetProjectQuestionResponseStruct = (): T.Describe<GetProjectQuestionResponse> => (T.type({
    result: ProjectQuestionDtoStruct(),
}) as unknown as T.Describe<GetProjectQuestionResponse>);

export type DeleteProjectQuestionResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteProjectQuestionResponseStruct = (): T.Describe<DeleteProjectQuestionResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteProjectQuestionResponse>);

export type UpdateProjectQuestionResponse = {
    answerId?: number;
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateProjectQuestionResponseStruct = (): T.Describe<UpdateProjectQuestionResponse> => (T.type({
    answerId: tSpecialOptional(T.number()),
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateProjectQuestionResponse>);

export type ListSowItemResponse = {
    result: SowItemDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListSowItemResponseStruct = (): T.Describe<ListSowItemResponse> => (T.type({
    result: T.array(SowItemDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemResponse>);

export type ListSowItemByIdResponse = {
    result: SowItemDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListSowItemByIdResponseStruct = (): T.Describe<ListSowItemByIdResponse> => (T.type({
    result: T.array(SowItemDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemByIdResponse>);

export type GetSowItemResponse = {
    result: SowItemDto;
};

export const GetSowItemResponseStruct = (): T.Describe<GetSowItemResponse> => (T.type({
    result: SowItemDtoStruct(),
}) as unknown as T.Describe<GetSowItemResponse>);

export type GetFullSowItemResponse = {
    result: FullSowItemDto;
};

export const GetFullSowItemResponseStruct = (): T.Describe<GetFullSowItemResponse> => (T.type({
    result: FullSowItemDtoStruct(),
}) as unknown as T.Describe<GetFullSowItemResponse>);

export type ListProjectMaterialsResponse = {
    result: ProjectMaterialsDto;
};

export const ListProjectMaterialsResponseStruct = (): T.Describe<ListProjectMaterialsResponse> => (T.type({
    result: ProjectMaterialsDtoStruct(),
}) as unknown as T.Describe<ListProjectMaterialsResponse>);

export type ListSowItemWithItemAmountResponse = {
    result: SowItemWithUsageAmountDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListSowItemWithItemAmountResponseStruct = (): T.Describe<ListSowItemWithItemAmountResponse> => (T.type({
    result: T.array(SowItemWithUsageAmountDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemWithItemAmountResponse>);

export type CreateSowItemResponse = {
    result: SowItemDto;
};

export const CreateSowItemResponseStruct = (): T.Describe<CreateSowItemResponse> => (T.type({
    result: SowItemDtoStruct(),
}) as unknown as T.Describe<CreateSowItemResponse>);

export type DeleteSowItemResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteSowItemResponseStruct = (): T.Describe<DeleteSowItemResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteSowItemResponse>);

export type PatchSowItemOrderResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchSowItemOrderResponseStruct = (): T.Describe<PatchSowItemOrderResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchSowItemOrderResponse>);

export type UpdateSowItemResponse = {
    result: SowItemDto;
};

export const UpdateSowItemResponseStruct = (): T.Describe<UpdateSowItemResponse> => (T.type({
    result: SowItemDtoStruct(),
}) as unknown as T.Describe<UpdateSowItemResponse>);

export type CreateSowItemUnitResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateSowItemUnitResponseStruct = (): T.Describe<CreateSowItemUnitResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateSowItemUnitResponse>);

export type GetSowItemUnitByIdsResponse = {
    result?: SowItemUnitDto[];
};

export const GetSowItemUnitByIdsResponseStruct = (): T.Describe<GetSowItemUnitByIdsResponse> => (T.type({
    result: tSpecialOptional(T.array(SowItemUnitDtoStruct())),
}) as unknown as T.Describe<GetSowItemUnitByIdsResponse>);

export type ListSowItemUnitResponse = {
    result: SowItemUnitDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListSowItemUnitResponseStruct = (): T.Describe<ListSowItemUnitResponse> => (T.type({
    result: T.array(SowItemUnitDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemUnitResponse>);

export type ListSowItemUnitByItemIdResponse = {
    result: SowItemUnitDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListSowItemUnitByItemIdResponseStruct = (): T.Describe<ListSowItemUnitByItemIdResponse> => (T.type({
    result: T.array(SowItemUnitDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemUnitByItemIdResponse>);

export type GetSowItemUnitResponse = {
    result: SowItemUnitDto;
};

export const GetSowItemUnitResponseStruct = (): T.Describe<GetSowItemUnitResponse> => (T.type({
    result: SowItemUnitDtoStruct(),
}) as unknown as T.Describe<GetSowItemUnitResponse>);

export type DeleteSowItemUnitResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteSowItemUnitResponseStruct = (): T.Describe<DeleteSowItemUnitResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteSowItemUnitResponse>);

export type PatchSowItemUnitOrderResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PatchSowItemUnitOrderResponseStruct = (): T.Describe<PatchSowItemUnitOrderResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PatchSowItemUnitOrderResponse>);

export type UpdateSowItemUnitResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateSowItemUnitResponseStruct = (): T.Describe<UpdateSowItemUnitResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateSowItemUnitResponse>);

export type ListSowVersionResponse = {
    result: SowVersionDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListSowVersionResponseStruct = (): T.Describe<ListSowVersionResponse> => (T.type({
    result: T.array(SowVersionDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowVersionResponse>);

export type GetSowVersionResponse = {
    result: SowVersionDto;
};

export const GetSowVersionResponseStruct = (): T.Describe<GetSowVersionResponse> => (T.type({
    result: SowVersionDtoStruct(),
}) as unknown as T.Describe<GetSowVersionResponse>);

export type GetWholeSowVersionResponse = {
    result: SowVersionDto;
};

export const GetWholeSowVersionResponseStruct = (): T.Describe<GetWholeSowVersionResponse> => (T.type({
    result: SowVersionDtoStruct(),
}) as unknown as T.Describe<GetWholeSowVersionResponse>);

export type GetMasterSowVersionResponse = {
    result: SowVersionDto;
};

export const GetMasterSowVersionResponseStruct = (): T.Describe<GetMasterSowVersionResponse> => (T.type({
    result: SowVersionDtoStruct(),
}) as unknown as T.Describe<GetMasterSowVersionResponse>);

export type GetMasterSowVersionIdResponse = {
    result: number;
};

export const GetMasterSowVersionIdResponseStruct = (): T.Describe<GetMasterSowVersionIdResponse> => (T.type({
    result: T.number(),
}) as unknown as T.Describe<GetMasterSowVersionIdResponse>);

export type CreateSowVersionResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateSowVersionResponseStruct = (): T.Describe<CreateSowVersionResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateSowVersionResponse>);

export type CreateDraftSowVersionResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateDraftSowVersionResponseStruct = (): T.Describe<CreateDraftSowVersionResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateDraftSowVersionResponse>);

export type DeleteSowVersionResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteSowVersionResponseStruct = (): T.Describe<DeleteSowVersionResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteSowVersionResponse>);

export type UpdateSowVersionResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateSowVersionResponseStruct = (): T.Describe<UpdateSowVersionResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateSowVersionResponse>);

export type UpdateToMasterSowVersionResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateToMasterSowVersionResponseStruct = (): T.Describe<UpdateToMasterSowVersionResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateToMasterSowVersionResponse>);

export type ListStagePlanResponse = {
    result: StagePlanDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListStagePlanResponseStruct = (): T.Describe<ListStagePlanResponse> => (T.type({
    result: T.array(StagePlanDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListStagePlanResponse>);

export type GetStagePlanByProjectIdResponse = {
    result: StagePlanDto;
};

export const GetStagePlanByProjectIdResponseStruct = (): T.Describe<GetStagePlanByProjectIdResponse> => (T.type({
    result: StagePlanDtoStruct(),
}) as unknown as T.Describe<GetStagePlanByProjectIdResponse>);

export type GetStagePlanResponse = {
    result: StagePlanDto;
};

export const GetStagePlanResponseStruct = (): T.Describe<GetStagePlanResponse> => (T.type({
    result: StagePlanDtoStruct(),
}) as unknown as T.Describe<GetStagePlanResponse>);

export type GetWholeStagePlanByIdResponse = {
    result: StagePlanDto;
};

export const GetWholeStagePlanByIdResponseStruct = (): T.Describe<GetWholeStagePlanByIdResponse> => (T.type({
    result: StagePlanDtoStruct(),
}) as unknown as T.Describe<GetWholeStagePlanByIdResponse>);

export type CreateStagePlanResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateStagePlanResponseStruct = (): T.Describe<CreateStagePlanResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateStagePlanResponse>);

export type DeleteStagePlanResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteStagePlanResponseStruct = (): T.Describe<DeleteStagePlanResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteStagePlanResponse>);

export type UpdateStagePlanResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateStagePlanResponseStruct = (): T.Describe<UpdateStagePlanResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateStagePlanResponse>);

export type ListStageTemplateResponse = {
    result: StageTemplateDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListStageTemplateResponseStruct = (): T.Describe<ListStageTemplateResponse> => (T.type({
    result: T.array(StageTemplateDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListStageTemplateResponse>);

export type GetStageTemplateResponse = {
    result: StageTemplateDto;
};

export const GetStageTemplateResponseStruct = (): T.Describe<GetStageTemplateResponse> => (T.type({
    result: StageTemplateDtoStruct(),
}) as unknown as T.Describe<GetStageTemplateResponse>);

export type GetStageTemplateByFloorSetupResponse = {
    result: StageTemplateDto;
};

export const GetStageTemplateByFloorSetupResponseStruct = (): T.Describe<GetStageTemplateByFloorSetupResponse> => (T.type({
    result: StageTemplateDtoStruct(),
}) as unknown as T.Describe<GetStageTemplateByFloorSetupResponse>);

export type GetStageTemplateNameResponse = {
    result: boolean;
};

export const GetStageTemplateNameResponseStruct = (): T.Describe<GetStageTemplateNameResponse> => (T.type({
    result: T.boolean(),
}) as unknown as T.Describe<GetStageTemplateNameResponse>);

export type CreateStageTemplateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateStageTemplateResponseStruct = (): T.Describe<CreateStageTemplateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateStageTemplateResponse>);

export type CreateDraftStageTemplateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateDraftStageTemplateResponseStruct = (): T.Describe<CreateDraftStageTemplateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateDraftStageTemplateResponse>);

export type DeleteStageTemplateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteStageTemplateResponseStruct = (): T.Describe<DeleteStageTemplateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteStageTemplateResponse>);

export type UpdateStageTemplateResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateStageTemplateResponseStruct = (): T.Describe<UpdateStageTemplateResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateStageTemplateResponse>);

export type UpdateStageTemplateToInactiveResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateStageTemplateToInactiveResponseStruct = (): T.Describe<UpdateStageTemplateToInactiveResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateStageTemplateToInactiveResponse>);

export type ListStageTemplatePartByIdResponse = {
    result: StageTemplatePartDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListStageTemplatePartByIdResponseStruct = (): T.Describe<ListStageTemplatePartByIdResponse> => (T.type({
    result: T.array(StageTemplatePartDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListStageTemplatePartByIdResponse>);

export type GetStageTemplatePartResponse = {
    result: StageTemplatePartDto;
};

export const GetStageTemplatePartResponseStruct = (): T.Describe<GetStageTemplatePartResponse> => (T.type({
    result: StageTemplatePartDtoStruct(),
}) as unknown as T.Describe<GetStageTemplatePartResponse>);

export type CreateStageTemplatePartResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateStageTemplatePartResponseStruct = (): T.Describe<CreateStageTemplatePartResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateStageTemplatePartResponse>);

export type DeleteStageTemplatePartResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteStageTemplatePartResponseStruct = (): T.Describe<DeleteStageTemplatePartResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteStageTemplatePartResponse>);

export type UpdateStageTemplatePartResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateStageTemplatePartResponseStruct = (): T.Describe<UpdateStageTemplatePartResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateStageTemplatePartResponse>);

export type GetStageTemplateUnitResponse = {
    result: StageTemplateUnitDto;
};

export const GetStageTemplateUnitResponseStruct = (): T.Describe<GetStageTemplateUnitResponse> => (T.type({
    result: StageTemplateUnitDtoStruct(),
}) as unknown as T.Describe<GetStageTemplateUnitResponse>);

export type CreateStageTemplateUnitResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateStageTemplateUnitResponseStruct = (): T.Describe<CreateStageTemplateUnitResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateStageTemplateUnitResponse>);

export type DeleteStageTemplateUnitResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const DeleteStageTemplateUnitResponseStruct = (): T.Describe<DeleteStageTemplateUnitResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<DeleteStageTemplateUnitResponse>);

export type UpdateStageTemplateUnitResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const UpdateStageTemplateUnitResponseStruct = (): T.Describe<UpdateStageTemplateUnitResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateStageTemplateUnitResponse>);

export type GetUserManagementStatisticsResponse = {
    result: UserManagementStatisticsDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetUserManagementStatisticsResponseStruct = (): T.Describe<GetUserManagementStatisticsResponse> => (T.type({
    result: T.array(UserManagementStatisticsDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetUserManagementStatisticsResponse>);

export type ListUserManagementProjectsInfoResponse = {
    result: AdminPanelConstructionProjectInfoDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const ListUserManagementProjectsInfoResponseStruct = (): T.Describe<ListUserManagementProjectsInfoResponse> => (T.type({
    result: T.array(AdminPanelConstructionProjectInfoDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListUserManagementProjectsInfoResponse>);

export type WorkflowTaskActionUpdateResponse = {
    result: boolean;
};

export const WorkflowTaskActionUpdateResponseStruct = (): T.Describe<WorkflowTaskActionUpdateResponse> => (T.type({
    result: T.boolean(),
}) as unknown as T.Describe<WorkflowTaskActionUpdateResponse>);

export type GetCompanyManagementStatisticsQuery = {
    contractorIds?: number[];
    consultantIds?: number[];
};

export const GetCompanyManagementStatisticsQueryStruct = (): T.Describe<GetCompanyManagementStatisticsQuery> => (T.type({
    contractorIds: tSpecialOptional(T.array(T.number())),
    consultantIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<GetCompanyManagementStatisticsQuery>);

export type GetCompanyManagementProjectsCountQuery = {
    consultantIds?: number[];
    contractorIds?: number[];
};

export const GetCompanyManagementProjectsCountQueryStruct = (): T.Describe<GetCompanyManagementProjectsCountQuery> => (T.type({
    consultantIds: tSpecialOptional(T.array(T.number())),
    contractorIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<GetCompanyManagementProjectsCountQuery>);

export type ListCompanyManagementProjectsInfoQuery = {
    contractorIds?: number[];
    consultantIds?: number[];
    page?: number;
    pageSize?: number;
};

export const ListCompanyManagementProjectsInfoQueryStruct = (): T.Describe<ListCompanyManagementProjectsInfoQuery> => (T.type({
    contractorIds: tSpecialOptional(T.array(T.number())),
    consultantIds: tSpecialOptional(T.array(T.number())),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListCompanyManagementProjectsInfoQuery>);

export type GetCompanyAwardedSortQuery = {
    isAwardedAscending?: boolean;
    isParticipatedAscending?: boolean;
    idsToIgnore?: number[];
    page?: number;
    pageSize?: number;
};

export const GetCompanyAwardedSortQueryStruct = (): T.Describe<GetCompanyAwardedSortQuery> => (T.type({
    isAwardedAscending: tSpecialOptional(T.boolean()),
    isParticipatedAscending: tSpecialOptional(T.boolean()),
    idsToIgnore: tSpecialOptional(T.array(T.number())),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetCompanyAwardedSortQuery>);

export type ListConstructionProjectQuery = {
    filterRules?: ConstructionProjectFilter;
    sortRules?: ConstructionProjectSort;
    page?: number;
    pageSize?: number;
    viewType?: AdminProjectView;
    searchValue?: string;
};

export const ListConstructionProjectQueryStruct = (): T.Describe<ListConstructionProjectQuery> => (T.type({
    filterRules: tSpecialOptional(ConstructionProjectFilterStruct()),
    sortRules: tSpecialOptional(ConstructionProjectSortStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    viewType: tSpecialOptional(AdminProjectViewStruct()),
    searchValue: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ListConstructionProjectQuery>);

export type ListConstructionProjectForConsultantContextQuery = {
    sortRules?: ConstructionProjectSort;
    page?: number;
    pageSize?: number;
    viewType?: ContractorViewType;
    projectType?: ProjectStartingStep;
    governorateCollection?: number[];
};

export const ListConstructionProjectForConsultantContextQueryStruct = (): T.Describe<ListConstructionProjectForConsultantContextQuery> => (T.type({
    sortRules: tSpecialOptional(ConstructionProjectSortStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    viewType: tSpecialOptional(ContractorViewTypeStruct()),
    projectType: tSpecialOptional(ProjectStartingStepStruct()),
    governorateCollection: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<ListConstructionProjectForConsultantContextQuery>);

export type GetConstructionProjectForConsultantContextQuery = {
    projectId?: number;
};

export const GetConstructionProjectForConsultantContextQueryStruct = (): T.Describe<GetConstructionProjectForConsultantContextQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetConstructionProjectForConsultantContextQuery>);

export type GetConstructionProjectForConsultantQuery = {
    projectId?: number;
};

export const GetConstructionProjectForConsultantQueryStruct = (): T.Describe<GetConstructionProjectForConsultantQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetConstructionProjectForConsultantQuery>);

export type GetConstructionProjectWithConsultantInvitedQuery = {
    projectId: number;
};

export const GetConstructionProjectWithConsultantInvitedQueryStruct = (): T.Describe<GetConstructionProjectWithConsultantInvitedQuery> => (T.type({
    projectId: T.number(),
}) as unknown as T.Describe<GetConstructionProjectWithConsultantInvitedQuery>);

export type GetConstructionProjectWithInvitationByProjectIdQuery = {
    projectId: number;
};

export const GetConstructionProjectWithInvitationByProjectIdQueryStruct = (): T.Describe<GetConstructionProjectWithInvitationByProjectIdQuery> => (T.type({
    projectId: T.number(),
}) as unknown as T.Describe<GetConstructionProjectWithInvitationByProjectIdQuery>);

export type ListConstructionProjectWithInvitationByProjectIdQuery = {
    sortRules?: ConstructionProjectSort;
    page?: number;
    pageSize?: number;
};

export const ListConstructionProjectWithInvitationByProjectIdQueryStruct = (): T.Describe<ListConstructionProjectWithInvitationByProjectIdQuery> => (T.type({
    sortRules: tSpecialOptional(ConstructionProjectSortStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectWithInvitationByProjectIdQuery>);

export type ListConstructionProjectByStatusQuery = {
    sortRules?: ConstructionProjectSort;
    status?: ConstructionProjectStatus;
    page?: number;
    pageSize?: number;
};

export const ListConstructionProjectByStatusQueryStruct = (): T.Describe<ListConstructionProjectByStatusQuery> => (T.type({
    sortRules: tSpecialOptional(ConstructionProjectSortStruct()),
    status: tSpecialOptional(ConstructionProjectStatusStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectByStatusQuery>);

export type ListConstructionProjectWithBidQuery = {
    sortRules?: ConstructionProjectSort;
    governorateCollection?: number[];
    wilayatCollection?: number[];
    constructionType?: ConstructionType;
    minimumProjectSize?: number;
    page?: number;
    pageSize?: number;
    viewType?: ContractorViewType;
};

export const ListConstructionProjectWithBidQueryStruct = (): T.Describe<ListConstructionProjectWithBidQuery> => (T.type({
    sortRules: tSpecialOptional(ConstructionProjectSortStruct()),
    governorateCollection: tSpecialOptional(T.array(T.number())),
    wilayatCollection: tSpecialOptional(T.array(T.number())),
    constructionType: tSpecialOptional(ConstructionTypeStruct()),
    minimumProjectSize: tSpecialOptional(T.number()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    viewType: tSpecialOptional(ContractorViewTypeStruct()),
}) as unknown as T.Describe<ListConstructionProjectWithBidQuery>);

export type ListConstructionProjectByStatusAndContractorQuery = {
    sortRules?: ConstructionProjectSort;
    contractorId?: number;
    status?: ConstructionProjectStatus;
    page?: number;
    pageSize?: number;
};

export const ListConstructionProjectByStatusAndContractorQueryStruct = (): T.Describe<ListConstructionProjectByStatusAndContractorQuery> => (T.type({
    sortRules: tSpecialOptional(ConstructionProjectSortStruct()),
    contractorId: tSpecialOptional(T.number()),
    status: tSpecialOptional(ConstructionProjectStatusStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectByStatusAndContractorQuery>);

export type ListConstructionProjectByStatusAndConsultantQuery = {
    sortRules?: ConstructionProjectSort;
    contractorId?: number;
    statusView?: ConsultantStatusView;
    page?: number;
    pageSize?: number;
};

export const ListConstructionProjectByStatusAndConsultantQueryStruct = (): T.Describe<ListConstructionProjectByStatusAndConsultantQuery> => (T.type({
    sortRules: tSpecialOptional(ConstructionProjectSortStruct()),
    contractorId: tSpecialOptional(T.number()),
    statusView: tSpecialOptional(ConsultantStatusViewStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConstructionProjectByStatusAndConsultantQuery>);

export type ListNewConstructionProjectsQuery = {
    sortRules?: ConstructionProjectSort;
    page?: number;
    pageSize?: number;
};

export const ListNewConstructionProjectsQueryStruct = (): T.Describe<ListNewConstructionProjectsQuery> => (T.type({
    sortRules: tSpecialOptional(ConstructionProjectSortStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListNewConstructionProjectsQuery>);

export type GetConstructionProjectQuery = {
    id: number;
    generateContract?: boolean;
};

export const GetConstructionProjectQueryStruct = (): T.Describe<GetConstructionProjectQuery> => (T.type({
    id: T.number(),
    generateContract: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GetConstructionProjectQuery>);

export type GetConstructionProjectWithBidQuery = {
    id: number;
};

export const GetConstructionProjectWithBidQueryStruct = (): T.Describe<GetConstructionProjectWithBidQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetConstructionProjectWithBidQuery>);

export type GetEbinaaProjectStatisticsQuery = undefined;

export const GetEbinaaProjectStatisticsQueryStruct = () => T.literal(undefined);

export type GetConstructionProjectStatisticsQuery = undefined;

export const GetConstructionProjectStatisticsQueryStruct = () => T.literal(undefined);

export type GetConstructionProjectStatisticsByContractorQuery = undefined;

export const GetConstructionProjectStatisticsByContractorQueryStruct = () => T.literal(undefined);

export type GetConstructionProjectStatisticsByConsultantQuery = undefined;

export const GetConstructionProjectStatisticsByConsultantQueryStruct = () => T.literal(undefined);

export type CreateConstructionProjectCommand = {
    startingStep?: ProjectStartingStep;
    clientId?: number;
    landArea: number;
    buildingAllAreaInTheDrawings?: boolean;
    addedBuiltUpArea: number;
    constructionType?: ConstructionType;
    landType: ConstructionLandType;
    wilayatId: number;
    governorateId: number;
    additionalComment?: string;
    krookieFiles?: string[];
    drawingFiles?: string[];
    changeStatusToReview?: boolean;
    designId?: number;
};

export const CreateConstructionProjectCommandStruct = (): T.Describe<CreateConstructionProjectCommand> => (T.type({
    startingStep: tSpecialOptional(ProjectStartingStepStruct()),
    clientId: tSpecialOptional(T.number()),
    landArea: T.number(),
    buildingAllAreaInTheDrawings: tSpecialOptional(T.boolean()),
    addedBuiltUpArea: T.number(),
    constructionType: tSpecialOptional(ConstructionTypeStruct()),
    landType: ConstructionLandTypeStruct(),
    wilayatId: T.number(),
    governorateId: T.number(),
    additionalComment: tSpecialOptional(T.string()),
    krookieFiles: tSpecialOptional(T.array(T.string())),
    drawingFiles: tSpecialOptional(T.array(T.string())),
    changeStatusToReview: tSpecialOptional(T.boolean()),
    designId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateConstructionProjectCommand>);

export type DeleteConstructionProjectCommand = {
    id: number;
};

export const DeleteConstructionProjectCommandStruct = (): T.Describe<DeleteConstructionProjectCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteConstructionProjectCommand>);

export type PatchConstructionProjectCommand = {
    id: number;
    operations: JsonPatchElement[];
};

export const PatchConstructionProjectCommandStruct = (): T.Describe<PatchConstructionProjectCommand> => (T.type({
    id: T.number(),
    operations: T.array(JsonPatchElementStruct()),
}) as unknown as T.Describe<PatchConstructionProjectCommand>);

export type UpdateConstructionProjectCommand = {
    id: number;
    stageTemplateId?: number;
    landArea: number;
    buildingAllAreaInTheDrawings?: boolean;
    addedBuiltUpArea: number;
    constructionType?: ConstructionType;
    landType: ConstructionLandType;
    wilayatId: number;
    governorateId: number;
    additionalComment?: string;
    krookieFiles?: string[];
    drawingFiles?: string[];
    changeStatusToReview?: boolean;
    designId?: number;
};

export const UpdateConstructionProjectCommandStruct = (): T.Describe<UpdateConstructionProjectCommand> => (T.type({
    id: T.number(),
    stageTemplateId: tSpecialOptional(T.number()),
    landArea: T.number(),
    buildingAllAreaInTheDrawings: tSpecialOptional(T.boolean()),
    addedBuiltUpArea: T.number(),
    constructionType: tSpecialOptional(ConstructionTypeStruct()),
    landType: ConstructionLandTypeStruct(),
    wilayatId: T.number(),
    governorateId: T.number(),
    additionalComment: tSpecialOptional(T.string()),
    krookieFiles: tSpecialOptional(T.array(T.string())),
    drawingFiles: tSpecialOptional(T.array(T.string())),
    changeStatusToReview: tSpecialOptional(T.boolean()),
    designId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateConstructionProjectCommand>);

export type UpdateConstructionProjectStatusToRejectedCommand = {
    id: number;
    comment?: string;
};

export const UpdateConstructionProjectStatusToRejectedCommandStruct = (): T.Describe<UpdateConstructionProjectStatusToRejectedCommand> => (T.type({
    id: T.number(),
    comment: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToRejectedCommand>);

export type UpdateConstructionProjectStatusToBidSelectedCommand = {
    id: number;
    projectBidId: number;
    unSelect?: boolean;
};

export const UpdateConstructionProjectStatusToBidSelectedCommandStruct = (): T.Describe<UpdateConstructionProjectStatusToBidSelectedCommand> => (T.type({
    id: T.number(),
    projectBidId: T.number(),
    unSelect: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToBidSelectedCommand>);

export type UpdateConstructionProjectStatusToReadyToSignCommand = {
    id: number;
};

export const UpdateConstructionProjectStatusToReadyToSignCommandStruct = (): T.Describe<UpdateConstructionProjectStatusToReadyToSignCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToReadyToSignCommand>);

export type UpdateConstructionProjectStatusToSignedCommand = {
    id: number;
};

export const UpdateConstructionProjectStatusToSignedCommandStruct = (): T.Describe<UpdateConstructionProjectStatusToSignedCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToSignedCommand>);

export type UpdateConstructionProjectStatusToLiveInPmCommand = {
    id: number;
};

export const UpdateConstructionProjectStatusToLiveInPmCommandStruct = (): T.Describe<UpdateConstructionProjectStatusToLiveInPmCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToLiveInPmCommand>);

export type UpdateConstructionProjectStatusToArchivedCommand = {
    id: number;
};

export const UpdateConstructionProjectStatusToArchivedCommandStruct = (): T.Describe<UpdateConstructionProjectStatusToArchivedCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateConstructionProjectStatusToArchivedCommand>);

export type UpdateUnArchiveProjectCommand = {
    id: number;
};

export const UpdateUnArchiveProjectCommandStruct = (): T.Describe<UpdateUnArchiveProjectCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateUnArchiveProjectCommand>);

export type ChangeProjectConsultantCommand = {
    constructionProjectId?: number;
    consultantId?: number;
};

export const ChangeProjectConsultantCommandStruct = (): T.Describe<ChangeProjectConsultantCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ChangeProjectConsultantCommand>);

export type UpdateConstructionProjectContractIdCommand = {
    id: number;
    contractId: number;
};

export const UpdateConstructionProjectContractIdCommandStruct = (): T.Describe<UpdateConstructionProjectContractIdCommand> => (T.type({
    id: T.number(),
    contractId: T.number(),
}) as unknown as T.Describe<UpdateConstructionProjectContractIdCommand>);

export type GetProjectNameQuery = {
    projectId?: number;
};

export const GetProjectNameQueryStruct = (): T.Describe<GetProjectNameQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetProjectNameQuery>);

export type UpdateConstructionProjectBidClosingDateCommand = {
    id: number;
    bidClosingDateOption?: BidClosingDateOption;
};

export const UpdateConstructionProjectBidClosingDateCommandStruct = (): T.Describe<UpdateConstructionProjectBidClosingDateCommand> => (T.type({
    id: T.number(),
    bidClosingDateOption: tSpecialOptional(BidClosingDateOptionStruct()),
}) as unknown as T.Describe<UpdateConstructionProjectBidClosingDateCommand>);

export type UploadConstructionProjectDrawingsCommand = {
    constructionProjectId?: number;
    krookieFiles?: string[];
    drawingFiles?: string[];
};

export const UploadConstructionProjectDrawingsCommandStruct = (): T.Describe<UploadConstructionProjectDrawingsCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    krookieFiles: tSpecialOptional(T.array(T.string())),
    drawingFiles: tSpecialOptional(T.array(T.string())),
}) as unknown as T.Describe<UploadConstructionProjectDrawingsCommand>);

export type UpdateDesignProjectStatusCommand = {
    projectId?: number;
    action?: DesignProjectTrigger;
};

export const UpdateDesignProjectStatusCommandStruct = (): T.Describe<UpdateDesignProjectStatusCommand> => (T.type({
    projectId: tSpecialOptional(T.number()),
    action: tSpecialOptional(DesignProjectTriggerStruct()),
}) as unknown as T.Describe<UpdateDesignProjectStatusCommand>);

export type CreateConstructionProjectReviewCommand = {
    constructionProjectId?: number;
    isApproved?: boolean;
    comment?: string;
};

export const CreateConstructionProjectReviewCommandStruct = (): T.Describe<CreateConstructionProjectReviewCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    isApproved: tSpecialOptional(T.boolean()),
    comment: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateConstructionProjectReviewCommand>);

export type GetConstructionProjectReviewsQuery = {
    projectId?: number;
};

export const GetConstructionProjectReviewsQueryStruct = (): T.Describe<GetConstructionProjectReviewsQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetConstructionProjectReviewsQuery>);

export type CreateConstructionProjectInvitationCommand = {
    companyId?: number;
    companyType?: ContextType;
    constructionProjectId?: number;
};

export const CreateConstructionProjectInvitationCommandStruct = (): T.Describe<CreateConstructionProjectInvitationCommand> => (T.type({
    companyId: tSpecialOptional(T.number()),
    companyType: tSpecialOptional(ContextTypeStruct()),
    constructionProjectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateConstructionProjectInvitationCommand>);

export type CreateMyOwnInvitationCommand = {
    phoneNumber: string;
    email?: string;
    contextType: ContextType;
    projectId: number;
    companyName: string;
};

export const CreateMyOwnInvitationCommandStruct = (): T.Describe<CreateMyOwnInvitationCommand> => (T.type({
    phoneNumber: T.string(),
    email: tSpecialOptional(T.string()),
    contextType: ContextTypeStruct(),
    projectId: T.number(),
    companyName: T.string(),
}) as unknown as T.Describe<CreateMyOwnInvitationCommand>);

export type UpdateMyOwnCompanyInvitationCommand = {
    companyId?: number;
    phoneNumber?: string;
    projectIds?: number[];
};

export const UpdateMyOwnCompanyInvitationCommandStruct = (): T.Describe<UpdateMyOwnCompanyInvitationCommand> => (T.type({
    companyId: tSpecialOptional(T.number()),
    phoneNumber: tSpecialOptional(T.string()),
    projectIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<UpdateMyOwnCompanyInvitationCommand>);

export type UpdateConstructionProjectInvitationStatusToApprovedCommand = {
    constructionProjectId?: number;
    consultantId?: number;
};

export const UpdateConstructionProjectInvitationStatusToApprovedCommandStruct = (): T.Describe<UpdateConstructionProjectInvitationStatusToApprovedCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateConstructionProjectInvitationStatusToApprovedCommand>);

export type UpdateConstructionProjectInvitationStatusToDeclinedCommand = {
    constructionProjectId: number;
};

export const UpdateConstructionProjectInvitationStatusToDeclinedCommandStruct = (): T.Describe<UpdateConstructionProjectInvitationStatusToDeclinedCommand> => (T.type({
    constructionProjectId: T.number(),
}) as unknown as T.Describe<UpdateConstructionProjectInvitationStatusToDeclinedCommand>);

export type ListInvitationByProjectIdQuery = {
    constructionProjectId?: number;
    contextType?: ContextType;
};

export const ListInvitationByProjectIdQueryStruct = (): T.Describe<ListInvitationByProjectIdQuery> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    contextType: tSpecialOptional(ContextTypeStruct()),
}) as unknown as T.Describe<ListInvitationByProjectIdQuery>);

export type ListContractorInvitationByProjectIdQuery = {
    constructionProjectId?: number;
};

export const ListContractorInvitationByProjectIdQueryStruct = (): T.Describe<ListContractorInvitationByProjectIdQuery> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListContractorInvitationByProjectIdQuery>);

export type DeleteConsultantInvitationCommand = {
    constructionProjectId?: number;
};

export const DeleteConsultantInvitationCommandStruct = (): T.Describe<DeleteConsultantInvitationCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<DeleteConsultantInvitationCommand>);

export type ListDictionaryDataQuery = undefined;

export const ListDictionaryDataQueryStruct = () => T.literal(undefined);

export type ListOneDictionaryQuery = {
    dictionary?: DictionaryName;
};

export const ListOneDictionaryQueryStruct = (): T.Describe<ListOneDictionaryQuery> => (T.type({
    dictionary: tSpecialOptional(DictionaryNameStruct()),
}) as unknown as T.Describe<ListOneDictionaryQuery>);

export type ListProjectBidQuery = {
    page?: number;
    pageSize?: number;
};

export const ListProjectBidQueryStruct = (): T.Describe<ListProjectBidQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectBidQuery>);

export type ListProjectBidByIdQuery = {
    projectId: number;
    page?: number;
    pageSize?: number;
};

export const ListProjectBidByIdQueryStruct = (): T.Describe<ListProjectBidByIdQuery> => (T.type({
    projectId: T.number(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectBidByIdQuery>);

export type GetProjectBidQuery = {
    id: number;
};

export const GetProjectBidQueryStruct = (): T.Describe<GetProjectBidQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetProjectBidQuery>);

export type GetWinnerProjectBidQuery = {
    projectId?: number;
};

export const GetWinnerProjectBidQueryStruct = (): T.Describe<GetWinnerProjectBidQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetWinnerProjectBidQuery>);

export type CreateProjectBidCommand = {
    projectId: number;
    totalPrice?: number;
    structureItemsTotalPrice?: number;
    turnkeyItemsTotalPrice?: number;
    totalDays?: number;
    numberOfCurrentProjects?: number;
    message?: string;
};

export const CreateProjectBidCommandStruct = (): T.Describe<CreateProjectBidCommand> => (T.type({
    projectId: T.number(),
    totalPrice: tSpecialOptional(T.number()),
    structureItemsTotalPrice: tSpecialOptional(T.number()),
    turnkeyItemsTotalPrice: tSpecialOptional(T.number()),
    totalDays: tSpecialOptional(T.number()),
    numberOfCurrentProjects: tSpecialOptional(T.number()),
    message: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateProjectBidCommand>);

export type DeleteProjectBidCommand = {
    id: number;
};

export const DeleteProjectBidCommandStruct = (): T.Describe<DeleteProjectBidCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteProjectBidCommand>);

export type UpdateProjectBidCommand = {
    bidCosts?: ProjectBidCostDto[];
    stageParts?: ProjectBidStagePartDto[];
    changeStatusToSubmitted?: boolean;
    id: number;
    totalPrice?: number;
    structureItemsTotalPrice?: number;
    turnkeyItemsTotalPrice?: number;
    totalDays?: number;
    numberOfCurrentProjects?: number;
    message?: string;
};

export const UpdateProjectBidCommandStruct = (): T.Describe<UpdateProjectBidCommand> => (T.type({
    bidCosts: tSpecialOptional(T.array(ProjectBidCostDtoStruct())),
    stageParts: tSpecialOptional(T.array(ProjectBidStagePartDtoStruct())),
    changeStatusToSubmitted: tSpecialOptional(T.boolean()),
    id: T.number(),
    totalPrice: tSpecialOptional(T.number()),
    structureItemsTotalPrice: tSpecialOptional(T.number()),
    turnkeyItemsTotalPrice: tSpecialOptional(T.number()),
    totalDays: tSpecialOptional(T.number()),
    numberOfCurrentProjects: tSpecialOptional(T.number()),
    message: tSpecialOptional(T.string()),
}) as unknown as T.Describe<UpdateProjectBidCommand>);

export type UpdateProjectBidStatusToArchivedCommand = {
    id: number;
};

export const UpdateProjectBidStatusToArchivedCommandStruct = (): T.Describe<UpdateProjectBidStatusToArchivedCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateProjectBidStatusToArchivedCommand>);

export type GetConsultantTemplateTimeQuery = {
    projectId?: number;
};

export const GetConsultantTemplateTimeQueryStruct = (): T.Describe<GetConsultantTemplateTimeQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetConsultantTemplateTimeQuery>);

export type CreateProjectQuestionCommand = {
    projectId?: number;
    question?: string;
    answer?: string;
};

export const CreateProjectQuestionCommandStruct = (): T.Describe<CreateProjectQuestionCommand> => (T.type({
    projectId: tSpecialOptional(T.number()),
    question: tSpecialOptional(T.string()),
    answer: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CreateProjectQuestionCommand>);

export type ListProjectQuestionByProjectIdQuery = {
    projectId: number;
    page?: number;
    pageSize?: number;
};

export const ListProjectQuestionByProjectIdQueryStruct = (): T.Describe<ListProjectQuestionByProjectIdQuery> => (T.type({
    projectId: T.number(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectQuestionByProjectIdQuery>);

export type ListProjectQuestionByProjectAndContractorIdQuery = {
    projectId: number;
    contractorId: number;
    page?: number;
    pageSize?: number;
};

export const ListProjectQuestionByProjectAndContractorIdQueryStruct = (): T.Describe<ListProjectQuestionByProjectAndContractorIdQuery> => (T.type({
    projectId: T.number(),
    contractorId: T.number(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectQuestionByProjectAndContractorIdQuery>);

export type GetProjectQuestionQuery = {
    id: number;
};

export const GetProjectQuestionQueryStruct = (): T.Describe<GetProjectQuestionQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetProjectQuestionQuery>);

export type DeleteProjectQuestionCommand = {
    id: number;
};

export const DeleteProjectQuestionCommandStruct = (): T.Describe<DeleteProjectQuestionCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteProjectQuestionCommand>);

export type UpdateProjectQuestionCommand = {
    id: number;
    question?: string;
    answerId?: number;
    answer?: string;
    questionAction?: UpdateQuestionAction;
};

export const UpdateProjectQuestionCommandStruct = (): T.Describe<UpdateProjectQuestionCommand> => (T.type({
    id: T.number(),
    question: tSpecialOptional(T.string()),
    answerId: tSpecialOptional(T.number()),
    answer: tSpecialOptional(T.string()),
    questionAction: tSpecialOptional(UpdateQuestionActionStruct()),
}) as unknown as T.Describe<UpdateProjectQuestionCommand>);

export type ListSowItemQuery = {
    sort?: ListSowItemSorts;
    page?: number;
    pageSize?: number;
};

export const ListSowItemQueryStruct = (): T.Describe<ListSowItemQuery> => (T.type({
    sort: tSpecialOptional(ListSowItemSortsStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemQuery>);

export type ListSowItemsByIdsQuery = {
    ids?: number[];
};

export const ListSowItemsByIdsQueryStruct = (): T.Describe<ListSowItemsByIdsQuery> => (T.type({
    ids: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<ListSowItemsByIdsQuery>);

export type ListSowItemByIdQuery = {
    versionId?: number;
    page?: number;
    pageSize?: number;
};

export const ListSowItemByIdQueryStruct = (): T.Describe<ListSowItemByIdQuery> => (T.type({
    versionId: tSpecialOptional(T.number()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemByIdQuery>);

export type GetSowItemQuery = {
    id: number;
};

export const GetSowItemQueryStruct = (): T.Describe<GetSowItemQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetSowItemQuery>);

export type GetFullSowItemQuery = {
    id: number;
};

export const GetFullSowItemQueryStruct = (): T.Describe<GetFullSowItemQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetFullSowItemQuery>);

export type ListProjectMaterialsQuery = {
    constructionType?: ConstructionType;
    sowVersionId?: number;
};

export const ListProjectMaterialsQueryStruct = (): T.Describe<ListProjectMaterialsQuery> => (T.type({
    constructionType: tSpecialOptional(ConstructionTypeStruct()),
    sowVersionId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListProjectMaterialsQuery>);

export type ListSowItemWithItemAmountQuery = {
    sowId?: number;
};

export const ListSowItemWithItemAmountQueryStruct = (): T.Describe<ListSowItemWithItemAmountQuery> => (T.type({
    sowId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemWithItemAmountQuery>);

export type CreateSowItemCommand = {
    englishName?: string;
    arabicName?: string;
    showItemInFrontend?: boolean;
    isMandatory?: boolean;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    category?: SowItemCategory;
    versionId?: number;
    itemUnits?: SowItemUnitDto[];
};

export const CreateSowItemCommandStruct = (): T.Describe<CreateSowItemCommand> => (T.type({
    englishName: tSpecialOptional(T.string()),
    arabicName: tSpecialOptional(T.string()),
    showItemInFrontend: tSpecialOptional(T.boolean()),
    isMandatory: tSpecialOptional(T.boolean()),
    numberOfSpecs: tSpecialOptional(T.number()),
    numberOfWorkflows: tSpecialOptional(T.number()),
    consultantVisits: tSpecialOptional(T.number()),
    iconFileId: tSpecialOptional(T.string()),
    category: tSpecialOptional(SowItemCategoryStruct()),
    versionId: tSpecialOptional(T.number()),
    itemUnits: tSpecialOptional(T.array(SowItemUnitDtoStruct())),
}) as unknown as T.Describe<CreateSowItemCommand>);

export type DeleteSowItemCommand = {
    id: number;
};

export const DeleteSowItemCommandStruct = (): T.Describe<DeleteSowItemCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteSowItemCommand>);

export type PatchSowItemOrderCommand = {
    orderItems?: OrderDto[];
};

export const PatchSowItemOrderCommandStruct = (): T.Describe<PatchSowItemOrderCommand> => (T.type({
    orderItems: tSpecialOptional(T.array(OrderDtoStruct())),
}) as unknown as T.Describe<PatchSowItemOrderCommand>);

export type UpdateSowItemCommand = {
    id: number;
    englishName?: string;
    arabicName?: string;
    showItemInFrontend?: boolean;
    isMandatory?: boolean;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    category?: SowItemCategory;
    versionId?: number;
    itemUnits?: SowItemUnitDto[];
};

export const UpdateSowItemCommandStruct = (): T.Describe<UpdateSowItemCommand> => (T.type({
    id: T.number(),
    englishName: tSpecialOptional(T.string()),
    arabicName: tSpecialOptional(T.string()),
    showItemInFrontend: tSpecialOptional(T.boolean()),
    isMandatory: tSpecialOptional(T.boolean()),
    numberOfSpecs: tSpecialOptional(T.number()),
    numberOfWorkflows: tSpecialOptional(T.number()),
    consultantVisits: tSpecialOptional(T.number()),
    iconFileId: tSpecialOptional(T.string()),
    category: tSpecialOptional(SowItemCategoryStruct()),
    versionId: tSpecialOptional(T.number()),
    itemUnits: tSpecialOptional(T.array(SowItemUnitDtoStruct())),
}) as unknown as T.Describe<UpdateSowItemCommand>);

export type CreateSowItemUnitCommand = {
    englishDescription?: string;
    arabicDescription?: string;
    titleEnglish?: string;
    titleArabic?: string;
    supplier?: string;
    rate?: number;
    acceptanceWorkflow?: number;
    itemId?: number;
    orderNumber?: number;
};

export const CreateSowItemUnitCommandStruct = (): T.Describe<CreateSowItemUnitCommand> => (T.type({
    englishDescription: tSpecialOptional(T.string()),
    arabicDescription: tSpecialOptional(T.string()),
    titleEnglish: tSpecialOptional(T.string()),
    titleArabic: tSpecialOptional(T.string()),
    supplier: tSpecialOptional(T.string()),
    rate: tSpecialOptional(T.number()),
    acceptanceWorkflow: tSpecialOptional(T.number()),
    itemId: tSpecialOptional(T.number()),
    orderNumber: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateSowItemUnitCommand>);

export type GetSowItemUnitByIdsQuery = {
    sowItemUnitIds?: number[];
};

export const GetSowItemUnitByIdsQueryStruct = (): T.Describe<GetSowItemUnitByIdsQuery> => (T.type({
    sowItemUnitIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<GetSowItemUnitByIdsQuery>);

export type ListSowItemUnitQuery = {
    page?: number;
    pageSize?: number;
};

export const ListSowItemUnitQueryStruct = (): T.Describe<ListSowItemUnitQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemUnitQuery>);

export type ListSowItemUnitByItemIdQuery = {
    itemId?: number;
    page?: number;
    pageSize?: number;
};

export const ListSowItemUnitByItemIdQueryStruct = (): T.Describe<ListSowItemUnitByItemIdQuery> => (T.type({
    itemId: tSpecialOptional(T.number()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListSowItemUnitByItemIdQuery>);

export type GetSowItemUnitQuery = {
    id: number;
};

export const GetSowItemUnitQueryStruct = (): T.Describe<GetSowItemUnitQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetSowItemUnitQuery>);

export type DeleteSowItemUnitCommand = {
    id: number;
};

export const DeleteSowItemUnitCommandStruct = (): T.Describe<DeleteSowItemUnitCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteSowItemUnitCommand>);

export type PatchSowItemUnitOrderCommand = {
    orderItems?: OrderDto[];
};

export const PatchSowItemUnitOrderCommandStruct = (): T.Describe<PatchSowItemUnitOrderCommand> => (T.type({
    orderItems: tSpecialOptional(T.array(OrderDtoStruct())),
}) as unknown as T.Describe<PatchSowItemUnitOrderCommand>);

export type UpdateSowItemUnitCommand = {
    id: number;
    englishDescription?: string;
    arabicDescription?: string;
    titleEnglish?: string;
    titleArabic?: string;
    supplier?: string;
    rate?: number;
    acceptanceWorkflow?: number;
    itemId?: number;
    orderNumber?: number;
};

export const UpdateSowItemUnitCommandStruct = (): T.Describe<UpdateSowItemUnitCommand> => (T.type({
    id: T.number(),
    englishDescription: tSpecialOptional(T.string()),
    arabicDescription: tSpecialOptional(T.string()),
    titleEnglish: tSpecialOptional(T.string()),
    titleArabic: tSpecialOptional(T.string()),
    supplier: tSpecialOptional(T.string()),
    rate: tSpecialOptional(T.number()),
    acceptanceWorkflow: tSpecialOptional(T.number()),
    itemId: tSpecialOptional(T.number()),
    orderNumber: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateSowItemUnitCommand>);

export type ListSowVersionQuery = {
    page?: number;
    pageSize?: number;
    sort?: SowVersionSort;
};

export const ListSowVersionQueryStruct = (): T.Describe<ListSowVersionQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    sort: tSpecialOptional(SowVersionSortStruct()),
}) as unknown as T.Describe<ListSowVersionQuery>);

export type GetSowVersionQuery = {
    id: number;
};

export const GetSowVersionQueryStruct = (): T.Describe<GetSowVersionQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetSowVersionQuery>);

export type GetWholeSowVersionQuery = {
    id: number;
};

export const GetWholeSowVersionQueryStruct = (): T.Describe<GetWholeSowVersionQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetWholeSowVersionQuery>);

export type GetMasterSowVersionQuery = undefined;

export const GetMasterSowVersionQueryStruct = () => T.literal(undefined);

export type GetMasterSowVersionIdQuery = undefined;

export const GetMasterSowVersionIdQueryStruct = () => T.literal(undefined);

export type CreateSowVersionCommand = {
    contractName: string;
};

export const CreateSowVersionCommandStruct = (): T.Describe<CreateSowVersionCommand> => (T.type({
    contractName: T.string(),
}) as unknown as T.Describe<CreateSowVersionCommand>);

export type CreateDraftSowVersionCommand = undefined;

export const CreateDraftSowVersionCommandStruct = () => T.literal(undefined);

export type DeleteSowVersionCommand = {
    id: number;
};

export const DeleteSowVersionCommandStruct = (): T.Describe<DeleteSowVersionCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteSowVersionCommand>);

export type UpdateSowVersionCommand = {
    id: number;
    contractName: string;
};

export const UpdateSowVersionCommandStruct = (): T.Describe<UpdateSowVersionCommand> => (T.type({
    id: T.number(),
    contractName: T.string(),
}) as unknown as T.Describe<UpdateSowVersionCommand>);

export type UpdateToMasterSowVersionCommand = {
    id: number;
};

export const UpdateToMasterSowVersionCommandStruct = (): T.Describe<UpdateToMasterSowVersionCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateToMasterSowVersionCommand>);

export type ListStagePlanQuery = {
    page?: number;
    pageSize?: number;
};

export const ListStagePlanQueryStruct = (): T.Describe<ListStagePlanQuery> => (T.type({
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListStagePlanQuery>);

export type GetStagePlanByProjectIdQuery = {
    projectId: number;
};

export const GetStagePlanByProjectIdQueryStruct = (): T.Describe<GetStagePlanByProjectIdQuery> => (T.type({
    projectId: T.number(),
}) as unknown as T.Describe<GetStagePlanByProjectIdQuery>);

export type GetStagePlanQuery = {
    id: number;
};

export const GetStagePlanQueryStruct = (): T.Describe<GetStagePlanQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetStagePlanQuery>);

export type GetWholeStagePlanByIdQuery = {
    id: number;
};

export const GetWholeStagePlanByIdQueryStruct = (): T.Describe<GetWholeStagePlanByIdQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetWholeStagePlanByIdQuery>);

export type CreateStagePlanCommand = {
    stageTemplateId?: number;
    projectId?: number;
};

export const CreateStagePlanCommandStruct = (): T.Describe<CreateStagePlanCommand> => (T.type({
    stageTemplateId: tSpecialOptional(T.number()),
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateStagePlanCommand>);

export type DeleteStagePlanCommand = {
    id: number;
};

export const DeleteStagePlanCommandStruct = (): T.Describe<DeleteStagePlanCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteStagePlanCommand>);

export type UpdateStagePlanCommand = {
    projectId?: number;
    id: number;
    planParts?: StagePlanPartDto[];
    templateName: string;
    stageLevels?: number;
    projectScope?: number;
    numberOfInspections?: number;
    projectScopeTwo?: number;
    projectInUse?: number;
    basement?: number;
    additionalFloors?: number;
    outerBlocks?: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
    sowVersionId: number;
};

export const UpdateStagePlanCommandStruct = (): T.Describe<UpdateStagePlanCommand> => (T.type({
    projectId: tSpecialOptional(T.number()),
    id: T.number(),
    planParts: tSpecialOptional(T.array(StagePlanPartDtoStruct())),
    templateName: T.string(),
    stageLevels: tSpecialOptional(T.number()),
    projectScope: tSpecialOptional(T.number()),
    numberOfInspections: tSpecialOptional(T.number()),
    projectScopeTwo: tSpecialOptional(T.number()),
    projectInUse: tSpecialOptional(T.number()),
    basement: tSpecialOptional(T.number()),
    additionalFloors: tSpecialOptional(T.number()),
    outerBlocks: tSpecialOptional(T.number()),
    groundFloor: tSpecialOptional(T.boolean()),
    levellingFloor: tSpecialOptional(T.boolean()),
    penthouseFloor: tSpecialOptional(T.boolean()),
    pool: tSpecialOptional(T.boolean()),
    sowVersionId: T.number(),
}) as unknown as T.Describe<UpdateStagePlanCommand>);

export type ListStageTemplateQuery = {
    sortRules?: StageTemplateSort;
    stageFilter?: StageFilter;
    page?: number;
    pageSize?: number;
};

export const ListStageTemplateQueryStruct = (): T.Describe<ListStageTemplateQuery> => (T.type({
    sortRules: tSpecialOptional(StageTemplateSortStruct()),
    stageFilter: tSpecialOptional(StageFilterStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListStageTemplateQuery>);

export type GetStageTemplateQuery = {
    id: number;
};

export const GetStageTemplateQueryStruct = (): T.Describe<GetStageTemplateQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetStageTemplateQuery>);

export type GetStageTemplateByFloorSetupQuery = {
    basement: number;
    additionalFloors: number;
    outerBlocks: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
};

export const GetStageTemplateByFloorSetupQueryStruct = (): T.Describe<GetStageTemplateByFloorSetupQuery> => (T.type({
    basement: T.number(),
    additionalFloors: T.number(),
    outerBlocks: T.number(),
    groundFloor: tSpecialOptional(T.boolean()),
    levellingFloor: tSpecialOptional(T.boolean()),
    penthouseFloor: tSpecialOptional(T.boolean()),
    pool: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GetStageTemplateByFloorSetupQuery>);

export type ListStageTemplateBySetupQuery = {
    stageFilter?: StageFilter;
    page?: number;
    pageSize?: number;
};

export const ListStageTemplateBySetupQueryStruct = (): T.Describe<ListStageTemplateBySetupQuery> => (T.type({
    stageFilter: tSpecialOptional(StageFilterStruct()),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListStageTemplateBySetupQuery>);

export type GetStageTemplateNameQuery = {
    stageTemplateName: string;
};

export const GetStageTemplateNameQueryStruct = (): T.Describe<GetStageTemplateNameQuery> => (T.type({
    stageTemplateName: T.string(),
}) as unknown as T.Describe<GetStageTemplateNameQuery>);

export type CreateStageTemplateCommand = {
    templateParts?: StageTemplatePartDto[];
    templateName: string;
    stageLevels?: number;
    projectScope?: number;
    numberOfInspections?: number;
    projectScopeTwo?: number;
    projectInUse?: number;
    basement?: number;
    additionalFloors?: number;
    outerBlocks?: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
    sowVersionId: number;
};

export const CreateStageTemplateCommandStruct = (): T.Describe<CreateStageTemplateCommand> => (T.type({
    templateParts: tSpecialOptional(T.array(StageTemplatePartDtoStruct())),
    templateName: T.string(),
    stageLevels: tSpecialOptional(T.number()),
    projectScope: tSpecialOptional(T.number()),
    numberOfInspections: tSpecialOptional(T.number()),
    projectScopeTwo: tSpecialOptional(T.number()),
    projectInUse: tSpecialOptional(T.number()),
    basement: tSpecialOptional(T.number()),
    additionalFloors: tSpecialOptional(T.number()),
    outerBlocks: tSpecialOptional(T.number()),
    groundFloor: tSpecialOptional(T.boolean()),
    levellingFloor: tSpecialOptional(T.boolean()),
    penthouseFloor: tSpecialOptional(T.boolean()),
    pool: tSpecialOptional(T.boolean()),
    sowVersionId: T.number(),
}) as unknown as T.Describe<CreateStageTemplateCommand>);

export type CreateDraftStageTemplateCommand = {
    id: number;
};

export const CreateDraftStageTemplateCommandStruct = (): T.Describe<CreateDraftStageTemplateCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<CreateDraftStageTemplateCommand>);

export type DeleteStageTemplateCommand = {
    id: number;
};

export const DeleteStageTemplateCommandStruct = (): T.Describe<DeleteStageTemplateCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteStageTemplateCommand>);

export type UpdateStageTemplateCommand = {
    id: number;
    changeStatusToLive?: boolean;
    templateParts?: StageTemplatePartDto[];
    templateName: string;
    stageLevels?: number;
    projectScope?: number;
    numberOfInspections?: number;
    projectScopeTwo?: number;
    projectInUse?: number;
    basement?: number;
    additionalFloors?: number;
    outerBlocks?: number;
    groundFloor?: boolean;
    levellingFloor?: boolean;
    penthouseFloor?: boolean;
    pool?: boolean;
    sowVersionId: number;
};

export const UpdateStageTemplateCommandStruct = (): T.Describe<UpdateStageTemplateCommand> => (T.type({
    id: T.number(),
    changeStatusToLive: tSpecialOptional(T.boolean()),
    templateParts: tSpecialOptional(T.array(StageTemplatePartDtoStruct())),
    templateName: T.string(),
    stageLevels: tSpecialOptional(T.number()),
    projectScope: tSpecialOptional(T.number()),
    numberOfInspections: tSpecialOptional(T.number()),
    projectScopeTwo: tSpecialOptional(T.number()),
    projectInUse: tSpecialOptional(T.number()),
    basement: tSpecialOptional(T.number()),
    additionalFloors: tSpecialOptional(T.number()),
    outerBlocks: tSpecialOptional(T.number()),
    groundFloor: tSpecialOptional(T.boolean()),
    levellingFloor: tSpecialOptional(T.boolean()),
    penthouseFloor: tSpecialOptional(T.boolean()),
    pool: tSpecialOptional(T.boolean()),
    sowVersionId: T.number(),
}) as unknown as T.Describe<UpdateStageTemplateCommand>);

export type UpdateStageTemplateToInactiveCommand = {
    id: number;
};

export const UpdateStageTemplateToInactiveCommandStruct = (): T.Describe<UpdateStageTemplateToInactiveCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateStageTemplateToInactiveCommand>);

export type ListStageTemplatePartByIdQuery = {
    templateId?: number;
};

export const ListStageTemplatePartByIdQueryStruct = (): T.Describe<ListStageTemplatePartByIdQuery> => (T.type({
    templateId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListStageTemplatePartByIdQuery>);

export type GetStageTemplatePartQuery = {
    id: number;
};

export const GetStageTemplatePartQueryStruct = (): T.Describe<GetStageTemplatePartQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetStageTemplatePartQuery>);

export type CreateStageTemplatePartCommand = {
    templateId?: number;
    templateUnits?: StageTemplateUnitDto[];
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
};

export const CreateStageTemplatePartCommandStruct = (): T.Describe<CreateStageTemplatePartCommand> => (T.type({
    templateId: tSpecialOptional(T.number()),
    templateUnits: tSpecialOptional(T.array(StageTemplateUnitDtoStruct())),
    planStage: tSpecialOptional(StageTemplatePlanStageStruct()),
    limitPercentage: tSpecialOptional(T.number()),
}) as unknown as T.Describe<CreateStageTemplatePartCommand>);

export type DeleteStageTemplatePartCommand = {
    id: number;
};

export const DeleteStageTemplatePartCommandStruct = (): T.Describe<DeleteStageTemplatePartCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteStageTemplatePartCommand>);

export type UpdateStageTemplatePartCommand = {
    id: number;
    templateId?: number;
    templateUnits?: StageTemplateUnitDto[];
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
};

export const UpdateStageTemplatePartCommandStruct = (): T.Describe<UpdateStageTemplatePartCommand> => (T.type({
    id: T.number(),
    templateId: tSpecialOptional(T.number()),
    templateUnits: tSpecialOptional(T.array(StageTemplateUnitDtoStruct())),
    planStage: tSpecialOptional(StageTemplatePlanStageStruct()),
    limitPercentage: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateStageTemplatePartCommand>);

export type GetStageTemplateUnitQuery = {
    id: number;
};

export const GetStageTemplateUnitQueryStruct = (): T.Describe<GetStageTemplateUnitQuery> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<GetStageTemplateUnitQuery>);

export type CreateStageTemplateUnitCommand = {
    templatePartId?: number;
    orderNumber?: number;
    stageName?: string;
    suggestedPercentage?: number;
    suggestedTime?: number;
    description?: string;
    stageNameArabic?: string;
    descriptionArabic?: string;
    sowItems?: number[];
};

export const CreateStageTemplateUnitCommandStruct = (): T.Describe<CreateStageTemplateUnitCommand> => (T.type({
    templatePartId: tSpecialOptional(T.number()),
    orderNumber: tSpecialOptional(T.number()),
    stageName: tSpecialOptional(T.string()),
    suggestedPercentage: tSpecialOptional(T.number()),
    suggestedTime: tSpecialOptional(T.number()),
    description: tSpecialOptional(T.string()),
    stageNameArabic: tSpecialOptional(T.string()),
    descriptionArabic: tSpecialOptional(T.string()),
    sowItems: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<CreateStageTemplateUnitCommand>);

export type DeleteStageTemplateUnitCommand = {
    id: number;
};

export const DeleteStageTemplateUnitCommandStruct = (): T.Describe<DeleteStageTemplateUnitCommand> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<DeleteStageTemplateUnitCommand>);

export type UpdateStageTemplateUnitCommand = {
    id: number;
    templatePartId?: number;
    orderNumber?: number;
    stageName?: string;
    suggestedPercentage?: number;
    suggestedTime?: number;
    description?: string;
    stageNameArabic?: string;
    descriptionArabic?: string;
    sowItems?: number[];
};

export const UpdateStageTemplateUnitCommandStruct = (): T.Describe<UpdateStageTemplateUnitCommand> => (T.type({
    id: T.number(),
    templatePartId: tSpecialOptional(T.number()),
    orderNumber: tSpecialOptional(T.number()),
    stageName: tSpecialOptional(T.string()),
    suggestedPercentage: tSpecialOptional(T.number()),
    suggestedTime: tSpecialOptional(T.number()),
    description: tSpecialOptional(T.string()),
    stageNameArabic: tSpecialOptional(T.string()),
    descriptionArabic: tSpecialOptional(T.string()),
    sowItems: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<UpdateStageTemplateUnitCommand>);

export type GetUserManagementStatisticsQuery = {
    profileIds?: number[];
};

export const GetUserManagementStatisticsQueryStruct = (): T.Describe<GetUserManagementStatisticsQuery> => (T.type({
    profileIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<GetUserManagementStatisticsQuery>);

export type ListUserManagementProjectsInfoQuery = {
    profileId?: number;
    consultantIds?: number[];
    contractorIds?: number[];
    page?: number;
    pageSize?: number;
};

export const ListUserManagementProjectsInfoQueryStruct = (): T.Describe<ListUserManagementProjectsInfoQuery> => (T.type({
    profileId: tSpecialOptional(T.number()),
    consultantIds: tSpecialOptional(T.array(T.number())),
    contractorIds: tSpecialOptional(T.array(T.number())),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListUserManagementProjectsInfoQuery>);

export type WorkflowTaskActionUpdateCommand = {
    sowSubItemHashCollection?: TaskActionUpdateDto[];
};

export const WorkflowTaskActionUpdateCommandStruct = (): T.Describe<WorkflowTaskActionUpdateCommand> => (T.type({
    sowSubItemHashCollection: tSpecialOptional(T.array(TaskActionUpdateDtoStruct())),
}) as unknown as T.Describe<WorkflowTaskActionUpdateCommand>);

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

export enum ConstructionProjectStatus {
    none = 0,
    draft = 1,
    reviewing = 2,
    rejected = 3,
    openBids = 4,
    chooseContractor = 5,
    bidSelected = 6,
    readyToSign = 7,
    signed = 8,
    liveInPm = 9,
    archived = 10,
}

export const ConstructionProjectStatusStruct = () => T.enums([
    ConstructionProjectStatus.none,
    ConstructionProjectStatus.draft,
    ConstructionProjectStatus.reviewing,
    ConstructionProjectStatus.rejected,
    ConstructionProjectStatus.openBids,
    ConstructionProjectStatus.chooseContractor,
    ConstructionProjectStatus.bidSelected,
    ConstructionProjectStatus.readyToSign,
    ConstructionProjectStatus.signed,
    ConstructionProjectStatus.liveInPm,
    ConstructionProjectStatus.archived,
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

export enum AdminProjectView {
    none = 0,
    construction = 1,
    design = 2,
}

export const AdminProjectViewStruct = () => T.enums([
    AdminProjectView.none,
    AdminProjectView.construction,
    AdminProjectView.design,
]);

export enum ContractorViewType {
    none = 0,
    newProjects = 1,
    myProjects = 2,
    invitedNewProjects = 3,
}

export const ContractorViewTypeStruct = () => T.enums([
    ContractorViewType.none,
    ContractorViewType.newProjects,
    ContractorViewType.myProjects,
    ContractorViewType.invitedNewProjects,
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

export enum ConsultantStatusView {
    none = 0,
    waitingForClient = 1,
    uploadDrawings = 2,
    signContract = 3,
    activeContract = 4,
    closed = 5,
}

export const ConsultantStatusViewStruct = () => T.enums([
    ConsultantStatusView.none,
    ConsultantStatusView.waitingForClient,
    ConsultantStatusView.uploadDrawings,
    ConsultantStatusView.signContract,
    ConsultantStatusView.activeContract,
    ConsultantStatusView.closed,
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

export enum BidClosingDateOption {
    none = 0,
    addWeek = 1,
    endBiddingTime = 2,
}

export const BidClosingDateOptionStruct = () => T.enums([
    BidClosingDateOption.none,
    BidClosingDateOption.addWeek,
    BidClosingDateOption.endBiddingTime,
]);

export enum DesignProjectTrigger {
    none = 0,
    adminReview = 1,
    consultantReview = 2,
    payment = 3,
    uploadDrawings = 4,
    submitDrawings = 5,
    reject = 6,
    accept = 7,
}

export const DesignProjectTriggerStruct = () => T.enums([
    DesignProjectTrigger.none,
    DesignProjectTrigger.adminReview,
    DesignProjectTrigger.consultantReview,
    DesignProjectTrigger.payment,
    DesignProjectTrigger.uploadDrawings,
    DesignProjectTrigger.submitDrawings,
    DesignProjectTrigger.reject,
    DesignProjectTrigger.accept,
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

export enum DictionaryName {
    none = 0,
    governorate = 1,
    wilayat = 2,
}

export const DictionaryNameStruct = () => T.enums([
    DictionaryName.none,
    DictionaryName.governorate,
    DictionaryName.wilayat,
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

export enum UpdateQuestionAction {
    none = 0,
    question = 1,
    answer = 2,
    questionAndAnswer = 3,
}

export const UpdateQuestionActionStruct = () => T.enums([
    UpdateQuestionAction.none,
    UpdateQuestionAction.question,
    UpdateQuestionAction.answer,
    UpdateQuestionAction.questionAndAnswer,
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

export enum ActionType {
    none = 0,
    empty = 1,
    datePicker = 2,
    checklist = 3,
    payment = 4,
}

export const ActionTypeStruct = () => T.enums([
    ActionType.none,
    ActionType.empty,
    ActionType.datePicker,
    ActionType.checklist,
    ActionType.payment,
]);

export enum InvitationStatus {
    none = 0,
    active = 1,
    declined = 2,
    approved = 3,
}

export const InvitationStatusStruct = () => T.enums([
    InvitationStatus.none,
    InvitationStatus.active,
    InvitationStatus.declined,
    InvitationStatus.approved,
]);

export enum InvitationType {
    none = 0,
    design = 1,
    supervision = 2,
    bid = 3,
}

export const InvitationTypeStruct = () => T.enums([
    InvitationType.none,
    InvitationType.design,
    InvitationType.supervision,
    InvitationType.bid,
]);

export enum BidStatus {
    none = 0,
    draft = 1,
    continue = 2,
    submitted = 3,
    archived = 4,
    expired = 5,
}

export const BidStatusStruct = () => T.enums([
    BidStatus.none,
    BidStatus.draft,
    BidStatus.continue,
    BidStatus.submitted,
    BidStatus.archived,
    BidStatus.expired,
]);

export enum NewProjectType {
    default = 0,
    consultantInvited = 1,
    designSelected = 2,
    contractorInvited = 3,
    continueBidding = 4,
}

export const NewProjectTypeStruct = () => T.enums([
    NewProjectType.default,
    NewProjectType.consultantInvited,
    NewProjectType.designSelected,
    NewProjectType.contractorInvited,
    NewProjectType.continueBidding,
]);

export enum SowItemVisibility {
    none = 0,
    masterItem = 1,
    hidden = 2,
}

export const SowItemVisibilityStruct = () => T.enums([
    SowItemVisibility.none,
    SowItemVisibility.masterItem,
    SowItemVisibility.hidden,
]);

export enum SowItemChangeStatus {
    none = 0,
    unchanged = 1,
    changed = 2,
    removed = 3,
}

export const SowItemChangeStatusStruct = () => T.enums([
    SowItemChangeStatus.none,
    SowItemChangeStatus.unchanged,
    SowItemChangeStatus.changed,
    SowItemChangeStatus.removed,
]);

export enum SowAndStageStatus {
    none = 0,
    drafted = 1,
    live = 2,
    inactive = 3,
}

export const SowAndStageStatusStruct = () => T.enums([
    SowAndStageStatus.none,
    SowAndStageStatus.drafted,
    SowAndStageStatus.live,
    SowAndStageStatus.inactive,
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

export const execGetCompanyManagementStatisticsQuery = restClient.encloseQuery<GetCompanyManagementStatisticsQuery, GetCompanyManagementStatisticsResponse>(
  props => T.create(props, GetCompanyManagementStatisticsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getcompanymanagementstatisticsquery',
    props,
  );
 },
 result => T.create(result, GetCompanyManagementStatisticsResponseStruct()),
);

export const execGetCompanyManagementProjectsCountQuery = restClient.encloseQuery<GetCompanyManagementProjectsCountQuery, GetCompanyManagementProjectsCountResponse>(
  props => T.create(props, GetCompanyManagementProjectsCountQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getcompanymanagementprojectscountquery',
    props,
  );
 },
 result => T.create(result, GetCompanyManagementProjectsCountResponseStruct()),
);

export const execListCompanyManagementProjectsInfoQuery = restClient.encloseQuery<ListCompanyManagementProjectsInfoQuery, ListCompanyManagementProjectsInfoResponse>(
  props => T.create(props, ListCompanyManagementProjectsInfoQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listcompanymanagementprojectsinfoquery',
    props,
  );
 },
 result => T.create(result, ListCompanyManagementProjectsInfoResponseStruct()),
);

export const execGetCompanyAwardedSortQuery = restClient.encloseQuery<GetCompanyAwardedSortQuery, GetCompanyAwardedSortResponse>(
  props => T.create(props, GetCompanyAwardedSortQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getcompanyawardedsortquery',
    props,
  );
 },
 result => T.create(result, GetCompanyAwardedSortResponseStruct()),
);

export const execListConstructionProjectQuery = restClient.encloseQuery<ListConstructionProjectQuery, ListConstructionProjectResponse>(
  props => T.create(props, ListConstructionProjectQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/listconstructionprojectquery',
    props,
  );
 },
 result => T.create(result, ListConstructionProjectResponseStruct()),
);

export const execListConstructionProjectForConsultantContextQuery = restClient.encloseQuery<ListConstructionProjectForConsultantContextQuery, ListConstructionProjectForConsultantContextResponse>(
  props => T.create(props, ListConstructionProjectForConsultantContextQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/listconstructionprojectforconsultantcontextquery',
    props,
  );
 },
 result => T.create(result, ListConstructionProjectForConsultantContextResponseStruct()),
);

export const execGetConstructionProjectForConsultantContextQuery = restClient.encloseQuery<GetConstructionProjectForConsultantContextQuery, GetConstructionProjectForConsultantContextResponse>(
  props => T.create(props, GetConstructionProjectForConsultantContextQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectforconsultantcontextquery',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectForConsultantContextResponseStruct()),
);

export const execGetConstructionProjectForConsultantQuery = restClient.encloseQuery<GetConstructionProjectForConsultantQuery, GetConstructionProjectForConsultantResponse>(
  props => T.create(props, GetConstructionProjectForConsultantQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectforconsultantquery',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectForConsultantResponseStruct()),
);

export const execGetConstructionProjectWithConsultantInvitedQuery = restClient.encloseQuery<GetConstructionProjectWithConsultantInvitedQuery, GetConstructionProjectWithConsultantInvitedResponse>(
  props => T.create(props, GetConstructionProjectWithConsultantInvitedQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectwithconsultantinvitedquery',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectWithConsultantInvitedResponseStruct()),
);

export const execGetConstructionProjectWithInvitationByProjectIdQuery = restClient.encloseQuery<GetConstructionProjectWithInvitationByProjectIdQuery, GetConstructionProjectWithInvitationByProjectIdResponse>(
  props => T.create(props, GetConstructionProjectWithInvitationByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectwithinvitationbyprojectidquery',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectWithInvitationByProjectIdResponseStruct()),
);

export const execListConstructionProjectWithInvitationByProjectIdQuery = restClient.encloseQuery<ListConstructionProjectWithInvitationByProjectIdQuery, ListConstructionProjectWithInvitationByProjectIdResponse>(
  props => T.create(props, ListConstructionProjectWithInvitationByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/listconstructionprojectwithinvitationbyprojectidquery',
    props,
  );
 },
 result => T.create(result, ListConstructionProjectWithInvitationByProjectIdResponseStruct()),
);

export const execListConstructionProjectByStatusQuery = restClient.encloseQuery<ListConstructionProjectByStatusQuery, ListConstructionProjectByStatusResponse>(
  props => T.create(props, ListConstructionProjectByStatusQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/listconstructionprojectbystatusquery/{status}',
    props,
  );
 },
 result => T.create(result, ListConstructionProjectByStatusResponseStruct()),
);

export const execListConstructionProjectWithBidQuery = restClient.encloseQuery<ListConstructionProjectWithBidQuery, ListConstructionProjectWithBidResponse>(
  props => T.create(props, ListConstructionProjectWithBidQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/listconstructionprojectwithbidquery',
    props,
  );
 },
 result => T.create(result, ListConstructionProjectWithBidResponseStruct()),
);

export const execListConstructionProjectByStatusAndContractorQuery = restClient.encloseQuery<ListConstructionProjectByStatusAndContractorQuery, ListConstructionProjectByStatusAndContractorResponse>(
  props => T.create(props, ListConstructionProjectByStatusAndContractorQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/listconstructionprojectbystatusandcontractorquery',
    props,
  );
 },
 result => T.create(result, ListConstructionProjectByStatusAndContractorResponseStruct()),
);

export const execListConstructionProjectByStatusAndConsultantQuery = restClient.encloseQuery<ListConstructionProjectByStatusAndConsultantQuery, ListConstructionProjectByStatusAndConsultantResponse>(
  props => T.create(props, ListConstructionProjectByStatusAndConsultantQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/listconstructionprojectbystatusandconsultantquery',
    props,
  );
 },
 result => T.create(result, ListConstructionProjectByStatusAndConsultantResponseStruct()),
);

export const execListNewConstructionProjectsQuery = restClient.encloseQuery<ListNewConstructionProjectsQuery, ListNewConstructionProjectsResponse>(
  props => T.create(props, ListNewConstructionProjectsQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/listnewconstructionprojectsquery',
    props,
  );
 },
 result => T.create(result, ListNewConstructionProjectsResponseStruct()),
);

export const execGetConstructionProjectQuery = restClient.encloseQuery<GetConstructionProjectQuery, GetConstructionProjectResponse>(
  props => T.create(props, GetConstructionProjectQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectquery/{id}',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectResponseStruct()),
);

export const execGetConstructionProjectWithBidQuery = restClient.encloseQuery<GetConstructionProjectWithBidQuery, GetConstructionProjectWithBidResponse>(
  props => T.create(props, GetConstructionProjectWithBidQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectwithbidquery/{id}',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectWithBidResponseStruct()),
);

export const execGetEbinaaProjectStatisticsQuery = restClient.encloseQuery<GetEbinaaProjectStatisticsQuery, GetEbinaaProjectStatisticsResponse>(
  props => T.create(props, GetEbinaaProjectStatisticsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getebinaaprojectstatisticsquery',
    props,
  );
 },
 result => T.create(result, GetEbinaaProjectStatisticsResponseStruct()),
);

export const execGetConstructionProjectStatisticsQuery = restClient.encloseQuery<GetConstructionProjectStatisticsQuery, GetConstructionProjectStatisticsResponse>(
  props => T.create(props, GetConstructionProjectStatisticsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectstatisticsquery',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectStatisticsResponseStruct()),
);

export const execGetConstructionProjectStatisticsByContractorQuery = restClient.encloseQuery<GetConstructionProjectStatisticsByContractorQuery, GetConstructionProjectStatisticsByContractorResponse>(
  props => T.create(props, GetConstructionProjectStatisticsByContractorQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectstatisticsbycontractorquery',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectStatisticsByContractorResponseStruct()),
);

export const execGetConstructionProjectStatisticsByConsultantQuery = restClient.encloseQuery<GetConstructionProjectStatisticsByConsultantQuery, GetConstructionProjectStatisticsByConsultantResponse>(
  props => T.create(props, GetConstructionProjectStatisticsByConsultantQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectstatisticsbyconsultantquery',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectStatisticsByConsultantResponseStruct()),
);

export const execCreateConstructionProjectCommand = restClient.encloseQuery<CreateConstructionProjectCommand, CreateConstructionProjectResponse>(
  props => T.create(props, CreateConstructionProjectCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createconstructionprojectcommand',
    props,
  );
 },
 result => T.create(result, CreateConstructionProjectResponseStruct()),
);

export const execDeleteConstructionProjectCommand = restClient.encloseQuery<DeleteConstructionProjectCommand, DeleteConstructionProjectResponse>(
  props => T.create(props, DeleteConstructionProjectCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deleteconstructionprojectcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteConstructionProjectResponseStruct()),
);

export const execPatchConstructionProjectCommand = restClient.encloseQuery<PatchConstructionProjectCommand, PatchConstructionProjectResponse>(
  props => T.create(props, PatchConstructionProjectCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/construction/patchconstructionprojectcommand/{id}',
    props,
  );
 },
 result => T.create(result, PatchConstructionProjectResponseStruct()),
);

export const execUpdateConstructionProjectCommand = restClient.encloseQuery<UpdateConstructionProjectCommand, UpdateConstructionProjectResponse>(
  props => T.create(props, UpdateConstructionProjectCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectResponseStruct()),
);

export const execUpdateConstructionProjectStatusToRejectedCommand = restClient.encloseQuery<UpdateConstructionProjectStatusToRejectedCommand, UpdateConstructionProjectStatusToRejectedResponse>(
  props => T.create(props, UpdateConstructionProjectStatusToRejectedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectstatustorejectedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectStatusToRejectedResponseStruct()),
);

export const execUpdateConstructionProjectStatusToBidSelectedCommand = restClient.encloseQuery<UpdateConstructionProjectStatusToBidSelectedCommand, UpdateConstructionProjectStatusToBidSelectedResponse>(
  props => T.create(props, UpdateConstructionProjectStatusToBidSelectedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectstatustobidselectedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectStatusToBidSelectedResponseStruct()),
);

export const execUpdateConstructionProjectStatusToReadyToSignCommand = restClient.encloseQuery<UpdateConstructionProjectStatusToReadyToSignCommand, UpdateConstructionProjectStatusToReadyToSignResponse>(
  props => T.create(props, UpdateConstructionProjectStatusToReadyToSignCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectstatustoreadytosigncommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectStatusToReadyToSignResponseStruct()),
);

export const execUpdateConstructionProjectStatusToSignedCommand = restClient.encloseQuery<UpdateConstructionProjectStatusToSignedCommand, UpdateConstructionProjectStatusToSignedResponse>(
  props => T.create(props, UpdateConstructionProjectStatusToSignedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectstatustosignedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectStatusToSignedResponseStruct()),
);

export const execUpdateConstructionProjectStatusToLiveInPmCommand = restClient.encloseQuery<UpdateConstructionProjectStatusToLiveInPmCommand, UpdateConstructionProjectStatusToLiveInPmResponse>(
  props => T.create(props, UpdateConstructionProjectStatusToLiveInPmCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectstatustoliveinpmcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectStatusToLiveInPmResponseStruct()),
);

export const execUpdateConstructionProjectStatusToArchivedCommand = restClient.encloseQuery<UpdateConstructionProjectStatusToArchivedCommand, UpdateConstructionProjectStatusToArchivedResponse>(
  props => T.create(props, UpdateConstructionProjectStatusToArchivedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectstatustoarchivedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectStatusToArchivedResponseStruct()),
);

export const execUpdateUnArchiveProjectCommand = restClient.encloseQuery<UpdateUnArchiveProjectCommand, UpdateUnArchiveProjectResponse>(
  props => T.create(props, UpdateUnArchiveProjectCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateunarchiveprojectcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateUnArchiveProjectResponseStruct()),
);

export const execChangeProjectConsultantCommand = restClient.encloseQuery<ChangeProjectConsultantCommand, ChangeProjectConsultantResponse>(
  props => T.create(props, ChangeProjectConsultantCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/changeprojectconsultantcommand',
    props,
  );
 },
 result => T.create(result, ChangeProjectConsultantResponseStruct()),
);

export const execUpdateConstructionProjectContractIdCommand = restClient.encloseQuery<UpdateConstructionProjectContractIdCommand, UpdateConstructionProjectContractIdResponse>(
  props => T.create(props, UpdateConstructionProjectContractIdCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectcontractidcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectContractIdResponseStruct()),
);

export const execGetProjectNameQuery = restClient.encloseQuery<GetProjectNameQuery, GetProjectNameResponse>(
  props => T.create(props, GetProjectNameQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getprojectnamequery',
    props,
  );
 },
 result => T.create(result, GetProjectNameResponseStruct()),
);

export const execUpdateConstructionProjectBidClosingDateCommand = restClient.encloseQuery<UpdateConstructionProjectBidClosingDateCommand, UpdateConstructionProjectBidClosingDateResponse>(
  props => T.create(props, UpdateConstructionProjectBidClosingDateCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectbidclosingdatecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectBidClosingDateResponseStruct()),
);

export const execUploadConstructionProjectDrawingsCommand = restClient.encloseQuery<UploadConstructionProjectDrawingsCommand, BaseConstructionProjectOperationResult>(
  props => T.create(props, UploadConstructionProjectDrawingsCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/uploadconstructionprojectdrawingscommand',
    props,
  );
 },
 result => T.create(result, BaseConstructionProjectOperationResultStruct()),
);

export const execUpdateDesignProjectStatusCommand = restClient.encloseQuery<UpdateDesignProjectStatusCommand, UpdateDesignProjectStatusResponse>(
  props => T.create(props, UpdateDesignProjectStatusCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/updatedesignprojectstatuscommand',
    props,
  );
 },
 result => T.create(result, UpdateDesignProjectStatusResponseStruct()),
);

export const execCreateConstructionProjectReviewCommand = restClient.encloseQuery<CreateConstructionProjectReviewCommand, CreateConstructionProjectReviewResponse>(
  props => T.create(props, CreateConstructionProjectReviewCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createconstructionprojectreviewcommand',
    props,
  );
 },
 result => T.create(result, CreateConstructionProjectReviewResponseStruct()),
);

export const execGetConstructionProjectReviewsQuery = restClient.encloseQuery<GetConstructionProjectReviewsQuery, GetConstructionProjectReviewsResponse>(
  props => T.create(props, GetConstructionProjectReviewsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconstructionprojectreviewsquery',
    props,
  );
 },
 result => T.create(result, GetConstructionProjectReviewsResponseStruct()),
);

export const execCreateConstructionProjectInvitationCommand = restClient.encloseQuery<CreateConstructionProjectInvitationCommand, CreateConstructionProjectInvitationResponse>(
  props => T.create(props, CreateConstructionProjectInvitationCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createconstructionprojectinvitationcommand',
    props,
  );
 },
 result => T.create(result, CreateConstructionProjectInvitationResponseStruct()),
);

export const execCreateMyOwnInvitationCommand = restClient.encloseQuery<CreateMyOwnInvitationCommand, CreateMyOwnInvitationResponse>(
  props => T.create(props, CreateMyOwnInvitationCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createmyowninvitationcommand',
    props,
  );
 },
 result => T.create(result, CreateMyOwnInvitationResponseStruct()),
);

export const execUpdateMyOwnCompanyInvitationCommand = restClient.encloseQuery<UpdateMyOwnCompanyInvitationCommand, UpdateMyOwnCompanyInvitationResponse>(
  props => T.create(props, UpdateMyOwnCompanyInvitationCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatemyowncompanyinvitationcommand',
    props,
  );
 },
 result => T.create(result, UpdateMyOwnCompanyInvitationResponseStruct()),
);

export const execUpdateConstructionProjectInvitationStatusToApprovedCommand = restClient.encloseQuery<UpdateConstructionProjectInvitationStatusToApprovedCommand, UpdateConstructionProjectInvitationStatusToApprovedResponse>(
  props => T.create(props, UpdateConstructionProjectInvitationStatusToApprovedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectinvitationstatustoapprovedcommand',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectInvitationStatusToApprovedResponseStruct()),
);

export const execUpdateConstructionProjectInvitationStatusToDeclinedCommand = restClient.encloseQuery<UpdateConstructionProjectInvitationStatusToDeclinedCommand, UpdateConstructionProjectInvitationStatusToDeclinedResponse>(
  props => T.create(props, UpdateConstructionProjectInvitationStatusToDeclinedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateconstructionprojectinvitationstatustodeclinedcommand',
    props,
  );
 },
 result => T.create(result, UpdateConstructionProjectInvitationStatusToDeclinedResponseStruct()),
);

export const execListInvitationByProjectIdQuery = restClient.encloseQuery<ListInvitationByProjectIdQuery, ListInvitationByProjectIdResponse>(
  props => T.create(props, ListInvitationByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listinvitationbyprojectidquery',
    props,
  );
 },
 result => T.create(result, ListInvitationByProjectIdResponseStruct()),
);

export const execListContractorInvitationByProjectIdQuery = restClient.encloseQuery<ListContractorInvitationByProjectIdQuery, ListContractorInvitationByProjectIdResponse>(
  props => T.create(props, ListContractorInvitationByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listcontractorinvitationbyprojectidquery',
    props,
  );
 },
 result => T.create(result, ListContractorInvitationByProjectIdResponseStruct()),
);

export const execDeleteConsultantInvitationCommand = restClient.encloseQuery<DeleteConsultantInvitationCommand, DeleteConsultantInvitationResponse>(
  props => T.create(props, DeleteConsultantInvitationCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deleteconsultantinvitationcommand',
    props,
  );
 },
 result => T.create(result, DeleteConsultantInvitationResponseStruct()),
);

export const execListDictionaryDataQuery = restClient.encloseQuery<ListDictionaryDataQuery, ListDictionaryDataResponse>(
  props => T.create(props, ListDictionaryDataQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listdictionarydataquery',
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
    '/construction/listonedictionaryquery/{dictionary}',
    props,
  );
 },
 result => T.create(result, ListOneDictionaryResponseStruct()),
);

export const execListProjectBidQuery = restClient.encloseQuery<ListProjectBidQuery, ListProjectBidResponse>(
  props => T.create(props, ListProjectBidQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listprojectbidquery',
    props,
  );
 },
 result => T.create(result, ListProjectBidResponseStruct()),
);

export const execListProjectBidByIdQuery = restClient.encloseQuery<ListProjectBidByIdQuery, ListProjectBidByIdResponse>(
  props => T.create(props, ListProjectBidByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listprojectbidbyidquery/{projectid}',
    props,
  );
 },
 result => T.create(result, ListProjectBidByIdResponseStruct()),
);

export const execGetProjectBidQuery = restClient.encloseQuery<GetProjectBidQuery, GetProjectBidResponse>(
  props => T.create(props, GetProjectBidQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getprojectbidquery/{id}',
    props,
  );
 },
 result => T.create(result, GetProjectBidResponseStruct()),
);

export const execGetWinnerProjectBidQuery = restClient.encloseQuery<GetWinnerProjectBidQuery, GetProjectBidResponse>(
  props => T.create(props, GetWinnerProjectBidQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getwinnerprojectbidquery',
    props,
  );
 },
 result => T.create(result, GetProjectBidResponseStruct()),
);

export const execCreateProjectBidCommand = restClient.encloseQuery<CreateProjectBidCommand, CreateProjectBidResponse>(
  props => T.create(props, CreateProjectBidCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createprojectbidcommand',
    props,
  );
 },
 result => T.create(result, CreateProjectBidResponseStruct()),
);

export const execDeleteProjectBidCommand = restClient.encloseQuery<DeleteProjectBidCommand, DeleteProjectBidResponse>(
  props => T.create(props, DeleteProjectBidCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deleteprojectbidcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteProjectBidResponseStruct()),
);

export const execUpdateProjectBidCommand = restClient.encloseQuery<UpdateProjectBidCommand, UpdateProjectBidResponse>(
  props => T.create(props, UpdateProjectBidCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateprojectbidcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateProjectBidResponseStruct()),
);

export const execUpdateProjectBidStatusToArchivedCommand = restClient.encloseQuery<UpdateProjectBidStatusToArchivedCommand, UpdateProjectBidStatusToArchivedResponse>(
  props => T.create(props, UpdateProjectBidStatusToArchivedCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateprojectbidstatustoarchivedcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateProjectBidStatusToArchivedResponseStruct()),
);

export const execGetConsultantTemplateTimeQuery = restClient.encloseQuery<GetConsultantTemplateTimeQuery, GetConsultantTemplateTimeResponse>(
  props => T.create(props, GetConsultantTemplateTimeQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getconsultanttemplatetimequery',
    props,
  );
 },
 result => T.create(result, GetConsultantTemplateTimeResponseStruct()),
);

export const execCreateProjectQuestionCommand = restClient.encloseQuery<CreateProjectQuestionCommand, CreateProjectQuestionResponse>(
  props => T.create(props, CreateProjectQuestionCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createprojectquestioncommand',
    props,
  );
 },
 result => T.create(result, CreateProjectQuestionResponseStruct()),
);

export const execListProjectQuestionByProjectIdQuery = restClient.encloseQuery<ListProjectQuestionByProjectIdQuery, ListProjectQuestionByProjectIdResponse>(
  props => T.create(props, ListProjectQuestionByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listprojectquestionbyprojectidquery/{projectid}',
    props,
  );
 },
 result => T.create(result, ListProjectQuestionByProjectIdResponseStruct()),
);

export const execListProjectQuestionByProjectAndContractorIdQuery = restClient.encloseQuery<ListProjectQuestionByProjectAndContractorIdQuery, ListProjectQuestionByProjectAndContractorIdResponse>(
  props => T.create(props, ListProjectQuestionByProjectAndContractorIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listprojectquestionbyprojectandcontractoridquery/{projectid}/{contractorid}',
    props,
  );
 },
 result => T.create(result, ListProjectQuestionByProjectAndContractorIdResponseStruct()),
);

export const execGetProjectQuestionQuery = restClient.encloseQuery<GetProjectQuestionQuery, GetProjectQuestionResponse>(
  props => T.create(props, GetProjectQuestionQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getprojectquestionquery/{id}',
    props,
  );
 },
 result => T.create(result, GetProjectQuestionResponseStruct()),
);

export const execDeleteProjectQuestionCommand = restClient.encloseQuery<DeleteProjectQuestionCommand, DeleteProjectQuestionResponse>(
  props => T.create(props, DeleteProjectQuestionCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deleteprojectquestioncommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteProjectQuestionResponseStruct()),
);

export const execUpdateProjectQuestionCommand = restClient.encloseQuery<UpdateProjectQuestionCommand, UpdateProjectQuestionResponse>(
  props => T.create(props, UpdateProjectQuestionCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updateprojectquestioncommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateProjectQuestionResponseStruct()),
);

export const execListSowItemQuery = restClient.encloseQuery<ListSowItemQuery, ListSowItemResponse>(
  props => T.create(props, ListSowItemQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listsowitemquery',
    props,
  );
 },
 result => T.create(result, ListSowItemResponseStruct()),
);

export const execListSowItemsByIdsQuery = restClient.encloseQuery<ListSowItemsByIdsQuery, ListSowItemResponse>(
  props => T.create(props, ListSowItemsByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listsowitemsbyidsquery/{ids}',
    props,
  );
 },
 result => T.create(result, ListSowItemResponseStruct()),
);

export const execListSowItemByIdQuery = restClient.encloseQuery<ListSowItemByIdQuery, ListSowItemByIdResponse>(
  props => T.create(props, ListSowItemByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listsowitembyidquery',
    props,
  );
 },
 result => T.create(result, ListSowItemByIdResponseStruct()),
);

export const execGetSowItemQuery = restClient.encloseQuery<GetSowItemQuery, GetSowItemResponse>(
  props => T.create(props, GetSowItemQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getsowitemquery/{id}',
    props,
  );
 },
 result => T.create(result, GetSowItemResponseStruct()),
);

export const execGetFullSowItemQuery = restClient.encloseQuery<GetFullSowItemQuery, GetFullSowItemResponse>(
  props => T.create(props, GetFullSowItemQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getfullsowitemquery/{id}',
    props,
  );
 },
 result => T.create(result, GetFullSowItemResponseStruct()),
);

export const execListProjectMaterialsQuery = restClient.encloseQuery<ListProjectMaterialsQuery, ListProjectMaterialsResponse>(
  props => T.create(props, ListProjectMaterialsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listprojectmaterialsquery',
    props,
  );
 },
 result => T.create(result, ListProjectMaterialsResponseStruct()),
);

export const execListSowItemWithItemAmountQuery = restClient.encloseQuery<ListSowItemWithItemAmountQuery, ListSowItemWithItemAmountResponse>(
  props => T.create(props, ListSowItemWithItemAmountQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listsowitemwithitemamountquery',
    props,
  );
 },
 result => T.create(result, ListSowItemWithItemAmountResponseStruct()),
);

export const execCreateSowItemCommand = restClient.encloseQuery<CreateSowItemCommand, CreateSowItemResponse>(
  props => T.create(props, CreateSowItemCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createsowitemcommand',
    props,
  );
 },
 result => T.create(result, CreateSowItemResponseStruct()),
);

export const execDeleteSowItemCommand = restClient.encloseQuery<DeleteSowItemCommand, DeleteSowItemResponse>(
  props => T.create(props, DeleteSowItemCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deletesowitemcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteSowItemResponseStruct()),
);

export const execPatchSowItemOrderCommand = restClient.encloseQuery<PatchSowItemOrderCommand, PatchSowItemOrderResponse>(
  props => T.create(props, PatchSowItemOrderCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/construction/patchsowitemordercommand',
    props,
  );
 },
 result => T.create(result, PatchSowItemOrderResponseStruct()),
);

export const execUpdateSowItemCommand = restClient.encloseQuery<UpdateSowItemCommand, UpdateSowItemResponse>(
  props => T.create(props, UpdateSowItemCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatesowitemcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateSowItemResponseStruct()),
);

export const execCreateSowItemUnitCommand = restClient.encloseQuery<CreateSowItemUnitCommand, CreateSowItemUnitResponse>(
  props => T.create(props, CreateSowItemUnitCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createsowitemunitcommand',
    props,
  );
 },
 result => T.create(result, CreateSowItemUnitResponseStruct()),
);

export const execGetSowItemUnitByIdsQuery = restClient.encloseQuery<GetSowItemUnitByIdsQuery, GetSowItemUnitByIdsResponse>(
  props => T.create(props, GetSowItemUnitByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getsowitemunitbyidsquery',
    props,
  );
 },
 result => T.create(result, GetSowItemUnitByIdsResponseStruct()),
);

export const execListSowItemUnitQuery = restClient.encloseQuery<ListSowItemUnitQuery, ListSowItemUnitResponse>(
  props => T.create(props, ListSowItemUnitQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listsowitemunitquery',
    props,
  );
 },
 result => T.create(result, ListSowItemUnitResponseStruct()),
);

export const execListSowItemUnitByItemIdQuery = restClient.encloseQuery<ListSowItemUnitByItemIdQuery, ListSowItemUnitByItemIdResponse>(
  props => T.create(props, ListSowItemUnitByItemIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listsowitemunitbyitemidquery/{itemid}',
    props,
  );
 },
 result => T.create(result, ListSowItemUnitByItemIdResponseStruct()),
);

export const execGetSowItemUnitQuery = restClient.encloseQuery<GetSowItemUnitQuery, GetSowItemUnitResponse>(
  props => T.create(props, GetSowItemUnitQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getsowitemunitquery/{id}',
    props,
  );
 },
 result => T.create(result, GetSowItemUnitResponseStruct()),
);

export const execDeleteSowItemUnitCommand = restClient.encloseQuery<DeleteSowItemUnitCommand, DeleteSowItemUnitResponse>(
  props => T.create(props, DeleteSowItemUnitCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deletesowitemunitcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteSowItemUnitResponseStruct()),
);

export const execPatchSowItemUnitOrderCommand = restClient.encloseQuery<PatchSowItemUnitOrderCommand, PatchSowItemUnitOrderResponse>(
  props => T.create(props, PatchSowItemUnitOrderCommandStruct()),
  async props => {
  return await restClient.execute(
    'patch',
    '/construction/patchsowitemunitordercommand',
    props,
  );
 },
 result => T.create(result, PatchSowItemUnitOrderResponseStruct()),
);

export const execUpdateSowItemUnitCommand = restClient.encloseQuery<UpdateSowItemUnitCommand, UpdateSowItemUnitResponse>(
  props => T.create(props, UpdateSowItemUnitCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatesowitemunitcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateSowItemUnitResponseStruct()),
);

export const execListSowVersionQuery = restClient.encloseQuery<ListSowVersionQuery, ListSowVersionResponse>(
  props => T.create(props, ListSowVersionQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/listsowversionquery',
    props,
  );
 },
 result => T.create(result, ListSowVersionResponseStruct()),
);

export const execGetSowVersionQuery = restClient.encloseQuery<GetSowVersionQuery, GetSowVersionResponse>(
  props => T.create(props, GetSowVersionQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getsowversionquery/{id}',
    props,
  );
 },
 result => T.create(result, GetSowVersionResponseStruct()),
);

export const execGetWholeSowVersionQuery = restClient.encloseQuery<GetWholeSowVersionQuery, GetWholeSowVersionResponse>(
  props => T.create(props, GetWholeSowVersionQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getwholesowversionquery/{id}',
    props,
  );
 },
 result => T.create(result, GetWholeSowVersionResponseStruct()),
);

export const execGetMasterSowVersionQuery = restClient.encloseQuery<GetMasterSowVersionQuery, GetMasterSowVersionResponse>(
  props => T.create(props, GetMasterSowVersionQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getmastersowversionquery',
    props,
  );
 },
 result => T.create(result, GetMasterSowVersionResponseStruct()),
);

export const execGetMasterSowVersionIdQuery = restClient.encloseQuery<GetMasterSowVersionIdQuery, GetMasterSowVersionIdResponse>(
  props => T.create(props, GetMasterSowVersionIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getmastersowversionidquery',
    props,
  );
 },
 result => T.create(result, GetMasterSowVersionIdResponseStruct()),
);

export const execCreateSowVersionCommand = restClient.encloseQuery<CreateSowVersionCommand, CreateSowVersionResponse>(
  props => T.create(props, CreateSowVersionCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createsowversioncommand',
    props,
  );
 },
 result => T.create(result, CreateSowVersionResponseStruct()),
);

export const execCreateDraftSowVersionCommand = restClient.encloseQuery<CreateDraftSowVersionCommand, CreateDraftSowVersionResponse>(
  props => T.create(props, CreateDraftSowVersionCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createdraftsowversioncommand',
    props,
  );
 },
 result => T.create(result, CreateDraftSowVersionResponseStruct()),
);

export const execDeleteSowVersionCommand = restClient.encloseQuery<DeleteSowVersionCommand, DeleteSowVersionResponse>(
  props => T.create(props, DeleteSowVersionCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deletesowversioncommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteSowVersionResponseStruct()),
);

export const execUpdateSowVersionCommand = restClient.encloseQuery<UpdateSowVersionCommand, UpdateSowVersionResponse>(
  props => T.create(props, UpdateSowVersionCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatesowversioncommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateSowVersionResponseStruct()),
);

export const execUpdateToMasterSowVersionCommand = restClient.encloseQuery<UpdateToMasterSowVersionCommand, UpdateToMasterSowVersionResponse>(
  props => T.create(props, UpdateToMasterSowVersionCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatetomastersowversioncommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateToMasterSowVersionResponseStruct()),
);

export const execListStagePlanQuery = restClient.encloseQuery<ListStagePlanQuery, ListStagePlanResponse>(
  props => T.create(props, ListStagePlanQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/liststageplanquery',
    props,
  );
 },
 result => T.create(result, ListStagePlanResponseStruct()),
);

export const execGetStagePlanByProjectIdQuery = restClient.encloseQuery<GetStagePlanByProjectIdQuery, GetStagePlanByProjectIdResponse>(
  props => T.create(props, GetStagePlanByProjectIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getstageplanbyprojectidquery/{projectid}',
    props,
  );
 },
 result => T.create(result, GetStagePlanByProjectIdResponseStruct()),
);

export const execGetStagePlanQuery = restClient.encloseQuery<GetStagePlanQuery, GetStagePlanResponse>(
  props => T.create(props, GetStagePlanQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getstageplanquery/{id}',
    props,
  );
 },
 result => T.create(result, GetStagePlanResponseStruct()),
);

export const execGetWholeStagePlanByIdQuery = restClient.encloseQuery<GetWholeStagePlanByIdQuery, GetWholeStagePlanByIdResponse>(
  props => T.create(props, GetWholeStagePlanByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getwholestageplanbyidquery/{id}',
    props,
  );
 },
 result => T.create(result, GetWholeStagePlanByIdResponseStruct()),
);

export const execCreateStagePlanCommand = restClient.encloseQuery<CreateStagePlanCommand, CreateStagePlanResponse>(
  props => T.create(props, CreateStagePlanCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createstageplancommand',
    props,
  );
 },
 result => T.create(result, CreateStagePlanResponseStruct()),
);

export const execDeleteStagePlanCommand = restClient.encloseQuery<DeleteStagePlanCommand, DeleteStagePlanResponse>(
  props => T.create(props, DeleteStagePlanCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deletestageplancommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteStagePlanResponseStruct()),
);

export const execUpdateStagePlanCommand = restClient.encloseQuery<UpdateStagePlanCommand, UpdateStagePlanResponse>(
  props => T.create(props, UpdateStagePlanCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatestageplancommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateStagePlanResponseStruct()),
);

export const execListStageTemplateQuery = restClient.encloseQuery<ListStageTemplateQuery, ListStageTemplateResponse>(
  props => T.create(props, ListStageTemplateQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/liststagetemplatequery',
    props,
  );
 },
 result => T.create(result, ListStageTemplateResponseStruct()),
);

export const execGetStageTemplateQuery = restClient.encloseQuery<GetStageTemplateQuery, GetStageTemplateResponse>(
  props => T.create(props, GetStageTemplateQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getstagetemplatequery/{id}',
    props,
  );
 },
 result => T.create(result, GetStageTemplateResponseStruct()),
);

export const execGetStageTemplateByFloorSetupQuery = restClient.encloseQuery<GetStageTemplateByFloorSetupQuery, GetStageTemplateByFloorSetupResponse>(
  props => T.create(props, GetStageTemplateByFloorSetupQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getstagetemplatebyfloorsetupquery',
    props,
  );
 },
 result => T.create(result, GetStageTemplateByFloorSetupResponseStruct()),
);

export const execListStageTemplateBySetupQuery = restClient.encloseQuery<ListStageTemplateBySetupQuery, ListStageTemplateResponse>(
  props => T.create(props, ListStageTemplateBySetupQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/liststagetemplatebysetupquery',
    props,
  );
 },
 result => T.create(result, ListStageTemplateResponseStruct()),
);

export const execGetStageTemplateNameQuery = restClient.encloseQuery<GetStageTemplateNameQuery, GetStageTemplateNameResponse>(
  props => T.create(props, GetStageTemplateNameQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getstagetemplatenamequery',
    props,
  );
 },
 result => T.create(result, GetStageTemplateNameResponseStruct()),
);

export const execCreateStageTemplateCommand = restClient.encloseQuery<CreateStageTemplateCommand, CreateStageTemplateResponse>(
  props => T.create(props, CreateStageTemplateCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createstagetemplatecommand',
    props,
  );
 },
 result => T.create(result, CreateStageTemplateResponseStruct()),
);

export const execCreateDraftStageTemplateCommand = restClient.encloseQuery<CreateDraftStageTemplateCommand, CreateDraftStageTemplateResponse>(
  props => T.create(props, CreateDraftStageTemplateCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createdraftstagetemplatecommand/{id}',
    props,
  );
 },
 result => T.create(result, CreateDraftStageTemplateResponseStruct()),
);

export const execDeleteStageTemplateCommand = restClient.encloseQuery<DeleteStageTemplateCommand, DeleteStageTemplateResponse>(
  props => T.create(props, DeleteStageTemplateCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deletestagetemplatecommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteStageTemplateResponseStruct()),
);

export const execUpdateStageTemplateCommand = restClient.encloseQuery<UpdateStageTemplateCommand, UpdateStageTemplateResponse>(
  props => T.create(props, UpdateStageTemplateCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatestagetemplatecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateStageTemplateResponseStruct()),
);

export const execUpdateStageTemplateToInactiveCommand = restClient.encloseQuery<UpdateStageTemplateToInactiveCommand, UpdateStageTemplateToInactiveResponse>(
  props => T.create(props, UpdateStageTemplateToInactiveCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatestagetemplatetoinactivecommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateStageTemplateToInactiveResponseStruct()),
);

export const execListStageTemplatePartByIdQuery = restClient.encloseQuery<ListStageTemplatePartByIdQuery, ListStageTemplatePartByIdResponse>(
  props => T.create(props, ListStageTemplatePartByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/liststagetemplatepartbyidquery/{templateid}',
    props,
  );
 },
 result => T.create(result, ListStageTemplatePartByIdResponseStruct()),
);

export const execGetStageTemplatePartQuery = restClient.encloseQuery<GetStageTemplatePartQuery, GetStageTemplatePartResponse>(
  props => T.create(props, GetStageTemplatePartQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getstagetemplatepartquery/{id}',
    props,
  );
 },
 result => T.create(result, GetStageTemplatePartResponseStruct()),
);

export const execCreateStageTemplatePartCommand = restClient.encloseQuery<CreateStageTemplatePartCommand, CreateStageTemplatePartResponse>(
  props => T.create(props, CreateStageTemplatePartCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createstagetemplatepartcommand',
    props,
  );
 },
 result => T.create(result, CreateStageTemplatePartResponseStruct()),
);

export const execDeleteStageTemplatePartCommand = restClient.encloseQuery<DeleteStageTemplatePartCommand, DeleteStageTemplatePartResponse>(
  props => T.create(props, DeleteStageTemplatePartCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deletestagetemplatepartcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteStageTemplatePartResponseStruct()),
);

export const execUpdateStageTemplatePartCommand = restClient.encloseQuery<UpdateStageTemplatePartCommand, UpdateStageTemplatePartResponse>(
  props => T.create(props, UpdateStageTemplatePartCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatestagetemplatepartcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateStageTemplatePartResponseStruct()),
);

export const execGetStageTemplateUnitQuery = restClient.encloseQuery<GetStageTemplateUnitQuery, GetStageTemplateUnitResponse>(
  props => T.create(props, GetStageTemplateUnitQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getstagetemplateunitquery/{id}',
    props,
  );
 },
 result => T.create(result, GetStageTemplateUnitResponseStruct()),
);

export const execCreateStageTemplateUnitCommand = restClient.encloseQuery<CreateStageTemplateUnitCommand, CreateStageTemplateUnitResponse>(
  props => T.create(props, CreateStageTemplateUnitCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/construction/createstagetemplateunitcommand',
    props,
  );
 },
 result => T.create(result, CreateStageTemplateUnitResponseStruct()),
);

export const execDeleteStageTemplateUnitCommand = restClient.encloseQuery<DeleteStageTemplateUnitCommand, DeleteStageTemplateUnitResponse>(
  props => T.create(props, DeleteStageTemplateUnitCommandStruct()),
  async props => {
  return await restClient.execute(
    'delete',
    '/construction/deletestagetemplateunitcommand/{id}',
    props,
  );
 },
 result => T.create(result, DeleteStageTemplateUnitResponseStruct()),
);

export const execUpdateStageTemplateUnitCommand = restClient.encloseQuery<UpdateStageTemplateUnitCommand, UpdateStageTemplateUnitResponse>(
  props => T.create(props, UpdateStageTemplateUnitCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/updatestagetemplateunitcommand/{id}',
    props,
  );
 },
 result => T.create(result, UpdateStageTemplateUnitResponseStruct()),
);

export const execGetUserManagementStatisticsQuery = restClient.encloseQuery<GetUserManagementStatisticsQuery, GetUserManagementStatisticsResponse>(
  props => T.create(props, GetUserManagementStatisticsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/getusermanagementstatisticsquery',
    props,
  );
 },
 result => T.create(result, GetUserManagementStatisticsResponseStruct()),
);

export const execListUserManagementProjectsInfoQuery = restClient.encloseQuery<ListUserManagementProjectsInfoQuery, ListUserManagementProjectsInfoResponse>(
  props => T.create(props, ListUserManagementProjectsInfoQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/construction/listusermanagementprojectsinfoquery',
    props,
  );
 },
 result => T.create(result, ListUserManagementProjectsInfoResponseStruct()),
);

export const execWorkflowTaskActionUpdateCommand = restClient.encloseQuery<WorkflowTaskActionUpdateCommand, WorkflowTaskActionUpdateResponse>(
  props => T.create(props, WorkflowTaskActionUpdateCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/construction/workflowtaskactionupdatecommand',
    props,
  );
 },
 result => T.create(result, WorkflowTaskActionUpdateResponseStruct()),
);
