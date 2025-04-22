import moment from 'moment';
import { Img } from '~/api';
import { stores } from '~/stores';

export class StatsAndNewsVm {
    stats = stores.stats;

    constructor() {
        makeSafeObservable(this);
    }

    // Temporary static news
    get advertisements() {
        return [
            {
                title: 'Prepare for a Home Remodeling Project',
                img: new Img('/assets/graphics/news-1.jpg'),
                id: 1,
                url: 'https://www.oman.om',
                date: moment(),
            },
            {
                title: 'Ultimate Guide for Kitchen Remodel',
                img: new Img('/assets/graphics/news-2.jpg'),
                id: 2,
                url: 'https://www.oman.om',
                date: moment(),
            },
            {
                title: 'Functional Home Office',
                img: new Img('/assets/graphics/news-3.jpg'),
                id: 3,
                url: 'https://www.oman.om',
                date: moment(),
            },
        ];
    }

    get totalValueOfProject() {
        return this.stats.data.totalValueOfProject.toLocaleString();
    }
}
