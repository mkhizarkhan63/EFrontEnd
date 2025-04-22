import * as T from 'superstruct';
import type { FileDataType } from '~/models';

export const files = () => T.define<FileDataType[]>(
    'files',
    value => {
        const item = T.type({
            id: T.number(),
            name: T.string(),
        });

        return Array.isArray(value) && value.length > 0 && value.every(x => T.is(x, item));
    },
);

