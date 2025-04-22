import { dtos } from '../..';

export const deleteProject = async (id: number) => {
    const res = await dtos.construction.execDeleteConstructionProjectCommand({ id });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
