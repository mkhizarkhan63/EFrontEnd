import { observer } from 'mobx-react';
import moment from 'moment';
import { E, Env, lang } from '~/api';
import { Button, Close, Icons, If, Input, SideModal, Uploader } from '~/bits';
import type { MaterialItemType, PmStageProgressType, StageItemType, TaskUpdateType } from '~/models';
import { capitalize } from '~/utils/string';

type Props = {
    stageProgress?: PmStageProgressType;
    onBlur: () => void;
};

type UpdatesProps = {
    stageProgress: PmStageProgressType;
};

type CommentsProps = {
    item: TaskUpdateType;
};

type StageItemsProps = {
    stageItems: StageItemType[];
    materialItems: MaterialItemType[];
};

const Comments = observer(({ item }: CommentsProps) => {
    const commentList = item.comments.map((comment, i) => {
        const attachments = comment.attachments.map(img => {
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
                    className="comment__img"
                    alt=""
                    key={`${i}_${img.fileId}`}
                    src={img.img?.url}
                    onClick={() => click()}
                />
            );
        });

        return (
            <div
                key={`${i}_${comment.createdDate}`}
                className="comment"
            >
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
});

const Updates = observer(({ stageProgress }: UpdatesProps) => {
    const updates = stageProgress.updates.map((item, i) => {
        const attachments = item.attachments.map(img => (
            <img
                className="updates__img"
                alt=""
                key={`${i}_${img.fileId}`}
                src={img.img?.url}
            />
        ));

        return (
            <div
                className="updates"
                key={`${i}_${item.createdDate}`}
                data-is-open={item.isCommentsOpened}
            >
                <p className="updates__title">
                    <span className="updates__item-title-num">#{i + 1}</span>
                    &nbsp;
                    {item.type}
                </p>
                <p className="updates__desc">
                    {item.description}
                </p>
                <div className="updates__img-container">
                    {attachments}
                </div>
                <div className="updates__submitted">
                    <p className="updates__submitted-text">
                        {lang.dict.format('submittedByFormat', [capitalize(item.actorType)])}, {item.createdDate.format('dddd, D MMM YYYY, h:mm A')}
                    </p>
                    <div
                        onClick={() => stageProgress.switchComments(item)}
                        className="updates__submitted-btn"
                    >
                        {item.comments.length}
                        <Icons icon="comment-menu-icon" />
                    </div>
                </div>
                <If condition={item.isCommentsOpened}>
                    <div className="updates__comments">
                        <Comments item={item} />
                    </div>
                    <div className="updates__comment">
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
                        <div className="updates__comment-btn-send">
                            <Button
                                color="transparent"
                                centerImg="send"
                                onClick={() => stageProgress.addComment(item)}
                            />
                        </div>
                    </div>
                </If>
            </div>
        );
    });

    return <>{updates}</>;
});

const StageItems = observer(({ stageItems, materialItems }: StageItemsProps) => {
    const items = stageItems.map((item, i) => {
        const subItems = item.subItems.map((subItem, j) => (
            <div
                key={`${j}_${subItem.subItemName}`}
                className="stage-items__item"
            >
                <div data-status={subItem.status} className="stage-items__item-dot" />
                <p className="stage-items__item-title">{subItem.workflowName}</p>
                <p className="stage-items__item-text">{subItem.subItemName}</p>
            </div>
        ));

        return (
            <div
                key={`${i}_${item.name}}`}
                data-is-open={item.isOpened}
                className="stage-items"
            >
                <div
                    onClick={() => item.switchIsOpened()}
                    className="stage-items__header"
                >
                    <div
                        className="stage-items__header-img-container"
                        data-is-empty={!item.icon?.url}
                    >
                        <img
                            src={item.icon?.url}
                            alt=""
                            className="stage-items__header-img"
                        />
                    </div>
                    <p className="stage-items__header-name">{item.name}</p>
                    <Icons icon="arrow-right" />
                </div>
                <If condition={item.isOpened}>
                    <div className="stage-items__content">
                        {subItems}
                    </div>
                </If>
            </div>
        );
    });

    const materials = materialItems.map(item => {
        const name = lang.currentLanguage === 'en' ? item.englishName : item.arabicName;

        return (
            <div
                key={`${item.id} - ${item.englishName}`}
                className="stage-items"
            >
                <div
                    className="stage-items__header"
                >
                    <div
                        className="stage-items__header-img-container"
                        data-is-empty={!item.icon?.url}
                    >
                        <img
                            src={item.icon?.url}
                            alt=""
                            className="stage-items__header-img"
                        />
                    </div>
                    <p className="stage-items__header-name">{name}</p>
                </div>
            </div>
        );
    });

    return <>{items}{materials}</>;
});

export const StageViewModal = observer(({ stageProgress, onBlur }: Props) => {
    if (!stageProgress) {
        return null;
    }

    const { stage, tasksSummary, updates, stageItems, delays, materialItems } = stageProgress;



    const completionDate = stage.completionDate ? moment(stage.completionDate) : null;
    const baselineFinishDate = stage.baselineFinishDate ? moment(stage.baselineFinishDate) : null;
    const currentDate = moment();
    var calculatedDays = 0;
    if (!completionDate) {
        calculatedDays = 0;
    }
    if (completionDate && baselineFinishDate) {
        calculatedDays = baselineFinishDate.diff(completionDate, 'days');
    }
    else if (baselineFinishDate && currentDate.isAfter(baselineFinishDate)) {
        calculatedDays = baselineFinishDate.diff(currentDate, 'days');
    }


    return (
        <SideModal variant="stage-view" onBlur={onBlur}>
            <div className="stage-view">
                <div className="side-modal__header">
                    <Close onClick={onBlur} />
                    <div className="side-modal__header-title">
                        <p className="stage-view__name">
                            {lang.dict.format('stageFormat', [stage?.order])}
                            &nbsp;
                            {lang.currentLanguage === 'en' ? stage?.name : stage.nameAr}
                        </p>
                        <div className="stage-view__status" data-status={stage?.status}>
                            <p className="stage-view__status-text">
                                {lang.dict.enum('pmStageStatus', stage?.status)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="side-modal__content">
                    <div className="stage-view__info">
                        <div className="stage-view__row">
                            <p className="stage-view__info-title">
                                {lang.dict.get('stageValue')}
                            </p>
                            <p className="stage-view__info-value">
                                {stage?.weight}%
                            </p>
                        </div>
                        <div className="stage-view__row">
                            <p className="stage-view__info-title">
                                {lang.dict.get('duration')}
                            </p>
                            <p className="stage-view__info-value">
                                {lang.dict.format('daysFormat', [stage?.duration])}
                                <If condition={Boolean(stage.daysLeft)}>
                                    , <span className="delay">{lang.dict.format('projectCountdownDelayFormat', [Math.abs(stage?.daysLeft ?? 0)])}</span>
                                </If>
                            </p>
                        </div>
                        <p className="stage-view__info-desc">{lang.currentLanguage === 'en' ? stage?.description : stage?.descriptionAr}</p>
                    </div>
                    <div className="stage-view__dates">
                        <div className="stage-view__dates-content">
                            <div className="stage-view__dates-item">
                                <p className="stage-view__dates-title">
                                    {lang.dict.get('contractFinishDate')}
                                </p>
                                <p className="stage-view__dates-value">
                                    {stage?.baselineFinishDate?.format('dddd, D MMM YYYY')}
                                </p>
                            </div>
                            <div className="stage-view__dates-item">
                                <p className="stage-view__dates-title">
                                    {lang.dict.get('actualFinishDate')}
                                </p>
                                <p className="stage-view__dates-value">
                                    {stage?.completionDate?.format('dddd, D MMM YYYY') ?? '--'}
                                </p>
                            </div>

                        </div>
                        <If condition={stage.status !== E.PmStageStatus.upcoming}>
                            <div className="stage-view__delays">
                                <p className="stage-view__delays-title">

                                    {lang.dict.get('stageStatus')}

                                    <If condition={calculatedDays < 0}>
                                        <span className="calculatedDays" data-is-delay="true">{Math.abs(calculatedDays)} {lang.dict.get('daysInDelay')} </span>
                                    </If>
                                    <If condition={calculatedDays === 0}>
                                        <span className="calculatedDays" data-is-nodelay="true">{calculatedDays} {lang.dict.get('noDelays')} </span>
                                    </If>
                                    <If condition={calculatedDays > 0}>
                                        <span className="calculatedDays" data-is-ahead="true">{calculatedDays} {lang.dict.get('daysAhead')} </span>
                                    </If>
                                    {/* {lang.dict.get('stageDelays')} */}
                                </p>
                                <div className="stage-view__delays-content">
                                    {/* <div className="stage-view__delays-item">
                                        <p className="stage-view__delays-item-title">
                                            {lang.dict.get('contractor')}
                                        </p>
                                        <p className="stage-view__delays-item-value" data-is-delay={Boolean(delays.contractor)}>
                                            {lang.dict.format('daysFormat', [delays.contractor])}
                                        </p>
                                    </div> */}
                                    <div className="stage-view__delays-item">
                                        <p className="stage-view__delays-item-title">
                                            {lang.dict.get('consultant')}
                                        </p>
                                        <p className="stage-view__delays-item-value" data-is-delay={Boolean(delays.consultant)}>
                                            {delays.consultant == 0 ? lang.dict.get('noDelays') : lang.dict.format('projectCountdownDelayFormat', [delays.consultant])}
                                        </p>
                                    </div>
                                    <div className="stage-view__delays-item">
                                        <p className="stage-view__delays-item-title">
                                            {lang.dict.get('client')}
                                        </p>
                                        <p className="stage-view__delays-item-value" data-is-delay={Boolean(delays.client)}>
                                            {delays.client == 0 ? lang.dict.get('noDelays') : lang.dict.format('daysFormat', [delays.client])}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </If>
                    </div>
                    <div className="task-summary">
                        <p className="task-summary__title">
                            {lang.dict.get('tasksSummary')}
                        </p>
                        <div className="task-summary__row">
                            <div className="task-summary__item task-summary__item--upcoming">
                                <p className="task-summary__item-title">
                                    {lang.dict.get('upcoming')}
                                </p>
                                <p className="task-summary__item-value">
                                    {tasksSummary?.upcomingTasksCount}
                                </p>
                            </div>
                            <div className="task-summary__item task-summary__item--due">
                                <p className="task-summary__item-title">
                                    {lang.dict.get('due')}
                                </p>
                                <p className="task-summary__item-value">
                                    {tasksSummary?.dueTasksCount}
                                </p>
                            </div>
                            <div className="task-summary__item task-summary__item--completed">
                                <p className="task-summary__item-title">
                                    {lang.dict.get('completed')}
                                </p>
                                <p className="task-summary__item-value">
                                    {tasksSummary?.completedTasksCount}
                                </p>
                            </div>
                            <div className="task-summary__item task-summary__item--in-delay">
                                <p className="task-summary__item-title">
                                    {lang.dict.get('inDelay')}
                                </p>
                                <p className="task-summary__item-value">
                                    {tasksSummary?.inDelayTasksCount}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="stage-view__items">
                        <p className="stage-view__items-title">
                            {lang.dict.get('stageItems')}&nbsp;
                            <span className="stage-view__items-title-num">
                                ({stageItems.length})
                            </span>
                        </p>
                        <StageItems
                            stageItems={stageItems}
                            materialItems={materialItems}
                        />
                    </div>
                    <div className="stage-view__updates">
                        <p className="stage-view__updates-title">
                            {lang.dict.get('stageUpdates')}&nbsp;
                            <span className="stage-view__updates-title-num">
                                ({updates.length})
                            </span>
                        </p>
                        <Updates stageProgress={stageProgress} />
                    </div>
                </div>
            </div>
        </SideModal>
    );
});
