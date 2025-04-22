import { types } from 'mobx-state-tree';
import { utilsNumber } from '~/utils';

const toStarsRange = (value: number) => utilsNumber.toRange(value, 1, 5);

export const StarsAmount = types.optional(
    types.custom<number, number>({
        name: 'StarsAmount',
        fromSnapshot: toStarsRange,
        toSnapshot: toStarsRange,
        isTargetType: value => toStarsRange(value) === value,
        getValidationMessage: value => (typeof value === 'number' ? '' : `${value} doesn't look like a valid StarsAmount`),
    }), 1);

