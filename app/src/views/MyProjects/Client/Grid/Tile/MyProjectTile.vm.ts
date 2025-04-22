import { E, lang } from '~/api';
import type { Project } from '~/models';
import { utilsDate } from '~/utils';

enum Status {
    inProgress = 'inProgress',
    done = 'done',
}

export class MyProjectTileVm {
    constructor(public project: Project) {
        makeSafeObservable(this);
    }

    get status() {
        if (!this.project.projectStatus) {
            return Status.inProgress;
        }

        return {
            [E.ProjectStatus.none]: Status.inProgress,
            [E.ProjectStatus.draft]: Status.inProgress,
            [E.ProjectStatus.reviewing]: Status.inProgress,
            [E.ProjectStatus.openBids]: Status.inProgress,
            [E.ProjectStatus.chooseContractor]: Status.inProgress,
            [E.ProjectStatus.readyToSign]: Status.done,
            [E.ProjectStatus.signed]: Status.done,
            [E.ProjectStatus.rejected]: Status.done,
            [E.ProjectStatus.archived]: Status.done,
            [E.ProjectStatus.liveInPm]: Status.done,
            [E.ProjectStatus.uploadDrawings]: Status.inProgress,
        }[this.project.projectStatus];
    }

    get area() {
        return lang.dict.format('squareMetersFormat', [this.project.addedBuiltUpArea]);
    }

    get isShownCountdown() {
        return this.project.projectStatus === E.ProjectStatus.openBids;
    }

    get countdown() {
        const time = utilsDate.timeLeft(this.project.bidClosingDate);

        if (!time.amount) {
            return undefined;
        }

        if (time.unit === 'day') {
            return lang.dict.format('projectCountdownDaysFormat', [time.amount + 1]);
        }

        return lang.dict.format('projectCountdownHoursFormat', [time.amount]);
    }
}
