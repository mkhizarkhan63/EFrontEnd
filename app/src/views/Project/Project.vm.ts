import { action } from 'mobx';
import { E, Id, Mobx } from '~/api';
import type { Project } from '~/models';
import { stores } from '~/stores';

export class ProjectVm {
    isLoading = false;

    isProjectDraft = false;

    private innerRoute: E.ProjectRoute;

    project?: Project;

    constructor(route: E.ProjectRoute) {
        makeSafeObservable(this, {
            goBack: false,
            initProjectDraft: action,
            loadById: action,
        });

        this.innerRoute = route;

        stores.projects.resetDraft();

        if (route === E.ProjectRoute.exists) {
            this.loadById(this.id);
        }
    }

    get id() {
        return stores.display.router.$.project.$.sub.$.details.params.id;
    }

    get route() {
        return this.innerRoute;
    }

    get draft() {
        return stores.projects.draft;
    }

    goBack = () => {
        stores.display.router.$.home.go({});
    };

    initProjectDraft = () => {
        if (!this.project) {
            return;
        }

        Mobx.extendsObservable(this.draft, {
            id: this.project.id,
            governorateId: this.project.governorateId,
            wilayatId: this.project.wilayatId,
            landArea: this.project.landArea,
            landType: this.project.landType,
            constructionType: this.project.constructionType,
            buildingAllAreaInTheDrawings: this.project.buildingAllAreaInTheDrawings,
            addedBuiltUpArea: this.project.addedBuiltUpArea,
            additionalComment: this.project.additionalComment,
            clientId: this.project.clientId,
            startingStep: this.project.startingStep,
            krookieFiles: this.project.krookieFiles,
            drawingsFiles: this.project.drawingsFiles,
        });

        this.isProjectDraft = true;
        this.isLoading = false;
    };

    loadById = (id: number) => {
        this.isLoading = true;

        stores.projects.projects.asyncGet(
            Id.init(id, 'external'),
            project => {
                this.project = project;

                if (project.projectStatus === E.ProjectStatus.draft) {
                    this.initProjectDraft();
                    return;
                }

                this.isLoading = false;
            },
            this.goBack,
        );
    };
}
