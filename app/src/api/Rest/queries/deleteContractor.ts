import { dtos } from '..';

export const deleteContractor = async (id: number) => {
    const res = await dtos.contractor.execDeleteContractorCommand({ id });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
