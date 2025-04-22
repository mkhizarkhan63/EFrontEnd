import { type Instance, types } from 'mobx-state-tree';
import { MstType, utils, type Id } from '~/api';

export type ShortCompanyType = Instance<typeof ShortCompany>;

export const ShortCompany = types
    .model({
        companyName: MstType.string,

        companyNameAr: MstType.string,

        headOfficeGovernorateId: types.maybe(MstType.Id),

        headOfficeWilayatId: types.maybe(MstType.Id),

        crNumber: MstType.string,
    })
    .actions(self => ({
        setCompanyName: (name: string) => {
            self.companyName = name;
        },

        setCompanyNameAr: (name: string) => {
            self.companyNameAr = name;
        },

        setCrNumber: (cr: string) => {
            self.crNumber = utils.fromInputCr(cr, self.crNumber);
        },

        setHeadGovernorate: (id: Id) => {
            self.headOfficeGovernorateId = id;
            self.headOfficeWilayatId = undefined;
        },

        setHeadWilayat: (id: Id) => {
            self.headOfficeWilayatId = id;
        },
    }));
