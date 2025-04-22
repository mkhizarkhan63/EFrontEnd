import { dtos } from '../..';

export const like = async (designId?: number) => {
    if (!designId) {
        return;
    }

    const result = await dtos.design.execLikeDesignCommand({ designId });

    if (!result || !result.isSuccess) {
        return;
    }

    return result.isSuccess;
};
