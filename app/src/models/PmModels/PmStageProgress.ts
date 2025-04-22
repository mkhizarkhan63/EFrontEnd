import { type Instance, types } from 'mobx-state-tree';
import { PmStage } from './PmStage';
import { TaskUpdate, type TaskUpdateType } from './TaskUpdate';
import { E, MstType, restQuery } from '~/api';

export type PmStageProgressType = Instance<typeof PmStageProgress>;
export type StageItemType = Instance<typeof StageItem>;
export type MaterialItemType = Instance<typeof MaterialItem>;

export const StageItem = types.model({
    name: MstType.string,
    subItems: types.array(
        types.model({
            subItemName: MstType.string,
            workflowName: MstType.string,
            status: types.enumeration<E.TaskStatus>(
                'TaskStatus', Object.values(E.TaskStatus),
            ),
        }),
    ),
    icon: MstType.Img,
    isOpened: MstType.boolean,
}).actions(self => ({
    switchIsOpened: () => {
        self.isOpened = !self.isOpened;
    },
}));

export const MaterialItem = types.model({
    englishName: MstType.string,
    arabicName: MstType.string,
    id: MstType.number,
    icon: MstType.Img,
});

export const PmStageProgress = types.model({
    stage: PmStage,
    updates: types.array(TaskUpdate),
    tasksSummary: types.model({
        upcomingTasksCount: MstType.number,
        dueTasksCount: MstType.number,
        completedTasksCount: MstType.number,
        inDelayTasksCount: MstType.number,
    }),
    delays: types.model({
        consultant: MstType.number,
        contractor: MstType.number,
        client: MstType.number,
    }),
    stageItems: types.array(StageItem),
    materialItems: types.array(MaterialItem),
    isLoading: MstType.boolean,
}).actions(self => ({
    switchComments: (item: TaskUpdateType) => {
        if (item.isCommentsOpened) {
            item.disableComments();
            return;
        }

        self.updates.forEach(update => update.disableComments());
        item.switchComments();
    },

    addComment: async (item: TaskUpdateType) => {
        if (!item.externalId || !item.currentComment.description || self.isLoading) {
            return;
        }

        self.isLoading = true;

        const { description, attachments } = item.currentComment;

        const res = await restQuery.project
            .postTaskUpdateComment(item.externalId, description, attachments);

        if (!res) {
            self.isLoading = false;
            return;
        }

        item.addComment(res);
        self.isLoading = false;
    },
}));
