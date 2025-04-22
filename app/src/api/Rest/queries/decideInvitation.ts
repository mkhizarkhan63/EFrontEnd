import { dtos } from '..';

export const decideInvitation = async (accept: boolean, companyId: number) => {
    const res = await dtos.profile.execDecideInvitationCommand({ accept, companyId });

    if (!res) {
        return;
    }

    return true;
};
