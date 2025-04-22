import type { History } from 'history';
import { runInAction, reaction, makeObservable, observable, action } from 'mobx';
import { useEffect, useRef } from 'react';

type Unknown = typeof Array['arguments'];
type Routes = Record<string, Route | Zone>;
type Segments = Array<string | Param>;
type ParamsOf<T extends Segments> = {
    [P in T[number] as (P extends Param<infer N> ? N : never)]: P extends Param<string, infer V> ? V : never;
};
type MergeArrays<A, B> = A extends Array<infer Av>
    ? (
        B extends Array<infer Bv>
            ? Array<Av | Bv>
            : never
    )
    : never;
type ExtendsRoutes<
    S extends Segments,
    R extends Routes,
> = {
    [Key in keyof R]: R[Key] extends Zone<infer A, infer B>
        ? Zone<MergeArrays<S, A>, B>
        : (
            R[Key] extends Route<infer A>
                ? Route<MergeArrays<S, A>>
                : never
        );
};

export class Router<Route extends Routes> {
    path = '';

    isReloading = false;

    #disposers: Array<() => void> = [];

    constructor(
        readonly history: History,
        readonly routes: Route,
    ) {
        makeObservable(this, {
            path: observable,
            isReloading: observable,
            goBack: action,
        });

        this.#rewrite([], routes);

        runInAction(() => {
            this.path = history.location.pathname;
            this.#testAll(routes, this.path);
        });

        this.#disposers.push(reaction(() => this.path, path => {
            this.#testAll(routes, path);
        }));

        this.#disposers.push(history.listen(result => {
            runInAction(() => {
                this.path = result.location.pathname;
            });
        }));
    }

    get $() {
        return this.routes;
    }

    dispose = () => {
        this.#disposers.forEach(x => x());
        runInAction(() => {
            this.path = '';
        });
    };

    rawGo = (url: string) => {
        this.history.replace(url);
    };

    goBack = () => {
        this.history.back();
    };

    reload = () => {
        this.isReloading = !this.isReloading;
    };

    useBlockUnload = (shouldBlock: () => boolean, prompt: string, excludePath?: string[]) => {
        const unblocker = useRef<VoidFunction>();

        const initBlocking = () => {
            const unblock = this.history.block(transition => {
                if (excludePath && excludePath.some(
                    element => transition.location.pathname.startsWith(element),
                )) {
                    unblock();
                    transition.retry();
                    return;
                }

                if (window.confirm(prompt)) {
                    unblock();
                    transition.retry();
                }
            });

            unblocker.current = unblock;
        };

        const blocker = () => {
            if (shouldBlock()) {
                initBlocking();
                return;
            }

            unblocker.current?.();
        };

        useEffect(
            blocker,
            [],
        );

        useEffect(
            () => reaction(
                () => [shouldBlock(), this.path],
                blocker,
            ),
            [],
        );
    };

    #rewrite = (segments: Segments, routes: Routes) => {
        for (const route of Object.values(routes)) {
            const currentSegments = [...segments, ...route.rawPath];

            route.setHistory(this.history);
            route.setPath(currentSegments);

            if (route instanceof Zone) {
                this.#rewrite(currentSegments, route.routes);
            }
        }
    };

    #testAll = (routes: Routes, path: string) => {
        for (const route of Object.values(routes)) {
            runInAction(() => {
                const m = route.regex.exec(path);

                if (!m) {
                    route.match = false;
                    return;
                }

                const params = route.path
                    .filter((x): x is Param => typeof x !== 'string')
                    .map((x, i) => [x.name, x.cast(m[i + 1] ?? '')]);

                if (params.some(x => x[1] === undefined)) {
                    route.match = false;
                    return;
                }

                const res: Record<string, unknown> = {};
                params.forEach(x => {
                    res[x[0]] = x[1];
                });
                route.setParams(res);
                route.match = true;
            });

            if (route instanceof Zone) {
                this.#testAll(route.routes, path);
            }
        }
    };
}

class Param<Name extends string = string, Type = Unknown> {
    constructor(
        readonly name: Name,
        readonly cast: (value: string) => Type | undefined,
        readonly castBack: (value: Type) => string | undefined,
    ) {}
}

export const param = <
    Type = Unknown,
    Name extends string = string,
>(
    name: Name,
    cast: (value: string) => Type | undefined,
    castBack: (value: Type) => string | undefined,
) => new Param(name, cast, castBack);

export class Route<
    Path extends Segments = Segments,
    Params = ParamsOf<Path>,
> {
    match = false;

    regex = /.?/;

    params = {} as unknown as Params;

    path: Segments = [];

    #history?: History;

    constructor(
        readonly rawPath: Path,
    ) {
        makeObservable(this, {
            match: observable,
            params: observable.deep,
            setParams: action,
            clearParams: action,
        });

        reaction(
            () => this.match,
            match => {
                if (match) {
                    return;
                }

                this.clearParams();
            },
        );
    }

    clearParams = () => {
        Object.keys(this.params as Params as Record<string, unknown>).forEach(key => {
            (this.params as Params as Record<string, unknown>)[key] = undefined;
        });
    };

    go(params: Params) {
        const h = this.#history;

        if (!h) {
            return;
        }

        const path = this.path.map(item => {
            if (typeof item === 'string') {
                return item;
            }

            return item.castBack(params[item.name as keyof Params]) ?? '';
        }).join('/').replace(/\/{2,}/g, '/');

        h.push(`/${path}`);
    }

    setHistory = (history: History) => {
        this.#history = history;
        this.setHistory = () => {
            // byebye
        };
    };

    setPath = (segments: Segments) => {
        this.path = segments;
        this.regex = new RegExp([
            '^/?',
            segments
                .map(seg => (seg instanceof Param ? '([^/]+)' : seg))
                .join('/'),
            '/?$',
        ].join(''));
        this.setPath = () => {
            // byebye, setPath
        };
    };

    setParams = (params: Record<string, unknown>) => {
        this.params = params as unknown as Params;
    };
}

export const route = <
    Path extends Array<string | Param> = Array<string | Param>,
>(path: Path) => new Route(path);

class Zone<
    Path extends Array<string | Param> = Array<string | Param>,
    Sub extends Routes = Routes,
    Params = ParamsOf<Path>,
    SubRoutes = ExtendsRoutes<Path, Sub>,
> {
    match = false;

    regex = /.?/;

    params = {} as unknown as Params;

    path: Segments = [];

    routes: SubRoutes;

    #history?: History;

    constructor(
        readonly rawPath: Path,
        sub: Sub,
    ) {
        makeObservable(this, {
            match: observable,
            params: observable.deep,
            setParams: action,
            clearParams: action,
        });
        this.routes = sub as unknown as SubRoutes;

        reaction(
            () => this.match,
            match => {
                if (match) {
                    return;
                }

                this.clearParams();
            },
        );
    }

    clearParams = () => {
        Object.keys(this.params as Params as Record<string, unknown>).forEach(key => {
            (this.params as Params as Record<string, unknown>)[key] = undefined;
        });
    };

    get $() {
        return this.routes;
    }

    go(params: Params) {
        const h = this.#history;

        if (!h) {
            return;
        }

        const path = this.path.map(item => {
            if (typeof item === 'string') {
                return item;
            }

            return item.castBack(params[item.name as keyof Params]) ?? '';
        }).join('/').replace(/\/{2,}/g, '/');

        h.push(`/${path}`);
    }

    setHistory = (history: History) => {
        this.#history = history;
        this.setHistory = () => {
            // byebye
        };
    };

    setPath = (segments: Segments) => {
        this.path = segments;
        this.regex = new RegExp([
            '^/?',
            segments
                .map(seg => (seg instanceof Param ? '([^/]+)' : seg))
                .join('/'),
            '(/|$)',
        ].join(''));
        this.setPath = () => {
            // byebye, setPath
        };
    };

    setParams = (params: Record<string, unknown>) => {
        this.params = params as unknown as Params;
    };

}

export const zone = <
    Path extends Segments = Segments,
    Sub extends Routes = Routes,
>(path: Path, sub: Sub) => new Zone(path, sub);

export const joinedRoutes = <
    Path extends Segments = Segments,
    Params = ParamsOf<Path>,
    Sub extends Routes = Routes,
>(routes: Array<Route<Path, Params> | Zone<Path, Sub, Params>>) => {
    const found = routes.find(x => x.match);

    const sub = found && '$' in found
        ? found.$
        : {};

    return {
        $: sub as unknown as Zone<Path, Sub, Params>['$'],
        match: Boolean(found),
        go: (params: Partial<Params>) => {
            if (!found) {
                return;
            }

            found.go({
                ...found.params,
                ...params,
            });
        },
        params: found ? { ...found.params } : {},
    };
};
