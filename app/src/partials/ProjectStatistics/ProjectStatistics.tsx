import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import {
    BudgetStatus,
    Button,
    Close,
    Input,
    Loading,
    PmChart,
    PmProjectStatus,
    ProjectTimeline,
    Switch,
} from '~/bits';
import { hook, utilsNumber } from '~/utils';
import { type PmModuleVm } from '~/views/PmModule/PmModule.vm';
import { ProjectStatisticsVm } from './ProjectStatistics.vm';

type Props = {
    type: E.ProjectStatisticsType;
    parentVm: PmModuleVm;
};

export const ProjectStatistics = observer(({ parentVm, type }: Props) => {
    const vm = hook.useVm(
        () => new ProjectStatisticsVm(parentVm, type),
        [parentVm.project?.id],
    );

    if (!vm.statistic || !parentVm.project || !parentVm.budget) {
        return (
            <div
                className="project-statistics project-statistics--loading"
                data-is-closed={vm.isClosed}
                data-type={type}
            >
                <Loading isEnabled={true} />
            </div>
        );
    }

    const header = type === E.ProjectStatisticsType.histogram
        ? lang.dict.get('projectStatistics')
        : lang.dict.get('budgetStatistics');

    const budgetStatus = () => (
        <BudgetStatus
            totalBudget={parentVm.totalBudget}
            onEdit={vm.editBudget}
            context={vm.context}
        />
    );

    const constructionValue = utilsNumber
        .toCurrency(parentVm.budget.totalContractorPayment, 0);

    const supervisionValue = utilsNumber
        .toCurrency(parentVm.budget.totalConsultantPayment, 0);

    if (!parentVm.isBudgetSpecified || vm.isBudgetEdited) {
        return (
            <div className="payments-box-container">
                <div className="payments-box">
                    <Close
                        onClick={vm.closeEditBudget}
                    />
                    <div className="payments-box__left">
                        <p className="payments-box__left-title">
                            {lang.dict.get('signedContractValues')}
                        </p>
                        <div className="payments-box__left-box">
                            <div className="payments-box__left-box-row">
                                <p className="payments-box__left-box-title">
                                    {lang.dict.get('contractorContractValue')}
                                </p>
                                <p className="payments-box__left-box-value">
                                    {lang.dict.format('omrFormat', [constructionValue])}
                                </p>
                            </div>
                            <div className="payments-box__left-box-row">
                                <p className="payments-box__left-box-title">
                                    {lang.dict.get('consultantContractValue')}
                                </p>
                                <p className="payments-box__left-box-value">
                                    {lang.dict.format('omrFormat', [supervisionValue])}
                                </p>
                            </div>
                        </div>
                        <p className="payments-box__left-title">
                            {lang.dict.get('whatsYourBudget')}
                        </p>
                        <Input.Text
                            value={utilsNumber.toCurrency(vm.budgetValue, 0)}
                            onChange={vm.setBudgetValue}
                            placeHolder={lang.dict.get('typeBudget')}
                            shouldCursorMove={true}
                        />
                        <Button
                            color="blue"
                            rightImg="next"
                            value={lang.dict.get('goSubmit')}
                            isDisabled={vm.budgetValue <= parentVm.budget.totalContractValue}
                            onClick={vm.submitBudget}
                        />
                    </div>
                    <div className="payments-box__right">
                        <p className="payments-box__right-title">
                            {lang.dict.get('identifyYourBudget')}
                        </p>
                        <Button
                            color="transparent"
                            value={lang.dict.get('viewDetails')}
                            onClick={() => parentVm.goToTab(E.PmModuleMenu.materials)}
                        />
                        <img
                            src="/assets/graphics/payments_graphic.svg"
                            alt=""
                            className="payments-box__right-img"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="project-statistics"
            data-is-closed={vm.isClosed}
            data-type={type}
        >
            <div className="project-statistics__header">
                <p className="project-statistics__title">{header}</p>
                <Button
                    color="white"
                    isCircle={true}
                    centerImg="dropdown-up"
                    onClick={vm.switchIsClosed}
                />
            </div>
            <div className="project-statistics__charts">
                <div className="project-statistics__charts-left">
                    <Switch
                        state={type === E.ProjectStatisticsType.histogram}
                        alt={budgetStatus}
                    >
                        <PmProjectStatus
                            status={vm.statistic.projectStatus}
                            percentage={vm.statistic.completionPercentage}
                        />
                    </Switch>
                    <ProjectTimeline
                        type={type}
                        statistics={vm.statistic}
                        completionDate={parentVm.project.baselineFinishDate}
                        startDate={parentVm.project.baselineStartDate}
                        budget={parentVm.budget}
                        context={vm.context}
                    />
                </div>
                <div className="project-statistics__charts-right">
                    <div className="chart-body">
                        <PmChart
                            type={type}
                            histogramDataset={parentVm.project.phaseStatistic}
                            budgetDataset={parentVm.budget.getBudgetDataset(vm.context)}
                            onClick={parentVm.openStageViewModal}
                            context={vm.context}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
