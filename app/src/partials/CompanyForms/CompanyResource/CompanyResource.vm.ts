import { E, ErrorListHolder, lang, T, Id } from '~/api';
import type { CompanyType, ContractorType } from '~/models';

type TypeOfSpecialization =
    | E.ResourceType.engineer
    | E.ResourceType.labors
    | E.ResourceType.administration;

const struct = (
    otherContractingCompanies: boolean,
    otherSoftware: boolean,
    isContractor: boolean,
) => {
    const workers = {
        workers: T.array(T.type({
            specializationId: T.instance(Id),
            numberOfUnit: T.min(T.number(), 1),
        })),
    };

    const machines = {
        machines: T.array(T.type({
            machine: T.nonempty(T.string()),
            numberOfUnit: T.min(T.number(), 1),
        })),
    };

    const company = {
        planningSoftware: T.optional(T.array()),
        ...otherSoftware ? { planningSoftwareDescription: T.size(T.string(), 3, 50) } : {},
    };

    const contractingCompanies = {
        companies: T.size(T.array(T.type({
            crNumber: T.crNumber(),
            companyName: T.name(),
            manPower: T.min(T.number(), 1),
            typeOfServiceOrProduct: T.string(),
        })), 1, Infinity),
    };

    return T.type({
        ...workers,
        ...company,
        ...isContractor ? machines : {},
        ...otherContractingCompanies ? contractingCompanies : {},
    });
};

export class CompanyResourceVm {
    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(
            Boolean(this.contractor?.otherContractingCompanies),
            this.hasOther,
            Boolean(this.contractor),
        ),
    );

    constructor(
        readonly company: CompanyType,
        readonly errorListHolderParent: ErrorListHolder,
        readonly contractor?: ContractorType,
    ) {
        makeSafeObservable(this);
        errorListHolderParent.setChildren(this.errorListHolder);
    }

    mount = () => {
        if (this.company.resources.length > 0) {
            return;
        }

        this.company.addNewResource(E.ResourceType.engineer);

        if (this.company.type === E.ProfileType.contractor) {
            this.company.addNewResource(E.ResourceType.labors);
        }
    };

    get validationData() {
        return {
            workers: this.company.resources
                .filter(x => x.resourceType !== E.ResourceType.machinery)
                .map(x => ({
                    ...x,
                    specializationId: Id.tryInit(x.specializationId),
                })),
            machines: this.company.resources
                .filter(x => x.resourceType === E.ResourceType.machinery),
            planningSoftwareDescription: this.company.otherPlanningSoftware,
            planningSoftware: this.company.planningSoftware,
            otherSoftware: this.company.otherPlanningSoftware,
            companies: this.contractor?.companies,
        };
    }

    get planningSoftware() {
        return [
            {
                targetValue: E.PlanningSoftware.excel,
                name: lang.dict.get('excel'),
            },
            {
                name: lang.dict.get('microsoftProject'),
                targetValue: E.PlanningSoftware.microsoftProject,
            },
            {
                name: lang.dict.get('primavera'),
                targetValue: E.PlanningSoftware.primavera,
            },
            {
                name: lang.dict.get('other'),
                targetValue: E.PlanningSoftware.other,
            },
        ].map(item => ({
            id: item.targetValue,
            name: item.name,
            value: this.company.planningSoftware.includes(item.targetValue),
        }));
    }

    get hasOther() {
        return this.company.planningSoftware.includes(E.PlanningSoftware.other);
    }

    getSpecializations = (typeOfSpecialization: TypeOfSpecialization, specId: number) => {
        const all = this.company.allSpecializations
            .filter(item => item.type === typeOfSpecialization)
            .map(specialization => ({
                name: specialization.name,
                value: specialization.id,
                type: specialization.type,
                isVisible: this.company.resources
                    .some(el => specialization.id === el.specializationId),
            }));

        if (specId !== 0) {
            all.unshift({
                name: '',
                value: 0,
                type: E.ResourceType.none,
                isVisible: false,
            });
        }

        return all;
    };

    getContextList = (type: E.ResourceType, typeOfSpecialization: TypeOfSpecialization) => this.company.resources
        .filter(el => el.resourceType === type)
        .map(item => ({
            id: item.id,
            current: item,
            specList: this.getSpecializations(typeOfSpecialization, item.specializationId),
            max: 100,
            isOptional: type === E.ResourceType.administration ? true : undefined,
            remove: () => this.company.removeResource(item.id),
        }));

    getContextListPair = (type: E.ResourceType) => this.getContextList(type, type as TypeOfSpecialization);

    getMachineries = () => this.company.resources
        .filter(item => item.resourceType === E.ResourceType.machinery)
        .map(item => ({
            id: item.id,
            current: item,
            remove: () => this.company.removeResource(item.id),
        }));
}
