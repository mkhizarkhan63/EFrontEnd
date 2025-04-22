import { observer } from 'mobx-react';
import moment from 'moment';
import type { ReactElement } from 'react';
import { lang, utils, type ErrorListHolder } from '~/api';
import { Button, If, Input, ModelList } from '~/bits';
import type { CompanyType } from '~/models';
import { hook, preventDefault, utilsDate } from '~/utils';
import { CompanyReferencesVm } from './CompanyReferences.vm';

type Props = {
    company: CompanyType;
    buttons: ReactElement;
    errorListHolder: ErrorListHolder;
    submitAction?: () => void;
};

type ClientProps = {
    vm: ReturnType<CompanyReferencesVm['getList']>[number];
    index: number;
};

const Client = observer(({ vm, index }: ClientProps) => (
    <div className="client">
        <p className="client__title">
            {lang.dict.get('clientReference')} {index + 1}
            <If condition={() => index >= 2}>
                <Button
                    centerImg="close"
                    color="gray"
                    isCircle={true}
                    hasOutline={true}
                    onClick={vm.remove}
                />
            </If>
        </p>
        <Input.Text
            name={lang.dict.get('clientName')}
            value={vm.current.clientName}
            onChange={vm.setName}
            placeHolder={lang.dict.get('fieldTypeHere')}
        />
        <Input.Text
            value={vm.current.phoneNumber}
            name={lang.dict.get('fieldPhoneNumber')}
            onChange={vm.setPhone}
            placeHolder={lang.dict.get('fieldTypeHere')}
        />
        <Input.Select
            name={lang.dict.get('governorate')}
            description={lang.dict.get('fieldOptional')}
            value={vm.current.governorateId}
            values={vm.governorates}
            onChange={vm.setGovernorate}
        />
        <Input.Select
            name={lang.dict.get('wilayat')}
            description={lang.dict.get('fieldOptional')}
            value={vm.current.wilayatId}
            values={vm.current.wilayatsList}
            onChange={vm.setWilayat}
        />
        <Input.Text
            name={lang.dict.get('fieldProjectValue')}
            description={lang.dict.get('fieldOptional')}
            value={utils.toInputNumber(vm.current.projectValue)}
            onChange={vm.setValue}
            placeHolder={lang.dict.get('fieldTypeHere')}
        />
        <Input.Select
            name={lang.dict.get('projectCreatorProjectType')}
            value={vm.current.projectType}
            values={vm.projectType}
            onChange={vm.setType}
        />
        <Input.DateSelect
            name={lang.dict.get('projectStartDate')}
            value={vm.current.projectStartDate}
            onChange={vm.setStartDate}
            placeHolder={lang.dict.get('fieldWriteDate')}
            max={moment().add(-1, 'days')}
            min={moment().add(-20, 'years')}
        />
        <Input.DateSelect
            name={lang.dict.get('projectCompletionDate')}
            description={lang.dict.get('fieldOptional')}
            value={utilsDate.dateValidation(vm.current.projectCompletionDate)}
            onChange={vm.setEndDate}
            placeHolder={lang.dict.get('fieldWriteDate')}
            max={moment()}
            min={moment(vm.current.minimumEndDate).add(1, 'days')}
            isDisabled={Boolean(!vm.current.projectStartDate)}
        />
    </div>
));

export const CompanyReferences = observer((props: Props) => {
    const {
        company,
        buttons,
        errorListHolder,
        submitAction,
    } = props;

    const vm = hook.useVm(() => new CompanyReferencesVm(company, errorListHolder));

    hook.useAutoFocus();

    return (
        <div className="company-forms company-forms--references">
            <form
                className="form"
                onSubmit={preventDefault(submitAction)}
            >
                <h2 className="form__header">
                    {lang.dict.get('clientReferences')}
                    <Button
                        centerImg="add"
                        color="blue"
                        hasOutline={true}
                        isCircle={true}
                        onClick={vm.company.addClient}
                    />
                </h2>
                <p className="form__optional-text">
                    ({lang.dict.get('minTwoClientReferences')})
                </p>
                <ModelList
                    itemRender={Client}
                    modelsList={vm.getList()}
                    context={{}}
                />
                <div className="form__btns">
                    {buttons}
                </div>
            </form>
        </div>
    );
});
