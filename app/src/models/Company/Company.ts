import { cast, types } from 'mobx-state-tree';
import { default as moment, type Moment } from 'moment';
import { E, lang, LazyModelList, MstType, restQuery, utils, type Id } from '~/api';
import type { IconName } from '~/bits';
import { stores } from '~/stores';
import { utilsString } from '~/utils';
import { ContractSubject, type ContractSubjectType } from '../ContractSubject';
import { FileData, type FileDataType } from '../FileData';
import { ClientReference, type ClientReferenceType } from './ClientReference';
import type { ConsultantType } from './Consultant';
import type { ContractorType } from './Contractor';
import { LinkedProfile, type LinkedProfileType } from './LinkedProfile';
import { MarketingInformation } from './MarketingInformation';
import { Organization } from './Organization';
import { Resource } from './Resource';
import { ArchitectType } from '../Design';

const FILE_TYPES = [
    'crCertificate',
    'ownerNationalId',
    'manpowerReportIssued',
    'companyProfile',
    'otherFiles',
] as const;

export const COMPANY_WATCHED_KEYS: Record<E.CompanySteps, Array<keyof CompanyType & string>> = {
    // [E.CompanySteps.ownerInfo]: ['affiliationType', 'ownerEmail', 'ownerName', 'ownerPhone'],
    // [E.CompanySteps.employeeInfo]: [],
    [E.CompanySteps.companyInfo]: [
        'logo',
        'name',
        'nameInArabic',
        'email',
        'headOfficeGovernorateId',
        'headOfficeWilayatId',
        'phone',
        'crNumber',
        'crStartDate',
        'crExpirationDate',
        'registeredAt',
        'governorates',
        'minimumProjectSize',
    ],
    [E.CompanySteps.productsServices]: [],
    [E.CompanySteps.companyHistory]: [
        'projectsDelivered',
        'projectsParticipated',
        'largestProjectAwarded',
        'failedCompleteAwardedWork',
        'anyJudgmentsPendingOrOutstanding',
        'yoursYearsOfExperience',
        'projectsWorkedAtOnce',
        'chargeBlackProjects',
        'chargeTurnkeyProjects',
        ...(Object.keys(E.MarketingService) as Array<keyof CompanyType & string>),
    ],
    [E.CompanySteps.companyResource]: [],
    [E.CompanySteps.companyMarketing]: [],
    // [E.CompanySteps.clientReferences]: ['references'],
    [E.CompanySteps.documents]: ['additionalInformation', 'files'],
};

export type DocumentType = typeof FILE_TYPES[number];

export type CompanyType = ContractorType | ConsultantType ;

export const Company = types
    .model({
        id: stores.idCollection.getIdentifier('company'),

        ownerId: MstType.number,

        affiliationType: types.optional(
            types.enumeration<E.AffiliationType>('affiliationType', Object.values(E.AffiliationType)),
            E.AffiliationType.owner,
        ),

        headOfficeGovernorateId: types.maybe(MstType.Id),

        headOfficeWilayatId: types.maybe(MstType.Id),

        name: MstType.string,

        nameInArabic: MstType.string,

        email: MstType.string,

        phone: MstType.string,

        ownerName: MstType.string,

        ownerEmail: MstType.string,

        ownerPhone: MstType.string,

        crNumber: MstType.string,

        crStartDate: MstType.MaybeMoment,

        crExpirationDate: MstType.MaybeMoment,

        projectsDelivered: MstType.number,

        projectsWorkedAtOnce: MstType.number,

        largestProjectAwarded: MstType.number,

        otherPlanningSoftware: MstType.string,

        additionalInformation: MstType.string,

        yoursYearsOfExperience: MstType.number,

        measuresToMaintainQuality: MstType.string,

        failedCompleteAwardedWork: MstType.boolean,

        anyJudgmentsPendingOrOutstanding: MstType.boolean,

        chargeBlackProjects: MstType.number,

        chargeTurnkeyProjects: MstType.number,

        logo: types.maybe(FileData),

        stars: types.maybe(types.model({
            recommendation: MstType.number,
            communication: MstType.number,
            cooperation: MstType.number,
            qualityOfWorks: MstType.number,
            speedOfWorks: MstType.number,
            management: MstType.number,
        })),

        planningSoftware: types.array(types.enumeration<E.PlanningSoftware>('PlanningSoftware', Object.values(E.PlanningSoftware))),

        planningSoftwareDescription: MstType.string,

        resources: types.array(Resource),

        registeredAt: types.array(Organization),

        references: types.array(ClientReference),

        marketings: types.array(MarketingInformation),

        linkedProfiles: types.array(LinkedProfile),

        files: types.array(
            types.model({
                data: FileData,
                type: types.enumeration('FileType', Array.from(FILE_TYPES)),
            }),
        ),

        filesToRemove: types.array(types.string),

        pendingPayments: MstType.number,

        projectsParticipated: MstType.number,

        projectsAwarded: MstType.number,

        lastActivity: MstType.Moment,

        minimumProjectSize: 200,

        status: types.optional(
            types.enumeration<E.CompaniesStatus>('CompanyStatus', Object.values(E.CompaniesStatus)),
            E.CompaniesStatus.none,
        ),

        type: types.enumeration<E.ProfileType>('CompanyType', Object.values(E.ProfileType)),

        contractSubject: types.maybe(ContractSubject),
    })
    .volatile(self => ({
        employees: new LazyModelList(
            'Employees',
            () => restQuery.getEmployees(
                stores.idCollection.getExternal('company', self.id),
                Object.fromEntries(self.linkedProfiles.map(item => [item.phone, item])),
            ),
            undefined,
            false,
        ),
    }))
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('company', self.id);
        },

        get nameTranslated() {
            return lang.current === 'en' ? self.name : self.nameInArabic;
        },

        get logoUrl() {
            return self.logo?.img?.url;
        },

        get governorate() {
            const { governorates } = stores.locations;

            return governorates
                .find(x => x.id.isEqual(self.headOfficeGovernorateId));
        },

        get governoratesList() {
            return stores.locations.governorates
                .map(item => ({
                    value: item.id,
                    name: item.displayName,
                }));
        },

        get wilayat() {
            if (!self.headOfficeWilayatId) {
                return undefined;
            }

            return stores.locations.wilayats
                .find(item => self.headOfficeWilayatId?.isEqual(item.id));
        },

        get headOffice() {
            return stores.locations.governorates
                .find(x => x.id.isEqual(self.headOfficeGovernorateId))
                ?.displayName;
        },

        get namesOfRegisteredAt() {
            return self.registeredAt
                .map(item => lang.dict.enum('contractorOrganization', item.organization));
        },

        get socialMedia() {
            const allMedia = self.marketings.map(item => ({
                name: item.marketingService as IconName,
                url: item.addressUrl,
            }));

            return allMedia.filter(item => utilsString.isUrlValid(item.url));
        },

        get namesOfPlanningSoftware() {
            const planningSoftware = Array
                .from(self.planningSoftware)
                .filter(item => item !== E.PlanningSoftware.other)
                .map(item => lang.dict.enum('planningSoftware', item));

            if (self.otherPlanningSoftware !== '') {
                planningSoftware.push(self.otherPlanningSoftware);
            }

            return planningSoftware;
        },

        get employeeRelations() {
            return Object.fromEntries(self.linkedProfiles.map(item => [item.phone, item.affiliationType]));
        },

        get allSpecializations() {
            return stores.contractors.dicts.data.specializations.map(x => ({
                id: x.id.asNumber(),
                name: x.displayName,
                type: x.type,
            }));
        },

        get allEmployees() {
            return self.employees.data.map(x => ({
                name: x.name,
                value: x.externalId ?? 0,
            }));
        },

        get allProducts() {
            return stores.contractors.dicts.data.productUnits.map(x => ({
                id: x.id,
                name: x.displayName,
            }));
        },

        get allServices() {
            return stores.contractors.dicts.data.serviceUnits.map(x => ({
                id: x.id,
                name: x.displayName,
                systemName: x.systemName,
            }));
        },

        get wilayatsList() {
            const { governorates } = stores.locations;

            const governorate = governorates
                .find(x => x.id.isEqual(self.headOfficeGovernorateId));

            if (!governorate) {
                return [];
            }

            return governorate.wilayats
                .map(item => ({
                    value: item.id,
                    name: item.displayName,
                }));
        },

        get relationship() {
            switch (self.type) {
                case E.ProfileType.contractor:
                    return [E.AffiliationType.partner, E.AffiliationType.engineer, E.AffiliationType.supervisor];
                case E.ProfileType.consultant:
                    return [E.AffiliationType.partner, E.AffiliationType.architect, E.AffiliationType.engineer];
                default:
                    return [];
            }
        },

        get resourcesList() {
            const summary = [
                { type: E.ResourceType.engineer, value: 0 },
                { type: E.ResourceType.labors, value: 0 },
                { type: E.ResourceType.administration, value: 0 },
                { type: E.ResourceType.machinery, value: 0 },
            ];

            for (const resource of self.resources) {
                const item = summary.find(x => x.type === resource.resourceType);

                if (!item) {
                    continue;
                }

                item.value += resource.numberOfUnit;
            }

            return summary.map(item => ({
                name: lang.dict.enum('resourceType', item.type),
                value: item.value,
            }));
        },

        get starsValues() {
            const stars = self.stars ?? {
                recommendation: 0,
                communication: 0,
                cooperation: 0,
                qualityOfWorks: 0,
                speedOfWorks: 0,
                management: 0,
            };

            return Object.entries(stars)
                .map(key => ({
                    key: key[0],
                    value: key[1],
                }));
        },
    }))
    .actions(self => ({
        addFiles: (type: DocumentType, file: FileDataType) => {
            file.loadImg();

            self.files.push({
                type,
                data: file,
            });
        },

        removeFiles: (file: FileDataType) => {
            if (file.isExternal) {
                self.filesToRemove.push(file.fileId);
            }
            self.files = cast(
                self.files.filter(item => item.data.id !== file.id),
            );
        },

        setPhone: (phone: string) => {
            if (phone.length > 8) {
                return;
            }

            self.phone = utils.fromInputPhone(phone, self.phone);
        },

        setName: (name: string) => {
            // Block arabic characters
            if (/[\u0600-\u06FF\u0750-\u077F]/.test(name)) {
                return;
            }

            self.name = name;
        },

        setNameArabic: (name: string) => {
            self.nameInArabic = name;
        },

        setEmail: (email: string) => {
            self.email = email;
        },

        uploadAvatar: (logo: FileDataType) => {
            self.logo = logo;
            self.logo.loadImg();
        },

        removeLogo: () => {
            self.logo?.removeFile();
        },

        setCrNumber: (cr: string) => {
            self.crNumber = utils.fromInputCr(cr, self.crNumber);
        },

        setCrStartDate: (date: Moment) => {
            self.crStartDate = date.isValid() ? date : moment('0002-01-01');
        },

        setCrExpirationDate: (date: Moment) => {
            self.crExpirationDate = date.isValid() ? date : moment('0002-01-01');
        },

        addNewResource: (resourceType: E.ResourceType) => {
            if (resourceType === E.ResourceType.none) {
                return;
            }

            self.resources.push(Resource.create({ resourceType, companyId: self.externalId }));
        },

        removeResource: (id: number) => {
            self.resources = cast(
                self.resources.filter(item => item.id !== id),
            );
        },

        setProjectsDelivered: (projectsDelivered: string) => {
            self.projectsDelivered = utils.fromInputNumber(projectsDelivered, 0, 5000);
        },

        setProjectsWorkedAtOnce: (projectsWorkedAtOnce: string) => {
            self.projectsWorkedAtOnce = utils.fromInputNumber(projectsWorkedAtOnce, 0, 100);
        },

        setLargestProjectAwarded: (largestProjectAwarded: string) => {
            self.largestProjectAwarded = utils.fromInputNumber(largestProjectAwarded, 0, 10000000);
        },

        setOtherPlanningSoftware: (otherPlanningSoftware: string) => {
            self.otherPlanningSoftware = otherPlanningSoftware;
        },

        setAdditionalInformation: (additionalInformation: string) => {
            if (additionalInformation.length > 4000) {
                return;
            }

            self.additionalInformation = additionalInformation;
        },

        setYoursYearsOfExperience: (yoursYearsOfExperience: string) => {
            self.yoursYearsOfExperience = utils.fromInputNumber(yoursYearsOfExperience, 0, 50);
        },

        setMeasuresToMaintainQuality: (measuresToMaintainQuality: string) => {
            if (measuresToMaintainQuality.length > 254) {
                return;
            }

            self.measuresToMaintainQuality = measuresToMaintainQuality;
        },

        setFailedCompleteAwardedWork: () => {
            self.failedCompleteAwardedWork = !self.failedCompleteAwardedWork;
        },

        setAnyJudgmentsPendingOrOutstanding: () => {
            self.anyJudgmentsPendingOrOutstanding = !self.anyJudgmentsPendingOrOutstanding;
        },

        setStatus: (status: E.CompaniesStatus) => {
            self.status = status;
        },

        setPlanningSoftware: (type: E.PlanningSoftware) => {
            if (type === E.PlanningSoftware.other) {
                self.otherPlanningSoftware = '';
            }

            if (self.planningSoftware.includes(type)) {
                self.planningSoftware = cast(
                    self.planningSoftware.filter(item => item !== type),
                );
                return;
            }

            self.planningSoftware.push(type);
        },

        setPlanningSoftwareDescription: (txt: string) => {
            self.planningSoftwareDescription = txt;
        },

        setOwnerName: (name: string) => {
            self.ownerName = name;
        },

        setOwnerEmail: (email: string) => {
            self.ownerEmail = email;
        },

        setOwnerPhone: (mobile: string) => {
            self.ownerPhone = utils.fromInputPhone(mobile, self.ownerPhone);
        },

        setHeadGovernorate: (id: Id) => {
            self.headOfficeGovernorateId = id;
            self.headOfficeWilayatId = undefined;
        },

        setHeadWilayat: (id: Id) => {
            self.headOfficeWilayatId = id;
        },

        setOrganizations: (type: E.Organization) => {
            const search = self.registeredAt
                .find(item => item.organization === type);

            if (search) {
                self.registeredAt = cast(
                    self.registeredAt
                        .filter(x => x.organization !== type),
                );
                return;
            }

            self.registeredAt.push(Organization.create({
                organization: type,
            }));
        },

        getFiles: (type: DocumentType) => self.files
            .filter(item => item.type === type)
            .map(item => item.data),

        setNameOfMachinery: (id: number, value: string) => {
            const machinery = self.resources.find(item => item.id === id);
            if (machinery) {
                machinery.machine = value;
            }
        },

        removeReview: (id: number) => {
            self.references = cast(
                self.references.filter(item => item.id !== id),
            );
        },

        addClient: () => {
            self.references.push(ClientReference.create());
        },

        addReference: (reference: ClientReferenceType) => {
            self.references.unshift(reference);
        },

        addMarketing: (marketingService: E.MarketingService, addressUrl: string) => {
            self.marketings.push(MarketingInformation.create({
                marketingService,
                addressUrl,
            }));
        },

        setAffiliationType: (type: E.AffiliationType) => {
            self.affiliationType = type;
        },

        removeReference: (id: number) => {
            self.references = cast(
                self.references.filter(item => item.externalId !== id),
            );
        },

        addContractSubject: (subject: ContractSubjectType) => {
            self.contractSubject = subject;
        },

        removeEmployee: (externalId: number) => {
            self.employees.removeId(externalId);
            self.linkedProfiles = cast(self.linkedProfiles.filter(item => item.externalId !== externalId));
        },

        addEmployee: (linkedProfile: LinkedProfileType) => {
            self.linkedProfiles.push(linkedProfile);
            self.employees.reload(true);
        },
    }));
