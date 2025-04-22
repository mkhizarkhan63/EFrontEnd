import { dtos } from '..';

export const getCompanyLogos = async (companyIds: number[]) => {
    const data = await dtos.contractor.execListCompanyLogoQuery({ companyIds });

    if (!data) {
        return [];
    }

    return data.result;
};
