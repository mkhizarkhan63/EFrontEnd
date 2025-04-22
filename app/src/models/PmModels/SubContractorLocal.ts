import { types, type Instance } from 'mobx-state-tree';
import { MstType, utils } from '~/api';
import { FileDataBase } from '../FileData';

export type SubContractorLocalType = Instance<typeof SubContractorLocal>;

export const SubContractorLocal = types.model({
    materialUserTaskId: MstType.number,
    totalPrice: MstType.number,
    projectId: MstType.number,
    subContractedName: MstType.string,
    subContractedMaterialName: MstType.string,
    description: MstType.string,
    attachments: types.array(FileDataBase),
}).actions(self => ({
    setMaterialName: (name: string) => {
        self.subContractedMaterialName = name;
    },

    setSubContractedName: (name: string) => {
        self.subContractedName = name;
    },

    setTotalPrice: (price: string) => {
        self.totalPrice = utils.fromInputNumber(price);
    },

    setDescription: (description: string) => {
        self.description = description;
    },

    addAttachment: (item: Instance<typeof FileDataBase>) => {
        item.loadImg();
        self.attachments.push(item);
    },

    removeAttachment: (item: Instance<typeof FileDataBase>) => {
        self.attachments.remove(item);
    },
}));

