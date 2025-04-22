import { T, dtos, enums, type Paging } from '~/api';
import { PmLog } from '~/models';
import type { PmUpdatesFilter } from './getPmProjectUpdates';

export const getPmLogs = async (
    filter: PmUpdatesFilter['filter'],
    constructionProjectId?: number,
    paging?: Paging,
) => {
    if (!constructionProjectId || !paging) {
        return [];
    }

    const response = await dtos.log.execListPmLogQuery({
        ...paging.toQuery(),
        constructionProjectId,
        dateFrom: filter.fromDate?.toISOString(),
        dateTo: filter.toDate?.toISOString(),
    });

    if (!response) {
        return [];
    }

    paging.setPagesCount(response?.pageCount ?? 0);
    paging.setRowCount(response?.rowCount ?? 0);

    return response.result.map(log => PmLog.create({
        actorType: T.tryCreate(
            log.actorType,
            enums.WorkflowActorType.castToInternal,
        ),
        description: log.message,
        date: T.create(log.logDate, T.Timestamp),
    }));
};
