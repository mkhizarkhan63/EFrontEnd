import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If, Menu, NoData, SortedTable } from '~/bits';
import { type PmTaskUpdateType } from '~/models/PmModels/PmTaskUpdate';
import { hook } from '~/utils';
import { UpdateModal, UpdateFilter } from './Components';
import { UpdatesVm } from './Updates.vm';
import type { PmModuleVm } from '~/views/PmModule/PmModule.vm';

type Props = {
    projectId: number;
    parentVm: PmModuleVm;
};

type ColumnNameProps = {
    item: PmTaskUpdateType;
};

const ColumnName = ({ item }: ColumnNameProps) => {
    if (item.isInitialUpdate) {
        return (
            <div className="name__row">
                <p className="name__workflow">{item.customUpdateName}</p>
                <p className="name__task">{item.customUpdateTitle}</p>
            </div>
        );
    }

    if (item.isObservation) {
        return (
            <div className="name__row">
                <p className="name__workflow">{lang.dict.get(item.submittedBy)} {lang.dict.get('observation')}</p>
                <p className="name__task">{lang.dict.get(item.taskUpdateType)}</p>
            </div>
        );
    }

    if (!item.isMaterialUpdate) {
        const name = lang.currentLanguage === 'en' ? item.workflowName : item.workflowNameAr;
        const workflowName = name.length > 0 ? name : '--';
        const taskName = item.taskName.length > 0 ? item.taskName : '--';

        return (
            <div className="name__row">
                <p className="name__workflow">{workflowName}</p>
                <p className="name__task">{taskName}</p>
            </div>
        );
    }

    return (
        <div className="name__row">
            <p className="name__workflow">{lang.dict.get(item.altWorkflowName)}</p>
            <p className="name__task">{lang.dict.get(item.altTaskName)}</p>
        </div>
    );
};

const getColumns = (vm: UpdatesVm) => SortedTable.createColumns<PmTaskUpdateType>(
    () => [
        {
            keyName: 'id',
            displayName: lang.dict.get('idHash'),
            size: .45,
            isSortable: false,
            render: item => (
                <p className="number">
                    {item.sequenceId}
                </p>
            ),
        },
        {
            keyName: 'name',
            displayName: lang.dict.get('title'),
            size: 4,
            isSortable: false,
            render: item => (
                <div
                    className="name"
                >
                    <ColumnName item={item} />
                    <p className="name__desc">{item.description}</p>
                </div>
            ),
        },
        {
            keyName: 'submittedBy',
            displayName: lang.dict.get('submittedBy'),
            size: .7,
            isSortable: false,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">
                        {lang.dict.get('submittedBy')}
                    </p>
                    <p className="value">
                        {item.submittedBy === E.WorkflowActorType.none ? lang.dict.get('system') : lang.dict.get(item.submittedBy)}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'submittedIn',
            displayName: lang.dict.get('submittedIn'),
            size: .65,
            isSortable: false,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">
                        {lang.dict.get('submittedIn')}
                    </p>
                    <p className="value">
                        {lang.dict.get('stage')} {item.submittedInStageOrder}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'lastActivity',
            displayName: lang.dict.get('latestActivity'),
            size: 1.6,
            isSortable: false,
            render: item => (
                <div className="item">
                    <p className="title on-mobile">
                        {lang.dict.get('latestActivity')}
                    </p>
                    <p className="value">
                        {item.lastActivity?.format('dddd, D MMM YYYY, h:mm A')}
                    </p>
                </div>
            ),
        },
        {
            keyName: 'flag',
            displayName: lang.dict.get('flag'),
            size: .5,
            align: 'right',
            isSortable: false,
            render: item => (
                <div
                    className="flag"
                    data-is-flagged={item.isFlagged}
                >
                    <Button
                        color="transparent"
                        centerImg={item.isFlagged ? 'flag-red' : 'flag'}
                        onClick={() => vm.changeFlaggedStatus(item)}
                    />
                </div>
            ),
        },
    ]);

const updateAttrs = { isRead: (item: PmTaskUpdateType) => item.isRead };

export const Updates = observer(({ projectId, parentVm }: Props) => {
    const vm = hook.useVm(
        () => new UpdatesVm(projectId, parentVm),
        [parentVm.isRedirectedToUpdate],
    );

    if (!vm) {
        return null;
    }

    return (
        <div className="pm-updates">
            <Menu
                getItems={() => vm.menuItems}
                isActive={vm.isMenuItemActive}
                isAnimated={true}
            />
            <UpdateFilter vm={vm} />
            <If condition={vm.isListEmpty}>
                <NoData forPm={true} />
            </If>
            <If condition={!vm.isListEmpty}>
                <SortedTable
                    data={vm.updatesList.data}
                    keyValue="id"
                    columns={getColumns(vm)}
                    lazyLoad={vm.updatesList}
                    attrs={updateAttrs}
                    onClick={vm.openMobileModal}
                />
            </If>
            <If condition={vm.isModalOpen}>
                <UpdateModal
                    update={vm.updateForModal}
                    onBlur={vm.closeModal}
                    openGallery={parentVm.openGallery}
                    onSetFlag={vm.changeFlaggedStatus}
                    addComment={vm.addComment}
                    stageNumber={vm.updateStageNumber}
                />
            </If>
        </div>
    );
});
