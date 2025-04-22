import type { ErrorListHolder } from '~/api';
import { Contractor, type CompanyType, type ConsultantType } from '~/models';
import { utilsArray } from '~/utils';
import { CompanyDocumentsVm } from './CompanyDocuments/CompanyDocuments.vm';
import { CompanyHistoryVm } from './CompanyHistory/CompanyHistory.vm';
import { CompanyOwnerVm } from './CompanyOwner/CompanyOwner.vm';
import { CompanyProfileVm } from './CompanyProfile/CompanyProfile.vm';
import { CompanyReferencesVm } from './CompanyReferences/CompanyReferences.vm';
import { CompanyResourceVm } from './CompanyResource/CompanyResource.vm';
import { ConsultantServicesVm } from './CompanyServices/ConsultantServices/ConsultantServices.vm';
import { ContractorServicesVm } from './CompanyServices/ContractorServices/ContractorServices.vm';

const getContractor = (company: CompanyType) => (
    Contractor.is(company)
        ? company
        : undefined
);

const getVm = (step: number, company: CompanyType, errorListHolder: ErrorListHolder) => {
    const contractor = getContractor(company);

    if (step === 2) {
        return contractor
            ? new ContractorServicesVm(contractor, errorListHolder)
            : new ConsultantServicesVm(company as ConsultantType, errorListHolder);
    }

    const vms = [
        CompanyOwnerVm,
        CompanyProfileVm,
        undefined,
        CompanyHistoryVm,
        CompanyResourceVm,
        CompanyReferencesVm,
        CompanyDocumentsVm,
        CompanyOwnerVm,
    ];

    const vm = utilsArray.extract(vms, step);
    return vm ? new vm(company, errorListHolder, contractor) : undefined;
};

export const testMany = (
    start: number,
    end: number,
    company: CompanyType,
    errorListHolder: ErrorListHolder,
) => {
    for (let step = start; step <= end; step++) {
        const vm = getVm(step, company, errorListHolder);
        if (!vm?.errorListHolder.test()) {
            return step;
        }
    }

    return true;
};
