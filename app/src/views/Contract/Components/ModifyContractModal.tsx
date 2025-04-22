import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Close, SideModal, Icons } from '~/bits';
import type { ContractVm } from '../Contract.vm';

type Props = {
    vm: ContractVm;
};

export const ModifyContractModal = observer(({ vm }: Props) => (
    <SideModal variant="modify-contract" >
        <div className="side-modal__header">
            <Close onClick={vm.closeModifyContract} />
        </div>
        <div className="modify-contract__content">
            <p className="modify-contract__title">{lang.dict.get('pleaseContactWithAdmin')}</p>
            <p className="modify-contract__email">
                <a className="modify-contract__email-text" href="mailto: admin@ebina.com">
                    <Icons icon="email" />
                    {lang.dict.get('adminEmail')}
                </a>
            </p>
        </div>
    </SideModal>
));
