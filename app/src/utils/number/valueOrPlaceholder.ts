import { lang } from '~/api';
import type { Dict } from '~/api/Lang/Dict';

export const valueOrPlaceholder = (value?: number, key?: keyof Dict) => {
    if (!value || value === 0) {
        return '--';
    }

    if (typeof key === 'string') {
        return `${value} ${lang.dict.get(key)}`;
    }

    return value;
};
