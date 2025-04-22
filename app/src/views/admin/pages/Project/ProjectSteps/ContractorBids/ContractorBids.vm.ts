import { action, runInAction } from 'mobx';
import { lang, restQuery, LazyModelList, type Id, E, ErrorListHolder, utils, T } from '~/api';
import type { MenuButton } from '~/bits';
import type { ConsultantType, ProjectAdmin } from '~/models';
import { stores } from '~/stores';

const struct = () => T.type({
    phone: T.mobile(),
    name: T.name(),
});

export class ContractorBidsVm {
    isSaving = false;

    email = '';

    phone = '';

    companyName = '';

    isInviteCompanyModalOpened = false;

    currentTab = E.ProjectMenu.contractor;

    errorListHolder = new ErrorListHolder();

    consultantsSelection = new LazyModelList(
        'Consultants',
        () => restQuery.getConsultantSelections(
            this.projectAdmin.project.wilayatId?.asNumber(),
            this.projectAdmin.project.id.asNumber(),
        ),
    );

    validationHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(),
    );

    constructor(readonly projectAdmin: ProjectAdmin) {
        makeSafeObservable(this, {
            createContract: false,
            onSelectContractor: false,
            setCompanyName: action,
            setEmail: action,
            setPhone: action,
        });
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
            {
                value: E.ProjectMenu.bank,
                name: lang.dict.enum('projectMenu', E.ProjectMenu.bank),
                onClick: () => this.goToTab(E.ProjectMenu.bank),
            },
        ];
    }

    get bids() {
        return this.projectAdmin.project.bids;
    }

    get isContractCreated() {
        return this.projectAdmin.project.contractId;
    }

    get materialCardFeatures() {
        return [
            lang.dict.get('reviewingCardMaterialFeature1'),
            lang.dict.get('reviewingCardMaterialFeature2'),
            lang.dict.get('reviewingCardMaterialFeature3'),
            lang.dict.get('reviewingCardMaterialFeature4'),
        ];
    }

    get isBidAndIsConsultant() {
        return Boolean(
            this.projectAdmin.project.projectBidId
            && this.projectAdmin.project.consultantId
            && !this.isContractCreated,
        );
    }

    get loanCardFeatures() {
        return [
            lang.dict.get('reviewingCardLoanFeature1'),
            lang.dict.get('reviewingCardLoanFeature2'),
            lang.dict.get('reviewingCardLoanFeature3'),
        ];
    }

    goToTab = (tab: E.ProjectMenu) => {
        this.currentTab = tab;
    };

    isMenuItemActive = (page: E.ProjectMenu) => page === this.currentTab;

    createContract = () => {
        (async () => {
            if (this.isSaving) {
                return;
            }

            this.isSaving = true;

            const result = await restQuery.contract.post(this.projectAdmin.project.id);

            if (!result) {
                this.isSaving = false;
                return;
            }

            this.isSaving = false;
            stores.display.router.reload();
        })();
    };

    onSelectContractor = (id: Id, isSelected: boolean) => {
        (async () => {
            if (this.isSaving) {
                return;
            }

            this.isSaving = true;

            const result = await restQuery.project.updateSelectBid(
                id,
                this.projectAdmin.project.id,
                isSelected,
            );

            if (!result) {
                this.isSaving = false;
                return;
            }

            isSelected ? this.projectAdmin.project.clearProjectBidId() : this.projectAdmin.project.setProjectBidId(id);
            this.isSaving = false;
        })();
    };

    onInviteConsultant = async (consultant: ConsultantType) => {
        if (this.isSaving || !consultant.externalId) {
            return;
        }

        this.isSaving = true;

        const result = await restQuery.project
            .postInviteConsultantToProject(consultant.externalId, this.projectAdmin.project.id, consultant.isInvited);

        if (!result) {
            this.isSaving = false;
            return;
        }

        if (consultant.isInvited) {
            consultant.setInvited(false);

            runInAction(() => {
                this.isSaving = false;
            });

            return;
        }

        consultant.setInvited(true);

        runInAction(() => {
            this.isSaving = false;
        });
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

    inviteExternalCompany = (context: E.RoleInCompany) => {
        (async () => {
            if (this.isSaving || !this.validationHolder.test()) {
                return;
            }

            this.isSaving = true;

            const res = await restQuery.inviteOwnCompany(
                this.phone,
                this.companyName,
                this.projectAdmin.project.id.asNumber(),
                context,
                this.email,
            );

            if (!res) {
                this.isSaving = false;
                return;
            }

            this.isSaving = false;

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
            this.projectAdmin.decraseInvitationCount(context);
        })();
    };
}
