import { T, type E } from '~/api';
import { dtos, enums } from '..';

export const changeCompanyStatus = async (id: number, status: E.CompaniesStatus) => {
    const res = await dtos.contractor.execUpdateCompanyStatusCommand({
        companyId: id,
        companyStatus: T.create(status, enums.CompanyStatus.castToExternal),
    });

    return Boolean(res);
};
