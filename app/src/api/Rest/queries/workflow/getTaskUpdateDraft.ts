import { T, dtos, enums, type E } from '~/api';

export const getTaskUpdateDraft = async (type: E.TaskUpdateDraft, resourceId?: number) => {
    const response = await dtos.workflow.execGetDraftResourceQuery({
        resourceId,
        resourceDraftType: T.create(
            type,
            enums.TaskUpdateDraft.castToExternal,
        ),
    });

    if (!response || !response.result.resourceValue) {
        return;
    }

    return response.result.resourceValue;
};
