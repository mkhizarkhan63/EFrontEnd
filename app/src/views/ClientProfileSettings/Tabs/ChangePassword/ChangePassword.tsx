import { useState } from 'react';
import { observer } from 'mobx-react';
import { Input, Button, ErrorList } from '~/bits';
import { lang } from '~/api';
import { ChangePasswordVm } from './ChangePassword.vm';

export const ChangePassword = observer(() => {
    const [vm] = useState(() => new ChangePasswordVm());

    return (
        <div className="client-settings client-settings--account">
            <h2 className="client-settings__header">
                {lang.dict.get('pageChangePassword')}
            </h2>
            <div className="client-settings__password">
                <h3 className="client-settings__subheader">
                    {lang.dict.get('password')}
                </h3>
                <Input.Text
                    type="password"
                    name={lang.dict.get('oldPassword')}
                    placeHolder={lang.dict.get('enterOldPassword')}
                    value={vm.oldPassword}
                    onChange={vm.setOldPassword}
                />
                <div className="client-settings__new-password">
                    <Input.Text
                        type="password"
                        name={lang.dict.get('newPassword')}
                        placeHolder={lang.dict.get('enterNewPassword')}
                        value={vm.newPassword}
                        onChange={vm.setNewPassword}
                    />
                    <Input.Text
                        type="password"
                        name={lang.dict.get('confirmPassword')}
                        placeHolder={lang.dict.get('confirmNewPassword')}
                        value={vm.confirmPassword}
                        onChange={vm.setConfirmPassword}
                    />
                </div>
            </div>
            <div className="client-settings__btn">
                <Button
                    rightImg="next"
                    color="blue"
                    value={lang.dict.get('goSave')}
                    onClick={vm.save}
                    isLoading={vm.isSaving}
                />
            </div>
            {/* <div className="client-settings__delete">
                <h3 className="client-settings__subheader">
                    {lang.dict.get('deleteHeader')}
                </h3>
                <p className="client-settings__text">
                    {lang.dict.get('deleteTextFirst')}
                </p>
                <p className="client-settings__text">
                    {lang.dict.get('deleteTextSecond')}
                    <Button
                        color="transparent"
                        value={lang.dict.get('deleteTextSecondLink')}
                        onClick={vm.delete}
                    />
                </p>
            </div> */}
            {/* //TODO don't remove it, it will be needed when backend add logic for this */}
            <ErrorList errors={vm.errorListHolder} />
        </div>
    );
});
