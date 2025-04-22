import { ChartType, Plugin } from 'chart.js';

declare module 'chart.js' {
	interface Chart<TType extends ChartType> {
    	$totalizer: {
            totals: number[][];
            utmost: number[];
        };
  	}
}
