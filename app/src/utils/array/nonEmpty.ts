export const nonEmpty = <T>(arr: Array<T | undefined>): T[] => arr.filter((item): item is T => typeof item !== 'undefined');
