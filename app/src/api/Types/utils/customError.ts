import * as T from 'superstruct';

export const customError = (errorType: string) => T.define<unknown>(
    errorType,
    () => false,
);
