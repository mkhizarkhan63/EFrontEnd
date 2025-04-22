import { types, type Instance } from 'mobx-state-tree';
import { E, MstType, utils, type Img } from '~/api';

export type ContractSubjectType = Instance<typeof ContractSubject>;

export const ContractSubject = types
    .model({
        type: types.enumeration<E.ContractSubjects>('Type', Object.values(E.ContractSubjects)),

        name: MstType.string,

        phone: MstType.string,

        email: MstType.string,

        bankName: MstType.string,

        accountName: MstType.string,

        accountNumber: MstType.string,

        ownerName: MstType.string,

        ownerNameInArabic: MstType.string,

        idNumber: MstType.string,

        employeeId: types.maybe(types.number),

        img: MstType.Img,

        isExternal: MstType.boolean,
    })
    .actions(self => ({
        setName: (value: string) => {
            self.name = value;
        },

        setPhone: (value: string) => {
            self.phone = utils.fromInputPhone(value, self.phone);
        },

        setEmail: (value: string) => {
            self.email = value;
        },

        setBankName: (value: string) => {
            const re = /^[A-Za-z][\sA-Za-z]*$/;

            if (value === '' || re.test(value)) {
                self.bankName = value;
            }
        },

        setAccountName: (value: string) => {
            const re = /^[A-Za-z][\sA-Za-z]*$/;

            if (value === '' || re.test(value)) {
                self.accountName = value;
            }
        },

        setAccountNumber: (value: string) => {
            const re = /^\d*$/;

            if (value === '' || re.test(value)) {
                self.accountNumber = value;
            }
        },

        setOwnerName: (value: string) => {
            const re = /^[A-Za-z][\sA-Za-z]*$/;

            if (value === '' || re.test(value)) {
                self.ownerName = value;

                if (self.type === E.ContractSubjects.client) {
                    self.name = value;
                }
            }
        },

        setOwnerNameInArabic: (value: string) => {
            const re = /[\u0600-\u06FF]/;

            if (value === '' || re.test(value)) {
                self.ownerNameInArabic = value;
            }
        },

        setIdNumber: (value: string) => {
            const re = /^\d*$/;

            if (value === '' || re.test(value)) {
                self.idNumber = value;
            }
        },

        setEmployeeId: (id: number) => {
            self.employeeId = id;
        },

        setImg: (img?: Img) => {
            self.img = img;
        },

        makeExternal: () => {
            self.isExternal = true;
        },
    }));
