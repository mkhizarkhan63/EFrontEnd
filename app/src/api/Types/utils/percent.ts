import * as T from 'superstruct';

export const percent = (errorType = 'percent') => T.define<number>(
    errorType,
    value => typeof value === 'number' && value > 0 && value <= 100,
);
