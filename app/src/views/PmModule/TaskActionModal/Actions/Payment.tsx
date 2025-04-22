import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Icons, If, Input, InputCounter, Uploader } from '~/bits';
import type { BankDetailsType, InvoiceDetailsType, PaymentBlockType } from '~/models';
import { InvoiceModal } from '../InvoiceModal';
import moment from 'moment';
import { toCurrency } from '~/utils/number';

type Props = {
    payment?: PaymentBlockType;
    onClick: () => void;
    onClose: () => void;
    isInvoiceOpened: boolean;
    invoice?: InvoiceDetailsType;
    bankDetails?: BankDetailsType;
};

export const Payment = observer(({
    isInvoiceOpened,
    payment,
    onClick,
    invoice,
    onClose,
    bankDetails,
}: Props) => {
    if (!payment) {
        return null;
    }

    return (
        <div className="payment">
            <p className="payment__header">
                {lang.dict.get('paymentSummary')}
            </p>
            <div className="payment__table" data-is-penalty={payment.isPenaltyAvailable}>
                <div className="payment__table-header">
                    <span className="payment__table-cell payment__table-cell--desc">
                        {lang.dict.get('subscriptionInvoicesDescription')}
                    </span>
                    <span className="payment__table-cell payment__table-cell--value">
                        {lang.dict.get('stageValue')}
                    </span>
                    <span className="payment__table-cell payment__table-cell--subtotal">
                        {lang.dict.get('subtotal')}
                    </span>
                </div>
                <div className="payment__table-body">
                    <div className="payment__table-row">
                        <p className="payment__table-cell payment__table-cell--desc">
                            {lang.dict.format('stageFormat2', [payment.stageNumber])}
                        </p>
                        <p className="payment__table-cell payment__table-cell--value">
                            {toCurrency(payment.stageValue, 0, 3)}
                        </p>
                        <p className="payment__table-cell payment__table-cell--subtotal">
                            {toCurrency(payment.stageSubTotal, 0, 3)}
                        </p>
                    </div>
                    <If condition={payment.isRefundAvailable}>
                        <div className="payment__table-row">
                            <p className="payment__table-cell payment__table-cell--desc">
                                {lang.dict.get('refund')}
                            </p>
                            <p className="payment__table-cell payment__table-cell--value">
                                {payment.refundPercentage}%
                            </p>
                            <p className="payment__table-cell payment__table-cell--subtotal">
                                +{toCurrency(payment.refundSubtotal, 0, 3)}
                            </p>
                        </div>
                    </If>
                    <If condition={payment.isPenaltyAvailable}>
                        <div className="payment__table-row">
                            <p className="payment__table-cell payment__table-cell--desc">
                                {lang.dict.get('penalty')}
                            </p>
                            <p className="payment__table-cell payment__table-cell--value">
                                <InputCounter
                                    minValue={0}
                                    maxValue={payment.penaltyPercentage}
                                    value={payment.currentPenalty}
                                    onChange={payment.setPenalty}
                                    isPercentage={true}
                                />
                            </p>
                            <p className="payment__table-cell payment__table-cell--subtotal">
                                -{toCurrency(payment.penaltyOrRefundSubtotal, 0, 3)}
                            </p>
                        </div>
                    </If>
                </div>
            </div>
            <div className="payment__invoice">
                <Button
                    color="white"
                    value={lang.dict.get('viewInvoice')}
                    onClick={onClick}
                />
                <div className="payment__invoice-col">
                    <div className="payment__invoice-item">
                        <p className="payment__invoice-item-title">
                            {lang.dict.get('grandTotal')}
                        </p>
                        <p className="payment__invoice-item-value">
                            {lang.dict.format('omrFormat', [toCurrency(payment.stageSubTotal, 0, 3)])}
                        </p>
                    </div>
                </div>
            </div>
            <div className="payment__upload">
                <p className="payment__upload-title">
                    {lang.dict.get('uploadProofOfPayment')}
                </p>
                <Uploader
                    description={lang.dict.get('uploadProofOfPaymentOrDragDrop')}
                    acceptExtensions={['image/*', 'application/pdf']}
                    fileList={payment.attachments}
                    onUpload={payment.addAttachment}
                    onRemove={payment.removeAttachment}
                    canDelete={true}
                    canDownloadAll={true}
                />
                <p className="payment__upload-title">
                    {lang.dict.get('dateOfPayment')}
                </p>
                <div className="payment__upload-date">
                    <Input.DateSelect
                        type="date"
                        value={payment.dateOfPayment}
                        onChange={payment.setData}
                        placeHolder={lang.dict.get('chooseDate')}
                        max={moment()}
                    />
                    <Icons icon="calendar" />
                </div>
            </div>
            <If condition={isInvoiceOpened}>
                <InvoiceModal
                    onBlur={onClose}
                    invoice={invoice}
                    bankDetails={bankDetails}
                />
            </If>
        </div>
    );
});
