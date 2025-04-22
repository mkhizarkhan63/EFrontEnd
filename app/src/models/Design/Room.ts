import { types } from 'mobx-state-tree';
import { E, MstType } from '~/api';

export const Room = types.model({
    type: types.optional(
        types.enumeration<E.RoomType>('RoomType', Object.values(E.RoomType)),
        E.RoomType.none,
    ),
    count: MstType.number,
});
