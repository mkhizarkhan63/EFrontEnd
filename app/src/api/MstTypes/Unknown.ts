import { types } from 'mobx-state-tree';

export const Unknown = types.custom<string, unknown>({
    name: 'Unknown',
    fromSnapshot: value => JSON.parse(value),
    toSnapshot: value => JSON.stringify(value),
    isTargetType: value => typeof value !== 'string',
    getValidationMessage: value => {
        try {
            JSON.parse(value);
            return '';
        } catch (error) {
            return 'Invalid type "unknown"';
        }
    },
});
