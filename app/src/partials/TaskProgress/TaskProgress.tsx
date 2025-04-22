import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Icons, If, Input, Uploader } from '~/bits';
import type { TaskUpdateType, WorkflowProgressType } from '~/models';
import { hook } from '~/utils';
import { capitalize } from '~/utils/string';
import { TaskProgressVm } from './TaskProgress.vm';
import type { PmModuleVm } from '~/views';

type Props = {
    taskData: WorkflowProgressType;
    isSubmitted: boolean;
    parentVm: () => PmModuleVm;
};

type TaskUpdatesProps = {
    vm: TaskProgressVm;
};

type SubmittedUpdatesProps = {
    vm: TaskProgressVm;
};

const TaskUpdates = observer(({ vm }: TaskUpdatesProps) => {
    const result = vm.taskData.localUpdates.map((item, i) => {
        const attachments = item.attachments.map(img => (
            <img
                className="comment__img"
                alt=""
                key={img.fileId}
                src={img.img?.url}
            />
        ));

        return (
            <div className="task-updates__item" key={i}>
                <p className="task-updates__item-title">
                    <span className="task-updates__item-title-num">#{i + 1}</span>
                    &nbsp;
                    <span className="task-updates__item-title-text">
                        {lang.dict.enum('taskUpdateType', item.type)}
                    </span>
                    <div className="task-updates__item-title-btns">
                        <div className="button button--edit">
                            <Button
                                color="transparent"
                                rightImg="edit"
                                onClick={() => vm.editUpdate(item)}
                            />
                        </div>
                        <div className="button button--delete">
                            <Button
                                color="transparent"
                                rightImg="delete"
                                onClick={() => vm.removeUpdate(item)}
                            />
                        </div>
                    </div>
                </p>
                <p className="task-updates__item-desc">{item.description}</p>
                <div className="task-updates__item-img-container">
                    {attachments}
                </div>
            </div>
        );
    });

    return <>{result}</>;
});

const comments = (item: TaskUpdateType, vm: TaskProgressVm) => {
    const commentList = item.comments.map((comment, i) => {
        const attachments = comment.attachments.map(img => (
            <img
                className="comment__img"
                alt=""
                key={img.fileId}
                src={img.img?.url}
                onClick={() => vm.openGallery(item, img, true)}
            />
        ));

        return (
            <div key={i} className="comment">
                <img
                    src={comment.avatar?.url}
                    alt=""
                    className="comment__avatar"
                />
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
                        {attachments}
                    </div>
                </div>
            </div>
        );
    });

    return <>{commentList}</>;
};

const SubmittedUpdates = observer(({ vm }: SubmittedUpdatesProps) => {
    const updates = vm.taskData.updateDtos.map((item, i) => {
        const attachments = item.attachments.map(img => (
            <img
                className="task-updates__item-img"
                alt=""
                key={img.fileId}
                src={img.img?.url}
                onClick={() => vm.openGallery(item, img)}
            />
        ));

        return (
            <div
                className="task-updates__item"
                key={i}
                data-is-open={item.isCommentsOpened}
            >
                <p className="task-updates__item-title">
                    <span className="task-updates__item-title-num">#{i + 1}</span>
                    &nbsp;
                    {lang.dict.enum('taskUpdateType', item.type)}
                </p>
                <p className="task-updates__item-desc">
                    {item.description}
                </p>
                <div className="task-updates__item-img-container">
                    {attachments}
                </div>
                <div className="task-updates__item-submitted">
                    <p className="task-updates__item-submitted-text">
                        {lang.dict.format(
                            'submittedByFormat',
                            [capitalize(item.actorType)])}, {item.createdDate.format('dddd, D MMM YYYY, h:mm A')}
                    </p>
                    <div
                        onClick={() => vm.switchComments(item)}
                        className="task-updates__item-submitted-btn"
                    >
                        {item.comments.length}
                        <Icons icon="comment-menu-icon" />
                    </div>
                </div>
                <If condition={item.isCommentsOpened}>
                    <div className="task-updates__comments">
                        {comments(item, vm)}
                    </div>
                    <div className="task-updates__comment">
                        <Input.Textarea
                            placeHolder={lang.dict.get('fieldWriteComment')}
                            value={item.currentComment.description}
                            onChange={e => item.currentComment.setDescription(e)}
                        />
                        <Uploader
                            acceptExtensions={['image/*', 'application/pdf']}
                            fileList={item.currentComment.attachments}
                            onUpload={item.currentComment.addAttachment}
                            onRemove={item.currentComment.removeAttachment}
                            canDelete={true}
                            canDownloadAll={true}
                            isAttachmet={true}
                            description={lang.dict.get('uploadDrawingsOrDragDrop')}
                        />
                        <div className="task-updates__comment-btn-send">
                            <Button
                                color="transparent"
                                centerImg="send"
                                onClick={() => vm.addComment(item)}
                            />
                        </div>
                    </div>
                </If>
            </div>
        );
    });

    return <>{updates}</>;
});

export const TaskProgress = observer(({ taskData, isSubmitted, parentVm }: Props) => {
    const vm = hook.useVm(() => new TaskProgressVm(taskData, parentVm), [isSubmitted]);

    return (
        <div className="task-progress">
            <If condition={isSubmitted}>
                <p className="task-progress__title">
                    {vm.observationTitle}&nbsp;
                    <span className="task-progress__title-num">
                        ({taskData.localUpdateDtos.length})
                    </span>
                </p>
                <div className="task-progress__form">
                    <Input.Select
                        value={vm.currentTask.type}
                        values={vm.selectValues}
                        onChange={vm.selectOnChange}
                    />
                    <Input.Textarea
                        placeHolder={lang.dict.get('fieldWriteDescription')}
                        value={vm.currentTask.description}
                        onChange={vm.setValue}
                    />
                    <div className="task-progress__form-btns">
                        <Uploader
                            description={lang.dict.get('uploadDrawingsOrDragDrop')}
                            acceptExtensions={['image/*', 'application/pdf']}
                            fileList={vm.currentTask.attachments}
                            onUpload={vm.onUpload}
                            onRemove={vm.removeDrawingFile}
                            canDelete={true}
                            canDownloadAll={true}
                            isAttachmet={true}
                        />
                        <div className="task-progress__form-btn-add">
                            <Button
                                color="blue"
                                centerImg="add"
                                isCircle={true}
                                isDisabled={vm.isUpdateSubmitDisabled}
                                onClick={vm.addUpdate}
                            />
                        </div>
                    </div>
                </div>
            </If>
            <div className="task-updates">
                <TaskUpdates vm={vm} />
            </div>
            <div className="task-updates task-updates--submitted">
                <p className="task-updates__header">
                    {lang.dict.get('submittedUpdates')}&nbsp;
                    <span className="task-updates__header-num">
                        ({taskData.updateDtos.length})
                    </span>
                </p>
                <SubmittedUpdates vm={vm} />
            </div>
        </div>
    );
});
