import { stores } from '~/stores';

export class EditStageVm {
    constructor() {
        makeSafeObservable(this, {
            goBack: false,
        });
    }

    get isDetails() {
        return stores.display.router
            .$.admin
            .$.projects
            .$.sub
            .$.details
            .$.stageList
            .$.details.match;
    }

    get projectId() {
        return stores.display.router.$.admin.$.projects.$.sub.params.id;
    }

    goBack = () => {
        stores.display.router
            .$.admin
            .$.projects
            .$.sub
            .$.details.go({ id: this.projectId });
    };
}
