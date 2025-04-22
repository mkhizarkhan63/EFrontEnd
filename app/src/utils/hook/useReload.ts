import { useEffect, useState } from 'react';

/**
 * Hook allowing keep reloading external code depends on values:
 * 1. setup - bind to dom etc
 * 2. destroy - unbind all
 */
export const useReload = (
    onReload: (reload: () => void) => () => void,
    refs: unknown[],
) => {
    const [reloadValue, setReload] = useState(0);
    const reload = () => setReload(v => v + 1);
    useEffect(() => onReload(reload), [reloadValue, ...refs]);
};
