import { dtos, restQuery } from '~/api';
import type { SubContractorLocalType } from '~/models';
import { toInternalClientSubContractor } from '../models';

export const addExpense = async (material: SubContractorLocalType) => {
    const response = await dtos.workflow.execAddExpenseCommand({
        projectId: material.projectId,
        subContractedMaterialName: material.subContractedMaterialName,
        totalPrice: material.totalPrice,
        subContractedName: material.subContractedName,
        description: material.description,
        attachmentsIds: await restQuery.file.add(material.attachments),
    });

    if (!response || !response.result) {
        return;
    }

    return toInternalClientSubContractor(response.result);
};
