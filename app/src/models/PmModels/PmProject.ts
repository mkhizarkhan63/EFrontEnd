import { types, type Instance } from 'mobx-state-tree';
import { MstType, E } from '~/api';
import { stores } from '~/stores';
import { utilsMap } from '~/utils';
import { Phase } from './Phase';

export type PmFilter = {
    stages?: number[];
    phasesType?: E.StageTableNames[];
    usersType?: E.WorkflowActorType[];
    status?: E.TaskStatus[];
    acceptanceCriteria?: string[];
};

export type PmProjectType = Instance<typeof PmProject>;

export const PmProject = types
    .model({
        id: stores.idCollection.getIdentifier('project'),
        phases: types.array(Phase),
        startDate: MstType.MaybeMoment,
        estimatedFinishDate: MstType.MaybeMoment,
        contractorId: MstType.number,
        consultantId: MstType.number,
        supplierId: MstType.number,
        clientId: MstType.number,
        baselineStartDate: MstType.MaybeMoment,
        baselineFinishDate: MstType.MaybeMoment,
        isMaterialFinished: MstType.boolean,
        previousStagesCompleted: MstType.boolean,
    }).views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('project', self.id);
        },

        get numberOfActors() {
            return utilsMap.sumMaps(
                self.phases.map(item => item.numberOfActors),
            );
        },

        get acceptanceCriteria() {
            return Array.from(new Set(
                Object.values(self.phases.flatMap(item => item.acceptanceCriteria))
                    .filter(name => name),
            ));
        },

        get stages() {
            return self.phases.flatMap(item => item.stages.map(stage => stage));
        },

        get allUserTask() {
            return self.phases.flatMap(item => item.stages.flatMap(stage => stage.userTask));
        },

        get phaseStatistic() {
            return self.phases.filter(phase => phase.order !== 6)
                .flatMap((phase, i) => phase.statisticsStages(i));
        },

        get stagesByFilter() {
            return self.phases.flatMap(item => item.stages.map(stage => stage));
        },
    }))
    .actions(self => ({
        getStatisticStages: (name: E.StageTableNames) => self.phases.find(phase => phase.phaseType === name)?.stages
            .sort((a, b) => (a.order > b.order ? 1 : -1)),
    }))
    .views(self => ({
        getFiltered: (filters: PmFilter) => new Proxy(self, {
            get: (target, key, receiver) => {
                switch (key) {
                    case 'stagesByFilter':
                        return target[key]
                            .filter(x => {
                                if (!filters.stages || filters.stages.length === 0) {
                                    return true;
                                }

                                return filters.stages.includes(x.id);
                            })
                            .map(x => x.getFiltered(filters))
                            .filter(x => x.workflowSequences.length > 0);
                }
                return Reflect.get(target, key, receiver);
            },
        }) as Instance<typeof PmProject>,

        currentStage: () => self.stagesByFilter
            .find(stage => stage.status === E.PmStageStatus.currentStage)?.id,
    }));
