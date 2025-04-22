import { dtos, Id } from '~/api';
import type { Sow } from '~/models';

export const postSow = async (sow: Sow) => {
    const externalSow: dtos.construction.CreateSowVersionCommand = {
        contractName: sow.contractName,
    };

    const res = await dtos.construction.execCreateSowVersionCommand(externalSow);

    return res ? Id.init(res.id, 'external') : false;
};
