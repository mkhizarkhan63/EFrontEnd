import { observer } from 'mobx-react';
import { PageWithWizard, Management } from '~/partials';
import { hook } from '~/utils';
import { Button, Dropdown, Loading, Menu } from '~/bits';
import { lang, E } from '~/api';
import { UserVm } from './User.vm';
import * as UserSteps from './UserSteps';

type Props = {
    vm: UserVm;
};

type ViewMapProps = {
    subPage: E.AdminUsersPages | false;
    vm: UserVm;
};

const DropdownList = observer(({ vm }: Props) => (
    <>
        <div className="dropped__item">
            <div className="dropped__item-title">
                {lang.dict.get('signedUpOn')}
            </div>
            <div className="dropped__item-text">
                {vm.user.signedUp.format('L')}
            </div>
        </div>
        <div className="dropped__item">
            <div className="dropped__item-title">
                {lang.dict.get('lastActivity')}
            </div>
            <div className="dropped__item-text">
                {vm.user.lastActivity.format('L, LT')}
            </div>
        </div>
    </>
));

const SubheaderContent = observer(({ vm }: Props) => {
    if (!vm.user) {
        return null;
    }

    return (
        <>
            <div className="subheader-item">
                <p className="subheader-item__title">
                    {lang.dict.get('idNumber')}
                </p>
                <p className="subheader-item__text">
                    {vm.user.nationalId}
                </p>
            </div>
            <div className="subheader-item">
                <p className="subheader-item__title">
                    {lang.dict.get('emailId')}
                </p>
                <a href={`mailto:${vm.user.email}`} className="subheader-item__text-contact">
                    {vm.user.email}
                </a>
            </div>
            <div className="subheader-item">
                <p className="subheader-item__title">
                    {lang.dict.get('contactNo')}
                </p>
                <a
                    className="subheader-item__text-contact subheader-item__text-contact--num"
                    href={`tel:${vm.user.mobile}`}
                >
                    {vm.user.mobile}
                </a>
            </div>
            <Dropdown
                content={() => <DropdownList vm={vm} />}
                viewModel={vm.dropdowns.box}
                hideTick={true}
            >
                <Button
                    color="transparent"
                    centerImg="three-dots-vertical"
                />
            </Dropdown>
        </>
    );
});

const createViewMap = ({ subPage, vm }: ViewMapProps) => {
    switch (subPage) {
        case E.AdminUsersPages.projects:
            return () => <Management.Projects projects={() => vm.projects.data} />;
        case E.AdminUsersPages.companyAssociations:
            return () => <UserSteps.CompanyAssociations parentVm={vm} />;
        case E.AdminUsersPages.invoices:
            return () => <Management.Invoices invoices={vm.invoices} />;
        case E.AdminUsersPages.notes:
            return () => <UserSteps.NotesTasks parentVm={vm} />;
        case E.AdminUsersPages.log:
            return () => <UserSteps.Logs parentVm={vm} />;
        default:
            return null;
    }
};

export const User = observer(() => {
    const vm = hook.useVm(() => new UserVm());

    if (vm.isLoading) {
        return <Loading isEnabled={true} />;
    }

    const Component = createViewMap({ subPage: vm.currentPage, vm: vm });
    if (!vm.currentPage || Component === null) {
        setTimeout(() => {
            vm.goBack();
        });
        return <Loading isEnabled={true} />;
    }

    const subheader = {
        hasReturnButton: true,
        returnButton: vm.goBack,
        pageName: '',
        pageSubName: (
            <div className="user">
                <img src={vm.user.avatar?.url} className="user__img" />
                <div className="user__desc">
                    <p className="user__name">{vm.user.name}</p>
                    <p>{vm.user.nameInArabic}</p>
                </div>
            </div>
        ),
    };
    return (
        <div className="user-view">
            <PageWithWizard
                subheader={subheader}
                subheaderContent={<SubheaderContent vm={vm} />}
            >
                <Menu
                    isActive={vm.isMenuItemActive}
                    getItems={() => vm.menuItems}
                />
                <div className="user-view__container">
                    <Component />
                </div>
            </PageWithWizard>
        </div>
    );
});
