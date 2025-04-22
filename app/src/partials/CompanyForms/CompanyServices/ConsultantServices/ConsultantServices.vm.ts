import { action } from 'mobx';
import { ErrorListHolder, Id, lang, T } from '~/api';
import type { ConsultantDesignServiceType, ConsultantType } from '~/models';
import { stores } from '~/stores';

const struct = (
    isProvideDesign: boolean,
    isProvideSupervision: boolean,
) => {
    const minNumber = T.min(T.number(), 1);
    const minString = T.nonempty(T.string());

    const provideDesign = {
        architecturalDesign: T.array(T.type({
            landSizeFrom: T.number(),
            landSizeTo: minNumber,
            price: minNumber,
        })),
        products: T.array(T.type({
            price: minString,
        })),
        everyPrice: minNumber,
        everyMeters: minNumber,
    };

    const provideSuperVision = {
        governorates: T.array(T.type({
            id: T.id(),
            entriesWilayat: T.array(T.type({
                id: T.instance(Id),
                price: minNumber,
            })),
        })),
    };

    return T.type({
        ...isProvideDesign ? provideDesign : {},
        ...isProvideSupervision ? provideSuperVision : {} });
};

export class ConsultantServicesVm {
    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(
            this.consultant.isProvideDesign,
            this.consultant.isProvideSupervision,
        ),
    );

    constructor(readonly consultant: ConsultantType, errorListHolderParent: ErrorListHolder) {
        makeSafeObservable(this, {
            setIsProductChecked: action,
            setProductPrice: action,
            productPrice: false,
        });

        errorListHolderParent.setChildren(this.errorListHolder);
    }

    get validationData() {
        return {
            everyPrice: this.consultant.everyDesignPackagePrice,
            everyMeters: this.consultant.everyDesignPackageSize,
            architecturalDesign: this.consultant.services,
            governorates: this.governorates.map(item => ({
                id: item.governorateId?.asNumber(),
                entriesWilayat: item.wilayatEntries.map(el => ({
                    id: el.wilayatId,
                    price: el.price,
                })),
            })),
            products: this.consultant.products.filter(item => item.isChecked),
        };
    }

    get listOfDesignServices() {
        return stores.contractors.dicts.data.designServiceUnits.map(x => ({
            id: x.id,
            name: x.displayName,
            iconPath: x.iconPath,
        }));
    }

    get listOfProductsService() {
        return stores.contractors.dicts.data.consultantProductUnit.map(x => ({
            id: x.id,
            name: x.displayName,
            iconPath: x.iconPath,
        }));
    }

    get governorates() {
        return this.consultant.governorates;
    }

    getListArchitectural = () => {
        let previous: ConsultantDesignServiceType | undefined;
        return this.consultant.services.map(item => {
            const service = {
                id: item.id,
                current: item,
                previous,
                setMin: (p?: ConsultantDesignServiceType) => {
                    if (!p || p.price < item.landSizeFrom) {
                        return;
                    }

                    item.setLandSizeFrom(String(p.price + 1));
                },
                removeArchitectural: () => this.consultant.removeService(item.id),
                addNewArchitecturalDesign: () => this.consultant.addService(),
            };
            previous = item;
            return service;
        });
    };

    getName = (id: Id) => {
        switch (id.asNumber()) {
            case 1:
                return lang.dict.get('landscapeDesign');
            case 2:
                return lang.dict.get('quantitySurveying');
            case 3:
                return lang.dict.get('interiorDesign');
            case 4:
                return lang.dict.get('surveying');
        }
        return '';
    };

    isProductCheck = (id: Id) => {
        const item = this.consultant.products.find(el => id.isEqual(el.productId));

        if (!item) {
            return false;
        }

        return item.isChecked;
    };

    setIsProductChecked = (id: Id) => action(() => {
        const item = this.consultant.products.find(el => id.isEqual(el.productId));

        if (!item) {
            this.consultant.addProduct(id.asNumber());
            return;
        }

        item.toggleIsChecked();
        item.setPrice('');
    });

    productPrice = (id: Id) => {
        const item = this.consultant.products.find(el => id.isEqual(el.productId));

        if (!item) {
            return '';
        }

        return item.price;
    };

    setProductPrice = (id: Id) => action((value: string) => {
        const item = this.consultant.products.find(el => id.isEqual(el.productId));

        if (!item) {
            return;
        }

        item.setPrice(value);
    });
}
