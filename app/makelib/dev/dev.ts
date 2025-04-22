import { $ } from '../main';
import { dev_serve } from './serve';
import { dev_watch } from './watch';

export const dev = $.task('dev', async ctx => {
    ctx.isDev = true;

    await $.fs.remove('./build');
    await $.fs.ensureDir('./build');

    await $.panic($.run)(dev_watch);
    await $.panic($.run)(dev_serve);
});

export const dev_lite = $.task('dev/lite', async ctx => {
    ctx.doLinting = false;
    $.run(dev);
});
