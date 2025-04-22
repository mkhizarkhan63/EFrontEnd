import { runInAction } from 'mobx';
import { clone } from 'mobx-state-tree';
import { E, ErrorListHolder } from '~/api';
import type { ConsultantType } from '~/models';
import { stores } from '~/stores';

export class ConsultantSettingsVm {
    isLoading = false;

    consultant: ConsultantType;

    errorListHolder = ErrorListHolder.mimic();

    constructor(readonly consultantData: ConsultantType) {
        makeSafeObservable(this);
        this.consultant = clone(consultantData);
    }

    saveChanges = async () => {
        if (!this.errorListHolder.test() || this.isLoading) {
            return;
        }

        this.isLoading = true;
        const res = await stores.consultantProfile.updateProfile(
            E.CompanySteps.productsServices,
            this.consultant,
        );

        if (!res) {
            return;
        }

        stores.profile.setCompany(clone(this.consultant));

        runInAction(() => {
            this.isLoading = false;
        });
    };
}
