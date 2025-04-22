import { useRefMount } from './useRefMount';

const BLUR_EVENTS = ['mousedown'] as const;

type Handler = (event: Event) => void;

export const useClickOutside = (onBlur: () => void) => {
    let isChildCreating = true;

    const createHandler = (node: HTMLElement) => {
        isChildCreating = true;
        setTimeout(() => {
            isChildCreating = false;
        });

        return (event: Event) => {
            if (!event || isChildCreating) {
                return;
            }

            if (
                (event.target as HTMLElement) &&
                !node.contains(event.target as Node) &&
                (event.target as HTMLElement).isConnected) {
                onBlur();
            }
        };
    };

    const bindHandler = (fn?: Handler) => {
        if (!fn) {
            return;
        }

        for (const eventName of BLUR_EVENTS) {
            getDocument().addEventListener(eventName, fn, false);
        }
    };

    const unbindHandler = (fn?: Handler) => {
        if (!fn) {
            return;
        }

        for (const eventName of BLUR_EVENTS) {
            getDocument().removeEventListener(eventName, fn, false);
        }
    };

    let handler: Handler | undefined;

    const setHandler = (newHandler: Handler | undefined) => {
        handler = newHandler;
    };

    return useRefMount(
        node => {


            unbindHandler(handler);

            if (!node) {
                setHandler(undefined);
                return;
            }

            const nextHandler = createHandler(node);

            bindHandler(nextHandler);
            setHandler(nextHandler);
        },
        () => {
            unbindHandler(handler);
            setHandler(undefined);
        },
    );
};
