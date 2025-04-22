import { action, reaction } from 'mobx';
import { LazyModelScroller, restQuery } from '~/api';
import type { LeftSidePanelVm } from '../../LeftSidePanel.vm';

export class LogVm {
    isLoading = false;

    logs = new LazyModelScroller(
        'PmLogs',
        paging => restQuery.getPmLogs(
            this.parentVm.updateFilter.filter,
            this.parentVm.projectId,
            paging,
        ),
        20,
    );

    disposeFilterUpdate = () => { /* empty */ };

    constructor(private parentVm: LeftSidePanelVm) {
        makeSafeObservable(this, {
            mount: action,
        });
    }

    get logsList() {
        return this.logs;
    }

    mount = () => {
        this.disposeFilterUpdate = reaction(
            () => this.parentVm.updateFilter.filter,
            () => {
                if (this.parentVm.activeTab === 'logs') {
                    this.logs.clear();
                }
            },
        );

        this.logs.reload();
    };

    unmount = () => {
        this.disposeFilterUpdate();
    };
}
