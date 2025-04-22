import { action, runInAction } from 'mobx';
import { T, ErrorListHolder, utils, restQuery } from '~/api';
import { stores } from '~/stores';

const struct = () => T.type({
    name: T.name(),
    phone: T.mobile(),
    email: T.email(true),
});

export class UsersVm {
    isInviteUser = false;

    name = '';

    email = '';

    phone = '';

    currentIdToDelete?: number;

    isDeleteModalOpened = false;

    errorListHolder = new ErrorListHolder(
        () => this,
        () => struct(),
    );

    constructor() {
        makeSafeObservable(this, {
            openInviteUser: action,
            closeInviteUser: action,
            setName: action,
            setEmail: action,
            setPhone: action,
            submitInviteUser: action,
            setSearchValue: action,
            openDeleteModal: action,
            closeDeleteModal: action,
            deleteUser: action,
        });
    }

    get usersList() {
        return stores.users.users;
    }

    get userListSorter() {
        return this.usersList.paging.modifySorter;
    }

    get userAmount() {
        return this.usersList.paging.rowCount;
    }

    get searchValue() {
        return stores.users.searchValue;
    }

    setName = (value: string) => {
        this.name = value;
    };

    setEmail = (value: string) => {
        this.email = value;
    };

    setPhone = (value: string) => {
        this.phone = utils.fromInputPhone(value, this.phone);
    };

    openInviteUser = () => {
        this.isInviteUser = true;
    };

    closeInviteUser = () => {
        this.isInviteUser = false;
    };

    setSearchValue = (value: string) => {
        stores.users.setSearchValue(value);
    };

    submitInviteUser = () => {
        (async () => {
            if (!this.errorListHolder.test()) {
                return;
            }

            const res = await restQuery.inviteUser(this.name, this.phone, this.email);

            if (!res) {
                return;
            }

            runInAction(() => {
                this.name = '';
                this.email = '';
                this.phone = '';
                this.closeInviteUser();
            });
        })();
    };

    showDetail = (id: number) => () => {
        const externalId = stores.idCollection.getExternal('user', id);

        if (!externalId) {
            return;
        }

        stores.display.router
            .$.admin.$.users
            .$.sub.$.projects.go({ id: externalId });
    };

    openDeleteModal = (id?: number) => {
        if (!id) {
            return;
        }
        this.currentIdToDelete = id;
        this.isDeleteModalOpened = true;
    };

    closeDeleteModal = () => {
        this.currentIdToDelete = undefined;
        this.isDeleteModalOpened = false;
    };

    deleteUser = () => {
        (async () => {
            if (!this.currentIdToDelete) {
                return;
            }

            const res = await restQuery.deleteUser(this.currentIdToDelete);

            if (!res) {
                return;
            }

            stores.users.users.reload();
            this.closeDeleteModal();
        })();
    };

    downloadUsers = async () => {
        const res = await restQuery.getUsers('');

        if (!res) {
            return [];
        }

        return res.map(item => ({
            id: item.id.toString(),
            name: item.name,
            arabicName: item.nameInArabic,
            nationalId: item.nationalId,
            email: item.email,
            phone: item.mobile,
            signedUp: item.signedUp.format(),
            lastActivity: item.lastActivity.format(),
            companyAssociations: item.companyAssociations.toString(),
            numberOfProjects: item.numberOfProjects.toString(),
        }));
    };
}
