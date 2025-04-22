import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Icons, Input, If, Uploader, ErrorList } from '~/bits';
import { GeneralInfoVm } from './GeneralInfo.vm';
import { hook } from '~/utils';

export const GeneralInfo = observer(() => {
    const vm = hook.useVm(() => new GeneralInfoVm());

    return (
        <div className="client-settings client-settings--general-info">
            <ErrorList errors={vm.errorListHolder} />
            <p className="client-settings__header">
                {lang.dict.get('pageGeneralInfo')}
            </p>
            <div className="client-settings__content">
                <div className="client-settings__avatar">
                    <If condition={!vm.avatar?.hasImg} >
                        <Uploader
                            description=""
                            acceptExtensions={['image/*']}
                            fileList={[]}
                            onUpload={vm.uploadAvatar}
                            onRemove={vm.removeAvatar}
                        />
                        <div className="supplier">
                            <Icons icon="supplier" />
                        </div>
                    </If>
                    <If condition={Boolean(vm.avatar?.hasImg)} >
                        <img
                            src={vm.avatar?.img?.url}
                            alt="avatar"
                            className="client-settings__avatar-img"
                        />
                        <div className="client-settings__avatar-close">
                            <Button
                                centerImg="close"
                                color="white"
                                isCircle={true}
                                onClick={vm.removeAvatar}
                            />
                        </div>
                    </If>
                </div>
                <div className="client-settings__form">
                    <Input.Text
                        name={lang.dict.get('name')}
                        value={vm.name}
                        onChange={vm.setName}
                    />
                    <Input.Text
                        name={lang.dict.get('email')}
                        value={vm.email}
                        onChange={vm.setEmail}
                    />
                    <Input.Text
                        name={lang.dict.get('phone')}
                        value={vm.phone}
                        isDisabled={true}
                    />
                    <p className="client-settings__phone-text">
                        {lang.dict.get('generalChangePhone')}
                        <Button
                            color="transparent"
                            value={lang.dict.get('generalContactSupport')}
                        />
                    </p>
                </div>
            </div>
            <div className="client-settings__btn">
                <Button
                    color="blue"
                    value={lang.dict.get('save')}
                    rightImg="next"
                    onClick={vm.save}
                />
            </div>
        </div>
    );
});
