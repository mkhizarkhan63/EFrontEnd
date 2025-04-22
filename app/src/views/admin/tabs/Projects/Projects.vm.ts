import { stores } from '~/stores';
import { E, restQuery } from '~/api';
import { action } from 'mobx';

export class ProjectsVm {
    isDeleteModalOpened = false;

    isArchiveModalOpened = false;

    isUnarchiving = false;

    currentProjectToDelete?: number;

    currentProjectToArchive?: number;

    constructor() {
        makeSafeObservable(this, {
            createProject: false,
            openDeleteModal: action,
            closeDeleteModal: action,
            deleteProject: action,
            setProjectIdFilterConstruction: action,
            setProjectIdFilterDesign: action,
            setProjectNameConstruction: action,
            setProjectNameDesign: action,
            openArchiveModal: action,
            closeArchiveModal: action,
            archiveProject: action,
            setAdminProjectStatus: action,
            setAdminProjectStatusDesign: action,
        });
    }

    get projectIdFilterConstruction() {
        return stores.projects.projectIdFilterConstruction;
    }

    get projectIdFilterDesign() {
        return stores.projects.projectIdFilterDesign;
    }

    get projectNameConstruction() {
        return stores.projects.projectNameConstruction;
    }

    get projectNameDesign() {
        return stores.projects.projectNameDesign;
    }

    get constructionProjectsAdmin() {
        return stores.projects.adminProjectsConstruction;
    }

    get constructionSorter() {
        return stores.projects.adminProjectsConstruction.paging.modifySorter;
    }

    get designProjectsAdmin() {
        return stores.projects.adminProjectsDesign;
    }

    get designSorter() {
        return stores.projects.adminProjectsDesign.paging.modifySorter;
    }

    get allProjectsStatistics() {
        return stores.projects.adminProjectsStatistics.data;
    }

    get isConstruction() {
        return stores.display.isConstructionType;
    }

    unmount = () => {
        stores.display.setConstructionType(true);
    };

    showConstructionProject = (id?: number) => () => {
        if (!id) {
            return;
        }

        stores.display.router.$.admin.$.projects
            .$.sub.$.details.go({ id });
    };

    showDesignProject = (id?: number) => () => {
        if (!id) {
            return;
        }

        stores.display.router.$.admin.$.projects
            .$.sub.$.design.$.designDetails.go({ id });
    };

    setProjectIdFilterConstruction = (value: string) => {
        stores.projects.setProjectIdFilterConstruction(value);
    };

    setProjectIdFilterDesign = (value: string) => {
        stores.projects.setProjectIdFilterDesign(value);
    };

    setProjectNameConstruction = (value: string) => {
        stores.projects.setProjectNameConstruction(value);
    };

    setProjectNameDesign = (value: string) => {
        stores.projects.setProjectNameDesign(value);
    };

    setAdminProjectStatus = (value: E.ProjectStatus) => {
        stores.projects.setAdminProjectStatus(value);
    };

    setAdminProjectStatusDesign = (value: E.DesignProjectStatus) => {
        stores.projects.setAdminProjectStatusDesign(value);
    };

    isStatusSelected = (value: E.ProjectStatus) => Boolean(stores.projects.adminStatusFilter?.includes(value));

    isDesignStatusSelected = (value: E.DesignProjectStatus) => Boolean(stores.projects.adminStatusFilterDesign?.includes(value));

    createProject = () => {
        stores.display.router.$.admin.$.projects
            .$.create.go({ adminView: true });
    };

    toggleProject = (type: E.ProjectStartingStep) => () => {
        if (type === E.ProjectStartingStep.build) {
            stores.display.setConstructionType(true);
            return;
        }

        stores.display.setConstructionType(false);
    };

    openDeleteModal = (id?: number) => {
        if (!id) {
            return;
        }

        this.currentProjectToDelete = id;
        this.isDeleteModalOpened = true;
    };

    openArchiveModal = (id?: number, unarchive?: boolean) => {
        if (!id) {
            return;
        }

        if (unarchive) {
            this.isUnarchiving = true;
        }

        this.currentProjectToArchive = id;
        this.isArchiveModalOpened = true;
    };

    closeDeleteModal = () => {
        this.isDeleteModalOpened = false;
        this.currentProjectToDelete = undefined;
    };

    closeArchiveModal = () => {
        this.isArchiveModalOpened = false;
        this.currentProjectToArchive = undefined;
        this.isUnarchiving = false;
    };

    deleteProject = () => {
        (async () => {
            const id = this.currentProjectToDelete;

            if (!id) {
                return;
            }

            const res = await restQuery.project.deleteProject(id);

            if (!res) {
                return;
            }

            if (this.isConstruction) {
                this.constructionProjectsAdmin.reload();
                this.closeDeleteModal();
                return;
            }

            this.designProjectsAdmin.reload();
            this.closeDeleteModal();
        })();
    };

    archiveProject = () => {
        (async () => {
            const id = this.currentProjectToArchive;

            if (!id) {
                return;
            }

            const res = await restQuery.project.archiveProject(id, this.isUnarchiving);

            if (!res) {
                return;
            }

            if (this.isConstruction) {
                this.constructionProjectsAdmin.reload();
                this.closeArchiveModal();
                return;
            }

            this.designProjectsAdmin.reload();
            this.closeArchiveModal();
        })();
    };
}
