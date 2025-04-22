import moment from 'moment';
import { dtos, Img, restQuery, type Paging, T } from '~/api';
import { User } from '~/models';
import { stores } from '~/stores';

export const getUsers = async (searchValue: string, paging?: Paging) => {
    const data = await dtos.profile.execListUserManagementProfilesQuery(
        {
            phoneNumber: searchValue,
            userName: searchValue,
            ...paging?.toQuery(),
        },
    );

    if (!data) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);
    paging?.setRowCount(data.rowCount ?? 0);

    const { result } = data;

    const ids = result.map(item => item.id);

    const amountProjects = await restQuery.getUserManagementStatistics(ids) ?? [];

    return result.map(external => {
        const avatarImg = () => {
            if (!external.profilePicture || external.profilePicture.length < 0) {
                return '';
            }

            return Img.tryCreate(external.profilePicture);
        };

        return User.create({
            id: stores.idCollection.getInternal('user', external.id),
            name: external.name,
            email: external.email,
            mobile: external.phone,
            avatar: avatarImg(),
            signedUp: moment.utc(external.signedUpOn).local(),
            companyAssociations: external.contextsAffiliation?.length,
            numberOfProjects: amountProjects
                .find(el => el.userId === external.id)?.numberOfProjects,
            lastActivity: T.create(external.lastSignIn, T.Timestamp),
        });
    });
};
