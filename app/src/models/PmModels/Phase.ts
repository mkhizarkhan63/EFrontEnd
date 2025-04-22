import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { stores } from '~/stores';
import { utilsMap } from '~/utils';
import { type PmFilter } from './PmProject';
import { PmStage } from './PmStage';

export type PhaseType = Instance<typeof Phase>;

export const Phase = types
    .model({
        id: stores.idCollection.getIdentifier('phase'),
        stages: types.array(PmStage),
        phaseType: types.optional(
            types.enumeration<E.StageTableNames>(
                'StageTemplatePart',
                Object.values(E.StageTableNames),
            ),
            E.StageTableNames.none,
        ),
        isActive: types.boolean,
        isCompleted: types.boolean,
        startDate: MstType.MaybeMoment,
        completionDate: MstType.MaybeMoment,
        order: types.number,
        baselineStartDate: MstType.MaybeMoment,
        baselineFinishDate: MstType.MaybeMoment,
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('phase', self.id);
        },

        get numberOfActors() {
            return utilsMap.sumMaps(
                self.stages.map(item => item.numberOfActors),
            );
        },

        get acceptanceCriteria() {
            return Array.from(new Set(...self.stages.map(item => item.acceptanceCriteria)));
        },

        getFiltered: (filters: PmFilter) => new Proxy(self, {
            get: (target, key, receiver) => {
                switch (key) {
                    case 'stages':
                        return target[key]
                            .filter(x => {
                                if (!filters.stages || filters.stages.length === 0) {
                                    return true;
                                }

                                return filters.stages.includes(x.id);
                            })
                            .filter(x => x.workflowSequences.length > 0)
                            .map(x => x.getFiltered(filters));
                }
                return Reflect.get(target, key, receiver);
            },
        }),
    })).actions(self => ({
        statisticsStages: (i: number) => self.stages.map(stage => {
            const tempArray = Array(5).fill(0);
            tempArray[i] = Math.abs(stage.baselineStartDate?.diff(stage.baselineFinishDate, 'days') ?? 0);

            return {
                data: tempArray,
                backgroundColor: stage.backgroundColorByStages,
            };
        }),
    }));
