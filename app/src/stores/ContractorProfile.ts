import { action } from 'mobx';
import { clone } from 'mobx-state-tree';
import moment from 'moment';
import { E, enums, Id, Mobx, restQuery, T } from '~/api';
import { ProfileInCompany, type ContractorType } from '~/models';
import { toNull, utilsString } from '~/utils';
import { stores } from '.';

export class ContractorProfile {
    profileId?: number;

    constructor() {
        makeSafeObservable(this, {
            getProfile: action,
        });
    }

    getProfile = async (contractorId: number) => {
        this.profileId = contractorId;
        const contractor = await restQuery.getContractor(contractorId);

        if (!contractor) {
            return;
        }

        return clone(contractor);
    };

    updateProfile = (step: E.CompanySteps, contractor: ContractorType) => {
        if (step === E.CompanySteps.companyInfo && !contractor.externalId) {
            return this.createContractor(contractor);
        }

        const res = this.updateContractor(step, contractor);
        stores.profile.setCompany(clone(contractor));
        return res;
    };

    addOrganization = async (organization: E.Organization, contractorId?: Id) => {
        if (!contractorId) {
            return;
        }

        return await restQuery.addContractorOrganization(contractorId, organization);
    };

    private createContractor = async (contractor: ContractorType) => {
        let newLogoId = '';

        if (contractor.logo?.file) {
            const newLogo = await restQuery.file.add([contractor.logo]);
            newLogoId = newLogo[0];
            contractor.logo.setFileId(newLogo[0]);
            contractor.logo.connect();
        }

        const ownerData = contractor.affiliationType === E.AffiliationType.owner
            ? stores.profile.ownerData
            : {
                ownerName: contractor.ownerName,
                ownerEmail: contractor.ownerEmail,
                ownerPhone: contractor.ownerPhone,
                ownerId: 0,
            };

        const createdContractorId = await restQuery.createContractor({
            affiliationType: T.create(
                contractor.affiliationType,
                enums.AffiliationType.castToExternal,
            ),
            name: contractor.name,
            nameInArabic: contractor.nameInArabic,
            email: contractor.email,
            phone: contractor.phone,
            headOfficeGovernorateId: contractor.headOfficeGovernorateId?.asNumber() ?? 0,
            headOfficeWilayatId: contractor.headOfficeWilayatId?.asNumber() ?? 0,
            crNumber: contractor.crNumber,
            crStartDate: (contractor.crStartDate ?? moment()).toISOString(),
            crExpirationDate: (contractor.crExpirationDate ?? moment()).toISOString(),
            registeredAt: contractor.registeredAt
                .filter(x => x.organization !== E.Organization.none)
                .map(x => ({
                    id: x.id,
                    organization: T.create(
                        x.organization,
                        enums.ContractorOrganization.castToExternal,
                    ),
                })),
            governorates: contractor.governorates.map(x => x.asNumber()),
            minimumProjectSize: contractor.minimumProjectSize,
            measuresToMaintainQuality: '',
            otherPlanningSoftware: '',
            additionalInformation: '',
            companyLogoId: newLogoId,
            ...ownerData,
        });

        if (!createdContractorId) {
            return false;
        }

        this.profileId = createdContractorId.asNumber();

        const newCompany = new ProfileInCompany();

        if (contractor.logo) {
            Mobx.extendsObservable(newCompany, {
                logo: contractor.logo.img?.clone(),
            });
        }

        Mobx.extendsObservable(newCompany, {
            id: Id.init(stores.idCollection.getInternal('context')),
            contextId: createdContractorId,
            companyName: contractor.name,
            role: E.RoleInCompany.contractor,
        });

        stores.profile.currentProfile.addCompany(newCompany);
        stores.profile.currentProfile.selectCompany(newCompany.id);
        stores.idCollection.connect('company', contractor.id, createdContractorId.asNumber());

        await Promise.all(
            contractor.registeredAt
                .map(x => this.addOrganization(x.organization, createdContractorId)),
        );

        stores.display.router.$.company.$.edit
            .go({
                type: E.ProfileType.contractor,
                id: createdContractorId.asNumber(),
                step: E.CompanySteps.productsServices,
            });

        return true;
    };

    private updateContractor = (step: E.CompanySteps, contractor: ContractorType) => {
        switch (step) {
            // case E.CompanySteps.ownerInfo:
            //     return this.updateOwnerInfo(contractor);
            case E.CompanySteps.companyInfo:
                return this.updateCompanyInfo(contractor);
            case E.CompanySteps.productsServices:
                return this.updateProductsServices(contractor);
            case E.CompanySteps.companyHistory:
                return this.updateCompanyHistory(contractor);
            case E.CompanySteps.companyResource:
                return this.updateResources(contractor);
            case E.CompanySteps.companyMarketing:
                return this.updateReferences(contractor);
            case E.CompanySteps.documents:
                return this.updateDocuments(contractor);
            default:
                return false;
        }
    };

    private updateOwnerInfo = async (contractor: ContractorType) => await restQuery.updateContractor(
        contractor.externalId,
        {
            companyRelationship: T.create(
                contractor.companyRelationship,
                enums.CompanyRelationship.castToExternal,
            ),
            ownerEmail: contractor.ownerEmail,
            ownerName: contractor.ownerName,
            ownerPhone: contractor.ownerPhone,
        },
    );

    private updateCompanyInfo = async (contractor: ContractorType) => {
        let newLogoId = contractor.logo?.fileId ?? '';

        if (!contractor.logo?.isExternal || !contractor.logo.img) {
            await restQuery.file.deleteId(contractor.logo?.fileId ?? '');
            newLogoId = '';
        }

        if (contractor.logo?.file) {
            const fileId = await restQuery.file.add([contractor.logo]);
            newLogoId = fileId[0] ?? '';
        }

        const res = await restQuery.updateContractor(
            contractor.externalId,
            {
                name: contractor.name,
                nameInArabic: contractor.nameInArabic,
                email: contractor.email,
                phone: contractor.phone,
                headOfficeGovernorateId: contractor.headOfficeGovernorateId?.asNumber(),
                headOfficeWilayatId: contractor.headOfficeWilayatId?.asNumber(),
                crNumber: contractor.crNumber,
                crStartDate: contractor.crStartDate?.toISOString(),
                crExpirationDate: contractor.crExpirationDate?.toISOString() ?? '',
                minimumProjectSize: contractor.minimumProjectSize,
                governorates: contractor.governorates.map(x => x.asNumber()),
                companyLogoId: newLogoId,
            },
            [
                {
                    property: 'registeredAt',
                    value: contractor.registeredAt
                        .filter(x => x.organization !== E.Organization.none)
                        .map(x => ({
                            id: x.id,
                            organization: T.create(
                                x.organization,
                                enums.ContractorOrganization.castToExternal,
                            ),
                        })),
                },
            ],
        );

        if (!this.profileId) {
            return res;
        }

        stores.profile.updateCompany(
            Id.init(this.profileId, 'external'),
            E.RoleInCompany.contractor,
            contractor.name,
            contractor.logo,
        );

        return res;
    };

    private updateProductsServices = async (contractor: ContractorType) => await restQuery.updateContractor(
        contractor.externalId,
        {},
        [
            {
                property: 'products',
                value: contractor.products.map(x => ({
                    id: x.id,
                    productUnitId: toNull(x.productUnitId),
                    other: x.other,
                })),
            },
            {
                property: 'services',
                value: contractor.services.map(x => ({
                    id: x.id,
                    serviceUnitId: toNull(x.serviceUnitId),
                    other: x.other,
                })),
            },
        ],
    );

    private updateCompanyHistory = async (contractor: ContractorType) => await restQuery.updateContractor(
        contractor.externalId,
        {
            projectsDelivered: contractor.projectsDelivered,
            projectsWorkedAtOnce: contractor.projectsWorkedAtOnce,
            largestProjectAwarded: contractor.largestProjectAwarded,
            yoursYearsOfExperience: contractor.yoursYearsOfExperience,
            chargeBlackProjects: contractor.chargeBlackProjects,
            chargeTurnkeyProjects: contractor.chargeTurnkeyProjects,
            failedCompleteAwardedWork: contractor.failedCompleteAwardedWork,
            anyJudgmentsPendingOrOutstanding: contractor.anyJudgmentsPendingOrOutstanding,
        },
        [
            {
                property: 'marketings',
                value: contractor.marketings
                    .filter(x => utilsString.isUrlValid(x.addressUrl))
                    .map(x => ({
                        id: x.externalId,
                        addresUrl: x.addressUrl,
                        companyId: x.companyId,
                        marketingService: T.create(
                            x.marketingService,
                            enums.MarketingService.castToExternal,
                        ),
                    })),
            },
        ],
    );

    private updateResources = async (contractor: ContractorType) => await restQuery.updateContractor(
        contractor.externalId,
        {
            measuresToMaintainQuality: contractor.measuresToMaintainQuality,
            planningSoftware: contractor.planningSoftware.map(x => T.create(
                x,
                enums.PlanningSoftware.castToExternal,
            )),
            otherPlanningSoftware: contractor.otherPlanningSoftware,
            otherContractingCompanies: contractor.otherContractingCompanies,
        },
        [
            {
                property: 'resources',
                value: contractor.resources.map(x => ({
                    id: x.id,
                    companyId: x.companyId,
                    machine: x.machine,
                    numberOfUnit: x.numberOfUnit,
                    resourceType: T.create(
                        x.resourceType,
                        enums.ResourceType.castToExternal,
                    ),
                    specializationId: toNull(x.specializationId),
                })),
            },
            {
                property: 'companies',
                value: contractor.companies.map(x => ({
                    id: x.id,
                    companyName: x.companyName,
                    crNumber: x.crNumber,
                    manPower: x.manPower,
                    typeOfServiceOrProduct: x.typeOfServiceOrProduct,
                })),
            },
        ],
    );

    private updateReferences = async (contractor: ContractorType) => await restQuery.updateContractor(
        contractor.externalId,
        {},
        [
            {
                property: 'references',
                value: contractor.references.map(x => ({
                    id: x.id,
                    clientName: x.clientName,
                    imagesIds: x.images.map(img => img.fileId),
                    companyId: x.companyId,
                    phoneNumber: x.phoneNumber,
                    startDate: x.projectStartDate?.toISOString(),
                    projectCompletionDate: x.projectCompletionDate?.toISOString(),
                    projectType: T.create(
                        x.projectType,
                        enums.ConstructionType.castToExternal,
                    ),
                    projectValue: x.projectValue,
                    governorateId: x.governorateId?.asNumber(),
                    wilayatId: x.wilayatId?.asNumber(),
                })),
            },
        ],
    );

    private updateDocuments = async (contractor: ContractorType) => {
        await Promise.all(contractor.filesToRemove.map(id => restQuery.file.deleteId(id)));

        const crCertificate = await restQuery.file.add(contractor.getFiles('crCertificate'));
        const ownerNationalId = await restQuery.file.add(contractor.getFiles('ownerNationalId'));
        const manpowerReportIssuedByMom = await restQuery.file.add(contractor.getFiles('manpowerReportIssued'));
        const companyProfile = await restQuery.file.add(contractor.getFiles('companyProfile'));
        const otherFiles = await restQuery.file.add(contractor.getFiles('otherFiles'));

        const res = await restQuery.updateContractor(
            contractor.externalId,
            {
                additionalInformation: contractor.additionalInformation,
                crCertificate: crCertificate,
                ownerNationalId: ownerNationalId,
                manpowerReportIssuedByMom: manpowerReportIssuedByMom,
                companyProfile: companyProfile,
                otherFiles: otherFiles,
            },
        );

        if (contractor.status === E.CompaniesStatus.draft) {
            await restQuery.updateCompanyToReview(E.ProfileType.contractor, contractor.externalId);
        }

        return res;
    };
}
