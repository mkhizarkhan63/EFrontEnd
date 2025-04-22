import moment from 'moment';
import { dtos, T, enums } from '~/api';
import { stores } from '~/stores';
import { Log } from '~/models';

export const getUserLogs = async (userId?: number) => {
    if (!userId) {
        return [];
    }

    const data = await dtos.log.execListUserHistoryLogsQuery({ userId });

    if (!data || !data.result) {
        return [];
    }

    return data.result.map(toInternalLog);
};

const toInternalLog = (external: dtos.log.LogDto) => Log.create({
    id: stores.idCollection.getInternal('log'),
    description: external.message,
    date: moment(external.logDate),
    accountType: T.create(
        external.issuerType,
        enums.RoleInCompany.castToInternal,
    ),
});

