import * as T from 'superstruct';

export const sumOfPercentages = () => T.define<number>(
    'sumOfPercentages',
    value => {
        if (typeof value !== 'number') {
            return false;
        }
        return value === 100 ? true : new Error(String(value));
    },
);
