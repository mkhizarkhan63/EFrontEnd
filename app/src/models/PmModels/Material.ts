import { type Instance, types } from 'mobx-state-tree';
import moment from 'moment';
import { E, Img, MstType, utils } from '~/api';
import { stores } from '~/stores';
import { FileDataBase } from '~/models';

export type MaterialType = Instance<typeof Material>;

export const Material = types
    .model({
        id: stores.idCollection.getIdentifier('material'),
        projectBudgetId: MstType.number,
        name: MstType.string,
        materialIcon: types.optional(MstType.Img, () => Img.create()),
        stageOrder: MstType.number,
        sowItemId: MstType.number,
        siteDeliveryDate: MstType.MaybeMoment,
        taskActionId: MstType.number,
        taskStatus: types.enumeration<E.TaskStatus>(
            'TaskStatus',
            Object.values(E.TaskStatus),
        ),
        currentTaskName: MstType.string,
        currentTaskActorType: types.optional(
            types.enumeration<E.WorkflowActorType>(
                'WorkflowType',
                Object.values(E.WorkflowActorType),
            ),
            E.WorkflowActorType.none,
        ),
        materialType: types.enumeration<E.MaterialType>(
            'MaterialType',
            Object.values(E.MaterialType),
        ),
        totalValue: MstType.number,
        description: MstType.string,
        photos: types.array(FileDataBase),
        purchaseDate: MstType.MaybeMoment,
        expectedPurchaseDate: MstType.MaybeMoment,
        subContractorMaterialStatus: types.enumeration<E.SubContractorMaterialStatus>(
            'SubContractorMaterialStatus',
            Object.values(E.SubContractorMaterialStatus),
        ),
        subContractorName: MstType.string,
        isPrivateExpence: true,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('material', self.id);
        },

        get isSupplyNow() {
            return self.subContractorMaterialStatus !== E.SubContractorMaterialStatus.completed;
        },
    }))
    .actions(self => ({
        setMaterialName: (name: string) => {
            self.name = name;
        },

        setSubContractorName: (name: string) => {
            self.subContractorName = name;
        },

        setTotalValue: (value: string) => {
            self.totalValue = utils.fromInputNumber(value);
        },

        addPhoto: (photo: Instance<typeof FileDataBase>) => {
            photo.loadImg();
            self.photos.push(photo);
        },

        removePhoto: (photo: Instance<typeof FileDataBase>) => {
            self.photos.remove(photo);
        },

        setDescription: (text: string) => {
            self.description = text;
        },

        changeStatus: (status: E.SubContractorMaterialStatus) => {
            self.subContractorMaterialStatus = status;
        },

    })).views(self => ({
        get daysLeft() {
            if (!self.isSupplyNow) {
                return undefined;
            }

            const now = moment();

            return now.diff(self.purchaseDate, 'days');
        },
    }));
