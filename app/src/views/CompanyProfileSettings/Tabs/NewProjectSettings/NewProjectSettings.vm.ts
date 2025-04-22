import { stores } from '~/stores';

export class NewProjectSettingsVm {
    constructor() {
        makeSafeObservable(this);
    }

    get company() {
        return stores.profile.company;
    }
}
