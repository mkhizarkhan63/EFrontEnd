import { action } from 'mobx';
import { E, ErrorListHolder, Id, T, lang } from '~/api';
import type { FileDataType } from '../FileData';
import { SowItemConstruction } from './SowItemConstruction';
import { SowItemContract } from './SowItemContract';

const struct = (isCategoryPayment: boolean) => T.type({
    englishName: T.size(T.string(), 1, 64),
    arabicName: T.size(T.string(), 1, 64),
    ...isCategoryPayment
        ? {
            subItemsLength: T.define<number>('subItemsLength', value => value === 1),
        }
        : {},
});

export class SowItem {
    id = Id.init();

    orderNumber = 0;

    englishName = '';

    arabicName = '';

    numberOfSpecs = 0;

    numberOfWorkflows = 0;

    consultantVisits = 0;

    category = E.SowItemCategory.none;

    type?: E.ConstructionType;

    logo?: FileDataType = undefined;

    responsibility = E.SowItemResponsibility.none;

    forContract = new SowItemContract(this);

    forConstruction = new SowItemConstruction(this);

    installBy = false;

    sowItemVisibility = E.SowItemVisibility.none;

    sowItemChangeStatus = E.SowItemChangeStatus.none;

    sowItemUseTimes = 0;

    errorListHolder = new ErrorListHolder(
        () => this,
        () => struct(this.isCategoryPayment),
    );

    constructor() {
        makeSafeObservable(this, {
            setName: action,
            setArabicName: action,
            removeAvatar: action,
            uploadAvatar: action,
        });
    }

    get sowItemName() {
        if (lang.current === 'ar') {
            return this.arabicName;
        }

        return this.englishName;
    }

    get isClientMaterials() {
        return this.responsibility === E.SowItemResponsibility
            .itemsSuppliedByClientAndInstalledByContractor;
    }

    get isContractorMaterials() {
        return this.responsibility === E.SowItemResponsibility
            .itemsSuppliedAndInstalledByContractor;
    }

    get isCategoryPayment() {
        return this.category === E.SowItemCategory.payment;
    }

    get subItemsLength() {
        return this.forConstruction.sowSubItems.length;
    }

    get subItems() {
        return this.forConstruction.sowSubItems ?? [];
    }

    get currentCategory() {
        if (this.category === E.SowItemCategory.none) {
            return undefined;
        }
        return this.category;
    }

    setName = (name: string) => {
        this.englishName = name;
    };

    setArabicName = (name: string) => {
        this.arabicName = name;
    };

    uploadAvatar = (logo: FileDataType) => {
        this.logo = logo;
        this.logo?.loadImg();
    };

    removeAvatar = () => {
        this.logo?.removeFile();
    };

    setUseTimes = (useTimes: number) => {
        this.sowItemUseTimes = useTimes;
    };
}
