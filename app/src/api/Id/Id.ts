import { action } from 'mobx';
import { utilsString } from '~/utils';

type Type = (
    | 'internal'
    | 'external'
);

let lastId = 1;

export class Id {
    constructor(
        private id: number,
        private type: Type,
    ) {
        makeSafeObservable(this, {
            set: action,
            isEqual: false,
            isType: false,
            asStr: false,
            replaceWith: action,
        });
    }

    set = (id: number, type?: Type) => {
        this.id = id;

        if (type) {
            this.type = type;
        }
    };

    replaceWith = (id: Id) => {
        this.id = id.asNumber();
        this.type = id.getType();
    };

    isEqual = (id?: Id | string | number | null) => {
        if (typeof id === 'undefined' || id === null) {
            return false;
        }

        if (typeof id === 'string') {
            const [rawId, type] = id.split('-');

            return utilsString.toNumber(rawId) === this.id && this.type === type;
        }

        if (typeof id === 'number') {
            return this.id === id;
        }

        return this.asNumber() === id.asNumber() && this.getType() === id.getType();
    };

    isNone = () => this.id === 0 && this.type === 'internal';

    isType = (type: Type) => this.type === type;

    asStr = () => [this.id, this.type].join('-');

    asNumber = () => this.id;

    getType = () => this.type;

    clone = () => Id.init(this.id, this.type);

    clear = () => {
        this.id = 0;
        this.type = 'internal';
    };

    static init = (id?: number, type: Type = 'internal') => {
        if (typeof id === 'undefined') {
            lastId += 1;
            id = lastId;
        }

        return new Id(id, type);
    };

    static extractRawId = (id: Id) => id.id;

    static tryInit = (id?: number, type: Type = 'internal') => {
        if (typeof id === 'undefined' || id === null || id === 0) {
            return;
        }

        return new Id(id, type);
    };

    static none = () => this.init(0, 'internal');

    static asStr = (id: unknown) => {
        if (id instanceof Id) {
            return id.asStr();
        }

        return String(id);
    };

    static isEqual = (id1: unknown, id2: unknown) => {
        if (id1 instanceof Id && id2 instanceof Id) {
            return id1.isEqual(id2);
        }

        return id1 === id2;
    };
}
