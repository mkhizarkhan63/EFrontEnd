import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Close, Input, SideModal } from '~/bits';
import type { CompanyType, EmployeeType } from '~/models';
import { hook } from '~/utils';
import { EditEmployeeVm } from './EditEmployee.vm';

type Props = {
    employee?: EmployeeType;
    company: CompanyType;
    closeModal: () => void;
};

export const EditEmployee = observer(({ closeModal, employee, company }: Props) => {
    if (!employee) {
        return null;
    }

    const vm = hook.useVm(() => new EditEmployeeVm(employee, company));

    return (
        <SideModal variant="edit-employee" onBlur={closeModal}>
            <div className="side-modal__header">
                <Close onClick={closeModal} />
                <p className="side-modal__header-title">{lang.dict.get('editEmployee')}</p>
            </div>
            <div className="side-modal__content">
                <div className="employee-box">
                    <img className="employee-box__img" src={employee.avatar?.url} alt="avatar" />
                    <div className="employee-box__data">
                        <p className="employee-box__name">{employee.name}</p>
                        <p className="employee-box__role">{lang.dict.enum('affiliationType', employee.affiliationType)}</p>
                    </div>
                </div>
                <div className="side-modal__form">
                    <Input.Text
                        placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                        name={lang.dict.get('employeePhone')}
                        value={employee.phone}
                        isDisabled={true}
                    />
                    <Input.Multiple
                        type="radio"
                        onChange={vm.setCategory}
                        values={vm.relationshipValues}
                    />
                </div>
                <Button
                    color="blue"
                    value={lang.dict.get('goSubmit')}
                    rightImg="next"
                    onClick={vm.save}
                    isLoading={vm.isLoading}
                />
            </div>
        </SideModal>
    );
});
