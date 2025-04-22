import { observer } from 'mobx-react';
import { E } from '~/api';
import { Loading } from '~/bits';
import { CreateProjectClient } from '~/partials';
import { hook } from '~/utils';
import { ProjectDetails } from '.';
import { ProjectVm } from './Project.vm';
import { ProjectDesign } from './ProjectDesign';

type Props = {
    route: E.ProjectRoute;
};

export const Project = observer((props: Props) => {
    const vm = hook.useVm(() => new ProjectVm(props.route), [props.route]);

    if (vm.isLoading) {
        return <Loading isEnabled={true} />;
    }

    if (vm.route === E.ProjectRoute.new) {
        return <CreateProjectClient />;
    }

    if (vm.route === E.ProjectRoute.exists) {
        if (
            vm.project?.startingStep === E.ProjectStartingStep.design
            && vm.project.designStatus !== E.DesignProjectStatus.completedDesign
        ) {
            return <ProjectDesign project={vm.project} />;
        }

        if (vm.isProjectDraft) {
            return <CreateProjectClient />;
        }

        if (typeof vm.project !== 'undefined') {
            return <ProjectDetails project={vm.project} />;
        }
    }

    return null;
});
