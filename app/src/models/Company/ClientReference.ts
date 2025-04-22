import { cast, types, type Instance } from 'mobx-state-tree';
import moment from 'moment';
import { E, MstType, utils, type Id } from '~/api';
import { stores } from '~/stores';
import { FileData, type FileDataType } from '../FileData';
import { ReviewStars } from '../ReviewStars';

export type ClientReferenceType = Instance<typeof ClientReference>;

export const ClientReference = types
    .model({
        id: stores.idCollection.getIdentifier('clientReference'),

        stars: types.optional(ReviewStars, () => ReviewStars.create()),

        companyId: MstType.number,

        clientName: MstType.string,

        phoneNumber: MstType.string,

        governorateId: types.maybe(MstType.Id),

        wilayatId: types.maybe(MstType.Id),

        projectValue: MstType.number,

        projectType: types.optional(
            types.enumeration<E.ConstructionType>(
                'ConstructionType',
                Object.values(E.ConstructionType),
            ),
            E.ConstructionType.none,
        ),

        status: types.optional(
            types.enumeration<E.ReviewStatus>(
                'ReviewStatus',
                Object.values(E.ReviewStatus),
            ),
            E.ReviewStatus.none,
        ),

        projectCompletionDate: MstType.MaybeMoment,

        projectStartDate: MstType.MaybeMoment,

        minimumEndDate: MstType.MaybeMoment,

        images: types.array(FileData),

        filesToRemove: types.array(types.string),
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal(
                'clientReference',
                self.id,
            );
        },

        get governoratesList() {
            return stores.locations.governorates
                .map(item => ({
                    value: item.id,
                    name: item.displayName,
                }));
        },

        get wilayatsList() {
            const { governorates } = stores.locations;

            const governorate = governorates
                .find(x => x.id.isEqual(self.governorateId));

            if (!governorate) {
                return [];
            }

            return governorate.wilayats
                .map(item => ({
                    value: item.id,
                    name: item.displayName,
                }));
        },

        get headGovernorateId() {
            return self.governorateId;
        },

        get headOfficeWilayatId() {
            return self.wilayatId;
        },

        get governorateName() {
            const findGovernorate = stores.locations.governorates
                .find(item => item.id.isEqual(self.governorateId));

            if (!findGovernorate) {
                return '';
            }

            return findGovernorate.displayName;
        },

        get wilayatName() {
            const findWilayat = stores.locations.wilayats
                .find(item => item.id.isEqual(self.wilayatId));

            if (!findWilayat) {
                return '';
            }

            return findWilayat.displayName;
        },

        get starsList() {
            return [
                {
                    key: E.ReviewStars.communication,
                    value: self.stars.communication,
                },
                {
                    key: E.ReviewStars.qualityOfWorks,
                    value: self.stars.qualityOfWork,
                },
                {
                    key: E.ReviewStars.speedOfWorks,
                    value: self.stars.speedOfWork,
                },
                {
                    key: E.ReviewStars.management,
                    value: self.stars.management,
                },
                {
                    key: E.ReviewStars.cooperation,
                    value: self.stars.cooperation,
                },
                {
                    key: E.ReviewStars.recommendation,
                    value: self.stars.recommendation,
                },
            ];
        },

        get toReview() {
            return [
                E.ReviewStatus.none,
                E.ReviewStatus.reviewing,
            ].includes(self.status);
        },

        get prefixName() {
            const [name, surName] = self.clientName.split(' ');

            if (!surName) {
                return `${name[0]}`;
            }

            return `${name[0]}${surName[0]}`;
        },
    }))
    .actions(self => ({
        addFile: (file: FileDataType) => {
            self.images.push(file);

            file.loadImg();
        },

        removeFile: (file: FileDataType) => {
            if (file.isExternal) {
                self.filesToRemove.push(file.fileId);
            }
            self.images = cast(self.images
                .filter(item => item.id !== file.id));
        },

        setClientName: (value: string) => {
            self.clientName = value;
        },

        setPhoneNumber: (phone: string) => {
            if (phone.length > 8) {
                return;
            }

            self.phoneNumber = utils.fromInputPhone(
                phone,
                self.phoneNumber,
            );
        },

        setHeadGovernorate: (id: Id) => {
            self.governorateId = id;
            self.wilayatId = undefined;
        },

        setHeadWilayat: (id: Id) => {
            self.wilayatId = id;
        },

        setProjectValue: (value: string) => {
            self.projectValue = utils.fromInputNumber(value);
        },

        setProjectType: (type: E.ConstructionType) => {
            self.projectType = type;
        },

        setStartDate: (date: moment.Moment) => {
            self.projectStartDate = date;
            self.projectCompletionDate = undefined;
            self.minimumEndDate = moment(date);
        },

        setEndDate: (date: moment.Moment) => {
            self.projectCompletionDate = date.isValid() ? date : moment('0002-01-01');
        },

        setStatus: (isAdmin: boolean) => {
            if (isAdmin) {
                self.status = E.ReviewStatus.approved;
                return;
            }

            self.status = E.ReviewStatus.reviewing;
        },

        resetFileToRemove: () => {
            self.filesToRemove = cast([]);
        },

        connect: (externalId: number) => {
            stores.idCollection.connect(
                'clientReference',
                self.id,
                externalId,
            );
        },
    }));
