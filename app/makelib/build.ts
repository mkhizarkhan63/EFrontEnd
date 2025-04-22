import { $ } from './main';
import { buildCss } from './build.css';
import { buildStatic } from './build.static';
import { buildJs } from './buildJs';

export const build = $.task('build', async ctx => {
    await $.panic(() => Promise.all([
        $.run(buildJs),
        $.run(buildCss),
        $.run(buildStatic),
    ]))();
});
