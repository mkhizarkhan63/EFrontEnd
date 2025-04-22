import { observer } from 'mobx-react';
import { Button, ErrorList, Input } from '~/bits';
import { lang, utils } from '~/api';
import { hook } from '~/utils';
import { ContractorSettingsVm } from './ContractorSettings.vm';
import type { ContractorType } from '~/models';

type Props = {
    contractor: ContractorType;
};

export const ContractorSettings = observer((props: Props) => {
    const vm = hook.useVm(() => new ContractorSettingsVm(props.contractor));

    return (
        <div className="contractor-settings contractor-settings--new-project">
            <h2 className="contractor-settings__header">
                {lang.dict.get('pageNewProjectSettings')}
            </h2>
            <p className="contractor-settings__subheader">
                {lang.dict.get('fieldLocation')}
            </p>
            <Input.Multiple
                type="checkbox"
                values={vm.governorates}
                onChange={vm.setAreYouAtGovernorate}
                singleDisabledId={vm.contractor?.headOfficeGovernorateId}
            />
            <Input.Text
                name={lang.dict.get('specifyMinimumProjectSize')}
                value={utils.toInputNumber(vm.minimumProjectSize)}
                onChange={vm.setProjectSize}
                placeHolder={lang.dict.get('fieldInM2')}
            />
            <Button
                rightImg="next"
                color="blue"
                value={lang.dict.get('goSave')}
                onClick={vm.saveChanges}
                isLoading={vm.isLoading}
            />
            <ErrorList errors={vm.errorListHolder} />
        </div>
    );
});
