import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If, CriticalError, NewProjectTile, ProjectTile, Loading } from '~/bits';
import { PageWithThinSidebar, StatsAndNews } from '~/partials';
import { stores } from '~/stores';
import { hook } from '~/utils';
import { FiltersModal } from './Components/FiltersModal';
import { StatusFilter } from './Components/StatusFilter';
import { MyProjectsCompanyVm } from './MyProjectsCompany.vm';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
    invalidRoute?: boolean;
    profileType: E.RoleInCompany;
    isNewProjects?: boolean;
};

export const Company = observer((props: Props) => {
    const vm = hook.useVm(
        () => new MyProjectsCompanyVm(props.profileType, props.isNewProjects),
        [
            props.profileType,
            props.isNewProjects,
            stores.profile.currentProfile.selectedCompany,
        ],
    );

    const pageTitle = props.isNewProjects
        ? 'newProjects'
        : 'myProjectsPageTitle';

    const projects = props.isNewProjects
        ? vm.projects.map(project => (
            <NewProjectTile
                key={`new-tile-${project.id.asStr()}`}
                project={project}
                title={vm.getTitle(project)}
                entryText={vm.getEntryText(project)}
                background={vm.getBackground(project)}
                onEntry={() => vm.onNewEntry(project)}
                onReject={vm.onNewReject(project)}
                isInvitation={vm.getIsInvitation()}
                countdown={vm.getCountdown(project)}
                closingDate={vm.getClosingDate(project)}
            />
        ))
        : vm.projects.map(project => (
            <ProjectTile
                key={`tile-${project.id.asStr()}`}
                project={project}
                profileType={vm.profileType}
                onClick={() => vm.onEntry(project)}
            />
        ));

    return (
        <div className="my-projects-company">
            <PageWithThinSidebar sidebar={() => <StatsAndNews />}>
                <div className="my-projects-company__container">
                    <div className="my-projects-company__main">
                        <div className="my-projects-company__header">
                            <h2 className="my-projects-company__title">
                                {lang.dict.get(pageTitle)}
                                &nbsp;
                                <p>
                                    {props.isNewProjects ? `(${vm.projectsAmount})` : ''}
                                </p>
                            </h2>
                            <If condition={() => vm.profileType === E.ProfileType.consultant}>
                                <div className="my-projects-company__btns">
                                    <div className="filter" data-is-filter={vm.isFiltersActive}>
                                        <Button
                                            color="transparent"
                                            centerImg="filter"
                                            onClick={vm.openFiltersModal}
                                        />
                                    </div>
                                </div>
                            </If>
                        </div>
                        <If condition={() => !props.isNewProjects && vm.profileType === E.ProfileType.contractor}>
                            <StatusFilter vm={vm} />
                        </If>
                        <InfiniteScroll
                            dataLength={vm.projects.length}
                            next={vm.loadNext}
                            hasMore={!vm.projectList?.isLast}
                            loader={<Loading isEnabled={true} />}
                            scrollableTarget="scrolling-page"
                        >
                            <div className="my-projects-company__grid">
                                {projects}
                            </div>
                        </InfiniteScroll>
                    </div>
                    <If condition={Boolean(props.invalidRoute)}>
                        <CriticalError message="invalidRoute" />
                    </If>
                </div>
                <If condition={() => vm.isFiltersModalOpened} >
                    <FiltersModal
                        closeModal={vm.closeFiltersModal}
                        clearFilters={vm.clearFilters}
                        filters={vm.filters}
                        setFilter={vm.setFilters}
                    />
                </If>
            </PageWithThinSidebar>
        </div>
    );
});
