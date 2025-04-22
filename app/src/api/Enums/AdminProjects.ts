export enum AdminProjectsPages {
    details = 'details',
    notes = 'notes',
    log = 'log',
    bids = 'bids',
    bidsQuestions = 'bidsQuestions',
    contract = 'contract',
}

export enum AdminProjectsDesignPages {
    details = 'details',
    notes = 'notes',
    log = 'log',
    documents = 'documents',
}

export enum AdminAccountType {
    admin = 'admin',
    consultant = 'consultant',
    client = 'client',
    superAdmin = 'superAdmin',
}

export enum AdminProjectLevels {
    groundFloor = 'groundFloor',
    levellingFloor = 'levellingFloor',
    penthouseFloor = 'penthouseFloor',
    pool = 'pool',
}

export enum AdminProjectAssignTo {
    none = 0,
    all = 1,
    selected = 2,
}
