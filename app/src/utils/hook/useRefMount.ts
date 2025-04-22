import { useState, useCallback, useEffect } from 'react';

export const useRefMount = <RefElement extends HTMLElement>(
    onMount: (node: RefElement) => void,
    onUnmount?: () => void,
) => {
    const [node, setNode] = useState<RefElement | null>(null);

    useEffect(() => {
        if (!node) {
            return;
        }

        onMount(node);

        return () => onUnmount?.();

    }, [node]);

    return useCallback((nextNode: RefElement | null) => {
        setNode(nextNode);
    }, [onMount, onUnmount]);
};
