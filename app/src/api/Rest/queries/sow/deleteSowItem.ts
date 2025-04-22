import { dtos, type Id } from '~/api';

export const deleteSowItem = async (id: Id) => {
    if (id.isType('internal')) {
        return false;
    }

    const res = await dtos.construction.execDeleteSowItemCommand({
        id: id.asNumber(),
    });

    return res ? res.isSuccess : false;
};
