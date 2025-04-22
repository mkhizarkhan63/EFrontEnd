import { type Paging, T, type E, dtos, enums } from '~/api';
import { PmTaskUpdate } from '~/models/PmModels/PmTaskUpdate';
import { getPmUpdatesStatistics } from './getPmUpdatesStatistics';

type Filters = {
    isUnread?: boolean;
    isFlagged?: boolean;
    submittedBy?: E.WorkflowActorType[];
    acceptanceCriteria?: string[];
    searchText?: string;
    stageIds?: number[];
    materialSequenceIds?: number[];
};

type UpdateCount = {
    all?: number;
    unread?: number;
    flagged?: number;
};

export const getPmTaskUpdates = async (projectId: number, updateCount: UpdateCount, paging?: Paging, filter?: Filters) => {
    const count = await getPmUpdatesStatistics(projectId);

    if (count) {
        updateCount.all = count.allCount;
        updateCount.unread = count.unreadCount;
        updateCount.flagged = count.flaggedCount;
    }

    const res = await dtos.workflow.execGetInboxTaskUpdatesQuery({
        projectId,
        ...paging?.toQuery(),
        filter: {
            searchText: filter?.searchText,
            isFlagged: filter?.isFlagged,
            isUnread: filter?.isUnread,
            acceptanceCriteria: filter?.acceptanceCriteria,
            submittedBy: filter?.submittedBy
                ? filter?.submittedBy.map(item => T.create(
                    item,
                    enums.WorkflowActorType.castToExternal,
                ))
                : [],
            stageIds: filter?.stageIds,
            materialSequenceIds: filter?.materialSequenceIds,
        },
    });

    if (!res) {
        return [];
    }

    paging?.setPagesCount(res.pageCount ?? 0);
    paging?.setRowCount(res.rowCount ?? 0);

    return toInternalPmTaskUpdates(res.result);
};

export const toInternalPmTaskUpdates = (items: dtos.workflow.TaskUpdateInboxItemDto[]) => items.map(item => PmTaskUpdate.create({
    id: item.id,
    sequenceId: item.updateSequenceId,
    workflowName: item.workflowNameEn,
    workflowNameAr: item.workflowNameAr,
    taskName: item.taskNameEn,
    description: item.description,
    hasAttachments: item.hasAttachments,
    submittedBy: T.tryCreate(item.submittedBy, enums.WorkflowActorType.castToInternal),
    submittedInStageOrder: item.submittedInStageOrder,
    lastActivity: item.lastActivity,
    isRead: item.isRead,
    isFlagged: item.isFlagged,
    isObservation: Boolean(item.customUpdateName),
    isMaterialUpdate: item.isMaterialUpdate,
    materialUserTaskType: T.tryCreate(
        item.materialUserTaskType,
        enums.MaterialUserTaskType.castToInternal,
    ),
    materialWorkflowType: T.tryCreate(
        item.materialWorkflowType,
        enums.MaterialWorkflowType.castToInternal,
    ),
    taskUpdateType: T.create(item.taskUpdateType, enums.TaskUpdateType.castToInternal),
    isInitialUpdate: Boolean(item.customUpdateTitle),
    customUpdateTitle: item.customUpdateTitle,
    customUpdateName: item.customUpdateName,
}));
