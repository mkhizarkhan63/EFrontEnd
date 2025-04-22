import { LazyData, restQuery } from '~/api';

export class Stats {
    stats = new LazyData(
        'Stats',
        restQuery.getEbinaaStats,
        {
            totalProjects: 0,
            projectsConstruction: 0,
            projectsDesign: 0,
            contractorCount: 0,
            consultantCount: 0,
            totalValueOfProject: 0,
        },
    ).lock();

    constructor() {
        makeSafeObservable(this);
    }

    get data() {
        return this.stats.data;
    }
}
