import { T, dtos, enums, restQuery, models } from '~/api';
import type { MaterialProgressType } from '~/models/PmModels/MaterialProgress';

export const addSubmitMaterialsRequests = async (materialProgress: MaterialProgressType) => {
    const response = await dtos.workflow.execSubmitMaterialsRequestCommand({
        materialUserTaskId: materialProgress.currentTask.materialUserTaskId,
        materialQuantities: await Promise.all(materialProgress.localMaterialQuantities
            .map(async item => ({
                itemName: item.itemName,
                quantity: item.quantity,
                rateType: T.create(
                    item.rateType,
                    enums.RateType.castToExternal,
                ),
                description: item.description,
                attachmentIds: await restQuery.file.add(item.attachments),
            }))),
    });

    if (!response) {
        return false;
    }

    return models.toInternalMaterialProgress(response.result);
};
