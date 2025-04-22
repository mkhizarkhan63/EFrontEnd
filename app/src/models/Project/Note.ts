import moment from 'moment';
import { Id } from '~/api';

export class Note {
    id = Id.init();

    projectId?: Id;

    userId?: Id;

    companyId?: Id;

    date = moment();

    text = '';

    isEditing = false;

    constructor() {
        makeSafeObservable(this);
    }
}
