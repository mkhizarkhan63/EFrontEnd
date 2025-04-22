import * as T from 'superstruct';

export const crNumber = () => T.define<number>(
    'crNumber',
    value => typeof value === 'string'
        && value.length <= 12
        && value.length > 0,
);
