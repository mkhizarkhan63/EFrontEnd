import { observer } from 'mobx-react';
import { useRef } from 'react';
import { E, lang } from '~/api';
import {
    Button,
    Dropdown,
    ErrorList,
    If,
    Input,
    Loading,
    Menu,
    Subheader,
} from '~/bits';
import { Management, PageWithSidebar } from '~/partials';
import { hook } from '~/utils';
import { CompanyVm } from './Company.vm';
import { CompanyDetail, Employees, NotesTasks } from './CompanySteps';
import { DeleteModal } from '~/bits/DeleteModal';

type Props = {
    type: E.ProfileType;
};

type VmProps = {
    vm: CompanyVm;
};

const Sidebar = observer(() => (
    <>
        {/* TODO here will be the section with invite */}
    </>
));

const CreateViewMap = observer(({ vm }: VmProps) => {
    if (!vm.company) {
        return null;
    }

    switch (vm.menu) {
        case E.CompanyMenu.detail:
            return <CompanyDetail company={vm.company} setCompany={vm.setCompany} />;
        case E.CompanyMenu.projects:
            return (
                <Management.Projects
                    projects={() => vm.projects.data}
                    statistics={vm.projectsStatistics.data}
                />
            );
        case E.CompanyMenu.employees:
            return <Employees company={vm.company} setCompany={vm.setCompany} />;
        case E.CompanyMenu.invoices:
            return <Management.Invoices invoices={vm.invoices} />;
        case E.CompanyMenu.reviews:
            return <Management.Reviews company={vm.company} />;
        case E.CompanyMenu.notesTasks:
            return <NotesTasks parentVm={vm} />;
        case E.CompanyMenu.historyLog:
            return <Management.HistoryLogs logList={vm.logs.data} />;
        default:
            return null;
    }
});

const CheckList = observer(({ vm }: VmProps) => {
    const items = Object.values(E.CompanySteps).map(item => (
        <div
            key={item}
            className="company-sidebar__checkbox"
            data-is-checked={vm.isChecked(item)}
        >
            <Input.Checkbox
                type="check"
                name={lang.dict.enum('companySteps', item)}
                isChecked={vm.isChecked(item)}
                onChange={() => vm.check(item)}
            />
        </div>
    ));

    return (
        <div className="company-sidebar">
            <div className="company-sidebar__checkboxes">
                {items}
            </div>
            <If condition={() => vm.company?.status === E.CompaniesStatus.adminReview}>
                <div className="company-sidebar__buttons">
                    <Button
                        color="white"
                        leftImg="close-red"
                        value={lang.dict.get('reject')}
                        onClick={() => vm.updateProfileStatus(E.CompaniesStatus.rejected)}
                    />
                    <Button
                        color="green"
                        value={lang.dict.get('approveProfile')}
                        rightImg="next"
                        onClick={() => vm.updateProfileStatus(E.CompaniesStatus.approved)}
                    />
                </div>
            </If>
        </div>
    );
});

export const Company = observer(({ type }: Props) => {
    const vm = hook.useVm(() => new CompanyVm(), [type]);

    const parent = useRef<HTMLDivElement>(null);

    if (vm.isLoading) {
        return <Loading isEnabled={true} />;
    }

    if (!vm.company) {
        return null;
    }

    const DropdownList = () => (
        <>
            <If condition={vm.isApproved}>
                <Button
                    color="white"
                    value={lang.dict.get('reject')}
                    onClick={vm.changeCompanyStatus}
                />
            </If>
            <If condition={vm.isRejected}>
                <Button
                    color="white"
                    value={lang.dict.get('approve')}
                    onClick={vm.changeCompanyStatus}
                />
            </If>
            <Button
                color="white"
                value={lang.dict.get('delete')}
                onClick={vm.openDeleteModal}
            />
        </>
    );

    const subName = (
        <div className="company">
            <img src={vm.company.logoUrl} className="company__image" alt=" " />
            <div className="company__desc">
                <p className="company__name">{vm.subheaderName}</p>
                <div className="status" data-status={vm.company.status}>
                    {lang.dict.enum('companiesStatus', vm.company.status)}
                </div>
            </div>
        </div>
    );

    return (
        <div className="company-management-view" data-status={vm.company.status}>
            <PageWithSidebar
                sidebar={Sidebar}
                pageName="company-creating"
                ref={parent}
            >
                <Subheader
                    returnButton={vm.goBack}
                    hasReturnButton={true}
                    pageNameVariant="inactive"
                    pageName=""
                    pageSubName={subName}
                >
                    <Subheader.Right>
                        <div className="subheader-item">
                            <p className="subheader-item__title">
                                {lang.dict.get('emailId') }
                            </p>
                            <a
                                href={`mailto:${vm.company.email}`}
                                className="subheader-item__text"
                            >
                                {vm.company.email}
                            </a>
                        </div>
                        <div className="subheader-item subheader-item--contact">
                            <p className="subheader-item__title">
                                {lang.dict.get('contactNo') }
                            </p>
                            <a
                                className="subheader-item__text"
                                href={`tel:${vm.company.phone}`}
                            >
                                {vm.company.phone}
                            </a>
                        </div>
                        <Dropdown
                            content={() => <DropdownList />}
                            viewModel={vm.dropdowns.box}
                            hideTick={true}
                        >
                            <div className="dropdown-dots-btn">
                                <Button
                                    color="transparent"
                                    centerImg="three-dots-vertical"
                                />
                            </div>
                        </Dropdown>
                    </Subheader.Right>
                </Subheader>
                <div className="container">
                    <Menu
                        isActive={vm.isMenuItemActive}
                        getItems={() => vm.menuItems}
                    />
                    <CreateViewMap vm={vm} />
                </div>
                <If condition={() => vm.showCheckList}>
                    <CheckList vm={vm} />
                </If>
            </PageWithSidebar>
            <If condition={() => vm.isDeleteModalOpened}>
                <DeleteModal
                    onBlur={vm.closeDeleteModal}
                    onCancel={vm.closeDeleteModal}
                    onDelete={vm.deleteCompany}
                    title={lang.dict.get('deleteCompany')}
                    description={lang.dict.get('deleteWaring')}
                    buttonTitle={lang.dict.get('delete')}
                />
            </If>
            <ErrorList errors={vm.errorListHolder} />
        </div>
    );
});
