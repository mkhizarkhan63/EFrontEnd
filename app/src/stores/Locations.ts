import { LazyData, restQuery } from '~/api';

export class Locations {
    dicts = new LazyData(
        'Project dictionaries',
        restQuery.project.getProjectDictionaries,
        {
            governorates: [],
            wilayats: [],
        },
    ).lock();

    constructor() {
        makeSafeObservable(this);
    }

    get governorates() {
        return this.dicts.data.governorates;
    }

    get wilayats() {
        return this.dicts.data.wilayats;
    }
}
