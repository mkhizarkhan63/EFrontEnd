import { observer } from 'mobx-react';
import type { ReactElement } from 'react';
import { lang, type ErrorListHolder } from '~/api';
import { Input } from '~/bits';
import type { ContractorType } from '~/models';
import { hook, preventDefault } from '~/utils';
import { ContractorServicesVm } from './ContractorServices.vm';

type Props = {
    contractor: ContractorType;
    buttons: ReactElement;
    errorListHolder: ErrorListHolder;
    submitAction?: () => void;
};

export const ContractorServices = observer((props: Props) => {
    const {
        contractor,
        buttons,
        errorListHolder,
        submitAction,
    } = props;

    const vm = hook.useVm(() => new ContractorServicesVm(
        contractor,
        errorListHolder,
    ));

    hook.useAutoFocus();

    return (
        <div className="company-forms company-forms--contractor-services">
            <form
                className="form"
                onSubmit={preventDefault(submitAction)}
            >
                <h2 className="form__header">
                    {lang.dict.get('productAndServices')}
                </h2>
                <div className="form__content">
                    <p className="form__subheader">
                        {lang.dict.get('checkProductsProvider')}
                    </p>
                    <Input.Multiple
                        values={vm.checkProducts}
                        onChange={contractor.setProducts}
                    />
                    <Input.ArrayStrings
                        name={lang.dict.get('organizationOthers')}
                        listValues={vm.otherProducts}
                        value={vm.currentProduct}
                        placeHolder={lang.dict.get('inputWriteHere')}
                        onChange={vm.handleProductsOthers}
                        addItem={vm.addProductsOthers}
                        deleteItem={contractor.removeOtherProduct}
                        error={vm.productsOthersErr}
                    />
                    <p className="form__subheader form__subheader--border">
                        {lang.dict.get('checkServicesProvided')}
                    </p>
                    <Input.Multiple
                        values={vm.checkServices}
                        onChange={contractor.setServices}
                    />
                    <Input.ArrayStrings
                        name={lang.dict.get('organizationOthers')}
                        listValues={vm.otherServices}
                        value={vm.currentServices}
                        placeHolder={lang.dict.get('inputWriteHere')}
                        onChange={vm.handleServicesOthers}
                        addItem={vm.addServicesOthers}
                        deleteItem={contractor.removeOtherService}
                        error={vm.servicesOthersErr}
                    />
                </div>
                <div className="form__btns">
                    {buttons}
                </div>
            </form>
        </div>
    );
});
