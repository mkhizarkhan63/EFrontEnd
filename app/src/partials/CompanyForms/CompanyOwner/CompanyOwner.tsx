import { observer } from 'mobx-react';
import type { ReactElement } from 'react';
import { lang, type ErrorListHolder } from '~/api';
import { If, Input } from '~/bits';
import type { CompanyType } from '~/models';
import { hook, preventDefault } from '~/utils';
import { CompanyOwnerVm } from './CompanyOwner.vm';

type Props = {
    company: CompanyType;
    buttons: ReactElement;
    errorListHolder: ErrorListHolder;
    submitAction?: () => void;
};

export const CompanyOwner = observer((props: Props) => {
    const {
        company,
        buttons,
        errorListHolder,
        submitAction,
    } = props;

    const vm = hook.useVm(() => new CompanyOwnerVm(company, errorListHolder));

    hook.useAutoFocus();

    return (
        <div className="company-forms company-forms--owner">
            <form
                className="form"
                onSubmit={preventDefault(submitAction)}
            >
                <p className="form__header">
                    {vm.areYouOwnerField}
                </p>
                <Input.Checkbox
                    onChange={vm.setAreYouOwner}
                    type="radio"
                    text={{
                        first: lang.dict.get('switchYes'),
                        second: lang.dict.get('switchNo'),
                    }}
                    isChecked={vm.areYouOwner}
                    isDisabled={vm.isExternal}
                />
                <If condition={!vm.areYouOwner}>
                    <div className="form__section-first">
                        <div className="input-container">
                            <Input.Text
                                name={lang.dict.get('fieldOwnerFullName')}
                                onChange={vm.company.setOwnerName}
                                value={vm.company.ownerName}
                                placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                                isDisabled={vm.isExternal}
                            />
                            <Input.Text
                                name={lang.dict.get('fieldOwnerPhoneNumber')}
                                onChange={vm.company.setOwnerPhone}
                                value={vm.company.ownerPhone}
                                placeHolder={lang.dict.get('fieldWritePhonePlaceholder')}
                                isDisabled={vm.isExternal}
                            />
                            <Input.Text
                                name={lang.dict.get('fieldOwnerEmail')}
                                onChange={vm.company.setOwnerEmail}
                                value={vm.company.ownerEmail}
                                placeHolder={lang.dict.get('fieldWriteEmailPlaceholder')}
                                description={lang.dict.get('fieldOptional')}
                                isDisabled={vm.isExternal}
                            />
                        </div>
                        <p className="form__header form__header--with-border">
                            {lang.dict.get('fieldRelationshipToCompany')}
                        </p>
                        <Input.Multiple
                            type="radio"
                            onChange={vm.company.setAffiliationType}
                            values={vm.relationshipValues}
                            isDisabled={vm.isExternal}
                        />
                    </div>
                </If>
                <div className="form__btns">
                    {buttons}
                </div>
            </form>
        </div>
    );
});
