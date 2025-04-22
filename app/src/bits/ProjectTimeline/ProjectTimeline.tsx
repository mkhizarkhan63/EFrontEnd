import {
    ArcElement, Chart as ChartJS,
    Legend, Tooltip,
    type ChartType, type ScriptableTooltipContext,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { observer } from 'mobx-react-lite';
import type moment from 'moment';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { E, lang, type restQuery } from '~/api';
import type { PmBudgetType } from '~/models/PmModels/PmBudget';
import { If } from '../If';
import { CustomTooltip } from './Tooltip/CustomTooltip';
import { toCurrency } from '~/utils/number';

type Props = {
    statistics?: restQuery.project.PmProjectStatistic;
    type: E.ProjectStatisticsType;
    completionDate?: moment.Moment;
    startDate?: moment.Moment;
    budget: PmBudgetType;
    context: E.RoleInCompany;
};

type TooltipData = {
    completionDate?: moment.Moment;
    startDate?: moment.Moment;
    statistics: restQuery.project.PmProjectStatistic;
    color: string;
    position: {
        top: number;
        left: number;
    };
};

export const ProjectTimeline = observer(({ type, statistics, budget, completionDate, startDate, context }: Props) => {
    if (!statistics) {
        return null;
    }

    const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

    const customTooltip = (tooltipModel: ScriptableTooltipContext<ChartType>) => {
        if (tooltipModel.tooltip.opacity === 0) {
            setTooltipData(null);
            return;
        }

        const chart = tooltipModel.chart;
        const canvas = chart.canvas;

        if (!canvas) {
            return;
        }

        const left = tooltipModel.tooltip.x;
        const top = tooltipModel.tooltip.y;

        const data = {
            startDate,
            completionDate,
            statistics,
            color: tooltipModel.tooltip.labelColors?.[0]?.backgroundColor as string ?? '#000',
            position: {
                top,
                left,
            },
        };

        if (tooltipData?.position.top !== top) {
            setTooltipData(data);
        }
    };

    const header = type === E.ProjectStatisticsType.histogram
        ? lang.dict.get('timePeriod')
        : null;

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

    const paymentDataset = () => {
        switch (context) {
            case E.RoleInCompany.contractor:
                return {
                    data: [
                        budget.contractorTotalSpent,
                        budget.contractorRemaining,
                    ],
                    dataForWheel: [
                        budget.contractorTotalSpent,
                        budget.contractorRemaining,
                    ],
                    backgroundColor: ['#1E428A', '#eeeeee'],
                    titles: [
                        lang.dict.get('paid'),
                        lang.dict.get('totalRemaining'),
                    ],
                };
            case E.RoleInCompany.consultant:
                return {
                    data: [
                        budget.contractorTotalSpent + budget.consultantTotalSpent,
                        budget.consultantRemaining,
                    ],
                    dataForWheel: [
                        budget.contractorTotalSpent + budget.consultantTotalSpent,
                        budget.consultantRemaining,
                    ],
                    backgroundColor: ['#E0A801', '#eeeeee'],
                    titles: [
                        lang.dict.get('paid'),
                        lang.dict.get('totalRemaining'),
                    ],
                };
            default:
                return {
                    data: [
                        budget.totalSpent,
                        budget.remainingBudget,
                    ],
                    dataForWheel: [
                        budget.totalSpent,
                        budget.remainingBudget,
                    ],
                    backgroundColor: ['#05d94e', '#eeeeee'],
                    titles: [
                        lang.dict.get('totalSpent'),
                        lang.dict.get('totalRemaining'),
                    ],
                };
        }
    };

    const dataset = type === E.ProjectStatisticsType.histogram
        ? {
            data: [
                statistics.totalTimeElapsed,
                statistics.totalDelay,
                statistics.timeRemaining,
            ],
            dataForWheel: [
                statistics.isDelayEqualPassed ? 0 : statistics.totalTimeElapsed,
                statistics.isDelayEqualPassed ? statistics.totalDelay + statistics.totalTimeElapsed : statistics.totalDelay,
                statistics.timeRemaining,
            ],
            backgroundColor: ['#05d94e', '#ec5469', '#eeeeee'],
            titles: [
                lang.dict.get('timeElapsed'),
                lang.dict.get('timeInDelay'),
                lang.dict.get('timeRemaining'),
            ],
        }
        : paymentDataset();

    const legendValue = (index: number) => {
        if (type === E.ProjectStatisticsType.histogram) {
            return (
                <p className="chart-doughnut__legend-value">
                    {dataset.data[index]}
                        &nbsp;
                    {lang.dict.get('days')}
                </p>
            );
        }

        return (
            <p className="chart-doughnut__legend-value">
                {toCurrency(budget.getPaymentDetailsLegend(context)[index], 0, 3)}&nbsp;
                {lang.dict.get('fieldOmr')}
            </p>
        );
    };

    const legend = () => dataset.titles.map((item, i) => (
        <div key={i} className="chart-doughnut__legend-row">
            <p className="chart-doughnut__legend-name" data-color={i}>
                {item}
            </p>
            {legendValue(i)}
        </div>
    ));

    const doughnutData = {
        options: {
            events: type === E.ProjectStatisticsType.budget ? [] : undefined,
            rotation: -90,
            circumference: 180,
            cutout: '65%',
            maintainAspectRatio: true,
            responsive: true,
            elements: {
                arc: {
                    borderWidth: 0,
                },
            },
            plugins: {
                datalabels: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                    position: 'nearest' as const,
                    ...type === E.ProjectStatisticsType.histogram ? { external: customTooltip } : {},
                },
            },
        },
        data: {
            datasets: [
                {
                    backgroundColor: dataset.backgroundColor,
                    data: dataset.dataForWheel,
                },
            ],
        },
    };

    return (
        <div className="chart-doughnut" data-type={type}>
            <p className="chart-doughnut__title">{header}</p>
            <div className="chart-doughnut__chart">
                <Doughnut {...doughnutData} />
                <If condition={Boolean(completionDate) && type === E.ProjectStatisticsType.histogram}>
                    <div className="chart-doughnut__chart-center">
                        {lang.dict.get('completionDate')}
                        <p className="chart-doughnut__chart-center-date">
                            {completionDate?.format('D MMM YYYY')}
                        </p>
                    </div>
                </If>
                {tooltipData ? <CustomTooltip data={tooltipData} /> : null}
            </div>
            <div className="chart-doughnut__legend">
                {legend()}
            </div>
        </div>
    );
});
