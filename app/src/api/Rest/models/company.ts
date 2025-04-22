import { enums, Id, T } from '~/api';
import { ClientReference, FileData, LinkedProfile, MarketingInformation, Organization, Resource, ReviewStars } from '~/models';
import { stores } from '~/stores';
import type {
    ConsultantClientReferenceDto,
    ConsultantLinkedProfileDto,
    ConsultantOrganizationDto,
    ConsultantProjectReviewDto,
    ContractorClientReferenceDto,
    ContractorLinkedProfileDto,
    ContractorOrganizationDto,
    ContractorProjectReviewDto,
    ContractorResourceDto,
    MarketingInformationDto,
} from '../dtos/contractor';

export const toInternalMarketing = (external: MarketingInformationDto) => MarketingInformation.create({
    id: stores.idCollection.getInternal('marketingInformation', external.id),
    addressUrl: external.addresUrl,
    companyId: external.companyId,
    marketingService: T.create(external.marketingService, enums.MarketingService.castToInternal),
});

export const toInternalFiles = async (filesId?: string[]) => {
    if (!filesId) {
        return [];
    }

    return await Promise.all(filesId.map(async fileId => {
        const file = await FileData.fromExternal(fileId);
        file.loadImg();
        return file;
    }));
};

export const toInternalReference = async (external: ContractorClientReferenceDto | ConsultantClientReferenceDto) => {
    const designType = 'designType' in external
        ? T.tryCreate(
            external.designType,
            enums.DesignType.castToInternal,
        )
        : undefined;

    const projectType = 'projectType' in external
        ? T.tryCreate(
            external.projectType,
            enums.ConstructionType.castToInternal,
        )
        : undefined;

    return ClientReference.create({
        id: stores.idCollection.getInternal('clientReference', external.id),
        clientName: external.clientName,
        phoneNumber: external.phoneNumber,
        projectValue: external.projectValue,
        governorateId: Id.tryInit(external.governorateId, 'external'),
        wilayatId: Id.tryInit(external.wilayatId, 'external'),
        projectType: designType ?? projectType,
        projectCompletionDate: external.projectCompletionDate,
        status: T.create(external.status, enums.ReviewStatus.castToInternal),
        images: await toInternalFiles(external.imagesIds),
        stars: ReviewStars.create(toInternalStars(external.review)),
        projectStartDate: external.startDate,
        companyId: external.companyId,
    });
};

const toInternalStars = (stars?: ContractorProjectReviewDto | ConsultantProjectReviewDto) => {
    if (!stars) {
        return;
    }

    return ReviewStars.create({
        id: stores.idCollection.getInternal('reviewStars', stars.id),
        averageGrade: stars.averageGrade,
        createdDate: stars.createdDate,
        recommendation: stars.recommendation,
        communication: stars.communication,
        qualityOfWork: stars.qualityOfWork,
        speedOfWork: stars.speedOfWork,
        management: stars.management,
        cooperation: stars.cooperation,
        feedBack: stars.feedBack,
    });
};

export const toInternalOrganizations = (external: ContractorOrganizationDto | ConsultantOrganizationDto, type: 'contractor' | 'consultant') => Organization.create({
    id: stores.idCollection.getInternal('organization', external.id),
    companyId: external.companyId,
    organization: type === 'contractor'
        ? T.create(external.organization, enums.ContractorOrganization.castToInternal)
        : T.create(external.organization, enums.ConsultantOrganization.castToInternal),
    otherOrganization: external.otherOrganization,
});

export const toInternalResource = (external: ContractorResourceDto) => Resource.create({
    id: stores.idCollection.getInternal('resource', external.id),
    companyId: external.companyId,
    resourceType: T.create(external.resourceType, enums.ResourceKind.castToInternal),
    specializationId: external.specializationId,
    machine: external.machine,
    numberOfUnit: external.numberOfUnit,
});

export const toInternalLinkedProfiles = (external: ContractorLinkedProfileDto | ConsultantLinkedProfileDto) => {
    const contractorAffiliation = 'contractorAffiliationType' in external
        ? T.tryCreate(
            external.contractorAffiliationType,
            enums.ContractorAffiliationType.castToInternal,
        )
        : undefined;

    const consultantAffiliation = 'consultantAffiliationType' in external
        ? T.tryCreate(
            external.consultantAffiliationType,
            enums.ConsultantAffiliationType.castToInternal,
        )
        : undefined;

    return LinkedProfile.create({
        id: stores.idCollection.getInternal('linkedProfile', external.id),
        companyId: external.companyId,
        userId: external.userId,
        affiliationType: contractorAffiliation ?? consultantAffiliation,
        phone: external.phone,
        status: T.create(
            external.status,
            enums.linkedProfileStatus.castToInternal,
        ),
    });
};
