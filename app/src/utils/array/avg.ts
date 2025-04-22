const methods = Object.freeze({
    math: Math.round,
    up: Math.ceil,
    down: Math.floor,
} as const);

export const avg = (
    values: number[],
    precision = Infinity,
    method: keyof typeof methods = 'math',
) => {
    const v = values.reduce((a, b) => a + b, 0) / values.length;

    if (precision === Infinity || precision < 0) {
        return v;
    }

    const p = 10 ** precision;

    return methods[method](v * p) / p;
};
