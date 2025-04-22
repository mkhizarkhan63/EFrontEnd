import { observer } from 'mobx-react';
import type { ReactElement } from 'react';
import { E, lang, utils, type ErrorListHolder } from '~/api';
import { Button, If, Input, ModelList } from '~/bits';
import type { CompanyType, ContractorCompanyType, ContractorType } from '~/models';
import { hook, preventDefault } from '~/utils';
import { CompanyResourceVm } from './CompanyResource.vm';
import { ProfileRegistrationVm } from '~/views/ProfileRegistration/ProfileRegistration.vm';

type Props = {
    company: CompanyType;
    contractor?: ContractorType;
    buttons: ReactElement;
    errorListHolder: ErrorListHolder;
    submitAction?: () => void;
    ProfileVm?: ProfileRegistrationVm;
};

type CompanyProps = {
    index: number;
    remove: () => void;
    vm: ContractorCompanyType;
};

type WorkerProps = {
    vm: ReturnType<CompanyResourceVm['getContextList']>[number];
    index: number;
};

type MachineryProps = {
    vm: ReturnType<CompanyResourceVm['getMachineries']>[number];
    index: number;
};

type ForContractorProps = {
    contractor?: ContractorType;
};

// type MemberShipServiceType = {
//     // service: E.MembershipServiceType;
//     profileVm: ProfileRegistrationVm;
// }

const Company = observer(({ vm, index, remove }: CompanyProps) => (
    <div className="company">
        <p className="company__title">
            {lang.dict.get('company')} {index + 1}
        </p>
        <If condition={() => index !== 0}>
            <Button
                centerImg="close"
                color="gray"
                isCircle={true}
                hasOutline={true}
                onClick={remove}
            />
        </If>
        <Input.Text
            name={lang.dict.get('fieldCompanyName')}
            placeHolder={lang.dict.get('fieldTypeHere')}
            onChange={value => vm.setCompanyName(value)}
            value={vm.companyName}
        />
        <Input.Text
            name={lang.dict.get('crNumber')}
            placeHolder={lang.dict.get('fieldTypeHere')}
            onChange={value => vm.setCrNumber(value)}
            value={vm.crNumber}
        />
        <Input.Text
            name={lang.dict.get('manPower')}
            placeHolder={lang.dict.get('fieldExample')}
            onChange={value => vm.setManPower(value)}
            value={utils.toInputNumber(vm.manPower)}
        />
        <Input.Text
            name={lang.dict.get('typeOfServicesAndProduct')}
            placeHolder={lang.dict.get('inputWriteHere')}
            onChange={value => vm.setServiceOrProduct(value)}
            value={vm.typeOfServiceOrProduct}
        />
    </div>
));

const Worker = observer(({ vm, index }: WorkerProps) => (
    <div className="input-container">
        <Input.Select
            onChange={vm.current.setSpec}
            value={vm.current.specializationId}
            values={vm.specList}
        />
        <Input.Text
            placeHolder={lang.dict.format('max', [vm.max])}
            onChange={val => vm.current.setNumberOfUnit(val, vm.max)}
            value={utils.toInputNumber(vm.current.numberOfUnit)}
        />
        <If condition={() => vm.isOptional ?? index > 0}>
            <Button
                centerImg="close"
                color="gray"
                isCircle={true}
                hasOutline={true}
                onClick={vm.remove}
            />
        </If>
    </div>
));

const Machinery = observer(({ vm }: MachineryProps) => (
    <div className="input-container">
        <Input.Text
            placeHolder={lang.dict.get('fieldTypeHere')}
            onChange={vm.current.setNameOfMachinery}
            value={vm.current.machine}
        />
        <Input.Text
            onChange={val => vm.current.setNumberOfUnit(val, 100)}
            value={utils.toInputNumber(vm.current.numberOfUnit)}
            placeHolder={lang.dict.format('max', [100])}
        />
        <Button
            centerImg="close"
            color="gray"
            isCircle={true}
            hasOutline={true}
            onClick={vm.remove}
        />
    </div>
));

const ForContractor = observer(({ contractor }: ForContractorProps) => {
    if (!contractor) {
        return null;
    }

    return (
        <>
            <p className="form__row-item-text">
                {lang.dict.get('doYouHaveOtherContracting')}
            </p>
            <Input.Checkbox
                onChange={contractor.setOtherContractingCompanies}
                type="radio"
                text={{
                    first: lang.dict.get('switchYes'),
                    second: lang.dict.get('switchNo'),
                }}
                isChecked={contractor.otherContractingCompanies}
            />
            <If condition={() => contractor.otherContractingCompanies}>
                <div className="form__add">
                    <p className="form__row-item-text">
                        {lang.dict.get('pleaseListYouOtherCompanies')}
                    </p>
                    <Button
                        centerImg="add"
                        color="blue"
                        isCircle={true}
                        hasOutline={true}
                        onClick={contractor.addNewCompany}
                    />
                </div>
                <ModelList
                    itemRender={Company}
                    modelsList={contractor.companies}
                    onRemove={contractor.removeCompany}
                    context={contractor}
                />
            </If>
        </>
    );
});

const ForConstruction = observer((vm: CompanyResourceVm) => (
    <div>
        <div className="form__add">
            <p className="form__add-title">
                {lang.dict.get('engineerTeam')}
            </p>
            <If condition={() => vm.getContextListPair(E.ResourceType.engineer).length < 4}>
                <Button
                    centerImg="add"
                    color="blue"
                    isCircle={true}
                    hasOutline={true}
                    onClick={() => vm.company.addNewResource(E.ResourceType.engineer)}
                />
            </If>
        </div>
    </div>
));

// const ServiceBasedForm = observer(({ profileVm }: MemberShipServiceType) => {
//     const selectedServices = profileVm.selectedServices;
//     if (profileVm) {
//         const services = selectedServices?.map(x => {

//             switch (x) {

//                 case E.MembershipServiceType.construction:
//                     return (
//                         { ForConstruction }
//                     );

//                 default:
//                     return null;
//             }

//         });
//         return <div>{services}</div>;
//     }
//     return <></>

// });

export const CompanyResource = observer((props: Props) => {
    const {
        company,
        contractor,
        buttons,
        errorListHolder,
        submitAction,
        ProfileVm,
    } = props;

    const vm = hook.useVm(() => new CompanyResourceVm(company, errorListHolder, contractor));

    hook.useAutoFocus();
    const selectedServices = ProfileVm?.selectedServices;

    return (
        <div className="company-forms company-forms--resource">
            <form
                className="form"
                onSubmit={preventDefault(submitAction)}
            >
                <h2 className="form__header">
                    {lang.dict.get('resources')}
                </h2>
                {/* <div className="form__row">
                    <div className="form__row-item">
                        <Input.Textarea
                            name={lang.dict.get('whatMeasuresDoYouUse')}
                            placeHolder={lang.dict.get('fieldWriteComment')}
                            onChange={vm.company.setMeasuresToMaintainQuality}
                            value={vm.company.measuresToMaintainQuality}
                            description={lang.dict.get('fieldOptional')}
                        />
                    </div>
                    <div className="form__row-item">
                        <p className="form__row-item-text">
                            {lang.dict.get('whatPlanningSoftware')}&nbsp;
                            <span className="form__row-item-text-optional">
                                {lang.dict.get('fieldOptional')}
                            </span>
                        </p>
                        <Input.Multiple
                            onChange={company.setPlanningSoftware}
                            values={vm.planningSoftware}
                        />
                        <If condition={() => Boolean(vm.hasOther)}>
                            <Input.Textarea
                                placeHolder={lang.dict.get('fieldPleaseSpecify')}
                                onChange={vm.company.setOtherPlanningSoftware}
                                value={vm.company.otherPlanningSoftware}
                            />
                        </If>
                    </div>
                </div> */}
                {/* <If condition={() => Boolean(contractor)}>
                    <ForContractor contractor={contractor} />
                </If> */}
                <div className="form-resources">
                    {/* <h2 className="form__header">
                        {lang.dict.get('resources')}
                    </h2>
                    <p className="form__optional-text">
                        {lang.dict.get('listResourcesOfAll')}
                    </p> */}
                    <div className="form__add">
                        <p className="form__add-title">
                            {lang.dict.get('engineerTeam')}
                        </p>
                        <If condition={() => vm.getContextListPair(E.ResourceType.engineer).length < 4}>
                            <Button
                                centerImg="add"
                                color="blue"
                                isCircle={true}
                                hasOutline={true}
                                onClick={() => vm.company.addNewResource(E.ResourceType.engineer)}
                            />
                        </If>
                    </div>
                    <div className="input-container-labels">
                        <span>{lang.dict.get('engineerSpecialization')}</span>
                        <span>{lang.dict.get('numberOfEngineers')}</span>
                    </div>
                    <ModelList
                        itemRender={Worker}
                        modelsList={vm.getContextListPair(E.ResourceType.engineer)}
                        context={{}}
                    />


                    {/*                     
                    <If condition={Boolean(contractor)}>
                        <div className="form__add">
                            <p className="form__add-title">
                                {lang.dict.get('labors')}
                            </p>
                            <If condition={() => vm.getContextListPair(E.ResourceType.labors).length < 5}>
                                <Button
                                    centerImg="add"
                                    color="blue"
                                    isCircle={true}
                                    hasOutline={true}
                                    onClick={() => vm.company.addNewResource(E.ResourceType.labors)}
                                />
                            </If>
                        </div>
                        <div className="input-container-labels">
                            <span>{lang.dict.get('laborsSpecialization')}</span>
                            <span>{lang.dict.get('numberOfLabors')}</span>
                        </div>
                        <ModelList
                            itemRender={Worker}
                            modelsList={vm.getContextListPair(E.ResourceType.labors)}
                            context={{}}
                        />
                    </If> */}
                    <div className="form__add">
                        <p className="form__add-title">
                            {lang.dict.get('management')}
                            &nbsp;
                            <span className="form__optional-text">{lang.dict.get('fieldOptional')}</span>
                        </p>
                        <If condition={() => vm.getContextListPair(E.ResourceType.administration).length < 4}>
                            <Button
                                centerImg="add"
                                color="blue"
                                isCircle={true}
                                hasOutline={true}
                                onClick={() => vm.company.addNewResource(E.ResourceType.administration)}
                            />
                        </If>
                    </div>

                    <If condition={() => vm.getContextListPair(E.ResourceType.administration).length > 0}>
                        <div className="input-container-labels">
                            <span>{lang.dict.get('adminSpecialization')}</span>
                            <span>{lang.dict.get('numberOfAdmins')}</span>
                        </div>
                    </If>
                    <ModelList
                        itemRender={Worker}
                        modelsList={vm.getContextListPair(E.ResourceType.administration)}
                        context={{}}
                    />


                    <If condition={Boolean(selectedServices?.includes(E.MembershipServiceType.construction))}>
                        <div className="form__add">
                            <p className="form__add-title">
                                {lang.dict.get('labors')}
                            </p>
                            <If condition={() => vm.getContextListPair(E.ResourceType.labors).length < 5}>
                                <Button
                                    centerImg="add"
                                    color="blue"
                                    isCircle={true}
                                    hasOutline={true}
                                    onClick={() => vm.company.addNewResource(E.ResourceType.labors)}
                                />
                            </If>
                        </div>
                        <div className="input-container-labels">
                            <span>{lang.dict.get('laborsSpecialization')}</span>
                            <span>{lang.dict.get('numberOfLabors')}</span>
                        </div>
                        <ModelList
                            itemRender={Worker}
                            modelsList={vm.getContextListPair(E.ResourceType.labors)}
                            context={{}}
                        />
                    </If>

                    <If condition={Boolean(selectedServices?.includes(E.MembershipServiceType.construction))}>
                        <div className="form__add">
                            <p className="form__add-title">
                                {lang.dict.get('machinery')}
                                &nbsp;
                                <span className="form__optional-text">{lang.dict.get('fieldOptional')}</span>
                            </p>
                            <Button
                                centerImg="add"
                                color="blue"
                                isCircle={true}
                                hasOutline={true}
                                onClick={() => vm.company.addNewResource(E.ResourceType.machinery)}
                            />
                        </div>
                        <If condition={() => vm.getMachineries().length > 0}>
                            <div className="input-container-labels">
                                <span>{lang.dict.get('machineType')}</span>
                                <span>{lang.dict.get('numberOfMachinery')}</span>
                            </div>
                        </If>
                        <ModelList
                            itemRender={Machinery}
                            modelsList={vm.getMachineries()}
                            context={{}}
                        />
                    </If>
                </div>
                <div className="form__btns">
                    {buttons}
                </div>
            </form>
        </div>
    );
});
