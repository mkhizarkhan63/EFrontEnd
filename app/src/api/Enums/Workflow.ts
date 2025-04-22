export enum WorkflowActorType {
    none = 'none',
    client = 'client',
    contractor = 'contractor',
    consultant = 'consultant',
    supplier = 'supplier',
}

export enum ResourceTypeMaterial {
    none = 'none',
    taskUpdate = 'taskUpdate',
    materialOption = 'materialOption',
    materialQuantityRequest = 'materialQuantityRequest',
    materialTaskUpdate = 'materialTaskUpdate',
}

export enum ActionType {
    none = 'none',
    empty = 'empty',
    datePicker = 'datePicker',
    checklist = 'checkList',
    payment = 'payment',
}

export enum TaskUpdateType {
    none = 'none',
    siteObservation = 'siteObservation',
    contractualNote = 'contractualNote',
    risksConcerns = 'risksConcerns',
    generalUpdates = 'generalUpdates',
    messageToContractor = 'messageToContractor',
    messageToConsultant = 'messageToConsultant',
    messageToClient = 'messageToClient',
}

export enum SubmitStatus {
    none = 'none',
    submitted = 'submitted',
    approved = 'approved',
    rejected = 'rejected',
}

export enum MaterialUserTaskType {
    none = 'none',
    quantityRequest = 'quantityRequest',
    purchase = 'purchase',
    delivery = 'delivery',
    onSite = 'onSite',
    provideOptions = 'provideOptions',
    selectOption = 'selectOption',
    supplyNow = 'supplyNow',
    confirmWork = 'confirmWork',
}

export enum RateType {
    none = 'none',
    squaredMeter = 'squaredMeter',
    rm = 'rm',
    no = 'no',
}
