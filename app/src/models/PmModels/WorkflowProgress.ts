import { flow, types, type Instance } from 'mobx-state-tree';
import { MstType, type E } from '~/api';
import { stores } from '~/stores';
import { toInternalAttachmentsIds } from '../../api/Rest/queries/project';
import { PmSowItem } from './PmSowItem';
import { Submission } from './Submission';
import { TaskProgress } from './TaskProgress';
import { TaskUpdate, type TaskUpdateType } from './TaskUpdate';

export type WorkflowProgressType = Instance<typeof WorkflowProgress>;

type DraftUpdate = {
    description: string;
    type: E.TaskUpdateType;
    attachments: string[];
};

export const WorkflowProgress = types
    .model({
        id: stores.idCollection.getIdentifier('workflow'),
        workflowNameEn: MstType.string,
        workflowNameAr: MstType.string,
        workflowDescriptionEn: MstType.string,
        workflowDescriptionAr: MstType.string,
        sowItemId: MstType.number,
        sowItemDto: PmSowItem,
        subItemEnglishName: MstType.string,
        subItemArabicName: MstType.string,
        stageId: MstType.number,
        rate: MstType.number,
        supplier: MstType.string,
        submissions: types.array(Submission),
        updateDtos: types.array(TaskUpdate),
        localUpdateDtos: types.array(TaskUpdate),
        currentTask: TaskProgress,
        isActionable: MstType.boolean,
        currentLocalUpdateDtos: types.maybe(types.reference(TaskUpdate)),
        draftUpdate: types.maybe(types.string),
        isParsed: MstType.boolean,
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('workflow', self.id);
        },

        get localUpdates() {
            return self.localUpdateDtos.filter(update => update.id !== self.currentLocalUpdateDtos?.id);
        },

        get proofId() {
            return self.updateDtos?.find(update => update.isProof)?.externalId;
        },

        get proofTaskId() {
            return self.updateDtos?.find(update => update.isProof)?.taskId;
        },
    })).actions(self => ({
        addUpdate: (update: TaskUpdateType) => {
            self.localUpdateDtos.push(update);
        },

        deselectUpdate: () => {
            self.currentLocalUpdateDtos = undefined;
        },

        selectUpdate: (update: TaskUpdateType) => {
            MstType.setReference(self, 'currentLocalUpdateDtos', update.id);
        },

        removeUpdate: (update: TaskUpdateType) => {
            self.localUpdateDtos.remove(update);
        },
    })).actions(self => ({
        afterCreate() {
            this.parse();
        },

        parse: flow(function* () {
            if (self.isParsed || !self.draftUpdate) {
                return;
            }

            let value: DraftUpdate[] = [];

            try {
                value = JSON.parse(self.draftUpdate);
            } catch (error) {
                // error
            }

            yield Promise.all(value.map(async item => {
                self.addUpdate(TaskUpdate.create({
                    description: item.description,
                    type: item.type,
                    attachments: await toInternalAttachmentsIds(item.attachments),
                }));
            }));

            self.isParsed = true;
        }),
    }));
