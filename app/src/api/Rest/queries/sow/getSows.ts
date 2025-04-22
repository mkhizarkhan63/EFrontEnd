import { dtos, enums, Id, Mobx, T, type Paging } from '~/api';
import { Sow } from '~/models';

export const getSows = async (paging?: Paging) => {
    const data = await dtos.construction.execListSowVersionQuery({
        ...paging?.toQuery(true),
    });

    if (!data || !data.result) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);
    paging?.setRowCount(data.rowCount ?? 0);

    return data.result.map(item => {
        const sow = new Sow();

        Mobx.extendsObservable(sow, {
            id: Id.init(item.id, 'external'),
            contractName: item.contractName,
            numberOfItems: item.numberOfItems,
            createdOn: T.create(item.createdDate, T.Timestamp),
            usedFrom: T.create(item.usedFrom, T.Timestamp),
            usedTo: T.create(item.usedTo, T.Timestamp),
            status: T.create(
                item.status,
                enums.SowAndStageStatus.castToInternal,
            ),
        });

        return sow;
    });
};
