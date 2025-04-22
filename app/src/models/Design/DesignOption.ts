import { types, type Instance } from 'mobx-state-tree';
import { E, Img, MstType, lang } from '~/api';
import { stores } from '~/stores';
import { Architect } from './Architect';
import { FloorLevel } from './FloorLevel';
import { SliderList } from './SliderList';

export type DesignOptionType = Instance<typeof DesignOption>;

export const DesignOption = types
    .model({
        id: stores.idCollection.getIdentifier('designOption'),

        consultantId: MstType.number,

        titleEn: MstType.string,

        titleAr: MstType.string,

        descriptionEn: MstType.string,

        descriptionAr: MstType.string,

        inspirationDescriptionEn: MstType.string,

        inspirationDescriptionAr: MstType.string,

        companyName: MstType.string,

        companyAvatar: MstType.Img,

        builtUpArea: MstType.number,

        bedrooms: MstType.number,

        toilets: MstType.number,

        estimatedConstructionPrice: MstType.number,

        designPrice: MstType.number,

        municipalityFees: MstType.number,

        sliderImgs: types.array(types.model({
            id: types.string,
            img: MstType.Img,
        })),

        sliderList: types.array(SliderList),

        floorLevels: types.array(FloorLevel),

        liked: false,

        requiredLandSize: MstType.number,

        videoLink: MstType.string,

        architect: types.maybe(Architect),

        landType: types.optional(
            types.enumeration<E.ConstructionLand>(
                'ConstructionLand',
                Object.values(E.ConstructionLand),
            ),
            E.ConstructionLand.none,
        ),

        consultantType: types.optional(
            types.enumeration<E.ConsultantType>(
                'ConsultantType',
                Object.values(E.ConsultantType),
            ),
            E.ConsultantType.none,
        ),

        delivery: MstType.string,

        projectFeatures: types.array(MstType.string),

        projectFeaturesAr: types.array(MstType.string),

        brochureLink: MstType.string,

        propertyType: types.optional(
            types.enumeration<E.PropertyType>(
                'PropertyType',
                Object.values(E.PropertyType),
            ),
            E.PropertyType.none,
        ),

        location: MstType.string,

        locationAr: MstType.string,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('designOption', self.id);
        },

        get mainImg() {
            return self.sliderImgs[0].img?.url ?? Img.empty().url;
        },

        get totalPrice() {
            return self.designPrice + self.municipalityFees;
        },

        get title() {
            if (lang.current === 'ar' && self.titleAr.length > 0) {
                return self.titleAr;
            }

            return self.titleEn;
        },

        get description() {
            if (lang.current === 'ar' && self.descriptionAr.length > 0) {
                return self.descriptionAr;
            }

            return self.descriptionEn;
        },

        get inspirationDescription() {
            if (lang.current === 'ar' && self.inspirationDescriptionAr.length > 0) {
                return self.inspirationDescriptionAr;
            }

            return self.inspirationDescriptionEn;
        },

        get isDeveloper() {
            return self.consultantType === E.ConsultantType.developer;
        },

        get locationTranslated() {
            return lang.currentLanguage === 'en' ? self.location : self.locationAr;
        },
    }))
    .actions(self => ({
        toggleLiked: () => {
            self.liked = !self.liked;
        },
    }));
