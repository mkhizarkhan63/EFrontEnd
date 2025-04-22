import { action } from 'mobx';
import { E, ErrorListHolder, T } from '~/api';
import { MarketingInformation, type CompanyType, type ContractorType } from '~/models';
import { generateObject } from '~/utils';

const struct = (isContractor: boolean) => {
    const history = {
        deliveredProjects: T.min(T.number(), 1),
        projectsWorkedOnAtOnce: T.min(T.number(), 1),
        largestProjectAwarded: T.size(T.number(), 1, 10_000_000),
        experience: T.size(T.number(), 0, 50),
    };

    const forContractor = {
        onAverageBlackBuilding: T.size(T.number(), 1, 10_000),
        onAverageTurnkeyProject: T.size(T.number(), 1, 10_000),
    };

    const marketingInformation = generateObject(
        () => T.string(),
        ...Object.values(E.MarketingService),
    );

    return T.type({
        ...history,
        ...marketingInformation,
        ...isContractor ? forContractor : {},
    });
};

export class CompanyHistoryVm {
    marketing = MarketingInformation.createEmptyMarketing();

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(Boolean(this.contractor)),
    );

    constructor(
        readonly company: CompanyType,
        readonly errorListHolderParent: ErrorListHolder,
        readonly contractor?: ContractorType,
    ) {
        makeSafeObservable(this, {
            setMarketingOf: action,
        });

        errorListHolderParent.setChildren(this.errorListHolder);

        company.marketings.forEach(marketing => {
            this.marketing[marketing.marketingService] = marketing.addressUrl;
        });
    }

    get validationData() {
        return {
            deliveredProjects: this.company.projectsDelivered,
            projectsWorkedOnAtOnce: this.company.projectsWorkedAtOnce,
            largestProjectAwarded: this.company.largestProjectAwarded,
            experience: this.company.yoursYearsOfExperience ?? 100,
            onAverageBlackBuilding: this.contractor?.chargeBlackProjects,
            onAverageTurnkeyProject: this.contractor?.chargeTurnkeyProjects,
            companyWebsite: this.marketing.companyWebsite,
            instagram: this.marketing.instagram,
            linkedIn: this.marketing.linkedIn,
            twitter: this.marketing.twitter,
            pinterest: this.marketing.pinterest,
            dribbble: this.marketing.dribbble,
            whatsapp: this.marketing.whatsapp,
            behance: this.marketing.behance,
            tikTok: this.marketing.tikTok,
            houzz: this.marketing.houzz,
            other: this.marketing.other,
        };
    }

    setMarketingOf = (type: E.MarketingService, value: string) => {
        this.marketing[type] = value;

        const companyMarketing = this.company.marketings.find(item => item.marketingService === type);

        if (!companyMarketing) {
            this.company.addMarketing(type, value);
            return;
        }

        companyMarketing.setAddressUrl(value);
    };
}
