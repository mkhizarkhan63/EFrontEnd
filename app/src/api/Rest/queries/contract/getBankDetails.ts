import { T, type E } from '~/api';
import { dtos, enums } from '../..';
import { BankDetails } from '~/models';

export const getBankDetails = async (projectId: number, contextType: E.RoleInCompany) => {
    const res = await dtos.contract.execGetContractBankDetailsQuery({
        constructionProjectId: projectId,
        contextType: T.create(
            contextType,
            enums.RoleInCompany.castToExternal,
        ),
    });

    if (!res) {
        return false;
    }

    return BankDetails.create({
        bankName: res.result?.bankName,
        accountHolderName: res.result?.accountHolderName,
        accountNumber: res.result?.accountNumber,
    });
};
