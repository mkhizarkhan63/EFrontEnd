import { LazyDataList, restQuery, type Id, LazyDataScroller } from '~/api';
import type { Stage } from '~/models';

export class Stages {
    sorter = {
        modifiedDateIsAscending: undefined as boolean | undefined,
    };

    filter = {
        basement: undefined as number | undefined,
        additionalFloors: undefined as number | undefined,
        outerBlocks: undefined as number | undefined,
        groundFloor: undefined as boolean | undefined,
        levellingFloor: undefined as boolean | undefined,
        penthouseFloor: undefined as boolean | undefined,
        pool: undefined as boolean | undefined,
    };

    stageTemplateList = new LazyDataScroller(
        'Stage Template List',
        paging => restQuery.stage.getStageTemplates(paging, this.filter),
        18,
        this.sorter,
        restQuery.stage.getStageTemplate,
    );

    stagePlanList = new LazyDataList(
        'Stage Plan List',
        restQuery.stage.getStagePlans,
        restQuery.stage.getStagePlan,
    );

    constructor() {
        makeSafeObservable(this);
    }

    clearFilters = () => {
        this.filter = {
            basement: undefined,
            additionalFloors: undefined,
            outerBlocks: undefined,
            groundFloor: undefined,
            levellingFloor: undefined,
            penthouseFloor: undefined,
            pool: undefined,
        };

        this.stageTemplateList.reload();
    };

    updateStageTemplate = async (stage: Stage, publish = false) => await restQuery
        .admin.updateStageTemplate(stage, publish);

    createStageTemplate = async (stage: Stage) => await restQuery
        .admin.createStageTemplate(stage);

    deleteStageTemplate = async (stageId: Id) => await restQuery
        .admin.deleteStageTemplate(stageId);

    createDraftStage = async (stageId: Id) => await restQuery
        .stage.createDraftStage(stageId.asNumber());
}
