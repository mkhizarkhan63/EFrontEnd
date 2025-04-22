import { dtos, models, type Id, type Paging } from '~/api';

export const getSowItems = async (sowId?: Id, paging?: Paging) => {
    if (!sowId || sowId.isType('internal')) {
        return [];
    }

    const data = await dtos.construction.execListSowItemByIdQuery({
        versionId: sowId.asNumber(),
    });

    if (!data || !data.result || data.result.length === 0) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 1);

    return data.result
        .map(item => models.sowItem.toInternalSowItem(item))
        .sort((a, b) => a.orderNumber - b.orderNumber);
};
