import { observer } from 'mobx-react';
import { Env, lang } from '~/api';
import { Button, Close, Icons, If, Input, SideModal, Uploader } from '~/bits';
import type { FileDataType, TaskUpdateType } from '~/models';
import { hook, utilsNumber } from '~/utils';
import { capitalize } from '~/utils/string';
import { type PaymentsVm } from '../../Payments.vm';
import { ContentUpdateExpense } from './Actions';
import { ClientSubContractorModalVm } from './ClientSubContractorModal.vm';

type Props = {
    parentVm: () => PaymentsVm;
};

type SubmissionProps = {
    vm: ClientSubContractorModalVm;
};

const Submission = observer(({ vm }: SubmissionProps) => {
    const taskUpdate = vm.taskUpdateFromSubbmision;

    if (!taskUpdate) {
        return null;
    }

    const {
        isCommentsOpened,
        description,
        attachments,
        actorType,
        createdDate,
        comments,
        currentComment,
    } = taskUpdate;

    const images = (files?: FileDataType[]) => {
        if (!files) {
            return;
        }

        return files.map(img => {
            const click = () => {
                if (img.img?.url.includes('/assets/graphics/document.svg')) {
                    const a = document.createElement('a');
                    a.href = `${Env.get('API_ENDPOINT')}file/getfilerequest/${img.fileId}`;
                    a.download = img.file?.name ?? '';
                    a.target = '_blank';
                    a.click();

                }
            };

            return (
                <img
                    className="submission__img"
                    alt="&nbsp;"
                    key={img.fileId}
                    src={img.img?.url}
                    onClick={() => click()}
                />
            );
        });
    };

    const createComments = (item?: TaskUpdateType) => {
        if (!item || item.comments.length === 0) {
            return null;
        }

        const commentList = item.comments.map((comment, i) => (
            <div key={`${comment.name}+${i}`} className="comment">
                <img src={comment.avatar?.url} alt="&nbsp;" className="comment__avatar" />
                <div className="comment__right">
                    <p className="comment__row">
                        <span className="comment__name">
                            {comment.name}
                        </span>
                        <span className="comment__date">
                            {comment.createdDate?.format('dddd, D MMM YYYY, h:mm A')}
                        </span>
                    </p>
                    <p className="comment__desc">
                        {comment.description}
                    </p>
                    <div className="comment__images">
                        {images(comment.attachments)}
                    </div>
                </div>
            </div>
        ));

        return <>{commentList}</>;
    };

    return (
        <div
            className="submission"
            data-is-open={isCommentsOpened}
        >
            <p className="submission__desc">
                {description}
            </p>
            <div className="submission__img-container">
                {images(attachments)}
            </div>
            <div
                className="submission__submitted"
            >
                <div className="submission__submitted-top">
                    <p className="submission__submitted-text">
                        {lang.dict.format(
                            'submittedByFormat',
                            [capitalize(actorType)])}, {createdDate.format('dddd, D MMM YYYY, h:mm A')}
                    </p>
                    <div
                        onClick={() => vm.switchComments(taskUpdate)}
                        className="submission__submitted-btn"
                    >
                        {comments.length}
                        <Icons icon="comment-menu-icon" />
                    </div>
                </div>
                <If condition={isCommentsOpened}>
                    <div className="submission__comments">
                        {createComments(taskUpdate)}
                    </div>
                    <div className="submission__comment">
                        <Input.Textarea
                            placeHolder={lang.dict.get('fieldWriteComment')}
                            value={currentComment.description}
                            onChange={currentComment.setDescription}
                        />
                        <Uploader
                            acceptExtensions={['image/*']}
                            fileList={currentComment.attachments}
                            onUpload={currentComment.addAttachment}
                            onRemove={currentComment.removeAttachment}
                            canDelete={true}
                            canDownloadAll={true}
                            isAttachmet={true}
                            description={lang.dict.get('uploadDrawingsOrDragDrop')}
                        />
                        <div className="submission__comment-btn-send">
                            <Button
                                color="transparent"
                                centerImg="send"
                                onClick={() => vm.addComment(taskUpdate)}
                            />
                        </div>
                    </div>
                </If>
            </div>
        </div>
    );
});

export const ClientSubContractorModal = observer(({ parentVm }: Props) => {
    const vm = hook.useVm(
        () => new ClientSubContractorModalVm(parentVm()),
        [parentVm().currentSubContractor?.materialWorkflowId],
    );

    if (!vm.isOpenModal) {
        return null;
    }

    if (vm.isNewExpense) {
        return (
            <SideModal variant="add-expense" onBlur={vm.closeExpensesModal}>
                <div className="side-modal__header">
                    <Close onClick={vm.closeExpensesModal} />
                    <p className="side-modal__header-title">
                        {lang.dict.get('addExpenses')}
                    </p>
                </div>
                <div className="side-modal__content">
                    <p className="side-modal__text">
                        {lang.dict.get('recordYourMaterial')}
                    </p>
                    <ContentUpdateExpense parentVm={vm} />
                </div>
            </SideModal>
        );
    }

    if (!vm.subContractor) {
        return null;
    }

    const {
        currentTask,
        subContractorName,
        isPrivate,
        sowItem,
        stageOrderNumber,
    } = vm.subContractor;

    const dateTitle = vm.daysLeft ? lang.dict.get('dueDate') : lang.dict.get('completedOn');

    const daysLeft = vm.daysLeft
        ? (
            <span
                className="side-modal__row-days-left"
                data-status={currentTask.status}
            >
                {lang.dict.format('projectCountdownDaysFormat', [vm.daysLeft])}
            </span>
        )
        : null;

    return (
        <SideModal variant="add-expense" onBlur={vm.closeExpensesModal}>
            <div className="side-modal__header">
                <Close onClick={vm.closeExpensesModal} />
                <p className="side-modal__header-title">
                    {lang.dict.enum(
                        'taskStatus',
                        currentTask.status,
                    )}
                    <span
                        className="side-modal__header-title-status"
                        data-status={currentTask.status}
                    >
                        {lang.dict.enum(
                            'taskStatus',
                            currentTask.status,
                        )}
                    </span>
                </p>
            </div>
            <div
                className="side-modal__content"
                data-is-private={Boolean(!isPrivate)}
                data-is-edit={Boolean(vm.isPrivateExpense && !vm.isEditPrivateExpense)}
            >
                <div className="side-modal__top">
                    <If condition={Boolean(vm.taskUpdateFromSubbmision)}>
                        <div className="side-modal__row">
                            <p className="side-modal__row-title">
                                {lang.dict.get('subContractorName')}
                            </p>
                            <p className="side-modal__row-value">
                                {subContractorName}
                            </p>
                        </div>
                        <div className="side-modal__row">
                            <p className="side-modal__row-title">
                                {lang.dict.get('totalValue')}
                            </p>
                            <p className="side-modal__row-value">
                                {lang.dict.format(
                                    'omrFormat',
                                    [utilsNumber.toCurrency(vm.totalValue, 0, 3)],
                                )}
                            </p>
                        </div>
                    </If>
                    <div className="side-modal__row">
                        <p className="side-modal__row-title">
                            {dateTitle}
                        </p>
                        <p className="side-modal__row-value">
                            {currentTask.dueDate?.format('dddd, D MMM YYYY')}&nbsp;
                            <If condition={Boolean(daysLeft)}>
                                , {daysLeft}
                            </If>
                        </p>
                    </div>
                </div>
                <If condition={Boolean(!isPrivate)}>
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
                </If>
                <If condition={!vm.isEditPrivateExpense}>
                    <Submission vm={vm} />
                </If>
                <If condition={vm.isActionable}>
                    <p className="side-modal__subtitle">
                        {lang.dict.get('addDetails')}
                    </p>
                    <p className="side-modal__text">
                        {lang.dict.get('recordYourMaterial')}
                    </p>
                </If>
                <ContentUpdateExpense parentVm={vm} />
                <If condition={() => Boolean(vm.isPrivateExpense && !vm.isEditPrivateExpense)}>
                    <div className="side-modal__btn-edit">
                        <Button
                            color="white"
                            onClick={vm.editPrivateExpense}
                            value={lang.dict.get('edit')}
                        />
                    </div>
                </If>
            </div>
        </SideModal>
    );
});
