import { action } from 'mobx';
import type { PmModuleVm } from '../PmModule.vm';

export class RightSidePanelVm {
    isOpen = false;

    constructor(
        private vm: PmModuleVm,
    ) {
        makeSafeObservable(this, {
            toggle: action,
        });
    }

    toggle = () => {
        this.isOpen = !this.isOpen;
    };
}
