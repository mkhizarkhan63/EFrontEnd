import { dtos } from '..';

export const setTaskUpdateFlag = async (taskUpdateId: number) => await dtos.workflow
    .execFlagTaskUpdateCommand({
        taskUpdateId,
    });
