import type { FileDataType } from '~/models';
import { dtos, restQuery, models } from '~/api';

export const addSubmitPurchase = async (
    materialUserTaskId: number,
    totalPrice: number,
    description: string,
    attachments: FileDataType[],
) => {
    const response = await dtos.workflow.execSubmitPurchasedMaterialsCommand({
        materialUserTaskId,
        totalPrice,
        description,
        attachmentsIds: await restQuery.file.add(attachments),
    });

    if (!response) {
        return false;
    }

    return models.toInternalMaterialProgress(response.result);
};
