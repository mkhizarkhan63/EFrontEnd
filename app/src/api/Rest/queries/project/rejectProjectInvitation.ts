import { T, dtos, enums, type E } from '~/api';

export const rejectProjectInvitation = async (rejectAll?: boolean, projectId?: number, mode?: E.SpecialProfileMode) => {
    const res = await dtos.profile.execRejectProjectInvitationCommand({
        projectId,
        mode: T.create(mode, enums.SpecialProfileMode.castToExternal),
        rejectAll,
    });

    if (!res) {
        return;
    }

    return res.isSuccess;
};
