import { dtos, Img, T, type E, type Paging } from '~/api';
import { DesignOption, FloorLevel, Room } from '~/models';
import { stores } from '~/stores';
import { utilsArray } from '~/utils';
import { enums } from '../..';
import { getCompaniesInfo } from '../getCompaniesInfo';
import { RoomType } from '~/api/Enums';

export type DesignFilters = {
    initialized: boolean;
    price?: number;
    liked?: boolean;
    name?: string;
    buildUpArea?: number;
    propertyType?: E.PropertyType;
    bedrooms: number;
};

export const get = async (paging?: Paging, filters?: DesignFilters) => {
    if (!filters?.initialized) {
        return [];
    }

    const data = await dtos.design.execGetDesignListQuery({
        ...paging?.toQuery(),
        filter: {
            liked: filters?.liked,
            propertyType: T.tryCreate(
                filters?.propertyType,
                enums.PropertyType.castToExternal,
            ),
            name: filters.name,
            price: {
                min: 0,
                max: filters.price,
            },
            buildUpArea: filters.buildUpArea,
            roomRequirements: [
                {
                    roomType: T.tryCreate(
                        RoomType.bedroom,
                        enums.RoomType.castToExternal,
                    ),
                    rangeAmount: {
                        min: filters.bedrooms === 0 ? undefined : filters.bedrooms,
                        max: filters.bedrooms === 0 ? undefined : filters.bedrooms,
                    },
                },
            ],
        },
    });

    if (!data || !data.result || data.result.length === 0) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 0);
    paging?.setRowCount(data.rowCount ?? 0);

    return toInternalDesigns(data.result);
};

export const getRelated = async (designId?: number) => {
    if (!designId) {
        return [];
    }

    const data = await dtos.design.execGetRelatedDesignsQuery({
        designId,
        pageSize: 4,
    });

    if (!data || !data.result) {
        return [];
    }

    return toInternalDesigns(data.result);
};

const toInternalDesigns = async (result: dtos.design.DesignPreviewDto[]) => {
    const companyIds = utilsArray.unique(result
        .map(item => item.companyId)
        .filter((item): item is number => typeof item !== 'undefined'));

    const companiesInfo = await getCompaniesInfo(companyIds);

    const designs = result.map(item => toInternalDesign(item, companiesInfo));

    return utilsArray.nonEmpty(designs);
};

const toInternalDesign = (external: dtos.design.DesignPreviewDto, companiesInfo: dtos.contractor.CompanyInformationDto[]) => {
    const company = companiesInfo.find(item => item.id === external.companyId);

    const floors = external.floors?.map(floor => {
        const rooms = floor.rooms?.map(room => Room.create({
            count: room.amount,
            type: T.create(
                room.roomType,
                enums.RoomType.castToInternal,
            ),
        }));

        return FloorLevel.create({
            size: floor.area,
            type: T.create(
                floor.floorType,
                enums.FloorLevel.castToInternal,
            ),
            level: floor.level,
            rooms,
        });
    });

    return DesignOption.create({
        id: stores.idCollection.getInternal('designOption', external.id),
        titleEn: external.titleEn,
        titleAr: external.titleAr,
        estimatedConstructionPrice: external.estimatedConstructionPrice,
        consultantId: external.companyId,
        bedrooms: external.numberOfBedrooms,
        toilets: external.numberOfToilets,
        designPrice: external.price,
        builtUpArea: external.totalBuiltUpArea,
        companyName: company?.name,
        companyAvatar: Img.tryCreate(company?.companyLogoId),
        floorLevels: floors,
        sliderImgs: external.imagesIds?.map(item => ({
            id: item,
            img: Img.create(item, e => e.large),
        })),
        liked: external.liked,
        consultantType: T.create(
            external.consultantType,
            enums.ConsultantType.castToInternal,
        ),
        delivery: external.delivery,
        propertyType: T.create(
            external.propertyType,
            enums.PropertyType.castToInternal,
        ),
        location: external.projectLocation,
        locationAr: external.projectLocationAr,
    });
};
