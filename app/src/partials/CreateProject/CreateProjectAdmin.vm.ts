import { runInAction } from 'mobx';
import { E, ErrorListHolder, restQuery, T } from '~/api';
import { Governorate, Wilayat } from '~/models';
import { stores } from '~/stores';

const struct = (isDesign = true) => {
    if (!isDesign) {
        return T.type({
            clientMobile: T.mobile(),
            governorate: T.instance(Governorate),
            wilayat: T.instance(Wilayat),
            landArea: T.min(T.number(), 100),
            landType: T.enums(Object.values(E.ConstructionLand)),
            krookieFiles: T.files(),
            addedBuiltUpArea: T.min(T.number(), 1),
            drawingsFiles: T.files(),
        });
    }

    return T.type({
        clientMobile: T.mobile(),
        governorate: T.instance(Governorate),
        wilayat: T.instance(Wilayat),
        landArea: T.min(T.number(), 100),
        krookieFiles: T.files(),
    });
};

export class CreateProjectAdminVm {
    isSaving = false;

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(this.isDesign),
    );

    constructor() {
        makeSafeObservable(this, {
            isSaving: false,
            goBack: false,
            save: false,
            test: false,
        });
    }

    get isDesign() {
        return this.draft.startingStep === E.ProjectStartingStep.design;
    }

    get validationData() {
        if (this.isDesign) {
            return {
                governorate: this.draft.governorate,
                wilayat: this.draft.wilayat,
                landArea: this.draft.landArea,
                landType: this.draft.landType,
                krookieFiles: this.draft.krookieFiles,
                clientName: this.draft.forAdmin.client.name,
                clientMobile: this.draft.forAdmin.client.mobile,
            };
        }

        return {
            governorate: this.draft.governorate,
            wilayat: this.draft.wilayat,
            landArea: this.draft.landArea,
            landType: this.draft.landType,
            addedBuiltUpArea: this.draft.addedBuiltUpArea,
            drawingsFiles: this.draft.drawingsFiles,
            krookieFiles: this.draft.krookieFiles,
            clientName: this.draft.forAdmin.client.name,
            clientMobile: this.draft.forAdmin.client.mobile,
        };
    }

    get draft() {
        return stores.projects.draft;
    }

    mount = () => {
        (async () => {
            const krookieIds = this.draft.krookieFiles.map(item => item.fileId);
            const drawingIds = this.draft.drawingsFiles.map(item => item.fileId);

            const previews = await restQuery.file.getPreviews(krookieIds.concat(drawingIds));

            if (!previews) {
                return;
            }

            this.draft.krookieFiles.forEach(item => {
                const externalPreview = previews
                    .find(preview => preview.fileId === item.fileId);

                item.setName(externalPreview?.fileName ?? '');
            });

            this.draft.drawingsFiles.forEach(item => {
                const externalPreview = previews
                    .find(preview => preview.fileId === item.fileId);

                item.setName(externalPreview?.fileName ?? '');
            });
        })();
    };

    test = () => this.errorListHolder.test();

    goBack = () => {
        stores.display.router.$.admin.$.projects.go({});
    };

    save = (publish?: boolean, isDesignProject?: boolean) => {
        (async () => {
            if (!this.test() || this.isSaving === true) {
                return;
            }
            runInAction(() => {
                this.isSaving = true;
            });

            let id: number | false | Error = false;

            if (this.draft.id.isType('internal')) {
                const projectId = await restQuery.admin.createProjectAdmin(
                    this.draft,
                );

                id = projectId;

                if (typeof projectId === 'number' && !isDesignProject) {
                    this.draft.id.set(projectId, 'external');
                }
            }

            if (this.draft.id.isType('external')) {
                id = await stores.projects.update(this.draft, publish);
            }

            if (id instanceof Error) {
                runInAction(() => {
                    this.errorListHolder.add({
                        value: '',
                        key: 'clientDoesNotExist',
                        type: 'clientDoesNotExist',
                        refinement: undefined,
                        message: '',
                        branch: [''],
                        path: ['clientDoesNotExist'],
                    });

                    this.errorListHolder.clearErrorsAfterTimeout();

                    this.isSaving = false;
                });
                return;
            }

            if (!id) {
                runInAction(() => {
                    this.isSaving = false;
                });

                this.goBack();
                return;
            }

            runInAction(() => {
                this.isSaving = false;
            });

            stores.display.router.reload();

            stores.display.router.$.admin.$.projects
                .$.sub.$.details.go({ id });

            if (isDesignProject) {
                stores.display.router.$.project.$.sub.$.details.go({ id });
            }
        })();
    };
}
