import { E, ErrorListHolder, Id, lang, T } from '~/api';
import type { CompanyType } from '~/models';

const struct = (isConsultant: boolean) => T.type({
    clients: T.size(T.array(T.type({
        clientName: T.name(),
        phoneNumber: T.mobile(),
        projectValue: T.optional(T.number()),
        projectCompletionDate: T.optional(T.moment()),
        projectStartDate: T.moment(),
        governorateId: T.optional(T.instance(Id)),
        wilayatId: T.dynamic((value, ctx) => {
            const governorateId: undefined | Id = ctx.branch[2].governorateId;

            return governorateId ? T.instance(Id) : T.any();
        }),
        projectType: isConsultant ?
            T.enums([
                E.ConstructionType.design,
                E.ConstructionType.supervision,
            ])
            :
            T.enums([
                E.ConstructionType.structureOnly,
                E.ConstructionType.turnKey,
            ]),
    })), 2, Infinity),
});

export class CompanyReferencesVm {
    errorListHolder = new ErrorListHolder(() => this.validationData, () => struct(this.isConsultant));

    constructor(readonly company: CompanyType, errorListHolderParent: ErrorListHolder) {
        makeSafeObservable(this);
        errorListHolderParent.setChildren(this.errorListHolder);
    }

    mount = () => {
        if (this.company.references.length === 0) {
            this.company.addClient();
            this.company.addClient();
        }
    };

    get validationData() {
        return {
            clients: this.company.references,
        };
    }

    get isConsultant() {
        return this.company.type === E.ProfileType.consultant;
    }

    get projectType() {
        return this.isConsultant ?
            [
                {
                    name: lang.dict.get('design'),
                    value: E.ConstructionType.design,
                },
                {
                    name: lang.dict.get('supervision'),
                    value: E.ConstructionType.supervision,
                },
            ]
            :
            [
                {
                    name: lang.dict.get('constReqStructure'),
                    value: E.ConstructionType.structureOnly,
                },
                {
                    name: lang.dict.get('constReqTurnKey'),
                    value: E.ConstructionType.turnKey,
                },
            ];
    }

    getList = () => this.company.references.map(review => ({
        id: review.id,
        current: review,
        projectType: this.projectType,
        setName: review.setClientName,
        setPhone: review.setPhoneNumber,
        setValue: review.setProjectValue,
        setGovernorate: review.setHeadGovernorate,
        setWilayat: review.setHeadWilayat,
        wilayats: this.company.wilayatsList,
        governorates: this.company.governoratesList,
        setType: review.setProjectType,
        setEndDate: review.setEndDate,
        setStartDate: review.setStartDate,
        remove: () => this.company.removeReview(review.id),
    }));
}
