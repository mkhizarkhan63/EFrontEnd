import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';
import { MaterialTaskProgress } from './MaterialTaskProgress';
import { PmSowItem } from './PmSowItem';

export type SubContractorType = Instance<typeof SubContractor>;

export const SubContractor = types.model({
    materialWorkflowId: types.number,
    subContractedMaterialName: types.string,
    subContractorName: types.string,
    stageOrder: types.number,
    completeWorksBy: MstType.Moment,
    currentTask: MaterialTaskProgress,
    sowItemDto: types.maybe(PmSowItem),
}).views(self => ({
    get sowItemName() {
        return self.sowItemDto?.englishName;
    },
})).actions(self => ({
    setSubContractedMaterialName(name: string) {
        self.subContractedMaterialName = name;
    },

    setSubContractorName(name: string) {
        self.subContractorName = name;
    },
}));
