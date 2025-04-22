import { utilsString } from '..';

export const toCamelCaseKeys = <R extends Record<string, unknown>>(obj: R) => {
    const result: Record<string, R[keyof R]> = {};

    for (const [key, value] of Object.entries(obj)) {
        result[utilsString.toCamelCase(key)] = value as R[keyof R];
    }

    return result;
};
