import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, ErrorList, Icons, If, Input, InviteModal, SideModal, SortedTable } from '~/bits';
import type { CompanyType } from '~/models';
import { hook, utilsDate, utilsString } from '~/utils';
import { CompaniesVm } from './Companies.vm';
import { DeleteModal } from '~/bits/DeleteModal';

const getColumns = (vm: CompaniesVm) => SortedTable.createColumns<CompanyType>(() => [
    {
        keyName: 'nameIsAscending',
        displayName: lang.dict.get('fieldCompanyName'),
        size: 1.78,
        render: item => (
            <div className="companies">
                <img src={item.logoUrl} alt=" " className="companies__img" />
                <div className="companies__desc">
                    <p className="companies__name">
                        {item.name}
                    </p>
                    <p className="companies__type">
                        {utilsString.capitalize(item.type)}
                    </p>
                </div>
            </div>
        ),
    },
    {
        keyName: 'pendingPayments',
        displayName: lang.dict.get('pendingPayments'),
        size: 1,
        align: 'right' as const,
        render: item => (
            <div className="payments">
                {item.pendingPayments} {lang.dict.get('fieldOmr')}
            </div>
        ),
    },
    {
        keyName: 'projectParticipatedIsAscending',
        displayName: lang.dict.get('projectsParticipated'),
        size: 1.2,
        align: 'right' as const,
        render: item => <div className="participated">{item.projectsParticipated}</div>,
    },
    {
        keyName: 'projectAwardedIsAscending',
        displayName: lang.dict.get('projectsAwarded'),
        size: 1,
        align: 'right' as const,
        render: item => <div className="awarded">{item.projectsAwarded}</div>,
    },
    {
        keyName: 'lastActivityIsAscending',
        displayName: lang.dict.get('lastActivity'),
        size: 1.2,
        align: 'right' as const,
        render: item => (
            <div className="activity">
                {utilsDate.printDate(item.lastActivity)}
            </div>
        ),
    },
    {
        keyName: 'statusIsAscending',
        displayName: lang.dict.get('status'),
        size: 1.24,
        render: item => (
            <div
                className="status"
                data-status={item.status}
            >
                {lang.dict.enum('companiesStatus', item.status)}
            </div>
        ),
    },
    {
        keyName: 'viewDetails',
        displayName: lang.dict.get('action'),
        align: 'right' as const,
        size: .6,
        render: item => (
            <>
                <Button
                    color="transparent"
                    value={lang.dict.get('viewDetail')}
                    onClick={vm.showDetails(item.id, item.type)}
                />
                <Button
                    color="transparent"
                    value={lang.dict.get('delete')}
                    onClick={() => vm.openDeleteModal(item.id)}
                />
            </>
        ),
    },
]);

export const Companies = observer(() => {
    const vm = hook.useVm(() => new CompaniesVm());

    return (
        <div className="companies-management">
            <div className="top-header">
                <h1 className="top-header__text">
                    {lang.dict.get('companiesManagement')}
                    <span className="top-header__text-optional">
                        ({vm.companiesAmount})
                    </span>
                </h1>
                <div className="top-header__right">
                    <div className="search">
                        <Input.Text
                            value={vm.searchValue}
                            placeHolder={lang.dict.get('companyName')}
                            onChange={vm.setSearchValue}
                        />
                        <Icons icon="search" />
                    </div>
                    <div className="invite-company">
                        <Button
                            color="blue"
                            leftImg="add"
                            value={lang.dict.get('inviteCompany')}
                            onClick={vm.addInvite}
                        />
                        <If condition={() => vm.isOpen} >
                            <SideModal
                                variant="review"
                                onBlur={vm.addInvite}
                            >
                                <InviteModal
                                    onClose={vm.addInvite}
                                    mobileNumber={vm.invite?.mobileNumber ?? ''}
                                    setMobile={vm.setMobile}
                                    email={vm.invite?.email ?? ''}
                                    setEmail={vm.setEmail}
                                    companyName={vm.invite?.companyName ?? ''}
                                    setCompanyName={vm.setCompanyName}
                                    setInvite={vm.setInvite}
                                />
                            </SideModal>
                        </If>
                    </div>
                </div>
            </div>
            <div className="statuses">
                <div className="statuses__item">
                    <p className="statuses__title">
                        {lang.dict.enum('companiesStatus', E.CompaniesStatus.draft)}
                    </p>
                    <span className="statuses__number statuses__number--gray">
                        {vm.statistics.draftCount}
                    </span>
                </div>
                <div className="statuses__item">
                    <p className="statuses__title">
                        {lang.dict.enum('companiesStatus', E.CompaniesStatus.invited)}
                    </p>
                    <span className="statuses__number statuses__number--yellow">
                        {vm.statistics.invitedCount}
                    </span>
                </div>
                <div className="statuses__item">
                    <p className="statuses__title">
                        {lang.dict.enum('companiesStatus', E.CompaniesStatus.adminReview)}
                    </p>
                    <span className="statuses__number statuses__number--red">
                        {vm.statistics.reviewCount}
                    </span>
                </div>
                <div className="statuses__item">
                    <p className="statuses__title">
                        {lang.dict.enum('companiesStatus', E.CompaniesStatus.approved)}
                    </p>
                    <span className="statuses__number statuses__number--green">
                        {vm.statistics.approvedCount}
                    </span>
                </div>
                <div className="statuses__item">
                    <p className="statuses__title">
                        {lang.dict.enum('companiesStatus', E.CompaniesStatus.rejected)}
                    </p>
                    <span className="statuses__number statuses__number--gray">
                        {vm.statistics.rejectedCount}
                    </span>
                </div>
            </div>
            <SortedTable
                data={vm.companiesList.data as CompanyType[]}
                keyValue="id"
                columns={getColumns(vm)}
                customHeader={vm.companiesListSorter}
                lazyLoad={vm.companiesList}
            />
            <ErrorList errors={vm.errorListHolder} />
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
        </div>
    );
});
