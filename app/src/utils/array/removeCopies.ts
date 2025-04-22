type TheUnknown = Parameters<Window['alert']>[0];
type AnyInstanceType = Record<TheUnknown, TheUnknown>;

export const removeCopies = <T extends AnyInstanceType>(arr: T[], by: keyof T) => {
    const exists: Array<T[keyof T]> = [];

    return arr.filter(item => (exists.includes(item[by]) ? false : exists.push(item[by])));
};
