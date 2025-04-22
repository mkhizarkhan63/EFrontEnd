import { dtos } from '..';

export const inviteUser = async (name: string, phone: string, email?: string) => {
    const res = await dtos.profile.execInviteUserCommand({ name, phone, email });

    if (!res) {
        return false;
    }

    return res.isSuccess;
};
