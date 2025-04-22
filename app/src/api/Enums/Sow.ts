export enum SowAndStageStatus {
    none = 'none',
    drafted = 'drafted',
    live = 'live',
    inactive = 'inactive',
}

export enum SowItemResponsibility {
    none = 'none',
    itemsSuppliedAndInstalledByContractor = 'itemsSuppliedAndInstalledByContractor',
    itemsSuppliedByClientAndInstalledByContractor = 'itemsSuppliedByClientAndInstalledByContractor',
    itemsSuppliedAndInstalledByClient = 'itemsSuppliedAndInstalledByClient',
}

export enum SowItemCategory {
    none = 'none',
    contractorStructuralMepMaterials = 'contractorStructuralMepMaterials',
    clientSubcontractedScopeAndMaterials = 'clientSubcontractedScopeAndMaterials',
    clientMaterialsForContractorInstallation = 'clientMaterialsForContractorInstallation',
    clientMaterialsInstalledByEither = 'clientMaterialsInstalledByEither',
    payment = 'payment',
    notApplicable = 'notApplicable',
}

export enum WorkflowActionType {
    none = 'none',
    empty = 'empty',
    datePicker = 'datePicker',
    checklist = 'checklist',
    payment = 'payment',
}

export enum SowItemVisibility {
    none = 'none',
    masterItem = 'masterItem',
    hidden = 'hidden',
}

export enum SowItemChangeStatus {
    none = 'none',
    unchanged = 'unchanged',
    changed = 'changed',
    removed = 'removed',
}
