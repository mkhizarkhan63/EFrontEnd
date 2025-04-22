import { dtos, models } from '~/api';

export const getSowSubitem = async (id: number) => {
    const data = await dtos.construction.execGetSowItemUnitQuery({
        id,
    });

    if (!data || !data.result) {
        return false;
    }

    return models.sowSubitem.toInternalSowSubitem(data.result);
};
