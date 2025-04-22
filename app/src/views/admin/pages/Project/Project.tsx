import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Loading, Switch } from '~/bits';
import { PageWithWizard } from '~/partials';
import { hook } from '~/utils';
import { Menu } from './Menu';
import { ProjectVm } from './Project.vm';
import * as ProjectSteps from './ProjectSteps';
import { stores } from '~/stores';
import { InviteContractor } from '~/views/Project/ProjectDetails/ProjectStepBiding';

type Props = {
    vm: ProjectVm;
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
        case E.AdminProjectsPages.details:
            return projectAdmin.project.projectStatus === E.ProjectStatus.draft
                ? () => <ProjectSteps.DraftDetails projectAdmin={projectAdmin} />
                : () => <ProjectSteps.EditDetails projectVm={vm} />;
        case E.AdminProjectsPages.notes:
            return () => <ProjectSteps.NotesTasks projectAdmin={projectAdmin} />;
        case E.AdminProjectsPages.log:
            return () => <ProjectSteps.Log projectAdmin={projectAdmin} />;
        case E.AdminProjectsPages.bids:
            return () => <ProjectSteps.ContractorBids projectAdmin={projectAdmin} onInvite={vm.switchInvitingContractor} />;
        case E.AdminProjectsPages.bidsQuestions:
            return () => <ProjectSteps.BidQuestions id={projectAdmin.project.id.asNumber()} />;
        case E.AdminProjectsPages.contract:
            return () => <ProjectSteps.Contract />;
        default:
            return null;
    }
};

export const Project = observer(() => {
    const vm = hook.useVm(() => new ProjectVm());

    if (
        stores.display.router
            .$.admin
            .$.projects
            .$.sub
            .$.details
            .$.stageList.match
    ) {
        return <ProjectSteps.EditStage />;
    }

    if (vm.isLoading) {
        return <Loading isEnabled={true} />;
    }

    const Component = createViewMap({ vm });

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
            <p className="left__sub-name" data-status={vm.project?.projectStatus}>
                {lang.dict.enum('projectStatus', vm.project?.projectStatus)}
            </p>),
    };

    return (
        <div className="project-management project-management--construction">
            <Switch
                state={!vm.isInvitingContractor}
                alt={() => <InviteContractor vm={vm} />}
            >
                <PageWithWizard
                    stepWizard={vm.steps}
                    subheader={subheader}
                    subheaderContent={<SubheaderContent vm={vm} />}
                >
                    <Menu
                        status={vm.project.projectStatus ?? E.ProjectStatus.none}
                        active={vm.currentPage}
                        id={vm.project.id.asNumber()}
                    />
                    <div
                        className="project-management__container"
                        data-variant={vm.currentPage}
                    >
                        <Component />
                    </div>
                </PageWithWizard>
            </Switch>
        </div>
    );
});

