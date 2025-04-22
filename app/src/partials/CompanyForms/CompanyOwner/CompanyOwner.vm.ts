import { action } from 'mobx';
import { ErrorListHolder, E, lang, T } from '~/api';
import type { CompanyType } from '~/models';
import { stores } from '~/stores';

const struct = (isOwner: boolean, email: string) => (isOwner
    ? T.any()
    : T.type({
        fullName: T.name(),
        phone: T.mobile(),
        ...email.length > 0 ? { email: T.email() } : {},
    }));

export class CompanyOwnerVm {
    errorListHolder = new ErrorListHolder(() => this.validationData, () => struct(this.areYouOwner, this.company.ownerEmail));

    constructor(readonly company: CompanyType, readonly errorListHolderParent: ErrorListHolder) {
        makeSafeObservable(this, {
            setAreYouOwner: action,
        });

        errorListHolderParent.setChildren(this.errorListHolder);
    }

    get isExternal() {
        return Boolean(this.company.externalId);
    }

    get areYouOwner() {
        if (this.isExternal) {
            return this.company.externalId === stores.profile.profile?.ownerId;
        }

        return this.company.affiliationType === E.AffiliationType.owner;
    }

    get validationData() {
        const phone = stores.profile.currentProfile.phone;

        return {
            fullName: this.company.ownerName,
            phone: this.company.ownerPhone === phone ? '' : this.company.ownerPhone,
            email: this.company.ownerEmail,
        };
    }

    get areYouOwnerField() {
        switch (this.company.type) {
            case E.ProfileType.consultant:
                return lang.dict.get('areYouOwnerEngineeringConsultancy');
            case E.ProfileType.contractor:
                return lang.dict.get('fieldAreYouOwner');
            default:
                return '';
        }
    }

    get relationship() {
        return this.company.relationship;
    }

    get relationshipValues() {
        return this.relationship.map(item => ({
            id: item,
            name: lang.dict.enum('affiliationType', item),
            value: this.company.affiliationType === item,
        }));
    }

    setAreYouOwner = () => {
        if (this.areYouOwner) {
            this.company.setAffiliationType(E.AffiliationType.partner);
            return;
        }

        this.company.setAffiliationType(E.AffiliationType.owner);
    };
}
