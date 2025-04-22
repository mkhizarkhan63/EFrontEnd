import { dtos, restQuery } from '~/api';
import type { SubContractorLocalType } from '~/models';
import { toInternalMaterialProgress } from '../models';

export const updatePrivateExpense = async (material: SubContractorLocalType) => {
    const response = await dtos.workflow.execUpdateSubContractedMaterialCommand({
        materialUserTaskId: material.materialUserTaskId,
        totalPrice: material.totalPrice,
        subContractedName: material.subContractedName,
        description: material.description,
        attachmentsIds: await restQuery.file.add(material.attachments),
    });

    if (!response || !response.result) {
        return;
    }

    return toInternalMaterialProgress(response.result);
};
