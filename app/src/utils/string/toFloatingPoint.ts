import { utils } from '~/api';

export const toFloatingPoint = (value: string | number) => {
    if (typeof value === 'string') {
        return value.replace(/\B(?=(\d{3})+?(?!\d))/g, ',');
    }

    return utils.toInputNumber(value).replace(/\B(?=(\d{3})+?(?!\d))/g, ',');
};

