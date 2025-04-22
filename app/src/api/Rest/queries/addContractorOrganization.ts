import { T, type E, type Id } from '~/api';
import { execCreateContractorOrganizationCommand } from '../dtos/contractor';
import { ContractorOrganization } from '../enums';

export const addContractorOrganization = async (contractorId: Id, organization: E.Organization) => {
    if (contractorId.isType('internal')) {
        return;
    }

    const response = await execCreateContractorOrganizationCommand({
        organization: T.create(
            organization,
            ContractorOrganization.castToExternal,
        ),
        otherOrganization: '',
        companyId: contractorId.asNumber(),
    });

    if (!response) {
        return;
    }

    return response.id;
};
