import { observer } from 'mobx-react';
import { ProjectsGrid, MyProjectTile } from './Grid';
import { FirstProject } from './FirstProject';
import { stores } from '~/stores';
import { ClientNav, Page } from '~/partials';
import { E, Env, lang } from '~/api';
import { hook } from '~/utils';
import { MyProjectVm } from './MyProject.vm';
import { CriticalError, Loading } from '~/bits';
import { type Project } from '~/models';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
    invalidRoute?: boolean;
};

const goNewProject = () => {
    stores.display.router
        .$.project
        .$.create
        .go({});
};

const DataDisplay = observer(({ vm }: { vm: MyProjectVm }) => {
    const goProjectDetails = (project: Project) => () => {
        const currentRole = stores.profile.currentProfile.role;

        if (!Env.getBool('IS_PRODUCTION') && project.projectStatus === E.ProjectStatus.liveInPm) {
            if (currentRole === E.RoleInCompany.client) {
                return stores.display.router
                    .$.project
                    .$.sub
                    .$.management
                    .go({
                        id: project.id.asNumber(),
                        tab: E.PmModuleMenu.tasks,
                    });
            }

            return stores.display.router
                .$.context
                .$.project
                .$.management
                .go({
                    type: currentRole,
                    id: project.id.asNumber(),
                    tab: E.PmModuleMenu.tasks,
                });
        }

        if (project.projectStatus === E.ProjectStatus.signed) {
            return stores.display.router
                .$.project
                .$.sub
                .$.contract
                .go({ id: project.id.asNumber() });
        }

        stores.display.router
            .$.project
            .$.sub
            .$.details
            .go({ id: project.id.asNumber() });
    };

    const projectsTiles = vm.projects.data.map(project => (
        <MyProjectTile
            key={project.id.asStr()}
            project={project}
            onClick={goProjectDetails(project)}
        />
    ));

    return vm.projects.length > 0
        ? (
            <InfiniteScroll
                dataLength={vm.projects.length}
                next={vm.projects.loadNext}
                hasMore={!vm.projects.isLast}
                loader={<Loading isEnabled={true} />}
                scrollableTarget="scrolling-page"
            >
                <ProjectsGrid isLoading={false}>
                    {projectsTiles}
                </ProjectsGrid>
            </InfiniteScroll>
        )
        : <FirstProject goToCreator={goNewProject} />;
});

export const Client = observer((props: Props) => {
    const vm = hook.useVm(() => new MyProjectVm());

    if (stores.display.profile.redirectToInvitations) {
        stores.display.router.$.invitations.go({});
        stores.display.profile.disableRedirectToInvitations();
    }

    if (vm.isLoading) {
        return <Loading isEnabled={true} />;
    }

    const invalidRoute = props.invalidRoute ? <CriticalError message="invalidRoute" /> : null;

    return (
        <Page>
            <ClientNav />
            <div className="my-projects">
                <div className="top">
                    <div className="page-name">
                        {lang.dict.get('myProjectsPageTitle')}
                    </div>
                </div>
                <DataDisplay vm={vm} />
            </div>
            {invalidRoute}
        </Page>
    );
});
