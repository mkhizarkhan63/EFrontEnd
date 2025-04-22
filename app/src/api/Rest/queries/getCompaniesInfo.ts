import { dtos } from '..';

export const getCompaniesInfo = async (ids: number[]) => {
    if (ids.length === 0) {
        return [];
    }

    const data = await dtos.contractor.execListCompanyInformationByIdsQuery({ ids });

    if (!data) {
        return [];
    }

    return data.result;
};
