import { enums, dtos, T } from '~/api';
import type { SowItem } from '~/models';
import { toExternalItemUnits } from '.';
import { file } from '..';

export const updateSowItem = async (sowItem: SowItem) => {
    if (sowItem.id.isType('internal') || sowItem.forConstruction.sowId.isType('internal')) {
        return false;
    }

    const externalSowItem: dtos.construction.UpdateSowItemCommand = {
        arabicName: sowItem.arabicName,
        englishName: sowItem.englishName,
        numberOfSpecs: sowItem.numberOfSpecs,
        consultantVisits: sowItem.consultantVisits,
        numberOfWorkflows: sowItem.numberOfWorkflows,
        showItemInFrontend: sowItem.forConstruction.showItemInFrontend,
        isMandatory: sowItem.forConstruction.isMandatory,
        versionId: sowItem.forConstruction.sowId.asNumber(),
        id: sowItem.id.asNumber(),
        iconFileId: sowItem.logo?.fileId,
        category: T.create(
            sowItem.category,
            enums.sowItemCategory.castToExternal,
        ),
        itemUnits: toExternalItemUnits(sowItem.forConstruction.sowSubItems),
    };

    if (sowItem.logo) {
        if (!sowItem.logo.isExternal || !sowItem.logo.img) {
            await file.deleteId(sowItem.logo.fileId ?? '');
            externalSowItem.iconFileId = undefined;
        }

        if (sowItem.logo.file) {
            const fileId = await file.add([sowItem.logo]);
            externalSowItem.iconFileId = fileId[0];
        }
    }

    const res = await dtos.construction.execUpdateSowItemCommand(
        externalSowItem,
    );

    if (!res) {
        return false;
    }

    return sowItem.id;
};

