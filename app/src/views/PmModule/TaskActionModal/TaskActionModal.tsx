import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Close, ErrorList, If, Input, SideModal } from '~/bits';
import { TaskProgress } from '~/partials';
import { hook } from '~/utils';
import type { PmModuleVm } from '../PmModule.vm';
import * as Actions from './Actions';
import { ItemModal } from './ItemModal/ItemModal';
import * as Summaries from './Summaries';
import { TaskActionModalVm } from './TaskActionModal.vm';

type Props = {
    parentVm: () => PmModuleVm;
};

type SubmissionProps = {
    vm: TaskActionModalVm;
};

const Submission = observer(({ vm }: SubmissionProps) => {
    if (vm.workflowProgress && vm.workflowProgress?.submissions.length === 0) {
        return null;
    }

    const result = vm.workflowProgress?.submissions.map((sub, index) => {
        switch (sub.actionType) {
            case E.ActionType.none:
                return null;
            case E.ActionType.empty:
                if (vm.workflowProgress?.submissions[index -1]?.actionType === E.ActionType.payment) {
                    return (
                        <Summaries.Confirm
                            key={sub.id}
                            sub={sub}
                            desc={`by ${lang.dict.enum('workflowTaskActor', sub.actorType)}, ${sub.createdDate?.format('dddd, D MMM YYYY, h:mm A')}`}
                        />
                    );
                }
                return (
                    <Summaries.Confirm
                        key={sub.id}
                        sub={sub}
                        desc={`by ${lang.dict.enum('workflowTaskActor', sub.actorType)}, ${sub.createdDate?.format('dddd, D MMM YYYY, h:mm A')}`}
                        isGeneral={true}
                    />
                );
            case E.ActionType.datePicker:
                return (
                    <Summaries.Date
                        key={sub.id}
                        title={`${lang.dict.enum('workflowTaskActor', sub.actorType)} requested site visit on ${sub.valueDatePicker?.date?.format('dddd, D MMM YYYY, h:mm A')}`}
                        desc={`by ${lang.dict.enum('workflowTaskActor', sub.actorType)}, ${sub.createdDate?.format('dddd, D MMM YYYY, h:mm A')}`}
                        status={E.SubmitStatus.submitted}
                    />
                );
            case E.ActionType.checklist:
                return (
                    <Summaries.Checklist
                        key={sub.id}
                        title={lang.dict.get('consultantChecklist')}
                        desc={`by ${lang.dict.enum('workflowTaskActor', sub.actorType)}, ${sub.createdDate?.format('dddd, D MMM YYYY, h:mm A')}`}
                        list={sub.valueChecklist}
                        status={sub.status}
                    />
                );
            case E.ActionType.payment:
                return (
                    <Summaries.Payment
                        key={sub.id}
                        title={`Stage ${vm.stage?.order} Payment`}
                        desc={`by ${lang.dict.enum('workflowTaskActor', sub.actorType)}, ${sub.createdDate?.format('dddd, D MMM YYYY, h:mm A')}`}
                        status={sub.status}
                        paidBy={lang.dict.enum('workflowTaskActor', sub.actorType)}
                        valuePayment={sub.valuePayments}
                        onDownload={() => vm.openProof(vm.workflowProgress?.proofId)}
                        switchInvoice={vm.switchInvoiceModal}
                        isInvoiceOpened={vm.isInvoiceModal}
                        invoice={vm.invoice}
                        onClose={vm.closeInvoiceModal}
                        bankDetails={vm.bankDetails}
                        subtotal={vm.workflowProgress?.currentTask.paymentBlockPayload?.stageSubTotal}
                    />
                );
            default:
                return null;
        }
    });

    return <>{result}</>;
});

export const TaskActionModal = observer(({ parentVm }: Props) => {
    const vm = hook.useVm(
        () => new TaskActionModalVm(parentVm()),
        [parentVm().selectedUserTask?.id],
    );

    if (!vm.isOpen || !parentVm() || !vm.workflowProgress) {
        return null;
    }

    const {
        actionType,
        actorType,
        dueDate,
        status,
        actor,
        valueChecklist,
        valueDatePicker,
        paymentBlockPayload,
    } = vm.workflowProgress.currentTask;

    const langVersion = lang.current === 'en' ? 'EnglishName' : 'ArabicName';

    const langVersionCamelCase = lang.current === 'en' ? 'englishName' : 'arabicName';

    const langShortcut = lang.current === 'en' ? 'En' : 'Ar';

    const stageModal = () => (
        <div className="stage-modal">
            <p className="stage-modal__title">
                {lang.dict.format('stageFormat', [vm.stage?.order])}
                &nbsp;
                {vm.stage?.name}
            </p>
            <div className="stage-modal__row">
                <p className="stage-modal__status" data-status={vm.stage?.status}>
                    {lang.dict.enum('pmStageStatus', vm.stage?.status)}
                </p>
                <div className="stage-modal__value">
                    <span className="stage-modal__value-title">
                        {lang.dict.get('stageValue')}
                    </span>
                    &nbsp;
                    {vm.stage?.weight}%
                </div>
            </div>
        </div>
    );

    const workflowName = (
        <p className="workflow">
            <span className="workflow__name">
                {lang.dict.format(
                    'workflowNameForFormat',
                    [
                        vm.workflowProgress[`workflowName${langShortcut}`],
                        vm.workflowProgress[`subItem${langVersion}`],
                    ],
                )}
            </span>
            <span
                className="workflow__stage"
                onMouseOver={() => vm.setStageModal(true)}
                onMouseOut={() => vm.setStageModal(false)}
            >
                {lang.dict.get('stage')} {vm.stage?.order}
            </span>
            <If condition={vm.isStageModal}>
                {stageModal()}
            </If>
        </p>
    );

    const taskName = vm.workflowProgress.currentTask[`name${langShortcut}`];

    const taskStatus = (
        <div
            className="task-status"
            data-status={status}
        >
            <p className="task-status__text">
                {lang.dict.enum('taskStatus', status)}
            </p>
        </div>
    );

    const action = () => {
        switch (actionType) {
            case E.ActionType.none:
                return null;
            case E.ActionType.empty:
                return null;
            case E.ActionType.datePicker:
                if (!valueDatePicker) {
                    return null;
                }

                return (
                    <Actions.Date
                        title={lang.dict.get('chooseTimeAndDate')}
                        desc={lang.dict.get('consultantHas7days')}
                        dateAndTime={valueDatePicker.date}
                        onChangeDate={valueDatePicker.setData}
                        onChangeTime={valueDatePicker.setTime}
                        max={valueDatePicker.getMax()}
                        excludeDate={valueDatePicker.getExcluded()}
                    />
                );
            case E.ActionType.checklist:
                return (
                    <Actions.Checklist
                        title={lang.dict.get('consultantChecklist')}
                        list={valueChecklist}
                    />
                );
            case E.ActionType.payment:
                return (
                    <Actions.Payment
                        payment={paymentBlockPayload}
                        onClick={vm.switchInvoiceModal}
                        isInvoiceOpened={vm.isInvoiceModal}
                        invoice={vm.invoice}
                        onClose={vm.closeInvoiceModal}
                        bankDetails={vm.bankDetails}
                    />
                );
        }
    };

    const isCompleted = status === E.TaskStatus.completed;

    const isDate = vm.taskDueDate || Boolean(parentVm().selectedUserTask?.dueDate);

    return (
        <SideModal variant="task-action" onBlur={vm.close}>
            <If condition={vm.isItemModal} >
                <ItemModal
                    sowItem={vm.workflowProgress.sowItemDto}
                    onBlur={vm.switchItemModal}
                />
            </If>
            <If condition={() => isCompleted}>
                <div className="side-modal__header">
                    <Close onClick={vm.close} />
                    <div className="side-modal__header-title">
                        {workflowName}
                        {taskStatus}
                    </div>
                </div>
            </If>
            <If condition={() => !isCompleted}>
                <div className="side-modal__header">
                    <Close onClick={vm.close} />
                    <div className="side-modal__header-title">
                        {taskName}
                        {taskStatus}
                    </div>
                </div>
            </If>
            <div className="side-modal__content">
                <If condition={() => !isCompleted}>
                    <div className="desc">
                        {vm.workflowProgress.currentTask[`description${langShortcut}`]}
                    </div>
                    <div className="section">
                        <div className="section__row">
                            <span className="title">
                                {lang.dict.get('actionBy')}&nbsp;
                                <b>{lang.dict.enum('workflowTaskActor', actorType)}</b>&nbsp;
                            </span>
                            <span className="value">
                                {actor?.name}
                            </span>
                        </div>
                        <div className="section__row">
                            <span className="title">
                                {lang.dict.get('dueDate')}&nbsp;
                            </span>
                            <If condition={() => vm.taskDueDate}>
                                <span className="value">
                                    {dueDate?.format('dddd, D MMM YYYY, h:mm A')},&nbsp;
                                </span>
                                <span
                                    className="due"
                                    data-is-delay={vm.dueDateDiff.isDelay}
                                >
                                    {vm.dueDateDiff.text}
                                </span>
                            </If>
                            <If condition={() => !vm.taskDueDate && Boolean(parentVm().selectedUserTask?.dueDate)}>
                                <span className="value">
                                    {parentVm().selectedUserTask?.dueDate?.format('dddd, D MMM YYYY, h:mm A')}
                                </span>
                                <span
                                    className="due"
                                    data-is-delay={vm.dueDateDiff.isDelay}
                                >
                                    {vm.dueDateDiff.text}
                                </span>
                            </If>
                            <If condition={() => !isDate}>
                                <span className="value">
                                    - -
                                </span>
                            </If>
                        </div>
                    </div>
                    {/* Separator */}
                    <div className="sub-title">
                        {workflowName}
                    </div>
                </If>
                <div className="desc">
                    {vm.workflowProgress[`workflowDescription${langShortcut}`]}
                </div>
                <div className="task-list">
                    <div className="task-list__item">
                        <span className="title">
                            {lang.dict.get('item')}
                        </span>
                        <span className="value">
                            <Button
                                color="transparent"
                                rightImg="dropdown-up"
                                onClick={vm.switchItemModal}
                                value={vm.workflowProgress.sowItemDto[langVersionCamelCase]}
                            />
                        </span>
                    </div>
                    <If condition={vm.workflowProgress?.supplier?.length > 0}>
                        <div className="task-list__item">
                            <span className="title">
                                {lang.dict.get('supplier')}
                            </span>
                            <span className="value">
                                {vm.workflowProgress.supplier}
                            </span>
                        </div>
                    </If>
                    <If condition={vm.workflowProgress?.rate > 0}>
                        <div className="task-list__item">
                            <span className="title">
                                {lang.dict.get('rate')}
                            </span>
                            <span className="value">
                                {lang.dict.format('omrFormat', [vm.workflowProgress?.rate])}
                            </span>
                        </div>
                    </If>
                </div>
                <Submission vm={vm} />
                <If condition={vm.showTaskAction}>
                    {action()}
                </If>
                <TaskProgress
                    taskData={vm.workflowProgress}
                    isSubmitted={vm.showTaskAction}
                    parentVm={parentVm}
                />
                <If condition={vm.showTaskAction && vm.context === E.RoleInCompany.consultant}>
                    <div className="visit-site">
                        <p className="visit-site__title">
                            {lang.dict.get('didYouVisitSite')}
                        </p>
                        <Input.Checkbox
                            onChange={vm.setDidVisitSite}
                            type="radio"
                            text={{
                                first: lang.dict.get('switchYes'),
                                second: lang.dict.get('switchNo'),
                            }}
                            isChecked={vm.didVisitSite}
                        />
                    </div>
                </If>
                <If condition={vm.showTaskAction}>
                    <div className="task-bottom">
                        <Input.Checkbox
                            type="check"
                            isChecked={vm.isSelected}
                            name={vm.confirmDescription}
                            onChange={vm.setConfirmSelection}
                        />
                        <div className="task-bottom__btns">
                            <If condition={vm.showTaskAction && vm.isCanReject} >
                                <Button
                                    color="white"
                                    leftImg="close-red"
                                    value={lang.dict.get('reject')}
                                    onClick={() => vm.submitTask(false)}
                                    isLoading={vm.isLoading}
                                    isDisabled={vm.isSubmitLocked}
                                />
                            </If>
                            <div className="task-bottom__btn-submit">
                                <If condition={vm.isLoading}>
                                    <p className="task-bottom__btn-submit-text">{lang.dict.get('submissionInProgress')}</p>
                                </If>
                                <Button
                                    color="blue"
                                    rightImg="next"
                                    value={lang.dict.get('goSubmit')}
                                    onClick={vm.submitTask}
                                    isDisabled={vm.isSubmitLocked}
                                    isLoading={vm.isLoading}
                                />
                            </div>
                        </div>
                    </div>
                </If>
            </div>
            <ErrorList
                errors={vm.stageErrorListHolder}
            />
        </SideModal >
    );
});
