import { lang } from '~/api';
import { Button, Input } from '~/bits';

export type Props = {
    onClose: VoidFunction;
    onReject: VoidFunction;
    reason: string;
    onChange: (value: string) => void;
};

export const RejectionModal = ({ onClose, onReject, reason, onChange }: Props) => (
    <div className="rejection-modal">
        <div className="rejection-modal__box">
            <Input.Textarea
                name={lang.dict.get('projectCreatorAdditionalCommentOptional')}
                value={reason}
                onChange={onChange}
                placeHolder={lang.dict.get('fieldWriteDescription')}
            />
            <div className="rejection-modal__btns">
                <Button
                    color="white"
                    value={lang.dict.get('cancel')}
                    onClick={onClose}
                />
                <Button
                    color="red"
                    value={lang.dict.get('reject')}
                    rightImg="next"
                    onClick={onReject}
                />
            </div>
        </div>
    </div>
);
