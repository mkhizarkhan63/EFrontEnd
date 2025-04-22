import { observer } from 'mobx-react';
import { E, lang, utils } from '~/api';
import { Button, ErrorList, If, Input, SortedTable } from '~/bits';
import type { StageUnit } from '~/models';
import { utilsNumber } from '~/utils';
import type { BidingVm } from '../../Biding.vm';
import { Days, Price } from '../../Components';

const getColumns = (vm: BidingVm, disabled?: 'mob' | 'main') => SortedTable.createColumns<StageUnit>(
    () => [
        {
            keyName: 'stageNo',
            displayName: lang.dict.get('stageNo'),
            size: 1.1,
            isSortable: false,
            render: item => <div className="table__cell-text">{item.orderNumber}</div>,
        },
        {
            keyName: 'stageName',
            displayName: lang.dict.get('stageName'),
            size: 3.6,
            isSortable: false,
            render: item => <p className="stage-name table__cell-text">{vm.isEn ? item.stageName : item.stageNameArabic}</p>,
        },
        {
            keyName: 'valueOfStageInProc',
            displayName: lang.dict.get('valueOfStageInProc'),
            size: 3,
            align: 'left' as const,
            isSortable: false,
            render: item => (
                <div className="stage-in-proc">
                    <Input.Text
                        value={utils.toInputNumber(item.forProjectBid.valueOfStageInPercentage)}
                    />
                    <span>%</span>
                </div>
            ),
        },
        {
            keyName: 'valueOfStageInOmr',
            displayName: lang.dict.get('valueOfStageInOmr'),
            size: 2.4,
            align: 'left' as const,
            isSortable: false,
            render: item => (
                <div className="stage-in-omr">
                    <Input.Text
                        value={utilsNumber.toCurrency(item.forProjectBid.valueOfStageInOmr)}
                    />
                </div>
            ),
        },
        {
            keyName: 'timeOfStage',
            displayName: lang.dict.get('timeOfStage'),
            size: 2.2,
            align: 'left' as const,
            isSortable: false,
            render: (item, index) => {
                const isDisabled = () => {
                    if (disabled === 'main') {
                        return true;
                    }

                    if (disabled === 'mob' && index === 0) {
                        return true;
                    }

                    return false;
                };

                return (
                    <div className="time-of-stage">
                        <Input.Text
                            onChange={vm.changeInput(item.forProjectBid.setTimeOfStage)}
                            value={utils.toInputNumber(item.forProjectBid.timeOfStage)}
                            isDisabled={isDisabled()}
                        />
                        <span className="time-of-stage__days">{lang.dict.get('days')}</span>
                    </div>
                );
            },
        },
    ]);

const StageParts = observer(({ vm }: { vm: BidingVm }) => {
    const bidParts = vm.project.forContractor.bid?.parts.map(item => {
        const disable = () => {
            switch (item.planStage) {
                case E.StageTableNames.mobilization:
                    return 'mob';
                case E.StageTableNames.maintenance:
                    return 'main';
                default:
                    undefined;
            }
        };

        return (
            <>
                <p className="project__title project__title--main">
                    {lang.dict.enum('planStage', item.planStage)}
                </p>
                <SortedTable
                    key={item.id.asNumber()}
                    data={item.units}
                    keyValue="id"
                    columns={getColumns(vm, disable())}
                />
            </>
        );
    });

    return <>{bidParts}</>;
});

export const Bid = observer(({ vm }: { vm: BidingVm }) => {
    const contractor = vm.project.forContractor;

    const maintenance = vm.project.forContractor.bid?.parts.find(part => part.planStage === E.StageTableNames.maintenance);

    const bids = vm.project.forContractor.bid?.parts.filter(part => part.planStage !== E.StageTableNames.maintenance);

    if (!contractor.bid) {
        return null;
    }

    return (
        <div className="project bid">
            <ErrorList errors={vm.errorListHolder} />
            <div className="project-left">
                <StageParts vm={vm} />
            </div>
            <div className="project-right">
                <Price vm={vm} />
                <Days
                    maintenance={maintenance}
                    bids={bids}
                    total={vm.project.forContractor.bid?.totalDays}
                />
                <p className="project-right__review">
                    {lang.dict.get('reviewTheDocuments')}
                </p>
                <div className="project-right__btn">
                    <If condition={() => vm.isEditable}>
                        <Button
                            color="blue"
                            rightImg="next"
                            value={lang.dict.get('save')}
                            onClick={vm.save}
                        />
                        <Button
                            color="green"
                            rightImg="next"
                            value={lang.dict.get('submitBid')}
                            onClick={vm.toggleIsSubmitBid}
                        />
                    </If>
                </div>
            </div>
        </div>
    );
},
);
