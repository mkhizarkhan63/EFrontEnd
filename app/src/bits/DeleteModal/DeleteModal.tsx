import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Icons } from '~/bits';
import { SideModal } from '../SideModal';

type Props = {
    onBlur?: () => void;
    onCancel: () => void;
    onDelete: () => void;
    title: string;
    description: string;
    buttonTitle: string;
    isAccept?: boolean;
};

export const DeleteModal = observer((props: Props) => (
    <SideModal variant="delete" onBlur={props.onBlur}>
        <div className="side-modal__content">
            <div className="side-modal__delete-icon" data-is-accept={props.isAccept}>
                <Icons icon={props.isAccept ? 'tick-white' : 'delete'} />
            </div>
            <p className="side-modal__title">
                {props.title}
            </p>
            <p className="side-modal__desc">
                {props.description}
            </p>
            <div className="side-modal__buttons">
                <Button
                    color={props.isAccept ? 'blue' : 'red'}
                    value={props.buttonTitle}
                    onClick={props.onDelete}
                />
                <Button
                    color="white"
                    value={lang.dict.get('cancel')}
                    onClick={props.onCancel}
                />
            </div>
        </div>
    </SideModal>
));
