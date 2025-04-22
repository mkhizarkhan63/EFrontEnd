import { action } from 'mobx';
import { Mobx } from '~/api';
import { stores } from '~/stores';
import type { ProjectAdmin } from '~/models';

export class DraftDetailsVm {
    isEditing = false;

    constructor(itemVm: ProjectAdmin) {
        makeSafeObservable(this, {
            toggleEdit: action,
        });

        stores.projects.resetDraft();

        Mobx.extendsObservable(this.draft, {
            id: itemVm.project.id,
            governorateId: itemVm.project.governorateId,
            wilayatId: itemVm.project.wilayatId,
            landArea: itemVm.project.landArea,
            landType: itemVm.project.landType,
            constructionType: itemVm.project.constructionType,
            buildingAllAreaInTheDrawings: itemVm.project.buildingAllAreaInTheDrawings,
            addedBuiltUpArea: itemVm.project.addedBuiltUpArea,
            additionalComment: itemVm.project.additionalComment,
            clientId: itemVm.project.clientId,
            startingStep: itemVm.project.startingStep,
            drawingsFiles: itemVm.project.drawingsFiles,
            krookieFiles: itemVm.project.krookieFiles,
        });

        Mobx.extendsObservable(this.draft.forAdmin.client, {
            name: itemVm.project.client?.name,
            mobile: itemVm.project.client?.phone,
        });
    }

    get draft() {
        return stores.projects.draft;
    }

    toggleEdit = () => {
        this.isEditing = !this.isEditing;
    };
}
