import { dtos } from '..';

export const deleteUser = async (id: number) => {
    const response = await dtos.profile.execDeleteProfileCommand({ id });

    if (!response) {
        return false;
    }

    return response.id;
};
