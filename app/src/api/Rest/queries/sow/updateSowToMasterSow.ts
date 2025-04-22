import { dtos, Id } from '~/api';

export const updateSowToMasterSow = async (sowId: Id) => {
    const res = await dtos.construction.execUpdateToMasterSowVersionCommand({
        id: sowId.asNumber(),
    });

    return res ? Id.init(res.id, 'external') : false;
};
