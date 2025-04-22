import { dtos, enums } from '../..';
import { stores } from '~/stores';
import { FileData, Resource, ArchitectListItem } from '~/models';
import { E, T, Id, type Paging } from '~/api';
import { type ResourceDto } from '../../dtos/contractor';

export type ArchitectFilters = {
    name?: string;
    governorate?: number;
    products: number[];
    maxBudget?: number;
    averageRating: number;
};

export const getArchitects = async (paging?: Paging, filters?: ArchitectFilters) => {
    const governorates = filters?.governorate ? [filters?.governorate] : [];

    const res = await dtos.contractor.execListConsultantQuery({
        ...paging?.toQuery(),
        consultantFilter: {
            name: filters?.name,
            governorateIds: governorates,
            productIds: filters?.products,
            designBudget: filters?.maxBudget,
            averageRating: filters?.averageRating,
        },
    });

    if (!res) {
        return [];
    }

    paging?.setPagesCount(res.pageCount ?? 0);
    paging?.setRowCount(res.rowCount ?? 0);

    return Promise.all(res.result.map(async item => ArchitectListItem.create({
        id: stores.idCollection.getInternal('architectListItem', item.id),
        name: item.name,
        minProjectPrice: item.designServices?.[0].price,
        haveDesignServices: !(item.designServices?.length === 0),
        headOfficeGovernorateId: Id.init(item.headOfficeGovernorateId, 'external'),
        completedProjects: item.projectsDelivered,
        products: item.products?.map(product => product.productId),
        avatar: await toInternalAvatar(item.companyLogoId),
        stars: {
            recommendation: item.stars?.averageRecommendation,
            communication: item.stars?.averageCommunication,
            cooperation: item.stars?.averageCooperation,
            qualityOfWorks: item.stars?.averageQualityOfWork,
            speedOfWorks: item.stars?.averageSpeedOfWork,
            management: item.stars?.averageManagement,
        },
        crStartDate: T.create(item.crStartDate, T.Timestamp),
        engineers: toInternalResources(item.resources ?? [])
            .filter(resource => resource.resourceType === E.ResourceType.engineer)
            .length,
    })));
};

const toInternalAvatar = async (logoId?: string) => {
    if (!logoId) {
        return;
    }

    const file = await FileData.tryFromExternal(logoId);
    file?.loadImg();
    return file;
};

const toInternalResources = (external: ResourceDto[]) => external.map(item => Resource.create({
    id: stores.idCollection.getInternal('resource', item.id),
    companyId: item.companyId,
    resourceType: T.create(item.resourceType, enums.ResourceKind.castToInternal),
    specializationId: item.specializationId,
    numberOfUnit: item.numberOfUnit,
}));
