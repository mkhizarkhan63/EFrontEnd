import { type Instance, types } from 'mobx-state-tree';
import { E, MstType, lang, restQuery } from '~/api';
import { FileDataBase } from '../FileData';
import { Comment, type CommentType } from './Comment';
import type { Dict } from '~/api/Lang/Dict';

export type PmTaskUpdateType = Instance<typeof PmTaskUpdate>;

export const PmTaskUpdate = types.model({
    id: MstType.number,
    sequenceId: MstType.number,
    workflowName: MstType.string,
    workflowNameAr: MstType.string,
    taskName: MstType.string,
    sowItemName: MstType.string,
    description: MstType.string,
    hasAttachments: MstType.boolean,
    submittedBy: types.optional(
        types.enumeration<E.WorkflowActorType>(
            'WorkflowActorType', Object.values(E.WorkflowActorType),
        ),
        E.WorkflowActorType.none,
    ),
    customUpdateName: MstType.string,
    customUpdateTitle: MstType.string,
    submittedByName: MstType.string,
    submittedInStageOrder: types.maybe(MstType.number),
    lastActivity: MstType.MaybeMoment,
    isRead: MstType.boolean,
    isFlagged: MstType.boolean,
    submittedByActorId: types.maybe(MstType.number),
    createdOn: MstType.MaybeMoment,
    attachments: types.optional(types.array(FileDataBase), []),
    comments: types.optional(types.array(Comment), []),
    currentComment: types.optional(Comment, () => Comment.create()),
    isMaterialUpdate: MstType.boolean,
    isObservation: MstType.boolean,
    isInitialUpdate: MstType.boolean,
    materialWorkflowType: types.optional(
        types.enumeration<E.MaterialWorkflowType>(
            'MaterialWorkflowType', Object.values(E.MaterialWorkflowType),
        ), E.MaterialWorkflowType.none,
    ),
    materialUserTaskType: types.optional(
        types.enumeration<E.MaterialUserTaskType>(
            'MaterialUserTaskType', Object.values(E.MaterialUserTaskType),
        ), E.MaterialUserTaskType.none,
    ),
    taskUpdateType: types.optional(
        types.enumeration<E.TaskUpdateType>(
            'TaskUpdateType', Object.values(E.TaskUpdateType),
        ), E.TaskUpdateType.none,
    ),
    stageNumber: types.maybe(types.number),
}).views(self => ({
    get altWorkflowName(): keyof Dict {
        return self.materialWorkflowType;
    },

    get altTaskName(): keyof Dict {
        return self.materialUserTaskType;
    },

    get submittedName() {
        if (self.submittedBy === E.WorkflowActorType.none) {
            return lang.dict.get('system');
        }

        return self.submittedBy;
    },
})).actions(self => ({
    setFlagged: (isLocal = false) => {
        if (!isLocal && !restQuery.setTaskUpdateFlag(self.id)) {
            return;
        }

        self.isFlagged = !self.isFlagged;
    },

    setRead: (isRead: boolean) => {
        self.isRead = isRead;
    },

    addComment: (comment: CommentType) => {
        self.currentComment = Comment.create();
        self.comments.push(comment);
    },

    setTaskName: (name: string) => {
        self.taskName = name;
    },

    setSubmittedByName: (name: string) => {
        self.submittedByName = name;
    },
    setStageNumber: (value?: number) => {
        self.stageNumber = value;
    },
}));
