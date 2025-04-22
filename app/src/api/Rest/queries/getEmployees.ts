import { Img, T } from '~/api';
import { Employee, type LinkedProfileType } from '~/models';
import { stores } from '~/stores';
import { utilsArray } from '~/utils';
import { dtos, enums } from '..';

type FromLinkedProfiles = Record<string, LinkedProfileType>;

export const getEmployees = async (companyId?: number, fromLinkedProfiles?: FromLinkedProfiles) => {
    if (!companyId) {
        return [];
    }

    const data = await dtos.profile.execListEmployeeInfoByCompanyIdQuery({ companyId });

    if (!data) {
        return [];
    }

    return utilsArray
        .removeCopies(data.result, 'phone')
        .map(employee => {
            const linkedProfile = fromLinkedProfiles?.[employee.phone ?? ''];
            const userId = linkedProfile?.userId ?? employee.id;

            return Employee.create({
                id: stores.idCollection.getInternal('employee', linkedProfile?.externalId ?? employee.id),
                userId: userId,
                avatar: Img.tryCreate(employee.profilePicture),
                email: employee.email,
                name: employee.name,
                phone: employee.phone,
                status: linkedProfile?.status,
                affiliationType: T.create(employee.affiliationType, enums.AffiliationType.castToInternal),
            });
        });
};
