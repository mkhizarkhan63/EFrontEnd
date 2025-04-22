import { observer } from 'mobx-react';
import moment from 'moment';
import { E, lang } from '~/api';
import { Button, Close, If, Input, SideModal, Uploader } from '~/bits';
import type { PmModuleVm } from '../PmModule.vm';
import { UpdateModal } from '~/partials/PmModuleManagement/Updates/Components';

type Props = {
    vm: PmModuleVm;
};

type ObservationUpdatesProps = {
    vm: PmModuleVm;
};

const ObservationUpdates = observer(({ vm }: ObservationUpdatesProps) => {
    const result = vm.observationList.localUpdates.map((item, i) => {
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
                                onClick={() => vm.editObservation(item)}
                            />
                        </div>
                        <div className="button button--delete">
                            <Button
                                color="transparent"
                                rightImg="delete"
                                onClick={() => vm.removeObservation(item)}
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

export const AddObservation = observer(({ vm }: Props) => {
    if (vm.isUpdateModalOpened) {
        return (
            <UpdateModal
                update={vm.updateForModal}
                onBlur={() => vm.closeObservationModal()}
                openGallery={vm.openGallery}
                onSetFlag={vm.changeFlaggedStatus}
                addComment={vm.addComment}
                stageNumber={vm.project?.currentStage() ?? 0}
            />
        );
    }

    return (
        <SideModal variant="add-observation" onBlur={() => vm.closeObservationModal()}>
            <div className="side-modal__header">
                <Close onClick={() => vm.closeObservationModal()} />
                <div className="side-modal__header-title">
                    {lang.dict.get('addObservation')}
                </div>
            </div>
            <div className="side-modal__content">
                <p className="desc">
                    {lang.dict.get('observationDesc')}
                </p>
                <div className="section">
                    <div className="section__row">
                        <span className="title">
                            {lang.dict.get('submissionDate')}&nbsp;
                        </span>
                        <span className="value">
                            {moment().format('dddd, D MMM YYYY, h:mm A')}
                        </span>
                    </div>
                    <div className="section__row">
                        <span className="title">
                            {lang.dict.get('stage')}&nbsp;
                        </span>
                        <span className="value">
                            {vm.stageName}
                        </span>
                    </div>
                    <div className="section__row">
                        <span className="title">
                            {lang.dict.get('stageItem')}&nbsp;
                        </span>
                        <span className="value">
                            {vm.stageItemName}
                        </span>
                    </div>
                    <div className="section__row">
                        <span className="input-header">
                            {lang.dict.get('selectStage')}
                        </span>
                        <Input.Select
                            values={vm.stageValues}
                            value={vm.stage}
                            onChange={vm.setStage}
                        />
                    </div>
                    <If condition={vm.stageItemValues.length > 0}>
                        <div className="section__row">
                            <span className="input-header">
                                {lang.dict.get('selectStageItem')}
                            </span>
                            <Input.Select
                                values={vm.stageItemValues}
                                value={vm.stageItem}
                                onChange={vm.setStageItem}
                                placeHolder={lang.dict.get('selectStagePlaceholder')}
                            />
                        </div>
                    </If>
                </div>
                <div className="task-progress">
                    <p className="task-progress__title">
                        {vm.observationTitle}&nbsp;
                        <span className="task-progress__title-num">
                            ({vm.observationList.localUpdates.length})
                        </span>
                    </p>
                    <div className="task-progress__form">
                        <Input.Select
                            value={vm.currentObservation.type}
                            values={vm.selectObservationValues}
                            onChange={vm.selectOnChange}
                        />
                        <Input.Textarea
                            placeHolder={lang.dict.get('fieldWriteDescription')}
                            value={vm.currentObservation.description}
                            onChange={vm.setObservationDesc}
                        />
                        <div className="task-progress__form-btns">
                            <Uploader
                                description={lang.dict.get('uploadDrawingsOrDragDrop')}
                                acceptExtensions={['image/*', 'application/pdf']}
                                fileList={vm.currentObservation.attachments}
                                onUpload={vm.onUploadObservationFile}
                                onRemove={vm.onRemoveObservationFile}
                                canDelete={true}
                                canDownloadAll={true}
                                isAttachmet={true}
                            />
                            <div className="task-progress__form-btn-add">
                                <Button
                                    color="blue"
                                    centerImg="send"
                                    isCircle={true}
                                    isDisabled={false}
                                    onClick={vm.addObservation}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="task-updates">
                        <ObservationUpdates vm={vm} />
                    </div>
                </div>
                <If condition={vm.context === E.RoleInCompany.consultant}>
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
                <div className="task-bottom">
                    <Input.Checkbox
                        type="check"
                        isChecked={vm.isObservationConfirmed}
                        name={lang.dict.get('observationConfirm')}
                        onChange={() => vm.switchObservationConfirm()}
                    />
                    <div className="task-bottom__btns">
                        <div className="task-bottom__btn-submit">
                            <Button
                                color="blue"
                                rightImg="next"
                                value={lang.dict.get('goSubmit')}
                                onClick={() => vm.submitObservation()}
                                isDisabled={!vm.isObservationConfirmed}
                                isLoading={vm.isProcessing}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SideModal>
    );
});
