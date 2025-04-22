import { dtos } from '../..';

export const rejectConstructionProject = async (id: number, comment: string) => {
    const response = await dtos.construction.execUpdateConstructionProjectStatusToRejectedCommand({ id, comment });

    if (!response) {
        return;
    }

    return response.isSuccess;
};
