import type { SyntheticEvent } from 'react';

export const preventDefault = (fn?: () => void) => (e: SyntheticEvent) => {
    e.preventDefault();
    fn?.();
};
