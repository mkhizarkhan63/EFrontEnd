import { stores } from '~/stores';

export class SubmittedProfileVm {
    constructor() {
        makeSafeObservable(this);
    }

    get profile() {
        return stores.profile.currentProfile;
    }

    changeContext = () => {
        this.profile.openSettings(this.profile?.selectedCompany?.id);
    };
}
