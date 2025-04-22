import { T, dtos, enums, restQuery } from '~/api';
import { type MaterialOptionType } from '~/models/PmModels/MaterialOption';

export const submitMaterialOptions = async (materialUserTaskId: number, materialOptions: MaterialOptionType[]) => {
    const externalOptions = await Promise.all(materialOptions.map(async item => ({
        supplier: item.supplier,
        rates: item.rates,
        totalValue: item.totalValue,
        rateType: T.create(
            item.rateType,
            enums.RateType.castToExternal,
        ),
        description: item.description,
        attachmentIds: await restQuery.file.add(item.attachments),
    })));

    const res = await dtos.workflow.execSubmitMaterialOptionsCommand({
        materialUserTaskId,
        materialOptions: externalOptions,
    });

    if (!res) {
        return false;
    }

    return true;
};
