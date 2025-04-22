import { $ } from './main';
import { lintJs } from './lintJs';
import { lintCss } from './lint.css';

export const lint = $.task('lint', async () => {
    await Promise.all([
        $.run(lintJs),
        $.run(lintCss),
    ]);

    await $.wait(150);
});
