import { action, autorun } from 'mobx';
import { ChangesKeeper, E, ErrorListHolder, lang, restClient } from '~/api';
import { MembershipServiceType, MunicipalityConsultantType, ProfileType } from '~/api/Enums';
import { StepBarStatus } from '~/bits';
import {
    Consultant,
    Contractor,
    COMPANY_WATCHED_KEYS,
    type CompanyType,
    type ContractorType,
    type ConsultantType,
    FileData,
} from '~/models';
import { CompanyForms } from '~/partials';
import { stores } from '~/stores';
import { loadFileNames } from '~/utils';

type Changes =
    | ChangesKeeper<CompanyType>
    | ChangesKeeper<ContractorType>
    | ChangesKeeper<ConsultantType>
    | ChangesKeeper<Record<string, unknown>>;

type Service = {
    id: string;
    name: string;
    icon: string;
    description: string[];
    price: number;
};

export class ProfileRegistrationVm {



    servicesContractAgreement = false

    // step = E.CompanySteps.ownerInfo;
    step = E.CompanySteps.companyInfo;

    isOwnOtherCompany = false;

    isRegisteredMunicipality = true;

    isLoading = false;

    isUpdating = false;

    isStarted = false;

    isNew = true;

    isDone = false;

    mobileMenuIsVisible = true;

    draft?: CompanyType;

    stepList = [
        // E.CompanySteps.ownerInfo,
        E.CompanySteps.companyInfo,
        E.CompanySteps.productsServices,
        E.CompanySteps.companyResource,
        E.CompanySteps.companyHistory,
        E.CompanySteps.companyMarketing,
        E.CompanySteps.documents,
    ];

    changesKeeper: Changes = new ChangesKeeper({});

    errorListHolder = ErrorListHolder.mimic();

    disposers: Array<() => void> = [];

    constructor(isNew?: boolean) {
        makeSafeObservable(this, {
            goNextStep: action,
            goPrevStep: action,
            goBack: false,
            setStep: action,
            start: action,
            loadProfile: action,
            updateProfile: action,
            setWatchedKeys: action,
            setConsultantKeys: action,
            setContractorKeys: action,
            jumpToStep: action,
            update: action,
            submit: action,
            setMobileMenuIsVisible: action,
            setIsUpdating: action,
        });

        if (isNew) {
            this.changesKeeper.setShouldBlock(true);
            return;
        }

        const { id, type, step } = this.params;

        this.loadProfile(type, id);
        this.setStep(step);
    }

    mount = () => {
        if (!this.isStarted) {
            return;
        }

        this.disposers.push(autorun(() => {
            this.step = this.params.step;
        }));
    };

    unmount = () => {
        this.changesKeeper.setShouldBlock(false);

        this.disposers = this.disposers.filter(d => {
            d();
            return false;
        });

        this.changesKeeper.dispose();
    };

    get isCreating() {
        return !this.draft?.externalId;
    }

    get contractor() {
        if (Contractor.is(this.draft)) {
            return this.draft;
        }

        return undefined;
    }

    get stepNumber() {
        return this.stepList.indexOf(this.step);
    }

    get params() {
        return stores.display.router.$.company.$.edit.params;
    }

    get title() {
        switch (this.draft?.type) {
            case E.ProfileType.consultant:
                return lang.dict.get('consultantRegistration');
            case E.ProfileType.contractor:
                return lang.dict.get('contractorRegistration');
            case E.ProfileType.architect:
                return lang.dict.get('architectRegistration');
            case E.ProfileType.developer:
                return lang.dict.get('developerRegistration');
            default:
                return '';
        }
    }

    get sidebarData() {
        const names = this.sidebarTitles;

        return this.stepList
            .map((step, i) => ({
                name: names[i] ?? '?',
                status: this.getStatusOfStep(i),
                onClick: () => this.jumpToStep(step),
            }));
    }



    get sidebarTitles() {

        if (!this.draft) {
            return [];
        }

        switch (this.draft.type) {
            case E.ProfileType.consultant:
                if (this.selectedServices.length === 0)
                    this.selectedServices = [E.MembershipServiceType.supervision];
                return [
                    //  lang.dict.get('ownerInformation'),
                    lang.dict.get('companyInformation'),
                    lang.dict.get('services'),
                    lang.dict.get('resources'),
                    lang.dict.get('history'),
                    lang.dict.get('marketing'),
                    lang.dict.get('documents'),
                ];
            case E.ProfileType.contractor:
                //by default service
                if (this.selectedServices.length === 0)
                    this.selectedServices = [E.MembershipServiceType.construction];
                return [
                    // lang.dict.get('ownerInformation'),
                    lang.dict.get('companyInformation'),
                    lang.dict.get('services'),
                    lang.dict.get('resources'),
                    lang.dict.get('history'),
                    lang.dict.get('marketing'),
                    lang.dict.get('documents'),
                ];
            case E.ProfileType.developer:
                if (this.selectedServices.length === 0)
                    this.selectedServices = [E.MembershipServiceType.developer];
                return [
                    //  lang.dict.get('ownerInformation'),
                    lang.dict.get('companyInformation'),
                    lang.dict.get('services'),
                    lang.dict.get('resources'),
                    lang.dict.get('history'),
                    lang.dict.get('marketing'),
                    lang.dict.get('documents'),
                ];
            case E.ProfileType.architect:
                if (this.selectedServices.length === 0)
                    this.selectedServices = [E.MembershipServiceType.design];
                return [
                    //lang.dict.get('ownerInformation'),
                    lang.dict.get('companyInformation'),
                    lang.dict.get('services'),
                    lang.dict.get('resources'),
                    lang.dict.get('history'),
                    lang.dict.get('marketing'),
                    lang.dict.get('documents'),
                ];
            // case E.ProfileType.supplier:
            //     return [];
            default:
                return [];
        }
    }

    update = async (step: E.CompanySteps) => {
        if (this.isUpdating) {
            return true;
        }

        if (this.changesKeeper.hasBeenChanged || this.isCreating) {
            this.setIsUpdating(true);

            const res = await this.updateProfile(step);

            this.setIsUpdating(false);

            return res;
        }

        return true;
    };

    updateProfile = (step: E.CompanySteps) => {
        // If profile isn't created yet don't send update command when in first two steps
        if (
            !this.draft?.externalId
            && [
                // E.CompanySteps.ownerInfo,
                E.CompanySteps.companyInfo,
            ].includes(step)) {
            this.step = step;
            return false;
        }

        if (Contractor.is(this.draft)) {
            return stores.contractorProfile.updateProfile(this.step, this.draft);
        }

        if (Consultant.is(this.draft)) {
            return stores.consultantProfile.updateProfile(this.step, this.draft);
        }

        return false;
    };

    jumpToStep = (step: E.CompanySteps) => {
        if (!this.draft?.externalId) {
            return;
        }

        this.setStep(step);
    };

    setOwnOtherCompanyChecked = () => {
        this.isOwnOtherCompany = !this.isOwnOtherCompany;
    }

    setRegisteredMunicipalityChecked = () => {
        this.isRegisteredMunicipality = !this.isRegisteredMunicipality;
    }
    goNextStep = async () => {

        if (this.isCreating) {
            this.changesKeeper.setShouldBlock(true);
        }

        const nextStep = this.stepNumber + 1;

        if (nextStep === 7) {
            this.submit();
            return;
        }

        const step = this.stepList[nextStep];

        // if (!this.errorListHolder.test()) {
        //     return;
        // }

        if (!this.draft?.externalId && step !== E.CompanySteps.productsServices) {
            this.step = step;
            return;
        }

        const res = await this.update(step);

        // if (!res) {
        //     return;
        // }

        this.setStep(step);
        this.changesKeeper.markAsUnchanged();
        this.changesKeeper.setShouldBlock(false);
    };

    goServiceContract = async () => {
        this.servicesContractAgreement = true;
    }
    signatureFile = FileData.create({
        name: 'signature.png',
    });
    setSignature = async (dataUrl?: string) => {
        if (!dataUrl) {
            this.signatureFile.removeFile();
            return;
        }

        const res = await fetch(dataUrl);
        const data = await res.blob();

        this.signatureFile.setFile(new File([data], 'signature.png'));
    };


    closeServiceContract = async () => {
        this.servicesContractAgreement = false;
    }
    submit = async () => {
        if (!this.draft) {
            return;
        }

        const test = CompanyForms.testMany(
            1,
            6,
            this.draft,
            this.errorListHolder,
        );

        if (typeof test === 'number') {
            this.setStep(this.stepList[test]);
            this.changesKeeper.setShouldBlock(true);
            this.errorListHolder.test();
            return;
        }

        // TODO update whole company data with single request

        if (await !this.update(this.step)) {
            return;
        }

        this.changesKeeper.setShouldBlock(false);

        if (this.draft?.status !== E.CompaniesStatus.draft) {
            stores.display.router.$.settings.go({ tab: 'general' });
        }

        this.isDone = true;
    };

    goPrevStep = () => {
        this.setStep(this.stepList[this.stepNumber - 1]);
    };

    goBack = () => {
        stores.display.router.$.company.$.register.go({});
    };

    setStep = (step: E.CompanySteps) => {
        if (!this.draft?.externalId) {
            this.step = step;

            return;
        }

        stores.display.router
            .$.company
            .$.edit
            .go({
                ...this.params,
                step,
            });

        this.setWatchedKeys(step);
    };

    setWatchedKeys = (step = this.params.step) => {
        if (!this.draft) {
            return;
        }

        this.changesKeeper.dispose();

        if ([E.CompanySteps.productsServices, E.CompanySteps.companyResource].includes(step)) {
            if (this.draft.type === E.ProfileType.consultant) {
                this.setConsultantKeys(step);
                return;
            }

            this.setContractorKeys(step);
            return;
        }

        this.changesKeeper = new ChangesKeeper(this.draft, COMPANY_WATCHED_KEYS[step]);
    };

    setConsultantKeys = (step = this.params.step) => {
        if (step === E.CompanySteps.productsServices) {
            this.changesKeeper = new ChangesKeeper(
                this.draft as ConsultantType,
                [
                    'isProvideDesign',
                    'isProvideSupervision',
                    'everyDesignPackagePrice',
                    'everyDesignPackageSize',
                    'governorates',
                    'services',
                    'products',
                ],
            );
            return;
        }

        this.changesKeeper = new ChangesKeeper(
            this.draft as ConsultantType,
            [
                'measuresToMaintainQuality',
                'planningSoftware',
                'otherPlanningSoftware',
                'resources',
            ],
        );
    };

    setContractorKeys = (step = this.params.step) => {
        if (step === E.CompanySteps.productsServices) {
            this.changesKeeper = new ChangesKeeper(
                this.draft as ContractorType,
                ['services', 'products'],
            );
            return;
        }

        this.changesKeeper = new ChangesKeeper(
            this.draft as ContractorType,
            [
                'measuresToMaintainQuality',
                'planningSoftware',
                'otherPlanningSoftware',
                'resources',
                'otherContractingCompanies',
                'companies',
            ],
        );
    };

    private getStatusOfStep = (step: number) => {
        if (step < this.stepNumber) {
            return StepBarStatus.done;
        }

        if (step === this.stepNumber) {
            return StepBarStatus.inProgress;
        }

        return StepBarStatus.wait;
    };

    start = (type: E.ProfileType) => {
        switch (type) {
            case E.ProfileType.consultant:
                this.draft = Consultant.create({ type });
                break;
            case E.ProfileType.contractor:
                this.draft = Contractor.create({ type });
                break;
            case E.ProfileType.architect:
                this.draft = Contractor.create({ type });
                break;
            case E.ProfileType.developer:
                this.draft = Contractor.create({ type });
                break;
        }

        this.isStarted = true;
    };

    loadProfile = async (type: E.ProfileType, id?: number) => {
        this.isLoading = true;

        if (!id) {
            this.isLoading = false;
            return;
        }

        this.isStarted = true;

        restClient.setContextId(id);
        restClient.setType(type as unknown as E.RoleInCompany);

        if (type === E.ProfileType.contractor) {
            this.draft = await stores.contractorProfile.getProfile(id);
        }

        if (type === E.ProfileType.consultant) {
            this.draft = await stores.consultantProfile.getProfile(id);
        }

        if (!this.draft) {
            this.isLoading = false;
            return;
        }

        await loadFileNames(this.draft.files.map(item => item.data));
        this.setWatchedKeys();

        this.isLoading = false;
    };

    setMobileMenuIsVisible = (value: boolean) => {
        this.mobileMenuIsVisible = value;
    };

    setIsUpdating = (isUpdating: boolean) => {
        this.isUpdating = isUpdating;
    };

    selectedServices: string[] = [];

    setSelectedServices = (service: string[]) => {
        this.selectedServices = service;
    }
    handleServiceSelect = (serviceId: string, company: E.ProfileType) => {
        const defaultServices: Record<E.ProfileType, string[]> = {
            [E.ProfileType.contractor]: [E.MembershipServiceType.construction], // For contractors, automatically select 'construction'
            [E.ProfileType.developer]: [E.MembershipServiceType.developer], // Developers will always have 'developer' selected
            [E.ProfileType.consultant]: ['construction', 'developer'], // Consultants may have 'construction' and 'developer' as defaults
            [E.ProfileType.architect]: ['design'], // Architects might always have 'design' selected
        };
        // Get the list of default services for the current company
        const companyDefaultServices = defaultServices[company] || [];

        if (companyDefaultServices.includes(serviceId)) {
            // If the service is a default service for the company, prevent deselecting it
            if (!this.selectedServices.includes(serviceId)) {
                this.selectedServices.push(serviceId); // Add if it's not selected
            }
        } else {
            // For non-default services, allow toggling (select/deselect)
            this.selectedServices = this.selectedServices.includes(serviceId)
                ? this.selectedServices.filter((id) => id !== serviceId)  // Deselect if already selected
                : [...this.selectedServices, serviceId];  // Select if not selected
        }

        // Update selected services (you might want to use a state setter or some observable pattern)
        this.setSelectedServices(this.selectedServices);


        // this.setSelectedServices(
        //     this.selectedServices.includes(serviceId)
        //         ? this.selectedServices.filter((id) => id !== serviceId)
        //         : [...this.selectedServices, serviceId]
        // );
    };

    getSelectedService = (company: E.ProfileType) => {
        return this.servicesData[company];
    }
    getTotalPriceSelectedService = (companyType: E.ProfileType): number => {
        // Access the array of services for the given company type (e.g., contractor, consultant, etc.)
        const services = this.servicesData[companyType];

        return services.reduce((total, service) => {
            // Check if the service is selected
            return this.selectedServices.includes(service.id)
                ? total + service.price
                : total;
        }, 0);
    };

    servicesData: Record<ProfileType, Service[]> = {
        [ProfileType.contractor]: [
            {
                id: E.MembershipServiceType.construction,
                name: E.MembershipServiceType.construction,
                icon: E.MembershipServiceType.construction,
                description: ['constructionP1', 'constructionP2', 'constructionP3', 'constructionP4', 'constructionP5', 'constructionP6'],
                price: 200,
            },
            {
                id: E.MembershipServiceType.developer,
                name: E.MembershipServiceType.developer,
                icon: E.MembershipServiceType.developer,
                description: ['developerP1', 'developerP2', 'developerP3', 'developerP4'],
                price: 200,
            },
        ],
        [ProfileType.consultant]: [
            {
                id: E.MembershipServiceType.supervision,
                name: E.MembershipServiceType.supervision,
                icon: E.MembershipServiceType.supervision,
                description: ['supervisionP1', 'supervisionP2', 'supervisionP3', 'supervisionP4', 'supervisionP5'],
                price: 200,
            },
            {
                id: E.MembershipServiceType.design,
                name: E.MembershipServiceType.design,
                icon: E.MembershipServiceType.design,
                description: ['designP1', 'designP2', 'designP3', 'designP4', 'designP5'],
                price: 200,
            },
            {
                id: E.MembershipServiceType.developer,
                name: E.MembershipServiceType.developer,
                icon: E.MembershipServiceType.developer,
                description: ['developerP1', 'developerP2', 'developerP3', 'developerP4'],
                price: 200,
            },
        ],
        [ProfileType.developer]: [
            {
                id: E.MembershipServiceType.developer,
                name: E.MembershipServiceType.developer,
                icon: E.MembershipServiceType.developer,
                description: ['developerP1', 'developerP2', 'developerP3', 'developerP4'],
                price: 200,
            },
            {
                id: E.MembershipServiceType.construction,
                name: E.MembershipServiceType.construction,
                icon: E.MembershipServiceType.construction,
                description: ['constructionP1', 'constructionP2', 'constructionP3', 'constructionP4', 'constructionP5', 'constructionP6'],
                price: 200,
            },
        ],
        [ProfileType.architect]: [
            {
                id: E.MembershipServiceType.design,
                name: E.MembershipServiceType.design,
                icon: E.MembershipServiceType.design,
                description: ['designP1', 'designP2', 'designP3', 'designP4', 'designP5'],
                price: 0,
            },
            // {
            //     id: E.MembershipServiceType.supervision,
            //     name: E.MembershipServiceType.supervision,
            //     icon: E.MembershipServiceType.supervision,
            //     description: ['supervisionP1', 'supervisionP2', 'supervisionP3', 'supervisionP4', 'supervisionP5'],
            //     price: 200,
            // },
            {
                id: E.MembershipServiceType.developer,
                name: E.MembershipServiceType.developer,
                icon: E.MembershipServiceType.developer,
                description: ['developerP1', 'developerP2', 'developerP3', 'developerP4'],
                price: 200,
            },
        ],
    };

    // selectedServicesMenuType: MunicipalityConsultantType | null = null;

    // get servicesMenuItems() {
    //     return Object.entries(MunicipalityConsultantType).map(([key, value]) => ({
    //         type: key,
    //         label: value,
    //         isSelected: this.selectedServicesMenuType === value,
    //         image: 'developer'
    //     }));
    // }

    // selectType(type: MunicipalityConsultantType) {
    //     this.selectedServicesMenuType = type;
    // }

    municipalityConsultantServices = [
        { type: E.MunicipalityConsultantType.architecturalDesign, isSelected: false, image: E.MunicipalityConsultantType.architecturalDesign },
        { type: E.MunicipalityConsultantType.exteriorDesign, isSelected: false, image: E.MunicipalityConsultantType.exteriorDesign },
        { type: E.MunicipalityConsultantType.mepDesign, isSelected: false, image: E.MunicipalityConsultantType.mepDesign },
        { type: E.MunicipalityConsultantType.structuralDesign, isSelected: false, image: E.MunicipalityConsultantType.structuralDesign },
        { type: E.MunicipalityConsultantType.authorityApprovals, isSelected: false, image: E.MunicipalityConsultantType.authorityApprovals },
    ];


    realStateDeveloperServices = [
        { type: E.RealStateDeveloperServices.customizedInteriorDesign, isSelected: false },
        { type: E.RealStateDeveloperServices.financingPostProject, isSelected: false },
        { type: E.RealStateDeveloperServices.propertySales, isSelected: false },
        { type: E.RealStateDeveloperServices.inHouseConstruction, isSelected: false },
        { type: E.RealStateDeveloperServices.propertyRentManagement, isSelected: false },
        { type: E.RealStateDeveloperServices.propertyMaintenance, isSelected: false },
    ];


    toggleRealStateDeveloperServices(serviceType: string) {
        const service = this.realStateDeveloperServices.find((s) => s.type === serviceType);
        if (service) {
            service.isSelected = !service.isSelected;
        }
    }


    isGovernateModal = false;
    isLocationModal = false;

    locationCloseModal = () => {
        this.isLocationModal = !this.isLocationModal;
    }
    governateCloseModal = () => {
        this.isGovernateModal = !this.isGovernateModal;
    };
}
