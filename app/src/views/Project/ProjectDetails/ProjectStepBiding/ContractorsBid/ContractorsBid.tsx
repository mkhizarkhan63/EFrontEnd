import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import type { ProjectDetailsVm } from '~/views';
import { Button, If, LogoListPrevious } from '~/bits';
import { stores } from '~/stores';

type Props = {
    vm: ProjectDetailsVm;
};
// TODO remove button, it's there for testing purposes
export const ContractorsBid = observer(({ vm }: Props) => (
    <div className="project-step-biding contractor-bid">
        <img
            className="tick"
            alt=""
            src="/assets/graphics/status_bidding_green.svg"
        />
        <div className="what-will-happen">
            {lang.dict.get('contractorsAreBidding')}
        </div>
        <p className="what-happened">
            {lang.dict.get('yourProjectIsApprovedConstruction')}
        </p>
        <p className="what-happened">
            {lang.dict.get('reviewingProjectBidsActionTip')}
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
            <If condition={() => stores.display.isAdmin || stores.display.isSuperAdmin}>
                <Button
                    onClick={() => vm.updateBidClosingDate(E.BidClosingDateOption.endBiddingTime)}
                    color="white"
                    leftImg="close-red"
                    value={lang.dict.get('closeBid')}
                />
            </If>
            <Button
                color="blue"
                onClick={vm.previewBids}
                rightImg="next"
                value={lang.dict.get('openBids')}
            />
        </div>
    </div>
));
