import { dtos } from '..';

export const getUserInfo = async (profileId?: number) => {
    if (!profileId) {
        return;
    }

    const data = await dtos.profile.execGetUserInfoByIdQuery({ profileId });

    if (!data) {
        return;
    }

    return data.result;
};
