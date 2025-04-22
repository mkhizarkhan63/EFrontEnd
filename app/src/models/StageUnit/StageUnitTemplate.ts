import { action } from 'mobx';
import { type Id, Mobx } from '~/api';
import type { StageUnit } from '.';

export class StageUnitTemplate {
    templatePartId?: Id;

    constructor(readonly stageUnit: StageUnit) {
        makeSafeObservable(this, {
            clone: action,
        });
    }

    clone = () => {
        const cloneItem = new StageUnitTemplate(this.stageUnit);

        return Mobx.extendsObservable(cloneItem, {
            templatePartId: this.templatePartId,
        });
    };
}
