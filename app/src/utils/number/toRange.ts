export const toRange = (
    value: number,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
) => Math.max(Math.min(value, max), min);
