import type { SyntheticEvent } from 'react';

export const stopPropagation = (fn?: () => void) => (e: SyntheticEvent) => {
    e.stopPropagation();
    fn?.();
};
