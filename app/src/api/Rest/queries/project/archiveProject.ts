import { dtos } from '../..';

export const archiveProject = async (id: number, isUnarchiving?: boolean) => {
    const res = isUnarchiving
        ? await dtos.construction.execUpdateUnArchiveProjectCommand({ id })
        : await dtos.construction.execUpdateConstructionProjectStatusToArchivedCommand({ id });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
