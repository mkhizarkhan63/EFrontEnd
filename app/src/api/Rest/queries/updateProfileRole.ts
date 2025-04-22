import { dtos } from '~/api';

export const updateProfileRole = async (defaultContextId?: number) => await dtos
    .profile
    .execPatchDefaultContextCommand({
        defaultContextId,
    });
