import { action } from 'mobx';

export class PmTableVm {
    collapsed = new Set<number>();

    constructor(private currentStageId?: number) {
        makeSafeObservable(this, {
            setCollapsed: action,
        });

        this.setCollapsed(this.currentStageId);
    }

    setCollapsed = (id?: number) => {
        if (!id) {
            return;
        }

        this.collapsed[this.collapsed.has(id) ? 'delete' : 'add'](id);
    };
}
