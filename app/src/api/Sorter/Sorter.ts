import { makeAutoObservable } from 'mobx';
import { type Moment, default as moment } from 'moment';
import type { Id } from '../Id';

type Dir = 'asc' | 'desc';

type TypeMatchingObj<T, V> = Pick<T, {
    [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T]>;

type SorterOfType<T, T1, O = TypeMatchingObj<T, T1 | undefined>> = <K extends keyof O>(key: K) => (a: Partial<Record<K, T1>>, b: Partial<Record<K, T1>>) => number;

type Sorters<T> = {
    id: SorterOfType<T, Id>;
    number: SorterOfType<T, number>;
    string: SorterOfType<T, string>;
    date: SorterOfType<T, Moment>;
};

const getSorter: <T>() => Sorters<T> = () => ({
    id: key => (a, b) => (a[key]?.asNumber() ?? 0) - (b[key]?.asNumber() ?? 0),
    number: key => (a, b) => (a[key] ?? 0) - (b[key] ?? 0),
    string: key => (a, b) => (a[key] ?? '').localeCompare(b[key] ?? ''),
    date: key => (a, b) => (
        moment(a[key], 'DD/MM/YYYY').isBefore(moment(b[key], 'DD/MM/YYYY')) ? -1 : 1
    ),
});

export class Sorter<T, Key extends string, K1 extends Key> {
    private cases;

    private defaultKey;

    key?: Key;

    constructor(
        private getValues: () => T[],
        getCases: (by: Sorters<T>) => Record<Key, (a: T, b: T) => number>,
        key?: K1,
        public dir: Dir = 'asc',
        public isLocked = () => false,
    ) {
        makeAutoObservable(this);

        this.cases = getCases(getSorter<T>());
        this.defaultKey = key;
        this.key = key;
    }

    sortBy = (key: Key, dir: Dir) => {
        if (this.isLocked()) {
            return;
        }

        this.key = key;
        this.dir = dir;
    };

    toggleSort = (key: Key | string) => {
        if (!this.isColumn(key)) {
            return;
        }

        if (this.key !== key) {
            this.sortBy(key, 'asc');
            return;
        }

        if (this.dir === 'asc') {
            this.sortBy(key, 'desc');
            return;
        }

        if (!this.defaultKey) {
            this.sortBy(key, 'asc');
            return;
        }

        this.sortBy(this.defaultKey, 'asc');
    };

    isColumn = (value: string): value is Key => (this.columns as string[]).includes(value);

    isSelected = (value: string | Key) => {
        if (!this.isColumn(value)) {
            return false;
        }

        return this.key === value;
    };

    isDir = (dir: Dir) => this.dir === dir;

    get values() {
        if (!this.key) {
            return Array.from(this.getValues());
        }

        const key = this.key;
        const dir = this.dir === 'asc' ? 1 : -1;
        return Array.from(this.getValues()).sort((a, b) => this.cases[key](a, b) * dir);
    }

    get columns() {
        return Object.keys(this.cases) as unknown as Key[];
    }
}
