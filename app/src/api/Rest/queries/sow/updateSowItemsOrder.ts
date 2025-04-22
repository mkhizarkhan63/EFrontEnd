import { dtos } from '~/api';
import type { Sow } from '~/models';

export const updateSowItemsOrder = async (sow: Sow) => {
    const reorder: dtos.construction.PatchSowItemOrderCommand = {
        orderItems: sow.sowItems.map(x => ({
            id: x.id.asNumber(),
            orderNumber: x.orderNumber,
        })),
    };

    await dtos
        .construction
        .execPatchSowItemOrderCommand(reorder);
};
