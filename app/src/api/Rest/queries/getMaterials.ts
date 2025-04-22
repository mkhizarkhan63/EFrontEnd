import { dtos } from '~/api';
import { PmMaterial } from '~/models/PmModels/PmMaterial';
import { toInternalClientSubContractor, toInternalMaterialList, toInternalPmSowItem } from '../models';

export const getMaterials = async (projectId: number) => {
    const response = await dtos.workflow.execGetMaterialWorkflowsQuery({
        projectId,
    });

    if (!response) {
        return;
    }

    const {
        clientSubContractorItems,
        clientMaterialsForContractorInstallationItems,
        contractorMaterialsForClientApprovalItems,
        contractorMaterials,
    } = response;

    return PmMaterial.create({
        clientSubcontractors: clientSubContractorItems.map(toInternalClientSubContractor),
        clientForContractorInstallations: clientMaterialsForContractorInstallationItems.map(toInternalMaterialList),
        contractorForClientApprovals: contractorMaterialsForClientApprovalItems.map(toInternalMaterialList),
        contractor: contractorMaterials?.map(toInternalPmSowItem),
    });
};
