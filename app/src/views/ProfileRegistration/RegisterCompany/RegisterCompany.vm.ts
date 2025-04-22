import { makeAutoObservable, action, reaction } from 'mobx';
import { E, lang } from '~/api';
import { stores } from '~/stores';

type SumbitFn = (type: E.ProfileType) => void;

export class RegisterCompanyVm {
    accountType = [

        {
            id: E.ProfileType.developer,
            name: lang.dict.get('developer'),
            value: false,
            img: 'developer' as const,
        },
        {
            id: E.ProfileType.contractor,
            name: lang.dict.get('contractor'),
            value: true,
            img: 'contractor' as const,
        },
        {
            id: E.ProfileType.consultant,
            name: lang.dict.get('consultant'),
            value: false,
            img: 'consultant' as const,
        },
        {
            id: E.ProfileType.architect,
            name: lang.dict.get('architect'),
            value: false,
            img: 'architect' as const
        }
    ];

    saveAccountType: string = "contractor";

    private updateAccountType() {
        this.accountType = this.accountType.map(item => ({
            ...item,
            name: lang.dict.get(item.id === E.ProfileType.developer ? 'developer' :
                item.id === E.ProfileType.contractor ? 'contractor' :
                    item.id === E.ProfileType.consultant ? 'consultant' : 'architect')
        }));
    }
    private submitFn: SumbitFn = () => { /* */ };

    constructor() {
        makeAutoObservable(this, {
            submit: false,
            goHome: action,
        });

        reaction(
            () => lang.currentLanguage, // React to changes in the language
            () => {
                this.updateAccountType(); // Update the account type when language changes
            }
        );
    }

    get isDisabled() {
        const type = this.accountType.find(item => item.value);

        // if (type?.id === E.ProfileType.supplier) {
        //     return true;
        // }

        return false;
    }

    submit = () => {
        const type = this.accountType.find(item => item.value);
        if (type) {
            this.submitFn(type.id);
        }
    };

    handleClick = (id: string, value: boolean) => {
        this.saveAccountType = id;
        this.accountType = this.accountType.map(item => {
            if (item.id !== id) {
                item.value = false;
                return item;
            }
            return { ...item, value };
        });
    };

    setSubmit = (fn?: SumbitFn) => {
        if (fn) {
            this.submitFn = fn;
        }
    };

    goHome = () => {
        stores.display.router
            .$.home
            .go({});
    };


   
}
