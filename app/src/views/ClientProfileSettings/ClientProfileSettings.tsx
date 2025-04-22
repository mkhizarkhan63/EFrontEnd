import { observer } from 'mobx-react';
import { lang } from '~/api';
import { PageSettings } from '~/partials';
import { hook } from '~/utils';
import { ClientProfileSettingsVm } from './ClientProfileSettingsVm';

export const ClientProfileSettings = observer(() => {
    const vm = hook.useVm(() => new ClientProfileSettingsVm());

    return (
        <PageSettings
            title={lang.dict.get('clientSettings')}
            menuItems={vm.menuItems}
        />
    );
});
