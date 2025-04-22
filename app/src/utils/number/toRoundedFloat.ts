import { toRange } from './toRange';
import { toSafe } from './toSafe';

export const toRoundedFloat = (value: string | number = 0, digits = 3) => {
    value = parseFloat(String(value));

    const power = 10 ** toRange(digits, 0, 5);

    return Math.floor(toSafe(value) * power) / power;
};
