import { observer } from 'mobx-react';
import { lang, utils } from '~/api';
import { Button, Input, Uploader } from '~/bits';
import type { ClientForContractorModalVm } from '../ClientForContractorModal.vm';

type Props = {
    parentVm: ClientForContractorModalVm;
};

export const AddItemsForClientBuy = observer(({ parentVm }: Props) => {
    const {
        materialProgress,
        currentQuantity,
        ratesType,
        addQuantity,
        isCurrentQuantityValid,
    } = parentVm;

    return (
        <div className="material-delivery">
            <p className="material-delivery__header">
                {lang.dict.format('addItemsForClientTobuy', [materialProgress?.localMaterialQuantities.length])}
            </p>
            <span className="material-delivery__text">
                {lang.dict.get('submitItemsRequiredToCompleteConstructionWorks')}
            </span>
            <div className="material-delivery__form">
                <div className="material-delivery__form-row">
                    <Input.Text
                        placeHolder={lang.dict.get('itemName')}
                        value={currentQuantity.itemName}
                        onChange={currentQuantity.setItemName}
                        name={lang.dict.get('itemName')}
                    />
                    <Input.TextAndSelect
                        textName={lang.dict.get('quantity')}
                        textValue={utils.toInputNumber(currentQuantity.quantity)}
                        textOnChange={currentQuantity.setQuantity}
                        selectValue={currentQuantity.rateType}
                        selectValues={ratesType}
                        selectOnChange={currentQuantity.setRateType}
                    />
                </div>
                <div className="material-delivery__form-box">
                    <Input.Textarea
                        placeHolder={lang.dict.get('fieldWriteDescription')}
                        value={currentQuantity.description}
                        onChange={currentQuantity.setDescription}
                    />
                    <div className="material-delivery__form-box-btns">
                        <Uploader
                            acceptExtensions={['image/*', 'application/pdf']}
                            fileList={currentQuantity.attachments}
                            onUpload={currentQuantity.addAttachment}
                            onRemove={currentQuantity.removeAttachment}
                            canDelete={true}
                            canDownloadAll={true}
                            isAttachmet={true}
                            description={lang.dict.get('uploadDrawingsOrDragDrop')}
                        />
                        <div className="material-delivery__form-box-btn-add">
                            <Button
                                color="blue"
                                centerImg="add"
                                isCircle={true}
                                isDisabled={!isCurrentQuantityValid}
                                onClick={addQuantity}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
