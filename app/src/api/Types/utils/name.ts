import * as T from 'superstruct';

export const name = () => T.define<string>(
    'name',
    value => typeof value === 'string' && value.length >= 3 && value.length <= 32,
);
