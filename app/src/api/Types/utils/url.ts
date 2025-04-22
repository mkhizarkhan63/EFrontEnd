import * as T from 'superstruct';
import { utilsString } from '~/utils';

export const url = (optional = true) => T.define<string>(
    'url',
    value => {
        if (optional && value === '') {
            return true;
        }

        return typeof value === 'string'
            ? utilsString.isUrlValid(value)
            : false;
    },
);
