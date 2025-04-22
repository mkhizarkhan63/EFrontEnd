import { when } from 'mobx';
import { E, T, Id } from '~/api';
import {
    ContractorCompany,
    Contractor,
    ContractorProduct,
    ContractorService,
    FileData,
    type DocumentType,
} from '~/models';
import { stores } from '~/stores';
import { enums, models } from '..';
import {
    type ContractorCompanyDto,
    type ContractorServiceDto,
    type ContractorProductDto,
    execGetContractorQuery,
} from '../dtos/contractor';

export const getContractor = async (id: number) => {
    const data = await execGetContractorQuery({ id });

    if (!data || !data.result) {
        return;
    }

    const { result: external } = data;

    const toInternalDocuments = (fileType: DocumentType) => async (fileId: string) => {
        const file = await FileData.fromExternal(fileId);

        if (file) {
            contractor.addFiles(fileType, file);
        }
    };

    const profileInCompanies = stores.profile.currentProfile.profilesInCompanies;

    const contractor = Contractor.create({
        id: stores.idCollection.getInternal('company', external.id),
        type: E.ProfileType.contractor,
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
        crStartDate: external.crStartDate,
        crExpirationDate: external.crExpirationDate,
        minimumProjectSize: external.minimumProjectSize,
        governorates: external.governorates?.map(governorateId => Id.init(governorateId, 'external')),
        projectsDelivered: external.projectsDelivered,
        projectsWorkedAtOnce: external.projectsWorkedAtOnce,
        largestProjectAwarded: external.largestProjectAwarded,
        yoursYearsOfExperience: external.yoursYearsOfExperience,
        chargeBlackProjects: external.chargeBlackProjects,
        chargeTurnkeyProjects: external.chargeTurnkeyProjects,
        failedCompleteAwardedWork: external.failedCompleteAwardedWork,
        anyJudgmentsPendingOrOutstanding: external.anyJudgmentsPendingOrOutstanding,
        measuresToMaintainQuality: external.measuresToMaintainQuality,
        otherPlanningSoftware: external.otherPlanningSoftware,
        otherContractingCompanies: external.otherContractingCompanies,
        companyRelationship: T.create(external.companyRelationship, enums.CompanyRelationship.castToInternal),
        status: T.create(external.status, enums.CompaniesStatus.castToInternal),
        ownerId: external.ownerId,
        additionalInformation: external.additionalInformation,
        marketings: external.marketings?.map(models.company.toInternalMarketing),
        companies: external.companies?.map(toInternalCompany),
        references: await Promise.all((external.references ?? []).map(models.company.toInternalReference)),
        registeredAt: external.registeredAt?.map(x => models.company.toInternalOrganizations(x, 'contractor')),
        services: await Promise.all(external.services?.map(toInternalService) ?? []),
        products: external.products?.map(toInternalProduct),
        planningSoftware: external.planningSoftware?.map(x => T.create(x, enums.PlanningSoftware.castToInternal)),
        resources: external.resources?.map(models.company.toInternalResource).filter(item => item.resourceType !== E.ResourceType.none),
        linkedProfiles: external.linkedProfiles?.map(models.company.toInternalLinkedProfiles),
        stars: {
            recommendation: external.stars?.averageRecommendation,
            communication: external.stars?.averageCommunication,
            cooperation: external.stars?.averageCooperation,
            qualityOfWorks: external.stars?.averageQualityOfWork,
            speedOfWorks: external.stars?.averageSpeedOfWork,
            management: external.stars?.averageManagement,
        },
    });

    contractor.logo?.loadImgFromId(external.companyLogoId);
    await Promise.all((external.crCertificate ?? []).map(toInternalDocuments('crCertificate')));
    await Promise.all((external.companyProfile ?? []).map(toInternalDocuments('companyProfile')));
    await Promise.all((external.manpowerReportIssuedByMom ?? []).map(toInternalDocuments('manpowerReportIssued')));
    await Promise.all((external.otherFiles ?? []).map(toInternalDocuments('otherFiles')));
    await Promise.all((external.ownerNationalId ?? []).map(toInternalDocuments('ownerNationalId')));

    return contractor;
};

const toInternalCompany = (external: ContractorCompanyDto) => ContractorCompany.create({
    id: stores.idCollection.getInternal('company', external.id),
    companyName: external.companyName,
    crNumber: external.crNumber,
    manPower: external.manPower,
    typeOfServiceOrProduct: external.typeOfServiceOrProduct,
});

const toInternalService = async (external: ContractorServiceDto) => {
    await when(() => stores.contractors.dicts.data && stores.contractors.dicts.isDoneOnce);

    return ContractorService.create({
        id: stores.idCollection.getInternal('service', external.id),
        contractorId: stores.idCollection.getInternal('company', external.companyId),
        serviceUnitId: external.serviceUnitId ?? 0,
        serviceName: stores.contractors.dicts.data.serviceUnits
            .find(item => item.id.isEqual(external.serviceUnitId))?.systemName,
        other: external.other,
    });
};

const toInternalProduct = (external: ContractorProductDto) => ContractorProduct.create({
    id: stores.idCollection.getInternal('product', external.id),
    contractorId: stores.idCollection.getInternal('company', external.companyId),
    productUnitId: external.productUnitId ?? 0,
    other: external.other,
});
