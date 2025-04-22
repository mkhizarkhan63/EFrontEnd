import { makeAutoObservable } from 'mobx';
import { Id, lang } from '~/api';
import { stores } from '~/stores';

export class Governorate {
    id = Id.init();

    abbreviation = '';

    altDisplayName = '';

    translationKey = '';

    constructor() {
        makeAutoObservable(this);
    }

    get wilayats() {
        return stores.locations.wilayats
            .filter(item => item.governorateId.isEqual(this.id));
    }

    get displayName() {
        const translated = lang.dict.get(['backend', this.translationKey]);

        if (!translated || !this.translationKey) {
            return this.altDisplayName;
        }

        return translated;
    }
}
