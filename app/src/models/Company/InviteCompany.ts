import { type Instance, types } from 'mobx-state-tree';
import { MstType } from '~/api';

export type InviteCompanyType = Instance<typeof InviteCompany>;

export const InviteCompany = types
    .model({
        companyName: MstType.string,

        email: MstType.string,

        mobileNumber: MstType.string,
    })
    .actions(self => ({
        setCompanyName: (name: string) => {
            self.companyName = name;
        },

        setEmail: (email: string) => {
            self.email = email;
        },

        setMobileNumber: (phone: string) => {
            self.mobileNumber = phone;
        },
    }));
