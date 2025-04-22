import { toRoundedFloat } from './toRoundedFloat';

const CURRENCY = 'USD';
const DIGITS = 3;

export const toCurrency = Object.assign((value?: number, minimum = 3, max = DIGITS) => {
    if (value === undefined) {
        return '';
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: CURRENCY,
        currencyDisplay: 'code',
        minimumFractionDigits: minimum,
        maximumFractionDigits: max,
    });

    return formatter
        .format(value)
        .replace(CURRENCY, '')
        .trim();
}, {
    asNumber: (value?: number) => toRoundedFloat(value, DIGITS),
});
