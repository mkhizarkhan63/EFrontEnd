import { Id, dtos } from '~/api';

export const createDraftStage = async (id: number) => {
    const data = await dtos.construction.execCreateDraftStageTemplateCommand({ id });

    if (!data) {
        return;
    }

    return Id.tryInit(data.id, 'external');
};
