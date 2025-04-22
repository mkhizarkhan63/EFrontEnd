import { dtos } from '..';

export const getAvatarId = async (id: number, isCompany: boolean) => {
    const res = await dtos.profile.execGetAvatarIdQuery({ id, isCompany });

    if (!res || !res.result.avatarId) {
        return '';
    }

    return res.result.avatarId;
};
