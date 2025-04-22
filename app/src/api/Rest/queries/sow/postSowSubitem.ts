import { dtos, Id, Mobx, restQuery } from '~/api';
import type { SowSubitem } from '~/models';
import { toFloat } from '~/utils/string';

export const postSowSubitem = async (subitem: SowSubitem) => {
    if (subitem.sowItemId.isType('internal')) {
        return false;
    }

    const data: dtos.construction.CreateSowItemUnitCommand = {
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

    const res = await dtos.construction.execCreateSowItemUnitCommand(data);

    if (!res) {
        return false;
    }

    await restQuery.workflow.saveWorkflowActionsValues(subitem.workflow);
    subitem.workflow.sowSubItemId.set(res.id, 'external');
    await subitem.workflow.commit();

    return Mobx.extendsObservable(subitem, {
        id: Id.init(res.id, 'external'),
        isChanged: false,
    });
};
