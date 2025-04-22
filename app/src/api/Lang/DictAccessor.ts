import { createAtom } from 'mobx';
import type { Dict } from './Dict';
import {
    type Enums,
    enums,
} from './enums';
import { type Lang } from '..';

const fixKey = (key: string) => key
    .replace(/[:_]([\da-z])/gi, (m0, m1) => m1.toUpperCase());

type Accessor<A extends string, B extends string> = `${A}/${B}` extends keyof Dict
    ? [prefix: A, key: B]
    : never;

type PrefixAccessor<A extends string> = `${A}/${string}` extends keyof Dict
    ? [prefix: A, key: string]
    : never;

export class DictAccessor {
    private atom = createAtom('DictAccessor');

    dict: Record<string, string> = {};

    constructor(
        private lang: string,
        private parent: Lang,
    ) {}

    get isFetching() {
        return this.parent.langs.find(x => x.code === this.lang)?.isFetching === true;
    }

    set(values: Record<string, string>) {
        this.dict = { ...values };
        this.atom.reportChanged();
    }

    tryGet<Prefix extends string, Key extends string>(key: Accessor<Prefix, Key>): string;

    tryGet<Prefix extends string>(key: PrefixAccessor<Prefix>): string;

    tryGet(key: [prefix: string, key: string]): string;

    tryGet(key: keyof Dict): string;

    tryGet(key: string): string;

    tryGet(key: string | [string, string]) {
        this.atom.reportObserved();

        if (Array.isArray(key)) {
            key = key.join('/');
        }

        const fxKey = fixKey(key);

        if (!(fxKey in this.dict)) {
            return '';
        }

        return this.dict[fxKey];
    }

    get<Prefix extends string, Key extends string>(key: Accessor<Prefix, Key>): string;

    get<Prefix extends string>(key: PrefixAccessor<Prefix>, replacements: unknown[]): string;

    get(key: [prefix: string, key: string], alt: string): string;

    get(key: [prefix: string, key: string]): string;

    get(key: keyof Dict): string;

    get(key: string): string;

    get(key: string | [string, string], alt?: string | unknown[]) {
        this.atom.reportObserved();

        if (Array.isArray(key)) {
            key = key.join('/');
        }

        const fxKey = fixKey(key);

        if (!(fxKey in this.dict)) {
            if (typeof alt === 'string') {
                return alt;
            }

            if (this.isFetching) {
                return '';
            }

            if (this.parent.fallbackDict === this) {
                return '%badName%';
            }

            return this.parent.fallbackDict.get(fxKey);
        }

        return this.dict[fxKey];
    }

    format<Prefix extends string, Key extends string>(key: Accessor<Prefix, Key>, replacements: unknown[]): string;

    format<Prefix extends string>(key: PrefixAccessor<Prefix>, replacements: unknown[]): string;

    format(key: [prefix: string, key: string], replacements: unknown[]): string;

    format(key: keyof Dict, replacements: unknown[]): string;

    format(key: string, replacements: unknown[]): string;

    format(key: string | [string, string], replacements: unknown[]) {
        if (Array.isArray(key)) {
            key = key.join('/');
        }

        const text = this.get(key);

        return replacements
            .map(val => String(val))
            .reduce((res, textPart, i) => res.replace(`{${i}}`, textPart), text);
    }

    enum<C extends keyof Enums, K extends keyof Enums[C]>(ctx: C, key?: K) {
        if (!key) {
            return '';
        }

        return this.get(enums[ctx][key] as unknown as string);
    }
}
