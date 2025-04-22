import { action } from 'mobx';
import { E, ErrorListHolder, Id, lang, restQuery, T } from '~/api';
import { customError } from '~/api/Types';
import { Project } from '~/models';
import { stores } from '~/stores';
import { utilsDate } from '~/utils';

const struct = (step: number, isTurnKey: boolean, isStructure: boolean, isPriceValid: boolean) => (
    step === 0
        ? T.type({
            ...isTurnKey ? { turnKeyItemsPrice: T.min(T.number(), 1) } : {},
            ...isStructure ? { structureItemsPrice: T.min(T.number(), 1) } : {},
            ...isPriceValid ? {} : { isPriceValid: customError('isPriceValid') },
        })
        : T.array(
            T.type({
                timeOfStage: T.size(T.number(), 7, 365),
            }),
        )
);
export class BidingVm {
    step = 0;

    project = new Project();

    isSaving = false;

    isLoading = false;

    isClosedStructure = false;

    isClosedTurnKey = false;

    isPostQuestion = false;

    scopeOfWorkType?: E.ConstructionType;

    isProjectDrawings = false;

    isSubmitBid = false;

    isViewCosts = false;

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(
            this.step,
            Boolean(this.turnKey),
            Boolean(this.structureOnly),
            this.isPriceValid,
        ),
    );

    constructor(readonly isEditable = false) {
        makeSafeObservable(this, {
            goNextStep: action,
            goToStep: action,
            toggleIsClosedStructure: action,
            toggleIsClosedTurnKey: action,
            toggleIsPostQuestion: action,
            toggleIsSubmitBid: action,
            toggleIsViewCosts: action,
            openScopeOfWork: action,
            closeScopeOfWork: action,
            loadById: action,
            closeModals: action,
            save: action,
            getRelativeStatus: false,
            isSaving: false,
            changeInput: false,
            goToContract: false,
        });

        const id = stores.display.router.$.context.$.project.params.id;
        this.loadById(id);
    }

    get daysLeft() {
        const time = utilsDate.timeLeft(this.project.bidClosingDate);

        if (!time.amount) {
            return undefined;
        }

        if (time.unit === 'day') {
            return lang.dict.format('projectCountdownDaysFormat', [time.amount + 1]);
        }

        return lang.dict.format('projectCountdownHoursFormat', [time.amount]);
    }

    get isEn() {
        return lang.current === 'en';
    }

    get steps() {
        return {
            steps: [
                {
                    status: this.getRelativeStatus(E.BidingProcessWizard.prices),
                    name: lang.dict.get('projectPrices'),
                },
                {
                    status: this.getRelativeStatus(E.BidingProcessWizard.plan),
                    name: lang.dict.get('projectPlan'),
                },
            ],
        };
    }

    get bidCosts() {
        return this.project.forContractor.bid?.bidCosts;
    }

    get structureOnly() {
        return this.bidCosts?.find(item => item.constructionType === E.ConstructionType.structureOnly);
    }

    get turnKey() {
        return this.bidCosts?.find(item => item.constructionType === E.ConstructionType.turnKey);
    }

    get isPriceValid() {
        if (!this.turnKey?.totalPrice || !this.structureOnly?.totalPrice) {
            return true;
        }

        return this.turnKey?.totalPrice > this.structureOnly?.totalPrice;
    }

    get validationData() {
        if (this.step === 0) {
            return {
                turnKeyItemsPrice: this.turnKey?.totalPrice,
                structureItemsPrice: this.structureOnly?.totalPrice,
                isPriceValid: this.isPriceValid,
            };
        }

        const stageUnits = this.project.forContractor.bid?.stageParts.map(item => item.forProjectBid.bidUnits);

        const items: Array<{ timeOfStage: number }> = [];

        stageUnits?.forEach(item => {
            item.forEach(entry => {
                items.push({
                    timeOfStage: entry.forProjectBid.timeOfStage,
                });
            });
        });

        return items;
    }

    get isWaitingForClient() {
        return (
            this.project.projectStatus === E.ProjectStatus.openBids ||
            this.project.projectStatus === E.ProjectStatus.chooseContractor
        );
    }

    get areYouWinner() {
        return Boolean(this.project.projectBidId?.isEqual(this.project.forContractor.bidId));
    }

    get isShownViewContract() {
        return this.areYouWinner && this.project.projectStatus === E.ProjectStatus.readyToSign;
    }

    get bidStatus() {
        if (
            this.project.forContractor.bidStatus === E.BidStatus.submitted ||
            this.project.forContractor.bidStatus === E.BidStatus.archived
        ) {
            return lang.dict.enum('projectCompanyStatus', this.project.projectStatus);
        }

        return lang.dict.enum('projectBidStatus', this.project.forContractor.bidStatus);
    }

    openScopeOfWork = (type: E.ConstructionType) => {
        this.scopeOfWorkType = type;
    };

    closeScopeOfWork = () => {
        this.scopeOfWorkType = undefined;
    };

    changeInput = <T extends unknown>(fn: (value: T) => void) => (value: T) => {
        if (!this.isEditable) {
            return;
        }

        fn(value);
    };

    getRelativeStatus = (status: E.BidingProcessWizard) => {
        if (status === E.BidingProcessWizard.prices) {
            return this.step === 0 ? E.ProcessWizard.inProgress : E.ProcessWizard.done;
        }

        if (status === E.BidingProcessWizard.plan) {
            return this.step === 0 ? E.ProcessWizard.wait : E.ProcessWizard.inProgress;
        }

        return E.ProcessWizard.wait;
    };

    goNextStep = () => {
        if (this.errorListHolder.test()) {
            this.closeModals();
            this.step++;
        }
    };

    goToStep = (step: 0 | 1 | 2) => {
        this.closeModals();
        this.step = step;
    };

    goBack = (goHome = false) => {
        if (stores.display.runBackFrom('bid')) {
            return;
        }

        if (this.step === 1 && !goHome) {
            this.goToStep(0);
            return;
        }

        stores.display.router.$.newProjects.go({});
    };

    goToContract = () => {
        stores.display.registerBackFrom(
            'contract',
            () => stores.display.router.$.context.$.project.go({
                type: E.RoleInCompany.contractor,
                id: this.project.id.asNumber(),
            }),
        );

        stores.display.router
            .$.context
            .$.project
            .$.contract
            .go({
                type: E.RoleInCompany.contractor,
                id: this.project.id.asNumber(),
            });
    };

    closeModals = () => {
        if (this.isPostQuestion) {
            this.toggleIsPostQuestion();
        }

        if (this.isSubmitBid) {
            this.toggleIsSubmitBid();
        }

        if (this.isProjectDrawings) {
            this.toggleProjectDrawings();
        }

        if (this.isViewCosts) {
            this.toggleIsViewCosts();
        }
    };

    toggleIsClosedStructure = () => {
        this.isClosedStructure = !this.isClosedStructure;
    };

    toggleIsClosedTurnKey = () => {
        this.isClosedTurnKey = !this.isClosedTurnKey;
    };

    toggleIsPostQuestion = () => {
        this.isPostQuestion = !this.isPostQuestion;
    };

    toggleIsSubmitBid = () => {
        if (!this.errorListHolder.test()) {
            return;
        }

        this.isSubmitBid = !this.isSubmitBid;
    };

    toggleProjectDrawings = () => {
        this.isProjectDrawings = !this.isProjectDrawings;

        (async () => {
            if (this.project.drawingsFiles.some(file => !file.isNameLoaded)) {
                const drawingIds = this.project.drawingsFiles.map(item => item.fileId);

                const previews = await restQuery.file.getPreviews(drawingIds);

                if (!previews) {
                    return;
                }

                this.project.drawingsFiles.forEach(item => {
                    const externalPreview = previews.find(preview => preview.fileId === item.fileId);
                    item.setName(externalPreview?.fileName ?? '');
                });
            }
        })();
    };

    toggleIsViewCosts = () => {
        this.isViewCosts = !this.isViewCosts;
    };

    loadById = (id: number) => {
        this.isLoading = true;

        stores.projects.contractorNewProjects.asyncGet(
            Id.init(id, 'external'),
            project => {
                this.project = project;
                this.isLoading = false;

                const status = this.project.forContractor.bidStatus;

                if (status === E.BidStatus.submitted || status === E.BidStatus.archived) {
                    this.goToStep(2);
                }
            },
            this.goBack,
        );
    };

    save = () => {
        (async () => {
            if (this.isSaving || !this.project.forContractor.bid || !this.errorListHolder.test()) {
                return;
            }

            this.isSaving = true;

            await stores.projects.updateProjectBid(this.project.forContractor.bid);

            this.isSaving = false;
        })();
    };

    submitBid = () => {
        (async () => {
            if (this.isSaving || !this.project.forContractor.bid || !this.errorListHolder.test()) {
                return;
            }

            this.isSaving = true;

            const updateResult = await stores.projects
                .updateProjectBid(this.project.forContractor.bid, true);

            if (!updateResult) {
                this.goBack(true);
                this.isSaving = false;
                return;
            }

            this.project.forContractor.setBidStatus(E.BidStatus.submitted);
            this.goNextStep();
            this.isSaving = false;
        })();
    };
}
