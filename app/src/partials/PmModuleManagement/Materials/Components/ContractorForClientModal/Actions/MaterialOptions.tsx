import { observer } from 'mobx-react';
import { E, Env, lang } from '~/api';
import { toInputNumber } from '~/api/Utils';
import { Button, Icons, If, Input, Uploader } from '~/bits';
import { type SubmissionType } from '~/models';
import { type MaterialOptionType } from '~/models/PmModels/MaterialOption';
import { capitalize } from '~/utils/string';
import type { ContractorForClientModalVm } from '../ContractorForClientModal.vm';

type Props = {
    vm: ContractorForClientModalVm;
    submission?: SubmissionType;
};

const comments = (item: MaterialOptionType) => {
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
                    key={img.fileId}
                    src={img.img?.url}
                    onClick={() => click()}
                />
            );
        });

        return (
            <div key={i} className="comment">
                <img
                    src={comment.avatar?.url}
                    alt="avatar"
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

const LocalMaterials = observer(({ vm, submission }: Props) => {
    const array = submission?.materialOptions ?? vm.materialOptions;

    if (!array) {
        return null;
    }

    const result = array.map((option, i) => {
        const attachments = option.attachments.map(img => (
            <img
                alt=""
                key={img.fileId}
                src={img.img?.url}
                className="material-options__box-img"
            />
        ));

        const content = (
            <div className="material-options__box">
                <div className="material-options__box-top">
                    {lang.dict.format('optionFormat', [i + 1])}
                    <If condition={vm.canSelectOptions && !vm.taskCompleted}>
                        <div className="material-options__box-radio" />
                    </If>
                </div>
                <div className="material-options__box-row">
                    <div className="material-options__box-row-col">
                        <p className="material-options__box-row-title">
                            {lang.dict.get('supplier')}
                        </p>
                        <p className="material-options__box-row-value">
                            {option.supplier}
                        </p>
                    </div>
                    <div className="material-options__box-row-col">
                        <p className="material-options__box-row-title">
                            {lang.dict.get('rate')}
                        </p>
                        <p className="material-options__box-row-value">
                            {option.rates} {lang.dict.get('omrItem')}
                        </p>
                    </div>
                    <div className="material-options__box-row-col">
                        <p className="material-options__box-row-title">
                            {lang.dict.get('totalValue')}
                        </p>
                        <p className="material-options__box-row-value">
                            {option.totalValue} {lang.dict.get('fieldOmr')}
                        </p>
                    </div>
                    <If condition={!submission && vm.canAddOptions}>
                        <div className="material-options__box-row-btns">
                            <Button
                                color="transparent"
                                rightImg="edit"
                                onClick={() => vm.editMaterialOption(option)}
                            />
                            <Button
                                color="transparent"
                                rightImg="delete"
                                onClick={() => vm.removeMaterialOption(option)}
                            />
                        </div>
                    </If>
                </div>
                <p className="material-options__box-desc">{option.description}</p>
                <div className="material-options__box-images">
                    {attachments}
                </div>
                <If condition={Boolean(submission ?? !vm.canAddOptions)}>
                    <div className="material-options__box-submitted" data-is-open={option.isCommentsOpened}>
                        <p className="material-options__box-submitted-text">
                            {lang.dict.format('submittedByFormat', [capitalize(option.actorType)])},
                            {option.createdDate?.format('dddd, D MMM YYYY, h:mm A')}
                        </p>
                        <div
                            onClick={() => vm.switchComments(option)}
                            className="material-options__box-submitted-btn"
                        >
                            {option.comments.length}
                            <Icons icon="comment-menu-icon" />
                        </div>
                    </div>
                </If>
                <If condition={option.isCommentsOpened}>
                    <div className="material-options__box-comments">
                        {comments(option)}
                    </div>
                    <div className="material-options__box-comment">
                        <Input.Textarea
                            placeHolder={lang.dict.get('fieldWriteComment')}
                            value={option.currentComment.description}
                            onChange={e => option.currentComment.setDescription(e)}
                        />
                        <Uploader
                            acceptExtensions={['image/*', 'application/pdf']}
                            fileList={option.currentComment.attachments}
                            onUpload={option.currentComment.addAttachment}
                            onRemove={option.currentComment.removeAttachment}
                            canDelete={true}
                            canDownloadAll={true}
                            isAttachmet={true}
                            description={lang.dict.get('uploadDrawingsOrDragDrop')}
                        />
                        <div className="material-options__box-comment-btn-send">
                            <Button
                                color="transparent"
                                centerImg="send"
                                onClick={() => vm.addComment(option)}
                            />
                        </div>
                    </div>
                </If>
            </div>
        );

        return !vm.canSelectOptions || submission || vm.taskCompleted
            ? (
                <div key={i} className="material-options__box-container">
                    {content}
                </div>
            )
            : (
                <div
                    onClick={() => vm.selectOption(option)}
                    data-is-selected={option.isSelected}
                    className="material-options__box-container"
                >
                    {content}
                </div>
            );
    });

    return <div className="material-options__box-list">{result}</div>;
});

const header = (vm: ContractorForClientModalVm) => {
    if (vm.taskCompleted) {
        return (
            <div className="material-options__header">
                {lang.dict.get('selectedOption')}
                <p className="material-options__header-desc">
                    {lang.dict.get('specialRequests')}
                </p>
            </div>
        );
    }

    if (vm.materialItem?.currentTask.isActionable) {
        return vm.materialItem.currentTask.actorType === E.WorkflowActorType.contractor
            ? (
                <p className="material-options__header">
                    {lang.dict.get('addOptionsForApproval')}&nbsp;
                    <span className="material-options__header-num">
                        ({vm.materialContractor.length})
                    </span>
                </p>
            )
            : (
                <div className="material-options__header">
                    {lang.dict.get('selectOptions')}&nbsp;
                    <span className="material-options__header-num">
                        ({vm.materialOptions?.length})
                    </span>
                    <p className="material-options__header-desc">
                        {lang.dict.get('specialRequests')}
                    </p>
                </div>
            );
    }

    if (vm.materialItem?.currentTask.actorType === E.WorkflowActorType.client
        && !vm.materialItem?.currentTask.isValidUserActor) {
        return (
            <p className="material-options__header">
                {lang.dict.get('submittedOptions')}&nbsp;
                <span className="material-options__header-num">
                    ({vm.materialItem.contractorSubmittedOptions?.length})
                </span>
            </p>
        );
    }

    return null;
};

const previousOptions = (vm: ContractorForClientModalVm) => vm.materialItem?.rejectedOptions
    .map((item, i) => (
        <div
            data-is-expanded={item.isPreviousCollapsed}
            className="previous-options"
            key={i}
        >
            <Button
                color="blue"
                rightImg="dropdown-up"
                onClick={item.switchPreviousCollapsed}
                value={lang.dict.get('previousOptions')}
            />
            <p className="previous-options__message">{item.rejectedOptionDescription}</p>
            <p className="previous-options__text">{lang.dict.get('rejectedByClient')}, {item.createdDate?.format('dddd, D MMM YYYY, h:mm A')}</p>
            <If condition={item.isPreviousCollapsed}>
                <LocalMaterials vm={vm} submission={item} />
            </If>
        </div>
    ));

export const MaterialOptions = observer(({ vm }: Props) => (
    <>
        <If condition={vm.isPreviousOptions && !vm.taskCompleted}>
            <div className="previous-options-list">
                {previousOptions(vm)}
            </div>
        </If>
        <div
            className="material-options"
            data-role={vm.currentRole}
            data-can-add-options={vm.canAddOptions}
            data-is-previous-options={vm.isPreviousOptions && !vm.taskCompleted}
            data-is-selectable={vm.canSelectOptions && !vm.taskCompleted}
        >
            {header(vm)}
            <If condition={() => vm.canAddOptions}>
                <form className="material-options__form">
                    <div className="material-options__form-row">
                        <Input.Text
                            name={lang.dict.get('supplier')}
                            value={vm.currentMaterialOption.supplier}
                            onChange={vm.currentMaterialOption.setSupplier}
                            placeHolder={lang.dict.get('writeSupplierField')}
                        />
                        <Input.Text
                            name={lang.dict.get('rates')}
                            value={toInputNumber(vm.currentMaterialOption.rates ?? 0)}
                            onChange={vm.currentMaterialOption.setRates}
                            placeHolder={lang.dict.get('rates')}
                        />
                    </div>
                    <Input.Text
                        name={lang.dict.get('totalValue')}
                        value={toInputNumber(vm.currentMaterialOption.totalValue ?? 0)}
                        onChange={vm.currentMaterialOption.setTotalValue}
                        placeHolder={lang.dict.get('totalValue')}
                    />
                    <div className="material-options__form-add">
                        <p className="material-options__form-title">
                            {lang.dict.get('addPhotosAndDesc')}
                        </p>
                        <div className="material-options__form-box">
                            <Input.Textarea
                                placeHolder={lang.dict.get('fieldWriteDescription')}
                                value={vm.currentMaterialOption.description}
                                onChange={vm.currentMaterialOption.setDescription}
                            />
                            <div className="material-options__form-btns">
                                <Uploader
                                    description={lang.dict.get('uploadDrawingsOrDragDrop')}
                                    acceptExtensions={['image/*', 'application/pdf']}
                                    fileList={vm.currentMaterialOption.attachments}
                                    onUpload={vm.currentMaterialOption.addAttachment}
                                    onRemove={vm.currentMaterialOption.removeAttachment}
                                    canDelete={true}
                                    canDownloadAll={true}
                                    isAttachmet={true}
                                />
                                <div className="material-options__form-btns-add">
                                    <Button
                                        color="blue"
                                        centerImg="add"
                                        isCircle={true}
                                        isDisabled={!vm.currentMaterialOption.isNotEmpty}
                                        onClick={vm.submitMaterialOption}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </If>
            <LocalMaterials vm={vm} />
        </div>
    </>
));
