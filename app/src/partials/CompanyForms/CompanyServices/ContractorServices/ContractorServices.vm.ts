import { action } from 'mobx';
import { ErrorListHolder, lang, T } from '~/api';
import { ContractorProduct, ContractorService, type ContractorType } from '~/models';

const struct = (isChecked: boolean) => (isChecked
    ? T.any()
    : T.type({ nothingChecked: T.nonempty(T.array()) }));

export class ContractorServicesVm {
    currentProduct = '';

    currentServices = '';

    servicesOthersErr = '';

    productsOthersErr = '';

    errorListHolder = new ErrorListHolder(
        () => this,
        () => struct(this.isChecked),
    );

    constructor(readonly contractor: ContractorType, readonly errorListHolderParent: ErrorListHolder) {
        makeSafeObservable(this, {
            handleProductsOthers: action,
            addProductsOthers: action,
            handleServicesOthers: action,
            addServicesOthers: action,
        });

        if (!this.isChecked) {
            this.contractor.setProducts(1);
            this.contractor.setProducts(2);
            this.contractor.setProducts(3);
            this.contractor.setProducts(7);
        }

        errorListHolderParent.setChildren(this.errorListHolder);
    }

    get isChecked() {
        return this.contractor.products.length > 0
            || this.contractor.services.length > 0;
    }

    get checkServices() {
        return this.contractor.allServices.map(service => ({
            id: service.id.asNumber(),
            name: service.name,
            systemName: service.systemName,
            value: this.contractor.services.some(x => x.serviceUnitId === service.id.asNumber()),
        }));
    }

    get checkProducts() {
        return this.contractor.allProducts.map(product => ({
            id: product.id.asNumber(),
            name: product.name,
            value: this.contractor.products.some(x => x.productUnitId === product.id.asNumber()),
        }));
    }

    get otherServices() {
        return this.contractor.services
            .filter(item => item.other !== '')
            .map(item => item.other);
    }

    get otherProducts() {
        return this.contractor.products
            .filter(item => item.other !== '')
            .map(item => item.other);
    }

    handleProductsOthers = (value: string) => {
        this.currentProduct = value;
    };

    addProductsOthers = () => {
        const value = this.currentProduct.trim();

        if (value.length === 0) {
            return;
        }

        if (this.otherProducts.includes(value)) {
            this.productsOthersErr = lang.dict.get('othersSameValue');
            return;
        }

        this.contractor.addProduct(ContractorProduct.create(
            {
                other: this.currentProduct,
                productUnitId: 0,
            },
        ));

        this.currentProduct = '';
        this.productsOthersErr = '';
    };

    handleServicesOthers = (value: string) => {
        this.currentServices = value;
    };

    addServicesOthers = () => {
        const value = this.currentServices.trim();

        if (value.length === 0) {
            return;
        }

        if (this.otherServices.includes(value)) {
            this.servicesOthersErr = lang.dict.get('othersSameValue');
            return;
        }

        this.contractor.addService(ContractorService.create(
            {
                other: this.currentServices,
                serviceUnitId: 0,
            },
        ));

        this.currentServices = '';
        this.servicesOthersErr = '';
    };
}
