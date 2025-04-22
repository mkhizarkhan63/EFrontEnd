import { Id, dtos } from '~/api';

export const postDraftSow = async () => {
    const data = await dtos.construction.execCreateDraftSowVersionCommand(undefined);

    if (data === false) {
        return false;
    }

    return data.id ? Id.init(data.id, 'external') : false;
};
