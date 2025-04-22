import { action, runInAction } from 'mobx';
import { E, Img, lang, restQuery, utils } from '~/api';
import type { IconName } from '~/bits';
import { Consultant, Contractor, type CompanyType } from '~/models';
import { stores } from '~/stores';
import { isUrlValid } from '~/utils/string';

export class CompanyProfileVm {
    company?: CompanyType;

    status = E.ContractorStatus.none;

    isLoading = true;

    isShowingDetails = false;

    isPreviousProjects = false;

    currentPreviousProjectId?: number;

    sliderCurrent = 0;

    get avatar() {
        return this.company?.logo?.img;
    }

    get reviewComments() {
        return this.company?.references.map(item => ({
            name: item.clientName,
            avatar: new Img('/assets/graphics/blue_avatar.svg'),
            comment: item.stars.feedBack,
            date: item.projectCompletionDate,
            abilties: {
                recommendation: item.stars.recommendation,
                communication: item.stars.communication,
                cooperation: item.stars.cooperation,
                qualityOfWorks: item.stars.qualityOfWork,
                speedOfWorks: item.stars.speedOfWork,
                management: item.stars.management,
            },
        }));
    }

    constructor(readonly roleInCompany: E.RoleInCompany) {
        makeSafeObservable(this, {
            loadCompany: action,
            changeStatus: action,
            openMoreDetail: action,
            goBack: action,
            switchPreviousProjects: action,
            setPreviousProjectId: action,
            setSliderCurrent: action,
        });

        this.loadCompany();
    }

    get hasNoData() {
        if (!this.company?.references) {
            return true;
        }

        return this.company
            .references
            .filter(ref => ref.status === E.ReviewStatus.approved)
            .length === 0;
    }

    get references() {
        return this.company?.references.toReversed().filter(item => item.status === E.ReviewStatus.approved);
    }

    get sliderData() {
        const reference = this.currentPreviousProjectId
            ? this.references?.find(item => item.id === this.currentPreviousProjectId)
            : this.references?.[0];

        const slides = reference?.images.map(
            img => ({
                id: utils.generateId([], 'id'),
                img: img.img ? img.img : Img.empty(),
                title: `${reference.wilayatName}, ${reference.governorateName}`,
                description: `Completed on ${reference.projectCompletionDate?.format('DD/MM/YYYY') ?? '--'}`,
                alt: 'alt',
            }));

        if (!slides || slides.length === 0) {
            return [
                {
                    id: utils.generateId([], 'id'),
                    img: new Img('/assets/graphics/empty_updates.svg'),
                    title: 'No Reviews',
                    description: 'No Reviews',
                    alt: 'alt',
                },
            ];
        }

        return slides;
    }

    get contact() {
        if (!this.company) {
            return [];
        }

        return [
            { name: 'phone' as const, data: String(this.company.phone) },
            { name: 'email' as const, data: this.company.email },
        ];
    }

    get socialMedia() {
        if (!this.company) {
            return [];
        }

        const allMedia = this.company.marketings.map(item => ({
            name: item.marketingService as IconName,
            url: item.addressUrl,
        }));

        return allMedia.filter(item => isUrlValid(item.url));
    }

    get contractor() {
        return Contractor.is(this.company) ? this.company : undefined;
    }

    get worksInGovernorates() {
        return {
            title: lang.dict.get('worksInGovernorates'),
            list: this.contractor?.workingGovernorates.map(x => x.name) ?? [],
        };
    }

    get registeredAt() {
        return {
            title: lang.dict.get('registeredAt'),
            list: this.company?.namesOfRegisteredAt ?? [],
        };
    }

    get products() {
        return {
            title: lang.dict.get('products'),
            list: this.company?.namesOfProducts ?? [],
        };
    }

    get services() {
        return {
            title: lang.dict.get('services'),
            list: this.company?.namesOfServices ?? [],
        };
    }

    get servicesPrice() {
        return Consultant.is(this.company) ? this.company.servicesPrice : undefined;
    }

    get everyPrice() {
        return Consultant.is(this.company) ? this.company.everyDesignPackagePrice : undefined;
    }

    get everySize() {
        return Consultant.is(this.company) ? this.company.everyDesignPackageSize : undefined;
    }

    get upTo() {
        return Consultant.is(this.company) ? this.company.landTo : undefined;
    }

    get namesAndIconsOfServices() {
        return Consultant.is(this.company) ? this.company.namesAndIconsOfServices : [];
    }

    get namesAndIconsOfProducts() {
        return Consultant.is(this.company) ? this.company.namesAndIconsOfProducts : [];
    }

    get supervisionPrice() {
        return Consultant.is(this.company) ? this.company.supervisionServicePrice : undefined;
    }

    get isProvidingSupervision() {
        return Consultant.is(this.company) ? this.company.isProvideSupervision : false;
    }

    get isProvidingDesign() {
        return Consultant.is(this.company) ? this.company.isProvideDesign : false;
    }

    openMoreDetail = () => {
        this.isShowingDetails = !this.isShowingDetails;
    };

    changeStatus = () => {
        // TODO have to change status or be replaced with some more described functions
    };

    mount = () => {
        if (stores.display.runBackFrom('previous')) {
            this.switchPreviousProjects();
        }
    };

    loadCompany = async () => {
        this.isLoading = true;

        const id = stores.display.router.$.context.$.details.params.id;

        if (this.roleInCompany === E.RoleInCompany.contractor) {
            const contractor = await restQuery.getContractor(id);

            if (!contractor) {
                this.isLoading = false;
                this.goBack();
                return;
            }

            runInAction(() => {
                this.company = contractor;
                this.isLoading = false;
            });

            this.currentPreviousProjectId = this.references?.[0].id;
        }

        if (this.roleInCompany === E.RoleInCompany.consultant) {
            const consultant = await restQuery.getConsultant(id);

            if (!consultant) {
                this.isLoading = false;
                this.goBack();
                return;
            }

            runInAction(() => {
                this.company = consultant;
                this.isLoading = false;
            });

            this.currentPreviousProjectId = this.references?.[0].id;
        }
    };

    goBack = () => {
        if (!this.company) {
            stores.display.router.$.home.go({});
            return;
        }

        stores.display.router.goBack();
    };

    switchPreviousProjects = () => {
        this.isPreviousProjects = !this.isPreviousProjects;
    };

    setPreviousProjectId = (id: number) => {
        this.setSliderCurrent(0, 1);
        this.currentPreviousProjectId = id;
    };

    setSliderCurrent = (value: number, length: number) => {
        this.sliderCurrent = Math.max(0, Math.min(value, length - 1));
    };
}
