import { JsonServiceClient } from '@servicestack/client';
import { debug, Env, E } from '..';
import { type Dict } from '../Lang/Dict';
import { storage } from '../Storage';

type RestMethod =
    | 'post'
    | 'get'
    | 'put'
    | 'delete'
    | 'patch'
    ;

type ClientMethod =
    | 'postToUrl'
    | 'get'
    | 'putToUrl'
    | 'delete'
    | 'patchToUrl'
   ;

type CriticalError = {
    consultant?: keyof Dict;
    client?: keyof Dict;
    contractor?: keyof Dict;
};

const deepClone = <T>(obj: T): T => {
    if (obj === null) {
        return undefined as T;
    }

    if (typeof obj !== 'object') {
        return obj as T;
    }

    const clone = (Array.isArray(obj) ? [] : {}) as unknown;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            (clone as Record<string, unknown>)[key] = deepClone(obj[key as keyof typeof obj] as unknown) as unknown;
        }
    }

    return clone as T;
};

class Client {
    private rawClient = new JsonServiceClient(Env.get('API_ENDPOINT'));

    private id?: number;

    private contextId?: number;

    private type?: E.RoleInCompany;

    private onAdminRoute = () => true;

    constructor() {
        this.rawClient.credentials = 'omit';

        setTimeout(() => {
            const idAsString = storage.session.get('id');

            if (!idAsString) {
                return;
            }

            const id = parseInt(idAsString, 10);

            if (typeof id === 'number') {
                this.id = id;
            }
        });
    }

    setToken = (token: string) => {
        this.rawClient.bearerToken = token;
    };

    setOnAdminRoute = (onAdminRoute: () => boolean) => {
        this.onAdminRoute = onAdminRoute;
    };

    private resolvePathToUrl = (path: string) => this.rawClient
        .toAbsoluteUrl(path);

    private getClientMethodName = (method: RestMethod): ClientMethod => {
        switch (method) {
            case 'post':
                return 'postToUrl';
            case 'put':
                return 'putToUrl';
            case 'patch':
                return 'patchToUrl';

            default:
                return method;
        }
    };

    private fixUrl = (url: string, data: unknown) => {
        if (typeof data !== 'object' || data === null) {
            return url;
        }

        url = url.replace(/{.+}/g, m => m.toLowerCase());

        for (const [key, value] of Object.entries(data)) {
            url = url.replace(
                `{${key.toLowerCase()}}`,
                String(value),
            );
        }

        return url;
    };

    setType = (type = E.RoleInCompany.client) => {
        this.type = type;
    };

    getType = () => this.type;

    getId = () => this.id;

    isContextSaved = () => this.id !== undefined;

    getContextId = () => this.contextId;

    setId = (id = 0) => {
        this.id = id;
        storage.session.set('id', String(id));
    };

    clearId = () => {
        this.id = undefined;
        storage.session.remove('id');
    };

    setContextId = (contextId = 0) => {
        this.contextId = contextId;
    };

    setContextHeaders = (headers: Headers) => {
        const { contextId, type } = this;

        if (!this.onAdminRoute()) {
            headers.set('app-context-id', String(contextId));
            headers.set('app-context-name', String(type));
        }

        if (this.onAdminRoute()) {
            headers.delete('app-context-id');
            headers.delete('app-context-name');
        }
    };

    execute = async <Query, Response>(
        method: RestMethod,
        path: string,
        data: Query,
    ) => {
        const { rawClient } = this;
        this.setContextHeaders(rawClient.headers);

        const funcName = this.getClientMethodName(method);

        const url = this.resolvePathToUrl(this.fixUrl(path, data));

        try {
            const response = await rawClient[funcName](url, data);
            return response as Response;
        } catch (error) {
            debug.print([
                `Client failed to fetch: ${method.toUpperCase()} ${path}`,
                data,
                error,
            ], 'api/Rest');

            throw error;
        }
    };

   
    encloseQuery = <Query, Response>(
        testIn: (data: Query) => Query,
        executioner: (data: Query) => Promise<Response>,
        testOut: (response: Response) => Response,
    ) => async (data: Query, criticalVisibleError?: CriticalError) => {
        let resData = data;

        try {
            resData = testIn(resData);
        } catch (error) {
            if (criticalVisibleError) {
                debug.addCve(criticalVisibleError);
            }

            debug.print([
                'Client failed at parsing query (outbound)',
                error,
            ], 'api/Rest');

            return false;
        }

        let resResponse: Awaited<Response>;

        try {
            resResponse = deepClone(await executioner(resData));
        } catch (error) {
            if (criticalVisibleError) {
                debug.addCve(criticalVisibleError);
            }

            debug.print([
                'Client failed at fetching query',
                error,
            ], 'api/Rest');

            return false;
        }

        try {
            return testOut(resResponse);
        } catch (error) {
            if (criticalVisibleError) {
                debug.addCve(criticalVisibleError);
            }

            debug.print([
                'Client failed at parsing response (inbound)',
                error,
            ], 'api/Rest');

            return false;
        }
    };

    emitError = (error: unknown) => {
        debug.print([
            'Client sent custom error',
            error,
        ], 'api/Rest');
    };

    sendRaw = (
        method: 'GET' | 'POST',
        path: string,
        params?: Record<string, unknown>,
        body?: BodyInit,
        baseUrl = Env.get('API_ENDPOINT'),
        customHeaders: Record<string, string> = {},
    ) => {
        const headers = new Headers();

        const { rawClient } = this;

        Object.entries(customHeaders)
            .forEach(([key, value]) => {
                headers.set(key, value);
            });

        this.setContextHeaders(headers);

        headers.set('authorization', `Bearer ${rawClient.bearerToken}`);

        const url = new URL(`${baseUrl}${path}`);

        if (params) {
            for (const key of Object.keys(params)) {
                url.searchParams.append(key, String(params[key]));
            }
        }

        const future = fetch(
            url.href,
            {
                method,
                headers,
                body,
            },
        );

        return {
            asBlob: async () => {
                const res = await future;
                return await res.blob();
            },
            asJson: async () => {
                const res = await future;
                return await res.json();
            },
        };
    };
}

export const client = new Client();
