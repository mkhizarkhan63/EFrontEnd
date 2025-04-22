import { runInAction } from 'mobx';
import { E, lang, restQuery } from '~/api';
import type { Project, ProjectReviewType } from '~/models';
import { stores } from '~/stores';

export class ProjectDesignVm {
    projectReview?: ProjectReviewType;

    constructor(readonly project: Project) {
        makeSafeObservable(this);

        if (this.project.designStatus === E.DesignProjectStatus.rejectedDesign) {
            this.loadReview();
        }
    }

    get steps() {
        const projectStatuses = [
            E.DesignProjectStatus.rejectedDesign,
            E.DesignProjectStatus.consultantReviewDesign,
            E.DesignProjectStatus.adminReviewDesign,
            E.DesignProjectStatus.advancePaymentDesign,
            E.DesignProjectStatus.uploadDrawingsDesign,
            E.DesignProjectStatus.finalPaymentDesign,
        ];

        const currentStatusNum = projectStatuses.findIndex(x => x === this.project.designStatus);

        const getRelativeStatus = (status: E.DesignProjectStatus[]) => {
            const indexes = status.map(s => projectStatuses.findIndex(x => x === s));

            if (indexes.includes(currentStatusNum)) {
                return this.project.designStatus === E.DesignProjectStatus.rejectedDesign
                    ? E.ProcessWizard.rejected
                    : E.ProcessWizard.inProgress;
            }

            if (indexes.every(x => x > currentStatusNum)) {
                return E.ProcessWizard.wait;
            }

            return E.ProcessWizard.done;
        };

        return {
            steps: [
                {
                    status: getRelativeStatus(
                        [
                            E.DesignProjectStatus.rejectedDesign,
                            E.DesignProjectStatus.consultantReviewDesign,
                            E.DesignProjectStatus.adminReviewDesign,
                        ],
                    ),
                    name: lang.dict.get('projectStatus'),
                },
                {
                    status: getRelativeStatus([E.DesignProjectStatus.advancePaymentDesign]),
                    name: lang.dict.get('startDesign'),
                },
                {
                    status: getRelativeStatus([E.DesignProjectStatus.uploadDrawingsDesign]),
                    name: lang.dict.get('municipalityApprovals'),
                },
                {
                    status: getRelativeStatus([E.DesignProjectStatus.finalPaymentDesign]),
                    name: lang.dict.get('receiveDrawings'),
                },
            ],
        };
    }

    goBack = () => {
        stores.display.router.$.home.go({});
    };

    viewDetails = () => {
        if (!this.project.designId || this.project.designId.isType('internal')) {
            return;
        }

        stores.display.router.$.design.go({
            designId: this.project.designId.asNumber(),
        });
    };

    pay = async () => {
        const res = await restQuery.project.updateProjectDesignStatus(
            this.project.id.asNumber(),
            E.DesignProjectTrigger.payment,
        );

        if (!res) {
            return;
        }

        stores.display.router.reload();
    };

    loadReview = async () => {
        const reviews = await restQuery.project.getReview(this.project.id.asNumber());

        const review = reviews?.find(() => true);

        if (!review) {
            return;
        }

        runInAction(() => {
            this.projectReview = review;
        });
    };
}
