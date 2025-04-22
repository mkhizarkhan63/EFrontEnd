import { Img } from '~/api/Img';
import { User } from '~/models';
import { stores } from '~/stores';
import { dtos, restQuery } from '..';

export const getUser = async (userId: number) => {
    const data = await dtos.profile.execGetUserContextQuery({ userId });

    if (!data || !data.result) {
        return false;
    }

    const external = data.result;

    const avatarImg = () => {
        if (!external.profilePicture || external.profilePicture.length < 0) {
            return '';
        }

        return Img.tryCreate(external.profilePicture);
    };

    const amountProjects = await restQuery.getUserManagementStatistics([userId]) ?? [];

    return User.create({
        id: stores.idCollection.getInternal('user', external.id),
        name: external.name,
        email: external.email,
        mobile: external.phone,
        avatar: avatarImg(),
        companyAssociations: external.contextsAffiliation?.length,
        numberOfProjects: amountProjects.find(item => item)?.numberOfProjects,
    });
};
