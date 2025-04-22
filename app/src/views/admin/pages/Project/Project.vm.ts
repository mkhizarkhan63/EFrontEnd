import { action, runInAction } from 'mobx';
import { E, type Id, LazyModelScroller, lang, restQuery, ErrorListHolder, utils, T } from '~/api';
import { stores } from '~/stores';
import { type ContractorForInviteType, Project } from '~/models';

const struct = () => T.type({
    phone: T.mobile(),
    name: T.name(),
});

export class ProjectVm {
    project = new Project();

    isLoading = true;

    isSaving = false;

    isInvitingContractor = false;

    isStatusModalOpened = false;

    isInviteCompanyModalOpened = false;

    email = '';

    phone = '';

    companyName = '';

    contractorsForInvite = new LazyModelScroller(
        'ContractorsForInvite',
        paging => restQuery.getContractorsForInvite(
            this.project.id.asNumber(),
            this.project.governorateId?.asNumber(),
            paging,
        ),
        12,
    );

    errorListHolder = new ErrorListHolder();

    validationHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(),
    );

    constructor() {
        makeSafeObservable(this, {
            load: action,
            goBack: false,
            switchInvitingContractor: action,
            openStatusModal: action,
            closeStatusModal: action,
            inviteInternalContractor: action,
            openInviteCompanyModal: action,
            closeInviteCompanyModal: action,
            setEmail: action,
            setPhone: action,
            setCompanyName: action,
            inviteExternalCompany: action,
            goToProfile: action,
        });

        const id = stores.display.router.$.admin.$.projects.$.sub.params.id;
        this.load(id);
    }

    get contractorsList() {
        return this.contractorsForInvite;
    }

    get validationData() {
        return {
            phone: this.phone,
            name: this.companyName,
        };
    }

    get companyLogos() {
        return this.project.bids
            .map(bid => bid.contractor.logo)
            .sort(() => 0.5 - Math.random());
    }

    get steps() {
        const projectStatuses = [
            E.ProjectStatus.draft,
            E.ProjectStatus.reviewing,
            E.ProjectStatus.openBids,
            E.ProjectStatus.chooseContractor,
            E.ProjectStatus.readyToSign,
            E.ProjectStatus.signed,
            E.ProjectStatus.liveInPm,
        ];

        const currentStatusNum = projectStatuses
            .findIndex(x => x === this.project.projectStatus);

        const getRelativeStatus = (status: E.ProjectStatus) => {
            const index = projectStatuses.findIndex(x => x === status);
            const statusNum = index !== -1 ? index : -2;

            if (statusNum === currentStatusNum) {
                return E.ProcessWizard.inProgress;
            }

            if (statusNum > currentStatusNum) {
                return E.ProcessWizard.wait;
            }

            return E.ProcessWizard.done;
        };

        return {
            steps: [
                {
                    status: getRelativeStatus(E.ProjectStatus.draft),
                    name: lang.dict.enum('projectStatus', E.ProjectStatus.draft),
                    date: this.project.forAdmin.projectDates.draft,
                },
                {
                    status: getRelativeStatus(E.ProjectStatus.reviewing),
                    name: lang.dict.enum('projectStatus', E.ProjectStatus.reviewing),
                    date: this.project.forAdmin.projectDates.review,
                },
                {
                    status: getRelativeStatus(E.ProjectStatus.openBids),
                    name: lang.dict.enum('projectStatus', E.ProjectStatus.openBids),
                    date: this.project.forAdmin.projectDates.biding,
                },
                {
                    status: getRelativeStatus(E.ProjectStatus.chooseContractor),
                    name: lang.dict.enum('projectStatus', E.ProjectStatus.chooseContractor),
                    date: this.project.forAdmin.projectDates.chooseContractor,
                },
                {
                    status: getRelativeStatus(E.ProjectStatus.readyToSign),
                    name: lang.dict.enum('projectStatus', E.ProjectStatus.readyToSign),
                    date: this.project.forAdmin.projectDates.readyToSign,
                },
                {
                    status: getRelativeStatus(E.ProjectStatus.signed),
                    name: lang.dict.enum('projectStatus', E.ProjectStatus.signed),
                    date: this.project.forAdmin.projectDates.signed,
                },
            ],
        };
    }

    get currentPage() {
        const r = stores.display.router.$.admin.$.projects.$.sub;

        if (r.$.details.match) {
            return E.AdminProjectsPages.details;
        }

        if (r.$.notesTasks.match) {
            return E.AdminProjectsPages.notes;
        }

        if (r.$.log.match) {
            return E.AdminProjectsPages.log;
        }

        if (r.$.bids.match) {
            return E.AdminProjectsPages.bids;
        }

        if (r.$.bidsQuestions.match) {
            return E.AdminProjectsPages.bidsQuestions;
        }

        if (r.$.contract.match) {
            return E.AdminProjectsPages.contract;
        }

        return false;
    }

    unmount = () => {
        stores.display.setConstructionType(true);
        stores.display.resetBackFrom('userManagementProfile');
        stores.display.resetBackFrom('companiesManagementProfile');
    };

    goBack = () => {
        if (stores.display.runBackFrom('userManagementProfile')) {
            return;
        }

        if (stores.display.runBackFrom('companiesManagementProfile')) {
            return;
        }

        stores.display.router.$.admin.$.projects.go({});
    };

    loadFileNames = () => {
        (async () => {
            const krookieIds = this.project.krookieFiles.map(item => item.fileId);
            const drawingIds = this.project.drawingsFiles.map(item => item.fileId);

            const previews = await restQuery.file.getPreviews(krookieIds.concat(drawingIds));

            if (!previews) {
                return;
            }

            this.project.krookieFiles.forEach(item => {
                const externalPreview = previews.find(preview => preview.fileId === item.fileId);
                item.setName(externalPreview?.fileName ?? '');
            });

            this.project.drawingsFiles.forEach(item => {
                const externalPreview = previews.find(preview => preview.fileId === item.fileId);
                item.setName(externalPreview?.fileName ?? '');
            });
        })();
    };

    load = (id: number) => {
        this.isLoading = true;

        stores.projects.adminProjectsConstruction.asyncGet(
            id,
            project => {
                if ('drawingsFiles' in project) {
                    this.project = project;
                    this.loadFileNames();
                    this.isLoading = false;
                }
            },
            this.goBack,
        );
    };

    switchInvitingContractor = () => {
        this.contractorsForInvite.reload();
        this.isInvitingContractor = !this.isInvitingContractor;
    };

    getGovernorateName = (id: Id) => stores.locations.governorates.find(item => item.id.isEqual(id))?.displayName;

    openStatusModal = () => {
        this.isStatusModalOpened = true;
    };

    closeStatusModal = () => {
        this.isStatusModalOpened = false;
    };

    inviteInternalContractor = (item: ContractorForInviteType) => {
        (async () => {
            runInAction(() => {
                this.isLoading = true;
            });

            const res = await restQuery.project.inviteInternalContractor(this.project.id, item.externalId);

            if (!res) {
                runInAction(() => {
                    this.isLoading = false;
                });

                return;
            }

            item.setInvited();

            runInAction(() => {
                this.isLoading = false;
            });
        })();
    };

    openInviteCompanyModal = () => {
        this.isInviteCompanyModalOpened = true;
    };

    closeInviteCompanyModal = () => {
        this.isInviteCompanyModalOpened = false;
        this.email = '';
        this.phone = '';
        this.companyName = '';
    };

    setEmail = (value: string) => {
        this.email = value;
    };

    setPhone = (value: string) => {
        this.phone = utils.fromInputPhone(value, this.phone);
    };

    setCompanyName = (value: string) => {
        this.companyName = value;
    };

    goToProfile = (contractorId?: number) => {
        if (!contractorId) {
            return;
        }

        stores.display.router.$.context.$.details.go({
            type: E.RoleInCompany.contractor,
            id: contractorId,
        });
    };

    inviteExternalCompany = (context: E.RoleInCompany) => {
        (async () => {
            if (this.isLoading || !this.validationHolder.test()) {
                return;
            }

            this.isLoading = true;

            const res = await restQuery.inviteOwnCompany(
                this.phone,
                this.companyName,
                this.project.id.asNumber(),
                context,
                this.email,
            );

            if (!res) {
                this.isLoading = false;
                return;
            }

            this.isLoading = false;

            if (!res.refferalValidation?.companyDoesNotExist) {
                runInAction(() => {
                    this.errorListHolder.add({
                        value: 'companyDoesNotExist',
                        key: 'companyDoesNotExist',
                        type: 'companyDoesNotExist',
                        refinement: undefined,
                        message: 'companyDoesNotExist',
                        branch: [''],
                        path: ['companyDoesNotExist'],
                    });
                });

                if (!res.isNotAlreadyInvited) {
                    runInAction(() => {
                        this.errorListHolder.add({
                            value: 'isNotAlreadyInvited',
                            key: 'isNotAlreadyInvited',
                            type: 'isNotAlreadyInvited',
                            refinement: undefined,
                            message: 'isNotAlreadyInvited',
                            branch: [''],
                            path: ['isNotAlreadyInvited'],
                        });
                    });
                }

                this.errorListHolder.clearListTimeout = setTimeout(() => {
                    this.errorListHolder.clear();
                    this.errorListHolder.clearListTimeout = undefined;
                }, 5000);

                return;
            }

            this.closeInviteCompanyModal();
            this.project.decraseInvitationCount(context);
        })();
    };
}
