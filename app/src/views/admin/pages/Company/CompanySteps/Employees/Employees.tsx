import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, ErrorList, Icons, If } from '~/bits';
import type { CompanyType } from '~/models';
import { Modals } from '~/partials';
import { hook } from '~/utils';
import { CompanyOwner } from './CompanyOwner';
import { EmployeesVm } from './Employees.vm';

type Props = {
    company: CompanyType;
    setCompany: (company: CompanyType) => void;
};

export const Employees = observer((props: Props) => {
    const vm = hook.useVm(() => new EmployeesVm(props.company));

    const employees = vm.employees.map(item => (
        <div key={item.id} className="company-employees__table-row">
            <div className="employee">
                <img src={item.avatar?.url ?? ''} alt="" className="employee__img" />
                <div className="employee__desc">
                    <p className="employee__name">{item.name}</p>
                    <p className="employee__type">{item.affiliationType}</p>
                </div>
            </div>
            <div className="employee-contact">
                <div className="employee-contact__item">
                    <a className="employee-contact__link" href={`mailto:${item.email}`}>
                        <Icons icon="email" />
                        {item.email}
                    </a>
                </div>
                <div className="employee-contact__item">
                    <a className="employee-contact__link" href={`tel:${item.phone}`}>
                        <Icons icon="phone" />
                        {item.phone}
                    </a>
                </div>
                <div className="employee-contact__item">
                    <a className="employee-contact__link">
                        <Icons
                            remove={() => vm.delete(item.externalId)}
                            icon="delete"
                        />
                    </a>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="company-employees">
            <div className="top-header">
                <h2 className="top-header__text">
                    {lang.dict.get('employees')}
                    <span className="top-header__text-num">
                        {lang.dict.format('parentheses', [vm.employeesCount])}
                    </span>
                </h2>
                <div className="top-header__right">
                    <div className="search">
                        <Button color="transparent" centerImg="search" />
                    </div>
                    <div className="filter" data-is-filter="filter">
                        <Button color="transparent" centerImg="filter" />
                    </div>
                    <Button
                        color="blue"
                        value={lang.dict.get('addEmployee')}
                        leftImg="add"
                        onClick={vm.openModal}
                    />
                </div>
            </div>
            <div className="company-employees__container">
                <CompanyOwner vm={vm} setCompany={props.setCompany} />
                <div className="company-employees__table">
                    {employees}
                </div>
                <If condition={() => vm.isModalOpened}>
                    <Modals.AddEmployee
                        company={vm.company}
                        closeModal={vm.closeModal}
                    />
                </If>
            </div>
            <ErrorList errors={vm.errorListHolder} />
        </div>
    );
});
