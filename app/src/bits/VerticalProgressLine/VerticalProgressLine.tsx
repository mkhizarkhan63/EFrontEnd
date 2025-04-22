import { observer } from 'mobx-react';
import { type ComponentType } from 'react';
import type moment from 'moment';
import { lang } from '~/api';
import { Icons, type IconName, Button, If } from '~/bits';

type Status = 'success' | 'pending';

type Props = {
    clientContractSignature?: {
        date?: moment.Moment;
        status: Status;
    };
    clientAdvancePayment?: {
        date?: moment.Moment;
        status: Status;
        isButtonsBlockVisible?: boolean;
    };
    contractorContractSignature?: {
        date?: moment.Moment;
        status: Status;
    };
    contractorPmCommitment?: {
        date?: moment.Moment;
        status: Status;
        isButtonsBlockVisible?: boolean;
        submitPmCommitment?: () => void;
    };
    consultantContractSignature?: {
        date?: moment.Moment;
        status: Status;
    };
    consultantEngineerCommitment?: {
        date?: moment.Moment;
        status: Status;
    };
    extraElement?: ComponentType;
    goToProjectManagement?: () => void;
};

type StatusProps = {
    status?: Status;
};

type ClientAdvancePaymentButtonsProps = {
    isVisible?: boolean;
    viewInvoice?: () => void;
    payNow?: () => void;
};

type ContractorPmCommitmentButtonsProps = {
    isVisible?: boolean;
    submitPmCommitment?: () => void;
};

const ProgressLineIcon = observer(({ status }: StatusProps) => {
    const iconValue: IconName = status === 'success'
        ? 'done-icon'
        : 'exclamation';
    return (
        <div className="vertical-progress-line__step-icon" data-icon={status === 'success'}>
            <Icons icon={iconValue} />
        </div>
    );
});

const Label = observer(({ status }: StatusProps) => {
    if (!status || status === 'pending') {
        return <p className="vertical-progress-line__step-status">{lang.dict.get('pending')}</p>;
    }
    return null;
});

const ClientAdvancePaymentButtons = observer((props: ClientAdvancePaymentButtonsProps) => {
    if (!props.isVisible) {
        return null;
    }
    return (
        <div>
            <Button
                color="white"
                value={lang.dict.get('viewInvoice')}
                onClick={props.viewInvoice}
            />
            <Button
                color="green"
                value={lang.dict.get('payNow')}
                onClick={props.payNow}
            />
        </div>
    );
});

const ContractorPmCommitmentButtons = observer((props: ContractorPmCommitmentButtonsProps) => {
    if (!props.isVisible) {
        return null;
    }
    return (
        <div className="vertical-progress-line__step-btn">
            <Button
                color="orange"
                value={lang.dict.get('submitPmCommitment')}
                onClick={props.submitPmCommitment}
            />
        </div>
    );
});

export const VerticalProgressLine = observer((props: Props) => {
    const ExtraElement = props?.extraElement ? props.extraElement : () => null;
    return (
        <div className="vertical-progress-line">
            <div className="vertical-progress-line__step">
                <ProgressLineIcon status={props?.clientContractSignature?.status} />
                <div className="vertical-progress-line__step-right">
                    <p className="vertical-progress-line__step-title">
                        {lang.dict.get('clientContractSignature')}
                    </p>
                    <Label status={props?.clientContractSignature?.status} />
                    <p className="vertical-progress-line__step-date">
                        {props.clientContractSignature?.date?.format('DD MMMM YYYY')}
                    </p>
                </div>
            </div>
            <div className="vertical-progress-line__step">
                <ProgressLineIcon status={props?.clientAdvancePayment?.status} />
                <div className="vertical-progress-line__step-right">
                    <p className="vertical-progress-line__step-title">
                        {lang.dict.get('clientAdvancePayment')}
                    </p>
                    <Label status={props?.clientAdvancePayment?.status} />
                    <p className="vertical-progress-line__step-date">
                        {props.clientAdvancePayment?.date?.format('DD MMMM YYYY')}
                    </p>
                    <ClientAdvancePaymentButtons
                        isVisible={props.clientAdvancePayment?.isButtonsBlockVisible}
                    />
                </div>
            </div>
            <div className="vertical-progress-line__step">
                <ProgressLineIcon status={props?.contractorContractSignature?.status} />
                <div className="vertical-progress-line__step-right">
                    <p className="vertical-progress-line__step-title">
                        {lang.dict.get('contractorContractSignature')}
                    </p>
                    <Label status={props?.contractorContractSignature?.status} />
                    <p className="vertical-progress-line__step-date">
                        {props.contractorContractSignature?.date?.format('DD MMMM YYYY')}
                    </p>
                </div>
            </div>
            <div className="vertical-progress-line__step">
                <ProgressLineIcon status={props?.contractorPmCommitment?.status} />
                <div className="vertical-progress-line__step-right">
                    <p className="vertical-progress-line__step-title">
                        {lang.dict.get('contractorPmCommitment')}
                    </p>
                    <If condition={!props.contractorPmCommitment?.isButtonsBlockVisible}>
                        <Label status={props?.contractorPmCommitment?.status} />
                    </If>
                    <p className="vertical-progress-line__step-date">
                        {props.contractorPmCommitment?.date?.format('DD MMMM YYYY')}
                    </p>
                    <ContractorPmCommitmentButtons
                        isVisible={props.contractorPmCommitment?.isButtonsBlockVisible}
                        submitPmCommitment={props.contractorPmCommitment?.submitPmCommitment}
                    />
                </div>
            </div>
            <div className="vertical-progress-line__step">
                <ProgressLineIcon status={props?.consultantContractSignature?.status} />
                <div className="vertical-progress-line__step-right">
                    <p className="vertical-progress-line__step-title">
                        {lang.dict.get('consultantContractSignature')}
                    </p>
                    <Label status={props?.consultantContractSignature?.status} />
                    <p className="vertical-progress-line__step-date">
                        {props.consultantContractSignature?.date?.format('DD MMMM YYYY')}
                    </p>
                </div>
            </div>
            <div className="vertical-progress-line__step">
                <ProgressLineIcon status={props?.consultantEngineerCommitment?.status} />
                <div className="vertical-progress-line__step-right">
                    <p className="vertical-progress-line__step-title">
                        {lang.dict.get('consultantEngineerCommitment')}
                    </p>
                    <Label status={props?.consultantEngineerCommitment?.status} />
                    <p className="vertical-progress-line__step-date">
                        {props.consultantEngineerCommitment?.date?.format('DD MMMM YYYY')}
                    </p>
                </div>
            </div>
            <ExtraElement />
            <div className="goto-btn-container">
                <div className="goto-btn">
                    <Button
                        color="gray"
                        value={lang.dict.get('goToProjectManagement')}
                        rightImg="next"
                        onClick={props.goToProjectManagement}
                    />
                </div>
            </div>
        </div>
    );
});
