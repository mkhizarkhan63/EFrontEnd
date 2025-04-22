import { types } from 'mobx-state-tree';
import { E, MstType } from '~/api';

export const SliderList = types
    .model({
        type: types.enumeration<E.SlideType>('SlideType', Object.values(E.SlideType)),
        imgs: types.array(types.model({
            id: types.string,
            img: MstType.Img,
        })),
        isVisible: MstType.boolean,
    });
