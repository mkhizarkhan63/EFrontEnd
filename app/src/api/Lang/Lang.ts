import { autorun, makeAutoObservable, runInAction } from 'mobx';
import Papa from 'papaparse';
import { debug, storage } from '..';
import type { Dict } from './Dict';
import { DictAccessor } from './DictAccessor';

enum DIR {
    ltr = 'ltr',
    rtl = 'rtl',
}

type LangItem = {
    isRtl: boolean;
    name: string;
    code: string;
    isDefault: boolean;
    isEnabled: boolean;
    isFetching: boolean;
    isFetched: boolean;
};

const LANGS: LangItem[] = [
    {
        name: 'ع',
        isRtl: true,
        code: 'ar',
        isDefault: false,
        isEnabled: true,
        isFetching: false,
        isFetched: false,
    },
    {
        name: 'EN',
        isRtl: false,
        code: 'en',
        isDefault: true,
        isEnabled: true,
        isFetching: false,
        isFetched: true,
    },
];

class Lang {
    currentLanguage = 'en';

    forcedLanguage: string | undefined = undefined;

    default = 'en';

    dicts: Record<string, DictAccessor> = {};

    langs = LANGS;

    constructor() {
        makeAutoObservable(this, {
            isPossible: false,
        });

        autorun(() => {
            document.body.dir = this.dir;
            document.documentElement.lang = this.current;
        });

        debug.registerPublicFunction('lang', 'getCurrentLangAsCsv', () => {
            const csv = Papa.unparse({
                fields: ['key', 'value'],
                data: Object.entries(this.dict.dict),
            });

            return csv;
        });
    }

    get dict() {
        const dict = this.getDictOf(this.current) ?? this.fallbackDict;

        if (!dict) {
            throw new Error('Dict not found');
        }

        return dict;
    }

    get current() {
        return this.forcedLanguage
            ? this.forcedLanguage
            : this.currentLanguage;
    }

    get dir() {
        return LANGS.find(x => x.code === this.current)?.isRtl
            ? DIR.rtl
            : DIR.ltr;
    }

    get currentLanguageName() {
        return LANGS.find(x => x.code === this.current)?.name ?? '';
    }

    get possibleLanguages() {
        return LANGS.map(x => x.name);
    }

    get fallbackDict() {
        const dict = this.getDictOf(this.default);

        if (!dict) {
            throw new Error('Fallback dict not found');
        }

        return dict;
    }

    setCurrentLanguageByName = (name: string) => {
        const lang = LANGS.find(x => x.name === name);

        if (!lang) {
            return;
        }

        this.set(lang.code, true);
        localStorage.setItem('language', lang.code);
    };

    load = async () => {
        const { dict: entries } = await import('./Dict');

        const dict = this.getDictOf(this.default);
        dict.set(entries);

        const storageLang = storage.get('language');

        if (storageLang && this.current !== storageLang && this.isPossible(storageLang)) {
            this.set(storageLang, false);
            return;
        }

        this.set(this.default, false);
    };

    getDictOf = (code: string) => {
        code = code.toLowerCase();

        if (!(code in this.dicts)) {
            runInAction(() => {
                const accessor = new DictAccessor(code, this);
                this.dicts[code] = accessor;
            });

            this.fetchLanguage(code);
        }

        return this.dicts[code];
    };

    fetchLanguage = async (code: string) => {
        const lang = LANGS.find(x => x.code === code);

        if (!lang || code === this.default) {
            return;
        }

        if (lang.isFetching || lang.isFetched) {
            return;
        }

        lang.isFetching = true;

        const response = await fetch(`/lang/${code}.json`);
        const dict = await response.json();

        this.getDictOf(code).set(dict);

        lang.isFetching = false;
        lang.isFetched = true;

        /**
        const langs = await restQuery.getLanguages();

        for (const [langCode, langDict] of Object.entries(langs)) {
            this.getDictOf(langCode).set(langDict);
        }
        */
    };

    extendDictionary = (lang: string, langCodes: Partial<Dict>) => {
        this.getDictOf(lang).set(langCodes);
    };

    set = (lang: string, save = true) => {
        lang = lang.toLowerCase();

        if (!this.isPossible(lang)) {
            return;
        }

        this.currentLanguage = lang;

        if (save) {
            storage.set('language', lang);
        }
    };

    setForced = (lang: string) => {
        this.forcedLanguage = lang;
    };

    removeForced = () => {
        this.forcedLanguage = undefined;
    };

    setDefault = (lang: string) => {
        this.default = lang.toLowerCase();
    };

    isPossible = (lang: string) => {
        lang = lang.toLowerCase();
        return LANGS.some(l => l.code === lang);
    };
}

export const lang = new Lang();
export type { Lang };
