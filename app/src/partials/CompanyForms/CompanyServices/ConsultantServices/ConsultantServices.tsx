import { observer } from 'mobx-react';
import { type ReactElement, useEffect } from 'react';
import { lang, utils, type ErrorListHolder } from '~/api';
import { Button, If, Input, ModelList } from '~/bits';
import type { ConsultantType } from '~/models';
import { hook, preventDefault } from '~/utils';
import { ConsultantServicesVm } from './ConsultantServices.vm';

type Props = {
    consultant: ConsultantType;
    buttons: ReactElement;
    errorListHolder: ErrorListHolder;
    submitAction?: () => void;
};

type SupervisionProps = {
    vm: ConsultantServicesVm['governorates'][number];
    context: {
        consultant: ConsultantType;
    };
    index: number;
};

type DesignProps = {
    vm: ReturnType<ConsultantServicesVm['getListArchitectural']>[number];
    index: number;
};

type PropsChildren = {
    vm: ConsultantServicesVm;
};

const DesignPrice = observer(({ vm }: DesignProps) => {
    useEffect(() => {
        setTimeout(() => {
            vm.current.setLandSizeFrom('0');
        });
    }, []);

    return (
        <>
            <div className="input-group__row">
                <Input.Text
                    value={utils.toInputNumber(vm.current.landSizeFrom, -1, '')}
                    placeHolder={lang.dict.get('omrM2')}
                    isDisabled={true}
                />
                <span className="input-group__row-sign">-</span>
                <Input.Text
                    value={utils.toInputNumber(vm.current.landSizeTo)}
                    onChange={vm.current.setLandSizeTo}
                    placeHolder={lang.dict.get('omrM2')}
                />
                <span className="input-group__row-sign">=</span>
                <Input.Text
                    value={utils.toInputNumber(vm.current.price)}
                    onChange={vm.current.setPrice}
                    placeHolder={lang.dict.get('omrM2')}
                />
            </div>
        </>
    );
});

const DesignItems = observer(({ vm }: PropsChildren) => {
    const items = vm.listOfDesignServices.map(item => (
        <div key={item.id.asStr()} className="input-group__row">
            <img src={item.iconPath} className="input-group__row-img" />
            <p className="input-group__row-text">{item.name}</p>
        </div>
    ));

    return <> {items} </>;
});

const DesignProduct = observer(({ vm }: PropsChildren) => {
    const products = vm.listOfProductsService.map(item => (
        <div
            key={item.id.asStr()}
            className="product-list__item"
            data-name={item.id.asNumber()}
        >
            <Input.Checkbox
                type="check"
                name={vm.getName(item.id)}
                isChecked={vm.isProductCheck(item.id)}
                onChange={vm.setIsProductChecked(item.id)}
            />
            <Input.Text
                value={vm.productPrice(item.id)}
                onChange={vm.setProductPrice(item.id)}
                placeHolder={lang.dict.get('fieldPriceM2')}
                isDisabled={!vm.isProductCheck(item.id)}
            />
        </div>
    ));

    return <>{products}</>;
});

const DesignPrices = observer(({ vm }: PropsChildren) => (
    <div className="input-group">
        <div className="input-group__left">
            <p className="input-group__left-title">{lang.dict.get('services')}</p>
            <DesignItems vm={vm} />
        </div>
        <div className="input-group__right">
            <div className="input-group__row input-group__row--headers">
                <p className="input-group__title-from">{lang.dict.get('from')}</p>
                <p className="input-group__title-to">{lang.dict.get('to')}</p>
                <p className="input-group__title-price">{lang.dict.get('price')}</p>
            </div>
            <ModelList
                itemRender={DesignPrice}
                modelsList={vm.getListArchitectural()}
                context={{}}
            />
            <div className="input-group__row input-group__row--last">
                <div className="input-group__text">
                    {lang.dict.get('every')}
                </div>
                <Input.Text
                    value={utils.toInputNumber(vm.consultant.everyDesignPackageSize)}
                    onChange={vm.consultant.setEverySize}
                    placeHolder={lang.dict.get('omrM2')}
                />
                <span className="input-group__row-sign">=</span>
                <Input.Text
                    value={utils.toInputNumber(vm.consultant.everyDesignPackagePrice)}
                    onChange={vm.consultant.setEveryPrice}
                    placeHolder={lang.dict.get('omrM2')}
                />
            </div>
        </div>
    </div>
));

const DesignService = observer(({ vm }: PropsChildren) => (
    <div className="design-service">
        <p className="form__subheader">
            {lang.dict.get('addYourPriceForArchitectural')}
        </p>
        <div>
            <DesignPrices vm={vm} />
        </div>
        <div className="product-list">
            <p className="form__subheader">
                {lang.dict.get('checkProductsProvidedConsultants')}
                <span className="form__optional-text">
                    {lang.dict.get('fieldOptional')}
                </span>
            </p>
            <DesignProduct vm={vm} />
        </div>
    </div>
));

const Governate = observer(({ vm, context, index }: SupervisionProps) => {
    const row = vm.wilayatEntries.map((item, i) => (
        <div key={item.id} className="governorate__row">
            <Input.Checkbox
                type="check"
                isChecked={vm.isChecked(i)}
                onChange={value => vm.setIsChecked(i, value)}
            />
            <Input.Select
                values={vm.listOfWilayats}
                value={item.wilayatId}
                onChange={wilayatId => vm.setWilayat(item.id, wilayatId)}
            />
            <Input.Text
                placeHolder={lang.dict.get('writeOmrVisit')}
                onChange={value => vm.setPrice(item.id, value)}
                value={utils.toInputNumber(item.price)}
            />
        </div>
    ));

    const missingLength = 8 - row.length;

    for (let i = 0; i < missingLength; i++) {
        row.push(
            <div key={`empty-${i}`} className="governorate__row">
                <Input.Checkbox
                    type="check"
                    isChecked={false}
                    onChange={value => vm.setIsChecked(-1, value)}
                />
                <Input.Select
                    values={[]}
                    isDisabled={true}
                />
                <Input.Text
                    placeHolder={lang.dict.get('writeOmrVisit')}
                    isDisabled={true}
                />
            </div>,
        );
    }

    return (
        <div className="governorate">
            <p className="governorate__title">
                {lang.dict.get('governate')} {index + 1}
                <If condition={() => index !== 0}>
                    <Button
                        centerImg="close"
                        color="gray"
                        isCircle={true}
                        hasOutline={true}
                        onClick={() => context.consultant.removeGovernorate(vm.id)}
                    />
                </If>
            </p>
            <Input.Select
                values={context.consultant.governoratesList}
                value={vm.governorateId}
                onChange={vm.setGovernorateId}
            />
            <div className="governorate__title-row">
                <p>{lang.dict.get('projectCreatorWilayat')}</p>
                <p>{lang.dict.get('pricePerVisitOmr')}</p>
            </div>
            {row}
        </div>
    );
});

const SupervisionService = observer(({ vm }: PropsChildren) => (
    <>
        <div>
            <p className="form__subheader">
                {lang.dict.get('pricesAreForProjects')}
            </p>
            <div className="form__add">
                <p className="form__section-subheader">
                    {lang.dict.get('addGovernate')}
                </p>
                <Button
                    centerImg="add"
                    color="blue"
                    hasOutline={true}
                    isCircle={true}
                    onClick={vm.consultant.addEmptyGovernorate}
                />
            </div>
        </div>
        <div className="governorates">
            <ModelList
                itemRender={Governate}
                modelsList={vm.governorates}
                context={{ consultant: vm.consultant }}
            />
        </div>
    </>
));

export const ConsultantServices = observer((props: Props) => {
    const {
        consultant,
        buttons,
        errorListHolder,
        submitAction,
    } = props;

    const vm = hook.useVm(() => new ConsultantServicesVm(consultant, errorListHolder));

    hook.useAutoFocus();

    return (
        <div className="company-forms company-forms--consultant-services">
            <form
                className="form"
                onSubmit={preventDefault(submitAction)}
            >
                <p className="form__header">
                    {lang.dict.get('doYouProvideDesignService')}
                </p>
                <Input.Checkbox
                    onChange={vm.consultant.setIsProvideDesign}
                    type="radio"
                    text={{
                        first: lang.dict.get('switchYes'),
                        second: lang.dict.get('switchNo'),
                    }}
                    isChecked={vm.consultant.isProvideDesign}
                />
                <If condition={() => vm.consultant.isProvideDesign}>
                    <DesignService vm={vm} />
                </If>
                <div className="supervision-services">
                    <p className="form__header">
                        {lang.dict.get('doYouProvideSupervisionServices')}
                    </p>
                    <Input.Checkbox
                        onChange={vm.consultant.setIsProvideSupervision}
                        type="radio"
                        text={{
                            first: lang.dict.get('switchYes'),
                            second: lang.dict.get('switchNo'),
                        }}
                        isChecked={vm.consultant.isProvideSupervision}
                    />
                    <If condition={() => vm.consultant.isProvideSupervision}>
                        <SupervisionService vm={vm} />
                    </If>
                </div>
                <div className="form__btns">
                    {buttons}
                </div>
            </form>
        </div>
    );
});
