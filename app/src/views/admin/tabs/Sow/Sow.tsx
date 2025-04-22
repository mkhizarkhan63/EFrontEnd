import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If, SortedTable } from '~/bits';
import type { Sow } from '~/models';
import { hook, utilsDate } from '~/utils';
import { ColumnName, SowVm } from './Sow.vm';

const getColumns = (vm: SowVm) => SortedTable.createColumns<Sow>(() => [
    {
        keyName: ColumnName.contractName,
        displayName: lang.dict.get('sowName'),
        size: 2.7,
        isSortable: true,
        render: item => (
            <div className="title">
                {item.contractName}
                <If condition={() => item.isMasterSow}>
                    <div className="master-sow-label">
                        {lang.dict.get('masterSow')}
                    </div>
                </If>
            </div>
        ),
    },
    {
        keyName: ColumnName.numberOfItems,
        displayName: lang.dict.get('noOfItems'),
        align: 'right' as const,
        isSortable: true,
        render: item => <div className="visits">{item.numberOfItems}</div>,
    },
    {
        keyName: 'createdOnIsAscending',
        displayName: lang.dict.get('createdOn'),
        align: 'right' as const,
        isSortable: true,
        render: item => <div className="date">{utilsDate.printDate(item.createdOn)}</div>,
    },
    {
        keyName: 'usedFromIsAscending',
        displayName: lang.dict.get('usedFrom'),
        align: 'right' as const,
        isSortable: true,
        render: item => <div className="date">{utilsDate.printDate(item.usedFrom)}</div>,
    },
    {
        keyName: 'usedToIsAscending',
        displayName: lang.dict.get('usedTo'),
        align: 'right' as const,
        isSortable: true,
        render: item => (
            <div className="date">
                <If condition={() => item.isMasterSow}>
                    <>Now</>
                </If>
                <If condition={() => !item.isMasterSow}>
                    {utilsDate.printDate(item.usedTo)}
                </If>
            </div>
        ),
    },
    {
        keyName: 'statusIsAscending',
        displayName: lang.dict.get('status'),
        size: .7,
        align: 'right' as const,
        isSortable: true,
        render: item => (
            <div
                className="status"
                data-status={item.status}
            >
                {lang.dict.enum('sowAndStageStatus', item.status)}
            </div>
        ),
    },
    {
        keyName: 'viewDetails',
        displayName: lang.dict.get('action'),
        align: 'right' as const,
        render: item => (
            <div className="action">
                <If condition={() => item.status === E.SowAndStageStatus.drafted} >
                    <div
                        className="action__item"
                    >
                        <Button
                            color="transparent"
                            value={lang.dict.get('edit')}
                            onClick={() => vm.goToDetails(item.id)}
                        />
                    </div>
                    <div
                        className="action__item action__item--red"
                    >
                        <Button
                            color="transparent"
                            value={lang.dict.get('delete')}
                            onClick={() => item.remove(item.id)}
                        />
                    </div>
                </If>
                <If condition={() => item.status === E.SowAndStageStatus.inactive || item.isMasterSow}>
                    <div
                        className="action__item"
                    >
                        <Button
                            color="transparent"
                            value={lang.dict.get('viewDetails')}
                            onClick={() => vm.goToDetails(item.id)}
                        />
                    </div>
                </If>
            </div>
        ),
    },
]);

export const SowManagement = observer(() => {
    const vm = hook.useVm(() => new SowVm());

    return (
        <div className="sow-management">
            <div className="top-header">
                <h1 className="top-header__text">{lang.dict.get('sowManagement')}</h1>
                <div className="top-header__right">
                    <If condition={() => vm.showEditMasterButton}>
                        <Button
                            color="blue"
                            leftImg="edit"
                            value={lang.dict.get('editMasterSow')}
                            onClick={vm.goToEditMasterSow}
                        />
                    </If>
                    <If condition={() => vm.sowList.length === 0}>
                        <Button
                            color="blue"
                            leftImg="add"
                            value={lang.dict.get('createFirstSow')}
                            onClick={vm.goToNewProject}
                        />
                    </If>
                </div>
            </div>
            <SortedTable
                data={vm.sowList.data}
                keyValue="id"
                columns={getColumns(vm)}
                customHeader={vm.sowListSorter}
                lazyLoad={vm.sowList}
            />
        </div>
    );
});
