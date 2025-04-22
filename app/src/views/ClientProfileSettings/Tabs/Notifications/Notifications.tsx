import { observer } from 'mobx-react';
import { lang } from '~/api';
import { NotificationsVm } from './Notifications.vm';
import { Input, Button } from '~/bits';
import { hook } from '~/utils';

type Props = {
    vm: NotificationsVm;
};

const EmailNotifications = observer((props: Props) => {
    const { vm } = props;
    const data = vm.emailNotifications.map(item => (
        <div key={item.id} className="notification-email__item" >
            <div className="notification-email__item-text">
                <p className="notification-email__item-title">
                    {lang.dict.get(item.name)}
                </p>
                <p className="notification-email__item-desc">
                    {vm.placeholderEmailNotification}
                </p>
            </div>
            <Input.Checkbox
                type="toggle"
                isChecked={item.value ?? false}
                onChange={vm.setEmailNotifications(item.id)}
            />
        </div>
    ));
    return (
        <div className="notification-email">
            <p className="client-settings__subheader">
                {lang.dict.get('notificationsEmail')}
            </p>
            {data}
        </div>
    );
});

const WebsiteNotifications = observer((props: Props) => {
    const { vm } = props;
    return (
        <div className="notifications-website">
            <p className="client-settings__subheader">
                {lang.dict.get('notificationsWebsite')}
            </p>
            <p className="notifications-website__desc">
                {vm.placeholderWebsiteNotification}
            </p>
            <Input.Multiple
                type="checkbox"
                values={vm.websiteNotifications}
                onChange={vm.setWebsiteNotifications}
            />
        </div>
    );
});

export const Notifications = observer(() => {
    const vm = hook.useVm(() => new NotificationsVm());
    return (
        <div className="client-settings client-settings--notification">
            <div className="client-settings__content">
                <p className="client-settings__header">
                    {lang.dict.get('pageNotifications')}
                </p>
                <EmailNotifications vm={vm} />
                <WebsiteNotifications vm={vm} />
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
