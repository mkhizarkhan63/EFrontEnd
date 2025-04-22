import { T } from '~/api';
import { dtos, enums } from '..';

export const getCompanyStatus = async (companyId: number) => {
    const data = await dtos.contractor.execGetCompanyStatusQuery({
        companyId,
    });

    if (!data || !data.result) {
        return;
    }

    return T.create(
        data.result.status,
        enums.CompaniesStatus.castToInternal,
    );
};
