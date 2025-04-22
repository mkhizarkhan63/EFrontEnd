import { Id, Mobx, type dtos } from '~/api';
import { SowSubitem } from '~/models';

type InternalSowSubitemProp =
    | dtos.contract.ContractSowItemUnitDto
    | dtos.construction.SowItemUnitDto;

export const toInternalSowSubitem = (x: InternalSowSubitemProp) => {
    const sowSubitem = new SowSubitem();

    Mobx.extendsObservable(sowSubitem, {
        id: Id.init(x.id, 'external'),
        sowItemId: Id.tryInit(x.itemId, 'external'),
        rate: x.rate?.toString(),
        supplier: x.supplier,
        orderNumber: x.orderNumber,
        titleArabic: x.titleArabic,
        titleEnglish: x.titleEnglish,
        arabicDescription: x.arabicDescription,
        englishDescription: x.englishDescription,
    });

    if ('acceptanceWorkflowName' in x) {
        Mobx.extendsObservable(sowSubitem, {
            acceptanceWorkflowName: x.acceptanceWorkflowName,
        });
    }

    if (x.acceptanceWorkflow) {
        sowSubitem.workflow.typeId.set(x.acceptanceWorkflow, 'external');
    } else {
        sowSubitem.workflow.typeId.clear();
    }

    sowSubitem.workflow.sowSubItemId.set(x.id, 'external');

    return sowSubitem;
};
