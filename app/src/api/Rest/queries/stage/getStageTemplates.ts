import { dtos, models, type Paging } from '~/api';

export const getStageTemplates = async (paging?: Paging, filter?: dtos.construction.StageFilter) => {
    const data = await dtos.construction.execListStageTemplateQuery({
        stageFilter: filter,
        ...paging?.toQuery(),
    });

    if (!data || !data.result || data.result.length === 0) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);
    paging?.setRowCount(data.rowCount ?? 0);

    return data.result.map(x => models.stage.toInternalStage(x));
};
