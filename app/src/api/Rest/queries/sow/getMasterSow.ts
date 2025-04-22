import { Id, Mobx, dtos, T, enums } from '~/api';
import { Sow } from '~/models';

export const getMasterSow = async () => {
    const data = await dtos.construction.execGetMasterSowVersionQuery(undefined);

    if (!data || !data.result) {
        return false;
    }

    const item = data.result;
    const sow = new Sow();

    Mobx.extendsObservable(sow, {
        id: Id.init(item.id, 'external'),
        contractName: item.contractName,
        usedFrom: T.create(item.usedFrom, T.Timestamp),
        usedTo: T.create(item.usedFrom, T.Timestamp),
        status: T.create(item.status, enums.SowAndStageStatus.castToInternal),
        numberOfItems: item.numberOfItems,
    });

    return sow;
};
