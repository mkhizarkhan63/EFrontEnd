import * as Sentry from '@sentry/browser';
import { Integrations as TrackingIntegrations } from '@sentry/tracing';
import { action, configure, makeObservable, observable } from 'mobx';
import { Env } from '../Env';
import { type Dict } from '../Lang/Dict';

type AnyCaller = typeof console.log;

type Cve = {
    consultant?: keyof Dict;
    client?: keyof Dict;
    contractor?: keyof Dict;
};

export enum DebugLevel {
    error = 'error',
    info = 'info',
    warn = 'warn',
    log = 'log',
}

const extractError = (x: unknown) => {
    if (x instanceof Error) {
        return x;
    }

    if (!Array.isArray(x)) {
        return;
    }

    for (const y of x) {
        if (!(y instanceof Error)) {
            continue;
        }

        return y;
    }
};

export class Debug {
    isEnabled = false;

    private isSentryEnabled = false;

    /**
     * Stands for Critical Visible Error
     */
    cve: Cve & { time: number } = {
        time: 0,
    };

    constructor() {
        makeObservable(this, {
            cve: observable.deep,
            addCve: action,
            removeCve: action,
        });
    }

    enable = () => {
        this.isEnabled = true; // Env.getBool('IS_DEV') !== false;
    };

    init = () => {
        if (!this.isEnabled) {
            return;
        }

        this.initMobx();
        this.initSentry();
    };

    private initMobx = () => {
        configure({
            enforceActions: 'always',
            computedRequiresReaction: true,
            observableRequiresReaction: true,
        });
    };

    private initSentry = () => {
        const dsn = Env.get('SENTRY_DSN');
        const environment = Env.get('SENTRY_ENV', 'local');

        if (!dsn) {
            return;
        }

        Sentry.init({
            dsn,
            integrations: [
                new TrackingIntegrations.BrowserTracing({
                    ['traceXHR' as const]: true,
                    traceFetch: true,
                }),
            ],
            tracesSampleRate: 1,
            environment,
        });

        this.isSentryEnabled = true;
    };

    private getSentryLevel = (type: DebugLevel) => {
        const result = ({
            [DebugLevel.log]: 'log',
            [DebugLevel.info]: 'info',
            [DebugLevel.warn]: 'warning',
            [DebugLevel.error]: 'error',
        } as const)[type];

        return typeof result === 'undefined'
            ? 'error'
            : result;
    };

    private sendToSentry = (error: unknown, source: string, type: DebugLevel) => {
        if (!this.isSentryEnabled) {
            return;
        }

        if (type === DebugLevel.info || type === DebugLevel.log) {
            return;
        }

        const rawError = extractError(error);

        Sentry.captureException(rawError ?? error, scope => {
            scope.clear();
            if (rawError && rawError !== error) {
                if (typeof error === 'object' && error !== null) {
                    scope.setContext('js.raw', { ...error });
                } else {
                    scope.setExtra('js.raw.extra', error);
                }
            }

            scope.setTag('js.source', source);
            scope.setTag('js.level', type);
            scope.setTag('js.debug', this.isEnabled);
            scope.setLevel(this.getSentryLevel(type));
            return scope;
        });
    };

    orDo = (fn: () => void) => {
        if (fn && !this.isEnabled) {
            fn();
        }
    };

    print = (
        error: unknown,
        source: string,
        type: DebugLevel = DebugLevel.error,
    ) => {
        if (this.isEnabled) {
            console.groupCollapsed(`DEBUG --- [${source}] : ${type}`);
            if (Array.isArray(error)) {
                console[type](...error);
            } else {
                console[type](error);
            }
            console.groupEnd();
        }

        this.sendToSentry(error, source, type);
    };

    /**
     * Stands for Critical Visible Error
     */
    addCve = (errors: Cve) => {
        this.cve = {
            ...errors,
            time: Date.now(),
        };
    };

    removeCve = () => {
        this.cve = { time: Date.now() };
    };

    registerPublicFunction = (prefix: string, name: string, fn: AnyCaller) => {
        const w = window as unknown as Record<string, Record<string, Record<string, AnyCaller>>>;

        const debugKey = '__debug__';

        if (!w[debugKey]) {
            w[debugKey] = {};
        }

        if (!w[debugKey][prefix]) {
            w[debugKey][prefix] = {};
        }

        w[debugKey][prefix][name] = fn;
    };
}

export const debug = new Debug();
