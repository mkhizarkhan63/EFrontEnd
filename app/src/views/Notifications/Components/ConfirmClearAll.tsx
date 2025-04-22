import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, SideModal } from '~/bits';

type Props = {
    closeModal: () => void;
    clearAll: () => void;
};

export const ConfirmClearAll = observer((props: Props) => (
    <SideModal variant="confirm-clear" onBlur={props.closeModal}>
        <img className="side-modal__image" src="/assets/graphics/notifications_clear.svg" alt={lang.dict.get('clearAll')} />
        <p className="side-modal__text">
            {lang.dict.get('confirmClearAllNotifications')}
        </p>
        <div className="side-modal__btns">
            <Button
                color="blue"
                value={lang.dict.get('switchNo')}
                onClick={props.closeModal}
            />
            <Button
                color="white"
                value={lang.dict.get('switchYes')}
                onClick={props.clearAll}
            />
        </div>
    </SideModal>
));
