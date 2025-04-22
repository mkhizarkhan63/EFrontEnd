import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Icons, If } from '~/bits';
import { type EmployeeType } from '~/models';
import { Modals } from '~/partials';
import { hook } from '~/utils';
import { EditEmployee } from './EditEmployee';
import { Logs } from './Logs';
import { ManageEmployeesVm } from './ManageEmployees.vm';

const ifEmployeeIsActive = (
    vm: ManageEmployeesVm,
    employee: EmployeeType,
) => {
    if (employee.status === E.LinkedProfileStatus.pending) {
        return (
            <div className="employee__action">
                <p className="employee__action-question">
                    {lang.dict.get('employeesDoYouAcceptUser')}
                </p>
                <div className="employee__action-buttons">
                    <Button
                        color="white"
                        hasOutline={true}
                        value={lang.dict.get('switchNo')}
                        onClick={() => vm.reject(employee.externalId)}
                    />
                    <Button
                        color="blue"
                        value={lang.dict.get('switchYes')}
                        onClick={() => vm.accept(employee)}
                    />
                </div>
            </div>
        );
    }

    return (
        <Button
            color="white"
            hasOutline={true}
            value={lang.dict.get('employeesViewActivity')}
            onClick={() => vm.openModal(employee.id, 'log')}
        />
    );
};

export const ManageEmployees = observer(() => {
    const vm = hook.useVm(() => new ManageEmployeesVm());

    if (!vm.company) {
        return null;
    }

    const modal = () => {
        if (!vm.company) {
            return null;
        }

        if (!vm.modal.id) {
            return (
                <Modals.AddEmployee
                    closeModal={vm.closeModal}
                    company={vm.company}
                />
            );
        }

        return vm.modal.type === 'log'
            ? (
                <Logs
                    closeModal={vm.closeModal}
                    employee={vm.employee}
                    logs={vm.logs}
                />
            )
            : (
                <EditEmployee
                    closeModal={vm.closeModal}
                    company={vm.company}
                    employee={vm.employee}
                />
            );
    };

    const employee = vm.company.employees.data.map(item => {
        const canEdit = item.status !== E.LinkedProfileStatus.pending
            && item.affiliationType !== E.AffiliationType.owner;

        return (
            <div
                className="employee"
                key={`employee-${item.id}`}
            >
                <If condition={canEdit}>
                    <div className="employee__icons">
                        <div
                            className="employee__icon employee__icon--delete"
                            onClick={() => vm.delete(item.externalId)}
                        >
                            <Icons icon="delete" />
                        </div>
                        <div
                            className="employee__icon employee__icon--edit"
                            onClick={() => vm.openModal(item.id, 'edit')}
                        >
                            <Icons icon="edit" />
                        </div>
                    </div>
                </If>
                <div className="employee__avatar">
                    <img src={item.avatar?.url} alt="avatar" />
                </div>
                <p className="employee__desc">{item.name}</p>
                <a
                    href={`tel:${item.phone}`}
                    className="employee__desc employee__desc--phone"
                >
                    {item.phone}
                </a>
                <p className="employee__category">
                    {lang.dict.enum('affiliationType', item.affiliationType)}
                </p>
                {ifEmployeeIsActive(vm, item)}
            </div>
        );
    });

    return (
        <div className="contractor-settings contractor-settings--manage-employees">
            <div className="contractor-settings__top">
                <h2 className="contractor-settings__header">
                    {lang.dict.get('employeesManageEmployees')}
                </h2>
                <Button
                    color="white"
                    hasOutline={true}
                    leftImg="add"
                    value={lang.dict.get('employeeAdd')}
                    onClick={() => vm.openModal()}
                />
            </div>
            <div className="employees">
                {employee}
            </div>
            <If condition={() => vm.modal.isOpen}>
                {modal()}
            </If>
            <p className="ownership-note">
                {lang.dict.get('ownershipNote1')}&nbsp;
                <a
                    className="ownership-note__link"
                    href="mailto: admin@ebina.com"
                >
                    {lang.dict.get('supportEmail')}
                </a>&nbsp;
                {lang.dict.get('ownershipNote2')}&nbsp;
                <a
                    className="ownership-note__link"
                    href="tel:77553010"
                >
                    77553010
                </a>
            </p>
        </div>
    );
});
