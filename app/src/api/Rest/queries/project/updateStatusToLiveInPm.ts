import { dtos } from '~/api';

export const updateStatusToLiveInPm = async (id: number) => {
    const res = await dtos.contract.execUpdateContractStatusToLiveCommand({ id });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
