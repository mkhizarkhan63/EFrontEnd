import { dtos, E, Img, T, type Paging } from '~/api';
import { CompanyAssociationSearch } from '~/models';
import { stores } from '~/stores';
import { enums } from '../..';

export const getCompaniesByName = async (companyName: string, paging?: Paging) => {
    const data = await dtos.contractor.execListCompanyByCompanyNameQuery({
        ...paging?.toQuery(),
        companyName,
    });

    if (!data || !data.result || data.result.length === 0) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 1);
    paging?.setRowCount(data.rowCount ?? 0);

    return data.result.map(toInternal);
};

const toInternal = (external: dtos.contractor.CompanySearchDto) => CompanyAssociationSearch
    .create({
        id: stores.idCollection.getInternal('companyAssociation', external.id),
        name: external.name ?? '',
        companyLogo: Img.create(external.companyLogoId),
        status: T.create(
            external.status,
            enums.CompaniesStatus.castToInternal,
        ),
        profileType: T.create(
            external.companyType,
            enums.CompanyType.castToInternal,
        ),
        category: E.AffiliationType.engineer,
    });

