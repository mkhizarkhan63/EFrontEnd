import { action } from 'mobx';
import { E, ErrorListHolder, Id, lang, restQuery, T } from '~/api';
import { Project, type DesignOptionType, type FileDataType, type Sow } from '~/models';
import { stores } from '~/stores';

const struct = (type: E.ConsultantProjectType, areAnyChanges: boolean) => T.type({
    ...type === E.ConsultantProjectType.acceptDesign
        ? { rejectMessage: T.nonempty(T.string()) }
        : {},
    ...type === E.ConsultantProjectType.submitDrawings && !areAnyChanges
        ? { drawingsFiles: T.files() }
        : {},
    ...areAnyChanges
        ? { changesDescription: T.nonempty(T.string()) }
        : {},
});

export class ConsultantProjectVm {
    isLoading = false;

    isSaving = false;

    areAnyChanges = false;

    isProjectScope = false;

    projectScopeSow?: Sow = undefined;

    changesDescription = '';

    project = new Project();

    type = E.ConsultantProjectType.none;

    design?: DesignOptionType;

    drawingsFiles: FileDataType[] = [];

    rejectMessage?: string;

    errorListHolder = new ErrorListHolder(() => this, () => struct(this.type, this.areAnyChanges));

    constructor() {
        makeSafeObservable(this, {
            goBack: false,
            loadById: false,
            loadDesign: false,
            acceptDesign: false,
            rejectDesign: false,
            loadFilesName: false,
            uploadDrawings: false,
            acceptSupervision: false,
            rejectSupervision: false,
            saveDrawings: action,
            uploadDrawingFile: action,
            removeDrawingFile: action,
            toggleAreAnyChanges: action,
            toggleIsProjectScope: action,
            setChangesDescription: action,
            setRejectMessage: action,
        });

        const id = stores.display.router.$.context.$.project.params.id;
        this.loadById(id);
    }

    get pageName() {
        return lang.dict.get(
            this.type === E.ConsultantProjectType.submitDrawings
                ? 'submitDrawings'
                : 'acceptProject',
        );
    }

    get projectId() {
        return this.project.id.asNumber();
    }

    get isPossibleToUpload() {
        return this.project.files.length > 0;
    }

    toggleIsProjectScope = () => {
        (async () => {
            if (!this.isProjectScope) {
                const res = await restQuery.sow.getMasterSow();

                if (!res) {
                    return;
                }

                this.projectScopeSow = res;

                this.isProjectScope = !this.isProjectScope;

                return;
            }

            this.projectScopeSow = undefined;
            this.isProjectScope = !this.isProjectScope;
        })();
    };

    toggleAreAnyChanges = () => {
        this.areAnyChanges = !this.areAnyChanges;

        if (this.areAnyChanges === false) {
            this.changesDescription = '';
        }
    };

    uploadDrawingFile = (file: FileDataType) => {
        file.loadImg();
        this.drawingsFiles.push(file);
    };

    setChangesDescription = (value: string) => {
        this.changesDescription = value;
    };

    setRejectMessage = (value: string) => {
        this.rejectMessage = value;
    };

    removeDrawingFile = (file: FileDataType) => {
        this.drawingsFiles = this.drawingsFiles
            .filter(x => x.id !== file.id);
    };

    acceptSupervision = async () => {
        await restQuery.project.postAcceptSupervisionInvitation(this.project.id);
        stores.display.router.$.home.go({});
    };

    rejectSupervision = async () => {
        await restQuery.project.postRejectSupervisionInvitation(this.project.id);
        this.goBack();
    };

    acceptDesign = async () => {
        await restQuery.project.postReview({
            constructionProjectId: this.projectId,
            isApproved: true,
        });
        stores.display.router.reload();
    };

    rejectDesign = async () => {
        if (typeof this.rejectMessage === 'undefined') {
            this.rejectMessage = '';
            return;
        }

        if (!this.errorListHolder.test()) {
            return;
        }

        await restQuery.project.postReview({
            constructionProjectId: this.projectId,
            isApproved: false,
            comment: this.rejectMessage,
        });

        this.goBack();
    };

    removeDrawing = (file: FileDataType) => {
        (async () => {
            if (this.isSaving) {
                return;
            }

            this.isSaving = true;

            const isExisting = this.project.drawingsFiles.find(x => x.id === file.id);

            if (!isExisting) {
                this.isSaving = false;

                return;
            }

            this.project.drawingsFiles = this.project.drawingsFiles
                .filter(x => x.id !== file.id);

            const result = await restQuery.project.uploadDrawings(
                this.projectId,
                this.project.drawingsFiles,
            );

            if (!result) {
                this.isSaving = false;
                return;
            }

            restQuery.file.deleteId(file.fileId);

            this.isSaving = false;
        })();
    };

    saveDrawings = () => {
        (async () => {
            if (!this.errorListHolder.test() || this.isSaving) {
                return;
            }

            this.isSaving = true;

            const result = await restQuery.project.uploadDrawings(
                this.projectId,
                [...this.project.drawingsFiles, ...this.drawingsFiles],
            );

            if (!result) {
                this.isSaving = false;
                return;
            }

            this.drawingsFiles.forEach(item => this.project.uploadDrawingFile(item));

            this.drawingsFiles = [];
            this.isSaving = false;
        })();
    };

    uploadDrawings = async () => {
        await restQuery.project.updateProjectDesignStatus(
            this.projectId,
            E.DesignProjectTrigger.submitDrawings,
        );

        this.goBack();
    };

    goBack = () => {
        if (!stores.display.runBackFrom('consultantProject')) {
            return stores.display.router.$.home.go({});
        }
    };

    loadFilesName = () => {
        (async () => {
            if (this.project.files.every(file => file.isNameLoaded)) {
                return;
            }

            const previews = await restQuery.file.getPreviews(this.project.files.map(item => item.fileId));

            if (previews) {
                this.project.files.forEach(item => {
                    const externalPreview = previews.find(preview => preview.fileId === item.fileId);
                    item.setName(externalPreview?.fileName ?? '');
                });
            }
        })();
    };

    loadDesign = (id?: Id) => {
        if (!id || id.isType('internal')) {
            this.goBack();
            return;
        }

        stores.designs.designs.asyncGet(
            id.asNumber(),
            design => {
                if ('consultantId' in design) {
                    this.design = design;
                }
            },
            this.goBack,
        );
    };

    loadById = (id: number) => {
        this.isLoading = true;

        stores.projects.consultantMyProjects.asyncGet(
            Id.init(id, 'external'),
            project => {
                if (!project || project.contractId) {
                    this.isLoading = false;
                    this.goBack();
                    return;
                }

                this.project = project;

                if (project.forConsultant.invitationType === E.InvitationType.supervision) {
                    if (project.forConsultant.invitationStatus === E.InvitationStatus.approved) {
                        this.type = E.ConsultantProjectType.waitingSupervision;
                    }

                    if (project.forConsultant.invitationStatus === E.InvitationStatus.active) {
                        this.type = E.ConsultantProjectType.acceptSupervision;
                    }
                } else {
                    this.loadDesign(this.project.designId);

                    switch (this.project.designStatus) {
                        case E.DesignProjectStatus.consultantReviewDesign:
                            this.type = E.ConsultantProjectType.acceptDesign;
                            break;
                        case E.DesignProjectStatus.uploadDrawingsDesign:
                            this.type = E.ConsultantProjectType.submitDrawings;
                            break;
                        case E.DesignProjectStatus.advancePaymentDesign:
                        case E.DesignProjectStatus.finalPaymentDesign:
                            this.type = E.ConsultantProjectType.waitingDesign;
                            break;
                        case E.DesignProjectStatus.rejectedDesign:
                            this.type = E.ConsultantProjectType.rejectedDesign;
                            break;
                        case E.DesignProjectStatus.completedDesign:
                            this.type = E.ConsultantProjectType.closedDesign;
                            break;
                    }
                }

                this.loadFilesName();
                if (this.type === E.ConsultantProjectType.none) {
                    this.goBack();
                }

                this.isLoading = false;
            },
            this.goBack,
        );
    };
}
