import { E, T } from '~/api';
import type { CompanyType, EmployeeType } from '~/models';
import { dtos, enums } from '..';

type Action = 'update' | 'accept';

const editEmployee = async (
    employee: EmployeeType,
    company: CompanyType,
    type: Action,
    role?: E.AffiliationType,
) => {
    if (!employee.externalId || !company.externalId) {
        return;
    }

    const isUpdate = type === 'update';
    const action = isUpdate
        ? dtos.contractor.LinkedProfileUpdateType.updateRecord
        : dtos.contractor.LinkedProfileUpdateType.acceptProfile;

    const affiliationType = isUpdate ? role : employee.affiliationType;

    const sharedData = {
        id: employee.externalId,
        companyId: company.externalId,
        phone: employee.phone,
        userId: employee.userId,
        updateType: action,
    };

    if (company.type === E.ProfileType.consultant) {
        await dtos.contractor.execUpdateConsultantLinkedProfileCommand({
            ...sharedData,
            consultantAffiliationType: T.create(
                affiliationType,
                enums.ConsultantAffiliationType.castToExternal,
            ),
        });
        return;
    }

    await dtos.contractor.execUpdateContractorLinkedProfileCommand({
        ...sharedData,
        contractorAffiliationType: T.create(
            affiliationType,
            enums.ContractorAffiliationType.castToExternal,
        ),
    });
};

export const editEmployeeRole = async (
    employee: EmployeeType,
    company: CompanyType,
    role: E.AffiliationType,
) => {
    await editEmployee(employee, company, 'update', role);
    employee.setAffiliation(role);
};

export const acceptEmployee = async (
    employee: EmployeeType,
    company: CompanyType,
) => {
    await editEmployee(employee, company, 'accept');
    employee.accept();
};
