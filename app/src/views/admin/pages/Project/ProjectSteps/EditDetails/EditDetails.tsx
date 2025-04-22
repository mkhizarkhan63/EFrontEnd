import { observer } from 'mobx-react';
import { lang, utils } from '~/api';
import { Button, Hide, If, Input, InputCounter, SortedTable, Uploader } from '~/bits';
import type { Stage, StageUnit } from '~/models';
import { stores } from '~/stores';
import { hook } from '~/utils';
import type { ProjectVm } from '../../Project.vm';
import { EditDetailsVm } from './EditDetails.vm';
import { RejectionModal } from './RejectionModal';

type Props = {
    projectVm: ProjectVm;
};

const getColumns = () => SortedTable.createColumns<StageUnit>(() => [
    {
        keyName: 'sequence',
        displayName: lang.dict.get('sequence'),
        size: .45,
        render: (item, index) => <div className="sequence">{index + 1}</div>,
    },
    {
        keyName: 'name',
        displayName: lang.dict.get('name'),
        size: 5,
        render: item => <div className="name">{item.stageName}</div>,
    },
    {
        keyName: 'suggested',
        displayName: lang.dict.get('suggested'),
        align: 'right',
        render: item => <div className="suggested">{item.suggestedPercentage.value}</div>,
    },
    {
        keyName: 'suggestedTime',
        displayName: lang.dict.get('suggestedTime'),
        align: 'right',
        render: item => <div className="suggested">{item.suggestedTime.value}</div>,
    },
    {
        keyName: 'noOfItems',
        displayName: lang.dict.get('noOfItems'),
        size: .7,
        align: 'right',
        render: item => <div className="items">{item.sowItems.length}</div>,
    },
]);

const getTemplateColumns = (vm: EditDetailsVm) => SortedTable.createColumns<Stage>(() => [
    {
        keyName: 'templateId',
        displayName: lang.dict.get('templateId'),
        size: .69,
        render: item => <div>{item.stageId}</div>,
    },
    {
        keyName: 'template',
        displayName: lang.dict.get('template'),
        size: 4,
        render: item => <div className="template">{item.templateName}</div>,
    },
    {
        keyName: 'updatedOn',
        displayName: lang.dict.get('updatedOn'),
        align: 'right',
        render: item => <div>{item.updatedOn?.format('MM/DD/YYYY')}</div>,
    },
    {
        keyName: 'inspections',
        displayName: lang.dict.get('noOfInspections'),
        align: 'right',
        render: item => <div>{item.numberOfInspections}</div>,
    },
    {
        keyName: 'projectScope',
        displayName: lang.dict.get('projectScope'),
        size: .8,
        align: 'right',
        render: item => <div>{item.projectScope}</div>,
    },
    {
        keyName: 'projectsInUse',
        displayName: lang.dict.get('projectInUse'),
        size: .7,
        align: 'right',
        render: item => <div>{item.projectInUse}</div>,
    },
    {
        keyName: 'status',
        displayName: lang.dict.get('status'),
        size: .65,
        align: 'right',
        render: item => (
            <div data-status={item.forTemplate.status} className="status">
                {lang.dict.enum('sowAndStageStatus', item.status)}
            </div>
        ),
    },
    {
        keyName: 'actions',
        displayName: lang.dict.get('action'),
        size: .45,
        align: 'right',
        render: item => (
            <div className="action">
                <div className="action__item">
                    <Button
                        color="transparent"
                        value={lang.dict.get('edit')}
                        onClick={() => vm.goEditStage(item)}
                    />
                </div>
                <div className="action__item">
                    <Button
                        color="transparent"
                        value={lang.dict.get('fieldSelect')}
                        onClick={() => vm.setStageTemplate(item)}
                    />
                </div>
            </div>
        ),
    },
]);

export const EditDetails = observer(({ projectVm }: Props) => {
    const vm = hook.useVm(() => new EditDetailsVm(projectVm), [projectVm]);
    const projectAdmin = projectVm.project.forAdmin;

    return (
        <div className="edit-details">
            <div className="edit-details__header">
                <h3 className="edit-details__header-text">
                    {lang.dict.get('clientRequestDetails')}
                </h3>
                <div
                    className="edit-details__btn-dropdown"
                    data-is-closed={projectAdmin.isClosedClientDetails}
                >
                    <Button
                        color="white"
                        isCircle={true}
                        centerImg="dropdown-up"
                        onClick={projectAdmin.setClosedClientDetails}
                    />
                </div>
            </div>
            <div className="form-container" data-is-closed={projectAdmin.isClosedClientDetails}>
                <div
                    className="form form--first"
                    data-is-editable={projectAdmin.project.isEditable}
                >
                    <div className="form__first">
                        <div className="form__header">
                            <p className="form__title">
                                {lang.dict.get('constructionProjectDetail')}
                            </p>
                            <If condition={() => projectAdmin.project.isEditable}>
                                <Button
                                    color="blue"
                                    value={lang.dict.get('save')}
                                    rightImg="next"
                                    onClick={vm.save}
                                />
                            </If>
                        </div>
                        <Input.Select
                            name={lang.dict.get('projectCreatorGovernorate')}
                            value={projectAdmin.project.governorateId?.asNumber()}
                            values={projectAdmin.project.governorates}
                            onChange={projectAdmin.project.setGovernorate}
                        />
                        <Input.Select
                            name={lang.dict.get('projectCreatorWilayat')}
                            value={projectAdmin.project.wilayatId?.asNumber()}
                            values={projectAdmin.project.wilayats}
                            onChange={projectAdmin.project.setWilayat}
                        />
                        <Input.Select
                            name={lang.dict.get('projectUse')}
                            values={vm.projectUseList}
                            value={projectAdmin.project.landType}
                            onChange={projectAdmin.project.setProjectUse}
                        />
                        <div className="form__area">
                            <Input.Text
                                name={lang.dict.get('plotAreaM2')}
                                value={utils.toInputNumber(projectAdmin.project.landArea)}
                                onChange={projectAdmin.project.setPlotArea}
                                placeHolder={lang.dict.get('inputPlaceholderWrite')}
                            />
                        </div>
                        <div className="form__radio">
                            <p className="form__radio-label">
                                {lang.dict.get('areYouBuildingAllTheFloors')}
                            </p>
                            <Input.Checkbox
                                onChange={projectAdmin.project.setBuildingAllFloors}
                                type="radio"
                                text={{
                                    first: lang.dict.get('switchYes'),
                                    second: lang.dict.get('switchNo'),
                                }}
                                isChecked={projectAdmin.project.buildingAllAreaInTheDrawings}
                            />
                        </div>
                        <div className="form__area form__area--right">
                            <Input.Text
                                name={lang.dict.get('buildUpArea')}
                                value={utils.toInputNumber(projectAdmin.project.addedBuiltUpArea)}
                                onChange={projectAdmin.project.setBuildUpArea}
                                placeHolder={lang.dict.get('inputPlaceholderWrite')}
                                isDisabled={projectAdmin.project.isDesignStartingStep}
                            />
                        </div>
                        <Input.Textarea
                            name={lang.dict.get('projectCreatorAdditionalComment')}
                            value={projectAdmin.project.additionalComment}
                            onChange={projectAdmin.project.setAdditionalComment}
                            placeHolder={lang.dict.get('fieldWriteDescription')}
                            isReadOnly={!projectAdmin.project.isEditable}
                        />
                        <div>
                            <Input.Select
                                name={lang.dict.get('projectCreatorProjectType')}
                                values={vm.projectTypeList}
                                value={projectAdmin.project.constructionType}
                                onChange={projectAdmin.project.setProjectType}
                            />
                        </div>
                    </div>
                    <Hide reason="moved-to-phase-2">
                        <div className="form__second">
                            <h3 className="form__title">{lang.dict.get('contractClientDetails')}</h3>
                            <Input.Text
                                name={lang.dict.get('nationalIdNumber')}
                                placeHolder={lang.dict.get('inputPlaceholderWrite')}
                            />
                            <Input.Text
                                name={lang.dict.get('name')}
                                placeHolder={lang.dict.get('inputPlaceholderWrite')}
                            />
                            <Input.Text
                                name={lang.dict.get('nameInArabic')}
                                placeHolder={lang.dict.get('inputPlaceholderWrite')}
                            />
                        </div>
                    </Hide>
                </div>
            </div>
            <div className="form form--documents">
                <h3 className="form__title">
                    {lang.dict.get('krookieFiles')}
                    <span className="optional-text">
                        ({projectAdmin.project.krookieFiles.length})
                    </span>
                </h3>
                <Uploader
                    description={lang.dict.get('fieldDragDropUploaderPlaceholder')}
                    acceptExtensions={['application/pdf', 'image/*']}
                    isLocked={!projectAdmin.project.isEditable}
                    fileList={projectAdmin.project.krookieFiles}
                    onUpload={file => projectAdmin.project.uploadKrookieFile(file, true)}
                    onRemove={projectAdmin.project.removeKrookieFile}
                    canDelete={true}
                    canDownloadAll={true}
                    isWithName={true}
                />
                <h3 className="form__title">
                    {lang.dict.get('drawingsFiles')}
                    <span className="optional-text">
                        ({projectAdmin.project.drawingsFiles.length})
                    </span>
                </h3>
                <Uploader
                    description={lang.dict.get('fieldDragDropUploaderPlaceholder')}
                    acceptExtensions={['application/pdf', 'image/*']}
                    isLocked={!projectAdmin.project.isEditable}
                    fileList={projectAdmin.project.drawingsFiles}
                    onUpload={file => projectAdmin.project.uploadDrawingFile(file, true)}
                    onRemove={projectAdmin.project.removeDrawingFile}
                    canDelete={true}
                    canDownloadAll={true}
                    isWithName={true}
                />
            </div>
            <div className="edit-details__header">
                <h3 className="edit-details__header-text">{lang.dict.get('stagePlan')}</h3>
                <div className="edit-details__btn-dropdown" data-is-closed={projectAdmin.isClosedStagePlan}>
                    <Button
                        color="white"
                        isCircle={true}
                        centerImg="dropdown-up"
                        onClick={projectAdmin.setClosedStagePlane}
                    />
                </div>
            </div>
            <div className="form-container" data-is-closed={projectAdmin.isClosedStagePlan}>
                <div className="form">
                    <div className="form__stage-plan">
                        <p className="form__title">
                            {lang.dict.get('projectLevels')}
                        </p>
                        <InputCounter
                            value={vm.isEditable ? vm.basement : projectAdmin.project.stage?.basement ?? 0}
                            onChange={vm.setBasement}
                            name={lang.dict.get('basement')}
                        />
                        <InputCounter
                            value={vm.isEditable ? vm.additionalFloors : projectAdmin.project.stage?.additionalFloors ?? 0}
                            onChange={vm.setFloors}
                            name={lang.dict.get('additionalFloors')}
                        />
                        <InputCounter
                            value={vm.isEditable ? vm.outerBlocks : projectAdmin.project.stage?.outerBlocks ?? 0}
                            onChange={vm.setBlocks}
                            name={lang.dict.get('outerBlocks')}
                        />
                        <div className="checkboxes-group">
                            <Input.Checkbox
                                type="check"
                                onChange={vm.setGroundFloor}
                                isChecked={vm.isEditable ? vm.groundFloor : projectAdmin.project.stage?.groundFloor ?? false}
                                name={lang.dict.get('groundFloor')}
                            />
                            <Input.Checkbox
                                type="check"
                                onChange={vm.setLevellingFloor}
                                isChecked={vm.isEditable ? vm.levellingFloor : projectAdmin.project.stage?.levellingFloor ?? false}
                                name={lang.dict.get('levellingFloor')}
                            />
                            <Input.Checkbox
                                type="check"
                                onChange={vm.setPenthouseFloor}
                                isChecked={vm.isEditable ? vm.penthouseFloor : projectAdmin.project.stage?.penthouseFloor ?? false}
                                name={lang.dict.get('penthouseFloor')}
                            />
                            <Input.Checkbox
                                type="check"
                                onChange={vm.setPool}
                                isChecked={vm.isEditable ? vm.pool : projectAdmin.project.stage?.pool ?? false}
                                name={lang.dict.get('pool')}
                            />
                        </div>
                        <If condition={() => projectAdmin.project.isEditable}>
                            <Button
                                color="blue"
                                value={lang.dict.get('submitLevels')}
                                rightImg="next"
                                onClick={vm.submitLevels}
                            />
                        </If>
                    </div>
                    <If condition={() => vm.stageTemplates.data.length > 0 && vm.stageUnits.length === 0}>
                        <div className="form__stage-template form__stage-template--select">
                            <div className="form__title-with-addition">
                                <div>
                                    <p className="form__title">
                                        {lang.dict.get('selectStageTemplate')}
                                    </p>
                                    <div className="form__subtitle">
                                        <p className="form__subtitle-text">
                                            {vm.groundFloor && 'G'}
                                            {vm.levellingFloor && ' + L'}
                                            {vm.penthouseFloor && ' + P'}
                                            {vm.pool && ' + P'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <SortedTable
                                data={vm.stageTemplates.data}
                                keyValue="id"
                                columns={getTemplateColumns(vm)}
                            />
                        </div>
                    </If>
                    <If condition={() => vm.stageUnits.length > 0} >
                        <div className="form__stage-template" data-super-admin={stores.display.isSuperAdmin}>
                            <div className="form__title form__title-with-addition">
                                <div>
                                    <p className="form__title">
                                        {vm.stage?.templateName}
                                    </p>
                                    <div className="form__subtitle">
                                        <p className="form__subtitle-text">{vm.stage?.stageId}</p>
                                        <p className="form__subtitle-text">{vm.stage?.sow?.contractName}</p>
                                    </div>
                                </div>
                                <If condition={!stores.display.isSuperAdmin}>
                                    <div className="form__title-btn">
                                        <Button
                                            color="transparent"
                                            value={lang.dict.get('contact')}
                                        />
                                        {lang.dict.get('superAdminToEditStageTemplate')}
                                    </div>
                                </If>
                                <If condition={stores.display.isSuperAdmin}>
                                    <Button
                                        color="white"
                                        value={lang.dict.get('edit')}
                                        onClick={vm.goCopyStage}
                                    />
                                </If>
                            </div>
                            <SortedTable
                                data={vm.stageUnits}
                                keyValue="id"
                                columns={getColumns()}
                            />
                        </div>
                    </If>
                    <If condition={() => vm.notFound}>
                        <div className="form__stage-empty" data-super-admin={stores.display.isSuperAdmin}>
                            <img
                                className="form__stage-empty-img"
                                src="/assets/graphics/empty.svg"
                                alt="No Stage Template Found"
                            />
                            <p className="form__stage-empty-title">{lang.dict.get('notFoundStageTemplate')}</p>
                            <If condition={stores.display.isSuperAdmin}>
                                <div className="form__stage-empty-btns">
                                    <Button
                                        color="white"
                                        value={lang.dict.get('newStageTemplate')}
                                        onClick={vm.goCreateStage}
                                        leftImg="add"
                                    />
                                    <Button
                                        color="blue"
                                        value={lang.dict.get('editStageTemplate')}
                                        onClick={vm.goStageList}
                                        rightImg="next-sign"
                                    />
                                </div>
                            </If>
                            <If condition={!stores.display.isSuperAdmin}>
                                <div className="form__stage-empty-subtitle">
                                    <Button
                                        color="transparent"
                                        value={lang.dict.get('contact')}
                                    />
                                    {lang.dict.get('superAdminToAddStageTemplate')}
                                </div>
                            </If>
                        </div>
                    </If>
                </div>
            </div>
            <If condition={() => projectAdmin.project.isEditable} >
                <div className="edit-details__button">
                    <Button
                        color="red"
                        value={lang.dict.get('reject')}
                        onClick={vm.openRejectionModal}
                    />
                    <Button
                        color="green"
                        value={lang.dict.get('approveProject')}
                        rightImg="next"
                        onClick={vm.approve}
                        isDisabled={!vm.stage}
                    />
                </div>
            </If>
            <If condition={vm.isRejectionModalOpened}>
                <RejectionModal
                    onClose={vm.closeRejectionModal}
                    reason={vm.rejectReason}
                    onReject={vm.reject}
                    onChange={vm.changeReason}
                />
            </If>
        </div>
    );
});
