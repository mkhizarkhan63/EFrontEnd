import { dtos, Mobx, restQuery } from '~/api';
import type { SowSubitem } from '~/models';
import { toFloat } from '~/utils/string';

export const updateSowSubitem = async (subitem: SowSubitem, sowId?: number) => {
    if (subitem.id.isType('internal') || subitem.sowItemId.isType('internal')) {
        return false;
    }

    const data: dtos.construction.UpdateSowItemUnitCommand = {
        id: subitem.id.asNumber(),
        itemId: subitem.sowItemId.asNumber(),
        titleEnglish: subitem.titleEnglish,
        englishDescription: subitem.englishDescription,
        titleArabic: subitem.titleArabic,
        arabicDescription: subitem.arabicDescription,
        supplier: subitem.supplier,
        rate: toFloat(subitem.rate, 3),
        orderNumber: subitem.orderNumber,
        acceptanceWorkflow: subitem.workflow.typeId.asNumber(),
    };

    const res = await dtos.construction.execUpdateSowItemUnitCommand(data);

    if (!res) {
        return false;
    }

    Mobx.extendsObservable(subitem, {
        isChanged: false,
    });

    if (!sowId) {
        return;
    }

    await restQuery.workflow.saveWorkflowActionsValues(subitem.workflow);

    return subitem;
};
