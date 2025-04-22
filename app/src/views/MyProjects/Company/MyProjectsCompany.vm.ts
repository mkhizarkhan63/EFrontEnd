import { action, reaction, runInAction } from 'mobx';
import { E, lang, restQuery, type LazyDataScroller, Env } from '~/api';
import { type Project } from '~/models';
import { stores } from '~/stores';
import { isEnum, utilsDate } from '~/utils';

export class MyProjectsCompanyVm {
    isLoading = false;

    isFiltersModalOpened = false;

    isFiltersActive = false;

    profileType?: E.ProfileType;

    projectList?: LazyDataScroller<Project>;

    statistics = {
        openBidsCount: 0,
        chooseContractorCount: 0,
        bidSelectedCount: 0,
        readyToSignCount: 0,
        signedCount: 0,
        liveInPmCount: 0,
        archivedCount: 0,
        allCount: 0,
    };

    constructor(roleInCompany: E.RoleInCompany, readonly isNewProjects = false) {
        makeSafeObservable(this, {
            setProjectStatusFilter: action,
            openFiltersModal: action,
            setFilters: action,
            closeFiltersModal: action,
            clearFilters: action,
            assignNewProjects: action,
            goToBid: false,
            onEntry: false,
            getTitle: false,
            isActive: false,
            onNewEntry: false,
            onNewReject: false,
            getCountdown: false,
            getEntryText: false,
            getBackground: false,
            getIsInvitation: false,
            unmount: false,
        });

        if (isEnum(E.ProfileType)(roleInCompany)) {
            this.load(roleInCompany);
        }

        this.disposeStatusFilter = reaction(
            () => [this.projectStatusFilter],
            () => {
                this.projectList?.reload();
            },
        );

        this.disposeFilters = reaction(
            () => [this.filtersChanged],
            () => {
                this.projectList?.reload();
            },
        );
    }

    get projects() {
        if (!this.projectList) {
            return [];
        }

        if (this.profileType === E.ProfileType.consultant) {
            this.projectList.data.filter(project => !project.isDesignStartingStep || project.approverId
                ?.isEqual(stores.profile.currentProfile.id));
        }

        return this.projectList.data;
    }

    get projectStatusFilter() {
        return stores.projects.statusFilter;
    }

    get filters() {
        return stores.projects.filters;
    }

    get filtersChanged() {
        return stores.projects.filtersChanged;
    }

    get paging() {
        if (!this.projectList?.paging) {
            return false;
        }

        return this.projectList.paging;
    }

    get projectsAmount() {
        if (!this.paging) {
            return 0;
        }

        return this.paging.rowCount;
    }

    get filterCount() {
        return {
            all: this.statistics.allCount,
            [E.ProjectStatus.liveInPm]: this.statistics.liveInPmCount,
            [E.ProjectStatus.chooseContractor]: this.statistics.chooseContractorCount
                + this.statistics.bidSelectedCount
                + this.statistics.openBidsCount,
            [E.ProjectStatus.signed]: this.statistics.signedCount,
            [E.ProjectStatus.readyToSign]: this.statistics.readyToSignCount,
            [E.ProjectStatus.archived]: this.statistics.archivedCount,
        };
    }

    isActive = (projectStatus?: E.ProjectStatus) => this.projectStatusFilter === projectStatus;

    setProjectStatusFilter = (status: E.ProjectStatus) => {
        if (!this.paging) {
            return;
        }

        this.projectList?.resetPaging();

        stores.projects.setStatusFilter(status);
    };

    onEntry = (project: Project) => {
        if (!this.profileType) {
            return;
        }

        if (!Env.getBool('IS_PRODUCTION') && project.projectStatus === E.ProjectStatus.liveInPm) {
            stores.display.router
                .$.context
                .$.project
                .$.management
                .go({
                    type: stores.profile.currentProfile.role,
                    id: project.id.asNumber(),
                    tab: E.PmModuleMenu.tasks,
                });

            return;
        }

        // Consultant
        if (this.profileType === E.ProfileType.consultant) {
            stores.display.registerBackFrom(
                'contract',
                () => stores.display.router.$.home.go({}),
            );

            if (!project.contractId) {
                stores.display.router
                    .$.context
                    .$.project
                    .go({
                        type: E.RoleInCompany.consultant,
                        id: project.id.asNumber(),
                    });
                return;
            }

            stores.display.router
                .$.context
                .$.project
                .$.contract
                .go({
                    type: E.RoleInCompany.consultant,
                    id: project.id.asNumber(),
                });
            return;
        }

        // Contractor
        if (
            project.projectStatus === E.ProjectStatus.chooseContractor ||
            project.projectStatus === E.ProjectStatus.openBids ||
            project.projectStatus === E.ProjectStatus.readyToSign
        ) {
            stores.display.registerBackFrom(
                'bid',
                () => stores.display.router.$.home.go({}),
            );

            this.goToBid(project);
            return;
        }

        stores.display.registerBackFrom(
            'contract',
            () => stores.display.router.$.home.go({}),
        );

        stores.display.router
            .$.context
            .$.project
            .$.contract
            .go({
                type: E.RoleInCompany.contractor,
                id: project.id.asNumber(),
            });

    };

    onNewEntry = (project: Project) => {
        if (!this.profileType) {
            return;
        }

        // Contractor
        if (this.profileType === E.ProfileType.contractor) {
            stores.display.registerBackFrom(
                'bid',
                () => stores.display.router.$.newProjects.go({}),
            );

            this.goToBid(project);
            return;
        }

        // Consultant
        stores.display.registerBackFrom(
            'consultantProject',
            () => stores.display.router.$.newProjects.go({}),
        );

        stores.display.router
            .$.context
            .$.project
            .go({
                type: E.RoleInCompany.consultant,
                id: project.id.asNumber(),
            });
    };

    onNewReject = (project: Project) => {
        if (!this.getIsInvitation() || this.profileType !== E.ProfileType.consultant) {
            return;
        }

        // Consultant - design
        if (project.designStatus === E.DesignProjectStatus.consultantReviewDesign) {
            return () => {
                (async () => {
                    await restQuery.project.postReview({
                        isApproved: false,
                        constructionProjectId: project.id.asNumber(),
                        comment: '',
                    });
                    stores.display.router.reload();
                })();
            };
        }

        // Consultant - supervision
        return () => {
            (async () => {
                await restQuery.project.postRejectSupervisionInvitation(project.id);
                stores.display.router.reload();
            })();
        };
    };

    getEntryText = (project: Project) => {
        if (this.profileType === E.ProfileType.contractor) {
            // Contractor - new
            if (project.forContractor.bidStatus === E.BidStatus.none) {
                return lang.dict.get('startBid');
            }

            // Contractor - continue bid
            if (
                project.forContractor.bidStatus === E.BidStatus.continue ||
                project.forContractor.bidStatus === E.BidStatus.draft
            ) {
                return lang.dict.get('continueBid');
            }
        }

        // Consultant or Contractor - invited
        return lang.dict.get('viewProject');
    };

    getBackground = (project: Project): 'green' | 'orange' | undefined => {
        // Contractor
        if (this.profileType === E.ProfileType.contractor) {
            if (
                project.forContractor.bidStatus === E.BidStatus.continue ||
                project.forContractor.bidStatus === E.BidStatus.draft
            ) {
                return 'orange';
            }

            if (project.forContractor.invitationType === E.InvitationType.bid) {
                return 'green';
            }

            return;
        }

        // Consultant - design
        if (project.designStatus === E.DesignProjectStatus.consultantReviewDesign) {
            return 'orange';
        }

        // Consultant - supervision
        return 'green';
    };

    getTitle = (project: Project) => {
        if (this.profileType === E.ProfileType.consultant) {
            // Consultant - design
            if (project.designStatus === E.DesignProjectStatus.consultantReviewDesign) {
                return lang.dict.get('projectTileYourDesignSelected');
            }

            // Consultant - supervision
            return lang.dict.get('projectTileYouGotInvitedSupervision');
        }

        // Contractor - continue bid
        if (
            project.forContractor.bidStatus === E.BidStatus.continue ||
            project.forContractor.bidStatus === E.BidStatus.draft
        ) {
            return lang.dict.get('projectTileContinueBid');
        }

        if (project.forContractor.invitationType === E.InvitationType.bid) {
            return lang.dict.get('projectTileYouGotInvited');
        }
    };

    getIsInvitation = () => this.profileType === E.ProfileType.consultant;

    getCountdown = (project: Project) => {
        const time = utilsDate.timeLeft(project.bidClosingDate);

        if (!time.amount) {
            return undefined;
        }

        if (time.unit === 'day') {
            return lang.dict.format('projectCountdownDaysFormat', [time.amount + 1]);
        }

        return lang.dict.format('projectCountdownHoursFormat', [time.amount]);
    };

    openFiltersModal = () => {
        this.isFiltersModalOpened = true;
    };

    closeFiltersModal = () => {
        this.isFiltersModalOpened = false;
    };

    setFilters = (key: string, value: string | number) => {
        stores.projects.setFilters(key, value);
        this.isFiltersActive = true;
    };

    clearFilters = () => {
        stores.projects.clearFilters();
        this.isFiltersActive = false;
    };

    goToBid = (project: Project) => {
        (async () => {
            if (this.isLoading) {
                return;
            }

            if (project.forContractor.bidStatus !== E.BidStatus.none) {
                stores.display.router.$.context.$.project
                    .go({
                        type: E.RoleInCompany.contractor,
                        id: project.id.asNumber(),
                    });
                return;
            }

            this.isLoading = true;

            const id = await restQuery.project.postProjectBid(project);

            if (!id) {
                this.isLoading = false;
                stores.display.router.$.newProjects.go({});
                return;
            }

            this.isLoading = false;

            stores.display.router.$.context.$.project
                .go({
                    type: E.RoleInCompany.contractor,
                    id: project.id.asNumber(),
                });
        })();
    };

    getClosingDate = (project: Project) => {
        if (this.profileType === E.ProfileType.consultant) {
            return project.forConsultant.invitationDate ?? project.bidClosingDate;
        }

        return project.bidClosingDate;
    };

    load = (profileType: E.ProfileType) => {
        (async () => {
            this.isLoading = true;

            this.profileType = profileType;

            if (this.isNewProjects) {
                this.assignNewProjects();

                this.projectList?.reload();

                this.isLoading = false;
                return;
            }

            this.profileType === E.ProfileType.contractor
                ? this.projectList = stores
                    .projects
                    .contractorMyProjects
                : this.projectList = stores
                    .projects
                    .consultantMyProjects;

            this.projectList.reload();

            if (this.profileType === E.ProfileType.consultant) {
                this.projectList.reload();
            }

            const statistics = this.profileType === E.ProfileType.consultant
                ? await restQuery.project.getProjectsStatisticsForConsultant()
                : await restQuery.project.getProjectsStatisticsForContractor();

            this.isLoading = false;

            runInAction(() => {
                this.statistics = statistics;
            });
        })();
    };

    assignNewProjects = () => {
        if (stores.profile.currentProfile.selectedCompany?.status === E.CompaniesStatus.invited) {
            this.profileType === E.ProfileType.contractor
                ? this.projectList = stores
                    .projects
                    .contractorInvitedProjects
                : this.projectList = stores
                    .projects
                    .consultantInvitedProjects;

            return;
        }

        this.profileType === E.ProfileType.contractor
            ? this.projectList = stores
                .projects
                .contractorNewProjects
            : this.projectList = stores
                .projects
                .consultantNewProjects;
    };

    unmount = () => {
        this.disposeFilters();
        this.disposeStatusFilter();
    };

    disposeFilters = () => { /* empty */ };

    disposeStatusFilter = () => { /* empty */ };

    loadNext = () => {
        const loadFn = this.projectList?.loadNext;

        if (!loadFn) {
            return;
        }

        loadFn();
    };
}
