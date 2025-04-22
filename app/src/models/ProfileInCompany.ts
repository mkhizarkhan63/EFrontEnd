import { action, makeAutoObservable, runInAction } from 'mobx';
import { Id, E, type Img, restQuery } from '~/api';
import { stores } from '~/stores';

export class ProfileInCompany {
    id = Id.none();

    contextId = Id.none();

    companyName = '';

    logo?: Img;

    role = E.RoleInCompany.client;

    status?: E.CompaniesStatus;

    affiliationType = E.AffiliationType.owner;

    constructor() {
        makeAutoObservable(this, {
            loadStatus: action,
        });
    }

    loadStatus = async () => {
        if (this.status || this.role === E.RoleInCompany.client) {
            return;
        }

        const status = await restQuery.getCompanyStatus(this.contextId.asNumber());

        if (!status) {
            return;
        }

        runInAction(() => {
            this.status = status;
        });
    };

    static makeClient = () => {
        const client = new ProfileInCompany();

        client.logo = stores.profile.currentProfile.avatar?.img?.clone();

        return client;
    };
}
