import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { SideModal, Close, Input, Button } from '~/bits';
import { type ProjectDetailsVm } from '../../ProjectDetails.vm';
import { type ContractorBidsVm } from '~/views/admin/pages/Project/ProjectSteps/ContractorBids/ContractorBids.vm';
import { type ProjectVm } from '~/views/admin/pages/Project/Project.vm';

type Props = {
    vm: ProjectDetailsVm | ContractorBidsVm | ProjectVm;
    variant: E.RoleInCompany;
};

export const InviteCompanyModal = observer(({ vm, variant }: Props) => {
    const title = variant === E.RoleInCompany.consultant
        ? lang.dict.get('reviewingInviteConsultantToMyProject')
        : lang.dict.get('reviewingInviteContractorToMyProject');

    return (
        <SideModal variant="create-user" onBlur={vm.closeInviteCompanyModal}>
            <div className="side-modal__header">
                <Close onClick={vm.closeInviteCompanyModal} />
                <p className="side-modal__header-title">
                    {title}
                </p>
            </div>
            <div className="side-modal__content">
                <img
                    className="side-modal__graphic"
                    src="/assets/graphics/invite_graphic.svg"
                    alt="envelope"
                />
                <Input.Text
                    placeHolder={lang.dict.get('fieldWritePhonePlaceholder')}
                    name={lang.dict.get('phone')}
                    value={vm.phone}
                    onChange={vm.setPhone}
                />
                <Input.Text
                    placeHolder={lang.dict.get('fieldWriteNamePlaceholder')}
                    name={lang.dict.get('companyName')}
                    value={vm.companyName}
                    onChange={vm.setCompanyName}
                />
                <Input.Text
                    placeHolder={lang.dict.get('fieldWriteEmailPlaceholder')}
                    name={lang.dict.get('email')}
                    description={lang.dict.get('fieldOptional')}
                    value={vm.email}
                    onChange={vm.setEmail}
                />
                <Button
                    color="blue"
                    value={lang.dict.get('invite')}
                    rightImg="next"
                    onClick={() => vm.inviteExternalCompany(variant)}
                />
            </div>
        </SideModal>
    );
});
