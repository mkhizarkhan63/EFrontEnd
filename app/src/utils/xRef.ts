import type { ComponentType } from 'react';

const xRefBind = '@-x-ref' as const;

export type Props<
    Key extends string = string,
    T extends unknown = unknown,
> = {
    [xRefBind]?: Key;
} & T;

export type Connector<
    Key extends string,
> = {
    props: {
        [xRefBind]: Key;
    };
    get: (key: Key) => HTMLElement | undefined;
};

const xRefConnect = <
    P extends Props,
    Key = P extends Props<infer K> ? K : string,
>(component: ComponentType<P>) => {
    component;

    const $els: Partial<Record<string, HTMLElement>> = {};

    const setRef = (key: Key) => ($el: HTMLElement) => {
        $els[key as unknown as string] = $el ? $el : undefined;
    };

    return {
        props: { [xRefBind]: setRef } as unknown as ({ [xRefBind]: Key }),
        get: <T extends HTMLElement = HTMLElement>(key: Key) => {
            const $el = $els[key as unknown as string];
            return $el?.isConnected ? ($el as unknown as T) : undefined;
        },
    };
};

const xRefBinder = <
    Key extends string,
>(props: Props<Key>) => {
    const binder = props[xRefBind];

    return (binder ? binder : () => { /* noop */ }) as unknown as (key: Key) => (comp: HTMLElement | null) => void;
};

export {
    xRefBinder as binder,
    xRefConnect as connect,
};
