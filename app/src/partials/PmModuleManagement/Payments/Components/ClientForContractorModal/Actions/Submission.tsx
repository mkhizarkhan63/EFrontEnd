import { observer } from 'mobx-react';
import { Env, lang } from '~/api';
import { Button, Icons, If, Input, Uploader } from '~/bits';
import type { FileDataType, TaskUpdateType } from '~/models';
import { capitalize } from '~/utils/string';
import type { ClientForContractorModalVm } from '../ClientForContractorModal.vm';

type Props = {
    parentVm: ClientForContractorModalVm;
    tasks?: TaskUpdateType[];
    isReadOnly: boolean;
    type: 'requested' | 'purchased';
};

export const Submission = observer(({ parentVm, tasks, type, isReadOnly }: Props) => {
    if (!tasks || tasks.length === 0) {
        return null;
    }

    const images = (files: FileDataType[]) => files.map(img => {
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
                className="material-updates__item-img"
                alt="&nbsp;"
                key={img.fileId}
                src={img.img?.url}
                onClick={() => click()}
            />
        );
    });

    const comments = (item: TaskUpdateType) => {
        if (item.comments.length === 0) {
            return null;
        }

        const commentList = item.comments.map((comment, i) => (
            <div key={`${comment.name}+${i}`} className="comment">
                <img
                    src={comment.avatar?.url}
                    alt="&nbsp;"
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
                        {images(comment.attachments)}
                    </div>
                </div>
            </div>
        ));

        return <>{commentList}</>;
    };

    const result = tasks.map((item, i) => {
        const attachments = images(item.attachments);

        return (
            <div
                className="material-updates__item"
                key={i}
                data-is-open={item.isCommentsOpened}
                data-is-read-only={isReadOnly}
                data-type={type}
            >
                <div className="material-updates__item-top">
                    <div className="material-updates__item-top-left">
                        <If condition={type === 'requested'}>
                            <div className="material-updates__item-col">
                                <span className="material-updates__item-title">
                                    #{i + 1}&nbsp;
                                </span>
                                <span className="material-updates__item-text">
                                    {item.itemName}
                                </span>
                            </div>
                            <div className="material-updates__item-col">
                                <span className="material-updates__item-title">
                                    {lang.dict.get('quantity')}&nbsp;
                                </span>
                                <span className="material-updates__item-text">
                                    {item.quantity}
                                </span>
                            </div>
                        </If>
                        <If condition={type === 'purchased'}>
                            <div className="material-updates__item-col">
                                <span className="material-updates__item-title">
                                    {lang.dict.get('totalPrice')}&nbsp;
                                </span>
                                <span className="material-updates__item-text">
                                    {lang.dict.format('omrFormat', [item.totalPrice])}
                                </span>
                            </div>
                        </If>
                    </div>
                    <If condition={!isReadOnly}>
                        <div className="material-updates__item-btns">
                            <div className="button button--edit">
                                <Button
                                    color="transparent"
                                    rightImg="edit"
                                    onClick={() => parentVm.editUpdate(item)}
                                />
                            </div>
                            <div className="button button--delete">
                                <Button
                                    color="transparent"
                                    rightImg="delete"
                                    onClick={() => parentVm.removeUpdate(item)}
                                />
                            </div>
                        </div>
                    </If>
                </div>
                <p className="material-updates__item-desc">
                    {item.description}
                </p>
                <div className="material-updates__item-img-container">
                    {attachments}
                </div>
                <If condition={isReadOnly}>
                    <div
                        className="material-updates__item-submitted"
                    >
                        <div className="material-updates__item-submitted-top">
                            <p className="material-updates__item-submitted-text">
                                {lang.dict.format(
                                    'submittedByFormat',
                                    [capitalize(item.actorType)],
                                )},
                                {item.createdDate.format('dddd, D MMM YYYY, h:mm A')}
                            </p>
                            <div
                                onClick={() => parentVm.switchComments(item)}
                                className="material-updates__item-submitted-btn"
                            >
                                {item.comments.length}
                                <Icons icon="comment-menu-icon" />
                            </div>
                        </div>
                        <If condition={item.isCommentsOpened}>
                            <div className="material-updates__comments">
                                {comments(item)}
                            </div>
                            <div className="material-updates__comment">
                                <Input.Textarea
                                    placeHolder={lang.dict.get('fieldWriteComment')}
                                    value={item.currentComment.description}
                                    onChange={item.currentComment.setDescription}
                                />
                                <Uploader
                                    acceptExtensions={['image/*']}
                                    fileList={item.currentComment.attachments}
                                    onUpload={item.currentComment.addAttachment}
                                    onRemove={item.currentComment.removeAttachment}
                                    canDelete={true}
                                    canDownloadAll={true}
                                    isAttachmet={true}
                                    description={lang.dict.get('uploadDrawingsOrDragDrop')}
                                />
                                <div className="material-updates__comment-btn-send">
                                    <Button
                                        color="transparent"
                                        centerImg="send"
                                        onClick={() => parentVm.addComment(item)}
                                        isLoading={parentVm.isLoading}
                                    />
                                </div>
                            </div>
                        </If>
                    </div>
                </If>
            </div>
        );
    });

    return <div className="material-updates">{result}</div>;
});
