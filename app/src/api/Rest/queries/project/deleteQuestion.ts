import { dtos } from '../..';

export const deleteQuestion = async (id: number) => {
    const res = await dtos
        .construction
        .execDeleteProjectQuestionCommand({ id });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
