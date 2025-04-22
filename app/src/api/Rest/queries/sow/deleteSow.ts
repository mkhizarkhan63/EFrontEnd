import { dtos, type Id } from '~/api';

export const deleteSow = async (sowId: Id) => {
    if (sowId.isType('internal')) {
        return false;
    }

    return await dtos.construction.execDeleteSowVersionCommand({
        id: sowId.asNumber(),
    });
};
