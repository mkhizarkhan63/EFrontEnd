import { T, type E } from '~/api';
import { dtos, enums } from '..';

export const inviteOwnCompany = async (
    phoneNumber: string,
    companyName: string,
    projectId: number,
    contextType: E.RoleInCompany,
    email?: string,
) => {
    const res = await dtos.construction.execCreateMyOwnInvitationCommand({
        phoneNumber,
        companyName,
        projectId,
        email,
        contextType: T.create(
            contextType,
            enums.RoleInCompany.castToExternal,
        ),
    });

    if (!res) {
        return;
    }

    return {
        refferalValidation: res.referralValidation,
        isNotAlreadyInvited: res.errors.isNotAlreadyInvited,
    };
};
