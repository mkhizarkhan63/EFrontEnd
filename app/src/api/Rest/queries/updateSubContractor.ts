import { dtos, restQuery } from '~/api';
import type { SubContractorLocalType } from '~/models';
import { toInternalMaterialProgress } from '../models';

export const updateSubContractor = async (material: SubContractorLocalType) => {
    const response = await dtos.workflow.execSubmitSubContractedMaterialsCommand({
        materialUserTaskId: material.materialUserTaskId,
        totalPrice: material.totalPrice,
        subContractedName: material.subContractedName,
        description: material.description,
        attachmentsIds: await restQuery.file.add(material.attachments),
    });

    if (!response || !response.result) {
        return false;
    }

    return toInternalMaterialProgress(response.result);
};
