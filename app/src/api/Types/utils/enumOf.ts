import * as T from 'superstruct';

export const enumOf = <V extends string | number>(values: Record<string, V>) => T.enums(
    Object.values(values) as string[],
);
