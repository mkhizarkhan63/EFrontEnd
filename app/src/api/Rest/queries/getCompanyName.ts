import { dtos } from '..';

export const getCompanyName = async (id: number) => {
    const res = await dtos.contractor.execListContractorNameByIdsQuery({ ids: [id] });

    if (!res) {
        return;
    }

    return res.result[0].name;
};
