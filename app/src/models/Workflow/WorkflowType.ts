import { action } from 'mobx';
import { type E, Id } from '~/api';

export type WorkflowTypeTask = {
    id: number;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    actionValue?: string;
    defaultTaskTime: string;
    actionType?: E.WorkflowActionType;
    actorType?: E.WorkflowActorType;
    order: number;
};

export class WorkflowType {
    id: Id;

    nameEn = '';

    nameAr = '';

    descriptionEn = '';

    descriptionAr = '';

    tasks: WorkflowTypeTask[] = [];

    constructor(
        id: number,
    ) {
        this.id = Id.init(id, 'external');

        makeSafeObservable(this, {
            addTask: action,
        });
    }

    addTask = (task: WorkflowTypeTask) => {
        this.tasks.push(task);
    };
}
