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

export type WorkflowWithActionRequest = {
    workflowId?: number;
    sowSubItemId?: number;
};

export const WorkflowWithActionRequestStruct = (): T.Describe<WorkflowWithActionRequest> => (T.type({
    workflowId: tSpecialOptional(T.number()),
    sowSubItemId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<WorkflowWithActionRequest>);

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
    workflowTaskDtos: WorkflowTaskDto[];
};

export const SowSubItemActionModelStruct = (): T.Describe<SowSubItemActionModel> => (T.type({
    sowSubItemId: tSpecialOptional(T.number()),
    workflowTaskDtos: T.array(WorkflowTaskDtoStruct()),
}) as unknown as T.Describe<SowSubItemActionModel>);

export type TaskActionModel = {
    workflowId?: number;
    sowSubItemActions: SowSubItemActionModel[];
};

export const TaskActionModelStruct = (): T.Describe<TaskActionModel> => (T.type({
    workflowId: tSpecialOptional(T.number()),
    sowSubItemActions: T.array(SowSubItemActionModelStruct()),
}) as unknown as T.Describe<TaskActionModel>);

export type WorkflowManifest = {
    userType: UserTypeModel[];
    workflowType: WorkflowTypeModel[];
    acceptanceTaskDefinition: AcceptanceTaskDefinitionModel[];
    workflow: WorkflowModel[];
    workflowSequence: WorkflowSequenceModel[];
};

export const WorkflowManifestStruct = (): T.Describe<WorkflowManifest> => (T.type({
    userType: T.array(UserTypeModelStruct()),
    workflowType: T.array(WorkflowTypeModelStruct()),
    acceptanceTaskDefinition: T.array(AcceptanceTaskDefinitionModelStruct()),
    workflow: T.array(WorkflowModelStruct()),
    workflowSequence: T.array(WorkflowSequenceModelStruct()),
}) as unknown as T.Describe<WorkflowManifest>);

export type SowSubItemUpdateModel = {
    originalSubItemId?: number;
    newSubItemId?: number;
};

export const SowSubItemUpdateModelStruct = (): T.Describe<SowSubItemUpdateModel> => (T.type({
    originalSubItemId: tSpecialOptional(T.number()),
    newSubItemId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<SowSubItemUpdateModel>);

export type StageTemplateUnitDto = {
    id: number;
    templatePartId?: number;
    orderNumber?: number;
    stageName: string;
    suggestedPercentage?: number;
    description: string;
    stageNameArabic: string;
    descriptionArabic: string;
    sowItems: number[];
};

export const StageTemplateUnitDtoStruct = (): T.Describe<StageTemplateUnitDto> => (T.type({
    id: T.number(),
    templatePartId: tSpecialOptional(T.number()),
    orderNumber: tSpecialOptional(T.number()),
    stageName: T.string(),
    suggestedPercentage: tSpecialOptional(T.number()),
    description: T.string(),
    stageNameArabic: T.string(),
    descriptionArabic: T.string(),
    sowItems: T.array(T.number()),
}) as unknown as T.Describe<StageTemplateUnitDto>);

export type StageTemplatePartDto = {
    id: number;
    templateId?: number;
    templateUnits: StageTemplateUnitDto[];
    planStage?: StageTemplatePlanStage;
    limitPercentage?: number;
};

export const StageTemplatePartDtoStruct = (): T.Describe<StageTemplatePartDto> => (T.type({
    id: T.number(),
    templateId: tSpecialOptional(T.number()),
    templateUnits: T.array(StageTemplateUnitDtoStruct()),
    planStage: tSpecialOptional(StageTemplatePlanStageStruct()),
    limitPercentage: tSpecialOptional(T.number()),
}) as unknown as T.Describe<StageTemplatePartDto>);

export type OptionDto = {
    supplier: string;
    rates?: number;
    rateType?: RateType;
    totalValue?: number;
    description: string;
    attachmentIds: string[];
};

export const OptionDtoStruct = (): T.Describe<OptionDto> => (T.type({
    supplier: T.string(),
    rates: tSpecialOptional(T.number()),
    rateType: tSpecialOptional(RateTypeStruct()),
    totalValue: tSpecialOptional(T.number()),
    description: T.string(),
    attachmentIds: T.array(T.string()),
}) as unknown as T.Describe<OptionDto>);

export type QuantityDto = {
    itemName: string;
    quantity?: number;
    rateType?: RateType;
    description: string;
    attachmentIds: string[];
};

export const QuantityDtoStruct = (): T.Describe<QuantityDto> => (T.type({
    itemName: T.string(),
    quantity: tSpecialOptional(T.number()),
    rateType: tSpecialOptional(RateTypeStruct()),
    description: T.string(),
    attachmentIds: T.array(T.string()),
}) as unknown as T.Describe<QuantityDto>);

export type GetProjectUpdatesFilter = {
    fromDate?: string;
    toDate?: string;
    stageIds?: number[];
    actorType?: ActorType;
};

export const GetProjectUpdatesFilterStruct = (): T.Describe<GetProjectUpdatesFilter> => (T.type({
    fromDate: tSpecialOptional(T.string()),
    toDate: tSpecialOptional(T.string()),
    stageIds: tSpecialOptional(T.array(T.number())),
    actorType: tSpecialOptional(ActorTypeStruct()),
}) as unknown as T.Describe<GetProjectUpdatesFilter>);

export type ActorDto = {
    profileId: number;
    name: string;
    avatarId?: string;
    email: string;
    phone: string;
};

export const ActorDtoStruct = (): T.Describe<ActorDto> => (T.type({
    profileId: T.number(),
    name: T.string(),
    avatarId: tSpecialOptional(T.string()),
    email: T.string(),
    phone: T.string(),
}) as unknown as T.Describe<ActorDto>);

export type CommentDto = {
    id: number;
    actorId?: number;
    actor: ActorDto;
    resourceId?: number;
    description: string;
    attachmentsIds: string[];
    createdDate?: string;
};

export const CommentDtoStruct = (): T.Describe<CommentDto> => (T.type({
    id: T.number(),
    actorId: tSpecialOptional(T.number()),
    actor: ActorDtoStruct(),
    resourceId: tSpecialOptional(T.number()),
    description: T.string(),
    attachmentsIds: T.array(T.string()),
    createdDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<CommentDto>);

export type CreateTaskUpdateDto = {
    type?: TaskUpdateType;
    description: string;
    attachmentsIds: string[];
    comments: CommentDto[];
};

export const CreateTaskUpdateDtoStruct = (): T.Describe<CreateTaskUpdateDto> => (T.type({
    type: tSpecialOptional(TaskUpdateTypeStruct()),
    description: T.string(),
    attachmentsIds: T.array(T.string()),
    comments: T.array(CommentDtoStruct()),
}) as unknown as T.Describe<CreateTaskUpdateDto>);

export type PenaltyAppliedDto = {
    penaltyPercentage?: number;
    penaltySubtotal?: number;
    taxSubtotal?: number;
    grandTotal?: number;
    isRefunded?: boolean;
    refundSubtotal?: number;
    refundPercentage?: number;
};

export const PenaltyAppliedDtoStruct = (): T.Describe<PenaltyAppliedDto> => (T.type({
    penaltyPercentage: tSpecialOptional(T.number()),
    penaltySubtotal: tSpecialOptional(T.number()),
    taxSubtotal: tSpecialOptional(T.number()),
    grandTotal: tSpecialOptional(T.number()),
    isRefunded: tSpecialOptional(T.boolean()),
    refundSubtotal: tSpecialOptional(T.number()),
    refundPercentage: tSpecialOptional(T.number()),
}) as unknown as T.Describe<PenaltyAppliedDto>);

export type CreateTaskSubmissionDto = {
    userTaskId: number;
    actionData: string;
    updates: CreateTaskUpdateDto[];
    isConsultantVisit?: boolean;
    penalty?: PenaltyAppliedDto;
};

export const CreateTaskSubmissionDtoStruct = (): T.Describe<CreateTaskSubmissionDto> => (T.type({
    userTaskId: T.number(),
    actionData: T.string(),
    updates: T.array(CreateTaskUpdateDtoStruct()),
    isConsultantVisit: tSpecialOptional(T.boolean()),
    penalty: tSpecialOptional(PenaltyAppliedDtoStruct()),
}) as unknown as T.Describe<CreateTaskSubmissionDto>);

export type TaskUpdateFilter = {
    isUnread?: boolean;
    isFlagged?: boolean;
    submittedBy?: ActorType[];
    acceptanceCriteria?: string[];
    searchText?: string;
    stageIds?: number[];
    materialSequenceIds?: number[];
};

export const TaskUpdateFilterStruct = (): T.Describe<TaskUpdateFilter> => (T.type({
    isUnread: tSpecialOptional(T.boolean()),
    isFlagged: tSpecialOptional(T.boolean()),
    submittedBy: tSpecialOptional(T.array(ActorTypeStruct())),
    acceptanceCriteria: tSpecialOptional(T.array(T.string())),
    searchText: tSpecialOptional(T.string()),
    stageIds: tSpecialOptional(T.array(T.number())),
    materialSequenceIds: tSpecialOptional(T.array(T.number())),
}) as unknown as T.Describe<TaskUpdateFilter>);

export type ObservationDto = {
    stageId?: number;
    itemId?: number;
    updateType?: TaskUpdateType;
    description: string;
    attachments: string[];
};

export const ObservationDtoStruct = (): T.Describe<ObservationDto> => (T.type({
    stageId: tSpecialOptional(T.number()),
    itemId: tSpecialOptional(T.number()),
    updateType: tSpecialOptional(TaskUpdateTypeStruct()),
    description: T.string(),
    attachments: T.array(T.string()),
}) as unknown as T.Describe<ObservationDto>);

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

export type FullWorkflowDto = {
    sowSubItemId?: number;
    id: number;
    nameEn?: string;
    nameAr?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    workflowTasks: WorkflowTaskDto[];
    totalDefaultTaskDuration: string;
};

export const FullWorkflowDtoStruct = (): T.Describe<FullWorkflowDto> => (T.type({
    sowSubItemId: tSpecialOptional(T.number()),
    id: T.number(),
    nameEn: tSpecialOptional(T.string()),
    nameAr: tSpecialOptional(T.string()),
    descriptionEn: tSpecialOptional(T.string()),
    descriptionAr: tSpecialOptional(T.string()),
    workflowTasks: T.array(WorkflowTaskDtoStruct()),
    totalDefaultTaskDuration: T.string(),
}) as unknown as T.Describe<FullWorkflowDto>);

export type NumberOfActorTasksForWorkflowDto = {
    workflowId?: number;
    numberOfTasks?: number;
};

export const NumberOfActorTasksForWorkflowDtoStruct = (): T.Describe<NumberOfActorTasksForWorkflowDto> => (T.type({
    workflowId: tSpecialOptional(T.number()),
    numberOfTasks: tSpecialOptional(T.number()),
}) as unknown as T.Describe<NumberOfActorTasksForWorkflowDto>);

export type TaskActionUpdateDto = {
    sowSubItemId?: number;
    hash: string;
};

export const TaskActionUpdateDtoStruct = (): T.Describe<TaskActionUpdateDto> => (T.type({
    sowSubItemId: tSpecialOptional(T.number()),
    hash: T.string(),
}) as unknown as T.Describe<TaskActionUpdateDto>);

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

export type StageTemplateValidationErrors = {
    lastWorkflowHasMinimumTasks?: boolean;
    firstStageHasAdvancePayment?: boolean;
    lastSowItemHasItemUnits?: boolean;
};

export const StageTemplateValidationErrorsStruct = (): T.Describe<StageTemplateValidationErrors> => (T.type({
    lastWorkflowHasMinimumTasks: tSpecialOptional(T.boolean()),
    firstStageHasAdvancePayment: tSpecialOptional(T.boolean()),
    lastSowItemHasItemUnits: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<StageTemplateValidationErrors>);

export type SiteVisitDto = {
    order?: number;
    siteVisitDescription: string;
    visitDate?: string;
    stageOrder?: number;
    inDelay?: boolean;
    totalDaysInDelay?: number;
};

export const SiteVisitDtoStruct = (): T.Describe<SiteVisitDto> => (T.type({
    order: tSpecialOptional(T.number()),
    siteVisitDescription: T.string(),
    visitDate: tSpecialOptional(T.string()),
    stageOrder: tSpecialOptional(T.number()),
    inDelay: tSpecialOptional(T.boolean()),
    totalDaysInDelay: tSpecialOptional(T.number()),
}) as unknown as T.Describe<SiteVisitDto>);

export type MarketingInformationDto = {
    marketingService?: MarketingService;
    addresUrl: string;
    companyId?: number;
    id: number;
};

export const MarketingInformationDtoStruct = (): T.Describe<MarketingInformationDto> => (T.type({
    marketingService: tSpecialOptional(MarketingServiceStruct()),
    addresUrl: T.string(),
    companyId: tSpecialOptional(T.number()),
    id: T.number(),
}) as unknown as T.Describe<MarketingInformationDto>);

export type CompanyDto = {
    id: number;
    marketings?: MarketingInformationDto[];
    status?: CompanyStatus;
    ownerId: number;
    companyLogoId: string;
    name: string;
    nameInArabic: string;
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
    planningSoftware: PlanningSoftware[];
    otherPlanningSoftware: string;
    additionalInformation: string;
    crCertificate: string[];
    ownerNationalId: string[];
    manpowerReportIssuedByMom: string[];
    companyProfile: string[];
    otherFiles: string[];
    companyType?: CompanyType;
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
};

export const CompanyDtoStruct = (): T.Describe<CompanyDto> => (T.type({
    id: T.number(),
    marketings: tSpecialOptional(T.array(MarketingInformationDtoStruct())),
    status: tSpecialOptional(CompanyStatusStruct()),
    ownerId: T.number(),
    companyLogoId: T.string(),
    name: T.string(),
    nameInArabic: T.string(),
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
    planningSoftware: T.array(PlanningSoftwareStruct()),
    otherPlanningSoftware: T.string(),
    additionalInformation: T.string(),
    crCertificate: T.array(T.string()),
    ownerNationalId: T.array(T.string()),
    manpowerReportIssuedByMom: T.array(T.string()),
    companyProfile: T.array(T.string()),
    otherFiles: T.array(T.string()),
    companyType: tSpecialOptional(CompanyTypeStruct()),
    ownerName: T.string(),
    ownerPhone: T.string(),
    ownerEmail: T.string(),
}) as unknown as T.Describe<CompanyDto>);

export type BankDetailsDto = {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
};

export const BankDetailsDtoStruct = (): T.Describe<BankDetailsDto> => (T.type({
    bankName: T.string(),
    accountHolderName: T.string(),
    accountNumber: T.string(),
}) as unknown as T.Describe<BankDetailsDto>);

export type FullConsultantPaymentDto = {
    id: number;
    generationDate: string;
    forMonth: number;
    forYear: number;
    numberOfVisits: number;
    taxPercentage: number;
    taxValue: number;
    pricePerVisit: number;
    visitsPrice: number;
    grandTotalPrice: number;
    status: TaskStatus;
    dueDate: string;
    isConfirmed: boolean;
    siteVisitsInformation?: SiteVisitDto[];
    fileId: string;
    invoiceId: number;
    actorDto: ActorDto;
    consultantId: number;
    consultant: CompanyDto;
    forConstructionProjectId: number;
    delayInDays?: number;
    bankDetailsDto: BankDetailsDto;
    numberOfPossiblePenalties?: number;
    penaltySubtotal?: number;
};

export const FullConsultantPaymentDtoStruct = (): T.Describe<FullConsultantPaymentDto> => (T.type({
    id: T.number(),
    generationDate: T.string(),
    forMonth: T.number(),
    forYear: T.number(),
    numberOfVisits: T.number(),
    taxPercentage: T.number(),
    taxValue: T.number(),
    pricePerVisit: T.number(),
    visitsPrice: T.number(),
    grandTotalPrice: T.number(),
    status: TaskStatusStruct(),
    dueDate: T.string(),
    isConfirmed: T.boolean(),
    siteVisitsInformation: tSpecialOptional(T.array(SiteVisitDtoStruct())),
    fileId: T.string(),
    invoiceId: T.number(),
    actorDto: ActorDtoStruct(),
    consultantId: T.number(),
    consultant: CompanyDtoStruct(),
    forConstructionProjectId: T.number(),
    delayInDays: tSpecialOptional(T.number()),
    bankDetailsDto: BankDetailsDtoStruct(),
    numberOfPossiblePenalties: tSpecialOptional(T.number()),
    penaltySubtotal: tSpecialOptional(T.number()),
}) as unknown as T.Describe<FullConsultantPaymentDto>);

export type ConsultantPaymentListElementDto = {
    id: number;
    generationDate?: string;
    forMonth?: number;
    forYear?: number;
    numberOfVisits?: number;
    taxPercentage?: number;
    taxValue?: number;
    visitsPrice?: number;
    grandTotalPrice?: number;
    status?: TaskStatus;
    dueDate?: string;
    isConfirmed?: boolean;
};

export const ConsultantPaymentListElementDtoStruct = (): T.Describe<ConsultantPaymentListElementDto> => (T.type({
    id: T.number(),
    generationDate: tSpecialOptional(T.string()),
    forMonth: tSpecialOptional(T.number()),
    forYear: tSpecialOptional(T.number()),
    numberOfVisits: tSpecialOptional(T.number()),
    taxPercentage: tSpecialOptional(T.number()),
    taxValue: tSpecialOptional(T.number()),
    visitsPrice: tSpecialOptional(T.number()),
    grandTotalPrice: tSpecialOptional(T.number()),
    status: tSpecialOptional(TaskStatusStruct()),
    dueDate: tSpecialOptional(T.string()),
    isConfirmed: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ConsultantPaymentListElementDto>);

export type ListConsultantPaymentsResult = {
    consultantPaymentList?: ConsultantPaymentListElementDto[];
};

export const ListConsultantPaymentsResultStruct = (): T.Describe<ListConsultantPaymentsResult> => (T.type({
    consultantPaymentList: tSpecialOptional(T.array(ConsultantPaymentListElementDtoStruct())),
}) as unknown as T.Describe<ListConsultantPaymentsResult>);

export type DraftResourceDto = {
    resourceId?: number;
    resourceValue?: string;
};

export const DraftResourceDtoStruct = (): T.Describe<DraftResourceDto> => (T.type({
    resourceId: tSpecialOptional(T.number()),
    resourceValue: tSpecialOptional(T.string()),
}) as unknown as T.Describe<DraftResourceDto>);

export type MaterialTaskProgressDto = {
    materialUserTaskId?: number;
    status?: TaskStatus;
    isActionable?: boolean;
    isValidUserActor?: boolean;
    canBeSkipped?: boolean;
    canBeRejected?: boolean;
    skipTask?: MaterialTaskProgressDto;
    actorType?: ActorType;
    dueDate?: string;
    completionDate?: string;
    actor?: ActorDto;
    materialUserTaskType?: MaterialUserTaskType;
};

export const MaterialTaskProgressDtoStruct = (): T.Describe<MaterialTaskProgressDto> => (T.type({
    materialUserTaskId: tSpecialOptional(T.number()),
    status: tSpecialOptional(TaskStatusStruct()),
    isActionable: tSpecialOptional(T.boolean()),
    isValidUserActor: tSpecialOptional(T.boolean()),
    canBeSkipped: tSpecialOptional(T.boolean()),
    canBeRejected: tSpecialOptional(T.boolean()),
    skipTask: T.lazy(() => tSpecialOptional(MaterialTaskProgressDtoStruct())),
    actorType: tSpecialOptional(ActorTypeStruct()),
    dueDate: tSpecialOptional(T.string()),
    completionDate: tSpecialOptional(T.string()),
    actor: tSpecialOptional(ActorDtoStruct()),
    materialUserTaskType: tSpecialOptional(MaterialUserTaskTypeStruct()),
}) as unknown as T.Describe<MaterialTaskProgressDto>);

export type TaskUpdateDto = {
    id: number;
    taskId: number;
    actorId: number;
    actorType: ActorType;
    type: TaskUpdateType;
    resourceType: ResourceType;
    description: string;
    attachmentsIds: string[];
    comments: CommentDto[];
    createdDate: string;
    itemName?: string;
    supplier?: string;
    rate?: number;
    rateType?: RateType;
    totalPrice?: number;
    quantity?: number;
    isProofOfPayment?: boolean;
};

export const TaskUpdateDtoStruct = (): T.Describe<TaskUpdateDto> => (T.type({
    id: T.number(),
    taskId: T.number(),
    actorId: T.number(),
    actorType: ActorTypeStruct(),
    type: TaskUpdateTypeStruct(),
    resourceType: ResourceTypeStruct(),
    description: T.string(),
    attachmentsIds: T.array(T.string()),
    comments: T.array(CommentDtoStruct()),
    createdDate: T.string(),
    itemName: tSpecialOptional(T.string()),
    supplier: tSpecialOptional(T.string()),
    rate: tSpecialOptional(T.number()),
    rateType: tSpecialOptional(RateTypeStruct()),
    totalPrice: tSpecialOptional(T.number()),
    quantity: tSpecialOptional(T.number()),
    isProofOfPayment: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<TaskUpdateDto>);

export type SubmissionDto = {
    id: number;
    name: string;
    actionType?: ActionType;
    actionValue?: string;
    actionData?: string;
    status?: SubmitStatus;
    actorType?: ActorType;
    actorId?: number;
    submitterId?: number;
    submitterType?: ActorType;
    createdDate?: string;
    materialSubmissionType?: MaterialSubmissionType;
    taskUpdates: TaskUpdateDto[];
    description?: string;
};

export const SubmissionDtoStruct = (): T.Describe<SubmissionDto> => (T.type({
    id: T.number(),
    name: T.string(),
    actionType: tSpecialOptional(ActionTypeStruct()),
    actionValue: tSpecialOptional(T.string()),
    actionData: tSpecialOptional(T.string()),
    status: tSpecialOptional(SubmitStatusStruct()),
    actorType: tSpecialOptional(ActorTypeStruct()),
    actorId: tSpecialOptional(T.number()),
    submitterId: tSpecialOptional(T.number()),
    submitterType: tSpecialOptional(ActorTypeStruct()),
    createdDate: tSpecialOptional(T.string()),
    materialSubmissionType: tSpecialOptional(MaterialSubmissionTypeStruct()),
    taskUpdates: T.array(TaskUpdateDtoStruct()),
    description: tSpecialOptional(T.string()),
}) as unknown as T.Describe<SubmissionDto>);

export type SowItemUnitDto = {
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

export const SowItemUnitDtoStruct = (): T.Describe<SowItemUnitDto> => (T.type({
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
}) as unknown as T.Describe<SowItemUnitDto>);

export type SowItemDto = {
    orderNumber?: number;
    id: number;
    englishName: string;
    arabicName: string;
    showItemInFrontend?: boolean;
    isMandatory?: boolean;
    numberOfSpecs?: number;
    numberOfWorkflows?: number;
    consultantVisits?: number;
    iconFileId?: string;
    category?: SowItemCategory;
    versionId?: number;
    itemUnits: SowItemUnitDto[];
    itemVisibility?: SowItemVisibility;
};

export const SowItemDtoStruct = (): T.Describe<SowItemDto> => (T.type({
    orderNumber: tSpecialOptional(T.number()),
    id: T.number(),
    englishName: T.string(),
    arabicName: T.string(),
    showItemInFrontend: tSpecialOptional(T.boolean()),
    isMandatory: tSpecialOptional(T.boolean()),
    numberOfSpecs: tSpecialOptional(T.number()),
    numberOfWorkflows: tSpecialOptional(T.number()),
    consultantVisits: tSpecialOptional(T.number()),
    iconFileId: tSpecialOptional(T.string()),
    category: tSpecialOptional(SowItemCategoryStruct()),
    versionId: tSpecialOptional(T.number()),
    itemUnits: T.array(SowItemUnitDtoStruct()),
    itemVisibility: tSpecialOptional(SowItemVisibilityStruct()),
}) as unknown as T.Describe<SowItemDto>);

export type MaterialDelay = {
    clientDelay?: number;
    contractorDelay?: number;
};

export const MaterialDelayStruct = (): T.Describe<MaterialDelay> => (T.type({
    clientDelay: tSpecialOptional(T.number()),
    contractorDelay: tSpecialOptional(T.number()),
}) as unknown as T.Describe<MaterialDelay>);

export type MaterialProgressDto = {
    materialWorkflowSequenceId: number;
    currentTask: MaterialTaskProgressDto;
    submissions: SubmissionDto[];
    sowItem?: SowItemDto;
    stageOrder?: number;
    materialWorkflowType: MaterialWorkflowType;
    isPrivate: boolean;
    subContractedMaterialName?: string;
    subContractorName?: string;
    isCompleted?: boolean;
    materialDelay?: MaterialDelay;
};

export const MaterialProgressDtoStruct = (): T.Describe<MaterialProgressDto> => (T.type({
    materialWorkflowSequenceId: T.number(),
    currentTask: MaterialTaskProgressDtoStruct(),
    submissions: T.array(SubmissionDtoStruct()),
    sowItem: tSpecialOptional(SowItemDtoStruct()),
    stageOrder: tSpecialOptional(T.number()),
    materialWorkflowType: MaterialWorkflowTypeStruct(),
    isPrivate: T.boolean(),
    subContractedMaterialName: tSpecialOptional(T.string()),
    subContractorName: tSpecialOptional(T.string()),
    isCompleted: tSpecialOptional(T.boolean()),
    materialDelay: tSpecialOptional(MaterialDelayStruct()),
}) as unknown as T.Describe<MaterialProgressDto>);

export type SubContractorListItem = {
    materialWorkflowId: number;
    sowItemDto?: SowItemDto;
    subContractedMaterialName: string;
    subContractorName: string;
    stageOrder: number;
    completeWorksBy: string;
    currentTask: MaterialTaskProgressDto;
    isPrivate: boolean;
};

export const SubContractorListItemStruct = (): T.Describe<SubContractorListItem> => (T.type({
    materialWorkflowId: T.number(),
    sowItemDto: tSpecialOptional(SowItemDtoStruct()),
    subContractedMaterialName: T.string(),
    subContractorName: T.string(),
    stageOrder: T.number(),
    completeWorksBy: T.string(),
    currentTask: MaterialTaskProgressDtoStruct(),
    isPrivate: T.boolean(),
}) as unknown as T.Describe<SubContractorListItem>);

export type MaterialListItem = {
    materialWorkflowId: number;
    sowItem: SowItemDto;
    stageOrder: number;
    siteDeliveryDate: string;
    currentTask: MaterialTaskProgressDto;
};

export const MaterialListItemStruct = (): T.Describe<MaterialListItem> => (T.type({
    materialWorkflowId: T.number(),
    sowItem: SowItemDtoStruct(),
    stageOrder: T.number(),
    siteDeliveryDate: T.string(),
    currentTask: MaterialTaskProgressDtoStruct(),
}) as unknown as T.Describe<MaterialListItem>);

export type MaterialNameDto = {
    id: number;
    englishName: string;
    arabicName: string;
    iconId: string;
};

export const MaterialNameDtoStruct = (): T.Describe<MaterialNameDto> => (T.type({
    id: T.number(),
    englishName: T.string(),
    arabicName: T.string(),
    iconId: T.string(),
}) as unknown as T.Describe<MaterialNameDto>);

export type UserTaskDto = {
    id: number;
    order: number;
    isActive: boolean;
    isCompleted: boolean;
    startDate?: string;
    completionDate?: string;
    dueDate?: string;
    status: TaskStatus;
    actorId?: number;
    projectBidStageUnitId: number;
    actorType: ActorType;
    actionType: ActionType;
    descriptionEn?: string;
    descriptionAr?: string;
    createdDate: string;
    defaultTaskTime: string;
    nameEn: string;
    nameAr: string;
    sowSubItemId: number;
    sowSubItem?: SowItemUnitDto;
};

export const UserTaskDtoStruct = (): T.Describe<UserTaskDto> => (T.type({
    id: T.number(),
    order: T.number(),
    isActive: T.boolean(),
    isCompleted: T.boolean(),
    startDate: tSpecialOptional(T.string()),
    completionDate: tSpecialOptional(T.string()),
    dueDate: tSpecialOptional(T.string()),
    status: TaskStatusStruct(),
    actorId: tSpecialOptional(T.number()),
    projectBidStageUnitId: T.number(),
    actorType: ActorTypeStruct(),
    actionType: ActionTypeStruct(),
    descriptionEn: tSpecialOptional(T.string()),
    descriptionAr: tSpecialOptional(T.string()),
    createdDate: T.string(),
    defaultTaskTime: T.string(),
    nameEn: T.string(),
    nameAr: T.string(),
    sowSubItemId: T.number(),
    sowSubItem: tSpecialOptional(SowItemUnitDtoStruct()),
}) as unknown as T.Describe<UserTaskDto>);

export type WorkflowSequenceDto = {
    id: number;
    order: number;
    userTasks: UserTaskDto[];
    description?: string;
    sowItemName: string;
    sowItemId: number;
    rate?: number;
    supplier?: string;
    nameEn: string;
    nameAr: string;
};

export const WorkflowSequenceDtoStruct = (): T.Describe<WorkflowSequenceDto> => (T.type({
    id: T.number(),
    order: T.number(),
    userTasks: T.array(UserTaskDtoStruct()),
    description: tSpecialOptional(T.string()),
    sowItemName: T.string(),
    sowItemId: T.number(),
    rate: tSpecialOptional(T.number()),
    supplier: tSpecialOptional(T.string()),
    nameEn: T.string(),
    nameAr: T.string(),
}) as unknown as T.Describe<WorkflowSequenceDto>);

export type StageDto = {
    id: number;
    order: number;
    isActive: boolean;
    status: StageStatus;
    isCompleted: boolean;
    startDate?: string;
    completionDate?: string;
    weight: number;
    nameEn: string;
    nameAr?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    workflowSequences: WorkflowSequenceDto[];
    baselineStartDate?: string;
    baselineFinishDate?: string;
    projectBidStageUnitId?: number;
};

export const StageDtoStruct = (): T.Describe<StageDto> => (T.type({
    id: T.number(),
    order: T.number(),
    isActive: T.boolean(),
    status: StageStatusStruct(),
    isCompleted: T.boolean(),
    startDate: tSpecialOptional(T.string()),
    completionDate: tSpecialOptional(T.string()),
    weight: T.number(),
    nameEn: T.string(),
    nameAr: tSpecialOptional(T.string()),
    descriptionEn: tSpecialOptional(T.string()),
    descriptionAr: tSpecialOptional(T.string()),
    workflowSequences: T.array(WorkflowSequenceDtoStruct()),
    baselineStartDate: tSpecialOptional(T.string()),
    baselineFinishDate: tSpecialOptional(T.string()),
    projectBidStageUnitId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<StageDto>);

export type PhaseDto = {
    id: number;
    stages: StageDto[];
    phaseType: PhaseType;
    isActive: boolean;
    isCompleted: boolean;
    startDate?: string;
    completionDate?: string;
    order: number;
    baselineStartDate: string;
    baselineFinishDate: string;
};

export const PhaseDtoStruct = (): T.Describe<PhaseDto> => (T.type({
    id: T.number(),
    stages: T.array(StageDtoStruct()),
    phaseType: PhaseTypeStruct(),
    isActive: T.boolean(),
    isCompleted: T.boolean(),
    startDate: tSpecialOptional(T.string()),
    completionDate: tSpecialOptional(T.string()),
    order: T.number(),
    baselineStartDate: T.string(),
    baselineFinishDate: T.string(),
}) as unknown as T.Describe<PhaseDto>);

export type ProjectDto = {
    id: number;
    phases: PhaseDto[];
    startDate?: string;
    estimatedFinishDate?: string;
    contractorId?: number;
    consultantId?: number;
    supplierId?: number;
    clientId?: number;
    baselineStartDate?: string;
    baselineFinishDate?: string;
};

export const ProjectDtoStruct = (): T.Describe<ProjectDto> => (T.type({
    id: T.number(),
    phases: T.array(PhaseDtoStruct()),
    startDate: tSpecialOptional(T.string()),
    estimatedFinishDate: tSpecialOptional(T.string()),
    contractorId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
    supplierId: tSpecialOptional(T.number()),
    clientId: tSpecialOptional(T.number()),
    baselineStartDate: tSpecialOptional(T.string()),
    baselineFinishDate: tSpecialOptional(T.string()),
}) as unknown as T.Describe<ProjectDto>);

export type ProjectStatisticDto = {
    projectStatus?: ProjectStatus;
    completionPercentage?: number;
    totalDaysElapsed?: number;
    daysRemaining?: number;
    totalDelayDays?: number;
    contractorDelayDays?: number;
    consultantDelayDays?: number;
    clientDelayDays?: number;
};

export const ProjectStatisticDtoStruct = (): T.Describe<ProjectStatisticDto> => (T.type({
    projectStatus: tSpecialOptional(ProjectStatusStruct()),
    completionPercentage: tSpecialOptional(T.number()),
    totalDaysElapsed: tSpecialOptional(T.number()),
    daysRemaining: tSpecialOptional(T.number()),
    totalDelayDays: tSpecialOptional(T.number()),
    contractorDelayDays: tSpecialOptional(T.number()),
    consultantDelayDays: tSpecialOptional(T.number()),
    clientDelayDays: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ProjectStatisticDto>);

export type PaymentBlockPayloadDto = {
    stageNumber?: number;
    stageValue?: number;
    stageSubTotal?: number;
    isPenaltyAvailable?: boolean;
    penaltyPercentage?: number;
    penaltySubtotal?: number;
    bidValue?: number;
    isRefundAvailable?: boolean;
    refundSubtotal?: number;
    refundPercentage?: number;
    taxPercentage?: number;
    taxTotal?: number;
    grandTotal?: number;
};

export const PaymentBlockPayloadDtoStruct = (): T.Describe<PaymentBlockPayloadDto> => (T.type({
    stageNumber: tSpecialOptional(T.number()),
    stageValue: tSpecialOptional(T.number()),
    stageSubTotal: tSpecialOptional(T.number()),
    isPenaltyAvailable: tSpecialOptional(T.boolean()),
    penaltyPercentage: tSpecialOptional(T.number()),
    penaltySubtotal: tSpecialOptional(T.number()),
    bidValue: tSpecialOptional(T.number()),
    isRefundAvailable: tSpecialOptional(T.boolean()),
    refundSubtotal: tSpecialOptional(T.number()),
    refundPercentage: tSpecialOptional(T.number()),
    taxPercentage: tSpecialOptional(T.number()),
    taxTotal: tSpecialOptional(T.number()),
    grandTotal: tSpecialOptional(T.number()),
}) as unknown as T.Describe<PaymentBlockPayloadDto>);

export type TaskProgressDto = {
    id: number;
    status: TaskStatus;
    isActionable: boolean;
    isValidUserActor: boolean;
    actorType: ActorType;
    dueDate?: string;
    actionType: ActionType;
    actionValue?: string;
    actor?: ActorDto;
    paymentBlockPayload?: PaymentBlockPayloadDto;
    descriptionEn?: string;
    descriptionAr?: string;
    nameEn: string;
    nameAr: string;
};

export const TaskProgressDtoStruct = (): T.Describe<TaskProgressDto> => (T.type({
    id: T.number(),
    status: TaskStatusStruct(),
    isActionable: T.boolean(),
    isValidUserActor: T.boolean(),
    actorType: ActorTypeStruct(),
    dueDate: tSpecialOptional(T.string()),
    actionType: ActionTypeStruct(),
    actionValue: tSpecialOptional(T.string()),
    actor: tSpecialOptional(ActorDtoStruct()),
    paymentBlockPayload: tSpecialOptional(PaymentBlockPayloadDtoStruct()),
    descriptionEn: tSpecialOptional(T.string()),
    descriptionAr: tSpecialOptional(T.string()),
    nameEn: T.string(),
    nameAr: T.string(),
}) as unknown as T.Describe<TaskProgressDto>);

export type WorkflowProgressDto = {
    workflowId: number;
    workflowNameEn: string;
    workflowNameAr: string;
    workflowDescriptionEn: string;
    workflowDescriptionAr: string;
    sowItemId: number;
    sowItem: SowItemDto;
    sowSubItem: SowItemUnitDto;
    stageId: number;
    rate?: number;
    supplier?: string;
    submissions: SubmissionDto[];
    updateDtos: TaskUpdateDto[];
    currentTask: TaskProgressDto;
};

export const WorkflowProgressDtoStruct = (): T.Describe<WorkflowProgressDto> => (T.type({
    workflowId: T.number(),
    workflowNameEn: T.string(),
    workflowNameAr: T.string(),
    workflowDescriptionEn: T.string(),
    workflowDescriptionAr: T.string(),
    sowItemId: T.number(),
    sowItem: SowItemDtoStruct(),
    sowSubItem: SowItemUnitDtoStruct(),
    stageId: T.number(),
    rate: tSpecialOptional(T.number()),
    supplier: tSpecialOptional(T.string()),
    submissions: T.array(SubmissionDtoStruct()),
    updateDtos: T.array(TaskUpdateDtoStruct()),
    currentTask: TaskProgressDtoStruct(),
}) as unknown as T.Describe<WorkflowProgressDto>);

export type PenaltyDto = {
    bidValue?: number;
    isPenaltyAvailable?: boolean;
    penaltyPercentage?: number;
    penaltySubtotal?: number;
    isRefundable?: boolean;
    refundSubtotal?: number;
    refundPercentage?: number;
};

export const PenaltyDtoStruct = (): T.Describe<PenaltyDto> => (T.type({
    bidValue: tSpecialOptional(T.number()),
    isPenaltyAvailable: tSpecialOptional(T.boolean()),
    penaltyPercentage: tSpecialOptional(T.number()),
    penaltySubtotal: tSpecialOptional(T.number()),
    isRefundable: tSpecialOptional(T.boolean()),
    refundSubtotal: tSpecialOptional(T.number()),
    refundPercentage: tSpecialOptional(T.number()),
}) as unknown as T.Describe<PenaltyDto>);

export type InvoiceDetailsDto = {
    payer: ActorDto;
    payee: CompanyDto;
    projectId?: number;
    invoiceId?: number;
    invoiceDateIssued?: string;
    description: string;
    projectValue?: number;
    stageValue?: number;
    subtotal?: number;
    taxPercentage?: number;
    taxTotal?: number;
    grandTotal?: number;
    dueDate?: string;
    penaltyDto: PenaltyDto;
};

export const InvoiceDetailsDtoStruct = (): T.Describe<InvoiceDetailsDto> => (T.type({
    payer: ActorDtoStruct(),
    payee: CompanyDtoStruct(),
    projectId: tSpecialOptional(T.number()),
    invoiceId: tSpecialOptional(T.number()),
    invoiceDateIssued: tSpecialOptional(T.string()),
    description: T.string(),
    projectValue: tSpecialOptional(T.number()),
    stageValue: tSpecialOptional(T.number()),
    subtotal: tSpecialOptional(T.number()),
    taxPercentage: tSpecialOptional(T.number()),
    taxTotal: tSpecialOptional(T.number()),
    grandTotal: tSpecialOptional(T.number()),
    dueDate: tSpecialOptional(T.string()),
    penaltyDto: PenaltyDtoStruct(),
}) as unknown as T.Describe<InvoiceDetailsDto>);

export type StageUserTaskDto = {
    userTaskId?: number;
    stageName: string;
    stageNameAr: string;
    stageOrder?: number;
    userTaskDueDate?: string;
    userTaskStatus?: TaskStatus;
};

export const StageUserTaskDtoStruct = (): T.Describe<StageUserTaskDto> => (T.type({
    userTaskId: tSpecialOptional(T.number()),
    stageName: T.string(),
    stageNameAr: T.string(),
    stageOrder: tSpecialOptional(T.number()),
    userTaskDueDate: tSpecialOptional(T.string()),
    userTaskStatus: tSpecialOptional(TaskStatusStruct()),
}) as unknown as T.Describe<StageUserTaskDto>);

export type LogUpdateItemDto = {
    taskUpdateId?: number;
    posterActorType?: ActorType;
    posterActor?: ActorDto;
    postedAt?: string;
    attachmentId?: string;
    fileName: string;
    title: string;
};

export const LogUpdateItemDtoStruct = (): T.Describe<LogUpdateItemDto> => (T.type({
    taskUpdateId: tSpecialOptional(T.number()),
    posterActorType: tSpecialOptional(ActorTypeStruct()),
    posterActor: tSpecialOptional(ActorDtoStruct()),
    postedAt: tSpecialOptional(T.string()),
    attachmentId: tSpecialOptional(T.string()),
    fileName: T.string(),
    title: T.string(),
}) as unknown as T.Describe<LogUpdateItemDto>);

export type LogUpdateDto = {
    taskUpdateId: number;
    taskName: string;
    taskUpdateType: TaskUpdateType;
    attachmentsIds: string[];
    actorType: ActorType;
    actor: ActorDto;
    createdDate: string;
    stageOrder: number;
    sowItemName: string;
    workflowName: string;
    sequenceUpdateId: number;
};

export const LogUpdateDtoStruct = (): T.Describe<LogUpdateDto> => (T.type({
    taskUpdateId: T.number(),
    taskName: T.string(),
    taskUpdateType: TaskUpdateTypeStruct(),
    attachmentsIds: T.array(T.string()),
    actorType: ActorTypeStruct(),
    actor: ActorDtoStruct(),
    createdDate: T.string(),
    stageOrder: T.number(),
    sowItemName: T.string(),
    workflowName: T.string(),
    sequenceUpdateId: T.number(),
}) as unknown as T.Describe<LogUpdateDto>);

export type TasksSummaryDto = {
    upcomingTasksCount?: number;
    dueTasksCount?: number;
    completedTasksCount?: number;
    inDelayTasksCount?: number;
};

export const TasksSummaryDtoStruct = (): T.Describe<TasksSummaryDto> => (T.type({
    upcomingTasksCount: tSpecialOptional(T.number()),
    dueTasksCount: tSpecialOptional(T.number()),
    completedTasksCount: tSpecialOptional(T.number()),
    inDelayTasksCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<TasksSummaryDto>);

export type StageSubItemDto = {
    subItemName: string;
    workflowName: string;
    status: TaskStatus;
};

export const StageSubItemDtoStruct = (): T.Describe<StageSubItemDto> => (T.type({
    subItemName: T.string(),
    workflowName: T.string(),
    status: TaskStatusStruct(),
}) as unknown as T.Describe<StageSubItemDto>);

export type StageItemDto = {
    name: string;
    iconId?: string;
    subItems: StageSubItemDto[];
};

export const StageItemDtoStruct = (): T.Describe<StageItemDto> => (T.type({
    name: T.string(),
    iconId: tSpecialOptional(T.string()),
    subItems: T.array(StageSubItemDtoStruct()),
}) as unknown as T.Describe<StageItemDto>);

export type StageMaterialDto = {
    iconFileId: string;
    id: number;
    englishName: string;
    arabicName: string;
    iconId: string;
};

export const StageMaterialDtoStruct = (): T.Describe<StageMaterialDto> => (T.type({
    iconFileId: T.string(),
    id: T.number(),
    englishName: T.string(),
    arabicName: T.string(),
    iconId: T.string(),
}) as unknown as T.Describe<StageMaterialDto>);

export type ActorsDelay = {
    contractor?: number;
    consultant?: number;
    client?: number;
};

export const ActorsDelayStruct = (): T.Describe<ActorsDelay> => (T.type({
    contractor: tSpecialOptional(T.number()),
    consultant: tSpecialOptional(T.number()),
    client: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ActorsDelay>);

export type StageProgressDto = {
    stage: StageDto;
    updatesSummary: TaskUpdateDto[];
    tasksSummary: TasksSummaryDto;
    stageItems: StageItemDto[];
    materialItems: StageMaterialDto[];
    delays: ActorsDelay;
};

export const StageProgressDtoStruct = (): T.Describe<StageProgressDto> => (T.type({
    stage: StageDtoStruct(),
    updatesSummary: T.array(TaskUpdateDtoStruct()),
    tasksSummary: TasksSummaryDtoStruct(),
    stageItems: T.array(StageItemDtoStruct()),
    materialItems: T.array(StageMaterialDtoStruct()),
    delays: ActorsDelayStruct(),
}) as unknown as T.Describe<StageProgressDto>);

export type SubmissionValidations = {
    isMaterialFinished?: boolean;
    previousStagesCompleted?: boolean;
};

export const SubmissionValidationsStruct = (): T.Describe<SubmissionValidations> => (T.type({
    isMaterialFinished: tSpecialOptional(T.boolean()),
    previousStagesCompleted: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<SubmissionValidations>);

export type TaskUpdateInboxItemDto = {
    id: number;
    updateSequenceId?: number;
    workflowNameEn: string;
    workflowNameAr: string;
    taskNameEn: string;
    taskNameAr: string;
    isMaterialUpdate?: boolean;
    materialWorkflowType?: MaterialWorkflowType;
    materialUserTaskType?: MaterialUserTaskType;
    description: string;
    hasAttachments?: boolean;
    submittedBy?: ActorType;
    submittedInStageOrder?: number;
    lastActivity?: string;
    isRead?: boolean;
    isFlagged?: boolean;
    customUpdateName?: string;
    taskUpdateType?: TaskUpdateType;
    customUpdateTitle?: string;
};

export const TaskUpdateInboxItemDtoStruct = (): T.Describe<TaskUpdateInboxItemDto> => (T.type({
    id: T.number(),
    updateSequenceId: tSpecialOptional(T.number()),
    workflowNameEn: T.string(),
    workflowNameAr: T.string(),
    taskNameEn: T.string(),
    taskNameAr: T.string(),
    isMaterialUpdate: tSpecialOptional(T.boolean()),
    materialWorkflowType: tSpecialOptional(MaterialWorkflowTypeStruct()),
    materialUserTaskType: tSpecialOptional(MaterialUserTaskTypeStruct()),
    description: T.string(),
    hasAttachments: tSpecialOptional(T.boolean()),
    submittedBy: tSpecialOptional(ActorTypeStruct()),
    submittedInStageOrder: tSpecialOptional(T.number()),
    lastActivity: tSpecialOptional(T.string()),
    isRead: tSpecialOptional(T.boolean()),
    isFlagged: tSpecialOptional(T.boolean()),
    customUpdateName: tSpecialOptional(T.string()),
    taskUpdateType: tSpecialOptional(TaskUpdateTypeStruct()),
    customUpdateTitle: tSpecialOptional(T.string()),
}) as unknown as T.Describe<TaskUpdateInboxItemDto>);

export type TaskUpdateInboxDto = {
    id: number;
    updateSequenceId?: number;
    workflowName: string;
    taskName: string;
    description: string;
    isRead?: boolean;
    isFlagged?: boolean;
    createdOn?: string;
    attachmentsIds: string[];
    comments: CommentDto[];
    submittedBy?: ActorType;
    submittedByActorId?: number;
    isMaterialUpdate?: boolean;
    materialWorkflowType?: MaterialWorkflowType;
    materialUserTaskType?: MaterialUserTaskType;
    customUpdateName?: string;
    sowItemName?: string;
    taskUpdateType?: TaskUpdateType;
    customUpdateTitle?: string;
    stageOrder?: number;
};

export const TaskUpdateInboxDtoStruct = (): T.Describe<TaskUpdateInboxDto> => (T.type({
    id: T.number(),
    updateSequenceId: tSpecialOptional(T.number()),
    workflowName: T.string(),
    taskName: T.string(),
    description: T.string(),
    isRead: tSpecialOptional(T.boolean()),
    isFlagged: tSpecialOptional(T.boolean()),
    createdOn: tSpecialOptional(T.string()),
    attachmentsIds: T.array(T.string()),
    comments: T.array(CommentDtoStruct()),
    submittedBy: tSpecialOptional(ActorTypeStruct()),
    submittedByActorId: tSpecialOptional(T.number()),
    isMaterialUpdate: tSpecialOptional(T.boolean()),
    materialWorkflowType: tSpecialOptional(MaterialWorkflowTypeStruct()),
    materialUserTaskType: tSpecialOptional(MaterialUserTaskTypeStruct()),
    customUpdateName: tSpecialOptional(T.string()),
    sowItemName: tSpecialOptional(T.string()),
    taskUpdateType: tSpecialOptional(TaskUpdateTypeStruct()),
    customUpdateTitle: tSpecialOptional(T.string()),
    stageOrder: tSpecialOptional(T.number()),
}) as unknown as T.Describe<TaskUpdateInboxDto>);

export type UpdateStatisticsDto = {
    allCount?: number;
    unreadCount?: number;
    flaggedCount?: number;
};

export const UpdateStatisticsDtoStruct = (): T.Describe<UpdateStatisticsDto> => (T.type({
    allCount: tSpecialOptional(T.number()),
    unreadCount: tSpecialOptional(T.number()),
    flaggedCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateStatisticsDto>);

export type StageNameDto = {
    id: number;
    order: number;
    isActive: boolean;
    nameEn: string;
    nameAr?: string;
};

export const StageNameDtoStruct = (): T.Describe<StageNameDto> => (T.type({
    id: T.number(),
    order: T.number(),
    isActive: T.boolean(),
    nameEn: T.string(),
    nameAr: tSpecialOptional(T.string()),
}) as unknown as T.Describe<StageNameDto>);

export type IndicatorsDto = {
    tasksCount?: number;
    paymentsCount?: number;
    materialsCount?: number;
    updatesCount?: number;
};

export const IndicatorsDtoStruct = (): T.Describe<IndicatorsDto> => (T.type({
    tasksCount: tSpecialOptional(T.number()),
    paymentsCount: tSpecialOptional(T.number()),
    materialsCount: tSpecialOptional(T.number()),
    updatesCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<IndicatorsDto>);

export type UserTypeModel = {
    actorType?: ActorType;
    nameEn: string;
    nameAr: string;
    id: number;
};

export const UserTypeModelStruct = (): T.Describe<UserTypeModel> => (T.type({
    actorType: tSpecialOptional(ActorTypeStruct()),
    nameEn: T.string(),
    nameAr: T.string(),
    id: T.number(),
}) as unknown as T.Describe<UserTypeModel>);

export type WorkflowTypeModel = {
    nameEn: string;
    descriptionEn: string;
    id: number;
};

export const WorkflowTypeModelStruct = (): T.Describe<WorkflowTypeModel> => (T.type({
    nameEn: T.string(),
    descriptionEn: T.string(),
    id: T.number(),
}) as unknown as T.Describe<WorkflowTypeModel>);

export type AcceptanceTaskDefinitionModel = {
    id: number;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    actionType?: ActionType;
    isConsultantVisit?: boolean;
};

export const AcceptanceTaskDefinitionModelStruct = (): T.Describe<AcceptanceTaskDefinitionModel> => (T.type({
    id: T.number(),
    nameEn: T.string(),
    nameAr: T.string(),
    descriptionEn: T.string(),
    descriptionAr: T.string(),
    actionType: tSpecialOptional(ActionTypeStruct()),
    isConsultantVisit: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<AcceptanceTaskDefinitionModel>);

export type WorkflowModel = {
    workflowTypeId?: number;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    id: number;
};

export const WorkflowModelStruct = (): T.Describe<WorkflowModel> => (T.type({
    workflowTypeId: tSpecialOptional(T.number()),
    nameEn: T.string(),
    nameAr: T.string(),
    descriptionEn: T.string(),
    descriptionAr: T.string(),
    id: T.number(),
}) as unknown as T.Describe<WorkflowModel>);

export type WorkflowSequenceModel = {
    id: number;
    workflowId?: number;
    taskOrder?: number;
    taskId?: number;
    userTypeId?: number;
    duration?: number;
};

export const WorkflowSequenceModelStruct = (): T.Describe<WorkflowSequenceModel> => (T.type({
    id: T.number(),
    workflowId: tSpecialOptional(T.number()),
    taskOrder: tSpecialOptional(T.number()),
    taskId: tSpecialOptional(T.number()),
    userTypeId: tSpecialOptional(T.number()),
    duration: tSpecialOptional(T.number()),
}) as unknown as T.Describe<WorkflowSequenceModel>);

export type GetAllWorkflowsResponse = {
    result: WorkflowDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetAllWorkflowsResponseStruct = (): T.Describe<GetAllWorkflowsResponse> => (T.type({
    result: T.array(WorkflowDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetAllWorkflowsResponse>);

export type GetWorkflowByIdResponse = {
    result: WorkflowDto;
};

export const GetWorkflowByIdResponseStruct = (): T.Describe<GetWorkflowByIdResponse> => (T.type({
    result: WorkflowDtoStruct(),
}) as unknown as T.Describe<GetWorkflowByIdResponse>);

export type GetWorkflowsByIdsResponse = {
    result: WorkflowDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetWorkflowsByIdsResponseStruct = (): T.Describe<GetWorkflowsByIdsResponse> => (T.type({
    result: T.array(WorkflowDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetWorkflowsByIdsResponse>);

export type GetWorkflowsWithActionsResponse = {
    result: FullWorkflowDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetWorkflowsWithActionsResponseStruct = (): T.Describe<GetWorkflowsWithActionsResponse> => (T.type({
    result: T.array(FullWorkflowDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetWorkflowsWithActionsResponse>);

export type GetNumberOfVisitsForWorkflowsResponse = {
    result: number;
};

export const GetNumberOfVisitsForWorkflowsResponseStruct = (): T.Describe<GetNumberOfVisitsForWorkflowsResponse> => (T.type({
    result: T.number(),
}) as unknown as T.Describe<GetNumberOfVisitsForWorkflowsResponse>);

export type GetNumberOfActorTasksForWorkflowsResponse = {
    result: NumberOfActorTasksForWorkflowDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetNumberOfActorTasksForWorkflowsResponseStruct = (): T.Describe<GetNumberOfActorTasksForWorkflowsResponse> => (T.type({
    result: T.array(NumberOfActorTasksForWorkflowDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetNumberOfActorTasksForWorkflowsResponse>);

export type GetNumberOfTasksPerWorkflowResponse = {
    result: unknown;
};

export const GetNumberOfTasksPerWorkflowResponseStruct = (): T.Describe<GetNumberOfTasksPerWorkflowResponse> => (T.type({
    result: T.unknown(),
}) as unknown as T.Describe<GetNumberOfTasksPerWorkflowResponse>);

export type SaveWorkflowActionsValuesResponse = {
    updatedSubItems?: TaskActionUpdateDto[];
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const SaveWorkflowActionsValuesResponseStruct = (): T.Describe<SaveWorkflowActionsValuesResponse> => (T.type({
    updatedSubItems: tSpecialOptional(T.array(TaskActionUpdateDtoStruct())),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<SaveWorkflowActionsValuesResponse>);

export type UpdateWorkflowActionDataValueResponse = {
    updatedSubItems?: TaskActionUpdateDto[];
};

export const UpdateWorkflowActionDataValueResponseStruct = (): T.Describe<UpdateWorkflowActionDataValueResponse> => (T.type({
    updatedSubItems: tSpecialOptional(T.array(TaskActionUpdateDtoStruct())),
}) as unknown as T.Describe<UpdateWorkflowActionDataValueResponse>);

export type StartWorkflowResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const StartWorkflowResponseStruct = (): T.Describe<StartWorkflowResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<StartWorkflowResponse>);

export type BasicWorkflowResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const BasicWorkflowResponseStruct = (): T.Describe<BasicWorkflowResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<BasicWorkflowResponse>);

export type EmptyResponse = {
    responseStatus?: ResponseStatus;
};

export const EmptyResponseStruct = (): T.Describe<EmptyResponse> => (T.type({
    responseStatus: tSpecialOptional(ResponseStatusStruct()),
}) as unknown as T.Describe<EmptyResponse>);

export type ValidateStageTemplateResponse = {
    isValid?: boolean;
    errors: StageTemplateValidationErrors;
};

export const ValidateStageTemplateResponseStruct = (): T.Describe<ValidateStageTemplateResponse> => (T.type({
    isValid: tSpecialOptional(T.boolean()),
    errors: StageTemplateValidationErrorsStruct(),
}) as unknown as T.Describe<ValidateStageTemplateResponse>);

export type CreateCommentCommandResponse = {
    result: CommentDto;
};

export const CreateCommentCommandResponseStruct = (): T.Describe<CreateCommentCommandResponse> => (T.type({
    result: CommentDtoStruct(),
}) as unknown as T.Describe<CreateCommentCommandResponse>);

export type GetCommentsQueryResponse = {
    result: CommentDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetCommentsQueryResponseStruct = (): T.Describe<GetCommentsQueryResponse> => (T.type({
    result: T.array(CommentDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetCommentsQueryResponse>);

export type GetFullConsultantPaymentResponse = {
    result: FullConsultantPaymentDto;
};

export const GetFullConsultantPaymentResponseStruct = (): T.Describe<GetFullConsultantPaymentResponse> => (T.type({
    result: FullConsultantPaymentDtoStruct(),
}) as unknown as T.Describe<GetFullConsultantPaymentResponse>);

export type ListConsultantPaymentResponse = {
    result: ListConsultantPaymentsResult;
};

export const ListConsultantPaymentResponseStruct = (): T.Describe<ListConsultantPaymentResponse> => (T.type({
    result: ListConsultantPaymentsResultStruct(),
}) as unknown as T.Describe<ListConsultantPaymentResponse>);

export type PayConsultantPaymentResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const PayConsultantPaymentResponseStruct = (): T.Describe<PayConsultantPaymentResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<PayConsultantPaymentResponse>);

export type AdminUpdateProjectConsultantPriceResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const AdminUpdateProjectConsultantPriceResponseStruct = (): T.Describe<AdminUpdateProjectConsultantPriceResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<AdminUpdateProjectConsultantPriceResponse>);

export type GenerateConsultantPaymentResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const GenerateConsultantPaymentResponseStruct = (): T.Describe<GenerateConsultantPaymentResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<GenerateConsultantPaymentResponse>);

export type SaveDraftResourceResponse = {
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const SaveDraftResourceResponseStruct = (): T.Describe<SaveDraftResourceResponse> => (T.type({
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<SaveDraftResourceResponse>);

export type GetDraftResourceResponse = {
    result: DraftResourceDto;
};

export const GetDraftResourceResponseStruct = (): T.Describe<GetDraftResourceResponse> => (T.type({
    result: DraftResourceDtoStruct(),
}) as unknown as T.Describe<GetDraftResourceResponse>);

export type GetMaterialProgressResponse = {
    result: MaterialProgressDto;
};

export const GetMaterialProgressResponseStruct = (): T.Describe<GetMaterialProgressResponse> => (T.type({
    result: MaterialProgressDtoStruct(),
}) as unknown as T.Describe<GetMaterialProgressResponse>);

export type GetClientMaterialsResponse = {
    result?: MaterialProgressDto[];
};

export const GetClientMaterialsResponseStruct = (): T.Describe<GetClientMaterialsResponse> => (T.type({
    result: tSpecialOptional(T.array(MaterialProgressDtoStruct())),
}) as unknown as T.Describe<GetClientMaterialsResponse>);

export type GetMaterialWorkflowsResponse = {
    clientSubContractorItems: SubContractorListItem[];
    clientMaterialsForContractorInstallationItems: MaterialListItem[];
    contractorMaterialsForClientApprovalItems: MaterialListItem[];
    contractorMaterials: SowItemDto[];
};

export const GetMaterialWorkflowsResponseStruct = (): T.Describe<GetMaterialWorkflowsResponse> => (T.type({
    clientSubContractorItems: T.array(SubContractorListItemStruct()),
    clientMaterialsForContractorInstallationItems: T.array(MaterialListItemStruct()),
    contractorMaterialsForClientApprovalItems: T.array(MaterialListItemStruct()),
    contractorMaterials: T.array(SowItemDtoStruct()),
}) as unknown as T.Describe<GetMaterialWorkflowsResponse>);

export type MaterialProgressResponse = {
    result: MaterialProgressDto;
};

export const MaterialProgressResponseStruct = (): T.Describe<MaterialProgressResponse> => (T.type({
    result: MaterialProgressDtoStruct(),
}) as unknown as T.Describe<MaterialProgressResponse>);

export type AddExpenseResponse = {
    result: SubContractorListItem;
};

export const AddExpenseResponseStruct = (): T.Describe<AddExpenseResponse> => (T.type({
    result: SubContractorListItemStruct(),
}) as unknown as T.Describe<AddExpenseResponse>);

export type GetListMaterialNamesResponse = {
    result: MaterialNameDto[];
};

export const GetListMaterialNamesResponseStruct = (): T.Describe<GetListMaterialNamesResponse> => (T.type({
    result: T.array(MaterialNameDtoStruct()),
}) as unknown as T.Describe<GetListMaterialNamesResponse>);

export type StartProjectManagementModuleResponse = {
    projectId?: number;
};

export const StartProjectManagementModuleResponseStruct = (): T.Describe<StartProjectManagementModuleResponse> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<StartProjectManagementModuleResponse>);

export type GetProjectResponse = {
    result: ProjectDto;
};

export const GetProjectResponseStruct = (): T.Describe<GetProjectResponse> => (T.type({
    result: ProjectDtoStruct(),
}) as unknown as T.Describe<GetProjectResponse>);

export type GetProjectStatisticResponse = {
    result: ProjectStatisticDto;
};

export const GetProjectStatisticResponseStruct = (): T.Describe<GetProjectStatisticResponse> => (T.type({
    result: ProjectStatisticDtoStruct(),
}) as unknown as T.Describe<GetProjectStatisticResponse>);

export type GetWorkflowProgressResponse = {
    result: WorkflowProgressDto;
};

export const GetWorkflowProgressResponseStruct = (): T.Describe<GetWorkflowProgressResponse> => (T.type({
    result: WorkflowProgressDtoStruct(),
}) as unknown as T.Describe<GetWorkflowProgressResponse>);

export type GetInvoiceDetailsQueryResponse = {
    result: InvoiceDetailsDto;
};

export const GetInvoiceDetailsQueryResponseStruct = (): T.Describe<GetInvoiceDetailsQueryResponse> => (T.type({
    result: InvoiceDetailsDtoStruct(),
}) as unknown as T.Describe<GetInvoiceDetailsQueryResponse>);

export type GetStageUserTasksByIdsResponse = {
    result: StageUserTaskDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetStageUserTasksByIdsResponseStruct = (): T.Describe<GetStageUserTasksByIdsResponse> => (T.type({
    result: T.array(StageUserTaskDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetStageUserTasksByIdsResponse>);

export type GetProjectUpdatesResponse = {
    result: LogUpdateItemDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetProjectUpdatesResponseStruct = (): T.Describe<GetProjectUpdatesResponse> => (T.type({
    result: T.array(LogUpdateItemDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetProjectUpdatesResponse>);

export type GetProjectUpdateResponse = {
    result: LogUpdateDto;
};

export const GetProjectUpdateResponseStruct = (): T.Describe<GetProjectUpdateResponse> => (T.type({
    result: LogUpdateDtoStruct(),
}) as unknown as T.Describe<GetProjectUpdateResponse>);

export type GetStageProgressResponse = {
    result: StageProgressDto;
};

export const GetStageProgressResponseStruct = (): T.Describe<GetStageProgressResponse> => (T.type({
    result: StageProgressDtoStruct(),
}) as unknown as T.Describe<GetStageProgressResponse>);

export type BaseProjectManagementResponse = {
    project?: ProjectDto;
    submissionValidations?: SubmissionValidations;
};

export const BaseProjectManagementResponseStruct = (): T.Describe<BaseProjectManagementResponse> => (T.type({
    project: tSpecialOptional(ProjectDtoStruct()),
    submissionValidations: tSpecialOptional(SubmissionValidationsStruct()),
}) as unknown as T.Describe<BaseProjectManagementResponse>);

export type GetInboxTaskUpdatesResponse = {
    result: TaskUpdateInboxItemDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetInboxTaskUpdatesResponseStruct = (): T.Describe<GetInboxTaskUpdatesResponse> => (T.type({
    result: T.array(TaskUpdateInboxItemDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetInboxTaskUpdatesResponse>);

export type FLagTaskUpdateResponse = undefined;

export const FLagTaskUpdateResponseStruct = () => T.literal(undefined);

export type GetInboxTaskUpdateResponse = {
    result: TaskUpdateInboxDto;
};

export const GetInboxTaskUpdateResponseStruct = (): T.Describe<GetInboxTaskUpdateResponse> => (T.type({
    result: TaskUpdateInboxDtoStruct(),
}) as unknown as T.Describe<GetInboxTaskUpdateResponse>);

export type GetUpdateStatisticsResponse = {
    result: UpdateStatisticsDto;
};

export const GetUpdateStatisticsResponseStruct = (): T.Describe<GetUpdateStatisticsResponse> => (T.type({
    result: UpdateStatisticsDtoStruct(),
}) as unknown as T.Describe<GetUpdateStatisticsResponse>);

export type CreateObservationResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const CreateObservationResponseStruct = (): T.Describe<CreateObservationResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateObservationResponse>);

export type GetObservationStageItemsResponse = {
    result: MaterialNameDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetObservationStageItemsResponseStruct = (): T.Describe<GetObservationStageItemsResponse> => (T.type({
    result: T.array(MaterialNameDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetObservationStageItemsResponse>);

export type GetListStageNameResponse = {
    result: StageNameDto[];
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
};

export const GetListStageNameResponseStruct = (): T.Describe<GetListStageNameResponse> => (T.type({
    result: T.array(StageNameDtoStruct()),
    currentPage: tSpecialOptional(T.number()),
    pageCount: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
    rowCount: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetListStageNameResponse>);

export type ReorderStagesResponse = {
    id: number;
    code: string;
    responseStatus: ResponseStatus;
    isSuccess?: boolean;
};

export const ReorderStagesResponseStruct = (): T.Describe<ReorderStagesResponse> => (T.type({
    id: T.number(),
    code: T.string(),
    responseStatus: ResponseStatusStruct(),
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ReorderStagesResponse>);

export type ChangeConsultantResponse = {
    isSuccess?: boolean;
};

export const ChangeConsultantResponseStruct = (): T.Describe<ChangeConsultantResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ChangeConsultantResponse>);

export type ResetMaterialProgressResponse = {
    isSuccess?: boolean;
};

export const ResetMaterialProgressResponseStruct = (): T.Describe<ResetMaterialProgressResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<ResetMaterialProgressResponse>);

export type UpdateObservationActorResponse = {
    isSuccess?: boolean;
};

export const UpdateObservationActorResponseStruct = (): T.Describe<UpdateObservationActorResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateObservationActorResponse>);

export type UpdateTaskDueDateResponse = {
    id: number;
};

export const UpdateTaskDueDateResponseStruct = (): T.Describe<UpdateTaskDueDateResponse> => (T.type({
    id: T.number(),
}) as unknown as T.Describe<UpdateTaskDueDateResponse>);

export type GetTabsIndicatorResponse = {
    result: IndicatorsDto;
};

export const GetTabsIndicatorResponseStruct = (): T.Describe<GetTabsIndicatorResponse> => (T.type({
    result: IndicatorsDtoStruct(),
}) as unknown as T.Describe<GetTabsIndicatorResponse>);

export type UpdateStageBaselineDatesResponse = {
    isSuccess?: boolean;
};

export const UpdateStageBaselineDatesResponseStruct = (): T.Describe<UpdateStageBaselineDatesResponse> => (T.type({
    isSuccess: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<UpdateStageBaselineDatesResponse>);

export type GetAllWorkflowsQuery = undefined;

export const GetAllWorkflowsQueryStruct = () => T.literal(undefined);

export type GetWorkflowByIdQuery = {
    workflowId?: number;
    sowId?: number;
    sowSubItemId?: number;
};

export const GetWorkflowByIdQueryStruct = (): T.Describe<GetWorkflowByIdQuery> => (T.type({
    workflowId: tSpecialOptional(T.number()),
    sowId: tSpecialOptional(T.number()),
    sowSubItemId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetWorkflowByIdQuery>);

export type GetWorkflowsByIds = {
    ids: number[];
};

export const GetWorkflowsByIdsStruct = (): T.Describe<GetWorkflowsByIds> => (T.type({
    ids: T.array(T.number()),
}) as unknown as T.Describe<GetWorkflowsByIds>);

export type GetWorkflowsWithActionsQuery = {
    sowId?: number;
    requestedWorkflows: WorkflowWithActionRequest[];
};

export const GetWorkflowsWithActionsQueryStruct = (): T.Describe<GetWorkflowsWithActionsQuery> => (T.type({
    sowId: tSpecialOptional(T.number()),
    requestedWorkflows: T.array(WorkflowWithActionRequestStruct()),
}) as unknown as T.Describe<GetWorkflowsWithActionsQuery>);

export type GetNumberOfVisitsForWorkflowsQuery = {
    workflowIds: number[];
    visitorType?: ActorType;
};

export const GetNumberOfVisitsForWorkflowsQueryStruct = (): T.Describe<GetNumberOfVisitsForWorkflowsQuery> => (T.type({
    workflowIds: T.array(T.number()),
    visitorType: tSpecialOptional(ActorTypeStruct()),
}) as unknown as T.Describe<GetNumberOfVisitsForWorkflowsQuery>);

export type GetNumberOfActorTasksForWorkflowsQuery = {
    actorType: ActorType;
    workflowIds: number[];
};

export const GetNumberOfActorTasksForWorkflowsQueryStruct = (): T.Describe<GetNumberOfActorTasksForWorkflowsQuery> => (T.type({
    actorType: ActorTypeStruct(),
    workflowIds: T.array(T.number()),
}) as unknown as T.Describe<GetNumberOfActorTasksForWorkflowsQuery>);

export type GetNumberOfTasksInWorkflowsQuery = {
    workflowIds: number[];
};

export const GetNumberOfTasksInWorkflowsQueryStruct = (): T.Describe<GetNumberOfTasksInWorkflowsQuery> => (T.type({
    workflowIds: T.array(T.number()),
}) as unknown as T.Describe<GetNumberOfTasksInWorkflowsQuery>);

export type GetNumberOfTasksPerWorkflow = {
    workflowIds: number[];
};

export const GetNumberOfTasksPerWorkflowStruct = (): T.Describe<GetNumberOfTasksPerWorkflow> => (T.type({
    workflowIds: T.array(T.number()),
}) as unknown as T.Describe<GetNumberOfTasksPerWorkflow>);

export type SaveWorkflowActionsValuesCommand = {
    sowId?: number;
    taskActionModels: TaskActionModel[];
};

export const SaveWorkflowActionsValuesCommandStruct = (): T.Describe<SaveWorkflowActionsValuesCommand> => (T.type({
    sowId: tSpecialOptional(T.number()),
    taskActionModels: T.array(TaskActionModelStruct()),
}) as unknown as T.Describe<SaveWorkflowActionsValuesCommand>);

export type UpdateWorkflowActionDataValueCommand = {
    sowId?: number;
    taskActionModels: TaskActionModel[];
};

export const UpdateWorkflowActionDataValueCommandStruct = (): T.Describe<UpdateWorkflowActionDataValueCommand> => (T.type({
    sowId: tSpecialOptional(T.number()),
    taskActionModels: T.array(TaskActionModelStruct()),
}) as unknown as T.Describe<UpdateWorkflowActionDataValueCommand>);

export type StartWorkflowCommand = {
    workflowId?: number;
};

export const StartWorkflowCommandStruct = (): T.Describe<StartWorkflowCommand> => (T.type({
    workflowId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<StartWorkflowCommand>);

export type SeedWorkflowsCommand = {
    workflowManifest: WorkflowManifest;
};

export const SeedWorkflowsCommandStruct = (): T.Describe<SeedWorkflowsCommand> => (T.type({
    workflowManifest: WorkflowManifestStruct(),
}) as unknown as T.Describe<SeedWorkflowsCommand>);

export type CloneTaskActionValuesCommand = {
    oldSowId: number;
    newSowId: number;
    sowSubItemUpdateModels: SowSubItemUpdateModel[];
};

export const CloneTaskActionValuesCommandStruct = (): T.Describe<CloneTaskActionValuesCommand> => (T.type({
    oldSowId: T.number(),
    newSowId: T.number(),
    sowSubItemUpdateModels: T.array(SowSubItemUpdateModelStruct()),
}) as unknown as T.Describe<CloneTaskActionValuesCommand>);

export type ValidateStageTemplateQuery = {
    stageTemplateParts: StageTemplatePartDto[];
};

export const ValidateStageTemplateQueryStruct = (): T.Describe<ValidateStageTemplateQuery> => (T.type({
    stageTemplateParts: T.array(StageTemplatePartDtoStruct()),
}) as unknown as T.Describe<ValidateStageTemplateQuery>);

export type CreateCommentCommand = {
    taskUpdateId?: number;
    description: string;
    attachmentsIds: string[];
};

export const CreateCommentCommandStruct = (): T.Describe<CreateCommentCommand> => (T.type({
    taskUpdateId: tSpecialOptional(T.number()),
    description: T.string(),
    attachmentsIds: T.array(T.string()),
}) as unknown as T.Describe<CreateCommentCommand>);

export type GetCommentsQuery = {
    taskUpdateId?: number;
};

export const GetCommentsQueryStruct = (): T.Describe<GetCommentsQuery> => (T.type({
    taskUpdateId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetCommentsQuery>);

export type GetFullConsultantPaymentQuery = {
    consultantPaymentUserTaskId: number;
};

export const GetFullConsultantPaymentQueryStruct = (): T.Describe<GetFullConsultantPaymentQuery> => (T.type({
    consultantPaymentUserTaskId: T.number(),
}) as unknown as T.Describe<GetFullConsultantPaymentQuery>);

export type ListConsultantPaymentQuery = {
    constructionProjectId?: number;
};

export const ListConsultantPaymentQueryStruct = (): T.Describe<ListConsultantPaymentQuery> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ListConsultantPaymentQuery>);

export type PayConsultantPaymentCommand = {
    consultantPaymentUserTaskId: number;
    grandTotal?: number;
    appliedPenaltySubTotal?: number;
    taxValue?: number;
    countOfAppliedPenalty?: number;
};

export const PayConsultantPaymentCommandStruct = (): T.Describe<PayConsultantPaymentCommand> => (T.type({
    consultantPaymentUserTaskId: T.number(),
    grandTotal: tSpecialOptional(T.number()),
    appliedPenaltySubTotal: tSpecialOptional(T.number()),
    taxValue: tSpecialOptional(T.number()),
    countOfAppliedPenalty: tSpecialOptional(T.number()),
}) as unknown as T.Describe<PayConsultantPaymentCommand>);

export type ConfirmConsultantPaymentCommand = {
    consultantPaymentUserTaskId: number;
};

export const ConfirmConsultantPaymentCommandStruct = (): T.Describe<ConfirmConsultantPaymentCommand> => (T.type({
    consultantPaymentUserTaskId: T.number(),
}) as unknown as T.Describe<ConfirmConsultantPaymentCommand>);

export type AdminUpdateProjectConsultantPriceCommand = {
    constructionProjectId?: number;
    pricePerMonth?: number;
};

export const AdminUpdateProjectConsultantPriceCommandStruct = (): T.Describe<AdminUpdateProjectConsultantPriceCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    pricePerMonth: tSpecialOptional(T.number()),
}) as unknown as T.Describe<AdminUpdateProjectConsultantPriceCommand>);

export type GenerateConsultantPaymentCommand = {
    constructionProjectId?: number;
    dateFrom?: string;
    dateTo?: string;
};

export const GenerateConsultantPaymentCommandStruct = (): T.Describe<GenerateConsultantPaymentCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    dateFrom: tSpecialOptional(T.string()),
    dateTo: tSpecialOptional(T.string()),
}) as unknown as T.Describe<GenerateConsultantPaymentCommand>);

export type SaveDraftResourceCommand = {
    resourceId?: number;
    resourceDraftType?: ResourceDraftType;
    resourceValue: string;
};

export const SaveDraftResourceCommandStruct = (): T.Describe<SaveDraftResourceCommand> => (T.type({
    resourceId: tSpecialOptional(T.number()),
    resourceDraftType: tSpecialOptional(ResourceDraftTypeStruct()),
    resourceValue: T.string(),
}) as unknown as T.Describe<SaveDraftResourceCommand>);

export type GetDraftResourceQuery = {
    resourceId?: number;
    resourceDraftType?: ResourceDraftType;
};

export const GetDraftResourceQueryStruct = (): T.Describe<GetDraftResourceQuery> => (T.type({
    resourceId: tSpecialOptional(T.number()),
    resourceDraftType: tSpecialOptional(ResourceDraftTypeStruct()),
}) as unknown as T.Describe<GetDraftResourceQuery>);

export type GetMaterialProgressQuery = {
    materialWorkflowSequenceId: number;
    materialUserTaskId?: number;
};

export const GetMaterialProgressQueryStruct = (): T.Describe<GetMaterialProgressQuery> => (T.type({
    materialWorkflowSequenceId: T.number(),
    materialUserTaskId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetMaterialProgressQuery>);

export type GetClientMaterialsQuery = {
    constructionProjectId?: number;
};

export const GetClientMaterialsQueryStruct = (): T.Describe<GetClientMaterialsQuery> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetClientMaterialsQuery>);

export type GetMaterialWorkflowsQuery = {
    projectId?: number;
};

export const GetMaterialWorkflowsQueryStruct = (): T.Describe<GetMaterialWorkflowsQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetMaterialWorkflowsQuery>);

export type SubmitMaterialSubmissionCommand = {
    materialUserTaskId?: number;
    isApproved?: boolean;
    description?: string;
};

export const SubmitMaterialSubmissionCommandStruct = (): T.Describe<SubmitMaterialSubmissionCommand> => (T.type({
    materialUserTaskId: tSpecialOptional(T.number()),
    isApproved: tSpecialOptional(T.boolean()),
    description: tSpecialOptional(T.string()),
}) as unknown as T.Describe<SubmitMaterialSubmissionCommand>);

export type SubmitMaterialOptionsCommand = {
    materialUserTaskId?: number;
    materialOptions: OptionDto[];
};

export const SubmitMaterialOptionsCommandStruct = (): T.Describe<SubmitMaterialOptionsCommand> => (T.type({
    materialUserTaskId: tSpecialOptional(T.number()),
    materialOptions: T.array(OptionDtoStruct()),
}) as unknown as T.Describe<SubmitMaterialOptionsCommand>);

export type SubmitSelectedOptionCommand = {
    materialUserTaskId?: number;
    selectedOptionId?: number;
};

export const SubmitSelectedOptionCommandStruct = (): T.Describe<SubmitSelectedOptionCommand> => (T.type({
    materialUserTaskId: tSpecialOptional(T.number()),
    selectedOptionId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<SubmitSelectedOptionCommand>);

export type SubmitMaterialsRequestCommand = {
    materialUserTaskId?: number;
    materialQuantities: QuantityDto[];
};

export const SubmitMaterialsRequestCommandStruct = (): T.Describe<SubmitMaterialsRequestCommand> => (T.type({
    materialUserTaskId: tSpecialOptional(T.number()),
    materialQuantities: T.array(QuantityDtoStruct()),
}) as unknown as T.Describe<SubmitMaterialsRequestCommand>);

export type SubmitPurchasedMaterialsCommand = {
    materialUserTaskId?: number;
    totalPrice?: number;
    description: string;
    attachmentsIds: string[];
};

export const SubmitPurchasedMaterialsCommandStruct = (): T.Describe<SubmitPurchasedMaterialsCommand> => (T.type({
    materialUserTaskId: tSpecialOptional(T.number()),
    totalPrice: tSpecialOptional(T.number()),
    description: T.string(),
    attachmentsIds: T.array(T.string()),
}) as unknown as T.Describe<SubmitPurchasedMaterialsCommand>);

export type SubmitCompletedWorksCommand = {
    materialUserTaskId: number;
    isApproved: boolean;
    description?: string;
};

export const SubmitCompletedWorksCommandStruct = (): T.Describe<SubmitCompletedWorksCommand> => (T.type({
    materialUserTaskId: T.number(),
    isApproved: T.boolean(),
    description: tSpecialOptional(T.string()),
}) as unknown as T.Describe<SubmitCompletedWorksCommand>);

export type SubmitSubContractedMaterialsCommand = {
    materialUserTaskId: number;
    totalPrice: number;
    subContractedName: string;
    description: string;
    attachmentsIds: string[];
};

export const SubmitSubContractedMaterialsCommandStruct = (): T.Describe<SubmitSubContractedMaterialsCommand> => (T.type({
    materialUserTaskId: T.number(),
    totalPrice: T.number(),
    subContractedName: T.string(),
    description: T.string(),
    attachmentsIds: T.array(T.string()),
}) as unknown as T.Describe<SubmitSubContractedMaterialsCommand>);

export type UpdateSubContractedMaterialCommand = {
    materialUserTaskId: number;
    totalPrice: number;
    subContractedName: string;
    description: string;
    attachmentsIds: string[];
};

export const UpdateSubContractedMaterialCommandStruct = (): T.Describe<UpdateSubContractedMaterialCommand> => (T.type({
    materialUserTaskId: T.number(),
    totalPrice: T.number(),
    subContractedName: T.string(),
    description: T.string(),
    attachmentsIds: T.array(T.string()),
}) as unknown as T.Describe<UpdateSubContractedMaterialCommand>);

export type AddExpenseCommand = {
    projectId: number;
    subContractedMaterialName: string;
    totalPrice: number;
    subContractedName: string;
    description: string;
    attachmentsIds: string[];
};

export const AddExpenseCommandStruct = (): T.Describe<AddExpenseCommand> => (T.type({
    projectId: T.number(),
    subContractedMaterialName: T.string(),
    totalPrice: T.number(),
    subContractedName: T.string(),
    description: T.string(),
    attachmentsIds: T.array(T.string()),
}) as unknown as T.Describe<AddExpenseCommand>);

export type GetListMaterialNamesQuery = {
    constructionProjectId?: number;
};

export const GetListMaterialNamesQueryStruct = (): T.Describe<GetListMaterialNamesQuery> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetListMaterialNamesQuery>);

export type StartProjectManagementModuleCommand = {
    constructionProjectId?: number;
};

export const StartProjectManagementModuleCommandStruct = (): T.Describe<StartProjectManagementModuleCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<StartProjectManagementModuleCommand>);

export type GetProjectQuery = {
    projectId?: number;
};

export const GetProjectQueryStruct = (): T.Describe<GetProjectQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetProjectQuery>);

export type GetProjectStatisticQuery = {
    projectId?: number;
};

export const GetProjectStatisticQueryStruct = (): T.Describe<GetProjectStatisticQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetProjectStatisticQuery>);

export type GetWorkflowProgressQuery = {
    workflowId: number;
    taskId?: number;
};

export const GetWorkflowProgressQueryStruct = (): T.Describe<GetWorkflowProgressQuery> => (T.type({
    workflowId: T.number(),
    taskId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetWorkflowProgressQuery>);

export type GetInvoiceDetailsQuery = {
    taskId?: number;
};

export const GetInvoiceDetailsQueryStruct = (): T.Describe<GetInvoiceDetailsQuery> => (T.type({
    taskId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetInvoiceDetailsQuery>);

export type GetStageUserTasksByIdsQuery = {
    userTaskIds: number[];
};

export const GetStageUserTasksByIdsQueryStruct = (): T.Describe<GetStageUserTasksByIdsQuery> => (T.type({
    userTaskIds: T.array(T.number()),
}) as unknown as T.Describe<GetStageUserTasksByIdsQuery>);

export type GetProjectUpdatesQuery = {
    page: number;
    pageSize: number;
    projectId: number;
    fileExtensionType: FileExtensionType;
    filter: GetProjectUpdatesFilter;
};

export const GetProjectUpdatesQueryStruct = (): T.Describe<GetProjectUpdatesQuery> => (T.type({
    page: T.number(),
    pageSize: T.number(),
    projectId: T.number(),
    fileExtensionType: FileExtensionTypeStruct(),
    filter: GetProjectUpdatesFilterStruct(),
}) as unknown as T.Describe<GetProjectUpdatesQuery>);

export type GetProjectUpdateQuery = {
    taskUpdateId?: number;
};

export const GetProjectUpdateQueryStruct = (): T.Describe<GetProjectUpdateQuery> => (T.type({
    taskUpdateId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetProjectUpdateQuery>);

export type GetStageProgressQuery = {
    stageId?: number;
};

export const GetStageProgressQueryStruct = (): T.Describe<GetStageProgressQuery> => (T.type({
    stageId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetStageProgressQuery>);

export type SubmitTaskSubmissionCommand = {
    taskSubmission: CreateTaskSubmissionDto;
};

export const SubmitTaskSubmissionCommandStruct = (): T.Describe<SubmitTaskSubmissionCommand> => (T.type({
    taskSubmission: CreateTaskSubmissionDtoStruct(),
}) as unknown as T.Describe<SubmitTaskSubmissionCommand>);

export type RejectTaskSubmissionCommand = {
    taskSubmission: CreateTaskSubmissionDto;
};

export const RejectTaskSubmissionCommandStruct = (): T.Describe<RejectTaskSubmissionCommand> => (T.type({
    taskSubmission: CreateTaskSubmissionDtoStruct(),
}) as unknown as T.Describe<RejectTaskSubmissionCommand>);

export type GetInboxTaskUpdatesQuery = {
    projectId: number;
    filter: TaskUpdateFilter;
    page?: number;
    pageSize?: number;
};

export const GetInboxTaskUpdatesQueryStruct = (): T.Describe<GetInboxTaskUpdatesQuery> => (T.type({
    projectId: T.number(),
    filter: TaskUpdateFilterStruct(),
    page: tSpecialOptional(T.number()),
    pageSize: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetInboxTaskUpdatesQuery>);

export type FlagTaskUpdateCommand = {
    taskUpdateId: number;
};

export const FlagTaskUpdateCommandStruct = (): T.Describe<FlagTaskUpdateCommand> => (T.type({
    taskUpdateId: T.number(),
}) as unknown as T.Describe<FlagTaskUpdateCommand>);

export type GetInboxTaskUpdateQuery = {
    taskUpdateId: number;
};

export const GetInboxTaskUpdateQueryStruct = (): T.Describe<GetInboxTaskUpdateQuery> => (T.type({
    taskUpdateId: T.number(),
}) as unknown as T.Describe<GetInboxTaskUpdateQuery>);

export type GetUpdateStatisticsQuery = {
    constructionProjectId?: number;
};

export const GetUpdateStatisticsQueryStruct = (): T.Describe<GetUpdateStatisticsQuery> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetUpdateStatisticsQuery>);

export type CreateObservationCommand = {
    projectId?: number;
    observations: ObservationDto[];
    isConsultantVisit?: boolean;
};

export const CreateObservationCommandStruct = (): T.Describe<CreateObservationCommand> => (T.type({
    projectId: tSpecialOptional(T.number()),
    observations: T.array(ObservationDtoStruct()),
    isConsultantVisit: tSpecialOptional(T.boolean()),
}) as unknown as T.Describe<CreateObservationCommand>);

export type GetObservationStageItemsQuery = {
    stageId?: number;
};

export const GetObservationStageItemsQueryStruct = (): T.Describe<GetObservationStageItemsQuery> => (T.type({
    stageId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetObservationStageItemsQuery>);

export type GetListStageNameQuery = {
    projectId?: number;
};

export const GetListStageNameQueryStruct = (): T.Describe<GetListStageNameQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetListStageNameQuery>);

export type ReorderStagesCommand = {
    constructionProjectId?: number;
    stageIdToReplace?: number;
    stageIdToReplaceWith?: number;
};

export const ReorderStagesCommandStruct = (): T.Describe<ReorderStagesCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    stageIdToReplace: tSpecialOptional(T.number()),
    stageIdToReplaceWith: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ReorderStagesCommand>);

export type ChangeConsultantCommand = {
    constructionProjectId?: number;
    consultantId?: number;
    dateFrom?: string;
    dateTo?: string;
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
};

export const ChangeConsultantCommandStruct = (): T.Describe<ChangeConsultantCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
    consultantId: tSpecialOptional(T.number()),
    dateFrom: tSpecialOptional(T.string()),
    dateTo: tSpecialOptional(T.string()),
    bankName: T.string(),
    accountHolderName: T.string(),
    accountNumber: T.string(),
}) as unknown as T.Describe<ChangeConsultantCommand>);

export type ResetMaterialProgressCommand = {
    constructionProjectId?: number;
};

export const ResetMaterialProgressCommandStruct = (): T.Describe<ResetMaterialProgressCommand> => (T.type({
    constructionProjectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<ResetMaterialProgressCommand>);

export type UpdateObservationActorCommand = {
    updateIds: number[];
    actorId?: number;
    actorType?: ActorType;
};

export const UpdateObservationActorCommandStruct = (): T.Describe<UpdateObservationActorCommand> => (T.type({
    updateIds: T.array(T.number()),
    actorId: tSpecialOptional(T.number()),
    actorType: tSpecialOptional(ActorTypeStruct()),
}) as unknown as T.Describe<UpdateObservationActorCommand>);

export type UpdateTaskDueDateCommand = {
    dateTime?: string;
    constructionProjectId?: number;
    taskId?: number;
};

export const UpdateTaskDueDateCommandStruct = (): T.Describe<UpdateTaskDueDateCommand> => (T.type({
    dateTime: tSpecialOptional(T.string()),
    constructionProjectId: tSpecialOptional(T.number()),
    taskId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateTaskDueDateCommand>);

export type GetTabsIndicatorQuery = {
    projectId?: number;
};

export const GetTabsIndicatorQueryStruct = (): T.Describe<GetTabsIndicatorQuery> => (T.type({
    projectId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<GetTabsIndicatorQuery>);

export type UpdateStageBaselineDatesCommand = {
    baselineStartDate?: string;
    baselineFinishDate?: string;
    constructionProjectId?: number;
    stageId?: number;
};

export const UpdateStageBaselineDatesCommandStruct = (): T.Describe<UpdateStageBaselineDatesCommand> => (T.type({
    baselineStartDate: tSpecialOptional(T.string()),
    baselineFinishDate: tSpecialOptional(T.string()),
    constructionProjectId: tSpecialOptional(T.number()),
    stageId: tSpecialOptional(T.number()),
}) as unknown as T.Describe<UpdateStageBaselineDatesCommand>);

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

export enum StageTemplatePlanStage {
    none = 0,
    mobilization = 1,
    structure = 2,
    internalFinishes = 3,
    externalFinishes = 4,
    handover = 5,
}

export const StageTemplatePlanStageStruct = () => T.enums([
    StageTemplatePlanStage.none,
    StageTemplatePlanStage.mobilization,
    StageTemplatePlanStage.structure,
    StageTemplatePlanStage.internalFinishes,
    StageTemplatePlanStage.externalFinishes,
    StageTemplatePlanStage.handover,
]);

export enum ResourceDraftType {
    none = 0,
    task = 1,
    material = 2,
}

export const ResourceDraftTypeStruct = () => T.enums([
    ResourceDraftType.none,
    ResourceDraftType.task,
    ResourceDraftType.material,
]);

export enum RateType {
    none = 0,
    squaredMeter = 1,
    rm = 2,
    no = 3,
}

export const RateTypeStruct = () => T.enums([
    RateType.none,
    RateType.squaredMeter,
    RateType.rm,
    RateType.no,
]);

export enum FileExtensionType {
    none = 0,
    image = 1,
    pdf = 2,
}

export const FileExtensionTypeStruct = () => T.enums([
    FileExtensionType.none,
    FileExtensionType.image,
    FileExtensionType.pdf,
]);

export enum TaskUpdateType {
    none = 0,
    siteObservation = 1,
    contractualNote = 2,
    risksConcerns = 3,
    generalUpdates = 4,
    messageToContractor = 5,
    messageToConsultant = 6,
    messageToClient = 7,
}

export const TaskUpdateTypeStruct = () => T.enums([
    TaskUpdateType.none,
    TaskUpdateType.siteObservation,
    TaskUpdateType.contractualNote,
    TaskUpdateType.risksConcerns,
    TaskUpdateType.generalUpdates,
    TaskUpdateType.messageToContractor,
    TaskUpdateType.messageToConsultant,
    TaskUpdateType.messageToClient,
]);

export enum TaskStatus {
    upcoming = 0,
    due = 1,
    inDelay = 2,
    completed = 3,
    pending = 4,
}

export const TaskStatusStruct = () => T.enums([
    TaskStatus.upcoming,
    TaskStatus.due,
    TaskStatus.inDelay,
    TaskStatus.completed,
    TaskStatus.pending,
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
}

export const CompanyStatusStruct = () => T.enums([
    CompanyStatus.none,
    CompanyStatus.draft,
    CompanyStatus.reviewing,
    CompanyStatus.approved,
    CompanyStatus.rejected,
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

export enum MaterialUserTaskType {
    none = 0,
    quantityRequest = 1,
    purchase = 2,
    delivery = 3,
    onSite = 4,
    provideOptions = 101,
    selectOption = 102,
    supplyNow = 201,
    confirmWork = 202,
}

export const MaterialUserTaskTypeStruct = () => T.enums([
    MaterialUserTaskType.none,
    MaterialUserTaskType.quantityRequest,
    MaterialUserTaskType.purchase,
    MaterialUserTaskType.delivery,
    MaterialUserTaskType.onSite,
    MaterialUserTaskType.provideOptions,
    MaterialUserTaskType.selectOption,
    MaterialUserTaskType.supplyNow,
    MaterialUserTaskType.confirmWork,
]);

export enum SubmitStatus {
    none = 0,
    submitted = 1,
    approved = 2,
    rejected = 3,
}

export const SubmitStatusStruct = () => T.enums([
    SubmitStatus.none,
    SubmitStatus.submitted,
    SubmitStatus.approved,
    SubmitStatus.rejected,
]);

export enum MaterialSubmissionType {
    none = 0,
    materialQuantitiesRequest = 1,
    materialsPurchased = 2,
    materialsDelivered = 3,
    confirmMaterialsOnSite = 4,
    materialOptions = 5,
    selectOption = 6,
    subContracted = 101,
    completedWork = 102,
}

export const MaterialSubmissionTypeStruct = () => T.enums([
    MaterialSubmissionType.none,
    MaterialSubmissionType.materialQuantitiesRequest,
    MaterialSubmissionType.materialsPurchased,
    MaterialSubmissionType.materialsDelivered,
    MaterialSubmissionType.confirmMaterialsOnSite,
    MaterialSubmissionType.materialOptions,
    MaterialSubmissionType.selectOption,
    MaterialSubmissionType.subContracted,
    MaterialSubmissionType.completedWork,
]);

export enum ResourceType {
    none = 0,
    taskUpdate = 1,
    materialOption = 2,
    materialQuantityRequest = 3,
    materialTaskUpdate = 4,
    observation = 5,
}

export const ResourceTypeStruct = () => T.enums([
    ResourceType.none,
    ResourceType.taskUpdate,
    ResourceType.materialOption,
    ResourceType.materialQuantityRequest,
    ResourceType.materialTaskUpdate,
    ResourceType.observation,
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

export enum MaterialWorkflowType {
    none = 0,
    clientMaterialsForContractorInstallation = 1,
    contractorMaterialsForClientApproval = 2,
    clientSubContractors = 3,
    contractorMaterials = 4,
}

export const MaterialWorkflowTypeStruct = () => T.enums([
    MaterialWorkflowType.none,
    MaterialWorkflowType.clientMaterialsForContractorInstallation,
    MaterialWorkflowType.contractorMaterialsForClientApproval,
    MaterialWorkflowType.clientSubContractors,
    MaterialWorkflowType.contractorMaterials,
]);

export enum StageStatus {
    upcoming = 0,
    currentStage = 1,
    inDelay = 2,
    completed = 3,
}

export const StageStatusStruct = () => T.enums([
    StageStatus.upcoming,
    StageStatus.currentStage,
    StageStatus.inDelay,
    StageStatus.completed,
]);

export enum PhaseType {
    none = 0,
    mobilization = 1,
    structure = 2,
    internalFinishes = 3,
    externalFinishes = 4,
    handover = 5,
}

export const PhaseTypeStruct = () => T.enums([
    PhaseType.none,
    PhaseType.mobilization,
    PhaseType.structure,
    PhaseType.internalFinishes,
    PhaseType.externalFinishes,
    PhaseType.handover,
]);

export enum ProjectStatus {
    none = 0,
    notStarted = 1,
    onTrack = 2,
    inDelay = 3,
    inMaintenance = 4,
    completed = 5,
}

export const ProjectStatusStruct = () => T.enums([
    ProjectStatus.none,
    ProjectStatus.notStarted,
    ProjectStatus.onTrack,
    ProjectStatus.inDelay,
    ProjectStatus.inMaintenance,
    ProjectStatus.completed,
]);

export const execGetAllWorkflowsQuery = restClient.encloseQuery<GetAllWorkflowsQuery, GetAllWorkflowsResponse>(
  props => T.create(props, GetAllWorkflowsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getallworkflowsquery',
    props,
  );
 },
 result => T.create(result, GetAllWorkflowsResponseStruct()),
);

export const execGetWorkflowByIdQuery = restClient.encloseQuery<GetWorkflowByIdQuery, GetWorkflowByIdResponse>(
  props => T.create(props, GetWorkflowByIdQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getworkflowbyidquery',
    props,
  );
 },
 result => T.create(result, GetWorkflowByIdResponseStruct()),
);

export const execGetWorkflowsByIds = restClient.encloseQuery<GetWorkflowsByIds, GetWorkflowsByIdsResponse>(
  props => T.create(props, GetWorkflowsByIdsStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getworkflowsbyids/{ids}',
    props,
  );
 },
 result => T.create(result, GetWorkflowsByIdsResponseStruct()),
);

export const execGetWorkflowsWithActionsQuery = restClient.encloseQuery<GetWorkflowsWithActionsQuery, GetWorkflowsWithActionsResponse>(
  props => T.create(props, GetWorkflowsWithActionsQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/getworkflowswithactionsquery',
    props,
  );
 },
 result => T.create(result, GetWorkflowsWithActionsResponseStruct()),
);

export const execGetNumberOfVisitsForWorkflowsQuery = restClient.encloseQuery<GetNumberOfVisitsForWorkflowsQuery, GetNumberOfVisitsForWorkflowsResponse>(
  props => T.create(props, GetNumberOfVisitsForWorkflowsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getnumberofvisitsforworkflowsquery',
    props,
  );
 },
 result => T.create(result, GetNumberOfVisitsForWorkflowsResponseStruct()),
);

export const execGetNumberOfActorTasksForWorkflowsQuery = restClient.encloseQuery<GetNumberOfActorTasksForWorkflowsQuery, GetNumberOfActorTasksForWorkflowsResponse>(
  props => T.create(props, GetNumberOfActorTasksForWorkflowsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getnumberofactortasksforworkflowsquery',
    props,
  );
 },
 result => T.create(result, GetNumberOfActorTasksForWorkflowsResponseStruct()),
);

export const execGetNumberOfTasksInWorkflowsQuery = restClient.encloseQuery<GetNumberOfTasksInWorkflowsQuery, { result: number; }>(
  props => T.create(props, GetNumberOfTasksInWorkflowsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getnumberoftasksinworkflowsquery',
    props,
  );
 },
 result => T.create(result, T.type({ result: T.number(), })),
);

export const execGetNumberOfTasksPerWorkflow = restClient.encloseQuery<GetNumberOfTasksPerWorkflow, GetNumberOfTasksPerWorkflowResponse>(
  props => T.create(props, GetNumberOfTasksPerWorkflowStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getnumberoftasksperworkflow',
    props,
  );
 },
 result => T.create(result, GetNumberOfTasksPerWorkflowResponseStruct()),
);

export const execSaveWorkflowActionsValuesCommand = restClient.encloseQuery<SaveWorkflowActionsValuesCommand, SaveWorkflowActionsValuesResponse>(
  props => T.create(props, SaveWorkflowActionsValuesCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/saveworkflowactionsvaluescommand',
    props,
  );
 },
 result => T.create(result, SaveWorkflowActionsValuesResponseStruct()),
);

export const execUpdateWorkflowActionDataValueCommand = restClient.encloseQuery<UpdateWorkflowActionDataValueCommand, UpdateWorkflowActionDataValueResponse>(
  props => T.create(props, UpdateWorkflowActionDataValueCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/updateworkflowactiondatavaluecommand',
    props,
  );
 },
 result => T.create(result, UpdateWorkflowActionDataValueResponseStruct()),
);

export const execStartWorkflowCommand = restClient.encloseQuery<StartWorkflowCommand, StartWorkflowResponse>(
  props => T.create(props, StartWorkflowCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/startworkflowcommand',
    props,
  );
 },
 result => T.create(result, StartWorkflowResponseStruct()),
);

export const execSeedWorkflowsCommand = restClient.encloseQuery<SeedWorkflowsCommand, BasicWorkflowResponse>(
  props => T.create(props, SeedWorkflowsCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/seedworkflowscommand',
    props,
  );
 },
 result => T.create(result, BasicWorkflowResponseStruct()),
);

export const execCloneTaskActionValuesCommand = restClient.encloseQuery<CloneTaskActionValuesCommand, EmptyResponse>(
  props => T.create(props, CloneTaskActionValuesCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/clonetaskactionvaluescommand',
    props,
  );
 },
 result => T.create(result, EmptyResponseStruct()),
);

export const execValidateStageTemplateQuery = restClient.encloseQuery<ValidateStageTemplateQuery, ValidateStageTemplateResponse>(
  props => T.create(props, ValidateStageTemplateQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/validatestagetemplatequery',
    props,
  );
 },
 result => T.create(result, ValidateStageTemplateResponseStruct()),
);

export const execCreateCommentCommand = restClient.encloseQuery<CreateCommentCommand, CreateCommentCommandResponse>(
  props => T.create(props, CreateCommentCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/createcommentcommand',
    props,
  );
 },
 result => T.create(result, CreateCommentCommandResponseStruct()),
);

export const execGetCommentsQuery = restClient.encloseQuery<GetCommentsQuery, GetCommentsQueryResponse>(
  props => T.create(props, GetCommentsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getcommentsquery',
    props,
  );
 },
 result => T.create(result, GetCommentsQueryResponseStruct()),
);

export const execGetFullConsultantPaymentQuery = restClient.encloseQuery<GetFullConsultantPaymentQuery, GetFullConsultantPaymentResponse>(
  props => T.create(props, GetFullConsultantPaymentQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getfullconsultantpaymentquery',
    props,
  );
 },
 result => T.create(result, GetFullConsultantPaymentResponseStruct()),
);

export const execListConsultantPaymentQuery = restClient.encloseQuery<ListConsultantPaymentQuery, ListConsultantPaymentResponse>(
  props => T.create(props, ListConsultantPaymentQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/listconsultantpaymentquery',
    props,
  );
 },
 result => T.create(result, ListConsultantPaymentResponseStruct()),
);

export const execPayConsultantPaymentCommand = restClient.encloseQuery<PayConsultantPaymentCommand, PayConsultantPaymentResponse>(
  props => T.create(props, PayConsultantPaymentCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/payconsultantpaymentcommand',
    props,
  );
 },
 result => T.create(result, PayConsultantPaymentResponseStruct()),
);

export const execConfirmConsultantPaymentCommand = restClient.encloseQuery<ConfirmConsultantPaymentCommand, PayConsultantPaymentResponse>(
  props => T.create(props, ConfirmConsultantPaymentCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/confirmconsultantpaymentcommand',
    props,
  );
 },
 result => T.create(result, PayConsultantPaymentResponseStruct()),
);

export const execAdminUpdateProjectConsultantPriceCommand = restClient.encloseQuery<AdminUpdateProjectConsultantPriceCommand, AdminUpdateProjectConsultantPriceResponse>(
  props => T.create(props, AdminUpdateProjectConsultantPriceCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/workflow/adminupdateprojectconsultantpricecommand',
    props,
  );
 },
 result => T.create(result, AdminUpdateProjectConsultantPriceResponseStruct()),
);

export const execGenerateConsultantPaymentCommand = restClient.encloseQuery<GenerateConsultantPaymentCommand, GenerateConsultantPaymentResponse>(
  props => T.create(props, GenerateConsultantPaymentCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/generateconsultantpaymentcommand',
    props,
  );
 },
 result => T.create(result, GenerateConsultantPaymentResponseStruct()),
);

export const execSaveDraftResourceCommand = restClient.encloseQuery<SaveDraftResourceCommand, SaveDraftResourceResponse>(
  props => T.create(props, SaveDraftResourceCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/savedraftresourcecommand',
    props,
  );
 },
 result => T.create(result, SaveDraftResourceResponseStruct()),
);

export const execGetDraftResourceQuery = restClient.encloseQuery<GetDraftResourceQuery, GetDraftResourceResponse>(
  props => T.create(props, GetDraftResourceQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getdraftresourcequery',
    props,
  );
 },
 result => T.create(result, GetDraftResourceResponseStruct()),
);

export const execGetMaterialProgressQuery = restClient.encloseQuery<GetMaterialProgressQuery, GetMaterialProgressResponse>(
  props => T.create(props, GetMaterialProgressQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getmaterialprogressquery',
    props,
  );
 },
 result => T.create(result, GetMaterialProgressResponseStruct()),
);

export const execGetClientMaterialsQuery = restClient.encloseQuery<GetClientMaterialsQuery, GetClientMaterialsResponse>(
  props => T.create(props, GetClientMaterialsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getclientmaterialsquery',
    props,
  );
 },
 result => T.create(result, GetClientMaterialsResponseStruct()),
);

export const execGetMaterialWorkflowsQuery = restClient.encloseQuery<GetMaterialWorkflowsQuery, GetMaterialWorkflowsResponse>(
  props => T.create(props, GetMaterialWorkflowsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getmaterialworkflowsquery',
    props,
  );
 },
 result => T.create(result, GetMaterialWorkflowsResponseStruct()),
);

export const execSubmitMaterialSubmissionCommand = restClient.encloseQuery<SubmitMaterialSubmissionCommand, MaterialProgressResponse>(
  props => T.create(props, SubmitMaterialSubmissionCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/submitmaterialsubmissioncommand',
    props,
  );
 },
 result => T.create(result, MaterialProgressResponseStruct()),
);

export const execSubmitMaterialOptionsCommand = restClient.encloseQuery<SubmitMaterialOptionsCommand, MaterialProgressResponse>(
  props => T.create(props, SubmitMaterialOptionsCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/submitmaterialoptionscommand',
    props,
  );
 },
 result => T.create(result, MaterialProgressResponseStruct()),
);

export const execSubmitSelectedOptionCommand = restClient.encloseQuery<SubmitSelectedOptionCommand, MaterialProgressResponse>(
  props => T.create(props, SubmitSelectedOptionCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/submitselectedoptioncommand',
    props,
  );
 },
 result => T.create(result, MaterialProgressResponseStruct()),
);

export const execSubmitMaterialsRequestCommand = restClient.encloseQuery<SubmitMaterialsRequestCommand, MaterialProgressResponse>(
  props => T.create(props, SubmitMaterialsRequestCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/submitmaterialsrequestcommand',
    props,
  );
 },
 result => T.create(result, MaterialProgressResponseStruct()),
);

export const execSubmitPurchasedMaterialsCommand = restClient.encloseQuery<SubmitPurchasedMaterialsCommand, MaterialProgressResponse>(
  props => T.create(props, SubmitPurchasedMaterialsCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/submitpurchasedmaterialscommand',
    props,
  );
 },
 result => T.create(result, MaterialProgressResponseStruct()),
);

export const execSubmitCompletedWorksCommand = restClient.encloseQuery<SubmitCompletedWorksCommand, MaterialProgressResponse>(
  props => T.create(props, SubmitCompletedWorksCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/submitcompletedworkscommand',
    props,
  );
 },
 result => T.create(result, MaterialProgressResponseStruct()),
);

export const execSubmitSubContractedMaterialsCommand = restClient.encloseQuery<SubmitSubContractedMaterialsCommand, MaterialProgressResponse>(
  props => T.create(props, SubmitSubContractedMaterialsCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/submitsubcontractedmaterialscommand',
    props,
  );
 },
 result => T.create(result, MaterialProgressResponseStruct()),
);

export const execUpdateSubContractedMaterialCommand = restClient.encloseQuery<UpdateSubContractedMaterialCommand, MaterialProgressResponse>(
  props => T.create(props, UpdateSubContractedMaterialCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/workflow/updatesubcontractedmaterialcommand',
    props,
  );
 },
 result => T.create(result, MaterialProgressResponseStruct()),
);

export const execAddExpenseCommand = restClient.encloseQuery<AddExpenseCommand, AddExpenseResponse>(
  props => T.create(props, AddExpenseCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/addexpensecommand',
    props,
  );
 },
 result => T.create(result, AddExpenseResponseStruct()),
);

export const execGetListMaterialNamesQuery = restClient.encloseQuery<GetListMaterialNamesQuery, GetListMaterialNamesResponse>(
  props => T.create(props, GetListMaterialNamesQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getlistmaterialnamesquery',
    props,
  );
 },
 result => T.create(result, GetListMaterialNamesResponseStruct()),
);

export const execStartProjectManagementModuleCommand = restClient.encloseQuery<StartProjectManagementModuleCommand, StartProjectManagementModuleResponse>(
  props => T.create(props, StartProjectManagementModuleCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/startprojectmanagementmodulecommand',
    props,
  );
 },
 result => T.create(result, StartProjectManagementModuleResponseStruct()),
);

export const execGetProjectQuery = restClient.encloseQuery<GetProjectQuery, GetProjectResponse>(
  props => T.create(props, GetProjectQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getprojectquery',
    props,
  );
 },
 result => T.create(result, GetProjectResponseStruct()),
);

export const execGetProjectStatisticQuery = restClient.encloseQuery<GetProjectStatisticQuery, GetProjectStatisticResponse>(
  props => T.create(props, GetProjectStatisticQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getprojectstatisticquery',
    props,
  );
 },
 result => T.create(result, GetProjectStatisticResponseStruct()),
);

export const execGetWorkflowProgressQuery = restClient.encloseQuery<GetWorkflowProgressQuery, GetWorkflowProgressResponse>(
  props => T.create(props, GetWorkflowProgressQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getworkflowprogressquery',
    props,
  );
 },
 result => T.create(result, GetWorkflowProgressResponseStruct()),
);

export const execGetInvoiceDetailsQuery = restClient.encloseQuery<GetInvoiceDetailsQuery, GetInvoiceDetailsQueryResponse>(
  props => T.create(props, GetInvoiceDetailsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getinvoicedetailsquery',
    props,
  );
 },
 result => T.create(result, GetInvoiceDetailsQueryResponseStruct()),
);

export const execGetStageUserTasksByIdsQuery = restClient.encloseQuery<GetStageUserTasksByIdsQuery, GetStageUserTasksByIdsResponse>(
  props => T.create(props, GetStageUserTasksByIdsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getstageusertasksbyidsquery',
    props,
  );
 },
 result => T.create(result, GetStageUserTasksByIdsResponseStruct()),
);

export const execGetProjectUpdatesQuery = restClient.encloseQuery<GetProjectUpdatesQuery, GetProjectUpdatesResponse>(
  props => T.create(props, GetProjectUpdatesQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/getprojectupdatesquery',
    props,
  );
 },
 result => T.create(result, GetProjectUpdatesResponseStruct()),
);

export const execGetProjectUpdateQuery = restClient.encloseQuery<GetProjectUpdateQuery, GetProjectUpdateResponse>(
  props => T.create(props, GetProjectUpdateQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getprojectupdatequery',
    props,
  );
 },
 result => T.create(result, GetProjectUpdateResponseStruct()),
);

export const execGetStageProgressQuery = restClient.encloseQuery<GetStageProgressQuery, GetStageProgressResponse>(
  props => T.create(props, GetStageProgressQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getstageprogressquery',
    props,
  );
 },
 result => T.create(result, GetStageProgressResponseStruct()),
);

export const execSubmitTaskSubmissionCommand = restClient.encloseQuery<SubmitTaskSubmissionCommand, BaseProjectManagementResponse>(
  props => T.create(props, SubmitTaskSubmissionCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/submittasksubmissioncommand',
    props,
  );
 },
 result => T.create(result, BaseProjectManagementResponseStruct()),
);

export const execRejectTaskSubmissionCommand = restClient.encloseQuery<RejectTaskSubmissionCommand, BaseProjectManagementResponse>(
  props => T.create(props, RejectTaskSubmissionCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/rejecttasksubmissioncommand',
    props,
  );
 },
 result => T.create(result, BaseProjectManagementResponseStruct()),
);

export const execGetInboxTaskUpdatesQuery = restClient.encloseQuery<GetInboxTaskUpdatesQuery, GetInboxTaskUpdatesResponse>(
  props => T.create(props, GetInboxTaskUpdatesQueryStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/getinboxtaskupdatesquery',
    props,
  );
 },
 result => T.create(result, GetInboxTaskUpdatesResponseStruct()),
);

export const execFlagTaskUpdateCommand = restClient.encloseQuery<FlagTaskUpdateCommand, FLagTaskUpdateResponse>(
  props => T.create(props, FlagTaskUpdateCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/flagtaskupdatecommand',
    props,
  );
 },
 result => T.create(result, FLagTaskUpdateResponseStruct()),
);

export const execGetInboxTaskUpdateQuery = restClient.encloseQuery<GetInboxTaskUpdateQuery, GetInboxTaskUpdateResponse>(
  props => T.create(props, GetInboxTaskUpdateQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getinboxtaskupdatequery',
    props,
  );
 },
 result => T.create(result, GetInboxTaskUpdateResponseStruct()),
);

export const execGetUpdateStatisticsQuery = restClient.encloseQuery<GetUpdateStatisticsQuery, GetUpdateStatisticsResponse>(
  props => T.create(props, GetUpdateStatisticsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getupdatestatisticsquery',
    props,
  );
 },
 result => T.create(result, GetUpdateStatisticsResponseStruct()),
);

export const execCreateObservationCommand = restClient.encloseQuery<CreateObservationCommand, CreateObservationResponse>(
  props => T.create(props, CreateObservationCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/createobservationcommand',
    props,
  );
 },
 result => T.create(result, CreateObservationResponseStruct()),
);

export const execGetObservationStageItemsQuery = restClient.encloseQuery<GetObservationStageItemsQuery, GetObservationStageItemsResponse>(
  props => T.create(props, GetObservationStageItemsQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getobservationstageitemsquery',
    props,
  );
 },
 result => T.create(result, GetObservationStageItemsResponseStruct()),
);

export const execGetListStageNameQuery = restClient.encloseQuery<GetListStageNameQuery, GetListStageNameResponse>(
  props => T.create(props, GetListStageNameQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/getliststagenamequery',
    props,
  );
 },
 result => T.create(result, GetListStageNameResponseStruct()),
);

export const execReorderStagesCommand = restClient.encloseQuery<ReorderStagesCommand, ReorderStagesResponse>(
  props => T.create(props, ReorderStagesCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/workflow/reorderstagescommand',
    props,
  );
 },
 result => T.create(result, ReorderStagesResponseStruct()),
);

export const execChangeConsultantCommand = restClient.encloseQuery<ChangeConsultantCommand, ChangeConsultantResponse>(
  props => T.create(props, ChangeConsultantCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/workflow/changeconsultantcommand',
    props,
  );
 },
 result => T.create(result, ChangeConsultantResponseStruct()),
);

export const execResetMaterialProgressCommand = restClient.encloseQuery<ResetMaterialProgressCommand, ResetMaterialProgressResponse>(
  props => T.create(props, ResetMaterialProgressCommandStruct()),
  async props => {
  return await restClient.execute(
    'post',
    '/workflow/resetmaterialprogresscommand',
    props,
  );
 },
 result => T.create(result, ResetMaterialProgressResponseStruct()),
);

export const execUpdateObservationActorCommand = restClient.encloseQuery<UpdateObservationActorCommand, UpdateObservationActorResponse>(
  props => T.create(props, UpdateObservationActorCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/workflow/updateobservationactorcommand',
    props,
  );
 },
 result => T.create(result, UpdateObservationActorResponseStruct()),
);

export const execUpdateTaskDueDateCommand = restClient.encloseQuery<UpdateTaskDueDateCommand, UpdateTaskDueDateResponse>(
  props => T.create(props, UpdateTaskDueDateCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/workflow/updatetaskduedatecommand',
    props,
  );
 },
 result => T.create(result, UpdateTaskDueDateResponseStruct()),
);

export const execGetTabsIndicatorQuery = restClient.encloseQuery<GetTabsIndicatorQuery, GetTabsIndicatorResponse>(
  props => T.create(props, GetTabsIndicatorQueryStruct()),
  async props => {
  return await restClient.execute(
    'get',
    '/workflow/gettabsindicatorquery',
    props,
  );
 },
 result => T.create(result, GetTabsIndicatorResponseStruct()),
);

export const execUpdateStageBaselineDatesCommand = restClient.encloseQuery<UpdateStageBaselineDatesCommand, UpdateStageBaselineDatesResponse>(
  props => T.create(props, UpdateStageBaselineDatesCommandStruct()),
  async props => {
  return await restClient.execute(
    'put',
    '/workflow/updatestagebaselinedatescommand',
    props,
  );
 },
 result => T.create(result, UpdateStageBaselineDatesResponseStruct()),
);
