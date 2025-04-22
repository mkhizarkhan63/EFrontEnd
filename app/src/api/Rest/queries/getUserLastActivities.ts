import moment from 'moment';
import { dtos } from '~/api';

export const getUserLastActivities = async (profileIds?: number[]) => {
    if (!profileIds) {
        return [];
    }

    const data = await dtos.log.execListLatestUsersActivityDateQuery({ profileIds });

    if (!data || !data.result) {
        return [];
    }

    return data.result.map(toInternal);
};

const toInternal = (external: dtos.log.LastLogDateDto) => ({
    userId: external.userId,
    lastActivity: moment.utc(external.logDate).local(),
});
