import { action } from 'mobx';
import { applySnapshot, clone, getSnapshot } from 'mobx-state-tree';
import { ChangesKeeper, E, ErrorListHolder, Id, lang, restQuery, T } from '~/api';
import { DropdownViewModel } from '~/bits';
import {
    ClientReference,
    type ClientReferenceType,
    type CompanyType,
} from '~/models';
import { stores } from '~/stores';

const struct = () => T.type({
    clientName: T.name(),
    phoneNumber: T.mobile(),
    governorateId: T.instance(Id),
    wilayatId: T.instance(Id),
    projectValue: T.size(T.number(), 100, 9000),
    projectCompletionDate: T.moment(),
    projectStartDate: T.moment(),
});

export class ReviewsVm {
    company?: CompanyType;

    isOpenModal = false;

    isEdit = false;

    isApprove = false;

    starsLabels = E.ReviewStars;

    review?: ClientReferenceType;

    originalReview?: ClientReferenceType;

    changes?: ChangesKeeper<ClientReferenceType>;

    dropdowns = new DropdownViewModel();

    isSaving = false;

    errorListHolder = new ErrorListHolder(
        () => this.review,
        () => struct(),
    );

    constructor(company?: CompanyType) {
        makeSafeObservable(this, {
            toggleReview: action,
            saveReview: action,
            removeReview: action,
            editReview: action,
            mount: false,
        });

        if (company) {
            this.company = company;
        }
    }

    get projectTypes() {
        if (this.company?.type === E.ProfileType.contractor) {
            return [
                {
                    value: E.ConstructionType.structureOnly,
                    name: lang.dict.get('projectTypeStructureOnly'),
                },
                {
                    value: E.ConstructionType.turnKey,
                    name: lang.dict.get('turnkey'),
                },
            ];
        }

        return [
            {
                value: E.ConstructionType.design,
                name: lang.dict.get('design'),
            },
            {
                value: E.ConstructionType.supervision,
                name: lang.dict.get('supervision'),
            },
        ];
    }

    get isAdmin() {
        return stores.display.router.$.admin.$.companies.match;
    }

    mount = () => {
        if (this.isSaving) {
            return;
        }

        if (!this.isAdmin) {
            this.company = stores.profile.company;
        }
    };

    toggleReview = () => {
        if (this.isOpenModal) {
            this.isOpenModal = false;
            this.review = undefined;
            this.isEdit = false;

            return;
        }

        this.review = ClientReference.create();

        this.changes = new ChangesKeeper(this.review, [
            'clientName',
            'phoneNumber',
            'governorateId',
            'wilayatId',
            'projectValue',
            'projectCompletionDate',
            'projectType',
            'projectStartDate',
            'images',
            'filesToRemove',
            'stars',
        ]);

        this.isOpenModal = true;
    };

    saveReview = () => {
        (async () => {
            if (this.isSaving || !this.review || !this.errorListHolder.test() || !this.company) {
                return;
            }

            this.isSaving = true;

            const result = await restQuery[this.isEdit ? 'updateReview' : 'addReview']({
                reference: this.review,
                company: this.company,
                isAdmin: this.isAdmin,
            });

            if (!result) {
                this.toggleReview();
                this.isSaving = false;
                return;
            }

            if (this.isApprove) {
                this.review.setStatus(this.isAdmin);
            }

            if (!this.isEdit) {
                this.review.setStatus(this.isAdmin);

                this.company.addReference(this.review);
            }

            if (this.isEdit && this.originalReview) {
                applySnapshot(this.originalReview, getSnapshot(this.review));
            }

            this.isSaving = false;
            this.toggleReview();
        })();
    };

    removeReview = (item: ClientReferenceType) => {
        (async () => {
            if (this.isSaving || !item.externalId || !this.company) {
                return;
            }

            this.isSaving = true;

            const response = await restQuery.removeReview(
                {
                    id: item.externalId,
                    company: this.company,
                },
            );

            if (response) {
                this.company.removeReference(item.externalId);
            }

            this.isSaving = false;
        })();
    };

    editReview = (item: ClientReferenceType, isApprove = false) => {
        this.originalReview = item;
        this.review = clone(item);

        this.isApprove = isApprove;

        this.changes = new ChangesKeeper(this.review, [
            'clientName',
            'phoneNumber',
            'governorateId',
            'wilayatId',
            'projectValue',
            'projectCompletionDate',
            'projectType',
            'projectStartDate',
            'images',
            'filesToRemove',
            'stars',
        ]);

        this.isOpenModal = true;
        this.isEdit = true;
    };
}
