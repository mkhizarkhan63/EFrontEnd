import { observer } from 'mobx-react';
import { lang, utils } from '~/api';
import { Button, If, Input, Uploader } from '~/bits';
import type { ClientSubContractorModalVm } from '../ClientSubContractorModal.vm';

type Props = {
    parentVm: ClientSubContractorModalVm;
};

export const ContentUpdateExpense = observer(({ parentVm }: Props) => {
    if (!parentVm.newExpense) {
        return null;
    }

    return (
        <div className="side-modal__form">
            <If condition={parentVm.isNewExpense && !parentVm.isEditPrivateExpense}>
                <Input.Text
                    name={lang.dict.get('materialName')}
                    value={parentVm.newExpense.subContractedMaterialName}
                    onChange={parentVm.newExpense.setMaterialName}
                    placeHolder={lang.dict.get('fieldWriteMaterialName')}
                />
            </If>
            <Input.Text
                name={lang.dict.get('subContractorName')}
                value={parentVm.newExpense.subContractedName}
                onChange={parentVm.newExpense.setSubContractedName}
                placeHolder={lang.dict.get('fieldWriteSubContractorName')}
            />
            <Input.Text
                name={lang.dict.get('totalValueOmr')}
                value={utils.toInputNumber(parentVm.newExpense.totalPrice)}
                onChange={parentVm.newExpense.setTotalPrice}
                placeHolder={lang.dict.get('fieldWriteNumber')}
            />
            <div className="side-modal__form-add">
                <p className="side-modal__form-title">
                    {lang.dict.get('addPhotosAndDesc')}
                </p>
                <div className="side-modal__form-add-box">
                    <Input.Textarea
                        placeHolder={lang.dict.get('fieldWriteDescription')}
                        value={parentVm.newExpense.description}
                        onChange={parentVm.newExpense.setDescription}
                    />
                    <Uploader
                        description={lang.dict.get('uploadDrawingsOrDragDrop')}
                        acceptExtensions={['image/*', 'application/pdf']}
                        fileList={parentVm.newExpense.attachments}
                        onUpload={parentVm.newExpense.addAttachment}
                        onRemove={parentVm.newExpense.removeAttachment}
                        canDelete={true}
                        canDownloadAll={true}
                        isAttachmet={true}
                    />
                </div>
            </div>
            <Button
                color="blue"
                rightImg="next"
                value={lang.dict.get('goSubmit')}
                onClick={parentVm[`${parentVm.actionType}Expense`]}
                isLoading={parentVm.isLoading}
                isDisabled={!parentVm.validationPassed}
            />
        </div>
    );
});
