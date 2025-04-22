import { action } from 'mobx';
import type { E } from '~/api';

export class ConstructionRequirementsVm {
    preview?: E.ConstructionType;

    constructor() {
        makeSafeObservable(this, {
            openPreview: action,
            closeItemsPreview: action,
        });
    }

    openPreview = (type: E.ConstructionType) => {
        this.preview = type;
    };

    closeItemsPreview = () => {
        this.preview = undefined;
    };
}
