import { action, toJS } from 'mobx';
import { T } from '~/api';

const struct = T.object({
    type: T.defaulted(T.literal('checklist'), 'checklist'),
    options: T.defaulted(T.array(T.object({
        en: T.string(),
        ar: T.string(),
    })), [
        {
            en: '',
            ar: '',
        },
    ]),
});

export class Checklist {
    options: Array<{
        en: string;
        ar: string;
    }> = [{ en: '', ar: '' }];

    static struct = struct;

    constructor() {
        makeSafeObservable(this, {
            set: action,
            remove: action,
        });
    }

    set = (index: number, key: 'ar' | 'en', value: string) => {
        this.options.forEach((item, i) => {
            if (i === index) {
                item[key] = value;
            }
        });
    };

    remove = (index: number) => {
        this.options = this.options.filter((x, i) => i !== index);
    };

    add = () => {
        this.options.push({
            en: '',
            ar: '',
        });
    };

    strignify = () => JSON.stringify({
        type: 'checklist',
        options: toJS(this.options),
    });

    static init = (raw: string) => {
        const x = new Checklist();
        const obj = JSON.parse(raw);
        const data = T.create(obj, struct);
        x.options = data.options;
        return x;
    };
}
