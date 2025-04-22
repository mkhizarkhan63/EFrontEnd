import { action, runInAction } from 'mobx';
import { clone } from 'mobx-state-tree';
import { ErrorListHolder, type E } from '~/api';
import { Consultant, Contractor, type CompanyType, type ConsultantType, type ContractorType } from '~/models';
import { stores } from '~/stores';
import { loadFileNames } from '~/utils';

export class CompanyDetailVm {
    isLoading = false;

    openedSection?: E.CompanySteps;

    previousSection?: E.CompanySteps;

    draft: CompanyType;

    errorListHolder = ErrorListHolder.mimic();

    initial = true;

    constructor(readonly company: CompanyType) {
        makeSafeObservable(this, {
            company: false,
            mount: false,
            getNamesOfResources: false,
            openSection: action,
            closeSection: action,
            save: action,
            setInitail: action,
            isOpened: false,
        });

        this.draft = clone(company);
    }

    get contractor() {
        if (Contractor.is(this.company)) {
            return this.draft as ContractorType;
        }

        return undefined;
    }

    get consultant() {
        if (Consultant.is(this.company)) {
            return this.company as ConsultantType;
        }

        return undefined;
    }

    get hasServices() {
        if (this.consultant) {
            return this.consultant.servicesPrice > 0
                || this.consultant.supervisionServicePrice.length > 0;
        }

        if (this.contractor) {
            return this.contractor.namesOfProducts.length > 0
            || this.contractor.namesOfServices.length > 0;
        }

        return false;
    }

    get hasHistory() {
        return this.company.projectsDelivered > 0;
    }

    get hasResources() {
        return this.company.resources.length > 0;
    }

    get hasReferences() {
        return Boolean(this.company.references.find(() => true)?.clientName?.length);
    }

    get hasDocuments() {
        return this.company.files.length > 0;
    }

    isOpened = (section: E.CompanySteps) => this.openedSection === section;

    mount = () => {
        loadFileNames(this.company.files.map(x => x.data));
    };

    getNamesOfResources = (type: E.ResourceType) => this.company.resources
        .filter(item => item.resourceType === type)
        .map(item => {
            if (item.machine !== '') {
                return {
                    value: item.machine,
                    toHighlight: String(item.numberOfUnit),
                };
            }

            return {
                value: this.company.allSpecializations.find(x => x.id === item.specializationId)?.name ?? '',
                toHighlight: String(item.numberOfUnit),
            };
        });

    openSection = (section: E.CompanySteps) => {
        this.draft = clone(this.company);
        this.openedSection = section;
        this.previousSection = section;
    };

    closeSection = () => {
        this.openedSection = undefined;
    };

    save = async (setCompany: (company: CompanyType) => void) => {
        if (!this.openedSection || this.isLoading || !this.errorListHolder.test()) {
            return;
        }

        this.isLoading = true;

        if (Consultant.is(this.draft)) {
            const res = await stores.consultantProfile.updateProfile(this.openedSection, this.draft);

            if (!res) {
                runInAction(() => {
                    this.isLoading = false;
                });
                return;
            }

            setCompany(this.draft);
        }

        if (Contractor.is(this.draft)) {
            const res = await stores.contractorProfile.updateProfile(this.openedSection, this.draft);

            if (!res) {
                runInAction(() => {
                    this.isLoading = false;
                });
                return;
            }

            setCompany(this.draft);
        }

        runInAction(() => {
            this.isLoading = false;
        });
    };

    setInitail = () => {
        this.initial = false;
    };
}
