import { observer } from 'mobx-react';
import { NewProjectSettingsVm } from './NewProjectSettings.vm';
import { hook } from '~/utils';
import { Contractor } from '~/models';
import { ContractorSettings } from './ContractorSettings';
import { ConsultantSettings } from './ConsultantSettings';

export const NewProjectSettings = observer(() => {
    const vm = hook.useVm(() => new NewProjectSettingsVm());

    if (!vm.company) {
        return null;
    }

    return Contractor.is(vm.company)
        ? <ContractorSettings contractor={vm.company} />
        : <ConsultantSettings consultant={vm.company} />;
});
