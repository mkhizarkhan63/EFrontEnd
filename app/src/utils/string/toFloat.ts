import { utilsNumber } from '..';

export const toFloat = (x: string, digits = 2) => {
    const n = utilsNumber.toSafe(parseFloat(x));

    return Number(n.toFixed(digits));
};
