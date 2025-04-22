import { action, runInAction } from 'mobx';
import { E, lang, restQuery } from '~/api';
import type { CompanyType, EmployeeType } from '~/models';

export class EditEmployeeVm {
    isLoading = false;

    category = E.AffiliationType.none;

    constructor(readonly employee: EmployeeType, readonly company: CompanyType) {
        makeSafeObservable(this, {
            setCategory: action,
        });

        this.setCategory(this.employee.affiliationType);
    }

    get relationship() {
        return this.company.relationship;
    }

    get relationshipValues() {
        return this.relationship.map(item => ({
            id: item,
            name: lang.dict.enum('affiliationType', item),
            value: this.category === item,
        }));
    }

    setCategory = (category: E.AffiliationType) => {
        this.category = category;
    };

    save = async () => {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;

        await restQuery.editEmployeeRole(
            this.employee,
            this.company,
            this.category,
        );

        runInAction(() => {
            this.isLoading = false;
        });
    };
}
