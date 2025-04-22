import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, ErrorList, Icons, If, IfDef, Input, CriticalError, SortedTable, Subheader, Uploader } from '~/bits';
import { DeleteModal } from '~/bits/DeleteModal';
import type { SowSubitem } from '~/models';
import { Page } from '~/partials';
import { useVm } from '~/utils/hook';
import { LoadingPage } from '~/views';
import { SowItemVm } from './SowItem.vm';
import { WorkflowModal } from './WorkflowModal';

// TODO whole component should be refactor

type Props = {
    isCreating?: boolean;
};

const getColumns = (vm: SowItemVm) => SortedTable.createColumns<SowSubitem>(() => [
    {
        keyName: 'orderNumber',
        displayName: lang.dict.get('no'),
        size: .25,
        render: item => <div>{item.shownOrder}</div>,
    },
    {
        keyName: 'titleEnglish',
        displayName: lang.dict.get('descriptionTitleEnglish'),
        size: 1.4,
        render: item => (
            <div className="en-desc">
                <If condition={() => !vm.isSelectedItem(item)}>
                    <div>
                        {item.titleEnglish}<br />
                        {item.englishDescription}
                    </div>
                </If>
                <If condition={() => vm.isSelectedItem(item)}>
                    <Input.Text
                        value={vm.currentSubitem?.titleEnglish}
                        onChange={vm.currentSubitem?.setTitleEnglish}
                        placeHolder={lang.dict.get('titleEnglish')}
                    />
                    <Input.Textarea
                        value={vm.currentSubitem?.englishDescription}
                        onChange={vm.currentSubitem?.setDescEnglish}
                        placeHolder={lang.dict.get('descriptionEnglish')}
                    />
                </If>
            </div>
        ),
    },
    {
        keyName: 'titleArabic',
        displayName: lang.dict.get('descriptionTitleArabic'),
        size: 1.4,
        align: 'right',
        render: item => (
            <div className="arabic-desc">
                <If condition={() => !vm.isSelectedItem(item)}>
                    <div>
                        {item.titleArabic}<br />
                        {item.arabicDescription}
                    </div>
                </If>
                <If condition={() => vm.isSelectedItem(item)}>
                    <Input.Text
                        isArabic={true}
                        value={vm.currentSubitem?.titleArabic}
                        onChange={vm.currentSubitem?.setTitleArabic}
                        placeHolder={lang.dict.get('titleArabic')}
                    />
                    <Input.Textarea
                        isArabic={true}
                        value={vm.currentSubitem?.arabicDescription}
                        onChange={vm.currentSubitem?.setDescArabic}
                        placeHolder={lang.dict.get('descriptionArabic')}
                    />
                </If>
            </div>
        ),
    },
    {
        keyName: 'supplier',
        displayName: lang.dict.get('supplier'),
        description: lang.dict.get('fieldOptional'),
        size: 1,
        render: item => (
            <div>
                <If condition={() => !vm.isSelectedItem(item)}>
                    <div className="supplier">
                        {item.supplier}
                    </div>
                </If>
                <If condition={() => vm.isSelectedItem(item)}>
                    <Input.Text
                        value={vm.currentSubitem?.supplier}
                        onChange={vm.currentSubitem?.setSupplier}
                        placeHolder={lang.dict.get('writeSupplier')}
                    />
                </If>
            </div>
        ),
    },
    {
        keyName: 'rate',
        displayName: lang.dict.get('rates'),
        description: lang.dict.get('fieldOptional'),
        size: .63,
        render: item => (
            <div>
                <If condition={() => !vm.isSelectedItem(item)}>
                    <p className="rate">
                        {item.rate}
                    </p>
                </If>
                <If condition={() => vm.isSelectedItem(item)}>
                    <Input.Text
                        value={vm.currentSubitem?.rate}
                        onChange={vm.currentSubitem?.setRate}
                        placeHolder={lang.dict.get('writeRate')}
                    />
                </If>
            </div>
        ),
    },
    {
        keyName: 'Workflow',
        displayName: 'Workflow',
        size: .85,
        render: item => {
            const workflowName = item.workflow.name ? item.workflow.name : item.acceptanceWorkflowName;

            return (
                <>
                    <If condition={() => vm.isSelectedItem(item) && !item.workflow.isEmptyButItemOptional}>
                        <div className="workflow-box">
                            {workflowName}
                            <Icons
                                icon="close"
                                remove={() => item.clear()}
                            />
                            <div className="workflow-box__edit">
                                <Icons
                                    icon="edit"
                                    remove={() => vm.openWorkflowModal()}
                                />
                            </div>
                        </div>
                    </If>
                    <If condition={() => !vm.isSelectedItem(item)}>
                        <div className="workflow-box" onClick={() => vm.openWorkflowPreview(item)}>
                            {workflowName}
                        </div>
                    </If>
                    <If condition={() => item.workflow.isEmptyButItemOptional && vm.isSelectedItem(item)}>
                        <div className="btn-add-workflow">
                            <Button
                                color="white"
                                leftImg="add"
                                value={lang.dict.get('addWorkflow')}
                                onClick={vm.openWorkflowModal}
                            />
                        </div>
                    </If>
                </>
            );
        },
    },
    {
        keyName: 'action',
        displayName: lang.dict.get('action'),
        size: .6,
        align: 'right',
        render: item => (
            <div className="buttons">
                <div className="icon-trash">
                    <Button
                        color="transparent"
                        rightImg="delete"
                        onClick={() => vm.removeSubitem(item.id)}
                    />
                </div>
                <If condition={() => !vm.isSelectedItem(item)}>
                    <div className="icon-edit">
                        <Button
                            color="transparent"
                            rightImg="edit"
                            onClick={() => vm.editSubitem(item)}
                        />
                    </div>
                </If>
                <If condition={() => vm.showAddRowButton}>
                    <div className="icon-copy">
                        <Button
                            color="transparent"
                            rightImg="copy"
                            onClick={() => vm.copySubitem(item)}
                        />
                    </div>
                </If>
                <If condition={() => vm.isSelectedItem(item)}>
                    <div className="submit">
                        <Button
                            color="transparent"
                            value={lang.dict.get('goSubmit')}
                            onClick={vm.submitSubitem}
                        />
                    </div>
                </If>
            </div>
        ),
    },
]);

export const SowItem = observer((props: Props) => {
    const vm = useVm(() => new SowItemVm({
        isCreating: props.isCreating === true,
    }), [props.isCreating]);

    const filteredColumns = () => {
        const columns = getColumns(vm);

        if (!vm.sow.isEditable) {
            return columns.filter(x => x.keyName !== 'action');
        }

        return columns;
    };

    if (vm.isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="sow-item-view">
            <Page>
                <If condition={() => !vm.isHavingItem}>
                    <Subheader
                        returnButton={vm.goBack}
                        hasReturnButton={true}
                        pageName={lang.dict.get('itemDetail')}
                    />
                    <CriticalError message="invalidRoute" />
                    <div className="sow-item-content" />
                </If>
                <If condition={() => vm.isHavingItem}>
                    <div className="sow-item-subheader subheader-type">
                        <ErrorList errors={vm.sowItem.errorListHolder} />
                        <Subheader
                            returnButton={vm.goBack}
                            hasReturnButton={true}
                            pageName={lang.dict.get('itemDetail')}
                        >
                            <If condition={() => vm.sow.isEditable}>
                                <Subheader.Right>
                                    <If condition={() => !vm.isCreating}>
                                        <div className="button-delete">
                                            <Button
                                                color="transparent"
                                                rightImg="delete"
                                                onClick={vm.openDeleteModal}
                                            />
                                        </div>
                                    </If>
                                    <Button
                                        color="green"
                                        rightImg="next"
                                        value={lang.dict.get('save')}
                                        onClick={vm.save}
                                    />
                                </Subheader.Right>
                            </If>
                            <Subheader.Bottom>
                                <div className="uploader-container">
                                    <If condition={() => vm.sow.isEditable}>
                                        <p className="uploader-container__header">
                                            {lang.dict.get('uploadIcon')}
                                        </p>
                                        <If condition={!vm.sowItem.logo?.hasImg}>
                                            <Uploader
                                                description={lang.dict.get('fieldCompanyUploader')}
                                                acceptExtensions={['image/*']}
                                                fileList={[]}
                                                onUpload={vm.sowItem.uploadAvatar}
                                                onRemove={vm.sowItem.removeAvatar}
                                                isLocked={!vm.sow.isEditable}
                                            />
                                        </If>
                                    </If>
                                    <If condition={() => Boolean(vm.image)}>
                                        <div className="uploader">
                                            <div className="uploaded">
                                                <img
                                                    className="uploader__uploaded-img"
                                                    src={vm.image}
                                                    alt="Company Logo"
                                                />
                                                <Button
                                                    centerImg="close"
                                                    value=""
                                                    onClick={vm.sowItem.removeAvatar}
                                                    color="gray"
                                                    isCircle={true}
                                                    hasOutline={true}
                                                    isDisabled={!vm.sow.isEditable}
                                                />
                                            </div>
                                        </div>
                                    </If>
                                </div>
                                <div className="inputs">
                                    <Input.Text
                                        name={lang.dict.get('english')}
                                        value={vm.sowItem.englishName}
                                        onChange={vm.setName}
                                        placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                                    />
                                    <div className="inputs__arabic">
                                        <Input.Text
                                            name={lang.dict.get('arabic')}
                                            value={vm.sowItem.arabicName}
                                            onChange={vm.setArabicName}
                                            placeHolder={lang.dict.get('fieldWriteArabicNamePlaceholder')}
                                        />
                                    </div>
                                    <Input.Select
                                        name={lang.dict.get('itemType')}
                                        values={vm.categories}
                                        value={vm.sowItem.currentCategory}
                                        onChange={vm.setCategory}
                                        isDisabled={!vm.sow.isEditable}
                                    />
                                    <div className="questions">
                                        <div className="question">
                                            {lang.dict.get('showInFrontend')}
                                            <div className="question__toggle">
                                                <p className="question__option question__option--no">
                                                    {lang.dict.get('switchNo')}
                                                </p>
                                                <Input.Checkbox
                                                    type="toggle"
                                                    isChecked={vm.sowItem.forConstruction.showItemInFrontend}
                                                    onChange={vm.sowItem.forConstruction.toggleShowItemInFrontend}
                                                    isDisabled={!vm.sow.isEditable}
                                                />
                                                <p className="question__option">
                                                    {lang.dict.get('switchYes')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="question">
                                            {lang.dict.get('mandatoryItem')}
                                            <div className="question__toggle">
                                                <p className="question__option question__option--no">{lang.dict.get('switchNo')}</p>
                                                <Input.Checkbox
                                                    type="toggle"
                                                    isChecked={vm.sowItem.forConstruction.isMandatory}
                                                    onChange={vm.sowItem.forConstruction.toggleIsMandatory}
                                                    isDisabled={!vm.sow.isEditable}
                                                />
                                                <p className="question__option">{lang.dict.get('switchYes')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Subheader.Bottom>
                        </Subheader>
                    </div>
                    <div className="sow-item-content">
                        <div className="sow-item-content__top">
                            <If condition={() => vm.sow.isEditable}>
                                <If condition={() => !vm.isMovable}>
                                    <div className="btn-animate">
                                        <Button
                                            color="white"
                                            value={lang.dict.get('reorderItems')}
                                            onClick={vm.startReorder}
                                        />
                                    </div>
                                </If>
                                <If condition={() => vm.isMovable}>
                                    <div className="btn-animate">
                                        <Button
                                            rightImg="next"
                                            color="green"
                                            value={lang.dict.get('save')}
                                            onClick={vm.saveOrder}
                                        />
                                    </div>
                                </If>
                            </If>
                        </div>
                        <div
                            className="table-with-btn-row"
                            data-is-editable={vm.sow.isEditable}
                        >
                            <SortedTable
                                data={vm.sorter.values.concat(vm.getAddingSubitem)}
                                keyValue="id"
                                columns={filteredColumns()}
                                sorter={vm.sorter}
                                isMovable={vm.isMovable}
                                onMove={vm.sowItem.forConstruction.moveSubitem}
                            />
                            <If condition={() => vm.showAddRowButton}>
                                <div className="btn-row">
                                    <Button
                                        color="white"
                                        leftImg="add"
                                        value={lang.dict.get('addNewRow')}
                                        onClick={vm.addSubitem}
                                    />
                                </div>
                            </If>
                        </div>
                    </div>
                </If>
                <IfDef
                    condition={() => vm.workflowModalVm}
                    render={wvm => <WorkflowModal vm={wvm} />}
                />
                <If condition={() => vm.isDeleteModal}>
                    <DeleteModal
                        onDelete={vm.deleteSowItem}
                        onCancel={vm.closeDeleteModal}
                        onBlur={vm.closeDeleteModal}
                        title={lang.dict.get('deleteSowItem')}
                        description={lang.dict.get('deleteSowItemDescription')}
                        buttonTitle={lang.dict.get('delete')}
                    />
                </If>
            </Page>
        </div>
    );
});
