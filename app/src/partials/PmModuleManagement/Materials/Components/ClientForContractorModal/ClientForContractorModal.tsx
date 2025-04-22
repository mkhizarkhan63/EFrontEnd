import { observer } from 'mobx-react';
import { E, lang, utils } from '~/api';
import { Button, Close, If, Input, SideModal, Uploader } from '~/bits';
import { hook } from '~/utils';
import type { MaterialsVm } from '../../Materials.vm';
import { AddItemsForClientBuy, ItemsRequested, Submission } from './Actions';
import { ClientForContractorModalVm } from './ClientForContractorModal.vm';
import { type MaterialTaskProgressType } from '~/models';
import moment from 'moment';

type Props = {
    parentVm: () => MaterialsVm;
};

export const ClientForContractorModal = observer(({ parentVm }: Props) => {
    const vm = hook.useVm(
        () => new ClientForContractorModalVm(parentVm()),
        [parentVm().currentClientForContractorMaterial?.materialWorkflowId],
    );

    if (!vm.isOpenModal || !vm.materialProgress) {
        return null;
    }

    const {
        currentTask,
        sowItem,
        stageOrderNumber,
        localUpdates,
        clientDelay,
        contractorDelay,
    } = vm.materialProgress;

    const confirmMessage = () => {
        switch (task.materialUserTaskType) {
            case E.MaterialUserTaskType.onSite:
                return lang.dict.get('confirmReceivedItems');
            case E.MaterialUserTaskType.quantityRequest:
                return lang.dict.get('confirmThatTheseAreAllTheItems');
            default:
                return lang.dict.get('confirmPurchaseDetails');
        }
    };

    const task = currentTask.canBeSkipped ? currentTask.skipTask as MaterialTaskProgressType : currentTask;

    const dayLeft = () => {
        if (!task.dueDate) {
            return undefined;
        }

        return task.dueDate.diff(moment(), 'days');
    };

    return (
        <SideModal onBlur={vm.close} variant="quantity-submission">
            <div className="side-modal__header">
                <Close onClick={vm.close} />
                <div className="side-modal__header-title">
                    {lang.dict.enum(
                        'materialUserTaskType',
                        task.materialUserTaskType,
                    )}
                    <div
                        className="side-modal__header-title-status"
                        data-status={task.status}
                    >
                        {lang.dict.enum('taskStatus', task.status)}
                    </div>
                </div>
            </div>
            <div className="side-modal__content">
                <div className="side-modal__top">
                    <div className="side-modal__row">
                        <p className="side-modal__row-title">
                            {lang.dict.get('actionBy')}&nbsp;
                            {lang.dict.enum('workflowTaskActor', task.actorType)}&nbsp;
                        </p>
                        <p className="side-modal__row-value">
                            {task.actor.name}
                        </p>
                    </div>
                    <div className="side-modal__row">
                        <p className="side-modal__row-title">
                            {lang.dict.get('dueDate')}&nbsp;
                        </p>
                        <p className="side-modal__row-value">
                            {task.dueDate?.format('dddd, D MMM YYYY')}
                            <If condition={task.status !== E.TaskStatus.completed}>
                                ,&nbsp;
                                <span
                                    className="side-modal__row-days-left"
                                    data-status={task.status}
                                >
                                    {lang.dict.format('dueDaysLeft', [dayLeft()])}
                                </span>
                            </If>
                        </p>
                    </div>
                </div>
                <div className="side-modal__section">
                    <div className="side-modal__section-left">
                        <div
                            className="side-modal__section-img-container"
                            data-is-empty={!sowItem.icon?.url}
                        >
                            <img
                                src={sowItem.icon?.url}
                                alt=""
                                className="side-modal__section-img"
                            />
                        </div>
                        <span className="side-modal__section-name">
                            {sowItem.englishName}
                        </span>
                    </div>
                    <p className="side-modal__section-right">
                        {lang.dict.format('forStageNumber', [stageOrderNumber])}
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
                            <p className="material-delays__item-value" data-is-delay={Boolean(contractorDelay)}>
                                {lang.dict.format('daysFormat', [contractorDelay])}
                            </p>
                        </div>
                        <div className="material-delays__item">
                            <p className="material-delays__item-title">
                                {lang.dict.get('client')}
                            </p>
                            <p className="material-delays__item-value" data-is-delay={Boolean(clientDelay)}>
                                {lang.dict.format('daysFormat', [clientDelay])}
                            </p>
                        </div>
                    </div>
                </div>
                <ItemsRequested parentVm={vm} />
                <If condition={() => vm.isCanAddItems}>
                    <AddItemsForClientBuy parentVm={vm} />
                    <Submission
                        isReadOnly={false}
                        tasks={localUpdates}
                        parentVm={vm}
                        type="requested"
                    />
                </If>
                <If condition={() => vm.isCanAddPurchase}>
                    <div className="side-modal__details">
                        <p className="side-modal__subtitle">
                            {lang.dict.get('purchaseDetails')}
                        </p>
                        <p className="side-modal__text">
                            {lang.dict.get('recordYourInvoices')}
                        </p>
                        <div className="side-modal__details-form">
                            <Input.Text
                                placeHolder={lang.dict.get('enterPrice')}
                                value={utils.toInputNumber(vm.totalPrice)}
                                onChange={vm.setTotalPrice}
                                name={lang.dict.get('totalPrice')}
                            />
                            <div className="side-modal__details-box">
                                <Input.Textarea
                                    placeHolder={lang.dict.get('fieldWriteDescription')}
                                    value={vm.purchaseDescription}
                                    onChange={vm.setPurchaseDescription}
                                    name={lang.dict.get('description')}
                                />
                                <div className="side-modal__details-box-btns">
                                    <Uploader
                                        acceptExtensions={['image/*', 'application/pdf']}
                                        fileList={vm.purchaseAttachments}
                                        onUpload={vm.addPurchaseAttachment}
                                        onRemove={vm.removePurchaseAttachment}
                                        canDelete={true}
                                        canDownloadAll={true}
                                        isAttachmet={true}
                                        description={lang.dict.get('uploadDrawingsOrDragDrop')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </If>
                <If condition={() => !vm.isDone}>
                    <div className="side-modal__submit">
                        <If condition={() => vm.isCanAddItems || vm.isCanAddPurchase}>
                            <Input.Checkbox
                                type="check"
                                isChecked={vm.isConfirm}
                                onChange={vm.setIsConfirm}
                                name={confirmMessage()}
                            />
                            <Button
                                color="blue"
                                rightImg="next"
                                value={lang.dict.get('goSubmit')}
                                onClick={vm.submit}
                                isDisabled={vm.isSubmitLocked}
                                isLoading={vm.isLoading}
                            />
                        </If>
                        <If condition={() => vm.canConfirmAction}>
                            <Input.Checkbox
                                type="check"
                                isChecked={vm.isConfirm}
                                onChange={vm.setIsConfirm}
                                name={confirmMessage()}
                            />
                            <div className="side-modal__submit-btns">
                                <If condition={() => vm.canContractorReject}>
                                    <Button
                                        color="white"
                                        leftImg="close-red"
                                        value={lang.dict.get('reject')}
                                        onClick={() => vm.submit(false)}
                                    />
                                </If>
                                <Button
                                    color="blue"
                                    rightImg="next"
                                    value={lang.dict.get('confirm')}
                                    onClick={vm.submit}
                                    isDisabled={vm.isSubmitLocked}
                                    isLoading={vm.isLoading}
                                />
                            </div>
                        </If>
                    </div>
                </If>
            </div>
        </SideModal>
    );
});
