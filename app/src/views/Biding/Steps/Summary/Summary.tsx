import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Hide, Icons, If, SortedTable } from '~/bits';
import type { ProjectBid, StageUnit } from '~/models';
import { utilsNumber } from '~/utils';
import type { BidingVm } from '../../Biding.vm';
import { Days, Price } from '../../Components';

type Props = {
    vm: BidingVm;
};

const getColumns = () => SortedTable.createColumns<StageUnit>(
    () => [
        {
            keyName: 'stageNo',
            displayName: lang.dict.get('stageNo'),
            size: 1.2,
            isSortable: false,
            render: (item, index) => <div className="table__cell-text">{index + 1}</div>,
        },
        {
            keyName: 'stageName',
            displayName: lang.dict.get('stageName'),
            size: 8.5,
            isSortable: false,
            render: item => <p className="stage-name table__cell-text">{lang.currentLanguage === 'en' ? item.stageName : item.stageNameArabic}</p>,
        },
        {
            keyName: 'valueOfStageInOmr',
            displayName: lang.dict.get('projectPrice'),
            size: 2.9,
            isSortable: false,
            render: item => (
                <div className="stage-in-omr">
                    {utilsNumber.toCurrency(item.forProjectBid.valueOfStageInOmr)} {lang.dict.get('fieldOmr')}
                </div>
            ),
        },
        {
            keyName: 'timeOfStage',
            displayName: lang.dict.get('projectTimeline'),
            size: 1.7,
            align: 'right',
            isSortable: false,
            render: item => (
                <div className="time-of-stage">
                    {item.forProjectBid.timeOfStage}
                    <span className="time-of-stage__days">{lang.dict.get('days')}</span>
                </div>
            ),
        },
    ]);

const StageParts = observer(({ bid }: { bid: ProjectBid }) => {
    const bidParts = bid.parts.map(item => (
        <>
            <p className="project__title project__title--main">
                {lang.dict.enum('planStage', item.planStage)}
            </p>
            <SortedTable
                key={item.id.asNumber()}
                data={item.units}
                keyValue="id"
                columns={getColumns()}
            />
        </>
    ));

    return <>{bidParts}</>;
});

export const Summary = observer(({ vm }: Props) => {
    const contractor = vm.project.forContractor;

    const maintenance = vm.project.forContractor.bid?.parts.find(part => part.planStage === E.StageTableNames.maintenance);

    const bids = vm.project.forContractor.bid?.parts.filter(part => part.planStage !== E.StageTableNames.maintenance);

    if (!contractor.bid) {
        return null;
    }

    return (
        <div className="bid-summary">
            <div className="bid-summary__top">
                <Icons icon={!vm.areYouWinner && !vm.isWaitingForClient ? 'rejected' : 'tick'} />
                <div className="bid-summary__top-text">
                    <p className="bid-summary__top-thanks">
                        {lang.dict.get('thanksForSubmitBid')}
                    </p>
                    <If condition={() => vm.isWaitingForClient}>
                        <p className="bid-summary__top-text">
                            {lang.dict.get('waitingForChooseContractor')}
                        </p>
                    </If>
                    <If condition={() => !vm.isWaitingForClient}>
                        <If condition={() => vm.areYouWinner}>
                            <p className="bid-summary__top-text">
                                {lang.dict.get('clientHasSelectedYou')}
                            </p>
                        </If>
                        <If condition={() => !vm.areYouWinner}>
                            <p className="bid-summary__top-text">
                                {/* TODO Get contractor name */}
                                {lang.dict.get('otherWonTheBid')}
                            </p>
                            <p className="bid-summary__top-text bid-summary__top-text--small">
                                {lang.dict.get('allTheBestNextTime')}
                            </p>
                        </If>
                    </If>
                </div>
            </div>
            <Hide reason="moved-to-phase-2">
                <If condition={() => true}>
                    <div className="bid-summary__detail">
                        <div className="bid-summary__detail-title">
                            {lang.dict.get('clientDetail')}
                        </div>
                        <div className="bid-summary__detail-info">
                            <p className="bid-summary__detail-name">
                                <Icons icon="supplier" />
                            </p>
                            <a className="bid-summary__detail-contact">
                                <Icons icon="phone" />
                            </a>
                        </div>
                    </div>
                </If>
            </Hide>
            <div className="project bid">
                <div className="project-left">
                    <StageParts bid={contractor.bid} />
                </div>
                <div className="project-right">
                    <Price vm={vm} isSummary={true} />
                    <Days
                        maintenance={maintenance}
                        bids={bids}
                        total={vm.project.forContractor.bid?.totalDays}
                    />
                </div>
            </div>
            <If condition={() => vm.isShownViewContract}>
                <div className="contractors-bids__btn">
                    <Button
                        color="green"
                        value={lang.dict.get('viewContract')}
                        rightImg="next"
                        onClick={vm.goToContract}
                    />
                </div>
            </If>
        </div>
    );
});
