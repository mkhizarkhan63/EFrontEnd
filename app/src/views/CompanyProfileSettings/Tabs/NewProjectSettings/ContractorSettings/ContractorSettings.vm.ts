import { action, runInAction } from 'mobx';
import { ErrorListHolder, restQuery, T, utils, type Id } from '~/api';
import { stores } from '~/stores';
import type { ContractorType } from '~/models';

const struct = () => T.type({
    locations: T.nonempty(T.array()),
    minimumProjectSize: T.min(T.number(), 200),
});

export class ContractorSettingsVm {
    isLoading = false;

    locations: Id[] = [];

    minimumProjectSize = 0;

    errorListHolder = new ErrorListHolder(() => this.validationData, () => struct());

    constructor(readonly contractor: ContractorType) {
        makeSafeObservable(this, {
            setAreYouAtGovernorate: action,
            setProjectSize: action,
            saveChanges: action,
        });

        this.minimumProjectSize = this.contractor.minimumProjectSize;
        this.locations = Array.from(this.contractor.governorates);
    }

    get validationData() {
        const locations = Array.from(this.locations);
        if (this.contractor?.headOfficeGovernorateId) {
            locations.push(this.contractor.headOfficeGovernorateId);
        }

        return {
            locations,
            minimumProjectSize: this.minimumProjectSize,
        };
    }

    get governorateLocations() {
        return this.contractor.governorates;
    }

    get governorates() {
        return stores.locations.governorates
            .map(item => ({
                id: item.id,
                name: item.displayName,
                value: this.locations.some(x => x.isEqual(item.id)),
            }));
    }

    setAreYouAtGovernorate = (id: Id) => {
        const toDelete = this.locations.some(x => x.isEqual(id));

        if (toDelete) {
            this.locations = this.locations.filter(x => !x.isEqual(id));
            return;
        }

        this.locations.push(id);
    };

    setProjectSize = (size: string) => {
        this.minimumProjectSize = utils.fromInputNumber(size);
    };

    saveChanges = async () => {
        if (!this.errorListHolder.test() || this.isLoading) {
            return;
        }

        this.isLoading = true;

        await restQuery.updateContractor(this.contractor.externalId, {
            minimumProjectSize: this.minimumProjectSize,
            governorates: this.locations.map(x => x.asNumber()),
        });

        runInAction(() => {
            this.contractor.setGovernorates(Array.from(this.locations));
            this.contractor.setProjectSize(String(this.minimumProjectSize));
            this.isLoading = false;
        });
    };
}
