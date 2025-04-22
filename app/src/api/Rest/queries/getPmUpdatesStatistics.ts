import { dtos } from '..';

export const getPmUpdatesStatistics = async (constructionProjectId: number) => {
    const res = await dtos.workflow.execGetUpdateStatisticsQuery({ constructionProjectId });

    if (!res) {
        return;
    }

    return res.result;
};
