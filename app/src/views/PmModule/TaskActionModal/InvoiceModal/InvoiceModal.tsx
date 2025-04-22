import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Close, If, SideModal } from '~/bits';
import { Checkbox } from '~/bits/Input';
import type { BankDetailsType, InvoiceDetailsType } from '~/models';
import { toCurrency } from '~/utils/number';

type Props = {
    onBlur: VoidFunction;
    invoice?: InvoiceDetailsType;
    bankDetails?: BankDetailsType;
};

export const InvoiceModal = observer(({ onBlur, invoice, bankDetails }: Props) => {
    if (!invoice) {
        return null;
    }

    const handleDownload = () => {
        const app = document.querySelector('#app');
        if (!app || !(app instanceof HTMLElement)) {
            return;
        }

        app.setAttribute('data-is-print', 'true');

        setTimeout(() => {
            window.print();

            setTimeout(() => {
                app.removeAttribute('data-is-print');
            });
        });
    };

    const InvoiceBox = () => {
        if (bankDetails) {
            return (
                <div className="invoice-box">
                    <div className="invoice-box__right">
                        <p className="invoice-box__desc">
                            {lang.dict.get('name')}: {bankDetails?.accountHolderName}
                        </p>
                        <p className="invoice-box__desc">
                            {lang.dict.get('accountNumber')}: {bankDetails?.accountNumber}
                        </p>
                        <p className="invoice-box__desc">
                            {lang.dict.get('bankName')}: {bankDetails?.bankName}
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="invoice-box">
                <div className="invoice-box__right">
                    <p className="invoice-box__desc">
                        {lang.dict.get('name')}: Binaa Professional Services LLC
                    </p>
                    <p className="invoice-box__desc">
                        {lang.dict.get('accountNumber')}: 0315063513300018

                    </p>
                    <p className="invoice-box__desc">
                        {lang.dict.get('bankName')}: Bank Muscat
                    </p>
                </div>
            </div>
        );
    };

    const penalty = () => {
        if (invoice.isPenalty) {
            return lang.dict.get('penalty');
        }

        if (invoice.isRefund) {
            return lang.dict.get('refund');
        }
    };

    const penaltySubtotal = () => {
        if (invoice.isPenalty) {
            return invoice.penaltySubtotal;
        }

        if (invoice.isRefund) {
            return invoice.refundSubtotal;
        }
    };

    return (
        <div className="invoice">
            <SideModal
                variant="invoice"
                onBlur={onBlur}
            >
                <div className="side-modal__header">
                    <Close onClick={onBlur} />
                    <p className="side-modal__header-title">
                        {lang.dict.get('viewInvoice')}
                    </p>
                </div>
                <div className="side-modal__content">
                    <div className="bill-to">
                        <div className="bill-to__header">
                            <p className="bill-to__cell bill-to__cell--bill">
                                {lang.dict.get('billTo')}
                            </p>
                            <p className="bill-to__cell bill-to__cell--id">
                                {lang.dict.get('projectId')} #
                            </p>
                            <p className="bill-to__cell bill-to__cell--invoice">
                                {lang.dict.get('invoice')} #
                            </p>
                            <p className="bill-to__cell bill-to__cell--date">
                                {lang.dict.get('dateIssued')}
                            </p>
                        </div>
                        <div className="bill-to__body">
                            <div className="bill-to__cell bill-to__cell--bill invoice-box">
                                <img
                                    src={invoice.payer.avatar?.url}
                                    alt=""
                                    className="invoice-box__avatar"
                                />
                                <div className="invoice-box__right">
                                    <p className="invoice-box__name">
                                        {invoice.payer.name}
                                    </p>
                                </div>
                            </div>
                            <p className="bill-to__cell bill-to__cell--id">
                                {invoice.projectId}
                            </p>
                            <p className="bill-to__cell bill-to__cell--invoice">
                                {invoice.invoiceId}
                            </p>
                            <p className="bill-to__cell bill-to__cell--date">
                                {invoice.invoiceDateIssued?.format('dddd, D MMM YYYY, h:mm A')}
                            </p>
                        </div>
                    </div>
                    <div className="invoice-desc" data-is-penalty={invoice.isPenalty || invoice.isRefund}>
                        <div className="invoice-desc__header">
                            <p className="invoice-desc__cell invoice-desc__cell--desc">
                                {lang.dict.get('description')}
                            </p>
                            <p className="invoice-desc__cell invoice-desc__cell--project">
                                {lang.dict.get('fieldProjectValue')}
                            </p>
                            <p className="invoice-desc__cell invoice-desc__cell--stage">
                                {lang.dict.get('stageValue')}
                            </p>
                            <p className="invoice-desc__cell invoice-desc__cell--subtotal">
                                {lang.dict.get('subtotal')}
                            </p>
                        </div>
                        <div className="invoice-desc__body">
                            <p className="invoice-desc__cell invoice-desc__cell--desc">
                                {invoice.description}
                            </p>
                            <p className="invoice-desc__cell invoice-desc__cell--project">
                                {toCurrency(invoice.projectValue, 0, 3)}
                            </p>
                            <p className="invoice-desc__cell invoice-desc__cell--stage">
                                {invoice.stageValue}%
                            </p>
                            <p className="invoice-desc__cell invoice-desc__cell--subtotal">
                                {toCurrency(invoice.subtotal, 0, 3)}
                            </p>
                        </div>
                        <If condition={invoice.isPenalty || invoice.isRefund}>
                            <div className="invoice-desc__body invoice-desc__body--penalty">
                                <p className="invoice-desc__cell invoice-desc__cell--desc">
                                    {penalty()}
                                </p>
                                <p className="invoice-desc__cell invoice-desc__cell--subtotal">
                                    {toCurrency(penaltySubtotal())}
                                </p>
                            </div>
                        </If>
                    </div>
                    <div className="pay-to">
                        <div className="pay-to__left">
                            <p className="pay-to__left-title">
                                {lang.dict.get('payTo')}
                            </p>
                            <InvoiceBox />
                        </div>
                        <div className="pay-to__right">
                            <If condition={invoice.isVatApplied}>
                                <div className="pay-to__right-col">
                                    <p className="pay-to__title">
                                        {lang.dict.get('beforeTax')}
                                    </p>
                                    <p className="pay-to__value">
                                        {toCurrency(invoice.subtotal / 1.05, 0, 3)} {lang.dict.get('fieldOmr')}
                                    </p>
                                </div>
                                <div className="pay-to__right-col">
                                    <p className="pay-to__title">
                                        {lang.dict.get('tax5')}
                                    </p>
                                    <p className="pay-to__value">
                                        {toCurrency(invoice.subtotal - (invoice.subtotal / 1.05), 0, 3)} {lang.dict.get('fieldOmr')}
                                    </p>
                                </div>
                            </If>
                            <div className="pay-to__right-col">
                                <p className="pay-to__title">
                                    {lang.dict.get('grandTotal')}
                                </p>
                                <p className="pay-to__value">
                                    {toCurrency(invoice.subtotal, 0, 3)} {lang.dict.get('fieldOmr')}
                                </p>
                            </div>
                            <div className="pay-to__right-col">
                                <p className="pay-to__title">
                                    {lang.dict.get('dueDate')}
                                </p>
                                <p className="pay-to__date">
                                    {invoice.dueDate?.format('dddd, D MMM YYYY')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="payment-method">
                        <p className="payment-method__title">
                            {lang.dict.get('paymentMethod')}
                        </p>
                        <p className="payment-method__desc">
                            {lang.dict.get('paymentWarning')}
                        </p>
                        <p className="payment-method__desc">
                            {lang.dict.get('refundedAmount')}
                        </p>
                        <div className="payment-method__row">
                            <Button
                                color="white"
                                value={lang.dict.get('downloadPdf')}
                                leftImg="download-without-underscore"
                                onClick={handleDownload}
                            />
                            <div className="vat-checkbox">
                                <Checkbox
                                    onChange={() => invoice.switchVatApplied()}
                                    isChecked={invoice.isVatApplied}
                                    type="check"
                                    name={lang.dict.get('claimVat')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SideModal>
        </div>
    );
});
