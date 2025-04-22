export const toNumber = (x: string, alt = 0) => {
    const r = parseInt(x, 10);

    if (
        isNaN(r) ||
        r >= Number.MAX_SAFE_INTEGER ||
        r <= Number.MIN_SAFE_INTEGER ||
        r === Infinity ||
        r === -Infinity
    ) {
        return alt;
    }

    return r;
};
