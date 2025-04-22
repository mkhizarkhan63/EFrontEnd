import { observer } from 'mobx-react';
import { lang } from '~/api';
import { SideModal, Close, Input, Button } from '~/bits';
import type { UsersVm } from '../Users.vm';

type Props = {
    vm: UsersVm;
};

export const InviteUser = observer(({ vm }: Props) => (
    <SideModal variant="create-user">
        <div className="side-modal__header">
            <Close onClick={vm.closeInviteUser} />
            <p className="side-modal__header-title">{lang.dict.get('inviteUser')}</p>
        </div>
        <div className="side-modal__content">
            <img
                className="side-modal__graphic"
                src="/assets/graphics/invite_graphic.svg"
                alt="envelope"
            />
            <Input.Text
                placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                name={lang.dict.get('userName')}
                value={vm.name}
                onChange={vm.setName}
            />
            <Input.Text
                placeHolder={lang.dict.get('fieldWritePhonePlaceholder')}
                name={lang.dict.get('userPhone')}
                value={vm.phone}
                onChange={vm.setPhone}
            />
            <Input.Text
                placeHolder={lang.dict.get('fieldWriteEmailPlaceholder')}
                name={lang.dict.get('email')}
                description={lang.dict.get('fieldOptional')}
                value={vm.email}
                onChange={vm.setEmail}
            />
            <Button
                color="blue"
                value={lang.dict.get('inviteUser')}
                rightImg="next"
                onClick={vm.submitInviteUser}
            />
        </div>
    </SideModal>
));
