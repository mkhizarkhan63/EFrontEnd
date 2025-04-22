export const toSafe = (
    value: number,
    alt = 0,
) => {
    if (
        isNaN(value) ||
        value >= Number.MAX_SAFE_INTEGER ||
        value <= Number.MIN_SAFE_INTEGER ||
        value === Infinity ||
        value === -Infinity
    ) {
        return alt;
    }

    return value;
};
