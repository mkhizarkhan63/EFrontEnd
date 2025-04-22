import { types, type Instance } from 'mobx-state-tree';
import { stores } from '~/stores';
import { E, MstType, utils } from '~/api';

export type ResourceType = Instance<typeof Resource>;

export const Resource = types
    .model({
        id: stores.idCollection.getIdentifier('resource'),

        numberOfUnit: MstType.number,

        specializationId: MstType.number,

        companyId: MstType.number,

        resourceType: types.optional(
            types.enumeration<E.ResourceType>('ResourceType', Object.values(E.ResourceType)),
            E.ResourceType.none,
        ),

        machine: MstType.string,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('resource', self.id);
        },
    }))
    .actions(self => ({
        setNumberOfUnit: (value: string, max?: number) => {
            self.numberOfUnit = utils.fromInputNumber(value, 0, max);
        },

        setSpec: (id: number) => {
            self.specializationId = id;
        },

        setType: (type: E.ResourceType) => {
            self.resourceType = type;
        },

        setNameOfMachinery: (value: string) => {
            self.machine = value;
        },
    }));
