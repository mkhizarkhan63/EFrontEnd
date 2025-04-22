import { action } from 'mobx';
import moment from 'moment';
import { E, lang, restQuery } from '~/api';
import { stores } from '~/stores';
import { Project } from '~/models';

export class ProjectDesignVm {
    project = new Project();

    isLoading = true;

    isSaving = false;

    constructor() {
        makeSafeObservable(this, {
            load: action,
            goBack: false,
        });

        const id = stores.display.router.$.admin.$.projects.$.sub.$.design.params.id;
        this.load(id);
    }

    get steps() {
        const projectStatuses = [
            E.DesignProjectStatus.noneDesign,
            E.DesignProjectStatus.adminReviewDesign,
            E.DesignProjectStatus.consultantReviewDesign,
            E.DesignProjectStatus.advancePaymentDesign,
            E.DesignProjectStatus.uploadDrawingsDesign,
            E.DesignProjectStatus.finalPaymentDesign,
            E.DesignProjectStatus.completedDesign,
        ];

        const currentStatusNum = projectStatuses.findIndex(x => x === this.project.designStatus);

        const getRelativeStatus = (status: E.DesignProjectStatus) => {
            const index = projectStatuses.findIndex(x => x === status);
            const statusNum = index !== -1 ? index : -2;

            if (statusNum === currentStatusNum) {
                return E.ProcessWizard.inProgress;
            }

            if (statusNum > currentStatusNum) {
                return E.ProcessWizard.wait;
            }

            return E.ProcessWizard.done;
        };

        return {
            steps: [
                {
                    status: getRelativeStatus(E.DesignProjectStatus.noneDesign),
                    name: lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.noneDesign),
                    date: moment(),
                },
                {
                    status: getRelativeStatus(E.DesignProjectStatus.adminReviewDesign),
                    name: lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.adminReviewDesign),
                    date: moment(),
                },
                {
                    status: getRelativeStatus(E.DesignProjectStatus.consultantReviewDesign),
                    name: lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.consultantReviewDesign),
                    date: moment(),
                },
                {
                    status: getRelativeStatus(E.DesignProjectStatus.uploadDrawingsDesign),
                    name: lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.uploadDrawingsDesign),
                    date: moment(),
                },
                {
                    status: getRelativeStatus(E.DesignProjectStatus.completedDesign),
                    name: lang.dict.enum('projectStatusDesign', E.DesignProjectStatus.completedDesign),
                    date: moment(),
                },
            ],
        };
    }

    get currentPage() {
        const r = stores.display.router.$.admin.$.projects.$.sub.$.design;

        if (r.$.designDetails.match) {
            return E.AdminProjectsDesignPages.details;
        }

        if (r.$.designNotesTasks.match) {
            return E.AdminProjectsDesignPages.notes;
        }

        if (r.$.designLog.match) {
            return E.AdminProjectsDesignPages.log;
        }

        if (r.$.designDocuments.match) {
            return E.AdminProjectsDesignPages.documents;
        }

        return false;
    }

    unmount = () => {
        stores.display.setConstructionType(false);
        stores.display.resetBackFrom('userManagementProfile');
        stores.display.resetBackFrom('companiesManagementProfile');
    };

    goBack = () => {
        if (stores.display.runBackFrom('userManagementProfile')) {
            return;
        }

        if (stores.display.runBackFrom('companiesManagementProfile')) {
            return;
        }

        stores.display.router.$.admin.$.projects.go({});
    };

    loadFileNames = () => {
        (async () => {
            const krookieIds = this.project.krookieFiles.map(item => item.fileId);
            const drawingIds = this.project.drawingsFiles.map(item => item.fileId);

            const previews = await restQuery.file.getPreviews(krookieIds.concat(drawingIds));

            if (!previews) {
                return;
            }

            this.project.krookieFiles.forEach(item => {
                const externalPreview = previews.find(preview => preview.fileId === item.fileId);
                item.setName(externalPreview?.fileName ?? '');
            });

            this.project.drawingsFiles.forEach(item => {
                const externalPreview = previews.find(preview => preview.fileId === item.fileId);
                item.setName(externalPreview?.fileName ?? '');
            });
        })();
    };

    load = (id: number) => {
        this.isLoading = true;

        stores.projects.adminProjectsDesign.asyncGet(
            id,
            project => {
                if ('drawingsFiles' in project) {
                    this.project = project;
                    this.loadFileNames();
                    this.isLoading = false;
                }
            },
            this.goBack,
        );
    };
}
