import { observer } from 'mobx-react';
import type { Moment } from 'moment';
import { lang, type E } from '~/api';
import { Button, If } from '~/bits';
import type { BankDetailsType, InvoiceDetailsType, PaymentType } from '~/models';
import { InvoiceModal } from '../InvoiceModal';
import { toCurrency } from '~/utils/number';

type Props = {
    title: string;
    desc: string;
    status: E.SubmitStatus;
    paidBy: string;
    valuePayment?: PaymentType;
    date?: Moment;
    onDownload: VoidFunction;
    onClose: VoidFunction;
    switchInvoice: VoidFunction;
    isInvoiceOpened: boolean;
    invoice?: InvoiceDetailsType;
    bankDetails?: BankDetailsType;
    subtotal?: number;
};

export const Payment = observer((props: Props) => (
    <div className="payment-summary" data-status={props.status}>
        <div className="payment-summary__row">
            <div className="payment-summary__col">
                <div className="payment-summary__item">
                    <p className="payment-summary__item-title">
                        {props.title}
                    </p>
                    <p className="payment-summary__item-value">
                        {toCurrency(props.subtotal, 0, 3)} OMR
                    </p>
                </div>
                <div className="payment-summary__item">
                    <p className="payment-summary__item-text">
                        {lang.dict.format('paidBy', [props.paidBy])}
                        &nbsp;
                        {props.valuePayment?.dateOfPayment?.format('dddd, D MMM YYYY, h:mm A')}
                    </p>
                    <Button
                        color="transparent"
                        value={lang.dict.get('proofOfPayment')}
                        onClick={props.onDownload}
                    />
                </div>
            </div>
            <Button
                color="white"
                value={lang.dict.get('viewInvoice')}
                onClick={props.switchInvoice}
            />
        </div>
        <div className="payment-summary__desc">
            {lang.dict.enum('submitStatus', props.status)} {props.desc}
        </div>
        <If condition={props.isInvoiceOpened}>
            <InvoiceModal
                onBlur={props.onClose}
                invoice={props.invoice}
                bankDetails={props.bankDetails}
            />
        </If>
    </div>
));
