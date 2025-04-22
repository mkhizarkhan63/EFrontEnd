import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Close, Input } from '~/bits';
import { SideModal } from '../SideModal';

type Props = {
    onClose: () => void;
    setInvite: () => void;
    setMobile: (phone: string) => void;
    setEmail: (email: string) => void;
    setCompanyName: (name: string) => void;
    mobileNumber: string;
    email: string;
    companyName: string;
};

export const InviteModal = observer((props: Props) => (
    <SideModal variant="invite-company">
        <div className="side-modal__header">
            <Close onClick={props.onClose} />
            <p className="side-modal__header-title">
                {lang.dict.get('reviewingInviteContractorToMyProject')}
            </p>
        </div>
        <div className="side-modal__content">
            <img
                className="side-modal__graphic"
                src="/assets/graphics/invite_graphic.svg"
                alt="envelope"
            />
            <Input.Text
                name={`${lang.dict.get('contractorCompanyName')} ${lang.dict.get('fieldOptional')}`}
                value={props.companyName}
                onChange={props.setCompanyName}
                placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
            />
            <Input.Text
                name={lang.dict.get('mobileNumber')}
                value={props.mobileNumber}
                onChange={props.setMobile}
                placeHolder={lang.dict.get('fieldPhoneNumber')}
            />
            <Input.Text
                name={`${lang.dict.get('companyEmail')} ${lang.dict.get('fieldOptional')}`}
                value={props.email}
                onChange={props.setEmail}
                placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
            />
            <Button
                color="blue"
                rightImg="next"
                value={lang.dict.get('invite')}
                onClick={props.setInvite}
            />
        </div>
    </SideModal>
));
