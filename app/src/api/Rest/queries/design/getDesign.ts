import { cast, type Instance } from 'mobx-state-tree';
import { dtos, E, enums, Img, T } from '~/api';
import { Architect, DesignOption, FloorLevel, Room, type SliderList } from '~/models';
import { stores } from '~/stores';
import { getUserInfo } from '../getUserInfo';

export const getDesign = async (id: number) => {
    const data = await dtos.design.execGetDesignQuery({ id });

    if (!data) {
        return false;
    }

    const { result: external } = data;

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

    const sliderList: Array<Instance<typeof SliderList>> = [
        {
            type: E.SlideType.exterior,
            imgs: cast(external.picturesExteriorIds?.map(item => ({
                id: item,
                img: Img.create(item, e => e.extraLarge),
            }))),
            isVisible: external.picturesExteriorIds?.length > 0,
        },
        {
            type: E.SlideType.interior,
            imgs: cast(external.picturesInteriorIds?.map(item => ({
                id: item,
                img: Img.create(item, e => e.extraLarge),
            }))),
            isVisible: external.picturesInteriorIds?.length > 0,
        },
        {
            type: E.SlideType.landscape,
            imgs: cast(external.picturesLandscapeIds?.map(item => ({
                id: item,
                img: Img.create(item, e => e.extraLarge),
            }))),
            isVisible: external.picturesLandscapeIds?.length > 0,
        },
        {
            type: E.SlideType.layouts,
            imgs: cast(external.picturesLayoutsIds?.map(item => ({
                id: item,
                img: Img.create(item, e => e.extraLarge),
            }))),
            isVisible: external.picturesLayoutsIds?.length > 0,
        },
    ];

    const architectData = await getUserInfo(external.architectId);

    const architectImg = () => {
        if (!architectData?.profilePicture || architectData.profilePicture.length < 0) {
            return '';
        }

        return Img.create(architectData.profilePicture);
    };

    return DesignOption.create({
        id: stores.idCollection.getInternal('designOption', external.id),
        titleEn: external.titleEn,
        titleAr: external.titleAr,
        descriptionEn: external.descriptionEn,
        descriptionAr: external.descriptionAr,
        inspirationDescriptionEn: external.inspirationDescriptionEn,
        inspirationDescriptionAr: external.inspirationDescriptionAr,
        estimatedConstructionPrice: external.estimatedConstructionPrice,
        consultantId: external.companyId,
        bedrooms: external.numberOfBedrooms,
        toilets: external.numberOfToilets,
        designPrice: external.price,
        municipalityFees: external.municipalityFees,
        builtUpArea: external.totalBuiltUpArea,
        floorLevels: floors,
        landType: T.create(
            external.landType,
            enums.ConstructionLand.castToInternal,
        ),
        liked: external.isLiked,
        sliderImgs: external.picturesMainIds?.map(item => ({
            id: item,
            img: Img.create(item, e => e.large),
        })),
        requiredLandSize: external.requiredLandSize,
        videoLink: external.youtubeLink,
        sliderList,
        architect: Architect.create({
            name: architectData?.name,
            avatar: architectImg(),
            phone: architectData?.phone,
        }),
        consultantType: T.create(
            external.consultantType,
            enums.ConsultantType.castToInternal,
        ),
        delivery: external.delivery,
        projectFeatures: external.projectFeatures,
        projectFeaturesAr: external.projectFeaturesAr,
        brochureLink: external.brochureLink,
        propertyType: T.create(
            external.propertyType,
            enums.PropertyType.castToInternal,
        ),
    });
};
