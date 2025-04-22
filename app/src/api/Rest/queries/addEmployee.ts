import { E, type ErrorListHolder, T } from '~/api';
import { type CompanyType, LinkedProfile } from '~/models';
import { stores } from '~/stores';
import { dtos, enums } from '..';
import { runInAction } from 'mobx';

export const addEmployee = async (company: CompanyType, employee: { phone: string; category: E.AffiliationType }, errorHolder: ErrorListHolder) => {
    const data = company.type === E.ProfileType.consultant
        ? await dtos.contractor.execCreateConsultantLinkedProfileCommand({
            companyId: company.externalId,
            consultantAffiliationType: T.create(
                employee.category,
                enums.ConsultantAffiliationType.castToExternal,
            ),
            phone: employee.phone,
        })
        : await dtos.contractor.execCreateContractorLinkedProfileCommand({
            companyId: company.externalId ?? 0,
            contractorAffiliationType: T.create(
                employee.category,
                enums.ContractorAffiliationType.castToExternal,
            ),
            phone: employee.phone,
            userId: 1,
        });

    if (!data) {
        return false;
    }

    if (data.errors?.alreadyAssign) {
        runInAction(() => {
            errorHolder.add({
                value: '',
                key: 'alreadyAssign',
                type: 'alreadyAssign',
                refinement: undefined,
                message: 'The employee already added to the company',
                branch: [''],
                path: ['alreadyAssign'],
            });
        });

        errorHolder.clearListTimeout = setTimeout(() => {
            errorHolder.clear();
            errorHolder.clearListTimeout = undefined;
        }, 5000);

        return;
    }

    const linkedProfile = LinkedProfile.create({
        id: stores.idCollection.getInternal('linkedProfile', data.id),
        phone: employee.phone,
        affiliationType: employee.category,
        companyId: company.externalId,
    });

    company.addEmployee(linkedProfile);

    return true;
};
