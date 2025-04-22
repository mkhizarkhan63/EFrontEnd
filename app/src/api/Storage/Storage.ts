import { makeAutoObservable, reaction } from 'mobx';
import { parse, stringify } from 'json5';
import { T } from '~/api';

type Type = 'localStorage' | 'sessionStorage';

const innerStorage: Record<string, string> = {};

const storageProxy = (type: Type) => {
    if (type in globalThis) {
        return {
            set: (key: string, value: string) => {
                globalThis[type].setItem(key, value);
            },
            get: (key: string) => globalThis[type].getItem(key),
        };
    }

    return {
        set: (key: string, value: string) => {
            innerStorage[key] = value;
        },
        get: (key: string) => innerStorage[key] || null,
    };
};

class Storage<T extends Record<string, unknown>> {
    changeTime = 0;

    constructor(
        public struct: () => T.Struct<T>,
        public data: T,
        public storage: Type,
    ) {
        makeAutoObservable(this);
        reaction(
            () => this.changeTime,
            time => {
                if (time === 0) {
                    return;
                }

                this.save();
            },
        );
    }

    load = () => {
        const value = storageProxy(this.storage).get('settings');

        if (!value) {
            return;
        }

        try {
            const data = parse(value);
            if (T.is(data, this.struct())) {
                this.data = data;
            }
        } catch (error) {
            // invalid json, swallow
        }
    };

    save = () => {
        try {
            const str = stringify(this.data);
            storageProxy(this.storage).set('settings', str);
        } catch (error) {
            // invalid json, swallow
        }
    };

    set = <Key extends keyof T>(name: Key, value: T[Key]) => {
        this.data[name] = value;
        this.changeTime = Date.now();
    };

    remove = <Key extends keyof T>(name: Key) => {
        this.data[name] = undefined as T[Key];
        this.changeTime = Date.now();
    };

    get<Key extends keyof T>(name: Key): Required<T>[Key] | undefined;

    get<Key extends keyof T>(name: Key, alt: Required<T>[Key]): Required<T>[Key];

    get<Key extends keyof T>(name: Key, alt?: Required<T>[Key]): Required<T>[Key] | undefined {
        if (name in this.data) {
            return this.data[name];
        }

        return alt === undefined ? alt : undefined;
    }
}

export const storage = Object.assign(new Storage(() => T.LocalStorage(), {}, 'localStorage'), {
    session: new Storage(() => T.SessionStorage(), {}, 'sessionStorage'),
});
