import { T } from '~/api';

export const confirmPassword = (newPassword: string) => T.define<string>(
    'confirmPassword',
    value => typeof value === 'string' && value.length > 0 && newPassword === value,
);
