import {
    BarElement, CategoryScale,
    Chart as ChartJS, Legend,
    LinearScale, Title,
    Tooltip, type ActiveElement,
    type ChartEvent, type ScriptableScaleContext,
} from 'chart.js';
import ChartDataLabels, { type Context } from 'chartjs-plugin-datalabels';
import { observer } from 'mobx-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useMediaMatch } from 'rooks';
import { E, lang } from '~/api';
import { Totalizer } from '~/utils';

type Props = {
    type: E.ProjectStatisticsType;
    histogramDataset: ChartDataSet[];
    budgetDataset: ChartDataSet[];
    onClick: (index: number, isFromChart: boolean) => void;
    context: E.RoleInCompany;
};

type ChartDataSet = {
    data: number[];
    backgroundColor: string | string[];
};

type FontContext = ScriptableScaleContext | Context;

const labelFormatter = (value: unknown, ctx: Context) => {
    const days = ctx.chart.$totalizer.utmost[ctx.dataIndex];

    return `${lang.dict.format('daysFormat', [days])}`;
};

const responsiveFont = (ctx: FontContext, yAxis?: boolean) => {
    const windowWidth = window.innerWidth;

    const size = (width: number) => {
        if (width >= 1650) {
            return yAxis ? 12 : 13;
        }

        if (width >= 1400) {
            return yAxis ? 11 : 11.5;
        }

        if (width >= 1200) {
            return yAxis ? 10 : 10.5;
        }

        if (width >= 768) {
            return yAxis ? 9 : 10;
        }

        return yAxis ? 12 : 13;
    };

    return {
        size: size(windowWidth),
    };
};

export const PmChart = observer(({ histogramDataset, budgetDataset, type, onClick, context }: Props) => {
    const isMobile = useMediaMatch('(max-width: 1450px)');

    const labels = [
        lang.dict.get('mobilization'),
        lang.dict.get('structure'),
        lang.dict.get('internalFinishes'),
        lang.dict.get('externalFinishes'),
        lang.dict.get('handover'),
    ];

    const isLegendOverlap = budgetDataset[0].data[1] <= budgetDataset[0].data[0] *2
    || budgetDataset[0].data[2] <= budgetDataset[0].data[1] *2;

    const barData = {
        options: {
            elements: {
                bar: {
                    borderWidth: 2,
                    borderColor: '#FFF',
                    borderSkipped: 'start' as const,
                },
            },
            events: ['click' as const],
            onClick: (e: ChartEvent, b: ActiveElement[]) => onClick(b[0].datasetIndex, true),
            categoryPercentage: 1,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#333333',
                        font: (ctx: ScriptableScaleContext) => responsiveFont(ctx),
                    },
                    grid: {
                        display: false,
                    },
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#898989',
                        font: (ctx: ScriptableScaleContext) => responsiveFont(ctx, true),
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                datalabels: {
                    anchor: 'end' as const,
                    align: 'end' as const,
                    formatter: labelFormatter,
                    color: '#B1B1B1',
                    font: (ctx: Context) => responsiveFont(ctx),
                    display: (ctx: Context) => ctx.datasetIndex === ctx.chart.$totalizer.totals[ctx.datasetIndex].length - 1,
                },
                tooltip: {
                    enabled: false,
                },
            },
            layout: {
                padding: {
                    top: 25,
                },
            },
        },
        data: {
            plugins: [Totalizer],
            labels,
            datasets: histogramDataset,
        },
    };

    const doughnutLabels = () => {
        switch (context) {
            case E.RoleInCompany.contractor:
                return [lang.dict.get('contractor')];
            case E.RoleInCompany.consultant:
                return [
                    lang.dict.get('contractor'),
                    lang.dict.get('consultant'),
                ];
            default:
                return [
                    lang.dict.get('contractor'),
                    lang.dict.get('clientMaterials'),
                    lang.dict.get('consultant'),
                ];
        }
    };

    const doughnutData = {
        data: {
            datasets: budgetDataset,
            labels: doughnutLabels(),
        },
        options: {
            responsive: true,
            layout: {
                padding: isMobile || isLegendOverlap ? 0 : 36,
            },
            maintainAspectRatio: false,
            cutout: 50,
            events: [],
            plugins: {
                datalabels: isMobile || isLegendOverlap
                    ? {
                        formatter: () => '',
                    }
                    : {
                        align: 'end' as const,
                        anchor: 'end' as const,
                        formatter: (value: unknown, ctx: Context) => ctx.chart.data.labels?.[ctx.dataIndex] || null,
                        font: {
                            size: 14,
                            weight: 500,
                        },
                        offset: 20,
                        color: '#000',
                    },
                legend: {
                    display: isMobile || isLegendOverlap,
                    position: 'bottom' as const,
                },
            },
        },
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ChartDataLabels,
        Totalizer,
    );

    ChartJS.defaults.font.weight = '600';
    ChartJS.defaults.font.family = 'Axiforma';

    if (type === E.ProjectStatisticsType.budget) {
        return <Doughnut {...doughnutData} />;
    }

    return <Bar {...barData} />;
});
