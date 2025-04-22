import { dtos, enums, Id, Mobx, T } from '~/api';
import { Sow } from '~/models';

export const getSow = async (id: number) => {
    const data = await dtos.construction.execGetSowVersionQuery({ id });

    if (!data || !data.result) {
        return false;
    }

    const item = data.result;
    const sow = new Sow();

    Mobx.extendsObservable(sow, {
        id: Id.init(item.id, 'external'),
        contractName: item.contractName,
        usedFrom: T.create(item.usedFrom, T.Timestamp),
        usedTo: T.create(item.usedTo, T.Timestamp),
        status: T.create(item.status, enums.SowAndStageStatus.castToInternal),
        numberOfItems: item.numberOfItems,
    });

    return sow;
};
