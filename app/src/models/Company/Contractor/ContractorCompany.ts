import { types, type Instance } from 'mobx-state-tree';
import { stores } from '~/stores';
import { MstType, utils } from '~/api';

export type ContractorCompanyType = Instance<typeof ContractorCompany>;

export const ContractorCompany = types
    .model({
        id: stores.idCollection.getIdentifier('contractorCompany'),

        companyName: MstType.string,

        crNumber: MstType.string,

        manPower: MstType.number,

        typeOfServiceOrProduct: MstType.string,
    })
    .views(self => ({
        get externalId() {
            return stores.idCollection.getExternal('contractorCompany', self.id);
        },
    }))
    .actions(self => ({
        setCompanyName: (value: string) => {
            self.companyName = value;
        },

        setCrNumber: (cr: string) => {
            self.crNumber = utils.fromInputCr(cr, self.crNumber);
        },

        setManPower: (value: string) => {
            self.manPower = utils.fromInputNumber(value);
        },

        setServiceOrProduct: (value: string) => {
            self.typeOfServiceOrProduct = value;
        },
    }));
