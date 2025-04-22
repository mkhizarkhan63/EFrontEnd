import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Hide, If, Input } from '~/bits';
import { MyProfileRolesVm } from './MyProfileRoles.vm';
import { hook } from '~/utils';

export const MyProfileRoles = observer(() => {
    const vm = hook.useVm(() => new MyProfileRolesVm());

    const myRoles = vm.availableRoles.map(item => (
        <div className="profile-role" key={item.id.asStr()}>
            <div className="profile-role__top">
                <div className="profile-role__type" data-role={item.role}>
                    {lang.dict.enum('roleInCompany', item.role)}
                </div>
                <div className="profile-role__default">
                    <If condition={vm.isDefaultRole(item.id)} >
                        <p>{lang.dict.get('myDefaultRole')}</p>
                    </If>
                    <If condition={!vm.isDefaultRole(item.id)} >
                        <p>{lang.dict.get('setAsDefault')}</p>
                    </If>
                    <Input.Checkbox
                        type="check"
                        isChecked={vm.isDefaultRole(item.id)}
                        onChange={() => vm.changeDefaultRole(item.id)}
                    />
                </div>
                <Hide reason="moved-to-phase-2">
                    <If condition={() => false}>
                        <div className="profile-role__buttons">
                            <div className="delete">
                                <Button
                                    color="transparent"
                                    centerImg="delete"
                                    onClick={(() => vm.deleteRole(item.id))}
                                />
                            </div>
                            <div className="edit">
                                <Button
                                    color="transparent"
                                    centerImg="edit"
                                    onClick={(() => vm.editRole(item.id))}
                                />
                            </div>
                        </div>
                    </If>
                </Hide>
            </div>
            <div className="profile-role__avatar" data-role={item.role}>
                <img
                    src={item.logo?.url}
                    alt=" "
                    className="profile-role__avatar-logo"
                />
            </div>
            <If condition={() => Boolean(item.companyName)}>
                <div className="profile-role__company-name">
                    {item.companyName}
                </div>
            </If>
            <Hide reason="moved-to-phase-2">
                <div className="profile-role__name">
                    {lang.dict.enum('positionInCompany')}
                </div>
                <If condition={() => false}>
                    <div className="profile-role__approval">
                        {lang.dict.get('waitingForApproval')}
                    </div>
                </If>
            </Hide>
        </div>
    ));

    return (
        <div className="client-settings client-settings--my-profile-roles">
            <div className="client-settings__top">
                <h2 className="client-settings__header">
                    {lang.dict.get('pageMyProfileRoles')}
                    <span>({vm.profile.profilesInCompanies.length})</span>
                </h2>
                <Hide reason="moved-to-phase-2">
                    <Button
                        color="white"
                        value={lang.dict.get('linkProfile')}
                        leftImg="add"
                        onClick={vm.linkProfile}
                    />
                </Hide>
            </div>
            <div className="profile-roles">{myRoles}</div>
        </div>
    );
});
