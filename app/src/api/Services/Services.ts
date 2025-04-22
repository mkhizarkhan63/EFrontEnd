import { observable, runInAction } from 'mobx';

/**
 * Allows create proxy for on-demand created instances
 * Also returns function `reload` to recreate existing instance
 *
 * @param services List of names services and creators of them
 */
export const createServices = <T extends Record<string, () => unknown>>(services: T) => {
    const instances: Record<string, unknown> = observable({});

    return new Proxy({
        reload: (key: keyof T) => {
            runInAction(() => {
                instances[key as string] = services[key]();
            });
        },
        tryGet: (key: keyof T) => instances[key as string],
    }, {
        get: (target, key) => {
            if (typeof key !== 'string') {
                return undefined;
            }

            if (key in target) {
                return target[key as keyof typeof target];
            }

            if (instances[key]) {
                return instances[key];
            }

            const service = services[key]();

            runInAction(() => {
                instances[key] = service;
            });

            return service;
        },
    }) as {
        reload: (name: keyof T) => void;
        tryGet: <Key extends keyof T>(name: Key) => ReturnType<T[Key]> | undefined;
    } & {
        [Key in keyof T]: ReturnType<T[Key]>;
    };
};
