import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';

export type MaterialNameType = Instance <typeof MaterialName>;

export const MaterialName = types.model({
    id: MstType.number,
    englishName: MstType.string,
    arabicName: MstType.string,
});
