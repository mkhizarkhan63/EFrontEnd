import { dtos, type E } from '~/api';

export const addAccess = async (
    fileId: string,
    addedUsersIds: number[],
    accessType: E.AccessType,
) => await dtos.file.execAddMultipleAccessCommand({
    fileId,
    accessType,
    addedUsersIds,
});
