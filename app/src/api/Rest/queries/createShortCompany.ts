import type { InputType, ShortCompanyType } from '~/models';
import { dtos, enums } from '..';
import { stores } from '~/stores';
import { T, type E, Id } from '~/api';
import { utilsString } from '~/utils';

export const createShortCompany = async (company: ShortCompanyType, type: E.RoleInCompany, prices?: InputType[]) => {
    const { id, phone, name } = stores.profile.currentProfile;

    if (!id || !phone || !name) {
        return;
    }

    const locationPrises = prices
        ? {
            locationPrises: prices.map(item => ({
                wilayatId: item.id?.asNumber(),
                price: utilsString.toNumber(item.value),
            })),
        }
        : {};

    const res = await dtos.contractor.execCreateShortCompanyCommand({
        name: company.companyName,
        nameInArabic: company.companyNameAr,
        crNumber: company.crNumber,
        headOfficeGovernorateId: company.headOfficeGovernorateId?.asNumber() ?? 0,
        headOfficeWilayatId: company.headOfficeGovernorateId?.asNumber() ?? 0,
        ownerId: id.asNumber(),
        ownerPhone: phone,
        ownerName: name,
        companyType: T.create(type, enums.CompanyType.castToExternal),
        ...locationPrises,
    });

    if (!res) {
        return;
    }

    return Id.init(res.id, 'external');
};
