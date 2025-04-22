export const decimalToNumber = (value?: number) => {
    if (typeof value !== 'number' || value < 0) {
        return 0;
    }

    return value * 100;
};
