import { observer } from 'mobx-react';
import { Button, ErrorList } from '~/bits';
import { lang } from '~/api';
import type { ConsultantType } from '~/models';
import { CompanyForms } from '~/partials';
import { hook } from '~/utils';
import { ConsultantSettingsVm } from './ConsultantSettings.vm';

type Props = {
    consultant: ConsultantType;
};

export const ConsultantSettings = observer((props: Props) => {
    const vm = hook.useVm(() => new ConsultantSettingsVm(props.consultant));

    const button = (
        <Button
            rightImg="next"
            color="blue"
            value={lang.dict.get('goSave')}
            onClick={vm.saveChanges}
            isLoading={vm.isLoading}
        />
    );

    return (
        <div className="consultant-settings consultant-settings--new-project">
            <h2 className="consultant-settings__header">
                {lang.dict.get('pageNewProjectSettings')}
            </h2>
            <CompanyForms.CompanyServices
                company={vm.consultant}
                errorListHolder={vm.errorListHolder}
                buttons={button}
            />
            <ErrorList errors={vm.errorListHolder} />
        </div>
    );
});
