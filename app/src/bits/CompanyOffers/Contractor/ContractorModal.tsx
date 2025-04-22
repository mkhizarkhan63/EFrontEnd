import { observer } from 'mobx-react';
import { lang, type Id } from '~/api';
import { Button, Icons, If } from '~/bits';
import { hook } from '~/utils';

type ModalProps = {
    bidId: Id;
    isModalOpen: boolean;
    text?: string;
    phone?: string;
    closeModal: () => void;
    openModal: (contractorId: Id) => void;
};

export const ContractorModal = observer((props: ModalProps) => {
    const ref = hook.useClickOutside(props.closeModal);

    const modalBox = (
        <div className="company__offer">
            <h3 className="company__offer-title">
                {lang.dict.get('contractorOffer')}
            </h3>
            <p className="company__offer-text">{props.text}</p>
            <a href={`tel:${props.phone}`} className="company__offer-phone">
                <Icons icon="phone" />
                <p className="company__offer-phone__num">{props.phone}</p>
            </a>
        </div>
    );

    return (
        <div className="modal" ref={ref}>
            <Button
                color="blue"
                hasOutline={true}
                centerImg="gift-box"
                onClick={() => props.openModal(props.bidId)}
                hasStopPropagation={true}
            />
            <If condition={props.isModalOpen}>{modalBox}</If>
        </div>
    );
});
