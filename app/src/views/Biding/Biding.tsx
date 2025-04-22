import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { E, lang } from '~/api';
import { Button, If, Loading, Switch } from '~/bits';
import { PageWithWizard, SowItemsByProjectType } from '~/partials';
import { hook } from '~/utils';
import { BidingVm } from './Biding.vm';
import { PostQuestion, ProjectDrawings, SubmitBid, ViewCosts } from './Modals';
import { Bid, ProjectPrices, Summary } from './Steps';

type Props = {
    vm: BidingVm;
};

const SubheaderButtons = observer(({ vm }: Props) => {
    if (!vm.project) {
        return null;
    }

    return (
        <div className="biding-btn biding-btn--download">
            <Button
                color="white"
                rightImg="download-bigger"
                onClick={vm.toggleProjectDrawings}
                value={lang.dict.get('projectDrawings')}
            />
        </div>
    );
});

const SubheaderContent = observer(({ vm }: Props) => {
    if (!vm.project) {
        return null;
    }

    return (
        <>
            <div className="subheader-item">
                <div className="subheader-item__text">
                    {vm.project.wilayat?.displayName}
                </div>
                <div className="subheader-item__title">
                    {vm.project.governorate?.displayName}
                </div>
            </div>
            <div className="subheader-item">
                <div className="subheader-item__text subheader-item__text--area">
                    {lang.dict.format('squareMetersFormat', [vm.project.addedBuiltUpArea])}
                </div>
                <div className="subheader-item__title">
                    {lang.dict.get('residential')}
                </div>
            </div>
            <div className="subheader-item">
                <div className="subheader-item__text subheader-item__text--date">
                    {vm.project.floorLevels}
                </div>
                <div className="subheader-item__title">
                    {lang.dict.get('projectTileFloorLevels')}
                </div>
            </div>
            <If condition={() => vm.step !== 2}>
                <div className="subheader-item">
                    <div className="subheader-item__text subheader-item__text--small">
                        {moment(vm.project.bidClosingDate).format('ll')}
                    </div>
                    <div className="subheader-item__title">
                        {lang.dict.get('bidClosing')}
                    </div>
                </div>
            </If>
            <If condition={() => vm.step === 2}>
                <SubheaderButtons vm={vm} />
            </If>
        </>
    );
});

const StepWizardContent = observer(({ vm }: Props) => {
    if (!vm.project || vm.step === 2) {
        return null;
    }

    return (
        <div className="wizard__right">
            <div className="biding-btn biding-btn--post">
                <Button
                    color="white"
                    leftImg="comment"
                    onClick={vm.toggleIsPostQuestion}
                    value={lang.dict.get('postQuestion')}
                />
            </div>
            <SubheaderButtons vm={vm} />
        </div>
    );
});

export const Biding = observer(({ isEditable }: { isEditable?: boolean }) => {
    const vm = hook.useVm(() => new BidingVm(isEditable), [isEditable]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.parentElement?.scrollTo(0, 0);
    }, [vm.step]);

    if (vm.isLoading) {
        return <Loading isEnabled={true} />;
    }

    const pageSubName = (
        <div className="">
            <div className="left__row">
                <p className="left__main-name">{vm.project.projectNumber}</p>
                <If condition={() => vm.project.forContractor.bidStatus !== E.BidStatus.none}>
                    <Switch
                        state={() => !vm.isWaitingForClient && !vm.areYouWinner}
                        alt={() => <p className="left__status" data-status={vm.bidStatus}>{vm.bidStatus}</p>}
                    >
                        <p className="left__status">
                            {lang.dict.enum('projectCompanyStatus', E.ProjectStatus.archived)}
                        </p>
                    </Switch>
                </If>
            </div>
            <If condition={() => vm.step !== 2}>
                <div className="left__row">
                    <p className="left__id">#{vm.project.id.asNumber()}</p>
                    <p className="left__days-left">{vm.daysLeft}</p>
                </div>
            </If>
        </div>
    );

    const subheader = {
        hasReturnButton: true,
        returnButton: () => vm.goBack(),
        pageName: '',
        pageSubName: pageSubName,
    };

    return (
        <div className="biding" data-step={vm.step} data-is-contract-btn={vm.isShownViewContract}>
            <PageWithWizard
                ref={ref}
                subheader={subheader}
                subheaderContent={<SubheaderContent vm={vm} />}
                stepWizard={vm.step !== 2 ? vm.steps : undefined}
                stepWizardContent={<StepWizardContent vm={vm} />}
            >
                <If condition={() => vm.isPostQuestion}>
                    <PostQuestion vm={vm} />
                </If>
                <If condition={() => Boolean(vm.scopeOfWorkType)}>
                    <SowItemsByProjectType
                        type={vm.scopeOfWorkType}
                        onClose={vm.closeScopeOfWork}
                        sowId={vm.project.sow?.id.asNumber()}
                    />
                </If>
                <If condition={() => vm.isProjectDrawings}>
                    <ProjectDrawings vm={vm} />
                </If>
                <If condition={() => vm.isSubmitBid}>
                    <SubmitBid vm={vm} />
                </If>
                <If condition={() => vm.step === 0}>
                    <ProjectPrices vm={vm} />
                </If>
                <If condition={() => vm.step === 1}>
                    <Bid vm={vm} />
                </If>
                <If condition={() => vm.step === 2}>
                    <Summary vm={vm} />
                </If>
                <If condition={() => vm.isViewCosts}>
                    <ViewCosts vm={vm} />
                </If>
            </PageWithWizard>
        </div>
    );
});
