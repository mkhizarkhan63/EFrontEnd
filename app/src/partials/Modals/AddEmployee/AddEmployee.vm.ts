import { action } from 'mobx';
import { E, ErrorListHolder, lang, restQuery, T, utils } from '~/api';
import type { CompanyType } from '~/models';

const struct = () => T.type({
    phone: T.mobile(),
});

export class AddEmployeeVm {
    phone = '';

    messages: string[] = [];

    category = E.AffiliationType.partner;

    errorListHolder = new ErrorListHolder(() => this, () => struct());

    errorList = new ErrorListHolder();

    constructor(readonly company: CompanyType, readonly closeModal: () => void) {
        makeSafeObservable(this, {
            setCategory: action,
            setPhone: action,
            addEmployee: action,
        });
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

    setPhone = (phone: string) => {
        this.phone = utils.fromInputPhone(phone, this.phone);
    };

    setCategory = (category: E.AffiliationType) => {
        this.category = category;
    };

    addEmployee = async () => {
        if (!this.errorListHolder.test()) {
            return;
        }

        const alreadyAdded = this.company.employees.data.some(item => item.phone === this.phone);

        if (alreadyAdded) {
            this.messages = [lang.dict.get('employeeAlreadyAdded')];
            return;
        }

        const res = await restQuery.addEmployee(
            this.company,
            {
                category: this.category,
                phone: this.phone,
            },
            this.errorList,
        );

        if (res) {
            this.closeModal();
            return;
        }

        this.messages = [lang.dict.get('accountNotFound')];
    };
}
