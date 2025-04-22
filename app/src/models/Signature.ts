import type { Moment } from 'moment';
import { E, Id } from '~/api';

export class Signature {
    id = Id.init();

    contractId?: Id;

    fileId?: string;

    subject = E.ContractSubjects.none;

    createdDate?: Moment;

    constructor() {
        makeSafeObservable(this);
    }
}
