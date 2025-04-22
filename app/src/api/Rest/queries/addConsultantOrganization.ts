import { T, type E, type Id, dtos, enums } from '~/api';

export const addConsultantOrganization = async (consultantId: Id, organization: E.Organization) => {
    if (consultantId.isType('internal')) {
        return;
    }

    const response = await dtos.contractor.execCreateConsultantOrganizationCommand({
        organization: T.create(
            organization,
            enums.ConsultantOrganization.castToExternal,
        ),
        otherOrganization: '',
        companyId: consultantId.asNumber(),
    });

    if (!response) {
        return;
    }

    return response.id;
};
