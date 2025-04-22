import { E, type Id, Sorter } from '~/api';
import type { Project } from '~/models';
import { stores } from '~/stores';

export class ProjectsVm {
    sorter = new Sorter(
        () => this.projects(),
        by => ({
            projectNumber: by.string('projectNumber'),
            location: by.string('wilayatName'),
            builtUpArea: by.number('addedBuiltUpArea'),
            landType: by.string('landType'),
            floorLevels: by.string('floorLevels'),
            projectStatus: by.string('projectStatus'),
        }),
        'projectNumber',
    );

    constructor(readonly projects: () => Project[]) {
        makeSafeObservable(this, {
            goToProject: false,
        });
    }

    goToProject = (id: Id, startingStep: E.ProjectStartingStep) => {
        if (id.isType('internal')) {
            return;
        }

        const {
            users,
            companies,
            projects,
        } = stores.display.router.$.admin.$;

        const userId = users.$.sub.params.id;

        if (userId) {
            stores.display.registerBackFrom(
                'userManagementProfile',
                () => users.$.sub.$.projects.go({
                    id: userId,
                }),
            );
        }

        const { type, companyId, menu } = companies.$.sub.params;

        if (type) {
            stores.display.registerBackFrom(
                'companiesManagementProfile',
                () => companies.$.sub.go({
                    type,
                    companyId,
                    menu,
                }),
            );
        }

        if (startingStep === E.ProjectStartingStep.build) {
            projects.$.sub.$.details.go({
                id: id.asNumber(),
            });

            return;
        }

        projects.$.sub.$.design.$.designDetails.go({
            id: id.asNumber(),
        });
    };
}
