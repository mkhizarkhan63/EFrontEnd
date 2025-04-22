import { dtos, type Id } from '~/api';

export const deleteSowSubitem = async (id: Id) => {
    if (id.isType('internal')) {
        return false;
    }

    await dtos.construction.execDeleteSowItemUnitCommand({
        id: id.asNumber(),
    });
};
