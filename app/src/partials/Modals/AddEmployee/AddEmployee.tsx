import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Close, ErrorList, Input, SideModal } from '~/bits';
import { type CompanyType } from '~/models';
import { hook } from '~/utils';
import { AddEmployeeVm } from './AddEmployee.vm';

type Props = {
    company: CompanyType;
    closeModal: () => void;
};

export const AddEmployee = observer(({ company, closeModal }: Props) => {
    const vm = hook.useVm(() => new AddEmployeeVm(company, closeModal));

    return (
        <SideModal variant="add-employee" onBlur={closeModal}>
            <div className="side-modal__header">
                <Close onClick={closeModal} />
                <p className="side-modal__header-title">{lang.dict.get('addEmployee')}</p>
            </div>
            <div className="side-modal__content">
                <div className="side-modal__form">
                    <Input.Text
                        placeHolder={lang.dict.get('fieldPhoneNumber')}
                        name={lang.dict.get('employeePhone')}
                        value={vm.phone}
                        onChange={vm.setPhone}
                    />
                    <Input.Multiple
                        type="radio"
                        onChange={vm.setCategory}
                        values={vm.relationshipValues}
                    />
                </div>
                <Button
                    color="blue"
                    value={lang.dict.get('addEmployee')}
                    rightImg="next"
                    onClick={vm.addEmployee}
                />
            </div>
            <ErrorList
                messages={vm.messages}
                errors={vm.errorListHolder}
            />
            <ErrorList
                errors={vm.errorList}
            />
        </SideModal>
    );
});
