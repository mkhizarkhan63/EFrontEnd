import { dtos } from '..';

export const getObservationStages = async (projectId: number) => {
    const res = await dtos.workflow.execGetListStageNameQuery({ projectId });

    if (!res) {
        return;
    }

    return res.result.map(item => ({
        nameEn: item.nameEn,
        nameAr: item.nameAr,
        isActive: item.isActive,
        order: item.order,
    }));
};
