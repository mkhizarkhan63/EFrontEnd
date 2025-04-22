import { Id, type Img } from '~/api';

export class ProjectBidContractor {
    id = Id.init();

    name = '';

    logo?: Img;

    ongoingProjects = 0;

    yearsOfExperience = 0;

    numberOfEngineers = 0;

    numberOfLabors = 0;

    phone = '';

    constructor() {
        makeSafeObservable(this);
    }
}
