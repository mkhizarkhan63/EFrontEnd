
import { stores } from '~/stores';

export class ListedProjectsVm {


    constructor() {
        makeSafeObservable(this, {
            createProject: false,
        })
    }

    createProject = () => {
        stores.display.router.$.admin.$.listedprojects
            .$.buyprojects.go({ adminView: true });
    };

    get ProjectLists() {
        return stores.projects.listedProjects;
    }

    // get ListedProjectSorter() {
    //     return stores.listedProjects.adminListedProjects.paging.modifySorter;
    // }
}


