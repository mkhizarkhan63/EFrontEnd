import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';
import { utilsMap } from '~/utils';
import type { PmFilter } from './PmProject';
import { WorkflowSequence } from './WorkflowSequence';
import moment from 'moment';

export type PmStageType = Instance<typeof PmStage>;

export const PmStage = types
    .model({
        id: stores.idCollection.getIdentifier('stage'),
        status: types.enumeration<E.PmStageStatus>(
            'TaskStatus',
            Object.values(E.PmStageStatus),
        ),
        order: types.number,
        isActive: types.boolean,
        isCompleted: types.boolean,
        startDate: MstType.MaybeMoment,
        completionDate: MstType.MaybeMoment,
        weight: types.number,
        name: MstType.string,
        nameAr: MstType.string,
        workflowSequences: types.array(WorkflowSequence),
        baselineStartDate: MstType.MaybeMoment,
        baselineFinishDate: MstType.MaybeMoment,
        projectBidStageUnitId: MstType.number,
        description: MstType.string,
        descriptionAr: MstType.string,
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('stage', self.id);
        },

        get numberOfActors() {
            return utilsMap.sumMaps(
                self.workflowSequences.map(item => item.numberOfActors),
            );
        },

        get acceptanceCriteria() {
            return Array.from(new Set(self.workflowSequences.map(item => item.nameEn)));
        },

        get taskCounts() {
            const tasks = self.workflowSequences.flatMap(item => item.userTasks);

            const result = {
                upcoming: 0,
                due: 0,
                completed: 0,
                inDelay: 0,
            };

            for (const task of tasks) {
                switch (task.status) {
                    case E.TaskStatus.due:
                        result.due += 1;
                        break;
                    case E.TaskStatus.completed:
                        result.completed += 1;
                        break;
                    case E.TaskStatus.inDelay:
                        result.inDelay += 1;
                        break;
                    case E.TaskStatus.upComing:
                        result.upcoming += 1;
                        break;
                }
            }

            return result;
        },

        get userTask() {
            return self.workflowSequences.flatMap(workflow => workflow.userTasks.map(task => task));
        },

        get taskStatusPercent() {
            const taskStatusMap = utilsMap.sumMaps(
                self.workflowSequences.map(workflow => workflow.taskStatusPercent),
            );

            const dues = taskStatusMap.get(E.TaskStatus.due);
            const completed = taskStatusMap.get(E.TaskStatus.completed);
            const delay = taskStatusMap.get(E.TaskStatus.inDelay);

            const totalTasks = Array.from(taskStatusMap.values()).reduce((a, b) => a + b, 0);

            const duePercentage = dues ? dues / totalTasks : 0;
            const completedPercentage = completed ? completed / totalTasks : 0;
            const delayPercentage = delay ? delay / totalTasks : 0;

            return [
                { color: 'green' as const, value: completedPercentage * 100 },
                { color: 'orange' as const, value: duePercentage * 100 },
                { color: 'red' as const, value: delayPercentage * 100 },
            ];
        },

        get duration() {
            return self.baselineFinishDate?.diff(self.baselineStartDate, 'days');
        },

        get daysLeft() {
            if (self.status === E.PmStageStatus.inDelay) {
                return self.baselineFinishDate?.diff(moment(), 'days');
            }

            return undefined;
        },

        getFiltered: (filters: PmFilter) => new Proxy(self, {
            get: (target, key, receiver) => {
                switch (key) {
                    case 'workflowSequences':
                        return target[key]
                            .map(x => x.getFiltered(filters))
                            .filter(x => x.userTasks.length > 0)
                            .filter(x => {
                                if (!filters.acceptanceCriteria
                                    || filters.acceptanceCriteria.length === 0
                                ) {
                                    return true;
                                }

                                return filters.acceptanceCriteria.includes(x.nameEn);
                            });
                }
                return Reflect.get(target, key, receiver);
            },
        }),
    })).views(self => ({
        get backgroundColorByStages() {
            const status = self.status;

            if (status === E.PmStageStatus.completed) {
                return '#7dd75a';
            }

            if (status === E.PmStageStatus.currentStage) {
                return '#dab73a';
            }

            if (status === E.PmStageStatus.inDelay) {
                return '#ec5469';
            }

            return '#eeeeee';
        },
    }));
