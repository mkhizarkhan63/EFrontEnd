export enum ProjectStatus {
    none = 'none',
    draft = 'draft',
    reviewing = 'reviewing',
    rejected = 'rejected',
    openBids = 'openBids',
    chooseContractor = 'chooseContractor',
    readyToSign = 'readyToSign',
    signed = 'signed',
    liveInPm = 'liveInPm',
    archived = 'archived',
    uploadDrawings = 'uploadDrawings',
}

export enum ProjectRoute {
    new = 'new',
    exists = 'exists',
}

export enum ProjectStatusConsultant {
    invited = 'invited',
    signingUp = 'signingUp',
    live = 'live',
}

export enum ProjectStartingStep {
    none = 'none',
    design = 'design',
    build = 'build',
}

export enum ProjectStep {
    first = 'first',
    second = 'second',
    third = 'third',
    fourth = 'fourth',
}

export enum ConsultantProjectType {
    acceptSupervision = 'acceptSupervision',
    waitingSupervision = 'waitingSupervision',
    acceptDesign = 'acceptDesign',
    submitDrawings = 'submitDrawings',
    waitingDesign = 'waitingDesign',
    closedDesign = 'closedDesign',
    rejectedDesign = 'rejectedDesign',
    none = 'none',
}

export enum InvitationStatus {
    none = 'none',
    active = 'active',
    declined = 'declined',
    approved = 'approved',
}

export enum InvitationType {
    none = 'none',
    design = 'design',
    supervision = 'supervision',
    bid = 'bid',
}

export enum BidClosingDateOption {
    none = 0,
    addWeek = 1,
    endBiddingTime = 2,
}

export enum ProjectMenu {
    contractor = 'contractor',
    consultant = 'consultant',
    insurance = 'insurance',
    bank = 'bank',
}
