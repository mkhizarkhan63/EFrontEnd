import { dtos, models } from '~/api';

export const getPmBudget = async (projectId: number) => {
    const res = await dtos.pm.execGetProjectBudgetQuery({ projectId });

    if (!res) {
        return;
    }

    return models.toInternalPmBudget(res.result);
};
