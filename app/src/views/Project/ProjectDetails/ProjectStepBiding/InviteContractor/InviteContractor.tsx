import { Button, ErrorList, Hide, If, Loading, LogoListPrevious, Subheader } from '~/bits';
import { Page } from '~/partials';
import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { type ProjectDetailsVm } from '../../ProjectDetails.vm';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InviteCompanyModal } from './InviteCompanyModal';
import { type ProjectVm } from '~/views/admin/pages/Project/Project.vm';

type Props = {
    vm: ProjectDetailsVm | ProjectVm;
};

export const InviteContractor = observer(({ vm }: Props) => {
    const list = vm.contractorsList.data.map(item => (
        <div key={item.id} className="contractor-item">
            <div className="contractor-item__company">
                <img
                    src={item.avatar?.img?.url}
                    alt="logo"
                    className="contractor-item__company-logo"
                />
                {item.name}
            </div>
            <div className="contractor-item__cell">
                <p className="contractor-item__cell-title">
                    {lang.dict.get('headOffice')}
                </p>
                <p className="contractor-item__cell-value">
                    {vm.getGovernorateName(item.headOfficeGovernorateId)}
                </p>
            </div>
            <div className="contractor-item__cell contractor-item__cell--established">
                <p className="contractor-item__cell-title">
                    {lang.dict.get('estabilished')}
                </p>
                <p className="contractor-item__cell-value">
                    {item.crStartDate?.format('YYYY')}
                </p>
            </div>
            <div className="contractor-item__cell contractor-item__cell--projects">
                <p className="contractor-item__cell-title">
                    {lang.dict.get('completedProjects')}
                </p>
                <p className="contractor-item__cell-value">
                    {item.completedProjects}
                </p>
            </div>
            <div className="contractor-item__cell contractor-item__cell--engineers">
                <p className="contractor-item__cell-title">
                    {lang.dict.get('engineers')}
                </p>
                <p className="contractor-item__cell-value">
                    {item.engineers}
                </p>
            </div>
            <div className="contractor-item__cell contractor-item__cell--labors">
                <p className="contractor-item__cell-title">
                    {lang.dict.get('labors')}
                </p>
                <p className="contractor-item__cell-value">
                    {item.labors}
                </p>
            </div>
            <Hide reason="moved-to-phase-2">
                <div className="contractor-item__cell contractor-item__cell--like" data-liked={true}>
                    <Button
                        color="transparent"
                        isCircle={true}
                        centerImg="like-red"
                        onClick={() => { /* TODO */ }}
                        hasStopPropagation={true}
                    />
                </div>
            </Hide>
            <div className="contractor-item__cell contractor-item__cell--view">
                <Button
                    value={lang.dict.get('viewProfile')}
                    color="transparent"
                    onClick={() => vm.goToProfile(item.externalId)}
                />
                <div className="btn-invite">
                    <Button
                        color="white"
                        onClick={() => vm.inviteInternalContractor(item)}
                        value={item.buttonValue}
                        isDisabled={item.isNotActionable}
                        leftImg={item.isNotActionable ? 'tick-btn' : undefined}
                    />
                </div>
            </div>
        </div>
    ));

    return (
        <Page name="inviting-contractors">
            <Subheader
                hasReturnButton={true}
                returnButton={vm.switchInvitingContractor}
                pageName={lang.dict.get('inviteContractor')}
                pageSubName={<span className="left__name-num">({vm.contractorsList.data.length})</span>}
            >
                <Subheader.Right>
                    <LogoListPrevious logos={vm.companyLogos} />
                    <div className="contractor-submitted">
                        <span className="contractor-submitted__text">
                            {vm.project.bids.length}&nbsp;
                        </span>
                        <span className="contractor-submitted__text">
                            {lang.dict.get('contractorsSubmitted')}
                        </span>
                    </div>
                    <Button
                        color="white"
                        value={lang.dict.get('reviewingInviteContractor')}
                        onClick={vm.openInviteCompanyModal}
                    />
                </Subheader.Right>
            </Subheader>
            <div className="inviting-contractors">
                <InfiniteScroll
                    dataLength={vm.contractorsList.length}
                    next={vm.contractorsList.loadNext}
                    hasMore={!vm.contractorsList.isLast}
                    loader={<Loading isEnabled={true} />}
                    scrollableTarget="scrolling-page"
                >
                    <div className="inviting-contractors__table">
                        {list}
                    </div>
                </InfiniteScroll>
            </div>
            <If condition={vm.isInviteCompanyModalOpened}>
                <InviteCompanyModal
                    vm={vm}
                    variant={E.RoleInCompany.contractor}
                />
            </If>
            <ErrorList errors={vm.errorListHolder} />
            <ErrorList errors={vm.validationHolder} />
        </Page>
    );
});
