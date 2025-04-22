import { dtos, models, type Id } from '~/api';

export const getSowSubitems = async (sowItemId?: Id) => {
    if (!sowItemId || sowItemId.isType('internal')) {
        return [];
    }

    const data = await dtos.construction.execListSowItemUnitByItemIdQuery({
        itemId: sowItemId.asNumber(),
        page: 1,
        pageSize: 1000, // TODO
    });

    if (!data || !data.result || data.result.length === 0) {
        return [];
    }

    return data.result
        .map(item => models.sowSubitem.toInternalSowSubitem(item))
        .sort((a, b) => a.orderNumber - b.orderNumber);
};
