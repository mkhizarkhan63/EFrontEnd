import { types, type Instance } from 'mobx-state-tree';
import { E } from '~/api';
import {
    MaterialListItem,
    PmSowItem,
    SubContractor,
    type SubContractorType,
    type MaterialTaskProgressType,
} from '~/models';

export type PmMaterialType = Instance<typeof PmMaterial>;

export const PmMaterial = types
    .model({
        clientSubcontractors: types.array(SubContractor),
        clientForContractorInstallations: types.array(MaterialListItem),
        contractorForClientApprovals: types.array(MaterialListItem),
        contractor: types.array(PmSowItem),
    })
    .actions(self => ({
        addNewClientSubContractor(subContractor: SubContractorType) {
            self.clientSubcontractors.push(subContractor);
        },

        calculateProgressPercentage(clientTasks: MaterialTaskProgressType[], type: 'completed' | 'due' | 'delay') {
            let status: E.TaskStatus;

            switch (type) {
                case 'completed':
                    status = E.TaskStatus.completed;
                    break;
                case 'due':
                    status = E.TaskStatus.due;
                    break;
                case 'delay':
                    status = E.TaskStatus.inDelay;
                    break;
            }

            const tasks = clientTasks.filter(task => task.status === status);

            const totalTasks = clientTasks.length;

            return Math.round(tasks.length / totalTasks * 100);
        },
    }))
    .views(self => ({
        get  percentageStatusSubContractors() {
            const tasks = self.clientSubcontractors.map(item => item.currentTask);

            return [
                {
                    color: 'green' as const,
                    value: self.calculateProgressPercentage(tasks, 'completed'),
                },
                {
                    color: 'orange' as const,
                    value: self.calculateProgressPercentage(tasks, 'due'),
                },
                {
                    color: 'red' as const,
                    value: self.calculateProgressPercentage(tasks, 'delay'),
                },
            ];
        },

        get percentageStatusInstalations() {
            const tasks = self.clientForContractorInstallations.map(item => item.currentTask);

            return [
                {
                    color: 'green' as const,
                    value: self.calculateProgressPercentage(tasks, 'completed'),
                },
                {
                    color: 'orange' as const,
                    value: self.calculateProgressPercentage(tasks, 'due'),
                },
                {
                    color: 'red' as const,
                    value: self.calculateProgressPercentage(tasks, 'delay'),
                },
            ];
        },

        get percentageStatusApprovals() {
            const tasks = self.contractorForClientApprovals.map(item => item.currentTask);

            return [
                {
                    color: 'green' as const,
                    value: self.calculateProgressPercentage(tasks, 'completed'),
                },
                {
                    color: 'orange' as const,
                    value: self.calculateProgressPercentage(tasks, 'due'),
                },
                {
                    color: 'red' as const,
                    value: self.calculateProgressPercentage(tasks, 'delay'),
                },
            ];
        },
    }));
