import { cast, types, type Instance } from 'mobx-state-tree';
import { E, lang, MstType, utils, type Id } from '~/api';
import { stores } from '~/stores';
import type { ContractorServiceType } from '..';
import { Company } from '../Company';
import { ContractorCompany } from './ContractorCompany';
import { ContractorProduct, type ContractorProductType } from './ContractorProduct';
import { ContractorService } from './ContractorService';

export type ContractorType = Instance<typeof Contractor>;

export const Contractor = types
    .compose(
        Company,
        types
            .model({
                companies: types.array(ContractorCompany),

                governorates: types.array(MstType.Id),

                services: types.array(ContractorService),

                products: types.array(ContractorProduct),

                otherContractingCompanies: MstType.boolean,

                companyRelationship: types.optional(
                    types.enumeration<E.CompanyRelationship>(
                        'CompanyRelationship',
                        Object.values(E.CompanyRelationship),
                    ),
                    E.CompanyRelationship.none,
                ),

                employeeName: MstType.string,

                employeePhone: MstType.string,

                employeeEmail: MstType.string,
            }),
    )
    .views(self => ({
        get isEmployee() {
            return (
                self.employeeName.length > 0 ||
            self.employeePhone.length > 0 ||
            self.employeeEmail.length > 0 ||
            self.companyRelationship !== E.CompanyRelationship.none
            );
        },

        get relationshipValue() {
            return [
                {
                    name: lang.dict.get('relationshipPartner'),
                    targetValue: E.CompanyRelationship.partner,
                },
                {
                    name: lang.dict.get('relationshipEngineer'),
                    targetValue: E.CompanyRelationship.engineer,
                },
                {
                    name: lang.dict.get('relationshipSupervisor'),
                    targetValue: E.CompanyRelationship.supervisor,
                },
            ].map(item => ({
                id: item.targetValue,
                name: item.name,
                value: self.companyRelationship === item.targetValue,
            }));
        },

        get areYouAtOrganizations() {
            return [
                {
                    name: lang.dict.get('organizationOmanHousingBank'),
                    targetValue: E.Organization.omanHousingBank,
                },
                {
                    name: lang.dict.get('organizationOmanTenderBoard'),
                    targetValue: E.Organization.omanTenderBoard,
                },
                {
                    name: lang.dict.get('organizationPdo'),
                    targetValue: E.Organization.pdo,
                },
                {
                    name: lang.dict.get('organizationOthers'),
                    targetValue: E.Organization.others,
                },
            ].map(item => ({
                id: item.targetValue,
                name: item.name,
                value: self.registeredAt.some(x => x.organization === item.targetValue),
            }));
        },

        get namesOfGovernorates() {
            const { governorates } = stores.locations;

            const governorateNames = self.governorates
                .map(item => governorates.find(x => x.id.isEqual(item))?.displayName)
                .filter((x): x is string => x !== undefined);

            const headOfficeGovernorateName = governorates.find(x => x.id.isEqual(self.headOfficeGovernorateId))?.displayName;

            if (headOfficeGovernorateName) {
                governorateNames.push(headOfficeGovernorateName);
            }

            return governorateNames;
        },

        get namesOfProducts() {
            const pUnits = stores.contractors.dicts.data.productUnits;

            const products = self.products
                .map(item => pUnits.find(x => x.id.isEqual(item.productUnitId))?.displayName)
                .filter((x): x is string => x !== undefined);

            return products.concat(
                self.products
                    .filter(item => item.other !== '')
                    .map(item => item.other),
            );
        },

        get namesOfServices() {
            const sUnits = stores.contractors.dicts.data.serviceUnits;

            const services = self.services
                .map(item => sUnits.find(x => x.id.isEqual(item.serviceUnitId))?.displayName)
                .filter((x): x is string => x !== undefined);

            return services.concat(
                self.services
                    .filter(item => item.other !== '')
                    .map(item => item.other),
            );
        },

        get resourcesList() {
            const summary = [
                { type: E.ResourceType.engineer, value: 0 },
                { type: E.ResourceType.labors, value: 0 },
                { type: E.ResourceType.administration, value: 0 },
                { type: E.ResourceType.machinery, value: 0 },
            ];

            for (const resource of self.resources) {
                const item = summary.find(x => x.type === resource.resourceType);

                if (!item) {
                    continue;
                }

                item.value += resource.numberOfUnit;
            }

            return summary.map(item => ({
                name: lang.dict.enum('resourceType', item.type),
                value: item.value,
            }));
        },

        get areYouAtGovernorate() {
            return self.governoratesList.map(item => ({
                id: item.value,
                name: item.name,
                value: self.governorates.some(x => x.isEqual(item.value)),
            }));
        },

        get workingGovernorates() {
            return self.governoratesList
                .filter(item => self.governorates.some(x => x.isEqual(item.value)));
        },
    }))
    .actions(self => ({
        toggleGovernorate: (governorateId: Id) => {
            const search = self.governorates.some(x => x.isEqual(governorateId));

            if (search) {
                self.governorates = cast(self.governorates
                    .filter(x => !x.isEqual(governorateId)));

                return;
            }

            self.governorates.push(governorateId);
        },

        setGovernorates: (ids: Id[]) => {
            self.governorates = cast(ids);
        },

        setProjectSize: (size: string) => {
            self.minimumProjectSize = utils.fromInputNumber(size);
        },

        setChargeBlackProjects: (charge: string) => {
            self.chargeBlackProjects = utils.fromInputNumber(charge, 0, 1000);
        },

        setChargeTurnkeyProjects: (charge: string) => {
            self.chargeTurnkeyProjects = utils.fromInputNumber(charge, 0, 1000);
        },

        setProducts: (productId: number) => {
            const productToDelete = self.products.find(x => {
                if (x.productUnitId === 0) {
                    return false;
                }
                return x.productUnitId === productId;
            });

            if (productToDelete) {
                self.products = cast(self.products.filter(x => {
                    if (x.productUnitId === 0) {
                        return true;
                    }

                    return x.productUnitId !== productId;
                }));

                return;
            }

            self.products.push(ContractorProduct.create({ productUnitId: productId }));
        },

        removeOtherProduct: (other: string) => {
            self.products = cast(self.products.filter(item => item.other !== other));
        },

        addProduct: (product: ContractorProductType) => {
            self.products.push(product);
        },

        addService: (service: ContractorServiceType) => {
            self.services.push(service);
        },

        setServices: (serviceId: number) => {
            const service = stores.contractors.dicts.data.serviceUnits
                .find(item => item.id.asNumber() === serviceId);

            if (!service) {
                return;
            }

            const serviceToDelete = self.services.find(x => {
                if (x.serviceUnitId === 0) {
                    return false;
                }

                return x.serviceUnitId === serviceId;
            });

            if (serviceToDelete) {
                self.services = cast(self.services.filter(x => {
                    if (x.serviceUnitId === 0) {
                        return true;
                    }

                    return x.serviceUnitId !== serviceId;
                }));

                return;
            }

            self.services.push(ContractorService.create({
                serviceUnitId: serviceId,
                serviceName: service.systemName,
            }));

            if (service.systemName.trim().toLowerCase() === 'noneoftheabove') {
                self.services = cast(self.services.filter(x => {
                    if (x.serviceUnitId === 0) {
                        return true;
                    }

                    return x.serviceUnitId === serviceId;
                }));

                return;
            }

            self.services = cast(self.services.filter(x => {
                if (x.serviceUnitId === 0) {
                    return true;
                }

                return x.serviceName.trim().toLowerCase() !== 'noneoftheabove';
            }));
        },

        removeOtherService: (other: string) => {
            self.services = cast(self.services.filter(item => item.other !== other));
        },

        setOtherContractingCompanies: (value: boolean) => {
            self.otherContractingCompanies = value;
            if (!value) {
                self.companies = cast([]);
            }
        },

        addNewCompany: () => {
            self.companies.push(ContractorCompany.create());
        },

        removeCompany: (id: number | string | Id) => {
            if (typeof id === 'number') {
                self.companies = cast(self.companies.filter(item => item.id !== id));
            }
        },
    }));
