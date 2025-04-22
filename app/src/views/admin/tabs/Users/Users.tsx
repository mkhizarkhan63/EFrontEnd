import { observer } from 'mobx-react';
import { lang } from '~/api';
import { hook } from '~/utils';
import type { UserType } from '~/models';
import { SortedTable, Button, If, ErrorList, Input, Icons } from '~/bits';
import { InviteUser } from './InviteUserModal';
import { UsersVm } from './Users.vm';
import { DeleteModal } from '~/bits/DeleteModal';
import CsvDownloader from 'react-csv-downloader';

const getColumns = (vm: UsersVm) => SortedTable.createColumns<UserType>(() => [
    {
        keyName: 'nameIsAscending',
        displayName: lang.dict.get('userName'),
        size: 2.1,
        render: item => (
            <div className="users">
                <img src={item.avatar?.url} alt=" " className="users__img" />
                <div className="users__desc">
                    <span className="users__name">{item.name}</span>
                </div>
            </div>
        ),
    },
    {
        keyName: 'phoneIsAscending',
        displayName: lang.dict.get('mobile'),
        align: 'right',
        size: .45,
        render: item => <a href={`tel:${item.mobile}`} className="mobile">{item.mobile}</a>,
    },
    {
        keyName: 'companyAssociationIsAscending',
        displayName: lang.dict.get('companyAssociations'),
        align: 'right',
        size: .9,
        render: item => <div>{item.companyAssociations}</div>,
    },
    {
        keyName: 'numberOfProjects',
        displayName: lang.dict.get('numberOfProjects'),
        align: 'right',
        size: .75,
        render: item => <div>{item.numberOfProjects}</div>,
    },
    {
        keyName: 'signedUpOnIsAscending',
        displayName: lang.dict.get('signedUpOn'),
        align: 'right',
        size: .7,
        render: item => <div className="signed-up">{item.signedUp.format('L')}</div>,
    },
    {
        keyName: 'lastActivityIsAscending',
        displayName: lang.dict.get('lastActivity'),
        align: 'right',
        size: 1,
        render: item => <div className="last-activity">{item.lastActivity.format('L, LT')}</div>,
    },
    {
        keyName: 'action',
        displayName: lang.dict.get('action'),
        align: 'right',
        size: .65,
        render: item => (
            <>
                <Button
                    color="transparent"
                    value={lang.dict.get('viewDetail')}
                    onClick={vm.showDetail(item.id)}
                />
                <Button
                    color="transparent"
                    value={lang.dict.get('delete')}
                    onClick={() => vm.openDeleteModal(item.externalId)}
                />
            </>
        ),
    },
]);

const columns = [
    {
        id: 'id',
        displayName: 'ID',
    },
    {
        id: 'name',
        displayName: 'Name',
    },
    {
        id: 'arabicName',
        displayName: 'Arabic Name',
    },
    {
        id: 'nationalId',
        displayName: 'National ID',
    },
    {
        id: 'email',
        displayName: 'Email',
    },
    {
        id: 'phone',
        displayName: 'Phone Number',
    },
    {
        id: 'signedUp',
        displayName: 'Signed Up',
    },
    {
        id: 'lastActivity',
        displayName: 'Last Activity',
    },
    {
        id: 'companyAssociations',
        displayName: 'Company Associations',
    },
    {
        id: 'numberOfProjects',
        displayName: 'Number of projects',
    },
];

export const UserManagement = observer(() => {
    const vm = hook.useVm(() => new UsersVm());

    return (
        <div className="user-management">
            <div className="top-header">
                <h1 className="top-header__text">
                    {lang.dict.get('userManagement')}
                    <span className="top-header__text-optional">({vm.userAmount})</span>
                </h1>
                <div className="top-header__right">
                    <div className="search">
                        <Input.Text
                            value={vm.searchValue}
                            placeHolder={lang.dict.get('searchBy')}
                            onChange={vm.setSearchValue}
                        />
                        <Icons icon="search" />
                    </div>
                    <CsvDownloader
                        filename="ebinaa-users"
                        extension=".csv"
                        datas={() => vm.downloadUsers()}
                        text={lang.dict.get('export')}
                        columns={columns}
                    >
                        <Button
                            color="blue"
                            leftImg="download"
                            value={lang.dict.get('export')}
                        />
                    </CsvDownloader>
                    <Button
                        color="blue"
                        leftImg="add"
                        value={lang.dict.get('inviteUser')}
                        onClick={vm.openInviteUser}
                    />
                </div>
            </div>
            <SortedTable
                data={vm.usersList.data}
                keyValue="id"
                columns={getColumns(vm)}
                customHeader={vm.userListSorter}
                lazyLoad={vm.usersList}
            />
            <If condition={() => vm.isInviteUser}>
                <InviteUser vm={vm} />
            </If>
            <ErrorList errors={vm.errorListHolder} />
            <If condition={() => vm.isDeleteModalOpened}>
                <DeleteModal
                    onBlur={vm.closeDeleteModal}
                    onCancel={vm.closeDeleteModal}
                    onDelete={vm.deleteUser}
                    title={lang.dict.get('deleteUser')}
                    description={lang.dict.get('deleteWaring')}
                    buttonTitle={lang.dict.get('delete')}
                />
            </If>
        </div>
    );
});
