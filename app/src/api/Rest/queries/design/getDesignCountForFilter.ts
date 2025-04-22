import { T } from '~/api';
import { dtos, enums } from '../..';
import { type DesignFilters } from './getDesigns';
import { RoomType } from '~/api/Enums';

export type DesignCounters = {
    designCount: number;
    likedCount: number;
};

export const getDesignCountForFilter = async (filters: DesignFilters) => {
    const data = {
        filter: {
            price: {
                min: 0,
                max: filters?.price,
            },
            liked: filters.liked,
            propertyType: T.tryCreate(
                filters?.propertyType,
                enums.PropertyType.castToExternal,
            ),
            name: filters.name,
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
    };

    const designCount = await dtos.design.execGetDesignCountForFilterQuery(data);
    data.filter.liked = true;
    const likedCount = await dtos.design.execGetDesignCountForFilterQuery(data);

    return {
        designCount: designCount ? designCount.result : 0,
        likedCount: likedCount ? likedCount.result : 0,
    };
};
