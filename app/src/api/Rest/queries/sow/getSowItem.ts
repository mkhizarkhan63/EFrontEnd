import { dtos, enums, Img, models, T } from '~/api';
import { PmSowItem, SowItemUnit } from '~/models';
import { stores } from '~/stores';

export const getSowItem = async (sowItemId: number) => {
    const response = await dtos.construction.execGetSowItemQuery({
        id: sowItemId,
    });

    if (!response || !response.result) {
        return false;
    }

    return models.sowItem.toInternalSowItem(response.result);
};

export const getPmSowItem = async (sowItemId: number) => {
    const response = await dtos.construction.execGetSowItemQuery({
        id: sowItemId,
    });

    if (!response || !response.result) {
        return false;
    }

    const { result } = response;

    return PmSowItem.create({
        id: stores.idCollection.getInternal('sowItemDto', result.id),
        orderNumber: result.orderNumber,
        englishName: result.englishName,
        arabicName: result.arabicName,
        showItemInFrontend: result.showItemInFrontend,
        isMandatory: result.isMandatory,
        numberOfSpecs: result.numberOfSpecs,
        numberOfWorkflows: result.numberOfWorkflows,
        consultantVisits: result.consultantVisits,
        icon: Img.tryCreate(result.iconFileId),
        category: T.create(
            result.category,
            enums.PmSowItemCategory.castToInternal,
        ),
        versionId: result.versionId,
        itemUnits: result.itemUnits ? toInternalItemUnits(result.itemUnits) : [],
    });
};

export const toInternalItemUnits = (itemUnits: dtos.construction.SowItemUnitDto[]) => {
    if (!itemUnits) {
        return [];
    }

    return itemUnits.map(item => SowItemUnit.create({
        id: stores.idCollection.getInternal('sowItemUnit', item.id),
        englishDescription: item.englishDescription,
        arabicDescription: item.arabicDescription,
        titleEnglish: item.titleEnglish,
        titleArabic: item.titleArabic,
        supplier: item.supplier,
        rate: item.rate,
        acceptanceWorkflow: item.acceptanceWorkflow,
        itemId: item.itemId,
        orderNumber: item.orderNumber,
    }));
};
