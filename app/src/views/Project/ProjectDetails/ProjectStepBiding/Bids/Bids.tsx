import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, CompanyOffers, ErrorList, If, LogoListPrevious, Menu, Switch } from '~/bits';
import type { ProjectDetailsVm } from '../../ProjectDetails.vm';
import { InsuranceTab } from './InsuranceTab';
import { BankTab } from './BankTab';
import { InviteCompanyModal } from '../InviteContractor';

type Props = {
    vm: ProjectDetailsVm;
    isPreviewed?: boolean;
};

type ExtendProps = {
    vm: ProjectDetailsVm;
};

const createViewMap = (vm: ProjectDetailsVm, isPreviewed: boolean) => {
    switch (vm.currentTab) {
        case E.ProjectMenu.contractor:
            return observer(() => (
                <CompanyOffers
                    bids={vm.project.bids}
                    invitedCompanies={vm.project.invitedContractors}
                    onSelectContractor={vm.onSelectContractor}
                    onInvite={vm.switchInvitingContractor}
                    isPreviewed={isPreviewed}
                    invitationCount={vm.project.contractorInvitationCount}
                />
            ));
        case E.ProjectMenu.consultant:
            return observer(() => (
                <CompanyOffers
                    consultants={vm.consultantsSelection.data}
                    project={vm.project}
                    onInviteConsultant={vm.onInviteConsultant}
                    isPreviewed={isPreviewed}
                    onInvite={vm.openInviteCompanyModal}
                    invitationCount={vm.project.consultantInvitationCount}
                    invitedCompanies={vm.project.invitedConsultants}
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

const ExtendBid = ({ vm }: ExtendProps) => (
    <div className="project-step-biding bids">
        <img className="tick" alt="" src="/assets/graphics/rejected.svg" />
        <div className="what-will-happen no-bids">
            {lang.dict.get('youCantChooseContractor')}
            <div className="what-happened">
                {lang.dict.get('noOneHasSubmittedBid')}
            </div>
        </div>
        <div className="buttons">
            <If condition={() => vm.project.numberOfTimeExtension < 2} >
                <Button
                    color="green"
                    value={lang.dict.get('extendBidingForWeek')}
                    onClick={() => vm.updateBidClosingDate(E.BidClosingDateOption.addWeek)}
                />
            </If>
        </div>
    </div>
);

export const Bids = observer(({ vm, isPreviewed }: Props) => {
    if (vm.project.projectStatus === E.ProjectStatus.chooseContractor) {
        vm.openBids();
    }

    const isContractorToChoose = vm.project.bids.length > 0 && vm.project.projectStatus === E.ProjectStatus.chooseContractor;

    const canExtendBid = isPreviewed ?? isContractorToChoose;

    const Component = createViewMap(vm, Boolean(isPreviewed));

    if (!Component) {
        return null;
    }

    if (!vm.isBidsOpened) {
        return (
            <Switch
                alt={() => <ExtendBid vm={vm} />}
                state={canExtendBid}
            >
                <div className="project-step-biding bids">
                    <img
                        className="tick"
                        alt=""
                        src="/assets/graphics/tick.svg"
                    />
                    <div className="what-will-happen">
                        {lang.dict.get('biddingCompleted')}
                    </div>
                    <p className="what-happened">
                        {lang.dict.get('openBidsInfo')}
                    </p>
                    <p className="what-happened">
                        {lang.dict.get('openBidsInfo2')}
                    </p>
                    <LogoListPrevious logos={vm.companyLogos} />
                    <div className="project-step-biding__participated">
                        <p className="project-step-biding__participated-text">
                            {vm.project.bids.length}
                        </p>
                        <p className="project-step-biding__participated-text">
                            {lang.dict.get('contractorsParticipated')}
                        </p>
                    </div>
                    <div className="buttons">
                        <Button
                            color="green"
                            rightImg="next"
                            value={lang.dict.get('openBids')}
                            onClick={vm.openBids}
                        />
                    </div>
                </div>
            </Switch>
        );
    }

    return (
        <div className="project-step project-step--bids">
            <div className="top-bar">
                <Menu
                    getItems={() => vm.menuItems}
                    isActive={vm.isMenuItemActive}
                    isChosen={vm.isMenuItemChosen}
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
            <div className="project-step__content" data-tab={vm.currentTab}>
                <Component />
            </div>
            <div className="contractors-bids__btn">
                <span className="contractors-bids__btn-info">{vm.contractDisabledText}</span>
                <Button
                    color={vm.isBidAndIsConsultant ? 'green' : 'darkgray'}
                    isDisabled={!vm.isBidAndIsConsultant}
                    isLoading={vm.isLoading}
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
