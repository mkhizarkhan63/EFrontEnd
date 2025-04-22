import { makeAutoObservable } from 'mobx';
import { Id, lang } from '~/api';

export class Wilayat {
    id = Id.init();

    governorateId = Id.init();

    altDisplayName = '';

    translationKey = '';

    constructor() {
        makeAutoObservable(this);
    }

    get displayName() {
        const translated = lang.dict.get(['backend', this.translationKey]);

        if (!translated || !this.translationKey) {
            return this.altDisplayName;
        }

        return translated;
    }
}
