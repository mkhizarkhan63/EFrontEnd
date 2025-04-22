import { dtos } from '..';

export const getPmIndicators = async (projectId: number) => {
    const response = await dtos.workflow.execGetTabsIndicatorQuery({ projectId });

    if (!response) {
        return {
            tasks: 0,
            payments: 0,
            materials: 0,
            updates: 0,
        };
    }

    return {
        tasks: response.result.tasksCount ?? 0,
        payments: response.result.paymentsCount ?? 0,
        materials: response.result.materialsCount ?? 0,
        updates: response.result.updatesCount ?? 0,
    };
};
