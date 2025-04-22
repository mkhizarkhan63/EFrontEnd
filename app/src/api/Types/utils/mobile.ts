import * as T from 'superstruct';

export const mobile = () => T.define<string>(
    'mobile',
    value => typeof value === 'string' && /^\+?\d{8,15}$/.test(value),
);
