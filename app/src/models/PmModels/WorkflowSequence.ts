import { getParent, types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';
import type { PmFilter } from './PmProject';
import type { PmStageType } from './PmStage';
import { UserTask } from './UserTask';

export type WorkflowSequenceType = Instance<typeof WorkflowSequence>;

export const WorkflowSequence = types
    .model({
        id: stores.idCollection.getIdentifier('workflowSequence'),
        order: types.number,
        userTasks: types.array(UserTask),
        nameEn: types.string,
        nameAr: types.string,
        subItemNameEn: MstType.string,
        subItemNameAr: MstType.string,
        description: MstType.string,
        sowItemName: types.string,
        sowItemId: types.number,
        rate: MstType.number,
        supplier: MstType.string,
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('workflowSequence', self.id);
        },

        get numberOfActors() {
            const map = new Map<E.WorkflowActorType, number>();

            self.userTasks.forEach(item => {
                map.set(item.actor.actorType, (map.get(item.actor.actorType) ?? 0) + 1);
            });

            return map;
        },

        get taskStatusPercent() {
            const map = new Map<E.TaskStatus, number>();

            self.userTasks.forEach(item => {
                map.set(item.status, (map.get(item.status) ?? 0) + 1);
            });

            return map;
        },

        get statusBorder() {
            const parent = getParent<PmStageType>(self);

            if (!parent.isActive) {
                return 'Transparent';
            }

            if (self.userTasks.some(item => item.status === E.TaskStatus.due)) {
                return 'Yellow';
            }

            if (self.userTasks.every(item => item.status === E.TaskStatus.completed)) {
                return 'Green';
            }

            if (self.userTasks.some(item => item.status === E.TaskStatus.inDelay)) {
                return 'Red';
            }

            return 'Yellow';
        },

        getFiltered: (filters: PmFilter) => new Proxy(self, {
            get: (target, key, receiver) => {
                switch (key) {
                    case 'userTasks':
                        return target[key]
                            .filter(x => {
                                if (!filters.usersType || filters.usersType.length === 0) {
                                    return true;
                                }

                                return filters.usersType.includes(x.actor.actorType);
                            })
                            .filter(x => {
                                if (!filters.status || filters.status.length === 0) {
                                    return true;
                                }

                                return filters.status.includes(x.status);
                            });
                }
                return Reflect.get(target, key, receiver);
            },
        }),
    }));
