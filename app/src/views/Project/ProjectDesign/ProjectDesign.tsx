import { observer } from 'mobx-react';
import { E } from '~/api';
import type { Project } from '~/models';
import { PageWithWizard } from '~/partials';
import { hook } from '~/utils';
import { ProjectDesignVm } from './ProjectDesign.vm';
import * as ProjectDesignSteps from './ProjectDesignSteps';
import { StartDesign } from './StartDesign';

type Props = {
    project: Project;
};

type ViewMapProps = {
    vm: ProjectDesignVm;
};

const createViewMap = ({ vm }: ViewMapProps) => {
    switch (vm.project.designStatus) {
        case E.DesignProjectStatus.rejectedDesign:
            return () => <ProjectDesignSteps.Rejected vm={vm} />;
        case E.DesignProjectStatus.consultantReviewDesign:
        case E.DesignProjectStatus.adminReviewDesign:
            return () => <ProjectDesignSteps.Review vm={vm} />;
        case E.DesignProjectStatus.advancePaymentDesign:
            return () => <ProjectDesignSteps.Approved vm={vm} />;
        case E.DesignProjectStatus.uploadDrawingsDesign:
            return () => <ProjectDesignSteps.Drawings vm={vm} />;
        case E.DesignProjectStatus.finalPaymentDesign:
            return () => <ProjectDesignSteps.Final vm={vm} />;
        default:
            return () => null;
    }
};

export const ProjectDesign = observer((props: Props) => {
    if (!props.project.designId) {
        return <StartDesign project={props.project} />;
    }

    const vm = hook.useVm(() => new ProjectDesignVm(props.project));

    const subheader = {
        hasReturnButton: true,
        returnButton: vm.goBack,
        pageName: vm.project?.projectNumber,
    };

    const Component = createViewMap({ vm });

    if (Component === null) {
        vm.goBack();
        return null;
    }

    return (
        <div className="design-flow">
            <PageWithWizard
                subheader={subheader}
                stepWizard={vm.steps}
                subheaderContent={null}
            >
                <div className="design-flow__container">
                    <Component />
                </div>
            </PageWithWizard>
        </div>
    );
});
