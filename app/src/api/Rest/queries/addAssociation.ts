import { E, T } from '~/api';
import { type UserType, type CompanyAssociationType } from '~/models';
import { dtos, enums } from '..';

export const addAssociation = async (user: UserType, company: CompanyAssociationType) => {
    const data = company.profileType === E.RoleInCompany.consultant
        ? await dtos.contractor.execCreateConsultantLinkedProfileCommand({
            companyId: company.externalId,
            consultantAffiliationType: T.create(
                company.category,
                enums.ConsultantAffiliationType.castToExternal,
            ),
            phone: user.mobile,
            userId: user.externalId,
        })
        : await dtos.contractor.execCreateContractorLinkedProfileCommand({
            companyId: company.externalId ?? 0,
            contractorAffiliationType: T.create(
                company.category,
                enums.ContractorAffiliationType.castToExternal,
            ),
            phone: user.mobile,
            userId: user.externalId ?? 0,
        });

    if (!data) {
        return false;
    }

    return true;
};
