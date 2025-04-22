import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { MaterialTaskProgress } from './MaterialTaskProgress';
import { PmSowItem } from './PmSowItem';
import { Submission } from './Submission';
import { TaskUpdate, type TaskUpdateType } from './TaskUpdate';

export type MaterialProgressType = Instance<typeof MaterialProgress>;

export const MaterialProgress = types.model({
    materialWorkflowSequenceId: MstType.number,
    currentTask: MaterialTaskProgress,
    submissions: types.array(Submission),
    materialWorkflowType: types.enumeration<E.MaterialWorkflowType>(
        'MaterialWorkflowType', Object.values(E.MaterialWorkflowType),
    ),
    sowItem: PmSowItem,
    stageOrderNumber: types.maybe(MstType.number),
    localMaterialQuantities: types.array(TaskUpdate),
    currentMaterialQuantity: types.maybe(types.reference(TaskUpdate)),
    isPrivate: MstType.boolean,
    subContractorName: MstType.string,
    subContractedMaterialName: MstType.string,
    clientDelay: MstType.number,
    contractorDelay: MstType.number,
}).views(self => ({
    get localUpdates() {
        return self.localMaterialQuantities
            .filter(quantity => quantity.id !== self.currentMaterialQuantity?.id);
    },

    get finishDate() {
        return self.submissions.find(item => item.materialSubmissionType === E.MaterialSubmissionType.selectOption)?.createdDate;
    },

    get contractorSubmittedOptions() {
        return self.submissions[self.submissions.length - 1]?.materialOptions;
    },

    get isRejectedOptions() {
        return self.submissions.some(item => item.status === E.SubmitStatus.rejected);
    },

    get rejectedOptions() {
        return self.submissions.filter(item => item.status === E.SubmitStatus.rejected);
    },

    get canReject() {
        return self.submissions.filter(item => item.status === E.SubmitStatus.rejected).length <= 1;
    },

})).actions(self => ({
    addQuantity: (quantity: TaskUpdateType) => {
        self.localMaterialQuantities.push(quantity);
    },

    deselectQuantity: () => {
        self.currentMaterialQuantity = undefined;
    },

    selectQuantity: (quantity: TaskUpdateType) => {
        MstType.setReference(self, 'currentMaterialQuantity', quantity.id);
    },

    removeQuantity: (quantity: TaskUpdateType) => {
        self.localMaterialQuantities.remove(quantity);
    },
}));
