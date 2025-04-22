import { dtos } from '../..';

export const updateProjectBudget = async (projectId: number, totalClientMaterialsPayment: number) => {
    const res = await dtos.pm.execUpdateBudgetMaterialsCommand({
        projectId,
        totalClientMaterialsPayment,
    });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
