import { ErrorListHolder, Id, T } from '~/api';
import type { ContractorType, CompanyType } from '~/models';

const struct = (isContractor: boolean) => T.type({
    name: T.name(),
    email: T.email(),
    phone: T.mobile(),
    crNumber: T.crNumber(),
    governorate: T.instance(Id),
    wilayat: T.instance(Id),
    organizationsYouAreRegisteredAt: T.optional(T.array()),
    crStartDate: T.optional(T.moment()),
    crExpirationDate: T.optional(T.moment()),
    ...isContractor
        ? {
            governorateYouWorkAt: T.nonempty(T.array()),
            projectSize: T.min(T.number(), 200),
        }
        : {},
});

export class CompanyProfileVm {
    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(Boolean(this.contractor)),
    );

    constructor(
        readonly company: CompanyType,
        readonly errorListHolderParent: ErrorListHolder,
        readonly contractor?: ContractorType,
    ) {
        makeSafeObservable(this);
        errorListHolderParent.setChildren(this.errorListHolder);
    }

    get validationData() {
        const governorateYouWorkAt = Array.from(this.contractor?.governorates ?? []);

        if (this.company.headOfficeGovernorateId) {
            governorateYouWorkAt.push(this.company.headOfficeGovernorateId);
        }

        return {
            name: this.company.name,
            email: this.company.email,
            phone: this.company.phone,
            crNumber: this.company.crNumber,
            governorate: this.company.headOfficeGovernorateId,
            wilayat: this.company.headOfficeWilayatId,
            organizationsYouAreRegisteredAt: this.company.registeredAt,
            crStartDate: this.company.crStartDate,
            crExpirationDate: this.company.crExpirationDate,
            governorateYouWorkAt,
            projectSize: this.contractor?.minimumProjectSize,
        };
    }
}
