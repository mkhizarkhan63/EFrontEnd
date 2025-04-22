import { action, runInAction } from 'mobx';
import { LazyModelList, E, lang, restQuery, LazyModelScroller, utils, ErrorListHolder, type Id, T } from '~/api';
import type { MenuButton } from '~/bits';
import type { ProjectReviewType, Project, ContractorForInviteType, ConsultantType } from '~/models';
import { stores } from '~/stores';
import { confirmPrompt } from '~/utils';

const PROGRESS_STATUS_ORDER = [
    E.ProjectStatus.reviewing,
    E.ProjectStatus.openBids,
    E.ProjectStatus.chooseContractor,
    E.ProjectStatus.readyToSign,
    E.ProjectStatus.liveInPm,
];

const struct = () => T.type({
    phone: T.mobile(),
    name: T.name(),
});

const getProgressStatus = (current: E.ProjectStatus | undefined, expect: E.ProjectStatus) => {
    if (typeof current === 'undefined') {
        return 'wait' as const;
    }

    if (current === expect) {
        return 'inProgress' as const;
    }

    if (current === E.ProjectStatus.archived) {
        return 'archived' as const;
    }

    if (current === E.ProjectStatus.rejected) {
        return 'rejected' as const;
    }

    const position = PROGRESS_STATUS_ORDER.indexOf(current);

    const expectPosition = PROGRESS_STATUS_ORDER.indexOf(expect);

    if (position > expectPosition) {
        return 'done' as const;
    }

    return 'wait' as const;
};
export class ProjectDetailsVm {
    projectReview?: ProjectReviewType;

    isLoading = false;

    isInviteCompanyModalOpened = false;

    email = '';

    phone = '';

    companyName = '';

    consultantsSelection = new LazyModelList(
        'Consultants',
        () => restQuery.getConsultantSelections(
            this.project.wilayatId?.asNumber(),
            this.project.id.asNumber(),
        ),
    );

    contractorsForInvite = new LazyModelScroller(
        'ContractorsForInvite',
        paging => restQuery.getContractorsForInvite(
            this.project.id.asNumber(),
            this.project.governorateId?.asNumber(),
            paging,
        ),
        12,
    );

    isStatusModalOpened = false;

    isInvitingContractor = false;

    isBidsOpened = false;

    isBidsPreviewed = false;

    currentTab = E.ProjectMenu.contractor;

    errorListHolder = new ErrorListHolder();

    validationHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(),
    );

    constructor(public project: Project) {
        makeSafeObservable(this, {
            goBack: false,
            goToContract: false,
            onInviteConsultant: false,
            onSelectContractor: false,
            submitCreateContract: false,
            updateBidClosingDate: false,
            openStatusModal: action,
            closeStatusModal: action,
            openBids: action,
            switchInvitingContractor: action,
            previewBids: action,
            openInviteCompanyModal: action,
            closeInviteCompanyModal: action,
            setEmail: action,
            setPhone: action,
            setCompanyName: action,
            inviteExternalCompany: action,
            goToProfile: action,
        });

        if (this.project.projectStatus === E.ProjectStatus.rejected) {
            this.loadReview();
        }

        if (stores.display.runBackFrom('inviteContractor')) {
            this.switchInvitingContractor();
        }
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

    get menuItems(): Array<MenuButton<E.ProjectMenu>> {
        return [
            {
                value: E.ProjectMenu.contractor,
                name: lang.dict.enum('projectMenu', E.ProjectMenu.contractor),
                onClick: () => this.goToTab(E.ProjectMenu.contractor),
            },
            {
                value: E.ProjectMenu.consultant,
                name: lang.dict.enum('projectMenu', E.ProjectMenu.consultant),
                onClick: () => this.goToTab(E.ProjectMenu.consultant),
            },
            {
                value: E.ProjectMenu.insurance,
                name: lang.dict.enum('projectMenu', E.ProjectMenu.insurance),
                onClick: () => this.goToTab(E.ProjectMenu.insurance),
            },
            // {
            //     value: E.ProjectMenu.bank,
            //     name: lang.dict.enum('projectMenu', E.ProjectMenu.bank),
            //     onClick: () => this.goToTab(E.ProjectMenu.bank),
            // },
        ];
    }

    get choosenContractor() {
        return this.project.bids.find(bid => bid.id.asNumber() === this.project.projectBidId?.asNumber())?.contractor;
    }

    get choosenConsultant() {
        return this.consultantsSelection.data.find(consultant => this.project.consultantId?.isEqual(consultant.externalId));
    }

    get status() {
        return [
            {
                status: getProgressStatus(this.project.projectStatus, E.ProjectStatus.reviewing),
                name: lang.dict.get('projectUnderReview'),
                description: lang.dict.get('fortyEightHours'),
            } as const,
            {
                status: getProgressStatus(this.project.projectStatus, E.ProjectStatus.openBids),
                icon: 'bidding',
                name: lang.dict.get('projectStatusContractorsBidding'),
                description: lang.dict.get('sevenDays'),
            } as const,
            {
                status: getProgressStatus(this.project.projectStatus, E.ProjectStatus.chooseContractor),
                name: lang.dict.get('projectStatusOpenContractorsBids'),
                description: lang.dict.get('projectStatusViewBids'),
            } as const,
            {
                status: getProgressStatus(this.project.projectStatus, E.ProjectStatus.readyToSign),
                name: lang.dict.get('contract'),
                description: lang.dict.get('projectStatusContractReady'),
            } as const,
            {
                status: getProgressStatus(this.project.projectStatus, E.ProjectStatus.liveInPm),
                name: lang.dict.get('live'),
                description: lang.dict.get('projectStatusSignedLive'),
            } as const,
        ];
    }

    get companyLogos() {
        return this.project.bids
            .map(bid => bid.contractor.logo)
            .sort(() => 0.5 - Math.random());
    }

    get isChooseContractor() {
        return this.project.projectStatus === E.ProjectStatus.chooseContractor;
    }

    get isBidAndIsConsultant() {
        return Boolean(this.project.projectBidId && this.project.consultantId);
    }

    get contractDisabledText() {
        switch (false) {
            case Boolean(this.project.projectBidId):
                return lang.dict.get('contractDisabledNoContractor');
            case Boolean(this.project.consultantId):
                return lang.dict.get('contractDisabledNoConsultant');
            default:
                return '';
        }
    }

    goToTab = (tab: E.ProjectMenu) => {
        this.currentTab = tab;
    };

    getGovernorateName = (id: Id) => stores.locations.governorates.find(item => item.id.isEqual(id))?.displayName;

    isMenuItemActive = (page: E.ProjectMenu) => page === this.currentTab;

    isMenuItemChosen = (page: E.ProjectMenu) => {
        if (page === E.ProjectMenu.contractor) {
            return Boolean(this.project.projectBidId);
        }

        if (page === E.ProjectMenu.consultant) {
            return Boolean(this.project.consultantId);
        }

        return false;
    };

    goBack = () => {
        stores.display.router.$.home.go({});
    };

    goToContract = () => {
        stores.display.registerBackFrom('contract', () => stores.display.router.$.project.$.sub.$.details.go({
            id: this.project.id.asNumber(),
        }));

        stores.display.router.$.project.$.sub.$.contract.go({
            id: this.project.id.asNumber(),
        });
    };

    onInviteConsultant = async (consultant: ConsultantType) => {
        if (this.isLoading || !consultant.externalId) {
            return;
        }

        this.isLoading = true;

        const result = await restQuery.project
            .postInviteConsultantToProject(consultant.externalId, this.project.id, consultant.isInvited);

        if (!result) {
            this.goBack();
            this.isLoading = false;
            return;
        }

        if (consultant.isInvited) {
            consultant.setInvited(false);

            runInAction(() => {
                this.isLoading = false;
            });

            return;
        }

        consultant.setInvited(true);

        runInAction(() => {
            this.isLoading = false;
        });
    };

    onSelectContractor = (id: Id, isSelected: boolean) => {
        (async () => {
            if (this.isLoading) {
                return;
            }

            this.isLoading = true;

            const result = await restQuery.project.updateSelectBid(
                id,
                this.project.id,
                isSelected,
            );

            if (!result) {
                this.goBack();
                this.isLoading = false;
                return;
            }

            isSelected ? this.project.clearProjectBidId() : this.project.setProjectBidId(id);
            this.isLoading = false;
        })();
    };

    createContract = () => {
        if (this.isLoading || !this.isBidAndIsConsultant) {
            return;
        }

        if (!this.project.consultantId) {
            confirmPrompt(lang.dict.get('createContractWithoutInvitedConsultantPrompt'), this.submitCreateContract);
        } else {
            this.submitCreateContract();
        }
    };

    submitCreateContract = () => {
        (async () => {
            this.isLoading = true;

            const result = await restQuery.contract.post(this.project.id);

            if (!result) {
                this.isLoading = false;
                this.goBack();
                return;
            }

            stores.display.router.reload();
            this.isLoading = false;
        })();
    };

    updateBidClosingDate = (option: E.BidClosingDateOption) => {
        (async () => {
            await restQuery.project.updateProjectBidClosingDate(
                this.project.id.asNumber(),
                option,
            );
            stores.display.router.reload();
        })();
    };

    openStatusModal = () => {
        this.isStatusModalOpened = true;
    };

    goToProfile = (contractorId?: number) => {
        if (!contractorId) {
            return;
        }

        stores.display.registerBackFrom(
            'inviteContractor',
            () => console.log('ok'),
        );

        stores.display.router.$.context.$.details.go({
            type: E.RoleInCompany.contractor,
            id: contractorId,
        });
    };

    closeStatusModal = () => {
        this.isStatusModalOpened = false;
    };

    openBids = () => {
        this.isBidsOpened = true;
    };

    switchInvitingContractor = () => {
        this.isInvitingContractor = !this.isInvitingContractor;
    };

    loadReview = async () => {
        const reviews = await restQuery.project.getReview(this.project.id.asNumber());

        const review = reviews?.find(() => true);

        if (!review) {
            return;
        }

        runInAction(() => {
            this.projectReview = review;
        });
    };

    previewBids = () => {
        this.isBidsOpened = true;
        this.isBidsPreviewed = true;
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

            this.project.decraseInvitationCount(E.RoleInCompany.contractor);
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

    setCompanyName = (value: string) => {
        this.companyName = value;
    };

    setPhone = (value: string) => {
        this.phone = utils.fromInputPhone(value, this.phone);
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
            this.project.invitedConsultantList.reload();
        })();
    };
}
