export const fromInputNumber = (value: unknown, alt = 0, max?: number) => {
    let numberValue = alt;

    if (typeof value === 'string') {
        value = parseInt(value.replace(/,/g, ''), 10);
    }

    if (
        typeof value === 'number'
        && !isNaN(value)
        && value >= Number.MIN_SAFE_INTEGER
        && value <= Number.MAX_SAFE_INTEGER) {
        numberValue = value;
    }

    if (max) {
        return numberValue > max ? max : numberValue;
    }

    return numberValue;
};

export const toInputNumber = (value: number, ignored = 0, alt = '') => {
    let stringValue = alt;

    if (
        typeof value === 'number'
        && !isNaN(value)
        && value >= Number.MIN_SAFE_INTEGER
        && value <= Number.MAX_SAFE_INTEGER
        && value !== ignored) {
        stringValue = String(value);
    }

    return stringValue;
};
