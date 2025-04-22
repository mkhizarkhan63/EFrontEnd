import { dtos, enums, T } from '~/api';
import type { SowItem, SowSubitem } from '~/models';
import { file } from '..';
import { toFloat } from '~/utils/string';

export const postSowItem = async (sowItem: SowItem) => {
    if (sowItem.forConstruction.sowId.isType('internal')) {
        return false;
    }

    const externalSowItem: dtos.construction.CreateSowItemCommand = {
        englishName: sowItem.englishName,
        arabicName: sowItem.arabicName,
        showItemInFrontend: sowItem.forConstruction.showItemInFrontend,
        isMandatory: sowItem.forConstruction.showItemInFrontend,
        numberOfSpecs: sowItem.numberOfSpecs,
        numberOfWorkflows: sowItem.numberOfWorkflows,
        consultantVisits: sowItem.consultantVisits,
        versionId: sowItem.forConstruction.sowId.asNumber(),
        category: T.create(
            sowItem.category,
            enums.sowItemCategory.castToExternal,
        ),
        itemUnits: toExternalItemUnits(sowItem.forConstruction.sowSubItems),
    };

    if (sowItem.logo?.file) {
        const fileId = await file.add([sowItem.logo]);
        externalSowItem.iconFileId = fileId[0];
    }

    const res = await dtos.construction.execCreateSowItemCommand(externalSowItem);

    if (!res || !res.result) {
        return false;
    }

    return res.result.id;
};

export const toExternalItemUnits = (items: SowSubitem[]) => items.flatMap(item => {
    const unitId = item.id.isType('external') ? item.id.asNumber() : 0;
    const type = item.workflow.type;

    const tasks = type?.tasks.map(t => ({
        ...t,
        actorType: T.create(t.actorType, enums.WorkflowActorType.castToExternal),
        actionType: T.create(t.actionType, enums.WorkflowActionType.castToExternal),
        actionValue: item.workflow.getStrignifyData(t.id),
    }));

    const actionModel = tasks && item.workflow.isChanged
        ? {
            taskActionModel: {
                workflowId: item.workflow.typeId.asNumber(),
                sowSubItemActions: [
                    {
                        sowSubItemId: item.workflow.sowSubItemId.asNumber(),
                        workflowTaskDtos: tasks,
                    },
                ],
            },
        }
        : {};

    const rate = item.rate.length > 0
        ? {
            rate: toFloat(item.rate, 3),
        }
        : {};

    return {
        id: unitId,
        titleEnglish: item.titleEnglish,
        englishDescription: item.englishDescription,
        titleArabic: item.titleArabic,
        arabicDescription: item.arabicDescription,
        supplier: item.supplier,
        orderNumber: item.orderNumber,
        acceptanceWorkflow: item.workflow.typeId.asNumber(),
        acceptanceWorkflowName: item.workflow.name,
        ...actionModel,
        ...rate,
    };
});
