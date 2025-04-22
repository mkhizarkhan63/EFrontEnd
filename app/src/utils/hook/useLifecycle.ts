import { useEffect, useState } from 'react';

type Status<T = unknown> = {
    data: T;
    updateTime: number;
};

class Lifecycle {
    private lastId = -1;

    private list = new Map<number, Status>();

    generateId = () => {
        this.lastId += 1;
        return this.lastId;
    };

    get = (id: number) => this.list.get(id);

    spawn = (id: number, genData?: () => unknown) => {
        const s = this.get(id);

        if (s) {
            s.updateTime = Date.now();
            return s;
        }

        const ns = {
            updateTime: Date.now(),
            data: genData?.(),
        };

        this.list.set(id, ns);

        return ns;
    };

    killRequest = <T>(id: number, unmount?: (data: T) => void) => {
        const s = this.get(id);
        const time = Date.now();

        if (!s) {
            return () => {
                // noop
            };
        }

        s.updateTime = time;

        return () => {
            const ns = this.get(id);

            if (!ns || ns.updateTime > time) {
                return;
            }

            this.list.delete(id);
            unmount?.(ns.data as T);
        };
    };
}

const lc = new Lifecycle();

export const useLifecycle = <T = undefined>(hooks: Partial<{
    mount: () => T;
    unmount: (state?: T) => void;
}>) => {
    const [id] = useState(lc.generateId);

    useEffect(() => {
        lc.spawn(id, hooks.mount);

        return () => {
            setTimeout(
                lc.killRequest(id, hooks.unmount),
                350,
            );
        };
    });
};
