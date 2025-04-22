import { runInAction } from 'mobx';
import { E, ErrorListHolder, restQuery, T } from '~/api';
import { Governorate, Wilayat } from '~/models';
import { stores } from '~/stores';
import { loadFileNames } from '~/utils';

const struct = (version: E.ProjectStep) => {
    const firstStep = T.type({
        startingStep: T.enums([
            E.ProjectStartingStep.design,
            E.ProjectStartingStep.build,
        ]),
    });

    const secondStep = T.type({
        governorate: T.instance(Governorate),
        wilayat: T.instance(Wilayat),
        landArea: T.min(T.number(), 100),
        landType: T.enums(Object.values(E.ConstructionLand)),
        krookieFiles: T.files(),
    });

    const thirdStep = T.type({
        addedBuiltUpArea: T.min(T.number(), 1),
        drawingsFiles: T.files(),
    });

    const fourthStep = T.type({
        constructionType: T.enums([
            E.ConstructionType.structureOnly,
            E.ConstructionType.turnKey,
        ]),
    });

    switch (version) {
        case E.ProjectStep.first:
            return firstStep;
        case E.ProjectStep.second:
            return secondStep;
        case E.ProjectStep.third:
            return thirdStep;
        case E.ProjectStep.fourth:
            return fourthStep;
    }
};

export class CreateProjectClientVm {
    isSaving = false;

    step = E.ProjectStep.first;

    testStep = E.ProjectStep.first;

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(this.testStep),
    );

    constructor() {
        makeSafeObservable(this, {
            setStep: false,
            goNext: false,
            goHome: false,
            goBack: false,
            save: false,
            test: false,
        });

        if (this.draft.id.isType('external')) {
            for (const step in E.ProjectStep) {
                const result = this.test(step as E.ProjectStep);

                if (!result) {
                    this.step = step as E.ProjectStep;
                    this.errorListHolder.clear();
                    break;
                }
            }
        }
    }

    get validationData() {
        return {
            governorate: this.draft.governorate,
            wilayat: this.draft.wilayat,
            landArea: this.draft.landArea,
            landType: this.draft.landType,
            addedBuiltUpArea: this.draft.addedBuiltUpArea,
            constructionType: this.draft.constructionType,
            startingStep: this.draft.startingStep,
            drawingsFiles: this.draft.drawingsFiles,
            krookieFiles: this.draft.krookieFiles,
        };
    }

    get draft() {
        return stores.projects.draft;
    }

    mount = () => {
        loadFileNames(this.draft.files);
    };

    setStep = (step: E.ProjectStep) => {
        this.step = step;
    };

    test = (step: E.ProjectStep) => {
        this.testStep = step;
        return this.errorListHolder.test();
    };

    goHome = () => {
        stores.display.router.$.home.go({});
    };

    goNext = async (step: E.ProjectStep) => {
        if (this.test(this.step)) {
            if (step === E.ProjectStep.second) {
                this.setStep(step);
                return;
            }

            await this.save();

            if (this.draft.id.isType('external')) {
                this.setStep(step);
            }
        }
    };

    goBack = () => {
        switch (this.step) {
            case E.ProjectStep.first:
                this.goHome();
                break;
            case E.ProjectStep.second:
                this.setStep(E.ProjectStep.first);
                break;
            case E.ProjectStep.third:
                this.setStep(E.ProjectStep.second);
                break;
            case E.ProjectStep.fourth:
                this.setStep(E.ProjectStep.third);
                break;
        }
    };

    save = async () => {
        if (!this.test(this.step) || this.isSaving) {
            return;
        }

        this.isSaving = true;

        if (this.draft.id.isType('internal')) {
            const projectId = await restQuery.project.postProject(this.draft);

            if (!projectId) {
                return;
            }

            stores.display.setStep();
            stores.display.router.$.project.$.sub.$.details.go({ id: projectId });
            this.isSaving = false;
        }

        if (this.draft.id.isType('external')) {
            await stores.projects.update(this.draft);
        }

        runInAction(() => {
            this.isSaving = false;
        });
    };

    addToReview = () => {
        (async () => {
            if (!this.test(this.step) || this.isSaving === true) {
                return;
            }

            this.isSaving = true;

            if (this.draft.id.isType('external')) {
                await stores.projects.update(this.draft, true);
            }

            if (this.draft.id.isType('internal')) {
                const id = await restQuery.project.postProject(this.draft, true);

                if (!id) {
                    this.isSaving = false;
                    this.goHome();
                    return;
                }

                stores.display.router.$.project.$.sub.$.details.go({ id });
            }

            this.isSaving = false;
            stores.display.router.reload();
        })();
    };
}
