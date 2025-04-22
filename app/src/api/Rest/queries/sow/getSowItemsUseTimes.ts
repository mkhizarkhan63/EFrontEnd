import { dtos, models } from '~/api';

export const getSowItemsWithUseTimes = async (sowId: number) => {
    const data = await dtos.construction.execListSowItemWithItemAmountQuery({
        sowId,
    });

    if (!data || !data.result) {
        return [];
    }

    return data.result
        .map(item => models.sowItem.toInternalSowItem(item))
        .sort((a, b) => a.orderNumber - b.orderNumber);
};
