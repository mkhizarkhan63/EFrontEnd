import * as dtos from '../dtos/profile';

export const updateProfileInfo = async (name?: string, email?: string, avatar?: string) => await dtos.execPatchProfileInfoCommand({
    name: name,
    email: email,
    profilePicture: avatar,
});
