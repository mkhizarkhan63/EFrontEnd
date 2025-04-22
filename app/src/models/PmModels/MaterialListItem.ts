import { type Instance, types } from 'mobx-state-tree';
import { MstType, lang } from '~/api';
import { MaterialTaskProgress } from './MaterialTaskProgress';
import { PmSowItem } from './PmSowItem';

export type MaterialListItemType = Instance <typeof MaterialListItem>;

export const MaterialListItem = types
    .model({
        materialWorkflowId: types.number,
        sowItem: PmSowItem,
        stageOrder: types.number,
        siteDeliveryDate: MstType.Moment,
        currentTask: MaterialTaskProgress,
    }).views(self => ({
        get sowItemName() {
            return lang.currentLanguage === 'en' ? self.sowItem.englishName : self.sowItem.arabicName;
        },

        get currentTaskType() {
            return self.currentTask.materialUserTaskType;
        },

        get currentTaskStatus() {
            return self.currentTask.status;
        },
    }));
