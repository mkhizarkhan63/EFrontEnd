import type * as T from 'superstruct';

export type AnyStruct = T.Struct<
    typeof T.any['arguments'],
    typeof T.any['arguments']
>;
