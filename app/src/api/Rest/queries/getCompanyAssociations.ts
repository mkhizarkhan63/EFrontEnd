import { Img, T } from '~/api';
import { CompanyAssociation } from '~/models';
import { stores } from '~/stores';
import { dtos, enums } from '..';

export const getCompanyAssociations = async (profileId?: number) => {
    if (!profileId) {
        return [];
    }

    const data = await dtos
        .contractor
        .execListUserManagementCompanyDetailsQuery({ profileId });

    if (!data || data.result.length === 0) {
        return [];
    }

    const { result } = data;

    return result.map(toInternal);
};

const toInternal = (external: dtos.contractor.UserManagementCompanyAssociationDto) => CompanyAssociation
    .create({
        id: stores.idCollection.getInternal('companyAssociation', external.id),
        name: external.name,
        companyLogo: Img.create(external.companyLogoId),
        profileType: T.create(
            external.companyType,
            enums.ProfileType.castToInternal,
        ),
        affiliationType: T.create(
            external.affiliationType,
            enums.AffiliationType.castToInternal,
        ),
        status: T.create(
            external.status,
            enums.CompaniesStatus.castToInternal,
        ),
        linkedProfileStatus: T.create(
            external.linkedProfileStatus,
            enums.LinkedProfileStatus.castToInternal,
        ),
    });
