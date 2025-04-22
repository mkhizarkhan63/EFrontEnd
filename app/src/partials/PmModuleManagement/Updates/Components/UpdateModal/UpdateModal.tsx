import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Close, If, Input, SideModal, Uploader } from '~/bits';
import Carousel from 'nuka-carousel/lib/carousel';
import type { FileDataType, PmTaskUpdateType } from '~/models';
import { capitalize } from '~/utils/string';

type Props = {
    onBlur: () => void;
    update?: PmTaskUpdateType;
    openGallery: (item: PmTaskUpdateType, file: FileDataType, isComment?: boolean) => void;
    onSetFlag: (item: PmTaskUpdateType) => void;
    addComment: (item: PmTaskUpdateType) => void;
    stageNumber?: number;
};

type LeftButtonProps = {
    previousSlide: () => void;
};

type RightButtonProps = {
    nextSlide: () => void;
};

type CommentsProps = {
    update?: PmTaskUpdateType;
    openGallery: (item: PmTaskUpdateType, file: FileDataType, isComment?: boolean) => void;
};

const ButtonRight = ({ nextSlide }: RightButtonProps) => (
    <div className="slider-btn slider-btn--right">
        <Button
            centerImg="next"
            color="white"
            isCircle={true}
            onClick={() => nextSlide()}
        />
    </div>
);

const ButtonLeft = ({ previousSlide }: LeftButtonProps) => (
    <div className="slider-btn slider-btn--left">
        <Button
            centerImg="next"
            color="white"
            isCircle={true}
            onClick={() => previousSlide()}
        />
    </div>
);

const Comments = ({ update, openGallery }: CommentsProps) => {
    if (!update?.comments) {
        return null;
    }

    const elements = update.comments.map((comment, i) => (
        <div
            key={`${comment.name}+${i}`}
            className="comment"
        >
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
                    {comment.attachments.map(item => (
                        <img
                            key={item.id}
                            src={item.img?.url}
                            className="comment__img"
                            onClick={() => openGallery(update, item, true)}
                        />
                    ))}
                </div>
            </div>
        </div>
    ));

    return <>{elements}</>;
};

export const UpdateModal = observer(({
    onBlur,
    update,
    openGallery,
    onSetFlag,
    addComment,
    stageNumber,
}: Props) => {

    if (!update) {
        return null;
    }

    const attachments = update.attachments.map(item => (
        <img
            key={item.id}
            src={item.img?.url}
            onClick={() => openGallery(update, item)}
            className="side-modal__attachments-slider-img"
        />
    ));

    const title = () => {
        if (update.isInitialUpdate) {
            return update.customUpdateTitle;
        }

        if (update.isObservation) {
            return lang.dict.get(update.taskUpdateType);
        }

        if (update.isMaterialUpdate) {
            return lang.dict.get(update.altTaskName);
        }

        return update.taskName;
    };

    return (
        <SideModal variant="update-modal" onBlur={onBlur}>
            <div className="side-modal__top">
                Stage {update.stageNumber ?? stageNumber}
                &nbsp;
                <If condition={Boolean(update.sowItemName)}>
                    /&nbsp;
                    {update.sowItemName}
                </If>
                <If condition={Boolean(update.workflowName)}>
                    /&nbsp;
                    {update.workflowName}
                </If>
                <If condition={Boolean(update.taskName)}>
                    /&nbsp;
                    {update.taskName}
                </If>
            </div>
            <div className="side-modal__header">
                <Close onClick={onBlur} />
                <div className="side-modal__header-title">
                    <p className="side-modal__header-title-left">
                        #{update.sequenceId}
                    </p>
                    <p className="side-modal__header-title-right">
                        {title()}
                    </p>
                </div>
                <div
                    className="flag"
                    data-is-flagged={update.isFlagged}
                >
                    <Button
                        color="transparent"
                        centerImg={update.isFlagged ? 'flag-red' : 'flag'}
                        onClick={() => onSetFlag(update)}
                    />
                </div>
            </div>
            <p className="side-modal__desc">
                {update.description}
            </p>
            <div className="side-modal__attachments">
                <If condition={update.attachments.length > 0}>
                    <p className="side-modal__attachments-title">
                        {lang.dict.get('attachments')}&nbsp;
                        <span className="side-modal__attachments-title-num">
                            ({update.attachments.length})
                        </span>
                    </p>
                    <div className="side-modal__attachments-slider">
                        <Carousel
                            slidesToShow={5}
                            cellSpacing={14}
                            slidesToScroll={5}
                            renderCenterLeftControls={ButtonLeft}
                            renderCenterRightControls={ButtonRight}
                            renderBottomCenterControls={null}
                        >
                            {attachments}
                        </Carousel>
                    </div>
                </If>
            </div>
            <p className="side-modal__submitted">
                {lang.dict.format('submittedByFormat', [capitalize(update.submittedName)])}&nbsp;
                {update.submittedByName},&nbsp;
                {update.createdOn?.format('dddd, D MMM YYYY, h:mm A')}
            </p>
            <p className="side-modal__comment-title">
                {lang.dict.get('comments')}&nbsp;
                <span className="side-modal__comment-title-num">
                    ({update.comments?.length ?? 0})
                </span>
            </p>
            <div className="side-modal__comment-list">
                <Comments
                    update={update}
                    openGallery={openGallery}
                />
            </div>
            <div className="side-modal__add-comment">
                <Input.Text
                    placeHolder={lang.dict.get('fieldWriteComment')}
                    value={update.currentComment.description}
                    onChange={update.currentComment.setDescription}
                />
                <Uploader
                    acceptExtensions={['image/*', 'application/pdf']}
                    fileList={update.currentComment.attachments}
                    onUpload={update.currentComment.addAttachment}
                    onRemove={update.currentComment.removeAttachment}
                    canDelete={true}
                    canDownloadAll={true}
                    isAttachmet={true}
                    description={lang.dict.get('uploadDrawingsOrDragDrop')}
                />
                <div className="side-modal__add-comment-btn-send">
                    <Button
                        color="transparent"
                        centerImg="send"
                        onClick={() => addComment(update)}
                    />
                </div>
            </div>
        </SideModal>
    );
});
