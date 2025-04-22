import { action, runInAction } from 'mobx';
import { clone } from 'mobx-state-tree';
import { E, ErrorListHolder, lang, LazyModelScroller, restQuery, T } from '~/api';
import { Consultant, Contractor, type CompanyType } from '~/models';
import { stores } from '~/stores';
import { confirmPrompt } from '~/utils';

const struct = (email: string) => T.type({
    fullName: T.name(),
    phone: T.mobile(),
    ...email.length > 0 ? { email: T.email() } : {},
});

export class EmployeesVm {
    isModalOpened = false;

    isOwnerModalOpened = false;

    isOwnerEdited = false;

    isLoading = false;

    inviteOwnerId?: number;

    draft: CompanyType;

    errorListHolder = new ErrorListHolder(() => this.validationData, () => struct(this.draft.ownerEmail));

    invites = new LazyModelScroller(
        'Invites',
        () => restQuery.getCompanyInvites(this.company.externalId ?? 0),
        18,
    );

    constructor(readonly company: CompanyType) {
        makeSafeObservable(this, {
            company: false,
            openModal: action,
            closeModal: action,
            save: action,
            openOwnerModal: action,
            closeOwnerModal: action,
        });

        this.draft = clone(company);
    }

    get validationData() {
        return {
            fullName: this.draft.ownerName,
            phone: this.draft.ownerPhone,
            email: this.draft.ownerEmail,
        };
    }

    get employees() {
        return this.company.employees.data
            .filter(item => item.affiliationType !== E.AffiliationType.owner);
    }

    get employeesCount() {
        return this.employees.length;
    }

    openModal = () => {
        setTimeout(() => runInAction(() => {
            this.isModalOpened = true;
        }));
    };

    closeModal = () => {
        this.isModalOpened = false;
    };

    switchIsOwnerEdited = () => {
        this.isOwnerEdited = !this.isOwnerEdited;
    };

    delete = (id?: number) => {
        if (!id) {
            return;
        }

        confirmPrompt(
            lang.dict.get('confirmDeleteEmployee'),
            () => this.remove(id),
        );
    };

    remove = async (id: number) => {
        if (!this.company || this.isLoading) {
            return;
        }

        this.isLoading = true;

        await restQuery.removeEmployee(id, this.company, 'remove');

        this.isLoading = false;
    };

    save = async (setCompany: (company: CompanyType) => void) => {
        if (!this.isOwnerEdited || this.isLoading || !this.errorListHolder.test()) {
            return;
        }

        this.isLoading = true;

        if (Consultant.is(this.draft)) {
            //const res = await stores.consultantProfile.updateProfile(E.CompanySteps.ownerInfo, this.draft);
            const res = await stores.consultantProfile.updateProfile(E.CompanySteps.companyInfo, this.draft);

            if (!res) {
                runInAction(() => {
                    this.isLoading = false;
                });
                this.switchIsOwnerEdited();
                return;
            }

            setCompany(this.draft);
            this.switchIsOwnerEdited();
        }

        if (Contractor.is(this.draft)) {
         //   const res = await stores.contractorProfile.updateProfile(E.CompanySteps.ownerInfo, this.draft);
            const res = await stores.contractorProfile.updateProfile(E.CompanySteps.companyInfo, this.draft);

            if (!res) {
                runInAction(() => {
                    this.isLoading = false;
                });
                this.switchIsOwnerEdited();
                return;
            }

            setCompany(this.draft);
            this.switchIsOwnerEdited();
        }

        runInAction(() => {
            this.isLoading = false;
        });
    };

    makeOwner = () => {
        (async () => {
            const res = await restQuery.invitePartnerAsOwner(this.draft.externalId, this.inviteOwnerId);

            if (!res) {
                return;
            }

            this.invites.reload();

            this.closeOwnerModal();
        })();
    };

    openOwnerModal = (userId: number) => {
        this.inviteOwnerId = userId;
        this.isOwnerModalOpened = true;
    };

    closeOwnerModal = () => {
        this.inviteOwnerId = undefined;
        this.isOwnerModalOpened = false;
    };
}
