import { dtos, models, type Paging } from '~/api';

export const getStagePlans = async (paging?: Paging) => {
    const data = await dtos.construction.execListStagePlanQuery({});

    if (!data || !data.result || data.result.length === 0) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 1);

    return data.result.map(x => models.stage.toInternalStage(x));
};
