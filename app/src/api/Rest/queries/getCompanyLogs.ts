import moment from 'moment';
import { dtos, type Paging, T, enums } from '~/api';
import { stores } from '~/stores';
import { Log } from '~/models';

export const getCompanyLogs = async (companyId?: number, paging?: Paging) => {
    const data = await dtos.log.execListCompanyLogByCompanyIdQuery({
        ... paging ? paging.toQuery() : {},
        companyId,
    });

    if (!data || !data.result) {
        return [];
    }

    return data.result.map(toInternalLog);
};

const toInternalLog = (external: dtos.log.CompanyLogDto) => Log.create({
    id: stores.idCollection.getInternal('log'),
    description: external.message,
    descriptionArabic: external.messageArabic,
    date: moment(external.logDate),
    accountType: T.create(
        external.issuerType,
        enums.RoleInCompany.castToInternal,
    ),
});
