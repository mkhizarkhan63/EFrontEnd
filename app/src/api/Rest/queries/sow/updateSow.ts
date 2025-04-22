import { dtos } from '~/api';
import type { Sow } from '~/models';

export const updateSow = async (sow: Sow) => {
    if (sow.id.isType('internal')) {
        return;
    }

    const externalSow: dtos.construction.UpdateSowVersionCommand = {
        id: sow.id.asNumber(),
        contractName: sow.contractName,
    };

    await dtos.construction.execUpdateSowVersionCommand(externalSow);
};
