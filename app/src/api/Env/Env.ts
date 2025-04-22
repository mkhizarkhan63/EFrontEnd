type EnvVars =
    | 'SENTRY_DSN'
    | 'SENTRY_ENV'
    | 'API_ENDPOINT'
    | 'IS_DEV'
    | 'AUTH_ENDPOINT'
    | 'AUTH_ID'
    | 'AUTH_SECRET'
    | 'IS_PRODUCTION'
    | 'THAWANI_API_BASE_URL' | 'SESSION_URL' | 'THAWANI_API_KEY' | 'PUBLISH_KEY' | 'SUCCESS_URL' | 'CANCEL_URL'
    ;

type EnvRecord = Partial<Record<EnvVars, string> & Record<`JS_${EnvVars}`, string>>;

const ENV_KEY = 'b1f307cedf6cc0b3ba72f9c4cfbac9ac' as const;

declare const window: Window & {
    [ENV_KEY]: EnvRecord;
};

export class Env {
    static key = ENV_KEY;

    static set(name: EnvVars, value?: string) {
        if (!window[ENV_KEY]) {
            window[ENV_KEY] = {};
        }

        window[ENV_KEY][name] = value;
    }

    static get(name: EnvVars): string | undefined;

    static get(name: EnvVars, alt: string): string;

    static get(name: EnvVars, alt?: string): string | undefined {
        const jsName = `JS_${name}` as const;

        if (window && ENV_KEY in window) {
            if (window[ENV_KEY][jsName]) {
                return window[ENV_KEY][jsName];
            }

            if (window[ENV_KEY][name]) {
                return window[ENV_KEY][name];
            }
        }

        return alt;
    }

    static getBool(name: EnvVars) {
        const value = Env.get(name, 'false') as unknown;
        return value === true || String(value).toLowerCase() === 'true' || String(value) === '1' || value === 1;
    }
}
