export enum MaterialType {
    none = 'none',
    clientSubContractorMaterials = 'clientSubContractorMaterials',
    clientMaterialsForContractorInstallation = 'clientMaterialsForContractorInstallation',
    contractorMaterialsForClientApproval = 'contractorMaterialsForClientApproval',
    contractorMaterials = 'contractorMaterials',
}

export enum SubContractorMaterialStatus {
    none = 'none',
    pending = 'pending',
    delay = 'delay',
    completed = 'completed',
}
