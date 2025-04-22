import type { Chart as ChartJS, Plugin } from 'chart.js';

export const Totalizer: Plugin = {
    id: 'totalizer',
    beforeUpdate: (chart: ChartJS) => {
        const totals = [];
        const utmost = [];
        const length = chart.data.datasets.length;

        for (let i = 0; i < length; i++) {
            const total: number[] = [];

            chart.data.datasets.forEach(set => {
                total.push(set.data[i] as number);
            });

            totals.push(total);

            utmost[i] = totals[i].reduce((a, b) => a + b, 0);
        }

        chart.$totalizer = {
            totals: totals,
            utmost: utmost,
        };
    },
};
