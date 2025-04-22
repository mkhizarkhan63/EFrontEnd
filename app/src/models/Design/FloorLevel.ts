import { types, type Instance } from 'mobx-state-tree';
import { E, MstType } from '~/api';
import { Room } from './Room';

export type FloorLevelType = Instance<typeof FloorLevel>;

export const FloorLevel = types.model({
    type: types.optional(
        types.enumeration<E.FloorType>('FloorType', Object.values(E.FloorType)),
        E.FloorType.none,
    ),
    size: MstType.number,
    level: MstType.number,
    rooms: types.array(Room),
});
