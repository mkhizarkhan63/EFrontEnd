import { dtos } from '..';

export const deleteConsultant = async (id: number) => {
    const res = await dtos.contractor.execDeleteConsultantCommand({ id });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
