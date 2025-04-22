import { types } from 'mobx-state-tree';
import { Id as IdModel } from '../Id';

export const Id = types.custom<number, IdModel>({
    name: 'Id',
    fromSnapshot: id => IdModel.init(id, 'external'),
    toSnapshot: id => id.asNumber(),
    isTargetType: value => value instanceof IdModel,
    getValidationMessage: value => (typeof value === 'number' ? '' : `${value} doesn't look like a valid Id`),
});
