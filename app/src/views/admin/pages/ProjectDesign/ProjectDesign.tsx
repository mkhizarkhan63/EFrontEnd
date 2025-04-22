import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Loading } from '~/bits';
import { PageWithWizard } from '~/partials';
import { hook } from '~/utils';
import { Menu } from './Menu';
import { ProjectDesignVm } from './ProjectDesign.vm';
import * as ProjectSteps from './ProjectSteps';

type Props = {
    vm: ProjectDesignVm;
};

const SubheaderContent = observer(({ vm }: Props) => {
    if (!vm.project) {
        return null;
    }

    return (
        <>
            <div className="subheader-item">
                <div className="subheader-item__title">
                    {lang.dict.get('clientName')}
                </div>
                <div className="subheader-item__text">
                    {vm.project.client?.name}
                </div>
            </div>
            <div className="subheader-item">
                <div className="subheader-item__title">
                    {lang.dict.get('emailId')}
                </div>
                <a
                    href={`mailto:${vm.project.client?.email}`}
                    className="subheader-item__text"
                >
                    {vm.project.client?.email}
                </a>
            </div>
            <div className="subheader-item subheader-item--contact">
                <div className="subheader-item__title">
                    {lang.dict.get('contactNo')}
                </div>
                <a
                    href={`tel:${vm.project.client?.phone}`}
                    className="subheader-item__text"
                >
                    {vm.project.client?.phone}
                </a>
            </div>
            <Button
                color="transparent"
                centerImg="three-dots-vertical"
            />
        </>
    );
});

const createViewMap = ({ vm }: Props) => {
    const projectAdmin = vm.project.forAdmin;

    switch (vm.currentPage) {
        case E.AdminProjectsDesignPages.details:
            return projectAdmin.project.designStatus === E.DesignProjectStatus.noneDesign
                ? () => <ProjectSteps.DraftDetails projectAdmin={projectAdmin} />
                : () => <ProjectSteps.EditDetails projectVm={vm} />;
        case E.AdminProjectsDesignPages.notes:
            return () => <ProjectSteps.NotesTasks projectAdmin={projectAdmin} />;
        case E.AdminProjectsDesignPages.log:
            return () => <ProjectSteps.Log projectAdmin={projectAdmin} />;
        case E.AdminProjectsDesignPages.documents:
            return () => <ProjectSteps.Documents project={vm.project} />
            ;
        default:
            return null;
    }
};

export const ProjectDesign = observer(() => {
    const vm = hook.useVm(() => new ProjectDesignVm());

    if (vm.isLoading) {
        return <Loading isEnabled={true} />;
    }

    const Component = createViewMap({ vm: vm });

    if (!vm.currentPage || Component === null) {
        setTimeout(() => {
            vm.goBack();
        });
        return <Loading isEnabled={true} />;
    }

    const subheader = {
        hasReturnButton: true,
        returnButton: vm.goBack,
        pageName: vm.project?.projectNumber,
        pageSubName: (
            <p className="left__sub-name" data-status={vm.project?.designStatus}>
                {lang.dict.enum('projectStatusDesign', vm.project?.designStatus)}
            </p>),
    };

    return (
        <div className="project-management">
            <PageWithWizard
                stepWizard={vm.steps}
                subheader={subheader}
                subheaderContent={<SubheaderContent vm={vm} />}
            >
                <Menu
                    status={vm.project.designStatus}
                    active={vm.currentPage}
                    id={vm.project.id.asNumber()}
                />
                <div className="project-management__container">
                    <Component />
                </div>
            </PageWithWizard>
        </div>
    );
});

