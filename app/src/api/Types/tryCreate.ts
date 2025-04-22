import * as T from 'superstruct';

export const tryCreate = <T, S>(value: unknown, struct: T.Struct<T, S>) => (
    typeof value !== 'undefined'
        ? T.create(value, struct)
        : undefined
);
