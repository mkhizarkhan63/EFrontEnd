import { types, type Instance } from 'mobx-state-tree';
import { MstType } from '~/api';

export type InputType = Instance<typeof Input>;

export const Input = types
    .model({
        id: types.maybe(MstType.Id),

        value: MstType.string,
    })
    .actions(self => ({
        setValue: (value: string) => {
            self.value = value;
        },
    }));
