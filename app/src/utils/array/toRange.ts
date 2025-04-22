export const toRange = (
    values: number[],
    min: number,
    max: number,
) => values.map(x => Math.max(Math.min(x, max), min));
