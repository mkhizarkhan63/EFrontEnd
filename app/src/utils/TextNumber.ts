import { action } from 'mobx';
import { utilsString } from '~/utils';

export class TextNumber {
    raw = '';

    constructor(
        value?: number,
        private digits = 2,
    ) {
        makeSafeObservable(this, {
            setText: action,
            setNumber: action,
        });

        if (typeof value === 'number') {
            this.setNumber(value);
        }
    }

    setText = (number: string) => {
        number = number.trim();

        if (!/^\d*([,.]\d*)?$/gi.test(number)) {
            return;
        }

        this.raw = number
            .replace(/[,.]+/gi, '.')
            .replace(/^(\d+\.)(\d+)$/gi, (m0, m1, m2) => `${m1}${m2.slice(0, this.digits)}`);
    };

    setNumber = (text: number) => {
        this.setText(String(text));
    };

    get value() {
        return utilsString.toFloat(this.raw, this.digits);
    }

    get valueOrUndefined() {
        if (this.raw.trim().length === 0) {
            return undefined;
        }

        return this.value;
    }
}
