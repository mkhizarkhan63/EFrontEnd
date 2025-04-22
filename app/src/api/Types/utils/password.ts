import { T } from '~/api';

export const password = () => T.define<string>(
    'password',
    value => typeof value === 'string' && value.length >= 6,
);
