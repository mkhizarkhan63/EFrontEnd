import { action, makeAutoObservable, reaction } from 'mobx';
import { restQuery } from '~/api';
import { stores } from '~/stores';

export class CompanyInvitesVm {
    isRejectionModalOpened = false;

    isAcceptModalOpened = false;

    currentInvite?: number;

    isInfoOpened = false;

    constructor() {
        makeAutoObservable(this, {
            openModal: action,
            closeModal: action,
            decideInvite: action,
            closeInfo: action,
        });

        reaction(() => this.invites.length, () => {
            if (this.invites.length === 0) {
                stores.display.router.$.home.go({});
            }
        });
    }

    get invites() {
        return stores.profile.invites.data;
    }

    openModal = (id: number, isDelete = false) => {
        if (!id) {
            return;
        }

        this.currentInvite = id;

        if (isDelete) {
            this.isRejectionModalOpened = true;
            return;
        }

        this.isAcceptModalOpened = true;
    };

    closeModal = (isDelete = false) => {
        this.currentInvite = undefined;

        if (isDelete) {
            this.isRejectionModalOpened = false;
            return;
        }

        this.isAcceptModalOpened = false;
    };

    decideInvite = (isAccept = false) => {
        (async () => {
            if (!this.currentInvite) {
                return;
            }

            const res = await restQuery.decideInvitation(isAccept, this.currentInvite);

            if (!res) {
                return;
            }

            this.closeModal(!isAccept);
            stores.profile.invites.reload();

            if (isAccept) {
                this.isInfoOpened = true;
            }
        })();
    };

    closeInfo = () => {
        this.isInfoOpened = false;
    };
}
