import moment from 'moment';
import { E, Id } from '~/api';

export class Task {
    id = Id.init();

    projectId?: Id;

    userId?: Id;

    companyId?: Id;

    category = E.TaskCategory.followUpTask;

    date = moment();

    deadline = moment();

    title = '';

    text = '';

    isCompleted = false;

    completedDate?: moment.Moment;

    constructor() {
        makeSafeObservable(this);
    }
}
