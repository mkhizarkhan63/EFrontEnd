import { utilsString } from '..';

export const toKebabCaseKeys = <R extends Record<string, unknown>>(obj: R) => {
    const result: Record<string, R[keyof R]> = {};

    for (const [key, value] of Object.entries(obj)) {
        result[utilsString.toKebabCase(key)] = value as R[keyof R];
    }

    return result;
};
