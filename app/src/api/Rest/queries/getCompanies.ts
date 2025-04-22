import moment from 'moment';
import { T, type Paging } from '~/api';
import { Company, FileData } from '~/models';
import { stores } from '~/stores';
import { dtos, enums } from '..';

export const getCompanies = async (searchValue: string, paging?: Paging) => {
    const data = await dtos.contractor.execListCompanyQuery({
        companyName: searchValue,
        ...paging?.toQuery(),
    });

    if (!data) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);
    paging?.setRowCount(data.rowCount ?? 0);

    const { result } = data;

    return await Promise.all(result.map(toInternalCompany));
};

const toInternalCompany = async (external: dtos.contractor.CompanyManagementDto) => {
    const logo = await FileData.tryFromExternal(external.companyLogoId);
    logo?.loadImg();

    return Company.create({
        id: stores.idCollection.getInternal('company', external.id),
        name: external.name,
        logo,
        type: T.create(
            external.companyType,
            enums.ProfileType.castToInternal,
        ),
        status: T.create(
            external.status,
            enums.CompaniesStatus.castToInternal,
        ),
        pendingPayments: external.pendingPayments,
        projectsParticipated: external.projectsParticipated,
        projectsAwarded: external.projectsAwarded,
        lastActivity: moment.utc(external.lastActivity).local(),
    });
};
