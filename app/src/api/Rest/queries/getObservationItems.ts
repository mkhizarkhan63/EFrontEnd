import { dtos } from '..';

export const getObservationItems = async (stageId?: number) => {
    const res = await dtos.workflow.execGetObservationStageItemsQuery({ stageId });

    if (!res) {
        return;
    }

    return res.result.map(item => ({
        nameEn: item.englishName,
        nameAr: item.arabicName,
        id: item.id,
    }));
};
