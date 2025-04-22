import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { CompanyOffers, Button, If, Menu, ErrorList } from '~/bits';
import type { ProjectAdmin } from '~/models';
import { hook } from '~/utils';
import { ContractorBidsVm } from './ContractorBids.vm';
import { InsuranceTab } from '~/views/Project/ProjectDetails/ProjectStepBiding/Bids/InsuranceTab';
import { BankTab } from '~/views/Project/ProjectDetails/ProjectStepBiding/Bids/BankTab';
import { InviteCompanyModal } from '~/views/Project/ProjectDetails/ProjectStepBiding';

type Props = {
    projectAdmin: ProjectAdmin;
    onInvite: VoidFunction;
};

const createViewMap = (vm: ContractorBidsVm, onInvite: VoidFunction) => {
    switch (vm.currentTab) {
        case E.ProjectMenu.contractor:
            return observer(() => (
                <CompanyOffers
                    bids={vm.bids}
                    onSelectContractor={vm.onSelectContractor}
                    onInvite={onInvite}
                    isPreviewed={false}
                    invitationCount={vm.projectAdmin.contractorInvitationCount}
                    invitedCompanies={vm.projectAdmin.project.invitedContractors}
                />
            ));
        case E.ProjectMenu.consultant:
            return observer(() => (
                <CompanyOffers
                    consultants={vm.consultantsSelection.data}
                    project={vm.projectAdmin.project}
                    onInviteConsultant={vm.onInviteConsultant}
                    onInvite={vm.openInviteCompanyModal}
                    isPreviewed={false}
                    invitationCount={vm.projectAdmin.consultantInvitationCount}
                    invitedCompanies={vm.projectAdmin.project.invitedConsultants}
                />
            ));
        case E.ProjectMenu.insurance:
            return () => <InsuranceTab />;
        case E.ProjectMenu.bank:
            return () => <BankTab />;
        default:
            return null;
    }
};

export const ContractorBids = observer(({ projectAdmin, onInvite }: Props) => {
    const vm = hook.useVm(() => new ContractorBidsVm(projectAdmin), [projectAdmin]);

    const Component = createViewMap(vm, onInvite);

    if (!Component) {
        return null;
    }

    return (
        <div className="contractors-bids">
            <div className="top-bar">
                <Menu
                    getItems={() => vm.menuItems}
                    isActive={vm.isMenuItemActive}
                    isAnimated={true}
                />
                <div className="top-bar__link-container">
                    <a
                        href="#"
                        className="top-bar__link"
                    >
                        <img src="/assets/graphics/play.svg" className="top-bar__link-img" />
                        {lang.dict.get('helpVideo')}
                    </a>
                </div>
            </div>
            <Component />
            <div className="contractors-bids__btn">
                <Button
                    color={vm.isBidAndIsConsultant ? 'green' : 'darkgray'}
                    isDisabled={!vm.isBidAndIsConsultant}
                    isLoading={vm.isSaving}
                    value={lang.dict.get('createContract')}
                    rightImg="next"
                    onClick={vm.createContract}
                />
            </div>
            <If condition={() => vm.isInviteCompanyModalOpened}>
                <InviteCompanyModal
                    vm={vm}
                    variant={E.RoleInCompany.consultant}
                />
            </If>
            <ErrorList errors={vm.errorListHolder} />
            <ErrorList errors={vm.validationHolder} />
        </div>
    );
});
