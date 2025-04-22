import * as T from 'superstruct';

export const LanguageCode = T.coerce(
    T.string(),
    T.refine(T.string(), 'languageCode', value => value.length === 2),
    value => value.toLowerCase(),
);
