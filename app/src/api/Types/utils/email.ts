import * as T from 'superstruct';

export const email = (isOptional = false) => T.define<string>(
    'email',
    value => {
        if (typeof value !== 'string') {
            return false;
        }

        if (isOptional && value === '') {
            return true;
        }

        return /^[^@]+@[^.@]+\.[^.@]+$/.test(value);
    },
);
