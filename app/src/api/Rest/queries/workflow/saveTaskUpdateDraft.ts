import { T, dtos, enums, restQuery, type E } from '~/api';
import { type MaterialOptionType, type WorkflowProgressType } from '~/models';

export const saveTaskUpdateDraft = async (
    type: E.TaskUpdateDraft,
    workflow?: WorkflowProgressType | MaterialOptionType[],
    resourceId?: number,
) => {
    if (!workflow) {
        return;
    }

    if ('localUpdateDtos' in workflow) {
        const convertToJson = await Promise.all(workflow.localUpdates.map(async item => ({
            description: item.description,
            type: item.type,
            attachments: await restQuery.file.add(item.attachments),
        })));

        const response = await dtos.workflow.execSaveDraftResourceCommand({
            resourceId: workflow.currentTask.externalId,
            resourceDraftType: T.create(
                type,
                enums.TaskUpdateDraft.castToExternal,
            ),
            resourceValue: JSON.stringify(convertToJson),
        });

        if (!response) {
            return;
        }

        return true;
    }

    const convertToJson = await Promise.all(workflow.map(async item => ({
        supplier: item.supplier,
        rates: item.rates,
        description: item.description,
        totalValue: item.totalValue,
        attachments: await restQuery.file.add(item.attachments),
    })));

    const response = await dtos.workflow.execSaveDraftResourceCommand({
        resourceId,
        resourceDraftType: T.create(
            type,
            enums.TaskUpdateDraft.castToExternal,
        ),
        resourceValue: JSON.stringify(convertToJson),
    });

    if (!response) {
        return;
    }

    return true;

};
