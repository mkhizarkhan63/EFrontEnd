import { observer } from 'mobx-react';
import { lang } from '~/api';
import { SideModal, Close, Button, Input } from '~/bits';
import type { ContractVm } from '../Contract.vm';

type Props = {
    vm: ContractVm;
};

export const SubmitPmCommitment = observer(({ vm }: Props) => (
    <SideModal variant="commitment">
        <div className="side-modal__header">
            <Close onClick={vm.closeSubmitPmCommitment} />
            <p className="side-modal__header-title">{lang.dict.get('contractorPmCommitment')}</p>
            <Button
                color="white"
                value={lang.dict.get('downloadPdf')}
                onClick={vm.downloadPdf}
                leftImg="download-without-underscore"
            />
        </div>
        <div className="side-modal__content">
            <div className="side-modal__section">
                <p className="side-modal__section-title">
                    Title will come here
                </p>
                <p className="side-modal__section-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
            </div>
            <div className="side-modal__section">
                <p className="side-modal__section-title">
                    Title will come here
                </p>
                <p className="side-modal__section-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
            </div>
            <Input.Checkbox
                type="check"
                isChecked={vm.isCommitmentAccepted}
                name={lang.dict.get('acceptTheCommitmentDesc')}
                onChange={vm.setAcceptThePmCommitment}
            />
            <div className="side-modal__accept">
                <p className="side-modal__accept-text">{lang.dict.get('supportedBy')}</p>
                <img
                    src="/assets/graphics/contract_logo_ministry.png"
                    className="side-modal__accept-logo"
                    alt="logo"
                />
                <Button
                    color="green"
                    value={lang.dict.get('acceptTheCommitment')}
                    rightImg="next"
                    onClick={vm.acceptTheCommitment}
                    isDisabled={!vm.isCommitmentAccepted}
                />
            </div>
        </div>
    </SideModal>
));
