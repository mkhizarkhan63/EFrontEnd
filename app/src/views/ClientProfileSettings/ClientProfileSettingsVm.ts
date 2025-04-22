import { lang } from '~/api';
import { ChangePassword, GeneralInfo, MyProfileRoles, Notifications } from './Tabs';
import { makeAutoObservable } from 'mobx';

export class ClientProfileSettingsVm {
    constructor() {
        makeAutoObservable(this);
    }

    get menuItems() {
        return [
            {
                key: 'general',
                name: lang.dict.get('pageGeneralInfo'),
                content: GeneralInfo,
            },
            {
                key: 'account',
                name: lang.dict.get('pageChangePassword'),
                content: ChangePassword,
            },
            {
                key: 'notifications',
                name: lang.dict.get('pageNotifications'),
                content: Notifications,
            },
            {
                key: 'myRoles',
                name: lang.dict.get('pageMyProfileRoles'),
                content: MyProfileRoles,
            },
        ];
    }
}
