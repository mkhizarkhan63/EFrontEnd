import * as T from 'superstruct';

export const id = () => T.define<number>(
    'id',
    value => typeof value === 'number' && value > 0,
);
