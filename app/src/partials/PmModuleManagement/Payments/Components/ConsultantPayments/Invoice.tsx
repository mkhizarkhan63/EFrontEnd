import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Close, If, InputCounter, SideModal } from '~/bits';
import { hook } from '~/utils';
import { InvoiceVm } from './Invoice.vm';
import { type PmModuleVm } from '~/views';
import { toCurrency } from '~/utils/number';

type Props = {
    parentVm: () => PmModuleVm;
};

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

export const Invoice = observer(({ parentVm }: Props) => {
    const vm = hook.useVm(() => new InvoiceVm(parentVm()),
        [parentVm().consultantPaymentModel?.id],
    );

    if (!vm.isOpen || !parentVm() || !vm.modalData) {
        return null;
    }

    const siteVisit = vm.modalData.siteVisitsInformation.map((item, i) => (
        <div
            key={i}
            className="invoice-visits__row"
        >
            <p className="invoice-visits__cell invoice-visits__cell--title" data-is-delay={item.isDelay}>
                {lang.dict.get('stage')} {item.stageOrder} / {item.siteVisitDescription}
                <If condition={item.isDelay}>
                    <span>
                        &nbsp;{lang.dict.format('projectCountdownDelayFormat', [item.daysInDelay])}
                    </span>
                </If>
            </p>
            <p className="invoice-visits__cell invoice-visits__cell--date">
                {item.visitDate?.format('dddd, D MMM YYYY, h:mm A')}
            </p>
        </div>
    ));

    return (
        <div className="consultant-invoice">
            <If condition={vm.isBigView}>
                <SideModal variant="invoice" onBlur={vm.close}>
                    <div className="side-modal__header">
                        <Close onClick={vm.close} />
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
                                <p className="bill-to__body-title on-mobile">
                                    {lang.dict.get('billTo')}
                                </p>
                                <div className="bill-to__cell bill-to__cell--bill invoice-box">
                                    <img
                                        src={vm.modalData.actor.avatar?.url}
                                        alt=""
                                        className="invoice-box__avatar"
                                    />
                                    <div className="invoice-box__right">
                                        <p className="invoice-box__name">
                                            {vm.modalData.actor.name}
                                        </p>
                                        <p className="invoice-box__desc">
                                            Ph# {vm.modalData.actor.id}
                                        </p>
                                    </div>
                                </div>
                                <p className="bill-to__body-title on-mobile">
                                    {lang.dict.get('projectId')} #
                                </p>
                                <p className="bill-to__cell bill-to__cell--id">
                                    {vm.modalData.projectId}
                                </p>
                                <p className="bill-to__body-title on-mobile">
                                    {lang.dict.get('invoice')} #
                                </p>
                                <p className="bill-to__cell bill-to__cell--invoice">
                                    {vm.modalData.invoiceId}
                                </p>
                                <p className="bill-to__body-title on-mobile">
                                    {lang.dict.get('dateIssued')}
                                </p>
                                <p className="bill-to__cell bill-to__cell--date">
                                    {vm.modalData.generationDate.format('dddd, D MMM YYYY, h:mm A')}
                                </p>
                            </div>
                        </div>
                        <div className="invoice-visits">
                            <div className="invoice-visits__header">
                                <p className="invoice-visits__cell">
                                    {lang.dict.get('siteVisitsDescription')}
                                </p>
                                <p className="invoice-visits__cell invoice-visits__cell--date">
                                    {lang.dict.get('visiteDate')}
                                </p>
                            </div>
                            <div className="invoice-visits__body">
                                {siteVisit}
                            </div>
                        </div>
                        <div className="invoice-desc">
                            <div className="invoice-desc__header">
                                <p className="invoice-desc__cell invoice-desc__cell--desc">
                                    {lang.dict.get('description')}
                                </p>
                                <p className="invoice-desc__cell invoice-desc__cell--project">
                                    {lang.dict.get('noOfVisits')}
                                </p>
                                <p className="invoice-desc__cell invoice-desc__cell--stage">
                                    {lang.dict.get('visitPrice')}
                                </p>
                                <p className="invoice-desc__cell invoice-desc__cell--subtotal">
                                    {lang.dict.get('subtotal')}
                                </p>
                            </div>
                            <div className="invoice-desc__body">
                                <p className="invoice-desc__cell invoice-desc__cell--desc">
                                    {vm.modalData.consultantName}&nbsp;
                                    {lang.dict.get('supervisionFeesFor')}&nbsp;
                                    {vm.modalData.invoiceDate}&nbsp;
                                    {lang.dict.get('for')} #{vm.modalData.projectId}
                                </p>
                                <p className="invoice-desc__cell invoice-desc__cell--project">
                                    {vm.modalData.numberOfVisits}
                                </p>
                                <p className="invoice-desc__cell invoice-desc__cell--stage">
                                    {vm.modalData.pricePerVisit}
                                </p>
                                <p className="invoice-desc__cell invoice-desc__cell--subtotal">
                                    {toCurrency(vm.modalData.subTotal, 0, 3)}
                                </p>
                            </div>
                        </div>
                        <div className="pay-to">
                            <p className="pay-to__header">
                                {lang.dict.get('payTo')}
                            </p>
                            <div className="pay-to__row">
                                <div className="pay-to__left">
                                    <div className="invoice-box">
                                        <div className="invoice-box__right">
                                            <p className="invoice-box__desc">
                                                {lang.dict.get('name')}: {vm.bankDetails?.accountHolderName}
                                            </p>
                                            <p className="invoice-box__desc">
                                                {lang.dict.get('accountNumber')}: {vm.bankDetails?.accountNumber}
                                            </p>
                                            <p className="invoice-box__desc">
                                                {lang.dict.get('bankName')}: {vm.bankDetails?.bankName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pay-to__right">
                                    <div className="pay-to__right-col">
                                        <p className="pay-to__title">
                                            {lang.dict.get('tax5')}
                                        </p>
                                        <p className="pay-to__value">
                                            {toCurrency(vm.modalData.taxValue, 0, 3)} {lang.dict.get('fieldOmr')}
                                        </p>
                                    </div>
                                    <div className="pay-to__right-col">
                                        <p className="pay-to__title">
                                            {lang.dict.get('grandTotal')}
                                        </p>
                                        <p className="pay-to__value">
                                            {toCurrency(vm.modalData.grandTotalPrice, 0, 3)} {lang.dict.get('fieldOmr')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="payment-method">
                            <p className="payment-method__title">
                                {lang.dict.get('paymentTerms')}
                            </p>
                            <p className="payment-method__desc">
                                {lang.dict.get('paymentWarning')}
                            </p>
                            <p className="payment-method__desc">
                                {lang.dict.get('refundedAmount')}
                            </p>
                            <div className="payment-method__btns">
                                <Button
                                    color="white"
                                    value={lang.dict.get('downloadPdf')}
                                    leftImg="download-without-underscore"
                                    onClick={handleDownload}
                                />
                                <If condition={vm.isDisabledBtn}>
                                    <div className="payment-method__btn-pay">
                                        <Button
                                            color="green"
                                            value={vm.textValueBtn}
                                            rightImg="next"
                                            onClick={vm.sendDecision}
                                        />
                                    </div>
                                </If>
                            </div>
                        </div>
                    </div>
                </SideModal>
            </If>
            <If condition={!vm.isBigView}>
                <SideModal variant="pay-consultant" onBlur={vm.close}>
                    <div className="side-modal__header">
                        <Close onClick={vm.close} />
                        <div className="side-modal__header-title">
                            Pay Consultant
                            <div
                                className="side-modal__header-title-status"
                                data-status={vm.modalData.paymentStatusForConsultant}
                            >
                                {lang.dict.enum('taskStatus', vm.modalData.paymentStatusForConsultant)}
                            </div>
                        </div>
                    </div>
                    <div className="side-modal__content">
                        <div className="side-modal__top">
                            <div className="side-modal__row">
                                <p className="side-modal__row-title">
                                    {lang.dict.get('actionBy')}&nbsp;
                                    {lang.dict.enum('workflowTaskActor', vm.modalData.actor.actorType)}&nbsp;
                                </p>
                                <p className="side-modal__row-value">
                                    {vm.modalData.actor.name}
                                </p>
                            </div>
                            <div className="side-modal__row">
                                <p className="side-modal__row-title">
                                    {lang.dict.get('dueDate')}&nbsp;
                                </p>
                                <p className="side-modal__row-value">
                                    {vm.modalData.dueDate.format('dddd, D MMM YYYY, h:mm A')},&nbsp;
                                    <If condition={vm.modalData.delayInDays > 0}>
                                        <span
                                            className="side-modal__row-days-left"
                                            data-status={vm.modalData.dueDate}
                                        >
                                            {lang.dict.format(
                                                'dueDaysLeft',
                                                [vm.modalData.delayInDays],
                                            )}
                                        </span>
                                    </If>
                                </p>
                            </div>
                        </div>
                        <div className="view-invoice" data-is-penalty={vm.modalData.numberOfPossiblePenalties > 0}>
                            <p className="view-invoice__title">
                                {lang.dict.get('viewInvoice')}
                            </p>
                            <div className="view-invoice__header">
                                <p className="view-invoice__cell view-invoice__cell--desc">
                                    {lang.dict.get('subscriptionInvoicesDescription')}
                                </p>
                                <p className="view-invoice__cell view-invoice__cell--visits">
                                    {lang.dict.get('visits')}
                                </p>
                                <p className="view-invoice__cell view-invoice__cell--price">
                                    {lang.dict.get('price')}
                                </p>
                                <p className="view-invoice__cell view-invoice__cell--total">
                                    {lang.dict.get('subtotal')}
                                </p>
                            </div>
                            <div className="view-invoice__body">
                                <p className="view-invoice__cell view-invoice__cell--desc">
                                    {vm.modalData.invoiceDate}
                                </p>
                                <p className="view-invoice__cell view-invoice__cell--visits">
                                    {vm.modalData.numberOfVisits}
                                </p>
                                <p className="view-invoice__cell view-invoice__cell--price">
                                    {vm.modalData.pricePerVisit}
                                </p>
                                <p className="view-invoice__cell view-invoice__cell--total">
                                    {toCurrency(vm.modalData.subTotal, 0, 3)}
                                </p>
                            </div>
                            <If condition={vm.modalData.numberOfPossiblePenalties > 0}>
                                <div className="view-invoice__body view-invoice__body--penalty">
                                    <p className="view-invoice__cell view-invoice__cell--desc">
                                        {lang.dict.get('penalty')}
                                    </p>
                                    <p className="view-invoice__cell view-invoice__cell--visits">
                                        <InputCounter
                                            minValue={0}
                                            maxValue={vm.modalData.numberOfPossiblePenalties}
                                            value={vm.currentPenalty}
                                            onChange={vm.changePenalty}
                                        />
                                    </p>
                                    <p className="view-invoice__cell view-invoice__cell--price">
                                        20%
                                    </p>
                                    <p className="view-invoice__cell view-invoice__cell--total">
                                        {toCurrency(vm.penaltySubtotal, 0, 3)}
                                    </p>
                                </div>
                            </If>
                            <div className="view-invoice__bottom">
                                <Button
                                    color="white"
                                    value={lang.dict.get('viewInvoice')}
                                    onClick={vm.setBigView}
                                />
                                <div className="view-invoice__bottom-right">
                                    <div className="view-invoice__bottom-col">
                                        <p className="view-invoice__bottom-title">
                                            {lang.dict.get('tax5')}
                                        </p>
                                        <p className="view-invoice__bottom-value">
                                            {toCurrency(vm.taxValue, 0, 3)} {lang.dict.get('fieldOmr')}
                                        </p>
                                    </div>
                                    <div className="view-invoice__bottom-col">
                                        <p className="view-invoice__bottom-title">
                                            {lang.dict.get('grandTotal')}
                                        </p>
                                        <p className="view-invoice__bottom-value">
                                            {toCurrency(vm.grandTotal, 0, 3)}&nbsp;
                                            {lang.dict.get('fieldOmr')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <If condition={vm.isDisabledBtn}>
                            <div className="side-modal__btn-pay">
                                <Button
                                    color="green"
                                    value={vm.textValueBtn}
                                    rightImg="next"
                                    onClick={vm.sendDecision}
                                />
                            </div>
                        </If>
                    </div>
                </SideModal>
            </If>
        </div>
    );
});
