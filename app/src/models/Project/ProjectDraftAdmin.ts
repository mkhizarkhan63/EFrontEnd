import { action } from 'mobx';
import { E, utils } from '~/api';
import type { ProjectDraft } from './ProjectDraft';

export class ProjectDraftAdmin {
    client = {
        name: '',
        mobile: '',
    };

    constructor(readonly project: ProjectDraft) {
        makeSafeObservable(this, {
            setClientName: action,
            setClientMobile: action,
            setType: action,
        });
    }

    get type() {
        return this.project.constructionType === E.ConstructionType.turnKey;
    }

    setClientName = (name: string) => {
        this.client.name = name;
    };

    setClientMobile = (mobile: string) => {
        if (mobile.length > 8) {
            return;
        }

        this.client.mobile = utils.fromInputPhone(mobile, this.client.mobile);
    };

    setType = (value: boolean) => {
        this.project.setConstructionType(value
            ? E.ConstructionType.turnKey
            : E.ConstructionType.structureOnly);
    };
}
