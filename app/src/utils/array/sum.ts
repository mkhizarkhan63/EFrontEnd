export const sum = <T>(
    list: T[],
    map: (item: T) => number,
    initialValue = 0,
) => {
    let value = initialValue;

    for (const item of list) {
        value += map(item);
    }

    return value;
};
