import * as T from 'superstruct';

export const nameDesc = () => T.define<boolean>(
    'nameDesc',
    value => typeof value === 'boolean' && value,
);
