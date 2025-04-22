import { restQuery, LazyDataList } from '~/api';

export class Workflows {
    workflows = new LazyDataList(
        'Workflow list',
        restQuery.workflow.getWorkflowsTypes,
        undefined,
        false,
    );

    constructor() {
        makeSafeObservable(this);
    }
}
