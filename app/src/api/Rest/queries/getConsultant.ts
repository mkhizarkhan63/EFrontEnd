import { E, Id, T } from '~/api';
import {
    ConsultantDesignService,
    ConsultantGovernorate,
    Consultant,
    ConsultantProduct,
    FileData,
    type ConsultantGovernorateType,
    type DocumentType,
} from '~/models';
import { stores } from '~/stores';
import { enums, models } from '..';
import {
    type ConsultantDesignServiceDto,
    type ConsultantProductDto,
    type ConsultantGovernorateDto,
    execGetConsultantQuery,
} from '../dtos/contractor';

export const getConsultant = async (id: number) => {
    const data = await execGetConsultantQuery({ id });

    if (!data || !data.result) {
        return;
    }

    const { result: external } = data;

    const toInternalDocuments = (fileType: DocumentType) => async (fileId: string) => {
        consultant.addFiles(fileType, await FileData.fromExternal(fileId));
    };

    const profileInCompanies = stores.profile.currentProfile.profilesInCompanies;

    const consultant = Consultant.create({
        id: stores.idCollection.getInternal('company', external.id),
        type: E.ProfileType.consultant,
        logo: await FileData.tryFromExternal(external.companyLogoId),
        affiliationType: profileInCompanies
            .find(item => item.contextId.isEqual(external.id))?.affiliationType,
        name: external.name,
        nameInArabic: external.nameInArabic,
        email: external.email,
        phone: external.phone,
        ownerEmail: external.ownerEmail,
        ownerName: external.ownerName,
        ownerPhone: external.ownerPhone,
        headOfficeGovernorateId: Id.init(external.headOfficeGovernorateId, 'external'),
        headOfficeWilayatId: Id.init(external.headOfficeWilayatId, 'external'),
        crNumber: external.crNumber,
        crStartDate: T.create(external.crStartDate, T.Timestamp),
        crExpirationDate: T.create(external.crExpirationDate, T.Timestamp),
        projectsDelivered: external.projectsDelivered,
        projectsWorkedAtOnce: external.projectsWorkedAtOnce,
        largestProjectAwarded: external.largestProjectAwarded,
        yoursYearsOfExperience: external.yoursYearsOfExperience,
        failedCompleteAwardedWork: external.failedCompleteAwardedWork,
        anyJudgmentsPendingOrOutstanding: external.anyJudgmentsPendingOrOutstanding,
        measuresToMaintainQuality: external.measuresToMaintainQuality,
        otherPlanningSoftware: external.otherPlanningSoftware,
        status: T.create(external.status, enums.CompaniesStatus.castToInternal),
        ownerId: external.ownerId,
        additionalInformation: external.additionalInformation,
        marketings: external.marketings?.map(models.company.toInternalMarketing),
        references: await Promise.all((external.references ?? []).map(models.company.toInternalReference)),
        registeredAt: external.registeredAt?.map(x => models.company.toInternalOrganizations(x, 'consultant')),
        services: external.designServices?.map(toInternalService),
        products: external.products?.map(toInternalProduct),
        planningSoftware: external.planningSoftware?.map(x => T.create(x, enums.PlanningSoftware.castToInternal)),
        resources: external.resources?.map(models.company.toInternalResource).filter(item => item.resourceType !== E.ResourceType.none),
        linkedProfiles: external.linkedProfiles?.map(models.company.toInternalLinkedProfiles),
        governorates: toInternalGovernorates(external.governorates),
        isProvideDesign: external.provideDesignService,
        isProvideSupervision: external.provideSupervisionService,
        everyDesignPackagePrice: external.everyDesignPackagePrice,
        everyDesignPackageSize: external.everyDesignPackageSize,
        stars: {
            recommendation: external.stars?.averageRecommendation,
            communication: external.stars?.averageCommunication,
            cooperation: external.stars?.averageCooperation,
            qualityOfWorks: external.stars?.averageQualityOfWork,
            speedOfWorks: external.stars?.averageSpeedOfWork,
            management: external.stars?.averageManagement,
        },
    });

    consultant.logo?.loadImgFromId(external.companyLogoId);
    await Promise.all((external.crCertificate ?? []).map(toInternalDocuments('crCertificate')));
    await Promise.all((external.companyProfile ?? []).map(toInternalDocuments('companyProfile')));
    await Promise.all((external.manpowerReportIssuedByMom ?? []).map(toInternalDocuments('manpowerReportIssued')));
    await Promise.all((external.otherFiles ?? []).map(toInternalDocuments('otherFiles')));
    await Promise.all((external.ownerNationalId ?? []).map(toInternalDocuments('ownerNationalId')));

    return consultant;
};

const toInternalService = (external: ConsultantDesignServiceDto) => ConsultantDesignService.create({
    id: stores.idCollection.getInternal('service', external.id),
    consultantId: external.companyId,
    landSizeFrom: external.landSizeFrom,
    landSizeTo: external.landSizeTo,
    price: external.price,
    serviceUnits: external.serviceUnits,
});

const toInternalProduct = (external: ConsultantProductDto) => ConsultantProduct.create({
    id: stores.idCollection.getInternal('product', external.id),
    consultantId: external.companyId,
    isChecked: external.isChecked,
    price: external.price?.toString(),
    productId: external.productId,
});

const toInternalGovernorates = (external?: ConsultantGovernorateDto[]) => {
    if (!external) {
        return [];
    }

    const governorates: ConsultantGovernorateType[] = [];

    external.forEach(governorate => {
        const gov = governorates.find(item => item.governorateId?.isEqual(governorate.governorateId));

        if (gov) {
            gov.addWilayat(Id.init(governorate.wilayatId, 'external'), governorate.price ?? 0);
            return;
        }

        governorates.push(ConsultantGovernorate.create({
            id: stores.idCollection.getInternal('governorate', governorate.id),
            governorateId: Id.init(governorate.governorateId, 'external'),
            consultantId: governorate.companyId,
            wilayatEntries: [
                {
                    wilayatId: Id.init(governorate.wilayatId, 'external'),
                    price: governorate.price,
                },
            ],
        }));
    });

    return governorates;
};
