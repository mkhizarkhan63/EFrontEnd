import { action, runInAction } from 'mobx';
import { E, ErrorListHolder, Id, Img, LazyModelList, restQuery, T, utils } from '~/api';
import type { IconName } from '~/bits';
import { Governorate, Wilayat, type ConsultantType, type DesignOptionType, type Project } from '~/models';
import { stores } from '~/stores';
import { utilsString } from '~/utils';

const struct = () => T.type({
    governorate: T.instance(Governorate),
    wilayat: T.instance(Wilayat),
    landArea: T.min(T.number(), 100),
    landType: T.enums(Object.values(E.ConstructionLand)),
    krookieFiles: T.files(),
});

export class DesignVm {
    isLoading = false;

    consultant?: ConsultantType;

    isStartDesign = false;

    isAcceptedTermsAndConditions = false;

    isTermsAndConditionsModal = false;

    isKrookieModal = true;

    currentSlideType = E.SlideType.exterior;

    design?: DesignOptionType;

    sliderCurrent = 0;

    related = new LazyModelList(
        'Related Designs',
        () => restQuery.design.getRelated(this.design?.externalId),
    );

    starsLabels = E.StarsLabel;

    project?: Project;

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(),
    );

    constructor() {
        makeSafeObservable(this, {
            loadById: action,
            loadConsultantById: action,
            goBack: false,
            toggleIsTermsAndConditionModal: action,
            setCurrentSlideType: action,
            openStartDesign: action,
            closeStartDesign: action,
            acceptTermsAndConditions: action,
            setIsKrookieModal: action,
            setSliderCurrent: action,
            isActiveSlide: false,
            openDesign: false,
            openCompanyProfile: false,
        });

        const designId = this.router.$.design.params.designId;

        this.project = stores.projects.lastViewedProject;
        this.loadById(designId);
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

    get sliderData() {
        const slides = this.sliderList.map(
            img => ({
                id: utils.generateId([], 'id'),
                img: img.img ? img.img : Img.empty(),
            }));

        if (!slides || slides.length === 0) {
            return [
                {
                    id: utils.generateId([], 'id'),
                    img: new Img('/assets/graphics/empty_updates.svg'),
                    title: 'No Photos',
                    description: 'No Photos',
                    alt: 'alt',
                },
            ];
        }

        return slides;
    }

    get hasNoData() {
        if (this.sliderList.length === 0) {
            return true;
        }

        return false;
    }

    get relatedDesigns() {
        return this.related.data;
    }

    get hasProject() {
        return this.router.$.project.$.sub.$.design.match;
    }

    get contact() {
        if (!this.consultant) {
            return [];
        }

        return [
            { name: 'phone' as const, data: String(this.consultant.phone) },
            { name: 'email' as const, data: this.consultant.email },
        ];
    }

    get avatar() {
        return this.consultant?.logo?.img;
    }

    get socialMedia() {
        if (!this.consultant) {
            return [];
        }

        const allMedia = this.consultant.marketings.map(item => ({
            name: item.marketingService as IconName,
            url: item.addressUrl,
        }));

        return allMedia.filter(item => utilsString.isUrlValid(item.url));
    }

    get namesAndIconsOfServices() {
        return this.consultant?.namesAndIconsOfServices ?? [];
    }

    get namesAndIconsOfProducts() {
        return this.consultant?.namesAndIconsOfProducts ?? [];
    }

    get servicesPrice() {
        return this.consultant?.servicesPrice;
    }

    get everyPrice() {
        return this.consultant?.everyDesignPackagePrice;
    }

    get everySize() {
        return this.consultant?.everyDesignPackageSize;
    }

    get upTo() {
        return this.consultant?.landTo;
    }

    get supervisionPrice() {
        return this.consultant?.supervisionServicePrice;
    }

    get isProvidingSupervision() {
        return this.consultant?.isProvideSupervision ?? false;
    }

    get isProvidingDesign() {
        return this.consultant?.isProvideDesign ?? false;
    }

    get profile() {
        return stores.profile.profile;
    }

    get sliderList() {
        return this.design?.sliderList
            .find(item => item.type === this.currentSlideType)?.imgs ?? [];
    }

    get router() {
        return stores.display.router;
    }

    goPrevious = () => {
        if (stores.display.runBackFrom('designProject')) {
            return;
        }

        if (!this.project?.id) {
            return this.goBack();
        }

        history.back();
    };

    isActiveSlide = (slideType: E.SlideType) => this.currentSlideType === slideType;

    setCurrentSlideType = (slideType: E.SlideType) => {
        this.currentSlideType = slideType;
    };

    toggleIsTermsAndConditionModal = () => {
        this.isTermsAndConditionsModal = !this.isTermsAndConditionsModal;
    };

    goBack = () => {
        if (stores.display.runBackFrom('buy')) {
            return;
        }

        this.router.$.home.go({});
    };

    openStartDesign = () => {
        this.isStartDesign = true;
    };

    closeStartDesign = () => {
        this.isStartDesign = false;
        this.isKrookieModal = true;
        stores.projects.resetDraft();
    };

    setCardLiked = () => {
        (async () => {
            if (!this.design) {
                return;
            }

            const res = await stores.designs.postLiked(this.design);

            if (!res) {
                return;
            }

            this.design.toggleLiked();
        })();
    };

    submitStartDesign = async () => {
        if (!this.design || !this.isAcceptedTermsAndConditions) {
            return;
        }

        const designId = this.router.$.design.params.designId;

        this.draft.designId = new Id(designId, 'external');

        const projectId = await restQuery.project.postProject(this.draft);

        if (!projectId) {
            return;
        }

        this.draft.id.set(projectId, 'external');

        const res = await stores.projects.update(this.draft, true);

        if (!res) {
            return;
        }

        runInAction(() => {
            stores.projects.adminProjectsDesign.reload();
        });

        stores.projects.resetDraft();

        if (stores.display.isAdmin) {
            this.router.$.admin.$.projects.$.sub.$.design.$.designDetails
                .go({ id: projectId });

            return;
        }

        this.router.$.project.$.sub.$.details.go({ id: projectId });
    };

    acceptTermsAndConditions = () => {
        this.isAcceptedTermsAndConditions = !this.isAcceptedTermsAndConditions;
    };

    openDesign = (id?: number) => {
        if (!id) {
            return;
        }

        stores.designs.openDesign(id);
    };

    openCompanyProfile = (id: number) => stores
        .display
        .router
        .$.context
        .$.details
        .go({
            id,
            type: E.RoleInCompany.consultant,
        });

    loadConsultantById = (id: number) => {
        (async () => {
            const consultant = await restQuery.getConsultant(id);

            if (!consultant) {
                this.isLoading = false;
                this.goBack();
                return;
            }

            runInAction(() => {
                this.consultant = consultant;
                this.isLoading = false;
            });

            const architect = this.design?.architect;

            if (!architect) {
                return;
            }

            architect.setRole(consultant.employeeRelations[architect.phone]);
        })();
    };

    loadById = async (id: number) => {
        this.isLoading = true;

        const design = await restQuery.design.getDesign(id);

        if (!design) {
            this.goBack();
            return;
        }

        runInAction(() => {
            this.design = design;
        });

        this.loadConsultantById(design.consultantId);
    };

    setDesignLiked = () => {
        (async () => {
            if (!this.design) {
                return;
            }

            const res = await stores.designs.postLiked(this.design);

            if (!res) {
                return;
            }

            stores.designs[`${this.design.liked ? 'decrease' : 'increase'}LikedCount`]();

            this.design.toggleLiked();

            if (stores.designs.filters.liked) {
                stores.designs.designs.remove(this.design);
                stores.designs.decreaseDesignCount();
            }
        })();
    };

    setIsKrookieModal = (value: boolean) => {
        if (!this.errorListHolder.test()) {
            return;
        }

        this.isKrookieModal = value;
    };

    setSliderCurrent = (value: number, length: number) => {
        this.sliderCurrent = Math.max(0, Math.min(value, length - 1));
    };
}
