import { dtos } from '~/api';

export const getStageTemplateNameQuery = async (stageTemplateName: string) => {
    const data = await dtos.construction.execGetStageTemplateNameQuery({ stageTemplateName });

    if (!data) {
        return;
    }

    return data.result;
};
