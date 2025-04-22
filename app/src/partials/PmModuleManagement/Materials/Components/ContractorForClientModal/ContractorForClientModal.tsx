import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Close, If, SideModal, Input } from '~/bits';
import { type MaterialProgressType } from '~/models/PmModels/MaterialProgress';
import { hook, utilsDate } from '~/utils';
import { type MaterialsVm } from '../../Materials.vm';
import { MaterialOptions } from './Actions/MaterialOptions';
import { ContractorForClientModalVm } from './ContractorForClientModal.vm';

type Props = {
    onBlur: () => void;
    materialItem?: MaterialProgressType;
    parentVm: MaterialsVm;
};

type TaskStatusProps = {
    status?: E.TaskStatus;
};

const TaskStatus = ({ status }: TaskStatusProps) => {
    if (!status) {
        return null;
    }

    return (
        <div
            className="side-modal__header-title-status"
            data-status={status}
        >
            {lang.dict.enum('taskStatus', status)}
        </div>
    );
};

export const ContractorForClientModal = observer(({ onBlur, materialItem, parentVm }: Props) => {
    const vm = hook.useVm(
        () => new ContractorForClientModalVm(parentVm, materialItem),
        [materialItem],
    );

    const Header = () => {
        const actorType = materialItem?.currentTask.actorType;

        if (vm.taskCompleted) {
            return <>{lang.dict.get('optionApproved')}</>;
        }

        if (actorType === E.WorkflowActorType.contractor) {
            return <>{lang.dict.get('submitOptions')}</>;
        }

        if (actorType === E.WorkflowActorType.client) {
            return <>{lang.dict.get('selectPrefferedOption')}</>;
        }

        return null;
    };

    const reject = () => (
        <div className="side-modal__reject">
            <p className="side-modal__reject-title">{lang.dict.get('rejectOptions')}</p>
            <p className="side-modal__reject-text">{lang.dict.get('rejectAllowed')}</p>
            <Input.Textarea
                value={vm.rejectMessage}
                onChange={vm.setRejectMessage}
                placeHolder={lang.dict.get('yourComments')}
            />
        </div>
    );

    return (
        <SideModal onBlur={onBlur} variant="material-approval">
            <div className="side-modal__header">
                <Close onClick={onBlur} />
                <div className="side-modal__header-title">
                    <Header />
                    <TaskStatus
                        status={materialItem?.currentTask.status}
                    />
                </div>
            </div>
            <div className="side-modal__content">
                <div className="side-modal__top">
                    <div className="side-modal__row">
                        <p className="side-modal__row-title">
                            {lang.dict.get('actionBy')}&nbsp;
                            {lang.dict.enum('workflowTaskActor', materialItem?.currentTask.actorType)}&nbsp;
                        </p>
                    </div>
                    <div className="side-modal__row">
                        <If condition={materialItem?.currentTask.status !== E.TaskStatus.completed}>
                            <p className="side-modal__row-title">
                                {lang.dict.get('dueDate')}&nbsp;
                            </p>
                            <p className="side-modal__row-value">
                                {utilsDate.displayDefaultDate(materialItem?.currentTask.dueDate, 'dddd, D MMM YYYY')}
                                <If condition={utilsDate.isDateValid(materialItem?.currentTask.dueDate)}>
                                    ,&nbsp;
                                    <span
                                        className="side-modal__row-days-left"
                                        data-status={materialItem?.currentTask.status}
                                    >
                                        {lang.dict.format('dueDaysLeft', [materialItem?.currentTask.dayLeft])}
                                    </span>
                                </If>
                            </p>
                        </If>
                        <If condition={materialItem?.currentTask.status === E.TaskStatus.completed}>
                            <p className="side-modal__row-title">
                                {lang.dict.get('approvedOn')}&nbsp;
                            </p>
                            <p className="side-modal__row-value">
                                {utilsDate.displayDefaultDate(materialItem?.finishDate)}
                            </p>
                        </If>
                    </div>
                </div>
                <div className="side-modal__section">
                    <div className="side-modal__section-left">
                        <div
                            className="side-modal__section-img-container"
                            data-is-empty={!materialItem?.sowItem.icon?.url}
                        >
                            <img src={materialItem?.sowItem.icon?.url} alt="" className="side-modal__section-img" />
                        </div>
                        <span className="side-modal__section-name">
                            {materialItem?.sowItem.englishName}
                        </span>
                    </div>
                    <p className="side-modal__section-right">
                        {lang.dict.format('forStageFormat', [materialItem?.stageOrderNumber])}
                    </p>
                </div>
                <div className="material-delays">
                    <p className="material-delays__title">
                        {lang.dict.get('materialDelays')}
                    </p>
                    <div className="material-delays__content">
                        <div className="material-delays__item">
                            <p className="material-delays__item-title">
                                {lang.dict.get('contractor')}
                            </p>
                            <p className="material-delays__item-value" data-is-delay={Boolean(materialItem?.contractorDelay)}>
                                {lang.dict.format('daysFormat', [materialItem?.contractorDelay])}
                            </p>
                        </div>
                        <div className="material-delays__item">
                            <p className="material-delays__item-title">
                                {lang.dict.get('client')}
                            </p>
                            <p className="material-delays__item-value" data-is-delay={Boolean(materialItem?.clientDelay)}>
                                {lang.dict.format('daysFormat', [materialItem?.clientDelay])}
                            </p>
                        </div>
                    </div>
                </div>
                <If condition={!vm.isRejecting}>
                    <MaterialOptions vm={vm} />
                </If>
                <If condition={vm.isRejecting}>
                    {reject()}
                </If>
                <div
                    className="side-modal__submit"
                    data-role={vm.currentRole}
                    data-is-checkbox={vm.canSelectOptions && !vm.isRejecting && !vm.taskCompleted}
                    data-is-reject={vm.isRejecting}
                >
                    <If condition={vm.canAddOptions}>
                        <p className="side-modal__submit-text">{lang.dict.get('clientApprove')}</p>
                        <Button
                            color="blue"
                            rightImg="next"
                            value={lang.dict.get('goSubmit')}
                            onClick={() => vm.submitContractorOptions()}
                            isDisabled={vm.isSubmitLocked}
                            isLoading={vm.isLoading}
                        />
                    </If>
                    <If condition={vm.canSelectOptions && !vm.isRejecting && !vm.taskCompleted}>
                        <Input.Checkbox
                            type="check"
                            isChecked={vm.isPurchaseConfirmed}
                            onChange={vm.switchPurchaseConfirmed}
                            name={lang.dict.get('approvePurchase')}
                        />
                        <div className="side-modal__submit-btns">
                            <If condition={Boolean(materialItem?.canReject)}>
                                <Button
                                    color="white"
                                    leftImg="close-red"
                                    value={lang.dict.get('rejectOptions')}
                                    onClick={() => vm.setIsRejecting(true)}
                                />
                            </If>
                            <Button
                                color="blue"
                                rightImg="next"
                                value={lang.dict.get('goSubmit')}
                                onClick={() => vm.submitSelectedOption()}
                                isDisabled={vm.isSubmitLocked || !vm.isPurchaseConfirmed}
                                isLoading={vm.isLoading}
                            />
                        </div>
                    </If>
                    <If condition={vm.isRejecting}>
                        <div className="side-modal__submit-btns">
                            <Button
                                color="white"
                                leftImg="close-red"
                                value={lang.dict.get('cancel')}
                                onClick={() => vm.setIsRejecting(false)}
                            />
                            <Button
                                color="blue"
                                rightImg="next"
                                value={lang.dict.get('goSubmit')}
                                onClick={() => vm.submitRejection()}
                                isLoading={vm.isLoading}
                            />
                        </div>
                    </If>
                </div>
            </div>
        </SideModal>
    );
});
