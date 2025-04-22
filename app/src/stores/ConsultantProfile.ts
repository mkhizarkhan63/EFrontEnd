import { action } from 'mobx';
import { clone } from 'mobx-state-tree';
import moment from 'moment';
import { E, enums, Id, Mobx, restQuery, T, type dtos } from '~/api';
import { type ConsultantType, ProfileInCompany } from '~/models';
import { toNull, utilsString } from '~/utils';
import { stores } from '.';
import { toFloat } from '~/utils/string';

export class ConsultantProfile {
    profileId?: number;

    constructor() {
        makeSafeObservable(this, {
            getProfile: action,
        });
    }

    getProfile = async (consultantId: number) => {
        this.profileId = consultantId;
        const consultant = await restQuery.getConsultant(consultantId);

        if (!consultant) {
            return;
        }

        return clone(consultant);
    };

    updateProfile = (step: E.CompanySteps, consultant: ConsultantType) => {
        if (step === E.CompanySteps.companyInfo && !consultant.externalId) {
            return this.createConsultant(consultant);
        }

        const res = this.updateConsultant(step, consultant);
        stores.profile.setCompany(clone(consultant));
        return res;
    };

    addOrganization = async (organization: E.Organization, consultantId?: Id) => {
        if (!consultantId) {
            return;
        }

        return await restQuery.addConsultantOrganization(consultantId, organization);
    };

    private createConsultant = async (consultant: ConsultantType) => {
        let newLogoId = '';

        if (consultant.logo?.file) {
            const newLogo = await restQuery.file.add([consultant.logo]);
            newLogoId = newLogo[0];
            consultant.logo.setFileId(newLogo[0]);
            consultant.logo.connect();
        }

        const ownerData = consultant.affiliationType === E.AffiliationType.owner
            ? stores.profile.ownerData
            : {
                ownerName: consultant.ownerName,
                ownerEmail: consultant.ownerEmail,
                ownerPhone: consultant.ownerPhone,
            };

        const createdConsultantId = await restQuery.createConsultant({
            affiliationType: T.create(
                consultant.affiliationType,
                enums.AffiliationType.castToExternal,
            ),
            ownerId: 1,
            name: consultant.name,
            nameInArabic: consultant.nameInArabic,
            email: consultant.email,
            phone: consultant.phone,
            headOfficeGovernorateId: consultant.headOfficeGovernorateId?.asNumber() ?? 0,
            headOfficeWilayatId: consultant.headOfficeWilayatId?.asNumber() ?? 0,
            crNumber: consultant.crNumber,
            crStartDate: (consultant.crStartDate ?? moment()).toISOString(),
            crExpirationDate: (consultant.crExpirationDate ?? moment()).toISOString(),
            registeredAt: consultant.registeredAt
                .filter(x => x.organization !== E.Organization.none)
                .map(x => ({
                    id: x.id,
                    organization: T.create(
                        x.organization,
                        enums.ConsultantOrganization.castToExternal,
                    ),
                })),
            measuresToMaintainQuality: '',
            otherPlanningSoftware: '',
            additionalInformation: '',
            companyLogoId: newLogoId,
            ...ownerData,
        });

        if (!createdConsultantId) {
            return false;
        }

        this.profileId = createdConsultantId.asNumber();

        const newCompany = new ProfileInCompany();

        if (consultant.logo) {
            Mobx.extendsObservable(newCompany, {
                logo: consultant.logo.img?.clone(),
            });
        }

        Mobx.extendsObservable(newCompany, {
            id: Id.init(stores.idCollection.getInternal('context')),
            contextId: createdConsultantId,
            companyName: consultant.name,
            role: E.RoleInCompany.consultant,
        });

        stores.profile.currentProfile.addCompany(newCompany);
        stores.profile.currentProfile.selectCompany(newCompany.id);
        stores.idCollection.connect('company', consultant.id, createdConsultantId.asNumber());

        await Promise.all(
            consultant.registeredAt
                .map(x => this.addOrganization(x.organization, createdConsultantId)),
        );

        stores.display.router.$.company.$.edit
            .go({
                type: E.ProfileType.consultant,
                id: createdConsultantId.asNumber(),
                step: E.CompanySteps.productsServices,
            });

        return true;
    };

    private updateConsultant = (step: E.CompanySteps, consultant: ConsultantType) => {
        switch (step) {
            // case E.CompanySteps.ownerInfo:
            //     return this.updateOwnerInfo(consultant);
            case E.CompanySteps.companyInfo:
                return this.updateCompanyInfo(consultant);
            case E.CompanySteps.productsServices:
                return this.updateProductsServices(consultant);
            case E.CompanySteps.companyHistory:
                return this.updateCompanyHistory(consultant);
            case E.CompanySteps.companyResource:
                return this.updateResources(consultant);
            case E.CompanySteps.companyMarketing:
                return this.updateReferences(consultant);
            case E.CompanySteps.documents:
                return this.updateDocuments(consultant);
            default:
                return false;
        }
    };

    private updateOwnerInfo = async (consultant: ConsultantType) => await restQuery.updateConsultant(
        consultant.externalId,
        {
            yoursYearsOfExperience: consultant.yoursYearsOfExperience,
            ownerEmail: consultant.ownerEmail,
            ownerName: consultant.ownerName,
            ownerPhone: consultant.ownerPhone,
        },
    );

    private updateCompanyInfo = async (consultant: ConsultantType) => {
        let newLogoId = consultant.logo?.fileId ?? '';

        if (!consultant.logo?.isExternal || !consultant.logo.img) {
            await restQuery.file.deleteId(consultant.logo?.fileId ?? '');
            newLogoId = '';
        }

        if (consultant.logo?.file) {
            const fileId = await restQuery.file.add([consultant.logo]);
            newLogoId = fileId[0] ?? '';
        }

        const res = await restQuery.updateConsultant(
            consultant.externalId,
            {
                name: consultant.name,
                nameInArabic: consultant.nameInArabic,
                email: consultant.email,
                phone: consultant.phone,
                headOfficeGovernorateId: consultant.headOfficeGovernorateId?.asNumber(),
                headOfficeWilayatId: consultant.headOfficeWilayatId?.asNumber(),
                crNumber: consultant.crNumber,
                crStartDate: consultant.crStartDate?.toISOString(),
                crExpirationDate: consultant.crExpirationDate?.toISOString() ?? '',
                companyLogoId: newLogoId,
            },
            [
                {
                    property: 'registeredAt',
                    value: consultant.registeredAt
                        .filter(x => x.organization !== E.Organization.none)
                        .map(x => ({
                            id: x.id,
                            organization: T.create(
                                x.organization,
                                enums.ConsultantOrganization.castToExternal,
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
            E.RoleInCompany.consultant,
            consultant.name,
            consultant.logo,
        );

        return res;
    };

    private updateProductsServices = async (consultant: ConsultantType) => {
        const governorates: dtos.contractor.ConsultantGovernorateDto[] = [];

        for (const governorate of consultant.governorates) {
            for (const entry of governorate.wilayatEntries) {
                governorates.push({
                    id: governorate.externalId ?? governorate.id,
                    governorateId: governorate.governorateId?.asNumber(),
                    companyId: governorate.consultantId,
                    price: entry.price,
                    wilayatId: entry.wilayatId?.asNumber(),
                });
            }
        }

        return await restQuery.updateConsultant(
            consultant.externalId,
            {
                provideDesignService: consultant.isProvideDesign,
                provideSupervisionService: consultant.isProvideSupervision,
                everyDesignPackagePrice: consultant.everyDesignPackagePrice,
                everyDesignPackageSize: consultant.everyDesignPackageSize,
            },
            [
                {
                    property: 'governorates',
                    value: governorates,
                },
                {
                    property: 'designServices',
                    value: consultant.services.map(x => ({
                        id: x.externalId ?? x.id,
                        companyId: x.consultantId,
                        landSizeFrom: x.landSizeFrom,
                        landSizeTo: x.landSizeTo,
                        price: x.price,
                        serviceUnits: x.serviceUnits,
                    })),
                },
                {
                    property: 'products',
                    value: consultant.products.map(x => ({
                        id: x.externalId ?? x.id,
                        isChecked: x.isChecked,
                        price: toFloat(x.price, 3),
                        productId: x.productId,
                        companyId: x.consultantId,
                    })),
                },
            ],
        );
    };

    private updateCompanyHistory = async (consultant: ConsultantType) => await restQuery.updateConsultant(
        consultant.externalId,
        {
            projectsDelivered: consultant.projectsDelivered,
            projectsWorkedAtOnce: consultant.projectsWorkedAtOnce,
            largestProjectAwarded: consultant.largestProjectAwarded,
            yoursYearsOfExperience: consultant.yoursYearsOfExperience,
            failedCompleteAwardedWork: consultant.failedCompleteAwardedWork,
            anyJudgmentsPendingOrOutstanding: consultant.anyJudgmentsPendingOrOutstanding,
            otherPlanningSoftware: consultant.otherPlanningSoftware,
            planningSoftware: consultant.planningSoftware.map(x => T.create(
                x,
                enums.PlanningSoftware.castToExternal,
            )),
        },
        [
            {
                property: 'marketings',
                value: consultant.marketings
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

    private updateResources = async (consultant: ConsultantType) => await restQuery.updateConsultant(
        consultant.externalId,
        {
            measuresToMaintainQuality: consultant.measuresToMaintainQuality,
            planningSoftware: consultant.planningSoftware.map(x => T.create(
                x,
                enums.PlanningSoftware.castToExternal,
            )),
            otherPlanningSoftware: consultant.planningSoftwareDescription,
        },
        [
            {
                property: 'resources',
                value: consultant.resources.map(x => ({
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
        ],
    );

    private updateReferences = async (consultant: ConsultantType) => await restQuery.updateConsultant(
        consultant.externalId,
        {},
        [
            {
                property: 'references',
                value: consultant.references.map(x => ({
                    id: x.id,
                    clientName: x.clientName,
                    imagesIds: x.images.map(img => img.fileId),
                    companyId: x.companyId,
                    phoneNumber: x.phoneNumber,
                    startDate: x.projectStartDate?.toISOString(),
                    projectCompletionDate: x.projectCompletionDate?.toISOString(),
                    designType: T.create(
                        x.projectType,
                        enums.DesignType.castToExternal,
                    ),
                    projectValue: x.projectValue,
                    governorateId: x.governorateId?.asNumber(),
                    wilayatId: x.wilayatId?.asNumber(),
                })),
            },
        ],
    );

    private updateDocuments = async (consultant: ConsultantType) => {
        await Promise.all(consultant.filesToRemove.map(id => restQuery.file.deleteId(id)));

        const crCertificate = await restQuery.file.add(consultant.getFiles('crCertificate'));
        const ownerNationalId = await restQuery.file.add(consultant.getFiles('ownerNationalId'));
        const manpowerReportIssuedByMom = await restQuery.file.add(consultant.getFiles('manpowerReportIssued'));
        const companyProfile = await restQuery.file.add(consultant.getFiles('companyProfile'));
        const otherFiles = await restQuery.file.add(consultant.getFiles('otherFiles'));

        const res = await restQuery.updateConsultant(
            consultant.externalId,
            {
                additionalInformation: consultant.additionalInformation,
                crCertificate: crCertificate,
                ownerNationalId: ownerNationalId,
                manpowerReportIssuedByMom: manpowerReportIssuedByMom,
                companyProfile: companyProfile,
                otherFiles: otherFiles,
            },
        );

        if (consultant.status === E.CompaniesStatus.draft) {
            await restQuery.updateCompanyToReview(E.ProfileType.consultant, consultant.externalId);
        }

        return res;
    };
}
