import { observer } from 'mobx-react';
import { lang } from '~/api';
import { HeaderSwitch, If, List, ProgressBar } from '~/bits';
import { hook } from '~/utils';
import type { PmModuleVm } from '~/views/PmModule/PmModule.vm';
import { PmTableVm } from './PmTable.vm';
import moment from 'moment';

type Props = {
    parentVm: PmModuleVm;
};

export const PmTable = observer(({ parentVm }: Props) => {
    const vm = hook.useVm(() => new PmTableVm(parentVm.data?.currentStage()));

    if (!parentVm.data) {
        return null;
    }

    const stageList = parentVm.data.stagesByFilter.map(stage => {
        const name = lang.currentLanguage === 'en' ? stage.name : stage.nameAr;

        const header = (
            <div className="stage-header">
                <p
                    className="stage-header__title"
                    onClick={() => parentVm.openStageViewModal(stage.externalId)}
                >
                    {lang.dict.get('stage')} {stage.order} - {name}
                </p>
                <p className="stage-header__status" data-status={stage.status}>
                    {lang.dict.enum('pmStageStatus', stage.status)}
                </p>
                <div className="stage-header__item on-mobile">
                    <p className="stage-header__item-title">
                        {lang.dict.get('stageDueDate')}
                    </p>
                    <p className="stage-header__item-value">
                        {stage.baselineFinishDate?.format('D MMM YYYY')}
                    </p>
                </div>
            </div>
        );

        const description = (
            <p className="stage-desc">
                {stage.workflowSequences.length} {lang.dict.get('tasks')}
            </p>
        );

        const details = (
            <div className="stage-details">
                <div className="stage-details__item on-tablet">
                    <p className="stage-details__item-title">
                        {lang.dict.get('stageDueDate')}
                    </p>
                    <p className="stage-details__item-value">
                        {stage.baselineFinishDate?.format('D MMM YYYY')}
                    </p>
                </div>
                <div className="stage-details__item stage-details__item--bar">
                    <p className="stage-details__item-title">
                        {lang.dict.get('taskStatus')}
                    </p>
                    <p className="stage-details__item-value">
                        <ProgressBar values={stage.taskStatusPercent} />
                    </p>
                </div>
            </div>
        );

        return (
            <HeaderSwitch
                key={stage.id}
                id={stage.id}
                header={header}
                details={details}
                description={description}
                isCollapsed={!vm.collapsed.has(stage.id)}
                setCollapsed={vm.setCollapsed}
                border={stage.status}
            >
                <div className="table-switch__table">
                    <If condition={!vm.collapsed.has(stage.externalId ?? 0)} >
                        <div className="table-switch__table-header">
                            <p className="table-switch__table-cell table-switch__table-cell--task">
                                {lang.dict.get('taskName')}
                            </p>
                            <p className="table-switch__table-cell table-switch__table-cell--action">
                                {lang.dict.get('actionBy')}
                            </p>
                            <p className="table-switch__table-cell table-switch__table-cell--completed">
                                {lang.dict.get('completedOn')}
                            </p>
                            <p className="table-switch__table-cell table-switch__table-cell--date">
                                {lang.dict.get('dueDate')}
                            </p>
                            <p className="table-switch__table-cell table-switch__table-cell--status">
                                {lang.dict.get('status')}
                            </p>
                        </div>
                    </If>
                    <List
                        setTaskId={parentVm.setUserTask}
                        workflows={stage.workflowSequences}
                        stageDueDate={stage.baselineFinishDate ?? moment()}
                    />
                </div>
            </HeaderSwitch>
        );
    });

    return <div className="stage-list">{stageList}</div>;
});
